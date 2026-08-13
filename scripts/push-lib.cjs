// Shared plumbing for the two push jobs.
//
// Both of them talk to the Apps Script endpoint, and Apps Script intermittently
// answers a perfectly ordinary GET with an HTML error page instead of JSON —
// Google's "Sorry, unable to open the file at this time" and friends. The
// scripts called res.json() straight on that, threw
//
//   SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
//
// and exited 1, which failed the workflow, which emailed. About one run in ten
// over the last two days, several mails a day, none of them actionable: the
// next run five minutes later worked fine.
//
// So: retry a few times, and if the endpoint is still unhappy, say so as a
// warning annotation and finish green. Push is explicitly the best-effort
// channel here — the workflow's own comment says email stays the guaranteed
// one — and a job that cannot reach a flaky upstream has not done anything
// wrong. Configuration faults still fail loudly; see requireEnv and AuthError.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Upstream had a bad moment. Not our bug, not worth an email.
class TransientError extends Error {}

// The endpoint answered, and the answer says we are misconfigured. Worth an
// email, because nothing will work until a human changes something.
class AuthError extends Error {}

function requireEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    console.error(`Missing env: ${missing.join(", ")}.`);
    process.exit(1);
  }
}

function warn(message) {
  // ::warning:: surfaces in the run summary and the Actions UI without
  // marking the run failed, so it does not generate mail.
  console.log(`::warning::${message}`);
}

// GET a feed and parse it as JSON, retrying the whole thing on anything that
// looks like a blip. Throws TransientError once the retries are spent.
async function fetchFeed(url, { attempts = 3, label = "feed" } = {}) {
  let last = "";
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) {
        last = `HTTP ${res.status}`;
      } else {
        try {
          return JSON.parse(text);
        } catch (_e) {
          // The HTML error page lands here. Keep a short, non-secret excerpt
          // so the log says which flavour of Google error page it was.
          last = `not JSON (${text.trim().slice(0, 60).replace(/\s+/g, " ")}…)`;
        }
      }
    } catch (err) {
      last = err && err.message ? err.message : String(err);
    }
    if (i < attempts) await sleep(i * 2000);
  }
  throw new TransientError(`${label}: ${last}`);
}

// Wraps a job body so the two failure classes get different exit codes.
function run(main) {
  main().catch((err) => {
    if (err instanceof TransientError) {
      warn(`Backend unreachable, skipping this run — ${err.message}`);
      return; // exit 0
    }
    if (err instanceof AuthError) {
      console.error(`Push is misconfigured: ${err.message}`);
      process.exitCode = 1;
      return;
    }
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = { TransientError, AuthError, requireEnv, warn, fetchFeed, run, sleep };

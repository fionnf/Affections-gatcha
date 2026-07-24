// Shared shims for testing the browser modules under node:test.
// Must be imported (and setupBrowserEnv called) BEFORE any src/ module, since
// storage.js and utils.js touch localStorage/window at call time.

export function makeLocalStorage() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(String(k)) ? store.get(String(k)) : null),
    setItem: (k, v) => { store.set(String(k), String(v)); },
    removeItem: (k) => { store.delete(String(k)); },
    clear: () => { store.clear(); },
  };
}

export function setupBrowserEnv(search = "?player=lennart") {
  const localStorage = makeLocalStorage();
  globalThis.localStorage = localStorage;
  globalThis.window = {
    location: { search, href: `https://example.test/index.html${search}` },
    localStorage,
  };
  return {
    localStorage,
    setSearch(next) {
      globalThis.window.location.search = next;
      globalThis.window.location.href = `https://example.test/index.html${next}`;
    },
  };
}

// Minimal outcomes fixture mirroring config/outcomes.json's shape.
export function outcomesFixture() {
  return {
    categories: [
      { id: "niete", label: "Niete", weight: 150, tone: "quiet", outcomes: [
        { title: "N1", message: "n1" }, { title: "N2", message: "n2" }
      ]},
      { id: "common", label: "Gewöhnlich", weight: 200, tone: "soft", outcomes: [
        { title: "A", message: "a" }, { title: "B", message: "b" }, { title: "C", message: "c" }
      ]},
      { id: "cursed", label: "Verflucht", weight: 90, tone: "cursed", outcomes: [
        { title: "V1", message: "v1" }
      ]},
      { id: "rare", label: "Selten", weight: 90, tone: "rare", outcomes: [
        { title: "R1", message: "r1", voucher: true }
      ]},
      { id: "jackpot", label: "JACKPOT", weight: 30, tone: "jackpot", outcomes: [
        { title: "J1", message: "j1", voucher: true }
      ]},
    ],
  };
}

export const TEST_SECRET = "test-secret-that-is-long-enough-0123456789";

export function dayKey(offsetDays = 0, from = new Date()) {
  const d = new Date(from.getTime() + offsetDays * 86400000);
  return d.toISOString().slice(0, 10);
}

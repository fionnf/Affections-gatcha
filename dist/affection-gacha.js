(function () {
  const script = document.currentScript;
  const mountSelector = script?.dataset.mount || "#affektions-gacha";
  const baseUrl = script?.dataset.configBase || "";
  const mount = document.querySelector(mountSelector) || createMount();

  const state = {
    theme: null,
    outcomes: null,
    photos: null,
    todaysPull: null
  };

  const defaultPhotos = { photos: [] };

  function createMount() {
    const element = document.createElement("section");
    element.id = "affektions-gacha";
    document.body.appendChild(element);
    return element;
  }

  function urlFor(file) {
    return new URL(file, baseUrl || window.location.href).toString();
  }

  async function fetchJson(file, fallback = null) {
    const response = await fetch(urlFor(file), { cache: "no-store" });
    if (!response.ok) {
      if (fallback !== null) return fallback;
      throw new Error(`${file}: HTTP ${response.status}`);
    }
    return response.json();
  }

  async function init() {
    injectFonts();
    injectStyles();
    renderShell();
    try {
      const [theme, outcomes, photos] = await Promise.all([
        fetchJson("config/theme.json"),
        fetchJson("config/outcomes.json"),
        fetchJson("config/photos.json", defaultPhotos)
      ]);
      state.theme = theme;
      state.outcomes = outcomes;
      state.photos = normalizePhotos(photos);
      applyTheme(theme);
      hydrateCopy();
      renderOdds();
      bindEvents();
    } catch (error) {
      renderError(error);
    }
  }

  function normalizePhotos(photosConfig) {
    const photos = Array.isArray(photosConfig?.photos) ? photosConfig.photos : [];
    return photos.map((photo) => ({
      ...photo,
      url: new URL(photo.url, urlFor("config/photos.json")).toString()
    }));
  }

  function injectFonts() {
    if (document.querySelector("[data-ag-fonts]")) return;
    const link = document.createElement("link");
    link.dataset.agFonts = "true";
    link.rel = "stylesheet";
    link.href = "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap";
    document.head.appendChild(link);
  }

  function renderShell() {
    mount.className = "ag-widget";
    mount.setAttribute("aria-labelledby", "ag-title");
    mount.innerHTML = `
      <div class="ag-shell">
        <div class="ag-machine" aria-hidden="true">
          <div class="ag-machine-top"></div>
          <div class="ag-stickers" data-ag-stickers></div>
          <div class="ag-window">
            <div class="ag-capsule" data-capsule></div>
          </div>
          <div class="ag-landscape"><span></span><span></span><span></span></div>
          <div class="ag-slot"></div>
        </div>
        <div class="ag-copy">
          <p class="ag-kicker" data-ag-kicker>Einmal pro Tag</p>
          <h1 id="ag-title" data-ag-main-title>Affektions-Gacha</h1>
          <p class="ag-intro" data-ag-intro></p>
          <button class="ag-button" type="button" data-ag-draw>
            <span data-ag-button-text>Kapsel ziehen</span>
          </button>
          <article class="ag-result" data-ag-result aria-live="polite" hidden>
            <div class="ag-result-head">
              <span class="ag-badge" data-ag-rarity></span>
              <span class="ag-date" data-ag-date></span>
            </div>
            <h2 data-ag-title></h2>
            <p data-ag-message></p>
            <figure class="ag-photo" data-ag-photo-wrap hidden>
              <img data-ag-photo alt="" loading="lazy" decoding="async" />
              <figcaption data-ag-photo-caption></figcaption>
            </figure>
            <div class="ag-actions">
              <button class="ag-secondary" type="button" data-ag-copy>Resultat kopieren</button>
              <a class="ag-secondary ag-link" data-ag-send href="#" rel="noopener">An Fionn schicken</a>
            </div>
          </article>
          <details class="ag-rules">
            <summary data-ag-rules-title>Maschinenregeln</summary>
            <p data-ag-rules-text></p>
            <ul data-ag-odds></ul>
          </details>
        </div>
      </div>
    `;
  }

  function $(selector) {
    return mount.querySelector(selector);
  }

  function getToken() {
    const params = new URLSearchParams(window.location.search);
    return params.get(state.theme.tokenParam) || state.theme.brand.displayNameDefault || "Lennart";
  }

  function displayNameFromToken() {
    const token = getToken();
    return token
      .replace(/[-_]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toLocaleUpperCase("de-CH") + part.slice(1))
      .join(" ") || state.theme.brand.displayNameDefault || "Lennart";
  }

  function hydrateCopy() {
    const name = displayNameFromToken();
    $("[data-ag-main-title]").textContent = state.theme.brand.titleTemplate.replace("{name}", name);
    $("[data-ag-kicker]").textContent = `${state.theme.brand.kicker} · ${state.photos.length} Erinnerungen`;
    $("[data-ag-intro]").textContent = state.theme.brand.intro;
    $("[data-ag-button-text]").textContent = state.theme.brand.buttonIdle;
    $("[data-ag-rules-title]").textContent = state.theme.brand.rulesTitle;
    $("[data-ag-rules-text]").textContent = state.theme.brand.rulesText;
    $("[data-ag-send]").textContent = `An ${state.theme.brand.fromName} schicken`;

    const stickers = $("[data-ag-stickers]");
    stickers.innerHTML = "";
    for (const sticker of state.theme.stickers || []) {
      const span = document.createElement("span");
      span.textContent = sticker;
      stickers.appendChild(span);
    }
  }

  function applyTheme(theme) {
    const set = (name, value) => mount.style.setProperty(name, value);
    const colors = theme.colors || {};
    const dark = theme.darkColors || colors;
    set("--ag-bg", colors.background);
    set("--ag-surface", colors.surface);
    set("--ag-surface-2", colors.surfaceAlt);
    set("--ag-text", colors.text);
    set("--ag-muted", colors.muted);
    set("--ag-border", colors.border);
    set("--ag-primary", colors.primary);
    set("--ag-primary-dark", colors.primaryDark);
    set("--ag-gold", colors.gold);
    set("--ag-green", colors.green);
    set("--ag-blue", colors.blue);
    set("--ag-sky", colors.sky);
    set("--ag-mountain", colors.mountain);
    set("--ag-dark-bg", dark.background);
    set("--ag-dark-surface", dark.surface);
    set("--ag-dark-surface-2", dark.surfaceAlt);
    set("--ag-dark-text", dark.text);
    set("--ag-dark-muted", dark.muted);
    set("--ag-dark-border", dark.border);
    set("--ag-dark-primary", dark.primary);
    set("--ag-dark-primary-dark", dark.primaryDark);
    set("--ag-dark-gold", dark.gold);
    set("--ag-dark-green", dark.green);
    set("--ag-dark-blue", dark.blue);
    set("--ag-dark-sky", dark.sky);
    set("--ag-dark-mountain", dark.mountain);
  }

  function dateKeyInTimezone(timezone) {
    const parts = new Intl.DateTimeFormat("de-CH", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const get = (type) => parts.find((part) => part.type === type).value;
    return `${get("year")}-${get("month")}-${get("day")}`;
  }

  function hashStringToUint32(input) {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededRandom(seedText) {
    return mulberry32(hashStringToUint32(seedText))();
  }

  function seededIndex(seedText, length) {
    if (!length) return 0;
    return Math.floor(seededRandom(seedText) * length);
  }

  function totalWeight() {
    return state.outcomes.categories.reduce((sum, category) => sum + category.weight, 0);
  }

  function pickWeighted(seedText) {
    const total = totalWeight();
    const roll = Math.floor(seededRandom(seedText) * total);
    let cursor = 0;
    for (const category of state.outcomes.categories) {
      cursor += category.weight;
      if (roll < cursor) return category;
    }
    return state.outcomes.categories[state.outcomes.categories.length - 1];
  }

  function buildPull() {
    const day = dateKeyInTimezone(state.theme.timezone);
    const token = getToken();
    const baseSeed = `${state.theme.secret}|${token}|${day}`;
    let category = pickWeighted(`${baseSeed}|category`);

    if (category.id === "photo" && !state.photos.length) {
      category = state.outcomes.categories.find((item) => item.id === "common") || category;
    }

    const outcome = category.outcomes[
      seededIndex(`${baseSeed}|${category.id}|outcome`, category.outcomes.length)
    ];

    const photo =
      category.id === "photo" && state.photos.length
        ? state.photos[seededIndex(`${baseSeed}|photo`, state.photos.length)]
        : null;

    return { day, token, category, outcome, photo };
  }

  function setCapsuleTone(tone) {
    const capsule = $("[data-capsule]");
    const colors = {
      quiet: "linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",
      soft: "linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",
      quest: "linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",
      warm: "linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",
      cursed: "linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",
      rare: "linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",
      photo: "linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",
      jackpot: "linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"
    };
    capsule.style.background = colors[tone] || colors.soft;
  }

  function messageText(pull) {
    return [
      `${displayNameFromToken()}s ${state.theme.brand.machineName}: ${pull.category.label}`,
      pull.outcome.title,
      pull.outcome.message,
      pull.photo ? `Foto: ${pull.photo.caption || pull.photo.alt || "Foto-Drop"}` : "",
      `Tag: ${pull.day}`
    ]
      .filter(Boolean)
      .join("\n");
  }

  function renderPull(pull) {
    mount.dataset.tone = pull.category.tone;
    setCapsuleTone(pull.category.tone);
    $("[data-ag-rarity]").textContent = pull.category.label;
    $("[data-ag-date]").textContent = pull.day;
    $("[data-ag-title]").textContent = pull.outcome.title;
    $("[data-ag-message]").textContent = pull.outcome.message;

    const photoWrap = $("[data-ag-photo-wrap]");
    const photoEl = $("[data-ag-photo]");
    const photoCaption = $("[data-ag-photo-caption]");
    if (pull.photo) {
      photoEl.src = pull.photo.url;
      photoEl.alt = pull.photo.alt || "Foto von uns";
      photoCaption.textContent = pull.photo.caption || "";
      photoWrap.hidden = false;
    } else {
      photoEl.removeAttribute("src");
      photoEl.alt = "";
      photoCaption.textContent = "";
      photoWrap.hidden = true;
    }

    const text = messageText(pull);
    const encodedSubject = encodeURIComponent("Mein Gacha-Zug");
    const encodedBody = encodeURIComponent(text);
    const sendLink = $("[data-ag-send]");
    if (state.theme.messageTarget.startsWith("mailto:")) {
      sendLink.href = `${state.theme.messageTarget}?subject=${encodedSubject}&body=${encodedBody}`;
    } else {
      sendLink.href = state.theme.messageTarget.replace("{text}", encodedBody);
    }

    $("[data-ag-result]").hidden = false;
  }

  function reveal() {
    if (!state.todaysPull) state.todaysPull = buildPull();
    const button = $("[data-ag-draw]");
    const buttonText = $("[data-ag-button-text]");
    const steps = state.theme.loadingSteps || ["Maschine rattert"];
    let stepIndex = 0;

    mount.classList.add("is-revealing");
    button.disabled = true;
    buttonText.textContent = steps[stepIndex];
    const stepTimer = window.setInterval(() => {
      stepIndex = Math.min(stepIndex + 1, steps.length - 1);
      buttonText.textContent = steps[stepIndex];
    }, Math.max(420, Math.floor((state.theme.revealDelayMs || 3200) / steps.length)));

    window.setTimeout(() => {
      window.clearInterval(stepTimer);
      renderPull(state.todaysPull);
      mount.classList.remove("is-revealing");
      button.disabled = false;
      buttonText.textContent = state.theme.brand.buttonShown;
    }, state.theme.revealDelayMs || 3200);
  }

  function renderOdds() {
    const oddsList = $("[data-ag-odds]");
    oddsList.innerHTML = "";
    const total = totalWeight();
    for (const category of state.outcomes.categories) {
      const li = document.createElement("li");
      li.textContent = `${category.label}: ${(category.weight / total * 100).toFixed(1)} %`;
      oddsList.appendChild(li);
    }
  }

  function bindEvents() {
    $("[data-ag-draw]").addEventListener("click", reveal);
    $("[data-ag-copy]").addEventListener("click", async () => {
      if (!state.todaysPull) return;
      const text = messageText(state.todaysPull);
      try {
        await navigator.clipboard.writeText(text);
        $("[data-ag-copy]").textContent = "Kopiert";
        window.setTimeout(() => {
          $("[data-ag-copy]").textContent = "Resultat kopieren";
        }, 1400);
      } catch (error) {
        window.prompt("Resultat kopieren:", text);
      }
    });
  }

  function renderError(error) {
    mount.innerHTML = `
      <div class="ag-error">
        <h2>Die Maschine klemmt.</h2>
        <p>${escapeHtml(error.message || String(error))}</p>
      </div>
    `;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character]));
  }

  function injectStyles() {
    if (document.querySelector("[data-ag-styles]")) return;
    const style = document.createElement("style");
    style.dataset.agStyles = "true";
    style.textContent = `
      .ag-widget,.ag-widget *{box-sizing:border-box}.ag-widget{--ag-shadow:0 24px 60px rgba(38,75,45,.14);--ag-radius-lg:28px;--ag-radius-md:18px;--ag-radius-sm:12px;--ag-ease:cubic-bezier(.16,1,.3,1);color:var(--ag-text);background:radial-gradient(circle at 20% 0%,rgba(198,225,185,.68),transparent 34rem),radial-gradient(circle at 100% 40%,rgba(47,122,79,.18),transparent 28rem),linear-gradient(145deg,rgba(215,231,223,.44),transparent 38%),var(--ag-bg);border-radius:var(--ag-radius-lg);overflow:hidden;font-family:"Satoshi","Inter",system-ui,sans-serif}@media (prefers-color-scheme:dark){.ag-widget{--ag-bg:var(--ag-dark-bg)!important;--ag-surface:var(--ag-dark-surface)!important;--ag-surface-2:var(--ag-dark-surface-2)!important;--ag-text:var(--ag-dark-text)!important;--ag-muted:var(--ag-dark-muted)!important;--ag-border:var(--ag-dark-border)!important;--ag-primary:var(--ag-dark-primary)!important;--ag-primary-dark:var(--ag-dark-primary-dark)!important;--ag-gold:var(--ag-dark-gold)!important;--ag-green:var(--ag-dark-green)!important;--ag-blue:var(--ag-dark-blue)!important;--ag-sky:var(--ag-dark-sky)!important;--ag-mountain:var(--ag-dark-mountain)!important;--ag-shadow:0 24px 60px rgba(0,0,0,.36)}}.ag-shell{width:min(100%,980px);margin-inline:auto;padding:clamp(24px,6vw,72px);display:grid;grid-template-columns:minmax(220px,.8fr) minmax(0,1.2fr);gap:clamp(24px,5vw,64px);align-items:center}.ag-machine{position:relative;min-height:360px;border:1px solid var(--ag-border);border-radius:44px;background:linear-gradient(160deg,rgba(255,255,255,.38),transparent 42%),linear-gradient(180deg,var(--ag-sky),transparent 36%),var(--ag-surface);box-shadow:var(--ag-shadow);display:grid;place-items:center;isolation:isolate}.ag-machine:before{content:"";position:absolute;width:42%;aspect-ratio:1;top:22px;right:28px;border-radius:999px;background:rgba(47,122,79,.12);filter:blur(8px);z-index:-1}.ag-machine:after{content:"";position:absolute;inset:18px;border:1px solid rgba(255,255,255,.38);border-radius:32px;pointer-events:none}.ag-machine-top{position:absolute;top:28px;width:44%;height:16px;border-radius:999px;background:var(--ag-primary);opacity:.86}.ag-stickers{position:absolute;top:58px;left:26px;right:26px;display:flex;justify-content:space-between;gap:8px;z-index:2}.ag-stickers span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border:1px solid var(--ag-border);border-radius:999px;background:rgba(255,253,248,.68);color:var(--ag-muted);font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;transform:rotate(-4deg)}.ag-stickers span:nth-child(2){transform:rotate(3deg)}.ag-stickers span:nth-child(3){transform:rotate(-1deg)}.ag-window{width:min(68%,240px);aspect-ratio:1;border-radius:999px;border:1px solid var(--ag-border);background:linear-gradient(145deg,rgba(255,255,255,.72),transparent 45%),radial-gradient(circle at 46% 28%,rgba(255,240,168,.8),transparent 9%),linear-gradient(180deg,var(--ag-sky) 0 42%,var(--ag-mountain) 42% 62%,var(--ag-surface-2) 62% 100%);display:grid;place-items:center;box-shadow:inset 0 8px 24px rgba(38,75,45,.08)}.ag-capsule{position:relative;z-index:2;width:92px;aspect-ratio:1.35;border-radius:999px;border:1px solid rgba(38,75,45,.16);background:linear-gradient(90deg,var(--ag-primary) 0 50%,#d8ecbf 50% 100%);box-shadow:0 10px 30px rgba(38,75,45,.18);transition:transform 700ms var(--ag-ease),background 240ms var(--ag-ease)}.ag-capsule:after{content:"";position:absolute;inset:14px 32px;border-radius:999px;background:rgba(255,255,255,.32);filter:blur(1px)}.ag-widget.is-revealing .ag-capsule{animation:ag-shake 950ms var(--ag-ease) 3}.ag-landscape{position:absolute;left:34px;right:34px;bottom:74px;height:54px;opacity:.72;pointer-events:none}.ag-landscape span{position:absolute;bottom:0;width:86px;height:54px;background:var(--ag-mountain);clip-path:polygon(50% 0,100% 100%,0 100%)}.ag-landscape span:nth-child(1){left:4%;transform:scale(1.1)}.ag-landscape span:nth-child(2){left:32%;transform:scale(.84);opacity:.72}.ag-landscape span:nth-child(3){right:2%;transform:scale(1.28);opacity:.82}.ag-slot{position:absolute;bottom:42px;width:42%;height:14px;border-radius:999px;background:rgba(23,32,24,.2)}.ag-slot:after{content:"souvenirs";position:absolute;top:18px;left:50%;transform:translateX(-50%);color:var(--ag-muted);font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ag-copy{min-width:0}.ag-kicker,.ag-date{margin:0;color:var(--ag-muted);font-size:clamp(.75rem,.7rem + .25vw,.875rem);letter-spacing:.08em;text-transform:uppercase;font-weight:700}.ag-copy h1{margin:8px 0 14px;font-family:"Boska",Georgia,serif;font-size:clamp(2.1rem,1.15rem + 4vw,4.6rem);line-height:.95;letter-spacing:-.04em;font-weight:700}.ag-intro{margin:0 0 24px;max-width:34rem;color:var(--ag-muted);font-size:clamp(1rem,.95rem + .25vw,1.125rem);line-height:1.6}.ag-button,.ag-secondary{min-height:44px;border:1px solid transparent;border-radius:999px;padding:0 20px;font-weight:700;transition:transform 180ms var(--ag-ease),background 180ms var(--ag-ease),border-color 180ms var(--ag-ease),color 180ms var(--ag-ease),box-shadow 180ms var(--ag-ease)}.ag-button{background:var(--ag-primary);color:#fffdf8;box-shadow:0 12px 28px rgba(47,122,79,.25)}.ag-button:hover,.ag-secondary:hover{transform:translateY(-1px)}.ag-button:active,.ag-secondary:active{transform:translateY(0)}.ag-button[disabled]{opacity:.72;cursor:wait}.ag-button[disabled] span:after{content:"...";display:inline-block;width:1.2em;text-align:left}.ag-result{margin-top:24px;padding:clamp(18px,3vw,28px);border:1px solid var(--ag-border);border-radius:var(--ag-radius-lg);background:rgba(255,253,248,.72);box-shadow:0 14px 40px rgba(38,75,45,.1);animation:ag-enter 420ms var(--ag-ease)}@media (prefers-color-scheme:dark){.ag-result{background:rgba(23,32,23,.78)}}.ag-result-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:14px}.ag-badge{display:inline-flex;align-items:center;min-height:30px;padding:0 12px;border-radius:999px;background:var(--ag-surface-2);color:var(--ag-primary-dark);font-size:.8rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.ag-result h2{margin:0 0 10px;font-size:clamp(1.25rem,1rem + 1vw,1.75rem);line-height:1.1;letter-spacing:-.02em}.ag-result p{margin:0;color:var(--ag-muted);line-height:1.6}.ag-photo{margin:18px 0 0;overflow:hidden;border-radius:var(--ag-radius-md);border:1px solid var(--ag-border);background:var(--ag-surface-2)}.ag-photo img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}.ag-photo figcaption{padding:12px 14px;color:var(--ag-muted);font-size:.92rem}.ag-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.ag-secondary{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:var(--ag-primary-dark);border-color:var(--ag-border);text-decoration:none}.ag-rules{margin-top:18px;color:var(--ag-muted);font-size:.95rem}.ag-rules summary{min-height:44px;display:inline-flex;align-items:center;cursor:pointer;color:var(--ag-text);font-weight:700}.ag-rules p{margin:0 0 10px}.ag-rules ul{margin:0;padding-left:18px;columns:2}.ag-rules li{break-inside:avoid;margin-bottom:4px}.ag-widget[data-tone=quiet] .ag-badge{color:var(--ag-muted)}.ag-widget[data-tone=quest] .ag-badge{color:var(--ag-blue)}.ag-widget[data-tone=warm] .ag-badge{color:var(--ag-gold)}.ag-widget[data-tone=cursed] .ag-badge{color:var(--ag-primary-dark);background:rgba(47,122,79,.12)}.ag-widget[data-tone=rare] .ag-badge,.ag-widget[data-tone=photo] .ag-badge{color:var(--ag-green)}.ag-widget[data-tone=jackpot] .ag-badge{color:var(--ag-gold);background:rgba(185,120,46,.16)}.ag-error{padding:24px;border:1px solid var(--ag-border);border-radius:18px;background:var(--ag-surface);color:var(--ag-text)}@keyframes ag-shake{0%,100%{transform:rotate(0deg) translateY(0)}18%{transform:rotate(-8deg) translateY(-6px)}38%{transform:rotate(9deg) translateY(3px)}58%{transform:rotate(-5deg) translateY(-2px)}78%{transform:rotate(4deg) translateY(1px)}}@keyframes ag-enter{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}@media (max-width:760px){.ag-shell{grid-template-columns:1fr}.ag-machine{min-height:260px}.ag-rules ul{columns:1}}@media (prefers-reduced-motion:reduce){.ag-widget *,.ag-widget *:before,.ag-widget *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
    `;
    document.head.appendChild(style);
  }

  init();
})();

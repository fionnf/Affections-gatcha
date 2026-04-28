(function () {
  const script = document.currentScript;
  const mountSelector = script?.dataset.mount || "#affektions-gacha";
  const baseUrl = script?.dataset.configBase || "";
  const mount = document.querySelector(mountSelector) || createMount();

  const STORAGE_KEY = "affektions-gacha:history:v1";

  // ── Streak helpers ──────────────────────────────────────────────────────────

  /** Count consecutive days ending at today (or yesterday if today not yet pulled) */
  function computeStreak() {
    const history = readHistory();
    if (!history.length) return 0;
    const tz = state.theme?.timezone || "UTC";
    const today = dateKeyInTimezone(tz);
    const pulledDays = new Set(history.map((e) => e.day));

    const [y, m, d] = today.split("-").map(Number);
    let cur = new Date(Date.UTC(y, m - 1, d));

    // If today hasn't been pulled yet, start counting from yesterday
    let dayKey = today;
    if (!pulledDays.has(dayKey)) {
      cur.setUTCDate(cur.getUTCDate() - 1);
      dayKey = cur.toISOString().slice(0, 10);
    }

    let streak = 0;
    while (pulledDays.has(dayKey)) {
      streak++;
      cur.setUTCDate(cur.getUTCDate() - 1);
      dayKey = cur.toISOString().slice(0, 10);
    }
    return streak;
  }

  /**
   * Returns { emoji, label, tier } for a given streak length, or null for streak < 1.
   * tier 0 = no bonus (1–4 days), 1 = small bonus (5–9), 2 = strong bonus (10–19), 3 = max bonus (20+)
   */
  function streakInfo(streak) {
    if (streak <= 0) return null;
    const tagWord = streak === 1 ? "Tag" : "Tage";
    if (streak >= 20) return { emoji: "💎", label: `${streak} ${tagWord}`, tier: 3 };
    if (streak >= 10) return { emoji: "🔥", label: `${streak} ${tagWord}`, tier: 2 };
    if (streak >= 5)  return { emoji: "✨", label: `${streak} ${tagWord}`, tier: 1 };
    return { emoji: "🌱", label: `${streak} ${tagWord}`, tier: 0 };
  }

  /**
   * Return a copy of state.outcomes.categories with weights boosted at streak milestones.
   * Better outcomes (rare, jackpot, uncommon) gain weight; niete loses weight.
   */
  function boostedCategories(streak) {
    if (streak < 5) return state.outcomes.categories;
    const boosts = streak >= 20
      ? { niete: 0.4, jackpot: 2.0, rare: 1.5, uncommon: 1.3 }
      : streak >= 10
      ? { niete: 0.6, jackpot: 1.5, rare: 1.3, uncommon: 1.2 }
      : { niete: 0.8, jackpot: 1.2, rare: 1.15, uncommon: 1.1 };
    return state.outcomes.categories.map((cat) => ({
      ...cat,
      weight: Math.max(1, Math.round(cat.weight * (boosts[cat.id] || 1)))
    }));
  }

  function pickWeightedWithStreak(seedText, streak) {
    const cats = boostedCategories(streak);
    const total = cats.reduce((sum, cat) => sum + cat.weight, 0);
    const roll = Math.floor(seededRandom(seedText) * total);
    let cursor = 0;
    for (const cat of cats) {
      cursor += cat.weight;
      if (roll < cursor) {
        return state.outcomes.categories.find((c) => c.id === cat.id) || cat;
      }
    }
    return state.outcomes.categories[state.outcomes.categories.length - 1];
  }

  function renderStreak() {
    const el = $("[data-ag-streak]");
    if (!el) return;
    const streak = computeStreak();
    const info = streakInfo(streak);
    if (!info) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent = `${info.emoji} ${info.label}`;
    el.dataset.agStreakTier = info.tier;
  }

  // ─────────────────────────────────────────────────────────────────────────

  const state = {
    theme: null,
    outcomes: null,
    photos: null,
    specialDays: null,
    todaysPull: null,
    activeTab: "today",
    revealed: false
  };

  const defaultPhotos = { photos: [] };

  function createMount() {
    const element = document.createElement("section");
    element.id = "affektions-gacha";
    document.body.appendChild(element);
    return element;
  }

  function resolveBase() {
    if (!baseUrl) return window.location.href;
    try {
      return new URL(baseUrl, window.location.href).toString();
    } catch (_error) {
      return window.location.href;
    }
  }

  function urlFor(file) {
    return new URL(file, resolveBase()).toString();
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
      const [theme, outcomes, photos, specialDays] = await Promise.all([
        fetchJson("config/theme.json"),
        fetchJson("config/outcomes.json"),
        fetchJson("config/photos.json", defaultPhotos),
        fetchJson("config/special-days.json", { days: [] })
      ]);
      state.theme = theme;
      state.outcomes = outcomes;
      state.photos = normalizePhotos(photos);
      state.specialDays = specialDays;
      applyTheme(theme);
      applySpecialDayColors(getPreviewDay() || dateKeyInTimezone(theme.timezone));
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
      type: photo.type === "video" ? "video" : "image",
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

  function sceneSvg() {
    return `
      <svg class="ag-scene" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ag-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-scene-sky-top)"/>
            <stop offset="100%" stop-color="var(--ag-scene-sky-bottom)"/>
          </linearGradient>
          <linearGradient id="ag-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-scene-water-top)"/>
            <stop offset="100%" stop-color="var(--ag-scene-water-bottom)"/>
          </linearGradient>
          <radialGradient id="ag-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,238,180,.95)"/>
            <stop offset="55%" stop-color="rgba(255,215,140,.35)"/>
            <stop offset="100%" stop-color="rgba(255,215,140,0)"/>
          </radialGradient>
          <pattern id="ag-leaf" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M24 6 C 14 14, 14 30, 24 42 C 34 30, 34 14, 24 6 Z" fill="rgba(255,255,255,.04)"/>
            <line x1="24" y1="6" x2="24" y2="42" stroke="rgba(255,255,255,.05)" stroke-width="1"/>
          </pattern>
        </defs>

        <rect width="1200" height="600" fill="url(#ag-sky-grad)"/>
        <circle class="ag-sun" cx="940" cy="150" r="180" fill="url(#ag-sun)"/>

        <g class="ag-mountains">
          <polygon points="-40,360 220,170 360,300 540,180 720,330 880,210 1080,340 1240,260 1240,420 -40,420"
            fill="var(--ag-scene-mountain-far)"/>
          <polygon points="-40,420 160,300 320,400 500,290 660,400 840,310 1020,420 1240,330 1240,520 -40,520"
            fill="var(--ag-scene-mountain-mid)"/>
        </g>

        <g class="ag-forest-back">
          <path d="M-40 460 C 80 420, 160 470, 240 440 C 320 410, 400 470, 500 450 C 620 430, 720 480, 820 450 C 920 420, 1040 470, 1240 450 L 1240 600 L -40 600 Z"
            fill="var(--ag-scene-forest-far)"/>
        </g>

        <g class="ag-water-band">
          <rect x="-40" y="455" width="1280" height="34" fill="url(#ag-water)" opacity=".9"/>
          <path class="ag-shimmer" d="M0 470 Q 60 466 120 470 T 240 470 T 360 470 T 480 470 T 600 470 T 720 470 T 840 470 T 960 470 T 1080 470 T 1200 470"
            stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <path class="ag-shimmer ag-shimmer-2" d="M0 478 Q 80 474 160 478 T 320 478 T 480 478 T 640 478 T 800 478 T 960 478 T 1120 478 T 1280 478"
            stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none" stroke-linecap="round"/>
        </g>

        <g class="ag-city">
          <rect x="780" y="380" width="14" height="80" fill="var(--ag-scene-city)"/>
          <rect x="800" y="360" width="20" height="100" fill="var(--ag-scene-city)"/>
          <polygon points="826,360 836,344 846,360" fill="var(--ag-scene-city)"/>
          <rect x="828" y="360" width="16" height="100" fill="var(--ag-scene-city)"/>
          <rect x="850" y="372" width="18" height="88" fill="var(--ag-scene-city)"/>
          <rect x="872" y="350" width="10" height="110" fill="var(--ag-scene-city)"/>
          <rect x="886" y="370" width="22" height="90" fill="var(--ag-scene-city)"/>
          <rect x="912" y="358" width="14" height="102" fill="var(--ag-scene-city)"/>
          <g fill="rgba(255,236,170,.7)">
            <rect x="803" y="372" width="3" height="3"/>
            <rect x="809" y="382" width="3" height="3"/>
            <rect x="833" y="376" width="3" height="3"/>
            <rect x="855" y="386" width="3" height="3"/>
            <rect x="876" y="362" width="3" height="3"/>
            <rect x="892" y="384" width="3" height="3"/>
            <rect x="916" y="372" width="3" height="3"/>
          </g>
        </g>

        <g class="ag-road">
          <path d="M-20 588 C 200 520, 360 540, 520 510 C 720 472, 880 500, 1240 460"
            stroke="var(--ag-scene-road)" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
          <path class="ag-road-dash" d="M-20 588 C 200 520, 360 540, 520 510 C 720 472, 880 500, 1240 460"
            stroke="rgba(255,253,242,.85)" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-dasharray="10 18"/>
        </g>

        <g class="ag-trees">
          <g transform="translate(80,470)"><polygon points="0,0 18,-44 36,0" fill="var(--ag-scene-tree)"/><polygon points="4,-16 18,-58 32,-16" fill="var(--ag-scene-tree-light)"/><rect x="16" y="0" width="4" height="10" fill="#3a2418"/></g>
          <g transform="translate(150,488)"><polygon points="0,0 14,-32 28,0" fill="var(--ag-scene-tree)"/><rect x="12" y="0" width="4" height="8" fill="#3a2418"/></g>
          <g transform="translate(220,478)"><polygon points="0,0 22,-52 44,0" fill="var(--ag-scene-tree)"/><polygon points="6,-20 22,-66 38,-20" fill="var(--ag-scene-tree-light)"/><rect x="20" y="0" width="4" height="10" fill="#3a2418"/></g>
          <g transform="translate(310,498)"><polygon points="0,0 12,-26 24,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(420,492)"><polygon points="0,0 16,-36 32,0" fill="var(--ag-scene-tree)"/><polygon points="4,-12 16,-46 28,-12" fill="var(--ag-scene-tree-light)"/></g>
          <g transform="translate(560,494)"><polygon points="0,0 12,-28 24,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(640,488)"><polygon points="0,0 18,-42 36,0" fill="var(--ag-scene-tree)"/><polygon points="4,-14 18,-54 32,-14" fill="var(--ag-scene-tree-light)"/></g>
          <g transform="translate(1080,490)"><polygon points="0,0 16,-38 32,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(1140,500)"><polygon points="0,0 12,-26 24,0" fill="var(--ag-scene-tree)"/></g>
        </g>

        <g class="ag-baerlauch">
          <g transform="translate(60,548)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(380,558)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(720,562)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(990,556)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(160,572)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
          <g transform="translate(540,572)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
          <g transform="translate(880,576)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
        </g>

        <g class="ag-fireflies">
          <circle class="ag-firefly" cx="180" cy="220" r="2.4" fill="rgba(255,236,170,.95)"/>
          <circle class="ag-firefly ag-firefly-2" cx="430" cy="170" r="1.8" fill="rgba(255,236,170,.85)"/>
          <circle class="ag-firefly ag-firefly-3" cx="720" cy="240" r="2.2" fill="rgba(255,236,170,.9)"/>
          <circle class="ag-firefly ag-firefly-4" cx="980" cy="200" r="1.6" fill="rgba(255,236,170,.8)"/>
          <circle class="ag-firefly ag-firefly-5" cx="320" cy="310" r="1.6" fill="rgba(255,236,170,.7)"/>
          <circle class="ag-firefly ag-firefly-6" cx="610" cy="320" r="1.4" fill="rgba(255,236,170,.7)"/>
        </g>

        <rect width="1200" height="600" fill="url(#ag-leaf)"/>
      </svg>
    `;
  }

  function machineSvg() {
    return `
      <svg class="ag-machine-svg" viewBox="0 0 280 320" aria-hidden="true">
        <defs>
          <linearGradient id="ag-mach-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-mach-top)"/>
            <stop offset="100%" stop-color="var(--ag-mach-bottom)"/>
          </linearGradient>
          <radialGradient id="ag-mach-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="rgba(255,236,170,.9)"/>
            <stop offset="55%" stop-color="rgba(255,236,170,.18)"/>
            <stop offset="100%" stop-color="rgba(255,236,170,0)"/>
          </radialGradient>
          <linearGradient id="ag-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,.32)"/>
            <stop offset="50%" stop-color="rgba(255,255,255,.06)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,.18)"/>
          </linearGradient>
        </defs>
        <rect x="20" y="14" width="240" height="292" rx="36" fill="url(#ag-mach-body)" stroke="rgba(255,255,255,.16)"/>
        <circle class="ag-mach-glow" cx="140" cy="148" r="120" fill="url(#ag-mach-glow)"/>
        <circle cx="140" cy="148" r="86" fill="rgba(8,28,18,.65)" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
        <path d="M62 152 a78 78 0 0 1 156 0" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="2"/>
        <g class="ag-mach-orbit">
          <circle cx="140" cy="62" r="3" fill="rgba(255,236,170,.95)"/>
          <circle cx="218" cy="148" r="2.4" fill="rgba(255,236,170,.7)"/>
          <circle cx="140" cy="234" r="2" fill="rgba(255,236,170,.6)"/>
          <circle cx="62" cy="148" r="2.4" fill="rgba(255,236,170,.7)"/>
        </g>
        <ellipse cx="140" cy="148" rx="34" ry="46" fill="url(#ag-glass)" opacity=".85"/>
        <rect x="64" y="266" width="152" height="20" rx="10" fill="rgba(8,28,18,.55)"/>
      </svg>
    `;
  }

  function renderShell() {
    mount.className = "ag-widget";
    mount.setAttribute("aria-labelledby", "ag-title");
    mount.innerHTML = `
      <div class="ag-frame">
        <div class="ag-stage">
          ${sceneSvg()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${machineSvg()}
                <div class="ag-machine-capsule" data-capsule>
                  <span class="ag-capsule-shine"></span>
                </div>
                <div class="ag-orbit">
                  <span></span><span></span><span></span><span></span>
                </div>
                <div class="ag-emoji-orbit" data-ag-emoji-orbit aria-hidden="true"></div>
              </div>
              <div class="ag-copy">
                <p class="ag-kicker" data-ag-kicker>Einmal pro Tag</p>
                <h1 id="ag-title" data-ag-main-title>Affektions-Gacha</h1>
                <p class="ag-intro" data-ag-intro></p>
                <ul class="ag-chips" data-ag-chips></ul>
                <div class="ag-tabs" role="tablist" aria-label="Ansicht wählen">
                  <button class="ag-tab is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today">Heute</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="history">Verlauf</button>
                </div>
              </div>
            </header>
          </div>
        </div>

        <div class="ag-content">
          <section class="ag-panel" data-ag-panel-today role="tabpanel">
            <div class="ag-card ag-draw-card">
              <div class="ag-draw-meta">
                <span class="ag-pill" data-ag-today-pill>Heute</span>
                <span class="ag-streak" data-ag-streak hidden></span>
                <span class="ag-draw-hint" data-ag-draw-hint></span>
              </div>
              <button class="ag-button" type="button" data-ag-draw>
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span data-ag-button-text>Kapsel ziehen</span>
              </button>
            </div>

            <article class="ag-card ag-result" data-ag-result aria-live="polite" hidden>
              <div class="ag-result-head">
                <span class="ag-badge" data-ag-rarity></span>
                <span class="ag-date" data-ag-date></span>
              </div>
              <h2 data-ag-title></h2>
              <p data-ag-message></p>
              <figure class="ag-photo" data-ag-photo-wrap hidden>
                <div class="ag-media-stage" data-ag-photo-media></div>
                <figcaption data-ag-photo-caption hidden></figcaption>
              </figure>
              <div class="ag-actions">
                <button class="ag-secondary" type="button" data-ag-copy>Resultat kopieren</button>
                <a class="ag-secondary ag-link" data-ag-send href="#" rel="noopener">An Fionn schicken</a>
              </div>
            </article>

            <details class="ag-card ag-rules">
              <summary data-ag-rules-title>Maschinenregeln</summary>
              <p data-ag-rules-text></p>
              <ul data-ag-odds></ul>
            </details>
          </section>

          <section class="ag-panel" data-ag-panel-history role="tabpanel" hidden>
            <div class="ag-card">
              <p class="ag-history-note" data-ag-history-note></p>
              <ol class="ag-history" data-ag-history></ol>
              <p class="ag-history-empty" data-ag-history-empty hidden></p>
            </div>
          </section>
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

  function defaultChips() {
    return ["Wald", "Velo", "Stadt", "Bärlauch"];
  }

  // Always-on emojis (bike + garlic) plus a deterministic selection from the
  // curated pool below — picked per day+token so the constellation refreshes
  // daily but is stable across reloads on the same day.
  const REQUIRED_EMOJIS = ["🚴", "🧄"];
  const EMOJI_POOL = [
    "🥾", "🌲", "🧗‍♂️", "✨",
    "📚", "💭", "🌙", "☕",
    "🔥", "💛", "🫶", "🌿",
    "🎿", "❄️", "😄", "🎶",
    "🌊", "🚤", "🍃", "🌍",
    "💌", "🥹", "🌈", "🕊️",
    "😏", "💫", "🧠", "⚡",
    "🍝", "🍷", "😋", "🌆",
    "🎧", "🎵", "💃", "🪩",
    "🌄", "🧭", "🚶‍♂️", "🍂",
    "💬", "👀", "🤍", "🔐",
    "🏔️", "🪨", "💪", "🌤️",
    "😂", "🤭", "🎯", "💥",
    "🛤️", "🌌", "🕯️", "📖",
    "❤️‍🔥", "😇", "😈",
    "🍓", "🍫", "😚",
    "🫂", "🌻", "🌞",
    "🐻", "🛌",
    "🎻", "👨‍❤️‍👨"
  ];

  function emojiSeedKey() {
    const day = dateKeyInTimezone(state.theme.timezone);
    const token = getToken();
    return `${state.theme.secret}|${token}|${day}|emoji`;
  }

  // Pick 3-5 distinct emojis from EMOJI_POOL deterministically, then prepend
  // the always-on bike + garlic. Result: 5-7 total floating accents.
  function pickEmojiSet() {
    const seedBase = emojiSeedKey();
    const count = 3 + Math.floor(seededRandom(`${seedBase}|count`) * 3); // 3..5
    const pool = EMOJI_POOL.slice();
    const chosen = [];
    for (let i = 0; i < count && pool.length; i += 1) {
      const idx = Math.floor(seededRandom(`${seedBase}|pick|${i}`) * pool.length);
      chosen.push(pool.splice(idx, 1)[0]);
    }
    return [...REQUIRED_EMOJIS, ...chosen];
  }

  function renderEmojiOrbit() {
    const orbit = $("[data-ag-emoji-orbit]");
    if (!orbit) return;
    orbit.innerHTML = "";
    const emojis = pickEmojiSet();
    const total = emojis.length;
    const seedBase = emojiSeedKey();
    emojis.forEach((emoji, i) => {
      const span = document.createElement("span");
      span.className = "ag-emoji";
      span.textContent = emoji;
      // Distribute around the circle, with a small deterministic jitter so
      // the constellation doesn't look like a perfect compass rose.
      const baseAngle = (360 / total) * i;
      const jitter = (seededRandom(`${seedBase}|angle|${i}`) - 0.5) * 28;
      const angle = baseAngle + jitter;
      const radiusJitter = seededRandom(`${seedBase}|radius|${i}`) * 21 - 10.5;
      const duration = 16 + seededRandom(`${seedBase}|dur|${i}`) * 10; // 16..26s
      const delay = -seededRandom(`${seedBase}|delay|${i}`) * duration;
      const direction = seededRandom(`${seedBase}|dir|${i}`) > 0.5 ? 1 : -1;
      span.style.setProperty("--ag-emoji-angle", `${angle}deg`);
      span.style.setProperty("--ag-emoji-radius", `${250 + radiusJitter}%`);
      span.style.setProperty("--ag-emoji-duration", `${duration.toFixed(2)}s`);
      span.style.setProperty("--ag-emoji-delay", `${delay.toFixed(2)}s`);
      span.style.setProperty("--ag-emoji-direction", direction === 1 ? "normal" : "reverse");
      orbit.appendChild(span);
    });
  }

  // Map a tone to a complementary emoji used in messages sent to Fionn.
  // Falls back to ❤️ if tone is missing/unknown.
  function emojiForTone(tone) {
    const map = {
      quiet: "🌙",
      soft: "🌿",
      quest: "🧭",
      warm: "✨",
      cursed: "😈",
      rare: "💫",
      photo: "📸",
      jackpot: "🎰"
    };
    return map[tone] || "❤️";
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
    $("[data-ag-today-pill]").textContent = formatToday();
    $("[data-ag-draw-hint]").textContent = "Eine Kapsel · ein Tag · ein Souvenir.";

    const chips = $("[data-ag-chips]");
    chips.innerHTML = "";
    const chipList = (Array.isArray(state.theme.stickers) && state.theme.stickers.length)
      ? state.theme.stickers
      : defaultChips();
    for (const chip of chipList) {
      const li = document.createElement("li");
      li.textContent = chip;
      chips.appendChild(li);
    }

    renderEmojiOrbit();
    renderStreak();
  }

  function formatToday() {
    try {
      const date = new Date();
      return new Intl.DateTimeFormat("de-CH", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        timeZone: state.theme.timezone
      }).format(date);
    } catch (error) {
      return dateKeyInTimezone(state.theme.timezone);
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

  const COLOR_VAR_MAP = {
    background: "--ag-bg",
    surface: "--ag-surface",
    surfaceAlt: "--ag-surface-2",
    text: "--ag-text",
    muted: "--ag-muted",
    border: "--ag-border",
    primary: "--ag-primary",
    primaryDark: "--ag-primary-dark",
    gold: "--ag-gold",
    green: "--ag-green",
    blue: "--ag-blue",
    sky: "--ag-sky",
    mountain: "--ag-mountain"
  };

  const DARK_COLOR_VAR_MAP = {
    background: "--ag-dark-bg",
    surface: "--ag-dark-surface",
    surfaceAlt: "--ag-dark-surface-2",
    text: "--ag-dark-text",
    muted: "--ag-dark-muted",
    border: "--ag-dark-border",
    primary: "--ag-dark-primary",
    primaryDark: "--ag-dark-primary-dark",
    gold: "--ag-dark-gold",
    green: "--ag-dark-green",
    blue: "--ag-dark-blue",
    sky: "--ag-dark-sky",
    mountain: "--ag-dark-mountain"
  };

  function getPreviewDay() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("preview-day");
    if (!raw) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (/^\d{2}-\d{2}$/.test(raw)) {
      const year = new Date().getFullYear().toString();
      return `${year}-${raw}`;
    }
    return null;
  }

  function checkSpecialDay(day) {
    const days = Array.isArray(state.specialDays && state.specialDays.days) ? state.specialDays.days : [];
    const mmdd = day.slice(5); // "MM-DD" from "YYYY-MM-DD"
    for (const entry of days) {
      if (entry.date === day || entry.date === mmdd) return entry;
    }
    return null;
  }

  function applySpecialDayColors(day) {
    const special = checkSpecialDay(day);
    if (!special) return;
    const set = (name, value) => mount.style.setProperty(name, value);
    if (special.colors && typeof special.colors === "object") {
      for (const [key, value] of Object.entries(special.colors)) {
        if (COLOR_VAR_MAP[key] && typeof value === "string") set(COLOR_VAR_MAP[key], value);
      }
    }
    if (special.darkColors && typeof special.darkColors === "object") {
      for (const [key, value] of Object.entries(special.darkColors)) {
        if (DARK_COLOR_VAR_MAP[key] && typeof value === "string") set(DARK_COLOR_VAR_MAP[key], value);
      }
    }
  }

  function dateKeyInTimezone(timezone, date) {
    const parts = new Intl.DateTimeFormat("de-CH", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date || new Date());
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

  function buildPullForDay(day, streak) {
    const token = getToken();
    const baseSeed = `${state.theme.secret}|${token}|${day}`;

    const special = checkSpecialDay(day);
    if (special) {
      const specialOutcomes = Array.isArray(special.outcomes) && special.outcomes.length
        ? special.outcomes
        : [{ title: special.label, message: "" }];
      const outcome = specialOutcomes[seededIndex(`${baseSeed}|special|outcome`, specialOutcomes.length)];
      const category = {
        id: "special",
        label: special.label,
        weight: 0,
        tone: special.tone || "jackpot",
        outcomes: specialOutcomes
      };
      return { day, token, category, outcome, photo: null };
    }

    let category = pickWeightedWithStreak(`${baseSeed}|category`, streak || 0);

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

  function buildPull() {
    const day = getPreviewDay() || dateKeyInTimezone(state.theme.timezone);
    const streak = computeStreak();
    return buildPullForDay(day, streak);
  }

  function setCapsuleTone(tone) {
    const capsule = $("[data-capsule]");
    if (!capsule) return;
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
    const emoji = emojiForTone(pull.category.tone);
    return [
      `${emoji} ${displayNameFromToken()}s ${state.theme.brand.machineName}: ${pull.category.label}`,
      pull.outcome.title,
      pull.outcome.message,
      pull.photo ? `📸 ${pull.photo.caption || pull.photo.alt || "Foto-Drop"}` : "",
      `Tag: ${pull.day}`
    ]
      .filter(Boolean)
      .join("\n");
  }

  function renderMediaInto(container, photo) {
    container.innerHTML = "";
    if (!photo) return;
    const altText = photo.alt || "Foto von uns";
    const stage = document.createElement("div");
    stage.className = "ag-media-frame";

    const backdrop = document.createElement("div");
    backdrop.className = "ag-media-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    if (photo.type !== "video") {
      backdrop.style.backgroundImage = `url("${photo.url}")`;
    }
    stage.appendChild(backdrop);

    let mediaEl;
    if (photo.type === "video") {
      mediaEl = document.createElement("video");
      mediaEl.src = photo.url;
      mediaEl.controls = true;
      mediaEl.muted = true;
      mediaEl.playsInline = true;
      mediaEl.setAttribute("playsinline", "");
      mediaEl.setAttribute("preload", "metadata");
      mediaEl.setAttribute("aria-label", altText);
    } else {
      mediaEl = document.createElement("img");
      mediaEl.src = photo.url;
      mediaEl.alt = altText;
      mediaEl.loading = "lazy";
      mediaEl.decoding = "async";
      mediaEl.addEventListener("load", () => {
        const ratio = mediaEl.naturalWidth && mediaEl.naturalHeight
          ? mediaEl.naturalWidth / mediaEl.naturalHeight
          : 1;
        stage.dataset.orientation = ratio < 0.95 ? "portrait" : ratio > 1.15 ? "landscape" : "square";
      }, { once: true });
    }
    mediaEl.className = "ag-media-content";
    stage.appendChild(mediaEl);

    container.appendChild(stage);
  }

  function renderPull(pull) {
    mount.dataset.tone = pull.category.tone;
    setCapsuleTone(pull.category.tone);
    $("[data-ag-rarity]").textContent = pull.category.label;
    $("[data-ag-date]").textContent = pull.day;
    $("[data-ag-title]").textContent = pull.outcome.title;
    $("[data-ag-message]").textContent = pull.outcome.message;

    const photoWrap = $("[data-ag-photo-wrap]");
    const photoMedia = $("[data-ag-photo-media]");
    const photoCaption = $("[data-ag-photo-caption]");

    if (pull.photo) {
      renderMediaInto(photoMedia, pull.photo);
      const caption = (pull.photo.caption || "").trim();
      if (caption) {
        photoCaption.textContent = caption;
        photoCaption.hidden = false;
      } else {
        photoCaption.textContent = "";
        photoCaption.hidden = true;
      }
      photoWrap.hidden = false;
    } else {
      photoMedia.innerHTML = "";
      photoCaption.textContent = "";
      photoCaption.hidden = true;
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

  function readHistory() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return [];
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((entry) =>
        entry && typeof entry.day === "string" && typeof entry.token === "string"
      );
    } catch (error) {
      return [];
    }
  }

  function writeHistory(entries) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      /* localStorage unavailable or full — ignore */
    }
  }

  function recordHistoryEntry(pull) {
    if (!pull) return;
    const entry = {
      day: pull.day,
      token: pull.token,
      categoryId: pull.category.id,
      categoryLabel: pull.category.label,
      tone: pull.category.tone,
      title: pull.outcome.title,
      message: pull.outcome.message,
      photo: pull.photo
        ? {
            url: pull.photo.url,
            alt: pull.photo.alt || "",
            caption: (pull.photo.caption || "").trim(),
            type: pull.photo.type === "video" ? "video" : "image"
          }
        : null,
      revealedAt: Date.now()
    };
    const existing = readHistory();
    const seen = new Set();
    const merged = [entry, ...existing].filter((item) => {
      if (!item || typeof item.day !== "string" || typeof item.token !== "string") return false;
      const key = `${item.day}|${item.token}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    merged.sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
    const cap = Number.isInteger(state.theme.historyDays) ? Math.max(1, state.theme.historyDays) : 14;
    writeHistory(merged.slice(0, Math.max(cap, 1)));
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

    // Speed up emoji orbits with an increasing rate during the reveal
    const revealDuration = state.theme.revealDelayMs || 3200;
    const emojiSpans = Array.from(($("[data-ag-emoji-orbit]") || { children: [] }).children);
    const originalDurations = emojiSpans.map(
      (span) => parseFloat(span.style.getPropertyValue("--ag-emoji-duration")) || 20
    );
    const startTime = performance.now();
    let rafId;
    function rampEmojis(now) {
      const progress = Math.min((now - startTime) / revealDuration, 1);
      // Quadratic ramp: starts at 1× speed, reaches ~6× by the end
      const speedMultiplier = 1 + 5 * progress * progress;
      emojiSpans.forEach((span, i) => {
        span.style.setProperty("--ag-emoji-duration", `${(originalDurations[i] / speedMultiplier).toFixed(3)}s`);
      });
      if (progress < 1) rafId = requestAnimationFrame(rampEmojis);
    }
    rafId = requestAnimationFrame(rampEmojis);

    window.setTimeout(() => {
      window.clearInterval(stepTimer);
      cancelAnimationFrame(rafId);
      emojiSpans.forEach((span, i) => {
        span.style.setProperty("--ag-emoji-duration", `${originalDurations[i].toFixed(2)}s`);
      });
      renderPull(state.todaysPull);
      mount.classList.remove("is-revealing");
      mount.classList.add("is-revealed");
      button.disabled = false;
      buttonText.textContent = state.theme.brand.buttonShown;
      state.revealed = true;
      recordHistoryEntry(state.todaysPull);
      renderStreak();
      if (state.activeTab === "history") renderHistory();
    }, state.theme.revealDelayMs || 3200);
  }

  function renderOdds() {
    const oddsList = $("[data-ag-odds]");
    oddsList.innerHTML = "";
    const streak = computeStreak();
    const cats = boostedCategories(streak);
    const total = cats.reduce((sum, cat) => sum + cat.weight, 0);
    for (const cat of cats) {
      const li = document.createElement("li");
      li.textContent = `${cat.label}: ${(cat.weight / total * 100).toFixed(1)} %`;
      oddsList.appendChild(li);
    }
    if (streak >= 5) {
      const info = streakInfo(streak);
      const li = document.createElement("li");
      li.textContent = `${info.emoji} Streak-Bonus aktiv (${streak} ${streak === 1 ? "Tag" : "Tage"} am Stück)`;
      li.style.fontWeight = "800";
      oddsList.appendChild(li);
    }
  }

  function formatHistoryDate(dayKey) {
    const [y, m, d] = dayKey.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    try {
      return new Intl.DateTimeFormat("de-CH", {
        weekday: "short",
        day: "2-digit",
        month: "short"
      }).format(date);
    } catch (error) {
      return dayKey;
    }
  }

  function renderHistory() {
    const list = $("[data-ag-history]");
    const empty = $("[data-ag-history-empty]");
    const note = $("[data-ag-history-note]");
    list.innerHTML = "";

    const cap = Number.isInteger(state.theme.historyDays) ? Math.max(1, state.theme.historyDays) : 14;
    const entries = readHistory()
      .slice()
      .sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0))
      .slice(0, cap);

    note.textContent =
      `Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst. Bis zu ${cap} Tage.`;

    if (!entries.length) {
      empty.hidden = false;
      empty.textContent =
        "Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.";
      return;
    }
    empty.hidden = true;

    for (const entry of entries) {
      const li = document.createElement("li");
      li.className = "ag-history-item";
      li.dataset.tone = entry.tone || "soft";

      const head = document.createElement("div");
      head.className = "ag-history-head";
      const date = document.createElement("span");
      date.className = "ag-history-date";
      date.textContent = formatHistoryDate(entry.day);
      const badge = document.createElement("span");
      badge.className = "ag-history-badge";
      badge.textContent = entry.categoryLabel || "Kapsel";
      head.appendChild(date);
      head.appendChild(badge);

      const title = document.createElement("p");
      title.className = "ag-history-title";
      title.textContent = entry.title || "";

      const message = document.createElement("p");
      message.className = "ag-history-message";
      message.textContent = entry.message || "";

      li.appendChild(head);

      if (entry.photo) {
        const body = document.createElement("div");
        body.className = "ag-history-body";

        const thumb = document.createElement("div");
        thumb.className = "ag-history-thumb";
        if (entry.photo.type === "video") {
          thumb.classList.add("is-video");
          const icon = document.createElement("span");
          icon.className = "ag-history-video-icon";
          icon.textContent = "▶";
          icon.setAttribute("aria-hidden", "true");
          thumb.appendChild(icon);
          const label = document.createElement("span");
          label.className = "ag-history-video-label";
          label.textContent = "Video";
          thumb.appendChild(label);
        } else {
          const img = document.createElement("img");
          img.src = entry.photo.url;
          img.alt = entry.photo.alt || "Foto-Drop";
          img.loading = "lazy";
          img.decoding = "async";
          thumb.appendChild(img);
        }

        const text = document.createElement("div");
        text.className = "ag-history-text";
        text.appendChild(title);
        text.appendChild(message);

        body.appendChild(thumb);
        body.appendChild(text);
        li.appendChild(body);
      } else {
        li.appendChild(title);
        li.appendChild(message);
      }

      list.appendChild(li);
    }
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    const tabs = mount.querySelectorAll("[data-ag-tab]");
    tabs.forEach((node) => {
      const isActive = node.dataset.agTab === tab;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    $("[data-ag-panel-today]").hidden = tab !== "today";
    $("[data-ag-panel-history]").hidden = tab !== "history";
    if (tab === "history") renderHistory();
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
    mount.querySelectorAll("[data-ag-tab]").forEach((node) => {
      node.addEventListener("click", () => setActiveTab(node.dataset.agTab));
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
      .ag-widget,.ag-widget *{box-sizing:border-box}
      .ag-widget [hidden]{display:none!important}
      .ag-widget{
        --ag-shadow:0 24px 60px rgba(8,28,18,.32);
        --ag-shadow-soft:0 12px 32px rgba(8,28,18,.18);
        --ag-radius-lg:28px;
        --ag-radius-md:18px;
        --ag-radius-sm:12px;
        --ag-ease:cubic-bezier(.16,1,.3,1);
        --ag-scene-sky-top:#1a3a2c;
        --ag-scene-sky-bottom:#0e2419;
        --ag-scene-mountain-far:#1d3a2c;
        --ag-scene-mountain-mid:#13291f;
        --ag-scene-forest-far:#0c2118;
        --ag-scene-water-top:#3b6e58;
        --ag-scene-water-bottom:#1f4633;
        --ag-scene-tree:#0a1c14;
        --ag-scene-tree-light:#16382a;
        --ag-scene-leaf:#3e8a55;
        --ag-scene-leaf-light:#6dbf80;
        --ag-scene-road:#2d4a3a;
        --ag-scene-city:#12291f;
        --ag-mach-top:#102b1f;
        --ag-mach-bottom:#06150f;
        color:var(--ag-text);
        font-family:"Satoshi","Inter",system-ui,sans-serif;
        line-height:1.5;
        display:block;
      }

      /* Outer frame: centers the widget on the page with breathing room.
         Webflow embeds may already constrain width — the inner clamp keeps
         this widget from spanning edge-to-edge even on a full-bleed section. */
      .ag-frame{
        width:100%;
        max-width:1120px;
        margin-inline:auto;
        padding:clamp(12px,2.4vw,28px) clamp(12px,3vw,32px);
        display:flex;
        flex-direction:column;
        gap:clamp(16px,2.4vw,28px);
      }
      @media (prefers-color-scheme:dark){
        .ag-widget{
          --ag-bg:var(--ag-dark-bg)!important;
          --ag-surface:var(--ag-dark-surface)!important;
          --ag-surface-2:var(--ag-dark-surface-2)!important;
          --ag-text:var(--ag-dark-text)!important;
          --ag-muted:var(--ag-dark-muted)!important;
          --ag-border:var(--ag-dark-border)!important;
          --ag-primary:var(--ag-dark-primary)!important;
          --ag-primary-dark:var(--ag-dark-primary-dark)!important;
          --ag-gold:var(--ag-dark-gold)!important;
          --ag-green:var(--ag-dark-green)!important;
          --ag-blue:var(--ag-dark-blue)!important;
          --ag-sky:var(--ag-dark-sky)!important;
          --ag-mountain:var(--ag-dark-mountain)!important;
        }
      }

      .ag-stage{
        position:relative;
        border-radius:var(--ag-radius-lg);
        overflow:hidden;
        background:var(--ag-scene-sky-bottom);
        isolation:isolate;
        box-shadow:var(--ag-shadow);
      }
      .ag-scene{
        position:absolute;inset:0;width:100%;height:100%;
        z-index:0;
        display:block;
      }
      .ag-stage-veil{
        position:absolute;inset:0;z-index:1;pointer-events:none;
        background:
          radial-gradient(circle at 20% 12%, rgba(255,236,170,.18), transparent 36%),
          radial-gradient(circle at 80% 90%, rgba(8,28,18,.7), transparent 60%),
          linear-gradient(180deg, rgba(8,28,18,.05) 0%, rgba(8,28,18,.55) 70%, rgba(8,28,18,.85) 100%);
      }
      .ag-shell{
        position:relative;z-index:2;
        padding:clamp(20px,4vw,44px);
      }

      /* Cards live outside the dark stage now, so they sit on the page itself
         with breathing room and rounded edges instead of forming an
         edge-to-edge dark band under the hero. */
      .ag-content{
        display:grid;
        gap:clamp(14px,2vw,18px);
      }

      .ag-hero{
        display:grid;
        grid-template-columns:minmax(220px,.85fr) minmax(0,1.15fr);
        gap:clamp(20px,3.2vw,40px);
        align-items:center;
      }
      @media (max-width:760px){
        .ag-hero{grid-template-columns:1fr;text-align:left}
      }

      .ag-machine-wrap{
        position:relative;
        width:100%;
        max-width:340px;
        margin:0 auto;
        aspect-ratio:280/320;
        filter:drop-shadow(0 24px 40px rgba(0,0,0,.45));
      }
      .ag-machine-svg{width:100%;height:100%;display:block}
      .ag-mach-glow{transform-origin:140px 148px;animation:ag-pulse 4.4s ease-in-out infinite}
      .ag-widget.is-revealing .ag-mach-glow{animation-duration:1.2s}
      .ag-mach-orbit{transform-origin:140px 148px;animation:ag-spin 22s linear infinite}
      .ag-widget.is-revealing .ag-mach-orbit{animation-duration:5s}

      .ag-machine-capsule{
        position:absolute;
        left:50%;top:46%;transform:translate(-50%,-50%);
        width:22%;aspect-ratio:1.35;border-radius:999px;
        background:linear-gradient(90deg,var(--ag-primary) 0 50%,#d8ecbf 50% 100%);
        box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 24px rgba(255,236,170,.18);
        animation:ag-float 5.5s ease-in-out infinite;
      }
      .ag-capsule-shine{
        position:absolute;inset:14% 28%;border-radius:999px;
        background:rgba(255,255,255,.45);filter:blur(2px);
      }
      .ag-widget.is-revealing .ag-machine-capsule{animation:ag-shake 950ms var(--ag-ease) 3}
      .ag-widget.is-revealed .ag-machine-capsule{animation:ag-pop 700ms var(--ag-ease) both}

      .ag-orbit{position:absolute;inset:0;pointer-events:none}
      .ag-orbit span{
        position:absolute;width:6px;height:6px;border-radius:999px;
        background:rgba(255,236,170,.85);
        box-shadow:0 0 12px rgba(255,236,170,.85);
      }
      .ag-orbit span:nth-child(1){left:50%;top:8%;animation:ag-orbit-1 7s linear infinite}
      .ag-orbit span:nth-child(2){left:88%;top:50%;animation:ag-orbit-2 9s linear infinite}
      .ag-orbit span:nth-child(3){left:50%;top:90%;animation:ag-orbit-3 8s linear infinite}
      .ag-orbit span:nth-child(4){left:8%;top:50%;animation:ag-orbit-4 10s linear infinite}

      /* Tasteful floating emoji constellation around the capsule.
         Each .ag-emoji sits at the centre of the machine wrap and is rotated
         out by --ag-emoji-angle, then translated --ag-emoji-radius along that
         vector. The whole element slowly rotates around the centre. */
      .ag-emoji-orbit{
        position:absolute;inset:0;pointer-events:none;
        z-index:3;
      }
      .ag-emoji{
        position:absolute;left:50%;top:50%;
        font-size:clamp(.95rem,1.1vw + .6rem,1.25rem);
        line-height:1;
        transform-origin:0 0;
        transform:rotate(var(--ag-emoji-angle))
          translate(var(--ag-emoji-radius))
          rotate(calc(-1 * var(--ag-emoji-angle)));
        animation:ag-emoji-spin var(--ag-emoji-duration,32s) linear infinite;
        animation-delay:var(--ag-emoji-delay,0s);
        animation-direction:var(--ag-emoji-direction,normal);
        filter:drop-shadow(0 2px 6px rgba(0,0,0,.35));
        opacity:.9;
        will-change:transform;
      }
      @keyframes ag-emoji-spin{
        0%{
          transform:rotate(var(--ag-emoji-angle))
            translate(var(--ag-emoji-radius))
            rotate(calc(-1 * var(--ag-emoji-angle)));
        }
        100%{
          transform:rotate(calc(var(--ag-emoji-angle) + 360deg))
            translate(var(--ag-emoji-radius))
            rotate(calc(-1 * (var(--ag-emoji-angle) + 360deg)));
        }
      }

      .ag-copy{min-width:0;color:#fffdf2}
      .ag-kicker{
        margin:0;color:#cfe7d4;font-size:clamp(.74rem,.7rem + .2vw,.84rem);
        letter-spacing:.14em;text-transform:uppercase;font-weight:700;
      }
      .ag-copy h1{
        margin:8px 0 12px;
        font-family:"Boska",Georgia,serif;
        font-size:clamp(2.1rem,1.2rem + 3.8vw,4.4rem);
        line-height:.96;letter-spacing:-.035em;font-weight:700;
        color:#fffdf2;
        text-shadow:0 2px 24px rgba(0,0,0,.5);
      }
      .ag-intro{
        margin:0 0 18px;max-width:34rem;color:#dfeedb;
        font-size:clamp(.98rem,.95rem + .2vw,1.08rem);line-height:1.6;
      }

      .ag-chips{
        list-style:none;padding:0;margin:0 0 18px;
        display:flex;flex-wrap:wrap;gap:8px;
      }
      .ag-chips li{
        display:inline-flex;align-items:center;min-height:28px;padding:0 12px;
        border-radius:999px;border:1px solid rgba(255,255,255,.18);
        background:rgba(8,28,18,.45);backdrop-filter:blur(8px);
        color:#e7f5e3;font-size:.78rem;font-weight:700;letter-spacing:.04em;
      }

      .ag-tabs{
        display:inline-flex;padding:4px;border-radius:999px;
        background:rgba(8,28,18,.55);border:1px solid rgba(255,255,255,.16);
        backdrop-filter:blur(10px);
        margin-bottom:0;gap:2px;
      }
      .ag-tab{
        appearance:none;border:none;background:transparent;
        min-height:36px;padding:0 18px;border-radius:999px;cursor:pointer;
        color:#bdd6c4;font-weight:700;font-size:.92rem;letter-spacing:.01em;
        transition:background 180ms var(--ag-ease), color 180ms var(--ag-ease), transform 180ms var(--ag-ease);
        font-family:inherit;
      }
      .ag-tab:hover{color:#fffdf2}
      .ag-tab.is-active{
        background:linear-gradient(180deg, rgba(255,253,242,.95), rgba(231,245,227,.85));
        color:#143524;
        box-shadow:0 6px 18px rgba(0,0,0,.3);
      }
      .ag-tab:focus-visible{outline:2px solid #fffdf2;outline-offset:2px}

      .ag-panel{display:grid;gap:clamp(14px,2vw,18px)}

      .ag-card{
        background:linear-gradient(180deg, #fffdf6, #f7f3e8);
        border:1px solid var(--ag-border);
        border-radius:var(--ag-radius-lg);
        padding:clamp(16px,2.6vw,24px);
        box-shadow:0 12px 36px rgba(8,28,18,.14),0 1px 0 rgba(255,255,255,.6) inset;
        color:var(--ag-text);
      }
      @media (prefers-color-scheme:dark){
        .ag-card{
          background:linear-gradient(180deg, rgba(28,42,32,.96), rgba(18,30,22,.94));
          border-color:rgba(255,255,255,.08);
          color:var(--ag-text);
          box-shadow:0 12px 36px rgba(0,0,0,.4);
        }
      }

      .ag-draw-card{
        display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;
      }
      .ag-draw-meta{display:flex;flex-direction:column;gap:4px;min-width:0}
      .ag-pill{
        display:inline-flex;align-items:center;align-self:flex-start;min-height:26px;padding:0 12px;
        border-radius:999px;background:var(--ag-surface-2);
        color:var(--ag-primary-dark);font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
      }
      .ag-draw-hint{color:var(--ag-muted);font-size:.92rem}

      .ag-streak{
        display:inline-flex;align-items:center;gap:4px;align-self:flex-start;
        min-height:24px;padding:0 10px;border-radius:999px;
        font-size:.75rem;font-weight:800;letter-spacing:.04em;
        background:rgba(47,122,79,.12);color:var(--ag-primary-dark);
        transition:background 240ms ease, color 240ms ease;
      }
      .ag-streak[data-ag-streak-tier="1"]{background:rgba(185,120,46,.14);color:var(--ag-gold)}
      .ag-streak[data-ag-streak-tier="2"]{background:rgba(220,80,40,.12);color:#c84a18}
      @media (prefers-color-scheme:dark){.ag-streak[data-ag-streak-tier="2"]{color:#f07040}}
      .ag-streak[data-ag-streak-tier="3"]{
        background:linear-gradient(90deg,rgba(185,120,46,.22),rgba(47,122,79,.18));
        color:var(--ag-gold);
      }

      .ag-button,.ag-secondary{
        min-height:46px;border:1px solid transparent;border-radius:999px;padding:0 22px;
        font-weight:700;font-family:inherit;font-size:.98rem;letter-spacing:.01em;cursor:pointer;
        transition:transform 180ms var(--ag-ease), background 180ms var(--ag-ease), border-color 180ms var(--ag-ease), color 180ms var(--ag-ease), box-shadow 180ms var(--ag-ease);
      }
      .ag-button{
        position:relative;display:inline-flex;align-items:center;gap:10px;
        background:linear-gradient(180deg,var(--ag-primary),var(--ag-primary-dark));
        color:#fffdf8;
        box-shadow:0 14px 30px rgba(47,122,79,.32),0 0 0 4px rgba(255,253,242,.12);
        overflow:hidden;
      }
      .ag-button:before{
        content:"";position:absolute;inset:-2px;border-radius:inherit;
        background:linear-gradient(120deg,transparent 30%,rgba(255,236,170,.25),transparent 70%);
        transform:translateX(-100%);transition:transform 700ms var(--ag-ease);pointer-events:none;
      }
      .ag-button:hover:before{transform:translateX(100%)}
      .ag-button:hover{transform:translateY(-1px);box-shadow:0 18px 36px rgba(47,122,79,.36)}
      .ag-button:active,.ag-secondary:active{transform:translateY(0)}
      .ag-button[disabled]{opacity:.85;cursor:wait}
      .ag-button[disabled] span:not(.ag-button-orb):after{content:"...";display:inline-block;width:1.2em;text-align:left}
      .ag-button-orb{
        width:14px;height:14px;border-radius:999px;
        background:radial-gradient(circle at 35% 35%, #fffdf2, var(--ag-gold));
        box-shadow:0 0 12px rgba(255,236,170,.7);
      }
      .ag-widget.is-revealing .ag-button-orb{animation:ag-pulse 800ms ease-in-out infinite}

      .ag-result{animation:ag-enter 460ms var(--ag-ease)}
      .ag-result-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px}
      .ag-badge{
        display:inline-flex;align-items:center;min-height:28px;padding:0 12px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.78rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;
      }
      .ag-result h2{margin:0 0 8px;font-family:"Boska",Georgia,serif;font-size:clamp(1.3rem,1rem + 1vw,1.8rem);line-height:1.15;letter-spacing:-.015em}
      .ag-result p{margin:0;color:var(--ag-muted);line-height:1.6}
      .ag-date{color:var(--ag-muted);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700}

      .ag-photo{margin:16px 0 0;overflow:hidden;border-radius:var(--ag-radius-md);border:1px solid var(--ag-border);background:var(--ag-surface-2)}
      .ag-photo figcaption{padding:11px 14px;color:var(--ag-muted);font-size:.92rem;border-top:1px solid var(--ag-border)}

      .ag-media-stage{position:relative;width:100%;background:transparent}
      .ag-media-frame{
        position:relative;width:100%;aspect-ratio:4/3;
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;background:#0b1310;
      }
      .ag-media-frame[data-orientation="portrait"]{aspect-ratio:3/4}
      .ag-media-frame[data-orientation="square"]{aspect-ratio:1/1}
      .ag-media-backdrop{
        position:absolute;inset:-8%;background-size:cover;background-position:center;
        filter:blur(28px) saturate(1.05) brightness(.6);
        transform:scale(1.08);opacity:.7;pointer-events:none;
      }
      .ag-media-content{
        position:relative;z-index:1;
        max-width:100%;max-height:100%;width:auto;height:auto;
        object-fit:contain;display:block;
        border-radius:6px;
      }
      .ag-media-frame video.ag-media-content{width:100%;height:100%;object-fit:contain;background:transparent}

      .ag-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
      .ag-secondary{
        display:inline-flex;align-items:center;justify-content:center;
        background:transparent;color:var(--ag-primary-dark);border-color:var(--ag-border);text-decoration:none;
      }
      .ag-secondary:hover{transform:translateY(-1px);border-color:var(--ag-primary);background:rgba(47,122,79,.08)}

      .ag-rules{color:var(--ag-text)}
      .ag-rules summary{
        list-style:none;cursor:pointer;font-weight:800;letter-spacing:.02em;
        display:inline-flex;align-items:center;gap:8px;
      }
      .ag-rules summary::-webkit-details-marker{display:none}
      .ag-rules summary:before{
        content:"";width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;
        transform:rotate(-45deg);transition:transform 200ms var(--ag-ease);
      }
      .ag-rules[open] summary:before{transform:rotate(45deg)}
      .ag-rules p{margin:10px 0 8px;color:var(--ag-muted)}
      .ag-rules ul{margin:0;padding-left:18px;columns:2;color:var(--ag-muted);font-size:.94rem}
      .ag-rules li{break-inside:avoid;margin-bottom:4px}

      .ag-history-note{margin:0 0 14px;color:var(--ag-muted);font-size:.92rem;line-height:1.55}
      .ag-history{list-style:none;padding:0;margin:0;display:grid;gap:10px}
      .ag-history-empty{
        margin:8px 0 0;padding:16px;border:1px dashed var(--ag-border);border-radius:var(--ag-radius-md);
        color:var(--ag-muted);font-size:.95rem;line-height:1.55;background:var(--ag-surface-2);
      }
      .ag-history-item{
        padding:12px 14px;border:1px solid var(--ag-border);border-radius:var(--ag-radius-md);
        background:rgba(255,253,248,.85);box-shadow:var(--ag-shadow-soft);
        transition:transform 180ms var(--ag-ease), border-color 180ms var(--ag-ease);
      }
      @media (prefers-color-scheme:dark){.ag-history-item{background:rgba(23,32,23,.7)}}
      .ag-history-item:hover{transform:translateY(-1px);border-color:rgba(47,122,79,.4)}
      .ag-history-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
      .ag-history-date{color:var(--ag-muted);font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
      .ag-history-badge{
        display:inline-flex;align-items:center;min-height:22px;padding:0 9px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.7rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;
      }
      .ag-history-title{margin:0 0 2px;font-size:1rem;font-weight:700;color:var(--ag-text);line-height:1.3}
      .ag-history-message{margin:0;color:var(--ag-muted);font-size:.9rem;line-height:1.5}
      .ag-history-body{display:flex;gap:12px;align-items:flex-start}
      .ag-history-thumb{
        flex:0 0 auto;width:64px;height:64px;border-radius:10px;overflow:hidden;
        background:var(--ag-surface-2);border:1px solid var(--ag-border);
        display:flex;align-items:center;justify-content:center;position:relative;
      }
      .ag-history-thumb img{width:100%;height:100%;object-fit:cover;display:block}
      .ag-history-thumb.is-video{
        background:linear-gradient(135deg, var(--ag-primary), var(--ag-blue));color:#fffdf8;
        flex-direction:column;gap:2px;
      }
      .ag-history-video-icon{font-size:1.1rem;line-height:1}
      .ag-history-video-label{font-size:.6rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
      .ag-history-text{min-width:0;flex:1}

      .ag-history-item[data-tone="quiet"] .ag-history-badge{color:var(--ag-muted)}
      .ag-history-item[data-tone="quest"] .ag-history-badge{color:var(--ag-blue)}
      .ag-history-item[data-tone="warm"] .ag-history-badge{color:var(--ag-gold)}
      .ag-history-item[data-tone="cursed"] .ag-history-badge{background:rgba(47,122,79,.12)}
      .ag-history-item[data-tone="rare"] .ag-history-badge,
      .ag-history-item[data-tone="photo"] .ag-history-badge{color:var(--ag-green)}
      .ag-history-item[data-tone="jackpot"] .ag-history-badge{color:var(--ag-gold);background:rgba(185,120,46,.16)}

      .ag-widget[data-tone=quiet] .ag-badge{color:var(--ag-muted)}
      .ag-widget[data-tone=quest] .ag-badge{color:var(--ag-blue)}
      .ag-widget[data-tone=warm] .ag-badge{color:var(--ag-gold)}
      .ag-widget[data-tone=cursed] .ag-badge{color:var(--ag-primary-dark);background:rgba(47,122,79,.12)}
      .ag-widget[data-tone=rare] .ag-badge,.ag-widget[data-tone=photo] .ag-badge{color:var(--ag-green)}
      .ag-widget[data-tone=jackpot] .ag-badge{color:var(--ag-gold);background:rgba(185,120,46,.16)}

      .ag-error{padding:24px;border:1px solid var(--ag-border);border-radius:18px;background:var(--ag-surface);color:var(--ag-text)}

      .ag-shimmer{animation:ag-shimmer 6s ease-in-out infinite}
      .ag-shimmer-2{animation-duration:8s;animation-delay:-2s}
      .ag-road-dash{animation:ag-dash 28s linear infinite}
      .ag-firefly{animation:ag-firefly 5s ease-in-out infinite}
      .ag-firefly-2{animation-duration:7s;animation-delay:-1s}
      .ag-firefly-3{animation-duration:6.4s;animation-delay:-3s}
      .ag-firefly-4{animation-duration:8s;animation-delay:-2s}
      .ag-firefly-5{animation-duration:5.6s;animation-delay:-1.5s}
      .ag-firefly-6{animation-duration:7.2s;animation-delay:-2.5s}
      .ag-sun{animation:ag-pulse 6s ease-in-out infinite}

      @keyframes ag-shake{0%,100%{transform:translate(-50%,-50%) rotate(0deg)}18%{transform:translate(-50%,-58%) rotate(-8deg)}38%{transform:translate(-50%,-44%) rotate(9deg)}58%{transform:translate(-50%,-52%) rotate(-5deg)}78%{transform:translate(-50%,-48%) rotate(4deg)}}
      @keyframes ag-pop{0%{transform:translate(-50%,-50%) scale(.6);opacity:0}60%{transform:translate(-50%,-50%) scale(1.12);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
      @keyframes ag-float{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,-56%)}}
      @keyframes ag-enter{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes ag-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.06);opacity:.85}}
      @keyframes ag-spin{to{transform:rotate(360deg)}}
      @keyframes ag-shimmer{0%,100%{opacity:.55;transform:translateX(0)}50%{opacity:.95;transform:translateX(-6px)}}
      @keyframes ag-dash{to{stroke-dashoffset:-280}}
      @keyframes ag-firefly{0%,100%{opacity:.2;transform:translate(0,0)}50%{opacity:1;transform:translate(8px,-12px)}}
      @keyframes ag-orbit-1{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes ag-orbit-2{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(-360deg)}}
      @keyframes ag-orbit-3{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes ag-orbit-4{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(-360deg)}}

      @media (max-width:760px){
        .ag-frame{padding:clamp(8px,3vw,16px) clamp(8px,3vw,16px)}
        .ag-shell{padding:clamp(16px,4vw,24px)}
        .ag-machine-wrap{max-width:220px}
        .ag-emoji{font-size:clamp(.85rem,2.4vw,1.05rem)}
        .ag-copy h1{font-size:clamp(1.9rem,1rem + 6vw,3rem)}
        .ag-rules ul{columns:1}
        .ag-history-thumb{width:56px;height:56px}
        .ag-draw-card{flex-direction:column;align-items:stretch}
        .ag-button{justify-content:center}
        .ag-tabs{display:flex;width:100%}
        .ag-tab{flex:1;padding:0 12px}
      }
      @media (prefers-reduced-motion:reduce){
        .ag-widget *,.ag-widget *:before,.ag-widget *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
        .ag-machine-capsule,.ag-mach-glow,.ag-mach-orbit,.ag-orbit span,.ag-shimmer,.ag-road-dash,.ag-firefly,.ag-sun,.ag-button-orb,.ag-emoji{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  init();
})();

(function () {
  const script = document.currentScript;
  const mountSelector = script?.dataset.mount || "#affektions-gacha";
  const baseUrl = script?.dataset.configBase || "";
  const mount = document.querySelector(mountSelector) || createMount();

  const state = {
    theme: null,
    outcomes: null,
    photos: null,
    todaysPull: null,
    activeTab: "today"
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
          <div class="ag-tabs" role="tablist" aria-label="Ansicht wählen">
            <button class="ag-tab is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today">Heute</button>
            <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="history">Verlauf</button>
          </div>
          <div class="ag-panel" data-ag-panel-today role="tabpanel">
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
                <div class="ag-media-stage" data-ag-photo-media></div>
                <figcaption data-ag-photo-caption hidden></figcaption>
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
          <div class="ag-panel" data-ag-panel-history role="tabpanel" hidden>
            <p class="ag-history-note" data-ag-history-note></p>
            <ol class="ag-history" data-ag-history></ol>
          </div>
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
    const historyDays = Number.isInteger(state.theme.historyDays) ? state.theme.historyDays : 14;
    $("[data-ag-history-note]").textContent =
      `Deterministischer Verlauf der letzten ${historyDays} Tage. Kein Tap-Log — nur dieselbe tägliche Berechnung rückwärts gerechnet.`;

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

  function buildPullForDay(day) {
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

  function buildPull() {
    const day = dateKeyInTimezone(state.theme.timezone);
    return buildPullForDay(day);
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

  function pastDays(count) {
    const days = [];
    const tz = state.theme.timezone;
    const now = new Date();
    for (let offset = 0; offset < count; offset += 1) {
      const date = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000);
      days.push(dateKeyInTimezone(tz, date));
    }
    return days;
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
    list.innerHTML = "";
    const historyDays = Number.isInteger(state.theme.historyDays) ? state.theme.historyDays : 14;
    const days = pastDays(Math.max(1, historyDays));

    for (const dayKey of days) {
      const pull = buildPullForDay(dayKey);
      const li = document.createElement("li");
      li.className = "ag-history-item";
      li.dataset.tone = pull.category.tone;

      const head = document.createElement("div");
      head.className = "ag-history-head";
      const date = document.createElement("span");
      date.className = "ag-history-date";
      date.textContent = formatHistoryDate(dayKey);
      const badge = document.createElement("span");
      badge.className = "ag-history-badge";
      badge.textContent = pull.category.label;
      head.appendChild(date);
      head.appendChild(badge);

      const title = document.createElement("p");
      title.className = "ag-history-title";
      title.textContent = pull.outcome.title;

      const message = document.createElement("p");
      message.className = "ag-history-message";
      message.textContent = pull.outcome.message;

      li.appendChild(head);

      if (pull.photo) {
        const body = document.createElement("div");
        body.className = "ag-history-body";

        const thumb = document.createElement("div");
        thumb.className = "ag-history-thumb";
        if (pull.photo.type === "video") {
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
          img.src = pull.photo.url;
          img.alt = pull.photo.alt || "Foto-Drop";
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
      .ag-widget{
        --ag-shadow:0 18px 48px rgba(38,75,45,.12);
        --ag-shadow-soft:0 8px 24px rgba(38,75,45,.08);
        --ag-radius-lg:24px;
        --ag-radius-md:16px;
        --ag-radius-sm:10px;
        --ag-ease:cubic-bezier(.16,1,.3,1);
        color:var(--ag-text);
        background:
          radial-gradient(circle at 20% 0%, rgba(198,225,185,.68), transparent 34rem),
          radial-gradient(circle at 100% 40%, rgba(47,122,79,.18), transparent 28rem),
          var(--ag-bg);
        border-radius:var(--ag-radius-lg);
        overflow:hidden;
        font-family:"Satoshi","Inter",system-ui,sans-serif;
        line-height:1.5;
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
          --ag-shadow:0 18px 48px rgba(0,0,0,.36);
          --ag-shadow-soft:0 8px 24px rgba(0,0,0,.28);
        }
      }
      .ag-shell{
        width:min(100%,980px);
        margin-inline:auto;
        padding:clamp(20px,5vw,56px);
        display:grid;
        grid-template-columns:minmax(220px,.8fr) minmax(0,1.2fr);
        gap:clamp(20px,4vw,52px);
        align-items:center;
      }
      .ag-machine{
        position:relative;
        min-height:340px;
        border:1px solid var(--ag-border);
        border-radius:36px;
        background:
          linear-gradient(160deg, rgba(255,255,255,.36), transparent 42%),
          linear-gradient(180deg, var(--ag-sky), transparent 36%),
          var(--ag-surface);
        box-shadow:var(--ag-shadow);
        display:grid;place-items:center;isolation:isolate;
      }
      .ag-machine:before{
        content:"";position:absolute;width:42%;aspect-ratio:1;top:22px;right:28px;
        border-radius:999px;background:rgba(47,122,79,.12);filter:blur(10px);z-index:-1;
      }
      .ag-machine:after{
        content:"";position:absolute;inset:18px;border:1px solid rgba(255,255,255,.32);
        border-radius:26px;pointer-events:none;
      }
      .ag-machine-top{position:absolute;top:24px;width:42%;height:14px;border-radius:999px;background:var(--ag-primary);opacity:.82}
      .ag-stickers{position:absolute;top:54px;left:24px;right:24px;display:flex;justify-content:space-between;gap:8px;z-index:2}
      .ag-stickers span{
        display:inline-flex;align-items:center;min-height:26px;padding:0 9px;
        border:1px solid var(--ag-border);border-radius:999px;
        background:rgba(255,253,248,.7);color:var(--ag-muted);
        font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
        transform:rotate(-4deg);
      }
      .ag-stickers span:nth-child(2){transform:rotate(3deg)}
      .ag-stickers span:nth-child(3){transform:rotate(-1deg)}
      .ag-window{
        width:min(66%,232px);aspect-ratio:1;border-radius:999px;
        border:1px solid var(--ag-border);
        background:
          linear-gradient(145deg, rgba(255,255,255,.7), transparent 45%),
          radial-gradient(circle at 46% 28%, rgba(255,240,168,.78), transparent 9%),
          linear-gradient(180deg, var(--ag-sky) 0 42%, var(--ag-mountain) 42% 62%, var(--ag-surface-2) 62% 100%);
        display:grid;place-items:center;
        box-shadow:inset 0 8px 24px rgba(38,75,45,.08);
      }
      .ag-capsule{
        position:relative;z-index:2;width:88px;aspect-ratio:1.35;border-radius:999px;
        border:1px solid rgba(38,75,45,.16);
        background:linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%);
        box-shadow:0 10px 28px rgba(38,75,45,.18);
        transition:transform 700ms var(--ag-ease), background 240ms var(--ag-ease);
      }
      .ag-capsule:after{content:"";position:absolute;inset:14px 30px;border-radius:999px;background:rgba(255,255,255,.32);filter:blur(1px)}
      .ag-widget.is-revealing .ag-capsule{animation:ag-shake 950ms var(--ag-ease) 3}
      .ag-landscape{position:absolute;left:32px;right:32px;bottom:70px;height:50px;opacity:.7;pointer-events:none}
      .ag-landscape span{position:absolute;bottom:0;width:84px;height:50px;background:var(--ag-mountain);clip-path:polygon(50% 0,100% 100%,0 100%)}
      .ag-landscape span:nth-child(1){left:4%;transform:scale(1.1)}
      .ag-landscape span:nth-child(2){left:32%;transform:scale(.84);opacity:.72}
      .ag-landscape span:nth-child(3){right:2%;transform:scale(1.28);opacity:.82}
      .ag-slot{position:absolute;bottom:38px;width:42%;height:12px;border-radius:999px;background:rgba(23,32,24,.18)}
      .ag-slot:after{
        content:"souvenirs";position:absolute;top:16px;left:50%;transform:translateX(-50%);
        color:var(--ag-muted);font-size:.66rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
      }
      .ag-copy{min-width:0}
      .ag-kicker,.ag-date{margin:0;color:var(--ag-muted);font-size:clamp(.74rem,.7rem + .2vw,.84rem);letter-spacing:.08em;text-transform:uppercase;font-weight:700}
      .ag-copy h1{
        margin:6px 0 12px;font-family:"Boska",Georgia,serif;
        font-size:clamp(2rem,1.15rem + 3.6vw,4.2rem);line-height:.96;letter-spacing:-.035em;font-weight:700;
      }
      .ag-intro{margin:0 0 20px;max-width:34rem;color:var(--ag-muted);font-size:clamp(.98rem,.95rem + .2vw,1.08rem);line-height:1.6}

      .ag-tabs{
        display:inline-flex;padding:4px;border-radius:999px;
        background:var(--ag-surface-2);border:1px solid var(--ag-border);
        box-shadow:var(--ag-shadow-soft);margin-bottom:18px;gap:2px;
      }
      .ag-tab{
        appearance:none;border:none;background:transparent;
        min-height:36px;padding:0 16px;border-radius:999px;cursor:pointer;
        color:var(--ag-muted);font-weight:700;font-size:.92rem;letter-spacing:.01em;
        transition:background 180ms var(--ag-ease), color 180ms var(--ag-ease), transform 180ms var(--ag-ease);
        font-family:inherit;
      }
      .ag-tab:hover{color:var(--ag-text)}
      .ag-tab.is-active{
        background:var(--ag-surface);color:var(--ag-primary-dark);
        box-shadow:0 4px 12px rgba(38,75,45,.1);
      }
      .ag-tab:focus-visible{outline:2px solid var(--ag-primary);outline-offset:2px}

      .ag-panel{min-width:0}

      .ag-button,.ag-secondary{
        min-height:42px;border:1px solid transparent;border-radius:999px;padding:0 20px;
        font-weight:700;font-family:inherit;font-size:.95rem;letter-spacing:.01em;cursor:pointer;
        transition:transform 180ms var(--ag-ease), background 180ms var(--ag-ease), border-color 180ms var(--ag-ease), color 180ms var(--ag-ease), box-shadow 180ms var(--ag-ease);
      }
      .ag-button{background:var(--ag-primary);color:#fffdf8;box-shadow:0 10px 24px rgba(47,122,79,.22)}
      .ag-button:hover{transform:translateY(-1px);background:var(--ag-primary-dark);box-shadow:0 12px 28px rgba(47,122,79,.28)}
      .ag-button:active,.ag-secondary:active{transform:translateY(0)}
      .ag-button[disabled]{opacity:.72;cursor:wait}
      .ag-button[disabled] span:after{content:"...";display:inline-block;width:1.2em;text-align:left}

      .ag-result{
        margin-top:20px;padding:clamp(16px,2.6vw,24px);
        border:1px solid var(--ag-border);border-radius:var(--ag-radius-lg);
        background:rgba(255,253,248,.8);box-shadow:var(--ag-shadow);
        animation:ag-enter 420ms var(--ag-ease);
      }
      @media (prefers-color-scheme:dark){.ag-result{background:rgba(23,32,23,.78)}}
      .ag-result-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px}
      .ag-badge{
        display:inline-flex;align-items:center;min-height:28px;padding:0 12px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.78rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;
      }
      .ag-result h2{margin:0 0 8px;font-size:clamp(1.2rem,1rem + .9vw,1.65rem);line-height:1.15;letter-spacing:-.015em}
      .ag-result p{margin:0;color:var(--ag-muted);line-height:1.6}

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
      .ag-secondary:hover{transform:translateY(-1px);border-color:var(--ag-primary);background:rgba(47,122,79,.06)}

      .ag-rules{margin-top:18px;color:var(--ag-muted);font-size:.94rem}
      .ag-rules summary{min-height:36px;display:inline-flex;align-items:center;cursor:pointer;color:var(--ag-text);font-weight:700}
      .ag-rules p{margin:0 0 8px}
      .ag-rules ul{margin:0;padding-left:18px;columns:2}
      .ag-rules li{break-inside:avoid;margin-bottom:4px}

      .ag-history-note{margin:0 0 14px;color:var(--ag-muted);font-size:.92rem;line-height:1.55}
      .ag-history{list-style:none;padding:0;margin:0;display:grid;gap:10px}
      .ag-history-item{
        padding:12px 14px;border:1px solid var(--ag-border);border-radius:var(--ag-radius-md);
        background:rgba(255,253,248,.78);box-shadow:var(--ag-shadow-soft);
        transition:transform 180ms var(--ag-ease), border-color 180ms var(--ag-ease);
      }
      @media (prefers-color-scheme:dark){.ag-history-item{background:rgba(23,32,23,.65)}}
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

      @keyframes ag-shake{0%,100%{transform:rotate(0deg) translateY(0)}18%{transform:rotate(-8deg) translateY(-6px)}38%{transform:rotate(9deg) translateY(3px)}58%{transform:rotate(-5deg) translateY(-2px)}78%{transform:rotate(4deg) translateY(1px)}}
      @keyframes ag-enter{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}

      @media (max-width:760px){
        .ag-shell{grid-template-columns:1fr;gap:24px}
        .ag-machine{min-height:240px}
        .ag-rules ul{columns:1}
        .ag-history-thumb{width:56px;height:56px}
      }
      @media (prefers-reduced-motion:reduce){
        .ag-widget *,.ag-widget *:before,.ag-widget *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
      }
    `;
    document.head.appendChild(style);
  }

  init();
})();

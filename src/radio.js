// ── Radio Zweisam ──────────────────────────────────────────────────────────────
import { state } from "./state.js";
import { haptic } from "./haptic.js";
import { readGlossary } from "./glossary.js";

const CACHE_KEY = "ag:radio:track:";

const ENERGY_CONFIGS = [
  {
    label: "Chill",
    prompt: "ambient lo-fi instrumental, soft piano and gentle synth pads, slow dreamy tempo 65 bpm, warm and tender, no drums, peaceful",
  },
  {
    label: "Mittel",
    prompt: "indie folk pop instrumental, acoustic guitar and light brushed drums, melodic and emotional, 92 bpm, warm and hopeful, violin strings",
  },
  {
    label: "Energetisch",
    prompt: "upbeat electronic dance instrumental, punchy kick drum, driving synth bass, vibrant and joyful, 126 bpm, four-on-the-floor, euphoric",
  },
];

export let _radioAudio = null;
export let _voiceAudio = null;
export let _voiceQueue = [];
export let _voiceIdx = 0;

function dayEnergy(dateKey) {
  const n = dateKey.replace(/-/g, "").split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7);
  return Math.abs(n) % 3;
}

export function getInspirationWords(max = 5) {
  const words = readGlossary().filter(w => w.word);
  if (!words.length) return [];
  return [...words].sort(() => Math.random() - 0.5).slice(0, max);
}

export function buildMusicPrompt(dateKey) {
  const energyIdx = dayEnergy(dateKey);
  const cfg = ENERGY_CONFIGS[energyIdx];
  const words = getInspirationWords(5);
  const meanings = words.filter(w => w.meaning).map(w => w.meaning).join("; ");
  const wordPart = meanings ? `. Mood inspired by: ${meanings}` : "";
  return { prompt: cfg.prompt + wordPart, energyLabel: cfg.label, energyIdx, inspirationWords: words };
}

export function getCachedTrack(dateKey) {
  try { return localStorage.getItem(CACHE_KEY + dateKey) || null; } catch { return null; }
}

export function setCachedTrack(dateKey, dataUrl) {
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(CACHE_KEY)) localStorage.removeItem(k);
    }
    localStorage.setItem(CACHE_KEY + dateKey, dataUrl);
  } catch { /* storage full */ }
}

async function blobToDataUrl(blob) {
  return new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
}

export async function generateTrack(prompt) {
  const cfg = state.radio;
  if (!cfg?.enabled || !cfg?.hfToken) throw new Error("Radio nicht konfiguriert");
  const model = cfg.model || "facebook/musicgen-small";
  const headers = { "Authorization": `Bearer ${cfg.hfToken}`, "Content-Type": "application/json" };
  const body = JSON.stringify({ inputs: prompt });

  const tryFetch = async (attempt = 0) => {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), 180000);
    let resp;
    try {
      resp = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST", headers, body, signal: controller.signal
      });
    } finally {
      clearTimeout(tid);
    }
    if (resp.status === 503 && attempt < 6) {
      const j = await resp.json().catch(() => ({}));
      const wait = Math.min((j.estimated_time || 30) * 1000, 90000);
      const statusEl = document.getElementById("ag-radio-status");
      if (statusEl) statusEl.textContent = `Modell lädt — noch ca. ${Math.round(wait / 1000)}s...`;
      await new Promise(r => setTimeout(r, wait));
      return tryFetch(attempt + 1);
    }
    if (!resp.ok) {
      const errText = await resp.text().catch(() => resp.status);
      throw new Error(`HF ${resp.status}: ${String(errText).slice(0, 120)}`);
    }
    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("audio") && !contentType.includes("octet")) {
      const text = await resp.text();
      throw new Error(`Kein Audio zurück: ${text.slice(0, 120)}`);
    }
    return resp.blob();
  };
  return tryFetch();
}

export function renderInspirationWords(words) {
  const el = document.getElementById("ag-radio-words");
  if (!el) return;
  if (!words.length) { el.innerHTML = "<em style='opacity:.5'>Keine Glossarwörter gefunden</em>"; return; }
  el.innerHTML = words.map(w => `<span class="ag-radio-word" title="${w.meaning || ""}">${w.word}</span>`).join("");
}

function playNextVoice() {
  if (!_voiceQueue.length || !_radioAudio || _radioAudio.paused) return;
  _voiceIdx = (_voiceIdx + 1) % _voiceQueue.length;
  _voiceAudio = new Audio(_voiceQueue[_voiceIdx]);
  _voiceAudio.volume = 0.65;
  _voiceAudio.onended = () => setTimeout(playNextVoice, 3500 + Math.random() * 3000);
  _voiceAudio.play().catch(() => {});
}

export function stopRadio() {
  if (_radioAudio) { try { _radioAudio.pause(); _radioAudio.src = ""; } catch {} _radioAudio = null; }
  if (_voiceAudio) { try { _voiceAudio.pause(); _voiceAudio.src = ""; } catch {} _voiceAudio = null; }
  _voiceQueue = [];
  _voiceIdx = 0;
  const btn = document.getElementById("ag-radio-play-btn");
  if (btn) { btn.textContent = "▶ Abspielen"; btn.dataset.playing = ""; btn.disabled = false; }
  document.getElementById("ag-radio-visualizer")?.classList.remove("is-playing");
  const dl = document.getElementById("ag-radio-download-btn");
  if (dl) dl.hidden = true;
}

export async function startOrToggleRadio(dateKey) {
  const playBtn = document.getElementById("ag-radio-play-btn");
  const statusEl = document.getElementById("ag-radio-status");

  if (_radioAudio && !_radioAudio.paused) {
    _radioAudio.pause();
    if (_voiceAudio) _voiceAudio.pause();
    if (playBtn) { playBtn.textContent = "▶ Weiterspielen"; playBtn.dataset.playing = ""; }
    document.getElementById("ag-radio-visualizer")?.classList.remove("is-playing");
    return;
  }
  if (_radioAudio) {
    _radioAudio.play().catch(() => {});
    if (_voiceAudio) _voiceAudio.play().catch(() => {});
    if (playBtn) { playBtn.textContent = "⏸ Pausieren"; playBtn.dataset.playing = "1"; }
    document.getElementById("ag-radio-visualizer")?.classList.add("is-playing");
    return;
  }

  if (playBtn) { playBtn.disabled = true; playBtn.textContent = "⏳ Lädt..."; }
  if (statusEl) statusEl.textContent = "Die Maschine komponiert — einen Moment...";
  haptic(6);

  try {
    let audioSrc = getCachedTrack(dateKey);

    if (!audioSrc) {
      const { prompt, energyLabel, inspirationWords } = buildMusicPrompt(dateKey);
      renderInspirationWords(inspirationWords);
      if (statusEl) statusEl.textContent = `Energie: ${energyLabel} — generiere...`;
      const blob = await generateTrack(prompt);
      audioSrc = await blobToDataUrl(blob);
      setCachedTrack(dateKey, audioSrc);
    } else {
      renderInspirationWords(getInspirationWords(5));
    }

    _radioAudio = new Audio(audioSrc);
    _radioAudio.loop = true;
    _radioAudio.volume = 0.45;
    await _radioAudio.play();

    if (playBtn) { playBtn.disabled = false; playBtn.textContent = "⏸ Pausieren"; playBtn.dataset.playing = "1"; }
    if (statusEl) statusEl.textContent = "";
    document.getElementById("ag-radio-visualizer")?.classList.add("is-playing");
    const dl = document.getElementById("ag-radio-download-btn");
    if (dl) dl.hidden = false;

    const voiceWords = readGlossary().filter(w => w.audioUrl);
    if (voiceWords.length) {
      _voiceQueue = [...voiceWords].sort(() => Math.random() - 0.5).map(w => w.audioUrl);
      _voiceIdx = -1;
      const voiceInfo = document.getElementById("ag-radio-voice-info");
      if (voiceInfo) voiceInfo.textContent = `${voiceWords.length} Stimmaufnahme${voiceWords.length !== 1 ? "n" : ""} aus dem Glossar`;
      setTimeout(playNextVoice, 6000);
    }
  } catch (_err) {
    if (playBtn) { playBtn.disabled = false; playBtn.textContent = "▶ Nochmal versuchen"; }
    if (statusEl) statusEl.textContent = "Fehler — nochmal versuchen?";
  }
}

export function downloadRadioTrack(dateKey) {
  const src = getCachedTrack(dateKey);
  if (!src) return;
  const a = document.createElement("a");
  a.href = src;
  a.download = `radio-zweisam-${dateKey}.wav`;
  a.click();
}

export function openRadioPanel() {
  const panel = document.getElementById("ag-radio-panel");
  if (!panel) return;
  panel.hidden = false;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  haptic(10);
}

export function closeRadioPanel() {
  stopRadio();
  const panel = document.getElementById("ag-radio-panel");
  if (panel) panel.hidden = true;
}

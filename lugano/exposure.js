// The maths behind the interactive lessons. Pure, so tests can check it.
//
// Exposure value of a setting: EV = log2(N² / t), N the f-number, t the time
// in seconds. A higher EV lets in less light. Light is measured as the EV a
// film of ISO 100 would need; a faster film needs log2(ISO/100) more.

export const APERTURES = [2, 2.8, 4, 5.6, 8, 11, 16];
export const SHUTTERS = [1 / 1000, 1 / 500, 1 / 250, 1 / 125, 1 / 60, 1 / 30, 1 / 15];
const ALL_SHUTTERS = [1 / 1000, 1 / 500, 1 / 250, 1 / 125, 1 / 60, 1 / 30, 1 / 15, 1 / 8, 1 / 4, 1 / 2, 1];
export const ISOS = [100, 200, 400, 800];

// Rough light values (EV at ISO 100), after the Sunny-16 rule.
export const LIGHTS = [
  { id: "sonne", label: "Sonne", icon: "☀️", ev: 15 },
  { id: "leicht", label: "Leicht bewölkt", icon: "🌤️", ev: 14 },
  { id: "bewoelkt", label: "Bewölkt", icon: "☁️", ev: 13 },
  { id: "trueb", label: "Sehr trüb", icon: "🌫️", ev: 12 },
  { id: "schatten", label: "Schatten", icon: "🌲", ev: 11 },
  { id: "daemmerung", label: "Blaue Stunde", icon: "🌆", ev: 6 },
  { id: "innen", label: "Drinnen", icon: "🏠", ev: 5 }
];

export const evOfSettings = (N, t) => Math.log2((N * N) / t);
export const requiredEv = (sceneEv, iso) => sceneEv + Math.log2(iso / 100);

// Stops of over-exposure (positive) or under-exposure (negative).
export const exposureStops = (sceneEv, iso, N, t) => requiredEv(sceneEv, iso) - evOfSettings(N, t);

export function judge(stops) {
  const a = Math.abs(stops);
  if (a <= 0.5) return { level: "ok", text: "Passt." };
  const dir = stops > 0 ? "hell" : "dunkel";
  if (a <= 1.5) return { level: stops > 0 ? "over1" : "under1", text: `Eine Blende zu ${dir}.` };
  if (a <= 2.5) return { level: stops > 0 ? "over2" : "under2", text: `Zwei Blenden zu ${dir}.` };
  return { level: stops > 0 ? "over3" : "under3", text: `Viel zu ${dir}.` };
}

// The time (in seconds) the light asks for at aperture N, before rounding.
export const neededShutter = (sceneEv, iso, N) => (N * N) / Math.pow(2, requiredEv(sceneEv, iso));

// Can the camera do it? Its dial runs from 1/1000 to 1 s: if the light asks for
// more than half a stop beyond either end, the answer is wrong by that much.
export function shutterReach(sceneEv, iso, N) {
  const wanted = neededShutter(sceneEv, iso, N);
  if (wanted < (1 / 1000) / Math.SQRT2) return "zu-schnell";
  if (wanted > 1 * Math.SQRT2) return "zu-langsam";
  return "ok";
}

// The standard shutter speed closest to what the light asks for at aperture N.
export function suggestShutter(sceneEv, iso, N) {
  const wanted = neededShutter(sceneEv, iso, N);
  let best = ALL_SHUTTERS[0];
  for (const t of ALL_SHUTTERS) if (Math.abs(Math.log2(t / wanted)) < Math.abs(Math.log2(best / wanted))) best = t;
  return best;
}

export function shutterLabel(t) {
  return t >= 1 ? `${t}"` : `1/${Math.round(1 / t)}`;
}
export const apertureLabel = (N) => `f/${N}`;

// What the picture shows: 0..1 depth blur (wide aperture = blurry depth) and
// horizontal motion blur in pixels (long time = smeared movement).
export function blurOf(N, t) {
  const dof = Math.min(1, Math.max(0, Math.log2(16 / N) / 3));
  const motion = Math.min(14, t * 180);
  return { dof, motion };
}

// Brightness multiplier for the on-screen picture, kept readable.
export function brightnessOf(stops) {
  return Math.min(2.6, Math.max(0.18, Math.pow(2, stops * 0.55)));
}

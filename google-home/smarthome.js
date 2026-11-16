// Google Smart Home fulfilment: SYNC, QUERY, EXECUTE, DISCONNECT, for lamps
// that only switch on and off. The lamps themselves stay as they are: this
// publishes the same {on, target} messages the app and the lights page do.

// One light in Google Home that stands for both lamps: they hang on the same
// wire and are meant to be switched together.
export const LAMPS = [
  { id: "both", name: "Ember Lights" }
];
export const BOARD_IDS = ["board_a", "board_b"];
const ON_OFF = "action.devices.traits.OnOff";

export function sync(requestId, agentUserId = "ember-lights") {
  return {
    requestId,
    payload: {
      agentUserId,
      devices: LAMPS.map((l) => ({
        id: l.id,
        type: "action.devices.types.LIGHT",
        traits: [ON_OFF],
        name: { name: l.name, defaultNames: [l.name], nicknames: [l.name] },
        willReportState: false,
        attributes: { commandOnlyOnOff: false, queryOnlyOnOff: false },
        deviceInfo: { manufacturer: "linked_friend_lights", model: "pico-w-sk6812" }
      }))
    }
  };
}

// `state` is { board_a: { on, online }, board_b: {...} } as the bridge read it.
const stateOf = (id, state) => {
  if (id === "both") {
    const s = BOARD_IDS.map((b) => state[b] || { on: false, online: false });
    return { online: s.some((x) => x.online), on: s.some((x) => x.on) };
  }
  const s = state[id];
  return s ? { online: s.online !== false, on: !!s.on } : { online: false, on: false };
};

export async function query(requestId, payload, bridge) {
  const ids = (payload.devices || []).map((d) => d.id);
  const state = await bridge.readState();
  const devices = {};
  for (const id of ids) {
    if (!LAMPS.some((l) => l.id === id)) { devices[id] = { status: "ERROR", errorCode: "deviceNotFound" }; continue; }
    const s = stateOf(id, state);
    devices[id] = { status: "SUCCESS", online: s.online, on: s.on };
  }
  return { requestId, payload: { devices } };
}

// ── The night rule ───────────────────────────────────────────────────────────
// Between NIGHT_FROM and NIGHT_TO (default 22:00 to 08:00, Zurich time),
// "turn on Ember Lights" lights only Fionn's lamp (board_a), not both. Turning
// off still switches both, so nothing can be left on. Set NIGHT_FROM, NIGHT_TO,
// NIGHT_TZ and NIGHT_BOARD as Worker variables to change it; NIGHT_FROM equal
// to NIGHT_TO switches the rule off.
export function nightPolicy(env = {}) {
  const hour = (v, d) => { const n = Number(v); return v !== undefined && v !== "" && Number.isInteger(n) && n >= 0 && n <= 23 ? n : d; };
  let tz = env.NIGHT_TZ || "Europe/Zurich";
  try { new Intl.DateTimeFormat("en-GB", { timeZone: tz }); } catch (_e) { tz = "Europe/Zurich"; }
  return {
    from: hour(env.NIGHT_FROM, 22),
    to: hour(env.NIGHT_TO, 8),
    tz,
    board: BOARD_IDS.includes(env.NIGHT_BOARD) ? env.NIGHT_BOARD : "board_a"
  };
}

// Is `date` inside the night window? The window may wrap midnight (22 → 8).
export function isNight(date, { from, to, tz }) {
  if (from === to) return false;
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hourCycle: "h23" }).format(date));
  return from > to ? (h >= from || h < to) : (h >= from && h < to);
}

export async function execute(requestId, payload, bridge, { night = null, now = new Date() } = {}) {
  const commands = [];
  for (const group of payload.commands || []) {
    const ids = (group.devices || []).map((d) => d.id);
    const onOff = (group.execution || []).find((e) => e.command === "action.devices.commands.OnOff");
    const known = ids.filter((id) => LAMPS.some((l) => l.id === id));
    const unknown = ids.filter((id) => !known.includes(id));
    if (unknown.length) commands.push({ ids: unknown, status: "ERROR", errorCode: "deviceNotFound" });
    if (!known.length) continue;
    if (!onOff || typeof onOff.params?.on !== "boolean") {
      commands.push({ ids: known, status: "ERROR", errorCode: "functionNotSupported" });
      continue;
    }
    // At night an "on" only lights the chosen lamp; the answer still says the
    // light is on, which it is.
    const targets = onOff.params.on && night && isNight(now, night) ? [night.board] : known;
    try {
      await bridge.setOn(targets, onOff.params.on);
      commands.push({ ids: known, status: "SUCCESS", states: { on: onOff.params.on, online: true } });
    } catch (_e) {
      commands.push({ ids: known, status: "ERROR", errorCode: "deviceOffline" });
    }
  }
  return { requestId, payload: { commands } };
}

export async function fulfil(body, bridge, opts = {}) {
  const input = (body && body.inputs && body.inputs[0]) || {};
  const requestId = body && body.requestId;
  switch (input.intent) {
    case "action.devices.SYNC": return sync(requestId);
    case "action.devices.QUERY": return query(requestId, input.payload || {}, bridge);
    case "action.devices.EXECUTE": return execute(requestId, input.payload || {}, bridge, opts);
    case "action.devices.DISCONNECT": return {};
    default: return { requestId, payload: { errorCode: "protocolError" } };
  }
}

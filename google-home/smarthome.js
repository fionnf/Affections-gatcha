// Google Smart Home fulfilment: SYNC, QUERY, EXECUTE, DISCONNECT, for lamps
// that only switch on and off. The lamps themselves stay as they are: this
// publishes the same {on, target} messages the app and the lights page do.

export const LAMPS = [
  { id: "board_a", name: "Fionns Lampe" },
  { id: "board_b", name: "Lennarts Lampe" },
  { id: "both", name: "Beide Lampen" }
];
export const BOARD_IDS = ["board_a", "board_b"];
const ON_OFF = "action.devices.traits.OnOff";

export function sync(requestId, agentUserId = "gacha-lamps") {
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

export async function execute(requestId, payload, bridge) {
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
    try {
      await bridge.setOn(known, onOff.params.on);
      commands.push({ ids: known, status: "SUCCESS", states: { on: onOff.params.on, online: true } });
    } catch (_e) {
      commands.push({ ids: known, status: "ERROR", errorCode: "deviceOffline" });
    }
  }
  return { requestId, payload: { commands } };
}

export async function fulfil(body, bridge) {
  const input = (body && body.inputs && body.inputs[0]) || {};
  const requestId = body && body.requestId;
  switch (input.intent) {
    case "action.devices.SYNC": return sync(requestId);
    case "action.devices.QUERY": return query(requestId, input.payload || {}, bridge);
    case "action.devices.EXECUTE": return execute(requestId, input.payload || {}, bridge);
    case "action.devices.DISCONNECT": return {};
    default: return { requestId, payload: { errorCode: "protocolError" } };
  }
}

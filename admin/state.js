// Shared mutable state for the admin app.
export const state = {
  mount: null,
  configBase: "",
  admin: null,        // config/admin.json contents
  backup: null,       // config/backup.json contents (for inbox endpoint)
  outcomes: null,     // { json, sha } for config/outcomes.json
  special: null,      // { json, sha } for config/special-days.json
  activeTab: "inbox", // inbox | outcomes | special | settings
  activity: []        // inbox feed entries
};

export function setMount(el) { state.mount = el; }
export function setConfigBase(base) { state.configBase = base || ""; }

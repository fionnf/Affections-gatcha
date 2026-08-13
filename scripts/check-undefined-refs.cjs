#!/usr/bin/env node
// Catches identifiers a module uses but never imports or declares.
//
// This exists because of a real outage: renderPull() called freikarteCount()
// without importing it. Bundlers do not resolve free identifiers — they leave
// them to the browser, where the ReferenceError only fires when that exact
// branch runs. The reveal died half-finished: title and message were written
// into the DOM, but the result card was never unhidden, so the app looked like
// it had simply stopped drawing.
//
// The scan is deliberately conservative: a name declared in ANY scope of the
// file counts as declared, so shadowing mistakes slip through. That keeps false
// positives at zero, which is what makes it safe to run in CI.

const fs = require("fs");
const path = require("path");
const acorn = require("acorn");
const walk = require("acorn-walk");

const GLOBALS = new Set([
  // language
  "globalThis", "Object", "Array", "String", "Number", "Boolean", "Symbol", "BigInt",
  "Math", "JSON", "Date", "RegExp", "Error", "TypeError", "RangeError", "SyntaxError",
  "Map", "Set", "WeakMap", "WeakSet", "Promise", "Proxy", "Reflect", "Intl",
  "parseInt", "parseFloat", "isNaN", "isFinite", "encodeURIComponent", "decodeURIComponent",
  "encodeURI", "decodeURI", "NaN", "Infinity", "undefined", "console", "structuredClone",
  "ArrayBuffer", "Uint8Array", "Uint8ClampedArray", "Int8Array", "Float32Array", "DataView",
  "TextEncoder", "TextDecoder", "AggregateError", "queueMicrotask", "escape", "unescape",
  // browser
  "window", "document", "navigator", "location", "history", "localStorage", "sessionStorage",
  "fetch", "Request", "Response", "Headers", "URL", "URLSearchParams", "FormData", "Blob", "File",
  "FileReader", "Image", "Audio", "AudioContext", "webkitAudioContext", "Notification",
  "setTimeout", "clearTimeout", "setInterval", "clearInterval",
  "requestAnimationFrame", "cancelAnimationFrame", "requestIdleCallback",
  "performance", "crypto", "atob", "btoa", "alert", "confirm", "prompt", "matchMedia",
  "getComputedStyle", "scrollTo", "screen", "visualViewport", "devicePixelRatio",
  "Element", "HTMLElement", "Node", "NodeList", "Event", "CustomEvent", "MutationObserver",
  "IntersectionObserver", "ResizeObserver", "AbortController", "DOMParser", "XMLHttpRequest",
  "ServiceWorkerRegistration", "PushSubscription", "caches", "indexedDB", "BroadcastChannel",
  "MediaRecorder", "MediaStream", "OffscreenCanvas", "Path2D",
  // service worker
  "self", "clients", "registration", "skipWaiting", "importScripts", "ExtendableEvent",
  // node (scripts/)
  "require", "module", "exports", "process", "Buffer", "__dirname", "__filename",
  // Google Apps Script runtime (scripts/*-apps-script*.js run inside Google,
  // not here, so their globals are provided by that runtime)
  "SpreadsheetApp", "DriveApp", "MailApp", "GmailApp", "ContentService", "HtmlService",
  "Utilities", "PropertiesService", "LockService", "CacheService", "UrlFetchApp",
  "ScriptApp", "Session", "Logger", "CalendarApp",
]);

function collect(ast) {
  const declared = new Set();
  const used = new Map(); // name -> first line

  function declarePattern(node) {
    if (!node) return;
    switch (node.type) {
      case "Identifier": declared.add(node.name); break;
      case "ObjectPattern":
        for (const p of node.properties) {
          if (p.type === "RestElement") declarePattern(p.argument);
          else declarePattern(p.value);
        }
        break;
      case "ArrayPattern":
        for (const el of node.elements) declarePattern(el);
        break;
      case "AssignmentPattern": declarePattern(node.left); break;
      case "RestElement": declarePattern(node.argument); break;
    }
  }

  walk.full(ast, (node) => {
    switch (node.type) {
      case "ImportSpecifier":
      case "ImportDefaultSpecifier":
      case "ImportNamespaceSpecifier":
        declared.add(node.local.name);
        break;
      case "VariableDeclarator":
        declarePattern(node.id);
        break;
      case "FunctionDeclaration":
      case "FunctionExpression":
      case "ArrowFunctionExpression":
        if (node.id) declared.add(node.id.name);
        for (const p of node.params) declarePattern(p);
        break;
      case "ClassDeclaration":
      case "ClassExpression":
        if (node.id) declared.add(node.id.name);
        break;
      case "CatchClause":
        declarePattern(node.param);
        break;
    }
  });

  // Reference positions only: skip non-computed member properties, object keys,
  // class member names, labels, and the import/export sides of specifiers.
  const skip = new Set();
  walk.full(ast, (node) => {
    if (node.type === "MemberExpression" && !node.computed) skip.add(node.property);
    if (node.type === "Property" && !node.computed) skip.add(node.key);
    if ((node.type === "MethodDefinition" || node.type === "PropertyDefinition") && !node.computed) skip.add(node.key);
    if (node.type === "LabeledStatement") skip.add(node.label);
    if (node.type === "BreakStatement" || node.type === "ContinueStatement") skip.add(node.label);
    if (node.type === "ImportSpecifier") skip.add(node.imported);
    if (node.type === "ExportSpecifier") { skip.add(node.local); skip.add(node.exported); }
  });

  walk.full(ast, (node, _st, _type) => {
    if (node.type !== "Identifier" || skip.has(node)) return;
    if (!used.has(node.name)) used.set(node.name, node.loc ? node.loc.start.line : 0);
  });

  return { declared, used };
}

function scan(file) {
  const src = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "module", locations: true });
  } catch (err) {
    return [{ name: `(parse error) ${err.message}`, line: 0 }];
  }
  const { declared, used } = collect(ast);
  const bad = [];
  for (const [name, line] of used) {
    if (declared.has(name) || GLOBALS.has(name)) continue;
    bad.push({ name, line });
  }
  return bad.sort((a, b) => a.line - b.line);
}

const roots = process.argv.slice(2);
const files = [];
for (const root of roots.length ? roots : ["src", "sw.js"]) {
  const p = path.resolve(root);
  if (!fs.existsSync(p)) continue;
  if (fs.statSync(p).isDirectory()) {
    for (const f of fs.readdirSync(p)) if (f.endsWith(".js")) files.push(path.join(p, f));
  } else {
    files.push(p);
  }
}

let total = 0;
for (const file of files.sort()) {
  const bad = scan(file);
  if (!bad.length) continue;
  total += bad.length;
  const rel = path.relative(process.cwd(), file);
  for (const { name, line } of bad) console.error(`${rel}:${line}  '${name}' is not defined`);
}

if (total) {
  console.error(`\n${total} undefined reference${total === 1 ? "" : "s"} found.`);
  process.exit(1);
}
console.log(`No undefined references in ${files.length} file${files.length === 1 ? "" : "s"}.`);

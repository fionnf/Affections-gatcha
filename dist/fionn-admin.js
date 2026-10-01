(function(){"use strict";const c={mount:null,configBase:"",admin:null,backup:null,outcomes:null,special:null,activeTab:"inbox",activity:[]};function z(e){c.mount=e}function N(e){c.configBase=e}const C=`
:root{
  --bg:#11181a; --surface:#1a2426; --surface2:#222f31; --line:#2e3d40;
  --text:#e8f0ee; --muted:#9fb2ad; --primary:#4aaa5a; --primary-d:#2d7a3a;
  --gold:#e8a020; --danger:#e0563b; --blue:#3d9be0;
  --radius:14px;
}
*{box-sizing:border-box}
body{margin:0}
.fa-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  color:var(--text);background:var(--bg);min-height:100vh;
  max-width:680px;margin:0 auto;padding:0 14px 96px;
  -webkit-text-size-adjust:100%}
.fa-app h1,.fa-app h2,.fa-app h3{font-weight:650;line-height:1.2}
.fa-app a{color:var(--blue)}
.fa-muted{color:var(--muted)}
.fa-row{display:flex;gap:10px;align-items:center}
.fa-row.wrap{flex-wrap:wrap}
.fa-spacer{flex:1}

/* header */
.fa-header{position:sticky;top:0;z-index:5;background:var(--bg);
  padding:16px 0 10px;border-bottom:1px solid var(--line)}
.fa-header h1{margin:0;font-size:1.15rem}
.fa-header .fa-sub{margin:2px 0 0;font-size:.78rem;color:var(--muted)}

/* tab bar (bottom) */
.fa-tabs{position:fixed;left:0;right:0;bottom:0;z-index:10;
  display:flex;justify-content:center;gap:4px;
  background:var(--surface);border-top:1px solid var(--line);
  padding:8px max(env(safe-area-inset-left),10px) calc(8px + env(safe-area-inset-bottom)) max(env(safe-area-inset-right),10px)}
.fa-tab{flex:1;max-width:150px;background:none;border:0;color:var(--muted);
  font-size:.72rem;padding:6px 4px;border-radius:10px;display:flex;
  flex-direction:column;align-items:center;gap:3px;cursor:pointer}
.fa-tab .fa-ico{font-size:1.25rem;line-height:1}
.fa-tab.active{color:var(--text);background:var(--surface2)}

/* cards & sections */
.fa-card{background:var(--surface);border:1px solid var(--line);
  border-radius:var(--radius);padding:14px;margin:12px 0}
.fa-card h3{margin:0 0 8px;font-size:1rem}
.fa-section-title{margin:18px 0 6px;font-size:.8rem;letter-spacing:.04em;
  text-transform:uppercase;color:var(--muted)}

/* forms */
.fa-field{display:block;margin:10px 0}
.fa-field label{display:block;font-size:.78rem;color:var(--muted);margin-bottom:4px}
.fa-input,.fa-textarea,.fa-select{width:100%;background:var(--bg);
  color:var(--text);border:1px solid var(--line);border-radius:10px;
  padding:10px 12px;font-size:.95rem;font-family:inherit}
.fa-textarea{min-height:72px;resize:vertical}
.fa-input:focus,.fa-textarea:focus,.fa-select:focus{outline:2px solid var(--primary);border-color:var(--primary)}
.fa-checkbox{display:flex;align-items:center;gap:8px;font-size:.9rem;margin:8px 0}
.fa-checkbox input{width:18px;height:18px;accent-color:var(--primary)}
.fa-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* buttons */
.fa-btn{appearance:none;border:0;border-radius:11px;padding:11px 16px;
  font-size:.92rem;font-weight:600;cursor:pointer;font-family:inherit;
  background:var(--surface2);color:var(--text)}
.fa-btn:active{transform:translateY(1px)}
.fa-btn:disabled{opacity:.5;cursor:default}
.fa-btn.primary{background:var(--primary);color:#06210d}
.fa-btn.gold{background:var(--gold);color:#2a1800}
.fa-btn.danger{background:transparent;color:var(--danger);border:1px solid var(--danger)}
.fa-btn.ghost{background:transparent;border:1px solid var(--line);color:var(--text)}
.fa-btn.sm{padding:7px 11px;font-size:.82rem}

/* list items */
.fa-item{background:var(--surface2);border:1px solid var(--line);
  border-radius:12px;padding:11px 12px;margin:8px 0}
.fa-item h4{margin:0 0 2px;font-size:.95rem}
.fa-item p{margin:0;font-size:.82rem;color:var(--muted);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.fa-pill{display:inline-block;font-size:.68rem;padding:2px 8px;border-radius:999px;
  background:var(--bg);border:1px solid var(--line);color:var(--muted);margin-right:6px}

/* feedback */
.fa-status{font-size:.85rem;margin:8px 0;padding:9px 12px;border-radius:10px}
.fa-status.ok{background:rgba(74,170,90,.16);color:#aee6b8}
.fa-status.err{background:rgba(224,86,59,.16);color:#f1b3a4}
.fa-status.pending{background:rgba(61,155,224,.16);color:#aed8f4}
.fa-errlist{margin:8px 0;padding:10px 12px;border-radius:10px;
  background:rgba(224,86,59,.12);border:1px solid rgba(224,86,59,.4);font-size:.83rem}
.fa-errlist ul{margin:4px 0 0;padding-left:18px}
.fa-warnlist{margin:8px 0;padding:10px 12px;border-radius:10px;
  background:rgba(232,160,32,.12);border:1px solid rgba(232,160,32,.35);font-size:.83rem}

/* PIN gate */
.fa-gate{min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:16px;text-align:center;padding:24px}
.fa-gate h1{font-size:1.3rem;margin:0}
.fa-pin{font-size:1.6rem;letter-spacing:.4em;text-align:center;max-width:220px}

/* Tab-inject mode: admin panel embedded inside the main Lennart app */
.fa-tab-mode{min-height:unset;background:#11181a;padding-bottom:16px;border-radius:0}
.fa-tab-mode .fa-tabs{position:sticky;top:0;z-index:5;flex-direction:row;
  justify-content:flex-start;border-top:none;border-bottom:1px solid var(--line);
  padding:6px max(env(safe-area-inset-left),10px) 6px max(env(safe-area-inset-left),10px)}
.fa-tab-mode .fa-gate{min-height:60vh}
[data-ag-panel-admin]{background:#11181a;border-radius:16px 16px 0 0;overflow:hidden}

/* inbox feed */
.fa-feed-item{display:flex;gap:11px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--line)}
.fa-feed-ico{font-size:1.4rem;line-height:1.1}
.fa-feed-body{flex:1;min-width:0}
.fa-feed-body .fa-when{font-size:.72rem;color:var(--muted)}
.fa-feed-body .fa-what{font-size:.92rem;margin:2px 0 0;white-space:pre-wrap;word-break:break-word}
.fa-empty{text-align:center;color:var(--muted);padding:30px 10px;font-size:.9rem}
`;function E(){const e=document.createElement("style");e.textContent=C,document.head.appendChild(e)}function o(e,t={},a=[]){const n=document.createElement(e);for(const[r,i]of Object.entries(t))if(!(i==null||i===!1))if(r==="class")n.className=i;else if(r==="html")n.innerHTML=i;else if(r==="text")n.textContent=i;else if(r.startsWith("on")&&typeof i=="function")n.addEventListener(r.slice(2).toLowerCase(),i);else if(r in n&&r!=="list")try{n[r]=i}catch{n.setAttribute(r,i)}else n.setAttribute(r,i);const s=Array.isArray(a)?a:[a];for(const r of s)r==null||r===!1||n.appendChild(typeof r=="string"?document.createTextNode(r):r);return n}const x="fionn-admin:session:v1",h="fionn-admin:inbox-last-seen:v1",L="fionn-admin:notif:v1";async function I(e){const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2,"0")).join("")}function T(){try{const e=window.localStorage.getItem(x);return e&&e===c.admin.pinHash}catch{return!1}}async function $(e){const t=c.admin.salt||"";return await I(`${t}:${e}`)===c.admin.pinHash}function A(e){return new Promise(t=>{e.innerHTML=`
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">PIN eingeben</p>
        <input class="fa-input fa-pin" type="password" inputmode="numeric"
               autocomplete="off" data-pin maxlength="12" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;const a=e.querySelector("[data-pin]"),n=e.querySelector("[data-go]"),s=e.querySelector("[data-msg]");a.focus();async function r(){const i=a.value.trim();if(!i)return;if(n.disabled=!0,await $(i)){try{window.localStorage.setItem(x,c.admin.pinHash)}catch{}t();return}n.disabled=!1,s.hidden=!1,s.textContent="Falscher PIN.",a.value="",a.focus()}n.addEventListener("click",r),a.addEventListener("keydown",i=>{i.key==="Enter"&&r()})})}const j={hug:"🫂",wish:"✨",voucher:"🎟️",answer:"💬",quest:"📸",ping:"📍"};function b(){const e=c.backup;return!e||!e.enabled?"":typeof e.endpointUrl=="string"?e.endpointUrl.trim():""}async function y(){const e=b();if(!e)return[];const t=await fetch(`${e}?token=lennart&feed=activity`,{method:"GET",cache:"no-store"});if(!t.ok)throw new Error(`Feed (${t.status})`);const a=await t.json(),n=Array.isArray(a.activity)?a.activity:[];return n.sort((s,r)=>l(r)-l(s)),n}function l(e){const t=e&&(e.timestamp||e.ts||e.time),a=t?Date.parse(t):NaN;return Number.isFinite(a)?a:0}function F(e){const t=l(e);if(!t)return"";try{return new Intl.DateTimeFormat("de-CH",{timeZone:"Europe/Zurich",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}catch{return new Date(t).toLocaleString()}}function P(e){switch(e.type){case"hug":return"Notfall-Umarmung";case"wish":return"Wunsch";case"voucher":return"Gutschein eingelöst";case"answer":return"Prompt-Antwort";case"quest":return"Quest gelöst";default:return e.type||"Eintrag"}}function q(e){return e.type==="answer"?`${e.prompt?`Frage: ${e.prompt}
`:""}${e.answer||e.text||""}`:e.type==="quest"?`${e.challenge||""}${e.points?` · ${e.points} Punkte`:""}`:e.message||e.wish||e.text||""}async function B(e){if(e.innerHTML="",e.appendChild(o("p",{class:"fa-section-title",text:"Eingänge von Lennart"})),typeof Notification<"u"&&Notification.permission==="default"){const n=o("button",{class:"fa-btn primary",text:"🔔 Benachrichtigungen aktivieren"});n.addEventListener("click",async()=>{n.disabled=!0;const{requestPermission:s}=await Promise.resolve().then(()=>O),r=await s();n.textContent=r==="granted"?"Benachrichtigungen aktiv ✓":"Vom Browser abgelehnt"}),e.appendChild(n)}const t=o("div",{}),a=o("p",{class:"fa-muted",text:"Lade…"});if(e.appendChild(a),e.appendChild(t),!b()){a.remove(),e.appendChild(o("p",{class:"fa-empty",text:"Kein Backend konfiguriert (config/backup.json)."}));return}try{const n=await y();if(c.activity=n,a.remove(),!n.length){e.appendChild(o("p",{class:"fa-empty",text:"Noch keine Eingänge."}));return}for(const s of n)t.appendChild(o("div",{class:"fa-feed-item"},[o("div",{class:"fa-feed-ico",text:j[s.type]||"•"}),o("div",{class:"fa-feed-body"},[o("div",{class:"fa-when",text:`${P(s)} · ${F(s)}`}),o("p",{class:"fa-what",text:q(s)})])]))}catch(n){a.remove(),e.appendChild(o("div",{class:"fa-status err",text:`Feed konnte nicht geladen werden: ${n.message}`})),e.appendChild(o("p",{class:"fa-muted",style:"font-size:.78rem;margin-top:8px",text:"Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])."}))}}let d=null,g=null;function v(){try{return Number(window.localStorage.getItem(h))||0}catch{return 0}}function H(e){try{window.localStorage.setItem(h,String(e))}catch{}}async function m(){if(!("serviceWorker"in navigator))return null;try{if(d=await navigator.serviceWorker.ready,d.periodicSync)try{(await navigator.permissions.query({name:"periodic-background-sync"})).state==="granted"&&await d.periodicSync.register("fionn-inbox-poll",{minInterval:60*60*1e3})}catch{}return navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="POLL_INBOX"&&p()}),d}catch{return null}}async function M(){if(!("Notification"in window))return"unsupported";let e=Notification.permission;if(e==="default")try{e=await Notification.requestPermission()}catch{}try{window.localStorage.setItem(L,e)}catch{}return e==="granted"&&await m(),e}function w(e,t){if(!(!("Notification"in window)||Notification.permission!=="granted"))if(d&&d.active)d.active.postMessage({type:"SHOW_NOTIFICATION",title:e,body:t,tag:"fionn-inbox"});else try{new Notification(e,{body:t,icon:"./media/icon-192.png"})}catch{}}async function p({silent:e=!1}={}){let t=[];try{t=await y()}catch{return[]}c.activity=t;const a=v(),n=t.filter(r=>l(r)>a&&(r.type==="hug"||r.type==="wish")),s=t.reduce((r,i)=>Math.max(r,l(i)),a);if(!e&&n.length){const r=n.find(u=>u.type==="hug");r&&w("🫂 Lennart hat dich angestupst",r.message||"Notfall-Umarmung gebraucht");const i=n.filter(u=>u.type==="wish");i.length&&w("✨ Neuer Wunsch",i[0].wish||i[0].message||"Lennart hat etwas gewünscht")}return s>a&&H(s),t}function k(){const e=c.admin&&Number(c.admin.pollMinutes)||30;g&&clearInterval(g),v()||p({silent:!0}),g=setInterval(()=>p({silent:!1}),Math.max(5,e)*60*1e3),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&p({silent:!1})})}const O=Object.freeze(Object.defineProperty({__proto__:null,pollOnce:p,registerServiceWorker:m,requestPermission:M,startPolling:k},Symbol.toStringTag,{value:"Module"})),f=document.currentScript,_=(f==null?void 0:f.dataset.mount)||"#fionn-admin",W=(f==null?void 0:f.dataset.configBase)||"./";async function S(e,t){try{const a=await fetch(`${c.configBase}${e}`,{cache:"no-store"});if(!a.ok)throw new Error(String(a.status));return await a.json()}catch(a){if(t!==void 0)return t;throw a}}function U(e){e.innerHTML="";const t=o("div",{class:"fa-app"});t.appendChild(o("header",{class:"fa-header"},[o("h1",{text:"Affektions-Gacha · Fionn"}),o("p",{class:"fa-sub",text:"Eingänge"})]));const a=o("main",{});t.appendChild(a),e.appendChild(t),Promise.resolve(B(a)).catch(n=>{a.appendChild(o("div",{class:"fa-status err",text:`Fehler: ${n.message}`}))})}async function D(){try{c.admin=await S("config/admin.json")}catch{throw new Error("config/admin.json fehlt oder ist ungültig.")}c.backup=await S("config/backup.json",{enabled:!1})}async function G(){E();const e=document.querySelector(_)||(()=>{const t=document.createElement("section");return t.id="fionn-admin",document.body.appendChild(t),t})();z(e),N(W);try{await D()}catch(t){e.innerHTML=`<div class="fa-app"><div class="fa-status err">${t.message}</div></div>`;return}T()||await A(e),U(e),m(),k()}G()})();

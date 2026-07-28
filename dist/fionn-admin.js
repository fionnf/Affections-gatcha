(function(){"use strict";const c={mount:null,configBase:"",admin:null,backup:null,outcomes:null,special:null,activeTab:"inbox",activity:[]};function w(e){c.mount=e}function k(e){c.configBase=e}const j=`
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
`;function S(){const e=document.createElement("style");e.textContent=j,document.head.appendChild(e)}function s(e,n={},a=[]){const t=document.createElement(e);for(const[i,r]of Object.entries(n))if(!(r==null||r===!1))if(i==="class")t.className=r;else if(i==="html")t.innerHTML=r;else if(i==="text")t.textContent=r;else if(i.startsWith("on")&&typeof r=="function")t.addEventListener(i.slice(2).toLowerCase(),r);else if(i in t&&i!=="list")try{t[i]=r}catch{t.setAttribute(i,r)}else t.setAttribute(i,r);const o=Array.isArray(a)?a:[a];for(const i of o)i==null||i===!1||t.appendChild(typeof i=="string"?document.createTextNode(i):i);return t}const E="fionn-admin:session:v1",L="fionn-admin:inbox-last-seen:v1",F="fionn-admin:notif:v1";async function M(e){const n=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}function b(){try{const e=window.localStorage.getItem(E);return e&&e===c.admin.pinHash}catch{return!1}}async function B(e){const n=c.admin.salt||"";return await M(`${n}:${e}`)===c.admin.pinHash}function C(e){return new Promise(n=>{e.innerHTML=`
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">PIN eingeben</p>
        <input class="fa-input fa-pin" type="password" inputmode="numeric"
               autocomplete="off" data-pin maxlength="12" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;const a=e.querySelector("[data-pin]"),t=e.querySelector("[data-go]"),o=e.querySelector("[data-msg]");a.focus();async function i(){const r=a.value.trim();if(!r)return;if(t.disabled=!0,await B(r)){try{window.localStorage.setItem(E,c.admin.pinHash)}catch{}n();return}t.disabled=!1,o.hidden=!1,o.textContent="Falscher PIN.",a.value="",a.focus()}t.addEventListener("click",i),a.addEventListener("keydown",r=>{r.key==="Enter"&&i()})})}const H={hug:"🫂",wish:"✨",voucher:"🎟️",answer:"💬",quest:"📸",ping:"📍"};function N(){const e=c.backup;return!e||!e.enabled?"":typeof e.endpointUrl=="string"?e.endpointUrl.trim():""}async function z(){const e=N();if(!e)return[];const n=await fetch(`${e}?token=lennart&feed=activity`,{method:"GET",cache:"no-store"});if(!n.ok)throw new Error(`Feed (${n.status})`);const a=await n.json(),t=Array.isArray(a.activity)?a.activity:[];return t.sort((o,i)=>u(i)-u(o)),t}function u(e){const n=e&&(e.timestamp||e.ts||e.time),a=n?Date.parse(n):NaN;return Number.isFinite(a)?a:0}function O(e){const n=u(e);if(!n)return"";try{return new Intl.DateTimeFormat("de-CH",{timeZone:"Europe/Zurich",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(n))}catch{return new Date(n).toLocaleString()}}function _(e){switch(e.type){case"hug":return"Notfall-Umarmung";case"wish":return"Wunsch";case"voucher":return"Gutschein eingelöst";case"answer":return"Prompt-Antwort";case"quest":return"Quest gelöst";default:return e.type||"Eintrag"}}function W(e){return e.type==="answer"?`${e.prompt?`Frage: ${e.prompt}
`:""}${e.answer||e.text||""}`:e.type==="quest"?`${e.challenge||""}${e.points?` · ${e.points} Punkte`:""}`:e.message||e.wish||e.text||""}async function R(e){if(e.innerHTML="",e.appendChild(s("p",{class:"fa-section-title",text:"Eingänge von Lennart"})),typeof Notification<"u"&&Notification.permission==="default"){const t=s("button",{class:"fa-btn primary",text:"🔔 Benachrichtigungen aktivieren"});t.addEventListener("click",async()=>{t.disabled=!0;const{requestPermission:o}=await Promise.resolve().then(()=>G),i=await o();t.textContent=i==="granted"?"Benachrichtigungen aktiv ✓":"Vom Browser abgelehnt"}),e.appendChild(t)}const n=s("div",{}),a=s("p",{class:"fa-muted",text:"Lade…"});if(e.appendChild(a),e.appendChild(n),!N()){a.remove(),e.appendChild(s("p",{class:"fa-empty",text:"Kein Backend konfiguriert (config/backup.json)."}));return}try{const t=await z();if(c.activity=t,a.remove(),!t.length){e.appendChild(s("p",{class:"fa-empty",text:"Noch keine Eingänge."}));return}for(const o of t)n.appendChild(s("div",{class:"fa-feed-item"},[s("div",{class:"fa-feed-ico",text:H[o.type]||"•"}),s("div",{class:"fa-feed-body"},[s("div",{class:"fa-when",text:`${_(o)} · ${O(o)}`}),s("p",{class:"fa-what",text:W(o)})])]))}catch(t){a.remove(),e.appendChild(s("div",{class:"fa-status err",text:`Feed konnte nicht geladen werden: ${t.message}`})),e.appendChild(s("p",{class:"fa-muted",style:"font-size:.78rem;margin-top:8px",text:"Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])."}))}}let p=null,h=null;function I(){try{return Number(window.localStorage.getItem(L))||0}catch{return 0}}function U(e){try{window.localStorage.setItem(L,String(e))}catch{}}async function x(){if(!("serviceWorker"in navigator))return null;try{if(p=await navigator.serviceWorker.ready,p.periodicSync)try{(await navigator.permissions.query({name:"periodic-background-sync"})).state==="granted"&&await p.periodicSync.register("fionn-inbox-poll",{minInterval:60*60*1e3})}catch{}return navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="POLL_INBOX"&&g()}),p}catch{return null}}async function D(){if(!("Notification"in window))return"unsupported";let e=Notification.permission;if(e==="default")try{e=await Notification.requestPermission()}catch{}try{window.localStorage.setItem(F,e)}catch{}return e==="granted"&&await x(),e}function A(e,n){if(!(!("Notification"in window)||Notification.permission!=="granted"))if(p&&p.active)p.active.postMessage({type:"SHOW_NOTIFICATION",title:e,body:n,tag:"fionn-inbox"});else try{new Notification(e,{body:n,icon:"./media/icon-192.png"})}catch{}}async function g({silent:e=!1}={}){let n=[];try{n=await z()}catch{return[]}c.activity=n;const a=I(),t=n.filter(i=>u(i)>a&&(i.type==="hug"||i.type==="wish")),o=n.reduce((i,r)=>Math.max(i,u(r)),a);if(!e&&t.length){const i=t.find(d=>d.type==="hug");i&&A("🫂 Lennart hat dich angestupst",i.message||"Notfall-Umarmung gebraucht");const r=t.filter(d=>d.type==="wish");r.length&&A("✨ Neuer Wunsch",r[0].wish||r[0].message||"Lennart hat etwas gewünscht")}return o>a&&U(o),n}function v(){const e=c.admin&&Number(c.admin.pollMinutes)||30;h&&clearInterval(h),I()||g({silent:!0}),h=setInterval(()=>g({silent:!1}),Math.max(5,e)*60*1e3),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&g({silent:!1})})}const G=Object.freeze(Object.defineProperty({__proto__:null,pollOnce:g,registerServiceWorker:x,requestPermission:D,startPolling:v},Symbol.toStringTag,{value:"Module"})),l=document.currentScript,K=(l==null?void 0:l.dataset.mode)==="tab",Y=(l==null?void 0:l.dataset.mount)||"#fionn-admin",T=(l==null?void 0:l.dataset.configBase)||"./";async function q(e,n){try{const a=await fetch(`${c.configBase}${e}`,{cache:"no-store"});if(!a.ok)throw new Error(String(a.status));return await a.json()}catch(a){if(n!==void 0)return n;throw a}}function $(e,n=!1){e.innerHTML="";const a=s("div",{class:n?"fa-app fa-tab-mode":"fa-app"});n||a.appendChild(s("header",{class:"fa-header"},[s("h1",{text:"Affektions-Gacha · Fionn"}),s("p",{class:"fa-sub",text:"Eingänge"})]));const t=s("main",{});a.appendChild(t),e.appendChild(a),Promise.resolve(R(t)).catch(o=>{t.appendChild(s("div",{class:"fa-status err",text:`Fehler: ${o.message}`}))})}async function P(){try{c.admin=await q("config/admin.json")}catch{throw new Error("config/admin.json fehlt oder ist ungültig.")}c.backup=await q("config/backup.json",{enabled:!1})}function V(e){return new Promise(n=>{const a=document.querySelector(e);if(a)return n(a);const t=new MutationObserver(()=>{const o=document.querySelector(e);o&&(t.disconnect(),n(o))});t.observe(document.body,{childList:!0,subtree:!0})})}async function Z(){k(T),S();try{await P()}catch(e){console.error("[fionn-inbox]",e.message);return}await V(".ag-bottomnav"),J(),v()}let m=!1;function J(){const e=document.querySelector(".ag-bottomnav"),n=document.querySelector(".ag-content");if(!e||!n)return;const a=document.createElement("section");a.className="ag-panel",a.setAttribute("data-ag-panel-admin",""),a.hidden=!0,n.appendChild(a),w(a);const t=document.createElement("button");t.className="ag-bottomnav-btn",t.type="button",t.setAttribute("role","tab"),t.setAttribute("aria-selected","false"),t.dataset.agTab="admin",t.innerHTML='<span class="ag-bottomnav-btn-icon" aria-hidden="true">📥</span><span class="ag-bottomnav-btn-label">Eingänge</span>',e.appendChild(t);function o(){e.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach(d=>{const f=d===t;d.classList.toggle("is-active",f),d.setAttribute("aria-selected",f?"true":"false")});const i=document.querySelector(".ag-nav-pill");if(i){const f=e.getBoundingClientRect(),y=(t.querySelector(".ag-bottomnav-btn-icon")||t).getBoundingClientRect();if(f&&y.width){const ee=y.left-f.left+y.width/2;i.style.width="54px",i.style.left=`${ee-54/2}px`}}["today","history","lieblinge","berge"].forEach(d=>{const f=document.querySelector(`[data-ag-panel-${d}]`);f&&(f.hidden=!0)});const r=document.querySelector("[data-ag-fab]");r&&(r.hidden=!0),a.hidden=!1,Q(a),a.scrollIntoView({behavior:"smooth",block:"start"})}t.addEventListener("click",o),e.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]").forEach(i=>{i!==t&&i.addEventListener("click",()=>{a.hidden=!0,t.classList.remove("is-active"),t.setAttribute("aria-selected","false")})})}async function Q(e){m&&b()||(b()||(m=!1,await C(e)),m||($(e,!0),m=!0))}async function X(){S();const e=document.querySelector(Y)||(()=>{const n=document.createElement("section");return n.id="fionn-admin",document.body.appendChild(n),n})();w(e),k(T);try{await P()}catch(n){e.innerHTML=`<div class="fa-app"><div class="fa-status err">${n.message}</div></div>`;return}b()||await C(e),$(e,!1),x(),v()}K?Z():X()})();

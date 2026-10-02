(function(){"use strict";const c={mount:null,configBase:"",admin:null,backup:null,outcomes:null,special:null,activeTab:"inbox",activity:[]};function T(e){c.mount=e}function I(e){c.configBase=e}const P=`
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

/* Stups + wish replies */
.fa-ping-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:10px 0 4px}
.fa-ping-note{font-size:.8rem;margin:0}
.fa-reply-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px}
.fa-reply-btn{appearance:none;border:1px solid var(--line);background:transparent;color:var(--muted);
  border-radius:999px;padding:5px 10px;font-size:.78rem;font-family:inherit;cursor:pointer}
.fa-reply-btn.active{border-color:var(--primary);color:var(--text);background:rgba(74,170,90,.16)}
.fa-reply-note{font-size:.74rem;color:var(--muted)}

/* inbox feed */
.fa-feed-item{display:flex;gap:11px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--line)}
.fa-feed-ico{font-size:1.4rem;line-height:1.1}
.fa-feed-body{flex:1;min-width:0}
.fa-feed-body .fa-when{font-size:.72rem;color:var(--muted)}
.fa-feed-body .fa-what{font-size:.92rem;margin:2px 0 0;white-space:pre-wrap;word-break:break-word}
.fa-empty{text-align:center;color:var(--muted);padding:30px 10px;font-size:.9rem}
`;function A(){const e=document.createElement("style");e.textContent=P,document.head.appendChild(e)}function o(e,t={},a=[]){const n=document.createElement(e);for(const[r,s]of Object.entries(t))if(!(s==null||s===!1))if(r==="class")n.className=s;else if(r==="html")n.innerHTML=s;else if(r==="text")n.textContent=s;else if(r.startsWith("on")&&typeof s=="function")n.addEventListener(r.slice(2).toLowerCase(),s);else if(r in n&&r!=="list")try{n[r]=s}catch{n.setAttribute(r,s)}else n.setAttribute(r,s);const i=Array.isArray(a)?a:[a];for(const r of i)r==null||r===!1||n.appendChild(typeof r=="string"?document.createTextNode(r):r);return n}const v="fionn-admin:session:v1",k="fionn-admin:inbox-last-seen:v1",O="fionn-admin:notif:v1";async function $(e){const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2,"0")).join("")}function B(){try{const e=window.localStorage.getItem(v);return e&&e===c.admin.pinHash}catch{return!1}}async function j(e){const t=c.admin.salt||"";return await $(`${t}:${e}`)===c.admin.pinHash}function M(e){return new Promise(t=>{e.innerHTML=`
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">PIN eingeben</p>
        <input class="fa-input fa-pin" type="password" inputmode="numeric"
               autocomplete="off" data-pin maxlength="12" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;const a=e.querySelector("[data-pin]"),n=e.querySelector("[data-go]"),i=e.querySelector("[data-msg]");a.focus();async function r(){const s=a.value.trim();if(!s)return;if(n.disabled=!0,await j(s)){try{window.localStorage.setItem(v,c.admin.pinHash)}catch{}t();return}n.disabled=!1,i.hidden=!1,i.textContent="Falscher PIN.",a.value="",a.focus()}n.addEventListener("click",r),a.addEventListener("keydown",s=>{s.key==="Enter"&&r()})})}const F={hug:"🫂",wish:"✨",voucher:"🎟️",answer:"💬",quest:"📸",ping:"📍"},H=[{id:"erfuellt",label:"✓ erfüllt"},{id:"irgendwann",label:"🕰 irgendwann"},{id:"lieber-nicht",label:"✗ lieber nicht"}];function h(){const e=c.backup;return!e||!e.enabled?"":typeof e.endpointUrl=="string"?e.endpointUrl.trim():""}async function S(e){const t=h();if(!t)throw new Error("Kein Backend konfiguriert");const a=JSON.stringify(e),n={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:a};try{const i=await fetch(t,n);try{return await i.json()}catch{return null}}catch{return await fetch(t,{...n,mode:"no-cors"}),null}}function q(){return S({type:"ping",token:"fionn"})}function W(e,t){return S({type:"wish-status",timestamp:e,status:t})}async function C(){const e=h();if(!e)return[];const t=await fetch(`${e}?token=lennart&feed=activity`,{method:"GET",cache:"no-store"});if(!t.ok)throw new Error(`Feed (${t.status})`);const a=await t.json(),n=Array.isArray(a.activity)?a.activity:[];return n.sort((i,r)=>g(r)-g(i)),n}function g(e){const t=e&&(e.timestamp||e.ts||e.time),a=t?Date.parse(t):NaN;return Number.isFinite(a)?a:0}function _(e){const t=g(e);if(!t)return"";try{return new Intl.DateTimeFormat("de-CH",{timeZone:"Europe/Zurich",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}catch{return new Date(t).toLocaleString()}}function U(e){switch(e.type){case"hug":return"Notfall-Umarmung";case"wish":return"Wunsch";case"voucher":return"Gutschein eingelöst";case"answer":return"Prompt-Antwort";case"quest":return"Quest gelöst";default:return e.type||"Eintrag"}}function K(e){return e.type==="answer"?`${e.prompt?`Frage: ${e.prompt}
`:""}${e.answer||e.text||""}`:e.type==="quest"?`${e.challenge||""}${e.points?` · ${e.points} Punkte`:""}`:e.message||e.wish||e.text||""}async function D(e){if(e.innerHTML="",e.appendChild(o("p",{class:"fa-section-title",text:"Eingänge von Lennart"})),typeof Notification<"u"&&Notification.permission==="default"){const n=o("button",{class:"fa-btn primary",text:"🔔 Benachrichtigungen aktivieren"});n.addEventListener("click",async()=>{n.disabled=!0;const{requestPermission:i}=await Promise.resolve().then(()=>Y),r=await i();n.textContent=r==="granted"?"Benachrichtigungen aktiv ✓":"Vom Browser abgelehnt"}),e.appendChild(n)}if(h()){const n=o("p",{class:"fa-muted fa-ping-note",text:""}),i=o("button",{class:"fa-btn ghost",text:"👋 Lennart anstupsen"});i.addEventListener("click",async()=>{i.disabled=!0,n.textContent="Stups unterwegs…";try{const r=await q();n.textContent=r&&r.ok===!1?"Das Script kennt den Stups noch nicht — neu deployen.":"Stups gesendet 👋 — er sieht ihn beim nächsten Öffnen."}catch{n.textContent="Gerade keine Verbindung."}setTimeout(()=>{i.disabled=!1},4e3)}),e.appendChild(o("div",{class:"fa-ping-row"},[i,n]))}const t=o("div",{}),a=o("p",{class:"fa-muted",text:"Lade…"});if(e.appendChild(a),e.appendChild(t),!h()){a.remove(),e.appendChild(o("p",{class:"fa-empty",text:"Kein Backend konfiguriert (config/backup.json)."}));return}try{const n=await C();if(c.activity=n,a.remove(),!n.length){e.appendChild(o("p",{class:"fa-empty",text:"Noch keine Eingänge."}));return}for(const i of n){const r=o("div",{class:"fa-feed-body"},[o("div",{class:"fa-when",text:`${U(i)} · ${_(i)}`}),o("p",{class:"fa-what",text:K(i)})]);i.type==="wish"&&i.timestamp&&r.appendChild(G(i)),t.appendChild(o("div",{class:"fa-feed-item"},[o("div",{class:"fa-feed-ico",text:F[i.type]||"•"}),r]))}}catch(n){a.remove(),e.appendChild(o("div",{class:"fa-status err",text:`Feed konnte nicht geladen werden: ${n.message}`})),e.appendChild(o("p",{class:"fa-muted",style:"font-size:.78rem;margin-top:8px",text:"Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])."}))}}function G(e){const t=o("div",{class:"fa-reply-row"}),a=o("span",{class:"fa-reply-note",text:""});let n=e.status||"";const i=H.map(r=>{const s=o("button",{class:"fa-reply-btn"+(n===r.id?" active":""),text:r.label});return s.addEventListener("click",async()=>{const l=n===r.id?"":r.id,u=n;n=l,e.status=l;for(const d of i)d.classList.toggle("active",d.dataset.id===l);a.textContent="…";try{const d=await W(e.timestamp,l);if(d&&d.ok===!1){a.textContent=d.error==="unknown type"||/type/i.test(d.error||"")?"Script neu deployen":d.error||"nicht gespeichert",n=u,e.status=u;for(const L of i)L.classList.toggle("active",L.dataset.id===u)}else a.textContent=l?"gespeichert — er sieht es auf der nächsten Kapsel":"zurückgenommen"}catch{a.textContent="keine Verbindung",n=u,e.status=u;for(const d of i)d.classList.toggle("active",d.dataset.id===u)}setTimeout(()=>{a.textContent=""},4e3)}),s.dataset.id=r.id,s});for(const r of i)t.appendChild(r);return t.appendChild(a),t}let p=null,b=null;function N(){try{return Number(window.localStorage.getItem(k))||0}catch{return 0}}function J(e){try{window.localStorage.setItem(k,String(e))}catch{}}async function x(){if(!("serviceWorker"in navigator))return null;try{if(p=await navigator.serviceWorker.ready,p.periodicSync)try{(await navigator.permissions.query({name:"periodic-background-sync"})).state==="granted"&&await p.periodicSync.register("fionn-inbox-poll",{minInterval:60*60*1e3})}catch{}return navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="POLL_INBOX"&&m()}),p}catch{return null}}async function R(){if(!("Notification"in window))return"unsupported";let e=Notification.permission;if(e==="default")try{e=await Notification.requestPermission()}catch{}try{window.localStorage.setItem(O,e)}catch{}return e==="granted"&&(await x(),await y()),e}function V(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}async function y(){const e=c.push;if(!e||!e.enabled||!e.vapidPublicKey||!("serviceWorker"in navigator)||!("PushManager"in window)||!("Notification"in window)||Notification.permission!=="granted")return!1;const t=c.backup&&c.backup.enabled&&c.backup.endpointUrl||"";if(!t)return!1;try{const a=await navigator.serviceWorker.ready;let n=await a.pushManager.getSubscription();n||(n=await a.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:V(e.vapidPublicKey)}));const i=JSON.stringify({type:"push-subscribe",token:"fionn",subscription:n.toJSON()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i};return await fetch(t,r).catch(()=>fetch(t,{...r,mode:"no-cors"})),!0}catch(a){return console.warn("[fionn-inbox] push subscription failed:",a&&a.message),!1}}function z(e,t){if(!(!("Notification"in window)||Notification.permission!=="granted"))if(p&&p.active)p.active.postMessage({type:"SHOW_NOTIFICATION",title:e,body:t,tag:"fionn-inbox"});else try{new Notification(e,{body:t,icon:"./media/icon-192.png"})}catch{}}async function m({silent:e=!1}={}){let t=[];try{t=await C()}catch{return[]}c.activity=t;const a=N(),n=t.filter(r=>g(r)>a&&(r.type==="hug"||r.type==="wish")),i=t.reduce((r,s)=>Math.max(r,g(s)),a);if(!e&&n.length){const r=n.find(l=>l.type==="hug");r&&z("🫂 Lennart hat dich angestupst",r.message||"Notfall-Umarmung gebraucht");const s=n.filter(l=>l.type==="wish");s.length&&z("✨ Neuer Wunsch",s[0].wish||s[0].message||"Lennart hat etwas gewünscht")}return i>a&&J(i),t}function E(){"Notification"in window&&Notification.permission==="granted"&&y().catch(()=>{});const e=c.admin&&Number(c.admin.pollMinutes)||30;b&&clearInterval(b),N()||m({silent:!0}),b=setInterval(()=>m({silent:!1}),Math.max(5,e)*60*1e3),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&m({silent:!1})})}const Y=Object.freeze(Object.defineProperty({__proto__:null,pollOnce:m,registerServiceWorker:x,requestPermission:R,startPolling:E,subscribeToPush:y},Symbol.toStringTag,{value:"Module"})),f=document.currentScript,Z=(f==null?void 0:f.dataset.mount)||"#fionn-admin",Q=(f==null?void 0:f.dataset.configBase)||"./";async function w(e,t){try{const a=await fetch(`${c.configBase}${e}`,{cache:"no-store"});if(!a.ok)throw new Error(String(a.status));return await a.json()}catch(a){if(t!==void 0)return t;throw a}}function X(e){e.innerHTML="";const t=o("div",{class:"fa-app"});t.appendChild(o("header",{class:"fa-header"},[o("h1",{text:"Affektions-Gacha · Fionn"}),o("p",{class:"fa-sub",text:"Eingänge"})]));const a=o("main",{});t.appendChild(a),e.appendChild(t),Promise.resolve(D(a)).catch(n=>{a.appendChild(o("div",{class:"fa-status err",text:`Fehler: ${n.message}`}))})}async function ee(){try{c.admin=await w("config/admin.json")}catch{throw new Error("config/admin.json fehlt oder ist ungültig.")}c.backup=await w("config/backup.json",{enabled:!1}),c.push=await w("config/push.json",{enabled:!1})}async function te(){A();const e=document.querySelector(Z)||(()=>{const t=document.createElement("section");return t.id="fionn-admin",document.body.appendChild(t),t})();T(e),I(Q);try{await ee()}catch(t){e.innerHTML=`<div class="fa-app"><div class="fa-status err">${t.message}</div></div>`;return}B()||await M(e),X(e),x(),E()}te()})();

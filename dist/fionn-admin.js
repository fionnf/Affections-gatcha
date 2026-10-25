(function(){"use strict";const c={mount:null,configBase:"",admin:null,backup:null,outcomes:null,special:null,activeTab:"inbox",activity:[]};function $(e){c.mount=e}function B(e){c.configBase=e}const j=`
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
`;function U(){const e=document.createElement("style");e.textContent=j,document.head.appendChild(e)}function s(e,n={},r=[]){const t=document.createElement(e);for(const[a,o]of Object.entries(n))if(!(o==null||o===!1))if(a==="class")t.className=o;else if(a==="html")t.innerHTML=o;else if(a==="text")t.textContent=o;else if(a.startsWith("on")&&typeof o=="function")t.addEventListener(a.slice(2).toLowerCase(),o);else if(a in t&&a!=="list")try{t[a]=o}catch{t.setAttribute(a,o)}else t.setAttribute(a,o);const i=Array.isArray(r)?r:[r];for(const a of i)a==null||a===!1||t.appendChild(typeof a=="string"?document.createTextNode(a):a);return t}const m="fionn-admin:session:v1",S="fionn-admin:inbox-last-seen:v1",F="fionn-admin:notif:v1";async function M(e){const n=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(n)).map(r=>r.toString(16).padStart(2,"0")).join("")}function C(){var e;try{const n=window.localStorage.getItem(m);if(!n)return null;if(n===((e=c.admin)==null?void 0:e.pinHash))return{pin:!0};const r=JSON.parse(n);return r&&typeof r=="object"?r:null}catch{return null}}function _(){return!!C()}function y(){const e=C();return e&&typeof e.key=="string"?e.key:""}function H(){try{window.localStorage.removeItem(m)}catch{}}async function q(e){var t,i;const n=((t=c.admin)==null?void 0:t.salt)||"";return await M(`${n}:${e}`)===((i=c.admin)==null?void 0:i.pinHash)}async function K(e){const n=c.backup&&c.backup.enabled&&typeof c.backup.endpointUrl=="string"?c.backup.endpointUrl.trim():"";if(!n)return null;try{const t=await(await fetch(`${n}?feed=whoami&key=${encodeURIComponent(e)}`,{cache:"no-store"})).json();return t&&t.ok&&typeof t.keyConfigured=="boolean"?t:null}catch{return null}}function W(e,n=""){return new Promise(r=>{e.innerHTML=`
      <div class="fa-gate">
        <div style="font-size:2.6rem">🔐</div>
        <h1>Fionn-Bereich</h1>
        <p class="fa-muted">Schlüssel eingeben</p>
        <input class="fa-input fa-pin" type="password" autocomplete="current-password"
               autocapitalize="off" spellcheck="false" data-pin maxlength="200" />
        <button class="fa-btn primary" data-go>Entsperren</button>
        <p class="fa-status err" data-msg hidden></p>
      </div>`;const t=e.querySelector("[data-pin]"),i=e.querySelector("[data-go]"),a=e.querySelector("[data-msg]");n&&(a.hidden=!1,a.textContent=n),t.focus();function o(l){i.disabled=!1,a.hidden=!1,a.textContent=l,t.value="",t.focus()}async function f(){const l=t.value.trim();if(!l)return;i.disabled=!0;const d=await K(l);if(d&&d.keyConfigured){if(!d.admin)return o("Falscher Schlüssel.");try{window.localStorage.setItem(m,JSON.stringify({key:l}))}catch{}r();return}if(await q(l)){try{window.localStorage.setItem(m,JSON.stringify({pin:!0}))}catch{}r();return}o(d?"Falscher PIN.":"Falscher PIN — oder keine Verbindung.")}i.addEventListener("click",f),t.addEventListener("keydown",l=>{l.key==="Enter"&&f()})})}class N extends Error{}function z(e){if(e&&e.ok===!1&&e.error==="unauthorised")throw H(),new N("Schlüssel abgelehnt");return e}const R={hug:"🫂",wish:"✨",voucher:"🎟️",answer:"💬",quest:"📸",ping:"📍"},D=[{id:"erfuellt",label:"✓ erfüllt"},{id:"irgendwann",label:"🕰 irgendwann"},{id:"lieber-nicht",label:"✗ lieber nicht"}];function b(){const e=c.backup;return!e||!e.enabled?"":typeof e.endpointUrl=="string"?e.endpointUrl.trim():""}async function E(e){const n=b();if(!n)throw new Error("Kein Backend konfiguriert");const r=y(),t=JSON.stringify(r?{...e,key:r}:e),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:t};let a;try{a=await fetch(n,i)}catch{return await fetch(n,{...i,mode:"no-cors"}),null}let o=null;try{o=await a.json()}catch{return null}return z(o)}function J(){return E({type:"ping",token:"fionn"})}function G(e,n){return E({type:"wish-status",timestamp:e,status:n})}async function I(){const e=b();if(!e)return[];const n=y(),r=await fetch(`${e}?token=lennart&feed=activity${n?`&key=${encodeURIComponent(n)}`:""}`,{method:"GET",cache:"no-store"});if(!r.ok)throw new Error(`Feed (${r.status})`);const t=z(await r.json()),i=Array.isArray(t.activity)?t.activity:[];return i.sort((a,o)=>g(o)-g(a)),i}function g(e){const n=e&&(e.timestamp||e.ts||e.time),r=n?Date.parse(n):NaN;return Number.isFinite(r)?r:0}function V(e){const n=g(e);if(!n)return"";try{return new Intl.DateTimeFormat("de-CH",{timeZone:"Europe/Zurich",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(n))}catch{return new Date(n).toLocaleString()}}function Y(e){switch(e.type){case"hug":return"Notfall-Umarmung";case"wish":return"Wunsch";case"voucher":return"Gutschein eingelöst";case"answer":return"Prompt-Antwort";case"quest":return"Quest gelöst";default:return e.type||"Eintrag"}}function Z(e){return e.type==="answer"?`${e.prompt?`Frage: ${e.prompt}
`:""}${e.answer||e.text||""}`:e.type==="quest"?`${e.challenge||""}${e.points?` · ${e.points} Punkte`:""}`:e.message||e.wish||e.text||""}async function Q(e){if(e.innerHTML="",e.appendChild(s("p",{class:"fa-section-title",text:"Eingänge von Lennart"})),typeof Notification<"u"&&Notification.permission==="default"){const t=s("button",{class:"fa-btn primary",text:"🔔 Benachrichtigungen aktivieren"});t.addEventListener("click",async()=>{t.disabled=!0;const{requestPermission:i}=await Promise.resolve().then(()=>ae),a=await i();t.textContent=a==="granted"?"Benachrichtigungen aktiv ✓":"Vom Browser abgelehnt"}),e.appendChild(t)}if(b()){const t=s("p",{class:"fa-muted fa-ping-note",text:""}),i=s("button",{class:"fa-btn ghost",text:"👋 Lennart anstupsen"});i.addEventListener("click",async()=>{i.disabled=!0,t.textContent="Stups unterwegs…";try{const a=await J();t.textContent=a&&a.ok===!1?"Das Script kennt den Stups noch nicht — neu deployen.":"Stups gesendet 👋 — er sieht ihn beim nächsten Öffnen."}catch{t.textContent="Gerade keine Verbindung."}setTimeout(()=>{i.disabled=!1},4e3)}),e.appendChild(s("div",{class:"fa-ping-row"},[i,t]))}const n=s("div",{}),r=s("p",{class:"fa-muted",text:"Lade…"});if(e.appendChild(r),e.appendChild(n),!b()){r.remove(),e.appendChild(s("p",{class:"fa-empty",text:"Kein Backend konfiguriert (config/backup.json)."}));return}try{const t=await I();if(c.activity=t,r.remove(),!t.length){e.appendChild(s("p",{class:"fa-empty",text:"Noch keine Eingänge."}));return}for(const i of t){const a=s("div",{class:"fa-feed-body"},[s("div",{class:"fa-when",text:`${Y(i)} · ${V(i)}`}),s("p",{class:"fa-what",text:Z(i)})]);i.type==="wish"&&i.timestamp&&a.appendChild(X(i)),n.appendChild(s("div",{class:"fa-feed-item"},[s("div",{class:"fa-feed-ico",text:R[i.type]||"•"}),a]))}}catch(t){if(t instanceof N){window.location.reload();return}r.remove(),e.appendChild(s("div",{class:"fa-status err",text:`Feed konnte nicht geladen werden: ${t.message}`})),e.appendChild(s("p",{class:"fa-muted",style:"font-size:.78rem;margin-top:8px",text:"Hinweis: Das Apps Script muss um den Feed erweitert und neu deployed sein (doGet → activity[])."}))}}function X(e){const n=s("div",{class:"fa-reply-row"}),r=s("span",{class:"fa-reply-note",text:""});let t=e.status||"";const i=D.map(a=>{const o=s("button",{class:"fa-reply-btn"+(t===a.id?" active":""),text:a.label});return o.addEventListener("click",async()=>{const f=t===a.id?"":a.id,l=t;t=f,e.status=f;for(const d of i)d.classList.toggle("active",d.dataset.id===f);r.textContent="…";try{const d=await G(e.timestamp,f);if(d&&d.ok===!1){r.textContent=d.error==="unknown type"||/type/i.test(d.error||"")?"Script neu deployen":d.error||"nicht gespeichert",t=l,e.status=l;for(const O of i)O.classList.toggle("active",O.dataset.id===l)}else r.textContent=f?"gespeichert — er sieht es auf der nächsten Kapsel":"zurückgenommen"}catch{r.textContent="keine Verbindung",t=l,e.status=l;for(const d of i)d.classList.toggle("active",d.dataset.id===l)}setTimeout(()=>{r.textContent=""},4e3)}),o.dataset.id=a.id,o});for(const a of i)n.appendChild(a);return n.appendChild(r),n}let p=null,w=null;function L(){try{return Number(window.localStorage.getItem(S))||0}catch{return 0}}function ee(e){try{window.localStorage.setItem(S,String(e))}catch{}}async function v(){if(!("serviceWorker"in navigator))return null;try{if(p=await navigator.serviceWorker.ready,p.periodicSync)try{(await navigator.permissions.query({name:"periodic-background-sync"})).state==="granted"&&await p.periodicSync.register("fionn-inbox-poll",{minInterval:60*60*1e3})}catch{}return navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="POLL_INBOX"&&h(),e.data&&e.data.type==="PUSH_RESUBSCRIBE"&&x().catch(()=>{})}),p}catch{return null}}async function te(){if(!("Notification"in window))return"unsupported";let e=Notification.permission;if(e==="default")try{e=await Notification.requestPermission()}catch{}try{window.localStorage.setItem(F,e)}catch{}return e==="granted"&&(await v(),await x()),e}function T(e){const n="=".repeat((4-e.length%4)%4),r=(e+n).replace(/-/g,"+").replace(/_/g,"/"),t=atob(r),i=new Uint8Array(t.length);for(let a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return i}async function ne(e,n){try{const r=e&&e.options&&e.options.applicationServerKey;if(!r)return!0;const t=new Uint8Array(r),i=T(n);if(t.length!==i.length)return!1;for(let a=0;a<t.length;a++)if(t[a]!==i[a])return!1;return!0}catch{return!0}}async function x(){const e=c.push;if(!e||!e.enabled||!e.vapidPublicKey||!("serviceWorker"in navigator)||!("PushManager"in window)||!("Notification"in window)||Notification.permission!=="granted")return!1;const n=c.backup&&c.backup.enabled&&c.backup.endpointUrl||"";if(!n)return!1;try{const r=await navigator.serviceWorker.ready;let t=await r.pushManager.getSubscription();if(t&&!await ne(t,e.vapidPublicKey)){try{await t.unsubscribe()}catch{}t=null}t||(t=await r.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:T(e.vapidPublicKey)}));const i=y(),a=JSON.stringify({type:"push-subscribe",token:"fionn",subscription:t.toJSON(),...i?{key:i}:{}}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:a};return await fetch(n,o).catch(()=>fetch(n,{...o,mode:"no-cors"})),!0}catch(r){return console.warn("[fionn-inbox] push subscription failed:",r&&r.message),!1}}function P(e,n){if(!(!("Notification"in window)||Notification.permission!=="granted"))if(p&&p.active)p.active.postMessage({type:"SHOW_NOTIFICATION",title:e,body:n,tag:"fionn-inbox"});else try{new Notification(e,{body:n,icon:"./media/icon-192.png"})}catch{}}async function h({silent:e=!1}={}){let n=[];try{n=await I()}catch{return[]}c.activity=n;const r=L(),t=n.filter(a=>g(a)>r&&(a.type==="hug"||a.type==="wish")),i=n.reduce((a,o)=>Math.max(a,g(o)),r);if(!e&&t.length){const a=t.find(f=>f.type==="hug");a&&P("🫂 Lennart hat dich angestupst",a.message||"Notfall-Umarmung gebraucht");const o=t.filter(f=>f.type==="wish");o.length&&P("✨ Neuer Wunsch",o[0].wish||o[0].message||"Lennart hat etwas gewünscht")}return i>r&&ee(i),n}function A(){"Notification"in window&&Notification.permission==="granted"&&x().catch(()=>{});const e=c.admin&&Number(c.admin.pollMinutes)||30;w&&clearInterval(w),L()||h({silent:!0}),w=setInterval(()=>h({silent:!1}),Math.max(5,e)*60*1e3),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&h({silent:!1})})}const ae=Object.freeze(Object.defineProperty({__proto__:null,pollOnce:h,registerServiceWorker:v,requestPermission:te,startPolling:A,subscribeToPush:x},Symbol.toStringTag,{value:"Module"})),u=document.currentScript,re=(u==null?void 0:u.dataset.mount)||"#fionn-admin",ie=(u==null?void 0:u.dataset.configBase)||"./";async function k(e,n){try{const r=await fetch(`${c.configBase}${e}`,{cache:"no-store"});if(!r.ok)throw new Error(String(r.status));return await r.json()}catch(r){if(n!==void 0)return n;throw r}}function oe(e){e.innerHTML="";const n=s("div",{class:"fa-app"});n.appendChild(s("header",{class:"fa-header"},[s("h1",{text:"Affektions-Gacha · Fionn"}),s("p",{class:"fa-sub",text:"Eingänge"})]));const r=s("main",{});n.appendChild(r),e.appendChild(n),Promise.resolve(Q(r)).catch(t=>{r.appendChild(s("div",{class:"fa-status err",text:`Fehler: ${t.message}`}))})}async function se(){try{c.admin=await k("config/admin.json")}catch{throw new Error("config/admin.json fehlt oder ist ungültig.")}c.backup=await k("config/backup.json",{enabled:!1}),c.push=await k("config/push.json",{enabled:!1})}async function ce(){U();const e=document.querySelector(re)||(()=>{const n=document.createElement("section");return n.id="fionn-admin",document.body.appendChild(n),n})();$(e),B(ie);try{await se()}catch(n){e.innerHTML=`<div class="fa-app"><div class="fa-status err">${n.message}</div></div>`;return}_()||await W(e),oe(e),v(),A()}ce()})();

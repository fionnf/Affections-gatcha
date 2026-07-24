(function(){"use strict";const g={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let L=null;function Qr(e){L=e}function l(e){return L.querySelector(e)}const da="affektions-gacha:history:v1",ca="affektions-gacha:favourites:v1",ga="affektions-gacha:tokens:v1",pa="affektions-gacha:streak-cache:v1",ua="affektions-gacha:streak-synced:v1",ma="affektions-gacha:streak-restore:v1",fa="affektions-gacha:wish:v1",ha="affektions-gacha:milestones:v1",me="affektions-gacha:notif:v1",ba="affektions-gacha:baerlauch-scores:v1",ei="affektions-gacha:baerlauch-history:v1",ya="affektions-gacha:mission-log:v1",va="affektions-gacha:gesprach-idx:v1",ti="affektions-gacha:sound:v1",xa="affektions-gacha:gipfelbuch:v1",wa="affektions-gacha:quest:v1",ht="affektions-gacha:quest-points:v1",ai=20,ka=[100,75,50,25],Ea="affektions-gacha:glossary:v1",bt="affektions-gacha:stimmung:v1",Sa="affektions-gacha:freikarte:v1",yt="affektions-gacha:freikarte-reroll:v1",ni={"🌿":"Fionn kocht dir ein Abendessen nach Wahl","🔥":"Wochenend-Abenteuer — Ziel nach deiner Wahl","⭐":"Fionns Überraschung — er entscheidet","☁️":"Ein ganzer fauler Tag ohne Pläne","🏔":"Eine richtige Bergtour, Hütte inklusive","☕":"Ein Ausflug in dein Traumcafé, egal wo","💚":"Ein langer, handgeschriebener Brief"};function D(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=i=>a.find(r=>r.type===i).value;return`${n("year")}-${n("month")}-${n("day")}`}function vt(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value);return{h:a("hour"),m:a("minute")}}function ri(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function xt(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function J(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function ii(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function oi(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Z(e){return oi(ii(e))()}function _e(e,t){return t?Math.floor(Z(e)*t):0}function si(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function li(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function di(e,t,a){return new URL(e,a()).toString()}function I(){return j()==="fionn"?"fionn":"lennart"}function j(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function Ee(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ci(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function wt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Ue(e){var s,d;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=D(t),[n,i,r]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,i-1,r)).getTime()/864e5);return Math.floor(o/(((d=e.quest)==null?void 0:d.periodDays)||2))}function je(e){var i;const t=(i=e.quest)==null?void 0:i.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Ue(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function Ta(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function gi(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const pi=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,ui=/nicht\s+einlös|kein\s+gutschein/i,mi=new Set(["photo","collect","niete"]);function Oe(e){if(!e)return!1;if(e.voucher===!0)return!0;if(mi.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return ui.test(t)?!1:pi.test(t)}function B(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function se(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const i=n[I()];return i===void 0?t:i}return localStorage.setItem(e,JSON.stringify({[I()]:n})),n}catch{return t}}function ee(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const i=n&&typeof n=="object"&&!Array.isArray(n)?n:{};i[I()]=t,localStorage.setItem(e,JSON.stringify(i))}catch{}}function _(){try{if(typeof window>"u"||!window.localStorage)return g.syncedHistory||[];const e=window.localStorage.getItem(da);if(!e)return g.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return g.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:g.syncedHistory||[]}catch{return g.syncedHistory||[]}}function le(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(da,JSON.stringify(e))}catch{}}function te(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(ca);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=g.theme)!=null&&e.timezone?D(g.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(i=>i&&typeof i.day=="string"&&typeof i.token=="string"&&i.day<=n)}catch{return[]}}function Fe(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ca,JSON.stringify(e))}catch{}}function Re(){const e=se(ga,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function kt(e){ee(ga,e)}function Ca(e){const t=Re();return t[e]=(t[e]||0)+1,kt(t),t[e]}function fi(e){const t=Re();t[e]=0,kt(t)}function Et(){try{const e=localStorage.getItem(Sa),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function La(e){try{localStorage.setItem(Sa,JSON.stringify(e))}catch{}}function hi(e){return Et()[e]||0}function Aa(e){const t=Et();return t[e]=(t[e]||0)+1,La(t),t[e]}function bi(e){const t=Et();return t[e]>0?(t[e]-=1,La(t),!0):!1}function yi(e,t){try{const a=localStorage.getItem(yt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function vi(e,t,a){try{const n=localStorage.getItem(yt),i=n?JSON.parse(n):{},r=i&&typeof i=="object"?i:{};r[`${e}|${t}`]=a,localStorage.setItem(yt,JSON.stringify(r))}catch{}}function St(){if(typeof window>"u"||!window.localStorage)return null;const e=se(fa,null);return e&&typeof e=="object"?e:null}function za(e){typeof window>"u"||!window.localStorage||ee(fa,e)}function Se(){const e=se(ma,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ma(e){ee(ma,e)}function xi(){const e=se(pa,0);return typeof e=="number"?e:parseInt(e,10)||0}function He(e){ee(pa,e)}function wi(){const e=se(ua,0);return typeof e=="number"?e:parseInt(e,10)||0}function ki(e){ee(ua,e)}function Ge(){try{const e=window.localStorage.getItem(xa);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function We(e){try{window.localStorage.setItem(xa,JSON.stringify(e))}catch{}}function Ke(){try{const e=localStorage.getItem(ya),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Tt(e){try{localStorage.setItem(ya,JSON.stringify(e))}catch{}}function Ct(){try{const e=localStorage.getItem(ba),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Ia(){try{const e=localStorage.getItem(ei),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Te(e){try{const t=se(wa,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Lt(e){ee(wa,e)}function Ye(){const e=se(ht,0);return typeof e=="number"?e:parseInt(e,10)||0}function Ei(e){try{const t=Ye()+e;return ee(ht,t),t}catch{return e}}function Si(e){ee(ht,e)}function $a(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(ha);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ti(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ha,JSON.stringify(e))}catch{}}function Ci(e,t){return $a().includes(`${e}|${t}`)}function Li(e,t){const a=`${e}|${t}`,n=$a();n.includes(a)||Ti([...n,a])}function At(e){return!1}function X(){var m;const e=I(),t=_().filter(f=>f.token===e);if(!t.length)return 0;const a=((m=g.theme)==null?void 0:m.timezone)||"UTC",n=D(a),i=new Set(t.map(f=>f.day)),[r,o,s]=n.split("-").map(Number);let d=new Date(Date.UTC(r,o-1,s)),c=n;i.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));let u=0;for(;i.has(c);)u++,d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return Math.max(u,xi(),wi())}function Da(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Na(e){if(e<5)return g.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return g.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function Ai(e,t,a=[]){const n=Na(t),i=a.length?n.filter(c=>!a.includes(c.id)):n,r=i.length?i:n,o=r.reduce((c,u)=>c+u.weight,0),s=Math.floor(Z(e)*o);let d=0;for(const c of r)if(d+=c.weight,s<d)return g.outcomes.categories.find(u=>u.id===c.id)||c;return g.outcomes.categories[g.outcomes.categories.length-1]}function Ba(){const e=Se();return Math.floor((e.maxStreak||0)/ai)}function Ve(){var n;if(Se().birthdayBonus2026Used)return 0;const t=((n=g.theme)==null?void 0:n.timezone)||"UTC";return D(t)==="2026-05-29"?1:0}function zt(){const e=Se();return Math.max(0,Ba()-(e.used||0))+Ve()}function Mt(){var u;const e=I(),t=((u=g.theme)==null?void 0:u.timezone)||"UTC",a=D(t),n=new Set(_().filter(m=>m.token===e&&m.day<=a).map(m=>m.day));if(!n.size)return null;const i=[...n].sort()[0],[r,o,s]=a.split("-").map(Number),d=new Date(Date.UTC(r,o-1,s));let c=a;for(n.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));n.has(c);)d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return c<i?null:c}function Pa(){return zt()>0&&Mt()!==null}function zi(e){if(zt()<=0)return null;const t=Mt();if(!t)return null;const a=I(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},i=new Set,r=[n,..._()].filter(c=>{const u=`${c.day}|${c.token}`;return i.has(u)?!1:(i.add(u),!0)}).sort((c,u)=>c.day<u.day?1:c.day>u.day?-1:0);le(r);const o=Se(),d=Math.max(0,Ba()-(o.used||0))===0&&Ve()>0;return Ma({...o,used:d?o.used||0:(o.used||0)+1,birthdayBonus2026Used:d?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),He(X()),t}const qa=new Map;function fe(e){qa.set(e,Date.now())}function _a(e,t=6e3){const a=qa.get(e);return typeof a=="number"&&Date.now()-a<t}let It="",$t=null;function Mi(e,t){It=e,$t=t}function Ua(){if($t)return $t();if(!It)return window.location.href;try{return new URL(It,window.location.href).toString()}catch{return window.location.href}}function H(e,t=null){const a=new URL(e,Ua()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function Je(e){var t;try{const a=L&&L.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=g.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function Ze(){var e;try{const t=g.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=I(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,i=new AbortController,r=setTimeout(()=>i.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:i.signal})}finally{clearTimeout(r)}if(!o.ok)return Je(!1),!1;const s=await o.json();if(!s.ok)return Je(!1),!1;const d=D(((e=g.theme)==null?void 0:e.timezone)||"UTC"),c=_(),u=c.filter(b=>b.title!=="(wiederhergestellt)"&&b.day<=d);u.length!==c.length&&le(u);const m=te(),f=m.filter(b=>b.day<=d);if(f.length!==m.length&&Fe(f),Array.isArray(s.history)&&s.history.length){const b=_(),y=new Map(b.map(h=>[`${h.day}|${h.token}`,h]));for(const h of s.history){if(h.title==="(wiederhergestellt)")continue;const x=gi(h.day);if(!x||x>d)continue;const z=typeof h.token=="string"?h.token.toLowerCase():h.token;y.set(`${x}|${z}`,{...h,day:x,token:z})}const v=Array.from(y.values()).sort((h,x)=>x.day.localeCompare(h.day));le(v),g.syncedHistory=v,He(X())}if(Array.isArray(s.favourites)&&s.favourites.length){const b=te(),y=new Map(b.map(v=>[`${v.day}|${v.token}`,v]));for(const v of s.favourites){if(v.day>d)continue;const h=typeof v.token=="string"?v.token.toLowerCase():v.token;y.set(`${v.day}|${h}`,{...v,token:h})}Fe(Array.from(y.values()).sort((v,h)=>h.day.localeCompare(v.day)))}if(s.tokens&&typeof s.tokens=="object"&&kt(s.tokens),typeof s.questPoints=="number"&&s.questPoints>Ye()&&Si(s.questPoints),typeof s.streak=="number"&&s.streak>0&&(ki(s.streak),s.streak>X()&&He(s.streak)),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const b=Ct();let y=!1;for(const[v,h]of Object.entries(s.baerlauchScores))typeof h=="number"&&h>(b[v]||0)&&(b[v]=h,y=!0);if(y)try{localStorage.setItem(ba,JSON.stringify(b))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const b=Ke(),y=new Map(b.map(h=>[`${h.day}|${h.player}`,h]));for(const h of s.missionLog)!h.day||!h.player||y.set(`${h.day}|${h.player}`,h);const v=Array.from(y.values()).sort((h,x)=>x.day.localeCompare(h.day));Tt(v)}if(typeof s.latestPing=="string"&&s.latestPing&&I()!=="fionn")try{const b="affektions-gacha:last-ping:v1",y=window.localStorage.getItem(b)||"";s.latestPing>y&&(window.localStorage.setItem(b,s.latestPing),g._newPing=!0)}catch{}if(Array.isArray(s.gipfelbuch)&&!_a("gipfelbuch")){const b=s.gipfelbuch.filter(y=>y.id).sort((y,v)=>(v.date||"").localeCompare(y.date||""));We(b)}return L&&L.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),Je(!0),Array.isArray(s.history)?s.history.length:0}catch{return Je(!1),-1}}function ae(){try{const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=I(),a=_().filter(d=>(d.token||"").toLowerCase()===t.toLowerCase()),n=te().filter(d=>(d.token||"").toLowerCase()===t.toLowerCase()),i=Te(()=>Ue(g)),r=i.solved&&i.pointsEarned&&!i._logged?{challenge:je(g),attempts:i.attempts,points:i.pointsEarned,period:i.period}:void 0;r&&(i._logged=!0,Lt(i));const o=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:X(),tokens:Re(),questPoints:Ye(),...r?{questLog:r}:{}}),s={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o};fetch(e.endpointUrl,s).catch(()=>{fetch(e.endpointUrl,{...s,mode:"no-cors"}).catch(()=>{})})}catch{}}function Ii(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function $i(e){const t=(i,r)=>L.style.setProperty(i,r),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const ja={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Oa={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Di(e){const t=Ni(e);if(!t)return;const a=(n,i)=>L.style.setProperty(n,i);if(t.colors&&typeof t.colors=="object")for(const[n,i]of Object.entries(t.colors))ja[n]&&typeof i=="string"&&a(ja[n],i);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,i]of Object.entries(t.darkColors))Oa[n]&&typeof i=="string"&&a(Oa[n],i)}function Ni(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}const Bi=`
      body{transition:background .55s ease}
      .ag-widget,.ag-widget *{box-sizing:border-box}
      .ag-widget [hidden]{display:none!important}

      /* Keyboard focus is visible; pointer taps stay clean. */
      .ag-widget :focus-visible{outline:2px solid var(--ag-primary);outline-offset:2px;border-radius:6px}
      .ag-widget :focus:not(:focus-visible){outline:none}

      /* Respect the OS-level reduced-motion setting: kill the perpetual
         orbit/shimmer/spin loops and cut transitions to near-instant. This
         doubles as a battery/perf escape hatch on old phones — turning on
         "reduce motion" makes the whole app cheap to render. */
      @media (prefers-reduced-motion:reduce){
        .ag-widget *,.ag-widget *::before,.ag-widget *::after{
          animation-duration:.01ms!important;animation-iteration-count:1!important;
          transition-duration:.01ms!important;scroll-behavior:auto!important;
        }
        body{transition:none}
      }

      /* While the hero is scrolled out of view its orbit/shimmer loops keep
         the compositor busy for nothing — init.js toggles this class via an
         IntersectionObserver. */
      .ag-stage.ag-stage-idle *{animation-play-state:paused!important}
      .ag-widget:not(.is-ready){opacity:0}
      .ag-widget.is-ready{opacity:1;transition:opacity .18s ease}
      .ag-widget{
        --ag-shadow:0 24px 60px rgba(8,28,18,.32);
        --ag-shadow-soft:0 12px 32px rgba(8,28,18,.18);
        --ag-radius-lg:28px;
        --ag-radius-md:18px;
        --ag-radius-sm:12px;
        --ag-ease:cubic-bezier(.16,1,.3,1);
        --ag-scene-sky-top:#1a3a2c;
        --ag-scene-sky-bottom:#0e2419;
        --ag-scene-mountain-far:#1d3a2c;
        --ag-scene-mountain-mid:#13291f;
        --ag-scene-forest-far:#0c2118;
        --ag-scene-water-top:#3b6e58;
        --ag-scene-water-bottom:#1f4633;
        --ag-scene-tree:#0a1c14;
        --ag-scene-tree-light:#16382a;
        --ag-scene-leaf:#3e8a55;
        --ag-scene-leaf-light:#6dbf80;
        --ag-scene-road:#2d4a3a;
        --ag-scene-city:#12291f;
        --ag-mach-top:#102b1f;
        --ag-mach-bottom:#06150f;
        color:var(--ag-text);
        font-family:"Satoshi","Inter",system-ui,sans-serif;
        line-height:1.5;
        display:block;
      }

      /* Outer frame: centers the widget with breathing room. */
      .ag-frame{
        width:100%;
        max-width:1120px;
        margin-inline:auto;
        padding:clamp(12px,2.4vw,28px) clamp(12px,3vw,32px);
        display:flex;
        flex-direction:column;
        gap:clamp(16px,2.4vw,28px);
      }
      @media (prefers-color-scheme:dark){
        .ag-widget{
          --ag-bg:var(--ag-dark-bg)!important;
          --ag-surface:var(--ag-dark-surface)!important;
          --ag-surface-2:var(--ag-dark-surface-2)!important;
          --ag-text:var(--ag-dark-text)!important;
          --ag-muted:var(--ag-dark-muted)!important;
          --ag-border:var(--ag-dark-border)!important;
          --ag-primary:var(--ag-dark-primary)!important;
          --ag-primary-dark:var(--ag-dark-primary-dark)!important;
          --ag-gold:var(--ag-dark-gold)!important;
          --ag-green:var(--ag-dark-green)!important;
          --ag-blue:var(--ag-dark-blue)!important;
          --ag-sky:var(--ag-dark-sky)!important;
          --ag-mountain:var(--ag-dark-mountain)!important;
        }
      }

      .ag-stage{
        position:relative;
        border-radius:var(--ag-radius-lg);
        overflow:hidden;
        background:var(--ag-scene-sky-bottom);
        isolation:isolate;
        box-shadow:var(--ag-shadow);
        transform:translateZ(0);
        -webkit-transform:translateZ(0);
      }
      .ag-scene{
        position:absolute;inset:0;width:100%;height:100%;
        z-index:0;
        display:block;
      }
      .ag-stage-veil{
        position:absolute;inset:0;z-index:1;pointer-events:none;
        background:
          radial-gradient(circle at 20% 12%, rgba(255,236,170,.18), transparent 36%),
          radial-gradient(circle at 80% 90%, rgba(8,28,18,.7), transparent 60%),
          linear-gradient(180deg, rgba(8,28,18,.05) 0%, rgba(8,28,18,.55) 70%, rgba(8,28,18,.85) 100%);
      }
      .ag-shell{
        position:relative;z-index:2;
        padding:clamp(20px,4vw,44px);
      }

      /* Cards live outside the dark stage now, so they sit on the page itself
         with breathing room and rounded edges instead of forming an
         edge-to-edge dark band under the hero. */
      .ag-content{
        display:grid;
        gap:clamp(14px,2vw,18px);
      }

      .ag-hero{
        display:grid;
        grid-template-columns:minmax(220px,.85fr) minmax(0,1.15fr);
        gap:clamp(20px,3.2vw,40px);
        align-items:center;
      }
      @media (max-width:760px){
        .ag-hero{grid-template-columns:1fr;text-align:left}
      }

      .ag-machine-wrap{
        position:relative;
        width:100%;
        max-width:340px;
        margin:0 auto;
        aspect-ratio:280/320;
        filter:drop-shadow(0 24px 40px rgba(0,0,0,.45));
      }
      .ag-machine-svg{width:100%;height:100%;display:block}
      .ag-mach-glow{transform-origin:140px 148px;animation:ag-pulse 4.4s ease-in-out infinite}
      .ag-widget.is-revealing .ag-mach-glow{animation-duration:1.2s}
      .ag-mach-orbit{transform-origin:140px 148px;animation:ag-spin 22s linear infinite}
      .ag-widget.is-revealing .ag-mach-orbit{animation-duration:5s}

      .ag-machine-capsule{
        position:absolute;
        left:50%;top:46%;transform:translate(-50%,-50%);
        width:22%;aspect-ratio:1.35;border-radius:999px;
        background:linear-gradient(90deg,var(--ag-primary) 0 50%,#d8ecbf 50% 100%);
        box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 24px rgba(255,236,170,.18);
        animation:ag-float 5.5s ease-in-out infinite;
      }
      .ag-capsule-shine{
        position:absolute;inset:14% 28%;border-radius:999px;
        background:rgba(255,255,255,.45);filter:blur(2px);
      }
      .ag-widget.is-revealing .ag-machine-capsule{animation:ag-shake 950ms var(--ag-ease) 3}
      .ag-widget.is-revealed .ag-machine-capsule{animation:ag-pop 700ms var(--ag-ease) both}

      .ag-orbit{position:absolute;inset:0;pointer-events:none}
      .ag-orbit span{
        position:absolute;width:6px;height:6px;border-radius:999px;
        background:rgba(255,236,170,.85);
        box-shadow:0 0 12px rgba(255,236,170,.85);
      }
      .ag-orbit span:nth-child(1){left:50%;top:8%;animation:ag-orbit-1 7s linear infinite}
      .ag-orbit span:nth-child(2){left:88%;top:50%;animation:ag-orbit-2 9s linear infinite}
      .ag-orbit span:nth-child(3){left:50%;top:90%;animation:ag-orbit-3 8s linear infinite}
      .ag-orbit span:nth-child(4){left:8%;top:50%;animation:ag-orbit-4 10s linear infinite}

      /* Tasteful floating emoji constellation around the capsule.
         Each .ag-emoji sits at the centre of the machine wrap and is rotated
         out by --ag-emoji-angle, then translated --ag-emoji-radius along that
         vector. The whole element slowly rotates around the centre. */
      .ag-emoji-orbit{
        position:absolute;inset:0;pointer-events:none;
        z-index:3;
      }
      .ag-emoji{
        position:absolute;left:50%;top:50%;
        font-size:clamp(.95rem,1.1vw + .6rem,1.25rem);
        line-height:1;
        transform-origin:0 0;
        transform:rotate(var(--ag-emoji-angle))
          translate(var(--ag-emoji-radius))
          rotate(calc(-1 * var(--ag-emoji-angle)));
        animation:ag-emoji-spin var(--ag-emoji-duration,32s) linear infinite;
        animation-delay:var(--ag-emoji-delay,0s);
        animation-direction:var(--ag-emoji-direction,normal);
        filter:drop-shadow(0 2px 6px rgba(0,0,0,.35));
        opacity:.9;
      }
      @keyframes ag-emoji-spin{
        0%{
          transform:rotate(var(--ag-emoji-angle))
            translate(var(--ag-emoji-radius))
            rotate(calc(-1 * var(--ag-emoji-angle)));
        }
        100%{
          transform:rotate(calc(var(--ag-emoji-angle) + 360deg))
            translate(var(--ag-emoji-radius))
            rotate(calc(-1 * (var(--ag-emoji-angle) + 360deg)));
        }
      }

      .ag-copy{min-width:0;color:#fffdf2}
      .ag-kicker{
        margin:0;color:#cfe7d4;font-size:clamp(.74rem,.7rem + .2vw,.84rem);
        letter-spacing:.14em;text-transform:uppercase;font-weight:700;
      }
      .ag-copy h1{
        margin:8px 0 12px;
        font-family:"Boska",Georgia,serif;
        font-size:clamp(2.1rem,1.2rem + 3.8vw,4.4rem);
        line-height:.96;letter-spacing:-.035em;font-weight:700;
        color:#fffdf2;
        text-shadow:0 2px 24px rgba(0,0,0,.5);
      }
      .ag-intro{
        margin:0 0 18px;max-width:34rem;color:#dfeedb;
        font-size:clamp(.98rem,.95rem + .2vw,1.08rem);line-height:1.6;
      }

      .ag-chips{
        list-style:none;padding:0;margin:0 0 18px;
        display:flex;flex-wrap:wrap;gap:8px;
      }
      .ag-chips li{
        display:inline-flex;align-items:center;min-height:28px;padding:0 12px;
        border-radius:999px;border:1px solid rgba(255,255,255,.18);
        background:rgba(8,28,18,.45);backdrop-filter:blur(8px);
        color:#e7f5e3;font-size:.78rem;font-weight:700;letter-spacing:.04em;
      }


     .ag-chip-clickable {
        cursor: pointer;
        touch-action: manipulation;
      }
      
      .ag-chip-clickable:hover {
        transform: translateY(-1px);
      }
      
      .ag-chip-clickable:focus-visible {
        outline: 2px solid rgba(255,255,255,.35);
        outline-offset: 2px;
      }
      
      .ag-mini-panel {
        margin-top: 1rem;
      }
      
      .ag-mini-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: .75rem;
      }
      
      .ag-mini-title {
        margin: 0 0 .35rem;
      }
      
      .ag-mini-copy {
        margin: 0 0 .35rem;
        color: var(--ag-muted);
      }
      
      .ag-mini-level {
        margin: 0 0 .85rem;
        color: var(--ag-muted);
        font-size: .95rem;
      }
      
      .ag-forage-wrap {
        display: grid;
        gap: .6rem;
      }
      
      .ag-forage-timer {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        letter-spacing: .04em;
      }
      
      .ag-forage-field {
        position: relative;
        min-height: 280px;
        overflow: hidden;
        border-radius: 24px;
        background:
          radial-gradient(circle at 20% 20%, rgba(255,255,255,.06), transparent 30%),
          linear-gradient(180deg, rgba(88,140,92,.24), rgba(34,72,46,.4));
        border: 1px solid rgba(255,255,255,.08);
      }
      
      .ag-forage-darkness {
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background: linear-gradient(
          180deg,
          rgba(7, 16, 20, 0.35),
          rgba(4, 10, 8, 1)
        );
        opacity: 0;
        transition: opacity .08s linear;
      }
      
      .ag-forage-item {
        position: absolute;
        z-index: 2;
        width: 48px;
        height: 48px;
        border: none;
        background: transparent;
        font-size: 1.9rem;
        cursor: pointer;
        transition: transform .12s ease, opacity .12s ease, filter .12s ease;
        animation: agDrift var(--dur, 1.6s) ease-in-out infinite alternate;
        animation-delay: var(--delay, 0s);
      }
      
      .ag-forage-item.is-picked {
        opacity: 0;
        transform: scale(1.4);
      }
      
      .ag-baerlauch-reward {
        margin-top: 1rem;
        display: grid;
        gap: .8rem;
      }
      
      .ag-baerlauch-photo {
        overflow: hidden;
        border-radius: 18px;
      }
      
      .ag-baerlauch-text {
        margin: 0 auto;
        color: #fff;
        text-align: center;
        font-weight: 600;
      }

      .ag-baerlauch-actions {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
      }

      
      .ag-mini-success {
        margin-top: 1rem;
        padding: .9rem 1rem;
        border-radius: 18px;
        text-align: center;
        background: rgba(255,255,255,.10);
        border: 1px solid rgba(255,255,255,.12);
        font-weight: 700;
        color: #fff !important;
        width: fit-content;
        max-width: min(92%, 640px);
      }
      
      .ag-gesprach-card {
        margin: 1rem 0;
        padding: 1.25rem 1.4rem;
        border-radius: 20px;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.13);
        font-size: 1.08rem;
        line-height: 1.6;
        font-style: italic;
        color: var(--ag-text);
        min-height: 4rem;
        overflow-wrap: break-word;
        word-break: break-word;
      }

      .ag-gesprach-actions {
        display: flex;
        gap: .75rem;
        flex-wrap: wrap;
      }

      .ag-chip-quest-active {
        position: relative;
        box-shadow: 0 0 0 2px var(--ag-primary);
        font-weight: 600;
      }
      .ag-chip-quest-active::after {
        content: '';
        position: absolute;
        top: -3px; right: -3px;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--ag-gold);
      }
      .ag-chip-mission-active {
        position: relative;
        box-shadow: 0 0 0 2px var(--ag-gold);
        font-weight: 600;
      }
      .ag-chip-mission-active::after {
        content: '';
        position: absolute;
        top: -3px; right: -3px;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--ag-gold);
        animation: ag-pulse 1.8s ease-in-out infinite;
      }
      .ag-chip-stimmung-set {
        position: relative;
        box-shadow: 0 0 0 2px var(--chip-dot-color, var(--ag-primary));
        transition: box-shadow .3s ease;
      }
      .ag-chip-stimmung-set::after {
        content: '';
        position: absolute;
        top: -3px; right: -3px;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--chip-dot-color, var(--ag-primary));
        transition: background .3s ease;
      }
      .ag-stimmung-preview {
        height: 54px;
        border-radius: var(--ag-radius-md);
        background: #0a1410;
        margin: 12px 0;
        transition: background .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.06);
      }
      .ag-stimmung-preview-label {
        font-size: .68rem;
        color: rgba(255,255,255,.28);
        font-weight: 700;
        letter-spacing: .09em;
        text-transform: uppercase;
        user-select: none;
      }
      .ag-stimmung-picker-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 14px 0;
      }
      .ag-stimmung-color-input {
        width: 56px;
        height: 44px;
        border: none;
        border-radius: var(--ag-radius-sm);
        padding: 2px;
        cursor: pointer;
        background: var(--ag-surface);
        flex-shrink: 0;
      }
      .ag-stimmung-hex-input {
        flex: 1;
        background: var(--ag-surface);
        color: var(--ag-text);
        border: 1px solid var(--ag-border);
        border-radius: var(--ag-radius-sm);
        padding: 10px 14px;
        font-size: .95rem;
        font-family: "Satoshi","Inter",system-ui,sans-serif;
        letter-spacing: .05em;
      }
      .ag-stimmung-hex-input:focus {
        outline: 2px solid var(--ag-primary);
        border-color: var(--ag-primary);
      }
      .ag-mini-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 14px;
      }
      .ag-paused * { animation-play-state: paused !important; }
      .ag-mission-card {
        margin: 14px 0;
        padding: 18px 20px;
        border-radius: var(--ag-radius-md);
        background: var(--ag-surface);
        border: 1px solid var(--ag-border);
        font-size: 1.05rem;
        line-height: 1.65;
        color: var(--ag-text);
      }
      .ag-mission-actions { margin-top: 14px; }
      .ag-mission-done-note {
        margin: 14px 0 0;
        font-size: .88rem;
        color: var(--ag-muted);
        text-align: center;
      }
      .ag-mission-feedback {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--ag-border);
      }
      .ag-mission-feedback-label {
        margin: 0 0 10px;
        font-size: .88rem;
        color: var(--ag-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: .06em;
      }
      .ag-mission-rating {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
      }
      .ag-mission-rate-btn {
        font-size: 1.6rem;
        background: none;
        border: 2px solid var(--ag-border);
        border-radius: 12px;
        padding: 6px 12px;
        cursor: pointer;
        transition: border-color .15s, transform .15s;
        line-height: 1;
      }
      .ag-mission-rate-btn:hover { transform: scale(1.12); }
      .ag-mission-rate-btn.is-selected {
        border-color: var(--ag-gold);
        background: rgba(185,120,46,.1);
        transform: scale(1.1);
      }
      .ag-mission-comment {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--ag-border);
        border-radius: 10px;
        padding: 10px 12px;
        font-size: .92rem;
        background: var(--ag-surface);
        color: var(--ag-text);
        resize: none;
        margin-bottom: 10px;
        font-family: inherit;
      }
      .ag-mission-comment:focus { outline: 2px solid var(--ag-primary); outline-offset: 2px; }
      .ag-mission-feedback-sent {
        margin: 8px 0 0;
        font-size: .88rem;
        color: var(--ag-primary);
        text-align: center;
      }
      .ag-baerlauch-scores {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }
      .ag-score-table {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 4px;
      }
      .ag-score-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: .82rem;
      }
      .ag-score-date {
        color: var(--ag-muted);
        min-width: 52px;
        flex-shrink: 0;
      }
      .ag-score-result {
        color: var(--ag-text);
        margin-left: auto;
        font-variant-numeric: tabular-nums;
      }
      .ag-score-pill {
        display: inline-flex;
        align-items: center;
        padding: 2px 10px;
        border-radius: 999px;
        font-size: .78rem;
        font-weight: 700;
      }
      .ag-score-mine {
        background: rgba(47,122,79,.14);
        color: var(--ag-primary);
        border: 1px solid rgba(47,122,79,.3);
      }
      .ag-score-theirs {
        background: rgba(55,106,131,.14);
        color: var(--ag-blue);
        border: 1px solid rgba(55,106,131,.3);
      }
      .ag-fionn-header { padding: 32px 0 8px; text-align: center; }
      .ag-fionn-title { margin: 0 0 8px; font-family:"Boska",Georgia,serif; font-size: clamp(1.6rem,4vw,2.4rem); }
      .ag-fionn-sub { margin: 0 0 24px; color: var(--ag-muted); font-size: .92rem; line-height: 1.5; }
      .ag-fionn-card { font-size: 1.15rem; line-height: 1.7; margin-bottom: 20px; }
      .ag-fionn-done { width: 100%; justify-content: center; }
      .ag-mission-log {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid var(--ag-border);
      }
      .ag-mission-log-title {
        margin: 0 0 12px;
        font-size: .78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .07em;
        color: var(--ag-muted);
      }
      .ag-log-day {
        margin-bottom: 14px;
      }
      .ag-log-today .ag-log-date { color: var(--ag-primary); font-weight: 700; }
      .ag-log-date {
        display: block;
        font-size: .78rem;
        font-weight: 600;
        color: var(--ag-muted);
        margin-bottom: 5px;
        letter-spacing: .03em;
      }
      .ag-log-row {
        display: flex;
        align-items: baseline;
        gap: 7px;
        margin-bottom: 5px;
        font-size: .88rem;
        line-height: 1.45;
      }
      .ag-log-who {
        flex-shrink: 0;
        font-size: .72rem;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 999px;
        letter-spacing: .04em;
      }
      .ag-log-lennart {
        background: rgba(47,122,79,.12);
        color: var(--ag-primary);
        border: 1px solid rgba(47,122,79,.25);
      }
      .ag-log-fionn {
        background: rgba(55,106,131,.12);
        color: var(--ag-blue);
        border: 1px solid rgba(55,106,131,.25);
      }
      .ag-log-text {
        flex: 1;
        color: var(--ag-text);
        opacity: .85;
      }
      .ag-log-done { color: var(--ag-primary); font-size: .8rem; flex-shrink: 0; }
      .ag-log-rating { flex-shrink: 0; font-size: .9rem; }
      .ag-quest-challenge {
        margin: 1rem 0 .5rem;
        padding: 1.1rem 1.3rem;
        border-radius: 18px;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.13);
        font-size: 1.08rem;
        font-style: italic;
        line-height: 1.5;
        color: var(--ag-text);
        overflow-wrap: break-word;
      }
      .ag-quest-loading{
        display:flex;flex-direction:column;align-items:center;gap:.7rem;
        padding:1.2rem 0;
      }
      .ag-quest-loading-text{margin:0;font-size:.88rem;color:var(--ag-muted);}
      .ag-quest-spinner{
        width:28px;height:28px;border-radius:50%;
        border:2.5px solid rgba(47,122,79,.2);
        border-top-color:var(--ag-primary);
        animation:ag-spin .8s linear infinite;
      }
      @keyframes ag-spin{to{transform:rotate(360deg)}}

      .ag-quest-hint-history{
        margin:.6rem 0 0;
        display:flex;flex-direction:column;gap:.45rem;
        max-height:220px;overflow-y:auto;
      }
      .ag-hint-item{
        display:flex;align-items:flex-start;gap:.6rem;
        padding:.6rem .8rem;
        border-radius:12px;
        background:rgba(255,255,255,.04);
        border-left:2px solid var(--ag-primary);
      }
      .ag-hint-item:last-child{
        background:rgba(47,122,79,.08);
        border-left-color:var(--ag-primary);
      }
      .ag-hint-num{
        flex-shrink:0;width:18px;height:18px;border-radius:50%;
        background:var(--ag-primary);color:#fff;
        font-size:.7rem;font-weight:700;
        display:flex;align-items:center;justify-content:center;
        margin-top:2px;opacity:.7;
      }
      .ag-hint-item:last-child .ag-hint-num{opacity:1;}
      .ag-hint-item p{
        margin:0;font-size:.88rem;color:var(--ag-muted);line-height:1.5;
      }
      .ag-hint-item:last-child p{color:var(--ag-text);}
      .ag-quest-actions {
        margin-top: 1rem;
      }
      .ag-quest-upload-label {
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        cursor: pointer;
        padding: .65rem 1.4rem;
        border-radius: 999px;
        border: 1.5px solid var(--ag-primary);
        background: transparent;
        color: var(--ag-primary);
        font-size: .95rem;
        font-weight: 600;
        transition: background .15s, color .15s;
      }
      .ag-quest-upload-label:hover {
        background: var(--ag-primary);
        color: #fff;
      }
      .ag-quest-result {
        margin-top: .75rem;
        padding: .9rem 1.1rem;
        border-radius: 14px;
        background: rgba(255,255,255,.07);
        font-size: .97rem;
        line-height: 1.55;
        color: var(--ag-text);
      }
      .ag-quest-points {
        margin-top: .5rem;
        font-size: .85rem;
        color: var(--ag-gold);
        font-weight: 600;
        letter-spacing: .02em;
      }

      @keyframes agDrift {
        from { transform: translate(0px, 0px); }
        to { transform: translate(var(--dx, 60px), var(--dy, -40px)); }
      }
   




      
      .ag-tabs{
        display:inline-flex;padding:4px;border-radius:999px;
        background:rgba(8,28,18,.55);border:1px solid rgba(255,255,255,.16);
        backdrop-filter:blur(10px);
        margin-bottom:0;gap:2px;
      }
      .ag-tab{
        appearance:none;border:none;background:transparent;
        min-height:36px;padding:0 18px;border-radius:999px;cursor:pointer;
        color:#bdd6c4;font-weight:700;font-size:.92rem;letter-spacing:.01em;
        transition:background 180ms var(--ag-ease), color 180ms var(--ag-ease), transform 180ms var(--ag-ease);
        font-family:inherit;
      }
      .ag-tab:hover{color:#fffdf2}
      .ag-tab.is-active{
        background:linear-gradient(180deg, rgba(255,253,242,.95), rgba(231,245,227,.85));
        color:#143524;
        box-shadow:0 6px 18px rgba(0,0,0,.3);
      }
      .ag-tab:focus-visible{outline:2px solid #fffdf2;outline-offset:2px}

      .ag-panel{display:grid;gap:clamp(14px,2vw,18px)}

      .ag-card{
        background:linear-gradient(180deg, #fffdf6, #f7f3e8);
        border:1px solid var(--ag-border);
        border-radius:var(--ag-radius-lg);
        padding:clamp(16px,2.6vw,24px);
        box-shadow:0 12px 36px rgba(8,28,18,.14),0 1px 0 rgba(255,255,255,.6) inset;
        color:var(--ag-text);
      }
      @media (prefers-color-scheme:dark){
        .ag-card{
          background:linear-gradient(180deg, rgba(28,42,32,.96), rgba(18,30,22,.94));
          border-color:rgba(255,255,255,.08);
          color:var(--ag-text);
          box-shadow:0 12px 40px rgba(0,0,0,.45), 0 1px 0 rgba(255,255,255,.07) inset;
        }
      }
      .ag-mini-panel:not([hidden]){animation:ag-panel-enter .28s var(--ag-ease) both}
      @keyframes ag-panel-enter{from{opacity:0;transform:translateY(8px)}}

      .ag-draw-card{
        display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;
      }
      .ag-draw-meta{display:flex;flex-direction:column;gap:4px;min-width:0}
      .ag-sound-toggle{
        background:none;border:none;cursor:pointer;font-size:1.1rem;line-height:1;
        padding:4px;border-radius:6px;color:var(--ag-muted);transition:color 120ms,opacity 120ms;
        margin-left:auto;
      }
      .ag-sound-toggle:hover{color:var(--ag-text)}
      .ag-pill{
        display:inline-flex;align-items:center;align-self:flex-start;min-height:26px;padding:0 12px;
        border-radius:999px;background:var(--ag-surface-2);
        color:var(--ag-primary-dark);font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
      }
      .ag-draw-hint{color:var(--ag-muted);font-size:.92rem}

      .ag-streak{
        display:inline-flex;align-items:center;gap:4px;align-self:flex-start;
        min-height:24px;padding:0 10px;border-radius:999px;
        font-size:.75rem;font-weight:800;letter-spacing:.04em;
        background:rgba(47,122,79,.12);color:var(--ag-primary-dark);
        transition:background 240ms ease, color 240ms ease;
      }
      .ag-streak[data-ag-streak-tier="1"]{background:rgba(185,120,46,.14);color:var(--ag-gold)}
      .ag-streak[data-ag-streak-tier="2"]{background:rgba(220,80,40,.12);color:#c84a18}
      @media (prefers-color-scheme:dark){.ag-streak[data-ag-streak-tier="2"]{color:#f07040}}
      .ag-streak[data-ag-streak-tier="3"]{
        background:linear-gradient(90deg,rgba(185,120,46,.22),rgba(47,122,79,.18));
        color:var(--ag-gold);
      }
      .ag-streak-restore{
        display:inline-flex;align-items:center;gap:4px;align-self:flex-start;
        min-height:24px;padding:0 10px;border-radius:999px;cursor:pointer;
        font-size:.72rem;font-weight:800;letter-spacing:.03em;font-family:inherit;
        border:1px solid rgba(185,120,46,.5);
        background:linear-gradient(90deg,rgba(232,164,164,.2),rgba(185,120,46,.22));
        color:var(--ag-gold);
        animation:ag-streak-restore-pulse 2.2s ease-in-out infinite;
        transition:transform 120ms var(--ag-ease);
      }
      .ag-streak-restore:hover{transform:translateY(-1px)}
      .ag-streak-restore:active{transform:translateY(0)}
      .ag-streak-restore:disabled{opacity:.6;cursor:default;animation:none}
      @keyframes ag-streak-restore-pulse{
        0%,100%{box-shadow:0 0 0 0 rgba(185,120,46,.0)}
        50%{box-shadow:0 0 0 4px rgba(185,120,46,.18)}
      }

      .ag-button,.ag-secondary{
        min-height:46px;border:1px solid transparent;border-radius:999px;padding:0 22px;
        font-weight:700;font-family:inherit;font-size:.98rem;letter-spacing:.01em;cursor:pointer;
        transition:transform 180ms var(--ag-ease), background 180ms var(--ag-ease), border-color 180ms var(--ag-ease), color 180ms var(--ag-ease), box-shadow 180ms var(--ag-ease);
      }
      .ag-button{
        position:relative;display:inline-flex;align-items:center;gap:10px;
        background:linear-gradient(180deg,var(--ag-primary),var(--ag-primary-dark));
        color:#fffdf8;
        box-shadow:0 14px 30px rgba(47,122,79,.32),0 0 0 4px rgba(255,253,242,.12);
        overflow:hidden;
      }
      .ag-button:before{
        content:"";position:absolute;inset:-2px;border-radius:inherit;
        background:linear-gradient(120deg,transparent 30%,rgba(255,236,170,.25),transparent 70%);
        transform:translateX(-100%);transition:transform 700ms var(--ag-ease);pointer-events:none;
      }
      .ag-button:hover:before{transform:translateX(100%)}
      .ag-button:hover{transform:translateY(-1px);box-shadow:0 18px 36px rgba(47,122,79,.36)}
      .ag-button:active,.ag-secondary:active{transform:translateY(0)}
      .ag-button[disabled]{opacity:.85;cursor:wait}
      .ag-button[disabled] span:not(.ag-button-orb):after{content:"...";display:inline-block;width:1.2em;text-align:left}
      .ag-button-orb{
        width:14px;height:14px;border-radius:999px;
        background:radial-gradient(circle at 35% 35%, #fffdf2, var(--ag-gold));
        box-shadow:0 0 12px rgba(255,236,170,.7);
      }
      .ag-widget.is-revealing .ag-button-orb{animation:ag-pulse 800ms ease-in-out infinite}

      .ag-result{animation:ag-enter 460ms var(--ag-ease)}
      .ag-result-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:12px}
      .ag-badge{
        display:inline-flex;align-items:center;min-height:28px;padding:0 12px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.78rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;
      }
      .ag-result h2{margin:0 0 8px;font-family:"Boska",Georgia,serif;font-size:clamp(1.3rem,1rem + 1vw,1.8rem);line-height:1.15;letter-spacing:-.015em;overflow-wrap:break-word;word-break:break-word}
      .ag-result p{margin:0;color:var(--ag-muted);line-height:1.6}
      .ag-message{color:var(--ag-muted);line-height:1.7}
      .ag-message p{margin:0 0 .85em}
      .ag-message p:last-child{margin-bottom:0}
      .ag-history-message p{margin:0 0 .5em}
      .ag-history-message p:last-child{margin-bottom:0}
      .ag-date{color:var(--ag-muted);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700}

      .ag-photo{margin:16px 0 0;overflow:hidden;border-radius:var(--ag-radius-md);border:1px solid var(--ag-border);background:var(--ag-surface-2)}
      .ag-photo figcaption{padding:11px 14px;color:var(--ag-muted);font-size:.92rem;border-top:1px solid var(--ag-border)}

      .ag-media-stage{position:relative;width:100%;background:transparent}
      .ag-media-frame{
        position:relative;width:100%;aspect-ratio:4/3;
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;background:#0b1310;
      }
      .ag-media-frame[data-orientation="portrait"]{aspect-ratio:3/4}
      .ag-media-frame[data-orientation="square"]{aspect-ratio:1/1}
      .ag-media-backdrop{
        position:absolute;inset:-8%;background-size:cover;background-position:center;
        filter:blur(28px) saturate(1.05) brightness(.6);
        transform:scale(1.08);opacity:.7;pointer-events:none;
      }
      .ag-media-content{
        position:relative;z-index:1;
        width:100%;height:100%;
        object-fit:cover;display:block;
        border-radius:6px;
      }
      .ag-media-frame video.ag-media-content{width:100%;height:100%;object-fit:contain;background:transparent;border-radius:0}
      .ag-drive-poster{position:relative;width:100%;height:100%;background:#111;cursor:pointer;overflow:hidden;border-radius:0}
      .ag-drive-poster-img{width:100%;height:100%;object-fit:cover;display:block}
      .ag-drive-play-btn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);transition:background .15s}
      .ag-drive-play-btn::after{content:"";display:block;width:56px;height:56px;border-radius:50%;background:rgba(0,0,0,.55);border:2.5px solid rgba(255,255,255,.9);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpolygon points='9,7 9,17 19,12'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:54% 50%;background-size:60%}
      .ag-drive-poster:hover .ag-drive-play-btn{background:rgba(0,0,0,.38)}
      .ag-drive-iframe{width:100%;height:100%;border:0;display:block}

      .ag-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
      .ag-secondary{
        display:inline-flex;align-items:center;justify-content:center;
        background:transparent;color:var(--ag-primary-dark);border-color:var(--ag-border);text-decoration:none;
      }
      .ag-secondary:hover{transform:translateY(-1px);border-color:var(--ag-primary);background:rgba(47,122,79,.08)}
      .ag-star.is-starred{color:var(--ag-gold);border-color:var(--ag-gold);background:rgba(185,120,46,.1)}
      .ag-star.is-starred:hover{background:rgba(185,120,46,.18)}
      .ag-history-star{background:none;border:none;padding:0 0 0 6px;margin-left:auto;font-size:1rem;line-height:1;cursor:pointer;color:var(--ag-muted);transition:color .15s,transform .15s;flex-shrink:0}
      .ag-history-star:hover{color:var(--ag-gold);transform:scale(1.2)}
      .ag-history-star.is-starred{color:var(--ag-gold)}
      .ag-lighting-link-wrap{display:flex;justify-content:center;padding:12px 0 4px}
      /* ── Lichtsteuerung panel ── */
      .ag-lights-dot{
        display:inline-block;width:9px;height:9px;border-radius:50%;
        background:#a83f3f;margin-right:6px;vertical-align:baseline;
        transition:background .3s ease;
      }
      .ag-lights-dot[data-ag-lights-state="connected"]{background:#4aaa5a}
      .ag-lights-dot[data-ag-lights-state="connecting"]{background:var(--ag-gold)}
      .ag-lights-boards{float:right;display:inline-flex;gap:6px}
      .ag-lights-board{
        font-size:.72rem;font-weight:700;letter-spacing:.03em;
        padding:2px 8px;border-radius:999px;color:var(--ag-muted);
        border:1px solid var(--ag-border);opacity:.6;
      }
      .ag-lights-board.is-online{opacity:1;color:var(--ag-primary-dark);border-color:rgba(47,122,79,.45)}
      .ag-lights-controls{display:grid;gap:14px;margin-top:14px}
      .ag-lights-power{width:100%}
      .ag-lights-power:not(.is-on){filter:grayscale(.6);opacity:.8}
      .ag-lights-row{display:grid;gap:6px}
      .ag-lights-label{font-size:.8rem;font-weight:700;color:var(--ag-muted);display:flex;align-items:center;gap:8px}
      .ag-lights-preview{
        display:inline-block;width:16px;height:16px;border-radius:50%;
        background:rgb(200,232,208);border:1px solid rgba(255,255,255,.25);
      }
      .ag-lights-slider{width:100%;accent-color:var(--ag-primary);min-height:28px}
      .ag-lights-colour{
        -webkit-appearance:none;appearance:none;height:14px;border-radius:999px;
        border:1px solid rgba(255,255,255,.18);
      }
      .ag-lights-colour::-webkit-slider-thumb{
        -webkit-appearance:none;width:22px;height:22px;border-radius:50%;
        background:#fffdf8;border:2px solid rgba(0,0,0,.35);cursor:pointer;
      }
      .ag-lights-colour::-moz-range-thumb{
        width:22px;height:22px;border-radius:50%;
        background:#fffdf8;border:2px solid rgba(0,0,0,.35);cursor:pointer;
      }
      .ag-lights-foot{display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap}
      .ag-sync-status{
        text-align:center;font-size:.72rem;color:var(--ag-muted);opacity:.65;
        margin:2px 0 0;letter-spacing:.02em;
      }
      .ag-sync-status[data-ag-sync-state="error"]{color:#c9825f;opacity:.85}
      .ag-lighting-link{font-size:.92rem}

      .ag-rules{color:var(--ag-text)}
      .ag-rules summary{
        list-style:none;cursor:pointer;font-weight:800;letter-spacing:.02em;
        display:inline-flex;align-items:center;gap:8px;
      }
      .ag-rules summary::-webkit-details-marker{display:none}
      .ag-rules summary:before{
        content:"";width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;
        transform:rotate(-45deg);transition:transform 200ms var(--ag-ease);
      }
      .ag-rules[open] summary:before{transform:rotate(45deg)}
      .ag-rules p{margin:10px 0 8px;color:var(--ag-muted)}
      .ag-rules ul{margin:0;padding-left:18px;columns:2;color:var(--ag-muted);font-size:.94rem}
      .ag-rules li{break-inside:avoid;margin-bottom:4px}

      .ag-history-header{display:flex;align-items:flex-start;gap:8px;margin-bottom:14px}
      .ag-history-header .ag-history-note{flex:1;margin:0}
      .ag-sync-btn{background:none;border:1px solid var(--ag-border);border-radius:6px;padding:3px 8px;font-size:.8rem;cursor:pointer;color:var(--ag-muted);transition:all .15s;flex-shrink:0;line-height:1.6}
      .ag-sync-btn:hover:not(:disabled){border-color:var(--ag-green);color:var(--ag-green)}
      .ag-sync-btn:disabled{cursor:default;opacity:.5}
      .ag-history-note{margin:0 0 14px;color:var(--ag-muted);font-size:.92rem;line-height:1.55}
      .ag-history-filter{display:flex;gap:6px;margin:0 0 14px;flex-wrap:wrap}
      .ag-history-filter-chip{background:none;border:1px solid var(--ag-border);border-radius:999px;padding:4px 12px;font-size:.82rem;cursor:pointer;color:var(--ag-muted);transition:all .15s;line-height:1.5}
      .ag-history-filter-chip:hover{border-color:var(--ag-green);color:var(--ag-green)}
      .ag-history-filter-chip.is-active{background:var(--ag-green);border-color:var(--ag-green);color:#fff;font-weight:600}
      .ag-voucher-actions{margin-top:10px;display:flex;align-items:center;gap:8px}
      .ag-voucher-use{background:var(--ag-gold,#caa45a);border:none;border-radius:8px;padding:6px 14px;font-size:.86rem;font-weight:600;color:#1a1a1a;cursor:pointer;transition:transform .15s,filter .15s;line-height:1.3}
      .ag-voucher-use:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px)}
      .ag-voucher-use:disabled{opacity:.5;cursor:default}
      .ag-voucher-used{display:inline-flex;align-items:center;gap:4px;font-size:.84rem;color:var(--ag-muted);font-style:italic}
      .ag-history{list-style:none;padding:0;margin:0;display:grid;gap:10px}
      .ag-history-empty{
        margin:8px 0 0;padding:16px;border:1px dashed var(--ag-border);border-radius:var(--ag-radius-md);
        color:var(--ag-muted);font-size:.95rem;line-height:1.55;background:var(--ag-surface-2);
        overflow-wrap:break-word;word-break:break-word;
      }
      .ag-history-item{
        padding:12px 14px;border:1px solid var(--ag-border);border-radius:var(--ag-radius-md);
        background:rgba(255,253,248,.85);box-shadow:var(--ag-shadow-soft);
        transition:transform 180ms var(--ag-ease), border-color 180ms var(--ag-ease);
        /* Off-screen cards skip layout+paint entirely — the big win for long
           lists on old phones. Harmless no-op where unsupported. */
        content-visibility:auto;contain-intrinsic-size:auto 120px;
      }
      @media (prefers-color-scheme:dark){.ag-history-item{background:rgba(23,32,23,.7)}}
      .ag-history-item:hover{transform:translateY(-1px);border-color:rgba(47,122,79,.4)}
      .ag-history-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
      .ag-history-date{color:var(--ag-muted);font-size:.78rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
      .ag-history-badge{
        display:inline-flex;align-items:center;min-height:22px;padding:0 9px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.7rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;
      }
      .ag-history-title{margin:0 0 2px;font-size:1rem;font-weight:700;color:var(--ag-text);line-height:1.3}
      .ag-history-message{margin:0;color:var(--ag-muted);font-size:.9rem;line-height:1.5}
      .ag-history-body{display:flex;gap:12px;align-items:flex-start}
      .ag-history-thumb{
        flex:0 0 auto;width:64px;height:64px;border-radius:10px;overflow:hidden;
        background:var(--ag-surface-2);border:1px solid var(--ag-border);
        display:flex;align-items:center;justify-content:center;position:relative;
      }
      .ag-history-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:opacity .15s}
      .ag-history-thumb:hover img{opacity:.85}
      .ag-history-thumb.is-broken{background:var(--ag-surface-2)}
      .ag-history-thumb-broken{font-size:1.4rem;line-height:1;opacity:.5}
      .ag-history-thumb.is-video{
        background:linear-gradient(135deg, var(--ag-primary), var(--ag-blue));color:#fffdf8;
        flex-direction:column;gap:2px;
      }
      .ag-history-video-icon{font-size:1.1rem;line-height:1}
      .ag-history-video-label{font-size:.6rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
      .ag-history-text{min-width:0;flex:1}

      /* ── Kapsel-Kalender ── */
      .ag-kalender{margin:4px 0 14px;padding:12px 14px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}
      .ag-kalender-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
      .ag-kalender-label{font-size:.8rem;font-weight:700;color:var(--ag-muted);letter-spacing:.03em}
      .ag-kalender-nav{background:none;border:none;cursor:pointer;color:var(--ag-muted);font-size:1.15rem;line-height:1;padding:2px 10px;border-radius:8px}
      .ag-kalender-nav:hover{color:var(--ag-text);background:rgba(255,255,255,.06)}
      .ag-kalender-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;justify-items:center}
      .ag-kalender-wd{font-size:.6rem;font-weight:800;color:var(--ag-muted);opacity:.55;letter-spacing:.05em}
      .ag-kalender-day{
        width:28px;height:28px;display:grid;place-items:center;
        font-size:.68rem;color:var(--ag-muted);opacity:.55;border-radius:50%;
        font-variant-numeric:tabular-nums;
      }
      .ag-kalender-day.is-future{opacity:.22}
      .ag-kalender-day.is-today{box-shadow:0 0 0 1.5px var(--ag-primary) inset;opacity:1}
      .ag-kalender-day.has-pull{opacity:1;color:#fffdf8;font-weight:700;background:var(--ag-primary)}
      .ag-kalender-day.has-pull[data-tone="quiet"]{background:rgba(150,165,150,.55)}
      .ag-kalender-day.has-pull[data-tone="quest"]{background:var(--ag-blue)}
      .ag-kalender-day.has-pull[data-tone="warm"],
      .ag-kalender-day.has-pull[data-tone="jackpot"]{background:var(--ag-gold)}
      .ag-kalender-day.has-pull[data-tone="cursed"]{background:#3a2a4a}
      .ag-kalender-day.has-pull[data-tone="rare"],
      .ag-kalender-day.has-pull[data-tone="photo"]{background:var(--ag-green)}

      .ag-history-more{display:block;width:100%;margin-top:12px;text-align:center}

      .ag-history-item[data-tone="quiet"] .ag-history-badge{color:var(--ag-muted)}
      .ag-history-item[data-tone="quest"] .ag-history-badge{color:var(--ag-blue)}
      .ag-history-item[data-tone="warm"] .ag-history-badge{color:var(--ag-gold)}
      .ag-history-item[data-tone="cursed"] .ag-history-badge{background:rgba(47,122,79,.12)}
      .ag-history-item[data-tone="rare"] .ag-history-badge,
      .ag-history-item[data-tone="photo"] .ag-history-badge{color:var(--ag-green)}
      .ag-history-item[data-tone="jackpot"] .ag-history-badge{color:var(--ag-gold);background:rgba(185,120,46,.16)}

      .ag-widget[data-tone=quiet] .ag-badge{color:var(--ag-muted)}
      .ag-widget[data-tone=quest] .ag-badge{color:var(--ag-blue)}
      .ag-widget[data-tone=warm] .ag-badge{color:var(--ag-gold)}
      .ag-widget[data-tone=cursed] .ag-badge{color:var(--ag-primary-dark);background:rgba(47,122,79,.12)}
      .ag-widget[data-tone=rare] .ag-badge,.ag-widget[data-tone=photo] .ag-badge{color:var(--ag-green)}
      .ag-widget[data-tone=jackpot] .ag-badge{color:var(--ag-gold);background:rgba(185,120,46,.16)}

      .ag-error{padding:24px;border:1px solid var(--ag-border);border-radius:18px;background:var(--ag-surface);color:var(--ag-text)}

      .ag-shimmer{animation:ag-shimmer 6s ease-in-out infinite}
      .ag-shimmer-2{animation-duration:8s;animation-delay:-2s}
      .ag-road-dash{animation:ag-dash 28s linear infinite}
      .ag-firefly{animation:ag-firefly 5s ease-in-out infinite}
      .ag-firefly-2{animation-duration:7s;animation-delay:-1s}
      .ag-firefly-3{animation-duration:6.4s;animation-delay:-3s}
      .ag-firefly-4{animation-duration:8s;animation-delay:-2s}
      .ag-firefly-5{animation-duration:5.6s;animation-delay:-1.5s}
      .ag-firefly-6{animation-duration:7.2s;animation-delay:-2.5s}
      .ag-sun{animation:ag-pulse 6s ease-in-out infinite}

      @keyframes ag-shake{0%,100%{transform:translate(-50%,-50%) rotate(0deg)}18%{transform:translate(-50%,-58%) rotate(-8deg)}38%{transform:translate(-50%,-44%) rotate(9deg)}58%{transform:translate(-50%,-52%) rotate(-5deg)}78%{transform:translate(-50%,-48%) rotate(4deg)}}
      @keyframes ag-pop{0%{transform:translate(-50%,-50%) scale(.6);opacity:0}60%{transform:translate(-50%,-50%) scale(1.12);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
      @keyframes ag-float{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,-56%)}}
      @keyframes ag-enter{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes ag-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.06);opacity:.85}}
      @keyframes ag-spin{to{transform:rotate(360deg)}}
      @keyframes ag-shimmer{0%,100%{opacity:.55;transform:translateX(0)}50%{opacity:.95;transform:translateX(-6px)}}
      @keyframes ag-dash{to{stroke-dashoffset:-280}}
      @keyframes ag-firefly{0%,100%{opacity:.2;transform:translate(0,0)}50%{opacity:1;transform:translate(8px,-12px)}}
      @keyframes ag-orbit-1{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes ag-orbit-2{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(-360deg)}}
      @keyframes ag-orbit-3{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
      @keyframes ag-orbit-4{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(-360deg)}}

      @media (max-width:760px){
        .ag-frame{padding:clamp(8px,3vw,16px) clamp(8px,3vw,16px)}
        .ag-shell{padding:clamp(16px,4vw,24px)}
        .ag-machine-wrap{max-width:220px}
        .ag-emoji{font-size:clamp(.85rem,2.4vw,1.05rem)}
        .ag-copy h1{font-size:clamp(1.9rem,1rem + 6vw,3rem)}
        .ag-rules ul{columns:1}
        .ag-history-thumb{width:56px;height:56px}
        .ag-draw-card{flex-direction:column;align-items:stretch}
        .ag-button{justify-content:center}
        .ag-tabs{display:flex;width:100%}
        .ag-tab{flex:1;padding:0 12px}
      }
      @media (prefers-reduced-motion:reduce){
        .ag-widget *,.ag-widget *:before,.ag-widget *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
        .ag-machine-capsule,.ag-mach-glow,.ag-mach-orbit,.ag-orbit span,.ag-shimmer,.ag-road-dash,.ag-firefly,.ag-sun,.ag-button-orb,.ag-emoji{animation:none!important}
      }

      /* ── Gipfelbuch / Berge ── */
      .ag-berge-header{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
      .ag-berge-stats{display:flex;flex-direction:column;gap:2px}
      .ag-berge-total-label{font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ag-muted)}
      .ag-berge-total-elev{font-size:2rem;font-weight:800;color:var(--ag-primary-dark);letter-spacing:-.02em;line-height:1}
      .ag-berge-add-btn{flex-shrink:0}

      .ag-berge-form-grid{display:grid;gap:10px;margin-bottom:14px}
      .ag-berge-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .ag-berge-input{
        width:100%;padding:10px 12px;border-radius:var(--ag-radius-sm);border:1px solid var(--ag-border);
        background:var(--ag-surface-2);color:var(--ag-text);font-family:inherit;font-size:.92rem;
        box-sizing:border-box;
      }
      .ag-berge-input:focus{outline:2px solid var(--ag-primary);outline-offset:1px}
      .ag-berge-elev-input{font-size:1rem;font-weight:700}
      .ag-berge-notes{resize:vertical;min-height:60px}

      /* Gipfel list: same grid gap as history */
      [data-ag-berge-list]{display:grid;gap:10px}

      .ag-gipfel-card{
        position:relative;
        padding:12px 14px;
        border:1px solid var(--ag-border);
        border-radius:var(--ag-radius-md);
        background:rgba(255,253,248,.85);
        box-shadow:var(--ag-shadow-soft);
        transition:transform 180ms var(--ag-ease),border-color 180ms var(--ag-ease);
        animation:ag-enter 350ms var(--ag-ease);
        overflow:hidden;
      }
      .ag-gipfel-card:hover{transform:translateY(-1px);border-color:rgba(47,122,79,.4)}
      @media (prefers-color-scheme:dark){.ag-gipfel-card{background:rgba(23,32,23,.7)}}
      .ag-gipfel-head{
        display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
        margin-bottom:6px;
      }
      .ag-gipfel-name{font-size:1rem;font-weight:800;color:var(--ag-text);line-height:1.3;margin-bottom:2px}
      .ag-gipfel-date{font-size:.78rem;color:var(--ag-muted);font-weight:700;letter-spacing:.04em;text-transform:uppercase}
      .ag-gipfel-elev{
        font-size:1.35rem;font-weight:800;
        color:var(--ag-primary-dark);
        letter-spacing:-.02em;line-height:1;
        white-space:nowrap;flex-shrink:0;
      }
      .ag-gipfel-stats{font-size:.85rem;color:var(--ag-muted);margin-bottom:8px}
      .ag-gipfel-notes{margin:0 0 10px;color:var(--ag-muted);font-size:.9rem;line-height:1.55}
      .ag-gipfel-map-preview{margin-top:10px}
      .ag-gipfel-embed-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}
      .ag-gipfel-trail-arrow{
        color:var(--ag-primary);text-decoration:none;
        font-size:.82rem;font-weight:700;opacity:.65;
        transition:opacity 150ms;
      }
      .ag-gipfel-trail-arrow:hover{opacity:1}
      .ag-gipfel-embed-wrap{margin-top:10px}
      .ag-gipfel-load-btn{width:100%;justify-content:center;text-align:center}
      .ag-gipfel-iframe-wrap iframe{display:block;border-radius:8px;width:100%}
      /* ag-gipfel-delete styled in mobile tap-target section below */
      @media (prefers-color-scheme:dark){
        .ag-berge-total-elev,.ag-gipfel-elev{color:#a8d5b5}
        .ag-berge-input{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:#fffdf2}
      }
      @media (max-width:400px){
        .ag-berge-row{grid-template-columns:1fr}
        .ag-gipfel-elev{font-size:1.7rem}
      }

      /* ── Milestone banner ── */
      .ag-milestone{
        display:flex;align-items:center;gap:10px;
        padding:12px 16px;border-radius:var(--ag-radius-md);
        background:linear-gradient(135deg,rgba(185,120,46,.14),rgba(47,122,79,.12));
        border:1px solid rgba(185,120,46,.3);
        margin-bottom:14px;
        animation:ag-enter 500ms var(--ag-ease);
      }
      .ag-milestone[data-ag-milestone]:not([hidden]){display:flex}
      .ag-milestone span{font-size:.95rem;font-weight:700;color:var(--ag-primary-dark);line-height:1.4}
      @media (prefers-color-scheme:dark){
        .ag-milestone{background:linear-gradient(135deg,rgba(185,120,46,.18),rgba(47,122,79,.14));border-color:rgba(185,120,46,.35)}
        .ag-milestone span{color:#d4c07a}
      }

      /* ── Freikarte redeem ── */
      .ag-freikarte-wrap{
        display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;
        padding:12px 16px;border-radius:var(--ag-radius-md);
        background:linear-gradient(135deg,rgba(185,120,46,.14),rgba(47,122,79,.12));
        border:1px solid rgba(185,120,46,.3);
        margin-bottom:14px;
        animation:ag-enter 500ms var(--ag-ease);
      }
      .ag-freikarte-hint{margin:0;font-size:.9rem;font-weight:600;color:var(--ag-primary-dark);line-height:1.4}
      .ag-freikarte-btn{white-space:nowrap;flex:none}
      @media (prefers-color-scheme:dark){
        .ag-freikarte-wrap{background:linear-gradient(135deg,rgba(185,120,46,.18),rgba(47,122,79,.14));border-color:rgba(185,120,46,.35)}
        .ag-freikarte-hint{color:#d4c07a}
      }

      /* ── Install-to-home-screen nudge ── */
      .ag-install-nudge{
        display:flex;align-items:center;justify-content:space-between;gap:12px;
        padding:12px 14px;border-radius:var(--ag-radius-md);
        background:linear-gradient(135deg,rgba(100,160,255,.12),rgba(47,122,79,.1));
        border:1px solid rgba(100,160,255,.28);
        margin-bottom:14px;
        animation:ag-enter 400ms var(--ag-ease);
      }
      .ag-install-nudge[data-ag-install-nudge]:not([hidden]){display:flex}
      .ag-install-nudge-text{min-width:0;flex:1}
      .ag-install-nudge-title{margin:0 0 2px;font-size:.9rem;font-weight:700;color:var(--ag-primary-dark)}
      .ag-install-nudge-copy{margin:0;font-size:.82rem;color:var(--ag-muted);line-height:1.4}
      .ag-install-nudge-actions{display:flex;align-items:center;gap:8px;flex:none}
      .ag-install-nudge-dismiss{background:none;border:none;cursor:pointer;color:var(--ag-muted);font-size:1rem;padding:2px 4px;line-height:1;border-radius:4px}
      .ag-install-nudge-dismiss:hover{color:var(--ag-text)}
      @media (prefers-color-scheme:dark){
        .ag-install-nudge{background:linear-gradient(135deg,rgba(100,160,255,.14),rgba(47,122,79,.12));border-color:rgba(100,160,255,.32)}
        .ag-install-nudge-title{color:#9ec8ff}
      }
      @media (max-width:400px){
        .ag-install-nudge{flex-direction:column;align-items:stretch}
        .ag-install-nudge-actions{justify-content:flex-end}
      }

      /* ── Ping banner ── */
      .ag-ping-banner{
        display:flex;align-items:center;justify-content:space-between;gap:10px;
        padding:10px 14px;border-radius:var(--ag-radius-md);
        background:linear-gradient(135deg,rgba(100,160,255,.12),rgba(47,122,79,.1));
        border:1px solid rgba(100,160,255,.28);
        margin-bottom:14px;
        animation:ag-enter 400ms var(--ag-ease);
      }
      .ag-ping-banner[data-ag-ping-banner]:not([hidden]){display:flex}
      .ag-ping-banner [data-ag-ping-text]{font-size:.92rem;font-weight:600;color:var(--ag-primary-dark);line-height:1.4}
      .ag-ping-dismiss{background:none;border:none;cursor:pointer;color:var(--ag-muted);font-size:1rem;padding:2px 4px;line-height:1;border-radius:4px}
      .ag-ping-dismiss:hover{color:var(--ag-text)}
      @media (prefers-color-scheme:dark){
        .ag-ping-banner{background:linear-gradient(135deg,rgba(100,160,255,.14),rgba(47,122,79,.12));border-color:rgba(100,160,255,.32)}
        .ag-ping-banner [data-ag-ping-text]{color:#9ec8ff}
      }

      /* ── Notfall-Umarmung card ── */
      .ag-hug-card{}
      .ag-hug-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
      .ag-hug-text{flex:1 1 200px;min-width:0}
      .ag-hug-button{
        display:inline-flex;align-items:center;gap:8px;
        padding:12px 16px;border-radius:999px;
        border:1px solid var(--ag-border);
        background:linear-gradient(135deg,rgba(232,164,164,.22),rgba(185,120,46,.18));
        color:var(--ag-text);font-weight:700;font-size:.95rem;font-family:inherit;
        cursor:pointer;transition:transform 120ms var(--ag-ease),box-shadow 150ms var(--ag-ease),background 150ms var(--ag-ease);
        box-shadow:0 1px 0 rgba(0,0,0,.04);
        flex-shrink:0;white-space:nowrap;
      }
      .ag-hug-button:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(232,164,164,.25)}
      .ag-hug-button:active{transform:translateY(0)}
      .ag-hug-button:disabled{opacity:.6;cursor:default;transform:none;box-shadow:none}
      .ag-hug-emoji{font-size:1.15rem;line-height:1}
      @media (prefers-color-scheme:dark){
        .ag-hug-button{background:linear-gradient(135deg,rgba(232,164,164,.18),rgba(185,120,46,.22));border-color:rgba(255,255,255,.14)}
      }

      @media (max-width:380px){
        .ag-hug-row{flex-direction:column;align-items:stretch}
        .ag-hug-button{justify-content:center;width:100%}
      }
      .ag-hug-status{margin:10px 0 0;color:var(--ag-muted);font-size:.88rem;line-height:1.5}
      .ag-hug-status[data-ag-hug-state="ok"]{color:var(--ag-text)}
      .ag-hug-status[data-ag-hug-state="error"]{color:#a83f3f}
      @media (prefers-color-scheme:dark){
        .ag-hug-status[data-ag-hug-state="error"]{color:#e8a4a4}
      }

      /* ── Wunschkapsel card ── */
      .ag-wish-card{}
      .ag-wish-label{margin:0 0 6px;font-weight:800;font-size:1rem;color:var(--ag-text);letter-spacing:.01em}
      .ag-wish-note{margin:0 0 14px;color:var(--ag-muted);font-size:.92rem;line-height:1.55}
      .ag-wish-meta{margin:6px 0 0;color:var(--ag-muted);font-size:.82rem;font-style:italic}
      .ag-wish-input{
        display:block;width:100%;padding:12px 14px;
        border:1px solid var(--ag-border);border-radius:var(--ag-radius-md);
        background:var(--ag-surface-2);color:var(--ag-text);
        font-family:inherit;font-size:.95rem;line-height:1.5;resize:vertical;
        transition:border-color 150ms var(--ag-ease);outline:none;
        margin-bottom:12px;
      }
      .ag-wish-input:focus{border-color:var(--ag-primary)}
      @media (prefers-color-scheme:dark){
        .ag-wish-input{background:rgba(8,28,18,.6);border-color:rgba(255,255,255,.12)}
        .ag-wish-input:focus{border-color:var(--ag-primary)}
      }
      .ag-wish-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}

      /* ── Notification prompt card ── */
      .ag-notif-card{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
      .ag-notif-card:not([hidden]){display:flex}
      .ag-notif-text{margin:0;font-size:.93rem;color:var(--ag-text);flex:1;min-width:0;line-height:1.5}
      .ag-notif-actions{display:flex;gap:8px;flex-shrink:0}

      /* ── Link embed (Spotify / generic) ── */
      .ag-link-embed{margin:14px 0 0;border-radius:var(--ag-radius-md);overflow:hidden}
      .ag-spotify-iframe{display:block;width:100%;border:0;border-radius:var(--ag-radius-md)}
      .ag-outcome-link{
        display:inline-flex;align-items:center;gap:6px;margin-top:10px;
        padding:8px 16px;border-radius:999px;
        text-decoration:none;font-size:.9rem;
      }
      .ag-history-item .ag-outcome-link{margin-top:8px;font-size:.84rem;padding:6px 12px;min-height:34px}
      .ag-outcome-link-locked{
        display:inline-block;margin-top:10px;padding:8px 16px;border-radius:999px;
        font-size:.9rem;color:var(--ag-muted);background:transparent;
        border:1px dashed var(--ag-border);cursor:default;opacity:.7;
      }

      .ag-pin-gate{margin:14px 0 0;padding:14px 16px;border-radius:var(--ag-radius-md);border:1px dashed var(--ag-border);background:rgba(0,0,0,.035)}
      .ag-prompt-gate{margin:16px 0;padding:16px;border-radius:var(--ag-radius-md);border:1px dashed var(--ag-border);background:var(--ag-surface)}
      .ag-prompt-question{margin:0 0 12px;font-size:.95rem;font-weight:500;color:var(--ag-text);line-height:1.45}
      .ag-prompt-textarea{width:100%;padding:10px 12px;border-radius:var(--ag-radius);border:1px solid var(--ag-border);background:var(--ag-background);color:var(--ag-text);font-size:.95rem;line-height:1.5;font-family:inherit;resize:none;outline:none;transition:border-color .15s;box-sizing:border-box;display:block;margin:0 0 10px}
      .ag-prompt-textarea:focus{border-color:var(--ag-primary)}
      .ag-history-answer-wrap{margin:12px 0 0}
      .ag-history-answer-label{margin:0 0 4px;font-size:.75rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ag-primary);opacity:.8}
      .ag-history-answer{margin:0;padding:8px 12px;border-left:3px solid var(--ag-primary);border-radius:0 var(--ag-radius) var(--ag-radius) 0;background:rgba(0,0,0,.03);font-size:.88rem;color:var(--ag-muted);font-style:italic;line-height:1.5;white-space:pre-wrap}
      .ag-pin-hint{margin:0 0 10px;font-size:.88rem;color:var(--ag-muted);line-height:1.45}
      .ag-pin-row{display:flex;gap:8px;align-items:center}
      .ag-pin-input{width:88px;padding:8px 10px;border-radius:var(--ag-radius);border:1px solid var(--ag-border);background:var(--ag-surface);color:var(--ag-text);font-size:1.1rem;letter-spacing:.25em;text-align:center;font-family:monospace;outline:none;transition:border-color .15s}
      .ag-pin-input:focus{border-color:var(--ag-primary)}
      .ag-pin-err{margin:8px 0 0;font-size:.82rem;color:#c0392b}
      @keyframes ag-pin-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
      .ag-pin-shake{animation:ag-pin-shake .4s ease}

      .ag-letter-overlay{
        position:fixed;inset:0;z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:32px 24px;
        background:
          radial-gradient(ellipse 90% 70% at 25% 15%, rgba(47,122,79,.5) 0%, transparent 55%),
          radial-gradient(ellipse 70% 90% at 80% 80%, rgba(184,120,46,.38) 0%, transparent 50%),
          radial-gradient(ellipse 60% 60% at 60% 30%, rgba(55,106,131,.3) 0%, transparent 50%),
          rgba(6,14,9,.88);
        backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
        animation:ag-letter-fade-in 900ms cubic-bezier(.16,1,.3,1) both;
      }
      .ag-letter-overlay[hidden]{display:none}
      @keyframes ag-letter-fade-in{from{opacity:0}to{opacity:1}}

      .ag-lightbox{
        position:fixed;inset:0;z-index:10000;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        background:rgba(0,0,0,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
        padding:16px;animation:ag-letter-fade-in 200ms ease both;
      }
      .ag-lightbox[hidden]{display:none}
      .ag-lightbox-close{
        position:absolute;top:16px;right:16px;
        background:rgba(255,255,255,.12);border:none;color:#fff;
        width:36px;height:36px;border-radius:50%;font-size:1rem;cursor:pointer;
        display:flex;align-items:center;justify-content:center;
        transition:background .15s;
      }
      .ag-lightbox-close:hover{background:rgba(255,255,255,.25)}
      .ag-lightbox-img{
        max-width:100%;max-height:calc(100vh - 80px);
        border-radius:12px;object-fit:contain;
        animation:ag-enter 220ms var(--ag-ease) both;
      }
      .ag-lightbox-iframe{
        width:min(720px,92vw);aspect-ratio:16/9;
        border:0;border-radius:12px;background:#000;
        animation:ag-enter 220ms var(--ag-ease) both;
      }
      .ag-lightbox-video{
        max-width:100%;max-height:calc(100vh - 80px);
        border-radius:12px;background:#000;
        animation:ag-enter 220ms var(--ag-ease) both;
      }
      .ag-lightbox-caption{
        margin:12px 0 0;color:rgba(255,255,255,.7);font-size:.88rem;
        text-align:center;max-width:480px;
      }
      .ag-lightbox-drive-link{
        display:inline-block;margin-top:10px;
        color:rgba(255,255,255,.55);font-size:.8rem;text-decoration:none;
        border:1px solid rgba(255,255,255,.2);border-radius:20px;
        padding:4px 14px;transition:color .15s,border-color .15s;
      }
      .ag-lightbox-drive-link:hover{color:#fff;border-color:rgba(255,255,255,.6)}
      .ag-lightbox-drive-link[hidden]{display:none}

      .ag-letter-card{
        position:relative;
        max-width:420px;width:100%;
        background:rgba(255,253,246,.03);
        border:1px solid rgba(255,255,255,.09);
        border-radius:28px;
        padding:clamp(28px,5vw,44px);
        box-shadow:0 0 80px rgba(47,122,79,.14),0 0 160px rgba(184,120,46,.07),inset 0 1px 0 rgba(255,255,255,.06);
        animation:ag-letter-rise 700ms cubic-bezier(.16,1,.3,1) both;
        animation-delay:120ms;
        color:rgba(238,248,236,.95);
      }
      @keyframes ag-letter-rise{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:none}}

      .ag-letter-close{
        position:absolute;top:16px;right:16px;
        background:none;border:none;cursor:pointer;
        font-size:1rem;color:rgba(181,200,178,.5);padding:6px 10px;
        border-radius:8px;line-height:1;
      }
      .ag-letter-close:hover{color:rgba(238,248,236,.9)}

      .ag-letter-photo{
        display:block;width:100%;height:170px;object-fit:cover;
        border-radius:18px;margin-bottom:1.2rem;
        box-shadow:0 8px 32px rgba(0,0,0,.35);
        animation:ag-letter-rise 800ms cubic-bezier(.16,1,.3,1) both;
        animation-delay:260ms;
      }

      .ag-letter-prelude{
        margin:0;text-align:center;line-height:1.7;
        font-size:1.05rem;font-style:italic;
        color:rgba(181,200,178,.7);
        display:flex;flex-wrap:wrap;justify-content:center;gap:0 .32em;
        min-height:3.5em;align-items:center;
      }
      .ag-letter-word{
        display:inline-block;opacity:0;filter:blur(7px);transform:translateY(5px);
        animation:ag-word-appear 700ms cubic-bezier(.16,1,.3,1) forwards;
      }
      @keyframes ag-word-appear{to{opacity:1;filter:blur(0);transform:none}}

      .ag-letter-eyebrow{
        margin:0 0 .45rem;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;
        color:rgba(224,167,80,.85);font-weight:700;
      }
      .ag-letter-title{
        margin:0 0 1.1rem;font-size:1.3rem;font-weight:800;line-height:1.2;
        color:rgba(238,248,236,.97);
        animation:ag-letter-rise 800ms cubic-bezier(.16,1,.3,1) both;
        animation-delay:200ms;
      }
      .ag-letter-body{animation:ag-letter-rise 700ms cubic-bezier(.16,1,.3,1) both;animation-delay:300ms;}
      .ag-letter-body p{
        margin:0 0 .8rem;line-height:1.7;font-size:.98rem;color:rgba(238,248,236,.88);
      }
      .ag-letter-body p:last-child{margin-bottom:0}
      .ag-letter-sign{font-style:italic;font-weight:600;color:rgba(143,207,158,.9)!important;}

      /* ═══════════════════════════════════
         UI / UX OVERHAUL — Refinement pass
         ═══════════════════════════════════ */

      /* Cards: cleaner flat premium surface */
      .ag-card{
        background:var(--ag-surface);
        box-shadow:0 1px 3px rgba(8,28,18,.06),0 6px 20px rgba(8,28,18,.1),0 1px 0 rgba(255,255,255,.65) inset;
        transition:box-shadow 220ms var(--ag-ease),transform 220ms var(--ag-ease);
      }
      @media (prefers-color-scheme:dark){
        .ag-card{
          background:rgba(21,33,23,.98);
          box-shadow:0 1px 3px rgba(0,0,0,.3),0 8px 28px rgba(0,0,0,.42);
        }
      }

      /* History: timeline left-accent per tone */
      .ag-history-item{
        padding:14px 16px;
        border-left-width:3px;
        border-radius:var(--ag-radius-md);
        background:var(--ag-surface);
        box-shadow:0 1px 4px rgba(8,28,18,.06);
      }
      .ag-history-item:hover{
        transform:translateY(-1px);
        border-left-color:var(--ag-primary);
        box-shadow:0 4px 14px rgba(8,28,18,.11);
      }
      .ag-history-item[data-tone="warm"]    {border-left-color:var(--ag-gold)}
      .ag-history-item[data-tone="jackpot"] {border-left-color:var(--ag-gold)}
      .ag-history-item[data-tone="quest"]   {border-left-color:var(--ag-blue)}
      .ag-history-item[data-tone="rare"],
      .ag-history-item[data-tone="photo"]   {border-left-color:var(--ag-green)}
      .ag-history-item[data-tone="cursed"]  {border-left-color:var(--ag-primary)}
      @media (prefers-color-scheme:dark){
        .ag-history-item{background:rgba(22,34,24,.82)}
        .ag-history-item:hover{box-shadow:0 4px 16px rgba(0,0,0,.3)}
      }

      /* History thumbnail: slightly larger on wide screens */
      @media (min-width:480px){
        .ag-history-thumb{width:72px;height:72px;border-radius:12px}
      }

      /* History title & date: sharper */
      .ag-history-title{font-size:1.02rem;font-weight:800}
      .ag-history-date{font-size:.75rem;letter-spacing:.06em}

      /* Empty state: solid border, centred */
      .ag-history-empty{
        border-style:solid;
        background:var(--ag-surface);
        text-align:center;
        padding:24px 20px;
        border-radius:var(--ag-radius-lg);
      }

      /* Form inputs: shadow ring on focus */
      .ag-berge-input{
        transition:border-color 150ms var(--ag-ease),box-shadow 150ms var(--ag-ease);
      }
      .ag-berge-input:focus{
        border-color:var(--ag-primary);
        box-shadow:0 0 0 3px rgba(47,122,79,.15);
        outline:none;
      }
      .ag-wish-input:focus{
        border-color:var(--ag-primary);
        box-shadow:0 0 0 3px rgba(47,122,79,.15);
      }
      .ag-mission-comment:focus{
        box-shadow:0 0 0 3px rgba(47,122,79,.15);
      }

      .ag-gipfel-cover{height:160px;border-radius:var(--ag-radius-md);margin-bottom:10px}
      @media (prefers-color-scheme:dark){
        .ag-gipfel-elev{color:#8fcf9e}
        .ag-berge-total-elev{color:#8fcf9e}
      }

      /* Berge stats counter: bigger */
      .ag-berge-total-elev{font-size:2.4rem}

      /* ── Glossary language tab strip ── */
      .ag-glossary-tab-track{
        position:relative;display:inline-flex;align-items:stretch;
        background:var(--ag-surface-2);border-radius:999px;padding:3px;gap:0;
        margin-bottom:14px;
      }
      @media (prefers-color-scheme:dark){
        .ag-glossary-tab-track{background:rgba(255,255,255,.08)}
      }
      .ag-glossary-tab-pill{
        position:absolute;top:3px;left:0;height:calc(100% - 6px);
        border-radius:999px;background:var(--ag-primary);
        transition:transform 300ms cubic-bezier(.34,1.56,.64,1),width 300ms cubic-bezier(.34,1.56,.64,1);
        pointer-events:none;z-index:0;
      }
      .ag-glossary-tab{
        position:relative;z-index:1;
        appearance:none;-webkit-appearance:none;
        border:none;background:transparent;
        padding:6px 16px;border-radius:999px;
        font-size:.82rem;font-weight:600;
        color:var(--ag-muted);
        cursor:pointer;white-space:nowrap;
        transition:color 200ms;
      }
      .ag-glossary-tab.is-active{color:#fff;font-weight:700}
      .ag-glossary-tab:focus-visible{outline:2px solid var(--ag-primary);outline-offset:2px}

      /* Glossary search */
      .ag-glossary-search-wrap{position:relative;margin-bottom:10px}
      .ag-glossary-search-wrap::before{
        content:"⌕";position:absolute;left:9px;top:50%;transform:translateY(-50%);
        font-size:1rem;line-height:1;pointer-events:none;opacity:.4;color:var(--ag-text)
      }
      .ag-glossary-search{
        width:100%;box-sizing:border-box;
        background:var(--ag-surface);border:1px solid var(--ag-border);
        border-radius:var(--ag-radius-md);padding:7px 10px 7px 28px;
        font-size:.83rem;color:var(--ag-text);outline:none;
        transition:border-color 150ms var(--ag-ease);font-family:inherit
      }
      .ag-glossary-search::placeholder{color:var(--ag-muted)}
      .ag-glossary-search:focus{border-color:var(--ag-primary)}
      .ag-glossary-search::-webkit-search-cancel-button{display:none}
      .ag-glossary-lang-badge{
        font-size:.65rem;font-weight:700;letter-spacing:.02em;
        color:var(--ag-primary);background:rgba(47,122,79,.12);
        border-radius:4px;padding:1px 5px;vertical-align:middle;margin-left:6px
      }

      /* Glossary cards: elevated hover */
      .ag-glossary-card{
        background:var(--ag-surface);
        border-radius:var(--ag-radius-lg);
        padding:14px 16px;
        box-shadow:0 1px 4px rgba(8,28,18,.05);
        transition:transform 160ms var(--ag-ease),box-shadow 160ms var(--ag-ease),border-color 160ms;
      }
      .ag-glossary-card:hover{
        transform:translateY(-2px);
        box-shadow:0 4px 18px rgba(8,28,18,.12);
        border-color:rgba(47,122,79,.45);
      }
      @media (prefers-color-scheme:dark){
        .ag-glossary-card{background:rgba(22,34,24,.82)}
        .ag-glossary-card:hover{box-shadow:0 4px 18px rgba(0,0,0,.32)}
      }

      /* Chips: smooth hover scale */
      .ag-chips li{transition:transform 140ms var(--ag-ease),background 140ms}
      .ag-chip-clickable:hover{transform:translateY(-2px) scale(1.04);background:rgba(8,28,18,.6)}

      /* Secondary button: subtle surface + refined dark mode */
      .ag-secondary{background:var(--ag-surface-2)}
      .ag-secondary:hover{background:rgba(47,122,79,.1)}
      @media (prefers-color-scheme:dark){
        .ag-secondary{background:rgba(255,255,255,.05);color:var(--ag-primary)}
        .ag-secondary:hover{background:rgba(47,122,79,.18);border-color:var(--ag-primary)}
      }

      /* Mission card: more spacious, larger radius */
      .ag-mission-card{padding:20px 22px;border-radius:var(--ag-radius-lg)}
      @media (prefers-color-scheme:dark){.ag-mission-card{background:rgba(22,34,24,.96)}}

      /* Banners: consistent large radius */
      .ag-milestone{border-radius:var(--ag-radius-lg);padding:14px 18px}
      .ag-ping-banner{border-radius:var(--ag-radius-lg)}

      /* Forage: consistent radius */
      .ag-forage-field{border-radius:var(--ag-radius-lg)}

      /* Hug button: warmer hover shadow */
      .ag-hug-button{background:linear-gradient(135deg,rgba(232,164,164,.28),rgba(185,120,46,.22));border-color:rgba(232,164,164,.3)}
      .ag-hug-button:hover{box-shadow:0 6px 22px rgba(232,164,164,.28)}

      /* Result card: larger heading, readable body */
      .ag-result h2{font-size:clamp(1.45rem,1.1rem + 1.3vw,2.1rem)}
      .ag-result p{font-size:.96rem;line-height:1.65}

      /* Photo: rounded media inside card */
      .ag-photo{border-radius:var(--ag-radius-lg)}

      /* Forage reward photo: bigger radius */
      .ag-baerlauch-photo{border-radius:var(--ag-radius-lg)}

      /* Quest/Gespräch cards: match card style */
      .ag-quest-challenge,
      .ag-gesprach-card{border-radius:var(--ag-radius-md);transition:border-color 150ms}

      /* Notif card: more visual separation */
      .ag-notif-text{font-size:.95rem}

      /* Kicker: slightly brighter */
      .ag-kicker{color:#e0f0dc}

      /* Intro text: more readable line length */
      .ag-intro{max-width:32rem;font-size:clamp(.97rem,.93rem + .2vw,1.06rem)}

      /* Score pill: tighter */
      .ag-score-pill{font-weight:800;letter-spacing:.03em}

      /* Draw hint: italic */
      .ag-draw-hint{font-style:italic;font-size:.9rem}

      /* Panel gap */
      .ag-panel{gap:clamp(12px,2vw,16px)}

      /* Sticky-like tabs: add a small top margin to compensate for scroll */
      .ag-tabs{box-shadow:0 2px 8px rgba(8,28,18,.12)}

      /* ── Mobile: bottom nav ── */
      .ag-bottomnav{display:none}
      @media (max-width:900px){
        /* Hide inline tabs; bottom nav slides up as a floating glass pill */
        .ag-tabs{display:none}

        /* ── Liquid Glass floating pill ── */
        .ag-bottomnav{
          display:flex;
          position:fixed;
          bottom:calc(12px + env(safe-area-inset-bottom));
          left:16px;right:16px;
          z-index:1000;
          border-radius:26px;
          background:rgba(255,255,255,.13);
          backdrop-filter:blur(16px) saturate(1.9) brightness(1.06);
          -webkit-backdrop-filter:blur(16px) saturate(1.9) brightness(1.06);
          border:1px solid rgba(255,255,255,.32);
          box-shadow:
            0 1.5px 0 rgba(255,255,255,.28) inset,
            0 -1px 0 rgba(0,0,0,.07) inset,
            0 10px 40px rgba(0,0,0,.22),
            0 2px 8px rgba(0,0,0,.12);
          padding:5px;
          overflow:hidden;
        }
        @media (prefers-color-scheme:dark){
          .ag-bottomnav{
            background:rgba(14,28,17,.62);
            border-color:rgba(255,255,255,.18);
            box-shadow:
              0 1px 0 rgba(255,255,255,.12) inset,
              0 10px 44px rgba(0,0,0,.55);
          }
        }
        .ag-bottomnav-btn{
          flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:4px;padding:9px 6px;background:none;border:none;cursor:pointer;
          min-height:50px;
          color:rgba(255,255,255,.48);
          font-family:inherit;
          border-radius:22px;
          transition:color 180ms var(--ag-ease),background 180ms var(--ag-ease),transform 120ms var(--ag-ease);
          -webkit-tap-highlight-color:transparent;
        }

        /* Liquid glass sliding pill */
        .ag-nav-pill{
          position:absolute;
          top:5px;
          height:calc(100% - 10px);
          border-radius:16px;
          background:linear-gradient(170deg,rgba(255,255,255,.32) 0%,rgba(255,255,255,.10) 100%);
          backdrop-filter:blur(12px) saturate(2.8) brightness(1.14);
          -webkit-backdrop-filter:blur(12px) saturate(2.8) brightness(1.14);
          border:1px solid rgba(255,255,255,.62);
          box-shadow:
            0 1.5px 0 rgba(255,255,255,.70) inset,
            0 -1px 0 rgba(0,0,0,.07) inset,
            1.5px 0 0 rgba(255,255,255,.22) inset,
            -1.5px 0 0 rgba(255,255,255,.22) inset,
            0 10px 28px rgba(0,0,0,.16),
            0 2px 6px rgba(0,0,0,.10);
          pointer-events:none;
          z-index:0;
          will-change:left;
          transition:left 340ms cubic-bezier(.34,1.56,.64,1);
        }
        @media (prefers-color-scheme:dark){
          .ag-nav-pill{
            background:linear-gradient(170deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.05) 100%);
            border-color:rgba(255,255,255,.32);
            box-shadow:
              0 1.5px 0 rgba(255,255,255,.28) inset,
              0 -1px 0 rgba(0,0,0,.12) inset,
              1.5px 0 0 rgba(255,255,255,.10) inset,
              -1.5px 0 0 rgba(255,255,255,.10) inset,
              0 10px 32px rgba(0,0,0,.50),
              0 2px 8px rgba(0,0,0,.28);
          }
        }
        .ag-bottomnav-btn.is-active{color:#fff}
        .ag-bottomnav-btn:active{transform:scale(.90)}
        .ag-bottomnav-btn{position:relative;z-index:1}
        .ag-bottomnav-btn-icon{
          font-size:1.3rem;line-height:1;
          filter:drop-shadow(0 1px 3px rgba(0,0,0,.2));
          transition:transform 180ms var(--ag-ease);
        }
        .ag-bottomnav-btn.is-active .ag-bottomnav-btn-icon{transform:scale(1.08)}
        .ag-bottomnav-btn-label{
          font-size:.58rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
          opacity:.85;
        }

        /* Frame: enough padding to clear the floating pill */
        .ag-frame{padding-bottom:calc(90px + env(safe-area-inset-bottom))}
      }

      /* ── FAB ── */
      .ag-fab{display:none}
      @media (max-width:900px){
        .ag-fab{
          display:flex;align-items:center;justify-content:center;
          position:fixed;bottom:calc(60px + env(safe-area-inset-bottom) + 14px);right:16px;
          z-index:999;width:52px;height:52px;border-radius:999px;
          background:linear-gradient(180deg,var(--ag-primary),var(--ag-primary-dark));
          color:#fffdf8;border:none;cursor:pointer;font-size:1.6rem;font-weight:400;line-height:1;
          box-shadow:0 4px 20px rgba(47,122,79,.5),0 0 0 3px rgba(255,253,242,.12);
          transition:transform 140ms var(--ag-ease),box-shadow 140ms var(--ag-ease);
          -webkit-tap-highlight-color:transparent;
        }
        .ag-fab[hidden]{display:none!important}
        .ag-fab:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(47,122,79,.55)}
        .ag-fab:active{transform:scale(.93)}
      }

      /* ── Toast ── */
      .ag-toast-container{
        position:fixed;bottom:calc(72px + env(safe-area-inset-bottom));
        left:50%;transform:translateX(-50%);
        z-index:2000;display:flex;flex-direction:column;align-items:center;gap:8px;
        pointer-events:none;
      }
      .ag-toast{
        background:rgba(8,28,18,.92);color:#fffdf2;
        backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
        border:1px solid rgba(255,255,255,.16);border-radius:999px;
        padding:10px 20px;font-size:.9rem;font-weight:600;font-family:inherit;
        white-space:nowrap;
        animation:ag-toast-in 280ms var(--ag-ease) both;
        box-shadow:0 4px 20px rgba(0,0,0,.28);
      }
      .ag-toast.is-leaving{animation:ag-toast-out 260ms var(--ag-ease) both}
      @keyframes ag-toast-in{from{opacity:0;transform:translateY(10px) scale(.93)}to{opacity:1;transform:none}}
      @keyframes ag-toast-out{to{opacity:0;transform:translateY(-6px) scale(.96)}}

      /* ── Sheet backdrop ── */
      .ag-sheet-backdrop{
        display:none;position:fixed;inset:0;z-index:1005;
        background:rgba(0,0,0,.38);
        animation:ag-letter-fade-in 200ms ease both;
      }
      .ag-sheet-backdrop.is-open{display:block}

      /* Form must always sit above the backdrop on every screen size */
      [data-ag-berge-form]:not([hidden]),
      #ag-glossary-form:not([hidden]){position:relative;z-index:1010}

      /* Glossary form field spacing */
      .ag-glossary-form-fields{display:flex;flex-direction:column;gap:10px;margin-top:10px}
      .ag-glossary-audio-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .ag-glossary-form-actions{display:flex;gap:8px;margin-top:12px}
      .ag-glossary-form-actions .ag-button{flex:1}
      .ag-glossary-form-actions .ag-secondary{flex-shrink:0}

      /* ── Bottom sheet: berge & glossary forms on mobile ── */
      @media (max-width:900px){
        [data-ag-berge-form]:not([hidden]),
        #ag-glossary-form:not([hidden]){
          position:fixed;bottom:0;left:0;right:0;
          z-index:1010;
          background:var(--ag-surface);
          border-radius:var(--ag-radius-lg) var(--ag-radius-lg) 0 0;
          padding:24px 20px calc(32px + env(safe-area-inset-bottom));
          max-height:88vh;overflow-y:auto;
          box-shadow:0 -8px 40px rgba(0,0,0,.28);
          margin:0;
          animation:ag-sheet-in 300ms var(--ag-ease) both;
        }
        @media (prefers-color-scheme:dark){
          [data-ag-berge-form]:not([hidden]),
          #ag-glossary-form:not([hidden]){background:rgba(20,30,22,.98)}
        }
      }
      @keyframes ag-sheet-in{from{transform:translateY(100%)}to{transform:none}}

      /* ── Pull-to-refresh indicator ── */
      .ag-ptr{
        position:fixed;top:-48px;left:50%;transform:translateX(-50%);
        z-index:500;width:34px;height:34px;border-radius:50%;
        background:var(--ag-surface);border:1px solid var(--ag-border);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 10px rgba(0,0,0,.14);
        transition:top 240ms var(--ag-ease),opacity 240ms;
        opacity:0;pointer-events:none;
      }
      .ag-ptr.is-visible{top:10px;opacity:1}
      .ag-ptr.is-loading .ag-ptr-icon{animation:ag-spin .7s linear infinite;display:inline-block}
      .ag-ptr-icon{font-size:.88rem;color:var(--ag-primary)}

      /* ── Gipfel (peak) action buttons ── */
      .ag-gipfel-actions{
        display:flex;align-items:center;gap:4px;flex-shrink:0;
      }
      .ag-gipfel-edit,.ag-gipfel-delete{
        display:flex;align-items:center;justify-content:center;
        width:32px;height:32px;
        background:none;border:none;cursor:pointer;
        border-radius:var(--ag-radius-sm);
        color:var(--ag-muted);font-size:.9rem;
        opacity:.55;transition:opacity 120ms,background 120ms,color 120ms;
        -webkit-tap-highlight-color:transparent;
      }
      .ag-gipfel-edit:hover,.ag-gipfel-delete:hover{
        opacity:1;background:var(--ag-surface-2);color:var(--ag-text);
      }
      .ag-gipfel-delete:hover{color:#c0392b}

      /* ── Glossary card action buttons ── */
      .ag-glossary-card-btns{
        display:flex;align-items:center;gap:6px;margin-top:10px;flex-wrap:wrap;
      }
      .ag-glossary-play-btn,.ag-glossary-edit-btn,.ag-glossary-del-btn{
        display:inline-flex;align-items:center;justify-content:center;
        background:var(--ag-surface-2);border:1px solid var(--ag-border);
        border-radius:var(--ag-radius-sm);cursor:pointer;
        color:var(--ag-text);font-family:inherit;
        transition:background 140ms,border-color 140ms,transform 100ms;
        -webkit-tap-highlight-color:transparent;
      }
      .ag-glossary-play-btn{width:34px;height:34px;font-size:.85rem}
      .ag-glossary-edit-btn{padding:0 12px;height:34px;font-size:.82rem;font-weight:600}
      .ag-glossary-del-btn{width:34px;height:34px;font-size:.82rem;color:var(--ag-muted)}
      .ag-glossary-play-btn:hover,.ag-glossary-edit-btn:hover{background:rgba(47,122,79,.12);border-color:var(--ag-primary)}
      .ag-glossary-del-btn:hover{background:rgba(192,57,43,.1);border-color:rgba(192,57,43,.4);color:#c0392b}
      .ag-glossary-play-btn:active,.ag-glossary-edit-btn:active,.ag-glossary-del-btn:active{transform:scale(.93)}
      @media (prefers-color-scheme:dark){
        .ag-glossary-play-btn,.ag-glossary-edit-btn,.ag-glossary-del-btn{
          background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:var(--ag-text)
        }
        .ag-glossary-play-btn:hover,.ag-glossary-edit-btn:hover{background:rgba(47,122,79,.2)}
      }

/* ── Location search ── */
.ag-location-wrap{position:relative}
.ag-location-dropdown{
  position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:200;
  background:var(--ag-surface);border:1px solid var(--ag-border);
  border-radius:var(--ag-radius-md);overflow:hidden;
  box-shadow:0 8px 32px rgba(0,0,0,.18);
}
.ag-location-result{
  display:block;width:100%;text-align:left;padding:10px 14px;
  background:none;border:none;cursor:pointer;font-family:inherit;
  font-size:.88rem;color:var(--ag-text);border-bottom:1px solid var(--ag-border);
  transition:background 120ms;
}
.ag-location-result:last-child{border-bottom:none}
.ag-location-result:hover{background:var(--ag-surface-2)}

/* ── Gipfel map ── */
.ag-gipfel-map-section{margin-top:20px}
.ag-gipfel-map-bar{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:10px;
}
.ag-gipfel-map-title{font-weight:700;font-size:.9rem;color:var(--ag-muted)}
.ag-gipfel-map-toggles{display:flex;gap:6px}
.ag-gipfel-map-toggle{
  padding:5px 14px;border-radius:999px;border:1px solid var(--ag-border);
  background:none;cursor:pointer;font-family:inherit;font-size:.8rem;
  font-weight:600;color:var(--ag-muted);transition:background 140ms,color 140ms,border-color 140ms;
}
.ag-gipfel-map-toggle.is-active{
  background:var(--ag-primary);color:#fff;border-color:var(--ag-primary);
}
.ag-gipfel-map{
  height:300px;border-radius:var(--ag-radius-lg);overflow:hidden;
  border:1px solid var(--ag-border);
}
@media (min-width:600px){.ag-gipfel-map{height:380px}}
/* Override Leaflet defaults for dark theme */
.leaflet-container{font-family:inherit;background:#0e1a10}
.leaflet-control-zoom a{
  background:rgba(20,32,22,.9)!important;color:#a8d5b5!important;
  border-color:rgba(255,255,255,.12)!important;
}
.leaflet-control-zoom a:hover{background:rgba(47,122,79,.7)!important}
.leaflet-popup-content-wrapper{
  background:rgba(14,26,16,.97)!important;color:#fffdf2!important;
  border:1px solid rgba(126,207,163,.2)!important;border-radius:12px!important;
  box-shadow:0 8px 32px rgba(0,0,0,.5)!important;
}
.leaflet-popup-tip-container .leaflet-popup-tip{background:rgba(14,26,16,.97)!important}
.leaflet-popup-content{margin:12px 16px!important;font-size:.88rem}
.leaflet-popup-close-button{color:#a8d5b5!important;font-size:1.1rem!important}
.leaflet-popup-close-button:hover{color:#7ecfa3!important}
    `;function Pi(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=Bi.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function qi(){return`
      <svg class="ag-scene" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ag-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-scene-sky-top)"/>
            <stop offset="100%" stop-color="var(--ag-scene-sky-bottom)"/>
          </linearGradient>
          <linearGradient id="ag-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-scene-water-top)"/>
            <stop offset="100%" stop-color="var(--ag-scene-water-bottom)"/>
          </linearGradient>
          <radialGradient id="ag-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,238,180,.95)"/>
            <stop offset="55%" stop-color="rgba(255,215,140,.35)"/>
            <stop offset="100%" stop-color="rgba(255,215,140,0)"/>
          </radialGradient>
          <pattern id="ag-leaf" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M24 6 C 14 14, 14 30, 24 42 C 34 30, 34 14, 24 6 Z" fill="rgba(255,255,255,.04)"/>
            <line x1="24" y1="6" x2="24" y2="42" stroke="rgba(255,255,255,.05)" stroke-width="1"/>
          </pattern>
        </defs>

        <rect width="1200" height="600" fill="url(#ag-sky-grad)"/>
        <circle class="ag-sun" cx="940" cy="150" r="180" fill="url(#ag-sun)"/>

        <g class="ag-mountains">
          <polygon points="-40,360 220,170 360,300 540,180 720,330 880,210 1080,340 1240,260 1240,420 -40,420"
            fill="var(--ag-scene-mountain-far)"/>
          <polygon points="-40,420 160,300 320,400 500,290 660,400 840,310 1020,420 1240,330 1240,520 -40,520"
            fill="var(--ag-scene-mountain-mid)"/>
        </g>

        <g class="ag-forest-back">
          <path d="M-40 460 C 80 420, 160 470, 240 440 C 320 410, 400 470, 500 450 C 620 430, 720 480, 820 450 C 920 420, 1040 470, 1240 450 L 1240 600 L -40 600 Z"
            fill="var(--ag-scene-forest-far)"/>
        </g>

        <g class="ag-water-band">
          <rect x="-40" y="455" width="1280" height="34" fill="url(#ag-water)" opacity=".9"/>
          <path class="ag-shimmer" d="M0 470 Q 60 466 120 470 T 240 470 T 360 470 T 480 470 T 600 470 T 720 470 T 840 470 T 960 470 T 1080 470 T 1200 470"
            stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          <path class="ag-shimmer ag-shimmer-2" d="M0 478 Q 80 474 160 478 T 320 478 T 480 478 T 640 478 T 800 478 T 960 478 T 1120 478 T 1280 478"
            stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none" stroke-linecap="round"/>
        </g>

        <g class="ag-city">
          <rect x="780" y="380" width="14" height="80" fill="var(--ag-scene-city)"/>
          <rect x="800" y="360" width="20" height="100" fill="var(--ag-scene-city)"/>
          <polygon points="826,360 836,344 846,360" fill="var(--ag-scene-city)"/>
          <rect x="828" y="360" width="16" height="100" fill="var(--ag-scene-city)"/>
          <rect x="850" y="372" width="18" height="88" fill="var(--ag-scene-city)"/>
          <rect x="872" y="350" width="10" height="110" fill="var(--ag-scene-city)"/>
          <rect x="886" y="370" width="22" height="90" fill="var(--ag-scene-city)"/>
          <rect x="912" y="358" width="14" height="102" fill="var(--ag-scene-city)"/>
          <g fill="rgba(255,236,170,.7)">
            <rect x="803" y="372" width="3" height="3"/>
            <rect x="809" y="382" width="3" height="3"/>
            <rect x="833" y="376" width="3" height="3"/>
            <rect x="855" y="386" width="3" height="3"/>
            <rect x="876" y="362" width="3" height="3"/>
            <rect x="892" y="384" width="3" height="3"/>
            <rect x="916" y="372" width="3" height="3"/>
          </g>
        </g>

        <g class="ag-road">
          <path d="M-20 588 C 200 520, 360 540, 520 510 C 720 472, 880 500, 1240 460"
            stroke="var(--ag-scene-road)" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
          <path class="ag-road-dash" d="M-20 588 C 200 520, 360 540, 520 510 C 720 472, 880 500, 1240 460"
            stroke="rgba(255,253,242,.85)" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-dasharray="10 18"/>
        </g>

        <g class="ag-trees">
          <g transform="translate(80,470)"><polygon points="0,0 18,-44 36,0" fill="var(--ag-scene-tree)"/><polygon points="4,-16 18,-58 32,-16" fill="var(--ag-scene-tree-light)"/><rect x="16" y="0" width="4" height="10" fill="#3a2418"/></g>
          <g transform="translate(150,488)"><polygon points="0,0 14,-32 28,0" fill="var(--ag-scene-tree)"/><rect x="12" y="0" width="4" height="8" fill="#3a2418"/></g>
          <g transform="translate(220,478)"><polygon points="0,0 22,-52 44,0" fill="var(--ag-scene-tree)"/><polygon points="6,-20 22,-66 38,-20" fill="var(--ag-scene-tree-light)"/><rect x="20" y="0" width="4" height="10" fill="#3a2418"/></g>
          <g transform="translate(310,498)"><polygon points="0,0 12,-26 24,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(420,492)"><polygon points="0,0 16,-36 32,0" fill="var(--ag-scene-tree)"/><polygon points="4,-12 16,-46 28,-12" fill="var(--ag-scene-tree-light)"/></g>
          <g transform="translate(560,494)"><polygon points="0,0 12,-28 24,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(640,488)"><polygon points="0,0 18,-42 36,0" fill="var(--ag-scene-tree)"/><polygon points="4,-14 18,-54 32,-14" fill="var(--ag-scene-tree-light)"/></g>
          <g transform="translate(1080,490)"><polygon points="0,0 16,-38 32,0" fill="var(--ag-scene-tree)"/></g>
          <g transform="translate(1140,500)"><polygon points="0,0 12,-26 24,0" fill="var(--ag-scene-tree)"/></g>
        </g>

        <g class="ag-baerlauch">
          <g transform="translate(60,548)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(380,558)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(720,562)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(990,556)"><path d="M0 0 C 6 -16, 18 -16, 24 0 Z" fill="var(--ag-scene-leaf)"/></g>
          <g transform="translate(160,572)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
          <g transform="translate(540,572)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
          <g transform="translate(880,576)"><path d="M0 0 C 4 -10, 14 -10, 18 0 Z" fill="var(--ag-scene-leaf-light)"/></g>
        </g>

        <g class="ag-fireflies">
          <circle class="ag-firefly" cx="180" cy="220" r="2.4" fill="rgba(255,236,170,.95)"/>
          <circle class="ag-firefly ag-firefly-2" cx="430" cy="170" r="1.8" fill="rgba(255,236,170,.85)"/>
          <circle class="ag-firefly ag-firefly-3" cx="720" cy="240" r="2.2" fill="rgba(255,236,170,.9)"/>
          <circle class="ag-firefly ag-firefly-4" cx="980" cy="200" r="1.6" fill="rgba(255,236,170,.8)"/>
          <circle class="ag-firefly ag-firefly-5" cx="320" cy="310" r="1.6" fill="rgba(255,236,170,.7)"/>
          <circle class="ag-firefly ag-firefly-6" cx="610" cy="320" r="1.4" fill="rgba(255,236,170,.7)"/>
        </g>

        <rect width="1200" height="600" fill="url(#ag-leaf)"/>
      </svg>
    `}function _i(){return`
      <svg class="ag-machine-svg" viewBox="0 0 280 320" aria-hidden="true">
        <defs>
          <linearGradient id="ag-mach-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--ag-mach-top)"/>
            <stop offset="100%" stop-color="var(--ag-mach-bottom)"/>
          </linearGradient>
          <radialGradient id="ag-mach-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="rgba(255,236,170,.9)"/>
            <stop offset="55%" stop-color="rgba(255,236,170,.18)"/>
            <stop offset="100%" stop-color="rgba(255,236,170,0)"/>
          </radialGradient>
          <linearGradient id="ag-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,.32)"/>
            <stop offset="50%" stop-color="rgba(255,255,255,.06)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,.18)"/>
          </linearGradient>
        </defs>
        <rect x="20" y="14" width="240" height="292" rx="36" fill="url(#ag-mach-body)" stroke="rgba(255,255,255,.16)"/>
        <circle class="ag-mach-glow" cx="140" cy="148" r="120" fill="url(#ag-mach-glow)"/>
        <circle cx="140" cy="148" r="86" fill="rgba(8,28,18,.65)" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
        <path d="M62 152 a78 78 0 0 1 156 0" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="2"/>
        <g class="ag-mach-orbit">
          <circle cx="140" cy="62" r="3" fill="rgba(255,236,170,.95)"/>
          <circle cx="218" cy="148" r="2.4" fill="rgba(255,236,170,.7)"/>
          <circle cx="140" cy="234" r="2" fill="rgba(255,236,170,.6)"/>
          <circle cx="62" cy="148" r="2.4" fill="rgba(255,236,170,.7)"/>
        </g>
        <ellipse cx="140" cy="148" rx="34" ry="46" fill="url(#ag-glass)" opacity=".85"/>
        <rect x="64" y="266" width="152" height="20" rx="10" fill="rgba(8,28,18,.55)"/>
      </svg>
    `}const Ui=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${qi()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${_i()}
                <div class="ag-machine-capsule" data-capsule>
                  <span class="ag-capsule-shine"></span>
                </div>
                <div class="ag-orbit">
                  <span></span><span></span><span></span><span></span>
                </div>
                <div class="ag-emoji-orbit" data-ag-emoji-orbit aria-hidden="true"></div>
              </div>
              <div class="ag-copy">
                <p class="ag-kicker" data-ag-kicker>Einmal pro Tag</p>
                <h1 id="ag-title" data-ag-main-title>Affektions-Gacha</h1>
                <p class="ag-intro" data-ag-intro></p>
                <ul class="ag-chips" data-ag-chips></ul>
                <div class="ag-tabs" role="tablist" aria-label="Ansicht wählen">
                  <button class="ag-tab is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today">Heute</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="history">Verlauf</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="lieblinge" aria-label="Lieblinge">⭐</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="berge" aria-label="Berge">⛰</button>
                </div>
              </div>
            </header>
          </div>
        </div>

        <div class="ag-content">
          <div class="ag-install-nudge" data-ag-install-nudge hidden>
            <div class="ag-install-nudge-text">
              <p class="ag-install-nudge-title">App installieren 📲</p>
              <p class="ag-install-nudge-copy" data-ag-install-copy></p>
            </div>
            <div class="ag-install-nudge-actions">
              <button class="ag-secondary" type="button" data-ag-install-action hidden>Installieren</button>
              <button class="ag-install-nudge-dismiss" type="button" data-ag-install-dismiss aria-label="Schließen">✕</button>
            </div>
          </div>

          <section class="ag-card ag-mini-panel" id="ag-baerlauch-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Bärlauch-Modus</span>
              <button class="ag-secondary" type="button" id="ag-baerlauch-close">✕</button>
            </div>

            <h2 class="ag-mini-title">Bärlauch-Sammeln 🌿</h2>
            <div class="ag-baerlauch-scores" id="ag-baerlauch-scores" hidden></div>
            <p class="ag-mini-copy" id="ag-baerlauch-instruction">
              Sammle nur die guten grünen Blätter – aber nicht toten Lauch oder Maiglöckchen, die giftig sind.
            </p>
            <p class="ag-mini-level" id="ag-baerlauch-level">Level 1</p>

            <div class="ag-forage-wrap">
              <div class="ag-forage-timer" id="ag-baerlauch-timer">8.0</div>
              <div class="ag-forage-field" id="ag-baerlauch-field">
                <div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>
              </div>
            </div>

            <div class="ag-baerlauch-reward" id="ag-baerlauch-reward" hidden>
              <div class="ag-baerlauch-photo" id="ag-baerlauch-photo"></div>
              <p class="ag-baerlauch-text" id="ag-baerlauch-text"></p>
            </div>

            <div class="ag-baerlauch-actions" id="ag-baerlauch-actions" hidden>
              <button class="ag-secondary" type="button" id="ag-baerlauch-next">
                Nächstes Level
              </button>
            </div>

            <p class="ag-mini-success" id="ag-baerlauch-success" hidden></p>

          </section>

          <section class="ag-card ag-mini-panel" id="ag-gesprach-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Gespräch</span>
              <button class="ag-secondary" type="button" id="ag-gesprach-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Offene Fragen 💬</h2>
            <p class="ag-mini-copy" id="ag-gesprach-copy">Eine Frage für euch beide.</p>
            <div class="ag-gesprach-card" id="ag-gesprach-question"></div>
            <div class="ag-gesprach-actions">
              <button class="ag-secondary" type="button" id="ag-gesprach-next">Neue Frage</button>
              <button class="ag-secondary" type="button" id="ag-gesprach-wa">Mit Fionn besprechen</button>
            </div>
          </section>

          <section class="ag-card ag-mini-panel" id="ag-quest-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge" id="ag-quest-badge">Quest</span>
              <button class="ag-secondary" type="button" id="ag-quest-close">✕</button>
            </div>
            <h2 class="ag-mini-title" id="ag-quest-title">Foto-Aufgabe 📷</h2>
            <p class="ag-mini-copy" id="ag-quest-copy"></p>
            <div class="ag-quest-challenge" id="ag-quest-challenge"></div>
            <div class="ag-quest-loading" id="ag-quest-loading" hidden>
              <div class="ag-quest-spinner"></div>
              <p class="ag-quest-loading-text">Maschine prüft das Foto…</p>
            </div>
            <div class="ag-quest-hint-history" id="ag-quest-hint-history" hidden></div>
            <div class="ag-quest-actions" id="ag-quest-actions">
              <label class="ag-primary ag-quest-upload-label" id="ag-quest-upload-label">
                📷 Foto aufnehmen
                <input type="file" accept="image/*" capture="environment" id="ag-quest-file" style="display:none">
              </label>
            </div>
            <div class="ag-quest-result" id="ag-quest-result" hidden></div>
            <div class="ag-quest-points" id="ag-quest-points" hidden></div>
          </section>

          <section class="ag-card ag-mini-panel" id="ag-mission-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Mission</span>
              <button class="ag-secondary" type="button" id="ag-mission-close">✕</button>
            </div>
            <p class="ag-mini-copy">Deine Aufgabe für heute — Fionn hat eine andere.</p>
            <div class="ag-mission-card" id="ag-mission-text"></div>
            <div class="ag-mission-actions" id="ag-mission-actions">
              <button class="ag-button" type="button" id="ag-mission-done">
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span>Erledigt ✓</span>
              </button>
            </div>
            <div class="ag-mission-feedback" id="ag-mission-feedback" hidden>
              <p class="ag-mission-feedback-label">Wie war's?</p>
              <div class="ag-mission-rating" id="ag-mission-rating">
                <button class="ag-mission-rate-btn" type="button" data-rating="fire">🔥</button>
                <button class="ag-mission-rate-btn" type="button" data-rating="ok">👍</button>
                <button class="ag-mission-rate-btn" type="button" data-rating="meh">😴</button>
              </div>
              <textarea class="ag-mission-comment" id="ag-mission-comment" rows="2" maxlength="200" placeholder="Optional: was hat funktioniert oder nicht?"></textarea>
              <button class="ag-secondary ag-mission-feedback-send" type="button" id="ag-mission-feedback-send">Feedback senden</button>
              <p class="ag-mission-feedback-sent" id="ag-mission-feedback-sent" hidden>Danke — die Maschine lernt.</p>
            </div>
            <p class="ag-mission-done-note" id="ag-mission-done-note" hidden>Gut gemacht. Morgen gibt es eine neue Aufgabe für euch beide.</p>
            <div class="ag-mission-log" id="ag-mission-log" hidden></div>
          </section>

          <section class="ag-card ag-mini-panel" id="ag-glossary-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Glossar 📖</span>
              <button class="ag-secondary" type="button" id="ag-glossary-refresh" title="Glossar aus Google Sheets aktualisieren" style="margin-left:auto;margin-right:6px">↻</button>
              <button class="ag-secondary" type="button" id="ag-glossary-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Unser Glossar</h2>
            <div class="ag-glossary-tabs" id="ag-glossary-tabs">
              <div class="ag-glossary-tab-track">
                <div class="ag-glossary-tab-pill" id="ag-glossary-pill"></div>
                <button class="ag-glossary-tab is-active" type="button" data-lang="swabian">Schwäbisch</button>
                <button class="ag-glossary-tab" type="button" data-lang="portuguese">Português</button>
                <button class="ag-glossary-tab" type="button" data-lang="irish">Gaeilge</button>
                <button class="ag-glossary-tab" type="button" data-lang="deutsch-slang">Deutsch Slang</button>
              </div>
            </div>
            <div class="ag-glossary-search-wrap">
              <input class="ag-glossary-search" type="search" id="ag-glossary-search" placeholder="Suchen…" autocomplete="off" spellcheck="false">
            </div>
            <div class="ag-glossary-list" id="ag-glossary-list"></div>
            <p class="ag-history-empty" id="ag-glossary-empty" hidden>Noch kein Wort hier. Füg eins hinzu.</p>
            <button class="ag-button ag-glossary-add-btn" type="button" id="ag-glossary-add" style="width:100%;justify-content:center;margin-top:12px">
              <span class="ag-button-orb" aria-hidden="true"></span>
              <span>Wort hinzufügen</span>
            </button>
            <div class="ag-glossary-form" id="ag-glossary-form" hidden>
              <p class="ag-wish-label" id="ag-glossary-form-title">Neues Wort</p>
              <input type="hidden" id="ag-glossary-edit-id">
              <div class="ag-glossary-form-fields">
                <input class="ag-berge-input" type="text" id="ag-glossary-word-input" placeholder="Wort / Ausdruck" maxlength="80">
                <textarea class="ag-berge-input ag-glossary-textarea" id="ag-glossary-meaning-input" rows="2" maxlength="300" placeholder="Bedeutung / Erklärung"></textarea>
                <div class="ag-glossary-audio-row">
                  <button class="ag-secondary ag-glossary-record-btn" type="button" id="ag-glossary-record">🎙 Aufnehmen</button>
                  <button class="ag-secondary ag-glossary-play-preview" type="button" id="ag-glossary-play-preview" hidden>▶ Abspielen</button>
                  <span class="ag-glossary-audio-status" id="ag-glossary-audio-status"></span>
                </div>
              </div>
              <div class="ag-glossary-form-actions">
                <button class="ag-secondary" type="button" id="ag-glossary-form-cancel">Abbrechen</button>
                <button class="ag-button" type="button" id="ag-glossary-form-save">
                  <span class="ag-button-orb" aria-hidden="true"></span>
                  <span id="ag-glossary-save-label">Eintragen</span>
                </button>
              </div>
            </div>
          </section>

          <section class="ag-card ag-mini-panel" id="ag-stimmung-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Stimmung 🎨</span>
              <button class="ag-secondary" type="button" id="ag-stimmung-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Farbe des Tages</h2>
            <p class="ag-mini-copy">Wähle eine Farbe — der Hintergrund passt sich an, bis Mitternacht.</p>
            <div class="ag-stimmung-preview" aria-hidden="true">
              <span class="ag-stimmung-preview-label">Vorschau</span>
            </div>
            <div class="ag-stimmung-picker-row">
              <input type="color" id="ag-stimmung-picker" class="ag-stimmung-color-input" value="#4aaa5a" title="Farbe wählen">
              <input type="text" id="ag-stimmung-hex" class="ag-stimmung-hex-input" placeholder="#4aaa5a" maxlength="7" spellcheck="false" autocomplete="off">
            </div>
            <div class="ag-mini-actions">
              <button class="ag-button" type="button" id="ag-stimmung-apply">
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span>Anwenden</span>
              </button>
              <button class="ag-secondary" type="button" id="ag-stimmung-reset">Zurücksetzen</button>
            </div>
          </section>

          <section class="ag-panel" data-ag-panel-today role="tabpanel">
            <div class="ag-card ag-draw-card">
              <div class="ag-draw-meta">
                <span class="ag-pill" data-ag-today-pill>Heute</span>
                <span class="ag-streak" data-ag-streak hidden></span>
                <button class="ag-streak-restore" data-ag-streak-restore type="button" hidden title="Stelle deinen Streak einmalig wieder her">💎 Streak retten</button>
                <span class="ag-draw-hint" data-ag-draw-hint></span>
              </div>
              <button class="ag-button" type="button" data-ag-draw>
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span data-ag-button-text>Kapsel ziehen</span>
              </button>
            </div>

            <article class="ag-card ag-result" data-ag-result aria-live="polite" hidden>
              <div class="ag-milestone" data-ag-milestone hidden>
                <span data-ag-milestone-text></span>
              </div>
              <div class="ag-ping-banner" data-ag-ping-banner hidden>
                <span data-ag-ping-text>👋 Fionn denkt an dich.</span>
                <button class="ag-ping-dismiss" type="button" data-ag-ping-dismiss aria-label="Schließen">✕</button>
              </div>
              <div class="ag-result-head">
                <span class="ag-badge" data-ag-rarity></span>
                <span class="ag-date" data-ag-date></span>
              </div>
              <h2 data-ag-title></h2>
              <div class="ag-message" data-ag-message hidden></div>
              <div class="ag-link-embed" data-ag-link-wrap hidden></div>
              <div data-ag-token-wrap hidden></div>
              <div class="ag-freikarte-wrap" data-ag-freikarte-wrap hidden>
                <p class="ag-freikarte-hint">🎟️ Du hast eine Freikarte. Nochmal ziehen?</p>
                <button class="ag-secondary ag-freikarte-btn" type="button" data-ag-freikarte-redeem>Freikarte einlösen</button>
              </div>
              <figure class="ag-photo" data-ag-photo-wrap hidden>
                <div class="ag-media-stage" data-ag-photo-media></div>
                <figcaption data-ag-photo-caption hidden></figcaption>
              </figure>
              <div class="ag-actions">
                <button class="ag-secondary" type="button" data-ag-copy>Resultat kopieren</button>
                <a class="ag-secondary ag-link" data-ag-send href="#" rel="noopener">An Fionn schicken</a>
                <button class="ag-secondary ag-save-img" type="button" data-ag-save-img hidden>Als Bild speichern</button>
                <button class="ag-secondary ag-star" type="button" data-ag-star title="Als Lieblingspreis speichern">☆</button>
              </div>
            </article>

            <details class="ag-card ag-rules">
              <summary data-ag-rules-title>Maschinenregeln</summary>
              <p data-ag-rules-text></p>
              <ul data-ag-odds></ul>
            </details>

            <div class="ag-card ag-hug-card" data-ag-hug-card>
              <div class="ag-hug-row">
                <div class="ag-hug-text">
                  <p class="ag-wish-label">Notfall-Umarmung</p>
                  <p class="ag-wish-note" style="margin-bottom:0">Ein Stups an Fionn, wenn dir gerade nach einer Umarmung ist.</p>
                </div>
                <button class="ag-hug-button" type="button" data-ag-hug-send aria-label="Notfall-Umarmung an Fionn senden">
                  <span class="ag-hug-emoji" aria-hidden="true">🫂</span>
                  <span class="ag-hug-label">Umarmung senden</span>
                </button>
              </div>
              <p class="ag-hug-status" data-ag-hug-status hidden></p>
            </div>

            <div class="ag-card ag-wish-card" data-ag-wish-card>
              <div data-ag-wish-idle>
                <p class="ag-wish-label">Wunschkapsel</p>
                <p class="ag-wish-note">Einmal pro Woche kannst du einen Wunsch einreichen. Die Maschine nimmt ihn entgegen – ohne Versprechen.</p>
                <button class="ag-secondary" type="button" data-ag-wish-open>Wunsch einreichen</button>
              </div>
              <div data-ag-wish-form hidden>
                <p class="ag-wish-label">Was wünschst du dir?</p>
                <textarea class="ag-wish-input" data-ag-wish-input rows="3" maxlength="280" placeholder="Ein Spaziergang, ein Abend, etwas Besonderes..."></textarea>
                <div class="ag-wish-actions">
                  <button class="ag-secondary" type="button" data-ag-wish-cancel>Abbrechen</button>
                  <button class="ag-button" type="button" data-ag-wish-submit>
                    <span class="ag-button-orb" aria-hidden="true"></span>
                    <span>Einreichen</span>
                  </button>
                </div>
              </div>
              <div data-ag-wish-done hidden>
                <p class="ag-wish-label" data-ag-wish-done-title></p>
                <p class="ag-wish-note" data-ag-wish-done-note></p>
                <p class="ag-wish-meta" data-ag-wish-done-meta></p>
              </div>
            </div>

            <div class="ag-card ag-ping-card" data-ag-ping-card hidden>
              <div class="ag-hug-row">
                <div class="ag-hug-text">
                  <p class="ag-wish-label">Lennart anstupsen</p>
                  <p class="ag-wish-note" style="margin-bottom:0">Schick Lennart einen kleinen Stups — er erscheint als kurze Meldung beim nächsten App-Öffnen.</p>
                </div>
                <button class="ag-hug-button" type="button" data-ag-ping-send aria-label="Ping an Lennart senden">
                  <span class="ag-hug-emoji" aria-hidden="true">👋</span>
                  <span class="ag-hug-label">Stups senden</span>
                </button>
              </div>
              <p class="ag-hug-status" data-ag-ping-status hidden></p>
            </div>

            <div class="ag-card ag-notif-card" data-ag-notif-card hidden>
              <p class="ag-notif-text">🔔 Tägliche Erinnerung um 8 Uhr einrichten – damit die Kapsel nicht auf dich wartet.</p>
              <div class="ag-notif-actions">
                <button class="ag-secondary" type="button" data-ag-notif-dismiss>Nicht jetzt</button>
                <button class="ag-secondary" type="button" data-ag-notif-enable>Erinnern</button>
              </div>
            </div>
          </section>

          <section class="ag-panel" data-ag-panel-history role="tabpanel" hidden>
            <div class="ag-card">
              <div class="ag-history-header">
                <p class="ag-history-note" data-ag-history-note></p>
                <button class="ag-sync-btn" data-ag-sync-btn type="button" title="Verlauf aus Cloud neu laden">☁</button>
              </div>
              <div class="ag-history-filter" data-ag-history-filter role="tablist" aria-label="Verlauf filtern">
                <button class="ag-history-filter-chip is-active" type="button" data-ag-filter="all" role="tab" aria-selected="true">Alle</button>
                <button class="ag-history-filter-chip" type="button" data-ag-filter="vouchers" role="tab" aria-selected="false">Gutscheine</button>
                <button class="ag-history-filter-chip" type="button" data-ag-filter="open" role="tab" aria-selected="false">Offen</button>
              </div>
              <div class="ag-kalender" data-ag-history-calendar hidden></div>
              <ol class="ag-history" data-ag-history></ol>
              <p class="ag-history-empty" data-ag-history-empty hidden></p>
              <button class="ag-secondary ag-history-more" type="button" data-ag-history-more hidden>Mehr anzeigen</button>
            </div>
          </section>
          <section class="ag-panel" data-ag-panel-lieblinge role="tabpanel" hidden>
            <div class="ag-card">
              <p class="ag-history-note" data-ag-lieblinge-note></p>
              <ol class="ag-history" data-ag-lieblinge></ol>
              <p class="ag-history-empty" data-ag-lieblinge-empty hidden></p>
            </div>
          </section>
          <section class="ag-panel" data-ag-panel-berge role="tabpanel" hidden>
            <div class="ag-card ag-berge-header" data-ag-berge-header>
              <div class="ag-berge-stats">
                <span class="ag-berge-total-label">Gemeinsame Höhenmeter</span>
                <span class="ag-berge-total-elev" data-ag-berge-total>— m</span>
                <span class="ag-berge-analogy" data-ag-berge-analogy hidden></span>
              </div>
              <button class="ag-button ag-berge-add-btn" type="button" data-ag-berge-add>
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span>Gipfel eintragen</span>
              </button>
            </div>
            <div class="ag-card ag-berge-form" data-ag-berge-form hidden>
              <p class="ag-wish-label" data-ag-berge-form-title>Neuer Gipfeleintrag</p>
              <input type="hidden" data-ag-berge-edit-id>
              <div class="ag-berge-form-grid">
                <input class="ag-berge-input" type="text" data-ag-berge-name placeholder="Gipfelname (z.B. Mythen)" maxlength="60">
                <div class="ag-location-wrap">
                  <input class="ag-berge-input" type="text" data-ag-loc-search placeholder="Standort suchen…" autocomplete="off">
                  <div class="ag-location-dropdown" data-ag-loc-dropdown hidden></div>
                  <input type="hidden" data-ag-berge-lat>
                  <input type="hidden" data-ag-berge-lng>
                  <input type="hidden" data-ag-berge-loc-label>
                </div>
                <div class="ag-berge-row">
                  <input class="ag-berge-input" type="date" data-ag-berge-date>
                  <input class="ag-berge-input" type="number" data-ag-berge-gain placeholder="Höhenmeter (↑ m)" min="0" max="9000">
                </div>
                <input class="ag-berge-input" type="number" data-ag-berge-dist placeholder="Distanz (km)" min="0" max="500" step="0.1">
                <input class="ag-berge-input" type="url" data-ag-berge-url placeholder="Komoot-URL oder AllTrails-Widget-URL (mit sh=…)">
                <input class="ag-berge-input" type="url" data-ag-berge-cover placeholder="Titelbild-URL (optional)">
                <textarea class="ag-berge-input ag-berge-notes" data-ag-berge-notes rows="2" maxlength="300" placeholder="Notiz (optional)"></textarea>
              </div>
              <div class="ag-wish-actions">
                <button class="ag-secondary" type="button" data-ag-berge-cancel>Abbrechen</button>
                <button class="ag-button" type="button" data-ag-berge-save>
                  <span class="ag-button-orb" aria-hidden="true"></span>
                  <span>Eintragen</span>
                </button>
              </div>
            </div>
            <div data-ag-berge-list></div>
            <p class="ag-history-empty" data-ag-berge-empty hidden>Noch kein Gipfel eingetragen. Der erste wartet.</p>
            <div class="ag-gipfel-map-section" data-ag-gipfel-map-section hidden>
              <div class="ag-gipfel-map-bar">
                <span class="ag-gipfel-map-title">⛰ Auf der Karte</span>
                <div class="ag-gipfel-map-toggles">
                  <button class="ag-gipfel-map-toggle is-active" data-map-view="ch" type="button">Schweiz</button>
                  <button class="ag-gipfel-map-toggle" data-map-view="eu" type="button">Europa</button>
                </div>
              </div>
              <div id="ag-gipfel-map" class="ag-gipfel-map"></div>
            </div>
          </section>
          <section class="ag-card ag-mini-panel" id="ag-lights-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Lichtsteuerung 💡</span>
              <button class="ag-secondary" type="button" id="ag-lights-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Eure Lampen</h2>
            <p class="ag-mini-copy">
              <span class="ag-lights-dot" data-ag-lights-dot data-ag-lights-state="disconnected" aria-hidden="true"></span>
              <span data-ag-lights-status>Getrennt</span>
              <span class="ag-lights-boards">
                <span class="ag-lights-board" data-ag-lights-board="board_a">FF –</span>
                <span class="ag-lights-board" data-ag-lights-board="board_b">LS –</span>
              </span>
            </p>
            <div class="ag-lights-controls">
              <button class="ag-button ag-lights-power" type="button" data-ag-lights-power>💡 An</button>
              <label class="ag-lights-row">
                <span class="ag-lights-label">Helligkeit</span>
                <input class="ag-lights-slider" data-ag-lights-brightness type="range" min="5" max="100" value="100" aria-label="Helligkeit">
              </label>
              <label class="ag-lights-row">
                <span class="ag-lights-label">Farbe <span class="ag-lights-preview" data-ag-lights-preview aria-hidden="true"></span></span>
                <input class="ag-lights-slider ag-lights-colour" data-ag-lights-colour type="range" min="0" max="100" value="0" aria-label="Farbe">
              </label>
              <div class="ag-lights-foot">
                <button class="ag-secondary" type="button" data-ag-lights-random>🎲 Überraschung</button>
                <a class="ag-secondary ag-link" href="https://fionnf.github.io/linked_friend_lights/" target="_blank" rel="noopener noreferrer">Erweitert ↗</a>
              </div>
            </div>
          </section>
          <div class="ag-lighting-link-wrap" style="text-align:center;padding:4px 0 8px;">
              <button type="button" id="ag-lights-open" class="ag-button" style="display:inline-flex;background:var(--ag-bg);box-shadow:none;">
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span>💡 Lichtsteuerung</span>
              </button>
            </div>
          <p class="ag-sync-status" data-ag-sync-status hidden></p>
        </div>
      </div>

      <div class="ag-letter-overlay" id="ag-letter-overlay" hidden aria-modal="true" role="dialog" aria-labelledby="ag-letter-title">
        <div class="ag-letter-card">
          <button class="ag-letter-close" type="button" id="ag-letter-close" aria-label="Schließen">✕</button>
          <img class="ag-letter-photo" id="ag-letter-photo" src="" alt="" hidden>
          <p class="ag-letter-eyebrow">🍀 Nur für dich</p>
          <h2 class="ag-letter-title" id="ag-letter-title">Du hast es gefunden.</h2>
          <div class="ag-letter-body" id="ag-letter-body">
            <p class="ag-letter-loading">…</p>
          </div>
        </div>
      </div>

      <div class="ag-lightbox" id="ag-lightbox" hidden role="dialog" aria-modal="true" aria-label="Foto-Vollansicht">
        <button class="ag-lightbox-close" id="ag-lightbox-close" type="button" aria-label="Schließen">✕</button>
        <img class="ag-lightbox-img" id="ag-lightbox-img" src="" alt="">
        <p class="ag-lightbox-caption" id="ag-lightbox-caption"></p>
        <a class="ag-lightbox-drive-link" id="ag-lightbox-drive-link" target="_blank" rel="noopener noreferrer" hidden>▶ In Drive öffnen</a>
      </div>

      <div class="ag-sheet-backdrop" data-ag-sheet-backdrop></div>
      <div class="ag-ptr" data-ag-ptr aria-hidden="true"><span class="ag-ptr-icon">↓</span></div>
      <div class="ag-toast-container" data-ag-toasts aria-live="polite" aria-atomic="true"></div>
      <button class="ag-fab" type="button" data-ag-fab aria-label="Hinzufügen" hidden>+</button>
      <nav class="ag-bottomnav" aria-label="Navigation">
        <div class="ag-nav-pill" aria-hidden="true"></div>
        <button class="ag-bottomnav-btn is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">✦</span>
          <span class="ag-bottomnav-btn-label">Heute</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="history">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">📋</span>
          <span class="ag-bottomnav-btn-label">Verlauf</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="lieblinge" aria-label="Lieblinge">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">⭐</span>
          <span class="ag-bottomnav-btn-label">Lieblinge</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="berge" aria-label="Berge">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">⛰</span>
          <span class="ag-bottomnav-btn-label">Berge</span>
        </button>
      </nav>
    `;function ji(){L.className="ag-widget",L.setAttribute("aria-labelledby","ag-title"),L.innerHTML=Ui}function Q(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(i);for(let r=0;r<e;r++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,c=Math.random()*100,u=Math.random()*.6,m=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${d}px;height:${d*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${m}s ${u}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),i.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const r=document.createElement("style");r.id="ag-confetti-style",r.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(r)}setTimeout(()=>i.remove(),3e3)}function Oi(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}function Fa(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Fi(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Ce(){return(g.photos||[]).filter(e=>e.type!=="video")}function Ra(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:i=""}=a,r=I(),o=`${g.theme.secret}|${r}|${e}${i?"|"+i:""}`,s=Oi(e);if(s&&!i){const x=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],z=x[_e(`${o}|special|outcome`,x.length)],T={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:x},E=s.photoAlt&&g.photos.length&&Ce().find(P=>P.alt===s.photoAlt)||null;return{day:e,token:r,category:T,outcome:z,photo:E,unlockTime:s.unlockTime||null}}const d=i?null:yi(r,e);let c;d&&(c=g.outcomes.categories.find(x=>x.id===d.categoryId)),c||(c=Ai(`${o}|category`,t||0,n));const u=ci();if(u){const x=g.outcomes.categories.find(z=>z.id===u);x&&(c=x)}c.id==="photo"&&!Ce().length&&(c=g.outcomes.categories.find(x=>x.id==="common")||c);const m=new Set(_().filter(x=>x.token===r&&x.day<e&&x.categoryId===c.id).map(x=>x.title)),f=c.outcomes.filter(x=>!m.has(x.title)),b=f.length>0?f:c.outcomes,y=d&&c.outcomes.find(x=>x.title===d.outcomeTitle)||b[_e(`${o}|${c.id}|outcome`,b.length)],v=Ce();let h=null;if(c.id==="photo"&&v.length){const x=new Set(_().filter(E=>E.token===r&&E.day<e&&E.photo).map(E=>E.photo.url)),z=v.filter(E=>!x.has(E.url)),T=z.length>0?z:v;h=T[_e(`${o}|photo`,T.length)]}return{day:e,token:r,category:c,outcome:y,photo:h,collectToken:y.token||null,voucher:y.voucher||!1,freikarte:y.freikarte===!0}}function Ri(){const e=Ee()||D(g.theme.timezone),t=X();return Ra(e,t)}function Hi(e,t){return Ra(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function C(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function Ha(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const he=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],Ga=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],Wa="affektions-gacha:mission-done:v1",Ka="affektions-gacha:mission-feedback:v1";function Dt(){var r,o;const e=(r=g.missions)==null?void 0:r.pairs;if(!Array.isArray(e)||!e.length)return null;const t=D(((o=g.theme)==null?void 0:o.timezone)||"UTC"),a=_e(`${g.theme.secret}|mission|${t}`,e.length),n=e[a];return j()==="fionn"?n.fionn:n.lennart}function Ya(){var e;try{const t=D(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${Wa}:${j()}`)===t}catch{return!1}}function Gi(){var e,t;try{const a=D(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${Wa}:${j()}`,a);const n=j(),i=Dt(),r=new Date().toISOString();Yi({day:a,player:n,mission:i,doneAt:r});const o=(t=g.backup)==null?void 0:t.endpointUrl;o&&i&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:i,doneAt:r}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function Va(){var e;try{const t=D(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${Ka}:${j()}`)===t}catch{return!1}}function Wi(){var e;try{const t=D(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${Ka}:${j()}`,t)}catch{}}function Ki(e,t){var o,s;const a=D(((o=g.theme)==null?void 0:o.timezone)||"UTC"),n=j(),i=Dt();Vi(a,n,{rating:e,comment:t||""}),Wi();const r=(s=g.backup)==null?void 0:s.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:i,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function Yi(e){const t=Ke(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),Tt(t)}function Vi(e,t,a){const n=Ke(),i=n.findIndex(r=>r.day===e&&r.player===t);i>=0&&(n[i]={...n[i],...a},Tt(n))}function Ji(e,t){var c;if(!e)return;const a=Ke(),n=((c=g.theme)==null?void 0:c.timezone)||"UTC",i=D(n),r=new Map;for(const u of a)r.has(u.day)||r.set(u.day,{}),r.get(u.day)[u.player]=u;const o=Array.from(r.keys()).sort((u,m)=>m.localeCompare(u)).slice(0,30);if(!o.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},d=u=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(u+"T12:00:00Z"))}catch{return u}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+o.map(u=>{const m=r.get(u),f=m.lennart,b=m.fionn,y=u===i,v=[];if(f&&t!=="fionn"){const h=f.doneAt?'<span class="ag-log-done">✓</span>':"",x=f.rating?`<span class="ag-log-rating">${s[f.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${Ha(f.mission||"")}</span>${h}${x}</div>`)}if(b&&t!=="lennart"){const h=b.doneAt?'<span class="ag-log-done">✓</span>':"",x=b.rating?`<span class="ag-log-rating">${s[b.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${Ha(b.mission||"")}</span>${h}${x}</div>`)}return v.length?`<div class="ag-log-day${y?" ag-log-today":""}"><span class="ag-log-date">${d(u)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function Ja(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),i=l("#ag-mission-feedback-sent"),r=l("#ag-mission-done-note"),o=e.querySelector(".ag-mini-copy");o&&(o.hidden=!0);const s=Dt();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const d=Ya(),c=Va();a&&(a.hidden=d),n&&(n.hidden=!d,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(u=>{u.hidden=c})),i&&(i.hidden=!c),r&&(r.hidden=!d),e.querySelectorAll(".ag-mission-rate-btn").forEach(u=>u.classList.remove("is-selected")),Ji(l("#ag-mission-log"),j()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Zi(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let Xe=-1;function Za(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(va);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<he.length){Xe=a;const n=l("#ag-gesprach-question");n&&(n.textContent=he[a]);return}}}catch{}Xa()}}function Xi(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function Xa(){let e;do e=Math.floor(Math.random()*he.length);while(e===Xe&&he.length>1);Xe=e;try{localStorage.setItem(va,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=he[e])}function Qi(){const e=he[Xe]||"";if(!e)return;const t=g.theme&&g.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Qa(){var e;return!!((e=g.quest)!=null&&e.enabled&&je(g))}function en(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,tn())}function eo(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function tn(){const e=je(g),t=Te(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),i=l("#ag-quest-loading"),r=l("#ag-quest-actions"),o=l("#ag-quest-result"),s=l("#ag-quest-points"),d=l("#ag-quest-copy"),c=l("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),r&&(r.hidden=!0);return}if(a&&(a.textContent=u),i&&(i.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((m,f)=>`<div class="ag-hint-item"><span class="ag-hint-num">${f+1}</span><p>${m}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),r&&(r.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Ye()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),r&&(r.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function to(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),i=l("#ag-quest-points"),r=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await ao(e),s=Te(),d=je(g),c=(d==null?void 0:d.prompt)||"",u=(d==null?void 0:d.solution)||"";try{const m=await no(o,c,u,s.attempts+1,s.hints);if(s.attempts+=1,m.success){const f=ka[Math.min(s.attempts-1,ka.length-1)],b=Ei(f);s.solved=!0,s.pointsEarned=f,s.successMessage=m.message||"Perfekt.",Lt(s),ae(),n&&(n.textContent=m.message||"Perfekt.",n.hidden=!1),i&&(i.textContent=`+${f} Punkte · Gesamt: ${b}`,i.hidden=!1),a&&(a.hidden=!0),r&&(r.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const y=l("#ag-btn-quest");y&&y.classList.remove("ag-chip-quest-active"),C([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],m.hint||"Versuch nochmal."],Lt(s),tn()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function ao(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function no(e,t,a,n,i){var s;const r=(s=g.quest)==null?void 0:s.proxyUrl;if(!r)throw new Error("no proxy");const o=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:i})});if(!o.ok)throw new Error("proxy error");return o.json()}function ro(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let c=0;c<n;c++)r[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=i;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(d),d.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,u,m,f,b])=>{const y=t.createOscillator();y.type="sine",y.frequency.setValueAtTime(c,a+m),y.frequency.exponentialRampToValueAtTime(u,a+m+f*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+m),v.gain.linearRampToValueAtTime(b,a+m+.09),v.gain.exponentialRampToValueAtTime(.001,a+m+f),y.connect(v),v.connect(t.destination),y.start(a+m),y.stop(a+m+f+.05)})}catch{}}function io(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,i)=>{const r=document.createElement("span");r.className="ag-letter-word",r.textContent=n,r.style.animationDelay=`${320+i*155}ms`,a.appendChild(r),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function an(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function nn(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),C([20,60,20]),ro();const t=l("#ag-letter-photo");if(t&&g.photos&&g.photos.length){const a=Ce(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}oo()}async function oo(){var n;const e=l("#ag-letter-body");if(!e)return;io(e);const t=(n=g.quest)==null?void 0:n.proxyUrl;if(t)try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(i.ok){const r=await i.json();if(r.paragraphs&&r.paragraphs.length){an(e,r.paragraphs);return}}}catch{}const a=Ga[Math.floor(Math.random()*Ga.length)];an(e,a)}function Nt(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let Bt=null;function so(){if(!Bt)try{Bt=new(window.AudioContext||window.webkitAudioContext)}catch{}return Bt}function lo(){try{return window.localStorage.getItem(ti)!=="off"}catch{return!0}}function U(e,t,a,n,i=.15,r="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=r,o.frequency.value=t;const d=e.currentTime+a;s.gain.setValueAtTime(0,d),s.gain.linearRampToValueAtTime(i,d+.012),s.gain.exponentialRampToValueAtTime(1e-4,d+n),o.start(d),o.stop(d+n+.05)}function Qe(e){if(!lo())return;const t=so();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":U(t,280,0,.18,.08,"sine"),U(t,210,.12,.22,.06,"sine");break;case"cursed":U(t,220,0,.12,.1,"triangle"),U(t,170,.09,.28,.07,"triangle");break;case"uncommon":U(t,523,0,.14,.14,"sine"),U(t,784,.1,.22,.12,"sine");break;case"rare":U(t,523,0,.12,.14,"sine"),U(t,659,.09,.12,.14,"sine"),U(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>U(t,a,n*.09,.18,.13,"sine")),U(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>U(t,a,n*.08,.16,.13,"sine")),U(t,2093,.45,.5,.05,"sine");break;default:U(t,523,0,.12,.13,"sine"),U(t,659,.09,.18,.1,"sine");break}}function co(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const i=e/a;if(i>=.7)return`≈ ${i>=2?Math.round(i):(Math.round(i*10)/10).toString().replace(".",",")}× ${n}`}return null}function go(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[i,r]of Object.entries(n))if(a.startsWith("trail/"+i)){a="trail/"+r+a.slice(6+i.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function po(e){if(!e||!e.includes("alltrails.com"))return null;function t(i){const r=i.indexOf("?"),o=r===-1?i:i.slice(0,r),s=r===-1?"":i.slice(r+1),d=new URLSearchParams(s);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),o+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const i=e.match(/[?&]sh=([^&#]+)/),r=i?`&sh=${i[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${r}`)}const n=go(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function Pt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}function uo(e){const t=Ge();t.unshift(e),We(t),fe("gipfelbuch"),Pt("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function mo(e){We(Ge().filter(t=>t.id!==e)),fe("gipfelbuch"),Pt("gipfel-delete",{id:e})}function fo(e,t){const a=Ge(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,We(a),fe("gipfelbuch"),Pt("gipfel-upsert",i)}function ho(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?si(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),i=n?po(e.activityUrl):null,r=e.cover?`<div class="ag-gipfel-cover"><img src="${B(e.cover)}" alt="${B(e.name||"")}" loading="lazy" decoding="async"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${B(e.distance)} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${B(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||d?`<div class="ag-gipfel-stats">${s}${s&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${r}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${ri(e.date)}</div>
        <div class="ag-gipfel-name">${B(e.name||"—")}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${xt(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${B(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${B(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${B(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&i?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var pe;const y=l("[data-ag-berge-form]"),v=l("[data-ag-berge-add]");if(!y)return;const h=l("[data-ag-berge-edit-id]");h&&(h.value=e.id);const x=l("[data-ag-berge-name]");x&&(x.value=e.name||"");const z=l("[data-ag-berge-dist]");z&&(z.value=e.distance||"");const T=l("[data-ag-berge-gain]");T&&(T.value=e.elevGain||e.elevation||"");const E=l("[data-ag-berge-date]");E&&(E.value=e.date||"");const P=l("[data-ag-berge-url]");P&&(P.value=e.activityUrl||"");const q=l("[data-ag-berge-cover]");q&&(q.value=e.cover||"");const V=l("[data-ag-berge-notes]");V&&(V.value=e.notes||"");const De=l("[data-ag-berge-lat]");De&&(De.value=e.lat||"");const ke=l("[data-ag-berge-lng]");ke&&(ke.value=e.lng||"");const Ne=l("[data-ag-berge-loc-label]");Ne&&(Ne.value=e.locLabel||"");const Be=l("[data-ag-loc-search]");Be&&(Be.value=e.locLabel||"");const Pe=l("[data-ag-berge-form-title]");Pe&&(Pe.textContent="Eintrag bearbeiten");const re=l("[data-ag-berge-save] span:last-child");re&&(re.textContent="Speichern"),y.hidden=!1,v&&(v.hidden=!0),(pe=l("[data-ag-sheet-backdrop]"))==null||pe.classList.add("is-open"),y.scrollIntoView({behavior:"smooth",block:"nearest"}),x&&x.focus(),C(8)});const m=t.querySelector("[data-ag-gipfel-delete]");m&&m.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(mo(e.id),Le(),C(8),Promise.resolve().then(()=>Go).then(y=>y.showToast("Eintrag gelöscht")).catch(()=>{}))});const f=t.querySelector("[data-ag-map-komoot]");f&&f.addEventListener("click",()=>{const y=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(y){if(!y.hidden){y.hidden=!0,f.textContent="🗺 Komoot-Karte";return}y.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,y.hidden=!1,f.textContent="Karte schließen",C(4)}});const b=t.querySelector("[data-ag-map-alltrails]");return b&&i&&b.addEventListener("click",()=>{const y=t.querySelector("[data-ag-map-wrap-alltrails]");if(y){if(!y.hidden){y.hidden=!0,b.textContent="🗺 AllTrails-Karte";return}y.innerHTML=`<iframe src="${B(i)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,y.hidden=!1,b.textContent="Karte schließen",C(4)}}),t}function Le(){const e=l("[data-ag-berge-list]"),t=l("[data-ag-berge-empty]"),a=l("[data-ag-berge-total]"),n=l("[data-ag-berge-analogy]");if(!e)return;const i=Ge().sort((o,s)=>{const d=o.date||"",c=s.date||"";return c<d?-1:c>d?1:0});e.innerHTML="";const r=i.reduce((o,s)=>o+(Number(s.elevGain)||Number(s.elevation)||0),0);if(a&&(a.textContent=r>0?xt(r):"— m"),n){const o=co(r);o?(n.textContent=o,n.hidden=!1):n.hidden=!0}if(!i.length){t&&(t.hidden=!1),on([]);return}t&&(t.hidden=!0),i.forEach(o=>e.appendChild(ho(o))),on(i)}function bo(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function i(){const r=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");r&&(r.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const r=t.value.trim();if(!r){i();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(c=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=c.display_name,u.addEventListener("click",()=>{const m=e.querySelector("[data-ag-berge-lat]"),f=e.querySelector("[data-ag-berge-lng]"),b=e.querySelector("[data-ag-berge-loc-label]");m&&(m.value=c.lat),f&&(f.value=c.lon),b&&(b.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",r=>{!t.contains(r.target)&&!a.contains(r.target)&&(a.hidden=!0)})}function yo(){bo(L)}let G=null,et=null;function rn(){G&&setTimeout(()=>G.invalidateSize(),150)}async function vo(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function on(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await vo()}catch{return}const n=window.L,i=document.getElementById("ag-gipfel-map");if(!i)return;const r=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!G){G=n.map(i).fitBounds(r),n.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',subdomains:"abcd",maxZoom:19}).addTo(G);const s=t.querySelectorAll("[data-map-view]");s.forEach(d=>{d.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),d.classList.add("is-active");const c=d.dataset.mapView==="eu"?o:r;G.fitBounds(c)})})}et?et.clearLayers():et=n.layerGroup().addTo(G),a.forEach(s=>{const d=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${B(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${xt(u)}</div>`:""}
    `;const m=document.createElement("button");m.type="button",m.textContent="Zum Eintrag",m.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",m.addEventListener("click",()=>{d.closePopup();const f=L.querySelector(`[data-ag-gipfel-id="${s.id}"]`);f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("ag-gipfel-highlight"),setTimeout(()=>f.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(m),d.bindPopup(c),et.addLayer(d)}),requestAnimationFrame(()=>{G&&G.invalidateSize()}),setTimeout(()=>{G&&G.invalidateSize()},250)}const sn=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function ln(e){return sn[Math.min(e-1,sn.length-1)]}function be(e,t){return e+Math.random()*(t-e)}function dn(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${g.baerlauch.level}`)}function Ae(){g.baerlauch.timerId&&(clearInterval(g.baerlauch.timerId),g.baerlauch.timerId=null)}function cn(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");o&&(o.hidden=!0),Ae(),g.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),i&&(i.innerHTML=""),r&&(r.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),gn(j(),g.baerlauch.level,!1),_t()}function xo(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),i=l("#ag-baerlauch-actions"),r=l("#ag-baerlauch-next");Ae(),g.baerlauch.level+=1;const o=Eo(j(),g.baerlauch.level);if(gn(j(),g.baerlauch.level,!0),_t(),dn(),o&&Q(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&g.photos&&g.photos.length){const s=Ce(),d=s.length?s[Math.floor(Math.random()*s.length)]:null;Fn(a,d),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}r&&(r.textContent=`Level ${g.baerlauch.level} starten`),i&&(i.hidden=!1)}function wo(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),i=ln(g.baerlauch.level).timeMs;g.baerlauch.durationMs=i,g.baerlauch.startedAt=performance.now(),Ae(),g.baerlauch.timerId=setInterval(()=>{const r=performance.now()-g.baerlauch.startedAt,o=Math.max(0,i-r),s=Math.min(1,r/i);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);d.forEach(u=>{u.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,u.style.opacity=String(1-c*.28)}),o<=0&&(Ae(),e())},50)}function qt(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!i||!r)return;if(e.hidden=!1,_t(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),g.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,i.innerHTML="",r.textContent="",o&&(o.hidden=!0),dn();const s=ln(g.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...d.slice(0,s.good).map(b=>({emoji:b,good:!0})),...c.slice(0,s.bad).map(b=>({emoji:b,good:!1}))];let m=0;const f=u.filter(b=>b.good).length;u.forEach(b=>{const y=document.createElement("button");y.type="button",y.className="ag-forage-item",y.textContent=b.emoji,y.dataset.good=b.good?"true":"false",y.style.left=`${be(8,82)}%`,y.style.top=`${be(10,72)}%`,y.style.setProperty("--dx",`${be(-320,320)}px`),y.style.setProperty("--dy",`${be(-220,220)}px`),y.style.setProperty("--dur",`${be(s.speedMin,s.speedMax)}s`),y.style.setProperty("--delay",`${be(-1.8,0)}s`),y.addEventListener("click",()=>{g.baerlauch.locked||(y.dataset.good==="true"?(y.classList.add("is-picked"),y.disabled=!0,m+=1,setTimeout(()=>y.remove(),140),m===f&&xo()):cn("poison"))}),t.appendChild(y)}),wo(()=>cn("timeout"))}function ko(){const e=l("#ag-baerlauch-panel");Ae(),e&&(e.hidden=!0)}function Eo(e,t){var i;const a=Ct(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=(i=g.backup)==null?void 0:i.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function gn(e,t,a){var o;const n=Ia(),i=((o=g.theme)==null?void 0:o.timezone)||"UTC",r=D(i);n.unshift({date:r,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function _t(){var m;const e=l("#ag-baerlauch-scores");if(!e)return;const a=j()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",i=Ct(),r=Ia(),o=a==="fionn"?"lennart":"fionn",s=a in i||o in i;if(!s&&!r.length){e.hidden=!0;return}e.hidden=!1;const d=((m=g.theme)==null?void 0:m.timezone)||"UTC",c=f=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:d}).format(new Date(f+"T12:00:00Z"))}catch{return f}};let u="";if(s){const f=i[a]??0,b=i[o]??0;u+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${f||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${b||"—"}</span></div>
    </div>`}if(r.length){const f=r.slice(0,8).map(b=>{const y=b.player===a,v=y?"ag-score-mine":"ag-score-theirs",h=y?"Du":n,x=b.won?`✓ Level ${b.level}`:`✗ Level ${b.level-1>=1?b.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(b.date)}</span><span class="ag-score-pill ${v}">${h}</span><span class="ag-score-result">${x}</span></div>`}).join("");u+=`<div class="ag-score-table">${f}</div>`}e.innerHTML=u}const M={recorder:null,audioBlob:null,lang:"swabian"};function tt(){try{return JSON.parse(window.localStorage.getItem(Ea)||"[]")||[]}catch{return[]}}function at(e){try{window.localStorage.setItem(Ea,JSON.stringify(e))}catch{}}function So(e){const t=tt();t.unshift(e),at(t),fe("glossary"),Ut("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function To(e,t){const a=tt(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,at(a),fe("glossary"),Ut("glossary-upsert",i)}function Co(e){at(tt().filter(t=>t.id!==e)),fe("glossary"),Ut("glossary-delete",{id:e})}async function pn(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=I(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,i=setTimeout(()=>n.abort(),12e3);let r;try{r=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(i)}if(!r.ok)return 0;const o=await r.json();return!o.ok||!Array.isArray(o.glossary)?0:(_a("glossary")||at(o.glossary.filter(s=>s.id)),o.glossary.length)}catch{return 0}}function Ut(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:I(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function jt(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Lo(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return jt(e);try{const n=await jt(e),i=n.split(",")[1],r=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:I(),filename:`glossary-${t}.webm`,mimeType:r,data:i}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return d.ok&&d.url?d.url:n}catch{return jt(e)}}const Ao={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function zo(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${B(Ao[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${B(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${B(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${B(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${B(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${B(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const i=a.querySelector("[data-ag-glossary-play]");i&&e.audioUrl&&i.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),C(6)});const r=a.querySelector("[data-ag-glossary-edit]");r&&r.addEventListener("click",()=>{var f;const s=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const m=document.getElementById("ag-glossary-audio-status");m&&(m.textContent=e.audioUrl?"Aufnahme vorhanden":""),M.audioBlob=null,s.hidden=!1,d&&(d.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(f=document.getElementById("ag-glossary-word-input"))==null||f.focus(),C(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(Co(e.id),de(M.lang),C(8))}),a}function de(e){var o;M.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===M.lang)}),un();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),i=tt(),r=n?i.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):i.filter(s=>s.lang===M.lang);if(t.innerHTML="",!r.length){a&&(a.textContent=n?"Kein Treffer.":"Noch kein Wort hier. Füg eins hinzu.",a.hidden=!1);return}a&&(a.hidden=!0),r.forEach(s=>t.appendChild(zo(s,!!n)))}function un(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function mn(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),M.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),de("swabian"),window.requestAnimationFrame(()=>un()),C(10),pn().then(a=>{a>0&&de(M.lang)})}function Mo(){const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),M.audioBlob=null,M.recorder&&M.recorder.state!=="inactive")try{M.recorder.stop()}catch{}M.recorder=null}function fn(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,i=(r,o)=>Math.round(o+(r-o)*.3);return`rgb(${i(t,10)},${i(a,20)},${i(n,16)})`}function nt(e){document.body.style.background=fn(e),bn(e)}function hn(){document.body.style.removeProperty("background"),bn(null)}function rt(){try{const e=localStorage.getItem(bt);if(!e)return null;const t=JSON.parse(e),a=new Date().toISOString().slice(0,10);return t.day!==a?null:t.hex||null}catch{return null}}function Io(e){const t=new Date().toISOString().slice(0,10);localStorage.setItem(bt,JSON.stringify({day:t,hex:e}))}function $o(){localStorage.removeItem(bt)}function Do(){const e=rt();e&&nt(e)}function bn(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function yn(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=rt()||"#4aaa5a";vn(e,t),Ot(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function No(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=rt();t?nt(t):hn()}function Bo(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),i=e.querySelector("#ag-stimmung-reset");function r(o){Ot(e,o),nt(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),r(t.value)}),a&&a.addEventListener("input",()=>{const o=xn(a.value);o&&(t&&(t.value=o),r(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||xn((a==null?void 0:a.value)||"")||"#4aaa5a";Io(o),nt(o),e&&(e.hidden=!0)}),i&&i.addEventListener("click",()=>{$o(),hn(),vn(e,"#4aaa5a"),Ot(e,"#4aaa5a")})}function vn(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Ot(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=fn(t))}function xn(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,i,r]=a;return`#${n}${n}${i}${i}${r}${r}`.toLowerCase()}return null}const Po="wss://broker.hivemq.com:8884/mqtt",wn="picolight_lf26/events",qo=10,kn="web_app",En=[{id:"board_a",name:"FF"},{id:"board_b",name:"LS"}],Sn=7e4,Ft=[[255,200,80],[255,160,0],[255,120,0],[255,60,0],[255,0,0],[255,0,60],[255,0,140],[200,0,200],[140,0,255],[80,0,255],[0,0,255],[0,60,255],[0,140,255],[0,200,255],[0,255,220],[0,255,160],[0,255,80],[0,220,0],[80,255,0],[160,255,0],[220,255,0],[255,240,0],[255,180,40],[255,100,80],[255,80,160],[180,40,255],[40,100,255],[0,180,180],[20,255,120],[255,220,120]],it=[0,0,0,200];function ot(e,t,a){return e+(t-e)*a}function Rt(e){const t=Ft.length,a=Math.min(e,.9999)*(t-1),n=Math.floor(a),i=a-n,r=Ft[n],o=Ft[Math.min(n+1,t-1)],s=[0,1,2].map(b=>ot(r[b],o[b],i)),d=e,c=Math.round(ot(it[0],s[0],d)),u=Math.round(ot(it[1],s[1],d)),m=Math.round(ot(it[2],s[2],d)),f=Math.round(it[3]*(1-d));return[Math.min(255,c+f),Math.min(255,u+Math.round(f*.8)),Math.min(255,m+Math.round(f*.6))]}function _o(){const e=[];for(let t=0;t<=24;t++){const a=t/24,[n,i,r]=Rt(a);e.push(`rgb(${n},${i},${r}) ${Math.round(a*100)}%`)}return`linear-gradient(to right, ${e.join(", ")})`}let O=null,ze=null,ce=!0,st=1;const Ht={},Gt={};let Tn=null;function Uo(){return window.mqtt?Promise.resolve():ze||(ze=new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>{ze=null,t(new Error("mqtt.js konnte nicht geladen werden"))},document.head.appendChild(a)}),ze)}function ye(e,t){const a=l("[data-ag-lights-dot]"),n=l("[data-ag-lights-status]");a&&(a.dataset.agLightsState=e),n&&(n.textContent=t)}function lt(){const e=Date.now();for(const t of En){const a=l(`[data-ag-lights-board="${t.id}"]`);if(!a)continue;const n=Ht[t.id]&&e-Ht[t.id]<Sn;a.classList.toggle("is-online",!!n);const i=Gt[t.id];a.textContent=`${t.name} ${n?i===!1?"◦":"●":"–"}`,a.title=n?i===!1?`${t.name}: aus`:`${t.name}: an`:`${t.name}: nicht gesehen`}}function Wt(e){if(!(!O||!O.connected)){if(e.from=kn,e.on!==void 0){for(const t of En)Gt[t.id]=e.on;lt()}O.publish(wn,JSON.stringify(e))}}function Cn(){O||(ye("connecting","Verbinde…"),O=window.mqtt.connect(Po,{clientId:"gacha_"+Math.random().toString(16).slice(2),clean:!0}),O.on("connect",()=>{ye("connected","Verbunden"),O.subscribe(wn)}),O.on("message",(e,t)=>{try{const a=JSON.parse(t.toString());a.from&&a.from!==kn&&(Ht[a.from]=Date.now(),a.on!==void 0&&(Gt[a.from]=a.on),a.on!==void 0&&(ce=a.on,Kt()),a.brightness!==void 0&&(st=a.brightness,jo()),lt(),clearTimeout(Tn),Tn=setTimeout(lt,Sn+500))}catch{}}),O.on("error",()=>ye("disconnected","Fehler")),O.on("close",()=>ye("disconnected","Getrennt")),O.on("reconnect",()=>ye("connecting","Verbinde neu…")))}function Kt(){const e=l("[data-ag-lights-power]");e&&(e.classList.toggle("is-on",ce),e.textContent=ce?"💡 An":"💤 Aus")}function jo(){const e=l("[data-ag-lights-brightness]");e&&document.activeElement!==e&&(e.value=String(Math.round(st*100)))}function Ln(e){Wt({on:!0,groups:[{pos:e,w:1,size:qo}]}),ce=!0,Kt()}function Oo(){const e=document.getElementById("ag-lights-panel");e&&(e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),C(10),lt(),Uo().then(()=>Cn()).catch(()=>ye("disconnected","Offline — Verbindung nicht möglich")))}function Fo(){const e=document.getElementById("ag-lights-panel");e&&(e.hidden=!0)}function Ro(){var i,r,o,s;const e=document.getElementById("ag-lights-panel");if(!e)return;const t=e.querySelector("[data-ag-lights-colour]");t&&(t.style.background=_o());let a=null,n=null;(i=e.querySelector("[data-ag-lights-power]"))==null||i.addEventListener("click",()=>{clearTimeout(n),ce=!ce,Wt({on:ce}),Kt(),C(8)}),(r=e.querySelector("[data-ag-lights-brightness]"))==null||r.addEventListener("input",d=>{st=Math.max(.05,Number(d.target.value)/100),clearTimeout(a),a=setTimeout(()=>Wt({brightness:st}),150)}),t==null||t.addEventListener("input",d=>{const c=Number(d.target.value)/100,[u,m,f]=Rt(c),b=e.querySelector("[data-ag-lights-preview]");b&&(b.style.background=`rgb(${u},${m},${f})`),clearTimeout(n),n=setTimeout(()=>Ln(c),150)}),(o=e.querySelector("[data-ag-lights-random]"))==null||o.addEventListener("click",()=>{const d=Math.random();t&&(t.value=String(Math.round(d*100)));const[c,u,m]=Rt(d),f=e.querySelector("[data-ag-lights-preview]");f&&(f.style.background=`rgb(${c},${u},${m})`),Ln(d),C([10,15,10])}),(s=document.getElementById("ag-lights-close"))==null||s.addEventListener("click",Fo),document.addEventListener("visibilitychange",()=>{var d;document.visibilityState==="visible"&&!((d=document.getElementById("ag-lights-panel"))!=null&&d.hidden)&&window.mqtt&&!O&&Cn()})}const Yt=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],Vt=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];function ge(e){const t=L.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}function Me(e){g.activeTab=e,L.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=L.querySelector(".ag-bottomnav-btn.is-active"),i=L.querySelector(".ag-nav-pill");if(i&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const u=c.left-s.left+c.width/2;i.style.width=`${a}px`,i.style.left=`${u-a/2}px`}}l("[data-ag-panel-today]").hidden=e!=="today",l("[data-ag-panel-history]").hidden=e!=="history",l("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",l("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&Y(),e==="lieblinge"&&ut(),e==="berge"&&(rn(),Ze().then(()=>{Le(),rn()}).catch(()=>Le()));const r=l("[data-ag-fab]");r&&(r.hidden=e!=="berge")}function An(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:I(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,i).then(r=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...i,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function ve(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function zn(){const e=g.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:I(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){ve("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){ve("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),ve("Stups wird gesendet…","pending");const r=JSON.stringify(n),o=()=>{ve("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{ve("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(d=>{d&&d.ok?o():s()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o).catch(s)}catch{s()}})}function Mn(e){const t=I();if(t==="fionn")return;const a=g.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const r=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:r,message:r,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,d).catch(()=>{fetch(n,{...d,mode:"no-cors"}).catch(()=>{})})}function Jt(e){const t=g.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:I(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},i=JSON.stringify(n),r=o=>{const s=St();!s||s.week!==e.week||(za({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),la())};r("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(o=>{o&&o.ok?r("sent"):r("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(()=>r("sent")).catch(()=>r("failed"))}catch{r("failed")}})}function In(){const e=St();!e||e.week!==wt()||e.remoteStatus!=="sent"&&Jt(e)}async function $n(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(me)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(me,"granted")}catch{}await ct();return}if(e==="denied"){try{window.localStorage.setItem(me,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"))}function Ho(){var s;const e=((s=g.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),i=a*60+n,r=8*60,o=i<r?r-i:24*60-i+r;return Date.now()+o*60*1e3}async function dt(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=I(),i=D(a);if(_().some(m=>m.token===n&&m.day===i)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=vt(a);if(o>=21)return;const d=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=Ie(),u=Vt[Ta(Vt)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:u.title.replace("{name}",c),body:u.body.replace("{name}",c)})}catch{}}async function Dn(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,i=Ie(),r=Yt[Ta(Yt)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Ho(),title:r.title.replace("{name}",i),body:r.body.replace("{name}",i)}),(t=g.quest)!=null&&t.enabled&&Qa()){const o=Te(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==Ue(g)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Ue(g)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:g.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:g.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Nn(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function ct(){if("serviceWorker"in navigator)try{const e=di("sw.js");if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await Dn(),await dt(),await Nn())}catch{}}async function Bn(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(me,"dismissed")}catch{}return}try{window.localStorage.setItem(me,"granted")}catch{}await ct()}function Zt(e,t,a,n,i,r){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,i,r);else{const o=Array.isArray(r)?r:[r,r,r,r],[s,d,c,u]=o.map(m=>Math.min(m,n/2,i/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+i-c),e.quadraticCurveTo(t+n,a+i,t+n-c,a+i),e.lineTo(t+u,a+i),e.quadraticCurveTo(t,a+i,t,a+i-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function Xt(e,t,a){const n=t.split(" "),i=[];let r="";for(const o of n){const s=r?`${r} ${o}`:o;e.measureText(s).width>a&&r?(i.push(r),r=o):r=s}return r&&i.push(r),i}function Pn(e){var P,q;const i=document.createElement("canvas"),r=Math.min(window.devicePixelRatio||1,2);i.width=640*r,i.height=340*r,i.style.width="640px",i.style.height="340px";const o=i.getContext("2d");o.scale(r,r);const s=e.category.id==="jackpot",d=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",u=o.createLinearGradient(0,0,0,340);u.addColorStop(0,d),u.addColorStop(1,c),o.fillStyle=u,Zt(o,0,0,640,340,20),o.fill();const m=s?"#b9782e":"#2f7a4f";o.fillStyle=m,Zt(o,0,0,640,5,[20,20,0,0]),o.fill();const f=e.category.label,b=Fa(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${b} ${f}`,40,62);const y=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const v=o.measureText(y).width;o.fillText(y,600-v,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const h=Xt(o,e.outcome.title,640-40*2);let x=108;for(const V of h)o.fillText(V,40,x),x+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const z=Xt(o,e.outcome.message,640-40*2);x+=4;for(const V of z){if(x>270)break;o.fillText(V,40,x),x+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const T=((q=(P=g.theme)==null?void 0:P.brand)==null?void 0:q.machineName)||"Affektions-Gacha";o.fillText(T,40,324);const E=document.createElement("a");E.download=`gacha-${e.category.id}-${e.day}.png`,E.href=i.toDataURL("image/png"),E.click()}function Qt(e){L.style.opacity="1",L.style.background="#0a1410",L.style.minHeight="100vh",L.style.display="flex",L.style.alignItems="center",L.style.justifyContent="center",L.style.padding="24px",L.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${B(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function qn(){g.todaysPull||(g.todaysPull=Ri());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=g.theme.loadingSteps||["Maschine rattert"];let n=0;L.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const i=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((g.theme.revealDelayMs||3200)/a.length))),r=g.theme.revealDelayMs||3200,o=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(m=>parseFloat(m.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let c;function u(m){const f=Math.min((m-d)/r,1),b=1+5*f*f;o.forEach((y,v)=>{y.style.setProperty("--ag-emoji-duration",`${(s[v]/b).toFixed(3)}s`)}),f<1&&(c=requestAnimationFrame(u))}c=requestAnimationFrame(u),window.setTimeout(()=>{var v,h,x,z;window.clearInterval(i),cancelAnimationFrame(c),o.forEach((T,E)=>{T.style.setProperty("--ag-emoji-duration",`${s[E].toFixed(2)}s`)});const m=_().some(T=>T.day===g.todaysPull.day&&T.token===g.todaysPull.token);g.todaysPull.collectToken&&!m&&Ca(g.todaysPull.collectToken),g.todaysPull.freikarte&&!m&&Aa(g.todaysPull.token),ia(g.todaysPull),L.classList.remove("is-revealing"),L.classList.add("is-revealed"),L.classList.add("has-drawn"),e.disabled=!1,t.textContent=g.theme.brand.buttonShown,g.revealed=!0,Ee()||cs(g.todaysPull),dt();const f=X();ta(),Qo(f);const b=(h=(v=g.todaysPull)==null?void 0:v.category)==null?void 0:h.id,y=(z=(x=g.todaysPull)==null?void 0:x.category)==null?void 0:z.tone;if(b==="special"){const T=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];Q(130,T),setTimeout(()=>Q(90,T),700),Qe("special")}else if(y==="jackpot"){const T=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];Q(120,T),setTimeout(()=>Q(80,T),650),Qe("jackpot")}else y==="rare"?(Q(70),Qe("rare")):Qe(y||"common");jn[f]?C([30,20,30,20,60]):C([20,20,40]),g.activeTab==="history"&&Y(),$n()},g.theme.revealDelayMs||3200)}function _n(){var Qn,er,tr,ar,nr,rr,ir,or,sr,lr,dr,cr,gr,pr,ur,mr,fr,hr,br,yr,vr,xr,wr,kr,Er,Sr,Tr,Cr,Lr,Ar,zr,Mr,Ir,$r,Dr,Nr,Br,Pr,qr;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(nn,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,nn();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{C(12),qn()}),(Qn=l("#ag-btn-rave"))==null||Qn.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(er=l("#ag-btn-rave"))==null||er.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(tr=l("#ag-btn-baerlauch"))==null||tr.addEventListener("click",qt),(ar=l("#ag-baerlauch-close"))==null||ar.addEventListener("click",ko),(nr=l("#ag-baerlauch-next"))==null||nr.addEventListener("click",qt),(rr=l("#ag-btn-baerlauch"))==null||rr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),qt())}),(ir=l("#ag-btn-gesprach"))==null||ir.addEventListener("click",Za),(or=l("#ag-btn-glossary"))==null||or.addEventListener("click",mn),(sr=l("#ag-btn-glossary"))==null||sr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),mn())}),(lr=l("#ag-glossary-close"))==null||lr.addEventListener("click",Mo),(dr=document.getElementById("ag-glossary-refresh"))==null||dr.addEventListener("click",async()=>{const p=document.getElementById("ag-glossary-refresh");p&&(p.disabled=!0,p.textContent="⏳"),C(6);const w=await pn();de(M.lang),p&&(p.textContent=w>0?`↻${w}`:"↻",setTimeout(()=>{p.textContent="↻",p.disabled=!1},3e3)),w>0&&ge(`${w} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(p=>{p.addEventListener("click",()=>{const w=document.getElementById("ag-glossary-search");w&&(w.value=""),de(p.dataset.lang),C(4)})}),(cr=document.getElementById("ag-glossary-search"))==null||cr.addEventListener("input",()=>{de(M.lang)});const i=document.getElementById("ag-glossary-add"),r=document.getElementById("ag-glossary-form");i&&i.addEventListener("click",()=>{var A,$;if(!r)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const p=document.getElementById("ag-glossary-form-title");p&&(p.textContent="Neues Wort");const w=document.getElementById("ag-glossary-save-label");w&&(w.textContent="Eintragen");const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent=""),M.audioBlob=null;const S=document.getElementById("ag-glossary-play-preview");S&&(S.hidden=!0),r.hidden=!1,i.hidden=!0,(A=l("[data-ag-sheet-backdrop]"))==null||A.classList.add("is-open"),($=document.getElementById("ag-glossary-word-input"))==null||$.focus(),C(8)}),(gr=document.getElementById("ag-glossary-form-cancel"))==null||gr.addEventListener("click",()=>{var p;if(r&&(r.hidden=!0),i&&(i.hidden=!1),(p=l("[data-ag-sheet-backdrop]"))==null||p.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",M.audioBlob=null,M.recorder&&M.recorder.state!=="inactive")try{M.recorder.stop()}catch{}M.recorder=null,C(6)}),(pr=document.getElementById("ag-glossary-form-save"))==null||pr.addEventListener("click",async()=>{var $,N,F,ie;const p=((($=document.getElementById("ag-glossary-word-input"))==null?void 0:$.value)||"").trim(),w=(((N=document.getElementById("ag-glossary-meaning-input"))==null?void 0:N.value)||"").trim(),k=(((F=document.getElementById("ag-glossary-edit-id"))==null?void 0:F.value)||"").trim();if(!p){(ie=document.getElementById("ag-glossary-word-input"))==null||ie.focus();return}const S=document.getElementById("ag-glossary-audio-status");let A=null;if(M.audioBlob){S&&(S.textContent="Wird hochgeladen…");const W=k||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;A=await Lo(M.audioBlob,W)}if(C([20,20,40]),k){const W={word:p,meaning:w||null};A!==null&&(W.audioUrl=A),To(k,W)}else So({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:M.lang,word:p,meaning:w||null,audioUrl:A,token:I()});r&&(r.hidden=!0),i&&(i.hidden=!1),document.getElementById("ag-glossary-edit-id").value="",M.audioBlob=null,M.recorder=null,de(M.lang),ge("Wort gespeichert ✓")});const o=document.getElementById("ag-glossary-record");o&&o.addEventListener("click",async()=>{if(M.recorder&&M.recorder.state==="recording"){M.recorder.stop();return}try{const p=await navigator.mediaDevices.getUserMedia({audio:!0}),w=[];M.recorder=new MediaRecorder(p),M.recorder.ondataavailable=S=>{S.data.size>0&&w.push(S.data)},M.recorder.onstop=()=>{p.getTracks().forEach($=>$.stop()),M.audioBlob=new Blob(w,{type:M.recorder.mimeType||"audio/webm"});const S=document.getElementById("ag-glossary-audio-status");S&&(S.textContent="✓ Aufnahme bereit");const A=document.getElementById("ag-glossary-play-preview");A&&(A.hidden=!1),o.textContent="🎙 Neu aufnehmen"},M.recorder.start(),o.textContent="⏹ Stop";const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent="● REC"),C(10)}catch{const w=document.getElementById("ag-glossary-audio-status");w&&(w.textContent="Mikrofon nicht verfügbar")}}),(ur=document.getElementById("ag-glossary-play-preview"))==null||ur.addEventListener("click",()=>{if(!M.audioBlob)return;const p=URL.createObjectURL(M.audioBlob),w=new Audio(p);w.onended=()=>URL.revokeObjectURL(p),w.play().catch(()=>{})}),(mr=l("#ag-btn-mission"))==null||mr.addEventListener("click",Ja),(fr=l("#ag-btn-mission"))==null||fr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Ja())}),(hr=l("#ag-mission-close"))==null||hr.addEventListener("click",Zi),(br=l("#ag-mission-done"))==null||br.addEventListener("click",()=>{Gi();const p=l("#ag-mission-actions"),w=l("#ag-mission-feedback"),k=l("#ag-mission-done-note"),S=l("#ag-btn-mission");p&&(p.hidden=!0),k&&(k.hidden=!1),w&&!Va()&&(w.hidden=!1),S&&S.classList.remove("ag-chip-mission-active")}),(yr=l("#ag-mission-panel"))==null||yr.querySelectorAll(".ag-mission-rate-btn").forEach(p=>{p.addEventListener("click",()=>{var w;(w=l("#ag-mission-panel"))==null||w.querySelectorAll(".ag-mission-rate-btn").forEach(k=>k.classList.remove("is-selected")),p.classList.add("is-selected")})}),(vr=l("#ag-mission-feedback-send"))==null||vr.addEventListener("click",()=>{var $;const p=l("#ag-mission-panel"),w=p==null?void 0:p.querySelector(".ag-mission-rate-btn.is-selected"),k=(w==null?void 0:w.dataset.rating)||null,S=((($=l("#ag-mission-comment"))==null?void 0:$.value)||"").trim();Ki(k,S);const A=l("#ag-mission-feedback-sent");p==null||p.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(N=>{N.hidden=!0}),A&&(A.hidden=!1)}),(xr=l("#ag-letter-close"))==null||xr.addEventListener("click",Nt),(wr=l("#ag-letter-overlay"))==null||wr.addEventListener("click",p=>{p.target===p.currentTarget&&Nt()}),(kr=l("#ag-lightbox-close"))==null||kr.addEventListener("click",()=>{ra()}),(Er=l("#ag-lightbox"))==null||Er.addEventListener("click",p=>{p.target===p.currentTarget&&ra()}),document.addEventListener("keydown",p=>{p.key==="Escape"&&(Nt(),ra())}),(Sr=l("#ag-gesprach-close"))==null||Sr.addEventListener("click",Xi),(Tr=l("#ag-gesprach-next"))==null||Tr.addEventListener("click",Xa),(Cr=l("#ag-gesprach-wa"))==null||Cr.addEventListener("click",Qi),(Lr=l("#ag-btn-gesprach"))==null||Lr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Za())}),(Ar=l("#ag-btn-quest"))==null||Ar.addEventListener("click",en),(zr=l("#ag-quest-close"))==null||zr.addEventListener("click",eo),(Mr=l("#ag-btn-quest"))==null||Mr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),en())}),(Ir=l("#ag-quest-file"))==null||Ir.addEventListener("change",p=>{const w=p.target.files&&p.target.files[0];w&&to(w)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!g.todaysPull)return;C(8);const p=Rn(g.todaysPull);try{await navigator.clipboard.writeText(p),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",p)}}),l("[data-ag-save-img]").addEventListener("click",()=>{g.todaysPull&&(C(8),Pn(g.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{C(8),ds(g.todaysPull)}),($r=l("[data-ag-freikarte-redeem]"))==null||$r.addEventListener("click",()=>{const p=g.todaysPull;if(!p)return;const w=p.category.tone;if(w!=="quiet"&&w!=="cursed"||!bi(p.token))return;const k=X(),S=Hi(p.day,k);vi(p.token,p.day,{categoryId:S.category.id,outcomeTitle:S.outcome.title}),g.todaysPull={...p,category:S.category,outcome:S.outcome,photo:S.photo,collectToken:S.collectToken,voucher:S.voucher,freikarte:S.freikarte,unlockTime:null,promptAnswer:null};const A=_(),$=A.findIndex(N=>N.day===p.day&&N.token===p.token);$!==-1&&(A[$]={...A[$],categoryId:S.category.id,categoryLabel:S.category.label,tone:S.category.tone,title:S.outcome.title,message:S.outcome.message,link:S.outcome.link||null,unlockTime:null,promptAnswer:null,photo:S.photo?{url:S.photo.url,alt:S.photo.alt||"",caption:(S.photo.caption||"").trim(),type:S.photo.type==="video"?"video":"image"}:null,voucher:S.voucher||!1},le(A)),ae(),g.todaysPull.collectToken&&Ca(g.todaysPull.collectToken),g.todaysPull.freikarte&&Aa(g.todaysPull.token),ia(g.todaysPull),g.activeTab==="history"&&Y(),Q(50),ge("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),C([20,20,40])});const s=l("[data-ag-streak-restore]");s&&s.addEventListener("click",()=>{if(!Pa()){aa();return}const p=Mt(),w=zt(),S=Ve()>0&&w-Ve()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${w-1} Streak-Retter übrig.`;if(!window.confirm(S))return;s.disabled=!0;const $=zi();Y(),ta(),$&&(Q(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),C([30,20,30,20,60])),aa(),s.disabled=!1});const d=l("[data-ag-sync-btn]");d&&d.addEventListener("click",async()=>{d.textContent="⏳",d.disabled=!0;const p=await Ze();Y(),d.textContent=p<0?"✗":`✓${p}`,setTimeout(()=>{d.textContent="☁",d.disabled=!1},3e3)}),L.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(p=>{p.addEventListener("click",()=>{C(5),Wo(p.dataset.agFilter)})}),L.querySelectorAll("[data-ag-tab]").forEach(p=>{p.addEventListener("click",()=>{C(6),Me(p.dataset.agTab)})});const c=L.querySelector(".ag-bottomnav");if(c){const p=c.querySelector(".ag-nav-pill"),w=[...c.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let k=null;c.addEventListener("pointerdown",A=>{const $=c.getBoundingClientRect(),N=parseFloat(p==null?void 0:p.style.width)||54;k={id:A.pointerId,startX:A.clientX-$.left,pillStartCentre:(parseFloat(p==null?void 0:p.style.left)||0)+N/2,pillWidth:N,moved:!1,suppress:!1,captured:!1}}),c.addEventListener("pointermove",A=>{if(!k||A.pointerId!==k.id)return;const $=c.getBoundingClientRect(),N=A.clientX-$.left-k.startX;if(!k.moved&&Math.abs(N)<6||(k.captured||(c.setPointerCapture(A.pointerId),k.captured=!0),k.moved=!0,k.suppress=!0,!p))return;p.style.transition="none";const F=c.getBoundingClientRect(),ie=k.pillStartCentre+N,W=k.pillWidth/2;let R=ie-W;R<0?R=R*.25:R+k.pillWidth>F.width&&(R=F.width-k.pillWidth+(R+k.pillWidth-F.width)*.25),p.style.left=`${R}px`});const S=A=>{if(!k||A.pointerId!==k.id)return;const $=k.moved,N=k.suppress;if(k=null,p&&(p.style.transition=""),!$)return;const F=c.getBoundingClientRect(),ie=A.clientX-F.left;let W=w[0],R=1/0;if(w.forEach(ue=>{const oe=ue.getBoundingClientRect(),ft=oe.left-F.left+oe.width/2,qe=Math.abs(ie-ft);qe<R&&(R=qe,W=ue)}),C(6),Me(W.dataset.agTab),N){const ue=oe=>{oe.stopImmediatePropagation(),oe.preventDefault()};c.addEventListener("click",ue,{capture:!0,once:!0})}};c.addEventListener("pointerup",S),c.addEventListener("pointercancel",A=>{!k||A.pointerId!==k.id||(k=null,p&&(p.style.transition=""),Me(g.activeTab))})}(Dr=l("#ag-btn-stimmung"))==null||Dr.addEventListener("click",yn),(Nr=l("#ag-btn-stimmung"))==null||Nr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),yn())}),(Br=l("#ag-stimmung-close"))==null||Br.addEventListener("click",No),Bo(),(Pr=l("#ag-lights-open"))==null||Pr.addEventListener("click",Oo),Ro();const u=l("[data-ag-berge-add]"),m=l("[data-ag-berge-form]"),f=l("[data-ag-berge-cancel]"),b=l("[data-ag-berge-save]");u&&u.addEventListener("click",()=>{var w,k;C(8);const p=l("[data-ag-berge-date]");p&&!p.value&&(p.value=D(((w=g.theme)==null?void 0:w.timezone)||"Europe/Zurich")),m.hidden=!1,u.hidden=!0,(k=l("[data-ag-sheet-backdrop]"))==null||k.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),f&&f.addEventListener("click",()=>{var A;C(6),m.hidden=!0,u.hidden=!1,(A=l("[data-ag-sheet-backdrop]"))==null||A.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach($=>{const N=l($);N&&(N.value="")});const p=l("[data-ag-loc-search]");p&&(p.value="");const w=l("[data-ag-loc-dropdown]");w&&(w.hidden=!0,w.innerHTML="");const k=l("[data-ag-berge-form-title]");k&&(k.textContent="Neuer Gipfeleintrag");const S=l("[data-ag-berge-save] span:last-child");S&&(S.textContent="Eintragen")}),b&&b.addEventListener("click",()=>{var _r,Ur,jr,Or,Fr,Rr,Hr,Gr,Wr,Kr,Yr,Vr,Jr,Zr;const p=(((_r=l("[data-ag-berge-name]"))==null?void 0:_r.value)||"").trim(),w=parseFloat(((Ur=l("[data-ag-berge-dist]"))==null?void 0:Ur.value)||""),k=parseInt(((jr=l("[data-ag-berge-gain]"))==null?void 0:jr.value)||"",10),S=((Or=l("[data-ag-berge-date]"))==null?void 0:Or.value)||D(((Fr=g.theme)==null?void 0:Fr.timezone)||"Europe/Zurich"),A=(((Rr=l("[data-ag-berge-url]"))==null?void 0:Rr.value)||"").trim(),$=(((Hr=l("[data-ag-berge-cover]"))==null?void 0:Hr.value)||"").trim(),N=(((Gr=l("[data-ag-berge-notes]"))==null?void 0:Gr.value)||"").trim(),F=(((Wr=l("[data-ag-berge-edit-id]"))==null?void 0:Wr.value)||"").trim(),ie=(((Kr=l("[data-ag-berge-lat]"))==null?void 0:Kr.value)||"").trim()||null,W=(((Yr=l("[data-ag-berge-lng]"))==null?void 0:Yr.value)||"").trim()||null,R=(((Vr=l("[data-ag-berge-loc-label]"))==null?void 0:Vr.value)||"").trim()||null;if(!p){(Jr=l("[data-ag-berge-name]"))==null||Jr.focus();return}C([20,20,40]);const ue={name:p,elevation:null,distance:isNaN(w)?null:w,elevGain:isNaN(k)?null:k,date:S,activityUrl:A||null,cover:$||null,notes:N||null,lat:ie,lng:W,locLabel:R};F?fo(F,ue):uo({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...ue,token:I()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Cs=>{const Xr=l(Cs);Xr&&(Xr.value="")});const oe=l("[data-ag-loc-search]");oe&&(oe.value="");const ft=l("[data-ag-berge-form-title]");ft&&(ft.textContent="Neuer Gipfeleintrag");const qe=l("[data-ag-berge-save] span:last-child");qe&&(qe.textContent="Eintragen"),m.hidden=!0,u.hidden=!1,(Zr=l("[data-ag-sheet-backdrop]"))==null||Zr.classList.remove("is-open"),Le(),ge("Gipfel gespeichert ✓")}),yo();const y=l("[data-ag-ping-card]");y&&(y.hidden=!(I()==="fionn"&&((qr=g.backup)!=null&&qr.enabled)));const v=l("[data-ag-ping-dismiss]");v&&v.addEventListener("click",()=>{const p=l("[data-ag-ping-banner]");p&&(p.hidden=!0)});const h=l("[data-ag-ping-send]");h&&h.addEventListener("click",()=>{C([20,30,20]);try{An()}catch{}});const x=l("[data-ag-hug-send]");x&&x.addEventListener("click",()=>{C([20,30,20]);try{zn()}catch{}});const z=l("[data-ag-wish-open]"),T=l("[data-ag-wish-cancel]"),E=l("[data-ag-wish-submit]");z&&z.addEventListener("click",()=>{C(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const p=l("[data-ag-wish-input]");p&&window.setTimeout(()=>p.focus(),60)}),T&&T.addEventListener("click",()=>{C(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),E&&E.addEventListener("click",()=>{const p=l("[data-ag-wish-input]"),w=((p==null?void 0:p.value)||"").trim();if(!w)return;C([20,20,40]);const k={week:wt(),text:w,submittedAt:Date.now(),remoteStatus:"idle"};za(k),la();try{Jt(k)}catch{}});const P=l("[data-ag-notif-enable]"),q=l("[data-ag-notif-dismiss]");P&&P.addEventListener("click",()=>{C(10),Bn()}),q&&q.addEventListener("click",()=>{C(6);try{window.localStorage.setItem(me,"dismissed")}catch{}const p=l("[data-ag-notif-card]");p&&(p.hidden=!0)});const V=l("[data-ag-sheet-backdrop]");V&&V.addEventListener("click",()=>{C(6);const p=l("[data-ag-berge-form]"),w=l("[data-ag-berge-add]");p&&!p.hidden&&(p.hidden=!0,w&&(w.hidden=!1));const k=document.getElementById("ag-glossary-form"),S=document.getElementById("ag-glossary-add");k&&!k.hidden&&(k.hidden=!0,S&&(S.hidden=!1)),V.classList.remove("is-open")});const De=l("[data-ag-fab]");De&&De.addEventListener("click",()=>{C(8);const p=l("[data-ag-berge-add]");p&&!p.hidden&&p.click()});const ke=["today","history","lieblinge","berge"];let Ne=0,Be=0;const Pe=l(".ag-content")||L;Pe.addEventListener("touchstart",p=>{Ne=p.touches[0].clientX,Be=p.touches[0].clientY},{passive:!0}),Pe.addEventListener("touchend",p=>{const w=p.changedTouches[0].clientX-Ne,k=Math.abs(p.changedTouches[0].clientY-Be);if(Math.abs(w)>52&&k<44){const S=ke.indexOf(g.activeTab),A=w<0?Math.min(S+1,ke.length-1):Math.max(S-1,0);A!==S&&(C(6),Me(ke[A]))}},{passive:!0});const re=l("[data-ag-ptr]");let pe=0,mt=!1;document.addEventListener("touchstart",p=>{window.scrollY===0&&(pe=p.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",p=>{if(!pe)return;p.touches[0].clientY-pe>64&&!mt&&re&&(mt=!0,re.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{mt&&re&&(re.classList.add("is-loading"),await Ze(),g.activeTab==="berge"&&Le(),g.activeTab==="history"&&Y(),re.classList.remove("is-visible","is-loading"),ge("Aktualisiert ✓")),pe=0,mt=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const p=document.querySelector(".ag-widget");p==null||p.classList.toggle("ag-paused",document.hidden)})}const Go=Object.freeze(Object.defineProperty({__proto__:null,DAILY_REMINDER_POOL:Yt,STREAK_WARN_POOL:Vt,bindEvents:_n,downloadResultAsImage:Pn,drawRoundRect:Zt,enableNotifications:Bn,escapeHtml:B,notifyPartnerVoucherRedeemed:Mn,registerServiceWorker:ct,renderError:Qt,retryPendingWishSend:In,reveal:qn,scheduleNotification:Dn,scheduleStreakWarning:dt,sendHugToInbox:zn,sendPingToBackend:An,sendWishToInbox:Jt,setActiveTab:Me,setHugStatus:ve,showNotifPrompt:$n,showToast:ge,tryPeriodicSync:Nn,wrapText:Xt},Symbol.toStringTag,{value:"Module"}));let ne=null,K="all";function Wo(e){K=e==="vouchers"||e==="open"?e:"all",sa=oa,Y()}function ea(e){return e?B(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ie(){return I().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||g.theme.brand.displayNameDefault||"Lennart"}function Ko(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function Yo(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:g.theme.timezone}).format(e)}catch{return D(g.theme.timezone)}}const Vo=["🚴","🧄"],Jo=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Un(){const e=D(g.theme.timezone),t=I();return`${g.theme.secret}|${t}|${e}|emoji`}function Zo(){const e=Un(),t=3+Math.floor(Z(`${e}|count`)*3),a=Jo.slice(),n=[];for(let i=0;i<t&&a.length;i+=1){const r=Math.floor(Z(`${e}|pick|${i}`)*a.length);n.push(a.splice(r,1)[0])}return[...Vo,...n]}function Xo(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Zo(),a=t.length,n=Un();t.forEach((i,r)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=i;const s=360/a*r,d=(Z(`${n}|angle|${r}`)-.5)*28,c=s+d,u=Z(`${n}|radius|${r}`)*21-10.5,m=16+Z(`${n}|dur|${r}`)*10,f=-Z(`${n}|delay|${r}`)*m,b=Z(`${n}|dir|${r}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${c}deg`),o.style.setProperty("--ag-emoji-radius",`${250+u}%`),o.style.setProperty("--ag-emoji-duration",`${m.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${f.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",b===1?"normal":"reverse"),e.appendChild(o)})}function ta(){const e=l("[data-ag-streak]"),t=X(),a=Se();if(t>(a.maxStreak||0)&&Ma({...a,maxStreak:t}),e){const n=Da(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}aa()}function aa(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!Pa())}const jn={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Qo(e){const t=l("[data-ag-milestone]");if(!t)return;const a=jn[e];if(!a){t.hidden=!0;return}const n=I();if(Ci(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Li(n,e)}function es(e,t){const a=document.createElement("div");a.className="ag-prompt-gate";const n=document.createElement("p");n.className="ag-prompt-question",n.textContent="💭 "+e;const i=document.createElement("textarea");i.className="ag-prompt-textarea",i.placeholder="Schreib hier deine Antwort...",i.rows=4;const r=document.createElement("p");r.className="ag-pin-err",r.hidden=!0,r.textContent="Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const d=i.value.trim();if(!d){r.hidden=!1,i.classList.add("ag-pin-shake"),setTimeout(()=>i.classList.remove("ag-pin-shake"),450);return}t(d)}return o.addEventListener("click",s),i.addEventListener("keydown",d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&s()}),a.appendChild(n),a.appendChild(i),a.appendChild(r),a.appendChild(o),a}function ts(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:e.outcome.prompt,answer:t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>{fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{})})}catch{}}function as(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("p");i.className="ag-pin-hint",i.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const r=document.createElement("div");r.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(d.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",u=>{u.key==="Enter"&&c()}),r.appendChild(o),r.appendChild(s),n.appendChild(i),n.appendChild(r),n.appendChild(d),n}function ns(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("span");i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const r=document.createElement("p");r.className="ag-pin-hint",r.style.marginTop="10px",r.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),gt(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",u),s.addEventListener("keydown",m=>{m.key==="Enter"&&u()}),o.appendChild(s),o.appendChild(d),n.appendChild(i),n.appendChild(r),n.appendChild(o),n.appendChild(c),n}function rs(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],i=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${i}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function On(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function gt(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=J(t);if(!a){e.hidden=!0;return}const n=rs(a);e.appendChild(n||On(a)),e.hidden=!1}function is(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Re()[a]||0,i=ni[a]||"",r=5;if(n>=r)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(r)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${i}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{if(fi(a),ae(),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',g.wishInbox&&g.wishInbox.enabled){const s=JSON.stringify({timestamp:new Date().toISOString(),token:I(),wish:`🎁 Sammelkapsel eingelöst: ${a} × ${r} — ${i}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(g.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s}).catch(()=>{})}});else{const s=r-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(r-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${i}</em></p>
      </div>`,e.hidden=!1}}function Fn(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const i=document.createElement("div");i.className="ag-media-backdrop",i.setAttribute("aria-hidden","true"),t.type!=="video"&&(i.style.backgroundImage=`url("${t.url}")`),n.appendChild(i);let r;if(t.type==="video"){const o=li(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${o}`,d.alt=a,d.loading="lazy",d.decoding="async",d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),s.appendChild(d);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",m),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const f=document.createElement("iframe");f.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,f.allow="autoplay",f.setAttribute("allowfullscreen",""),f.setAttribute("frameborder","0"),f.setAttribute("aria-label",a),f.className="ag-drive-iframe",s.appendChild(f)},m=f=>{(f.key==="Enter"||f.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",m),r=s}else r=document.createElement("video"),r.src=J(t.url),r.controls=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("playsinline",""),r.setAttribute("preload","metadata"),r.setAttribute("aria-label",a),r.className="ag-media-content"}else r=document.createElement("img"),r.alt=a,r.loading="eager",r.decoding="auto",r.className="ag-media-content",r.addEventListener("load",()=>{const o=r.naturalWidth&&r.naturalHeight?r.naturalWidth/r.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),r.addEventListener("error",()=>{H("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=na(),d=s(o),c=d.find(u=>u.alt===t.alt&&u.type!=="video")||d.find(u=>u.type!=="video")||null;if(c&&c.url)i.style.backgroundImage=`url("${c.url}")`,r.src=J(c.url),g.photos=d;else{const u=r.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const o=r.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),r.src=J(t.url);n.appendChild(r),e.appendChild(n)}function na(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const i=n.type==="video"||t.test(n.url||"");return{...n,type:i?"video":"image"}}).filter(n=>n.url)}}}function os(e,t,a,n){var d,c;const i=l("#ag-lightbox"),r=l("#ag-lightbox-img"),o=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!i||!r)){(d=i.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(c=i.querySelector(".ag-lightbox-video"))==null||c.remove(),ne&&(r.removeEventListener("error",ne),ne=null),r.onerror=null,s&&(s.hidden=!0);{r.hidden=!1;const u=J(e);if(!u)return;r.src=u,r.alt=t||"",ne=()=>{const m=n||t;H("config/photos.json",{photos:[]}).then(f=>{const{normalizePhotos:b}=na(),y=b(f),v=y.find(h=>h.alt===m)||null;v&&v.url&&(r.src=J(v.url),g.photos=y)}).catch(()=>{})},r.addEventListener("error",ne,{once:!0})}o.textContent=t||"",o.hidden=!t,i.hidden=!1,document.body.style.overflow="hidden"}}function ra(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(ne&&(t.removeEventListener("error",ne),ne=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Rn(e){return[`${Fa(e.category.tone)} ${Ie()}s ${g.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var r;const[a,n]=e.unlockTime.split(":").map(Number),i=vt(((r=g.theme)==null?void 0:r.timezone)||"UTC");return i.h>a||i.h===a&&i.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function ia(e){var y;L.dataset.tone=e.category.tone,Fi(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=e.day,l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=ea(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]"),n=l("[data-ag-freikarte-wrap]");if(n){const v=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(v&&hi(e.token)>0&&!Ee())}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const h=es(e.outcome.prompt,x=>{if(e.promptAnswer=x,h.remove(),!Ee()){ts(e,x);const z=_(),T=z.findIndex(E=>E.day===e.day&&E.token===e.token);T!==-1&&(z[T]={...z[T],promptAnswer:x},le(z),ae())}ia(e),g.activeTab==="history"&&Y()});h.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(h,t)}l("[data-ag-result]").hidden=!1;return}const i=a?a.querySelector("[data-ag-pin-gate]"):null;i&&i.remove();const r=l("[data-ag-link-wrap]");if(e.outcome.pin){const v=!!e.outcome.pinMessage;if(v||(t.hidden=!At(e.outcome.pin)),!At(e.outcome.pin)){let h=null;v&&(h=document.createElement("div"),h.className="ag-message",h.hidden=!0,h.innerHTML=ea(e.outcome.pinMessage),t.parentNode.insertBefore(h,t.nextSibling));const x=as(e.outcome.pin,()=>{x.remove(),v?h.hidden=!1:t.hidden=!1,e.outcome.link&&r&&gt(r,e.outcome.link)},e.outcome.pinHint);x.setAttribute("data-ag-pin-gate","");const z=v?h:t;z.parentNode.insertBefore(x,z)}}const o=l("[data-ag-photo-wrap]"),s=l("[data-ag-photo-media]"),d=l("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[v,h]=e.unlockTime.split(":").map(Number),x=vt(((y=g.theme)==null?void 0:y.timezone)||"UTC"),z=e.outcome.linkPin;if(z)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[E,P]=e.outcome.linkPinFrom.split(":").map(Number);return x.h>E||x.h===E&&x.m>=P})()){const E=ns(z,r,e);r.innerHTML="",r.appendChild(E),r.hidden=!1}else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(E),r.hidden=!1}else if(x.h>v||x.h===v&&x.m>=h)gt(r,e.outcome.link);else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(E),r.hidden=!1}}else e.outcome.pin&&!At(e.outcome.pin)||gt(r,e.outcome.link||null);if(is(l("[data-ag-token-wrap]"),e),e.photo){Fn(s,e.photo);const v=(e.photo.caption||"").trim();v?(d.textContent=v,d.hidden=!1):(d.textContent="",d.hidden=!0),o.hidden=!1}else s.innerHTML="",d.textContent="",d.hidden=!0,o.hidden=!0;const c=Rn(e),u=encodeURIComponent("Mein Gacha-Zug"),m=encodeURIComponent(c),f=l("[data-ag-send]");g.theme.messageTarget.startsWith("mailto:")?f.href=`${g.theme.messageTarget}?subject=${u}&body=${m}`:f.href=g.theme.messageTarget.replace("{text}",m);const b=l("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),l("[data-ag-result]").hidden=!1,Hn()}function ss(e){return e?te().some(t=>t.day===e.day&&t.token===e.token):!1}function pt(e){return te().some(t=>t.day===e.day&&t.token===e.token)}function Hn(){const e=l("[data-ag-star]");if(!e)return;const t=ss(g.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function ls(e,t){const a=te(),n=a.findIndex(r=>r.day===e.day&&r.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Fe(a),ae();const i=pt(e);t.textContent=i?"★":"☆",t.classList.toggle("is-starred",i),t.title=i?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",g.activeTab==="lieblinge"&&ut()}function ds(e){if(!e)return;const t=te(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Fe(t),ae(),Hn(),g.activeTab==="lieblinge"&&ut()}function cs(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=_(),n=new Set,i=[t,...a].filter(r=>{if(!r||typeof r.day!="string"||typeof r.token!="string")return!1;const o=`${r.day}|${r.token}`;return n.has(o)?!1:(n.add(o),!0)});i.sort((r,o)=>r.day<o.day?1:r.day>o.day?-1:0),le(i),He(0),ae()}function gs(e,t){var o;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=D(((o=g.theme)==null?void 0:o.timezone)||"UTC");e.used=!0,e.usedAt=n;const i=_(),r=i.find(s=>s.day===e.day&&s.token===e.token);r&&(r.used=!0,r.usedAt=n,le(i)),ae();try{Q(60)}catch{}try{ge("Eingelöst 💛")}catch{}try{Mn(e)}catch{}t&&(t.disabled=!0),Y(),g.activeTab==="lieblinge"&&ut()}function Gn(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,i]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=i)){const o=document.createElement("span");return o.className="ag-outcome-link-locked",o.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o}}const t=J(e.link);return t?On(t):null}function Wn(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:i}=Kn();n.textContent=i(e.day);const r=document.createElement("span");r.className="ag-history-badge",r.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");o.type="button",o.className="ag-history-star"+(pt(e)?" is-starred":""),o.textContent=pt(e)?"★":"☆",o.title=pt(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",f=>{f.stopPropagation(),ls(e,o)}),a.appendChild(n),a.appendChild(r),a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const d=document.createElement("div");d.className="ag-history-message",d.innerHTML=ea(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const f=document.createElement("p");f.className="ag-history-answer-label",f.textContent="💭 Antwort";const b=document.createElement("blockquote");b.className="ag-history-answer",b.textContent=e.promptAnswer,c.appendChild(f),c.appendChild(b)}t.appendChild(a);const u=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,m=e.photo&&(e.photo.type==="video"||u.test(e.photo.url||""));if(e.photo&&!m){const f=document.createElement("div");f.className="ag-history-body";const b=document.createElement("div");b.className="ag-history-thumb";const y=document.createElement("img");y.src=J(e.photo.url),y.alt=e.photo.alt||"Foto-Drop",y.loading="lazy",y.decoding="async",y.addEventListener("error",function(){H("config/photos.json",{photos:[]}).then(h=>{const{normalizePhotos:x}=na(),z=x(h),T=z.find(E=>E.alt===e.photo.alt&&E.type!=="video")||z.find(E=>E.type!=="video")||null;if(T&&T.url)e.photo.url=T.url,y.src=J(T.url),g.photos=z;else{b.classList.add("is-broken"),y.remove();const E=document.createElement("span");E.className="ag-history-thumb-broken",E.textContent="📷",b.appendChild(E)}}).catch(()=>{b.classList.add("is-broken"),y.remove();const h=document.createElement("span");h.className="ag-history-thumb-broken",h.textContent="📷",b.appendChild(h)})},{once:!0}),b.appendChild(y),b.style.cursor="pointer",b.title="Vollansicht",b.addEventListener("click",()=>os(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const v=document.createElement("div");if(v.className="ag-history-text",v.appendChild(s),v.appendChild(d),c&&v.appendChild(c),e.link){const h=Gn(e);h&&v.appendChild(h)}f.appendChild(b),f.appendChild(v),t.appendChild(f)}else if(t.appendChild(s),t.appendChild(d),c&&t.appendChild(c),e.link){const f=Gn(e);f&&t.appendChild(f)}if(Oe(e)){const f=document.createElement("div");if(f.className="ag-voucher-actions",e.used){const b=document.createElement("span");b.className="ag-voucher-used";const{formatHistoryDate:y}=Kn();b.textContent=`✓ Benutzt am ${e.usedAt?y(e.usedAt):"–"}`,f.appendChild(b)}else{const b=document.createElement("button");b.type="button",b.className="ag-voucher-use",b.textContent="🎟️ Benutzen",b.addEventListener("click",y=>{y.stopPropagation(),gs(e,b)}),f.appendChild(b)}t.appendChild(f)}return t}function Kn(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),i=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(i)}catch{return e}}}}function ps(e){const t=l("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const i=n.dataset.agFilter;n.classList.toggle("is-active",i===K),n.setAttribute("aria-selected",i===K?"true":"false"),i==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let xe=null;function Yn(e){var z;const t=l("[data-ag-history-calendar]");if(!t)return;if(K!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((z=g.theme)==null?void 0:z.timezone)||"UTC",n=D(a);xe||(xe=n.slice(0,7));const i=new Map(e.map(T=>[T.day,T])),[r,o]=xe.split("-").map(Number),s=new Date(Date.UTC(r,o-1,1)),d=new Date(Date.UTC(r,o,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),m=e.filter(T=>T.day.startsWith(xe)).length;t.innerHTML="";const f=document.createElement("div");f.className="ag-kalender-head";const b=document.createElement("button");b.type="button",b.className="ag-kalender-nav",b.textContent="‹",b.setAttribute("aria-label","Vorheriger Monat");const y=document.createElement("span");y.className="ag-kalender-label",y.textContent=m?`${u} · ${m} Kapseln`:u;const v=document.createElement("button");v.type="button",v.className="ag-kalender-nav",v.textContent="›",v.setAttribute("aria-label","Nächster Monat");const h=T=>{const E=new Date(Date.UTC(r,o-1+T,1));xe=`${E.getUTCFullYear()}-${String(E.getUTCMonth()+1).padStart(2,"0")}`,Yn(e)};b.addEventListener("click",()=>h(-1)),v.addEventListener("click",()=>h(1)),f.appendChild(b),f.appendChild(y),f.appendChild(v),t.appendChild(f);const x=document.createElement("div");x.className="ag-kalender-grid";for(const T of["M","D","M","D","F","S","S"]){const E=document.createElement("span");E.className="ag-kalender-wd",E.textContent=T,x.appendChild(E)}for(let T=0;T<c;T++)x.appendChild(document.createElement("span"));for(let T=1;T<=d;T++){const E=`${xe}-${String(T).padStart(2,"0")}`,P=i.get(E),q=document.createElement("span");q.className="ag-kalender-day",q.textContent=T,P&&(q.classList.add("has-pull"),q.dataset.tone=P.tone||"soft",q.title=`${P.title||"Kapsel"} (${P.categoryLabel||""})`),E===n&&q.classList.add("is-today"),E>n&&q.classList.add("is-future"),x.appendChild(q)}t.appendChild(x)}const oa=60;let sa=oa;function Y(){var u;const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=I(),i=D(((u=g.theme)==null?void 0:u.timezone)||"UTC"),r=_().filter(m=>m.token===n&&m.day<=i).slice().sort((m,f)=>m.day<f.day?1:m.day>f.day?-1:0);Yn(r);const o=r.filter(m=>Oe(m)&&!m.used).length;ps(o);const s=r.filter(m=>K==="vouchers"?Oe(m):K==="open"?Oe(m)&&!m.used:!0);K==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":K==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const d=l("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=K==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":K==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",d&&(d.hidden=!0);return}t.hidden=!0;const c=s.slice(0,sa);for(const m of c)e.appendChild(Wn(m));if(d){const m=s.length-c.length;d.hidden=m<=0,m>0&&(d.textContent=`Mehr anzeigen (${m} weitere)`,d.onclick=()=>{sa+=oa,Y()})}}function ut(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=te();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const i of n)e.appendChild(Wn(i))}function us(){const e=l("[data-ag-odds]");e.innerHTML="";const t=X(),a=Na(t),n=a.reduce((i,r)=>i+r.weight,0);for(const i of a){const r=document.createElement("li");r.textContent=`${i.label}: ${(i.weight/n*100).toFixed(1)} %`,e.appendChild(r)}if(t>=5){const i=Da(t),r=document.createElement("li");r.textContent=`${i.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,r.style.fontWeight="800",e.appendChild(r)}}function ms(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function la(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=St();n&&n.week===wt()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=ms(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function fs(){var y;const e=j()==="fionn",t=e?g.theme.brand.fromName:Ie(),a=e?Ie():g.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=g.theme.brand.titleTemplate.replace("{name}",t));const i=l("[data-ag-kicker]");i&&(i.textContent=`${g.theme.brand.kicker} · ${g.photos.length} Erinnerungen`);const r=l("[data-ag-intro]");r&&(r.textContent=g.theme.brand.intro);const o=l("[data-ag-button-text]");o&&(o.textContent=g.theme.brand.buttonIdle);const s=l("[data-ag-rules-title]");s&&(s.textContent=g.theme.brand.rulesTitle);const d=l("[data-ag-rules-text]");d&&(d.textContent=g.theme.brand.rulesText);const c=l("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const u=l("[data-ag-today-pill]");u&&(u.textContent=Yo());const m=l("[data-ag-draw-hint]");m&&(m.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const f=l("[data-ag-chips]");f&&(f.innerHTML="");const b=Array.isArray(g.theme.stickers)&&g.theme.stickers.length?g.theme.stickers:Ko();for(const v of f?b:[]){const h=document.createElement("li");if(h.textContent=v,(v.toLowerCase().includes("bärlauch")||v.toLowerCase().includes("barlauch"))&&(h.id="ag-btn-baerlauch",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Bärlauch öffnen"),h.classList.add("ag-chip-clickable")),(v.toLowerCase().includes("gespräch")||v.toLowerCase().includes("gesprach"))&&(h.id="ag-btn-gesprach",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Gespräch öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase().includes("rave")&&(h.id="ag-btn-rave",h.tabIndex=0,h.setAttribute("role","link"),h.setAttribute("aria-label","Rave Board öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="quest"&&(h.id="ag-btn-quest",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Quest öffnen"),h.classList.add("ag-chip-clickable"),(y=g.quest)!=null&&y.enabled&&Qa()&&(Te().solved||h.classList.add("ag-chip-quest-active"))),v.toLowerCase().includes("glossar")&&(h.id="ag-btn-glossary",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Glossar öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="mission"&&(h.id="ag-btn-mission",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Mission öffnen"),h.classList.add("ag-chip-clickable"),Ya()||h.classList.add("ag-chip-mission-active")),v.toLowerCase().includes("stimmung")){h.id="ag-btn-stimmung",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Farbe des Tages wählen"),h.classList.add("ag-chip-clickable");const x=rt();x&&(h.classList.add("ag-chip-stimmung-set"),h.style.setProperty("--chip-dot-color",x))}f.appendChild(h)}Xo(),ta()}const Vn="affektions-gacha:install-dismissed:v1";let $e=null;function hs(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function bs(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Jn(){try{return window.localStorage.getItem(Vn)==="1"}catch{return!1}}function Zn(){try{window.localStorage.setItem(Vn,"1")}catch{}const e=l("[data-ag-install-nudge]");e&&(e.hidden=!0)}function Xn(e){if(Jn())return;const t=l("[data-ag-install-nudge]");if(!t)return;const a=l("[data-ag-install-copy]"),n=l("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{$e&&($e.prompt(),await $e.userChoice,$e=null,Zn())}),t.hidden=!1}function ys(){var e;hs()||Jn()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),$e=t,Xn(!0)}),bs()&&Xn(!1),(e=l("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Zn))}const vs={photos:[]};function xs(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=Ua();return a.map(i=>{const r=new URL(i.url,n).toString(),o=i.type==="video"||t.test(r);return{...i,type:o?"video":"image",url:r}}).filter(i=>i.url)}async function ws(){Ii(),Pi(),ji();try{const[e,t,a,n,i,r,o,s]=await Promise.all([H("config/theme.json"),H("config/outcomes.json"),H("config/photos.json",vs),H("config/special-days.json",{days:[]}),H("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),H("config/backup.json",{enabled:!1,endpointUrl:""}),H("config/quest.json",{enabled:!1}),H("config/missions.json",{pairs:[]})]);g.theme=e,g.outcomes=t,g.photos=xs(a),g.specialDays=n,g.wishInbox=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},g.backup=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},g.quest=o&&typeof o=="object"?o:{enabled:!1},g.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},$i(e),Di(Ee()||D(e.timezone)),Do(),fs(),us(),la(),_n(),ys(),requestAnimationFrame(()=>{const c=L.querySelector(".ag-nav-pill"),u=L.querySelector(".ag-bottomnav-btn.is-active");if(c&&u){const m=u.closest(".ag-bottomnav"),f=m?m.getBoundingClientRect():null,b=u.getBoundingClientRect();f&&b.width&&(c.style.transition="none",c.style.left=`${b.left-f.left}px`,c.style.width=`${b.width}px`,requestAnimationFrame(()=>{c.style.transition=""}))}});try{In()}catch{}try{const c=L.querySelector(".ag-stage");c&&"IntersectionObserver"in window&&new IntersectionObserver(([m])=>{c.classList.toggle("ag-stage-idle",!m.isIntersecting)},{threshold:.05}).observe(c)}catch{}ct(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&dt()}),L.classList.add("is-ready"),L.style.transition="opacity .18s ease",L.style.opacity="1";const d=D(e.timezone);_().some(c=>c.token===I()&&c.day===d)&&L.classList.add("has-drawn"),Ze().catch(()=>{})}catch(e){Qt(e)}}const we=document.currentScript,ks=(we==null?void 0:we.dataset.mount)||"#affektions-gacha",Es=(we==null?void 0:we.dataset.configBase)||"";function Ss(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Ts=document.querySelector(ks)||Ss();Qr(Ts),Mi(Es,null),ws().catch(e=>Qt(e))})();

(function(){"use strict";const g={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,push:null,skincare:null,werkstatt:[],todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let I=null;function wo(e){I=e}function d(e){return I.querySelector(e)}const xa="affektions-gacha:history:v1",wa="affektions-gacha:favourites:v1",ka="affektions-gacha:tokens:v1",Sa="affektions-gacha:tokens-sent:v1",Ea="affektions-gacha:streak-cache:v1",Ta="affektions-gacha:streak-synced:v1",Ca="affektions-gacha:streak-restore:v1",La="affektions-gacha:wish:v1",Aa="affektions-gacha:milestones:v1",ve="affektions-gacha:notif:v2",Ia="affektions-gacha:baerlauch-scores:v1",ko="affektions-gacha:baerlauch-history:v1",za="affektions-gacha:mission-log:v1",$a="affektions-gacha:gesprach-idx:v1",So="affektions-gacha:sound:v1",Ma="affektions-gacha:gipfelbuch:v1",Ba="affektions-gacha:quest:v1",Tt="affektions-gacha:quest-points:v1",Eo=5,To=20,Da=[100,75,50,25],Na="affektions-gacha:glossary:v1",Ct="affektions-gacha:stimmung:v1",Pa="affektions-gacha:freikarte:v1",Lt="affektions-gacha:freikarte-reroll:v1",qa="affektions-gacha:werkstatt:v1",At={"🌿":{goal:5,reward:"Fionn kocht dir ein Abendessen nach Wahl"},"🔥":{goal:5,reward:"Wochenend-Abenteuer — Ziel nach deiner Wahl"},"⭐":{goal:5,reward:"Fionns Überraschung — er entscheidet"},"☁️":{goal:4,reward:"Ein ganzer fauler Tag ohne Pläne"},"🏔":{goal:5,reward:"Eine richtige Bergtour, Hütte inklusive"},"☕":{goal:4,reward:"Ein Ausflug in dein Traumcafé, egal wo"},"💚":{goal:3,reward:"Ein langer, handgeschriebener Brief"},"🎬":{goal:3,reward:"Filmabend — du wählst, ich mache Popcorn"},"🍕":{goal:3,reward:"Essen kommt ins Haus, du bestimmst was"},"🎧":{goal:5,reward:"Konzert oder DJ-Abend, Tickets gehen auf mich"},"🛁":{goal:4,reward:"Ein Wellness-Abend, komplett vorbereitet"},"✈️":{goal:7,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}};function It(e){const t=At[e];return t&&t.goal||Eo}function zt(e){const t=At[e];return t&&t.reward||""}function N(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=r=>a.find(o=>o.type===r).value;return`${n("year")}-${n("month")}-${n("day")}`}function $t(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function Co(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Mt(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function Lo(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function ae(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Ao(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Io(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ne(e){return Io(Ao(e))()}function Ge(e,t){return t?Math.floor(ne(e)*t):0}function zo(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function $o(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function B(){return R()==="fionn"?"fionn":"lennart"}function R(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function se(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function Mo(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Bt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Ke(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=N(t),[n,r,o]=a.split("-").map(Number),i=Math.floor(new Date(Date.UTC(n,r-1,o)).getTime()/864e5);return Math.floor(i/(((l=e.quest)==null?void 0:l.periodDays)||2))}function Ye(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Ke(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function _a(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function Bo(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const Do=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,No=/nicht\s+einlös|kein\s+gutschein/i,Po=new Set(["photo","collect","niete"]);function Je(e){if(!e)return!1;if(e.voucher===!0)return!0;if(Po.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return No.test(t)?!1:Do.test(t)}function D(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function le(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[B()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[B()]:n})),n}catch{return t}}function re(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[B()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}function U(){try{if(typeof window>"u"||!window.localStorage)return g.syncedHistory||[];const e=window.localStorage.getItem(xa);if(!e)return g.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return g.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:g.syncedHistory||[]}catch{return g.syncedHistory||[]}}function de(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(xa,JSON.stringify(e))}catch{}}function qo(e,t){var r;const a=U(),n=a.find(o=>o.day===e&&o.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=N(((r=g.theme)==null?void 0:r.timezone)||"UTC"),de(a)),n):null}function ce(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(wa);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=g.theme)!=null&&e.timezone?N(g.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function Ve(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(wa,JSON.stringify(e))}catch{}}function xe(){const e=le(ka,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Dt(e){re(ka,e)}function Ua(e){const t=xe();return t[e]=(t[e]||0)+1,Dt(t),t[e]}function _o(e){const t=xe();t[e]=0,Dt(t)}function Ze(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;r>0&&(t[a]=r)}return t}function Uo(){const e=le(Sa,null);return e&&typeof e=="object"&&!Array.isArray(e)?Ze(e):null}function Qe(e){re(Sa,Ze(e))}function jo(e){const t=Ze(e),a=Ze(xe());let n=Uo();n===null&&(n=a,Qe(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),o={};for(const i of r){const s=(t[i]||0)+((a[i]||0)-(n[i]||0));s>0&&(o[i]=s)}return Dt(o),Qe(t),[...r].some(i=>(o[i]||0)!==(t[i]||0))}function Nt(){try{const e=localStorage.getItem(Pa),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ja(e){try{localStorage.setItem(Pa,JSON.stringify(e))}catch{}}function Oo(e){return Nt()[e]||0}function Oa(e){const t=Nt();return t[e]=(t[e]||0)+1,ja(t),t[e]}function Fo(e){const t=Nt();return t[e]>0?(t[e]-=1,ja(t),!0):!1}function Ho(e,t){try{const a=localStorage.getItem(Lt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function Ro(e,t,a){try{const n=localStorage.getItem(Lt),r=n?JSON.parse(n):{},o=r&&typeof r=="object"?r:{};o[`${e}|${t}`]=a,localStorage.setItem(Lt,JSON.stringify(o))}catch{}}function Pt(){if(typeof window>"u"||!window.localStorage)return null;const e=le(La,null);return e&&typeof e=="object"?e:null}function Fa(e){typeof window>"u"||!window.localStorage||re(La,e)}function Ae(){const e=le(Ca,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ha(e){re(Ca,e)}function Wo(){const e=le(Ea,0);return typeof e=="number"?e:parseInt(e,10)||0}function Xe(e){re(Ea,e)}function Go(){const e=le(Ta,0);return typeof e=="number"?e:parseInt(e,10)||0}function Ko(e){re(Ta,e)}function et(){try{const e=window.localStorage.getItem(Ma);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function tt(e){try{window.localStorage.setItem(Ma,JSON.stringify(e))}catch{}}function at(){try{const e=localStorage.getItem(za),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function qt(e){try{localStorage.setItem(za,JSON.stringify(e))}catch{}}function _t(){try{const e=localStorage.getItem(Ia),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Ra(){try{const e=localStorage.getItem(ko),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Ie(e){try{const t=le(Ba,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Ut(e){re(Ba,e)}function nt(){const e=le(Tt,0);return typeof e=="number"?e:parseInt(e,10)||0}function Yo(e){try{const t=nt()+e;return re(Tt,t),t}catch{return e}}function Jo(e){re(Tt,e)}function Wa(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Aa);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Vo(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Aa,JSON.stringify(e))}catch{}}function Zo(e,t){return Wa().includes(`${e}|${t}`)}function Qo(e,t){const a=`${e}|${t}`,n=Wa();n.includes(a)||Vo([...n,a])}function jt(e){return!1}function oe(){var p;const e=B(),t=U().filter(f=>f.token===e);if(!t.length)return 0;const a=((p=g.theme)==null?void 0:p.timezone)||"UTC",n=N(a),r=new Set(t.map(f=>f.day)),[o,i,s]=n.split("-").map(Number);let l=new Date(Date.UTC(o,i-1,s)),c=n;r.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));let u=0;for(;r.has(c);)u++,l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return Math.max(u,Wo(),Go())}function Ga(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Ka(e){if(e<5)return g.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return g.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function Xo(e,t,a=[]){const n=Ka(t),r=a.length?n.filter(c=>!a.includes(c.id)):n,o=r.length?r:n,i=o.reduce((c,u)=>c+u.weight,0),s=Math.floor(ne(e)*i);let l=0;for(const c of o)if(l+=c.weight,s<l)return g.outcomes.categories.find(u=>u.id===c.id)||c;return g.outcomes.categories[g.outcomes.categories.length-1]}function Ya(){const e=Ae();return Math.floor((e.maxStreak||0)/To)}function rt(){var n;if(Ae().birthdayBonus2026Used)return 0;const t=((n=g.theme)==null?void 0:n.timezone)||"UTC";return N(t)==="2026-05-29"?1:0}function Ot(){const e=Ae();return Math.max(0,Ya()-(e.used||0))+rt()}function Ft(){var u;const e=B(),t=((u=g.theme)==null?void 0:u.timezone)||"UTC",a=N(t),n=new Set(U().filter(p=>p.token===e&&p.day<=a).map(p=>p.day));if(!n.size)return null;const r=[...n].sort()[0],[o,i,s]=a.split("-").map(Number),l=new Date(Date.UTC(o,i-1,s));let c=a;for(n.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));n.has(c);)l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return c<r?null:c}function Ja(){return Ot()>0&&Ft()!==null}function ei(e){if(Ot()<=0)return null;const t=Ft();if(!t)return null;const a=B(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,o=[n,...U()].filter(c=>{const u=`${c.day}|${c.token}`;return r.has(u)?!1:(r.add(u),!0)}).sort((c,u)=>c.day<u.day?1:c.day>u.day?-1:0);de(o);const i=Ae(),l=Math.max(0,Ya()-(i.used||0))===0&&rt()>0;return Ha({...i,used:l?i.used||0:(i.used||0)+1,birthdayBonus2026Used:l?!0:i.birthdayBonus2026Used||!1,usedAt:Date.now()}),Xe(oe()),t}const Va=new Map;function K(e){Va.set(e,Date.now())}function ot(e,t=6e3){const a=Va.get(e);return typeof a=="number"&&Date.now()-a<t}function ze(){var e;return N(((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function Za(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:B()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function ti(e){if(!e||typeof e!="object"||ot("stimmung"))return;const t=ze();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){we()&&(en(),Ht());return}we()!==a&&(Xa(a),$e(a))}function Qa(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(o,i)=>Math.round(i+(o-i)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function $e(e){document.body.style.background=Qa(e),tn(e)}function Ht(){document.body.style.removeProperty("background"),tn(null)}function we(){try{const e=localStorage.getItem(Ct);if(!e)return null;const t=JSON.parse(e);return t.day!==ze()?null:t.hex||null}catch{return null}}function Xa(e){try{localStorage.setItem(Ct,JSON.stringify({day:ze(),hex:e}))}catch{}}function ai(e){const t=ze();Xa(e),K("stimmung"),Za(t,e)}function en(){try{localStorage.removeItem(Ct)}catch{}}function ni(){const e=ze();en(),K("stimmung"),Za(e,"")}function ri(){const e=we();e&&$e(e)}function tn(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function an(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=we()||"#4aaa5a";nn(e,t),Rt(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function oi(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=we();t?$e(t):Ht()}function ii(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function o(i){Rt(e,i),$e(i)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),o(t.value)}),a&&a.addEventListener("input",()=>{const i=rn(a.value);i&&(t&&(t.value=i),o(i))}),n&&n.addEventListener("click",()=>{const i=(t==null?void 0:t.value)||rn((a==null?void 0:a.value)||"")||"#4aaa5a";ai(i),$e(i),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{ni(),Ht(),nn(e,"#4aaa5a"),Rt(e,"#4aaa5a")})}function nn(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Rt(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=Qa(t))}function rn(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,o]=a;return`#${n}${n}${r}${r}${o}${o}`.toLowerCase()}return null}function A(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function Y(e){const t=I.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}const J="fionn";function Me(){try{return JSON.parse(window.localStorage.getItem(qa)||"[]")||[]}catch{return[]}}function it(e){try{window.localStorage.setItem(qa,JSON.stringify(e))}catch{}g.werkstatt=e}function st(e,t){return(g.werkstatt||[]).filter(a=>a&&a.categoryId===e&&(a.forToken||J)===t)}function on(e){return{id:e.id,categoryId:e.categoryId,forToken:e.forToken,title:e.title,message:e.message,prompt:e.prompt,link:e.link,voucher:e.voucher,answer:e.answer,answeredAt:e.answeredAt,createdBy:e.createdBy,createdAt:e.createdAt}}function lt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:B(),...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function si(e){const t=Me(),a=t.findIndex(r=>r.id===e.id),n={id:e.id,categoryId:e.categoryId,forToken:e.forToken||J,title:(e.title||"").trim(),message:(e.message||"").trim(),prompt:(e.prompt||"").trim()||null,link:(e.link||"").trim()||null,voucher:!!e.voucher,answer:(a===-1?null:t[a].answer)||null,answeredAt:(a===-1?null:t[a].answeredAt)||null,createdBy:B(),createdAt:(a===-1?new Date().toISOString():t[a].createdAt)||new Date().toISOString(),pendingSince:Date.now()};a===-1?t.unshift(n):t[a]=n,it(t),K("werkstatt"),lt("werkstatt-upsert",on(n))}function li(e,t){const a=Me(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r=new Date().toISOString();a[n]={...a[n],answer:t,answeredAt:r,pendingSince:Date.now()},it(a),K("werkstatt"),lt("werkstatt-answer",{id:e,answer:t,answeredAt:r})}function di(e){it(Me().filter(t=>t.id!==e)),K("werkstatt"),lt("werkstatt-delete",{id:e})}function ci(e){if(!Array.isArray(e)||ot("werkstatt"))return;const t=e.filter(l=>l&&l.id&&l.categoryId&&l.title),a=new Map(t.map(l=>[l.id,l])),n=Me().filter(l=>{if(!l.pendingSince)return!1;const c=a.get(l.id);return!c||(c.answer||null)!==(l.answer||null)});for(const l of n.slice(0,5))lt("werkstatt-upsert",on(l));const r=new Set,o=new Set,i=[],s=l=>`${l.forToken||J}|${l.categoryId}|${String(l.title).trim().toLocaleLowerCase("de-CH")}`;for(const l of n)r.add(l.id),o.add(s(l)),i.push(l);for(const l of t)r.has(l.id)||o.has(s(l))||(r.add(l.id),o.add(s(l)),i.push(l));it(i)}const q={categoryId:null,editingId:null};function Be(){return g.outcomes&&g.outcomes.categories||[]}function sn(){return J.charAt(0).toLocaleUpperCase("de-CH")+J.slice(1)}function dt(){const e=g.theme&&g.theme.features;return!e||e.werkstatt!==!1}function gi(){if(!dt())return;const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!1,q.categoryId=q.categoryId||Be()[0]&&Be()[0].id||null,ke(),De(),e.scrollIntoView({behavior:"smooth",block:"start"}),A(10))}function pi(){const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!0),ke()}function ct(){if(!dt())return;const e=document.querySelector("[data-ag-werkstatt-entry-sub]");if(!e)return;const t=(g.werkstatt||[]).filter(n=>(n.forToken||J)===J);if(!t.length){e.textContent="Noch keine — schreib die erste.";return}const a=new Set(t.map(n=>n.categoryId)).size;e.textContent=t.length===1?"1 Kapsel von dir in seiner Maschine.":`${t.length} Kapseln von dir, in ${a} ${a===1?"Kategorie":"Kategorien"}.`}function De(){ct();const e=document.getElementById("ag-werkstatt-tabs"),t=document.getElementById("ag-werkstatt-list"),a=document.getElementById("ag-werkstatt-note");if(!e||!t)return;const n=Be();!q.categoryId&&n.length&&(q.categoryId=n[0].id),e.innerHTML="";for(const l of n){const c=st(l.id,J).length,u=document.createElement("button");u.type="button",u.className="ag-werkstatt-tab"+(l.id===q.categoryId?" is-active":""),u.dataset.agWerkstattCat=l.id,u.innerHTML=`${D(l.label)}${c?` <span class="ag-werkstatt-count">${c}</span>`:""}`,u.addEventListener("click",()=>{q.categoryId=l.id,mi()?ln():ke(),De(),A(6)}),e.appendChild(u)}const r=n.find(l=>l.id===q.categoryId),o=q.categoryId?st(q.categoryId,J):[],i=sn();a&&(o.length===1?a.textContent=`${i} zieht hier nur noch deine eine Kapsel.`:o.length>1?a.textContent=`${i} zieht hier nur noch aus deinen ${o.length} Kapseln.`:a.textContent=`Noch nichts von dir — ${i} zieht hier aus den ${r?r.outcomes.length:0} Standardkapseln. Schreib eine, und sie gehört dir.`),t.innerHTML="",o.forEach((l,c)=>t.appendChild(ui(l,c)));const s=e.querySelector(".is-active");s&&e.scrollWidth>e.clientWidth&&e.scrollTo({left:Math.max(0,s.offsetLeft-(e.clientWidth-s.offsetWidth)/2),behavior:"smooth"})}function ui(e,t){const a=document.createElement("button");a.type="button",a.className="ag-werkstatt-card",a.style.setProperty("--ag-i",String(t)),a.setAttribute("aria-label",`${e.title} bearbeiten`);const n=e.pendingSince&&Date.now()-e.pendingSince>9e4,r=e.prompt&&e.answer?`<div class="ag-werkstatt-answer"><span class="ag-werkstatt-block-label">Seine Antwort</span>${D(e.answer)}</div>`:e.prompt?'<div class="ag-werkstatt-card-pending">Noch nicht beantwortet</div>':"";return a.innerHTML=`
    <div class="ag-werkstatt-card-title">${D(e.title)}</div>
    <div class="ag-werkstatt-card-msg">${D(e.message)}</div>
    ${e.prompt?`<div class="ag-werkstatt-card-prompt"><span class="ag-werkstatt-block-label">Frage</span>${D(e.prompt)}</div>`:""}
    ${r}
    <div class="ag-werkstatt-card-tags">
      ${e.voucher?'<span class="ag-werkstatt-tag is-voucher">Gutschein</span>':""}
      ${e.link?'<span class="ag-werkstatt-tag">Link</span>':""}
      ${n?'<span class="ag-werkstatt-tag is-unsent">Noch nicht übertragen</span>':""}
    </div>
  `,a.addEventListener("click",()=>dn(e)),a}function mi(){const e=document.getElementById("ag-werkstatt-form");return!!e&&!e.hidden}function ln(){const e=document.getElementById("ag-werkstatt-form-title");if(!e)return;const t=Be().find(n=>n.id===q.categoryId),a=q.editingId?"Kapsel bearbeiten":"Neue Kapsel";e.textContent=t?`${a} · ${t.label}`:a}function dn(e){var o;const t=document.getElementById("ag-werkstatt-form"),a=document.getElementById("ag-werkstatt-add");if(!t)return;q.editingId=e?e.id:null,e&&e.categoryId&&(q.categoryId=e.categoryId),document.getElementById("ag-werkstatt-title").value=e?e.title:"",document.getElementById("ag-werkstatt-message").value=e?e.message:"",document.getElementById("ag-werkstatt-prompt").value=e&&e.prompt||"",document.getElementById("ag-werkstatt-link").value=e&&e.link||"",document.getElementById("ag-werkstatt-voucher").checked=!!(e&&e.voucher),ln();const n=document.getElementById("ag-werkstatt-error");n&&(n.hidden=!0);const r=document.getElementById("ag-werkstatt-delete");r&&(r.hidden=!e,r.textContent="Kapsel löschen",r.classList.remove("is-armed")),t.hidden=!1,a&&(a.hidden=!0),t.scrollIntoView({behavior:"smooth",block:"nearest"}),(o=document.getElementById("ag-werkstatt-title"))==null||o.focus(),A(8)}function ke(){const e=document.getElementById("ag-werkstatt-form"),t=document.getElementById("ag-werkstatt-add");e&&(e.hidden=!0),t&&(t.hidden=!1);const a=document.getElementById("ag-werkstatt-delete");a&&(a.hidden=!0,a.classList.remove("is-armed")),q.editingId=null}function fi(){const e=document.getElementById("ag-werkstatt-delete");if(!(!e||!q.editingId)){if(!e.classList.contains("is-armed")){e.classList.add("is-armed"),e.textContent="Wirklich löschen?",A(12);return}di(q.editingId),ke(),De(),A([12,40,12]),Y("Kapsel gelöscht")}}function hi(){var f,h,b,x,v,w;const e=(((f=document.getElementById("ag-werkstatt-title"))==null?void 0:f.value)||"").trim(),t=(((h=document.getElementById("ag-werkstatt-message"))==null?void 0:h.value)||"").trim(),a=(((b=document.getElementById("ag-werkstatt-prompt"))==null?void 0:b.value)||"").trim(),n=(((x=document.getElementById("ag-werkstatt-link"))==null?void 0:x.value)||"").trim(),r=!!((v=document.getElementById("ag-werkstatt-voucher"))!=null&&v.checked),o=document.getElementById("ag-werkstatt-error");function i(y){o&&(o.textContent=y,o.hidden=!1),A([20,40,20])}if(!e)return i("Die Kapsel braucht einen Titel.");if(!t)return i("Schreib noch einen Satz dazu.");if(n&&!/^https?:\/\//i.test(n))return i("Der Link muss mit http:// oder https:// anfangen.");if(!q.categoryId)return i("Wähl zuerst eine Kategorie.");const s=y=>(y||"").trim().toLocaleLowerCase("de-CH"),l=s(e);if(st(q.categoryId,J).some(y=>y.id!==q.editingId&&s(y.title)===l))return i("Eine Kapsel mit diesem Titel gibt es hier schon.");if((((w=Be().find(y=>y.id===q.categoryId))==null?void 0:w.outcomes)||[]).some(y=>s(y.title)===l))return i("So heisst schon eine Standardkapsel in dieser Kategorie.");si({id:q.editingId||`k-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,categoryId:q.categoryId,forToken:J,title:e,message:t,prompt:a,link:n,voucher:r});const p=!!q.editingId;ke(),De(),A([10,30,10]),Y(p?"Kapsel geändert ✓":`Kapsel gespeichert — ${sn()} kann sie ziehen ✓`)}let Wt="",Gt=null;function bi(e,t){Wt=e,Gt=t}function Kt(){if(Gt)return Gt();if(!Wt)return window.location.href;try{return new URL(Wt,window.location.href).toString()}catch{return window.location.href}}function W(e,t=null){const a=new URL(e,Kt()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function gt(e){var t;try{const a=I&&I.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=g.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function Ne(){var e;try{const t=g.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=B(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,o=setTimeout(()=>r.abort(),12e3);let i;try{i=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(o)}if(!i.ok)return gt(!1),!1;const s=await i.json();if(!s.ok)return gt(!1),!1;const l=N(((e=g.theme)==null?void 0:e.timezone)||"UTC"),c=U(),u=c.filter(h=>h.title!=="(wiederhergestellt)"&&h.day<=l);u.length!==c.length&&de(u);const p=ce(),f=p.filter(h=>h.day<=l);if(f.length!==p.length&&Ve(f),Array.isArray(s.history)&&s.history.length){const h=U(),b=new Map(h.map(v=>[`${v.day}|${v.token}`,v]));for(const v of s.history){if(v.title==="(wiederhergestellt)")continue;const w=Bo(v.day);if(!w||w>l)continue;const y=typeof v.token=="string"?v.token.toLowerCase():v.token,S=`${w}|${y}`,C={...v,day:w,token:y},z=b.get(S);z&&z.bestanden&&!C.bestanden&&(C.bestanden=!0,C.bestandenAt=z.bestandenAt||null),b.set(S,C)}const x=Array.from(b.values()).sort((v,w)=>w.day.localeCompare(v.day));de(x),g.syncedHistory=x,Xe(oe())}if(Array.isArray(s.favourites)&&s.favourites.length){const h=ce(),b=new Map(h.map(x=>[`${x.day}|${x.token}`,x]));for(const x of s.favourites){if(x.day>l)continue;const v=typeof x.token=="string"?x.token.toLowerCase():x.token;b.set(`${x.day}|${v}`,{...x,token:v})}Ve(Array.from(b.values()).sort((x,v)=>v.day.localeCompare(x.day)))}if(s.tokens&&typeof s.tokens=="object"&&jo(s.tokens)&&X(),typeof s.questPoints=="number"&&s.questPoints>nt()&&Jo(s.questPoints),typeof s.streak=="number"&&s.streak>0&&(Ko(s.streak),s.streak>oe()&&Xe(s.streak)),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const h=_t();let b=!1;for(const[x,v]of Object.entries(s.baerlauchScores))typeof v=="number"&&v>(h[x]||0)&&(h[x]=v,b=!0);if(b)try{localStorage.setItem(Ia,JSON.stringify(h))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const h=at(),b=new Map(h.map(v=>[`${v.day}|${v.player}`,v]));for(const v of s.missionLog)!v.day||!v.player||b.set(`${v.day}|${v.player}`,v);const x=Array.from(b.values()).sort((v,w)=>w.day.localeCompare(v.day));qt(x)}if(typeof s.latestPing=="string"&&s.latestPing&&B()!=="fionn")try{const h="affektions-gacha:last-ping:v1",b=window.localStorage.getItem(h)||"";s.latestPing>b&&(window.localStorage.setItem(h,s.latestPing),g._newPing=!0)}catch{}if(s.stimmung)try{ti(s.stimmung)}catch{}if(Array.isArray(s.werkstatt))try{ci(s.werkstatt)}catch{}if(Array.isArray(s.gipfelbuch)&&!ot("gipfelbuch")){const h=s.gipfelbuch.filter(b=>b.id).sort((b,x)=>(x.date||"").localeCompare(b.date||""));tt(h)}return I&&I.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),gt(!0),Array.isArray(s.history)?s.history.length:0}catch{return gt(!1),-1}}function X(){try{const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=B(),a=U().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=ce().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=xe(),o=Ie(()=>Ke(g)),i=o.solved&&o.pointsEarned&&!o._logged?{challenge:Ye(g),attempts:o.attempts,points:o.pointsEarned,period:o.period}:void 0;i&&(o._logged=!0,Ut(o));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:oe(),tokens:r,questPoints:nt(),...i?{questLog:i}:{}}),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,l).then(()=>{Qe(r)}).catch(()=>fetch(e.endpointUrl,{...l,mode:"no-cors"}).then(()=>{Qe(r)}).catch(()=>{}))}catch{}}function cn(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5),n=B();for(const r of t){const o=r.repeat==="yearly";if((r.date===e||o&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}function gn(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function yi(e){const t=d("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Pe(){return(g.photos||[]).filter(e=>e.type!=="video")}function vi(e,t){const a=st(e.id,t);return a.length?a:e.outcomes}function pn(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,o=B(),i=`${g.theme.secret}|${o}|${e}${r?"|"+r:""}`,s=cn(e);if(s&&!r){const L=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],j=L[Ge(`${i}|special|outcome`,L.length)],te={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:L},F=s.photoAlt&&g.photos.length&&Pe().find(he=>he.alt===s.photoAlt)||null;return{day:e,token:o,category:te,outcome:j,photo:F,collectToken:j.token||null,unlockTime:s.unlockTime||null}}const l=r?null:Ho(o,e);let c;l&&(c=g.outcomes.categories.find(L=>L.id===l.categoryId)),c||(c=Xo(`${i}|category`,t||0,n));const u=Mo();if(u){const L=g.outcomes.categories.find(j=>j.id===u);L&&(c=L)}c.id==="photo"&&!Pe().length&&(c=g.outcomes.categories.find(L=>L.id==="common")||c);const p=vi(c,o),f=new Set(U().filter(L=>L.token===o&&L.day<e&&L.categoryId===c.id).map(L=>L.title)),h=L=>L.filter(j=>!f.has(j.title)),b=h(p),x=b.length?[]:h(c.outcomes),v=b.length?b:x.length?x:p,w=U().find(L=>L.token===o&&L.day===e),S=(w&&w.categoryId===c.id?p.find(L=>L.title===w.title)||c.outcomes.find(L=>L.title===w.title):null)||l&&p.find(L=>L.title===l.outcomeTitle)||v[Ge(`${i}|${c.id}|outcome`,v.length)],C=Pe();let z=null;if(c.id==="photo"&&C.length){const L=new Set(U().filter(F=>F.token===o&&F.day<e&&F.photo).map(F=>F.photo.url)),j=C.filter(F=>!L.has(F.url)),te=j.length>0?j:C;z=te[Ge(`${i}|photo`,te.length)]}return{day:e,token:o,category:c,outcome:S,photo:z,collectToken:S.token||null,voucher:S.voucher||!1,freikarte:S.freikarte===!0}}function xi(){const e=se()||N(g.theme.timezone),t=oe();return pn(e,t)}function wi(e,t){return pn(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function ki(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Si(e){const t=(r,o)=>I.style.setProperty(r,o),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const un={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},mn={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Ei(e){const t=cn(e);if(!t)return;const a=(n,r)=>I.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))un[n]&&typeof r=="string"&&a(un[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))mn[n]&&typeof r=="string"&&a(mn[n],r)}const Ti=`
      body{transition:background .55s ease}
      /* Never let anything push the page wider than the phone: horizontal
         overflow makes mobile browsers render zoomed-out and jumpy. */
      html,body{max-width:100%;overflow-x:hidden}
      .ag-widget,.ag-widget *{box-sizing:border-box}
      .ag-widget{max-width:100%}
      .ag-widget [hidden]{display:none!important}

      /* Form controls stay >=16px so iOS Safari never auto-zooms on focus —
         the usual cause of "it zoomed in and won't zoom back". Selector is
         (class+type) specificity so it wins over the component rules that
         previously set 0.9-ish rem. */
      .ag-widget input,.ag-widget textarea,.ag-widget select{font-size:16px}

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
      /* Safe areas. Both apps ship viewport-fit=cover together with
         apple-mobile-web-app-status-bar-style=black-translucent, which means
         that once installed to the home screen the web view starts at y=0 —
         physically underneath the notch and the status bar. The bottom nav,
         FAB and toasts already added env(safe-area-inset-bottom); nothing ever
         accounted for the top, so on any notched iPhone (13 mini included) the
         kicker and the title sat behind the clock and the battery.

         Kept as variables so every rule reads the same value, and so the
         no-inset case (desktop, Android, Safari tabs) is exactly the old
         padding rather than a special case. */
      :root{
        --ag-safe-top:env(safe-area-inset-top,0px);
        --ag-safe-bottom:env(safe-area-inset-bottom,0px);
        --ag-safe-left:env(safe-area-inset-left,0px);
        --ag-safe-right:env(safe-area-inset-right,0px);
      }
      .ag-frame{
        width:100%;
        max-width:1120px;
        margin-inline:auto;
        padding:calc(clamp(12px,2.4vw,28px) + var(--ag-safe-top))
                calc(clamp(12px,3vw,32px) + var(--ag-safe-right))
                clamp(12px,2.4vw,28px)
                calc(clamp(12px,3vw,32px) + var(--ag-safe-left));
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
        min-width:0;
      }
      /* Grid items default to min-width:auto, so any panel holding something
         wide — a long scrolling row, an unbroken URL — grows its track,
         which drags .ag-widget past the viewport and clips the right edge.
         The panels are meant to scroll internally instead. */
      .ag-content > *{min-width:0}

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
        position: relative;
      }

      /* The chips are 28px tall and are the way into Bärlauch, Gespräch,
         Mission, Glossar and Stimmung — the smallest real navigation in the
         app, on the smallest current iPhone. Rather than fatten them to 44pt
         and wreck the chip row, the hit area is extended past the pill:
         28 + 2*8 = 44pt tall, while the visible design is untouched. The row
         gap is 8px, so ±4px sideways cannot make two chips overlap.

         On ::before deliberately: .ag-chip-mission-active::after is the gold
         "you have a mission" dot, and one element only gets one ::after. When
         a chip went active the dot replaced this box, so the Mission chip lost
         its 44pt target at exactly the moment it most wanted tapping. */
      .ag-chip-clickable::before {
        content: "";
        position: absolute;
        inset: -8px -4px;
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
      .ag-voucher-use{position:relative}
      .ag-voucher-use::after{content:"";position:absolute;inset:-7px -2px}
      .ag-voucher-use:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px)}
      .ag-voucher-use:disabled{opacity:.5;cursor:default}
      .ag-voucher-used{display:inline-flex;align-items:center;gap:4px;font-size:.84rem;color:var(--ag-muted);font-style:italic}
      .ag-history{list-style:none;padding:0;margin:0;display:grid;gap:10px}
      .ag-history-empty{
        margin:8px 0 0;padding:16px;border:1px dashed var(--ag-border);border-radius:var(--ag-radius-md);
        color:var(--ag-muted);font-size:.95rem;line-height:1.55;background:var(--ag-surface-2);
        overflow-wrap:break-word;word-break:break-word;
      }
      /* Waiting on the sheet, not empty. A turning ring so the difference is
         visible at a glance rather than only in the wording. */
      .ag-history-empty.is-loading{
        display:flex;align-items:center;gap:10px;border-style:solid;
      }
      .ag-history-empty.is-loading::before{
        content:"";width:15px;height:15px;flex:0 0 auto;border-radius:50%;
        border:2px solid var(--ag-border);border-top-color:var(--ag-primary);
        animation:ag-spin .7s linear infinite;
      }
      @keyframes ag-spin{to{transform:rotate(360deg)}}
      @media (prefers-reduced-motion:reduce){
        .ag-history-empty.is-loading::before{animation-duration:2.4s}
      }
      /* ── Album (Verlauf) ── */
      /* Collapsed by default: with a few hundred pulls behind it this grid gets
         tall, and it sits at the very bottom of the tab. Same chevron
         behaviour as Maschinenregeln so it reads as the same kind of control. */
      .ag-album-card{color:var(--ag-text)}
      .ag-album-summary{
        list-style:none;cursor:pointer;display:flex;align-items:baseline;gap:10px;
        flex-wrap:wrap;
      }
      .ag-album-summary::-webkit-details-marker{display:none}
      .ag-album-summary:before{
        content:"";width:8px;height:8px;flex:0 0 auto;align-self:center;
        border-right:2px solid currentColor;border-bottom:2px solid currentColor;
        transform:rotate(-45deg);transition:transform 200ms var(--ag-ease);
      }
      .ag-album-card[open] .ag-album-summary:before{transform:rotate(45deg)}
      .ag-album-summary:focus-visible{outline:2px solid var(--ag-gold);outline-offset:3px;border-radius:4px}
      .ag-album-summary .ag-wish-label{margin:0}
      .ag-album-note{margin:0;font-size:.85rem;color:var(--ag-muted)}
      .ag-album-card[open] .ag-album-grid{margin-top:12px}
      /* The UA hides a closed <details>' children with display:none, but our
         own .ag-album-grid rule sets display:grid and is more specific, so it
         beat the UA rule and the grid stayed on screen while the card
         reported itself closed. (No backticks in this file — it is one big JS
         template literal and they terminate it.) */
      .ag-album-card:not([open]) .ag-album-grid{display:none}
      /* auto-fill keeps the tiles a sane size at any width instead of
         stretching three of them across a tablet. */
      .ag-album-grid{
        display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));
        gap:6px;
      }
      .ag-album-tile{
        position:relative;aspect-ratio:1;padding:0;border:0;border-radius:var(--ag-radius-sm,10px);
        overflow:hidden;cursor:pointer;background:var(--ag-surface-2);
        box-shadow:var(--ag-shadow-soft);transition:transform .16s ease,box-shadow .16s ease;
      }
      .ag-album-tile img{width:100%;height:100%;object-fit:cover;display:block}
      .ag-album-tile:hover{transform:translateY(-2px);box-shadow:0 6px 16px -8px rgba(0,0,0,.5)}
      .ag-album-tile:focus-visible{outline:2px solid var(--ag-gold);outline-offset:2px}
      @media (prefers-reduced-motion:reduce){.ag-album-tile{transition:none}}

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

      /* "Vor einem Jahr" footnote under the day's result — a small gift of
         memory, deliberately quiet so it never competes with today. */
      .ag-memory{
        display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;
        margin-top:14px;padding-top:12px;
        border-top:1px solid var(--ag-border);
      }
      .ag-memory[data-ag-memory]:not([hidden]){display:flex}
      .ag-memory-label{
        font-size:.66rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;
        color:var(--ag-muted);opacity:.75;flex:none;
      }
      .ag-memory-text{font-size:.86rem;color:var(--ag-muted);line-height:1.45;min-width:0}

      .ag-history-tally{
        margin:0 0 12px;text-align:center;font-size:.78rem;
        color:var(--ag-muted);opacity:.7;font-variant-numeric:tabular-nums;
        letter-spacing:.01em;
      }

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

      /* ── Tone glow: the revealed card takes on the colour of its rarity ── */
      .ag-widget{--ag-tone-glow:rgba(126,207,163,.28)}
      .ag-widget[data-tone=quiet]{--ag-tone-glow:rgba(150,165,150,.20)}
      .ag-widget[data-tone=soft]{--ag-tone-glow:rgba(126,207,163,.28)}
      .ag-widget[data-tone=quest]{--ag-tone-glow:rgba(100,160,255,.30)}
      .ag-widget[data-tone=warm]{--ag-tone-glow:rgba(232,200,122,.34)}
      .ag-widget[data-tone=cursed]{--ag-tone-glow:rgba(150,120,220,.30)}
      .ag-widget[data-tone=rare]{--ag-tone-glow:rgba(96,207,140,.36)}
      .ag-widget[data-tone=photo]{--ag-tone-glow:rgba(120,190,255,.32)}
      .ag-widget[data-tone=jackpot]{--ag-tone-glow:rgba(240,201,74,.44)}
      .ag-widget[data-tone=special]{--ag-tone-glow:rgba(240,201,74,.44)}
      .ag-widget.is-revealed .ag-result{
        box-shadow:0 0 0 1px var(--ag-tone-glow) inset, 0 14px 48px -12px var(--ag-tone-glow);
        transition:box-shadow .6s var(--ag-ease);
      }
      /* Jackpots & special days get a slow breathing aura on top. */
      .ag-widget.is-revealed[data-tone=jackpot] .ag-result,
      .ag-widget.is-revealed[data-tone=special] .ag-result{
        animation:ag-tone-pulse 3.2s ease-in-out infinite;
      }
      @keyframes ag-tone-pulse{
        0%,100%{box-shadow:0 0 0 1px var(--ag-tone-glow) inset, 0 14px 44px -14px var(--ag-tone-glow)}
        50%{box-shadow:0 0 0 1px var(--ag-tone-glow) inset, 0 18px 60px -8px var(--ag-tone-glow)}
      }

      /* ── Draw button: a slow sheen sweeps across, inviting the tap. Scoped
         to the main draw button only, and it stops once you've drawn today. ── */
      .ag-widget:not(.has-drawn) [data-ag-draw]{position:relative;overflow:hidden}
      .ag-widget:not(.has-drawn) [data-ag-draw]::after{
        content:"";position:absolute;inset:0;pointer-events:none;z-index:2;
        background:linear-gradient(115deg,transparent 34%,rgba(255,255,255,.22) 50%,transparent 64%);
        transform:translateX(-120%);
        animation:ag-sheen 5s ease-in-out infinite;
      }
      @keyframes ag-sheen{0%,74%{transform:translateX(-120%)}100%{transform:translateX(120%)}}

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
        /* Shorthand, so it has to re-apply the insets or it would drop the
           top one again on exactly the phone widths that need it. */
        .ag-frame{
          padding:calc(clamp(8px,3vw,16px) + var(--ag-safe-top))
                  calc(clamp(8px,3vw,16px) + var(--ag-safe-right))
                  clamp(8px,3vw,16px)
                  calc(clamp(8px,3vw,16px) + var(--ag-safe-left));
        }
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
      .ag-berge-stats{display:flex;flex-direction:column;gap:8px;min-width:0}
      /* Two figures share one row and never wrap. Letting them size to their
         content pushed them to 136px + 154px against 285px of card, so they
         stacked and the header grew to a full screen before the first summit.
         flex:1 1 0 splits the row evenly and lets the analogy text wrap
         instead of the layout. */
      .ag-berge-figures{display:flex;gap:14px;flex-wrap:nowrap;align-items:flex-start}
      .ag-berge-figure{display:flex;flex-direction:column;gap:2px;flex:1 1 0;min-width:0}
      .ag-berge-analogy{overflow-wrap:anywhere}
      .ag-berge-total-label{font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ag-muted)}
      .ag-berge-total-elev{font-size:2rem;font-weight:800;color:var(--ag-primary-dark);letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
      .ag-berge-gipfel-cmp{font-size:.8rem;color:var(--ag-muted);font-style:italic}
      .ag-berge-stats-kicker{
        font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
        color:var(--ag-muted);opacity:.75;
      }
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
      /* The elevation and the action buttons are both flex-shrink:0, so a long
         peak name used to push the edit/delete pair 28px past the right edge
         of a 375px screen. Let the name block shrink and the row wrap. */
      .ag-gipfel-head{
        display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
        margin-bottom:6px;flex-wrap:wrap;
      }
      .ag-gipfel-head-info{flex:1 1 auto;min-width:0}
      .ag-gipfel-name{font-size:1rem;font-weight:800;color:var(--ag-text);line-height:1.3;margin-bottom:2px;overflow-wrap:anywhere}
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

      /* ── Skincare ── */
      /* Sized to fit a 375x812 phone without scrolling: nine steps, two block
         titles and a footer inside roughly 700px of usable height. Notes are
         one short line by design — see the comment in config/skincare.json. */
      .ag-skin-block + .ag-skin-block{margin-top:12px;padding-top:11px;border-top:1px dashed var(--ag-border)}
      .ag-skin-block-title{
        margin:0 0 7px;font-size:.68rem;font-weight:800;letter-spacing:.09em;
        text-transform:uppercase;color:var(--ag-primary-dark);
      }
      .ag-skin-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
      .ag-skin-step{display:flex;gap:9px;align-items:flex-start;min-width:0}
      /* Not scheduled today: dimmed, not hidden. Seeing that Friday is a
         retinoid night is the useful part, and hiding it would make the list
         look different every day. */
      .ag-skin-step.is-off{opacity:.42}
      .ag-skin-num{
        flex:0 0 auto;width:19px;height:19px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-size:.66rem;font-weight:800;font-variant-numeric:tabular-nums;
        background:var(--ag-surface-2);color:var(--ag-muted);margin-top:1px;
      }
      .ag-skin-body{display:flex;flex-direction:column;min-width:0}
      .ag-skin-name{font-size:.9rem;font-weight:600;color:var(--ag-text);line-height:1.3}
      .ag-skin-when{
        margin-left:6px;font-size:.62rem;font-weight:700;letter-spacing:.05em;
        text-transform:uppercase;color:var(--ag-gold);white-space:nowrap;
      }
      .ag-skin-note{font-size:.78rem;color:var(--ag-muted);line-height:1.35}
      .ag-skin-footer{
        margin:12px 0 0;padding-top:10px;border-top:1px dashed var(--ag-border);
        font-size:.75rem;color:var(--ag-muted);font-style:italic;line-height:1.4;
      }
      /* The panel itself gives back a little padding too. */
      #ag-skincare-panel{padding-top:14px;padding-bottom:14px}
      #ag-skincare-panel .ag-mini-head{margin-bottom:10px}

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


      /* ── Beweisstueck: quest passed row + trophy shelf ── */
      .ag-quest-wrap{
        display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;
        padding:12px 16px;border-radius:var(--ag-radius-md);
        background:linear-gradient(135deg,rgba(55,106,131,.12),rgba(185,120,46,.1));
        border:1px solid rgba(55,106,131,.28);
        margin-bottom:14px;
        animation:ag-enter 500ms var(--ag-ease);
      }
      .ag-quest-hint{margin:0;font-size:.9rem;font-weight:600;color:var(--ag-primary-dark);line-height:1.4}
      .ag-quest-done-btn{white-space:nowrap;flex:none}
      .ag-history-bestanden{
        margin:10px 0 0;font-size:.85rem;font-weight:700;color:var(--ag-gold);
      }
      .ag-trophy-note{margin:2px 0 10px;font-size:.85rem;color:var(--ag-muted)}
      .ag-trophy-shelf{
        display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;
      }
      .ag-trophy-tile{
        display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;
        padding:10px 6px 8px;border-radius:var(--ag-radius-sm,10px);
        background:linear-gradient(180deg,rgba(185,120,46,.1),rgba(185,120,46,.02));
        border:1px solid rgba(185,120,46,.28);
        min-width:0;
      }
      .ag-trophy-emoji{font-size:1.5rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15))}
      .ag-trophy-title{
        font-size:.72rem;font-weight:600;color:var(--ag-text);line-height:1.25;
        display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
      }
      .ag-trophy-date{font-size:.68rem;color:var(--ag-muted)}
      @media (prefers-color-scheme:dark){
        .ag-quest-wrap{background:linear-gradient(135deg,rgba(138,184,207,.14),rgba(224,167,93,.1));border-color:rgba(138,184,207,.3)}
        .ag-quest-hint{color:#a8cbd8}
        .ag-trophy-tile{background:linear-gradient(180deg,rgba(224,167,93,.12),rgba(224,167,93,.03));border-color:rgba(224,167,93,.3)}
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
      /* 21x20 before. Apple's minimum is 44pt, and this is the one control on
         the page you tap by accident instead of on purpose. Grown to 44 without
         moving anything: the box stays visually small, the hit area does not. */
      .ag-install-nudge-dismiss{background:none;border:none;cursor:pointer;color:var(--ag-muted);font-size:1rem;line-height:1;border-radius:4px;
        min-width:44px;min-height:44px;padding:0;display:flex;align-items:center;justify-content:center;margin:-11px -11px -11px 0}
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

      /* ── Token-Bank (Verlauf) ── */
      .ag-tokenbank-card{margin-bottom:0}
      .ag-tokenbank-head{margin:2px 0 0;font-size:.82rem;opacity:.65;line-height:1.5}
      .ag-tokenbank{display:flex;flex-direction:column;gap:6px;margin-top:12px}
      .ag-tokenrow{
        display:flex;align-items:center;gap:10px;
        padding:9px 11px;border-radius:13px;
        background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
        transition:background 180ms var(--ag-ease),border-color 180ms var(--ag-ease);
      }
      /* Types you have none of stay visible — seeing what's out there is half
         the point — but they recede so the ones in progress read first. */
      .ag-tokenrow.is-empty{opacity:.42}
      .ag-tokenrow.is-done{
        background:rgba(126,207,163,.12);border-color:rgba(126,207,163,.4);opacity:1;
      }
      .ag-tokenrow-emoji{font-size:1.35rem;line-height:1;flex:none;width:26px;text-align:center}
      .ag-tokenrow-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
      .ag-tokenrow-reward{font-size:.82rem;line-height:1.35;overflow-wrap:anywhere}
      .ag-tokenrow-bar{
        display:block;height:4px;border-radius:999px;
        background:rgba(255,255,255,.1);overflow:hidden;
      }
      .ag-tokenrow-fill{
        display:block;height:100%;border-radius:999px;background:var(--ag-primary);
        transition:width 420ms var(--ag-ease);
      }
      .ag-tokenrow.is-done .ag-tokenrow-fill{background:var(--ag-gold)}
      .ag-tokenrow-count{
        flex:none;font-size:.86rem;font-weight:700;font-variant-numeric:tabular-nums;
      }
      .ag-tokenrow-goal{font-weight:500;opacity:.5}
      /* Completed rows wrap so the button gets its own line — inline it stole
         enough width to break "Ein Ausflug in dein Traumcafé" over three. */
      .ag-tokenrow.is-done{flex-wrap:wrap}
      .ag-tokenrow-redeem{
        flex:1 0 100%;margin-top:9px;
        cursor:pointer;font:inherit;font-size:.8rem;font-weight:600;
        padding:8px 11px;border-radius:11px;
        border:none;background:var(--ag-gold);color:#1c1405;
      }
      .ag-tokenrow-redeem:active{transform:scale(.98)}

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
      /* Auto-shown on load: lift it out of the panel so it is actually seen. */
      .ag-notif-card.is-floating{
        position:fixed;left:12px;right:12px;z-index:1200;
        bottom:calc(var(--ag-bottomnav-clearance,86px) + var(--ag-safe-bottom));
        max-width:520px;margin:0 auto;
        box-shadow:0 12px 40px rgba(0,0,0,.45);
        animation:ag-sheet-in 320ms var(--ag-ease) both;
      }

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
      .ag-prompt-field + .ag-prompt-field{margin-top:16px;padding-top:16px;border-top:1px dashed var(--ag-border)}
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
      /* Two of them at 2.4rem cannot sit side by side on a phone, so they wrap
         and the header grew to 331px — a full screen of chrome before the
         first summit. Smaller here buys the single row back. */
      @media (max-width:430px){
        .ag-berge-total-elev{font-size:1.9rem}
      }

      /* ── Glossary language tab strip ── */
      /* Four language tabs already exceed a narrow phone; let the row scroll
         instead of spilling past the panel edge. */
      .ag-glossary-tabs{max-width:100%;min-width:0;overflow-x:auto;scrollbar-width:none}
      .ag-glossary-tabs::-webkit-scrollbar{display:none}
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
          bottom:calc(12px + var(--ag-safe-bottom));
          /* Side insets matter in landscape, where the notch eats one edge. */
          left:calc(16px + var(--ag-safe-left));
          right:calc(16px + var(--ag-safe-right));
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
          font-family:inherit;text-decoration:none;
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
        .ag-frame{padding-bottom:calc(90px + var(--ag-safe-bottom))}
      }

      /* ── FAB ── */
      .ag-fab{display:none}
      @media (max-width:900px){
        .ag-fab{
          display:flex;align-items:center;justify-content:center;
          position:fixed;bottom:calc(60px + var(--ag-safe-bottom) + 14px);
          right:calc(16px + var(--ag-safe-right));
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
        position:fixed;bottom:calc(72px + var(--ag-safe-bottom));
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

      /* The Werkstatt form stays in flow rather than joining the fixed
         bottom-sheet rules above. Those resolve position:fixed against a
         transformed ancestor here, not the viewport, so the sheet lands
         mid-page with its top cut off. In-flow inside the panel is both
         correct and simpler, and needs no backdrop to be dismissed. */
      #ag-werkstatt-form:not([hidden]){
        position:relative;z-index:1010;margin-top:14px;padding-top:14px;
        border-top:1px solid rgba(255,255,255,.1);
        animation:ag-werkstatt-form-in 280ms var(--ag-ease) both;
      }
      @keyframes ag-werkstatt-form-in{
        from{opacity:0;transform:translateY(8px)}
        to{opacity:1;transform:none}
      }
      /* Clear the floating bottom nav so Speichern is never half under it. */
      @media (max-width:900px){
        #ag-werkstatt-form:not([hidden]){padding-bottom:calc(76px + var(--ag-safe-bottom))}
      }

      /* ── Kapsel-Werkstatt ── */
      #ag-werkstatt-panel:not([hidden]){animation:ag-werkstatt-panel-in 340ms var(--ag-ease) both}
      @keyframes ag-werkstatt-panel-in{
        from{opacity:0;transform:translateY(10px)}
        to{opacity:1;transform:none}
      }

      .ag-werkstatt-entry{
        display:flex;align-items:center;gap:12px;width:100%;text-align:left;
        cursor:pointer;font:inherit;color:inherit;
        border:1px dashed rgba(126,207,163,.34);
        transition:border-color .18s ease,transform .18s var(--ag-ease);
      }
      .ag-werkstatt-entry:hover{border-color:rgba(126,207,163,.6)}
      .ag-werkstatt-entry:active{transform:scale(.99)}
      .ag-werkstatt-entry-ico{font-size:1.5rem;line-height:1;flex-shrink:0}
      .ag-werkstatt-entry-text{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
      .ag-werkstatt-entry-title{font-weight:600;font-size:.95rem}
      .ag-werkstatt-entry-sub{font-size:.8rem;opacity:.72}
      .ag-werkstatt-entry-chev{font-size:1.3rem;opacity:.5;flex-shrink:0}

      /* Nine categories don't fit a phone, so the row scrolls sideways. The
         width pin matters: without it the row's min-content width propagates
         up through the card and stretches the whole widget past the viewport,
         which is exactly the "wider than the phone" problem this app has had
         before. overflow-x alone does not stop that. */
      .ag-werkstatt-tabs{
        display:flex;gap:6px;overflow-x:auto;margin-top:12px;
        /* Positioned so a tab's offsetLeft is measured against this strip and
           not some ancestor — the scroll maths in renderWerkstatt depends on
           it. The inline padding keeps the first and last tab clear of the
           edge fades below, and the negative margin cancels it visually so
           the strip still spans the card edge to edge. */
        position:relative;
        padding:0 14px 4px;margin-inline:-14px;
        width:calc(100% + 28px);max-width:calc(100% + 28px);min-width:0;
        scroll-behavior:smooth;
        scrollbar-width:none;-webkit-overflow-scrolling:touch;
        /* Fade the edges so a half-scrolled tab reads as "there's more this
           way" rather than as a word chopped off by the panel. */
        -webkit-mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);
        mask-image:linear-gradient(90deg,transparent,#000 14px,#000 calc(100% - 14px),transparent);
      }
      .ag-werkstatt-tabs::-webkit-scrollbar{display:none}
      .ag-werkstatt-tab{
        flex-shrink:0;cursor:pointer;font:inherit;font-size:.8rem;
        padding:7px 12px;border-radius:999px;white-space:nowrap;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);color:inherit;opacity:.75;
        transition:background 200ms var(--ag-ease),color 200ms var(--ag-ease),
                   border-color 200ms var(--ag-ease),opacity 200ms var(--ag-ease),
                   transform 140ms var(--ag-ease);
      }
      .ag-werkstatt-tab:active{transform:scale(.94)}
      .ag-werkstatt-tab.is-active{
        background:var(--ag-primary);border-color:transparent;color:#08150d;opacity:1;font-weight:600;
      }
      .ag-werkstatt-count{
        display:inline-block;margin-left:4px;padding:0 5px;border-radius:999px;
        background:rgba(0,0,0,.22);font-size:.72rem;font-weight:600;
      }
      .ag-werkstatt-tab:not(.is-active) .ag-werkstatt-count{background:rgba(255,255,255,.14)}
      .ag-werkstatt-note{margin:11px 0 0;font-size:.8rem;opacity:.62;line-height:1.5}
      .ag-werkstatt-list{display:flex;flex-direction:column;gap:8px;margin-top:12px}

      /* The whole card is the edit control, so it gets the full width for
         text instead of surrendering a third of it to an icon column. */
      .ag-werkstatt-card{
        display:block;width:100%;text-align:left;font:inherit;color:inherit;
        cursor:pointer;padding:13px 15px;border-radius:15px;
        background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);
        transition:background 180ms var(--ag-ease),border-color 180ms var(--ag-ease),transform 140ms var(--ag-ease);
        animation:ag-werkstatt-card-in 300ms var(--ag-ease) both;
        animation-delay:min(calc(var(--ag-i,0) * 45ms),270ms);
      }
      .ag-werkstatt-card:hover{background:rgba(255,255,255,.07);border-color:rgba(126,207,163,.28)}
      .ag-werkstatt-card:active{transform:scale(.985);background:rgba(255,255,255,.09)}
      @keyframes ag-werkstatt-card-in{
        from{opacity:0;transform:translateY(6px)}
        to{opacity:1;transform:none}
      }
      .ag-werkstatt-card-title{font-weight:600;font-size:.94rem;line-height:1.35}
      .ag-werkstatt-card-msg{font-size:.84rem;opacity:.75;margin-top:4px;line-height:1.5}

      /* Question and answer share one label treatment so the pair reads as a
         little exchange rather than two unrelated notes. */
      .ag-werkstatt-block-label{
        display:block;font-size:.66rem;font-weight:700;text-transform:uppercase;
        letter-spacing:.07em;opacity:.55;margin-bottom:3px;
      }
      .ag-werkstatt-card-prompt{
        margin-top:9px;padding-left:10px;font-size:.83rem;line-height:1.5;
        border-left:2px solid rgba(255,255,255,.16);
      }
      .ag-werkstatt-card-pending{font-size:.75rem;opacity:.45;margin-top:5px;padding-left:10px}
      .ag-werkstatt-answer{
        margin-top:7px;padding:9px 11px;border-radius:11px;
        background:rgba(126,207,163,.1);border-left:2px solid var(--ag-primary);
        font-size:.84rem;line-height:1.5;
      }

      .ag-werkstatt-card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}
      .ag-werkstatt-card-tags:empty{display:none}
      .ag-werkstatt-tag{
        font-size:.68rem;font-weight:600;letter-spacing:.03em;
        padding:2px 8px;border-radius:999px;
        background:rgba(255,255,255,.09);opacity:.8;
      }
      .ag-werkstatt-tag.is-voucher{background:var(--ag-gold);color:#1c1405;opacity:1}
      .ag-werkstatt-tag.is-unsent{
        background:rgba(232,180,120,.18);color:#e8c08a;opacity:1;
        border:1px solid rgba(232,180,120,.35);
      }

      /* Destructive, so it sits apart from Speichern and arms before it
         fires — no native confirm() dialog anywhere in this flow. */
      .ag-werkstatt-delete-btn{
        display:block;width:100%;margin-top:14px;padding:10px;
        cursor:pointer;font:inherit;font-size:.82rem;border-radius:11px;
        background:none;border:1px solid transparent;color:#e89b9b;opacity:.75;
        transition:background 180ms var(--ag-ease),border-color 180ms var(--ag-ease),opacity 180ms var(--ag-ease);
      }
      .ag-werkstatt-delete-btn:hover{opacity:1}
      .ag-werkstatt-delete-btn.is-armed{
        background:rgba(220,120,120,.14);border-color:rgba(232,155,155,.45);
        color:#f4b4b4;opacity:1;font-weight:600;
      }

      .ag-werkstatt-form-fields{display:flex;flex-direction:column;gap:10px;margin-top:10px}
      .ag-werkstatt-textarea{resize:vertical;min-height:76px;font-family:inherit}
      .ag-werkstatt-check{display:flex;align-items:center;gap:8px;font-size:.84rem;opacity:.85}
      .ag-werkstatt-check input{width:18px;height:18px;accent-color:var(--ag-primary)}
      .ag-werkstatt-error{margin:10px 0 0;font-size:.82rem;color:#f2a0a0}
      .ag-werkstatt-form-actions{display:flex;gap:8px;margin-top:12px}
      .ag-werkstatt-form-actions .ag-button{flex:1}
      .ag-werkstatt-form-actions .ag-secondary{flex-shrink:0}

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
          padding:24px 20px calc(32px + var(--ag-safe-bottom));
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
      .ag-gipfel-edit,.ag-gipfel-delete{position:relative}
      .ag-gipfel-edit::after,.ag-gipfel-delete::after{content:"";position:absolute;inset:-6px}
      .ag-gipfel-edit:hover,.ag-gipfel-delete:hover{
        opacity:1;background:var(--ag-surface-2);color:var(--ag-text);
      }

      /* ── Remaining sub-44pt controls ──────────────────────────────────────
         Each keeps its painted size and gains the target from an absolutely
         positioned ::after with negative insets, so the layout is untouched.
         Measured on a 375x812 mini: star 20x16, sync 31x28, filter chips
         h30, calendar arrows 26x22, <summary> rows h24. */
      .ag-history-star{position:relative}
      .ag-history-star::after{content:"";position:absolute;inset:-14px -12px}
      .ag-sync-btn{position:relative}
      .ag-sync-btn::after{content:"";position:absolute;inset:-8px -7px}
      .ag-history-filter-chip{position:relative}
      .ag-history-filter-chip::after{content:"";position:absolute;inset:-7px 0}
      .ag-kalender-nav{position:relative}
      .ag-kalender-nav::after{content:"";position:absolute;inset:-11px -9px}
      .ag-rules summary,.ag-album-summary{position:relative}
      .ag-rules summary::after,.ag-album-summary::after{
        content:"";position:absolute;inset:-10px -4px;
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
    `;function Ci(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=Ti.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function Li(){return`
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
    `}function Ai(){return`
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
    `}const Ii=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${Li()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${Ai()}
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
                  <button class="ag-tab is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today" aria-label="Heute" title="Heute">🎰</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="history" aria-label="Verlauf" title="Verlauf">🗓</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="lieblinge" aria-label="Lieblinge" title="Lieblinge">⭐</button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="berge" aria-label="Berge" title="Berge">⛰</button>
                  <a class="ag-tab" href="./lichter.html" aria-label="Lichtsteuerung" title="Lichtsteuerung">💡</a>
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

          <section class="ag-card ag-mini-panel" id="ag-skincare-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Skincare 🧴</span>
              <button class="ag-secondary" type="button" id="ag-skincare-close">✕</button>
            </div>
            <div id="ag-skincare-body"></div>
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

          <section class="ag-card ag-mini-panel" id="ag-werkstatt-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Werkstatt 🔧</span>
              <button class="ag-secondary" type="button" id="ag-werkstatt-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Kapseln für Fionn</h2>
            <p class="ag-mini-copy">Was du hier schreibst, zieht Fionn.</p>
            <div class="ag-werkstatt-tabs" id="ag-werkstatt-tabs"></div>
            <p class="ag-werkstatt-note" id="ag-werkstatt-note"></p>
            <div class="ag-werkstatt-list" id="ag-werkstatt-list"></div>
            <button class="ag-button ag-werkstatt-add-btn" type="button" id="ag-werkstatt-add" style="width:100%;justify-content:center;margin-top:12px">
              <span class="ag-button-orb" aria-hidden="true"></span>
              <span>Kapsel schreiben</span>
            </button>
            <div class="ag-werkstatt-form" id="ag-werkstatt-form" hidden>
              <p class="ag-wish-label" id="ag-werkstatt-form-title">Neue Kapsel</p>
              <div class="ag-werkstatt-form-fields">
                <input class="ag-berge-input" type="text" id="ag-werkstatt-title" placeholder="Titel" maxlength="80">
                <textarea class="ag-berge-input ag-werkstatt-textarea" id="ag-werkstatt-message" rows="3" maxlength="400" placeholder="Was steht in der Kapsel?"></textarea>
                <input class="ag-berge-input" type="text" id="ag-werkstatt-prompt" placeholder="Frage an ihn (optional)" maxlength="180" autocomplete="off">
                <input class="ag-berge-input" type="url" id="ag-werkstatt-link" placeholder="Link (optional, z. B. Spotify)" inputmode="url" autocomplete="off" spellcheck="false">
                <label class="ag-werkstatt-check">
                  <input type="checkbox" id="ag-werkstatt-voucher">
                  <span>Gutschein — Fionn kann ihn einlösen</span>
                </label>
              </div>
              <p class="ag-werkstatt-error" id="ag-werkstatt-error" hidden></p>
              <div class="ag-werkstatt-form-actions">
                <button class="ag-secondary" type="button" id="ag-werkstatt-cancel">Abbrechen</button>
                <button class="ag-button" type="button" id="ag-werkstatt-save">
                  <span class="ag-button-orb" aria-hidden="true"></span>
                  <span>Speichern</span>
                </button>
              </div>
              <button class="ag-werkstatt-delete-btn" type="button" id="ag-werkstatt-delete" hidden>Kapsel löschen</button>
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
              <div class="ag-quest-wrap" data-ag-quest-wrap hidden>
                <p class="ag-quest-hint" data-ag-quest-hint></p>
                <button class="ag-secondary ag-quest-done-btn" type="button" data-ag-quest-done hidden>Bestanden ✓</button>
              </div>
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
              <div class="ag-memory" data-ag-memory hidden>
                <span class="ag-memory-label" data-ag-memory-label></span>
                <span class="ag-memory-text" data-ag-memory-text></span>
              </div>
            </article>

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

            <button class="ag-card ag-werkstatt-entry" type="button" data-ag-werkstatt-open hidden>
              <span class="ag-werkstatt-entry-ico" aria-hidden="true">🔧</span>
              <span class="ag-werkstatt-entry-text">
                <span class="ag-werkstatt-entry-title">Kapseln für Fionn schreiben</span>
                <span class="ag-werkstatt-entry-sub" data-ag-werkstatt-entry-sub>Werkstatt öffnen</span>
              </span>
              <span class="ag-werkstatt-entry-chev" aria-hidden="true">›</span>
            </button>

            <div class="ag-card ag-notif-card" data-ag-notif-card hidden>
              <p class="ag-notif-text">🔔 Tägliche Erinnerung um 8 Uhr einrichten – damit die Kapsel nicht auf dich wartet.</p>
              <div class="ag-notif-actions">
                <button class="ag-secondary" type="button" data-ag-notif-dismiss>Nicht jetzt</button>
                <button class="ag-secondary" type="button" data-ag-notif-enable>Erinnern</button>
              </div>
            </div>

            <details class="ag-card ag-rules">
              <summary data-ag-rules-title>Maschinenregeln</summary>
              <p data-ag-rules-text></p>
              <ul data-ag-odds></ul>
            </details>
          </section>

          <section class="ag-panel" data-ag-panel-history role="tabpanel" hidden>
            <div class="ag-card ag-tokenbank-card">
              <div class="ag-history-header">
                <p class="ag-wish-label">Token-Bank</p>
              </div>
              <p class="ag-tokenbank-head" data-ag-tokenbank-head></p>
              <div class="ag-tokenbank" data-ag-tokenbank></div>
            </div>

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
              <p class="ag-history-tally" data-ag-history-tally hidden></p>
              <ol class="ag-history" data-ag-history></ol>
              <p class="ag-history-empty" data-ag-history-empty hidden></p>
              <button class="ag-secondary ag-history-more" type="button" data-ag-history-more hidden>Mehr anzeigen</button>
            </div>

            <div class="ag-card ag-trophy-card" data-ag-trophy-card hidden>
              <p class="ag-wish-label">Trophäenregal 🏆</p>
              <p class="ag-trophy-note" data-ag-trophy-note></p>
              <div class="ag-trophy-shelf" data-ag-trophies></div>
            </div>
            <details class="ag-card ag-album-card" data-ag-album-card hidden>
              <summary class="ag-album-summary">
                <span class="ag-wish-label">Unser Album</span>
                <span class="ag-album-note" data-ag-album-note></span>
              </summary>
              <div class="ag-album-grid" data-ag-album></div>
            </details>
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
                <span class="ag-berge-stats-kicker">Gemeinsam erwandert</span>
                <div class="ag-berge-figures">
                  <div class="ag-berge-figure">
                    <span class="ag-berge-total-label">Höhenmeter</span>
                    <span class="ag-berge-total-elev" data-ag-berge-total>— m</span>
                    <span class="ag-berge-analogy" data-ag-berge-analogy hidden></span>
                  </div>
                  <div class="ag-berge-figure">
                    <span class="ag-berge-total-label">Strecke</span>
                    <span class="ag-berge-total-elev" data-ag-berge-total-dist>— km</span>
                    <span class="ag-berge-analogy" data-ag-berge-dist-analogy hidden></span>
                  </div>
                </div>
                <span class="ag-berge-gipfel-cmp" data-ag-berge-gipfel-cmp hidden></span>
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
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">🎰</span>
          <span class="ag-bottomnav-btn-label">Heute</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="history">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">🗓</span>
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
        <a class="ag-bottomnav-btn ag-bottomnav-link" href="./lichter.html" aria-label="Lichtsteuerung">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true">💡</span>
          <span class="ag-bottomnav-btn-label">Licht</span>
        </a>
      </nav>
    `;function zi(){I.className="ag-widget",I.setAttribute("aria-labelledby","ag-title"),I.innerHTML=Ii}function ee(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let o=0;o<e;o++){const i=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,c=Math.random()*100,u=Math.random()*.6,p=1.4+Math.random()*.8;i.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${p}s ${u}s ease-in forwards;transform-origin:center;`,i.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(i)}if(!document.getElementById("ag-confetti-style")){const o=document.createElement("style");o.id="ag-confetti-style",o.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(o)}setTimeout(()=>r.remove(),3e3)}const Se=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],fn=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],hn="affektions-gacha:mission-done:v1",bn="affektions-gacha:mission-feedback:v1";function Yt(){var o,i;const e=(o=g.missions)==null?void 0:o.pairs;if(!Array.isArray(e)||!e.length)return null;const t=N(((i=g.theme)==null?void 0:i.timezone)||"UTC"),a=Ge(`${g.theme.secret}|mission|${t}`,e.length),n=e[a];return R()==="fionn"?n.fionn:n.lennart}function yn(){var e;try{const t=N(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${hn}:${R()}`)===t}catch{return!1}}function $i(){var e,t;try{const a=N(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${hn}:${R()}`,a);const n=R(),r=Yt(),o=new Date().toISOString();Di({day:a,player:n,mission:r,doneAt:o});const i=(t=g.backup)==null?void 0:t.endpointUrl;i&&r&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:r,doneAt:o}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function vn(){var e;try{const t=N(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${bn}:${R()}`)===t}catch{return!1}}function Mi(){var e;try{const t=N(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${bn}:${R()}`,t)}catch{}}function Bi(e,t){var i,s;const a=N(((i=g.theme)==null?void 0:i.timezone)||"UTC"),n=R(),r=Yt();Ni(a,n,{rating:e,comment:t||""}),Mi();const o=(s=g.backup)==null?void 0:s.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:r,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function Di(e){const t=at(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),qt(t)}function Ni(e,t,a){const n=at(),r=n.findIndex(o=>o.day===e&&o.player===t);r>=0&&(n[r]={...n[r],...a},qt(n))}function Pi(e,t){var c;if(!e)return;const a=at(),n=((c=g.theme)==null?void 0:c.timezone)||"UTC",r=N(n),o=new Map;for(const u of a)o.has(u.day)||o.set(u.day,{}),o.get(u.day)[u.player]=u;const i=Array.from(o.keys()).sort((u,p)=>p.localeCompare(u)).slice(0,30);if(!i.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},l=u=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(u+"T12:00:00Z"))}catch{return u}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+i.map(u=>{const p=o.get(u),f=p.lennart,h=p.fionn,b=u===r,x=[];if(f&&t!=="fionn"){const v=f.doneAt?'<span class="ag-log-done">✓</span>':"",w=f.rating?`<span class="ag-log-rating">${s[f.rating]||""}</span>`:"";x.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${D(f.mission||"")}</span>${v}${w}</div>`)}if(h&&t!=="lennart"){const v=h.doneAt?'<span class="ag-log-done">✓</span>':"",w=h.rating?`<span class="ag-log-rating">${s[h.rating]||""}</span>`:"";x.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${D(h.mission||"")}</span>${v}${w}</div>`)}return x.length?`<div class="ag-log-day${b?" ag-log-today":""}"><span class="ag-log-date">${l(u)}</span>${x.join("")}</div>`:""}).filter(Boolean).join("")}function xn(){const e=d("#ag-mission-panel");if(!e)return;const t=d("#ag-mission-text"),a=d("#ag-mission-actions"),n=d("#ag-mission-feedback"),r=d("#ag-mission-feedback-sent"),o=d("#ag-mission-done-note"),i=e.querySelector(".ag-mini-copy");i&&(i.hidden=!0);const s=Yt();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const l=yn(),c=vn();a&&(a.hidden=l),n&&(n.hidden=!l,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(u=>{u.hidden=c})),r&&(r.hidden=!c),o&&(o.hidden=!l),e.querySelectorAll(".ag-mission-rate-btn").forEach(u=>u.classList.remove("is-selected")),Pi(d("#ag-mission-log"),R()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function qi(){const e=d("#ag-mission-panel");e&&(e.hidden=!0)}let pt=-1;function wn(){const e=d("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem($a);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<Se.length){pt=a;const n=d("#ag-gesprach-question");n&&(n.textContent=Se[a]);return}}}catch{}kn()}}function _i(){const e=d("#ag-gesprach-panel");e&&(e.hidden=!0)}function kn(){let e;do e=Math.floor(Math.random()*Se.length);while(e===pt&&Se.length>1);pt=e;try{localStorage.setItem($a,String(e))}catch{}const t=d("#ag-gesprach-question");t&&(t.textContent=Se[e])}function Ui(){const e=Se[pt]||"";if(!e)return;const t=g.theme&&g.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Sn(){var e;return!!((e=g.quest)!=null&&e.enabled&&Ye(g))}function En(){const e=d("#ag-quest-panel");e&&(e.hidden=!1,Tn())}function ji(){const e=d("#ag-quest-panel");e&&(e.hidden=!0)}function Tn(){const e=Ye(g),t=Ie(),a=d("#ag-quest-challenge"),n=d("#ag-quest-hint-history"),r=d("#ag-quest-loading"),o=d("#ag-quest-actions"),i=d("#ag-quest-result"),s=d("#ag-quest-points"),l=d("#ag-quest-copy"),c=d("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),o&&(o.hidden=!0);return}if(a&&(a.textContent=u),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((p,f)=>`<div class="ag-hint-item"><span class="ag-hint-num">${f+1}</span><p>${p}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),o&&(o.hidden=!0),i&&(i.textContent=t.successMessage||"",i.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${nt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),o&&(o.hidden=!1),i&&(i.hidden=!0),s&&(s.hidden=!0)}async function Oi(e){if(!e)return;const t=d("#ag-quest-actions"),a=d("#ag-quest-loading"),n=d("#ag-quest-result"),r=d("#ag-quest-points"),o=d("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const i=await Fi(e),s=Ie(),l=Ye(g),c=(l==null?void 0:l.prompt)||"",u=(l==null?void 0:l.solution)||"";try{const p=await Hi(i,c,u,s.attempts+1,s.hints);if(s.attempts+=1,p.success){const f=Da[Math.min(s.attempts-1,Da.length-1)],h=Yo(f);s.solved=!0,s.pointsEarned=f,s.successMessage=p.message||"Perfekt.",Ut(s),X(),n&&(n.textContent=p.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${f} Punkte · Gesamt: ${h}`,r.hidden=!1),a&&(a.hidden=!0),o&&(o.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=d("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),A([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],p.hint||"Versuch nochmal."],Ut(s),Tn()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Fi(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Hi(e,t,a,n,r){var s;const o=(s=g.quest)==null?void 0:s.proxyUrl;if(!o)throw new Error("no proxy");const i=await fetch(o,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!i.ok)throw new Error("proxy error");return i.json()}function Ri(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),o=r.getChannelData(0);for(let c=0;c<n;c++)o[c]=Math.random()*2-1;const i=t.createBufferSource();i.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),i.connect(s),s.connect(l),l.connect(t.destination),i.start(a),i.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,u,p,f,h])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(c,a+p),b.frequency.exponentialRampToValueAtTime(u,a+p+f*.55);const x=t.createGain();x.gain.setValueAtTime(0,a+p),x.gain.linearRampToValueAtTime(h,a+p+.09),x.gain.exponentialRampToValueAtTime(.001,a+p+f),b.connect(x),x.connect(t.destination),b.start(a+p),b.stop(a+p+f+.05)})}catch{}}function Wi(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const o=document.createElement("span");o.className="ag-letter-word",o.textContent=n,o.style.animationDelay=`${320+r*155}ms`,a.appendChild(o),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Cn(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function Ln(){const e=d("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),A([20,60,20]),Ri();const t=d("#ag-letter-photo");if(t&&g.photos&&g.photos.length){const a=Pe(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Gi()}async function Gi(){var n;const e=d("#ag-letter-body");if(!e)return;Wi(e);const t=(n=g.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const o=await r.json();if(o.paragraphs&&o.paragraphs.length){Cn(e,o.paragraphs);return}}}catch{}const a=fn[Math.floor(Math.random()*fn.length)];Cn(e,a)}function Jt(){const e=d("#ag-letter-overlay");e&&(e.hidden=!0)}let Vt=null;function Ki(){if(!Vt)try{Vt=new(window.AudioContext||window.webkitAudioContext)}catch{}return Vt}function Yi(){try{return window.localStorage.getItem(So)!=="off"}catch{return!0}}function H(e,t,a,n,r=.15,o="sine"){const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type=o,i.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(r,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),i.start(l),i.stop(l+n+.05)}function ut(e){if(!Yi())return;const t=Ki();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":H(t,280,0,.18,.08,"sine"),H(t,210,.12,.22,.06,"sine");break;case"cursed":H(t,220,0,.12,.1,"triangle"),H(t,170,.09,.28,.07,"triangle");break;case"uncommon":H(t,523,0,.14,.14,"sine"),H(t,784,.1,.22,.12,"sine");break;case"rare":H(t,523,0,.12,.14,"sine"),H(t,659,.09,.12,.14,"sine"),H(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>H(t,a,n*.09,.18,.13,"sine")),H(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>H(t,a,n*.08,.16,.13,"sine")),H(t,2093,.45,.5,.05,"sine");break;default:H(t,523,0,.12,.13,"sine"),H(t,659,.09,.18,.1,"sine");break}}const Ji=["So","Mo","Di","Mi","Do","Fr","Sa"];function Vi(e){try{const t=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:e||"UTC"}).format(new Date);return Ji[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(t)]||null}catch{return null}}function Zi(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function An(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const o=Zi(n,t),i=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${D(n.when)}</span>`:"";return`
      <li class="ag-skin-step${o?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${D(n.name||"")}${i}</span>
          ${n.note?`<span class="ag-skin-note">${D(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${D(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function Qi(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=g.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=Vi(g.theme&&g.theme.timezone);e.innerHTML=An(t.morning,a)+An(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${D(t.footer)}</p>`:"")}function In(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,Qi(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),A(10))}function Xi(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}function es(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function Zt(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function ts(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${Zt(r)}× ${n}`}return null}function as(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const o=Number(r&&r.elevation);!Number.isFinite(o)||o<=0||(!a||o>a.h)&&(a={h:o,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${Zt(n)}× euer höchster Gipfel (${a.name})`:`≈ ${Zt(n)}× euer höchster Gipfel`}function ns(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,o]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+o+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function rs(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const o=r.indexOf("?"),i=o===-1?r:r.slice(0,o),s=o===-1?"":r.slice(o+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),i+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),o=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${o}`)}const n=ns(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function Qt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function os(e){const t=et();t.unshift(e),tt(t),K("gipfelbuch"),Qt("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function is(e){tt(et().filter(t=>t.id!==e)),K("gipfelbuch"),Qt("gipfel-delete",{id:e})}function ss(e,t){const a=et(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,tt(a),K("gipfelbuch"),Qt("gipfel-upsert",r)}function ls(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?zo(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?rs(e.activityUrl):null,o=e.cover?`<div class="ag-gipfel-cover"><img src="${D(e.cover)}" alt="${D(e.name||"")}" loading="lazy" decoding="async"></div>`:"",i=e.elevGain||e.elevation,s=e.distance?`${D(e.distance)} km`:"",l=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${D(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||l?`<div class="ag-gipfel-stats">${s}${s&&l?" ":""}${l}</div>`:"";t.innerHTML=`
    ${o}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Co(e.date)}</div>
        <div class="ag-gipfel-name">${D(e.name||"—")}</div>
      </div>
      ${i?`<div class="ag-gipfel-elev">↑ ${Mt(i)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${D(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${D(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${D(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var be;const b=d("[data-ag-berge-form]"),x=d("[data-ag-berge-add]");if(!b)return;const v=d("[data-ag-berge-edit-id]");v&&(v.value=e.id);const w=d("[data-ag-berge-name]");w&&(w.value=e.name||"");const y=d("[data-ag-berge-dist]");y&&(y.value=e.distance||"");const S=d("[data-ag-berge-gain]");S&&(S.value=e.elevGain||e.elevation||"");const C=d("[data-ag-berge-date]");C&&(C.value=e.date||"");const z=d("[data-ag-berge-url]");z&&(z.value=e.activityUrl||"");const L=d("[data-ag-berge-cover]");L&&(L.value=e.cover||"");const j=d("[data-ag-berge-notes]");j&&(j.value=e.notes||"");const te=d("[data-ag-berge-lat]");te&&(te.value=e.lat||"");const F=d("[data-ag-berge-lng]");F&&(F.value=e.lng||"");const he=d("[data-ag-berge-loc-label]");he&&(he.value=e.locLabel||"");const He=d("[data-ag-loc-search]");He&&(He.value=e.locLabel||"");const Re=d("[data-ag-berge-form-title]");Re&&(Re.textContent="Eintrag bearbeiten");const pe=d("[data-ag-berge-save] span:last-child");pe&&(pe.textContent="Speichern"),b.hidden=!1,x&&(x.hidden=!0),(be=d("[data-ag-sheet-backdrop]"))==null||be.classList.add("is-open"),b.scrollIntoView({behavior:"smooth",block:"nearest"}),w&&w.focus(),A(8)});const p=t.querySelector("[data-ag-gipfel-delete]");p&&p.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(is(e.id),qe(),A(8),Promise.resolve().then(()=>Is).then(b=>b.showToast("Eintrag gelöscht")).catch(()=>{}))});const f=t.querySelector("[data-ag-map-komoot]");f&&f.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,f.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,f.textContent="Karte schließen",A(4)}});const h=t.querySelector("[data-ag-map-alltrails]");return h&&r&&h.addEventListener("click",()=>{const b=t.querySelector("[data-ag-map-wrap-alltrails]");if(b){if(!b.hidden){b.hidden=!0,h.textContent="🗺 AllTrails-Karte";return}b.innerHTML=`<iframe src="${D(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,h.textContent="Karte schließen",A(4)}}),t}function qe({loading:e=!1}={}){const t=d("[data-ag-berge-list]"),a=d("[data-ag-berge-empty]"),n=d("[data-ag-berge-total]"),r=d("[data-ag-berge-analogy]"),o=d("[data-ag-berge-total-dist]"),i=d("[data-ag-berge-dist-analogy]"),s=d("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=et().sort((p,f)=>{const h=p.date||"",b=f.date||"";return b<h?-1:b>h?1:0});t.innerHTML="";const c=l.reduce((p,f)=>p+(Number(f.elevGain)||Number(f.elevation)||0),0);if(n&&(n.textContent=c>0?Mt(c):"— m"),r){const p=es(c);p?(r.textContent=p,r.hidden=!1):r.hidden=!0}const u=l.reduce((p,f)=>{const h=Number(f.distance);return p+(Number.isFinite(h)&&h>0?h:0)},0);if(o&&(o.textContent=u>0?`${Lo(u)} km`:"— km"),i){const p=ts(u);p?(i.textContent=p,i.hidden=!1):i.hidden=!0}if(s){const p=as(c,l);p?(s.textContent=p,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),zn([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(p=>t.appendChild(ls(p))),zn(l)}function ds(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const o=e.querySelector("[data-ag-berge-lat]"),i=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");o&&(o.value=""),i&&(i.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const o=t.value.trim();if(!o){r();return}n=setTimeout(async()=>{try{const i=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(o)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(i,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(c=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=c.display_name,u.addEventListener("click",()=>{const p=e.querySelector("[data-ag-berge-lat]"),f=e.querySelector("[data-ag-berge-lng]"),h=e.querySelector("[data-ag-berge-loc-label]");p&&(p.value=c.lat),f&&(f.value=c.lon),h&&(h.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!a.contains(o.target)&&(a.hidden=!0)})}function cs(){ds(I)}let V=null,mt=null;function Xt(){V&&setTimeout(()=>V.invalidateSize(),150)}async function gs(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function zn(e){const t=d("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await gs()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const o=[[45.8,5.9],[47.8,10.5]],i=[[35,-11],[71,32]];if(!V){V=n.map(r).fitBounds(o),n.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',subdomains:"abcd",maxZoom:19}).addTo(V);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),l.classList.add("is-active");const c=l.dataset.mapView==="eu"?i:o;V.fitBounds(c)})})}mt?mt.clearLayers():mt=n.layerGroup().addTo(V),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${D(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Mt(u)}</div>`:""}
    `;const p=document.createElement("button");p.type="button",p.textContent="Zum Eintrag",p.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",p.addEventListener("click",()=>{l.closePopup();const f=I.querySelector(`[data-ag-gipfel-id="${s.id}"]`);f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("ag-gipfel-highlight"),setTimeout(()=>f.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(p),l.bindPopup(c),mt.addLayer(l)}),requestAnimationFrame(()=>{V&&V.invalidateSize()}),setTimeout(()=>{V&&V.invalidateSize()},250)}const $n=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function Mn(e){return $n[Math.min(e-1,$n.length-1)]}function Ee(e,t){return e+Math.random()*(t-e)}function Bn(){const e=d("#ag-baerlauch-level");e&&(e.textContent=`Level ${g.baerlauch.level}`)}function _e(){g.baerlauch.timerId&&(clearInterval(g.baerlauch.timerId),g.baerlauch.timerId=null)}function Dn(e){const t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");i&&(i.hidden=!0),_e(),g.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),o&&(o.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Nn(R(),g.baerlauch.level,!1),ta()}function ps(){const e=d("#ag-baerlauch-success"),t=d("#ag-baerlauch-reward"),a=d("#ag-baerlauch-photo"),n=d("#ag-baerlauch-text"),r=d("#ag-baerlauch-actions"),o=d("#ag-baerlauch-next");_e(),g.baerlauch.level+=1;const i=fs(R(),g.baerlauch.level);if(Nn(R(),g.baerlauch.level,!0),ta(),Bn(),i&&ee(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&g.photos&&g.photos.length){const s=Pe(),l=s.length?s[Math.floor(Math.random()*s.length)]:null;Xn(a,l),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}o&&(o.textContent=`Level ${g.baerlauch.level} starten`),r&&(r.hidden=!1)}function us(e){const t=d("#ag-baerlauch-timer"),a=d("#ag-baerlauch-darkness"),r=Mn(g.baerlauch.level).timeMs;g.baerlauch.durationMs=r,g.baerlauch.startedAt=performance.now(),_e(),g.baerlauch.timerId=setInterval(()=>{const o=performance.now()-g.baerlauch.startedAt,i=Math.max(0,r-o),s=Math.min(1,o/r);t&&(t.textContent=(i/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);l.forEach(u=>{u.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,u.style.opacity=String(1-c*.28)}),i<=0&&(_e(),e())},50)}function ea(){const e=d("#ag-baerlauch-panel"),t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!o)return;if(e.hidden=!1,ta(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),g.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",o.textContent="",i&&(i.hidden=!0),Bn();const s=Mn(g.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...l.slice(0,s.good).map(h=>({emoji:h,good:!0})),...c.slice(0,s.bad).map(h=>({emoji:h,good:!1}))];let p=0;const f=u.filter(h=>h.good).length;u.forEach(h=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=h.emoji,b.dataset.good=h.good?"true":"false",b.style.left=`${Ee(8,82)}%`,b.style.top=`${Ee(10,72)}%`,b.style.setProperty("--dx",`${Ee(-320,320)}px`),b.style.setProperty("--dy",`${Ee(-220,220)}px`),b.style.setProperty("--dur",`${Ee(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${Ee(-1.8,0)}s`),b.addEventListener("click",()=>{g.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,p+=1,setTimeout(()=>b.remove(),140),p===f&&ps()):Dn("poison"))}),t.appendChild(b)}),us(()=>Dn("timeout"))}function ms(){const e=d("#ag-baerlauch-panel");_e(),e&&(e.hidden=!0)}function fs(e,t){var r;const a=_t(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const o=(r=g.backup)==null?void 0:r.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Nn(e,t,a){var i;const n=Ra(),r=((i=g.theme)==null?void 0:i.timezone)||"UTC",o=N(r);n.unshift({date:o,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function ta(){var p;const e=d("#ag-baerlauch-scores");if(!e)return;const a=R()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",r=_t(),o=Ra(),i=a==="fionn"?"lennart":"fionn",s=a in r||i in r;if(!s&&!o.length){e.hidden=!0;return}e.hidden=!1;const l=((p=g.theme)==null?void 0:p.timezone)||"UTC",c=f=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:l}).format(new Date(f+"T12:00:00Z"))}catch{return f}};let u="";if(s){const f=r[a]??0,h=r[i]??0;u+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${f||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${h||"—"}</span></div>
    </div>`}if(o.length){const f=o.slice(0,8).map(h=>{const b=h.player===a,x=b?"ag-score-mine":"ag-score-theirs",v=b?"Du":n,w=h.won?`✓ Level ${h.level}`:`✗ Level ${h.level-1>=1?h.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(h.date)}</span><span class="ag-score-pill ${x}">${v}</span><span class="ag-score-result">${w}</span></div>`}).join("");u+=`<div class="ag-score-table">${f}</div>`}e.innerHTML=u}const M={recorder:null,audioBlob:null,lang:"swabian"};function ft(){try{return JSON.parse(window.localStorage.getItem(Na)||"[]")||[]}catch{return[]}}function ht(e){try{window.localStorage.setItem(Na,JSON.stringify(e))}catch{}}function hs(e){const t=ft();t.unshift(e),ht(t),K("glossary"),aa("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function bs(e,t){const a=ft(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,ht(a),K("glossary"),aa("glossary-upsert",r)}function ys(e){ht(ft().filter(t=>t.id!==e)),K("glossary"),aa("glossary-delete",{id:e})}let bt=!1;async function Pn(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=B(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let o;try{o=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!o.ok)return 0;const i=await o.json();return!i.ok||!Array.isArray(i.glossary)?0:(ot("glossary")||ht(i.glossary.filter(s=>s.id)),i.glossary.length)}catch{return 0}}function aa(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:B(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function na(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function vs(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return na(e);try{const n=await na(e),r=n.split(",")[1],o=e.type||"audio/webm",i=JSON.stringify({type:"glossary-audio",token:B(),filename:`glossary-${t}.webm`,mimeType:o,data:r}),l=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i})).json();return l.ok&&l.url?l.url:n}catch{return na(e)}}const xs={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function ws(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${D(xs[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${D(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${D(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${D(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${D(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${D(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),A(6)});const o=a.querySelector("[data-ag-glossary-edit]");o&&o.addEventListener("click",()=>{var f;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const p=document.getElementById("ag-glossary-audio-status");p&&(p.textContent=e.audioUrl?"Aufnahme vorhanden":""),M.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(f=document.getElementById("ag-glossary-word-input"))==null||f.focus(),A(8)});const i=a.querySelector("[data-ag-glossary-del]");return i&&i.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(ys(e.id),fe(M.lang),A(8))}),a}function fe(e){var i;M.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===M.lang)}),qn();const n=(((i=document.getElementById("ag-glossary-search"))==null?void 0:i.value)||"").trim().toLowerCase(),r=ft(),o=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===M.lang);if(t.innerHTML="",!o.length){a&&(a.textContent=n?"Kein Treffer.":bt?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",bt&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),o.forEach(s=>t.appendChild(ws(s,!!n)))}function qn(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function _n(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),M.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),bt=!0,fe("swabian"),window.requestAnimationFrame(()=>qn()),A(10),Pn().catch(()=>0).then(()=>{bt=!1,fe(M.lang)})}function ks(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),M.audioBlob=null,M.recorder&&M.recorder.state!=="inactive")try{M.recorder.stop()}catch{}M.recorder=null}const Un=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],jn=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function On(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(ve)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(ve,"granted")}catch{}await oa();return}if(e==="denied"){try{window.localStorage.setItem(ve,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function Ss(){var s;const e=((s=g.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,o=8*60,i=r<o?o-r:24*60-r+o;return Date.now()+i*60*1e3}async function ra(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=B(),r=N(a);if(U().some(p=>p.token===n&&p.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:i,m:s}=$t(a);if(i>=21)return;const l=((21-i)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=je(),u=jn[_a(jn)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:u.title.replace("{name}",c),body:u.body.replace("{name}",c)})}catch{}}async function Es(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=je(),o=Un[_a(Un)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Ss(),title:o.title.replace("{name}",r),body:o.body.replace("{name}",r)}),(t=g.quest)!=null&&t.enabled&&Sn()){const i=Ie(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!i.solved&&s!==Ke(g)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Ke(g)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:g.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:g.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Ts(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function oa(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",Kt()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await Es(),await ra(),await Ts(),await As())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Cs(){const e=d("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(ve,"dismissed")}catch{}return}try{window.localStorage.setItem(ve,"granted")}catch{}await oa()}function Ls(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}async function As(){const e=g.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ls(e.vapidPublicKey)}));const n=g.backup&&g.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:B(),subscription:a.toJSON()}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,o).catch(()=>fetch(n,{...o,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}function Ue(e){g.activeTab=e,I.querySelectorAll("[data-ag-tab]").forEach(i=>{const s=i.dataset.agTab===e;i.classList.toggle("is-active",s),i.setAttribute("aria-selected",s?"true":"false")});const a=54,n=I.querySelector(".ag-bottomnav-btn.is-active"),r=I.querySelector(".ag-nav-pill");if(r&&n){const i=n.closest(".ag-bottomnav"),s=i?i.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const u=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${u-a/2}px`}}d("[data-ag-panel-today]").hidden=e!=="today",d("[data-ag-panel-history]").hidden=e!=="history",d("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",d("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&Q(),e==="lieblinge"&&kt(),e==="berge"&&(Xt(),qe({loading:!0}),Xt(),Ne().catch(()=>{}).then(()=>{qe(),Xt()}));const o=d("[data-ag-fab]");o&&(o.hidden=e!=="berge")}function Fn(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=d("[data-ag-ping-send]"),a=d("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:B(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,r).then(o=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...r,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function Te(e,t){const a=d("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function Hn(){const e=g.wishInbox,t=d("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:B(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Te("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){Te("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Te("Stups wird gesendet…","pending");const o=JSON.stringify(n),i=()=>{Te("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{Te("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l=>{l&&l.ok?i():s()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(i).catch(s)}catch{s()}})}function Rn(e){const t=B();if(t==="fionn")return;const a=g.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const o=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,i={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:o,message:o,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(i),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function ia(e){const t=g.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:B(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),o=i=>{const s=Pt();!s||s.week!==e.week||(Fa({...s,remoteStatus:i,remoteUpdatedAt:Date.now()}),ba())};o("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(i=>{i&&i.ok?o("sent"):o("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>o("sent")).catch(()=>o("failed"))}catch{o("failed")}})}function Wn(){const e=Pt();!e||e.week!==Bt()||e.remoteStatus!=="sent"&&ia(e)}function sa(e,t,a,n,r,o){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,o);else{const i=Array.isArray(o)?o:[o,o,o,o],[s,l,c,u]=i.map(p=>Math.min(p,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+u,a+r),e.quadraticCurveTo(t,a+r,t,a+r-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function la(e,t,a){const n=t.split(" "),r=[];let o="";for(const i of n){const s=o?`${o} ${i}`:i;e.measureText(s).width>a&&o?(r.push(o),o=i):o=s}return o&&r.push(o),r}function Gn(e){var z,L;const r=document.createElement("canvas"),o=Math.min(window.devicePixelRatio||1,2);r.width=640*o,r.height=340*o,r.style.width="640px",r.style.height="340px";const i=r.getContext("2d");i.scale(o,o);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",u=i.createLinearGradient(0,0,0,340);u.addColorStop(0,l),u.addColorStop(1,c),i.fillStyle=u,sa(i,0,0,640,340,20),i.fill();const p=s?"#b9782e":"#2f7a4f";i.fillStyle=p,sa(i,0,0,640,5,[20,20,0,0]),i.fill();const f=e.category.label,h=gn(e.category.tone);i.font="bold 13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle=s?"#d4a24c":"#5aba7e",i.fillText(`${h} ${f}`,40,62);const b=e.day;i.font="13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.45)";const x=i.measureText(b).width;i.fillText(b,600-x,62),i.strokeStyle="rgba(255,255,255,0.1)",i.lineWidth=1,i.beginPath(),i.moveTo(40,76),i.lineTo(600,76),i.stroke(),i.font="bold 24px Boska, Georgia, serif",i.fillStyle="#ffffff";const v=la(i,e.outcome.title,640-40*2);let w=108;for(const j of v)i.fillText(j,40,w),w+=32;i.font="15px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.72)";const y=la(i,e.outcome.message,640-40*2);w+=4;for(const j of y){if(w>270)break;i.fillText(j,40,w),w+=22}i.font="11px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.25)";const S=((L=(z=g.theme)==null?void 0:z.brand)==null?void 0:L.machineName)||"Affektions-Gacha";i.fillText(S,40,324);const C=document.createElement("a");C.download=`gacha-${e.category.id}-${e.day}.png`,C.href=r.toDataURL("image/png"),C.click()}function da(e){I.style.opacity="1",I.style.background="#0a1410",I.style.minHeight="100vh",I.style.display="flex",I.style.alignItems="center",I.style.justifyContent="center",I.style.padding="24px",I.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${D(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function Kn(){g.todaysPull||(g.todaysPull=xi());const e=d("[data-ag-draw]"),t=d("[data-ag-button-text]"),a=g.theme.loadingSteps||["Maschine rattert"];let n=0;I.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((g.theme.revealDelayMs||3200)/a.length))),o=g.theme.revealDelayMs||3200,i=Array.from((d("[data-ag-emoji-orbit]")||{children:[]}).children),s=i.map(p=>parseFloat(p.style.getPropertyValue("--ag-emoji-duration"))||20),l=performance.now();let c;function u(p){const f=Math.min((p-l)/o,1),h=1+5*f*f;i.forEach((b,x)=>{b.style.setProperty("--ag-emoji-duration",`${(s[x]/h).toFixed(3)}s`)}),f<1&&(c=requestAnimationFrame(u))}c=requestAnimationFrame(u),window.setTimeout(()=>{var x,v,w,y;window.clearInterval(r),cancelAnimationFrame(c),i.forEach((S,C)=>{S.style.setProperty("--ag-emoji-duration",`${s[C].toFixed(2)}s`)});const p=U().some(S=>S.day===g.todaysPull.day&&S.token===g.todaysPull.token);g.todaysPull.collectToken&&!p&&Ua(g.todaysPull.collectToken),g.todaysPull.freikarte&&!p&&Oa(g.todaysPull.token),xt(g.todaysPull),I.classList.remove("is-revealing"),I.classList.add("is-revealed"),I.classList.add("has-drawn"),e.disabled=!1,t.textContent=g.theme.brand.buttonShown,g.revealed=!0,se()||Js(g.todaysPull),ra();const f=oe();ga(),qs(f);const h=(v=(x=g.todaysPull)==null?void 0:x.category)==null?void 0:v.id,b=(y=(w=g.todaysPull)==null?void 0:w.category)==null?void 0:y.tone;if(h==="special"){const S=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ee(130,S),setTimeout(()=>ee(90,S),700),ut("special")}else if(b==="jackpot"){const S=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ee(120,S),setTimeout(()=>ee(80,S),650),ut("jackpot")}else b==="rare"?(ee(70),ut("rare")):ut(b||"common");se()||Promise.resolve().then(()=>Sl).then(S=>S.flashLightsForPull()).catch(()=>{}),Vn[f]?A([30,20,30,20,60]):A([20,20,40]),g.activeTab==="history"&&Q(),On()},g.theme.revealDelayMs||3200)}function Yn(){var pr,ur,mr,fr,hr,br,yr,vr,xr,wr,kr,Sr,Er,Tr,Cr,Lr,Ar,Ir,zr,$r,Mr,Br,Dr,Nr,Pr,qr,_r,Ur,jr,Or,Fr,Hr,Rr,Wr,Gr,Kr,Yr,Jr,Vr,Zr,Qr,Xr,eo,to,ao,no,ro;let e=null;const t=d("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(Ln,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;d("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,Ln();return}n=setTimeout(()=>{a=0},1800)}),d("[data-ag-draw]").addEventListener("click",()=>{A(12),Kn()}),(pr=d("#ag-btn-rave"))==null||pr.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(ur=d("#ag-btn-rave"))==null||ur.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(mr=d("#ag-btn-baerlauch"))==null||mr.addEventListener("click",ea),(fr=d("#ag-baerlauch-close"))==null||fr.addEventListener("click",ms),(hr=d("#ag-baerlauch-next"))==null||hr.addEventListener("click",ea),(br=d("#ag-btn-baerlauch"))==null||br.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),ea())}),(yr=d("#ag-btn-gesprach"))==null||yr.addEventListener("click",wn),(vr=d("#ag-btn-glossary"))==null||vr.addEventListener("click",_n),(xr=d("#ag-btn-glossary"))==null||xr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),_n())}),(wr=d("#ag-glossary-close"))==null||wr.addEventListener("click",ks),(kr=document.getElementById("ag-glossary-refresh"))==null||kr.addEventListener("click",async()=>{const m=document.getElementById("ag-glossary-refresh");m&&(m.disabled=!0,m.textContent="⏳"),A(6);const k=await Pn();fe(M.lang),m&&(m.textContent=k>0?`↻${k}`:"↻",setTimeout(()=>{m.textContent="↻",m.disabled=!1},3e3)),k>0&&Y(`${k} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(m=>{m.addEventListener("click",()=>{const k=document.getElementById("ag-glossary-search");k&&(k.value=""),fe(m.dataset.lang),A(4)})}),(Sr=document.getElementById("ag-glossary-search"))==null||Sr.addEventListener("input",()=>{fe(M.lang)});const r=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var $,P;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const m=document.getElementById("ag-glossary-form-title");m&&(m.textContent="Neues Wort");const k=document.getElementById("ag-glossary-save-label");k&&(k.textContent="Eintragen");const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent=""),M.audioBlob=null;const T=document.getElementById("ag-glossary-play-preview");T&&(T.hidden=!0),o.hidden=!1,r.hidden=!0,($=d("[data-ag-sheet-backdrop]"))==null||$.classList.add("is-open"),(P=document.getElementById("ag-glossary-word-input"))==null||P.focus(),A(8)}),(Er=document.getElementById("ag-glossary-form-cancel"))==null||Er.addEventListener("click",()=>{var m;if(o&&(o.hidden=!0),r&&(r.hidden=!1),(m=d("[data-ag-sheet-backdrop]"))==null||m.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",M.audioBlob=null,M.recorder&&M.recorder.state!=="inactive")try{M.recorder.stop()}catch{}M.recorder=null,A(6)}),(Tr=document.getElementById("ag-glossary-form-save"))==null||Tr.addEventListener("click",async()=>{var P,_,G,ue,ie;const m=(((P=document.getElementById("ag-glossary-word-input"))==null?void 0:P.value)||"").trim(),k=(((_=document.getElementById("ag-glossary-meaning-input"))==null?void 0:_.value)||"").trim(),E=(((G=document.getElementById("ag-glossary-edit-id"))==null?void 0:G.value)||"").trim();if(!m){(ue=document.getElementById("ag-glossary-word-input"))==null||ue.focus();return}const T=document.getElementById("ag-glossary-audio-status");let $=null;if(M.audioBlob){T&&(T.textContent="Wird hochgeladen…");const O=E||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;$=await vs(M.audioBlob,O)}if(A([20,20,40]),E){const O={word:m,meaning:k||null};$!==null&&(O.audioUrl=$),bs(E,O)}else hs({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:M.lang,word:m,meaning:k||null,audioUrl:$,token:B()});o&&(o.hidden=!0),r&&(r.hidden=!1),(ie=d("[data-ag-sheet-backdrop]"))==null||ie.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",M.audioBlob=null,M.recorder=null,fe(M.lang),Y("Wort gespeichert ✓")});const i=document.getElementById("ag-glossary-record");i&&i.addEventListener("click",async()=>{if(M.recorder&&M.recorder.state==="recording"){M.recorder.stop();return}try{const m=await navigator.mediaDevices.getUserMedia({audio:!0}),k=[];M.recorder=new MediaRecorder(m),M.recorder.ondataavailable=T=>{T.data.size>0&&k.push(T.data)},M.recorder.onstop=()=>{m.getTracks().forEach(P=>P.stop()),M.audioBlob=new Blob(k,{type:M.recorder.mimeType||"audio/webm"});const T=document.getElementById("ag-glossary-audio-status");T&&(T.textContent="✓ Aufnahme bereit");const $=document.getElementById("ag-glossary-play-preview");$&&($.hidden=!1),i.textContent="🎙 Neu aufnehmen"},M.recorder.start(),i.textContent="⏹ Stop";const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent="● REC"),A(10)}catch{const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent="Mikrofon nicht verfügbar")}}),(Cr=document.getElementById("ag-glossary-play-preview"))==null||Cr.addEventListener("click",()=>{if(!M.audioBlob)return;const m=URL.createObjectURL(M.audioBlob),k=new Audio(m);k.onended=()=>URL.revokeObjectURL(m),k.play().catch(()=>{})}),(Lr=d("#ag-btn-mission"))==null||Lr.addEventListener("click",xn),(Ar=d("#ag-btn-mission"))==null||Ar.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),xn())}),(Ir=d("#ag-mission-close"))==null||Ir.addEventListener("click",qi),(zr=d("#ag-mission-done"))==null||zr.addEventListener("click",()=>{$i();const m=d("#ag-mission-actions"),k=d("#ag-mission-feedback"),E=d("#ag-mission-done-note"),T=d("#ag-btn-mission");m&&(m.hidden=!0),E&&(E.hidden=!1),k&&!vn()&&(k.hidden=!1),T&&T.classList.remove("ag-chip-mission-active")}),($r=d("#ag-mission-panel"))==null||$r.querySelectorAll(".ag-mission-rate-btn").forEach(m=>{m.addEventListener("click",()=>{var k;(k=d("#ag-mission-panel"))==null||k.querySelectorAll(".ag-mission-rate-btn").forEach(E=>E.classList.remove("is-selected")),m.classList.add("is-selected")})}),(Mr=d("#ag-mission-feedback-send"))==null||Mr.addEventListener("click",()=>{var P;const m=d("#ag-mission-panel"),k=m==null?void 0:m.querySelector(".ag-mission-rate-btn.is-selected"),E=(k==null?void 0:k.dataset.rating)||null,T=(((P=d("#ag-mission-comment"))==null?void 0:P.value)||"").trim();Bi(E,T);const $=d("#ag-mission-feedback-sent");m==null||m.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(_=>{_.hidden=!0}),$&&($.hidden=!1)}),(Br=d("#ag-letter-close"))==null||Br.addEventListener("click",Jt),(Dr=d("#ag-letter-overlay"))==null||Dr.addEventListener("click",m=>{m.target===m.currentTarget&&Jt()}),(Nr=d("#ag-lightbox-close"))==null||Nr.addEventListener("click",()=>{ma()}),(Pr=d("#ag-lightbox"))==null||Pr.addEventListener("click",m=>{m.target===m.currentTarget&&ma()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&(Jt(),ma())}),(qr=d("#ag-gesprach-close"))==null||qr.addEventListener("click",_i),(_r=d("#ag-gesprach-next"))==null||_r.addEventListener("click",kn),(Ur=d("#ag-gesprach-wa"))==null||Ur.addEventListener("click",Ui),(jr=d("#ag-btn-gesprach"))==null||jr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),wn())}),(Or=d("#ag-btn-quest"))==null||Or.addEventListener("click",En),(Fr=d("#ag-quest-close"))==null||Fr.addEventListener("click",ji),(Hr=d("#ag-btn-quest"))==null||Hr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),En())}),(Rr=d("#ag-quest-file"))==null||Rr.addEventListener("change",m=>{const k=m.target.files&&m.target.files[0];k&&Oi(k)}),d("[data-ag-copy]").addEventListener("click",async()=>{if(!g.todaysPull)return;A(8);const m=tr(g.todaysPull);try{await navigator.clipboard.writeText(m),d("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{d("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",m)}}),d("[data-ag-save-img]").addEventListener("click",()=>{g.todaysPull&&(A(8),Gn(g.todaysPull))}),d("[data-ag-star]").addEventListener("click",()=>{A(8),Ys(g.todaysPull)}),(Wr=d("[data-ag-freikarte-redeem]"))==null||Wr.addEventListener("click",()=>{const m=g.todaysPull;if(!m)return;const k=m.category.tone;if(k!=="quiet"&&k!=="cursed"||!Fo(m.token))return;const E=oe(),T=wi(m.day,E);Ro(m.token,m.day,{categoryId:T.category.id,outcomeTitle:T.outcome.title}),g.todaysPull={...m,category:T.category,outcome:T.outcome,photo:T.photo,collectToken:T.collectToken,voucher:T.voucher,freikarte:T.freikarte,unlockTime:null,promptAnswer:null};const $=U(),P=$.findIndex(_=>_.day===m.day&&_.token===m.token);P!==-1&&($[P]={...$[P],categoryId:T.category.id,categoryLabel:T.category.label,tone:T.category.tone,title:T.outcome.title,message:T.outcome.message,link:T.outcome.link||null,unlockTime:null,promptAnswer:null,photo:T.photo?{url:T.photo.url,alt:T.photo.alt||"",caption:(T.photo.caption||"").trim(),type:T.photo.type==="video"?"video":"image"}:null,voucher:T.voucher||!1},de($)),g.todaysPull.collectToken&&Ua(g.todaysPull.collectToken),g.todaysPull.freikarte&&Oa(g.todaysPull.token),X(),xt(g.todaysPull),g.activeTab==="history"&&Q(),ee(50),Y("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),A([20,20,40])});const s=d("[data-ag-streak-restore]");s&&s.addEventListener("click",()=>{if(!Ja()){pa();return}const m=Ft(),k=Ot(),T=rt()>0&&k-rt()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${m}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${m}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${k-1} Streak-Retter übrig.`;if(!window.confirm(T))return;s.disabled=!0;const P=ei();Q(),ga(),P&&(ee(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),A([30,20,30,20,60])),pa(),s.disabled=!1});const l=d("[data-ag-sync-btn]");l&&l.addEventListener("click",async()=>{l.textContent="⏳",l.disabled=!0;const m=await Ne();Q(),l.textContent=m<0?"✗":`✓${m}`,setTimeout(()=>{l.textContent="☁",l.disabled=!1},3e3)}),I.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(m=>{m.addEventListener("click",()=>{A(5),zs(m.dataset.agFilter)})}),I.querySelectorAll("[data-ag-tab]").forEach(m=>{m.addEventListener("click",()=>{A(6),Ue(m.dataset.agTab)})});const c=I.querySelector(".ag-bottomnav");if(c){const m=c.querySelector(".ag-nav-pill"),k=[...c.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let E=null;c.addEventListener("pointerdown",$=>{const P=c.getBoundingClientRect(),_=parseFloat(m==null?void 0:m.style.width)||54;E={id:$.pointerId,startX:$.clientX-P.left,pillStartCentre:(parseFloat(m==null?void 0:m.style.left)||0)+_/2,pillWidth:_,moved:!1,suppress:!1,captured:!1}}),c.addEventListener("pointermove",$=>{if(!E||$.pointerId!==E.id)return;const P=c.getBoundingClientRect(),_=$.clientX-P.left-E.startX;if(!E.moved&&Math.abs(_)<6||(E.captured||(c.setPointerCapture($.pointerId),E.captured=!0),E.moved=!0,E.suppress=!0,!m))return;m.style.transition="none";const G=c.getBoundingClientRect(),ue=E.pillStartCentre+_,ie=E.pillWidth/2;let O=ue-ie;O<0?O=O*.25:O+E.pillWidth>G.width&&(O=G.width-E.pillWidth+(O+E.pillWidth-G.width)*.25),m.style.left=`${O}px`});const T=$=>{if(!E||$.pointerId!==E.id)return;const P=E.moved,_=E.suppress;if(E=null,m&&(m.style.transition=""),!P)return;const G=c.getBoundingClientRect(),ue=$.clientX-G.left;let ie=k[0],O=1/0;if(k.forEach(ye=>{const me=ye.getBoundingClientRect(),Et=me.left-G.left+me.width/2,We=Math.abs(ue-Et);We<O&&(O=We,ie=ye)}),A(6),Ue(ie.dataset.agTab),_){const ye=me=>{me.stopImmediatePropagation(),me.preventDefault()};c.addEventListener("click",ye,{capture:!0,once:!0})}};c.addEventListener("pointerup",T),c.addEventListener("pointercancel",$=>{!E||$.pointerId!==E.id||(E=null,m&&(m.style.transition=""),Ue(g.activeTab))})}I.addEventListener("ag-synced",()=>{var m;try{ct(),vt(),(m=document.getElementById("ag-werkstatt-panel"))!=null&&m.hidden||De()}catch{}}),(Gr=d("[data-ag-werkstatt-open]"))==null||Gr.addEventListener("click",gi),(Kr=d("#ag-werkstatt-close"))==null||Kr.addEventListener("click",pi),(Yr=document.getElementById("ag-werkstatt-add"))==null||Yr.addEventListener("click",()=>dn(null)),(Jr=document.getElementById("ag-werkstatt-cancel"))==null||Jr.addEventListener("click",ke),(Vr=document.getElementById("ag-werkstatt-delete"))==null||Vr.addEventListener("click",fi),(Zr=document.getElementById("ag-werkstatt-save"))==null||Zr.addEventListener("click",()=>{hi(),ct()}),(Qr=d("#ag-btn-skincare"))==null||Qr.addEventListener("click",In),(Xr=d("#ag-btn-skincare"))==null||Xr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),In())}),(eo=d("#ag-skincare-close"))==null||eo.addEventListener("click",Xi),(to=d("#ag-btn-stimmung"))==null||to.addEventListener("click",an),(ao=d("#ag-btn-stimmung"))==null||ao.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),an())}),(no=d("#ag-stimmung-close"))==null||no.addEventListener("click",oi),ii();const u=d("[data-ag-berge-add]"),p=d("[data-ag-berge-form]"),f=d("[data-ag-berge-cancel]"),h=d("[data-ag-berge-save]");u&&u.addEventListener("click",()=>{var k,E;A(8);const m=d("[data-ag-berge-date]");m&&!m.value&&(m.value=N(((k=g.theme)==null?void 0:k.timezone)||"Europe/Zurich")),p.hidden=!1,u.hidden=!0,(E=d("[data-ag-sheet-backdrop]"))==null||E.classList.add("is-open"),d("[data-ag-berge-name]").focus()}),f&&f.addEventListener("click",()=>{var $;A(6),p.hidden=!0,u.hidden=!1,($=d("[data-ag-sheet-backdrop]"))==null||$.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(P=>{const _=d(P);_&&(_.value="")});const m=d("[data-ag-loc-search]");m&&(m.value="");const k=d("[data-ag-loc-dropdown]");k&&(k.hidden=!0,k.innerHTML="");const E=d("[data-ag-berge-form-title]");E&&(E.textContent="Neuer Gipfeleintrag");const T=d("[data-ag-berge-save] span:last-child");T&&(T.textContent="Eintragen")}),h&&h.addEventListener("click",()=>{var oo,io,so,lo,co,go,po,uo,mo,fo,ho,bo,yo,vo;const m=(((oo=d("[data-ag-berge-name]"))==null?void 0:oo.value)||"").trim(),k=parseFloat(((io=d("[data-ag-berge-dist]"))==null?void 0:io.value)||""),E=parseInt(((so=d("[data-ag-berge-gain]"))==null?void 0:so.value)||"",10),T=((lo=d("[data-ag-berge-date]"))==null?void 0:lo.value)||N(((co=g.theme)==null?void 0:co.timezone)||"Europe/Zurich"),$=(((go=d("[data-ag-berge-url]"))==null?void 0:go.value)||"").trim(),P=(((po=d("[data-ag-berge-cover]"))==null?void 0:po.value)||"").trim(),_=(((uo=d("[data-ag-berge-notes]"))==null?void 0:uo.value)||"").trim(),G=(((mo=d("[data-ag-berge-edit-id]"))==null?void 0:mo.value)||"").trim(),ue=(((fo=d("[data-ag-berge-lat]"))==null?void 0:fo.value)||"").trim()||null,ie=(((ho=d("[data-ag-berge-lng]"))==null?void 0:ho.value)||"").trim()||null,O=(((bo=d("[data-ag-berge-loc-label]"))==null?void 0:bo.value)||"").trim()||null;if(!m){(yo=d("[data-ag-berge-name]"))==null||yo.focus();return}A([20,20,40]);const ye={name:m,elevation:null,distance:isNaN(k)?null:k,elevGain:isNaN(E)?null:E,date:T,activityUrl:$||null,cover:P||null,notes:_||null,lat:ue,lng:ie,locLabel:O};G?ss(G,ye):os({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...ye,token:B()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(El=>{const xo=d(El);xo&&(xo.value="")});const me=d("[data-ag-loc-search]");me&&(me.value="");const Et=d("[data-ag-berge-form-title]");Et&&(Et.textContent="Neuer Gipfeleintrag");const We=d("[data-ag-berge-save] span:last-child");We&&(We.textContent="Eintragen"),p.hidden=!0,u.hidden=!1,(vo=d("[data-ag-sheet-backdrop]"))==null||vo.classList.remove("is-open"),qe(),Y("Gipfel gespeichert ✓")}),cs();const b=d("[data-ag-ping-card]");b&&(b.hidden=!(B()==="fionn"&&((ro=g.backup)!=null&&ro.enabled)));const x=d("[data-ag-ping-dismiss]");x&&x.addEventListener("click",()=>{const m=d("[data-ag-ping-banner]");m&&(m.hidden=!0)});const v=d("[data-ag-ping-send]");v&&v.addEventListener("click",()=>{A([20,30,20]);try{Fn()}catch{}});const w=d("[data-ag-hug-send]");w&&w.addEventListener("click",()=>{A([20,30,20]);try{Hn()}catch{}});const y=d("[data-ag-wish-open]"),S=d("[data-ag-wish-cancel]"),C=d("[data-ag-wish-submit]");y&&y.addEventListener("click",()=>{A(8),d("[data-ag-wish-idle]").hidden=!0,d("[data-ag-wish-form]").hidden=!1;const m=d("[data-ag-wish-input]");m&&window.setTimeout(()=>m.focus(),60)}),S&&S.addEventListener("click",()=>{A(6),d("[data-ag-wish-form]").hidden=!0,d("[data-ag-wish-idle]").hidden=!1}),C&&C.addEventListener("click",()=>{const m=d("[data-ag-wish-input]"),k=((m==null?void 0:m.value)||"").trim();if(!k)return;A([20,20,40]);const E={week:Bt(),text:k,submittedAt:Date.now(),remoteStatus:"idle"};Fa(E),ba();try{ia(E)}catch{}});const z=d("[data-ag-notif-enable]"),L=d("[data-ag-notif-dismiss]");z&&z.addEventListener("click",()=>{A(10),Cs()}),L&&L.addEventListener("click",()=>{A(6);try{window.localStorage.setItem(ve,"dismissed")}catch{}const m=d("[data-ag-notif-card]");m&&(m.hidden=!0)});const j=d("[data-ag-sheet-backdrop]");j&&j.addEventListener("click",()=>{A(6);const m=d("[data-ag-berge-form]"),k=d("[data-ag-berge-add]");m&&!m.hidden&&(m.hidden=!0,k&&(k.hidden=!1));const E=document.getElementById("ag-glossary-form"),T=document.getElementById("ag-glossary-add");E&&!E.hidden&&(E.hidden=!0,T&&(T.hidden=!1)),j.classList.remove("is-open")});const te=d("[data-ag-fab]");te&&te.addEventListener("click",()=>{A(8);const m=d("[data-ag-berge-add]");m&&!m.hidden&&m.click()});const F=["today","history","lieblinge","berge"];let he=0,He=0;const Re=d(".ag-content")||I;Re.addEventListener("touchstart",m=>{he=m.touches[0].clientX,He=m.touches[0].clientY},{passive:!0}),Re.addEventListener("touchend",m=>{const k=m.changedTouches[0].clientX-he,E=Math.abs(m.changedTouches[0].clientY-He);if(Math.abs(k)>52&&E<44){const T=F.indexOf(g.activeTab),$=k<0?Math.min(T+1,F.length-1):Math.max(T-1,0);$!==T&&(A(6),Ue(F[$]))}},{passive:!0});const pe=d("[data-ag-ptr]");let be=0,St=!1;document.addEventListener("touchstart",m=>{window.scrollY===0&&(be=m.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",m=>{if(!be)return;m.touches[0].clientY-be>64&&!St&&pe&&(St=!0,pe.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{St&&pe&&(pe.classList.add("is-loading"),await Ne(),g.activeTab==="berge"&&qe(),g.activeTab==="history"&&Q(),pe.classList.remove("is-visible","is-loading"),Y("Aktualisiert ✓")),be=0,St=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const m=document.querySelector(".ag-widget");m==null||m.classList.toggle("ag-paused",document.hidden)})}const Is=Object.freeze(Object.defineProperty({__proto__:null,bindEvents:Yn,downloadResultAsImage:Gn,drawRoundRect:sa,escapeHtml:D,notifyPartnerVoucherRedeemed:Rn,renderError:da,retryPendingWishSend:Wn,reveal:Kn,sendHugToInbox:Hn,sendPingToBackend:Fn,sendWishToInbox:ia,setActiveTab:Ue,setHugStatus:Te,showToast:Y,wrapText:la},Symbol.toStringTag,{value:"Module"}));let ge=null,Z="all";function zs(e){Z=e==="vouchers"||e==="open"?e:"all",ha=fa,Q()}function ca(e){return e?D(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function je(){return B().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||g.theme.brand.displayNameDefault||"Lennart"}function $s(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function Ms(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:g.theme.timezone}).format(e)}catch{return N(g.theme.timezone)}}const Bs=["🚴","🧄"],Ds=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Jn(){const e=N(g.theme.timezone),t=B();return`${g.theme.secret}|${t}|${e}|emoji`}function Ns(){const e=Jn(),t=3+Math.floor(ne(`${e}|count`)*3),a=Ds.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const o=Math.floor(ne(`${e}|pick|${r}`)*a.length);n.push(a.splice(o,1)[0])}return[...Bs,...n]}function Ps(){const e=d("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Ns(),a=t.length,n=Jn();t.forEach((r,o)=>{const i=document.createElement("span");i.className="ag-emoji",i.textContent=r;const s=360/a*o,l=(ne(`${n}|angle|${o}`)-.5)*28,c=s+l,u=ne(`${n}|radius|${o}`)*21-10.5,p=16+ne(`${n}|dur|${o}`)*10,f=-ne(`${n}|delay|${o}`)*p,h=ne(`${n}|dir|${o}`)>.5?1:-1;i.style.setProperty("--ag-emoji-angle",`${c}deg`),i.style.setProperty("--ag-emoji-radius",`${250+u}%`),i.style.setProperty("--ag-emoji-duration",`${p.toFixed(2)}s`),i.style.setProperty("--ag-emoji-delay",`${f.toFixed(2)}s`),i.style.setProperty("--ag-emoji-direction",h===1?"normal":"reverse"),e.appendChild(i)})}function ga(){const e=d("[data-ag-streak]"),t=oe(),a=Ae();if(t>(a.maxStreak||0)&&Ha({...a,maxStreak:t}),e){const n=Ga(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}pa()}function pa(){const e=d("[data-ag-streak-restore]");e&&(e.hidden=!Ja())}const Vn={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function qs(e){const t=d("[data-ag-milestone]");if(!t)return;const a=Vn[e];if(!a){t.hidden=!0;return}const n=B();if(Zo(n,e)){t.hidden=!0;return}d("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Qo(n,e)}function _s(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((l,c)=>{const u=document.createElement("div");u.className="ag-prompt-field";const p=document.createElement("p");p.className="ag-prompt-question",p.textContent=(c===0?"💭 ":"🌱 ")+l;const f=document.createElement("textarea");return f.className="ag-prompt-textarea",f.placeholder="Schreib hier deine Antwort...",f.rows=a.length>1?3:4,f.setAttribute("aria-label",l),u.appendChild(p),u.appendChild(f),n.appendChild(u),{question:l,textarea:f}}),o=document.createElement("p");o.className="ag-pin-err",o.hidden=!0,o.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const i=document.createElement("button");i.type="button",i.className="ag-button",i.style.cssText="width:100%;margin-top:4px",i.textContent="Kapsel öffnen ✨";function s(){const l=r.filter(u=>!u.textarea.value.trim());if(l.length){o.hidden=!1;for(const u of l)u.textarea.classList.add("ag-pin-shake"),setTimeout(()=>u.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(u=>u.question+`
`+u.textarea.value.trim()).join(`

`);t(c)}i.addEventListener("click",s);for(const l of r)l.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(o),n.appendChild(i),n}function Us(e){return Array.isArray(e)?e.join(`
`):e}function js(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:Us(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Os(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const o=document.createElement("div");o.className="ag-pin-row";const i=document.createElement("input");i.type="text",i.inputMode="numeric",i.pattern="[0-9]*",i.maxLength=4,i.className="ag-pin-input",i.placeholder="_ _ _ _",i.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function c(){i.value.trim()===e?t():(l.hidden=!1,i.classList.add("ag-pin-shake"),i.value="",setTimeout(()=>i.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),i.addEventListener("keydown",u=>{u.key==="Enter"&&c()}),o.appendChild(i),o.appendChild(s),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function Fs(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const o=document.createElement("p");o.className="ag-pin-hint",o.style.marginTop="10px",o.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const i=document.createElement("div");i.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),yt(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",u),s.addEventListener("keydown",p=>{p.key==="Enter"&&u()}),i.appendChild(s),i.appendChild(l),n.appendChild(r),n.appendChild(o),n.appendChild(i),n.appendChild(c),n}function Hs(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const i=document.createElement("iframe");return i.src=`https://open.spotify.com/embed/${n}/${r}`,i.width="100%",i.height=n==="track"||n==="episode"?"80":"152",i.setAttribute("frameborder","0"),i.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",i.loading="lazy",i.setAttribute("allowtransparency","true"),i.setAttribute("title","Spotify player"),i.className="ag-spotify-iframe",i}catch{return null}}function Zn(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function yt(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=ae(t);if(!a){e.hidden=!0;return}const n=Hs(a);e.appendChild(n||Zn(a)),e.hidden=!1}function Rs(e){const t=d("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||se()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),o=e.token,i=U().filter(p=>p.token===o&&typeof p.day=="string"&&p.day.slice(5)===n&&Number(p.day.slice(0,4))<r).sort((p,f)=>f.day.localeCompare(p.day));if(!i.length)return;const s=i[0],l=r-Number(s.day.slice(0,4)),c=d("[data-ag-memory-label]"),u=d("[data-ag-memory-text]");c&&(c.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),u&&(u.textContent=s.title||""),t.hidden=!1}function Qn(e){const t=It(e),a=zt(e);if(_o(e),X(),g.wishInbox&&g.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:B(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(g.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Ws(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=xe()[a]||0,r=zt(a),o=It(a);if(n>=o)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(o)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${o} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{Qn(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',vt()});else{const s=o-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(o-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function vt(){const e=d("[data-ag-tokenbank]");if(!e)return;const t=xe(),a=Object.keys(At).map(l=>{const c=It(l),u=Math.min(t[l]||0,c);return{emoji:l,goal:c,count:u,raw:t[l]||0,reward:zt(l),done:(t[l]||0)>=c}}),n=a.reduce((l,c)=>l+c.raw,0),r=a.filter(l=>l.done).length,o=a.filter(l=>l.raw>0),i=a.length-o.length;o.sort((l,c)=>c.done-l.done||c.count/c.goal-l.count/l.goal||l.goal-c.goal);const s=d("[data-ag-tokenbank-head]");if(s){const l=i?` · ${i} ${i===1?"Sorte":"Sorten"} noch unentdeckt`:"";s.textContent=n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`}e.innerHTML="";for(const l of o){const c=document.createElement("div");if(c.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${D(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const u=document.createElement("button");u.type="button",u.className="ag-tokenrow-redeem",u.textContent="Einlösen",u.addEventListener("click",()=>{Qn(l.emoji),A([12,30,12]),Y(`${l.emoji} eingelöst — Fionn weiss Bescheid`),vt()}),c.appendChild(u)}e.appendChild(c)}}function Xn(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let o;if(t.type==="video"){const i=$o(t.url);if(i){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${i}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",p),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const f=document.createElement("iframe");f.src=`https://drive.google.com/file/d/${i}/preview?autoplay=1`,f.allow="autoplay",f.setAttribute("allowfullscreen",""),f.setAttribute("frameborder","0"),f.setAttribute("aria-label",a),f.className="ag-drive-iframe",s.appendChild(f)},p=f=>{(f.key==="Enter"||f.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",p),o=s}else o=document.createElement("video"),o.src=ae(t.url),o.controls=!0,o.muted=!0,o.playsInline=!0,o.setAttribute("playsinline",""),o.setAttribute("preload","metadata"),o.setAttribute("aria-label",a),o.className="ag-media-content"}else o=document.createElement("img"),o.alt=a,o.loading="eager",o.decoding="auto",o.className="ag-media-content",o.addEventListener("load",()=>{const i=o.naturalWidth&&o.naturalHeight?o.naturalWidth/o.naturalHeight:1;n.dataset.orientation=i<.95?"portrait":i>1.15?"landscape":"square"},{once:!0}),o.addEventListener("error",()=>{W("config/photos.json",{photos:[]}).then(i=>{const{normalizePhotos:s}=ua(),l=s(i),c=l.find(u=>u.alt===t.alt&&u.type!=="video")||l.find(u=>u.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,o.src=ae(c.url),g.photos=l;else{const u=o.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const i=o.closest("[data-ag-photo-wrap]");i&&(i.hidden=!0)})},{once:!0}),o.src=ae(t.url);n.appendChild(o),e.appendChild(n)}function ua(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function er(e,t,a,n){var l,c;const r=d("#ag-lightbox"),o=d("#ag-lightbox-img"),i=d("#ag-lightbox-caption"),s=d("#ag-lightbox-drive-link");if(!(!r||!o)){(l=r.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),ge&&(o.removeEventListener("error",ge),ge=null),o.onerror=null,s&&(s.hidden=!0);{o.hidden=!1;const u=ae(e);if(!u)return;o.src=u,o.alt=t||"",ge=()=>{const p=n||t;W("config/photos.json",{photos:[]}).then(f=>{const{normalizePhotos:h}=ua(),b=h(f),x=b.find(v=>v.alt===p)||null;x&&x.url&&(o.src=ae(x.url),g.photos=b)}).catch(()=>{})},o.addEventListener("error",ge,{once:!0})}i.textContent=t||"",i.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function ma(){var a,n;const e=d("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(ge&&(t.removeEventListener("error",ge),ge=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function tr(e){return[`${gn(e.category.tone)} ${je()}s ${g.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var o;const[a,n]=e.unlockTime.split(":").map(Number),r=$t(((o=g.theme)==null?void 0:o.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function xt(e){var x;I.dataset.tone=e.category.tone,yi(e.category.tone),d("[data-ag-rarity]").textContent=e.category.label,d("[data-ag-date]").textContent=e.day,d("[data-ag-title]").textContent=e.outcome.title;const t=d("[data-ag-message]");if(!t)return;t.innerHTML=ca(e.outcome.message),t.hidden=!1;const a=d("[data-ag-result]"),n=d("[data-ag-freikarte-wrap]");if(n){const v=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(v&&Oo(e.token)>0&&!se())}const r=d("[data-ag-quest-wrap]");if(r){const v=e.category.tone==="quest"&&!se();if(r.hidden=!v,v){const w=d("[data-ag-quest-hint]"),y=d("[data-ag-quest-done]"),{formatHistoryDate:S}=Oe(),C=U().find(z=>z.day===e.day&&z.token===e.token);C&&C.bestanden?(w&&(w.textContent=`🏆 Bestanden am ${S(C.bestandenAt||C.day)}`),y&&(y.hidden=!0)):(w&&(w.textContent="🏆 Auftrag erledigt? Schick Fionn dein Beweisstück und hol dir den Haken."),y&&(y.hidden=!1,y.onclick=()=>{if((typeof window>"u"||!window.confirm||window.confirm("Quest wirklich geschafft? Das wandert dauerhaft ins Trophäenregal."))&&qo(e.day,e.token)){X();try{ee(60)}catch{}try{Y("Bestanden 🏆")}catch{}xt(e),g.activeTab==="history"&&Q()}}))}}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const w=_s(e.outcome.prompt,y=>{if(e.promptAnswer=y,w.remove(),!se()){js(e,y),e.outcome.id&&li(e.outcome.id,y);const S=U(),C=S.findIndex(z=>z.day===e.day&&z.token===e.token);C!==-1&&(S[C]={...S[C],promptAnswer:y},de(S),X())}xt(e),g.activeTab==="history"&&Q()});w.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(w,t)}d("[data-ag-result]").hidden=!1;return}const o=a?a.querySelector("[data-ag-pin-gate]"):null;o&&o.remove();const i=d("[data-ag-link-wrap]");if(e.outcome.pin){const v=!!e.outcome.pinMessage;if(v||(t.hidden=!jt(e.outcome.pin)),!jt(e.outcome.pin)){let w=null;v&&(w=document.createElement("div"),w.className="ag-message",w.hidden=!0,w.innerHTML=ca(e.outcome.pinMessage),t.parentNode.insertBefore(w,t.nextSibling));const y=Os(e.outcome.pin,()=>{y.remove(),v?w.hidden=!1:t.hidden=!1,e.outcome.link&&i&&yt(i,e.outcome.link)},e.outcome.pinHint);y.setAttribute("data-ag-pin-gate","");const S=v?w:t;S.parentNode.insertBefore(y,S)}}const s=d("[data-ag-photo-wrap]"),l=d("[data-ag-photo-media]"),c=d("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[v,w]=e.unlockTime.split(":").map(Number),y=$t(((x=g.theme)==null?void 0:x.timezone)||"UTC"),S=e.outcome.linkPin;if(S)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[z,L]=e.outcome.linkPinFrom.split(":").map(Number);return y.h>z||y.h===z&&y.m>=L})()){const z=Fs(S,i,e);i.innerHTML="",i.appendChild(z),i.hidden=!1}else{const z=document.createElement("span");z.className="ag-outcome-link-locked",z.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild(z),i.hidden=!1}else if(y.h>v||y.h===v&&y.m>=w)yt(i,e.outcome.link);else{const z=document.createElement("span");z.className="ag-outcome-link-locked",z.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild(z),i.hidden=!1}}else e.outcome.pin&&!jt(e.outcome.pin)||yt(i,e.outcome.link||null);if(Ws(d("[data-ag-token-wrap]"),e),Rs(e),e.photo){Xn(l,e.photo);const v=(e.photo.caption||"").trim();v?(c.textContent=v,c.hidden=!1):(c.textContent="",c.hidden=!0),s.hidden=!1}else l.innerHTML="",c.textContent="",c.hidden=!0,s.hidden=!0;const u=tr(e),p=encodeURIComponent("Mein Gacha-Zug"),f=encodeURIComponent(u),h=d("[data-ag-send]");g.theme.messageTarget.startsWith("mailto:")?h.href=`${g.theme.messageTarget}?subject=${p}&body=${f}`:h.href=g.theme.messageTarget.replace("{text}",f);const b=d("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),d("[data-ag-result]").hidden=!1,ar()}function Gs(e){return e?ce().some(t=>t.day===e.day&&t.token===e.token):!1}function wt(e){return ce().some(t=>t.day===e.day&&t.token===e.token)}function ar(){const e=d("[data-ag-star]");if(!e)return;const t=Gs(g.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Ks(e,t){const a=ce(),n=a.findIndex(o=>o.day===e.day&&o.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Ve(a),X();const r=wt(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",g.activeTab==="lieblinge"&&kt()}function Ys(e){if(!e)return;const t=ce(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Ve(t),X(),ar(),g.activeTab==="lieblinge"&&kt()}function Js(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=U(),n=new Set,r=[t,...a].filter(o=>{if(!o||typeof o.day!="string"||typeof o.token!="string")return!1;const i=`${o.day}|${o.token}`;return n.has(i)?!1:(n.add(i),!0)});r.sort((o,i)=>o.day<i.day?1:o.day>i.day?-1:0),de(r),Xe(0),X()}function Vs(e,t){var i;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=N(((i=g.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=U(),o=r.find(s=>s.day===e.day&&s.token===e.token);o&&(o.used=!0,o.usedAt=n,de(r)),X();try{ee(60)}catch{}try{Y("Eingelöst 💛")}catch{}try{Rn(e)}catch{}t&&(t.disabled=!0),Q(),g.activeTab==="lieblinge"&&kt()}function nr(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,r]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=r)){const i=document.createElement("span");return i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i}}const t=ae(e.link);return t?Zn(t):null}function rr(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:r}=Oe();n.textContent=r(e.day);const o=document.createElement("span");o.className="ag-history-badge",o.textContent=e.categoryLabel||"Kapsel";const i=document.createElement("button");i.type="button",i.className="ag-history-star"+(wt(e)?" is-starred":""),i.textContent=wt(e)?"★":"☆",i.title=wt(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",i.addEventListener("click",f=>{f.stopPropagation(),Ks(e,i)}),a.appendChild(n),a.appendChild(o),a.appendChild(i);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const l=document.createElement("div");l.className="ag-history-message",l.innerHTML=ca(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const f=document.createElement("p");f.className="ag-history-answer-label",f.textContent="💭 Antwort";const h=document.createElement("blockquote");h.className="ag-history-answer",h.textContent=e.promptAnswer,c.appendChild(f),c.appendChild(h)}t.appendChild(a);const u=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,p=e.photo&&(e.photo.type==="video"||u.test(e.photo.url||""));if(e.photo&&!p){const f=document.createElement("div");f.className="ag-history-body";const h=document.createElement("div");h.className="ag-history-thumb";const b=document.createElement("img");b.src=ae(e.photo.url),b.alt=e.photo.alt||"Foto-Drop",b.loading="lazy",b.decoding="async",b.addEventListener("error",function(){W("config/photos.json",{photos:[]}).then(v=>{const{normalizePhotos:w}=ua(),y=w(v),S=y.find(C=>C.alt===e.photo.alt&&C.type!=="video")||y.find(C=>C.type!=="video")||null;if(S&&S.url)e.photo.url=S.url,b.src=ae(S.url),g.photos=y;else{h.classList.add("is-broken"),b.remove();const C=document.createElement("span");C.className="ag-history-thumb-broken",C.textContent="📷",h.appendChild(C)}}).catch(()=>{h.classList.add("is-broken"),b.remove();const v=document.createElement("span");v.className="ag-history-thumb-broken",v.textContent="📷",h.appendChild(v)})},{once:!0}),h.appendChild(b),h.style.cursor="pointer",h.title="Vollansicht",h.addEventListener("click",()=>er(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const x=document.createElement("div");if(x.className="ag-history-text",x.appendChild(s),x.appendChild(l),c&&x.appendChild(c),e.link){const v=nr(e);v&&x.appendChild(v)}f.appendChild(h),f.appendChild(x),t.appendChild(f)}else if(t.appendChild(s),t.appendChild(l),c&&t.appendChild(c),e.link){const f=nr(e);f&&t.appendChild(f)}if(e.bestanden){const f=document.createElement("p");f.className="ag-history-bestanden";const{formatHistoryDate:h}=Oe();f.textContent=`🏆 Bestanden${e.bestandenAt?` am ${h(e.bestandenAt)}`:""}`,t.appendChild(f)}if(Je(e)){const f=document.createElement("div");if(f.className="ag-voucher-actions",e.used){const h=document.createElement("span");h.className="ag-voucher-used";const{formatHistoryDate:b}=Oe();h.textContent=`✓ Benutzt am ${e.usedAt?b(e.usedAt):"–"}`,f.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="ag-voucher-use",h.textContent="🎟️ Benutzen",h.addEventListener("click",b=>{b.stopPropagation(),Vs(e,h)}),f.appendChild(h)}t.appendChild(f)}return t}function Oe(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}}}function Zs(e){const t=d("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===Z),n.setAttribute("aria-selected",r===Z?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let Ce=null;function or(e){var y;const t=d("[data-ag-history-calendar]");if(!t)return;if(Z!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((y=g.theme)==null?void 0:y.timezone)||"UTC",n=N(a);Ce||(Ce=n.slice(0,7));const r=new Map(e.map(S=>[S.day,S])),[o,i]=Ce.split("-").map(Number),s=new Date(Date.UTC(o,i-1,1)),l=new Date(Date.UTC(o,i,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),p=e.filter(S=>S.day.startsWith(Ce)).length;t.innerHTML="";const f=document.createElement("div");f.className="ag-kalender-head";const h=document.createElement("button");h.type="button",h.className="ag-kalender-nav",h.textContent="‹",h.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=p?`${u} · ${p} Kapseln`:u;const x=document.createElement("button");x.type="button",x.className="ag-kalender-nav",x.textContent="›",x.setAttribute("aria-label","Nächster Monat");const v=S=>{const C=new Date(Date.UTC(o,i-1+S,1));Ce=`${C.getUTCFullYear()}-${String(C.getUTCMonth()+1).padStart(2,"0")}`,or(e)};h.addEventListener("click",()=>v(-1)),x.addEventListener("click",()=>v(1)),f.appendChild(h),f.appendChild(b),f.appendChild(x),t.appendChild(f);const w=document.createElement("div");w.className="ag-kalender-grid";for(const S of["M","D","M","D","F","S","S"]){const C=document.createElement("span");C.className="ag-kalender-wd",C.textContent=S,w.appendChild(C)}for(let S=0;S<c;S++)w.appendChild(document.createElement("span"));for(let S=1;S<=l;S++){const C=`${Ce}-${String(S).padStart(2,"0")}`,z=r.get(C),L=document.createElement("span");L.className="ag-kalender-day",L.textContent=S,z&&(L.classList.add("has-pull"),L.dataset.tone=z.tone||"soft",L.title=`${z.title||"Kapsel"} (${z.categoryLabel||""})`),C===n&&L.classList.add("is-today"),C>n&&L.classList.add("is-future"),w.appendChild(L)}t.appendChild(w)}function Qs(e){var o;const t=d("[data-ag-history-tally]");if(!t)return;if(Z!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(o=e[e.length-1])==null?void 0:o.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const fa=15;let ha=fa;function Xs(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function el(e){const t=d("[data-ag-album-card]"),a=d("[data-ag-album]"),n=d("[data-ag-album-note]");if(!t||!a)return;const r=Xs(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const o of r){const i=document.createElement("button");i.type="button",i.className="ag-album-tile",i.title=o.caption||o.alt||o.day,i.setAttribute("aria-label",o.caption||o.alt||`Foto vom ${o.day}`);const s=document.createElement("img");s.src=o.url,s.alt=o.alt||o.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>i.remove(),{once:!0}),i.appendChild(s),i.addEventListener("click",()=>{A(8),er(o.url,o.caption,!1,o.alt)}),a.appendChild(i)}}function tl(e){const t=d("[data-ag-trophy-card]"),a=d("[data-ag-trophies]"),n=d("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,s)=>(s.bestandenAt||s.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`);const{formatHistoryDate:o}=Oe();a.innerHTML="";for(const i of r){const s=document.createElement("div");s.className="ag-trophy-tile",s.title=i.title||i.categoryLabel||"Quest";const l=document.createElement("span");l.className="ag-trophy-emoji";const c=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));l.textContent=c?c[c.length-1]:"🏆";const u=document.createElement("span");u.className="ag-trophy-title",u.textContent=i.title||i.categoryLabel||"Quest";const p=document.createElement("span");p.className="ag-trophy-date",p.textContent=o(i.bestandenAt||i.day),s.appendChild(l),s.appendChild(u),s.appendChild(p),a.appendChild(s)}}function Q(){var u;vt();const e=d("[data-ag-history]"),t=d("[data-ag-history-empty]"),a=d("[data-ag-history-note]");e.innerHTML="";const n=B(),r=N(((u=g.theme)==null?void 0:u.timezone)||"UTC"),o=U().filter(p=>p.token===n&&p.day<=r).slice().sort((p,f)=>p.day<f.day?1:p.day>f.day?-1:0);or(o),Qs(o),tl(o),el(o);const i=o.filter(p=>Je(p)&&!p.used).length;Zs(i);const s=o.filter(p=>Z==="vouchers"?Je(p):Z==="open"?Je(p)&&!p.used:!0);Z==="open"?a.textContent=i?`Du hast ${i} offene${i===1?"n":""} Gutschein${i===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":Z==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=d("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=Z==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":Z==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const c=s.slice(0,ha);for(const p of c)e.appendChild(rr(p));if(l){const p=s.length-c.length;l.hidden=p<=0,p>0&&(l.textContent=`Mehr anzeigen (${p} weitere)`,l.onclick=()=>{ha+=fa,Q()})}}function kt(){const e=d("[data-ag-lieblinge]"),t=d("[data-ag-lieblinge-empty]"),a=d("[data-ag-lieblinge-note]");e.innerHTML="";const n=ce();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild(rr(r))}function al(){const e=d("[data-ag-odds]");e.innerHTML="";const t=oe(),a=Ka(t),n=a.reduce((r,o)=>r+o.weight,0);for(const r of a){const o=document.createElement("li");o.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(o)}if(t>=5){const r=Ga(t),o=document.createElement("li");o.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,o.style.fontWeight="800",e.appendChild(o)}}function nl(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function ba(){const e=d("[data-ag-wish-idle]"),t=d("[data-ag-wish-form]"),a=d("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Pt();n&&n.week===Bt()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,d("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",d("[data-ag-wish-done-note]").textContent=`„${n.text}"`,d("[data-ag-wish-done-meta]").textContent=nl(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function rl(){var v;const e=R()==="fionn",t=e?g.theme.brand.fromName:je(),a=e?je():g.theme.brand.fromName,n=d("[data-ag-main-title]");n&&(n.textContent=g.theme.brand.titleTemplate.replace("{name}",t));const r=d("[data-ag-kicker]");r&&(r.textContent=`${g.theme.brand.kicker} · ${g.photos.length} Erinnerungen`);const o=d("[data-ag-intro]");o&&(o.textContent=g.theme.brand.intro);const i=d("[data-ag-button-text]");i&&(i.textContent=g.theme.brand.buttonIdle);const s=d("[data-ag-rules-title]");s&&(s.textContent=g.theme.brand.rulesTitle);const l=d("[data-ag-rules-text]");l&&(l.textContent=g.theme.brand.rulesText);const c=d("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const u=d("[data-ag-today-pill]");u&&(u.textContent=Ms());const p=d("[data-ag-draw-hint]");p&&(p.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const f=d("[data-ag-werkstatt-open]");f&&(f.hidden=e||!dt());const h=document.getElementById("ag-werkstatt-panel");h&&!dt()&&(h.hidden=!0),ct();const b=d("[data-ag-chips]");b&&(b.innerHTML="");const x=Array.isArray(g.theme.stickers)&&g.theme.stickers.length?g.theme.stickers:$s();for(const w of b?x:[]){const y=document.createElement("li");if(y.textContent=w,(w.toLowerCase().includes("bärlauch")||w.toLowerCase().includes("barlauch"))&&(y.id="ag-btn-baerlauch",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Bärlauch öffnen"),y.classList.add("ag-chip-clickable")),(w.toLowerCase().includes("gespräch")||w.toLowerCase().includes("gesprach"))&&(y.id="ag-btn-gesprach",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Gespräch öffnen"),y.classList.add("ag-chip-clickable")),w.toLowerCase().includes("rave")&&(y.id="ag-btn-rave",y.tabIndex=0,y.setAttribute("role","link"),y.setAttribute("aria-label","Rave Board öffnen"),y.classList.add("ag-chip-clickable")),w.toLowerCase()==="quest"&&(y.id="ag-btn-quest",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Quest öffnen"),y.classList.add("ag-chip-clickable"),(v=g.quest)!=null&&v.enabled&&Sn()&&(Ie().solved||y.classList.add("ag-chip-quest-active"))),w.toLowerCase().includes("glossar")&&(y.id="ag-btn-glossary",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Glossar öffnen"),y.classList.add("ag-chip-clickable")),w.toLowerCase()==="mission"&&(y.id="ag-btn-mission",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Mission öffnen"),y.classList.add("ag-chip-clickable"),yn()||y.classList.add("ag-chip-mission-active")),(w.toLowerCase().includes("skincare")||w.toLowerCase().includes("pflege"))&&g.skincare&&(y.id="ag-btn-skincare",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Skincare-Routine öffnen"),y.classList.add("ag-chip-clickable")),w.toLowerCase().includes("stimmung")){y.id="ag-btn-stimmung",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Farbe des Tages wählen"),y.classList.add("ag-chip-clickable");const S=we();S&&(y.classList.add("ag-chip-stimmung-set"),y.style.setProperty("--chip-dot-color",S))}b.appendChild(y)}Ps(),ga()}const ir="affektions-gacha:install-dismissed:v1";let Fe=null;function ol(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function il(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function sr(){try{return window.localStorage.getItem(ir)==="1"}catch{return!1}}function lr(){try{window.localStorage.setItem(ir,"1")}catch{}const e=d("[data-ag-install-nudge]");e&&(e.hidden=!0)}function dr(e){if(sr())return;const t=d("[data-ag-install-nudge]");if(!t)return;const a=d("[data-ag-install-copy]"),n=d("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Fe&&(Fe.prompt(),await Fe.userChoice,Fe=null,lr())}),t.hidden=!1}function sl(){var e;ol()||sr()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Fe=t,dr(!0)}),il()&&dr(!1),(e=d("[data-ag-install-dismiss]"))==null||e.addEventListener("click",lr))}const ll={photos:[]};function dl(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=Kt();return a.map(r=>{const o=new URL(r.url,n).toString(),i=r.type==="video"||t.test(o);return{...r,type:i?"video":"image",url:o}}).filter(r=>r.url)}async function cl(){ki(),Ci(),zi();try{const[e,t,a,n,r,o,i,s,l,c]=await Promise.all([W("config/theme.json"),W("config/outcomes.json"),W("config/photos.json",ll),W("config/special-days.json",{days:[]}),W("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),W("config/backup.json",{enabled:!1,endpointUrl:""}),W("config/quest.json",{enabled:!1}),W("config/missions.json",{pairs:[]}),W("config/push.json",{enabled:!1}),W("config/skincare.json",null)]);g.theme=e,g.outcomes=t,g.photos=dl(a),g.specialDays=n,g.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},g.backup=o&&typeof o=="object"?o:{enabled:!1,endpointUrl:""},g.quest=i&&typeof i=="object"?i:{enabled:!1},g.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},g.push=l&&typeof l=="object"?l:{enabled:!1},g.skincare=c&&typeof c=="object"?c:null,g.werkstatt=Me(),Si(e),Ei(se()||N(e.timezone)),ri(),rl(),al(),ba(),Yn(),sl(),requestAnimationFrame(()=>{const p=I.querySelector(".ag-nav-pill"),f=I.querySelector(".ag-bottomnav-btn.is-active");if(p&&f){const h=f.closest(".ag-bottomnav"),b=h?h.getBoundingClientRect():null,x=f.getBoundingClientRect();b&&x.width&&(p.style.transition="none",p.style.left=`${x.left-b.left}px`,p.style.width=`${x.width}px`,requestAnimationFrame(()=>{p.style.transition=""}))}});try{Wn()}catch{}try{const p=I.querySelector(".ag-stage");p&&"IntersectionObserver"in window&&new IntersectionObserver(([h])=>{p.classList.toggle("ag-stage-idle",!h.isIntersecting)},{threshold:.05}).observe(p)}catch{}oa(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(ra(),Ne().catch(()=>{}))}),I.classList.add("is-ready"),I.style.transition="opacity .18s ease",I.style.opacity="1";const u=N(e.timezone);U().some(p=>p.token===B()&&p.day===u)&&I.classList.add("has-drawn"),Ne().catch(()=>{}),window.setTimeout(()=>{On().catch(()=>{})},1800)}catch(e){da(e)}}const Le=document.currentScript,gl=(Le==null?void 0:Le.dataset.mount)||"#affektions-gacha",pl=(Le==null?void 0:Le.dataset.configBase)||"";function ul(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const ml=document.querySelector(gl)||ul();wo(ml),bi(pl,null),cl().catch(e=>da(e));const fl="wss://broker.hivemq.com:8884/mqtt",cr="picolight_lf26/events",hl="web_app",bl=10,yl=17/29,gr=1e4,vl=2500,ya=["board_a","board_b"];let va=!1;function xl(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function wl(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}async function kl(){if(!va){va=!0;try{await xl(),await new Promise((e,t)=>{const a=window.mqtt.connect(fl,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),n={};let r=!1,o=null,i=!1;const s=()=>{if(!i){i=!0,document.removeEventListener("visibilitychange",u);try{a.end(!0)}catch{}e()}},l=p=>{p.from=hl;try{a.publish(cr,JSON.stringify(p))}catch{}},c=()=>{if(clearTimeout(o),!r){s();return}r=!1;for(const p of ya){const f=n[p]||n[ya.find(b=>b!==p)];if(!f)continue;const h={target:p,...wl(f)};f.on===!1?(l({...h,on:!0}),setTimeout(()=>l({target:p,on:!1}),1500)):l({...h,on:!0})}setTimeout(s,2500)},u=()=>{document.visibilityState==="hidden"&&r&&c()};document.addEventListener("visibilitychange",u),a.on("connect",()=>{a.subscribe(cr,p=>{if(p){s();return}l({nudge:!0}),setTimeout(()=>{if(!Object.keys(n).length){s();return}r=!0,l({on:!0,groups:[{pos:yl,w:0,size:bl}]}),o=setTimeout(c,gr)},vl)})}),a.on("message",(p,f)=>{try{const h=JSON.parse(f.toString());h.from&&ya.includes(h.from)&&Array.isArray(h.groups)&&!r&&(n[h.from]=h)}catch{}}),a.on("error",()=>{r||s()}),a.on("close",()=>{r||s()}),setTimeout(()=>t(new Error("lights flash timed out")),gr+2e4)})}catch{}finally{va=!1}}}const Sl=Object.freeze(Object.defineProperty({__proto__:null,flashLightsForPull:kl},Symbol.toStringTag,{value:"Module"}))})();

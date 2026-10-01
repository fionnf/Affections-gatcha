(function(){"use strict";const g={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,push:null,skincare:null,werkstatt:[],todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let z=null;function ai(e){z=e}function d(e){return z.querySelector(e)}const Ua="affektions-gacha:history:v1",ja="affektions-gacha:favourites:v1",Oa="affektions-gacha:tokens:v1",Fa="affektions-gacha:tokens-sent:v1",Ha="affektions-gacha:streak-cache:v1",Ra="affektions-gacha:streak-synced:v1",Wa="affektions-gacha:streak-restore:v1",Ga="affektions-gacha:wish:v1",Ka="affektions-gacha:milestones:v1",Ee="affektions-gacha:notif:v2",Ya="affektions-gacha:baerlauch-scores:v1",ni="affektions-gacha:baerlauch-history:v1",Va="affektions-gacha:mission-log:v1",Ja="affektions-gacha:gesprach-idx:v1",ri="affektions-gacha:sound:v1",Za="affektions-gacha:gipfelbuch:v1",Xa="affektions-gacha:quest:v1",Pt="affektions-gacha:quest-points:v1",oi=5,ii=20,Qa=[100,75,50,25],en="affektions-gacha:glossary:v1",_t="affektions-gacha:stimmung:v1",tn="affektions-gacha:freikarte:v1",qt="affektions-gacha:freikarte-reroll:v1",an="affektions-gacha:werkstatt:v1",Ut={"🌿":{goal:5,reward:"Fionn kocht dir ein Abendessen nach Wahl"},"🔥":{goal:5,reward:"Wochenend-Abenteuer — Ziel nach deiner Wahl"},"⭐":{goal:5,reward:"Fionns Überraschung — er entscheidet"},"☁️":{goal:4,reward:"Ein ganzer fauler Tag ohne Pläne"},"🏔":{goal:5,reward:"Eine richtige Bergtour, Hütte inklusive"},"☕":{goal:4,reward:"Ein Ausflug in dein Traumcafé, egal wo"},"💚":{goal:3,reward:"Ein langer, handgeschriebener Brief"},"🎬":{goal:3,reward:"Filmabend — du wählst, ich mache Popcorn"},"🍕":{goal:3,reward:"Essen kommt ins Haus, du bestimmst was"},"🎧":{goal:5,reward:"Konzert oder DJ-Abend, Tickets gehen auf mich"},"🛁":{goal:4,reward:"Ein Wellness-Abend, komplett vorbereitet"},"✈️":{goal:7,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}};function jt(e){const t=Ut[e];return t&&t.goal||oi}function Ot(e){const t=Ut[e];return t&&t.reward||""}let nn=0;function si(e){nn=Number.isInteger(e)&&e>=0&&e<24?e:0}function _(e,t){const a=new Date().getTime()-nn*36e5,n=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(a)),r=o=>n.find(i=>i.type===o).value;return`${r("year")}-${r("month")}-${r("day")}`}function Pe(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function li(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Ft(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function di(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function ee(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function ci(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function gi(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ce(e){return gi(ci(e))()}function et(e,t){return t?Math.floor(ce(e)*t):0}function pi(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function ui(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function N(){return K()==="fionn"?"fionn":"lennart"}function K(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function Z(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function mi(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Ht(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function tt(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=_(t),[n,r,o]=a.split("-").map(Number),i=Math.floor(new Date(Date.UTC(n,r-1,o)).getTime()/864e5);return Math.floor(i/(((l=e.quest)==null?void 0:l.periodDays)||2))}function at(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=tt(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function rn(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function fi(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const hi=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,bi=/nicht\s+einlös|kein\s+gutschein/i,yi=new Set(["photo","collect","niete"]);function nt(e){if(!e)return!1;if(e.voucher===!0)return!0;if(yi.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return bi.test(t)?!1:hi.test(t)}function P(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function me(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[N()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[N()]:n})),n}catch{return t}}function ge(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[N()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}function U(){try{if(typeof window>"u"||!window.localStorage)return g.syncedHistory||[];const e=window.localStorage.getItem(Ua);if(!e)return g.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return g.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:g.syncedHistory||[]}catch{return g.syncedHistory||[]}}function de(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ua,JSON.stringify(e))}catch{}}function on(e,t){var r;const a=U(),n=a.find(o=>o.day===e&&o.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=_(((r=g.theme)==null?void 0:r.timezone)||"UTC"),de(a)),n):null}function wi(e,t,a){const n=U(),r=n.find(o=>o.day===e&&o.token===t);return r?(r.beweisUrl=a,de(n),r):null}function vi(e,t,a){const n=U(),r=n.find(o=>o.day===e&&o.token===t);return r?(r.reaction=a,de(n),r):null}function fe(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(ja);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=g.theme)!=null&&e.timezone?_(g.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function rt(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ja,JSON.stringify(e))}catch{}}function Te(){const e=me(Oa,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Rt(e){ge(Oa,e)}function sn(e){const t=Te();return t[e]=(t[e]||0)+1,Rt(t),t[e]}function xi(e){const t=Te();t[e]=0,Rt(t)}function ot(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;r>0&&(t[a]=r)}return t}function ki(){const e=me(Fa,null);return e&&typeof e=="object"&&!Array.isArray(e)?ot(e):null}function it(e){ge(Fa,ot(e))}function Si(e){const t=ot(e),a=ot(Te());let n=ki();n===null&&(n=a,it(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),o={};for(const i of r){const s=(t[i]||0)+((a[i]||0)-(n[i]||0));s>0&&(o[i]=s)}return Rt(o),it(t),[...r].some(i=>(o[i]||0)!==(t[i]||0))}function Wt(){try{const e=localStorage.getItem(tn),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ln(e){try{localStorage.setItem(tn,JSON.stringify(e))}catch{}}function Ei(e){return Wt()[e]||0}function dn(e){const t=Wt();return t[e]=(t[e]||0)+1,ln(t),t[e]}function Ti(e){const t=Wt();return t[e]>0?(t[e]-=1,ln(t),!0):!1}function Ci(e,t){try{const a=localStorage.getItem(qt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function Li(e,t,a){try{const n=localStorage.getItem(qt),r=n?JSON.parse(n):{},o=r&&typeof r=="object"?r:{};o[`${e}|${t}`]=a,localStorage.setItem(qt,JSON.stringify(o))}catch{}}function Gt(){if(typeof window>"u"||!window.localStorage)return null;const e=me(Ga,null);return e&&typeof e=="object"?e:null}function cn(e){typeof window>"u"||!window.localStorage||ge(Ga,e)}function he(){const e=me(Wa,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function st(e){ge(Wa,e)}function zi(){const e=me(Ha,0);return typeof e=="number"?e:parseInt(e,10)||0}function Kt(e){ge(Ha,e)}function Ai(){const e=me(Ra,0);return typeof e=="number"?e:parseInt(e,10)||0}function Ii(e){ge(Ra,e)}function lt(){try{const e=window.localStorage.getItem(Za);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function dt(e){try{window.localStorage.setItem(Za,JSON.stringify(e))}catch{}}function ct(){try{const e=localStorage.getItem(Va),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Yt(e){try{localStorage.setItem(Va,JSON.stringify(e))}catch{}}function Vt(){try{const e=localStorage.getItem(Ya),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function gn(){try{const e=localStorage.getItem(ni),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function _e(e){try{const t=me(Xa,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Jt(e){ge(Xa,e)}function gt(){const e=me(Pt,0);return typeof e=="number"?e:parseInt(e,10)||0}function Mi(e){try{const t=gt()+e;return ge(Pt,t),t}catch{return e}}function $i(e){ge(Pt,e)}function pn(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Ka);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Bi(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ka,JSON.stringify(e))}catch{}}function Di(e,t){return pn().includes(`${e}|${t}`)}function Ni(e,t){const a=`${e}|${t}`,n=pn();n.includes(a)||Bi([...n,a])}function Zt(e){return!1}const Pi=60;function pt(){const e=he();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function _i(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>Pi))return null;const n=he(),r=pt().filter(o=>!(o.from===e&&o.to===t));return r.push({from:e,to:t}),r.sort((o,i)=>o.from.localeCompare(i.from)),st({...n,vacations:r}),{from:e,to:t}}function qi(e,t){const a=he();st({...a,vacations:pt().filter(n=>!(n.from===e&&n.to===t))})}function un(e){return pt().some(t=>e>=t.from&&e<=t.to)}function be(){var f;const e=N(),t=U().filter(m=>m.token===e);if(!t.length)return Math.max(zi(),Ai());const a=((f=g.theme)==null?void 0:f.timezone)||"UTC",n=_(a),r=new Set(t.map(m=>m.day)),[o,i,s]=n.split("-").map(Number);let l=new Date(Date.UTC(o,i-1,s)),c=n;r.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));let p=0;for(;r.has(c)||un(c);)r.has(c)&&p++,l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return p}function mn(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function fn(e){if(e<5)return g.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return g.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Ui=45,ji=10,Oi=.5,Fi=1.8;function Hi(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=U().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,l)=>l.day.localeCompare(s.day)).slice(0,Ui);if(r.length<ji)return e;const o=e.reduce((s,l)=>s+l.weight,0);if(!o)return e;const i={};for(const s of r)i[s.categoryId]=(i[s.categoryId]||0)+1;return e.map(s=>{const l=r.length*s.weight/o,c=Math.min(Fi,Math.max(Oi,(l+1)/((i[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function Ri(e,t,a=[],n=null){const r=fn(t),o=n?Hi(r,n.token,n.day):r,i=a.length?o.filter(f=>!a.includes(f.id)):o,s=i.length?i:o,l=s.reduce((f,m)=>f+m.weight,0),c=Math.floor(ce(e)*l);let p=0;for(const f of s)if(p+=f.weight,c<p)return g.outcomes.categories.find(m=>m.id===f.id)||f;return g.outcomes.categories[g.outcomes.categories.length-1]}function hn(){const e=he();return Math.floor((e.maxStreak||0)/ii)}function ut(){var n;if(he().birthdayBonus2026Used)return 0;const t=((n=g.theme)==null?void 0:n.timezone)||"UTC";return _(t)==="2026-05-29"?1:0}function Xt(){const e=he();return Math.max(0,hn()-(e.used||0))+ut()}function Qt(){var p;const e=N(),t=((p=g.theme)==null?void 0:p.timezone)||"UTC",a=_(t),n=new Set(U().filter(f=>f.token===e&&f.day<=a).map(f=>f.day));if(!n.size)return null;const r=[...n].sort()[0],[o,i,s]=a.split("-").map(Number),l=new Date(Date.UTC(o,i-1,s));let c=a;for(n.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));n.has(c)||un(c);)l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return c<r?null:c}function bn(){return Xt()>0&&Qt()!==null}function Wi(e){if(Xt()<=0)return null;const t=Qt();if(!t)return null;const a=N(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,o=[n,...U()].filter(c=>{const p=`${c.day}|${c.token}`;return r.has(p)?!1:(r.add(p),!0)}).sort((c,p)=>c.day<p.day?1:c.day>p.day?-1:0);de(o);const i=he(),l=Math.max(0,hn()-(i.used||0))===0&&ut()>0;return st({...i,used:l?i.used||0:(i.used||0)+1,birthdayBonus2026Used:l?!0:i.birthdayBonus2026Used||!1,usedAt:Date.now()}),Kt(be()),t}const yn=new Map;function re(e){yn.set(e,Date.now())}function mt(e,t=6e3){const a=yn.get(e);return typeof a=="number"&&Date.now()-a<t}function qe(){var e;return _(((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function wn(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:N()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Gi(e){if(!e||typeof e!="object"||mt("stimmung"))return;const t=qe();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){Ce()&&(kn(),ea());return}Ce()!==a&&(xn(a),Ue(a))}function vn(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(o,i)=>Math.round(i+(o-i)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function Ue(e){document.body.style.background=vn(e),Sn(e)}function ea(){document.body.style.removeProperty("background"),Sn(null)}function Ce(){try{const e=localStorage.getItem(_t);if(!e)return null;const t=JSON.parse(e);return t.day!==qe()?null:t.hex||null}catch{return null}}function xn(e){try{localStorage.setItem(_t,JSON.stringify({day:qe(),hex:e}))}catch{}}function Ki(e){const t=qe();xn(e),re("stimmung"),wn(t,e)}function kn(){try{localStorage.removeItem(_t)}catch{}}function Yi(){const e=qe();kn(),re("stimmung"),wn(e,"")}function Vi(){const e=Ce();e&&Ue(e)}function Sn(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function En(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Ce()||"#4aaa5a";Tn(e,t),ta(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Ji(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=Ce();t?Ue(t):ea()}function Zi(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function o(i){ta(e,i),Ue(i)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),o(t.value)}),a&&a.addEventListener("input",()=>{const i=Cn(a.value);i&&(t&&(t.value=i),o(i))}),n&&n.addEventListener("click",()=>{const i=(t==null?void 0:t.value)||Cn((a==null?void 0:a.value)||"")||"#4aaa5a";Ki(i),Ue(i),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{Yi(),ea(),Tn(e,"#4aaa5a"),ta(e,"#4aaa5a")})}function Tn(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function ta(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=vn(t))}function Cn(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,o]=a;return`#${n}${n}${r}${r}${o}${o}`.toLowerCase()}return null}function I(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const Ln={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function Xi(e){I(Ln[e]||Ln.soft)}function R(e){const t=z.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}const oe="fionn";function je(){try{return JSON.parse(window.localStorage.getItem(an)||"[]")||[]}catch{return[]}}function ft(e){try{window.localStorage.setItem(an,JSON.stringify(e))}catch{}g.werkstatt=e}function ht(e,t){return(g.werkstatt||[]).filter(a=>a&&a.categoryId===e&&(a.forToken||oe)===t)}function zn(e){return{id:e.id,categoryId:e.categoryId,forToken:e.forToken,title:e.title,message:e.message,prompt:e.prompt,link:e.link,voucher:e.voucher,answer:e.answer,answeredAt:e.answeredAt,createdBy:e.createdBy,createdAt:e.createdAt}}function bt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:N(),...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Qi(e){const t=je(),a=t.findIndex(r=>r.id===e.id),n={id:e.id,categoryId:e.categoryId,forToken:e.forToken||oe,title:(e.title||"").trim(),message:(e.message||"").trim(),prompt:(e.prompt||"").trim()||null,link:(e.link||"").trim()||null,voucher:!!e.voucher,answer:(a===-1?null:t[a].answer)||null,answeredAt:(a===-1?null:t[a].answeredAt)||null,createdBy:N(),createdAt:(a===-1?new Date().toISOString():t[a].createdAt)||new Date().toISOString(),pendingSince:Date.now()};a===-1?t.unshift(n):t[a]=n,ft(t),re("werkstatt"),bt("werkstatt-upsert",zn(n))}function es(e,t){const a=je(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r=new Date().toISOString();a[n]={...a[n],answer:t,answeredAt:r,pendingSince:Date.now()},ft(a),re("werkstatt"),bt("werkstatt-answer",{id:e,answer:t,answeredAt:r})}function ts(e){ft(je().filter(t=>t.id!==e)),re("werkstatt"),bt("werkstatt-delete",{id:e})}function as(e){if(!Array.isArray(e)||mt("werkstatt"))return;const t=e.filter(l=>l&&l.id&&l.categoryId&&l.title),a=new Map(t.map(l=>[l.id,l])),n=je().filter(l=>{if(!l.pendingSince)return!1;const c=a.get(l.id);return!c||(c.answer||null)!==(l.answer||null)});for(const l of n.slice(0,5))bt("werkstatt-upsert",zn(l));const r=new Set,o=new Set,i=[],s=l=>`${l.forToken||oe}|${l.categoryId}|${String(l.title).trim().toLocaleLowerCase("de-CH")}`;for(const l of n)r.add(l.id),o.add(s(l)),i.push(l);for(const l of t)r.has(l.id)||o.has(s(l))||(r.add(l.id),o.add(s(l)),i.push(l));ft(i)}const O={categoryId:null,editingId:null};function Oe(){return g.outcomes&&g.outcomes.categories||[]}function An(){return oe.charAt(0).toLocaleUpperCase("de-CH")+oe.slice(1)}function yt(){const e=g.theme&&g.theme.features;return!e||e.werkstatt!==!1}function ns(){if(!yt())return;const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!1,O.categoryId=O.categoryId||Oe()[0]&&Oe()[0].id||null,Le(),Fe(),e.scrollIntoView({behavior:"smooth",block:"start"}),I(10))}function rs(){const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!0),Le()}function wt(){if(!yt())return;const e=document.querySelector("[data-ag-werkstatt-entry-sub]");if(!e)return;const t=(g.werkstatt||[]).filter(n=>(n.forToken||oe)===oe);if(!t.length){e.textContent="Noch keine — schreib die erste.";return}const a=new Set(t.map(n=>n.categoryId)).size;e.textContent=t.length===1?"1 Kapsel von dir in seiner Maschine.":`${t.length} Kapseln von dir, in ${a} ${a===1?"Kategorie":"Kategorien"}.`}function Fe(){wt();const e=document.getElementById("ag-werkstatt-tabs"),t=document.getElementById("ag-werkstatt-list"),a=document.getElementById("ag-werkstatt-note");if(!e||!t)return;const n=Oe();!O.categoryId&&n.length&&(O.categoryId=n[0].id),e.innerHTML="";for(const l of n){const c=ht(l.id,oe).length,p=document.createElement("button");p.type="button",p.className="ag-werkstatt-tab"+(l.id===O.categoryId?" is-active":""),p.dataset.agWerkstattCat=l.id,p.innerHTML=`${P(l.label)}${c?` <span class="ag-werkstatt-count">${c}</span>`:""}`,p.addEventListener("click",()=>{O.categoryId=l.id,is()?In():Le(),Fe(),I(6)}),e.appendChild(p)}const r=n.find(l=>l.id===O.categoryId),o=O.categoryId?ht(O.categoryId,oe):[],i=An();a&&(o.length===1?a.textContent=`${i} zieht hier nur noch deine eine Kapsel.`:o.length>1?a.textContent=`${i} zieht hier nur noch aus deinen ${o.length} Kapseln.`:a.textContent=`Noch nichts von dir — ${i} zieht hier aus den ${r?r.outcomes.length:0} Standardkapseln. Schreib eine, und sie gehört dir.`),t.innerHTML="",o.forEach((l,c)=>t.appendChild(os(l,c)));const s=e.querySelector(".is-active");s&&e.scrollWidth>e.clientWidth&&e.scrollTo({left:Math.max(0,s.offsetLeft-(e.clientWidth-s.offsetWidth)/2),behavior:"smooth"})}function os(e,t){const a=document.createElement("button");a.type="button",a.className="ag-werkstatt-card",a.style.setProperty("--ag-i",String(t)),a.setAttribute("aria-label",`${e.title} bearbeiten`);const n=e.pendingSince&&Date.now()-e.pendingSince>9e4,r=e.prompt&&e.answer?`<div class="ag-werkstatt-answer"><span class="ag-werkstatt-block-label">Seine Antwort</span>${P(e.answer)}</div>`:e.prompt?'<div class="ag-werkstatt-card-pending">Noch nicht beantwortet</div>':"";return a.innerHTML=`
    <div class="ag-werkstatt-card-title">${P(e.title)}</div>
    <div class="ag-werkstatt-card-msg">${P(e.message)}</div>
    ${e.prompt?`<div class="ag-werkstatt-card-prompt"><span class="ag-werkstatt-block-label">Frage</span>${P(e.prompt)}</div>`:""}
    ${r}
    <div class="ag-werkstatt-card-tags">
      ${e.voucher?'<span class="ag-werkstatt-tag is-voucher">Gutschein</span>':""}
      ${e.link?'<span class="ag-werkstatt-tag">Link</span>':""}
      ${n?'<span class="ag-werkstatt-tag is-unsent">Noch nicht übertragen</span>':""}
    </div>
  `,a.addEventListener("click",()=>Mn(e)),a}function is(){const e=document.getElementById("ag-werkstatt-form");return!!e&&!e.hidden}function In(){const e=document.getElementById("ag-werkstatt-form-title");if(!e)return;const t=Oe().find(n=>n.id===O.categoryId),a=O.editingId?"Kapsel bearbeiten":"Neue Kapsel";e.textContent=t?`${a} · ${t.label}`:a}function Mn(e){var o;const t=document.getElementById("ag-werkstatt-form"),a=document.getElementById("ag-werkstatt-add");if(!t)return;O.editingId=e?e.id:null,e&&e.categoryId&&(O.categoryId=e.categoryId),document.getElementById("ag-werkstatt-title").value=e?e.title:"",document.getElementById("ag-werkstatt-message").value=e?e.message:"",document.getElementById("ag-werkstatt-prompt").value=e&&e.prompt||"",document.getElementById("ag-werkstatt-link").value=e&&e.link||"",document.getElementById("ag-werkstatt-voucher").checked=!!(e&&e.voucher),In();const n=document.getElementById("ag-werkstatt-error");n&&(n.hidden=!0);const r=document.getElementById("ag-werkstatt-delete");r&&(r.hidden=!e,r.textContent="Kapsel löschen",r.classList.remove("is-armed")),t.hidden=!1,a&&(a.hidden=!0),t.scrollIntoView({behavior:"smooth",block:"nearest"}),(o=document.getElementById("ag-werkstatt-title"))==null||o.focus(),I(8)}function Le(){const e=document.getElementById("ag-werkstatt-form"),t=document.getElementById("ag-werkstatt-add");e&&(e.hidden=!0),t&&(t.hidden=!1);const a=document.getElementById("ag-werkstatt-delete");a&&(a.hidden=!0,a.classList.remove("is-armed")),O.editingId=null}function ss(){const e=document.getElementById("ag-werkstatt-delete");if(!(!e||!O.editingId)){if(!e.classList.contains("is-armed")){e.classList.add("is-armed"),e.textContent="Wirklich löschen?",I(12);return}ts(O.editingId),Le(),Fe(),I([12,40,12]),R("Kapsel gelöscht")}}function ls(){var m,h,b,y,w,E;const e=(((m=document.getElementById("ag-werkstatt-title"))==null?void 0:m.value)||"").trim(),t=(((h=document.getElementById("ag-werkstatt-message"))==null?void 0:h.value)||"").trim(),a=(((b=document.getElementById("ag-werkstatt-prompt"))==null?void 0:b.value)||"").trim(),n=(((y=document.getElementById("ag-werkstatt-link"))==null?void 0:y.value)||"").trim(),r=!!((w=document.getElementById("ag-werkstatt-voucher"))!=null&&w.checked),o=document.getElementById("ag-werkstatt-error");function i(v){o&&(o.textContent=v,o.hidden=!1),I([20,40,20])}if(!e)return i("Die Kapsel braucht einen Titel.");if(!t)return i("Schreib noch einen Satz dazu.");if(n&&!/^https?:\/\//i.test(n))return i("Der Link muss mit http:// oder https:// anfangen.");if(!O.categoryId)return i("Wähl zuerst eine Kategorie.");const s=v=>(v||"").trim().toLocaleLowerCase("de-CH"),l=s(e);if(ht(O.categoryId,oe).some(v=>v.id!==O.editingId&&s(v.title)===l))return i("Eine Kapsel mit diesem Titel gibt es hier schon.");if((((E=Oe().find(v=>v.id===O.categoryId))==null?void 0:E.outcomes)||[]).some(v=>s(v.title)===l))return i("So heisst schon eine Standardkapsel in dieser Kategorie.");Qi({id:O.editingId||`k-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,categoryId:O.categoryId,forToken:oe,title:e,message:t,prompt:a,link:n,voucher:r});const f=!!O.editingId;Le(),Fe(),I([10,30,10]),R(f?"Kapsel geändert ✓":`Kapsel gespeichert — ${An()} kann sie ziehen ✓`)}let aa="",na=null;function ds(e,t){aa=e,na=t}function ra(){if(na)return na();if(!aa)return window.location.href;try{return new URL(aa,window.location.href).toString()}catch{return window.location.href}}function X(e,t=null){const a=new URL(e,ra()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function vt(e){var t;try{const a=z&&z.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=g.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function He(){var e;try{const t=g.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=N(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,o=setTimeout(()=>r.abort(),12e3);let i;try{i=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(o)}if(!i.ok)return vt(!1),!1;const s=await i.json();if(!s.ok)return vt(!1),!1;const l=_(((e=g.theme)==null?void 0:e.timezone)||"UTC"),c=U(),p=c.filter(h=>h.title!=="(wiederhergestellt)"&&h.day<=l);p.length!==c.length&&de(p);const f=fe(),m=f.filter(h=>h.day<=l);if(m.length!==f.length&&rt(m),Array.isArray(s.history)&&s.history.length){const h=U(),b=new Map(h.map(w=>[`${w.day}|${w.token}`,w]));for(const w of s.history){if(w.title==="(wiederhergestellt)")continue;const E=fi(w.day);if(!E||E>l)continue;const v=typeof w.token=="string"?w.token.toLowerCase():w.token,x=`${E}|${v}`,T={...w,day:E,token:v},A=b.get(x);A&&A.bestanden&&!T.bestanden&&(T.bestanden=!0,T.bestandenAt=A.bestandenAt||null),A&&A.beweisUrl&&!T.beweisUrl&&(T.beweisUrl=A.beweisUrl),A&&A.reaction&&!T.reaction&&(T.reaction=A.reaction),b.set(x,T)}const y=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));de(y),g.syncedHistory=y,Kt(be())}if(Array.isArray(s.favourites)&&s.favourites.length){const h=fe(),b=new Map(h.map(y=>[`${y.day}|${y.token}`,y]));for(const y of s.favourites){if(y.day>l)continue;const w=typeof y.token=="string"?y.token.toLowerCase():y.token;b.set(`${y.day}|${w}`,{...y,token:w})}rt(Array.from(b.values()).sort((y,w)=>w.day.localeCompare(y.day)))}if(s.tokens&&typeof s.tokens=="object"&&Si(s.tokens)&&te(),typeof s.questPoints=="number"&&s.questPoints>gt()&&$i(s.questPoints),typeof s.streak=="number"&&s.streak>0&&Ii(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const h=Vt();let b=!1;for(const[y,w]of Object.entries(s.baerlauchScores))typeof w=="number"&&w>(h[y]||0)&&(h[y]=w,b=!0);if(b)try{localStorage.setItem(Ya,JSON.stringify(h))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const h=ct(),b=new Map(h.map(w=>[`${w.day}|${w.player}`,w]));for(const w of s.missionLog)!w.day||!w.player||b.set(`${w.day}|${w.player}`,w);const y=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));Yt(y)}if(typeof s.latestPing=="string"&&s.latestPing&&N()!=="fionn")try{const h="affektions-gacha:last-ping:v1",b=window.localStorage.getItem(h)||"";s.latestPing>b&&(window.localStorage.setItem(h,s.latestPing),g._newPing=!0)}catch{}if(s.stimmung)try{Gi(s.stimmung)}catch{}if(Array.isArray(s.werkstatt))try{as(s.werkstatt)}catch{}if(Array.isArray(s.gipfelbuch)&&!mt("gipfelbuch")){const h=s.gipfelbuch.filter(b=>b.id).sort((b,y)=>(y.date||"").localeCompare(b.date||""));dt(h)}return z&&z.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),vt(!0),Array.isArray(s.history)?s.history.length:0}catch{return vt(!1),-1}}function te(){try{const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=N(),a=U().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=fe().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=Te(),o=_e(()=>tt(g)),i=o.solved&&o.pointsEarned&&!o._logged?{challenge:at(g),attempts:o.attempts,points:o.pointsEarned,period:o.period}:void 0;i&&(o._logged=!0,Jt(o));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:be(),tokens:r,questPoints:gt(),...i?{questLog:i}:{}}),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,l).then(()=>{it(r)}).catch(()=>fetch(e.endpointUrl,{...l,mode:"no-cors"}).then(()=>{it(r)}).catch(()=>{}))}catch{}}function $n(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5),n=N();for(const r of t){const o=r.repeat==="yearly";if((r.date===e||o&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}function Bn(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function cs(e){const t=d("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Re(){return(g.photos||[]).filter(e=>e.type!=="video")}function gs(e,t){const a=ht(e.id,t);return a.length?a:e.outcomes}function Dn(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,o=N(),i=`${g.theme.secret}|${o}|${e}${r?"|"+r:""}`,s=$n(e);if(s&&!r){const S=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],D=S[et(`${i}|special|outcome`,S.length)],$={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:S},F=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&g.photos.length&&Re().find(Y=>Y.alt===s.photoAlt)||null;return{day:e,token:o,category:$,outcome:D,photo:F,collectToken:D.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const l=r?null:Ci(o,e),c=r?null:U().find(S=>S.token===o&&S.day===e);let p;l&&(p=g.outcomes.categories.find(S=>S.id===l.categoryId)),!p&&c&&c.categoryId&&(p=g.outcomes.categories.find(S=>S.id===c.categoryId)||null),p||(p=Ri(`${i}|category`,t||0,n,{token:o,day:e}));const f=mi();if(f){const S=g.outcomes.categories.find(D=>D.id===f);S&&(p=S)}p.id==="photo"&&!Re().length&&(p=g.outcomes.categories.find(S=>S.id==="common")||p);const m=gs(p,o),h=new Set(U().filter(S=>S.token===o&&S.day<e&&S.categoryId===p.id).map(S=>S.title)),b=S=>S.filter(D=>!h.has(D.title)),y=b(m),w=y.length?[]:b(p.outcomes),E=y.length?y:w.length?w:m,x=(c&&c.categoryId===p.id?m.find(S=>S.title===c.title)||p.outcomes.find(S=>S.title===c.title):null)||l&&m.find(S=>S.title===l.outcomeTitle)||E[et(`${i}|${p.id}|outcome`,E.length)],T=Re();let A=null;if(p.id==="photo"&&T.length){const S=new Set(U().filter(F=>F.token===o&&F.day<e&&F.photo).map(F=>F.photo.url)),D=T.filter(F=>!S.has(F.url)),$=D.length>0?D:T;A=$[et(`${i}|photo`,$.length)]}return{day:e,token:o,category:p,outcome:x,photo:A,collectToken:x.token||null,voucher:x.voucher||!1,freikarte:x.freikarte===!0}}function Nn(){const e=Z()||_(g.theme.timezone),t=be();return Dn(e,t)}function ps(e,t){return Dn(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function us(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function ms(e){const t=(r,o)=>z.style.setProperty(r,o),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Pn={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},_n={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function fs(e){const t=$n(e);if(!t)return;const a=(n,r)=>z.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))Pn[n]&&typeof r=="string"&&a(Pn[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))_n[n]&&typeof r=="string"&&a(_n[n],r)}const hs=`
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
        letter-spacing:.14em;text-transform:uppercase;font-weight:500;
      }
      .ag-copy h1{
        margin:8px 0 12px;
        font-family:"Boska",Georgia,serif;
        font-size:clamp(2.1rem,1.2rem + 3.8vw,4.4rem);
        line-height:.96;letter-spacing:-.035em;font-weight:500;
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
        color:#e7f5e3;font-size:.78rem;font-weight:500;letter-spacing:.04em;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
        text-transform: uppercase;
        letter-spacing: .07em;
        color: var(--ag-muted);
      }
      .ag-log-day {
        margin-bottom: 14px;
      }
      .ag-log-today .ag-log-date { color: var(--ag-primary); font-weight:500; }
      .ag-log-date {
        display: block;
        font-size: .78rem;
        font-weight:500;
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
        font-weight:500;
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
        font-size:.7rem;font-weight:500;
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
        font-weight:500;
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
        font-weight:500;
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
        color:#bdd6c4;font-weight:500;font-size:.92rem;letter-spacing:.01em;
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
        color:var(--ag-primary-dark);font-size:.74rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;
      }
      .ag-draw-hint{color:var(--ag-muted);font-size:.92rem}

      .ag-streak{
        display:inline-flex;align-items:center;gap:4px;align-self:flex-start;
        min-height:24px;padding:0 10px;border-radius:999px;
        font-size:.75rem;font-weight:500;letter-spacing:.04em;
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
        font-size:.72rem;font-weight:500;letter-spacing:.03em;font-family:inherit;
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
        font-weight:500;font-family:inherit;font-size:.98rem;letter-spacing:.01em;cursor:pointer;
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
        font-size:.78rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;
      }
      .ag-result h2{margin:0 0 8px;font-family:"Boska",Georgia,serif;font-size:clamp(1.3rem,1rem + 1vw,1.8rem);line-height:1.15;letter-spacing:-.015em;overflow-wrap:break-word;word-break:break-word}
      .ag-result p{margin:0;color:var(--ag-muted);line-height:1.6}
      .ag-message{color:var(--ag-muted);line-height:1.7}
      .ag-message p{margin:0 0 .85em}
      .ag-message p:last-child{margin-bottom:0}
      .ag-history-message p{margin:0 0 .5em}
      .ag-history-message p:last-child{margin-bottom:0}
      .ag-date{color:var(--ag-muted);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;font-weight:500}

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
        list-style:none;cursor:pointer;font-weight:500;letter-spacing:.02em;
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
      .ag-history-filter-chip.is-active{background:var(--ag-green);border-color:var(--ag-green);color:#fff;font-weight:500}
      .ag-voucher-actions{margin-top:10px;display:flex;align-items:center;gap:8px}
      .ag-voucher-use{background:var(--ag-gold,#caa45a);border:none;border-radius:8px;padding:6px 14px;font-size:.86rem;font-weight:500;color:#1a1a1a;cursor:pointer;transition:transform .15s,filter .15s;line-height:1.3}
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
      .ag-history-date{color:var(--ag-muted);font-size:.78rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase}
      .ag-history-badge{
        display:inline-flex;align-items:center;min-height:22px;padding:0 9px;border-radius:999px;
        background:var(--ag-surface-2);color:var(--ag-primary-dark);
        font-size:.7rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;
      }
      .ag-history-title{margin:0 0 2px;font-size:1rem;font-weight:500;color:var(--ag-text);line-height:1.3}
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
      .ag-history-video-label{font-size:.6rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
      .ag-history-text{min-width:0;flex:1}

      /* ── Kapsel-Kalender ── */
      .ag-kalender{margin:4px 0 14px;padding:12px 14px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}
      .ag-kalender-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
      .ag-kalender-label{font-size:.8rem;font-weight:500;color:var(--ag-muted);letter-spacing:.03em}
      .ag-kalender-nav{background:none;border:none;cursor:pointer;color:var(--ag-muted);font-size:1.15rem;line-height:1;padding:2px 10px;border-radius:8px}
      .ag-kalender-nav:hover{color:var(--ag-text);background:rgba(255,255,255,.06)}
      .ag-kalender-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;justify-items:center}
      .ag-kalender-wd{font-size:.6rem;font-weight:500;color:var(--ag-muted);opacity:.55;letter-spacing:.05em}
      .ag-kalender-day{
        width:28px;height:28px;display:grid;place-items:center;
        font-size:.68rem;color:var(--ag-muted);opacity:.55;border-radius:50%;
        font-variant-numeric:tabular-nums;
      }
      .ag-kalender-day.is-future{opacity:.22}
      .ag-kalender-day.is-today{box-shadow:0 0 0 1.5px var(--ag-primary) inset;opacity:1}
      .ag-kalender-day.has-pull{opacity:1;color:#fffdf8;font-weight:500;background:var(--ag-primary)}
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
        font-size:.66rem;font-weight:500;letter-spacing:.09em;text-transform:uppercase;
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
        /* The hero used to take a whole phone screen (about 610px on a
           375px-wide phone) before the first card. Smaller machine, a
           title that fits on one or two lines, tighter copy: the draw
           button is now visible without scrolling. */
        .ag-hero{gap:10px}
        .ag-machine-wrap{max-width:172px}
        .ag-emoji{font-size:clamp(.8rem,2.2vw,.95rem)}
        .ag-kicker{font-size:.66rem;letter-spacing:.12em}
        .ag-copy h1{font-size:clamp(1.6rem,1rem + 4.4vw,2.3rem);margin:6px 0 8px}
        .ag-intro{font-size:.92rem;line-height:1.5;margin:0 0 12px}
        .ag-chips{margin:0 0 6px;gap:6px}
        .ag-chips li{min-height:27px;padding:0 11px;font-size:.75rem;letter-spacing:.03em}
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
      .ag-berge-total-label{font-size:.75rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ag-muted)}
      .ag-berge-total-elev{font-size:2rem;font-weight:500;color:var(--ag-primary-dark);letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
      .ag-berge-gipfel-cmp{font-size:.8rem;color:var(--ag-muted);font-style:italic}
      .ag-berge-stats-kicker{
        font-size:.7rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
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
      .ag-berge-elev-input{font-size:1rem;font-weight:500}
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
      .ag-gipfel-name{font-size:1rem;font-weight:500;color:var(--ag-text);line-height:1.3;margin-bottom:2px;overflow-wrap:anywhere}
      .ag-gipfel-date{font-size:.78rem;color:var(--ag-muted);font-weight:500;letter-spacing:.04em;text-transform:uppercase}
      .ag-gipfel-elev{
        font-size:1.35rem;font-weight:500;
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
        font-size:.82rem;font-weight:500;opacity:.65;
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
        margin:0 0 7px;font-size:.68rem;font-weight:500;letter-spacing:.09em;
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
        font-size:.66rem;font-weight:500;font-variant-numeric:tabular-nums;
        background:var(--ag-surface-2);color:var(--ag-muted);margin-top:1px;
      }
      .ag-skin-body{display:flex;flex-direction:column;min-width:0}
      .ag-skin-name{font-size:.9rem;font-weight:500;color:var(--ag-text);line-height:1.3}
      .ag-skin-when{
        margin-left:6px;font-size:.62rem;font-weight:500;letter-spacing:.05em;
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
      .ag-milestone span{font-size:.95rem;font-weight:500;color:var(--ag-primary-dark);line-height:1.4}
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
      .ag-freikarte-hint{margin:0;font-size:.9rem;font-weight:500;color:var(--ag-primary-dark);line-height:1.4}
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
      .ag-quest-hint{margin:0;font-size:.9rem;font-weight:500;color:var(--ag-primary-dark);line-height:1.4}
      .ag-quest-done-btn{white-space:nowrap;flex:none}
      .ag-history-bestanden{
        margin:10px 0 0;font-size:.85rem;font-weight:500;color:var(--ag-gold);
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
        font-size:.72rem;font-weight:500;color:var(--ag-text);line-height:1.25;
        display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
      }
      .ag-trophy-date{font-size:.68rem;color:var(--ag-muted)}
      @media (prefers-color-scheme:dark){
        .ag-quest-wrap{background:linear-gradient(135deg,rgba(138,184,207,.14),rgba(224,167,93,.1));border-color:rgba(138,184,207,.3)}
        .ag-quest-hint{color:#a8cbd8}
        .ag-trophy-tile{background:linear-gradient(180deg,rgba(224,167,93,.12),rgba(224,167,93,.03));border-color:rgba(224,167,93,.3)}
      }

      .ag-quest-actions{display:flex;gap:8px;flex-wrap:wrap}
      .ag-quest-actions .ag-secondary{flex:none}
      .ag-beweis-thumb{
        width:100%;max-height:180px;object-fit:cover;border-radius:var(--ag-radius-sm,10px);
        border:1px solid rgba(185,120,46,.3);cursor:pointer;display:block;
      }
      .ag-history-beweis{
        margin-top:8px;width:96px;height:96px;object-fit:cover;display:block;
        border-radius:var(--ag-radius-sm,10px);border:1px solid rgba(185,120,46,.3);cursor:pointer;
      }
      .ag-trophy-tile{position:relative}
      .ag-trophy-tile.has-beweis{cursor:pointer;padding-top:6px}
      .ag-trophy-shot{
        width:100%;aspect-ratio:1;object-fit:cover;display:block;
        border-radius:calc(var(--ag-radius-sm,10px) - 3px);
      }
      .ag-trophy-tile.has-beweis .ag-trophy-emoji{
        position:absolute;top:10px;right:10px;font-size:1.05rem;
        filter:drop-shadow(0 1px 3px rgba(0,0,0,.55));
      }


      /* ── Evening mode: after 22:00 the machine winds down ── */
      .ag-widget.is-evening .ag-mach-orbit{animation-duration:70s}
      .ag-widget.is-evening .ag-mach-glow{animation-duration:9s;opacity:.7}
      .ag-widget.is-evening .ag-orbit span{opacity:.45}
      .ag-widget.is-evening .ag-emoji{opacity:.55;animation-duration:calc(var(--ag-emoji-duration,32s) * 2.2)}
      .ag-widget.is-evening .ag-machine-capsule{animation-duration:9s}
      .ag-widget.is-evening .ag-hero{filter:saturate(.85) brightness(.92)}

      /* ── Foil: a holographic sheen on Selten and JACKPOT cards ──
         An overlay that sweeps on its own, and follows the phone's tilt once
         motion access is granted (.has-tilt swaps the keyframes for the two
         custom properties motion.js writes). Screen blend keeps the text
         readable underneath; the card just catches light like a foil card. */
      .ag-widget[data-tone="rare"] .ag-result,
      .ag-widget[data-tone="jackpot"] .ag-result{position:relative;overflow:hidden;isolation:isolate}
      .ag-widget[data-tone="rare"] .ag-result::after,
      .ag-widget[data-tone="jackpot"] .ag-result::after{
        content:"";position:absolute;inset:0;pointer-events:none;z-index:0;border-radius:inherit;
        background:
          linear-gradient(115deg,transparent 32%,rgba(255,255,255,.10) 44%,rgba(255,230,160,.30) 50%,rgba(180,220,255,.16) 56%,transparent 68%);
        background-size:260% 260%;
        background-position:var(--ag-foil-x,0%) var(--ag-foil-y,0%);
        mix-blend-mode:screen;
        animation:ag-foil-sweep 6s ease-in-out infinite alternate;
      }
      .ag-widget[data-tone="jackpot"] .ag-result::after{
        background:
          linear-gradient(115deg,transparent 30%,rgba(255,215,130,.16) 42%,rgba(255,240,190,.42) 50%,rgba(255,200,120,.18) 58%,transparent 70%);
      }
      .ag-widget.has-tilt[data-tone="rare"] .ag-result::after,
      .ag-widget.has-tilt[data-tone="jackpot"] .ag-result::after{
        animation:none;transition:background-position .12s linear;
      }
      .ag-widget[data-tone="rare"] .ag-result > *,
      .ag-widget[data-tone="jackpot"] .ag-result > *{position:relative;z-index:1}
      @keyframes ag-foil-sweep{from{background-position:0% 0%}to{background-position:100% 100%}}
      @media (prefers-reduced-motion:reduce){
        .ag-widget[data-tone="rare"] .ag-result::after,
        .ag-widget[data-tone="jackpot"] .ag-result::after{animation:none}
      }

      /* Topo tiles are pale; dim them so the map sits in the dark UI without
         inverting the colours (an inverted topo map reads as nonsense). */
      #ag-gipfel-map .leaflet-tile{filter:brightness(.78) saturate(.85) contrast(1.05)}
      #ag-gipfel-map .leaflet-control-attribution{background:rgba(10,20,16,.7);color:#b5c8b2;font-size:.6rem}
      #ag-gipfel-map .leaflet-control-attribution a{color:#8fcf9e}

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
      .ag-install-nudge-title{margin:0 0 2px;font-size:.9rem;font-weight:500;color:var(--ag-primary-dark)}
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
      .ag-ping-banner [data-ag-ping-text]{font-size:.92rem;font-weight:500;color:var(--ag-primary-dark);line-height:1.4}
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
        color:var(--ag-text);font-weight:500;font-size:.95rem;font-family:inherit;
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
        /* flex:1 1 200px is a width hint in the row layout, but once the
           row turns into a column that 200px becomes a HEIGHT, and two
           short lines of text sit above 150px of nothing. */
        .ag-hug-text{flex-basis:auto}
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
        flex:none;font-size:.86rem;font-weight:500;font-variant-numeric:tabular-nums;
      }
      .ag-tokenrow-goal{font-weight:500;opacity:.5}
      /* Completed rows wrap so the button gets its own line — inline it stole
         enough width to break "Ein Ausflug in dein Traumcafé" over three. */
      .ag-tokenrow.is-done{flex-wrap:wrap}
      .ag-tokenrow-redeem{
        flex:1 0 100%;margin-top:9px;
        cursor:pointer;font:inherit;font-size:.8rem;font-weight:500;
        padding:8px 11px;border-radius:11px;
        border:none;background:var(--ag-gold);color:#1c1405;
      }
      .ag-tokenrow-redeem:active{transform:scale(.98)}

      /* ── Wunschkapsel card ── */
      .ag-wish-card{}
      .ag-wish-label{margin:0 0 6px;font-weight:500;font-size:1rem;color:var(--ag-text);letter-spacing:.01em}
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
      .ag-history-answer-label{margin:0 0 4px;font-size:.75rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--ag-primary);opacity:.8}
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
        color:rgba(224,167,80,.85);font-weight:500;
      }
      .ag-letter-title{
        margin:0 0 1.1rem;font-size:1.3rem;font-weight:500;line-height:1.2;
        color:rgba(238,248,236,.97);
        animation:ag-letter-rise 800ms cubic-bezier(.16,1,.3,1) both;
        animation-delay:200ms;
      }
      .ag-letter-body{animation:ag-letter-rise 700ms cubic-bezier(.16,1,.3,1) both;animation-delay:300ms;}
      .ag-letter-body p{
        margin:0 0 .8rem;line-height:1.7;font-size:.98rem;color:rgba(238,248,236,.88);
      }
      .ag-letter-body p:last-child{margin-bottom:0}
      .ag-letter-sign{font-style:italic;font-weight:500;color:rgba(143,207,158,.9)!important;}

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
      .ag-history-title{font-size:1.02rem;font-weight:500}
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
        font-size:.82rem;font-weight:500;
        color:var(--ag-muted);
        cursor:pointer;white-space:nowrap;
        transition:color 200ms;
      }
      .ag-glossary-tab.is-active{color:#fff;font-weight:500}
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
        font-size:.65rem;font-weight:500;letter-spacing:.02em;
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
      .ag-score-pill{font-weight:500;letter-spacing:.03em}

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
          font-size:.58rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;
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
        padding:10px 20px;font-size:.9rem;font-weight:500;font-family:inherit;
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
      .ag-werkstatt-entry-title{font-weight:500;font-size:.95rem}
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
        background:var(--ag-primary);border-color:transparent;color:#08150d;opacity:1;font-weight:500;
      }
      .ag-werkstatt-count{
        display:inline-block;margin-left:4px;padding:0 5px;border-radius:999px;
        background:rgba(0,0,0,.22);font-size:.72rem;font-weight:500;
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
      .ag-werkstatt-card-title{font-weight:500;font-size:.94rem;line-height:1.35}
      .ag-werkstatt-card-msg{font-size:.84rem;opacity:.75;margin-top:4px;line-height:1.5}

      /* Question and answer share one label treatment so the pair reads as a
         little exchange rather than two unrelated notes. */
      .ag-werkstatt-block-label{
        display:block;font-size:.66rem;font-weight:500;text-transform:uppercase;
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
        font-size:.68rem;font-weight:500;letter-spacing:.03em;
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
        color:#f4b4b4;opacity:1;font-weight:500;
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
      .ag-glossary-edit-btn{padding:0 12px;height:34px;font-size:.82rem;font-weight:500}
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
.ag-gipfel-map-title{font-weight:500;font-size:.9rem;color:var(--ag-muted)}
.ag-gipfel-map-toggles{display:flex;gap:6px}
.ag-gipfel-map-toggle{
  padding:5px 14px;border-radius:999px;border:1px solid var(--ag-border);
  background:none;cursor:pointer;font-family:inherit;font-size:.8rem;
  font-weight:500;color:var(--ag-muted);transition:background 140ms,color 140ms,border-color 140ms;
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

/* ═══════════════════════════════════════════════════════════════════
   LIQUID GLASS — the surface language for the whole app.
   Appended last on purpose: everything above defines layout and the
   older flat surfaces; this layer restyles the surfaces only, so it
   wins the cascade without touching a single layout rule. The app is
   dark-only, so there is one set of values, not two.
   ═══════════════════════════════════════════════════════════════════ */
.ag-widget{
  --glass-bg:rgba(255,255,255,.055);
  --glass-bg-2:rgba(255,255,255,.085);
  --glass-border:rgba(255,255,255,.13);
  --glass-hi:rgba(255,255,255,.20);
  --glass-blur:blur(22px) saturate(1.6);
  --glass-blur-light:blur(12px) saturate(1.4);
  --ag-radius-lg:26px;
  --ag-radius-md:18px;
}
/* Ambient colour behind the glass — soft green, gold and lake-blue pools
   the frosted surfaces actually have something to refract. */
body{
  background:
    radial-gradient(70% 45% at 12% -5%, rgba(47,122,79,.38), transparent 62%),
    radial-gradient(55% 38% at 92% 18%, rgba(185,120,46,.20), transparent 60%),
    radial-gradient(60% 40% at 50% 105%, rgba(55,106,131,.26), transparent 62%),
    #0a1410;
}
/* Cards: frosted, thin luminous rim, a specular line along the top. */
.ag-widget .ag-card{
  background:var(--glass-bg);
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
  border:1px solid var(--glass-border);
  border-radius:var(--ag-radius-lg);
  box-shadow:inset 0 1px 0 var(--glass-hi),inset 0 -1px 0 rgba(0,0,0,.18),0 18px 48px rgba(0,0,0,.34);
}
.ag-widget .ag-stage{
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 24px 60px rgba(0,0,0,.45);
  border:1px solid rgba(255,255,255,.08);
}
/* Nested surfaces inside cards: translucent, no blur (there can be
   dozens in Verlauf and a phone should not have to composite them all). */
.ag-widget .ag-history-item,
.ag-widget .ag-gipfel-card,
.ag-widget .ag-trophy-tile,
.ag-widget .ag-album-tile,
.ag-widget .ag-kalender,
.ag-widget .ag-mission-card,
.ag-widget .ag-gesprach-card,
.ag-widget .ag-stimmung-preview{
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.10);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.10);
}
.ag-widget .ag-history-item:hover,.ag-widget .ag-gipfel-card:hover{border-color:rgba(255,255,255,.18)}
/* Primary button: a lit glass pill. Secondary: a clear one. */
.ag-widget .ag-button{
  background:linear-gradient(180deg,rgba(143,207,158,.96),rgba(47,122,79,.96));
  color:#07130b;
  border:1px solid rgba(255,255,255,.28);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(0,0,0,.18),0 12px 32px rgba(47,122,79,.38);
}
.ag-widget .ag-button:active{transform:scale(.97)}
.ag-widget .ag-secondary{
  background:var(--glass-bg-2);
  color:var(--ag-text);
  border:1px solid var(--glass-border);
  backdrop-filter:var(--glass-blur-light);-webkit-backdrop-filter:var(--glass-blur-light);
  box-shadow:inset 0 1px 0 var(--glass-hi);
}
.ag-widget .ag-secondary:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.22)}
.ag-widget .ag-secondary:active{transform:scale(.97)}
/* Pills: badges, chips, streak, date, filter tabs. */
.ag-widget .ag-badge,
.ag-widget .ag-streak,
.ag-widget .ag-history-badge,
.ag-widget .ag-history-filter-chip,
.ag-widget .ag-pill{
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14);
  color:var(--ag-primary-dark);
}
.ag-widget .ag-history-filter-chip.is-active{background:rgba(143,207,158,.22);border-color:rgba(143,207,158,.45);color:#eef8ec}
.ag-widget .ag-chips li{
  background:rgba(255,255,255,.08);
  border-color:rgba(255,255,255,.20);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22);
}
.ag-widget .ag-chip-clickable:active{transform:scale(.96)}
/* Inputs. */
.ag-widget .ag-wish-input,
.ag-widget .ag-prompt-textarea,
.ag-widget textarea,
.ag-widget input[type="text"],
.ag-widget input[type="number"]{
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08);
  color:var(--ag-text);
}
.ag-widget .ag-wish-input:focus,.ag-widget textarea:focus,.ag-widget input:focus{border-color:rgba(143,207,158,.6)}
/* Tinted panels keep their hue but become glass. */
.ag-widget .ag-hug-button{
  background:linear-gradient(135deg,rgba(232,164,164,.22),rgba(185,120,46,.18));
  border:1px solid rgba(255,255,255,.18);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22);
  backdrop-filter:var(--glass-blur-light);-webkit-backdrop-filter:var(--glass-blur-light);
}
.ag-widget .ag-quest-wrap,.ag-widget .ag-freikarte-wrap,.ag-widget .ag-install-nudge,.ag-widget .ag-milestone{
  backdrop-filter:var(--glass-blur-light);-webkit-backdrop-filter:var(--glass-blur-light);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16);
}
/* Bottom nav: a little clearer, a little more lit. */
.ag-widget .ag-bottomnav{
  background:rgba(14,28,17,.55);
  backdrop-filter:blur(26px) saturate(1.8);-webkit-backdrop-filter:blur(26px) saturate(1.8);
  border-color:rgba(255,255,255,.20);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 14px 48px rgba(0,0,0,.55);
}
/* Type: a touch tighter, so the glass reads calm. */
.ag-widget .ag-result h2{letter-spacing:-.02em}
.ag-widget .ag-wish-label{letter-spacing:-.01em}
@media (prefers-reduced-transparency:reduce){
  .ag-widget .ag-card,.ag-widget .ag-secondary,.ag-widget .ag-bottomnav{
    backdrop-filter:none;-webkit-backdrop-filter:none;background:rgba(18,30,22,.96);
  }
}

/* ── Reactions ── */
.ag-widget .ag-reactions{display:flex;align-items:center;gap:8px;margin-top:14px;flex-wrap:wrap}
.ag-widget .ag-reactions-label{font-size:.78rem;color:var(--ag-muted);margin-right:2px}
.ag-widget .ag-reaction{
  width:40px;height:40px;border-radius:999px;font-size:1.25rem;line-height:1;cursor:pointer;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14);
  transition:transform 140ms var(--ag-ease),background 140ms var(--ag-ease),border-color 140ms var(--ag-ease);
}
.ag-widget .ag-reaction:active{transform:scale(.9)}
.ag-widget .ag-reaction.is-chosen{background:rgba(143,207,158,.24);border-color:rgba(143,207,158,.55);transform:scale(1.08)}
.ag-widget .ag-history-reaction{font-size:.95rem;line-height:1}

/* ── Ferien-Schutz ── */
.ag-widget .ag-ferien{margin:14px 0 0;padding:10px 14px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.10)}
.ag-widget .ag-ferien-summary{cursor:pointer;list-style:none;font-size:.9rem;color:var(--ag-text)}
.ag-widget .ag-ferien-summary::-webkit-details-marker{display:none}
.ag-widget .ag-ferien-count{color:var(--ag-muted);font-size:.8rem}
.ag-widget .ag-ferien-note{margin:8px 0 10px;font-size:.82rem;color:var(--ag-muted);line-height:1.45}
.ag-widget .ag-ferien-form{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px}
.ag-widget .ag-ferien-input{min-width:0;width:100%;padding:8px 10px;border-radius:12px;font-family:inherit;font-size:16px;color-scheme:dark}
.ag-widget .ag-ferien-sep{font-size:.82rem;color:var(--ag-muted)}
.ag-widget .ag-ferien-add{grid-column:1 / -1;justify-self:start;min-height:38px;padding:0 14px;font-size:.88rem}
.ag-widget .ag-ferien-list{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:6px}
.ag-widget .ag-ferien-item{display:flex;align-items:center;justify-content:space-between;font-size:.86rem;padding:6px 10px;border-radius:10px;background:rgba(255,255,255,.05)}
.ag-widget .ag-ferien-remove{background:none;border:none;color:var(--ag-muted);cursor:pointer;font-size:.9rem;padding:4px 6px}

/* ── Capsule press-and-hold ── */
.ag-widget .ag-machine-capsule{cursor:pointer;touch-action:none;pointer-events:auto;z-index:4}
.ag-widget.is-charging .ag-machine-capsule{
  animation:none;
  transform:translate(-50%,-50%) scale(1.22);
  box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 34px rgba(255,236,170,.45);
  transition:transform 650ms cubic-bezier(.2,.8,.2,1),box-shadow 650ms ease;
}
.ag-widget.is-charged .ag-machine-capsule{
  transform:translate(-50%,-50%) scale(1.32);
  box-shadow:0 14px 30px rgba(0,0,0,.45),0 0 56px rgba(255,236,170,.75);
}
.ag-widget.is-charging .ag-mach-glow{animation-duration:.6s}

/* ── Draw button: aurora glass ──
   A blurred conic halo behind the pill cycles its hue, a sheen sweeps over
   the face, the orb breathes. Pressed, it sinks. */
@keyframes ag-hue{to{filter:blur(10px) hue-rotate(360deg)}}
@keyframes ag-sheen{0%{background-position:200% 0}100%{background-position:-60% 0}}
.ag-widget .ag-button{
  position:relative;isolation:isolate;overflow:visible;
  background:linear-gradient(135deg,#a9e3b5 0%,#5fb27a 45%,#2f7a4f 100%);
  color:#07130b;letter-spacing:.01em;
  border:1px solid rgba(255,255,255,.34);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -2px 0 rgba(0,0,0,.18),0 10px 28px rgba(47,122,79,.42);
  transition:transform 160ms var(--ag-ease),box-shadow 220ms var(--ag-ease);
}
.ag-widget .ag-button::before{
  content:"";position:absolute;inset:-3px;border-radius:inherit;z-index:-1;
  background:conic-gradient(from 0deg,#8fcf9e,#e0a75d,#8ab8cf,#c9a7ff,#8fcf9e);
  filter:blur(10px) hue-rotate(0deg);opacity:.8;
  animation:ag-hue 5s linear infinite;
}
.ag-widget .ag-button::after{
  content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.55) 50%,transparent 58%);
  background-size:260% 100%;
  animation:ag-sheen 3.4s ease-in-out infinite;
  mix-blend-mode:screen;
}
.ag-widget .ag-button:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -2px 0 rgba(0,0,0,.18),0 16px 36px rgba(47,122,79,.5)}
.ag-widget .ag-button:active{transform:translateY(1px) scale(.97);box-shadow:inset 0 2px 6px rgba(0,0,0,.28),0 6px 18px rgba(47,122,79,.35)}
.ag-widget .ag-button[disabled]::before{animation-duration:1.2s;opacity:1}
.ag-widget .ag-button-orb{width:16px;height:16px;box-shadow:0 0 14px rgba(255,236,170,.9),0 0 4px #fff;animation:ag-pulse 2.6s ease-in-out infinite}
.ag-widget.has-drawn .ag-button::before{opacity:.35;animation-duration:12s}

/* ── Reveal spectacle ── */
@keyframes ag-rumble{
  0%,100%{transform:translate(0,0) rotate(0)}
  20%{transform:translate(-2px,1px) rotate(-.3deg)}
  40%{transform:translate(2px,-1px) rotate(.3deg)}
  60%{transform:translate(-1px,-2px) rotate(-.2deg)}
  80%{transform:translate(1px,2px) rotate(.2deg)}
}
.ag-widget.is-rumbling .ag-stage{animation:ag-rumble 90ms linear infinite}
.ag-widget.is-rumbling-hard .ag-stage{animation:ag-rumble 60ms linear infinite;transform-origin:50% 60%}
.ag-widget.is-rumbling .ag-machine-capsule{animation:ag-shake 260ms var(--ag-ease) infinite}
@keyframes ag-flash-in{0%{opacity:0}18%{opacity:1}100%{opacity:0}}
.ag-flash{
  position:fixed;inset:0;z-index:2000;pointer-events:none;
  background:radial-gradient(circle at 50% 38%,var(--ag-flash-color),transparent 72%);
  mix-blend-mode:screen;opacity:0;
  animation:ag-flash-in 760ms ease-out both;
}
.ag-widget.is-shutter .ag-stage{animation:ag-shutter 520ms ease-out}
@keyframes ag-shutter{0%{filter:brightness(1)}12%{filter:brightness(3.2) contrast(.6)}100%{filter:brightness(1)}}
@keyframes ag-shockwave{
  0%{transform:translate(-50%,-50%) scale(.2);opacity:.95;border-width:6px}
  100%{transform:translate(-50%,-50%) scale(3.6);opacity:0;border-width:1px}
}
.ag-shockwave{
  position:absolute;left:50%;top:46%;width:60px;height:60px;border-radius:999px;
  border:6px solid rgba(255,236,170,.85);
  box-shadow:0 0 24px rgba(255,236,170,.6),inset 0 0 18px rgba(255,236,170,.4);
  pointer-events:none;z-index:5;
  animation:ag-shockwave 1100ms cubic-bezier(.16,.84,.3,1) both;
}
/* The card lands: drops in from above with a little tilt and a settle. */
@keyframes ag-card-land{
  0%{opacity:0;transform:perspective(900px) translateY(-26px) rotateX(-16deg) scale(.94);filter:blur(6px)}
  60%{opacity:1;transform:perspective(900px) translateY(6px) rotateX(2deg) scale(1.01);filter:blur(0)}
  100%{transform:perspective(900px) translateY(0) rotateX(0) scale(1)}
}
.ag-widget.is-revealed .ag-result{animation:ag-card-land 760ms cubic-bezier(.2,.9,.25,1.05) both}
.ag-widget.is-revealed[data-tone=jackpot] .ag-result,
.ag-widget.is-revealed[data-tone=special] .ag-result{animation:ag-card-land 760ms cubic-bezier(.2,.9,.25,1.05) both,ag-tone-pulse 3.2s ease-in-out .8s infinite}
@media (prefers-reduced-motion:reduce){
  .ag-widget .ag-button::before,.ag-widget .ag-button::after,.ag-widget .ag-button-orb{animation:none}
  .ag-widget.is-rumbling .ag-stage,.ag-widget.is-rumbling .ag-machine-capsule{animation:none}
  .ag-shockwave{display:none}
  .ag-widget.is-revealed .ag-result{animation:none}
}

/* ── Actions: one row — Kopieren · An Fionn schicken · ☆ ── */
.ag-widget .ag-actions-row{display:flex;flex-wrap:nowrap;gap:8px;margin-top:14px}
.ag-widget .ag-action{min-height:38px;padding:0 12px;font-size:.82rem;letter-spacing:0;white-space:nowrap}
.ag-widget .ag-actions-row .ag-action{flex:1 1 0;min-width:0;justify-content:center}
.ag-widget .ag-actions-row .ag-action-send{flex:1.35 1 0}
.ag-widget .ag-actions-row .ag-star{flex:0 0 40px;width:40px;padding:0;font-size:1rem}
.ag-widget .ag-actions-extra{margin-top:8px;gap:8px}
.ag-widget .ag-actions-extra .ag-action{flex:1 1 0;min-width:0;justify-content:center}

/* ── Ferien-Schutz: the icon is the switch ── */
.ag-widget .ag-ferien-head{display:flex;align-items:center;gap:10px}
.ag-widget .ag-ferien-toggle{
  width:36px;height:36px;border-radius:999px;font-size:1.1rem;line-height:1;cursor:pointer;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14);transition:transform 140ms var(--ag-ease),background 140ms;
}
.ag-widget .ag-ferien-toggle:active{transform:scale(.92)}
.ag-widget .ag-ferien-toggle[aria-expanded="true"]{background:rgba(143,207,158,.2);border-color:rgba(143,207,158,.45)}
.ag-widget .ag-ferien-title{font-size:.9rem;color:var(--ag-text)}
.ag-widget .ag-ferien-body{margin-top:10px}

/* ── Elegance pass ── */
/* Icons: one stroke weight, tinted by state. */
.ag-widget .ag-bottomnav-btn-icon svg,.ag-widget .ag-tab svg{
  width:22px;height:22px;display:block;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;
}
.ag-widget .ag-bottomnav-btn-icon{display:flex;align-items:center;justify-content:center;height:24px;filter:none}
.ag-widget .ag-bottomnav-btn.is-active .ag-bottomnav-btn-icon svg{stroke-width:1.9}
.ag-widget .ag-bottomnav-btn[data-ag-tab="lieblinge"].is-active svg path{fill:currentColor;fill-opacity:.25}
.ag-widget .ag-tab{display:inline-flex;align-items:center;justify-content:center}
/* Type: numbers that line up, German that hyphenates, dates without ISO. */
.ag-widget .ag-streak,.ag-widget .ag-kalender,.ag-widget .ag-history-date,.ag-widget .ag-date,
.ag-widget .ag-berge-figure,.ag-widget .ag-tokenbank,.ag-widget .ag-history-tally{font-variant-numeric:tabular-nums}
.ag-widget .ag-result p,.ag-widget .ag-history-message,.ag-widget .ag-wish-note,.ag-widget .ag-mini-copy{
  hyphens:auto;-webkit-hyphens:auto;hyphenate-limit-chars:8 4 4;
}
.ag-widget .ag-date{font-size:.8rem;color:var(--ag-muted);letter-spacing:.01em}
/* Photo: the picture bleeds to the card edge, caption set over its foot. */
.ag-widget .ag-card{--ag-card-pad:clamp(16px,2.6vw,24px);padding:var(--ag-card-pad)}
.ag-widget .ag-result .ag-photo{
  position:relative;margin:14px calc(-1 * var(--ag-card-pad)) 0;
  border-radius:0;border:0;background:#0b1310;
}
.ag-widget .ag-result .ag-photo figcaption{
  position:absolute;left:0;right:0;bottom:0;z-index:2;border-top:0;
  padding:34px var(--ag-card-pad) 14px;
  background:linear-gradient(180deg,rgba(5,12,8,0),rgba(5,12,8,.78));
  color:#fffdf2;font-family:"Boska",Georgia,serif;font-style:italic;font-size:1.02rem;line-height:1.35;
  text-shadow:0 1px 8px rgba(0,0,0,.5);
}
.ag-widget .ag-result .ag-photo[hidden]{display:none}
/* The intro paragraph: charming once, read three hundred times. */
.ag-widget .ag-intro{display:none}
.ag-widget .ag-copy h1{margin-bottom:14px}
/* Tabs: a rise-and-fade, so the switch reads as one surface changing. */
@keyframes ag-panel-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
.ag-widget .ag-panel.is-entering{animation:ag-panel-in 200ms var(--ag-ease) both}
@media (prefers-reduced-motion:reduce){.ag-widget .ag-panel.is-entering{animation:none}}

/* ── Flow pass ── */
/* The header folds once the day is drawn: small machine, one-line title. */
@media (max-width:760px){
  .ag-widget .ag-machine-wrap{transition:max-width 600ms var(--ag-ease)}
  .ag-widget .ag-copy h1{transition:font-size 400ms var(--ag-ease),margin 400ms var(--ag-ease)}
  .ag-widget.has-drawn .ag-machine-wrap{max-width:112px}
  .ag-widget.has-drawn .ag-hero{gap:4px}
  .ag-widget.has-drawn .ag-copy h1{font-size:clamp(1.25rem,1rem + 2.6vw,1.7rem);margin:2px 0 10px}
  .ag-widget.has-drawn .ag-kicker{font-size:.62rem}
  .ag-widget.has-drawn .ag-emoji{font-size:.7rem}
}
.ag-widget .ag-result{scroll-margin-top:12px}
/* One quiet strip under the capsule: a hairline, the reactions, the star at
   the right; Kopieren and An Fionn schicken as two equal buttons beneath. */
.ag-widget .ag-reactions{border-top:1px solid rgba(255,255,255,.08);padding-top:12px;margin-top:16px;gap:8px}
.ag-widget .ag-reactions .ag-star{margin-left:auto;font-size:1rem;color:var(--ag-muted)}
.ag-widget .ag-reactions .ag-star.is-starred{color:var(--ag-gold);border-color:rgba(224,167,93,.5);background:rgba(224,167,93,.14)}
.ag-widget .ag-actions-row{margin-top:10px}
/* Sync status: a dot. Tap for the sentence, for a moment. */
.ag-widget .ag-sync-status{
  display:flex;align-items:center;justify-content:center;gap:7px;
  min-height:24px;margin:0;font-size:0;opacity:1;cursor:pointer;color:var(--ag-muted);
  transition:font-size 160ms var(--ag-ease);
}
.ag-widget .ag-sync-status::before{content:"";width:6px;height:6px;border-radius:999px;background:var(--ag-muted);opacity:.45;flex:none}
.ag-widget .ag-sync-status[data-ag-sync-state="ok"]::before{background:#8fcf9e;opacity:.9;box-shadow:0 0 8px rgba(143,207,158,.5)}
.ag-widget .ag-sync-status[data-ag-sync-state="error"]::before{background:#e0a75d;opacity:.9}
.ag-widget .ag-sync-status.is-open{font-size:.72rem}
    `;function bs(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=hs.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function ys(){return`
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
    `}function ws(){return`
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
    `}const vs=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${ys()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${ws()}
                <div class="ag-machine-capsule" data-capsule role="button" tabindex="0" aria-label="Kapsel: halten zum Ziehen" title="Halten zum Ziehen">
                  <span class="ag-capsule-shine"></span>
                </div>
                <div class="ag-orbit" aria-hidden="true">
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
                  <button class="ag-tab is-active" type="button" role="tab" aria-selected="true" data-ag-tab="today" aria-label="Heute" title="Heute"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7" width="17" height="10" rx="5"/><path d="M12 7v10"/></svg></button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="history" aria-label="Verlauf" title="Verlauf"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg></button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="lieblinge" aria-label="Lieblinge" title="Lieblinge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.4l-5.1 2.8 1.1-5.6L3.8 9.7l5.7-.7z"/></svg></button>
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="berge" aria-label="Berge" title="Berge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19L9.5 8l3.3 5.3L15 10l6 9z"/><path d="M8 10.5l1.5-1.2 1.5 1.2"/></svg></button>
                  <a class="ag-tab" href="./lichter.html" aria-label="Lichtsteuerung" title="Lichtsteuerung"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.5-1 2.5h-5c0-1-.4-1.9-1-2.5z"/></svg></a>
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
                <img class="ag-beweis-thumb" data-ag-beweis-thumb alt="Beweisfoto" hidden />
                <div class="ag-quest-actions">
                  <button class="ag-secondary ag-quest-photo-btn" type="button" data-ag-quest-photo hidden>📸 Beweis anhängen</button>
                  <button class="ag-secondary ag-quest-done-btn" type="button" data-ag-quest-done hidden>Bestanden ✓</button>
                </div>
                <input type="file" accept="image/*" data-ag-beweis-file hidden />
              </div>
              <div class="ag-freikarte-wrap" data-ag-freikarte-wrap hidden>
                <p class="ag-freikarte-hint">🎟️ Du hast eine Freikarte. Nochmal ziehen?</p>
                <button class="ag-secondary ag-freikarte-btn" type="button" data-ag-freikarte-redeem>Freikarte einlösen</button>
              </div>
              <figure class="ag-photo" data-ag-photo-wrap hidden>
                <div class="ag-media-stage" data-ag-photo-media></div>
                <figcaption data-ag-photo-caption hidden></figcaption>
              </figure>
              <div class="ag-reactions" data-ag-reactions hidden>
                <button class="ag-reaction" type="button" data-ag-react="🥹" aria-label="Reaktion: gerührt">🥹</button>
                <button class="ag-reaction" type="button" data-ag-react="😂" aria-label="Reaktion: lachen">😂</button>
                <button class="ag-reaction" type="button" data-ag-react="🙃" aria-label="Reaktion: na gut">🙃</button>
                <button class="ag-reaction ag-star" type="button" data-ag-star title="Als Lieblingspreis speichern" aria-label="Als Lieblingspreis speichern">☆</button>
              </div>
              <div class="ag-actions ag-actions-row">
                <button class="ag-secondary ag-action" type="button" data-ag-copy>Kopieren</button>
                <a class="ag-secondary ag-action ag-action-send ag-link" data-ag-send href="#" rel="noopener">An Fionn schicken</a>
              </div>
              <div class="ag-actions ag-actions-extra" data-ag-actions-extra hidden>
                <button class="ag-secondary ag-action ag-save-img" type="button" data-ag-save-img hidden>Als Bild speichern</button>
                <button class="ag-secondary ag-action" type="button" data-ag-wallpaper hidden>Als Hintergrund</button>
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
                <div class="ag-ferien" data-ag-ferien>
                <div class="ag-ferien-head">
                  <button class="ag-ferien-toggle" type="button" data-ag-ferien-toggle aria-expanded="false" aria-label="Ferien-Schutz öffnen">🏖️</button>
                  <span class="ag-ferien-title">Ferien-Schutz <span class="ag-ferien-count" data-ag-ferien-count hidden></span></span>
                </div>
                <div class="ag-ferien-body" data-ag-ferien-body hidden>
                  <p class="ag-ferien-note">Tage in den Ferien unterbrechen den Streak nicht. Sie zählen auch nicht mit.</p>
                  <div class="ag-ferien-form">
                    <input class="ag-ferien-input" type="date" data-ag-ferien-from aria-label="Von">
                    <span class="ag-ferien-sep">bis</span>
                    <input class="ag-ferien-input" type="date" data-ag-ferien-to aria-label="Bis">
                    <button class="ag-secondary ag-ferien-add" type="button" data-ag-ferien-add>Eintragen</button>
                  </div>
                  <ul class="ag-ferien-list" data-ag-ferien-list></ul>
                </div>
              </div>
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
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7" width="17" height="10" rx="5"/><path d="M12 7v10"/></svg></span>
          <span class="ag-bottomnav-btn-label">Heute</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="history">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg></span>
          <span class="ag-bottomnav-btn-label">Verlauf</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="lieblinge" aria-label="Lieblinge">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.4l-5.1 2.8 1.1-5.6L3.8 9.7l5.7-.7z"/></svg></span>
          <span class="ag-bottomnav-btn-label">Lieblinge</span>
        </button>
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="berge" aria-label="Berge">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19L9.5 8l3.3 5.3L15 10l6 9z"/><path d="M8 10.5l1.5-1.2 1.5 1.2"/></svg></span>
          <span class="ag-bottomnav-btn-label">Berge</span>
        </button>
        <a class="ag-bottomnav-btn ag-bottomnav-link" href="./lichter.html" aria-label="Lichtsteuerung">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.5-1 2.5h-5c0-1-.4-1.9-1-2.5z"/></svg></span>
          <span class="ag-bottomnav-btn-label">Licht</span>
        </a>
      </nav>
    `;function xs(){z.className="ag-widget",z.setAttribute("aria-labelledby","ag-title"),z.innerHTML=vs}function ks(e,t=1400,a=.82){return new Promise((n,r)=>{const o=URL.createObjectURL(e),i=new Image;i.onload=()=>{URL.revokeObjectURL(o);try{const s=Math.min(1,t/Math.max(i.naturalWidth||1,i.naturalHeight||1)),l=Math.max(1,Math.round((i.naturalWidth||1)*s)),c=Math.max(1,Math.round((i.naturalHeight||1)*s)),p=document.createElement("canvas");p.width=l,p.height=c,p.getContext("2d").drawImage(i,0,0,l,c);const f=p.toDataURL("image/jpeg",a);if(!f||f==="data:,"){r(new Error("encode failed"));return}n(f)}catch(s){r(s)}},i.onerror=()=>{URL.revokeObjectURL(o),r(new Error("decode failed"))},i.src=o})}async function Ss(e,t,a){const n=g.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await ks(a),o=r.slice(r.indexOf(",")+1),i=new AbortController,s=setTimeout(()=>i.abort(),3e4);let l;try{l=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:i.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:o})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await l.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function ae(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let o=0;o<e;o++){const i=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,c=Math.random()*100,p=Math.random()*.6,f=1.4+Math.random()*.8;i.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${f}s ${p}s ease-in forwards;transform-origin:center;`,i.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(i)}if(!document.getElementById("ag-confetti-style")){const o=document.createElement("style");o.id="ag-confetti-style",o.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(o)}setTimeout(()=>r.remove(),3e3)}const ze=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],qn=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],Un="affektions-gacha:mission-done:v1",jn="affektions-gacha:mission-feedback:v1";function oa(){var o,i;const e=(o=g.missions)==null?void 0:o.pairs;if(!Array.isArray(e)||!e.length)return null;const t=_(((i=g.theme)==null?void 0:i.timezone)||"UTC"),a=et(`${g.theme.secret}|mission|${t}`,e.length),n=e[a];return K()==="fionn"?n.fionn:n.lennart}function On(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${Un}:${K()}`)===t}catch{return!1}}function Es(){var e,t;try{const a=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${Un}:${K()}`,a);const n=K(),r=oa(),o=new Date().toISOString();Ls({day:a,player:n,mission:r,doneAt:o});const i=(t=g.backup)==null?void 0:t.endpointUrl;i&&r&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:r,doneAt:o}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function Fn(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${jn}:${K()}`)===t}catch{return!1}}function Ts(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${jn}:${K()}`,t)}catch{}}function Cs(e,t){var i,s;const a=_(((i=g.theme)==null?void 0:i.timezone)||"UTC"),n=K(),r=oa();zs(a,n,{rating:e,comment:t||""}),Ts();const o=(s=g.backup)==null?void 0:s.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:r,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function Ls(e){const t=ct(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),Yt(t)}function zs(e,t,a){const n=ct(),r=n.findIndex(o=>o.day===e&&o.player===t);r>=0&&(n[r]={...n[r],...a},Yt(n))}function As(e,t){var c;if(!e)return;const a=ct(),n=((c=g.theme)==null?void 0:c.timezone)||"UTC",r=_(n),o=new Map;for(const p of a)o.has(p.day)||o.set(p.day,{}),o.get(p.day)[p.player]=p;const i=Array.from(o.keys()).sort((p,f)=>f.localeCompare(p)).slice(0,30);if(!i.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},l=p=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(p+"T12:00:00Z"))}catch{return p}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+i.map(p=>{const f=o.get(p),m=f.lennart,h=f.fionn,b=p===r,y=[];if(m&&t!=="fionn"){const w=m.doneAt?'<span class="ag-log-done">✓</span>':"",E=m.rating?`<span class="ag-log-rating">${s[m.rating]||""}</span>`:"";y.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${P(m.mission||"")}</span>${w}${E}</div>`)}if(h&&t!=="lennart"){const w=h.doneAt?'<span class="ag-log-done">✓</span>':"",E=h.rating?`<span class="ag-log-rating">${s[h.rating]||""}</span>`:"";y.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${P(h.mission||"")}</span>${w}${E}</div>`)}return y.length?`<div class="ag-log-day${b?" ag-log-today":""}"><span class="ag-log-date">${l(p)}</span>${y.join("")}</div>`:""}).filter(Boolean).join("")}function Hn(){const e=d("#ag-mission-panel");if(!e)return;const t=d("#ag-mission-text"),a=d("#ag-mission-actions"),n=d("#ag-mission-feedback"),r=d("#ag-mission-feedback-sent"),o=d("#ag-mission-done-note"),i=e.querySelector(".ag-mini-copy");i&&(i.hidden=!0);const s=oa();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const l=On(),c=Fn();a&&(a.hidden=l),n&&(n.hidden=!l,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(p=>{p.hidden=c})),r&&(r.hidden=!c),o&&(o.hidden=!l),e.querySelectorAll(".ag-mission-rate-btn").forEach(p=>p.classList.remove("is-selected")),As(d("#ag-mission-log"),K()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Is(){const e=d("#ag-mission-panel");e&&(e.hidden=!0)}let xt=-1;function Rn(){const e=d("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Ja);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<ze.length){xt=a;const n=d("#ag-gesprach-question");n&&(n.textContent=ze[a]);return}}}catch{}Wn()}}function Ms(){const e=d("#ag-gesprach-panel");e&&(e.hidden=!0)}function Wn(){let e;do e=Math.floor(Math.random()*ze.length);while(e===xt&&ze.length>1);xt=e;try{localStorage.setItem(Ja,String(e))}catch{}const t=d("#ag-gesprach-question");t&&(t.textContent=ze[e])}function $s(){const e=ze[xt]||"";if(!e)return;const t=g.theme&&g.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Gn(){var e;return!!((e=g.quest)!=null&&e.enabled&&at(g))}function Kn(){const e=d("#ag-quest-panel");e&&(e.hidden=!1,Yn())}function Bs(){const e=d("#ag-quest-panel");e&&(e.hidden=!0)}function Yn(){const e=at(g),t=_e(),a=d("#ag-quest-challenge"),n=d("#ag-quest-hint-history"),r=d("#ag-quest-loading"),o=d("#ag-quest-actions"),i=d("#ag-quest-result"),s=d("#ag-quest-points"),l=d("#ag-quest-copy"),c=d("#ag-quest-title"),p=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),o&&(o.hidden=!0);return}if(a&&(a.textContent=p),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((f,m)=>`<div class="ag-hint-item"><span class="ag-hint-num">${m+1}</span><p>${f}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),o&&(o.hidden=!0),i&&(i.textContent=t.successMessage||"",i.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${gt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),o&&(o.hidden=!1),i&&(i.hidden=!0),s&&(s.hidden=!0)}async function Ds(e){if(!e)return;const t=d("#ag-quest-actions"),a=d("#ag-quest-loading"),n=d("#ag-quest-result"),r=d("#ag-quest-points"),o=d("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const i=await Ns(e),s=_e(),l=at(g),c=(l==null?void 0:l.prompt)||"",p=(l==null?void 0:l.solution)||"";try{const f=await Ps(i,c,p,s.attempts+1,s.hints);if(s.attempts+=1,f.success){const m=Qa[Math.min(s.attempts-1,Qa.length-1)],h=Mi(m);s.solved=!0,s.pointsEarned=m,s.successMessage=f.message||"Perfekt.",Jt(s),te(),n&&(n.textContent=f.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${m} Punkte · Gesamt: ${h}`,r.hidden=!1),a&&(a.hidden=!0),o&&(o.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=d("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),I([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],f.hint||"Versuch nochmal."],Jt(s),Yn()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Ns(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Ps(e,t,a,n,r){var s;const o=(s=g.quest)==null?void 0:s.proxyUrl;if(!o)throw new Error("no proxy");const i=await fetch(o,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!i.ok)throw new Error("proxy error");return i.json()}function _s(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),o=r.getChannelData(0);for(let c=0;c<n;c++)o[c]=Math.random()*2-1;const i=t.createBufferSource();i.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),i.connect(s),s.connect(l),l.connect(t.destination),i.start(a),i.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,p,f,m,h])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(c,a+f),b.frequency.exponentialRampToValueAtTime(p,a+f+m*.55);const y=t.createGain();y.gain.setValueAtTime(0,a+f),y.gain.linearRampToValueAtTime(h,a+f+.09),y.gain.exponentialRampToValueAtTime(.001,a+f+m),b.connect(y),y.connect(t.destination),b.start(a+f),b.stop(a+f+m+.05)})}catch{}}function qs(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const o=document.createElement("span");o.className="ag-letter-word",o.textContent=n,o.style.animationDelay=`${320+r*155}ms`,a.appendChild(o),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Vn(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function Jn(){const e=d("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),I([20,60,20]),_s();const t=d("#ag-letter-photo");if(t&&g.photos&&g.photos.length){const a=Re(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Us()}async function Us(){var n;const e=d("#ag-letter-body");if(!e)return;qs(e);const t=(n=g.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const o=await r.json();if(o.paragraphs&&o.paragraphs.length){Vn(e,o.paragraphs);return}}}catch{}const a=qn[Math.floor(Math.random()*qn.length)];Vn(e,a)}function ia(){const e=d("#ag-letter-overlay");e&&(e.hidden=!0)}let sa=null;function js(){if(!sa)try{sa=new(window.AudioContext||window.webkitAudioContext)}catch{}return sa}function Os(){try{return window.localStorage.getItem(ri)!=="off"}catch{return!0}}function G(e,t,a,n,r=.15,o="sine"){const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type=o,i.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(r,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),i.start(l),i.stop(l+n+.05)}function kt(e){if(!Os())return;const t=js();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":G(t,280,0,.18,.08,"sine"),G(t,210,.12,.22,.06,"sine");break;case"cursed":G(t,220,0,.12,.1,"triangle"),G(t,170,.09,.28,.07,"triangle");break;case"uncommon":G(t,523,0,.14,.14,"sine"),G(t,784,.1,.22,.12,"sine");break;case"rare":G(t,523,0,.12,.14,"sine"),G(t,659,.09,.12,.14,"sine"),G(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>G(t,a,n*.09,.18,.13,"sine")),G(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>G(t,a,n*.08,.16,.13,"sine")),G(t,2093,.45,.5,.05,"sine");break;default:G(t,523,0,.12,.13,"sine"),G(t,659,.09,.18,.1,"sine");break}}function la(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC"),a=N(),r=U().some(o=>o.token===a&&o.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}const Zn="affektions-gacha:motion:v1",Fs=22,Hs=1500;let da=null,ca=null,ga=!1,Xn=0;function Qn(){try{return window.localStorage.getItem(Zn)||""}catch{return""}}function Rs(e){try{window.localStorage.setItem(Zn,e)}catch{}}function Ws(e){const t=e.accelerationIncludingGravity;if(!t||t.x===null||Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z)<Fs)return;const n=Date.now();n-Xn<Hs||(Xn=n,da&&da())}function Gs(e){if(!ca||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));ca(t,a)}function pa(){ga||(ga=!0,window.addEventListener("devicemotion",Ws,{passive:!0}),window.addEventListener("deviceorientation",Gs,{passive:!0}),z&&z.classList.add("has-tilt"))}async function Ks(){const e=window.DeviceMotionEvent;if(!(e&&typeof e.requestPermission=="function")){pa();return}if(Qn()!=="denied")try{const a=await e.requestPermission(),n=window.DeviceOrientationEvent;if(n&&typeof n.requestPermission=="function")try{await n.requestPermission()}catch{}Rs(a==="granted"?"granted":"denied"),a==="granted"&&pa()}catch{}}function Ys({onShake:e,onTilt:t}={}){if(da=e||null,ca=t||null,typeof window>"u")return;const a=window.DeviceMotionEvent;if(!a)return;if(typeof a.requestPermission!="function"){pa();return}const n=()=>{Ks().then(()=>{(ga||Qn()==="denied")&&document.removeEventListener("click",n)})};document.addEventListener("click",n)}const St={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function er(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Vs(e){if(er())return;const t=St[e]||St.soft;t.rumble!=="none"&&(z.classList.add("is-rumbling"),t.rumble==="hard"&&z.classList.add("is-rumbling-hard"))}function Js(){z.classList.remove("is-rumbling","is-rumbling-hard")}function ua(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function tr(e=0){const t=z.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function Zs(e){const t=St[e]||St.soft;if(er()){ua(t.flash);return}tr(0),tr(160),ua(t.flash),t.double&&ua(t.flash,260),t.shutter&&z.classList.add("is-shutter"),setTimeout(()=>z.classList.remove("is-shutter"),700);try{ae(t.particles,t.palette)}catch{}}const Xs=["So","Mo","Di","Mi","Do","Fr","Sa"];function Qs(e){try{const[t,a,n]=_(e||"UTC").split("-").map(Number),r=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return Xs[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(r)]||null}catch{return null}}function el(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function ar(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const o=el(n,t),i=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${P(n.when)}</span>`:"";return`
      <li class="ag-skin-step${o?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${P(n.name||"")}${i}</span>
          ${n.note?`<span class="ag-skin-note">${P(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${P(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function tl(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=g.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=Qs(g.theme&&g.theme.timezone);e.innerHTML=ar(t.morning,a)+ar(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${P(t.footer)}</p>`:"")}function nr(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,tl(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),I(10))}function al(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}function nl(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function ma(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function rl(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${ma(r)}× ${n}`}return null}function ol(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const o=Number(r&&r.elevation);!Number.isFinite(o)||o<=0||(!a||o>a.h)&&(a={h:o,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${ma(n)}× euer höchster Gipfel (${a.name})`:`≈ ${ma(n)}× euer höchster Gipfel`}function il(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,o]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+o+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function sl(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const o=r.indexOf("?"),i=o===-1?r:r.slice(0,o),s=o===-1?"":r.slice(o+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),i+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),o=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${o}`)}const n=il(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function fa(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function ll(e){const t=lt();t.unshift(e),dt(t),re("gipfelbuch"),fa("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function dl(e){dt(lt().filter(t=>t.id!==e)),re("gipfelbuch"),fa("gipfel-delete",{id:e})}function cl(e,t){const a=lt(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,dt(a),re("gipfelbuch"),fa("gipfel-upsert",r)}function gl(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?pi(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?sl(e.activityUrl):null,o=e.cover?`<div class="ag-gipfel-cover"><img src="${P(e.cover)}" alt="${P(e.name||"")}" loading="lazy" decoding="async"></div>`:"",i=e.elevGain||e.elevation,s=e.distance?`${P(e.distance)} km`:"",l=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${P(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||l?`<div class="ag-gipfel-stats">${s}${s&&l?" ":""}${l}</div>`:"";t.innerHTML=`
    ${o}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${li(e.date)}</div>
        <div class="ag-gipfel-name">${P(e.name||"—")}</div>
      </div>
      ${i?`<div class="ag-gipfel-elev">↑ ${Ft(i)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${P(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${P(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${P(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const p=t.querySelector("[data-ag-gipfel-edit]");p&&p.addEventListener("click",()=>{var we;const b=d("[data-ag-berge-form]"),y=d("[data-ag-berge-add]");if(!b)return;const w=d("[data-ag-berge-edit-id]");w&&(w.value=e.id);const E=d("[data-ag-berge-name]");E&&(E.value=e.name||"");const v=d("[data-ag-berge-dist]");v&&(v.value=e.distance||"");const x=d("[data-ag-berge-gain]");x&&(x.value=e.elevGain||e.elevation||"");const T=d("[data-ag-berge-date]");T&&(T.value=e.date||"");const A=d("[data-ag-berge-url]");A&&(A.value=e.activityUrl||"");const S=d("[data-ag-berge-cover]");S&&(S.value=e.cover||"");const D=d("[data-ag-berge-notes]");D&&(D.value=e.notes||"");const $=d("[data-ag-berge-lat]");$&&($.value=e.lat||"");const F=d("[data-ag-berge-lng]");F&&(F.value=e.lng||"");const Y=d("[data-ag-berge-loc-label]");Y&&(Y.value=e.locLabel||"");const pe=d("[data-ag-loc-search]");pe&&(pe.value=e.locLabel||"");const le=d("[data-ag-berge-form-title]");le&&(le.textContent="Eintrag bearbeiten");const Q=d("[data-ag-berge-save] span:last-child");Q&&(Q.textContent="Speichern"),b.hidden=!1,y&&(y.hidden=!0),(we=d("[data-ag-sheet-backdrop]"))==null||we.classList.add("is-open"),b.scrollIntoView({behavior:"smooth",block:"nearest"}),E&&E.focus(),I(8)});const f=t.querySelector("[data-ag-gipfel-delete]");f&&f.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(dl(e.id),We(),I(8),Promise.resolve().then(()=>$l).then(b=>b.showToast("Eintrag gelöscht")).catch(()=>{}))});const m=t.querySelector("[data-ag-map-komoot]");m&&m.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,m.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,m.textContent="Karte schließen",I(4)}});const h=t.querySelector("[data-ag-map-alltrails]");return h&&r&&h.addEventListener("click",()=>{const b=t.querySelector("[data-ag-map-wrap-alltrails]");if(b){if(!b.hidden){b.hidden=!0,h.textContent="🗺 AllTrails-Karte";return}b.innerHTML=`<iframe src="${P(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,h.textContent="Karte schließen",I(4)}}),t}function We({loading:e=!1}={}){const t=d("[data-ag-berge-list]"),a=d("[data-ag-berge-empty]"),n=d("[data-ag-berge-total]"),r=d("[data-ag-berge-analogy]"),o=d("[data-ag-berge-total-dist]"),i=d("[data-ag-berge-dist-analogy]"),s=d("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=lt().sort((f,m)=>{const h=f.date||"",b=m.date||"";return b<h?-1:b>h?1:0});t.innerHTML="";const c=l.reduce((f,m)=>f+(Number(m.elevGain)||Number(m.elevation)||0),0);if(n&&(n.textContent=c>0?Ft(c):"— m"),r){const f=nl(c);f?(r.textContent=f,r.hidden=!1):r.hidden=!0}const p=l.reduce((f,m)=>{const h=Number(m.distance);return f+(Number.isFinite(h)&&h>0?h:0)},0);if(o&&(o.textContent=p>0?`${di(p)} km`:"— km"),i){const f=rl(p);f?(i.textContent=f,i.hidden=!1):i.hidden=!0}if(s){const f=ol(c,l);f?(s.textContent=f,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),rr([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(f=>t.appendChild(gl(f))),rr(l)}function pl(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const o=e.querySelector("[data-ag-berge-lat]"),i=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");o&&(o.value=""),i&&(i.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const o=t.value.trim();if(!o){r();return}n=setTimeout(async()=>{try{const i=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(o)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(i,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(c=>{const p=document.createElement("button");p.type="button",p.className="ag-location-result",p.textContent=c.display_name,p.addEventListener("click",()=>{const f=e.querySelector("[data-ag-berge-lat]"),m=e.querySelector("[data-ag-berge-lng]"),h=e.querySelector("[data-ag-berge-loc-label]");f&&(f.value=c.lat),m&&(m.value=c.lon),h&&(h.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(p)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!a.contains(o.target)&&(a.hidden=!0)})}function ul(){pl(z)}let ie=null,Et=null;function ha(){ie&&setTimeout(()=>ie.invalidateSize(),150)}async function ml(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function rr(e){const t=d("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await ml()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const o=[[45.8,5.9],[47.8,10.5]],i=[[35,-11],[71,32]];if(!ie){ie=n.map(r).fitBounds(o),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(ie);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(p=>p.classList.remove("is-active")),l.classList.add("is-active");const c=l.dataset.mapView==="eu"?i:o;ie.fitBounds(c)})})}Et?Et.clearLayers():Et=n.layerGroup().addTo(ie),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const p=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${P(s.name||"—")}</div>
      ${p?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Ft(p)}</div>`:""}
    `;const f=document.createElement("button");f.type="button",f.textContent="Zum Eintrag",f.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",f.addEventListener("click",()=>{l.closePopup();const m=z.querySelector(`[data-ag-gipfel-id="${s.id}"]`);m&&(m.scrollIntoView({behavior:"smooth",block:"center"}),m.classList.add("ag-gipfel-highlight"),setTimeout(()=>m.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(f),l.bindPopup(c),Et.addLayer(l)}),requestAnimationFrame(()=>{ie&&ie.invalidateSize()}),setTimeout(()=>{ie&&ie.invalidateSize()},250)}const or=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function ir(e){return or[Math.min(e-1,or.length-1)]}function Ae(e,t){return e+Math.random()*(t-e)}function sr(){const e=d("#ag-baerlauch-level");e&&(e.textContent=`Level ${g.baerlauch.level}`)}function Ge(){g.baerlauch.timerId&&(clearInterval(g.baerlauch.timerId),g.baerlauch.timerId=null)}function lr(e){const t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");i&&(i.hidden=!0),Ge(),g.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),o&&(o.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),dr(K(),g.baerlauch.level,!1),ya()}function fl(){const e=d("#ag-baerlauch-success"),t=d("#ag-baerlauch-reward"),a=d("#ag-baerlauch-photo"),n=d("#ag-baerlauch-text"),r=d("#ag-baerlauch-actions"),o=d("#ag-baerlauch-next");Ge(),g.baerlauch.level+=1;const i=yl(K(),g.baerlauch.level);if(dr(K(),g.baerlauch.level,!0),ya(),sr(),i&&ae(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&g.photos&&g.photos.length){const s=Re(),l=s.length?s[Math.floor(Math.random()*s.length)]:null;zr(a,l),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}o&&(o.textContent=`Level ${g.baerlauch.level} starten`),r&&(r.hidden=!1)}function hl(e){const t=d("#ag-baerlauch-timer"),a=d("#ag-baerlauch-darkness"),r=ir(g.baerlauch.level).timeMs;g.baerlauch.durationMs=r,g.baerlauch.startedAt=performance.now(),Ge(),g.baerlauch.timerId=setInterval(()=>{const o=performance.now()-g.baerlauch.startedAt,i=Math.max(0,r-o),s=Math.min(1,o/r);t&&(t.textContent=(i/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);l.forEach(p=>{p.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,p.style.opacity=String(1-c*.28)}),i<=0&&(Ge(),e())},50)}function ba(){const e=d("#ag-baerlauch-panel"),t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!o)return;if(e.hidden=!1,ya(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),g.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",o.textContent="",i&&(i.hidden=!0),sr();const s=ir(g.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],p=[...l.slice(0,s.good).map(h=>({emoji:h,good:!0})),...c.slice(0,s.bad).map(h=>({emoji:h,good:!1}))];let f=0;const m=p.filter(h=>h.good).length;p.forEach(h=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=h.emoji,b.dataset.good=h.good?"true":"false",b.style.left=`${Ae(8,82)}%`,b.style.top=`${Ae(10,72)}%`,b.style.setProperty("--dx",`${Ae(-320,320)}px`),b.style.setProperty("--dy",`${Ae(-220,220)}px`),b.style.setProperty("--dur",`${Ae(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${Ae(-1.8,0)}s`),b.addEventListener("click",()=>{g.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,f+=1,setTimeout(()=>b.remove(),140),f===m&&fl()):lr("poison"))}),t.appendChild(b)}),hl(()=>lr("timeout"))}function bl(){const e=d("#ag-baerlauch-panel");Ge(),e&&(e.hidden=!0)}function yl(e,t){var r;const a=Vt(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const o=(r=g.backup)==null?void 0:r.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function dr(e,t,a){var i;const n=gn(),r=((i=g.theme)==null?void 0:i.timezone)||"UTC",o=_(r);n.unshift({date:o,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function ya(){var f;const e=d("#ag-baerlauch-scores");if(!e)return;const a=K()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",r=Vt(),o=gn(),i=a==="fionn"?"lennart":"fionn",s=a in r||i in r;if(!s&&!o.length){e.hidden=!0;return}e.hidden=!1;const l=((f=g.theme)==null?void 0:f.timezone)||"UTC",c=m=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:l}).format(new Date(m+"T12:00:00Z"))}catch{return m}};let p="";if(s){const m=r[a]??0,h=r[i]??0;p+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${m||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${h||"—"}</span></div>
    </div>`}if(o.length){const m=o.slice(0,8).map(h=>{const b=h.player===a,y=b?"ag-score-mine":"ag-score-theirs",w=b?"Du":n,E=h.won?`✓ Level ${h.level}`:`✗ Level ${h.level-1>=1?h.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(h.date)}</span><span class="ag-score-pill ${y}">${w}</span><span class="ag-score-result">${E}</span></div>`}).join("");p+=`<div class="ag-score-table">${m}</div>`}e.innerHTML=p}const B={recorder:null,audioBlob:null,lang:"swabian"};function Tt(){try{return JSON.parse(window.localStorage.getItem(en)||"[]")||[]}catch{return[]}}function Ct(e){try{window.localStorage.setItem(en,JSON.stringify(e))}catch{}}function wl(e){const t=Tt();t.unshift(e),Ct(t),re("glossary"),wa("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function vl(e,t){const a=Tt(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,Ct(a),re("glossary"),wa("glossary-upsert",r)}function xl(e){Ct(Tt().filter(t=>t.id!==e)),re("glossary"),wa("glossary-delete",{id:e})}let Lt=!1;async function cr(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=N(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let o;try{o=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!o.ok)return 0;const i=await o.json();return!i.ok||!Array.isArray(i.glossary)?0:(mt("glossary")||Ct(i.glossary.filter(s=>s.id)),i.glossary.length)}catch{return 0}}function wa(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:N(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function va(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function kl(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return va(e);try{const n=await va(e),r=n.split(",")[1],o=e.type||"audio/webm",i=JSON.stringify({type:"glossary-audio",token:N(),filename:`glossary-${t}.webm`,mimeType:o,data:r}),l=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i})).json();return l.ok&&l.url?l.url:n}catch{return va(e)}}const Sl={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function El(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${P(Sl[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${P(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${P(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${P(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${P(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${P(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),I(6)});const o=a.querySelector("[data-ag-glossary-edit]");o&&o.addEventListener("click",()=>{var m;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const p=document.getElementById("ag-glossary-save-label");p&&(p.textContent="Speichern");const f=document.getElementById("ag-glossary-audio-status");f&&(f.textContent=e.audioUrl?"Aufnahme vorhanden":""),B.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(m=document.getElementById("ag-glossary-word-input"))==null||m.focus(),I(8)});const i=a.querySelector("[data-ag-glossary-del]");return i&&i.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(xl(e.id),xe(B.lang),I(8))}),a}function xe(e){var i;B.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===B.lang)}),gr();const n=(((i=document.getElementById("ag-glossary-search"))==null?void 0:i.value)||"").trim().toLowerCase(),r=Tt(),o=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===B.lang);if(t.innerHTML="",!o.length){a&&(a.textContent=n?"Kein Treffer.":Lt?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",Lt&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),o.forEach(s=>t.appendChild(El(s,!!n)))}function gr(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function pr(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),B.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),Lt=!0,xe("swabian"),window.requestAnimationFrame(()=>gr()),I(10),cr().catch(()=>0).then(()=>{Lt=!1,xe(B.lang)})}function Tl(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null}const ur=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],mr=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function fr(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(Ee)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(Ee,"granted")}catch{}await ka();return}if(e==="denied"){try{window.localStorage.setItem(Ee,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function Cl(){var s;const e=((s=g.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,o=8*60,i=r<o?o-r:24*60-r+o;return Date.now()+i*60*1e3}async function xa(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=N(),r=_(a);if(U().some(f=>f.token===n&&f.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:i,m:s}=Pe(a);if(i>=21)return;const l=((21-i)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=Ve(),p=mr[rn(mr)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:p.title.replace("{name}",c),body:p.body.replace("{name}",c)})}catch{}}async function Ll(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=Ve(),o=ur[rn(ur)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Cl(),title:o.title.replace("{name}",r),body:o.body.replace("{name}",r)}),(t=g.quest)!=null&&t.enabled&&Gn()){const i=_e(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!i.solved&&s!==tt(g)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(tt(g)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:g.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:g.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function zl(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function ka(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",ra()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await Ll(),await xa(),await zl(),await Ml())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Al(){const e=d("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Ee,"dismissed")}catch{}return}try{window.localStorage.setItem(Ee,"granted")}catch{}await ka()}function Il(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}async function Ml(){const e=g.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Il(e.vapidPublicKey)}));const n=g.backup&&g.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:N(),subscription:a.toJSON()}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,o).catch(()=>fetch(n,{...o,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}function Ke(e){g.activeTab=e,z.querySelectorAll("[data-ag-tab]").forEach(i=>{const s=i.dataset.agTab===e;i.classList.toggle("is-active",s),i.setAttribute("aria-selected",s?"true":"false")});const a=54,n=z.querySelector(".ag-bottomnav-btn.is-active"),r=z.querySelector(".ag-nav-pill");if(r&&n){const i=n.closest(".ag-bottomnav"),s=i?i.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const p=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${p-a/2}px`}}for(const i of["today","history","lieblinge","berge"]){const s=d(`[data-ag-panel-${i}]`);if(!s)continue;const l=e===i;l&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!l}e==="history"&&ne(),e==="lieblinge"&&$t(),e==="berge"&&(ha(),We({loading:!0}),ha(),He().catch(()=>{}).then(()=>{We(),ha()}));const o=d("[data-ag-fab]");o&&(o.hidden=e!=="berge")}function hr(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=d("[data-ag-ping-send]"),a=d("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:N(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,r).then(o=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...r,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function Ie(e,t){const a=d("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function br(){const e=g.wishInbox,t=d("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:N(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Ie("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){Ie("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Ie("Stups wird gesendet…","pending");const o=JSON.stringify(n),i=()=>{Ie("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{Ie("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l=>{l&&l.ok?i():s()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(i).catch(s)}catch{s()}})}function yr(e){const t=N();if(t==="fionn")return;const a=g.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const o=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,i={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:o,message:o,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(i),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function Sa(e){const t=g.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:N(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),o=i=>{const s=Gt();!s||s.week!==e.week||(cn({...s,remoteStatus:i,remoteUpdatedAt:Date.now()}),Ba())};o("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(i=>{i&&i.ok?o("sent"):o("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>o("sent")).catch(()=>o("failed"))}catch{o("failed")}})}function wr(){const e=Gt();!e||e.week!==Ht()||e.remoteStatus!=="sent"&&Sa(e)}function Ea(e,t,a,n,r,o){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,o);else{const i=Array.isArray(o)?o:[o,o,o,o],[s,l,c,p]=i.map(f=>Math.min(f,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+p,a+r),e.quadraticCurveTo(t,a+r,t,a+r-p),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function zt(e,t,a){const n=t.split(" "),r=[];let o="";for(const i of n){const s=o?`${o} ${i}`:i;e.measureText(s).width>a&&o?(r.push(o),o=i):o=s}return o&&r.push(o),r}function vr(e){var A,S;const r=document.createElement("canvas"),o=Math.min(window.devicePixelRatio||1,2);r.width=640*o,r.height=340*o,r.style.width="640px",r.style.height="340px";const i=r.getContext("2d");i.scale(o,o);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",p=i.createLinearGradient(0,0,0,340);p.addColorStop(0,l),p.addColorStop(1,c),i.fillStyle=p,Ea(i,0,0,640,340,20),i.fill();const f=s?"#b9782e":"#2f7a4f";i.fillStyle=f,Ea(i,0,0,640,5,[20,20,0,0]),i.fill();const m=e.category.label,h=Bn(e.category.tone);i.font="bold 13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle=s?"#d4a24c":"#5aba7e",i.fillText(`${h} ${m}`,40,62);const b=e.day;i.font="13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.45)";const y=i.measureText(b).width;i.fillText(b,600-y,62),i.strokeStyle="rgba(255,255,255,0.1)",i.lineWidth=1,i.beginPath(),i.moveTo(40,76),i.lineTo(600,76),i.stroke(),i.font="bold 24px Boska, Georgia, serif",i.fillStyle="#ffffff";const w=zt(i,e.outcome.title,640-40*2);let E=108;for(const D of w)i.fillText(D,40,E),E+=32;i.font="15px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.72)";const v=zt(i,e.outcome.message,640-40*2);E+=4;for(const D of v){if(E>270)break;i.fillText(D,40,E),E+=22}i.font="11px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.25)";const x=((S=(A=g.theme)==null?void 0:A.brand)==null?void 0:S.machineName)||"Affektions-Gacha";i.fillText(x,40,324);const T=document.createElement("a");T.download=`gacha-${e.category.id}-${e.day}.png`,T.href=r.toDataURL("image/png"),T.click()}async function xr(e){var E,v;const r=document.createElement("canvas");r.width=1170,r.height=2532;const o=r.getContext("2d"),i=new Image;i.crossOrigin="anonymous";try{await new Promise((x,T)=>{i.onload=x,i.onerror=T,i.src=e.photo.url})}catch{R("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/i.naturalWidth,2532/i.naturalHeight),l=i.naturalWidth*s,c=i.naturalHeight*s;o.drawImage(i,(1170-l)/2,(2532-c)/2,l,c);const p=o.createLinearGradient(0,2532*.62,0,2532);p.addColorStop(0,"rgba(8,20,14,0)"),p.addColorStop(1,"rgba(8,20,14,.82)"),o.fillStyle=p,o.fillRect(0,2532*.62,1170,2532*.38);const f=e.photo.caption||e.photo.alt||"";o.font="500 56px Boska, Georgia, serif",o.fillStyle="#fffdf2";const m=zt(o,f,1170-96*2).slice(0,3);let h=2276-(m.length-1)*68;for(const x of m)o.fillText(x,96,h),h+=68;o.font="500 34px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,.62)",o.fillText(e.day,96,2356),o.fillStyle="rgba(255,255,255,.35)",o.font="28px Satoshi, Inter, system-ui, sans-serif",o.fillText(((v=(E=g.theme)==null?void 0:E.brand)==null?void 0:v.machineName)||"Affektions-Gacha",96,2406);let b;try{b=await new Promise((x,T)=>r.toBlob(A=>A?x(A):T(new Error("blob")),"image/jpeg",.92))}catch{R("Dieses Foto lässt sich nicht exportieren (CORS).");return}const y=new File([b],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[y]}))try{await navigator.share({files:[y],title:f});return}catch(x){if(x&&x.name==="AbortError")return}const w=document.createElement("a");w.download=y.name,w.href=URL.createObjectURL(b),w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),4e3)}function Ta(e){z.style.opacity="1",z.style.background="#0a1410",z.style.minHeight="100vh",z.style.display="flex",z.style.alignItems="center",z.style.justifyContent="center",z.style.padding="24px",z.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${P(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function kr(){g.todaysPull||(g.todaysPull=Nn()),ke(g.todaysPull),z.classList.add("is-revealed","has-drawn");const e=d("[data-ag-button-text]");e&&(e.textContent=g.theme.brand.buttonShown),g.revealed=!0}function Ye(){var m,h,b,y;g.todaysPull||(g.todaysPull=Nn());const e=d("[data-ag-draw]"),t=d("[data-ag-button-text]"),a=g.theme.loadingSteps||["Maschine rattert"];let n=0;z.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((g.theme.revealDelayMs||3200)/a.length))),o=g.theme.revealDelayMs||3200,i=Array.from((d("[data-ag-emoji-orbit]")||{children:[]}).children),s=i.map(w=>parseFloat(w.style.getPropertyValue("--ag-emoji-duration"))||20),l=performance.now();let c;function p(w){const E=Math.min((w-l)/o,1),v=1+5*E*E;i.forEach((x,T)=>{x.style.setProperty("--ag-emoji-duration",`${(s[T]/v).toFixed(3)}s`)}),E<1&&(c=requestAnimationFrame(p))}c=requestAnimationFrame(p);const f=((h=(m=g.todaysPull)==null?void 0:m.category)==null?void 0:h.id)==="special"?"special":(y=(b=g.todaysPull)==null?void 0:b.category)==null?void 0:y.tone;window.setTimeout(()=>Vs(f),Math.max(0,o-900)),window.setTimeout(()=>{var T,A,S,D;window.clearInterval(r),cancelAnimationFrame(c),Js(),Zs(f),i.forEach(($,F)=>{$.style.setProperty("--ag-emoji-duration",`${s[F].toFixed(2)}s`)});const w=U().some($=>$.day===g.todaysPull.day&&$.token===g.todaysPull.token);g.todaysPull.collectToken&&!w&&sn(g.todaysPull.collectToken),g.todaysPull.freikarte&&!w&&dn(g.todaysPull.token),ke(g.todaysPull),z.classList.remove("is-revealing"),z.classList.add("is-revealed"),z.classList.add("has-drawn"),e.disabled=!1,t.textContent=g.theme.brand.buttonShown,g.revealed=!0,Z()||ed(g.todaysPull),la(),xa();const E=be();Je(),Ol(E),window.setTimeout(()=>{try{d("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const v=(A=(T=g.todaysPull)==null?void 0:T.category)==null?void 0:A.id,x=(D=(S=g.todaysPull)==null?void 0:S.category)==null?void 0:D.tone;if(v==="special"){const $=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ae(130,$),setTimeout(()=>ae(90,$),700),kt("special")}else if(x==="jackpot"){const $=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ae(120,$),setTimeout(()=>ae(80,$),650),kt("jackpot")}else x==="rare"?(ae(70),kt("rare")):kt(x||"common");Z()||Promise.resolve().then(()=>Ld).then($=>$.flashLightsForPull(v==="special"?"special":x)).catch(()=>{}),Tr[E]?I([30,20,30,20,60]):Xi(v==="special"?"special":x),g.activeTab==="history"&&ne(),fr()},g.theme.revealDelayMs||3200)}function Sr(){var Wr,Gr,Kr,Yr,Vr,Jr,Zr,Xr,Qr,eo,to,ao,no,ro,oo,io,so,lo,co,go,po,uo,mo,fo,ho,bo,yo,wo,vo,xo,ko,So,Eo,To,Co,Lo,zo,Ao,Io,Mo,$o,Bo,Do,No,Po,_o,qo,Uo,jo;let e=null;const t=d("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(Jn,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;d("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,Jn();return}n=setTimeout(()=>{a=0},1800)}),d("[data-ag-draw]").addEventListener("click",()=>{I(12),Ye()}),Ys({onShake:()=>{z.classList.contains("has-drawn")||z.classList.contains("is-revealing")||Z()||(I(12),Ye())},onTilt:(u,k)=>{z.style.setProperty("--ag-foil-x",u.toFixed(1)+"%"),z.style.setProperty("--ag-foil-y",k.toFixed(1)+"%")}}),(Wr=d("#ag-btn-rave"))==null||Wr.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Gr=d("#ag-btn-rave"))==null||Gr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Kr=d("#ag-btn-baerlauch"))==null||Kr.addEventListener("click",ba),(Yr=d("#ag-baerlauch-close"))==null||Yr.addEventListener("click",bl),(Vr=d("#ag-baerlauch-next"))==null||Vr.addEventListener("click",ba),(Jr=d("#ag-btn-baerlauch"))==null||Jr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),ba())}),(Zr=d("#ag-btn-gesprach"))==null||Zr.addEventListener("click",Rn),(Xr=d("#ag-btn-glossary"))==null||Xr.addEventListener("click",pr),(Qr=d("#ag-btn-glossary"))==null||Qr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),pr())}),(eo=d("#ag-glossary-close"))==null||eo.addEventListener("click",Tl),(to=document.getElementById("ag-glossary-refresh"))==null||to.addEventListener("click",async()=>{const u=document.getElementById("ag-glossary-refresh");u&&(u.disabled=!0,u.textContent="⏳"),I(6);const k=await cr();xe(B.lang),u&&(u.textContent=k>0?`↻${k}`:"↻",setTimeout(()=>{u.textContent="↻",u.disabled=!1},3e3)),k>0&&R(`${k} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(u=>{u.addEventListener("click",()=>{const k=document.getElementById("ag-glossary-search");k&&(k.value=""),xe(u.dataset.lang),I(4)})}),(ao=document.getElementById("ag-glossary-search"))==null||ao.addEventListener("input",()=>{xe(B.lang)});const r=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var M,q;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const u=document.getElementById("ag-glossary-form-title");u&&(u.textContent="Neues Wort");const k=document.getElementById("ag-glossary-save-label");k&&(k.textContent="Eintragen");const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent=""),B.audioBlob=null;const L=document.getElementById("ag-glossary-play-preview");L&&(L.hidden=!0),o.hidden=!1,r.hidden=!0,(M=d("[data-ag-sheet-backdrop]"))==null||M.classList.add("is-open"),(q=document.getElementById("ag-glossary-word-input"))==null||q.focus(),I(8)}),(no=document.getElementById("ag-glossary-form-cancel"))==null||no.addEventListener("click",()=>{var u;if(o&&(o.hidden=!0),r&&(r.hidden=!1),(u=d("[data-ag-sheet-backdrop]"))==null||u.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null,I(6)}),(ro=document.getElementById("ag-glossary-form-save"))==null||ro.addEventListener("click",async()=>{var q,j,J,W,ue;const u=(((q=document.getElementById("ag-glossary-word-input"))==null?void 0:q.value)||"").trim(),k=(((j=document.getElementById("ag-glossary-meaning-input"))==null?void 0:j.value)||"").trim(),C=(((J=document.getElementById("ag-glossary-edit-id"))==null?void 0:J.value)||"").trim();if(!u){(W=document.getElementById("ag-glossary-word-input"))==null||W.focus();return}const L=document.getElementById("ag-glossary-audio-status");let M=null;if(B.audioBlob){L&&(L.textContent="Wird hochgeladen…");const H=C||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;M=await kl(B.audioBlob,H)}if(I([20,20,40]),C){const H={word:u,meaning:k||null};M!==null&&(H.audioUrl=M),vl(C,H)}else wl({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:B.lang,word:u,meaning:k||null,audioUrl:M,token:N()});o&&(o.hidden=!0),r&&(r.hidden=!1),(ue=d("[data-ag-sheet-backdrop]"))==null||ue.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder=null,xe(B.lang),R("Wort gespeichert ✓")});const i=document.getElementById("ag-glossary-record");i&&i.addEventListener("click",async()=>{if(B.recorder&&B.recorder.state==="recording"){B.recorder.stop();return}try{const u=await navigator.mediaDevices.getUserMedia({audio:!0}),k=[];B.recorder=new MediaRecorder(u),B.recorder.ondataavailable=L=>{L.data.size>0&&k.push(L.data)},B.recorder.onstop=()=>{u.getTracks().forEach(q=>q.stop()),B.audioBlob=new Blob(k,{type:B.recorder.mimeType||"audio/webm"});const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="✓ Aufnahme bereit");const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!1),i.textContent="🎙 Neu aufnehmen"},B.recorder.start(),i.textContent="⏹ Stop";const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent="● REC"),I(10)}catch{const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent="Mikrofon nicht verfügbar")}}),(oo=document.getElementById("ag-glossary-play-preview"))==null||oo.addEventListener("click",()=>{if(!B.audioBlob)return;const u=URL.createObjectURL(B.audioBlob),k=new Audio(u);k.onended=()=>URL.revokeObjectURL(u),k.play().catch(()=>{})}),(io=d("#ag-btn-mission"))==null||io.addEventListener("click",Hn),(so=d("#ag-btn-mission"))==null||so.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Hn())}),(lo=d("#ag-mission-close"))==null||lo.addEventListener("click",Is),(co=d("#ag-mission-done"))==null||co.addEventListener("click",()=>{Es();const u=d("#ag-mission-actions"),k=d("#ag-mission-feedback"),C=d("#ag-mission-done-note"),L=d("#ag-btn-mission");u&&(u.hidden=!0),C&&(C.hidden=!1),k&&!Fn()&&(k.hidden=!1),L&&L.classList.remove("ag-chip-mission-active")}),(go=d("#ag-mission-panel"))==null||go.querySelectorAll(".ag-mission-rate-btn").forEach(u=>{u.addEventListener("click",()=>{var k;(k=d("#ag-mission-panel"))==null||k.querySelectorAll(".ag-mission-rate-btn").forEach(C=>C.classList.remove("is-selected")),u.classList.add("is-selected")})}),(po=d("#ag-mission-feedback-send"))==null||po.addEventListener("click",()=>{var q;const u=d("#ag-mission-panel"),k=u==null?void 0:u.querySelector(".ag-mission-rate-btn.is-selected"),C=(k==null?void 0:k.dataset.rating)||null,L=(((q=d("#ag-mission-comment"))==null?void 0:q.value)||"").trim();Cs(C,L);const M=d("#ag-mission-feedback-sent");u==null||u.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(j=>{j.hidden=!0}),M&&(M.hidden=!1)}),(uo=d("#ag-letter-close"))==null||uo.addEventListener("click",ia),(mo=d("#ag-letter-overlay"))==null||mo.addEventListener("click",u=>{u.target===u.currentTarget&&ia()}),(fo=d("#ag-lightbox-close"))==null||fo.addEventListener("click",()=>{Aa()}),(ho=d("#ag-lightbox"))==null||ho.addEventListener("click",u=>{u.target===u.currentTarget&&Aa()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&(ia(),Aa())}),(bo=d("#ag-gesprach-close"))==null||bo.addEventListener("click",Ms),(yo=d("#ag-gesprach-next"))==null||yo.addEventListener("click",Wn),(wo=d("#ag-gesprach-wa"))==null||wo.addEventListener("click",$s),(vo=d("#ag-btn-gesprach"))==null||vo.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Rn())}),(xo=d("#ag-btn-quest"))==null||xo.addEventListener("click",Kn),(ko=d("#ag-quest-close"))==null||ko.addEventListener("click",Bs),(So=d("#ag-btn-quest"))==null||So.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Kn())}),(Eo=d("#ag-quest-file"))==null||Eo.addEventListener("change",u=>{const k=u.target.files&&u.target.files[0];k&&Ds(k)}),d("[data-ag-copy]").addEventListener("click",async()=>{if(!g.todaysPull)return;I(8);const u=Ar(g.todaysPull);try{await navigator.clipboard.writeText(u),d("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{d("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",u)}}),d("[data-ag-save-img]").addEventListener("click",()=>{g.todaysPull&&(I(8),vr(g.todaysPull))}),d("[data-ag-star]").addEventListener("click",()=>{I(8),Ql(g.todaysPull)}),(To=d("[data-ag-wallpaper]"))==null||To.addEventListener("click",()=>{!g.todaysPull||!g.todaysPull.photo||(I(8),xr(g.todaysPull))});const s=d("[data-ag-sync-status]");if(s){let u=null;s.addEventListener("click",()=>{s.classList.add("is-open"),clearTimeout(u),u=setTimeout(()=>s.classList.remove("is-open"),2500)})}const l=d("[data-ag-ferien-toggle]"),c=d("[data-ag-ferien-body]");l&&c&&l.addEventListener("click",()=>{const u=c.hidden;c.hidden=!u,l.setAttribute("aria-expanded",String(u)),I(6)}),(Co=d("[data-ag-ferien-add]"))==null||Co.addEventListener("click",()=>{var L,M;const u=(((L=d("[data-ag-ferien-from]"))==null?void 0:L.value)||"").trim(),k=(((M=d("[data-ag-ferien-to]"))==null?void 0:M.value)||u).trim();if(!u){R("Erst ein Datum wählen");return}if(!_i(u,k)){R("Höchstens 60 Tage am Stück");return}I([12,20,12]),$a(),Je()});const p=d("[data-capsule]");if(p){let k=null,C=null,L=!1,M=0;const q=()=>!z.classList.contains("has-drawn")&&!z.classList.contains("is-revealing")&&!Z(),j=()=>{clearTimeout(k),clearInterval(C),k=C=null,M=0,z.classList.remove("is-charging","is-charged")};p.addEventListener("pointerdown",W=>{q()&&(W.preventDefault(),L=!1,z.classList.add("is-charging"),C=setInterval(()=>{M++,I(6+M*2)},130),k=setTimeout(()=>{L=!0,z.classList.add("is-charged"),I([20,30,40])},650))});const J=()=>{const W=L&&q();j(),L=!1,W&&Ye()};p.addEventListener("pointerup",J),p.addEventListener("keydown",W=>{(W.key==="Enter"||W.key===" ")&&q()&&(W.preventDefault(),I(12),Ye())}),p.addEventListener("pointercancel",()=>{j(),L=!1}),p.addEventListener("pointerleave",()=>{j(),L=!1})}(Lo=d("[data-ag-freikarte-redeem]"))==null||Lo.addEventListener("click",()=>{const u=g.todaysPull;if(!u)return;const k=u.category.tone;if(k!=="quiet"&&k!=="cursed"||!Ti(u.token))return;const C=be(),L=ps(u.day,C);Li(u.token,u.day,{categoryId:L.category.id,outcomeTitle:L.outcome.title}),g.todaysPull={...u,category:L.category,outcome:L.outcome,photo:L.photo,collectToken:L.collectToken,voucher:L.voucher,freikarte:L.freikarte,unlockTime:null,promptAnswer:null};const M=U(),q=M.findIndex(j=>j.day===u.day&&j.token===u.token);q!==-1&&(M[q]={...M[q],categoryId:L.category.id,categoryLabel:L.category.label,tone:L.category.tone,title:L.outcome.title,message:L.outcome.message,link:L.outcome.link||null,unlockTime:null,promptAnswer:null,photo:L.photo?{url:L.photo.url,alt:L.photo.alt||"",caption:(L.photo.caption||"").trim(),type:L.photo.type==="video"?"video":"image"}:null,voucher:L.voucher||!1},de(M)),g.todaysPull.collectToken&&sn(g.todaysPull.collectToken),g.todaysPull.freikarte&&dn(g.todaysPull.token),te(),ke(g.todaysPull),g.activeTab==="history"&&ne(),ae(50),R("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),I([20,20,40])});const f=d("[data-ag-streak-restore]");f&&f.addEventListener("click",()=>{if(!bn()){La();return}const u=Qt(),k=Xt(),L=ut()>0&&k-ut()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${k-1} Streak-Retter übrig.`;if(!window.confirm(L))return;f.disabled=!0;const q=Wi();ne(),Je(),q&&(ae(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),I([30,20,30,20,60])),La(),f.disabled=!1});const m=d("[data-ag-sync-btn]");m&&m.addEventListener("click",async()=>{m.textContent="⏳",m.disabled=!0;const u=await He();ne(),m.textContent=u<0?"✗":`✓${u}`,setTimeout(()=>{m.textContent="☁",m.disabled=!1},3e3)}),z.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(u=>{u.addEventListener("click",()=>{I(5),Bl(u.dataset.agFilter)})}),z.querySelectorAll("[data-ag-tab]").forEach(u=>{u.addEventListener("click",()=>{I(6),Ke(u.dataset.agTab)})});const h=z.querySelector(".ag-bottomnav");if(h){const u=h.querySelector(".ag-nav-pill"),k=[...h.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let C=null;h.addEventListener("pointerdown",M=>{const q=h.getBoundingClientRect(),j=parseFloat(u==null?void 0:u.style.width)||54;C={id:M.pointerId,startX:M.clientX-q.left,pillStartCentre:(parseFloat(u==null?void 0:u.style.left)||0)+j/2,pillWidth:j,moved:!1,suppress:!1,captured:!1}}),h.addEventListener("pointermove",M=>{if(!C||M.pointerId!==C.id)return;const q=h.getBoundingClientRect(),j=M.clientX-q.left-C.startX;if(!C.moved&&Math.abs(j)<6||(C.captured||(h.setPointerCapture(M.pointerId),C.captured=!0),C.moved=!0,C.suppress=!0,!u))return;u.style.transition="none";const J=h.getBoundingClientRect(),W=C.pillStartCentre+j,ue=C.pillWidth/2;let H=W-ue;H<0?H=H*.25:H+C.pillWidth>J.width&&(H=J.width-C.pillWidth+(H+C.pillWidth-J.width)*.25),u.style.left=`${H}px`});const L=M=>{if(!C||M.pointerId!==C.id)return;const q=C.moved,j=C.suppress;if(C=null,u&&(u.style.transition=""),!q)return;const J=h.getBoundingClientRect(),W=M.clientX-J.left;let ue=k[0],H=1/0;if(k.forEach(Se=>{const ve=Se.getBoundingClientRect(),Nt=ve.left-J.left+ve.width/2,Qe=Math.abs(W-Nt);Qe<H&&(H=Qe,ue=Se)}),I(6),Ke(ue.dataset.agTab),j){const Se=ve=>{ve.stopImmediatePropagation(),ve.preventDefault()};h.addEventListener("click",Se,{capture:!0,once:!0})}};h.addEventListener("pointerup",L),h.addEventListener("pointercancel",M=>{!C||M.pointerId!==C.id||(C=null,u&&(u.style.transition=""),Ke(g.activeTab))})}z.addEventListener("ag-synced",()=>{var u;try{wt(),It(),(u=document.getElementById("ag-werkstatt-panel"))!=null&&u.hidden||Fe()}catch{}}),(zo=d("[data-ag-werkstatt-open]"))==null||zo.addEventListener("click",ns),(Ao=d("#ag-werkstatt-close"))==null||Ao.addEventListener("click",rs),(Io=document.getElementById("ag-werkstatt-add"))==null||Io.addEventListener("click",()=>Mn(null)),(Mo=document.getElementById("ag-werkstatt-cancel"))==null||Mo.addEventListener("click",Le),($o=document.getElementById("ag-werkstatt-delete"))==null||$o.addEventListener("click",ss),(Bo=document.getElementById("ag-werkstatt-save"))==null||Bo.addEventListener("click",()=>{ls(),wt()}),(Do=d("#ag-btn-skincare"))==null||Do.addEventListener("click",nr),(No=d("#ag-btn-skincare"))==null||No.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),nr())}),(Po=d("#ag-skincare-close"))==null||Po.addEventListener("click",al),(_o=d("#ag-btn-stimmung"))==null||_o.addEventListener("click",En),(qo=d("#ag-btn-stimmung"))==null||qo.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),En())}),(Uo=d("#ag-stimmung-close"))==null||Uo.addEventListener("click",Ji),Zi();const b=d("[data-ag-berge-add]"),y=d("[data-ag-berge-form]"),w=d("[data-ag-berge-cancel]"),E=d("[data-ag-berge-save]");b&&b.addEventListener("click",()=>{var k,C;I(8);const u=d("[data-ag-berge-date]");u&&!u.value&&(u.value=_(((k=g.theme)==null?void 0:k.timezone)||"Europe/Zurich")),y.hidden=!1,b.hidden=!0,(C=d("[data-ag-sheet-backdrop]"))==null||C.classList.add("is-open"),d("[data-ag-berge-name]").focus()}),w&&w.addEventListener("click",()=>{var M;I(6),y.hidden=!0,b.hidden=!1,(M=d("[data-ag-sheet-backdrop]"))==null||M.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(q=>{const j=d(q);j&&(j.value="")});const u=d("[data-ag-loc-search]");u&&(u.value="");const k=d("[data-ag-loc-dropdown]");k&&(k.hidden=!0,k.innerHTML="");const C=d("[data-ag-berge-form-title]");C&&(C.textContent="Neuer Gipfeleintrag");const L=d("[data-ag-berge-save] span:last-child");L&&(L.textContent="Eintragen")}),E&&E.addEventListener("click",()=>{var Oo,Fo,Ho,Ro,Wo,Go,Ko,Yo,Vo,Jo,Zo,Xo,Qo,ei;const u=(((Oo=d("[data-ag-berge-name]"))==null?void 0:Oo.value)||"").trim(),k=parseFloat(((Fo=d("[data-ag-berge-dist]"))==null?void 0:Fo.value)||""),C=parseInt(((Ho=d("[data-ag-berge-gain]"))==null?void 0:Ho.value)||"",10),L=((Ro=d("[data-ag-berge-date]"))==null?void 0:Ro.value)||_(((Wo=g.theme)==null?void 0:Wo.timezone)||"Europe/Zurich"),M=(((Go=d("[data-ag-berge-url]"))==null?void 0:Go.value)||"").trim(),q=(((Ko=d("[data-ag-berge-cover]"))==null?void 0:Ko.value)||"").trim(),j=(((Yo=d("[data-ag-berge-notes]"))==null?void 0:Yo.value)||"").trim(),J=(((Vo=d("[data-ag-berge-edit-id]"))==null?void 0:Vo.value)||"").trim(),W=(((Jo=d("[data-ag-berge-lat]"))==null?void 0:Jo.value)||"").trim()||null,ue=(((Zo=d("[data-ag-berge-lng]"))==null?void 0:Zo.value)||"").trim()||null,H=(((Xo=d("[data-ag-berge-loc-label]"))==null?void 0:Xo.value)||"").trim()||null;if(!u){(Qo=d("[data-ag-berge-name]"))==null||Qo.focus();return}I([20,20,40]);const Se={name:u,elevation:null,distance:isNaN(k)?null:k,elevGain:isNaN(C)?null:C,date:L,activityUrl:M||null,cover:q||null,notes:j||null,lat:W,lng:ue,locLabel:H};J?cl(J,Se):ll({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...Se,token:N()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(zd=>{const ti=d(zd);ti&&(ti.value="")});const ve=d("[data-ag-loc-search]");ve&&(ve.value="");const Nt=d("[data-ag-berge-form-title]");Nt&&(Nt.textContent="Neuer Gipfeleintrag");const Qe=d("[data-ag-berge-save] span:last-child");Qe&&(Qe.textContent="Eintragen"),y.hidden=!0,b.hidden=!1,(ei=d("[data-ag-sheet-backdrop]"))==null||ei.classList.remove("is-open"),We(),R("Gipfel gespeichert ✓")}),ul();const v=d("[data-ag-ping-card]");v&&(v.hidden=!(N()==="fionn"&&((jo=g.backup)!=null&&jo.enabled)));const x=d("[data-ag-ping-dismiss]");x&&x.addEventListener("click",()=>{const u=d("[data-ag-ping-banner]");u&&(u.hidden=!0)});const T=d("[data-ag-ping-send]");T&&T.addEventListener("click",()=>{I([20,30,20]);try{hr()}catch{}});const A=d("[data-ag-hug-send]");A&&A.addEventListener("click",()=>{I([20,30,20]);try{br()}catch{}});const S=d("[data-ag-wish-open]"),D=d("[data-ag-wish-cancel]"),$=d("[data-ag-wish-submit]");S&&S.addEventListener("click",()=>{I(8),d("[data-ag-wish-idle]").hidden=!0,d("[data-ag-wish-form]").hidden=!1;const u=d("[data-ag-wish-input]");u&&window.setTimeout(()=>u.focus(),60)}),D&&D.addEventListener("click",()=>{I(6),d("[data-ag-wish-form]").hidden=!0,d("[data-ag-wish-idle]").hidden=!1}),$&&$.addEventListener("click",()=>{const u=d("[data-ag-wish-input]"),k=((u==null?void 0:u.value)||"").trim();if(!k)return;I([20,20,40]);const C={week:Ht(),text:k,submittedAt:Date.now(),remoteStatus:"idle"};cn(C),Ba();try{Sa(C)}catch{}});const F=d("[data-ag-notif-enable]"),Y=d("[data-ag-notif-dismiss]");F&&F.addEventListener("click",()=>{I(10),Al()}),Y&&Y.addEventListener("click",()=>{I(6);try{window.localStorage.setItem(Ee,"dismissed")}catch{}const u=d("[data-ag-notif-card]");u&&(u.hidden=!0)});const pe=d("[data-ag-sheet-backdrop]");pe&&pe.addEventListener("click",()=>{I(6);const u=d("[data-ag-berge-form]"),k=d("[data-ag-berge-add]");u&&!u.hidden&&(u.hidden=!0,k&&(k.hidden=!1));const C=document.getElementById("ag-glossary-form"),L=document.getElementById("ag-glossary-add");C&&!C.hidden&&(C.hidden=!0,L&&(L.hidden=!1)),pe.classList.remove("is-open")});const le=d("[data-ag-fab]");le&&le.addEventListener("click",()=>{I(8);const u=d("[data-ag-berge-add]");u&&!u.hidden&&u.click()});const Q=["today","history","lieblinge","berge"];let we=0,V=0;const De=d(".ag-content")||z;De.addEventListener("touchstart",u=>{we=u.touches[0].clientX,V=u.touches[0].clientY},{passive:!0}),De.addEventListener("touchend",u=>{const k=u.changedTouches[0].clientX-we,C=Math.abs(u.changedTouches[0].clientY-V);if(Math.abs(k)>52&&C<44){const L=Q.indexOf(g.activeTab),M=k<0?Math.min(L+1,Q.length-1):Math.max(L-1,0);M!==L&&(I(6),Ke(Q[M]))}},{passive:!0});const Ne=d("[data-ag-ptr]");let Bt=0,Dt=!1;document.addEventListener("touchstart",u=>{window.scrollY===0&&(Bt=u.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",u=>{if(!Bt)return;u.touches[0].clientY-Bt>64&&!Dt&&Ne&&(Dt=!0,Ne.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Dt&&Ne&&(Ne.classList.add("is-loading"),await He(),g.activeTab==="berge"&&We(),g.activeTab==="history"&&ne(),Ne.classList.remove("is-visible","is-loading"),R("Aktualisiert ✓")),Bt=0,Dt=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const u=document.querySelector(".ag-widget");u==null||u.classList.toggle("ag-paused",document.hidden)})}const $l=Object.freeze(Object.defineProperty({__proto__:null,bindEvents:Sr,downloadResultAsImage:vr,downloadWallpaper:xr,drawRoundRect:Ea,escapeHtml:P,notifyPartnerVoucherRedeemed:yr,renderError:Ta,retryPendingWishSend:wr,reveal:Ye,sendHugToInbox:br,sendPingToBackend:hr,sendWishToInbox:Sa,setActiveTab:Ke,setHugStatus:Ie,showDrawnToday:kr,showToast:R,wrapText:zt},Symbol.toStringTag,{value:"Module"}));let ye=null,se="all";function Bl(e){se=e==="vouchers"||e==="open"?e:"all",Ma=Ia,ne()}function Ca(e){return e?P(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ve(){return N().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||g.theme.brand.displayNameDefault||"Lennart"}function Dl(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function Nl(e){try{const[t,a,n]=e.split("-").map(Number),r=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}).formatToParts(new Date(Date.UTC(t,a-1,n,12))),o=i=>(r.find(s=>s.type===i)||{}).value||"";return`${o("weekday").replace(/\.$/,"")}, ${o("day")}. ${o("month")}`}catch{return e}}function Pl(){const e=_(g.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const _l=["🚴","🧄"],ql=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Er(){const e=_(g.theme.timezone),t=N();return`${g.theme.secret}|${t}|${e}|emoji`}function Ul(){const e=Er(),t=3+Math.floor(ce(`${e}|count`)*3),a=ql.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const o=Math.floor(ce(`${e}|pick|${r}`)*a.length);n.push(a.splice(o,1)[0])}return[..._l,...n]}function jl(){const e=d("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Ul(),a=t.length,n=Er();t.forEach((r,o)=>{const i=document.createElement("span");i.className="ag-emoji",i.textContent=r;const s=360/a*o,l=(ce(`${n}|angle|${o}`)-.5)*28,c=s+l,p=ce(`${n}|radius|${o}`)*21-10.5,f=16+ce(`${n}|dur|${o}`)*10,m=-ce(`${n}|delay|${o}`)*f,h=ce(`${n}|dir|${o}`)>.5?1:-1;i.style.setProperty("--ag-emoji-angle",`${c}deg`),i.style.setProperty("--ag-emoji-radius",`${250+p}%`),i.style.setProperty("--ag-emoji-duration",`${f.toFixed(2)}s`),i.style.setProperty("--ag-emoji-delay",`${m.toFixed(2)}s`),i.style.setProperty("--ag-emoji-direction",h===1?"normal":"reverse"),e.appendChild(i)})}function Je(){const e=d("[data-ag-streak]"),t=be(),a=he();if(t>(a.maxStreak||0)&&st({...a,maxStreak:t}),e){const n=mn(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}La()}function La(){const e=d("[data-ag-streak-restore]");e&&(e.hidden=!bn())}const Tr={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Ol(e){const t=d("[data-ag-milestone]");if(!t)return;const a=Tr[e];if(!a){t.hidden=!0;return}const n=N();if(Di(n,e)){t.hidden=!0;return}d("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Ni(n,e)}function Fl(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((l,c)=>{const p=document.createElement("div");p.className="ag-prompt-field";const f=document.createElement("p");f.className="ag-prompt-question",f.textContent=(c===0?"💭 ":"🌱 ")+l;const m=document.createElement("textarea");return m.className="ag-prompt-textarea",m.placeholder="Schreib hier deine Antwort...",m.rows=a.length>1?3:4,m.setAttribute("aria-label",l),p.appendChild(f),p.appendChild(m),n.appendChild(p),{question:l,textarea:m}}),o=document.createElement("p");o.className="ag-pin-err",o.hidden=!0,o.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const i=document.createElement("button");i.type="button",i.className="ag-button",i.style.cssText="width:100%;margin-top:4px",i.textContent="Kapsel öffnen ✨";function s(){const l=r.filter(p=>!p.textarea.value.trim());if(l.length){o.hidden=!1;for(const p of l)p.textarea.classList.add("ag-pin-shake"),setTimeout(()=>p.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(p=>p.question+`
`+p.textarea.value.trim()).join(`

`);t(c)}i.addEventListener("click",s);for(const l of r)l.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(o),n.appendChild(i),n}function Hl(e){return Array.isArray(e)?e.join(`
`):e}function Rl(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Wl(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:Hl(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Gl(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const o=document.createElement("div");o.className="ag-pin-row";const i=document.createElement("input");i.type="text",i.inputMode="numeric",i.pattern="[0-9]*",i.maxLength=4,i.className="ag-pin-input",i.placeholder="_ _ _ _",i.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function c(){i.value.trim()===e?t():(l.hidden=!1,i.classList.add("ag-pin-shake"),i.value="",setTimeout(()=>i.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),i.addEventListener("keydown",p=>{p.key==="Enter"&&c()}),o.appendChild(i),o.appendChild(s),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function Kl(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const o=document.createElement("p");o.className="ag-pin-hint",o.style.marginTop="10px",o.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const i=document.createElement("div");i.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function p(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),At(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",p),s.addEventListener("keydown",f=>{f.key==="Enter"&&p()}),i.appendChild(s),i.appendChild(l),n.appendChild(r),n.appendChild(o),n.appendChild(i),n.appendChild(c),n}function Yl(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const i=document.createElement("iframe");return i.src=`https://open.spotify.com/embed/${n}/${r}`,i.width="100%",i.height=n==="track"||n==="episode"?"80":"152",i.setAttribute("frameborder","0"),i.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",i.loading="lazy",i.setAttribute("allowtransparency","true"),i.setAttribute("title","Spotify player"),i.className="ag-spotify-iframe",i}catch{return null}}function Cr(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function At(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=ee(t);if(!a){e.hidden=!0;return}const n=Yl(a);e.appendChild(n||Cr(a)),e.hidden=!1}function Vl(e){const t=d("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||Z()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),o=e.token,i=U().filter(f=>f.token===o&&typeof f.day=="string"&&f.day.slice(5)===n&&Number(f.day.slice(0,4))<r).sort((f,m)=>m.day.localeCompare(f.day));if(!i.length)return;const s=i[0],l=r-Number(s.day.slice(0,4)),c=d("[data-ag-memory-label]"),p=d("[data-ag-memory-text]");c&&(c.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),p&&(p.textContent=s.title||""),t.hidden=!1}function Lr(e){const t=jt(e),a=Ot(e);if(xi(e),te(),g.wishInbox&&g.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:N(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(g.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Jl(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Te()[a]||0,r=Ot(a),o=jt(a);if(n>=o)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(o)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${o} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{Lr(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',It()});else{const s=o-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(o-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function It(){const e=d("[data-ag-tokenbank]");if(!e)return;const t=Te(),a=Object.keys(Ut).map(l=>{const c=jt(l),p=Math.min(t[l]||0,c);return{emoji:l,goal:c,count:p,raw:t[l]||0,reward:Ot(l),done:(t[l]||0)>=c}}),n=a.reduce((l,c)=>l+c.raw,0),r=a.filter(l=>l.done).length,o=a.filter(l=>l.raw>0),i=a.length-o.length;o.sort((l,c)=>c.done-l.done||c.count/c.goal-l.count/l.goal||l.goal-c.goal);const s=d("[data-ag-tokenbank-head]");if(s){const l=i?` · ${i} ${i===1?"Sorte":"Sorten"} noch unentdeckt`:"";s.textContent=n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`}e.innerHTML="";for(const l of o){const c=document.createElement("div");if(c.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${P(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const p=document.createElement("button");p.type="button",p.className="ag-tokenrow-redeem",p.textContent="Einlösen",p.addEventListener("click",()=>{Lr(l.emoji),I([12,30,12]),R(`${l.emoji} eingelöst — Fionn weiss Bescheid`),It()}),c.appendChild(p)}e.appendChild(c)}}function zr(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let o;if(t.type==="video"){const i=ui(t.url);if(i){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${i}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const p=()=>{s.removeEventListener("click",p),s.removeEventListener("keydown",f),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const m=document.createElement("iframe");m.src=`https://drive.google.com/file/d/${i}/preview?autoplay=1`,m.allow="autoplay",m.setAttribute("allowfullscreen",""),m.setAttribute("frameborder","0"),m.setAttribute("aria-label",a),m.className="ag-drive-iframe",s.appendChild(m)},f=m=>{(m.key==="Enter"||m.key===" ")&&p()};s.addEventListener("click",p),s.addEventListener("keydown",f),o=s}else o=document.createElement("video"),o.src=ee(t.url),o.controls=!0,o.muted=!0,o.playsInline=!0,o.setAttribute("playsinline",""),o.setAttribute("preload","metadata"),o.setAttribute("aria-label",a),o.className="ag-media-content"}else o=document.createElement("img"),o.alt=a,o.loading="eager",o.decoding="auto",o.className="ag-media-content",o.addEventListener("load",()=>{const i=o.naturalWidth&&o.naturalHeight?o.naturalWidth/o.naturalHeight:1;n.dataset.orientation=i<.95?"portrait":i>1.15?"landscape":"square"},{once:!0}),o.addEventListener("error",()=>{X("config/photos.json",{photos:[]}).then(i=>{const{normalizePhotos:s}=za(),l=s(i),c=l.find(p=>p.alt===t.alt&&p.type!=="video")||l.find(p=>p.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,o.src=ee(c.url),g.photos=l;else{const p=o.closest("[data-ag-photo-wrap]");p&&(p.hidden=!0)}}).catch(()=>{const i=o.closest("[data-ag-photo-wrap]");i&&(i.hidden=!0)})},{once:!0}),o.src=ee(t.url);n.appendChild(o),e.appendChild(n)}function za(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Ze(e,t,a,n){var l,c;const r=d("#ag-lightbox"),o=d("#ag-lightbox-img"),i=d("#ag-lightbox-caption"),s=d("#ag-lightbox-drive-link");if(!(!r||!o)){(l=r.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),ye&&(o.removeEventListener("error",ye),ye=null),o.onerror=null,s&&(s.hidden=!0);{o.hidden=!1;const p=ee(e);if(!p)return;o.src=p,o.alt=t||"",ye=()=>{const f=n||t;X("config/photos.json",{photos:[]}).then(m=>{const{normalizePhotos:h}=za(),b=h(m),y=b.find(w=>w.alt===f)||null;y&&y.url&&(o.src=ee(y.url),g.photos=b)}).catch(()=>{})},o.addEventListener("error",ye,{once:!0})}i.textContent=t||"",i.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Aa(){var a,n;const e=d("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(ye&&(t.removeEventListener("error",ye),ye=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Ar(e){return[`${Bn(e.category.tone)} ${Ve()}s ${g.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var o;const[a,n]=e.unlockTime.split(":").map(Number),r=Pe(e.unlockTimezone||((o=g.theme)==null?void 0:o.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function ke(e){var v;z.dataset.tone=e.category.tone,cs(e.category.tone),d("[data-ag-rarity]").textContent=e.category.label,d("[data-ag-date]").textContent=Nl(e.day),d("[data-ag-title]").textContent=e.outcome.title;const t=d("[data-ag-message]");if(!t)return;t.innerHTML=Ca(e.outcome.message),t.hidden=!1;const a=d("[data-ag-result]"),n=d("[data-ag-freikarte-wrap]");if(n){const x=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(x&&Ei(e.token)>0&&!Z())}const r=d("[data-ag-quest-wrap]");if(r){const x=e.category.tone==="quest"&&!Z();if(r.hidden=!x,x){const T=d("[data-ag-quest-hint]"),A=d("[data-ag-quest-done]"),S=d("[data-ag-quest-photo]"),D=d("[data-ag-beweis-file]"),$=d("[data-ag-beweis-thumb]"),{formatHistoryDate:F}=Me(),Y=U().find(Q=>Q.day===e.day&&Q.token===e.token),pe=!!(Y&&Y.bestanden),le=Y&&Y.beweisUrl;$&&($.hidden=!le,le&&($.src=ee(le),$.onclick=()=>Ze(le,"Beweisfoto"))),T&&(T.textContent=pe?`🏆 Bestanden am ${F(Y.bestandenAt||Y.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),A&&(A.hidden=pe,A.onclick=()=>{if((typeof window>"u"||!window.confirm||window.confirm("Quest wirklich geschafft? Das wandert dauerhaft ins Trophäenregal."))&&on(e.day,e.token)){te();try{ae(60)}catch{}ke(e),g.activeTab==="history"&&ne()}}),S&&D&&(S.hidden=!1,S.disabled=!1,S.textContent=le?"📸 Foto ersetzen":"📸 Beweis anhängen",S.onclick=()=>{D.value="",D.click()},D.onchange=async()=>{const Q=D.files&&D.files[0],we=U().find(V=>V.day===e.day&&V.token===e.token);if(!(!Q||!we)){S.disabled=!0,S.textContent="Lädt hoch…";try{const V=await Ss(e.day,e.token,Q);wi(e.day,e.token,V),on(e.day,e.token),te();try{ae(60)}catch{}try{R("Beweis angenommen 🏆")}catch{}}catch(V){const De=V&&V.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":V&&V.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":V&&V.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{R(De)}catch{}}ke(e),g.activeTab==="history"&&ne()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const T=Fl(e.outcome.prompt,A=>{if(e.promptAnswer=A,T.remove(),!Z()){Wl(e,A),e.outcome.id&&es(e.outcome.id,A);const S=U(),D=S.findIndex($=>$.day===e.day&&$.token===e.token);D!==-1&&(S[D]={...S[D],promptAnswer:A},de(S),te())}ke(e),g.activeTab==="history"&&ne()});T.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(T,t)}d("[data-ag-result]").hidden=!1;return}const o=a?a.querySelector("[data-ag-pin-gate]"):null;o&&o.remove();const i=d("[data-ag-link-wrap]");if(e.outcome.pin){const x=!!e.outcome.pinMessage;if(x||(t.hidden=!Zt(e.outcome.pin)),!Zt(e.outcome.pin)){let T=null;x&&(T=document.createElement("div"),T.className="ag-message",T.hidden=!0,T.innerHTML=Ca(e.outcome.pinMessage),t.parentNode.insertBefore(T,t.nextSibling));const A=Gl(e.outcome.pin,()=>{A.remove(),x?T.hidden=!1:t.hidden=!1,e.outcome.link&&i&&At(i,e.outcome.link)},e.outcome.pinHint);A.setAttribute("data-ag-pin-gate","");const S=x?T:t;S.parentNode.insertBefore(A,S)}}const s=d("[data-ag-photo-wrap]"),l=d("[data-ag-photo-media]"),c=d("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[x,T]=e.unlockTime.split(":").map(Number),A=Pe(e.unlockTimezone||((v=g.theme)==null?void 0:v.timezone)||"UTC"),S=e.outcome.linkPin;if(S)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[$,F]=e.outcome.linkPinFrom.split(":").map(Number);return A.h>$||A.h===$&&A.m>=F})()){const $=Kl(S,i,e);i.innerHTML="",i.appendChild($),i.hidden=!1}else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild($),i.hidden=!1}else if(A.h>x||A.h===x&&A.m>=T)At(i,e.outcome.link);else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild($),i.hidden=!1}}else e.outcome.pin&&!Zt(e.outcome.pin)||At(i,e.outcome.link||null);if(Jl(d("[data-ag-token-wrap]"),e),Vl(e),e.photo){zr(l,e.photo);const x=(e.photo.caption||"").trim();x?(c.textContent=x,c.hidden=!1):(c.textContent="",c.hidden=!0),s.hidden=!1}else l.innerHTML="",c.textContent="",c.hidden=!0,s.hidden=!0;const p=Ar(e),f=encodeURIComponent("Mein Gacha-Zug"),m=encodeURIComponent(p),h=d("[data-ag-send]");g.theme.messageTarget.startsWith("mailto:")?h.href=`${g.theme.messageTarget}?subject=${f}&body=${m}`:h.href=g.theme.messageTarget.replace("{text}",m);const b=d("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const y=d("[data-ag-wallpaper]");y&&(y.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const w=d("[data-ag-actions-extra]");w&&(w.hidden=!(b&&!b.hidden)&&!(y&&!y.hidden));const E=d("[data-ag-reactions]");if(E){E.hidden=!1;const x=U().find(A=>A.day===e.day&&A.token===e.token),T=x&&x.reaction;for(const A of E.querySelectorAll("[data-ag-react]"))A.hidden=!!Z(),A.classList.toggle("is-chosen",A.dataset.agReact===T),A.onclick=()=>{const S=A.dataset.agReact;if(vi(e.day,e.token,S)){Rl(e,S),te();try{I([12,30,18])}catch{}ke(e)}}}d("[data-ag-result]").hidden=!1,Ir()}function Zl(e){return e?fe().some(t=>t.day===e.day&&t.token===e.token):!1}function Mt(e){return fe().some(t=>t.day===e.day&&t.token===e.token)}function Ir(){const e=d("[data-ag-star]");if(!e)return;const t=Zl(g.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Xl(e,t){const a=fe(),n=a.findIndex(o=>o.day===e.day&&o.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),rt(a),te();const r=Mt(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",g.activeTab==="lieblinge"&&$t()}function Ql(e){if(!e)return;const t=fe(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),rt(t),te(),Ir(),g.activeTab==="lieblinge"&&$t()}function ed(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=U(),n=new Set,r=[t,...a].filter(o=>{if(!o||typeof o.day!="string"||typeof o.token!="string")return!1;const i=`${o.day}|${o.token}`;return n.has(i)?!1:(n.add(i),!0)});r.sort((o,i)=>o.day<i.day?1:o.day>i.day?-1:0),de(r),Kt(0),te()}function td(e,t){var i;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=_(((i=g.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=U(),o=r.find(s=>s.day===e.day&&s.token===e.token);o&&(o.used=!0,o.usedAt=n,de(r)),te();try{ae(60)}catch{}try{R("Eingelöst 💛")}catch{}try{yr(e)}catch{}t&&(t.disabled=!0),ne(),g.activeTab==="lieblinge"&&$t()}function Mr(e){var a;if(!e.link)return null;if(e.unlockTime){const n=Pe(e.unlockTimezone||((a=g.theme)==null?void 0:a.timezone)||"UTC"),[r,o]=e.unlockTime.split(":").map(Number);if(!(n.h>r||n.h===r&&n.m>=o)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=ee(e.link);return t?Cr(t):null}function $r(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:r}=Me();n.textContent=r(e.day);const o=document.createElement("span");o.className="ag-history-badge",o.textContent=e.categoryLabel||"Kapsel";const i=document.createElement("button");if(i.type="button",i.className="ag-history-star"+(Mt(e)?" is-starred":""),i.textContent=Mt(e)?"★":"☆",i.title=Mt(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",i.addEventListener("click",m=>{m.stopPropagation(),Xl(e,i)}),a.appendChild(n),a.appendChild(o),e.reaction){const m=document.createElement("span");m.className="ag-history-reaction",m.textContent=e.reaction,m.title="Deine Reaktion",a.appendChild(m)}a.appendChild(i);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const l=document.createElement("div");l.className="ag-history-message",l.innerHTML=Ca(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const m=document.createElement("p");m.className="ag-history-answer-label",m.textContent="💭 Antwort";const h=document.createElement("blockquote");h.className="ag-history-answer",h.textContent=e.promptAnswer,c.appendChild(m),c.appendChild(h)}t.appendChild(a);const p=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,f=e.photo&&(e.photo.type==="video"||p.test(e.photo.url||""));if(e.photo&&!f){const m=document.createElement("div");m.className="ag-history-body";const h=document.createElement("div");h.className="ag-history-thumb";const b=document.createElement("img");b.src=ee(e.photo.url),b.alt=e.photo.alt||"Foto-Drop",b.loading="lazy",b.decoding="async",b.addEventListener("error",function(){X("config/photos.json",{photos:[]}).then(w=>{const{normalizePhotos:E}=za(),v=E(w),x=v.find(T=>T.alt===e.photo.alt&&T.type!=="video")||v.find(T=>T.type!=="video")||null;if(x&&x.url)e.photo.url=x.url,b.src=ee(x.url),g.photos=v;else{h.classList.add("is-broken"),b.remove();const T=document.createElement("span");T.className="ag-history-thumb-broken",T.textContent="📷",h.appendChild(T)}}).catch(()=>{h.classList.add("is-broken"),b.remove();const w=document.createElement("span");w.className="ag-history-thumb-broken",w.textContent="📷",h.appendChild(w)})},{once:!0}),h.appendChild(b),h.style.cursor="pointer",h.title="Vollansicht",h.addEventListener("click",()=>Ze(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(s),y.appendChild(l),c&&y.appendChild(c),e.link){const w=Mr(e);w&&y.appendChild(w)}m.appendChild(h),m.appendChild(y),t.appendChild(m)}else if(t.appendChild(s),t.appendChild(l),c&&t.appendChild(c),e.link){const m=Mr(e);m&&t.appendChild(m)}if(e.bestanden){const m=document.createElement("p");m.className="ag-history-bestanden";const{formatHistoryDate:h}=Me();if(m.textContent=`🏆 Bestanden${e.bestandenAt?` am ${h(e.bestandenAt)}`:""}`,t.appendChild(m),e.beweisUrl){const b=document.createElement("img");b.className="ag-history-beweis",b.src=ee(e.beweisUrl),b.alt="Beweisfoto",b.loading="lazy",b.decoding="async",b.addEventListener("click",y=>{y.stopPropagation(),Ze(e.beweisUrl,"Beweisfoto")}),b.addEventListener("error",()=>b.remove(),{once:!0}),t.appendChild(b)}}if(nt(e)){const m=document.createElement("div");if(m.className="ag-voucher-actions",e.used){const h=document.createElement("span");h.className="ag-voucher-used";const{formatHistoryDate:b}=Me();h.textContent=`✓ Benutzt am ${e.usedAt?b(e.usedAt):"–"}`,m.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="ag-voucher-use",h.textContent="🎟️ Benutzen",h.addEventListener("click",b=>{b.stopPropagation(),td(e,h)}),m.appendChild(h)}t.appendChild(m)}return t}function Me(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}}}function ad(e){const t=d("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===se),n.setAttribute("aria-selected",r===se?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let $e=null;function Br(e){var v;const t=d("[data-ag-history-calendar]");if(!t)return;if(se!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((v=g.theme)==null?void 0:v.timezone)||"UTC",n=_(a);$e||($e=n.slice(0,7));const r=new Map(e.map(x=>[x.day,x])),[o,i]=$e.split("-").map(Number),s=new Date(Date.UTC(o,i-1,1)),l=new Date(Date.UTC(o,i,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,p=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),f=e.filter(x=>x.day.startsWith($e)).length;t.innerHTML="";const m=document.createElement("div");m.className="ag-kalender-head";const h=document.createElement("button");h.type="button",h.className="ag-kalender-nav",h.textContent="‹",h.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=f?`${p} · ${f} Kapseln`:p;const y=document.createElement("button");y.type="button",y.className="ag-kalender-nav",y.textContent="›",y.setAttribute("aria-label","Nächster Monat");const w=x=>{const T=new Date(Date.UTC(o,i-1+x,1));$e=`${T.getUTCFullYear()}-${String(T.getUTCMonth()+1).padStart(2,"0")}`,Br(e)};h.addEventListener("click",()=>w(-1)),y.addEventListener("click",()=>w(1)),m.appendChild(h),m.appendChild(b),m.appendChild(y),t.appendChild(m);const E=document.createElement("div");E.className="ag-kalender-grid";for(const x of["M","D","M","D","F","S","S"]){const T=document.createElement("span");T.className="ag-kalender-wd",T.textContent=x,E.appendChild(T)}for(let x=0;x<c;x++)E.appendChild(document.createElement("span"));for(let x=1;x<=l;x++){const T=`${$e}-${String(x).padStart(2,"0")}`,A=r.get(T),S=document.createElement("span");S.className="ag-kalender-day",S.textContent=x,A&&(S.classList.add("has-pull"),S.dataset.tone=A.tone||"soft",S.title=`${A.title||"Kapsel"} (${A.categoryLabel||""})`),T===n&&S.classList.add("is-today"),T>n&&S.classList.add("is-future"),E.appendChild(S)}t.appendChild(E)}function nd(e){var o;const t=d("[data-ag-history-tally]");if(!t)return;if(se!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(o=e[e.length-1])==null?void 0:o.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const Ia=15;let Ma=Ia;function rd(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function od(e){const t=d("[data-ag-album-card]"),a=d("[data-ag-album]"),n=d("[data-ag-album-note]");if(!t||!a)return;const r=rd(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const o of r){const i=document.createElement("button");i.type="button",i.className="ag-album-tile",i.title=o.caption||o.alt||o.day,i.setAttribute("aria-label",o.caption||o.alt||`Foto vom ${o.day}`);const s=document.createElement("img");s.src=o.url,s.alt=o.alt||o.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>i.remove(),{once:!0}),i.appendChild(s),i.addEventListener("click",()=>{I(8),Ze(o.url,o.caption,!1,o.alt)}),a.appendChild(i)}}function id(e){const t=d("[data-ag-trophy-card]"),a=d("[data-ag-trophies]"),n=d("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,s)=>(s.bestandenAt||s.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`);const{formatHistoryDate:o}=Me();a.innerHTML="";for(const i of r){const s=document.createElement("div");s.className="ag-trophy-tile",s.title=i.title||i.categoryLabel||"Quest";const l=document.createElement("span");l.className="ag-trophy-emoji";const c=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(l.textContent=c?c[c.length-1]:"🏆",i.beweisUrl){s.classList.add("has-beweis");const m=document.createElement("img");m.className="ag-trophy-shot",m.src=ee(i.beweisUrl),m.alt="Beweisfoto",m.loading="lazy",m.decoding="async",m.addEventListener("error",()=>{m.remove(),s.classList.remove("has-beweis")},{once:!0}),s.appendChild(m),s.addEventListener("click",()=>Ze(i.beweisUrl,i.title||"Beweisfoto"))}const p=document.createElement("span");p.className="ag-trophy-title",p.textContent=i.title||i.categoryLabel||"Quest";const f=document.createElement("span");f.className="ag-trophy-date",f.textContent=o(i.bestandenAt||i.day),s.appendChild(l),s.appendChild(p),s.appendChild(f),a.appendChild(s)}}function $a(){const e=d("[data-ag-ferien-list]"),t=d("[data-ag-ferien-count]");if(!e)return;const{formatHistoryDate:a}=Me(),n=pt();e.innerHTML="",t&&(t.hidden=!n.length,t.textContent=n.length?`· ${n.length}`:"");for(const r of n){const o=document.createElement("li");o.className="ag-ferien-item";const i=document.createElement("span");i.textContent=r.from===r.to?a(r.from):`${a(r.from)} – ${a(r.to)}`;const s=document.createElement("button");s.type="button",s.className="ag-ferien-remove",s.setAttribute("aria-label","Ferien entfernen"),s.textContent="✕",s.addEventListener("click",()=>{qi(r.from,r.to),$a(),Je()}),o.appendChild(i),o.appendChild(s),e.appendChild(o)}}function ne(){var p;It();const e=d("[data-ag-history]"),t=d("[data-ag-history-empty]"),a=d("[data-ag-history-note]");e.innerHTML="";const n=N(),r=_(((p=g.theme)==null?void 0:p.timezone)||"UTC"),o=U().filter(f=>f.token===n&&f.day<=r).slice().sort((f,m)=>f.day<m.day?1:f.day>m.day?-1:0);Br(o),nd(o),$a(),id(o),od(o);const i=o.filter(f=>nt(f)&&!f.used).length;ad(i);const s=o.filter(f=>se==="vouchers"?nt(f):se==="open"?nt(f)&&!f.used:!0);se==="open"?a.textContent=i?`Du hast ${i} offene${i===1?"n":""} Gutschein${i===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":se==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=d("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=se==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":se==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Ma);for(const f of c)e.appendChild($r(f));if(l){const f=s.length-c.length;l.hidden=f<=0,f>0&&(l.textContent=`Mehr anzeigen (${f} weitere)`,l.onclick=()=>{Ma+=Ia,ne()})}}function $t(){const e=d("[data-ag-lieblinge]"),t=d("[data-ag-lieblinge-empty]"),a=d("[data-ag-lieblinge-note]");e.innerHTML="";const n=fe();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild($r(r))}function sd(){const e=d("[data-ag-odds]");e.innerHTML="";const t=be(),a=fn(t),n=a.reduce((r,o)=>r+o.weight,0);for(const r of a){const o=document.createElement("li");o.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(o)}if(t>=5){const r=mn(t),o=document.createElement("li");o.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,o.style.fontWeight="800",e.appendChild(o)}}function ld(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Ba(){const e=d("[data-ag-wish-idle]"),t=d("[data-ag-wish-form]"),a=d("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Gt();n&&n.week===Ht()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,d("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",d("[data-ag-wish-done-note]").textContent=`„${n.text}"`,d("[data-ag-wish-done-meta]").textContent=ld(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function dd(){var w;const e=K()==="fionn",t=e?g.theme.brand.fromName:Ve(),a=e?Ve():g.theme.brand.fromName,n=d("[data-ag-main-title]");n&&(n.textContent=g.theme.brand.titleTemplate.replace("{name}",t));const r=d("[data-ag-kicker]");r&&(r.textContent=`${g.theme.brand.kicker} · ${g.photos.length} Erinnerungen`);const o=d("[data-ag-intro]");o&&(o.textContent=g.theme.brand.intro);const i=d("[data-ag-button-text]");i&&(i.textContent=g.theme.brand.buttonIdle);const s=d("[data-ag-rules-title]");s&&(s.textContent=g.theme.brand.rulesTitle);const l=d("[data-ag-rules-text]");l&&(l.textContent=g.theme.brand.rulesText);const c=d("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const p=d("[data-ag-today-pill]");p&&(p.textContent=Pl());const f=d("[data-ag-draw-hint]");f&&(f.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const m=d("[data-ag-werkstatt-open]");m&&(m.hidden=e||!yt());const h=document.getElementById("ag-werkstatt-panel");h&&!yt()&&(h.hidden=!0),wt();const b=d("[data-ag-chips]");b&&(b.innerHTML="");const y=Array.isArray(g.theme.stickers)&&g.theme.stickers.length?g.theme.stickers:Dl();for(const E of b?y:[]){const v=document.createElement("li");if(v.textContent=E,(E.toLowerCase().includes("bärlauch")||E.toLowerCase().includes("barlauch"))&&(v.id="ag-btn-baerlauch",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Bärlauch öffnen"),v.classList.add("ag-chip-clickable")),(E.toLowerCase().includes("gespräch")||E.toLowerCase().includes("gesprach"))&&(v.id="ag-btn-gesprach",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Gespräch öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase().includes("rave")&&(v.id="ag-btn-rave",v.tabIndex=0,v.setAttribute("role","link"),v.setAttribute("aria-label","Rave Board öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase()==="quest"&&(v.id="ag-btn-quest",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Quest öffnen"),v.classList.add("ag-chip-clickable"),(w=g.quest)!=null&&w.enabled&&Gn()&&(_e().solved||v.classList.add("ag-chip-quest-active"))),E.toLowerCase().includes("glossar")&&(v.id="ag-btn-glossary",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Glossar öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase()==="mission"&&(v.id="ag-btn-mission",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Mission öffnen"),v.classList.add("ag-chip-clickable"),On()||v.classList.add("ag-chip-mission-active")),(E.toLowerCase().includes("skincare")||E.toLowerCase().includes("pflege"))&&g.skincare&&(v.id="ag-btn-skincare",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Skincare-Routine öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase().includes("stimmung")){v.id="ag-btn-stimmung",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Farbe des Tages wählen"),v.classList.add("ag-chip-clickable");const x=Ce();x&&(v.classList.add("ag-chip-stimmung-set"),v.style.setProperty("--chip-dot-color",x))}b.appendChild(v)}jl(),Je()}const Dr="affektions-gacha:install-dismissed:v1";let Xe=null;function cd(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function gd(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Nr(){try{return window.localStorage.getItem(Dr)==="1"}catch{return!1}}function Pr(){try{window.localStorage.setItem(Dr,"1")}catch{}const e=d("[data-ag-install-nudge]");e&&(e.hidden=!0)}function _r(e){if(Nr())return;const t=d("[data-ag-install-nudge]");if(!t)return;const a=d("[data-ag-install-copy]"),n=d("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Xe&&(Xe.prompt(),await Xe.userChoice,Xe=null,Pr())}),t.hidden=!1}function pd(){var e;cd()||Nr()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Xe=t,_r(!0)}),gd()&&_r(!1),(e=d("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Pr))}const ud={photos:[]};function md(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=ra();return a.map(r=>{const o=new URL(r.url,n).toString(),i=r.type==="video"||t.test(o);return{...r,type:i?"video":"image",url:o}}).filter(r=>r.url)}async function fd(){us(),bs(),xs();try{const[e,t,a,n,r,o,i,s,l,c]=await Promise.all([X("config/theme.json"),X("config/outcomes.json"),X("config/photos.json",ud),X("config/special-days.json",{days:[]}),X("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),X("config/backup.json",{enabled:!1,endpointUrl:""}),X("config/quest.json",{enabled:!1}),X("config/missions.json",{pairs:[]}),X("config/push.json",{enabled:!1}),X("config/skincare.json",null)]);g.theme=e,g.outcomes=t,g.photos=md(a),g.specialDays=n,si(e.dayStartHour),g.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},g.backup=o&&typeof o=="object"?o:{enabled:!1,endpointUrl:""},g.quest=i&&typeof i=="object"?i:{enabled:!1},g.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},g.push=l&&typeof l=="object"?l:{enabled:!1},g.skincare=c&&typeof c=="object"?c:null,g.werkstatt=je(),ms(e),fs(Z()||_(e.timezone)),Vi(),dd(),sd(),Ba(),Sr(),pd(),requestAnimationFrame(()=>{const m=z.querySelector(".ag-nav-pill"),h=z.querySelector(".ag-bottomnav-btn.is-active");if(m&&h){const b=h.closest(".ag-bottomnav"),y=b?b.getBoundingClientRect():null,w=h.getBoundingClientRect();y&&w.width&&(m.style.transition="none",m.style.left=`${w.left-y.left}px`,m.style.width=`${w.width}px`,requestAnimationFrame(()=>{m.style.transition=""}))}});try{wr()}catch{}try{const m=z.querySelector(".ag-stage");m&&"IntersectionObserver"in window&&new IntersectionObserver(([b])=>{m.classList.toggle("ag-stage-idle",!b.isIntersecting)},{threshold:.05}).observe(m)}catch{}ka(),g.renderedDay=_(e.timezone);const p=()=>{Z()||_(e.timezone)!==g.renderedDay&&window.location.reload()};window.setInterval(p,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(p(),xa(),la(),qr(e.timezone),He().catch(()=>{}))}),z.classList.add("is-ready"),z.style.transition="opacity .18s ease",z.style.opacity="1";const f=_(e.timezone);U().some(m=>m.token===N()&&m.day===f)&&!Z()&&kr(),la(),qr(e.timezone),He().catch(()=>{}),window.setTimeout(()=>{fr().catch(()=>{})},1800)}catch(e){Ta(e)}}function qr(e){try{const{h:t}=Pe(e||"UTC"),a=t>=22||t<5;z.classList.toggle("is-evening",a);const n=z.querySelector("[data-ag-kicker]");if(n){const r=n.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");n.textContent=a?r+" · Gute Nacht 🌙":r}}catch{}}const Be=document.currentScript,hd=(Be==null?void 0:Be.dataset.mount)||"#affektions-gacha",bd=(Be==null?void 0:Be.dataset.configBase)||"";function yd(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const wd=document.querySelector(hd)||yd();ai(wd),ds(bd,null),fd().catch(e=>Ta(e));const vd="wss://broker.hivemq.com:8884/mqtt",Ur="picolight_lf26/events",xd="web_app",jr=10,Da=17/29,kd={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:Da,w:1},quiet:{pos:1/29,w:.3}},Na=18e3,Or=420,Fr=6,Hr=Or*Fr,Pa=1600;function Rr(e){const t=kd[e]||{pos:Da,w:0},a=t.w>=1?{pos:Da,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],o=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],i=[];for(let l=0;l<Fr;l++)i.push({at:l*Or,payload:{on:!0,fade_steps:6,brightness:1,groups:l%2?o:r}});i.push({at:Hr,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:jr}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let l=!1;for(let c=Hr+Pa;c<Na-Pa;c+=Pa)l=!l,i.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...l?s:n,size:jr}]}})}return i}const Sd=2500,_a=["board_a","board_b"];let qa=!1;function Ed(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function Td(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}async function Cd(e){if(!qa){qa=!0;try{await Ed(),await new Promise((t,a)=>{const n=window.mqtt.connect(vd,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),r={};let o=!1,i=null,s=[],l=!1;const c=()=>{if(!l){l=!0,document.removeEventListener("visibilitychange",m);try{n.end(!0)}catch{}t()}},p=h=>{h.from=xd;try{n.publish(Ur,JSON.stringify(h))}catch{}},f=()=>{clearTimeout(i);for(const h of s)clearTimeout(h);if(s=[],!o){c();return}o=!1;for(const h of _a){const b=r[h]||r[_a.find(w=>w!==h)];if(!b)continue;const y={target:h,...Td(b)};b.on===!1?(p({...y,on:!0}),setTimeout(()=>p({target:h,on:!1}),1500)):p({...y,on:!0})}setTimeout(c,2500)},m=()=>{document.visibilityState==="hidden"&&o&&f()};document.addEventListener("visibilitychange",m),n.on("connect",()=>{n.subscribe(Ur,h=>{if(h){c();return}p({nudge:!0}),setTimeout(()=>{if(!Object.keys(r).length){c();return}o=!0;for(const b of Rr(e))s.push(setTimeout(()=>p(b.payload),b.at));i=setTimeout(f,Na)},Sd)})}),n.on("message",(h,b)=>{try{const y=JSON.parse(b.toString());y.from&&_a.includes(y.from)&&Array.isArray(y.groups)&&!o&&(r[y.from]=y)}catch{}}),n.on("error",()=>{o||c()}),n.on("close",()=>{o||c()}),setTimeout(()=>a(new Error("lights flash timed out")),Na+2e4)})}catch{}finally{qa=!1}}}const Ld=Object.freeze(Object.defineProperty({__proto__:null,choreography:Rr,flashLightsForPull:Cd},Symbol.toStringTag,{value:"Module"}))})();

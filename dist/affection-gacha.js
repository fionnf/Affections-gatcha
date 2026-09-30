(function(){"use strict";const p={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,push:null,skincare:null,werkstatt:[],todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let z=null;function Go(e){z=e}function d(e){return z.querySelector(e)}const Da="affektions-gacha:history:v1",Na="affektions-gacha:favourites:v1",Pa="affektions-gacha:tokens:v1",_a="affektions-gacha:tokens-sent:v1",qa="affektions-gacha:streak-cache:v1",Ua="affektions-gacha:streak-synced:v1",ja="affektions-gacha:streak-restore:v1",Oa="affektions-gacha:wish:v1",Ha="affektions-gacha:milestones:v1",Se="affektions-gacha:notif:v2",Fa="affektions-gacha:baerlauch-scores:v1",Ko="affektions-gacha:baerlauch-history:v1",Ra="affektions-gacha:mission-log:v1",Wa="affektions-gacha:gesprach-idx:v1",Yo="affektions-gacha:sound:v1",Ga="affektions-gacha:gipfelbuch:v1",Ka="affektions-gacha:quest:v1",$t="affektions-gacha:quest-points:v1",Jo=5,Vo=20,Ya=[100,75,50,25],Ja="affektions-gacha:glossary:v1",Bt="affektions-gacha:stimmung:v1",Va="affektions-gacha:freikarte:v1",Dt="affektions-gacha:freikarte-reroll:v1",Za="affektions-gacha:werkstatt:v1",Nt={"🌿":{goal:5,reward:"Fionn kocht dir ein Abendessen nach Wahl"},"🔥":{goal:5,reward:"Wochenend-Abenteuer — Ziel nach deiner Wahl"},"⭐":{goal:5,reward:"Fionns Überraschung — er entscheidet"},"☁️":{goal:4,reward:"Ein ganzer fauler Tag ohne Pläne"},"🏔":{goal:5,reward:"Eine richtige Bergtour, Hütte inklusive"},"☕":{goal:4,reward:"Ein Ausflug in dein Traumcafé, egal wo"},"💚":{goal:3,reward:"Ein langer, handgeschriebener Brief"},"🎬":{goal:3,reward:"Filmabend — du wählst, ich mache Popcorn"},"🍕":{goal:3,reward:"Essen kommt ins Haus, du bestimmst was"},"🎧":{goal:5,reward:"Konzert oder DJ-Abend, Tickets gehen auf mich"},"🛁":{goal:4,reward:"Ein Wellness-Abend, komplett vorbereitet"},"✈️":{goal:7,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}};function Pt(e){const t=Nt[e];return t&&t.goal||Jo}function _t(e){const t=Nt[e];return t&&t.reward||""}function _(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=r=>a.find(o=>o.type===r).value;return`${n("year")}-${n("month")}-${n("day")}`}function Ze(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function Zo(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function qt(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function Qo(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function V(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Xo(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function ei(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ce(e){return ei(Xo(e))()}function Qe(e,t){return t?Math.floor(ce(e)*t):0}function ti(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function ai(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function D(){return K()==="fionn"?"fionn":"lennart"}function K(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function te(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ni(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Ut(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Xe(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=_(t),[n,r,o]=a.split("-").map(Number),i=Math.floor(new Date(Date.UTC(n,r-1,o)).getTime()/864e5);return Math.floor(i/(((l=e.quest)==null?void 0:l.periodDays)||2))}function et(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Xe(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function Qa(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function ri(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const oi=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,ii=/nicht\s+einlös|kein\s+gutschein/i,si=new Set(["photo","collect","niete"]);function tt(e){if(!e)return!1;if(e.voucher===!0)return!0;if(si.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return ii.test(t)?!1:oi.test(t)}function N(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function me(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[D()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[D()]:n})),n}catch{return t}}function ge(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[D()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}function q(){try{if(typeof window>"u"||!window.localStorage)return p.syncedHistory||[];const e=window.localStorage.getItem(Da);if(!e)return p.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return p.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:p.syncedHistory||[]}catch{return p.syncedHistory||[]}}function de(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Da,JSON.stringify(e))}catch{}}function Xa(e,t){var r;const a=q(),n=a.find(o=>o.day===e&&o.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=_(((r=p.theme)==null?void 0:r.timezone)||"UTC"),de(a)),n):null}function li(e,t,a){const n=q(),r=n.find(o=>o.day===e&&o.token===t);return r?(r.beweisUrl=a,de(n),r):null}function di(e,t,a){const n=q(),r=n.find(o=>o.day===e&&o.token===t);return r?(r.reaction=a,de(n),r):null}function fe(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(Na);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=p.theme)!=null&&e.timezone?_(p.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function at(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Na,JSON.stringify(e))}catch{}}function Ee(){const e=me(Pa,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function jt(e){ge(Pa,e)}function en(e){const t=Ee();return t[e]=(t[e]||0)+1,jt(t),t[e]}function ci(e){const t=Ee();t[e]=0,jt(t)}function nt(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;r>0&&(t[a]=r)}return t}function gi(){const e=me(_a,null);return e&&typeof e=="object"&&!Array.isArray(e)?nt(e):null}function rt(e){ge(_a,nt(e))}function pi(e){const t=nt(e),a=nt(Ee());let n=gi();n===null&&(n=a,rt(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),o={};for(const i of r){const s=(t[i]||0)+((a[i]||0)-(n[i]||0));s>0&&(o[i]=s)}return jt(o),rt(t),[...r].some(i=>(o[i]||0)!==(t[i]||0))}function Ot(){try{const e=localStorage.getItem(Va),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function tn(e){try{localStorage.setItem(Va,JSON.stringify(e))}catch{}}function ui(e){return Ot()[e]||0}function an(e){const t=Ot();return t[e]=(t[e]||0)+1,tn(t),t[e]}function mi(e){const t=Ot();return t[e]>0?(t[e]-=1,tn(t),!0):!1}function fi(e,t){try{const a=localStorage.getItem(Dt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function hi(e,t,a){try{const n=localStorage.getItem(Dt),r=n?JSON.parse(n):{},o=r&&typeof r=="object"?r:{};o[`${e}|${t}`]=a,localStorage.setItem(Dt,JSON.stringify(o))}catch{}}function Ht(){if(typeof window>"u"||!window.localStorage)return null;const e=me(Oa,null);return e&&typeof e=="object"?e:null}function nn(e){typeof window>"u"||!window.localStorage||ge(Oa,e)}function he(){const e=me(ja,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ot(e){ge(ja,e)}function bi(){const e=me(qa,0);return typeof e=="number"?e:parseInt(e,10)||0}function Ft(e){ge(qa,e)}function yi(){const e=me(Ua,0);return typeof e=="number"?e:parseInt(e,10)||0}function vi(e){ge(Ua,e)}function it(){try{const e=window.localStorage.getItem(Ga);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function st(e){try{window.localStorage.setItem(Ga,JSON.stringify(e))}catch{}}function lt(){try{const e=localStorage.getItem(Ra),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Rt(e){try{localStorage.setItem(Ra,JSON.stringify(e))}catch{}}function Wt(){try{const e=localStorage.getItem(Fa),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function rn(){try{const e=localStorage.getItem(Ko),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function De(e){try{const t=me(Ka,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Gt(e){ge(Ka,e)}function dt(){const e=me($t,0);return typeof e=="number"?e:parseInt(e,10)||0}function wi(e){try{const t=dt()+e;return ge($t,t),t}catch{return e}}function xi(e){ge($t,e)}function on(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Ha);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ki(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ha,JSON.stringify(e))}catch{}}function Si(e,t){return on().includes(`${e}|${t}`)}function Ei(e,t){const a=`${e}|${t}`,n=on();n.includes(a)||ki([...n,a])}function Kt(e){return!1}const Ti=60;function ct(){const e=he();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function Ci(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>Ti))return null;const n=he(),r=ct().filter(o=>!(o.from===e&&o.to===t));return r.push({from:e,to:t}),r.sort((o,i)=>o.from.localeCompare(i.from)),ot({...n,vacations:r}),{from:e,to:t}}function Li(e,t){const a=he();ot({...a,vacations:ct().filter(n=>!(n.from===e&&n.to===t))})}function sn(e){return ct().some(t=>e>=t.from&&e<=t.to)}function be(){var u;const e=D(),t=q().filter(f=>f.token===e);if(!t.length)return Math.max(bi(),yi());const a=((u=p.theme)==null?void 0:u.timezone)||"UTC",n=_(a),r=new Set(t.map(f=>f.day)),[o,i,s]=n.split("-").map(Number);let l=new Date(Date.UTC(o,i-1,s)),c=n;r.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));let g=0;for(;r.has(c)||sn(c);)r.has(c)&&g++,l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return g}function ln(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function dn(e){if(e<5)return p.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return p.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Ai=45,zi=10,Ii=.5,Mi=1.8;function $i(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=q().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,l)=>l.day.localeCompare(s.day)).slice(0,Ai);if(r.length<zi)return e;const o=e.reduce((s,l)=>s+l.weight,0);if(!o)return e;const i={};for(const s of r)i[s.categoryId]=(i[s.categoryId]||0)+1;return e.map(s=>{const l=r.length*s.weight/o,c=Math.min(Mi,Math.max(Ii,(l+1)/((i[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function Bi(e,t,a=[],n=null){const r=dn(t),o=n?$i(r,n.token,n.day):r,i=a.length?o.filter(u=>!a.includes(u.id)):o,s=i.length?i:o,l=s.reduce((u,f)=>u+f.weight,0),c=Math.floor(ce(e)*l);let g=0;for(const u of s)if(g+=u.weight,c<g)return p.outcomes.categories.find(f=>f.id===u.id)||u;return p.outcomes.categories[p.outcomes.categories.length-1]}function cn(){const e=he();return Math.floor((e.maxStreak||0)/Vo)}function gt(){var n;if(he().birthdayBonus2026Used)return 0;const t=((n=p.theme)==null?void 0:n.timezone)||"UTC";return _(t)==="2026-05-29"?1:0}function Yt(){const e=he();return Math.max(0,cn()-(e.used||0))+gt()}function Jt(){var g;const e=D(),t=((g=p.theme)==null?void 0:g.timezone)||"UTC",a=_(t),n=new Set(q().filter(u=>u.token===e&&u.day<=a).map(u=>u.day));if(!n.size)return null;const r=[...n].sort()[0],[o,i,s]=a.split("-").map(Number),l=new Date(Date.UTC(o,i-1,s));let c=a;for(n.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));n.has(c)||sn(c);)l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return c<r?null:c}function gn(){return Yt()>0&&Jt()!==null}function Di(e){if(Yt()<=0)return null;const t=Jt();if(!t)return null;const a=D(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,o=[n,...q()].filter(c=>{const g=`${c.day}|${c.token}`;return r.has(g)?!1:(r.add(g),!0)}).sort((c,g)=>c.day<g.day?1:c.day>g.day?-1:0);de(o);const i=he(),l=Math.max(0,cn()-(i.used||0))===0&&gt()>0;return ot({...i,used:l?i.used||0:(i.used||0)+1,birthdayBonus2026Used:l?!0:i.birthdayBonus2026Used||!1,usedAt:Date.now()}),Ft(be()),t}const pn=new Map;function ae(e){pn.set(e,Date.now())}function pt(e,t=6e3){const a=pn.get(e);return typeof a=="number"&&Date.now()-a<t}function Ne(){var e;return _(((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function un(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:D()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Ni(e){if(!e||typeof e!="object"||pt("stimmung"))return;const t=Ne();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){Te()&&(hn(),Vt());return}Te()!==a&&(fn(a),Pe(a))}function mn(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(o,i)=>Math.round(i+(o-i)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function Pe(e){document.body.style.background=mn(e),bn(e)}function Vt(){document.body.style.removeProperty("background"),bn(null)}function Te(){try{const e=localStorage.getItem(Bt);if(!e)return null;const t=JSON.parse(e);return t.day!==Ne()?null:t.hex||null}catch{return null}}function fn(e){try{localStorage.setItem(Bt,JSON.stringify({day:Ne(),hex:e}))}catch{}}function Pi(e){const t=Ne();fn(e),ae("stimmung"),un(t,e)}function hn(){try{localStorage.removeItem(Bt)}catch{}}function _i(){const e=Ne();hn(),ae("stimmung"),un(e,"")}function qi(){const e=Te();e&&Pe(e)}function bn(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function yn(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Te()||"#4aaa5a";vn(e,t),Zt(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Ui(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=Te();t?Pe(t):Vt()}function ji(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function o(i){Zt(e,i),Pe(i)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),o(t.value)}),a&&a.addEventListener("input",()=>{const i=wn(a.value);i&&(t&&(t.value=i),o(i))}),n&&n.addEventListener("click",()=>{const i=(t==null?void 0:t.value)||wn((a==null?void 0:a.value)||"")||"#4aaa5a";Pi(i),Pe(i),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{_i(),Vt(),vn(e,"#4aaa5a"),Zt(e,"#4aaa5a")})}function vn(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Zt(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=mn(t))}function wn(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,o]=a;return`#${n}${n}${r}${r}${o}${o}`.toLowerCase()}return null}function A(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const xn={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function Oi(e){A(xn[e]||xn.soft)}function F(e){const t=z.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}const ne="fionn";function _e(){try{return JSON.parse(window.localStorage.getItem(Za)||"[]")||[]}catch{return[]}}function ut(e){try{window.localStorage.setItem(Za,JSON.stringify(e))}catch{}p.werkstatt=e}function mt(e,t){return(p.werkstatt||[]).filter(a=>a&&a.categoryId===e&&(a.forToken||ne)===t)}function kn(e){return{id:e.id,categoryId:e.categoryId,forToken:e.forToken,title:e.title,message:e.message,prompt:e.prompt,link:e.link,voucher:e.voucher,answer:e.answer,answeredAt:e.answeredAt,createdBy:e.createdBy,createdAt:e.createdAt}}function ft(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:D(),...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Hi(e){const t=_e(),a=t.findIndex(r=>r.id===e.id),n={id:e.id,categoryId:e.categoryId,forToken:e.forToken||ne,title:(e.title||"").trim(),message:(e.message||"").trim(),prompt:(e.prompt||"").trim()||null,link:(e.link||"").trim()||null,voucher:!!e.voucher,answer:(a===-1?null:t[a].answer)||null,answeredAt:(a===-1?null:t[a].answeredAt)||null,createdBy:D(),createdAt:(a===-1?new Date().toISOString():t[a].createdAt)||new Date().toISOString(),pendingSince:Date.now()};a===-1?t.unshift(n):t[a]=n,ut(t),ae("werkstatt"),ft("werkstatt-upsert",kn(n))}function Fi(e,t){const a=_e(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r=new Date().toISOString();a[n]={...a[n],answer:t,answeredAt:r,pendingSince:Date.now()},ut(a),ae("werkstatt"),ft("werkstatt-answer",{id:e,answer:t,answeredAt:r})}function Ri(e){ut(_e().filter(t=>t.id!==e)),ae("werkstatt"),ft("werkstatt-delete",{id:e})}function Wi(e){if(!Array.isArray(e)||pt("werkstatt"))return;const t=e.filter(l=>l&&l.id&&l.categoryId&&l.title),a=new Map(t.map(l=>[l.id,l])),n=_e().filter(l=>{if(!l.pendingSince)return!1;const c=a.get(l.id);return!c||(c.answer||null)!==(l.answer||null)});for(const l of n.slice(0,5))ft("werkstatt-upsert",kn(l));const r=new Set,o=new Set,i=[],s=l=>`${l.forToken||ne}|${l.categoryId}|${String(l.title).trim().toLocaleLowerCase("de-CH")}`;for(const l of n)r.add(l.id),o.add(s(l)),i.push(l);for(const l of t)r.has(l.id)||o.has(s(l))||(r.add(l.id),o.add(s(l)),i.push(l));ut(i)}const j={categoryId:null,editingId:null};function qe(){return p.outcomes&&p.outcomes.categories||[]}function Sn(){return ne.charAt(0).toLocaleUpperCase("de-CH")+ne.slice(1)}function ht(){const e=p.theme&&p.theme.features;return!e||e.werkstatt!==!1}function Gi(){if(!ht())return;const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!1,j.categoryId=j.categoryId||qe()[0]&&qe()[0].id||null,Ce(),Ue(),e.scrollIntoView({behavior:"smooth",block:"start"}),A(10))}function Ki(){const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!0),Ce()}function bt(){if(!ht())return;const e=document.querySelector("[data-ag-werkstatt-entry-sub]");if(!e)return;const t=(p.werkstatt||[]).filter(n=>(n.forToken||ne)===ne);if(!t.length){e.textContent="Noch keine — schreib die erste.";return}const a=new Set(t.map(n=>n.categoryId)).size;e.textContent=t.length===1?"1 Kapsel von dir in seiner Maschine.":`${t.length} Kapseln von dir, in ${a} ${a===1?"Kategorie":"Kategorien"}.`}function Ue(){bt();const e=document.getElementById("ag-werkstatt-tabs"),t=document.getElementById("ag-werkstatt-list"),a=document.getElementById("ag-werkstatt-note");if(!e||!t)return;const n=qe();!j.categoryId&&n.length&&(j.categoryId=n[0].id),e.innerHTML="";for(const l of n){const c=mt(l.id,ne).length,g=document.createElement("button");g.type="button",g.className="ag-werkstatt-tab"+(l.id===j.categoryId?" is-active":""),g.dataset.agWerkstattCat=l.id,g.innerHTML=`${N(l.label)}${c?` <span class="ag-werkstatt-count">${c}</span>`:""}`,g.addEventListener("click",()=>{j.categoryId=l.id,Ji()?En():Ce(),Ue(),A(6)}),e.appendChild(g)}const r=n.find(l=>l.id===j.categoryId),o=j.categoryId?mt(j.categoryId,ne):[],i=Sn();a&&(o.length===1?a.textContent=`${i} zieht hier nur noch deine eine Kapsel.`:o.length>1?a.textContent=`${i} zieht hier nur noch aus deinen ${o.length} Kapseln.`:a.textContent=`Noch nichts von dir — ${i} zieht hier aus den ${r?r.outcomes.length:0} Standardkapseln. Schreib eine, und sie gehört dir.`),t.innerHTML="",o.forEach((l,c)=>t.appendChild(Yi(l,c)));const s=e.querySelector(".is-active");s&&e.scrollWidth>e.clientWidth&&e.scrollTo({left:Math.max(0,s.offsetLeft-(e.clientWidth-s.offsetWidth)/2),behavior:"smooth"})}function Yi(e,t){const a=document.createElement("button");a.type="button",a.className="ag-werkstatt-card",a.style.setProperty("--ag-i",String(t)),a.setAttribute("aria-label",`${e.title} bearbeiten`);const n=e.pendingSince&&Date.now()-e.pendingSince>9e4,r=e.prompt&&e.answer?`<div class="ag-werkstatt-answer"><span class="ag-werkstatt-block-label">Seine Antwort</span>${N(e.answer)}</div>`:e.prompt?'<div class="ag-werkstatt-card-pending">Noch nicht beantwortet</div>':"";return a.innerHTML=`
    <div class="ag-werkstatt-card-title">${N(e.title)}</div>
    <div class="ag-werkstatt-card-msg">${N(e.message)}</div>
    ${e.prompt?`<div class="ag-werkstatt-card-prompt"><span class="ag-werkstatt-block-label">Frage</span>${N(e.prompt)}</div>`:""}
    ${r}
    <div class="ag-werkstatt-card-tags">
      ${e.voucher?'<span class="ag-werkstatt-tag is-voucher">Gutschein</span>':""}
      ${e.link?'<span class="ag-werkstatt-tag">Link</span>':""}
      ${n?'<span class="ag-werkstatt-tag is-unsent">Noch nicht übertragen</span>':""}
    </div>
  `,a.addEventListener("click",()=>Tn(e)),a}function Ji(){const e=document.getElementById("ag-werkstatt-form");return!!e&&!e.hidden}function En(){const e=document.getElementById("ag-werkstatt-form-title");if(!e)return;const t=qe().find(n=>n.id===j.categoryId),a=j.editingId?"Kapsel bearbeiten":"Neue Kapsel";e.textContent=t?`${a} · ${t.label}`:a}function Tn(e){var o;const t=document.getElementById("ag-werkstatt-form"),a=document.getElementById("ag-werkstatt-add");if(!t)return;j.editingId=e?e.id:null,e&&e.categoryId&&(j.categoryId=e.categoryId),document.getElementById("ag-werkstatt-title").value=e?e.title:"",document.getElementById("ag-werkstatt-message").value=e?e.message:"",document.getElementById("ag-werkstatt-prompt").value=e&&e.prompt||"",document.getElementById("ag-werkstatt-link").value=e&&e.link||"",document.getElementById("ag-werkstatt-voucher").checked=!!(e&&e.voucher),En();const n=document.getElementById("ag-werkstatt-error");n&&(n.hidden=!0);const r=document.getElementById("ag-werkstatt-delete");r&&(r.hidden=!e,r.textContent="Kapsel löschen",r.classList.remove("is-armed")),t.hidden=!1,a&&(a.hidden=!0),t.scrollIntoView({behavior:"smooth",block:"nearest"}),(o=document.getElementById("ag-werkstatt-title"))==null||o.focus(),A(8)}function Ce(){const e=document.getElementById("ag-werkstatt-form"),t=document.getElementById("ag-werkstatt-add");e&&(e.hidden=!0),t&&(t.hidden=!1);const a=document.getElementById("ag-werkstatt-delete");a&&(a.hidden=!0,a.classList.remove("is-armed")),j.editingId=null}function Vi(){const e=document.getElementById("ag-werkstatt-delete");if(!(!e||!j.editingId)){if(!e.classList.contains("is-armed")){e.classList.add("is-armed"),e.textContent="Wirklich löschen?",A(12);return}Ri(j.editingId),Ce(),Ue(),A([12,40,12]),F("Kapsel gelöscht")}}function Zi(){var f,h,b,v,w,E;const e=(((f=document.getElementById("ag-werkstatt-title"))==null?void 0:f.value)||"").trim(),t=(((h=document.getElementById("ag-werkstatt-message"))==null?void 0:h.value)||"").trim(),a=(((b=document.getElementById("ag-werkstatt-prompt"))==null?void 0:b.value)||"").trim(),n=(((v=document.getElementById("ag-werkstatt-link"))==null?void 0:v.value)||"").trim(),r=!!((w=document.getElementById("ag-werkstatt-voucher"))!=null&&w.checked),o=document.getElementById("ag-werkstatt-error");function i(y){o&&(o.textContent=y,o.hidden=!1),A([20,40,20])}if(!e)return i("Die Kapsel braucht einen Titel.");if(!t)return i("Schreib noch einen Satz dazu.");if(n&&!/^https?:\/\//i.test(n))return i("Der Link muss mit http:// oder https:// anfangen.");if(!j.categoryId)return i("Wähl zuerst eine Kategorie.");const s=y=>(y||"").trim().toLocaleLowerCase("de-CH"),l=s(e);if(mt(j.categoryId,ne).some(y=>y.id!==j.editingId&&s(y.title)===l))return i("Eine Kapsel mit diesem Titel gibt es hier schon.");if((((E=qe().find(y=>y.id===j.categoryId))==null?void 0:E.outcomes)||[]).some(y=>s(y.title)===l))return i("So heisst schon eine Standardkapsel in dieser Kategorie.");Hi({id:j.editingId||`k-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,categoryId:j.categoryId,forToken:ne,title:e,message:t,prompt:a,link:n,voucher:r});const u=!!j.editingId;Ce(),Ue(),A([10,30,10]),F(u?"Kapsel geändert ✓":`Kapsel gespeichert — ${Sn()} kann sie ziehen ✓`)}let Qt="",Xt=null;function Qi(e,t){Qt=e,Xt=t}function ea(){if(Xt)return Xt();if(!Qt)return window.location.href;try{return new URL(Qt,window.location.href).toString()}catch{return window.location.href}}function J(e,t=null){const a=new URL(e,ea()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function yt(e){var t;try{const a=z&&z.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=p.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function je(){var e;try{const t=p.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=D(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,o=setTimeout(()=>r.abort(),12e3);let i;try{i=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(o)}if(!i.ok)return yt(!1),!1;const s=await i.json();if(!s.ok)return yt(!1),!1;const l=_(((e=p.theme)==null?void 0:e.timezone)||"UTC"),c=q(),g=c.filter(h=>h.title!=="(wiederhergestellt)"&&h.day<=l);g.length!==c.length&&de(g);const u=fe(),f=u.filter(h=>h.day<=l);if(f.length!==u.length&&at(f),Array.isArray(s.history)&&s.history.length){const h=q(),b=new Map(h.map(w=>[`${w.day}|${w.token}`,w]));for(const w of s.history){if(w.title==="(wiederhergestellt)")continue;const E=ri(w.day);if(!E||E>l)continue;const y=typeof w.token=="string"?w.token.toLowerCase():w.token,x=`${E}|${y}`,k={...w,day:E,token:y},I=b.get(x);I&&I.bestanden&&!k.bestanden&&(k.bestanden=!0,k.bestandenAt=I.bestandenAt||null),I&&I.beweisUrl&&!k.beweisUrl&&(k.beweisUrl=I.beweisUrl),I&&I.reaction&&!k.reaction&&(k.reaction=I.reaction),b.set(x,k)}const v=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));de(v),p.syncedHistory=v,Ft(be())}if(Array.isArray(s.favourites)&&s.favourites.length){const h=fe(),b=new Map(h.map(v=>[`${v.day}|${v.token}`,v]));for(const v of s.favourites){if(v.day>l)continue;const w=typeof v.token=="string"?v.token.toLowerCase():v.token;b.set(`${v.day}|${w}`,{...v,token:w})}at(Array.from(b.values()).sort((v,w)=>w.day.localeCompare(v.day)))}if(s.tokens&&typeof s.tokens=="object"&&pi(s.tokens)&&Z(),typeof s.questPoints=="number"&&s.questPoints>dt()&&xi(s.questPoints),typeof s.streak=="number"&&s.streak>0&&vi(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const h=Wt();let b=!1;for(const[v,w]of Object.entries(s.baerlauchScores))typeof w=="number"&&w>(h[v]||0)&&(h[v]=w,b=!0);if(b)try{localStorage.setItem(Fa,JSON.stringify(h))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const h=lt(),b=new Map(h.map(w=>[`${w.day}|${w.player}`,w]));for(const w of s.missionLog)!w.day||!w.player||b.set(`${w.day}|${w.player}`,w);const v=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));Rt(v)}if(typeof s.latestPing=="string"&&s.latestPing&&D()!=="fionn")try{const h="affektions-gacha:last-ping:v1",b=window.localStorage.getItem(h)||"";s.latestPing>b&&(window.localStorage.setItem(h,s.latestPing),p._newPing=!0)}catch{}if(s.stimmung)try{Ni(s.stimmung)}catch{}if(Array.isArray(s.werkstatt))try{Wi(s.werkstatt)}catch{}if(Array.isArray(s.gipfelbuch)&&!pt("gipfelbuch")){const h=s.gipfelbuch.filter(b=>b.id).sort((b,v)=>(v.date||"").localeCompare(b.date||""));st(h)}return z&&z.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),yt(!0),Array.isArray(s.history)?s.history.length:0}catch{return yt(!1),-1}}function Z(){try{const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=D(),a=q().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=fe().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=Ee(),o=De(()=>Xe(p)),i=o.solved&&o.pointsEarned&&!o._logged?{challenge:et(p),attempts:o.attempts,points:o.pointsEarned,period:o.period}:void 0;i&&(o._logged=!0,Gt(o));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:be(),tokens:r,questPoints:dt(),...i?{questLog:i}:{}}),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,l).then(()=>{rt(r)}).catch(()=>fetch(e.endpointUrl,{...l,mode:"no-cors"}).then(()=>{rt(r)}).catch(()=>{}))}catch{}}function Cn(e){const t=Array.isArray(p.specialDays&&p.specialDays.days)?p.specialDays.days:[],a=e.slice(5),n=D();for(const r of t){const o=r.repeat==="yearly";if((r.date===e||o&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}function Ln(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Xi(e){const t=d("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Oe(){return(p.photos||[]).filter(e=>e.type!=="video")}function es(e,t){const a=mt(e.id,t);return a.length?a:e.outcomes}function An(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,o=D(),i=`${p.theme.secret}|${o}|${e}${r?"|"+r:""}`,s=Cn(e);if(s&&!r){const C=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],$=C[Qe(`${i}|special|outcome`,C.length)],G={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:C},O=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&p.photos.length&&Oe().find(se=>se.alt===s.photoAlt)||null;return{day:e,token:o,category:G,outcome:$,photo:O,collectToken:$.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const l=r?null:fi(o,e),c=r?null:q().find(C=>C.token===o&&C.day===e);let g;l&&(g=p.outcomes.categories.find(C=>C.id===l.categoryId)),!g&&c&&c.categoryId&&(g=p.outcomes.categories.find(C=>C.id===c.categoryId)||null),g||(g=Bi(`${i}|category`,t||0,n,{token:o,day:e}));const u=ni();if(u){const C=p.outcomes.categories.find($=>$.id===u);C&&(g=C)}g.id==="photo"&&!Oe().length&&(g=p.outcomes.categories.find(C=>C.id==="common")||g);const f=es(g,o),h=new Set(q().filter(C=>C.token===o&&C.day<e&&C.categoryId===g.id).map(C=>C.title)),b=C=>C.filter($=>!h.has($.title)),v=b(f),w=v.length?[]:b(g.outcomes),E=v.length?v:w.length?w:f,x=(c&&c.categoryId===g.id?f.find(C=>C.title===c.title)||g.outcomes.find(C=>C.title===c.title):null)||l&&f.find(C=>C.title===l.outcomeTitle)||E[Qe(`${i}|${g.id}|outcome`,E.length)],k=Oe();let I=null;if(g.id==="photo"&&k.length){const C=new Set(q().filter(O=>O.token===o&&O.day<e&&O.photo).map(O=>O.photo.url)),$=k.filter(O=>!C.has(O.url)),G=$.length>0?$:k;I=G[Qe(`${i}|photo`,G.length)]}return{day:e,token:o,category:g,outcome:x,photo:I,collectToken:x.token||null,voucher:x.voucher||!1,freikarte:x.freikarte===!0}}function ts(){const e=te()||_(p.theme.timezone),t=be();return An(e,t)}function as(e,t){return An(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function ns(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function rs(e){const t=(r,o)=>z.style.setProperty(r,o),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const zn={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},In={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function os(e){const t=Cn(e);if(!t)return;const a=(n,r)=>z.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))zn[n]&&typeof r=="string"&&a(zn[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))In[n]&&typeof r=="string"&&a(In[n],r)}const is=`
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
.ag-widget .ag-ferien{margin:0 0 12px;padding:10px 14px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.10)}
.ag-widget .ag-ferien-summary{cursor:pointer;list-style:none;font-size:.9rem;color:var(--ag-text)}
.ag-widget .ag-ferien-summary::-webkit-details-marker{display:none}
.ag-widget .ag-ferien-count{color:var(--ag-muted);font-size:.8rem}
.ag-widget .ag-ferien-note{margin:8px 0 10px;font-size:.82rem;color:var(--ag-muted);line-height:1.45}
.ag-widget .ag-ferien-form{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ag-widget .ag-ferien-input{flex:1 1 120px;min-width:0;padding:8px 10px;border-radius:12px;font-family:inherit;color-scheme:dark}
.ag-widget .ag-ferien-sep{font-size:.82rem;color:var(--ag-muted)}
.ag-widget .ag-ferien-add{min-height:38px;padding:0 14px;font-size:.88rem}
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
    `;function ss(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=is.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function ls(){return`
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
    `}function ds(){return`
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
    `}const cs=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${ls()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${ds()}
                <div class="ag-machine-capsule" data-capsule title="Halten zum Ziehen">
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
                <span class="ag-reactions-label">Kurz reagieren</span>
                <button class="ag-reaction" type="button" data-ag-react="🥹" aria-label="Reaktion: gerührt">🥹</button>
                <button class="ag-reaction" type="button" data-ag-react="😂" aria-label="Reaktion: lachen">😂</button>
                <button class="ag-reaction" type="button" data-ag-react="🙃" aria-label="Reaktion: na gut">🙃</button>
              </div>
              <div class="ag-actions">
                <button class="ag-secondary" type="button" data-ag-copy>Resultat kopieren</button>
                <a class="ag-secondary ag-link" data-ag-send href="#" rel="noopener">An Fionn schicken</a>
                <button class="ag-secondary ag-save-img" type="button" data-ag-save-img hidden>Als Bild speichern</button>
                <button class="ag-secondary" type="button" data-ag-wallpaper hidden>Als Hintergrund</button>
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
                <details class="ag-ferien" data-ag-ferien>
                  <summary class="ag-ferien-summary">🏖️ Ferien-Schutz <span class="ag-ferien-count" data-ag-ferien-count hidden></span></summary>
                  <p class="ag-ferien-note">Tage in den Ferien unterbrechen den Streak nicht. Sie zählen auch nicht mit.</p>
                  <div class="ag-ferien-form">
                    <input class="ag-ferien-input" type="date" data-ag-ferien-from aria-label="Von">
                    <span class="ag-ferien-sep">bis</span>
                    <input class="ag-ferien-input" type="date" data-ag-ferien-to aria-label="Bis">
                    <button class="ag-secondary ag-ferien-add" type="button" data-ag-ferien-add>Eintragen</button>
                  </div>
                  <ul class="ag-ferien-list" data-ag-ferien-list></ul>
                </details>
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
    `;function gs(){z.className="ag-widget",z.setAttribute("aria-labelledby","ag-title"),z.innerHTML=cs}function ps(e,t=1400,a=.82){return new Promise((n,r)=>{const o=URL.createObjectURL(e),i=new Image;i.onload=()=>{URL.revokeObjectURL(o);try{const s=Math.min(1,t/Math.max(i.naturalWidth||1,i.naturalHeight||1)),l=Math.max(1,Math.round((i.naturalWidth||1)*s)),c=Math.max(1,Math.round((i.naturalHeight||1)*s)),g=document.createElement("canvas");g.width=l,g.height=c,g.getContext("2d").drawImage(i,0,0,l,c);const u=g.toDataURL("image/jpeg",a);if(!u||u==="data:,"){r(new Error("encode failed"));return}n(u)}catch(s){r(s)}},i.onerror=()=>{URL.revokeObjectURL(o),r(new Error("decode failed"))},i.src=o})}async function us(e,t,a){const n=p.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await ps(a),o=r.slice(r.indexOf(",")+1),i=new AbortController,s=setTimeout(()=>i.abort(),3e4);let l;try{l=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:i.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:o})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await l.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function re(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let o=0;o<e;o++){const i=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,c=Math.random()*100,g=Math.random()*.6,u=1.4+Math.random()*.8;i.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${u}s ${g}s ease-in forwards;transform-origin:center;`,i.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(i)}if(!document.getElementById("ag-confetti-style")){const o=document.createElement("style");o.id="ag-confetti-style",o.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(o)}setTimeout(()=>r.remove(),3e3)}const Le=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],Mn=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],$n="affektions-gacha:mission-done:v1",Bn="affektions-gacha:mission-feedback:v1";function ta(){var o,i;const e=(o=p.missions)==null?void 0:o.pairs;if(!Array.isArray(e)||!e.length)return null;const t=_(((i=p.theme)==null?void 0:i.timezone)||"UTC"),a=Qe(`${p.theme.secret}|mission|${t}`,e.length),n=e[a];return K()==="fionn"?n.fionn:n.lennart}function Dn(){var e;try{const t=_(((e=p.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${$n}:${K()}`)===t}catch{return!1}}function ms(){var e,t;try{const a=_(((e=p.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${$n}:${K()}`,a);const n=K(),r=ta(),o=new Date().toISOString();bs({day:a,player:n,mission:r,doneAt:o});const i=(t=p.backup)==null?void 0:t.endpointUrl;i&&r&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:r,doneAt:o}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function Nn(){var e;try{const t=_(((e=p.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${Bn}:${K()}`)===t}catch{return!1}}function fs(){var e;try{const t=_(((e=p.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${Bn}:${K()}`,t)}catch{}}function hs(e,t){var i,s;const a=_(((i=p.theme)==null?void 0:i.timezone)||"UTC"),n=K(),r=ta();ys(a,n,{rating:e,comment:t||""}),fs();const o=(s=p.backup)==null?void 0:s.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:r,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function bs(e){const t=lt(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),Rt(t)}function ys(e,t,a){const n=lt(),r=n.findIndex(o=>o.day===e&&o.player===t);r>=0&&(n[r]={...n[r],...a},Rt(n))}function vs(e,t){var c;if(!e)return;const a=lt(),n=((c=p.theme)==null?void 0:c.timezone)||"UTC",r=_(n),o=new Map;for(const g of a)o.has(g.day)||o.set(g.day,{}),o.get(g.day)[g.player]=g;const i=Array.from(o.keys()).sort((g,u)=>u.localeCompare(g)).slice(0,30);if(!i.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},l=g=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(g+"T12:00:00Z"))}catch{return g}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+i.map(g=>{const u=o.get(g),f=u.lennart,h=u.fionn,b=g===r,v=[];if(f&&t!=="fionn"){const w=f.doneAt?'<span class="ag-log-done">✓</span>':"",E=f.rating?`<span class="ag-log-rating">${s[f.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${N(f.mission||"")}</span>${w}${E}</div>`)}if(h&&t!=="lennart"){const w=h.doneAt?'<span class="ag-log-done">✓</span>':"",E=h.rating?`<span class="ag-log-rating">${s[h.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${N(h.mission||"")}</span>${w}${E}</div>`)}return v.length?`<div class="ag-log-day${b?" ag-log-today":""}"><span class="ag-log-date">${l(g)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function Pn(){const e=d("#ag-mission-panel");if(!e)return;const t=d("#ag-mission-text"),a=d("#ag-mission-actions"),n=d("#ag-mission-feedback"),r=d("#ag-mission-feedback-sent"),o=d("#ag-mission-done-note"),i=e.querySelector(".ag-mini-copy");i&&(i.hidden=!0);const s=ta();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const l=Dn(),c=Nn();a&&(a.hidden=l),n&&(n.hidden=!l,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(g=>{g.hidden=c})),r&&(r.hidden=!c),o&&(o.hidden=!l),e.querySelectorAll(".ag-mission-rate-btn").forEach(g=>g.classList.remove("is-selected")),vs(d("#ag-mission-log"),K()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function ws(){const e=d("#ag-mission-panel");e&&(e.hidden=!0)}let vt=-1;function _n(){const e=d("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Wa);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<Le.length){vt=a;const n=d("#ag-gesprach-question");n&&(n.textContent=Le[a]);return}}}catch{}qn()}}function xs(){const e=d("#ag-gesprach-panel");e&&(e.hidden=!0)}function qn(){let e;do e=Math.floor(Math.random()*Le.length);while(e===vt&&Le.length>1);vt=e;try{localStorage.setItem(Wa,String(e))}catch{}const t=d("#ag-gesprach-question");t&&(t.textContent=Le[e])}function ks(){const e=Le[vt]||"";if(!e)return;const t=p.theme&&p.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Un(){var e;return!!((e=p.quest)!=null&&e.enabled&&et(p))}function jn(){const e=d("#ag-quest-panel");e&&(e.hidden=!1,On())}function Ss(){const e=d("#ag-quest-panel");e&&(e.hidden=!0)}function On(){const e=et(p),t=De(),a=d("#ag-quest-challenge"),n=d("#ag-quest-hint-history"),r=d("#ag-quest-loading"),o=d("#ag-quest-actions"),i=d("#ag-quest-result"),s=d("#ag-quest-points"),l=d("#ag-quest-copy"),c=d("#ag-quest-title"),g=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),o&&(o.hidden=!0);return}if(a&&(a.textContent=g),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((u,f)=>`<div class="ag-hint-item"><span class="ag-hint-num">${f+1}</span><p>${u}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),o&&(o.hidden=!0),i&&(i.textContent=t.successMessage||"",i.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${dt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),o&&(o.hidden=!1),i&&(i.hidden=!0),s&&(s.hidden=!0)}async function Es(e){if(!e)return;const t=d("#ag-quest-actions"),a=d("#ag-quest-loading"),n=d("#ag-quest-result"),r=d("#ag-quest-points"),o=d("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const i=await Ts(e),s=De(),l=et(p),c=(l==null?void 0:l.prompt)||"",g=(l==null?void 0:l.solution)||"";try{const u=await Cs(i,c,g,s.attempts+1,s.hints);if(s.attempts+=1,u.success){const f=Ya[Math.min(s.attempts-1,Ya.length-1)],h=wi(f);s.solved=!0,s.pointsEarned=f,s.successMessage=u.message||"Perfekt.",Gt(s),Z(),n&&(n.textContent=u.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${f} Punkte · Gesamt: ${h}`,r.hidden=!1),a&&(a.hidden=!0),o&&(o.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=d("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),A([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],u.hint||"Versuch nochmal."],Gt(s),On()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Ts(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Cs(e,t,a,n,r){var s;const o=(s=p.quest)==null?void 0:s.proxyUrl;if(!o)throw new Error("no proxy");const i=await fetch(o,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!i.ok)throw new Error("proxy error");return i.json()}function Ls(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),o=r.getChannelData(0);for(let c=0;c<n;c++)o[c]=Math.random()*2-1;const i=t.createBufferSource();i.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),i.connect(s),s.connect(l),l.connect(t.destination),i.start(a),i.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,g,u,f,h])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(c,a+u),b.frequency.exponentialRampToValueAtTime(g,a+u+f*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+u),v.gain.linearRampToValueAtTime(h,a+u+.09),v.gain.exponentialRampToValueAtTime(.001,a+u+f),b.connect(v),v.connect(t.destination),b.start(a+u),b.stop(a+u+f+.05)})}catch{}}function As(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const o=document.createElement("span");o.className="ag-letter-word",o.textContent=n,o.style.animationDelay=`${320+r*155}ms`,a.appendChild(o),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Hn(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function Fn(){const e=d("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),A([20,60,20]),Ls();const t=d("#ag-letter-photo");if(t&&p.photos&&p.photos.length){const a=Oe(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}zs()}async function zs(){var n;const e=d("#ag-letter-body");if(!e)return;As(e);const t=(n=p.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const o=await r.json();if(o.paragraphs&&o.paragraphs.length){Hn(e,o.paragraphs);return}}}catch{}const a=Mn[Math.floor(Math.random()*Mn.length)];Hn(e,a)}function aa(){const e=d("#ag-letter-overlay");e&&(e.hidden=!0)}let na=null;function Is(){if(!na)try{na=new(window.AudioContext||window.webkitAudioContext)}catch{}return na}function Ms(){try{return window.localStorage.getItem(Yo)!=="off"}catch{return!0}}function W(e,t,a,n,r=.15,o="sine"){const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type=o,i.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(r,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),i.start(l),i.stop(l+n+.05)}function wt(e){if(!Ms())return;const t=Is();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":W(t,280,0,.18,.08,"sine"),W(t,210,.12,.22,.06,"sine");break;case"cursed":W(t,220,0,.12,.1,"triangle"),W(t,170,.09,.28,.07,"triangle");break;case"uncommon":W(t,523,0,.14,.14,"sine"),W(t,784,.1,.22,.12,"sine");break;case"rare":W(t,523,0,.12,.14,"sine"),W(t,659,.09,.12,.14,"sine"),W(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>W(t,a,n*.09,.18,.13,"sine")),W(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>W(t,a,n*.08,.16,.13,"sine")),W(t,2093,.45,.5,.05,"sine");break;default:W(t,523,0,.12,.13,"sine"),W(t,659,.09,.18,.1,"sine");break}}function ra(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=_(((e=p.theme)==null?void 0:e.timezone)||"UTC"),a=D(),r=q().some(o=>o.token===a&&o.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}const Rn="affektions-gacha:motion:v1",$s=22,Bs=1500;let oa=null,ia=null,sa=!1,Wn=0;function Gn(){try{return window.localStorage.getItem(Rn)||""}catch{return""}}function Ds(e){try{window.localStorage.setItem(Rn,e)}catch{}}function Ns(e){const t=e.accelerationIncludingGravity;if(!t||t.x===null||Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z)<$s)return;const n=Date.now();n-Wn<Bs||(Wn=n,oa&&oa())}function Ps(e){if(!ia||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));ia(t,a)}function la(){sa||(sa=!0,window.addEventListener("devicemotion",Ns,{passive:!0}),window.addEventListener("deviceorientation",Ps,{passive:!0}),z&&z.classList.add("has-tilt"))}async function _s(){const e=window.DeviceMotionEvent;if(!(e&&typeof e.requestPermission=="function")){la();return}if(Gn()!=="denied")try{const a=await e.requestPermission(),n=window.DeviceOrientationEvent;if(n&&typeof n.requestPermission=="function")try{await n.requestPermission()}catch{}Ds(a==="granted"?"granted":"denied"),a==="granted"&&la()}catch{}}function qs({onShake:e,onTilt:t}={}){if(oa=e||null,ia=t||null,typeof window>"u")return;const a=window.DeviceMotionEvent;if(!a)return;if(typeof a.requestPermission!="function"){la();return}const n=()=>{_s().then(()=>{(sa||Gn()==="denied")&&document.removeEventListener("pointerdown",n)})};document.addEventListener("pointerdown",n)}const Us=["So","Mo","Di","Mi","Do","Fr","Sa"];function js(e){try{const t=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:e||"UTC"}).format(new Date);return Us[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(t)]||null}catch{return null}}function Os(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function Kn(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const o=Os(n,t),i=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${N(n.when)}</span>`:"";return`
      <li class="ag-skin-step${o?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${N(n.name||"")}${i}</span>
          ${n.note?`<span class="ag-skin-note">${N(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${N(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function Hs(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=p.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=js(p.theme&&p.theme.timezone);e.innerHTML=Kn(t.morning,a)+Kn(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${N(t.footer)}</p>`:"")}function Yn(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,Hs(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),A(10))}function Fs(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}function Rs(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function da(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function Ws(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${da(r)}× ${n}`}return null}function Gs(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const o=Number(r&&r.elevation);!Number.isFinite(o)||o<=0||(!a||o>a.h)&&(a={h:o,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${da(n)}× euer höchster Gipfel (${a.name})`:`≈ ${da(n)}× euer höchster Gipfel`}function Ks(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,o]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+o+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function Ys(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const o=r.indexOf("?"),i=o===-1?r:r.slice(0,o),s=o===-1?"":r.slice(o+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),i+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),o=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${o}`)}const n=Ks(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function ca(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Js(e){const t=it();t.unshift(e),st(t),ae("gipfelbuch"),ca("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function Vs(e){st(it().filter(t=>t.id!==e)),ae("gipfelbuch"),ca("gipfel-delete",{id:e})}function Zs(e,t){const a=it(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,st(a),ae("gipfelbuch"),ca("gipfel-upsert",r)}function Qs(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?ti(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?Ys(e.activityUrl):null,o=e.cover?`<div class="ag-gipfel-cover"><img src="${N(e.cover)}" alt="${N(e.name||"")}" loading="lazy" decoding="async"></div>`:"",i=e.elevGain||e.elevation,s=e.distance?`${N(e.distance)} km`:"",l=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${N(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||l?`<div class="ag-gipfel-stats">${s}${s&&l?" ":""}${l}</div>`:"";t.innerHTML=`
    ${o}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Zo(e.date)}</div>
        <div class="ag-gipfel-name">${N(e.name||"—")}</div>
      </div>
      ${i?`<div class="ag-gipfel-elev">↑ ${qt(i)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${N(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${N(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${N(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const g=t.querySelector("[data-ag-gipfel-edit]");g&&g.addEventListener("click",()=>{var H;const b=d("[data-ag-berge-form]"),v=d("[data-ag-berge-add]");if(!b)return;const w=d("[data-ag-berge-edit-id]");w&&(w.value=e.id);const E=d("[data-ag-berge-name]");E&&(E.value=e.name||"");const y=d("[data-ag-berge-dist]");y&&(y.value=e.distance||"");const x=d("[data-ag-berge-gain]");x&&(x.value=e.elevGain||e.elevation||"");const k=d("[data-ag-berge-date]");k&&(k.value=e.date||"");const I=d("[data-ag-berge-url]");I&&(I.value=e.activityUrl||"");const C=d("[data-ag-berge-cover]");C&&(C.value=e.cover||"");const $=d("[data-ag-berge-notes]");$&&($.value=e.notes||"");const G=d("[data-ag-berge-lat]");G&&(G.value=e.lat||"");const O=d("[data-ag-berge-lng]");O&&(O.value=e.lng||"");const se=d("[data-ag-berge-loc-label]");se&&(se.value=e.locLabel||"");const le=d("[data-ag-loc-search]");le&&(le.value=e.locLabel||"");const X=d("[data-ag-berge-form-title]");X&&(X.textContent="Eintrag bearbeiten");const pe=d("[data-ag-berge-save] span:last-child");pe&&(pe.textContent="Speichern"),b.hidden=!1,v&&(v.hidden=!0),(H=d("[data-ag-sheet-backdrop]"))==null||H.classList.add("is-open"),b.scrollIntoView({behavior:"smooth",block:"nearest"}),E&&E.focus(),A(8)});const u=t.querySelector("[data-ag-gipfel-delete]");u&&u.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(Vs(e.id),He(),A(8),Promise.resolve().then(()=>vl).then(b=>b.showToast("Eintrag gelöscht")).catch(()=>{}))});const f=t.querySelector("[data-ag-map-komoot]");f&&f.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,f.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,f.textContent="Karte schließen",A(4)}});const h=t.querySelector("[data-ag-map-alltrails]");return h&&r&&h.addEventListener("click",()=>{const b=t.querySelector("[data-ag-map-wrap-alltrails]");if(b){if(!b.hidden){b.hidden=!0,h.textContent="🗺 AllTrails-Karte";return}b.innerHTML=`<iframe src="${N(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,h.textContent="Karte schließen",A(4)}}),t}function He({loading:e=!1}={}){const t=d("[data-ag-berge-list]"),a=d("[data-ag-berge-empty]"),n=d("[data-ag-berge-total]"),r=d("[data-ag-berge-analogy]"),o=d("[data-ag-berge-total-dist]"),i=d("[data-ag-berge-dist-analogy]"),s=d("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=it().sort((u,f)=>{const h=u.date||"",b=f.date||"";return b<h?-1:b>h?1:0});t.innerHTML="";const c=l.reduce((u,f)=>u+(Number(f.elevGain)||Number(f.elevation)||0),0);if(n&&(n.textContent=c>0?qt(c):"— m"),r){const u=Rs(c);u?(r.textContent=u,r.hidden=!1):r.hidden=!0}const g=l.reduce((u,f)=>{const h=Number(f.distance);return u+(Number.isFinite(h)&&h>0?h:0)},0);if(o&&(o.textContent=g>0?`${Qo(g)} km`:"— km"),i){const u=Ws(g);u?(i.textContent=u,i.hidden=!1):i.hidden=!0}if(s){const u=Gs(c,l);u?(s.textContent=u,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),Jn([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(u=>t.appendChild(Qs(u))),Jn(l)}function Xs(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const o=e.querySelector("[data-ag-berge-lat]"),i=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");o&&(o.value=""),i&&(i.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const o=t.value.trim();if(!o){r();return}n=setTimeout(async()=>{try{const i=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(o)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(i,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(c=>{const g=document.createElement("button");g.type="button",g.className="ag-location-result",g.textContent=c.display_name,g.addEventListener("click",()=>{const u=e.querySelector("[data-ag-berge-lat]"),f=e.querySelector("[data-ag-berge-lng]"),h=e.querySelector("[data-ag-berge-loc-label]");u&&(u.value=c.lat),f&&(f.value=c.lon),h&&(h.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(g)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!a.contains(o.target)&&(a.hidden=!0)})}function el(){Xs(z)}let oe=null,xt=null;function ga(){oe&&setTimeout(()=>oe.invalidateSize(),150)}async function tl(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function Jn(e){const t=d("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await tl()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const o=[[45.8,5.9],[47.8,10.5]],i=[[35,-11],[71,32]];if(!oe){oe=n.map(r).fitBounds(o),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(oe);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(g=>g.classList.remove("is-active")),l.classList.add("is-active");const c=l.dataset.mapView==="eu"?i:o;oe.fitBounds(c)})})}xt?xt.clearLayers():xt=n.layerGroup().addTo(oe),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const g=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${N(s.name||"—")}</div>
      ${g?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${qt(g)}</div>`:""}
    `;const u=document.createElement("button");u.type="button",u.textContent="Zum Eintrag",u.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",u.addEventListener("click",()=>{l.closePopup();const f=z.querySelector(`[data-ag-gipfel-id="${s.id}"]`);f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("ag-gipfel-highlight"),setTimeout(()=>f.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(u),l.bindPopup(c),xt.addLayer(l)}),requestAnimationFrame(()=>{oe&&oe.invalidateSize()}),setTimeout(()=>{oe&&oe.invalidateSize()},250)}const Vn=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function Zn(e){return Vn[Math.min(e-1,Vn.length-1)]}function Ae(e,t){return e+Math.random()*(t-e)}function Qn(){const e=d("#ag-baerlauch-level");e&&(e.textContent=`Level ${p.baerlauch.level}`)}function Fe(){p.baerlauch.timerId&&(clearInterval(p.baerlauch.timerId),p.baerlauch.timerId=null)}function Xn(e){const t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");i&&(i.hidden=!0),Fe(),p.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),o&&(o.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),er(K(),p.baerlauch.level,!1),ua()}function al(){const e=d("#ag-baerlauch-success"),t=d("#ag-baerlauch-reward"),a=d("#ag-baerlauch-photo"),n=d("#ag-baerlauch-text"),r=d("#ag-baerlauch-actions"),o=d("#ag-baerlauch-next");Fe(),p.baerlauch.level+=1;const i=ol(K(),p.baerlauch.level);if(er(K(),p.baerlauch.level,!0),ua(),Qn(),i&&re(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&p.photos&&p.photos.length){const s=Oe(),l=s.length?s[Math.floor(Math.random()*s.length)]:null;yr(a,l),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}o&&(o.textContent=`Level ${p.baerlauch.level} starten`),r&&(r.hidden=!1)}function nl(e){const t=d("#ag-baerlauch-timer"),a=d("#ag-baerlauch-darkness"),r=Zn(p.baerlauch.level).timeMs;p.baerlauch.durationMs=r,p.baerlauch.startedAt=performance.now(),Fe(),p.baerlauch.timerId=setInterval(()=>{const o=performance.now()-p.baerlauch.startedAt,i=Math.max(0,r-o),s=Math.min(1,o/r);t&&(t.textContent=(i/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);l.forEach(g=>{g.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,g.style.opacity=String(1-c*.28)}),i<=0&&(Fe(),e())},50)}function pa(){const e=d("#ag-baerlauch-panel"),t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),o=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!o)return;if(e.hidden=!1,ua(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),p.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",o.textContent="",i&&(i.hidden=!0),Qn();const s=Zn(p.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],g=[...l.slice(0,s.good).map(h=>({emoji:h,good:!0})),...c.slice(0,s.bad).map(h=>({emoji:h,good:!1}))];let u=0;const f=g.filter(h=>h.good).length;g.forEach(h=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=h.emoji,b.dataset.good=h.good?"true":"false",b.style.left=`${Ae(8,82)}%`,b.style.top=`${Ae(10,72)}%`,b.style.setProperty("--dx",`${Ae(-320,320)}px`),b.style.setProperty("--dy",`${Ae(-220,220)}px`),b.style.setProperty("--dur",`${Ae(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${Ae(-1.8,0)}s`),b.addEventListener("click",()=>{p.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,u+=1,setTimeout(()=>b.remove(),140),u===f&&al()):Xn("poison"))}),t.appendChild(b)}),nl(()=>Xn("timeout"))}function rl(){const e=d("#ag-baerlauch-panel");Fe(),e&&(e.hidden=!0)}function ol(e,t){var r;const a=Wt(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const o=(r=p.backup)==null?void 0:r.endpointUrl;o&&fetch(o,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function er(e,t,a){var i;const n=rn(),r=((i=p.theme)==null?void 0:i.timezone)||"UTC",o=_(r);n.unshift({date:o,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function ua(){var u;const e=d("#ag-baerlauch-scores");if(!e)return;const a=K()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",r=Wt(),o=rn(),i=a==="fionn"?"lennart":"fionn",s=a in r||i in r;if(!s&&!o.length){e.hidden=!0;return}e.hidden=!1;const l=((u=p.theme)==null?void 0:u.timezone)||"UTC",c=f=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:l}).format(new Date(f+"T12:00:00Z"))}catch{return f}};let g="";if(s){const f=r[a]??0,h=r[i]??0;g+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${f||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${h||"—"}</span></div>
    </div>`}if(o.length){const f=o.slice(0,8).map(h=>{const b=h.player===a,v=b?"ag-score-mine":"ag-score-theirs",w=b?"Du":n,E=h.won?`✓ Level ${h.level}`:`✗ Level ${h.level-1>=1?h.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(h.date)}</span><span class="ag-score-pill ${v}">${w}</span><span class="ag-score-result">${E}</span></div>`}).join("");g+=`<div class="ag-score-table">${f}</div>`}e.innerHTML=g}const B={recorder:null,audioBlob:null,lang:"swabian"};function kt(){try{return JSON.parse(window.localStorage.getItem(Ja)||"[]")||[]}catch{return[]}}function St(e){try{window.localStorage.setItem(Ja,JSON.stringify(e))}catch{}}function il(e){const t=kt();t.unshift(e),St(t),ae("glossary"),ma("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function sl(e,t){const a=kt(),n=a.findIndex(o=>o.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,St(a),ae("glossary"),ma("glossary-upsert",r)}function ll(e){St(kt().filter(t=>t.id!==e)),ae("glossary"),ma("glossary-delete",{id:e})}let Et=!1;async function tr(){const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=D(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let o;try{o=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!o.ok)return 0;const i=await o.json();return!i.ok||!Array.isArray(i.glossary)?0:(pt("glossary")||St(i.glossary.filter(s=>s.id)),i.glossary.length)}catch{return 0}}function ma(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:D(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function fa(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function dl(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return fa(e);try{const n=await fa(e),r=n.split(",")[1],o=e.type||"audio/webm",i=JSON.stringify({type:"glossary-audio",token:D(),filename:`glossary-${t}.webm`,mimeType:o,data:r}),l=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i})).json();return l.ok&&l.url?l.url:n}catch{return fa(e)}}const cl={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function gl(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${N(cl[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${N(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${N(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${N(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${N(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${N(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),A(6)});const o=a.querySelector("[data-ag-glossary-edit]");o&&o.addEventListener("click",()=>{var f;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const g=document.getElementById("ag-glossary-save-label");g&&(g.textContent="Speichern");const u=document.getElementById("ag-glossary-audio-status");u&&(u.textContent=e.audioUrl?"Aufnahme vorhanden":""),B.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(f=document.getElementById("ag-glossary-word-input"))==null||f.focus(),A(8)});const i=a.querySelector("[data-ag-glossary-del]");return i&&i.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(ll(e.id),xe(B.lang),A(8))}),a}function xe(e){var i;B.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===B.lang)}),ar();const n=(((i=document.getElementById("ag-glossary-search"))==null?void 0:i.value)||"").trim().toLowerCase(),r=kt(),o=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===B.lang);if(t.innerHTML="",!o.length){a&&(a.textContent=n?"Kein Treffer.":Et?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",Et&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),o.forEach(s=>t.appendChild(gl(s,!!n)))}function ar(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function nr(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),B.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),Et=!0,xe("swabian"),window.requestAnimationFrame(()=>ar()),A(10),tr().catch(()=>0).then(()=>{Et=!1,xe(B.lang)})}function pl(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null}const rr=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],or=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function ir(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(Se)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(Se,"granted")}catch{}await ba();return}if(e==="denied"){try{window.localStorage.setItem(Se,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function ul(){var s;const e=((s=p.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,o=8*60,i=r<o?o-r:24*60-r+o;return Date.now()+i*60*1e3}async function ha(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=D(),r=_(a);if(q().some(u=>u.token===n&&u.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:i,m:s}=Ze(a);if(i>=21)return;const l=((21-i)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=We(),g=or[Qa(or)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:g.title.replace("{name}",c),body:g.body.replace("{name}",c)})}catch{}}async function ml(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=We(),o=rr[Qa(rr)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:ul(),title:o.title.replace("{name}",r),body:o.body.replace("{name}",r)}),(t=p.quest)!=null&&t.enabled&&Un()){const i=De(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!i.solved&&s!==Xe(p)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Xe(p)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:p.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:p.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function fl(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function ba(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",ea()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await ml(),await ha(),await fl(),await yl())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function hl(){const e=d("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Se,"dismissed")}catch{}return}try{window.localStorage.setItem(Se,"granted")}catch{}await ba()}function bl(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);return r}async function yl(){const e=p.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:bl(e.vapidPublicKey)}));const n=p.backup&&p.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:D(),subscription:a.toJSON()}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,o).catch(()=>fetch(n,{...o,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}function Re(e){p.activeTab=e,z.querySelectorAll("[data-ag-tab]").forEach(i=>{const s=i.dataset.agTab===e;i.classList.toggle("is-active",s),i.setAttribute("aria-selected",s?"true":"false")});const a=54,n=z.querySelector(".ag-bottomnav-btn.is-active"),r=z.querySelector(".ag-nav-pill");if(r&&n){const i=n.closest(".ag-bottomnav"),s=i?i.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const g=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${g-a/2}px`}}d("[data-ag-panel-today]").hidden=e!=="today",d("[data-ag-panel-history]").hidden=e!=="history",d("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",d("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&Q(),e==="lieblinge"&&It(),e==="berge"&&(ga(),He({loading:!0}),ga(),je().catch(()=>{}).then(()=>{He(),ga()}));const o=d("[data-ag-fab]");o&&(o.hidden=e!=="berge")}function sr(){const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=d("[data-ag-ping-send]"),a=d("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:D(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,r).then(o=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...r,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function ze(e,t){const a=d("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function lr(){const e=p.wishInbox,t=d("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:D(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){ze("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){ze("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),ze("Stups wird gesendet…","pending");const o=JSON.stringify(n),i=()=>{ze("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{ze("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l=>{l&&l.ok?i():s()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(i).catch(s)}catch{s()}})}function dr(e){const t=D();if(t==="fionn")return;const a=p.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const o=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,i={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:o,message:o,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(i),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function ya(e){const t=p.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:D(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),o=i=>{const s=Ht();!s||s.week!==e.week||(nn({...s,remoteStatus:i,remoteUpdatedAt:Date.now()}),Aa())};o("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(i=>{i&&i.ok?o("sent"):o("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>o("sent")).catch(()=>o("failed"))}catch{o("failed")}})}function cr(){const e=Ht();!e||e.week!==Ut()||e.remoteStatus!=="sent"&&ya(e)}function va(e,t,a,n,r,o){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,o);else{const i=Array.isArray(o)?o:[o,o,o,o],[s,l,c,g]=i.map(u=>Math.min(u,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+g,a+r),e.quadraticCurveTo(t,a+r,t,a+r-g),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function Tt(e,t,a){const n=t.split(" "),r=[];let o="";for(const i of n){const s=o?`${o} ${i}`:i;e.measureText(s).width>a&&o?(r.push(o),o=i):o=s}return o&&r.push(o),r}function gr(e){var I,C;const r=document.createElement("canvas"),o=Math.min(window.devicePixelRatio||1,2);r.width=640*o,r.height=340*o,r.style.width="640px",r.style.height="340px";const i=r.getContext("2d");i.scale(o,o);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",g=i.createLinearGradient(0,0,0,340);g.addColorStop(0,l),g.addColorStop(1,c),i.fillStyle=g,va(i,0,0,640,340,20),i.fill();const u=s?"#b9782e":"#2f7a4f";i.fillStyle=u,va(i,0,0,640,5,[20,20,0,0]),i.fill();const f=e.category.label,h=Ln(e.category.tone);i.font="bold 13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle=s?"#d4a24c":"#5aba7e",i.fillText(`${h} ${f}`,40,62);const b=e.day;i.font="13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.45)";const v=i.measureText(b).width;i.fillText(b,600-v,62),i.strokeStyle="rgba(255,255,255,0.1)",i.lineWidth=1,i.beginPath(),i.moveTo(40,76),i.lineTo(600,76),i.stroke(),i.font="bold 24px Boska, Georgia, serif",i.fillStyle="#ffffff";const w=Tt(i,e.outcome.title,640-40*2);let E=108;for(const $ of w)i.fillText($,40,E),E+=32;i.font="15px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.72)";const y=Tt(i,e.outcome.message,640-40*2);E+=4;for(const $ of y){if(E>270)break;i.fillText($,40,E),E+=22}i.font="11px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.25)";const x=((C=(I=p.theme)==null?void 0:I.brand)==null?void 0:C.machineName)||"Affektions-Gacha";i.fillText(x,40,324);const k=document.createElement("a");k.download=`gacha-${e.category.id}-${e.day}.png`,k.href=r.toDataURL("image/png"),k.click()}async function pr(e){var E,y;const r=document.createElement("canvas");r.width=1170,r.height=2532;const o=r.getContext("2d"),i=new Image;i.crossOrigin="anonymous";try{await new Promise((x,k)=>{i.onload=x,i.onerror=k,i.src=e.photo.url})}catch{F("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/i.naturalWidth,2532/i.naturalHeight),l=i.naturalWidth*s,c=i.naturalHeight*s;o.drawImage(i,(1170-l)/2,(2532-c)/2,l,c);const g=o.createLinearGradient(0,2532*.62,0,2532);g.addColorStop(0,"rgba(8,20,14,0)"),g.addColorStop(1,"rgba(8,20,14,.82)"),o.fillStyle=g,o.fillRect(0,2532*.62,1170,2532*.38);const u=e.photo.caption||e.photo.alt||"";o.font="500 56px Boska, Georgia, serif",o.fillStyle="#fffdf2";const f=Tt(o,u,1170-96*2).slice(0,3);let h=2276-(f.length-1)*68;for(const x of f)o.fillText(x,96,h),h+=68;o.font="500 34px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,.62)",o.fillText(e.day,96,2356),o.fillStyle="rgba(255,255,255,.35)",o.font="28px Satoshi, Inter, system-ui, sans-serif",o.fillText(((y=(E=p.theme)==null?void 0:E.brand)==null?void 0:y.machineName)||"Affektions-Gacha",96,2406);let b;try{b=await new Promise((x,k)=>r.toBlob(I=>I?x(I):k(new Error("blob")),"image/jpeg",.92))}catch{F("Dieses Foto lässt sich nicht exportieren (CORS).");return}const v=new File([b],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[v]}))try{await navigator.share({files:[v],title:u});return}catch{return}const w=document.createElement("a");w.download=v.name,w.href=URL.createObjectURL(b),w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),4e3)}function wa(e){z.style.opacity="1",z.style.background="#0a1410",z.style.minHeight="100vh",z.style.display="flex",z.style.alignItems="center",z.style.justifyContent="center",z.style.padding="24px",z.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${N(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function Ct(){p.todaysPull||(p.todaysPull=ts());const e=d("[data-ag-draw]"),t=d("[data-ag-button-text]"),a=p.theme.loadingSteps||["Maschine rattert"];let n=0;z.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((p.theme.revealDelayMs||3200)/a.length))),o=p.theme.revealDelayMs||3200,i=Array.from((d("[data-ag-emoji-orbit]")||{children:[]}).children),s=i.map(u=>parseFloat(u.style.getPropertyValue("--ag-emoji-duration"))||20),l=performance.now();let c;function g(u){const f=Math.min((u-l)/o,1),h=1+5*f*f;i.forEach((b,v)=>{b.style.setProperty("--ag-emoji-duration",`${(s[v]/h).toFixed(3)}s`)}),f<1&&(c=requestAnimationFrame(g))}c=requestAnimationFrame(g),window.setTimeout(()=>{var v,w,E,y;window.clearInterval(r),cancelAnimationFrame(c),i.forEach((x,k)=>{x.style.setProperty("--ag-emoji-duration",`${s[k].toFixed(2)}s`)});const u=q().some(x=>x.day===p.todaysPull.day&&x.token===p.todaysPull.token);p.todaysPull.collectToken&&!u&&en(p.todaysPull.collectToken),p.todaysPull.freikarte&&!u&&an(p.todaysPull.token),Ie(p.todaysPull),z.classList.remove("is-revealing"),z.classList.add("is-revealed"),z.classList.add("has-drawn"),e.disabled=!1,t.textContent=p.theme.brand.buttonShown,p.revealed=!0,te()||jl(p.todaysPull),ra(),ha();const f=be();Ge(),Ll(f);const h=(w=(v=p.todaysPull)==null?void 0:v.category)==null?void 0:w.id,b=(y=(E=p.todaysPull)==null?void 0:E.category)==null?void 0:y.tone;if(h==="special"){const x=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];re(130,x),setTimeout(()=>re(90,x),700),wt("special")}else if(b==="jackpot"){const x=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];re(120,x),setTimeout(()=>re(80,x),650),wt("jackpot")}else b==="rare"?(re(70),wt("rare")):wt(b||"common");te()||Promise.resolve().then(()=>ud).then(x=>x.flashLightsForPull(h==="special"?"special":b)).catch(()=>{}),fr[f]?A([30,20,30,20,60]):Oi(h==="special"?"special":b),p.activeTab==="history"&&Q(),ir()},p.theme.revealDelayMs||3200)}function ur(){var Nr,Pr,_r,qr,Ur,jr,Or,Hr,Fr,Rr,Wr,Gr,Kr,Yr,Jr,Vr,Zr,Qr,Xr,eo,to,ao,no,ro,oo,io,so,lo,co,go,po,uo,mo,fo,ho,bo,yo,vo,wo,xo,ko,So,Eo,To,Co,Lo,Ao,zo,Io;let e=null;const t=d("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(Fn,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;d("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,Fn();return}n=setTimeout(()=>{a=0},1800)}),d("[data-ag-draw]").addEventListener("click",()=>{A(12),Ct()}),qs({onShake:()=>{z.classList.contains("has-drawn")||z.classList.contains("is-revealing")||te()||(A(12),Ct())},onTilt:(m,S)=>{z.style.setProperty("--ag-foil-x",m.toFixed(1)+"%"),z.style.setProperty("--ag-foil-y",S.toFixed(1)+"%")}}),(Nr=d("#ag-btn-rave"))==null||Nr.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Pr=d("#ag-btn-rave"))==null||Pr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(_r=d("#ag-btn-baerlauch"))==null||_r.addEventListener("click",pa),(qr=d("#ag-baerlauch-close"))==null||qr.addEventListener("click",rl),(Ur=d("#ag-baerlauch-next"))==null||Ur.addEventListener("click",pa),(jr=d("#ag-btn-baerlauch"))==null||jr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),pa())}),(Or=d("#ag-btn-gesprach"))==null||Or.addEventListener("click",_n),(Hr=d("#ag-btn-glossary"))==null||Hr.addEventListener("click",nr),(Fr=d("#ag-btn-glossary"))==null||Fr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),nr())}),(Rr=d("#ag-glossary-close"))==null||Rr.addEventListener("click",pl),(Wr=document.getElementById("ag-glossary-refresh"))==null||Wr.addEventListener("click",async()=>{const m=document.getElementById("ag-glossary-refresh");m&&(m.disabled=!0,m.textContent="⏳"),A(6);const S=await tr();xe(B.lang),m&&(m.textContent=S>0?`↻${S}`:"↻",setTimeout(()=>{m.textContent="↻",m.disabled=!1},3e3)),S>0&&F(`${S} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(m=>{m.addEventListener("click",()=>{const S=document.getElementById("ag-glossary-search");S&&(S.value=""),xe(m.dataset.lang),A(4)})}),(Gr=document.getElementById("ag-glossary-search"))==null||Gr.addEventListener("input",()=>{xe(B.lang)});const r=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var M,P;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const m=document.getElementById("ag-glossary-form-title");m&&(m.textContent="Neues Wort");const S=document.getElementById("ag-glossary-save-label");S&&(S.textContent="Eintragen");const T=document.getElementById("ag-glossary-audio-status");T&&(T.textContent=""),B.audioBlob=null;const L=document.getElementById("ag-glossary-play-preview");L&&(L.hidden=!0),o.hidden=!1,r.hidden=!0,(M=d("[data-ag-sheet-backdrop]"))==null||M.classList.add("is-open"),(P=document.getElementById("ag-glossary-word-input"))==null||P.focus(),A(8)}),(Kr=document.getElementById("ag-glossary-form-cancel"))==null||Kr.addEventListener("click",()=>{var m;if(o&&(o.hidden=!0),r&&(r.hidden=!1),(m=d("[data-ag-sheet-backdrop]"))==null||m.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null,A(6)}),(Yr=document.getElementById("ag-glossary-form-save"))==null||Yr.addEventListener("click",async()=>{var P,U,Y,ee,ue;const m=(((P=document.getElementById("ag-glossary-word-input"))==null?void 0:P.value)||"").trim(),S=(((U=document.getElementById("ag-glossary-meaning-input"))==null?void 0:U.value)||"").trim(),T=(((Y=document.getElementById("ag-glossary-edit-id"))==null?void 0:Y.value)||"").trim();if(!m){(ee=document.getElementById("ag-glossary-word-input"))==null||ee.focus();return}const L=document.getElementById("ag-glossary-audio-status");let M=null;if(B.audioBlob){L&&(L.textContent="Wird hochgeladen…");const R=T||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;M=await dl(B.audioBlob,R)}if(A([20,20,40]),T){const R={word:m,meaning:S||null};M!==null&&(R.audioUrl=M),sl(T,R)}else il({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:B.lang,word:m,meaning:S||null,audioUrl:M,token:D()});o&&(o.hidden=!0),r&&(r.hidden=!1),(ue=d("[data-ag-sheet-backdrop]"))==null||ue.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder=null,xe(B.lang),F("Wort gespeichert ✓")});const i=document.getElementById("ag-glossary-record");i&&i.addEventListener("click",async()=>{if(B.recorder&&B.recorder.state==="recording"){B.recorder.stop();return}try{const m=await navigator.mediaDevices.getUserMedia({audio:!0}),S=[];B.recorder=new MediaRecorder(m),B.recorder.ondataavailable=L=>{L.data.size>0&&S.push(L.data)},B.recorder.onstop=()=>{m.getTracks().forEach(P=>P.stop()),B.audioBlob=new Blob(S,{type:B.recorder.mimeType||"audio/webm"});const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="✓ Aufnahme bereit");const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!1),i.textContent="🎙 Neu aufnehmen"},B.recorder.start(),i.textContent="⏹ Stop";const T=document.getElementById("ag-glossary-audio-status");T&&(T.textContent="● REC"),A(10)}catch{const S=document.getElementById("ag-glossary-audio-status");S&&(S.textContent="Mikrofon nicht verfügbar")}}),(Jr=document.getElementById("ag-glossary-play-preview"))==null||Jr.addEventListener("click",()=>{if(!B.audioBlob)return;const m=URL.createObjectURL(B.audioBlob),S=new Audio(m);S.onended=()=>URL.revokeObjectURL(m),S.play().catch(()=>{})}),(Vr=d("#ag-btn-mission"))==null||Vr.addEventListener("click",Pn),(Zr=d("#ag-btn-mission"))==null||Zr.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),Pn())}),(Qr=d("#ag-mission-close"))==null||Qr.addEventListener("click",ws),(Xr=d("#ag-mission-done"))==null||Xr.addEventListener("click",()=>{ms();const m=d("#ag-mission-actions"),S=d("#ag-mission-feedback"),T=d("#ag-mission-done-note"),L=d("#ag-btn-mission");m&&(m.hidden=!0),T&&(T.hidden=!1),S&&!Nn()&&(S.hidden=!1),L&&L.classList.remove("ag-chip-mission-active")}),(eo=d("#ag-mission-panel"))==null||eo.querySelectorAll(".ag-mission-rate-btn").forEach(m=>{m.addEventListener("click",()=>{var S;(S=d("#ag-mission-panel"))==null||S.querySelectorAll(".ag-mission-rate-btn").forEach(T=>T.classList.remove("is-selected")),m.classList.add("is-selected")})}),(to=d("#ag-mission-feedback-send"))==null||to.addEventListener("click",()=>{var P;const m=d("#ag-mission-panel"),S=m==null?void 0:m.querySelector(".ag-mission-rate-btn.is-selected"),T=(S==null?void 0:S.dataset.rating)||null,L=(((P=d("#ag-mission-comment"))==null?void 0:P.value)||"").trim();hs(T,L);const M=d("#ag-mission-feedback-sent");m==null||m.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(U=>{U.hidden=!0}),M&&(M.hidden=!1)}),(ao=d("#ag-letter-close"))==null||ao.addEventListener("click",aa),(no=d("#ag-letter-overlay"))==null||no.addEventListener("click",m=>{m.target===m.currentTarget&&aa()}),(ro=d("#ag-lightbox-close"))==null||ro.addEventListener("click",()=>{Ea()}),(oo=d("#ag-lightbox"))==null||oo.addEventListener("click",m=>{m.target===m.currentTarget&&Ea()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&(aa(),Ea())}),(io=d("#ag-gesprach-close"))==null||io.addEventListener("click",xs),(so=d("#ag-gesprach-next"))==null||so.addEventListener("click",qn),(lo=d("#ag-gesprach-wa"))==null||lo.addEventListener("click",ks),(co=d("#ag-btn-gesprach"))==null||co.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),_n())}),(go=d("#ag-btn-quest"))==null||go.addEventListener("click",jn),(po=d("#ag-quest-close"))==null||po.addEventListener("click",Ss),(uo=d("#ag-btn-quest"))==null||uo.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),jn())}),(mo=d("#ag-quest-file"))==null||mo.addEventListener("change",m=>{const S=m.target.files&&m.target.files[0];S&&Es(S)}),d("[data-ag-copy]").addEventListener("click",async()=>{if(!p.todaysPull)return;A(8);const m=vr(p.todaysPull);try{await navigator.clipboard.writeText(m),d("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{d("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",m)}}),d("[data-ag-save-img]").addEventListener("click",()=>{p.todaysPull&&(A(8),gr(p.todaysPull))}),d("[data-ag-star]").addEventListener("click",()=>{A(8),Ul(p.todaysPull)}),(fo=d("[data-ag-wallpaper]"))==null||fo.addEventListener("click",()=>{!p.todaysPull||!p.todaysPull.photo||(A(8),pr(p.todaysPull))}),(ho=d("[data-ag-ferien-add]"))==null||ho.addEventListener("click",()=>{var L,M;const m=(((L=d("[data-ag-ferien-from]"))==null?void 0:L.value)||"").trim(),S=(((M=d("[data-ag-ferien-to]"))==null?void 0:M.value)||m).trim();if(!m){F("Erst ein Datum wählen");return}if(!Ci(m,S)){F("Höchstens 60 Tage am Stück");return}F("🏖️ Eingetragen — der Streak wartet"),A([12,20,12]),La(),Ge()});const s=d("[data-capsule]");if(s){let S=null,T=null,L=!1,M=0;const P=()=>!z.classList.contains("has-drawn")&&!z.classList.contains("is-revealing")&&!te(),U=()=>{clearTimeout(S),clearInterval(T),S=T=null,M=0,z.classList.remove("is-charging","is-charged")};s.addEventListener("pointerdown",ee=>{P()&&(ee.preventDefault(),L=!1,z.classList.add("is-charging"),T=setInterval(()=>{M++,A(6+M*2)},130),S=setTimeout(()=>{L=!0,z.classList.add("is-charged"),A([20,30,40])},650))});const Y=()=>{const ee=L&&P();U(),L=!1,ee&&Ct()};s.addEventListener("pointerup",Y),s.addEventListener("pointercancel",()=>{U(),L=!1}),s.addEventListener("pointerleave",()=>{U(),L=!1})}(bo=d("[data-ag-freikarte-redeem]"))==null||bo.addEventListener("click",()=>{const m=p.todaysPull;if(!m)return;const S=m.category.tone;if(S!=="quiet"&&S!=="cursed"||!mi(m.token))return;const T=be(),L=as(m.day,T);hi(m.token,m.day,{categoryId:L.category.id,outcomeTitle:L.outcome.title}),p.todaysPull={...m,category:L.category,outcome:L.outcome,photo:L.photo,collectToken:L.collectToken,voucher:L.voucher,freikarte:L.freikarte,unlockTime:null,promptAnswer:null};const M=q(),P=M.findIndex(U=>U.day===m.day&&U.token===m.token);P!==-1&&(M[P]={...M[P],categoryId:L.category.id,categoryLabel:L.category.label,tone:L.category.tone,title:L.outcome.title,message:L.outcome.message,link:L.outcome.link||null,unlockTime:null,promptAnswer:null,photo:L.photo?{url:L.photo.url,alt:L.photo.alt||"",caption:(L.photo.caption||"").trim(),type:L.photo.type==="video"?"video":"image"}:null,voucher:L.voucher||!1},de(M)),p.todaysPull.collectToken&&en(p.todaysPull.collectToken),p.todaysPull.freikarte&&an(p.todaysPull.token),Z(),Ie(p.todaysPull),p.activeTab==="history"&&Q(),re(50),F("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),A([20,20,40])});const l=d("[data-ag-streak-restore]");l&&l.addEventListener("click",()=>{if(!gn()){ka();return}const m=Jt(),S=Yt(),L=gt()>0&&S-gt()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${m}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${m}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${S-1} Streak-Retter übrig.`;if(!window.confirm(L))return;l.disabled=!0;const P=Di();Q(),Ge(),P&&(re(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),A([30,20,30,20,60])),ka(),l.disabled=!1});const c=d("[data-ag-sync-btn]");c&&c.addEventListener("click",async()=>{c.textContent="⏳",c.disabled=!0;const m=await je();Q(),c.textContent=m<0?"✗":`✓${m}`,setTimeout(()=>{c.textContent="☁",c.disabled=!1},3e3)}),z.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(m=>{m.addEventListener("click",()=>{A(5),wl(m.dataset.agFilter)})}),z.querySelectorAll("[data-ag-tab]").forEach(m=>{m.addEventListener("click",()=>{A(6),Re(m.dataset.agTab)})});const g=z.querySelector(".ag-bottomnav");if(g){const m=g.querySelector(".ag-nav-pill"),S=[...g.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let T=null;g.addEventListener("pointerdown",M=>{const P=g.getBoundingClientRect(),U=parseFloat(m==null?void 0:m.style.width)||54;T={id:M.pointerId,startX:M.clientX-P.left,pillStartCentre:(parseFloat(m==null?void 0:m.style.left)||0)+U/2,pillWidth:U,moved:!1,suppress:!1,captured:!1}}),g.addEventListener("pointermove",M=>{if(!T||M.pointerId!==T.id)return;const P=g.getBoundingClientRect(),U=M.clientX-P.left-T.startX;if(!T.moved&&Math.abs(U)<6||(T.captured||(g.setPointerCapture(M.pointerId),T.captured=!0),T.moved=!0,T.suppress=!0,!m))return;m.style.transition="none";const Y=g.getBoundingClientRect(),ee=T.pillStartCentre+U,ue=T.pillWidth/2;let R=ee-ue;R<0?R=R*.25:R+T.pillWidth>Y.width&&(R=Y.width-T.pillWidth+(R+T.pillWidth-Y.width)*.25),m.style.left=`${R}px`});const L=M=>{if(!T||M.pointerId!==T.id)return;const P=T.moved,U=T.suppress;if(T=null,m&&(m.style.transition=""),!P)return;const Y=g.getBoundingClientRect(),ee=M.clientX-Y.left;let ue=S[0],R=1/0;if(S.forEach(ke=>{const we=ke.getBoundingClientRect(),Mt=we.left-Y.left+we.width/2,Ve=Math.abs(ee-Mt);Ve<R&&(R=Ve,ue=ke)}),A(6),Re(ue.dataset.agTab),U){const ke=we=>{we.stopImmediatePropagation(),we.preventDefault()};g.addEventListener("click",ke,{capture:!0,once:!0})}};g.addEventListener("pointerup",L),g.addEventListener("pointercancel",M=>{!T||M.pointerId!==T.id||(T=null,m&&(m.style.transition=""),Re(p.activeTab))})}z.addEventListener("ag-synced",()=>{var m;try{bt(),At(),(m=document.getElementById("ag-werkstatt-panel"))!=null&&m.hidden||Ue()}catch{}}),(yo=d("[data-ag-werkstatt-open]"))==null||yo.addEventListener("click",Gi),(vo=d("#ag-werkstatt-close"))==null||vo.addEventListener("click",Ki),(wo=document.getElementById("ag-werkstatt-add"))==null||wo.addEventListener("click",()=>Tn(null)),(xo=document.getElementById("ag-werkstatt-cancel"))==null||xo.addEventListener("click",Ce),(ko=document.getElementById("ag-werkstatt-delete"))==null||ko.addEventListener("click",Vi),(So=document.getElementById("ag-werkstatt-save"))==null||So.addEventListener("click",()=>{Zi(),bt()}),(Eo=d("#ag-btn-skincare"))==null||Eo.addEventListener("click",Yn),(To=d("#ag-btn-skincare"))==null||To.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),Yn())}),(Co=d("#ag-skincare-close"))==null||Co.addEventListener("click",Fs),(Lo=d("#ag-btn-stimmung"))==null||Lo.addEventListener("click",yn),(Ao=d("#ag-btn-stimmung"))==null||Ao.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),yn())}),(zo=d("#ag-stimmung-close"))==null||zo.addEventListener("click",Ui),ji();const u=d("[data-ag-berge-add]"),f=d("[data-ag-berge-form]"),h=d("[data-ag-berge-cancel]"),b=d("[data-ag-berge-save]");u&&u.addEventListener("click",()=>{var S,T;A(8);const m=d("[data-ag-berge-date]");m&&!m.value&&(m.value=_(((S=p.theme)==null?void 0:S.timezone)||"Europe/Zurich")),f.hidden=!1,u.hidden=!0,(T=d("[data-ag-sheet-backdrop]"))==null||T.classList.add("is-open"),d("[data-ag-berge-name]").focus()}),h&&h.addEventListener("click",()=>{var M;A(6),f.hidden=!0,u.hidden=!1,(M=d("[data-ag-sheet-backdrop]"))==null||M.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(P=>{const U=d(P);U&&(U.value="")});const m=d("[data-ag-loc-search]");m&&(m.value="");const S=d("[data-ag-loc-dropdown]");S&&(S.hidden=!0,S.innerHTML="");const T=d("[data-ag-berge-form-title]");T&&(T.textContent="Neuer Gipfeleintrag");const L=d("[data-ag-berge-save] span:last-child");L&&(L.textContent="Eintragen")}),b&&b.addEventListener("click",()=>{var Mo,$o,Bo,Do,No,Po,_o,qo,Uo,jo,Oo,Ho,Fo,Ro;const m=(((Mo=d("[data-ag-berge-name]"))==null?void 0:Mo.value)||"").trim(),S=parseFloat((($o=d("[data-ag-berge-dist]"))==null?void 0:$o.value)||""),T=parseInt(((Bo=d("[data-ag-berge-gain]"))==null?void 0:Bo.value)||"",10),L=((Do=d("[data-ag-berge-date]"))==null?void 0:Do.value)||_(((No=p.theme)==null?void 0:No.timezone)||"Europe/Zurich"),M=(((Po=d("[data-ag-berge-url]"))==null?void 0:Po.value)||"").trim(),P=(((_o=d("[data-ag-berge-cover]"))==null?void 0:_o.value)||"").trim(),U=(((qo=d("[data-ag-berge-notes]"))==null?void 0:qo.value)||"").trim(),Y=(((Uo=d("[data-ag-berge-edit-id]"))==null?void 0:Uo.value)||"").trim(),ee=(((jo=d("[data-ag-berge-lat]"))==null?void 0:jo.value)||"").trim()||null,ue=(((Oo=d("[data-ag-berge-lng]"))==null?void 0:Oo.value)||"").trim()||null,R=(((Ho=d("[data-ag-berge-loc-label]"))==null?void 0:Ho.value)||"").trim()||null;if(!m){(Fo=d("[data-ag-berge-name]"))==null||Fo.focus();return}A([20,20,40]);const ke={name:m,elevation:null,distance:isNaN(S)?null:S,elevGain:isNaN(T)?null:T,date:L,activityUrl:M||null,cover:P||null,notes:U||null,lat:ee,lng:ue,locLabel:R};Y?Zs(Y,ke):Js({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...ke,token:D()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(md=>{const Wo=d(md);Wo&&(Wo.value="")});const we=d("[data-ag-loc-search]");we&&(we.value="");const Mt=d("[data-ag-berge-form-title]");Mt&&(Mt.textContent="Neuer Gipfeleintrag");const Ve=d("[data-ag-berge-save] span:last-child");Ve&&(Ve.textContent="Eintragen"),f.hidden=!0,u.hidden=!1,(Ro=d("[data-ag-sheet-backdrop]"))==null||Ro.classList.remove("is-open"),He(),F("Gipfel gespeichert ✓")}),el();const v=d("[data-ag-ping-card]");v&&(v.hidden=!(D()==="fionn"&&((Io=p.backup)!=null&&Io.enabled)));const w=d("[data-ag-ping-dismiss]");w&&w.addEventListener("click",()=>{const m=d("[data-ag-ping-banner]");m&&(m.hidden=!0)});const E=d("[data-ag-ping-send]");E&&E.addEventListener("click",()=>{A([20,30,20]);try{sr()}catch{}});const y=d("[data-ag-hug-send]");y&&y.addEventListener("click",()=>{A([20,30,20]);try{lr()}catch{}});const x=d("[data-ag-wish-open]"),k=d("[data-ag-wish-cancel]"),I=d("[data-ag-wish-submit]");x&&x.addEventListener("click",()=>{A(8),d("[data-ag-wish-idle]").hidden=!0,d("[data-ag-wish-form]").hidden=!1;const m=d("[data-ag-wish-input]");m&&window.setTimeout(()=>m.focus(),60)}),k&&k.addEventListener("click",()=>{A(6),d("[data-ag-wish-form]").hidden=!0,d("[data-ag-wish-idle]").hidden=!1}),I&&I.addEventListener("click",()=>{const m=d("[data-ag-wish-input]"),S=((m==null?void 0:m.value)||"").trim();if(!S)return;A([20,20,40]);const T={week:Ut(),text:S,submittedAt:Date.now(),remoteStatus:"idle"};nn(T),Aa();try{ya(T)}catch{}});const C=d("[data-ag-notif-enable]"),$=d("[data-ag-notif-dismiss]");C&&C.addEventListener("click",()=>{A(10),hl()}),$&&$.addEventListener("click",()=>{A(6);try{window.localStorage.setItem(Se,"dismissed")}catch{}const m=d("[data-ag-notif-card]");m&&(m.hidden=!0)});const G=d("[data-ag-sheet-backdrop]");G&&G.addEventListener("click",()=>{A(6);const m=d("[data-ag-berge-form]"),S=d("[data-ag-berge-add]");m&&!m.hidden&&(m.hidden=!0,S&&(S.hidden=!1));const T=document.getElementById("ag-glossary-form"),L=document.getElementById("ag-glossary-add");T&&!T.hidden&&(T.hidden=!0,L&&(L.hidden=!1)),G.classList.remove("is-open")});const O=d("[data-ag-fab]");O&&O.addEventListener("click",()=>{A(8);const m=d("[data-ag-berge-add]");m&&!m.hidden&&m.click()});const se=["today","history","lieblinge","berge"];let le=0,X=0;const pe=d(".ag-content")||z;pe.addEventListener("touchstart",m=>{le=m.touches[0].clientX,X=m.touches[0].clientY},{passive:!0}),pe.addEventListener("touchend",m=>{const S=m.changedTouches[0].clientX-le,T=Math.abs(m.changedTouches[0].clientY-X);if(Math.abs(S)>52&&T<44){const L=se.indexOf(p.activeTab),M=S<0?Math.min(L+1,se.length-1):Math.max(L-1,0);M!==L&&(A(6),Re(se[M]))}},{passive:!0});const H=d("[data-ag-ptr]");let ve=0,Je=!1;document.addEventListener("touchstart",m=>{window.scrollY===0&&(ve=m.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",m=>{if(!ve)return;m.touches[0].clientY-ve>64&&!Je&&H&&(Je=!0,H.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Je&&H&&(H.classList.add("is-loading"),await je(),p.activeTab==="berge"&&He(),p.activeTab==="history"&&Q(),H.classList.remove("is-visible","is-loading"),F("Aktualisiert ✓")),ve=0,Je=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const m=document.querySelector(".ag-widget");m==null||m.classList.toggle("ag-paused",document.hidden)})}const vl=Object.freeze(Object.defineProperty({__proto__:null,bindEvents:ur,downloadResultAsImage:gr,downloadWallpaper:pr,drawRoundRect:va,escapeHtml:N,notifyPartnerVoucherRedeemed:dr,renderError:wa,retryPendingWishSend:cr,reveal:Ct,sendHugToInbox:lr,sendPingToBackend:sr,sendWishToInbox:ya,setActiveTab:Re,setHugStatus:ze,showToast:F,wrapText:Tt},Symbol.toStringTag,{value:"Module"}));let ye=null,ie="all";function wl(e){ie=e==="vouchers"||e==="open"?e:"all",Ca=Ta,Q()}function xa(e){return e?N(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function We(){return D().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||p.theme.brand.displayNameDefault||"Lennart"}function xl(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function kl(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:p.theme.timezone}).format(e)}catch{return _(p.theme.timezone)}}const Sl=["🚴","🧄"],El=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function mr(){const e=_(p.theme.timezone),t=D();return`${p.theme.secret}|${t}|${e}|emoji`}function Tl(){const e=mr(),t=3+Math.floor(ce(`${e}|count`)*3),a=El.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const o=Math.floor(ce(`${e}|pick|${r}`)*a.length);n.push(a.splice(o,1)[0])}return[...Sl,...n]}function Cl(){const e=d("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Tl(),a=t.length,n=mr();t.forEach((r,o)=>{const i=document.createElement("span");i.className="ag-emoji",i.textContent=r;const s=360/a*o,l=(ce(`${n}|angle|${o}`)-.5)*28,c=s+l,g=ce(`${n}|radius|${o}`)*21-10.5,u=16+ce(`${n}|dur|${o}`)*10,f=-ce(`${n}|delay|${o}`)*u,h=ce(`${n}|dir|${o}`)>.5?1:-1;i.style.setProperty("--ag-emoji-angle",`${c}deg`),i.style.setProperty("--ag-emoji-radius",`${250+g}%`),i.style.setProperty("--ag-emoji-duration",`${u.toFixed(2)}s`),i.style.setProperty("--ag-emoji-delay",`${f.toFixed(2)}s`),i.style.setProperty("--ag-emoji-direction",h===1?"normal":"reverse"),e.appendChild(i)})}function Ge(){const e=d("[data-ag-streak]"),t=be(),a=he();if(t>(a.maxStreak||0)&&ot({...a,maxStreak:t}),e){const n=ln(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}ka()}function ka(){const e=d("[data-ag-streak-restore]");e&&(e.hidden=!gn())}const fr={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Ll(e){const t=d("[data-ag-milestone]");if(!t)return;const a=fr[e];if(!a){t.hidden=!0;return}const n=D();if(Si(n,e)){t.hidden=!0;return}d("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Ei(n,e)}function Al(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((l,c)=>{const g=document.createElement("div");g.className="ag-prompt-field";const u=document.createElement("p");u.className="ag-prompt-question",u.textContent=(c===0?"💭 ":"🌱 ")+l;const f=document.createElement("textarea");return f.className="ag-prompt-textarea",f.placeholder="Schreib hier deine Antwort...",f.rows=a.length>1?3:4,f.setAttribute("aria-label",l),g.appendChild(u),g.appendChild(f),n.appendChild(g),{question:l,textarea:f}}),o=document.createElement("p");o.className="ag-pin-err",o.hidden=!0,o.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const i=document.createElement("button");i.type="button",i.className="ag-button",i.style.cssText="width:100%;margin-top:4px",i.textContent="Kapsel öffnen ✨";function s(){const l=r.filter(g=>!g.textarea.value.trim());if(l.length){o.hidden=!1;for(const g of l)g.textarea.classList.add("ag-pin-shake"),setTimeout(()=>g.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(g=>g.question+`
`+g.textarea.value.trim()).join(`

`);t(c)}i.addEventListener("click",s);for(const l of r)l.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(o),n.appendChild(i),n}function zl(e){return Array.isArray(e)?e.join(`
`):e}function Il(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Ml(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:zl(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function $l(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const o=document.createElement("div");o.className="ag-pin-row";const i=document.createElement("input");i.type="text",i.inputMode="numeric",i.pattern="[0-9]*",i.maxLength=4,i.className="ag-pin-input",i.placeholder="_ _ _ _",i.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function c(){i.value.trim()===e?t():(l.hidden=!1,i.classList.add("ag-pin-shake"),i.value="",setTimeout(()=>i.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),i.addEventListener("keydown",g=>{g.key==="Enter"&&c()}),o.appendChild(i),o.appendChild(s),n.appendChild(r),n.appendChild(o),n.appendChild(l),n}function Bl(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const o=document.createElement("p");o.className="ag-pin-hint",o.style.marginTop="10px",o.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const i=document.createElement("div");i.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function g(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),Lt(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",g),s.addEventListener("keydown",u=>{u.key==="Enter"&&g()}),i.appendChild(s),i.appendChild(l),n.appendChild(r),n.appendChild(o),n.appendChild(i),n.appendChild(c),n}function Dl(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const i=document.createElement("iframe");return i.src=`https://open.spotify.com/embed/${n}/${r}`,i.width="100%",i.height=n==="track"||n==="episode"?"80":"152",i.setAttribute("frameborder","0"),i.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",i.loading="lazy",i.setAttribute("allowtransparency","true"),i.setAttribute("title","Spotify player"),i.className="ag-spotify-iframe",i}catch{return null}}function hr(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function Lt(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=V(t);if(!a){e.hidden=!0;return}const n=Dl(a);e.appendChild(n||hr(a)),e.hidden=!1}function Nl(e){const t=d("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||te()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),o=e.token,i=q().filter(u=>u.token===o&&typeof u.day=="string"&&u.day.slice(5)===n&&Number(u.day.slice(0,4))<r).sort((u,f)=>f.day.localeCompare(u.day));if(!i.length)return;const s=i[0],l=r-Number(s.day.slice(0,4)),c=d("[data-ag-memory-label]"),g=d("[data-ag-memory-text]");c&&(c.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),g&&(g.textContent=s.title||""),t.hidden=!1}function br(e){const t=Pt(e),a=_t(e);if(ci(e),Z(),p.wishInbox&&p.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:D(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(p.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Pl(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Ee()[a]||0,r=_t(a),o=Pt(a);if(n>=o)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(o)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${o} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{br(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',At()});else{const s=o-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(o-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function At(){const e=d("[data-ag-tokenbank]");if(!e)return;const t=Ee(),a=Object.keys(Nt).map(l=>{const c=Pt(l),g=Math.min(t[l]||0,c);return{emoji:l,goal:c,count:g,raw:t[l]||0,reward:_t(l),done:(t[l]||0)>=c}}),n=a.reduce((l,c)=>l+c.raw,0),r=a.filter(l=>l.done).length,o=a.filter(l=>l.raw>0),i=a.length-o.length;o.sort((l,c)=>c.done-l.done||c.count/c.goal-l.count/l.goal||l.goal-c.goal);const s=d("[data-ag-tokenbank-head]");if(s){const l=i?` · ${i} ${i===1?"Sorte":"Sorten"} noch unentdeckt`:"";s.textContent=n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`}e.innerHTML="";for(const l of o){const c=document.createElement("div");if(c.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${N(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const g=document.createElement("button");g.type="button",g.className="ag-tokenrow-redeem",g.textContent="Einlösen",g.addEventListener("click",()=>{br(l.emoji),A([12,30,12]),F(`${l.emoji} eingelöst — Fionn weiss Bescheid`),At()}),c.appendChild(g)}e.appendChild(c)}}function yr(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let o;if(t.type==="video"){const i=ai(t.url);if(i){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${i}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const g=()=>{s.removeEventListener("click",g),s.removeEventListener("keydown",u),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const f=document.createElement("iframe");f.src=`https://drive.google.com/file/d/${i}/preview?autoplay=1`,f.allow="autoplay",f.setAttribute("allowfullscreen",""),f.setAttribute("frameborder","0"),f.setAttribute("aria-label",a),f.className="ag-drive-iframe",s.appendChild(f)},u=f=>{(f.key==="Enter"||f.key===" ")&&g()};s.addEventListener("click",g),s.addEventListener("keydown",u),o=s}else o=document.createElement("video"),o.src=V(t.url),o.controls=!0,o.muted=!0,o.playsInline=!0,o.setAttribute("playsinline",""),o.setAttribute("preload","metadata"),o.setAttribute("aria-label",a),o.className="ag-media-content"}else o=document.createElement("img"),o.alt=a,o.loading="eager",o.decoding="auto",o.className="ag-media-content",o.addEventListener("load",()=>{const i=o.naturalWidth&&o.naturalHeight?o.naturalWidth/o.naturalHeight:1;n.dataset.orientation=i<.95?"portrait":i>1.15?"landscape":"square"},{once:!0}),o.addEventListener("error",()=>{J("config/photos.json",{photos:[]}).then(i=>{const{normalizePhotos:s}=Sa(),l=s(i),c=l.find(g=>g.alt===t.alt&&g.type!=="video")||l.find(g=>g.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,o.src=V(c.url),p.photos=l;else{const g=o.closest("[data-ag-photo-wrap]");g&&(g.hidden=!0)}}).catch(()=>{const i=o.closest("[data-ag-photo-wrap]");i&&(i.hidden=!0)})},{once:!0}),o.src=V(t.url);n.appendChild(o),e.appendChild(n)}function Sa(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Ke(e,t,a,n){var l,c;const r=d("#ag-lightbox"),o=d("#ag-lightbox-img"),i=d("#ag-lightbox-caption"),s=d("#ag-lightbox-drive-link");if(!(!r||!o)){(l=r.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),ye&&(o.removeEventListener("error",ye),ye=null),o.onerror=null,s&&(s.hidden=!0);{o.hidden=!1;const g=V(e);if(!g)return;o.src=g,o.alt=t||"",ye=()=>{const u=n||t;J("config/photos.json",{photos:[]}).then(f=>{const{normalizePhotos:h}=Sa(),b=h(f),v=b.find(w=>w.alt===u)||null;v&&v.url&&(o.src=V(v.url),p.photos=b)}).catch(()=>{})},o.addEventListener("error",ye,{once:!0})}i.textContent=t||"",i.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Ea(){var a,n;const e=d("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(ye&&(t.removeEventListener("error",ye),ye=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function vr(e){return[`${Ln(e.category.tone)} ${We()}s ${p.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var o;const[a,n]=e.unlockTime.split(":").map(Number),r=Ze(e.unlockTimezone||((o=p.theme)==null?void 0:o.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function Ie(e){var E;z.dataset.tone=e.category.tone,Xi(e.category.tone),d("[data-ag-rarity]").textContent=e.category.label,d("[data-ag-date]").textContent=e.day,d("[data-ag-title]").textContent=e.outcome.title;const t=d("[data-ag-message]");if(!t)return;t.innerHTML=xa(e.outcome.message),t.hidden=!1;const a=d("[data-ag-result]"),n=d("[data-ag-freikarte-wrap]");if(n){const y=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(y&&ui(e.token)>0&&!te())}const r=d("[data-ag-quest-wrap]");if(r){const y=e.category.tone==="quest"&&!te();if(r.hidden=!y,y){const x=d("[data-ag-quest-hint]"),k=d("[data-ag-quest-done]"),I=d("[data-ag-quest-photo]"),C=d("[data-ag-beweis-file]"),$=d("[data-ag-beweis-thumb]"),{formatHistoryDate:G}=Me(),O=q().find(X=>X.day===e.day&&X.token===e.token),se=!!(O&&O.bestanden),le=O&&O.beweisUrl;$&&($.hidden=!le,le&&($.src=V(le),$.onclick=()=>Ke(le,"Beweisfoto"))),x&&(x.textContent=se?`🏆 Bestanden am ${G(O.bestandenAt||O.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),k&&(k.hidden=se,k.onclick=()=>{if((typeof window>"u"||!window.confirm||window.confirm("Quest wirklich geschafft? Das wandert dauerhaft ins Trophäenregal."))&&Xa(e.day,e.token)){Z();try{re(60)}catch{}try{F("Bestanden 🏆")}catch{}Ie(e),p.activeTab==="history"&&Q()}}),I&&C&&(I.hidden=!1,I.disabled=!1,I.textContent=le?"📸 Foto ersetzen":"📸 Beweis anhängen",I.onclick=()=>{C.value="",C.click()},C.onchange=async()=>{const X=C.files&&C.files[0],pe=q().find(H=>H.day===e.day&&H.token===e.token);if(!(!X||!pe)){I.disabled=!0,I.textContent="Lädt hoch…";try{const H=await us(e.day,e.token,X);li(e.day,e.token,H),Xa(e.day,e.token),Z();try{re(60)}catch{}try{F("Beweis angenommen 🏆")}catch{}}catch(H){const ve=H&&H.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":H&&H.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":H&&H.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{F(ve)}catch{}}Ie(e),p.activeTab==="history"&&Q()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const x=Al(e.outcome.prompt,k=>{if(e.promptAnswer=k,x.remove(),!te()){Ml(e,k),e.outcome.id&&Fi(e.outcome.id,k);const I=q(),C=I.findIndex($=>$.day===e.day&&$.token===e.token);C!==-1&&(I[C]={...I[C],promptAnswer:k},de(I),Z())}Ie(e),p.activeTab==="history"&&Q()});x.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(x,t)}d("[data-ag-result]").hidden=!1;return}const o=a?a.querySelector("[data-ag-pin-gate]"):null;o&&o.remove();const i=d("[data-ag-link-wrap]");if(e.outcome.pin){const y=!!e.outcome.pinMessage;if(y||(t.hidden=!Kt(e.outcome.pin)),!Kt(e.outcome.pin)){let x=null;y&&(x=document.createElement("div"),x.className="ag-message",x.hidden=!0,x.innerHTML=xa(e.outcome.pinMessage),t.parentNode.insertBefore(x,t.nextSibling));const k=$l(e.outcome.pin,()=>{k.remove(),y?x.hidden=!1:t.hidden=!1,e.outcome.link&&i&&Lt(i,e.outcome.link)},e.outcome.pinHint);k.setAttribute("data-ag-pin-gate","");const I=y?x:t;I.parentNode.insertBefore(k,I)}}const s=d("[data-ag-photo-wrap]"),l=d("[data-ag-photo-media]"),c=d("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[y,x]=e.unlockTime.split(":").map(Number),k=Ze(e.unlockTimezone||((E=p.theme)==null?void 0:E.timezone)||"UTC"),I=e.outcome.linkPin;if(I)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[$,G]=e.outcome.linkPinFrom.split(":").map(Number);return k.h>$||k.h===$&&k.m>=G})()){const $=Bl(I,i,e);i.innerHTML="",i.appendChild($),i.hidden=!1}else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild($),i.hidden=!1}else if(k.h>y||k.h===y&&k.m>=x)Lt(i,e.outcome.link);else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i.innerHTML="",i.appendChild($),i.hidden=!1}}else e.outcome.pin&&!Kt(e.outcome.pin)||Lt(i,e.outcome.link||null);if(Pl(d("[data-ag-token-wrap]"),e),Nl(e),e.photo){yr(l,e.photo);const y=(e.photo.caption||"").trim();y?(c.textContent=y,c.hidden=!1):(c.textContent="",c.hidden=!0),s.hidden=!1}else l.innerHTML="",c.textContent="",c.hidden=!0,s.hidden=!0;const g=vr(e),u=encodeURIComponent("Mein Gacha-Zug"),f=encodeURIComponent(g),h=d("[data-ag-send]");p.theme.messageTarget.startsWith("mailto:")?h.href=`${p.theme.messageTarget}?subject=${u}&body=${f}`:h.href=p.theme.messageTarget.replace("{text}",f);const b=d("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const v=d("[data-ag-wallpaper]");v&&(v.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const w=d("[data-ag-reactions]");if(w){w.hidden=!!te();const y=q().find(k=>k.day===e.day&&k.token===e.token),x=y&&y.reaction;for(const k of w.querySelectorAll("[data-ag-react]"))k.classList.toggle("is-chosen",k.dataset.agReact===x),k.onclick=()=>{const I=k.dataset.agReact;if(di(e.day,e.token,I)){Il(e,I),Z();try{A([12,30,18])}catch{}try{F(`${I} Fionn weiss Bescheid`)}catch{}Ie(e)}}}d("[data-ag-result]").hidden=!1,wr()}function _l(e){return e?fe().some(t=>t.day===e.day&&t.token===e.token):!1}function zt(e){return fe().some(t=>t.day===e.day&&t.token===e.token)}function wr(){const e=d("[data-ag-star]");if(!e)return;const t=_l(p.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function ql(e,t){const a=fe(),n=a.findIndex(o=>o.day===e.day&&o.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),at(a),Z();const r=zt(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",p.activeTab==="lieblinge"&&It()}function Ul(e){if(!e)return;const t=fe(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),at(t),Z(),wr(),p.activeTab==="lieblinge"&&It()}function jl(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=q(),n=new Set,r=[t,...a].filter(o=>{if(!o||typeof o.day!="string"||typeof o.token!="string")return!1;const i=`${o.day}|${o.token}`;return n.has(i)?!1:(n.add(i),!0)});r.sort((o,i)=>o.day<i.day?1:o.day>i.day?-1:0),de(r),Ft(0),Z()}function Ol(e,t){var i;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=_(((i=p.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=q(),o=r.find(s=>s.day===e.day&&s.token===e.token);o&&(o.used=!0,o.usedAt=n,de(r)),Z();try{re(60)}catch{}try{F("Eingelöst 💛")}catch{}try{dr(e)}catch{}t&&(t.disabled=!0),Q(),p.activeTab==="lieblinge"&&It()}function xr(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,r]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=r)){const i=document.createElement("span");return i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i}}const t=V(e.link);return t?hr(t):null}function kr(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:r}=Me();n.textContent=r(e.day);const o=document.createElement("span");o.className="ag-history-badge",o.textContent=e.categoryLabel||"Kapsel";const i=document.createElement("button");if(i.type="button",i.className="ag-history-star"+(zt(e)?" is-starred":""),i.textContent=zt(e)?"★":"☆",i.title=zt(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",i.addEventListener("click",f=>{f.stopPropagation(),ql(e,i)}),a.appendChild(n),a.appendChild(o),e.reaction){const f=document.createElement("span");f.className="ag-history-reaction",f.textContent=e.reaction,f.title="Deine Reaktion",a.appendChild(f)}a.appendChild(i);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const l=document.createElement("div");l.className="ag-history-message",l.innerHTML=xa(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const f=document.createElement("p");f.className="ag-history-answer-label",f.textContent="💭 Antwort";const h=document.createElement("blockquote");h.className="ag-history-answer",h.textContent=e.promptAnswer,c.appendChild(f),c.appendChild(h)}t.appendChild(a);const g=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,u=e.photo&&(e.photo.type==="video"||g.test(e.photo.url||""));if(e.photo&&!u){const f=document.createElement("div");f.className="ag-history-body";const h=document.createElement("div");h.className="ag-history-thumb";const b=document.createElement("img");b.src=V(e.photo.url),b.alt=e.photo.alt||"Foto-Drop",b.loading="lazy",b.decoding="async",b.addEventListener("error",function(){J("config/photos.json",{photos:[]}).then(w=>{const{normalizePhotos:E}=Sa(),y=E(w),x=y.find(k=>k.alt===e.photo.alt&&k.type!=="video")||y.find(k=>k.type!=="video")||null;if(x&&x.url)e.photo.url=x.url,b.src=V(x.url),p.photos=y;else{h.classList.add("is-broken"),b.remove();const k=document.createElement("span");k.className="ag-history-thumb-broken",k.textContent="📷",h.appendChild(k)}}).catch(()=>{h.classList.add("is-broken"),b.remove();const w=document.createElement("span");w.className="ag-history-thumb-broken",w.textContent="📷",h.appendChild(w)})},{once:!0}),h.appendChild(b),h.style.cursor="pointer",h.title="Vollansicht",h.addEventListener("click",()=>Ke(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const v=document.createElement("div");if(v.className="ag-history-text",v.appendChild(s),v.appendChild(l),c&&v.appendChild(c),e.link){const w=xr(e);w&&v.appendChild(w)}f.appendChild(h),f.appendChild(v),t.appendChild(f)}else if(t.appendChild(s),t.appendChild(l),c&&t.appendChild(c),e.link){const f=xr(e);f&&t.appendChild(f)}if(e.bestanden){const f=document.createElement("p");f.className="ag-history-bestanden";const{formatHistoryDate:h}=Me();if(f.textContent=`🏆 Bestanden${e.bestandenAt?` am ${h(e.bestandenAt)}`:""}`,t.appendChild(f),e.beweisUrl){const b=document.createElement("img");b.className="ag-history-beweis",b.src=V(e.beweisUrl),b.alt="Beweisfoto",b.loading="lazy",b.decoding="async",b.addEventListener("click",v=>{v.stopPropagation(),Ke(e.beweisUrl,"Beweisfoto")}),b.addEventListener("error",()=>b.remove(),{once:!0}),t.appendChild(b)}}if(tt(e)){const f=document.createElement("div");if(f.className="ag-voucher-actions",e.used){const h=document.createElement("span");h.className="ag-voucher-used";const{formatHistoryDate:b}=Me();h.textContent=`✓ Benutzt am ${e.usedAt?b(e.usedAt):"–"}`,f.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="ag-voucher-use",h.textContent="🎟️ Benutzen",h.addEventListener("click",b=>{b.stopPropagation(),Ol(e,h)}),f.appendChild(h)}t.appendChild(f)}return t}function Me(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}}}function Hl(e){const t=d("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===ie),n.setAttribute("aria-selected",r===ie?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let $e=null;function Sr(e){var y;const t=d("[data-ag-history-calendar]");if(!t)return;if(ie!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((y=p.theme)==null?void 0:y.timezone)||"UTC",n=_(a);$e||($e=n.slice(0,7));const r=new Map(e.map(x=>[x.day,x])),[o,i]=$e.split("-").map(Number),s=new Date(Date.UTC(o,i-1,1)),l=new Date(Date.UTC(o,i,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,g=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),u=e.filter(x=>x.day.startsWith($e)).length;t.innerHTML="";const f=document.createElement("div");f.className="ag-kalender-head";const h=document.createElement("button");h.type="button",h.className="ag-kalender-nav",h.textContent="‹",h.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=u?`${g} · ${u} Kapseln`:g;const v=document.createElement("button");v.type="button",v.className="ag-kalender-nav",v.textContent="›",v.setAttribute("aria-label","Nächster Monat");const w=x=>{const k=new Date(Date.UTC(o,i-1+x,1));$e=`${k.getUTCFullYear()}-${String(k.getUTCMonth()+1).padStart(2,"0")}`,Sr(e)};h.addEventListener("click",()=>w(-1)),v.addEventListener("click",()=>w(1)),f.appendChild(h),f.appendChild(b),f.appendChild(v),t.appendChild(f);const E=document.createElement("div");E.className="ag-kalender-grid";for(const x of["M","D","M","D","F","S","S"]){const k=document.createElement("span");k.className="ag-kalender-wd",k.textContent=x,E.appendChild(k)}for(let x=0;x<c;x++)E.appendChild(document.createElement("span"));for(let x=1;x<=l;x++){const k=`${$e}-${String(x).padStart(2,"0")}`,I=r.get(k),C=document.createElement("span");C.className="ag-kalender-day",C.textContent=x,I&&(C.classList.add("has-pull"),C.dataset.tone=I.tone||"soft",C.title=`${I.title||"Kapsel"} (${I.categoryLabel||""})`),k===n&&C.classList.add("is-today"),k>n&&C.classList.add("is-future"),E.appendChild(C)}t.appendChild(E)}function Fl(e){var o;const t=d("[data-ag-history-tally]");if(!t)return;if(ie!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(o=e[e.length-1])==null?void 0:o.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const Ta=15;let Ca=Ta;function Rl(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function Wl(e){const t=d("[data-ag-album-card]"),a=d("[data-ag-album]"),n=d("[data-ag-album-note]");if(!t||!a)return;const r=Rl(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const o of r){const i=document.createElement("button");i.type="button",i.className="ag-album-tile",i.title=o.caption||o.alt||o.day,i.setAttribute("aria-label",o.caption||o.alt||`Foto vom ${o.day}`);const s=document.createElement("img");s.src=o.url,s.alt=o.alt||o.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>i.remove(),{once:!0}),i.appendChild(s),i.addEventListener("click",()=>{A(8),Ke(o.url,o.caption,!1,o.alt)}),a.appendChild(i)}}function Gl(e){const t=d("[data-ag-trophy-card]"),a=d("[data-ag-trophies]"),n=d("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,s)=>(s.bestandenAt||s.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`);const{formatHistoryDate:o}=Me();a.innerHTML="";for(const i of r){const s=document.createElement("div");s.className="ag-trophy-tile",s.title=i.title||i.categoryLabel||"Quest";const l=document.createElement("span");l.className="ag-trophy-emoji";const c=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(l.textContent=c?c[c.length-1]:"🏆",i.beweisUrl){s.classList.add("has-beweis");const f=document.createElement("img");f.className="ag-trophy-shot",f.src=V(i.beweisUrl),f.alt="Beweisfoto",f.loading="lazy",f.decoding="async",f.addEventListener("error",()=>{f.remove(),s.classList.remove("has-beweis")},{once:!0}),s.appendChild(f),s.addEventListener("click",()=>Ke(i.beweisUrl,i.title||"Beweisfoto"))}const g=document.createElement("span");g.className="ag-trophy-title",g.textContent=i.title||i.categoryLabel||"Quest";const u=document.createElement("span");u.className="ag-trophy-date",u.textContent=o(i.bestandenAt||i.day),s.appendChild(l),s.appendChild(g),s.appendChild(u),a.appendChild(s)}}function La(){const e=d("[data-ag-ferien-list]"),t=d("[data-ag-ferien-count]");if(!e)return;const{formatHistoryDate:a}=Me(),n=ct();e.innerHTML="",t&&(t.hidden=!n.length,t.textContent=n.length?`· ${n.length}`:"");for(const r of n){const o=document.createElement("li");o.className="ag-ferien-item";const i=document.createElement("span");i.textContent=r.from===r.to?a(r.from):`${a(r.from)} – ${a(r.to)}`;const s=document.createElement("button");s.type="button",s.className="ag-ferien-remove",s.setAttribute("aria-label","Ferien entfernen"),s.textContent="✕",s.addEventListener("click",()=>{Li(r.from,r.to),La(),Ge()}),o.appendChild(i),o.appendChild(s),e.appendChild(o)}}function Q(){var g;At();const e=d("[data-ag-history]"),t=d("[data-ag-history-empty]"),a=d("[data-ag-history-note]");e.innerHTML="";const n=D(),r=_(((g=p.theme)==null?void 0:g.timezone)||"UTC"),o=q().filter(u=>u.token===n&&u.day<=r).slice().sort((u,f)=>u.day<f.day?1:u.day>f.day?-1:0);Sr(o),Fl(o),La(),Gl(o),Wl(o);const i=o.filter(u=>tt(u)&&!u.used).length;Hl(i);const s=o.filter(u=>ie==="vouchers"?tt(u):ie==="open"?tt(u)&&!u.used:!0);ie==="open"?a.textContent=i?`Du hast ${i} offene${i===1?"n":""} Gutschein${i===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":ie==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=d("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=ie==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":ie==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Ca);for(const u of c)e.appendChild(kr(u));if(l){const u=s.length-c.length;l.hidden=u<=0,u>0&&(l.textContent=`Mehr anzeigen (${u} weitere)`,l.onclick=()=>{Ca+=Ta,Q()})}}function It(){const e=d("[data-ag-lieblinge]"),t=d("[data-ag-lieblinge-empty]"),a=d("[data-ag-lieblinge-note]");e.innerHTML="";const n=fe();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild(kr(r))}function Kl(){const e=d("[data-ag-odds]");e.innerHTML="";const t=be(),a=dn(t),n=a.reduce((r,o)=>r+o.weight,0);for(const r of a){const o=document.createElement("li");o.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(o)}if(t>=5){const r=ln(t),o=document.createElement("li");o.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,o.style.fontWeight="800",e.appendChild(o)}}function Yl(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Aa(){const e=d("[data-ag-wish-idle]"),t=d("[data-ag-wish-form]"),a=d("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Ht();n&&n.week===Ut()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,d("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",d("[data-ag-wish-done-note]").textContent=`„${n.text}"`,d("[data-ag-wish-done-meta]").textContent=Yl(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function Jl(){var w;const e=K()==="fionn",t=e?p.theme.brand.fromName:We(),a=e?We():p.theme.brand.fromName,n=d("[data-ag-main-title]");n&&(n.textContent=p.theme.brand.titleTemplate.replace("{name}",t));const r=d("[data-ag-kicker]");r&&(r.textContent=`${p.theme.brand.kicker} · ${p.photos.length} Erinnerungen`);const o=d("[data-ag-intro]");o&&(o.textContent=p.theme.brand.intro);const i=d("[data-ag-button-text]");i&&(i.textContent=p.theme.brand.buttonIdle);const s=d("[data-ag-rules-title]");s&&(s.textContent=p.theme.brand.rulesTitle);const l=d("[data-ag-rules-text]");l&&(l.textContent=p.theme.brand.rulesText);const c=d("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const g=d("[data-ag-today-pill]");g&&(g.textContent=kl());const u=d("[data-ag-draw-hint]");u&&(u.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const f=d("[data-ag-werkstatt-open]");f&&(f.hidden=e||!ht());const h=document.getElementById("ag-werkstatt-panel");h&&!ht()&&(h.hidden=!0),bt();const b=d("[data-ag-chips]");b&&(b.innerHTML="");const v=Array.isArray(p.theme.stickers)&&p.theme.stickers.length?p.theme.stickers:xl();for(const E of b?v:[]){const y=document.createElement("li");if(y.textContent=E,(E.toLowerCase().includes("bärlauch")||E.toLowerCase().includes("barlauch"))&&(y.id="ag-btn-baerlauch",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Bärlauch öffnen"),y.classList.add("ag-chip-clickable")),(E.toLowerCase().includes("gespräch")||E.toLowerCase().includes("gesprach"))&&(y.id="ag-btn-gesprach",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Gespräch öffnen"),y.classList.add("ag-chip-clickable")),E.toLowerCase().includes("rave")&&(y.id="ag-btn-rave",y.tabIndex=0,y.setAttribute("role","link"),y.setAttribute("aria-label","Rave Board öffnen"),y.classList.add("ag-chip-clickable")),E.toLowerCase()==="quest"&&(y.id="ag-btn-quest",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Quest öffnen"),y.classList.add("ag-chip-clickable"),(w=p.quest)!=null&&w.enabled&&Un()&&(De().solved||y.classList.add("ag-chip-quest-active"))),E.toLowerCase().includes("glossar")&&(y.id="ag-btn-glossary",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Glossar öffnen"),y.classList.add("ag-chip-clickable")),E.toLowerCase()==="mission"&&(y.id="ag-btn-mission",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Mission öffnen"),y.classList.add("ag-chip-clickable"),Dn()||y.classList.add("ag-chip-mission-active")),(E.toLowerCase().includes("skincare")||E.toLowerCase().includes("pflege"))&&p.skincare&&(y.id="ag-btn-skincare",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Skincare-Routine öffnen"),y.classList.add("ag-chip-clickable")),E.toLowerCase().includes("stimmung")){y.id="ag-btn-stimmung",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Farbe des Tages wählen"),y.classList.add("ag-chip-clickable");const x=Te();x&&(y.classList.add("ag-chip-stimmung-set"),y.style.setProperty("--chip-dot-color",x))}b.appendChild(y)}Cl(),Ge()}const Er="affektions-gacha:install-dismissed:v1";let Ye=null;function Vl(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function Zl(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Tr(){try{return window.localStorage.getItem(Er)==="1"}catch{return!1}}function Cr(){try{window.localStorage.setItem(Er,"1")}catch{}const e=d("[data-ag-install-nudge]");e&&(e.hidden=!0)}function Lr(e){if(Tr())return;const t=d("[data-ag-install-nudge]");if(!t)return;const a=d("[data-ag-install-copy]"),n=d("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Ye&&(Ye.prompt(),await Ye.userChoice,Ye=null,Cr())}),t.hidden=!1}function Ql(){var e;Vl()||Tr()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Ye=t,Lr(!0)}),Zl()&&Lr(!1),(e=d("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Cr))}const Xl={photos:[]};function ed(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=ea();return a.map(r=>{const o=new URL(r.url,n).toString(),i=r.type==="video"||t.test(o);return{...r,type:i?"video":"image",url:o}}).filter(r=>r.url)}async function td(){ns(),ss(),gs();try{const[e,t,a,n,r,o,i,s,l,c]=await Promise.all([J("config/theme.json"),J("config/outcomes.json"),J("config/photos.json",Xl),J("config/special-days.json",{days:[]}),J("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),J("config/backup.json",{enabled:!1,endpointUrl:""}),J("config/quest.json",{enabled:!1}),J("config/missions.json",{pairs:[]}),J("config/push.json",{enabled:!1}),J("config/skincare.json",null)]);p.theme=e,p.outcomes=t,p.photos=ed(a),p.specialDays=n,p.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},p.backup=o&&typeof o=="object"?o:{enabled:!1,endpointUrl:""},p.quest=i&&typeof i=="object"?i:{enabled:!1},p.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},p.push=l&&typeof l=="object"?l:{enabled:!1},p.skincare=c&&typeof c=="object"?c:null,p.werkstatt=_e(),rs(e),os(te()||_(e.timezone)),qi(),Jl(),Kl(),Aa(),ur(),Ql(),requestAnimationFrame(()=>{const u=z.querySelector(".ag-nav-pill"),f=z.querySelector(".ag-bottomnav-btn.is-active");if(u&&f){const h=f.closest(".ag-bottomnav"),b=h?h.getBoundingClientRect():null,v=f.getBoundingClientRect();b&&v.width&&(u.style.transition="none",u.style.left=`${v.left-b.left}px`,u.style.width=`${v.width}px`,requestAnimationFrame(()=>{u.style.transition=""}))}});try{cr()}catch{}try{const u=z.querySelector(".ag-stage");u&&"IntersectionObserver"in window&&new IntersectionObserver(([h])=>{u.classList.toggle("ag-stage-idle",!h.isIntersecting)},{threshold:.05}).observe(u)}catch{}ba(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(ha(),ra(),Ar(e.timezone),je().catch(()=>{}))}),z.classList.add("is-ready"),z.style.transition="opacity .18s ease",z.style.opacity="1";const g=_(e.timezone);q().some(u=>u.token===D()&&u.day===g)&&z.classList.add("has-drawn"),ra(),Ar(e.timezone),je().catch(()=>{}),window.setTimeout(()=>{ir().catch(()=>{})},1800)}catch(e){wa(e)}}function Ar(e){try{const{h:t}=Ze(e||"UTC"),a=t>=22||t<5;z.classList.toggle("is-evening",a);const n=z.querySelector("[data-ag-kicker]");if(n){const r=n.textContent.replace(/ · Gute Nacht 🌙$/,"");n.textContent=a?r+" · Gute Nacht 🌙":r}}catch{}}const Be=document.currentScript,ad=(Be==null?void 0:Be.dataset.mount)||"#affektions-gacha",nd=(Be==null?void 0:Be.dataset.configBase)||"";function rd(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const od=document.querySelector(ad)||rd();Go(od),Qi(nd,null),td().catch(e=>wa(e));const id="wss://broker.hivemq.com:8884/mqtt",zr="picolight_lf26/events",sd="web_app",Ir=10,za=17/29,ld={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:za,w:1},quiet:{pos:1/29,w:.3}},Ia=18e3,Mr=420,$r=6,Br=Mr*$r,Ma=1600;function Dr(e){const t=ld[e]||{pos:za,w:0},a=t.w>=1?{pos:za,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],o=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],i=[];for(let l=0;l<$r;l++)i.push({at:l*Mr,payload:{on:!0,fade_steps:6,brightness:1,groups:l%2?o:r}});i.push({at:Br,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:Ir}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let l=!1;for(let c=Br+Ma;c<Ia-Ma;c+=Ma)l=!l,i.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...l?s:n,size:Ir}]}})}return i}const dd=2500,$a=["board_a","board_b"];let Ba=!1;function cd(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function gd(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}async function pd(e){if(!Ba){Ba=!0;try{await cd(),await new Promise((t,a)=>{const n=window.mqtt.connect(id,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),r={};let o=!1,i=null,s=[],l=!1;const c=()=>{if(!l){l=!0,document.removeEventListener("visibilitychange",f);try{n.end(!0)}catch{}t()}},g=h=>{h.from=sd;try{n.publish(zr,JSON.stringify(h))}catch{}},u=()=>{clearTimeout(i);for(const h of s)clearTimeout(h);if(s=[],!o){c();return}o=!1;for(const h of $a){const b=r[h]||r[$a.find(w=>w!==h)];if(!b)continue;const v={target:h,...gd(b)};b.on===!1?(g({...v,on:!0}),setTimeout(()=>g({target:h,on:!1}),1500)):g({...v,on:!0})}setTimeout(c,2500)},f=()=>{document.visibilityState==="hidden"&&o&&u()};document.addEventListener("visibilitychange",f),n.on("connect",()=>{n.subscribe(zr,h=>{if(h){c();return}g({nudge:!0}),setTimeout(()=>{if(!Object.keys(r).length){c();return}o=!0;for(const b of Dr(e))s.push(setTimeout(()=>g(b.payload),b.at));i=setTimeout(u,Ia)},dd)})}),n.on("message",(h,b)=>{try{const v=JSON.parse(b.toString());v.from&&$a.includes(v.from)&&Array.isArray(v.groups)&&!o&&(r[v.from]=v)}catch{}}),n.on("error",()=>{o||c()}),n.on("close",()=>{o||c()}),setTimeout(()=>a(new Error("lights flash timed out")),Ia+2e4)})}catch{}finally{Ba=!1}}}const ud=Object.freeze(Object.defineProperty({__proto__:null,choreography:Dr,flashLightsForPull:pd},Symbol.toStringTag,{value:"Module"}))})();

(function(){"use strict";const g={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,push:null,skincare:null,werkstatt:[],todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let z=null;function ro(e){z=e}function l(e){return z.querySelector(e)}const Ua="affektions-gacha:history:v1",ja="affektions-gacha:favourites:v1",Wa="affektions-gacha:tokens:v1",Oa="affektions-gacha:tokens-sent:v1",Fa="affektions-gacha:streak-cache:v1",Ha="affektions-gacha:streak-synced:v1",Ra="affektions-gacha:streak-restore:v1",Ga="affektions-gacha:wish:v1",Ka="affektions-gacha:milestones:v1",Ee="affektions-gacha:notif:v2",Ya="affektions-gacha:baerlauch-scores:v1",io="affektions-gacha:baerlauch-history:v1",Ja="affektions-gacha:mission-log:v1",Va="affektions-gacha:gesprach-idx:v1",oo="affektions-gacha:sound:v1",Za="affektions-gacha:gipfelbuch:v1",Xa="affektions-gacha:quest:v1",Pt="affektions-gacha:quest-points:v1",so=5,lo=20,Qa=[100,75,50,25],en="affektions-gacha:glossary:v1",_t="affektions-gacha:stimmung:v1",tn="affektions-gacha:freikarte:v1",qt="affektions-gacha:freikarte-reroll:v1",an="affektions-gacha:werkstatt:v1",Ut={"🌿":{goal:4,reward:"Essen: Fionn kocht, oder ein Café deiner Wahl"},"🏔":{goal:5,reward:"Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg"},"🎬":{goal:4,reward:"Ein Abend aus: Film, Konzert oder DJ — du wählst"},"🛁":{goal:3,reward:"Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag"},"💚":{goal:4,reward:"Eine Überraschung von Fionn, mit handgeschriebenem Brief"},"✈️":{goal:6,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}},co={"☕":"🌿","🔥":"🏔","🎧":"🎬","🍕":"🛁","☁️":"🛁","⭐":"💚"};function nn(e){return co[e]||e}function jt(e){const t=Ut[e];return t&&t.goal||so}function Wt(e){const t=Ut[e];return t&&t.reward||""}let rn=0;function go(e){rn=Number.isInteger(e)&&e>=0&&e<24?e:0}function _(e,t){const a=new Date().getTime()-rn*36e5,n=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(a)),r=i=>n.find(o=>o.type===i).value;return`${r("year")}-${r("month")}-${r("day")}`}function Pe(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function po(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Ot(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function uo(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function ee(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function mo(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function ho(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ce(e){return ho(mo(e))()}function et(e,t){return t?Math.floor(ce(e)*t):0}function fo(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function bo(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function N(){return K()==="fionn"?"fionn":"lennart"}function K(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function Z(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function yo(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Ft(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function tt(e){var s,d;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=_(t),[n,r,i]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,r-1,i)).getTime()/864e5);return Math.floor(o/(((d=e.quest)==null?void 0:d.periodDays)||2))}function at(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=tt(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function on(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function wo(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const vo=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,xo=/nicht\s+einlös|kein\s+gutschein/i,ko=new Set(["photo","collect","niete"]);function nt(e){if(!e)return!1;if(e.voucher===!0)return!0;if(ko.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return xo.test(t)?!1:vo.test(t)}function P(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function me(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[N()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[N()]:n})),n}catch{return t}}function ge(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[N()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}function U(){try{if(typeof window>"u"||!window.localStorage)return g.syncedHistory||[];const e=window.localStorage.getItem(Ua);if(!e)return g.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return g.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:g.syncedHistory||[]}catch{return g.syncedHistory||[]}}function le(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ua,JSON.stringify(e))}catch{}}function sn(e,t){var r;const a=U(),n=a.find(i=>i.day===e&&i.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=_(((r=g.theme)==null?void 0:r.timezone)||"UTC"),le(a)),n):null}function So(e,t,a){const n=U(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.beweisUrl=a,le(n),r):null}function Eo(e,t,a){const n=U(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.reaction=a,le(n),r):null}function he(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(ja);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=g.theme)!=null&&e.timezone?_(g.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function rt(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ja,JSON.stringify(e))}catch{}}function dn(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;if(r<=0)continue;const i=nn(a);t[i]=(t[i]||0)+r}return t}function Te(){const e=me(Wa,{});return dn(e&&typeof e=="object"&&!Array.isArray(e)?e:{})}function Ht(e){ge(Wa,e)}function ln(e){e=nn(e);const t=Te();return t[e]=(t[e]||0)+1,Ht(t),t[e]}function To(e){const t=Te();t[e]=0,Ht(t)}function it(e){return dn(e)}function Co(){const e=me(Oa,null);return e&&typeof e=="object"&&!Array.isArray(e)?it(e):null}function ot(e){ge(Oa,it(e))}function Lo(e){const t=it(e),a=it(Te());let n=Co();n===null&&(n=a,ot(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),i={};for(const o of r){const s=(t[o]||0)+((a[o]||0)-(n[o]||0));s>0&&(i[o]=s)}return Ht(i),ot(t),[...r].some(o=>(i[o]||0)!==(t[o]||0))}function Rt(){try{const e=localStorage.getItem(tn),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function cn(e){try{localStorage.setItem(tn,JSON.stringify(e))}catch{}}function zo(e){return Rt()[e]||0}function gn(e){const t=Rt();return t[e]=(t[e]||0)+1,cn(t),t[e]}function Ao(e){const t=Rt();return t[e]>0?(t[e]-=1,cn(t),!0):!1}function Io(e,t){try{const a=localStorage.getItem(qt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function Mo(e,t,a){try{const n=localStorage.getItem(qt),r=n?JSON.parse(n):{},i=r&&typeof r=="object"?r:{};i[`${e}|${t}`]=a,localStorage.setItem(qt,JSON.stringify(i))}catch{}}function Gt(){if(typeof window>"u"||!window.localStorage)return null;const e=me(Ga,null);return e&&typeof e=="object"?e:null}function pn(e){typeof window>"u"||!window.localStorage||ge(Ga,e)}function fe(){const e=me(Ra,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function st(e){ge(Ra,e)}function $o(){const e=me(Fa,0);return typeof e=="number"?e:parseInt(e,10)||0}function Kt(e){ge(Fa,e)}function Bo(){const e=me(Ha,0);return typeof e=="number"?e:parseInt(e,10)||0}function Do(e){ge(Ha,e)}function dt(){try{const e=window.localStorage.getItem(Za);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function lt(e){try{window.localStorage.setItem(Za,JSON.stringify(e))}catch{}}function ct(){try{const e=localStorage.getItem(Ja),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Yt(e){try{localStorage.setItem(Ja,JSON.stringify(e))}catch{}}function Jt(){try{const e=localStorage.getItem(Ya),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function un(){try{const e=localStorage.getItem(io),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function _e(e){try{const t=me(Xa,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Vt(e){ge(Xa,e)}function gt(){const e=me(Pt,0);return typeof e=="number"?e:parseInt(e,10)||0}function No(e){try{const t=gt()+e;return ge(Pt,t),t}catch{return e}}function Po(e){ge(Pt,e)}function mn(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Ka);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function _o(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ka,JSON.stringify(e))}catch{}}function qo(e,t){return mn().includes(`${e}|${t}`)}function Uo(e,t){const a=`${e}|${t}`,n=mn();n.includes(a)||_o([...n,a])}function Zt(e){return!1}const jo=60;function pt(){const e=fe();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function Wo(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>jo))return null;const n=fe(),r=pt().filter(i=>!(i.from===e&&i.to===t));return r.push({from:e,to:t}),r.sort((i,o)=>i.from.localeCompare(o.from)),st({...n,vacations:r}),{from:e,to:t}}function Oo(e,t){const a=fe();st({...a,vacations:pt().filter(n=>!(n.from===e&&n.to===t))})}function hn(e){return pt().some(t=>e>=t.from&&e<=t.to)}function be(){var h;const e=N(),t=U().filter(m=>m.token===e);if(!t.length)return Math.max($o(),Bo());const a=((h=g.theme)==null?void 0:h.timezone)||"UTC",n=_(a),r=new Set(t.map(m=>m.day)),[i,o,s]=n.split("-").map(Number);let d=new Date(Date.UTC(i,o-1,s)),c=n;r.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));let p=0;for(;r.has(c)||hn(c);)r.has(c)&&p++,d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return p}function fn(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function bn(e){if(e<5)return g.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return g.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Fo=45,Ho=10,Ro=.5,Go=1.8;function Ko(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=U().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,d)=>d.day.localeCompare(s.day)).slice(0,Fo);if(r.length<Ho)return e;const i=e.reduce((s,d)=>s+d.weight,0);if(!i)return e;const o={};for(const s of r)o[s.categoryId]=(o[s.categoryId]||0)+1;return e.map(s=>{const d=r.length*s.weight/i,c=Math.min(Go,Math.max(Ro,(d+1)/((o[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function Yo(e,t,a=[],n=null){const r=bn(t),i=n?Ko(r,n.token,n.day):r,o=a.length?i.filter(h=>!a.includes(h.id)):i,s=o.length?o:i,d=s.reduce((h,m)=>h+m.weight,0),c=Math.floor(ce(e)*d);let p=0;for(const h of s)if(p+=h.weight,c<p)return g.outcomes.categories.find(m=>m.id===h.id)||h;return g.outcomes.categories[g.outcomes.categories.length-1]}function yn(){const e=fe();return Math.floor((e.maxStreak||0)/lo)}function ut(){var n;if(fe().birthdayBonus2026Used)return 0;const t=((n=g.theme)==null?void 0:n.timezone)||"UTC";return _(t)==="2026-05-29"?1:0}function Xt(){const e=fe();return Math.max(0,yn()-(e.used||0))+ut()}function Qt(){var p;const e=N(),t=((p=g.theme)==null?void 0:p.timezone)||"UTC",a=_(t),n=new Set(U().filter(h=>h.token===e&&h.day<=a).map(h=>h.day));if(!n.size)return null;const r=[...n].sort()[0],[i,o,s]=a.split("-").map(Number),d=new Date(Date.UTC(i,o-1,s));let c=a;for(n.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));n.has(c)||hn(c);)d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return c<r?null:c}function wn(){return Xt()>0&&Qt()!==null}function Jo(e){if(Xt()<=0)return null;const t=Qt();if(!t)return null;const a=N(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,i=[n,...U()].filter(c=>{const p=`${c.day}|${c.token}`;return r.has(p)?!1:(r.add(p),!0)}).sort((c,p)=>c.day<p.day?1:c.day>p.day?-1:0);le(i);const o=fe(),d=Math.max(0,yn()-(o.used||0))===0&&ut()>0;return st({...o,used:d?o.used||0:(o.used||0)+1,birthdayBonus2026Used:d?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),Kt(be()),t}const vn=new Map;function re(e){vn.set(e,Date.now())}function mt(e,t=6e3){const a=vn.get(e);return typeof a=="number"&&Date.now()-a<t}function qe(){var e;return _(((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function xn(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:N()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Vo(e){if(!e||typeof e!="object"||mt("stimmung"))return;const t=qe();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){Ce()&&(En(),ea());return}Ce()!==a&&(Sn(a),Ue(a))}function kn(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(i,o)=>Math.round(o+(i-o)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function Ue(e){document.body.style.background=kn(e),Tn(e)}function ea(){document.body.style.removeProperty("background"),Tn(null)}function Ce(){try{const e=localStorage.getItem(_t);if(!e)return null;const t=JSON.parse(e);return t.day!==qe()?null:t.hex||null}catch{return null}}function Sn(e){try{localStorage.setItem(_t,JSON.stringify({day:qe(),hex:e}))}catch{}}function Zo(e){const t=qe();Sn(e),re("stimmung"),xn(t,e)}function En(){try{localStorage.removeItem(_t)}catch{}}function Xo(){const e=qe();En(),re("stimmung"),xn(e,"")}function Qo(){const e=Ce();e&&Ue(e)}function Tn(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Cn(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Ce()||"#4aaa5a";Ln(e,t),ta(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function es(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=Ce();t?Ue(t):ea()}function ts(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function i(o){ta(e,o),Ue(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),i(t.value)}),a&&a.addEventListener("input",()=>{const o=zn(a.value);o&&(t&&(t.value=o),i(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||zn((a==null?void 0:a.value)||"")||"#4aaa5a";Zo(o),Ue(o),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{Xo(),ea(),Ln(e,"#4aaa5a"),ta(e,"#4aaa5a")})}function Ln(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function ta(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=kn(t))}function zn(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,i]=a;return`#${n}${n}${r}${r}${i}${i}`.toLowerCase()}return null}function I(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const An={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function as(e){I(An[e]||An.soft)}function H(e){const t=z.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}const ie="fionn";function je(){try{return JSON.parse(window.localStorage.getItem(an)||"[]")||[]}catch{return[]}}function ht(e){try{window.localStorage.setItem(an,JSON.stringify(e))}catch{}g.werkstatt=e}function ft(e,t){return(g.werkstatt||[]).filter(a=>a&&a.categoryId===e&&(a.forToken||ie)===t)}function In(e){return{id:e.id,categoryId:e.categoryId,forToken:e.forToken,title:e.title,message:e.message,prompt:e.prompt,link:e.link,voucher:e.voucher,answer:e.answer,answeredAt:e.answeredAt,createdBy:e.createdBy,createdAt:e.createdAt}}function bt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:N(),...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function ns(e){const t=je(),a=t.findIndex(r=>r.id===e.id),n={id:e.id,categoryId:e.categoryId,forToken:e.forToken||ie,title:(e.title||"").trim(),message:(e.message||"").trim(),prompt:(e.prompt||"").trim()||null,link:(e.link||"").trim()||null,voucher:!!e.voucher,answer:(a===-1?null:t[a].answer)||null,answeredAt:(a===-1?null:t[a].answeredAt)||null,createdBy:N(),createdAt:(a===-1?new Date().toISOString():t[a].createdAt)||new Date().toISOString(),pendingSince:Date.now()};a===-1?t.unshift(n):t[a]=n,ht(t),re("werkstatt"),bt("werkstatt-upsert",In(n))}function rs(e,t){const a=je(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r=new Date().toISOString();a[n]={...a[n],answer:t,answeredAt:r,pendingSince:Date.now()},ht(a),re("werkstatt"),bt("werkstatt-answer",{id:e,answer:t,answeredAt:r})}function is(e){ht(je().filter(t=>t.id!==e)),re("werkstatt"),bt("werkstatt-delete",{id:e})}function os(e){if(!Array.isArray(e)||mt("werkstatt"))return;const t=e.filter(d=>d&&d.id&&d.categoryId&&d.title),a=new Map(t.map(d=>[d.id,d])),n=je().filter(d=>{if(!d.pendingSince)return!1;const c=a.get(d.id);return!c||(c.answer||null)!==(d.answer||null)});for(const d of n.slice(0,5))bt("werkstatt-upsert",In(d));const r=new Set,i=new Set,o=[],s=d=>`${d.forToken||ie}|${d.categoryId}|${String(d.title).trim().toLocaleLowerCase("de-CH")}`;for(const d of n)r.add(d.id),i.add(s(d)),o.push(d);for(const d of t)r.has(d.id)||i.has(s(d))||(r.add(d.id),i.add(s(d)),o.push(d));ht(o)}const W={categoryId:null,editingId:null};function We(){return g.outcomes&&g.outcomes.categories||[]}function Mn(){return ie.charAt(0).toLocaleUpperCase("de-CH")+ie.slice(1)}function yt(){const e=g.theme&&g.theme.features;return!e||e.werkstatt!==!1}function ss(){if(!yt())return;const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!1,W.categoryId=W.categoryId||We()[0]&&We()[0].id||null,Le(),Oe(),e.scrollIntoView({behavior:"smooth",block:"start"}),I(10))}function ds(){const e=document.getElementById("ag-werkstatt-panel");e&&(e.hidden=!0),Le()}function wt(){if(!yt())return;const e=document.querySelector("[data-ag-werkstatt-entry-sub]");if(!e)return;const t=(g.werkstatt||[]).filter(n=>(n.forToken||ie)===ie);if(!t.length){e.textContent="Noch keine — schreib die erste.";return}const a=new Set(t.map(n=>n.categoryId)).size;e.textContent=t.length===1?"1 Kapsel von dir in seiner Maschine.":`${t.length} Kapseln von dir, in ${a} ${a===1?"Kategorie":"Kategorien"}.`}function Oe(){wt();const e=document.getElementById("ag-werkstatt-tabs"),t=document.getElementById("ag-werkstatt-list"),a=document.getElementById("ag-werkstatt-note");if(!e||!t)return;const n=We();!W.categoryId&&n.length&&(W.categoryId=n[0].id),e.innerHTML="";for(const d of n){const c=ft(d.id,ie).length,p=document.createElement("button");p.type="button",p.className="ag-werkstatt-tab"+(d.id===W.categoryId?" is-active":""),p.dataset.agWerkstattCat=d.id,p.innerHTML=`${P(d.label)}${c?` <span class="ag-werkstatt-count">${c}</span>`:""}`,p.addEventListener("click",()=>{W.categoryId=d.id,cs()?$n():Le(),Oe(),I(6)}),e.appendChild(p)}const r=n.find(d=>d.id===W.categoryId),i=W.categoryId?ft(W.categoryId,ie):[],o=Mn();a&&(i.length===1?a.textContent=`${o} zieht hier nur noch deine eine Kapsel.`:i.length>1?a.textContent=`${o} zieht hier nur noch aus deinen ${i.length} Kapseln.`:a.textContent=`Noch nichts von dir — ${o} zieht hier aus den ${r?r.outcomes.length:0} Standardkapseln. Schreib eine, und sie gehört dir.`),t.innerHTML="",i.forEach((d,c)=>t.appendChild(ls(d,c)));const s=e.querySelector(".is-active");s&&e.scrollWidth>e.clientWidth&&e.scrollTo({left:Math.max(0,s.offsetLeft-(e.clientWidth-s.offsetWidth)/2),behavior:"smooth"})}function ls(e,t){const a=document.createElement("button");a.type="button",a.className="ag-werkstatt-card",a.style.setProperty("--ag-i",String(t)),a.setAttribute("aria-label",`${e.title} bearbeiten`);const n=e.pendingSince&&Date.now()-e.pendingSince>9e4,r=e.prompt&&e.answer?`<div class="ag-werkstatt-answer"><span class="ag-werkstatt-block-label">Seine Antwort</span>${P(e.answer)}</div>`:e.prompt?'<div class="ag-werkstatt-card-pending">Noch nicht beantwortet</div>':"";return a.innerHTML=`
    <div class="ag-werkstatt-card-title">${P(e.title)}</div>
    <div class="ag-werkstatt-card-msg">${P(e.message)}</div>
    ${e.prompt?`<div class="ag-werkstatt-card-prompt"><span class="ag-werkstatt-block-label">Frage</span>${P(e.prompt)}</div>`:""}
    ${r}
    <div class="ag-werkstatt-card-tags">
      ${e.voucher?'<span class="ag-werkstatt-tag is-voucher">Gutschein</span>':""}
      ${e.link?'<span class="ag-werkstatt-tag">Link</span>':""}
      ${n?'<span class="ag-werkstatt-tag is-unsent">Noch nicht übertragen</span>':""}
    </div>
  `,a.addEventListener("click",()=>Bn(e)),a}function cs(){const e=document.getElementById("ag-werkstatt-form");return!!e&&!e.hidden}function $n(){const e=document.getElementById("ag-werkstatt-form-title");if(!e)return;const t=We().find(n=>n.id===W.categoryId),a=W.editingId?"Kapsel bearbeiten":"Neue Kapsel";e.textContent=t?`${a} · ${t.label}`:a}function Bn(e){var i;const t=document.getElementById("ag-werkstatt-form"),a=document.getElementById("ag-werkstatt-add");if(!t)return;W.editingId=e?e.id:null,e&&e.categoryId&&(W.categoryId=e.categoryId),document.getElementById("ag-werkstatt-title").value=e?e.title:"",document.getElementById("ag-werkstatt-message").value=e?e.message:"",document.getElementById("ag-werkstatt-prompt").value=e&&e.prompt||"",document.getElementById("ag-werkstatt-link").value=e&&e.link||"",document.getElementById("ag-werkstatt-voucher").checked=!!(e&&e.voucher),$n();const n=document.getElementById("ag-werkstatt-error");n&&(n.hidden=!0);const r=document.getElementById("ag-werkstatt-delete");r&&(r.hidden=!e,r.textContent="Kapsel löschen",r.classList.remove("is-armed")),t.hidden=!1,a&&(a.hidden=!0),t.scrollIntoView({behavior:"smooth",block:"nearest"}),(i=document.getElementById("ag-werkstatt-title"))==null||i.focus(),I(8)}function Le(){const e=document.getElementById("ag-werkstatt-form"),t=document.getElementById("ag-werkstatt-add");e&&(e.hidden=!0),t&&(t.hidden=!1);const a=document.getElementById("ag-werkstatt-delete");a&&(a.hidden=!0,a.classList.remove("is-armed")),W.editingId=null}function gs(){const e=document.getElementById("ag-werkstatt-delete");if(!(!e||!W.editingId)){if(!e.classList.contains("is-armed")){e.classList.add("is-armed"),e.textContent="Wirklich löschen?",I(12);return}is(W.editingId),Le(),Oe(),I([12,40,12]),H("Kapsel gelöscht")}}function ps(){var m,f,b,y,w,E;const e=(((m=document.getElementById("ag-werkstatt-title"))==null?void 0:m.value)||"").trim(),t=(((f=document.getElementById("ag-werkstatt-message"))==null?void 0:f.value)||"").trim(),a=(((b=document.getElementById("ag-werkstatt-prompt"))==null?void 0:b.value)||"").trim(),n=(((y=document.getElementById("ag-werkstatt-link"))==null?void 0:y.value)||"").trim(),r=!!((w=document.getElementById("ag-werkstatt-voucher"))!=null&&w.checked),i=document.getElementById("ag-werkstatt-error");function o(v){i&&(i.textContent=v,i.hidden=!1),I([20,40,20])}if(!e)return o("Die Kapsel braucht einen Titel.");if(!t)return o("Schreib noch einen Satz dazu.");if(n&&!/^https?:\/\//i.test(n))return o("Der Link muss mit http:// oder https:// anfangen.");if(!W.categoryId)return o("Wähl zuerst eine Kategorie.");const s=v=>(v||"").trim().toLocaleLowerCase("de-CH"),d=s(e);if(ft(W.categoryId,ie).some(v=>v.id!==W.editingId&&s(v.title)===d))return o("Eine Kapsel mit diesem Titel gibt es hier schon.");if((((E=We().find(v=>v.id===W.categoryId))==null?void 0:E.outcomes)||[]).some(v=>s(v.title)===d))return o("So heisst schon eine Standardkapsel in dieser Kategorie.");ns({id:W.editingId||`k-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,categoryId:W.categoryId,forToken:ie,title:e,message:t,prompt:a,link:n,voucher:r});const h=!!W.editingId;Le(),Oe(),I([10,30,10]),H(h?"Kapsel geändert ✓":`Kapsel gespeichert — ${Mn()} kann sie ziehen ✓`)}let aa="",na=null;function us(e,t){aa=e,na=t}function ra(){if(na)return na();if(!aa)return window.location.href;try{return new URL(aa,window.location.href).toString()}catch{return window.location.href}}function X(e,t=null){const a=new URL(e,ra()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function vt(e){var t;try{const a=z&&z.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=g.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function Fe(){var e;try{const t=g.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=N(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,i=setTimeout(()=>r.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(i)}if(!o.ok)return vt(!1),!1;const s=await o.json();if(!s.ok)return vt(!1),!1;const d=_(((e=g.theme)==null?void 0:e.timezone)||"UTC"),c=U(),p=c.filter(f=>f.title!=="(wiederhergestellt)"&&f.day<=d);p.length!==c.length&&le(p);const h=he(),m=h.filter(f=>f.day<=d);if(m.length!==h.length&&rt(m),Array.isArray(s.history)&&s.history.length){const f=U(),b=new Map(f.map(w=>[`${w.day}|${w.token}`,w]));for(const w of s.history){if(w.title==="(wiederhergestellt)")continue;const E=wo(w.day);if(!E||E>d)continue;const v=typeof w.token=="string"?w.token.toLowerCase():w.token,x=`${E}|${v}`,T={...w,day:E,token:v},A=b.get(x);A&&A.bestanden&&!T.bestanden&&(T.bestanden=!0,T.bestandenAt=A.bestandenAt||null),A&&A.beweisUrl&&!T.beweisUrl&&(T.beweisUrl=A.beweisUrl),A&&A.reaction&&!T.reaction&&(T.reaction=A.reaction),b.set(x,T)}const y=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));le(y),g.syncedHistory=y,Kt(be())}if(Array.isArray(s.favourites)&&s.favourites.length){const f=he(),b=new Map(f.map(y=>[`${y.day}|${y.token}`,y]));for(const y of s.favourites){if(y.day>d)continue;const w=typeof y.token=="string"?y.token.toLowerCase():y.token;b.set(`${y.day}|${w}`,{...y,token:w})}rt(Array.from(b.values()).sort((y,w)=>w.day.localeCompare(y.day)))}if(s.tokens&&typeof s.tokens=="object"&&Lo(s.tokens)&&te(),typeof s.questPoints=="number"&&s.questPoints>gt()&&Po(s.questPoints),typeof s.streak=="number"&&s.streak>0&&Do(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const f=Jt();let b=!1;for(const[y,w]of Object.entries(s.baerlauchScores))typeof w=="number"&&w>(f[y]||0)&&(f[y]=w,b=!0);if(b)try{localStorage.setItem(Ya,JSON.stringify(f))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const f=ct(),b=new Map(f.map(w=>[`${w.day}|${w.player}`,w]));for(const w of s.missionLog)!w.day||!w.player||b.set(`${w.day}|${w.player}`,w);const y=Array.from(b.values()).sort((w,E)=>E.day.localeCompare(w.day));Yt(y)}if(typeof s.latestPing=="string"&&s.latestPing&&N()!=="fionn")try{const f="affektions-gacha:last-ping:v1",b=window.localStorage.getItem(f)||"";s.latestPing>b&&(window.localStorage.setItem(f,s.latestPing),g._newPing=!0)}catch{}if(s.stimmung)try{Vo(s.stimmung)}catch{}if(Array.isArray(s.werkstatt))try{os(s.werkstatt)}catch{}if(Array.isArray(s.gipfelbuch)&&!mt("gipfelbuch")){const f=s.gipfelbuch.filter(b=>b.id).sort((b,y)=>(y.date||"").localeCompare(b.date||""));lt(f)}return z&&z.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),vt(!0),Array.isArray(s.history)?s.history.length:0}catch{return vt(!1),-1}}function te(){try{const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=N(),a=U().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=he().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=Te(),i=_e(()=>tt(g)),o=i.solved&&i.pointsEarned&&!i._logged?{challenge:at(g),attempts:i.attempts,points:i.pointsEarned,period:i.period}:void 0;o&&(i._logged=!0,Vt(i));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:be(),tokens:r,questPoints:gt(),...o?{questLog:o}:{}}),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,d).then(()=>{ot(r)}).catch(()=>fetch(e.endpointUrl,{...d,mode:"no-cors"}).then(()=>{ot(r)}).catch(()=>{}))}catch{}}function Dn(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5),n=N();for(const r of t){const i=r.repeat==="yearly";if((r.date===e||i&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}const Nn=270;function ms(e,t){const a=U().filter(n=>n.token===e&&n.day<t&&typeof n.categoryId=="string"&&n.categoryId!=="special").sort((n,r)=>r.day.localeCompare(n.day)).slice(0,Nn);return a.length<Nn?!1:!a.some(n=>n.categoryId==="jackpot")}function Pn(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function hs(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function He(){return(g.photos||[]).filter(e=>e.type!=="video")}function fs(e,t){const a=ft(e.id,t);return a.length?a:e.outcomes}function _n(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,i=N(),o=`${g.theme.secret}|${i}|${e}${r?"|"+r:""}`,s=Dn(e);if(s&&!r){const k=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],D=k[et(`${o}|special|outcome`,k.length)],$={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:k},O=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&g.photos.length&&He().find(Y=>Y.alt===s.photoAlt)||null;return{day:e,token:i,category:$,outcome:D,photo:O,collectToken:D.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const d=r?null:Io(i,e),c=r?null:U().find(k=>k.token===i&&k.day===e);let p;d&&(p=g.outcomes.categories.find(k=>k.id===d.categoryId)),!p&&c&&c.categoryId&&(p=g.outcomes.categories.find(k=>k.id===c.categoryId)||null),p||(p=Yo(`${o}|category`,t||0,n,{token:i,day:e}),!r&&ms(i,e)&&(p=g.outcomes.categories.find(k=>k.id==="jackpot")||p));const h=yo();if(h){const k=g.outcomes.categories.find(D=>D.id===h);k&&(p=k)}p.id==="photo"&&!He().length&&(p=g.outcomes.categories.find(k=>k.id==="common")||p);const m=fs(p,i),f=new Set(U().filter(k=>k.token===i&&k.day<e&&k.categoryId===p.id).map(k=>k.title)),b=k=>k.filter(D=>!f.has(D.title)),y=b(m),w=y.length?[]:b(p.outcomes),E=y.length?y:w.length?w:m,x=(c&&c.categoryId===p.id?m.find(k=>k.title===c.title)||p.outcomes.find(k=>k.title===c.title):null)||d&&m.find(k=>k.title===d.outcomeTitle)||E[et(`${o}|${p.id}|outcome`,E.length)],T=He();let A=null;if(p.id==="photo"&&T.length){const k=new Set(U().filter(O=>O.token===i&&O.day<e&&O.photo).map(O=>O.photo.url)),D=T.filter(O=>!k.has(O.url)),$=D.length>0?D:T;A=$[et(`${o}|photo`,$.length)]}return{day:e,token:i,category:p,outcome:x,photo:A,collectToken:x.token||null,voucher:x.voucher||!1,freikarte:x.freikarte===!0}}function qn(){const e=Z()||_(g.theme.timezone),t=be();return _n(e,t)}function bs(e,t){return _n(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function ys(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function ws(e){const t=(r,i)=>z.style.setProperty(r,i),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Un={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},jn={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function vs(e){const t=Dn(e);if(!t)return;const a=(n,r)=>z.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))Un[n]&&typeof r=="string"&&a(Un[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))jn[n]&&typeof r=="string"&&a(jn[n],r)}const xs=`
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
    `;function ks(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=xs.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function Ss(){return`
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
    `}function Es(){return`
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
    `}const Ts=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${Ss()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${Es()}
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
    `;function Cs(){z.className="ag-widget",z.setAttribute("aria-labelledby","ag-title"),z.innerHTML=Ts}function Ls(e,t=1400,a=.82){return new Promise((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);try{const s=Math.min(1,t/Math.max(o.naturalWidth||1,o.naturalHeight||1)),d=Math.max(1,Math.round((o.naturalWidth||1)*s)),c=Math.max(1,Math.round((o.naturalHeight||1)*s)),p=document.createElement("canvas");p.width=d,p.height=c,p.getContext("2d").drawImage(o,0,0,d,c);const h=p.toDataURL("image/jpeg",a);if(!h||h==="data:,"){r(new Error("encode failed"));return}n(h)}catch(s){r(s)}},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("decode failed"))},o.src=i})}async function zs(e,t,a){const n=g.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await Ls(a),i=r.slice(r.indexOf(",")+1),o=new AbortController,s=setTimeout(()=>o.abort(),3e4);let d;try{d=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:o.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:i})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await d.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function ae(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let i=0;i<e;i++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,c=Math.random()*100,p=Math.random()*.6,h=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${d}px;height:${d*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${h}s ${p}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const i=document.createElement("style");i.id="ag-confetti-style",i.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(i)}setTimeout(()=>r.remove(),3e3)}const ze=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?","Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?","Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?","Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?","Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?","Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?","Welches Lied erinnert dich an uns, ohne dass ich das je wusste?","Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?","Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?","Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?","Woran merkst du, dass ich gerade einen guten Tag habe?","Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?","Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?","Was ist etwas, das du als Kind geliebt hast und heute vergisst?","Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?","Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?","Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?","Welcher Streit war im Nachhinein der nützlichste?","Was macht dich an mir manchmal nervös, und ist das schlimm?","Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?","Was ist dein Lieblingsbild von uns, und warum genau das?","Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?","Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?","Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?","Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?","Was wünschst du dir für mich, das nichts mit dir zu tun hat?","Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?","Was war das Erste, das dir an meiner Wohnung aufgefallen ist?","Welche Angewohnheit von mir hast du inzwischen übernommen?","Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?","Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?","Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?","Welcher Geruch gehört für dich zu mir?","Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?","Worauf freust du dich im Winter, worauf im Sommer?","Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?","Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?","Wann hast du zuletzt gedacht: genau das hier, so soll es sein?","Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?","Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?","Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?","Welchen Teil deines Alltags würdest du mir gern öfter zeigen?","Was glaubst du, worin ich dich unterschätze?","Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?","Welche Jahreszeit passt zu uns, und warum?","Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?","Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?","Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?","Was ist eine Tradition, die wir uns ausdenken sollten?","Was macht dich zuverlässig fröhlich, und mache ich davon genug?","Welche Seite von dir glaubst du, kenne ich noch gar nicht?","Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?","Was wäre dein perfekter Sonntagmorgen, bis ins Detail?","Was ist eine Sache, über die wir nie reden, und sollten wir?","Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?","Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?","Was würdest du gern öfter von mir hören?","Welche Ecke von Zürich fühlt sich am meisten nach uns an?","Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?","Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?","Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"],Wn=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],On="affektions-gacha:mission-done:v1",Fn="affektions-gacha:mission-feedback:v1";function ia(){var i,o;const e=(i=g.missions)==null?void 0:i.pairs;if(!Array.isArray(e)||!e.length)return null;const t=_(((o=g.theme)==null?void 0:o.timezone)||"UTC"),a=et(`${g.theme.secret}|mission|${t}`,e.length),n=e[a];return K()==="fionn"?n.fionn:n.lennart}function Hn(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${On}:${K()}`)===t}catch{return!1}}function As(){var e,t;try{const a=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${On}:${K()}`,a);const n=K(),r=ia(),i=new Date().toISOString();$s({day:a,player:n,mission:r,doneAt:i});const o=(t=g.backup)==null?void 0:t.endpointUrl;o&&r&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:r,doneAt:i}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function Rn(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${Fn}:${K()}`)===t}catch{return!1}}function Is(){var e;try{const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${Fn}:${K()}`,t)}catch{}}function Ms(e,t){var o,s;const a=_(((o=g.theme)==null?void 0:o.timezone)||"UTC"),n=K(),r=ia();Bs(a,n,{rating:e,comment:t||""}),Is();const i=(s=g.backup)==null?void 0:s.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:r,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function $s(e){const t=ct(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),Yt(t)}function Bs(e,t,a){const n=ct(),r=n.findIndex(i=>i.day===e&&i.player===t);r>=0&&(n[r]={...n[r],...a},Yt(n))}function Ds(e,t){var c;if(!e)return;const a=ct(),n=((c=g.theme)==null?void 0:c.timezone)||"UTC",r=_(n),i=new Map;for(const p of a)i.has(p.day)||i.set(p.day,{}),i.get(p.day)[p.player]=p;const o=Array.from(i.keys()).sort((p,h)=>h.localeCompare(p)).slice(0,30);if(!o.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},d=p=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(p+"T12:00:00Z"))}catch{return p}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+o.map(p=>{const h=i.get(p),m=h.lennart,f=h.fionn,b=p===r,y=[];if(m&&t!=="fionn"){const w=m.doneAt?'<span class="ag-log-done">✓</span>':"",E=m.rating?`<span class="ag-log-rating">${s[m.rating]||""}</span>`:"";y.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${P(m.mission||"")}</span>${w}${E}</div>`)}if(f&&t!=="lennart"){const w=f.doneAt?'<span class="ag-log-done">✓</span>':"",E=f.rating?`<span class="ag-log-rating">${s[f.rating]||""}</span>`:"";y.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${P(f.mission||"")}</span>${w}${E}</div>`)}return y.length?`<div class="ag-log-day${b?" ag-log-today":""}"><span class="ag-log-date">${d(p)}</span>${y.join("")}</div>`:""}).filter(Boolean).join("")}function Gn(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),r=l("#ag-mission-feedback-sent"),i=l("#ag-mission-done-note"),o=e.querySelector(".ag-mini-copy");o&&(o.hidden=!0);const s=ia();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const d=Hn(),c=Rn();a&&(a.hidden=d),n&&(n.hidden=!d,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(p=>{p.hidden=c})),r&&(r.hidden=!c),i&&(i.hidden=!d),e.querySelectorAll(".ag-mission-rate-btn").forEach(p=>p.classList.remove("is-selected")),Ds(l("#ag-mission-log"),K()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Ns(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let xt=-1;function Kn(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Va);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<ze.length){xt=a;const n=l("#ag-gesprach-question");n&&(n.textContent=ze[a]);return}}}catch{}Yn()}}function Ps(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function Yn(){let e;do e=Math.floor(Math.random()*ze.length);while(e===xt&&ze.length>1);xt=e;try{localStorage.setItem(Va,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=ze[e])}function _s(){const e=ze[xt]||"";if(!e)return;const t=g.theme&&g.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Jn(){var e;return!!((e=g.quest)!=null&&e.enabled&&at(g))}function Vn(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,Zn())}function qs(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function Zn(){const e=at(g),t=_e(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),r=l("#ag-quest-loading"),i=l("#ag-quest-actions"),o=l("#ag-quest-result"),s=l("#ag-quest-points"),d=l("#ag-quest-copy"),c=l("#ag-quest-title"),p=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),i&&(i.hidden=!0);return}if(a&&(a.textContent=p),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((h,m)=>`<div class="ag-hint-item"><span class="ag-hint-num">${m+1}</span><p>${h}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),i&&(i.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${gt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),i&&(i.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Us(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),r=l("#ag-quest-points"),i=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await js(e),s=_e(),d=at(g),c=(d==null?void 0:d.prompt)||"",p=(d==null?void 0:d.solution)||"";try{const h=await Ws(o,c,p,s.attempts+1,s.hints);if(s.attempts+=1,h.success){const m=Qa[Math.min(s.attempts-1,Qa.length-1)],f=No(m);s.solved=!0,s.pointsEarned=m,s.successMessage=h.message||"Perfekt.",Vt(s),te(),n&&(n.textContent=h.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${m} Punkte · Gesamt: ${f}`,r.hidden=!1),a&&(a.hidden=!0),i&&(i.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=l("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),I([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],h.hint||"Versuch nochmal."],Vt(s),Zn()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function js(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Ws(e,t,a,n,r){var s;const i=(s=g.quest)==null?void 0:s.proxyUrl;if(!i)throw new Error("no proxy");const o=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!o.ok)throw new Error("proxy error");return o.json()}function Os(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let c=0;c<n;c++)i[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(d),d.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,p,h,m,f])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(c,a+h),b.frequency.exponentialRampToValueAtTime(p,a+h+m*.55);const y=t.createGain();y.gain.setValueAtTime(0,a+h),y.gain.linearRampToValueAtTime(f,a+h+.09),y.gain.exponentialRampToValueAtTime(.001,a+h+m),b.connect(y),y.connect(t.destination),b.start(a+h),b.stop(a+h+m+.05)})}catch{}}function Fs(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const i=document.createElement("span");i.className="ag-letter-word",i.textContent=n,i.style.animationDelay=`${320+r*155}ms`,a.appendChild(i),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Xn(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function Qn(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),I([20,60,20]),Os();const t=l("#ag-letter-photo");if(t&&g.photos&&g.photos.length){const a=He(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Hs()}async function Hs(){var n;const e=l("#ag-letter-body");if(!e)return;Fs(e);const t=(n=g.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const i=await r.json();if(i.paragraphs&&i.paragraphs.length){Xn(e,i.paragraphs);return}}}catch{}const a=Wn[Math.floor(Math.random()*Wn.length)];Xn(e,a)}function oa(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let sa=null;function Rs(){if(!sa)try{sa=new(window.AudioContext||window.webkitAudioContext)}catch{}return sa}function Gs(){try{return window.localStorage.getItem(oo)!=="off"}catch{return!0}}function G(e,t,a,n,r=.15,i="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=i,o.frequency.value=t;const d=e.currentTime+a;s.gain.setValueAtTime(0,d),s.gain.linearRampToValueAtTime(r,d+.012),s.gain.exponentialRampToValueAtTime(1e-4,d+n),o.start(d),o.stop(d+n+.05)}function kt(e){if(!Gs())return;const t=Rs();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":G(t,280,0,.18,.08,"sine"),G(t,210,.12,.22,.06,"sine");break;case"cursed":G(t,220,0,.12,.1,"triangle"),G(t,170,.09,.28,.07,"triangle");break;case"uncommon":G(t,523,0,.14,.14,"sine"),G(t,784,.1,.22,.12,"sine");break;case"rare":G(t,523,0,.12,.14,"sine"),G(t,659,.09,.12,.14,"sine"),G(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>G(t,a,n*.09,.18,.13,"sine")),G(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>G(t,a,n*.08,.16,.13,"sine")),G(t,2093,.45,.5,.05,"sine");break;default:G(t,523,0,.12,.13,"sine"),G(t,659,.09,.18,.1,"sine");break}}function da(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=_(((e=g.theme)==null?void 0:e.timezone)||"UTC"),a=N(),r=U().some(i=>i.token===a&&i.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}const er="affektions-gacha:motion:v1",Ks=22,Ys=1500;let la=null,ca=null,ga=!1,tr=0;function ar(){try{return window.localStorage.getItem(er)||""}catch{return""}}function Js(e){try{window.localStorage.setItem(er,e)}catch{}}function Vs(e){const t=e.accelerationIncludingGravity;if(!t||t.x===null||Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z)<Ks)return;const n=Date.now();n-tr<Ys||(tr=n,la&&la())}function Zs(e){if(!ca||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));ca(t,a)}function pa(){ga||(ga=!0,window.addEventListener("devicemotion",Vs,{passive:!0}),window.addEventListener("deviceorientation",Zs,{passive:!0}),z&&z.classList.add("has-tilt"))}async function Xs(){const e=window.DeviceMotionEvent;if(!(e&&typeof e.requestPermission=="function")){pa();return}if(ar()!=="denied")try{const a=await e.requestPermission(),n=window.DeviceOrientationEvent;if(n&&typeof n.requestPermission=="function")try{await n.requestPermission()}catch{}Js(a==="granted"?"granted":"denied"),a==="granted"&&pa()}catch{}}function Qs({onShake:e,onTilt:t}={}){if(la=e||null,ca=t||null,typeof window>"u")return;const a=window.DeviceMotionEvent;if(!a)return;if(typeof a.requestPermission!="function"){pa();return}const n=()=>{Xs().then(()=>{(ga||ar()==="denied")&&document.removeEventListener("click",n)})};document.addEventListener("click",n)}const St={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function nr(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function ed(e){if(nr())return;const t=St[e]||St.soft;t.rumble!=="none"&&(z.classList.add("is-rumbling"),t.rumble==="hard"&&z.classList.add("is-rumbling-hard"))}function td(){z.classList.remove("is-rumbling","is-rumbling-hard")}function ua(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function rr(e=0){const t=z.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function ad(e){const t=St[e]||St.soft;if(nr()){ua(t.flash);return}rr(0),rr(160),ua(t.flash),t.double&&ua(t.flash,260),t.shutter&&z.classList.add("is-shutter"),setTimeout(()=>z.classList.remove("is-shutter"),700);try{ae(t.particles,t.palette)}catch{}}const nd=["So","Mo","Di","Mi","Do","Fr","Sa"];function rd(e){try{const[t,a,n]=_(e||"UTC").split("-").map(Number),r=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return nd[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(r)]||null}catch{return null}}function id(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function ir(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const i=id(n,t),o=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${P(n.when)}</span>`:"";return`
      <li class="ag-skin-step${i?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${P(n.name||"")}${o}</span>
          ${n.note?`<span class="ag-skin-note">${P(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${P(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function od(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=g.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=rd(g.theme&&g.theme.timezone);e.innerHTML=ir(t.morning,a)+ir(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${P(t.footer)}</p>`:"")}function or(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,od(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),I(10))}function sd(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}function dd(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function ma(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function ld(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${ma(r)}× ${n}`}return null}function cd(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const i=Number(r&&r.elevation);!Number.isFinite(i)||i<=0||(!a||i>a.h)&&(a={h:i,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${ma(n)}× euer höchster Gipfel (${a.name})`:`≈ ${ma(n)}× euer höchster Gipfel`}function gd(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,i]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+i+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function pd(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const i=r.indexOf("?"),o=i===-1?r:r.slice(0,i),s=i===-1?"":r.slice(i+1),d=new URLSearchParams(s);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),o+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),i=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${i}`)}const n=gd(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function ha(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function ud(e){const t=dt();t.unshift(e),lt(t),re("gipfelbuch"),ha("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function md(e){lt(dt().filter(t=>t.id!==e)),re("gipfelbuch"),ha("gipfel-delete",{id:e})}function hd(e,t){const a=dt(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,lt(a),re("gipfelbuch"),ha("gipfel-upsert",r)}function fd(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?fo(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?pd(e.activityUrl):null,i=e.cover?`<div class="ag-gipfel-cover"><img src="${P(e.cover)}" alt="${P(e.name||"")}" loading="lazy" decoding="async"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${P(e.distance)} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${P(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||d?`<div class="ag-gipfel-stats">${s}${s&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${i}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${po(e.date)}</div>
        <div class="ag-gipfel-name">${P(e.name||"—")}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${Ot(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${P(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${P(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${P(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const p=t.querySelector("[data-ag-gipfel-edit]");p&&p.addEventListener("click",()=>{var we;const b=l("[data-ag-berge-form]"),y=l("[data-ag-berge-add]");if(!b)return;const w=l("[data-ag-berge-edit-id]");w&&(w.value=e.id);const E=l("[data-ag-berge-name]");E&&(E.value=e.name||"");const v=l("[data-ag-berge-dist]");v&&(v.value=e.distance||"");const x=l("[data-ag-berge-gain]");x&&(x.value=e.elevGain||e.elevation||"");const T=l("[data-ag-berge-date]");T&&(T.value=e.date||"");const A=l("[data-ag-berge-url]");A&&(A.value=e.activityUrl||"");const k=l("[data-ag-berge-cover]");k&&(k.value=e.cover||"");const D=l("[data-ag-berge-notes]");D&&(D.value=e.notes||"");const $=l("[data-ag-berge-lat]");$&&($.value=e.lat||"");const O=l("[data-ag-berge-lng]");O&&(O.value=e.lng||"");const Y=l("[data-ag-berge-loc-label]");Y&&(Y.value=e.locLabel||"");const pe=l("[data-ag-loc-search]");pe&&(pe.value=e.locLabel||"");const de=l("[data-ag-berge-form-title]");de&&(de.textContent="Eintrag bearbeiten");const Q=l("[data-ag-berge-save] span:last-child");Q&&(Q.textContent="Speichern"),b.hidden=!1,y&&(y.hidden=!0),(we=l("[data-ag-sheet-backdrop]"))==null||we.classList.add("is-open"),b.scrollIntoView({behavior:"smooth",block:"nearest"}),E&&E.focus(),I(8)});const h=t.querySelector("[data-ag-gipfel-delete]");h&&h.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(md(e.id),Re(),I(8),Promise.resolve().then(()=>_d).then(b=>b.showToast("Eintrag gelöscht")).catch(()=>{}))});const m=t.querySelector("[data-ag-map-komoot]");m&&m.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,m.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,m.textContent="Karte schließen",I(4)}});const f=t.querySelector("[data-ag-map-alltrails]");return f&&r&&f.addEventListener("click",()=>{const b=t.querySelector("[data-ag-map-wrap-alltrails]");if(b){if(!b.hidden){b.hidden=!0,f.textContent="🗺 AllTrails-Karte";return}b.innerHTML=`<iframe src="${P(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,f.textContent="Karte schließen",I(4)}}),t}function Re({loading:e=!1}={}){const t=l("[data-ag-berge-list]"),a=l("[data-ag-berge-empty]"),n=l("[data-ag-berge-total]"),r=l("[data-ag-berge-analogy]"),i=l("[data-ag-berge-total-dist]"),o=l("[data-ag-berge-dist-analogy]"),s=l("[data-ag-berge-gipfel-cmp]");if(!t)return;const d=dt().sort((h,m)=>{const f=h.date||"",b=m.date||"";return b<f?-1:b>f?1:0});t.innerHTML="";const c=d.reduce((h,m)=>h+(Number(m.elevGain)||Number(m.elevation)||0),0);if(n&&(n.textContent=c>0?Ot(c):"— m"),r){const h=dd(c);h?(r.textContent=h,r.hidden=!1):r.hidden=!0}const p=d.reduce((h,m)=>{const f=Number(m.distance);return h+(Number.isFinite(f)&&f>0?f:0)},0);if(i&&(i.textContent=p>0?`${uo(p)} km`:"— km"),o){const h=ld(p);h?(o.textContent=h,o.hidden=!1):o.hidden=!0}if(s){const h=cd(c,d);h?(s.textContent=h,s.hidden=!1):s.hidden=!0}if(!d.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),sr([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),d.forEach(h=>t.appendChild(fd(h))),sr(d)}function bd(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const i=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");i&&(i.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const i=t.value.trim();if(!i){r();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(c=>{const p=document.createElement("button");p.type="button",p.className="ag-location-result",p.textContent=c.display_name,p.addEventListener("click",()=>{const h=e.querySelector("[data-ag-berge-lat]"),m=e.querySelector("[data-ag-berge-lng]"),f=e.querySelector("[data-ag-berge-loc-label]");h&&(h.value=c.lat),m&&(m.value=c.lon),f&&(f.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(p)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!a.contains(i.target)&&(a.hidden=!0)})}function yd(){bd(z)}let oe=null,Et=null;function fa(){oe&&setTimeout(()=>oe.invalidateSize(),150)}async function wd(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function sr(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await wd()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const i=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!oe){oe=n.map(r).fitBounds(i),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(oe);const s=t.querySelectorAll("[data-map-view]");s.forEach(d=>{d.addEventListener("click",()=>{s.forEach(p=>p.classList.remove("is-active")),d.classList.add("is-active");const c=d.dataset.mapView==="eu"?o:i;oe.fitBounds(c)})})}Et?Et.clearLayers():Et=n.layerGroup().addTo(oe),a.forEach(s=>{const d=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const p=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${P(s.name||"—")}</div>
      ${p?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Ot(p)}</div>`:""}
    `;const h=document.createElement("button");h.type="button",h.textContent="Zum Eintrag",h.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",h.addEventListener("click",()=>{d.closePopup();const m=z.querySelector(`[data-ag-gipfel-id="${s.id}"]`);m&&(m.scrollIntoView({behavior:"smooth",block:"center"}),m.classList.add("ag-gipfel-highlight"),setTimeout(()=>m.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(h),d.bindPopup(c),Et.addLayer(d)}),requestAnimationFrame(()=>{oe&&oe.invalidateSize()}),setTimeout(()=>{oe&&oe.invalidateSize()},250)}const dr=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function lr(e){return dr[Math.min(e-1,dr.length-1)]}function Ae(e,t){return e+Math.random()*(t-e)}function cr(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${g.baerlauch.level}`)}function Ge(){g.baerlauch.timerId&&(clearInterval(g.baerlauch.timerId),g.baerlauch.timerId=null)}function gr(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");o&&(o.hidden=!0),Ge(),g.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),i&&(i.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),pr(K(),g.baerlauch.level,!1),ya()}function vd(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),r=l("#ag-baerlauch-actions"),i=l("#ag-baerlauch-next");Ge(),g.baerlauch.level+=1;const o=Sd(K(),g.baerlauch.level);if(pr(K(),g.baerlauch.level,!0),ya(),cr(),o&&ae(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&g.photos&&g.photos.length){const s=He(),d=s.length?s[Math.floor(Math.random()*s.length)]:null;Mr(a,d),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}i&&(i.textContent=`Level ${g.baerlauch.level} starten`),r&&(r.hidden=!1)}function xd(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),r=lr(g.baerlauch.level).timeMs;g.baerlauch.durationMs=r,g.baerlauch.startedAt=performance.now(),Ge(),g.baerlauch.timerId=setInterval(()=>{const i=performance.now()-g.baerlauch.startedAt,o=Math.max(0,r-i),s=Math.min(1,i/r);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);d.forEach(p=>{p.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,p.style.opacity=String(1-c*.28)}),o<=0&&(Ge(),e())},50)}function ba(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!i)return;if(e.hidden=!1,ya(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),g.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",i.textContent="",o&&(o.hidden=!0),cr();const s=lr(g.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],p=[...d.slice(0,s.good).map(f=>({emoji:f,good:!0})),...c.slice(0,s.bad).map(f=>({emoji:f,good:!1}))];let h=0;const m=p.filter(f=>f.good).length;p.forEach(f=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=f.emoji,b.dataset.good=f.good?"true":"false",b.style.left=`${Ae(8,82)}%`,b.style.top=`${Ae(10,72)}%`,b.style.setProperty("--dx",`${Ae(-320,320)}px`),b.style.setProperty("--dy",`${Ae(-220,220)}px`),b.style.setProperty("--dur",`${Ae(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${Ae(-1.8,0)}s`),b.addEventListener("click",()=>{g.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,h+=1,setTimeout(()=>b.remove(),140),h===m&&vd()):gr("poison"))}),t.appendChild(b)}),xd(()=>gr("timeout"))}function kd(){const e=l("#ag-baerlauch-panel");Ge(),e&&(e.hidden=!0)}function Sd(e,t){var r;const a=Jt(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const i=(r=g.backup)==null?void 0:r.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function pr(e,t,a){var o;const n=un(),r=((o=g.theme)==null?void 0:o.timezone)||"UTC",i=_(r);n.unshift({date:i,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function ya(){var h;const e=l("#ag-baerlauch-scores");if(!e)return;const a=K()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",r=Jt(),i=un(),o=a==="fionn"?"lennart":"fionn",s=a in r||o in r;if(!s&&!i.length){e.hidden=!0;return}e.hidden=!1;const d=((h=g.theme)==null?void 0:h.timezone)||"UTC",c=m=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:d}).format(new Date(m+"T12:00:00Z"))}catch{return m}};let p="";if(s){const m=r[a]??0,f=r[o]??0;p+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${m||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${f||"—"}</span></div>
    </div>`}if(i.length){const m=i.slice(0,8).map(f=>{const b=f.player===a,y=b?"ag-score-mine":"ag-score-theirs",w=b?"Du":n,E=f.won?`✓ Level ${f.level}`:`✗ Level ${f.level-1>=1?f.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(f.date)}</span><span class="ag-score-pill ${y}">${w}</span><span class="ag-score-result">${E}</span></div>`}).join("");p+=`<div class="ag-score-table">${m}</div>`}e.innerHTML=p}const B={recorder:null,audioBlob:null,lang:"swabian"};function Tt(){try{return JSON.parse(window.localStorage.getItem(en)||"[]")||[]}catch{return[]}}function Ct(e){try{window.localStorage.setItem(en,JSON.stringify(e))}catch{}}function Ed(e){const t=Tt();t.unshift(e),Ct(t),re("glossary"),wa("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Td(e,t){const a=Tt(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,Ct(a),re("glossary"),wa("glossary-upsert",r)}function Cd(e){Ct(Tt().filter(t=>t.id!==e)),re("glossary"),wa("glossary-delete",{id:e})}let Lt=!1;async function ur(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=N(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let i;try{i=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!i.ok)return 0;const o=await i.json();return!o.ok||!Array.isArray(o.glossary)?0:(mt("glossary")||Ct(o.glossary.filter(s=>s.id)),o.glossary.length)}catch{return 0}}function wa(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:N(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function va(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Ld(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return va(e);try{const n=await va(e),r=n.split(",")[1],i=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:N(),filename:`glossary-${t}.webm`,mimeType:i,data:r}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return d.ok&&d.url?d.url:n}catch{return va(e)}}const zd={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function Ad(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${P(zd[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
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
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),I(6)});const i=a.querySelector("[data-ag-glossary-edit]");i&&i.addEventListener("click",()=>{var m;const s=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const p=document.getElementById("ag-glossary-save-label");p&&(p.textContent="Speichern");const h=document.getElementById("ag-glossary-audio-status");h&&(h.textContent=e.audioUrl?"Aufnahme vorhanden":""),B.audioBlob=null,s.hidden=!1,d&&(d.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(m=document.getElementById("ag-glossary-word-input"))==null||m.focus(),I(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(Cd(e.id),xe(B.lang),I(8))}),a}function xe(e){var o;B.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===B.lang)}),mr();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),r=Tt(),i=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===B.lang);if(t.innerHTML="",!i.length){a&&(a.textContent=n?"Kein Treffer.":Lt?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",Lt&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),i.forEach(s=>t.appendChild(Ad(s,!!n)))}function mr(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function hr(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),B.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),Lt=!0,xe("swabian"),window.requestAnimationFrame(()=>mr()),I(10),ur().catch(()=>0).then(()=>{Lt=!1,xe(B.lang)})}function Id(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null}const fr=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],br=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function yr(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(Ee)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(Ee,"granted")}catch{}await ka();return}if(e==="denied"){try{window.localStorage.setItem(Ee,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function Md(){var s;const e=((s=g.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,i=8*60,o=r<i?i-r:24*60-r+i;return Date.now()+o*60*1e3}async function xa(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=N(),r=_(a);if(U().some(h=>h.token===n&&h.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=Pe(a);if(o>=21)return;const d=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=Je(),p=br[on(br)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:p.title.replace("{name}",c),body:p.body.replace("{name}",c)})}catch{}}async function $d(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=Je(),i=fr[on(fr)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Md(),title:i.title.replace("{name}",r),body:i.body.replace("{name}",r)}),(t=g.quest)!=null&&t.enabled&&Jn()){const o=_e(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==tt(g)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(tt(g)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:g.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:g.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Bd(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function ka(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",ra()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await $d(),await xa(),await Bd(),await Pd())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Dd(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Ee,"dismissed")}catch{}return}try{window.localStorage.setItem(Ee,"granted")}catch{}await ka()}function Nd(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}async function Pd(){const e=g.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Nd(e.vapidPublicKey)}));const n=g.backup&&g.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:N(),subscription:a.toJSON()}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,i).catch(()=>fetch(n,{...i,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}function Ke(e){g.activeTab=e,z.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=z.querySelector(".ag-bottomnav-btn.is-active"),r=z.querySelector(".ag-nav-pill");if(r&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const p=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${p-a/2}px`}}for(const o of["today","history","lieblinge","berge"]){const s=l(`[data-ag-panel-${o}]`);if(!s)continue;const d=e===o;d&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!d}e==="history"&&ne(),e==="lieblinge"&&$t(),e==="berge"&&(fa(),Re({loading:!0}),fa(),Fe().catch(()=>{}).then(()=>{Re(),fa()}));const i=l("[data-ag-fab]");i&&(i.hidden=e!=="berge")}function wr(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:N(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,r).then(i=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...r,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function Ie(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function vr(){const e=g.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:N(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Ie("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){Ie("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Ie("Stups wird gesendet…","pending");const i=JSON.stringify(n),o=()=>{Ie("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{Ie("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(d=>{d&&d.ok?o():s()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(o).catch(s)}catch{s()}})}function xr(e){const t=N();if(t==="fionn")return;const a=g.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const i=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:i,message:i,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,d).catch(()=>{fetch(n,{...d,mode:"no-cors"}).catch(()=>{})})}function Sa(e){const t=g.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:N(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),i=o=>{const s=Gt();!s||s.week!==e.week||(pn({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),Ba())};i("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o=>{o&&o.ok?i("sent"):i("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>i("sent")).catch(()=>i("failed"))}catch{i("failed")}})}function kr(){const e=Gt();!e||e.week!==Ft()||e.remoteStatus!=="sent"&&Sa(e)}function Ea(e,t,a,n,r,i){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,i);else{const o=Array.isArray(i)?i:[i,i,i,i],[s,d,c,p]=o.map(h=>Math.min(h,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+p,a+r),e.quadraticCurveTo(t,a+r,t,a+r-p),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function zt(e,t,a){const n=t.split(" "),r=[];let i="";for(const o of n){const s=i?`${i} ${o}`:o;e.measureText(s).width>a&&i?(r.push(i),i=o):i=s}return i&&r.push(i),r}function Sr(e){var A,k;const r=document.createElement("canvas"),i=Math.min(window.devicePixelRatio||1,2);r.width=640*i,r.height=340*i,r.style.width="640px",r.style.height="340px";const o=r.getContext("2d");o.scale(i,i);const s=e.category.id==="jackpot",d=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",p=o.createLinearGradient(0,0,0,340);p.addColorStop(0,d),p.addColorStop(1,c),o.fillStyle=p,Ea(o,0,0,640,340,20),o.fill();const h=s?"#b9782e":"#2f7a4f";o.fillStyle=h,Ea(o,0,0,640,5,[20,20,0,0]),o.fill();const m=e.category.label,f=Pn(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${f} ${m}`,40,62);const b=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const y=o.measureText(b).width;o.fillText(b,600-y,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const w=zt(o,e.outcome.title,640-40*2);let E=108;for(const D of w)o.fillText(D,40,E),E+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const v=zt(o,e.outcome.message,640-40*2);E+=4;for(const D of v){if(E>270)break;o.fillText(D,40,E),E+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const x=((k=(A=g.theme)==null?void 0:A.brand)==null?void 0:k.machineName)||"Affektions-Gacha";o.fillText(x,40,324);const T=document.createElement("a");T.download=`gacha-${e.category.id}-${e.day}.png`,T.href=r.toDataURL("image/png"),T.click()}async function Er(e){var E,v;const r=document.createElement("canvas");r.width=1170,r.height=2532;const i=r.getContext("2d"),o=new Image;o.crossOrigin="anonymous";try{await new Promise((x,T)=>{o.onload=x,o.onerror=T,o.src=e.photo.url})}catch{H("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/o.naturalWidth,2532/o.naturalHeight),d=o.naturalWidth*s,c=o.naturalHeight*s;i.drawImage(o,(1170-d)/2,(2532-c)/2,d,c);const p=i.createLinearGradient(0,2532*.62,0,2532);p.addColorStop(0,"rgba(8,20,14,0)"),p.addColorStop(1,"rgba(8,20,14,.82)"),i.fillStyle=p,i.fillRect(0,2532*.62,1170,2532*.38);const h=e.photo.caption||e.photo.alt||"";i.font="500 56px Boska, Georgia, serif",i.fillStyle="#fffdf2";const m=zt(i,h,1170-96*2).slice(0,3);let f=2276-(m.length-1)*68;for(const x of m)i.fillText(x,96,f),f+=68;i.font="500 34px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,.62)",i.fillText(e.day,96,2356),i.fillStyle="rgba(255,255,255,.35)",i.font="28px Satoshi, Inter, system-ui, sans-serif",i.fillText(((v=(E=g.theme)==null?void 0:E.brand)==null?void 0:v.machineName)||"Affektions-Gacha",96,2406);let b;try{b=await new Promise((x,T)=>r.toBlob(A=>A?x(A):T(new Error("blob")),"image/jpeg",.92))}catch{H("Dieses Foto lässt sich nicht exportieren (CORS).");return}const y=new File([b],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[y]}))try{await navigator.share({files:[y],title:h});return}catch(x){if(x&&x.name==="AbortError")return}const w=document.createElement("a");w.download=y.name,w.href=URL.createObjectURL(b),w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),4e3)}function Ta(e){z.style.opacity="1",z.style.background="#0a1410",z.style.minHeight="100vh",z.style.display="flex",z.style.alignItems="center",z.style.justifyContent="center",z.style.padding="24px",z.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${P(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function Tr(){g.todaysPull||(g.todaysPull=qn()),ke(g.todaysPull),z.classList.add("is-revealed","has-drawn");const e=l("[data-ag-button-text]");e&&(e.textContent=g.theme.brand.buttonShown),g.revealed=!0}function Ye(){var m,f,b,y;g.todaysPull||(g.todaysPull=qn());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=g.theme.loadingSteps||["Maschine rattert"];let n=0;z.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((g.theme.revealDelayMs||3200)/a.length))),i=g.theme.revealDelayMs||3200,o=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(w=>parseFloat(w.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let c;function p(w){const E=Math.min((w-d)/i,1),v=1+5*E*E;o.forEach((x,T)=>{x.style.setProperty("--ag-emoji-duration",`${(s[T]/v).toFixed(3)}s`)}),E<1&&(c=requestAnimationFrame(p))}c=requestAnimationFrame(p);const h=((f=(m=g.todaysPull)==null?void 0:m.category)==null?void 0:f.id)==="special"?"special":(y=(b=g.todaysPull)==null?void 0:b.category)==null?void 0:y.tone;window.setTimeout(()=>ed(h),Math.max(0,i-900)),window.setTimeout(()=>{var T,A,k,D;window.clearInterval(r),cancelAnimationFrame(c),td(),ad(h),o.forEach(($,O)=>{$.style.setProperty("--ag-emoji-duration",`${s[O].toFixed(2)}s`)});const w=U().some($=>$.day===g.todaysPull.day&&$.token===g.todaysPull.token);g.todaysPull.collectToken&&!w&&ln(g.todaysPull.collectToken),g.todaysPull.freikarte&&!w&&gn(g.todaysPull.token),ke(g.todaysPull),z.classList.remove("is-revealing"),z.classList.add("is-revealed"),z.classList.add("has-drawn"),e.disabled=!1,t.textContent=g.theme.brand.buttonShown,g.revealed=!0,Z()||il(g.todaysPull),da(),xa();const E=be();Ve(),Gd(E),window.setTimeout(()=>{try{l("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const v=(A=(T=g.todaysPull)==null?void 0:T.category)==null?void 0:A.id,x=(D=(k=g.todaysPull)==null?void 0:k.category)==null?void 0:D.tone;if(v==="special"){const $=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ae(130,$),setTimeout(()=>ae(90,$),700),kt("special")}else if(x==="jackpot"){const $=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ae(120,$),setTimeout(()=>ae(80,$),650),kt("jackpot")}else x==="rare"?(ae(70),kt("rare")):kt(x||"common");Z()||Promise.resolve().then(()=>$l).then($=>$.flashLightsForPull(v==="special"?"special":x)).catch(()=>{}),zr[E]?I([30,20,30,20,60]):as(v==="special"?"special":x),g.activeTab==="history"&&ne(),yr()},g.theme.revealDelayMs||3200)}function Cr(){var Yr,Jr,Vr,Zr,Xr,Qr,ei,ti,ai,ni,ri,ii,oi,si,di,li,ci,gi,pi,ui,mi,hi,fi,bi,yi,wi,vi,xi,ki,Si,Ei,Ti,Ci,Li,zi,Ai,Ii,Mi,$i,Bi,Di,Ni,Pi,_i,qi,Ui,ji,Wi,Oi;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(Qn,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,Qn();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{I(12),Ye()}),Qs({onShake:()=>{z.classList.contains("has-drawn")||z.classList.contains("is-revealing")||Z()||(I(12),Ye())},onTilt:(u,S)=>{z.style.setProperty("--ag-foil-x",u.toFixed(1)+"%"),z.style.setProperty("--ag-foil-y",S.toFixed(1)+"%")}}),(Yr=l("#ag-btn-rave"))==null||Yr.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Jr=l("#ag-btn-rave"))==null||Jr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Vr=l("#ag-btn-baerlauch"))==null||Vr.addEventListener("click",ba),(Zr=l("#ag-baerlauch-close"))==null||Zr.addEventListener("click",kd),(Xr=l("#ag-baerlauch-next"))==null||Xr.addEventListener("click",ba),(Qr=l("#ag-btn-baerlauch"))==null||Qr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),ba())}),(ei=l("#ag-btn-gesprach"))==null||ei.addEventListener("click",Kn),(ti=l("#ag-btn-glossary"))==null||ti.addEventListener("click",hr),(ai=l("#ag-btn-glossary"))==null||ai.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),hr())}),(ni=l("#ag-glossary-close"))==null||ni.addEventListener("click",Id),(ri=document.getElementById("ag-glossary-refresh"))==null||ri.addEventListener("click",async()=>{const u=document.getElementById("ag-glossary-refresh");u&&(u.disabled=!0,u.textContent="⏳"),I(6);const S=await ur();xe(B.lang),u&&(u.textContent=S>0?`↻${S}`:"↻",setTimeout(()=>{u.textContent="↻",u.disabled=!1},3e3)),S>0&&H(`${S} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(u=>{u.addEventListener("click",()=>{const S=document.getElementById("ag-glossary-search");S&&(S.value=""),xe(u.dataset.lang),I(4)})}),(ii=document.getElementById("ag-glossary-search"))==null||ii.addEventListener("input",()=>{xe(B.lang)});const r=document.getElementById("ag-glossary-add"),i=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var M,q;if(!i)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const u=document.getElementById("ag-glossary-form-title");u&&(u.textContent="Neues Wort");const S=document.getElementById("ag-glossary-save-label");S&&(S.textContent="Eintragen");const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent=""),B.audioBlob=null;const L=document.getElementById("ag-glossary-play-preview");L&&(L.hidden=!0),i.hidden=!1,r.hidden=!0,(M=l("[data-ag-sheet-backdrop]"))==null||M.classList.add("is-open"),(q=document.getElementById("ag-glossary-word-input"))==null||q.focus(),I(8)}),(oi=document.getElementById("ag-glossary-form-cancel"))==null||oi.addEventListener("click",()=>{var u;if(i&&(i.hidden=!0),r&&(r.hidden=!1),(u=l("[data-ag-sheet-backdrop]"))==null||u.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder&&B.recorder.state!=="inactive")try{B.recorder.stop()}catch{}B.recorder=null,I(6)}),(si=document.getElementById("ag-glossary-form-save"))==null||si.addEventListener("click",async()=>{var q,j,V,R,ue;const u=(((q=document.getElementById("ag-glossary-word-input"))==null?void 0:q.value)||"").trim(),S=(((j=document.getElementById("ag-glossary-meaning-input"))==null?void 0:j.value)||"").trim(),C=(((V=document.getElementById("ag-glossary-edit-id"))==null?void 0:V.value)||"").trim();if(!u){(R=document.getElementById("ag-glossary-word-input"))==null||R.focus();return}const L=document.getElementById("ag-glossary-audio-status");let M=null;if(B.audioBlob){L&&(L.textContent="Wird hochgeladen…");const F=C||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;M=await Ld(B.audioBlob,F)}if(I([20,20,40]),C){const F={word:u,meaning:S||null};M!==null&&(F.audioUrl=M),Td(C,F)}else Ed({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:B.lang,word:u,meaning:S||null,audioUrl:M,token:N()});i&&(i.hidden=!0),r&&(r.hidden=!1),(ue=l("[data-ag-sheet-backdrop]"))==null||ue.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",B.audioBlob=null,B.recorder=null,xe(B.lang),H("Wort gespeichert ✓")});const o=document.getElementById("ag-glossary-record");o&&o.addEventListener("click",async()=>{if(B.recorder&&B.recorder.state==="recording"){B.recorder.stop();return}try{const u=await navigator.mediaDevices.getUserMedia({audio:!0}),S=[];B.recorder=new MediaRecorder(u),B.recorder.ondataavailable=L=>{L.data.size>0&&S.push(L.data)},B.recorder.onstop=()=>{u.getTracks().forEach(q=>q.stop()),B.audioBlob=new Blob(S,{type:B.recorder.mimeType||"audio/webm"});const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="✓ Aufnahme bereit");const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!1),o.textContent="🎙 Neu aufnehmen"},B.recorder.start(),o.textContent="⏹ Stop";const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent="● REC"),I(10)}catch{const S=document.getElementById("ag-glossary-audio-status");S&&(S.textContent="Mikrofon nicht verfügbar")}}),(di=document.getElementById("ag-glossary-play-preview"))==null||di.addEventListener("click",()=>{if(!B.audioBlob)return;const u=URL.createObjectURL(B.audioBlob),S=new Audio(u);S.onended=()=>URL.revokeObjectURL(u),S.play().catch(()=>{})}),(li=l("#ag-btn-mission"))==null||li.addEventListener("click",Gn),(ci=l("#ag-btn-mission"))==null||ci.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Gn())}),(gi=l("#ag-mission-close"))==null||gi.addEventListener("click",Ns),(pi=l("#ag-mission-done"))==null||pi.addEventListener("click",()=>{As();const u=l("#ag-mission-actions"),S=l("#ag-mission-feedback"),C=l("#ag-mission-done-note"),L=l("#ag-btn-mission");u&&(u.hidden=!0),C&&(C.hidden=!1),S&&!Rn()&&(S.hidden=!1),L&&L.classList.remove("ag-chip-mission-active")}),(ui=l("#ag-mission-panel"))==null||ui.querySelectorAll(".ag-mission-rate-btn").forEach(u=>{u.addEventListener("click",()=>{var S;(S=l("#ag-mission-panel"))==null||S.querySelectorAll(".ag-mission-rate-btn").forEach(C=>C.classList.remove("is-selected")),u.classList.add("is-selected")})}),(mi=l("#ag-mission-feedback-send"))==null||mi.addEventListener("click",()=>{var q;const u=l("#ag-mission-panel"),S=u==null?void 0:u.querySelector(".ag-mission-rate-btn.is-selected"),C=(S==null?void 0:S.dataset.rating)||null,L=(((q=l("#ag-mission-comment"))==null?void 0:q.value)||"").trim();Ms(C,L);const M=l("#ag-mission-feedback-sent");u==null||u.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(j=>{j.hidden=!0}),M&&(M.hidden=!1)}),(hi=l("#ag-letter-close"))==null||hi.addEventListener("click",oa),(fi=l("#ag-letter-overlay"))==null||fi.addEventListener("click",u=>{u.target===u.currentTarget&&oa()}),(bi=l("#ag-lightbox-close"))==null||bi.addEventListener("click",()=>{Aa()}),(yi=l("#ag-lightbox"))==null||yi.addEventListener("click",u=>{u.target===u.currentTarget&&Aa()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&(oa(),Aa())}),(wi=l("#ag-gesprach-close"))==null||wi.addEventListener("click",Ps),(vi=l("#ag-gesprach-next"))==null||vi.addEventListener("click",Yn),(xi=l("#ag-gesprach-wa"))==null||xi.addEventListener("click",_s),(ki=l("#ag-btn-gesprach"))==null||ki.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Kn())}),(Si=l("#ag-btn-quest"))==null||Si.addEventListener("click",Vn),(Ei=l("#ag-quest-close"))==null||Ei.addEventListener("click",qs),(Ti=l("#ag-btn-quest"))==null||Ti.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Vn())}),(Ci=l("#ag-quest-file"))==null||Ci.addEventListener("change",u=>{const S=u.target.files&&u.target.files[0];S&&Us(S)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!g.todaysPull)return;I(8);const u=$r(g.todaysPull);try{await navigator.clipboard.writeText(u),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",u)}}),l("[data-ag-save-img]").addEventListener("click",()=>{g.todaysPull&&(I(8),Sr(g.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{I(8),rl(g.todaysPull)}),(Li=l("[data-ag-wallpaper]"))==null||Li.addEventListener("click",()=>{!g.todaysPull||!g.todaysPull.photo||(I(8),Er(g.todaysPull))});const s=l("[data-ag-sync-status]");if(s){let u=null;s.addEventListener("click",()=>{s.classList.add("is-open"),clearTimeout(u),u=setTimeout(()=>s.classList.remove("is-open"),2500)})}const d=l("[data-ag-ferien-toggle]"),c=l("[data-ag-ferien-body]");d&&c&&d.addEventListener("click",()=>{const u=c.hidden;c.hidden=!u,d.setAttribute("aria-expanded",String(u)),I(6)}),(zi=l("[data-ag-ferien-add]"))==null||zi.addEventListener("click",()=>{var L,M;const u=(((L=l("[data-ag-ferien-from]"))==null?void 0:L.value)||"").trim(),S=(((M=l("[data-ag-ferien-to]"))==null?void 0:M.value)||u).trim();if(!u){H("Erst ein Datum wählen");return}if(!Wo(u,S)){H("Höchstens 60 Tage am Stück");return}I([12,20,12]),$a(),Ve()});const p=l("[data-capsule]");if(p){let S=null,C=null,L=!1,M=0;const q=()=>!z.classList.contains("has-drawn")&&!z.classList.contains("is-revealing")&&!Z(),j=()=>{clearTimeout(S),clearInterval(C),S=C=null,M=0,z.classList.remove("is-charging","is-charged")};p.addEventListener("pointerdown",R=>{q()&&(R.preventDefault(),L=!1,z.classList.add("is-charging"),C=setInterval(()=>{M++,I(6+M*2)},130),S=setTimeout(()=>{L=!0,z.classList.add("is-charged"),I([20,30,40])},650))});const V=()=>{const R=L&&q();j(),L=!1,R&&Ye()};p.addEventListener("pointerup",V),p.addEventListener("keydown",R=>{(R.key==="Enter"||R.key===" ")&&q()&&(R.preventDefault(),I(12),Ye())}),p.addEventListener("pointercancel",()=>{j(),L=!1}),p.addEventListener("pointerleave",()=>{j(),L=!1})}(Ai=l("[data-ag-freikarte-redeem]"))==null||Ai.addEventListener("click",()=>{const u=g.todaysPull;if(!u)return;const S=u.category.tone;if(S!=="quiet"&&S!=="cursed"||!Ao(u.token))return;const C=be(),L=bs(u.day,C);Mo(u.token,u.day,{categoryId:L.category.id,outcomeTitle:L.outcome.title}),g.todaysPull={...u,category:L.category,outcome:L.outcome,photo:L.photo,collectToken:L.collectToken,voucher:L.voucher,freikarte:L.freikarte,unlockTime:null,promptAnswer:null};const M=U(),q=M.findIndex(j=>j.day===u.day&&j.token===u.token);q!==-1&&(M[q]={...M[q],categoryId:L.category.id,categoryLabel:L.category.label,tone:L.category.tone,title:L.outcome.title,message:L.outcome.message,link:L.outcome.link||null,unlockTime:null,promptAnswer:null,photo:L.photo?{url:L.photo.url,alt:L.photo.alt||"",caption:(L.photo.caption||"").trim(),type:L.photo.type==="video"?"video":"image"}:null,voucher:L.voucher||!1},le(M)),g.todaysPull.collectToken&&ln(g.todaysPull.collectToken),g.todaysPull.freikarte&&gn(g.todaysPull.token),te(),ke(g.todaysPull),g.activeTab==="history"&&ne(),ae(50),H("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),I([20,20,40])});const h=l("[data-ag-streak-restore]");h&&h.addEventListener("click",()=>{if(!wn()){La();return}const u=Qt(),S=Xt(),L=ut()>0&&S-ut()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${S-1} Streak-Retter übrig.`;if(!window.confirm(L))return;h.disabled=!0;const q=Jo();ne(),Ve(),q&&(ae(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),I([30,20,30,20,60])),La(),h.disabled=!1});const m=l("[data-ag-sync-btn]");m&&m.addEventListener("click",async()=>{m.textContent="⏳",m.disabled=!0;const u=await Fe();ne(),m.textContent=u<0?"✗":`✓${u}`,setTimeout(()=>{m.textContent="☁",m.disabled=!1},3e3)}),z.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(u=>{u.addEventListener("click",()=>{I(5),qd(u.dataset.agFilter)})}),z.querySelectorAll("[data-ag-tab]").forEach(u=>{u.addEventListener("click",()=>{I(6),Ke(u.dataset.agTab)})});const f=z.querySelector(".ag-bottomnav");if(f){const u=f.querySelector(".ag-nav-pill"),S=[...f.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let C=null;f.addEventListener("pointerdown",M=>{const q=f.getBoundingClientRect(),j=parseFloat(u==null?void 0:u.style.width)||54;C={id:M.pointerId,startX:M.clientX-q.left,pillStartCentre:(parseFloat(u==null?void 0:u.style.left)||0)+j/2,pillWidth:j,moved:!1,suppress:!1,captured:!1}}),f.addEventListener("pointermove",M=>{if(!C||M.pointerId!==C.id)return;const q=f.getBoundingClientRect(),j=M.clientX-q.left-C.startX;if(!C.moved&&Math.abs(j)<6||(C.captured||(f.setPointerCapture(M.pointerId),C.captured=!0),C.moved=!0,C.suppress=!0,!u))return;u.style.transition="none";const V=f.getBoundingClientRect(),R=C.pillStartCentre+j,ue=C.pillWidth/2;let F=R-ue;F<0?F=F*.25:F+C.pillWidth>V.width&&(F=V.width-C.pillWidth+(F+C.pillWidth-V.width)*.25),u.style.left=`${F}px`});const L=M=>{if(!C||M.pointerId!==C.id)return;const q=C.moved,j=C.suppress;if(C=null,u&&(u.style.transition=""),!q)return;const V=f.getBoundingClientRect(),R=M.clientX-V.left;let ue=S[0],F=1/0;if(S.forEach(Se=>{const ve=Se.getBoundingClientRect(),Nt=ve.left-V.left+ve.width/2,Qe=Math.abs(R-Nt);Qe<F&&(F=Qe,ue=Se)}),I(6),Ke(ue.dataset.agTab),j){const Se=ve=>{ve.stopImmediatePropagation(),ve.preventDefault()};f.addEventListener("click",Se,{capture:!0,once:!0})}};f.addEventListener("pointerup",L),f.addEventListener("pointercancel",M=>{!C||M.pointerId!==C.id||(C=null,u&&(u.style.transition=""),Ke(g.activeTab))})}z.addEventListener("ag-synced",()=>{var u;try{wt(),It(),(u=document.getElementById("ag-werkstatt-panel"))!=null&&u.hidden||Oe()}catch{}}),(Ii=l("[data-ag-werkstatt-open]"))==null||Ii.addEventListener("click",ss),(Mi=l("#ag-werkstatt-close"))==null||Mi.addEventListener("click",ds),($i=document.getElementById("ag-werkstatt-add"))==null||$i.addEventListener("click",()=>Bn(null)),(Bi=document.getElementById("ag-werkstatt-cancel"))==null||Bi.addEventListener("click",Le),(Di=document.getElementById("ag-werkstatt-delete"))==null||Di.addEventListener("click",gs),(Ni=document.getElementById("ag-werkstatt-save"))==null||Ni.addEventListener("click",()=>{ps(),wt()}),(Pi=l("#ag-btn-skincare"))==null||Pi.addEventListener("click",or),(_i=l("#ag-btn-skincare"))==null||_i.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),or())}),(qi=l("#ag-skincare-close"))==null||qi.addEventListener("click",sd),(Ui=l("#ag-btn-stimmung"))==null||Ui.addEventListener("click",Cn),(ji=l("#ag-btn-stimmung"))==null||ji.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Cn())}),(Wi=l("#ag-stimmung-close"))==null||Wi.addEventListener("click",es),ts();const b=l("[data-ag-berge-add]"),y=l("[data-ag-berge-form]"),w=l("[data-ag-berge-cancel]"),E=l("[data-ag-berge-save]");b&&b.addEventListener("click",()=>{var S,C;I(8);const u=l("[data-ag-berge-date]");u&&!u.value&&(u.value=_(((S=g.theme)==null?void 0:S.timezone)||"Europe/Zurich")),y.hidden=!1,b.hidden=!0,(C=l("[data-ag-sheet-backdrop]"))==null||C.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),w&&w.addEventListener("click",()=>{var M;I(6),y.hidden=!0,b.hidden=!1,(M=l("[data-ag-sheet-backdrop]"))==null||M.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(q=>{const j=l(q);j&&(j.value="")});const u=l("[data-ag-loc-search]");u&&(u.value="");const S=l("[data-ag-loc-dropdown]");S&&(S.hidden=!0,S.innerHTML="");const C=l("[data-ag-berge-form-title]");C&&(C.textContent="Neuer Gipfeleintrag");const L=l("[data-ag-berge-save] span:last-child");L&&(L.textContent="Eintragen")}),E&&E.addEventListener("click",()=>{var Fi,Hi,Ri,Gi,Ki,Yi,Ji,Vi,Zi,Xi,Qi,eo,to,ao;const u=(((Fi=l("[data-ag-berge-name]"))==null?void 0:Fi.value)||"").trim(),S=parseFloat(((Hi=l("[data-ag-berge-dist]"))==null?void 0:Hi.value)||""),C=parseInt(((Ri=l("[data-ag-berge-gain]"))==null?void 0:Ri.value)||"",10),L=((Gi=l("[data-ag-berge-date]"))==null?void 0:Gi.value)||_(((Ki=g.theme)==null?void 0:Ki.timezone)||"Europe/Zurich"),M=(((Yi=l("[data-ag-berge-url]"))==null?void 0:Yi.value)||"").trim(),q=(((Ji=l("[data-ag-berge-cover]"))==null?void 0:Ji.value)||"").trim(),j=(((Vi=l("[data-ag-berge-notes]"))==null?void 0:Vi.value)||"").trim(),V=(((Zi=l("[data-ag-berge-edit-id]"))==null?void 0:Zi.value)||"").trim(),R=(((Xi=l("[data-ag-berge-lat]"))==null?void 0:Xi.value)||"").trim()||null,ue=(((Qi=l("[data-ag-berge-lng]"))==null?void 0:Qi.value)||"").trim()||null,F=(((eo=l("[data-ag-berge-loc-label]"))==null?void 0:eo.value)||"").trim()||null;if(!u){(to=l("[data-ag-berge-name]"))==null||to.focus();return}I([20,20,40]);const Se={name:u,elevation:null,distance:isNaN(S)?null:S,elevGain:isNaN(C)?null:C,date:L,activityUrl:M||null,cover:q||null,notes:j||null,lat:R,lng:ue,locLabel:F};V?hd(V,Se):ud({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...Se,token:N()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Bl=>{const no=l(Bl);no&&(no.value="")});const ve=l("[data-ag-loc-search]");ve&&(ve.value="");const Nt=l("[data-ag-berge-form-title]");Nt&&(Nt.textContent="Neuer Gipfeleintrag");const Qe=l("[data-ag-berge-save] span:last-child");Qe&&(Qe.textContent="Eintragen"),y.hidden=!0,b.hidden=!1,(ao=l("[data-ag-sheet-backdrop]"))==null||ao.classList.remove("is-open"),Re(),H("Gipfel gespeichert ✓")}),yd();const v=l("[data-ag-ping-card]");v&&(v.hidden=!(N()==="fionn"&&((Oi=g.backup)!=null&&Oi.enabled)));const x=l("[data-ag-ping-dismiss]");x&&x.addEventListener("click",()=>{const u=l("[data-ag-ping-banner]");u&&(u.hidden=!0)});const T=l("[data-ag-ping-send]");T&&T.addEventListener("click",()=>{I([20,30,20]);try{wr()}catch{}});const A=l("[data-ag-hug-send]");A&&A.addEventListener("click",()=>{I([20,30,20]);try{vr()}catch{}});const k=l("[data-ag-wish-open]"),D=l("[data-ag-wish-cancel]"),$=l("[data-ag-wish-submit]");k&&k.addEventListener("click",()=>{I(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const u=l("[data-ag-wish-input]");u&&window.setTimeout(()=>u.focus(),60)}),D&&D.addEventListener("click",()=>{I(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),$&&$.addEventListener("click",()=>{const u=l("[data-ag-wish-input]"),S=((u==null?void 0:u.value)||"").trim();if(!S)return;I([20,20,40]);const C={week:Ft(),text:S,submittedAt:Date.now(),remoteStatus:"idle"};pn(C),Ba();try{Sa(C)}catch{}});const O=l("[data-ag-notif-enable]"),Y=l("[data-ag-notif-dismiss]");O&&O.addEventListener("click",()=>{I(10),Dd()}),Y&&Y.addEventListener("click",()=>{I(6);try{window.localStorage.setItem(Ee,"dismissed")}catch{}const u=l("[data-ag-notif-card]");u&&(u.hidden=!0)});const pe=l("[data-ag-sheet-backdrop]");pe&&pe.addEventListener("click",()=>{I(6);const u=l("[data-ag-berge-form]"),S=l("[data-ag-berge-add]");u&&!u.hidden&&(u.hidden=!0,S&&(S.hidden=!1));const C=document.getElementById("ag-glossary-form"),L=document.getElementById("ag-glossary-add");C&&!C.hidden&&(C.hidden=!0,L&&(L.hidden=!1)),pe.classList.remove("is-open")});const de=l("[data-ag-fab]");de&&de.addEventListener("click",()=>{I(8);const u=l("[data-ag-berge-add]");u&&!u.hidden&&u.click()});const Q=["today","history","lieblinge","berge"];let we=0,J=0;const De=l(".ag-content")||z;De.addEventListener("touchstart",u=>{we=u.touches[0].clientX,J=u.touches[0].clientY},{passive:!0}),De.addEventListener("touchend",u=>{const S=u.changedTouches[0].clientX-we,C=Math.abs(u.changedTouches[0].clientY-J);if(Math.abs(S)>52&&C<44){const L=Q.indexOf(g.activeTab),M=S<0?Math.min(L+1,Q.length-1):Math.max(L-1,0);M!==L&&(I(6),Ke(Q[M]))}},{passive:!0});const Ne=l("[data-ag-ptr]");let Bt=0,Dt=!1;document.addEventListener("touchstart",u=>{window.scrollY===0&&(Bt=u.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",u=>{if(!Bt)return;u.touches[0].clientY-Bt>64&&!Dt&&Ne&&(Dt=!0,Ne.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Dt&&Ne&&(Ne.classList.add("is-loading"),await Fe(),g.activeTab==="berge"&&Re(),g.activeTab==="history"&&ne(),Ne.classList.remove("is-visible","is-loading"),H("Aktualisiert ✓")),Bt=0,Dt=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const u=document.querySelector(".ag-widget");u==null||u.classList.toggle("ag-paused",document.hidden)})}const _d=Object.freeze(Object.defineProperty({__proto__:null,bindEvents:Cr,downloadResultAsImage:Sr,downloadWallpaper:Er,drawRoundRect:Ea,escapeHtml:P,notifyPartnerVoucherRedeemed:xr,renderError:Ta,retryPendingWishSend:kr,reveal:Ye,sendHugToInbox:vr,sendPingToBackend:wr,sendWishToInbox:Sa,setActiveTab:Ke,setHugStatus:Ie,showDrawnToday:Tr,showToast:H,wrapText:zt},Symbol.toStringTag,{value:"Module"}));let ye=null,se="all";function qd(e){se=e==="vouchers"||e==="open"?e:"all",Ma=Ia,ne()}function Ca(e){return e?P(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Je(){return N().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||g.theme.brand.displayNameDefault||"Lennart"}function Ud(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function jd(e){try{const[t,a,n]=e.split("-").map(Number),r=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}).formatToParts(new Date(Date.UTC(t,a-1,n,12))),i=o=>(r.find(s=>s.type===o)||{}).value||"";return`${i("weekday").replace(/\.$/,"")}, ${i("day")}. ${i("month")}`}catch{return e}}function Wd(){const e=_(g.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const Od=["🚴","🧄"],Fd=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Lr(){const e=_(g.theme.timezone),t=N();return`${g.theme.secret}|${t}|${e}|emoji`}function Hd(){const e=Lr(),t=3+Math.floor(ce(`${e}|count`)*3),a=Fd.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const i=Math.floor(ce(`${e}|pick|${r}`)*a.length);n.push(a.splice(i,1)[0])}return[...Od,...n]}function Rd(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Hd(),a=t.length,n=Lr();t.forEach((r,i)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=r;const s=360/a*i,d=(ce(`${n}|angle|${i}`)-.5)*28,c=s+d,p=ce(`${n}|radius|${i}`)*21-10.5,h=16+ce(`${n}|dur|${i}`)*10,m=-ce(`${n}|delay|${i}`)*h,f=ce(`${n}|dir|${i}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${c}deg`),o.style.setProperty("--ag-emoji-radius",`${250+p}%`),o.style.setProperty("--ag-emoji-duration",`${h.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${m.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",f===1?"normal":"reverse"),e.appendChild(o)})}function Ve(){const e=l("[data-ag-streak]"),t=be(),a=fe();if(t>(a.maxStreak||0)&&st({...a,maxStreak:t}),e){const n=fn(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}La()}function La(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!wn())}const zr={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Gd(e){const t=l("[data-ag-milestone]");if(!t)return;const a=zr[e];if(!a){t.hidden=!0;return}const n=N();if(qo(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Uo(n,e)}function Kd(e,t){const a=(Array.isArray(e)?e:[e]).map(d=>String(d||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((d,c)=>{const p=document.createElement("div");p.className="ag-prompt-field";const h=document.createElement("p");h.className="ag-prompt-question",h.textContent=(c===0?"💭 ":"🌱 ")+d;const m=document.createElement("textarea");return m.className="ag-prompt-textarea",m.placeholder="Schreib hier deine Antwort...",m.rows=a.length>1?3:4,m.setAttribute("aria-label",d),p.appendChild(h),p.appendChild(m),n.appendChild(p),{question:d,textarea:m}}),i=document.createElement("p");i.className="ag-pin-err",i.hidden=!0,i.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const d=r.filter(p=>!p.textarea.value.trim());if(d.length){i.hidden=!1;for(const p of d)p.textarea.classList.add("ag-pin-shake"),setTimeout(()=>p.textarea.classList.remove("ag-pin-shake"),450);d[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(p=>p.question+`
`+p.textarea.value.trim()).join(`

`);t(c)}o.addEventListener("click",s);for(const d of r)d.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(i),n.appendChild(o),n}function Yd(e){return Array.isArray(e)?e.join(`
`):e}function Jd(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Vd(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:Yd(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Zd(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const i=document.createElement("div");i.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(d.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",p=>{p.key==="Enter"&&c()}),i.appendChild(o),i.appendChild(s),n.appendChild(r),n.appendChild(i),n.appendChild(d),n}function Xd(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const i=document.createElement("p");i.className="ag-pin-hint",i.style.marginTop="10px",i.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function p(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),At(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",p),s.addEventListener("keydown",h=>{h.key==="Enter"&&p()}),o.appendChild(s),o.appendChild(d),n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(c),n}function Qd(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${r}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function Ar(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function At(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=ee(t);if(!a){e.hidden=!0;return}const n=Qd(a);e.appendChild(n||Ar(a)),e.hidden=!1}function el(e){const t=l("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||Z()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),i=e.token,o=U().filter(h=>h.token===i&&typeof h.day=="string"&&h.day.slice(5)===n&&Number(h.day.slice(0,4))<r).sort((h,m)=>m.day.localeCompare(h.day));if(!o.length)return;const s=o[0],d=r-Number(s.day.slice(0,4)),c=l("[data-ag-memory-label]"),p=l("[data-ag-memory-text]");c&&(c.textContent=d===1?"Vor einem Jahr":`Vor ${d} Jahren`),p&&(p.textContent=s.title||""),t.hidden=!1}function Ir(e){const t=jt(e),a=Wt(e);if(To(e),te(),g.wishInbox&&g.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:N(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(g.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function tl(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Te()[a]||0,r=Wt(a),i=jt(a);if(n>=i)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(i)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${i} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{Ir(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',It()});else{const s=i-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(i-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function It(){const e=l("[data-ag-tokenbank]");if(!e)return;const t=Te(),a=Object.keys(Ut).map(d=>{const c=jt(d),p=Math.min(t[d]||0,c);return{emoji:d,goal:c,count:p,raw:t[d]||0,reward:Wt(d),done:(t[d]||0)>=c}}),n=a.reduce((d,c)=>d+c.raw,0),r=a.filter(d=>d.done).length,i=a.filter(d=>d.raw>0),o=a.length-i.length;i.sort((d,c)=>c.done-d.done||c.count/c.goal-d.count/d.goal||d.goal-c.goal);const s=l("[data-ag-tokenbank-head]");if(s){const d=o?` · ${o} ${o===1?"Sorte":"Sorten"} noch unentdeckt`:"";s.textContent=n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${d}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${d}`}e.innerHTML="";for(const d of i){const c=document.createElement("div");if(c.className="ag-tokenrow"+(d.done?" is-done":"")+(d.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${d.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${P(d.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${d.count/d.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${d.count}<span class="ag-tokenrow-goal">/${d.goal}</span></span>
    `,d.done){const p=document.createElement("button");p.type="button",p.className="ag-tokenrow-redeem",p.textContent="Einlösen",p.addEventListener("click",()=>{Ir(d.emoji),I([12,30,12]),H(`${d.emoji} eingelöst — Fionn weiss Bescheid`),It()}),c.appendChild(p)}e.appendChild(c)}}function Mr(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let i;if(t.type==="video"){const o=bo(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${o}`,d.alt=a,d.loading="lazy",d.decoding="async",d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),s.appendChild(d);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const p=()=>{s.removeEventListener("click",p),s.removeEventListener("keydown",h),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const m=document.createElement("iframe");m.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,m.allow="autoplay",m.setAttribute("allowfullscreen",""),m.setAttribute("frameborder","0"),m.setAttribute("aria-label",a),m.className="ag-drive-iframe",s.appendChild(m)},h=m=>{(m.key==="Enter"||m.key===" ")&&p()};s.addEventListener("click",p),s.addEventListener("keydown",h),i=s}else i=document.createElement("video"),i.src=ee(t.url),i.controls=!0,i.muted=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("preload","metadata"),i.setAttribute("aria-label",a),i.className="ag-media-content"}else i=document.createElement("img"),i.alt=a,i.loading="eager",i.decoding="auto",i.className="ag-media-content",i.addEventListener("load",()=>{const o=i.naturalWidth&&i.naturalHeight?i.naturalWidth/i.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),i.addEventListener("error",()=>{X("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=za(),d=s(o),c=d.find(p=>p.alt===t.alt&&p.type!=="video")||d.find(p=>p.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,i.src=ee(c.url),g.photos=d;else{const p=i.closest("[data-ag-photo-wrap]");p&&(p.hidden=!0)}}).catch(()=>{const o=i.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),i.src=ee(t.url);n.appendChild(i),e.appendChild(n)}function za(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Ze(e,t,a,n){var d,c;const r=l("#ag-lightbox"),i=l("#ag-lightbox-img"),o=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!r||!i)){(d=r.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),ye&&(i.removeEventListener("error",ye),ye=null),i.onerror=null,s&&(s.hidden=!0);{i.hidden=!1;const p=ee(e);if(!p)return;i.src=p,i.alt=t||"",ye=()=>{const h=n||t;X("config/photos.json",{photos:[]}).then(m=>{const{normalizePhotos:f}=za(),b=f(m),y=b.find(w=>w.alt===h)||null;y&&y.url&&(i.src=ee(y.url),g.photos=b)}).catch(()=>{})},i.addEventListener("error",ye,{once:!0})}o.textContent=t||"",o.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Aa(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(ye&&(t.removeEventListener("error",ye),ye=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function $r(e){return[`${Pn(e.category.tone)} ${Je()}s ${g.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var i;const[a,n]=e.unlockTime.split(":").map(Number),r=Pe(e.unlockTimezone||((i=g.theme)==null?void 0:i.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function ke(e){var v;z.dataset.tone=e.category.tone,hs(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=jd(e.day),l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=Ca(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]"),n=l("[data-ag-freikarte-wrap]");if(n){const x=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(x&&zo(e.token)>0&&!Z())}const r=l("[data-ag-quest-wrap]");if(r){const x=e.category.tone==="quest"&&!Z();if(r.hidden=!x,x){const T=l("[data-ag-quest-hint]"),A=l("[data-ag-quest-done]"),k=l("[data-ag-quest-photo]"),D=l("[data-ag-beweis-file]"),$=l("[data-ag-beweis-thumb]"),{formatHistoryDate:O}=Me(),Y=U().find(Q=>Q.day===e.day&&Q.token===e.token),pe=!!(Y&&Y.bestanden),de=Y&&Y.beweisUrl;$&&($.hidden=!de,de&&($.src=ee(de),$.onclick=()=>Ze(de,"Beweisfoto"))),T&&(T.textContent=pe?`🏆 Bestanden am ${O(Y.bestandenAt||Y.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),A&&(A.hidden=pe,A.onclick=()=>{if((typeof window>"u"||!window.confirm||window.confirm("Quest wirklich geschafft? Das wandert dauerhaft ins Trophäenregal."))&&sn(e.day,e.token)){te();try{ae(60)}catch{}ke(e),g.activeTab==="history"&&ne()}}),k&&D&&(k.hidden=!1,k.disabled=!1,k.textContent=de?"📸 Foto ersetzen":"📸 Beweis anhängen",k.onclick=()=>{D.value="",D.click()},D.onchange=async()=>{const Q=D.files&&D.files[0],we=U().find(J=>J.day===e.day&&J.token===e.token);if(!(!Q||!we)){k.disabled=!0,k.textContent="Lädt hoch…";try{const J=await zs(e.day,e.token,Q);So(e.day,e.token,J),sn(e.day,e.token),te();try{ae(60)}catch{}try{H("Beweis angenommen 🏆")}catch{}}catch(J){const De=J&&J.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":J&&J.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":J&&J.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{H(De)}catch{}}ke(e),g.activeTab==="history"&&ne()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const T=Kd(e.outcome.prompt,A=>{if(e.promptAnswer=A,T.remove(),!Z()){Vd(e,A),e.outcome.id&&rs(e.outcome.id,A);const k=U(),D=k.findIndex($=>$.day===e.day&&$.token===e.token);D!==-1&&(k[D]={...k[D],promptAnswer:A},le(k),te())}ke(e),g.activeTab==="history"&&ne()});T.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(T,t)}l("[data-ag-result]").hidden=!1;return}const i=a?a.querySelector("[data-ag-pin-gate]"):null;i&&i.remove();const o=l("[data-ag-link-wrap]");if(e.outcome.pin){const x=!!e.outcome.pinMessage;if(x||(t.hidden=!Zt(e.outcome.pin)),!Zt(e.outcome.pin)){let T=null;x&&(T=document.createElement("div"),T.className="ag-message",T.hidden=!0,T.innerHTML=Ca(e.outcome.pinMessage),t.parentNode.insertBefore(T,t.nextSibling));const A=Zd(e.outcome.pin,()=>{A.remove(),x?T.hidden=!1:t.hidden=!1,e.outcome.link&&o&&At(o,e.outcome.link)},e.outcome.pinHint);A.setAttribute("data-ag-pin-gate","");const k=x?T:t;k.parentNode.insertBefore(A,k)}}const s=l("[data-ag-photo-wrap]"),d=l("[data-ag-photo-media]"),c=l("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[x,T]=e.unlockTime.split(":").map(Number),A=Pe(e.unlockTimezone||((v=g.theme)==null?void 0:v.timezone)||"UTC"),k=e.outcome.linkPin;if(k)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[$,O]=e.outcome.linkPinFrom.split(":").map(Number);return A.h>$||A.h===$&&A.m>=O})()){const $=Xd(k,o,e);o.innerHTML="",o.appendChild($),o.hidden=!1}else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o.innerHTML="",o.appendChild($),o.hidden=!1}else if(A.h>x||A.h===x&&A.m>=T)At(o,e.outcome.link);else{const $=document.createElement("span");$.className="ag-outcome-link-locked",$.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o.innerHTML="",o.appendChild($),o.hidden=!1}}else e.outcome.pin&&!Zt(e.outcome.pin)||At(o,e.outcome.link||null);if(tl(l("[data-ag-token-wrap]"),e),el(e),e.photo){Mr(d,e.photo);const x=(e.photo.caption||"").trim();x?(c.textContent=x,c.hidden=!1):(c.textContent="",c.hidden=!0),s.hidden=!1}else d.innerHTML="",c.textContent="",c.hidden=!0,s.hidden=!0;const p=$r(e),h=encodeURIComponent("Mein Gacha-Zug"),m=encodeURIComponent(p),f=l("[data-ag-send]");g.theme.messageTarget.startsWith("mailto:")?f.href=`${g.theme.messageTarget}?subject=${h}&body=${m}`:f.href=g.theme.messageTarget.replace("{text}",m);const b=l("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const y=l("[data-ag-wallpaper]");y&&(y.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const w=l("[data-ag-actions-extra]");w&&(w.hidden=!(b&&!b.hidden)&&!(y&&!y.hidden));const E=l("[data-ag-reactions]");if(E){E.hidden=!1;const x=U().find(A=>A.day===e.day&&A.token===e.token),T=x&&x.reaction;for(const A of E.querySelectorAll("[data-ag-react]"))A.hidden=!!Z(),A.classList.toggle("is-chosen",A.dataset.agReact===T),A.onclick=()=>{const k=A.dataset.agReact;if(Eo(e.day,e.token,k)){Jd(e,k),te();try{I([12,30,18])}catch{}ke(e)}}}l("[data-ag-result]").hidden=!1,Br()}function al(e){return e?he().some(t=>t.day===e.day&&t.token===e.token):!1}function Mt(e){return he().some(t=>t.day===e.day&&t.token===e.token)}function Br(){const e=l("[data-ag-star]");if(!e)return;const t=al(g.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function nl(e,t){const a=he(),n=a.findIndex(i=>i.day===e.day&&i.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),rt(a),te();const r=Mt(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",g.activeTab==="lieblinge"&&$t()}function rl(e){if(!e)return;const t=he(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),rt(t),te(),Br(),g.activeTab==="lieblinge"&&$t()}function il(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=U(),n=new Set,r=[t,...a].filter(i=>{if(!i||typeof i.day!="string"||typeof i.token!="string")return!1;const o=`${i.day}|${i.token}`;return n.has(o)?!1:(n.add(o),!0)});r.sort((i,o)=>i.day<o.day?1:i.day>o.day?-1:0),le(r),Kt(0),te()}function ol(e,t){var o;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=_(((o=g.theme)==null?void 0:o.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=U(),i=r.find(s=>s.day===e.day&&s.token===e.token);i&&(i.used=!0,i.usedAt=n,le(r)),te();try{ae(60)}catch{}try{H("Eingelöst 💛")}catch{}try{xr(e)}catch{}t&&(t.disabled=!0),ne(),g.activeTab==="lieblinge"&&$t()}function Dr(e){var a;if(!e.link)return null;if(e.unlockTime){const n=Pe(e.unlockTimezone||((a=g.theme)==null?void 0:a.timezone)||"UTC"),[r,i]=e.unlockTime.split(":").map(Number);if(!(n.h>r||n.h===r&&n.m>=i)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=ee(e.link);return t?Ar(t):null}function Nr(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:r}=Me();n.textContent=r(e.day);const i=document.createElement("span");i.className="ag-history-badge",i.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");if(o.type="button",o.className="ag-history-star"+(Mt(e)?" is-starred":""),o.textContent=Mt(e)?"★":"☆",o.title=Mt(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",m=>{m.stopPropagation(),nl(e,o)}),a.appendChild(n),a.appendChild(i),e.reaction){const m=document.createElement("span");m.className="ag-history-reaction",m.textContent=e.reaction,m.title="Deine Reaktion",a.appendChild(m)}a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const d=document.createElement("div");d.className="ag-history-message",d.innerHTML=Ca(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const m=document.createElement("p");m.className="ag-history-answer-label",m.textContent="💭 Antwort";const f=document.createElement("blockquote");f.className="ag-history-answer",f.textContent=e.promptAnswer,c.appendChild(m),c.appendChild(f)}t.appendChild(a);const p=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,h=e.photo&&(e.photo.type==="video"||p.test(e.photo.url||""));if(e.photo&&!h){const m=document.createElement("div");m.className="ag-history-body";const f=document.createElement("div");f.className="ag-history-thumb";const b=document.createElement("img");b.src=ee(e.photo.url),b.alt=e.photo.alt||"Foto-Drop",b.loading="lazy",b.decoding="async",b.addEventListener("error",function(){X("config/photos.json",{photos:[]}).then(w=>{const{normalizePhotos:E}=za(),v=E(w),x=v.find(T=>T.alt===e.photo.alt&&T.type!=="video")||v.find(T=>T.type!=="video")||null;if(x&&x.url)e.photo.url=x.url,b.src=ee(x.url),g.photos=v;else{f.classList.add("is-broken"),b.remove();const T=document.createElement("span");T.className="ag-history-thumb-broken",T.textContent="📷",f.appendChild(T)}}).catch(()=>{f.classList.add("is-broken"),b.remove();const w=document.createElement("span");w.className="ag-history-thumb-broken",w.textContent="📷",f.appendChild(w)})},{once:!0}),f.appendChild(b),f.style.cursor="pointer",f.title="Vollansicht",f.addEventListener("click",()=>Ze(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(s),y.appendChild(d),c&&y.appendChild(c),e.link){const w=Dr(e);w&&y.appendChild(w)}m.appendChild(f),m.appendChild(y),t.appendChild(m)}else if(t.appendChild(s),t.appendChild(d),c&&t.appendChild(c),e.link){const m=Dr(e);m&&t.appendChild(m)}if(e.bestanden){const m=document.createElement("p");m.className="ag-history-bestanden";const{formatHistoryDate:f}=Me();if(m.textContent=`🏆 Bestanden${e.bestandenAt?` am ${f(e.bestandenAt)}`:""}`,t.appendChild(m),e.beweisUrl){const b=document.createElement("img");b.className="ag-history-beweis",b.src=ee(e.beweisUrl),b.alt="Beweisfoto",b.loading="lazy",b.decoding="async",b.addEventListener("click",y=>{y.stopPropagation(),Ze(e.beweisUrl,"Beweisfoto")}),b.addEventListener("error",()=>b.remove(),{once:!0}),t.appendChild(b)}}if(nt(e)){const m=document.createElement("div");if(m.className="ag-voucher-actions",e.used){const f=document.createElement("span");f.className="ag-voucher-used";const{formatHistoryDate:b}=Me();f.textContent=`✓ Benutzt am ${e.usedAt?b(e.usedAt):"–"}`,m.appendChild(f)}else{const f=document.createElement("button");f.type="button",f.className="ag-voucher-use",f.textContent="🎟️ Benutzen",f.addEventListener("click",b=>{b.stopPropagation(),ol(e,f)}),m.appendChild(f)}t.appendChild(m)}return t}function Me(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}}}function sl(e){const t=l("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===se),n.setAttribute("aria-selected",r===se?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let $e=null;function Pr(e){var v;const t=l("[data-ag-history-calendar]");if(!t)return;if(se!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((v=g.theme)==null?void 0:v.timezone)||"UTC",n=_(a);$e||($e=n.slice(0,7));const r=new Map(e.map(x=>[x.day,x])),[i,o]=$e.split("-").map(Number),s=new Date(Date.UTC(i,o-1,1)),d=new Date(Date.UTC(i,o,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,p=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),h=e.filter(x=>x.day.startsWith($e)).length;t.innerHTML="";const m=document.createElement("div");m.className="ag-kalender-head";const f=document.createElement("button");f.type="button",f.className="ag-kalender-nav",f.textContent="‹",f.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=h?`${p} · ${h} Kapseln`:p;const y=document.createElement("button");y.type="button",y.className="ag-kalender-nav",y.textContent="›",y.setAttribute("aria-label","Nächster Monat");const w=x=>{const T=new Date(Date.UTC(i,o-1+x,1));$e=`${T.getUTCFullYear()}-${String(T.getUTCMonth()+1).padStart(2,"0")}`,Pr(e)};f.addEventListener("click",()=>w(-1)),y.addEventListener("click",()=>w(1)),m.appendChild(f),m.appendChild(b),m.appendChild(y),t.appendChild(m);const E=document.createElement("div");E.className="ag-kalender-grid";for(const x of["M","D","M","D","F","S","S"]){const T=document.createElement("span");T.className="ag-kalender-wd",T.textContent=x,E.appendChild(T)}for(let x=0;x<c;x++)E.appendChild(document.createElement("span"));for(let x=1;x<=d;x++){const T=`${$e}-${String(x).padStart(2,"0")}`,A=r.get(T),k=document.createElement("span");k.className="ag-kalender-day",k.textContent=x,A&&(k.classList.add("has-pull"),k.dataset.tone=A.tone||"soft",k.title=`${A.title||"Kapsel"} (${A.categoryLabel||""})`),T===n&&k.classList.add("is-today"),T>n&&k.classList.add("is-future"),E.appendChild(k)}t.appendChild(E)}function dl(e){var i;const t=l("[data-ag-history-tally]");if(!t)return;if(se!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(i=e[e.length-1])==null?void 0:i.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const Ia=15;let Ma=Ia;function ll(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function cl(e){const t=l("[data-ag-album-card]"),a=l("[data-ag-album]"),n=l("[data-ag-album-note]");if(!t||!a)return;const r=ll(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const i of r){const o=document.createElement("button");o.type="button",o.className="ag-album-tile",o.title=i.caption||i.alt||i.day,o.setAttribute("aria-label",i.caption||i.alt||`Foto vom ${i.day}`);const s=document.createElement("img");s.src=i.url,s.alt=i.alt||i.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>o.remove(),{once:!0}),o.appendChild(s),o.addEventListener("click",()=>{I(8),Ze(i.url,i.caption,!1,i.alt)}),a.appendChild(o)}}function gl(e){const t=l("[data-ag-trophy-card]"),a=l("[data-ag-trophies]"),n=l("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(o=>o.bestanden).sort((o,s)=>(s.bestandenAt||s.day)<(o.bestandenAt||o.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`);const{formatHistoryDate:i}=Me();a.innerHTML="";for(const o of r){const s=document.createElement("div");s.className="ag-trophy-tile",s.title=o.title||o.categoryLabel||"Quest";const d=document.createElement("span");d.className="ag-trophy-emoji";const c=(o.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(d.textContent=c?c[c.length-1]:"🏆",o.beweisUrl){s.classList.add("has-beweis");const m=document.createElement("img");m.className="ag-trophy-shot",m.src=ee(o.beweisUrl),m.alt="Beweisfoto",m.loading="lazy",m.decoding="async",m.addEventListener("error",()=>{m.remove(),s.classList.remove("has-beweis")},{once:!0}),s.appendChild(m),s.addEventListener("click",()=>Ze(o.beweisUrl,o.title||"Beweisfoto"))}const p=document.createElement("span");p.className="ag-trophy-title",p.textContent=o.title||o.categoryLabel||"Quest";const h=document.createElement("span");h.className="ag-trophy-date",h.textContent=i(o.bestandenAt||o.day),s.appendChild(d),s.appendChild(p),s.appendChild(h),a.appendChild(s)}}function $a(){const e=l("[data-ag-ferien-list]"),t=l("[data-ag-ferien-count]");if(!e)return;const{formatHistoryDate:a}=Me(),n=pt();e.innerHTML="",t&&(t.hidden=!n.length,t.textContent=n.length?`· ${n.length}`:"");for(const r of n){const i=document.createElement("li");i.className="ag-ferien-item";const o=document.createElement("span");o.textContent=r.from===r.to?a(r.from):`${a(r.from)} – ${a(r.to)}`;const s=document.createElement("button");s.type="button",s.className="ag-ferien-remove",s.setAttribute("aria-label","Ferien entfernen"),s.textContent="✕",s.addEventListener("click",()=>{Oo(r.from,r.to),$a(),Ve()}),i.appendChild(o),i.appendChild(s),e.appendChild(i)}}function ne(){var p;It();const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=N(),r=_(((p=g.theme)==null?void 0:p.timezone)||"UTC"),i=U().filter(h=>h.token===n&&h.day<=r).slice().sort((h,m)=>h.day<m.day?1:h.day>m.day?-1:0);Pr(i),dl(i),$a(),gl(i),cl(i);const o=i.filter(h=>nt(h)&&!h.used).length;sl(o);const s=i.filter(h=>se==="vouchers"?nt(h):se==="open"?nt(h)&&!h.used:!0);se==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":se==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const d=l("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=se==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":se==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",d&&(d.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Ma);for(const h of c)e.appendChild(Nr(h));if(d){const h=s.length-c.length;d.hidden=h<=0,h>0&&(d.textContent=`Mehr anzeigen (${h} weitere)`,d.onclick=()=>{Ma+=Ia,ne()})}}function $t(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=he();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild(Nr(r))}function pl(){const e=l("[data-ag-odds]");e.innerHTML="";const t=be(),a=bn(t),n=a.reduce((r,i)=>r+i.weight,0);for(const r of a){const i=document.createElement("li");i.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(i)}if(t>=5){const r=fn(t),i=document.createElement("li");i.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,i.style.fontWeight="800",e.appendChild(i)}}function ul(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Ba(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Gt();n&&n.week===Ft()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=ul(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function ml(){var w;const e=K()==="fionn",t=e?g.theme.brand.fromName:Je(),a=e?Je():g.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=g.theme.brand.titleTemplate.replace("{name}",t));const r=l("[data-ag-kicker]");r&&(r.textContent=`${g.theme.brand.kicker} · ${g.photos.length} Erinnerungen`);const i=l("[data-ag-intro]");i&&(i.textContent=g.theme.brand.intro);const o=l("[data-ag-button-text]");o&&(o.textContent=g.theme.brand.buttonIdle);const s=l("[data-ag-rules-title]");s&&(s.textContent=g.theme.brand.rulesTitle);const d=l("[data-ag-rules-text]");d&&(d.textContent=g.theme.brand.rulesText);const c=l("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const p=l("[data-ag-today-pill]");p&&(p.textContent=Wd());const h=l("[data-ag-draw-hint]");h&&(h.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const m=l("[data-ag-werkstatt-open]");m&&(m.hidden=e||!yt());const f=document.getElementById("ag-werkstatt-panel");f&&!yt()&&(f.hidden=!0),wt();const b=l("[data-ag-chips]");b&&(b.innerHTML="");const y=Array.isArray(g.theme.stickers)&&g.theme.stickers.length?g.theme.stickers:Ud();for(const E of b?y:[]){const v=document.createElement("li");if(v.textContent=E,(E.toLowerCase().includes("bärlauch")||E.toLowerCase().includes("barlauch"))&&(v.id="ag-btn-baerlauch",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Bärlauch öffnen"),v.classList.add("ag-chip-clickable")),(E.toLowerCase().includes("gespräch")||E.toLowerCase().includes("gesprach"))&&(v.id="ag-btn-gesprach",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Gespräch öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase().includes("rave")&&(v.id="ag-btn-rave",v.tabIndex=0,v.setAttribute("role","link"),v.setAttribute("aria-label","Rave Board öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase()==="quest"&&(v.id="ag-btn-quest",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Quest öffnen"),v.classList.add("ag-chip-clickable"),(w=g.quest)!=null&&w.enabled&&Jn()&&(_e().solved||v.classList.add("ag-chip-quest-active"))),E.toLowerCase().includes("glossar")&&(v.id="ag-btn-glossary",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Glossar öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase()==="mission"&&(v.id="ag-btn-mission",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Mission öffnen"),v.classList.add("ag-chip-clickable"),Hn()||v.classList.add("ag-chip-mission-active")),(E.toLowerCase().includes("skincare")||E.toLowerCase().includes("pflege"))&&g.skincare&&(v.id="ag-btn-skincare",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Skincare-Routine öffnen"),v.classList.add("ag-chip-clickable")),E.toLowerCase().includes("stimmung")){v.id="ag-btn-stimmung",v.tabIndex=0,v.setAttribute("role","button"),v.setAttribute("aria-label","Farbe des Tages wählen"),v.classList.add("ag-chip-clickable");const x=Ce();x&&(v.classList.add("ag-chip-stimmung-set"),v.style.setProperty("--chip-dot-color",x))}b.appendChild(v)}Rd(),Ve()}const _r="affektions-gacha:install-dismissed:v1";let Xe=null;function hl(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function fl(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function qr(){try{return window.localStorage.getItem(_r)==="1"}catch{return!1}}function Ur(){try{window.localStorage.setItem(_r,"1")}catch{}const e=l("[data-ag-install-nudge]");e&&(e.hidden=!0)}function jr(e){if(qr())return;const t=l("[data-ag-install-nudge]");if(!t)return;const a=l("[data-ag-install-copy]"),n=l("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Xe&&(Xe.prompt(),await Xe.userChoice,Xe=null,Ur())}),t.hidden=!1}function bl(){var e;hl()||qr()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Xe=t,jr(!0)}),fl()&&jr(!1),(e=l("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Ur))}const yl={photos:[]};function wl(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=ra();return a.map(r=>{const i=new URL(r.url,n).toString(),o=r.type==="video"||t.test(i);return{...r,type:o?"video":"image",url:i}}).filter(r=>r.url)}async function vl(){ys(),ks(),Cs();try{const[e,t,a,n,r,i,o,s,d,c]=await Promise.all([X("config/theme.json"),X("config/outcomes.json"),X("config/photos.json",yl),X("config/special-days.json",{days:[]}),X("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),X("config/backup.json",{enabled:!1,endpointUrl:""}),X("config/quest.json",{enabled:!1}),X("config/missions.json",{pairs:[]}),X("config/push.json",{enabled:!1}),X("config/skincare.json",null)]);g.theme=e,g.outcomes=t,g.photos=wl(a),g.specialDays=n,go(e.dayStartHour),g.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},g.backup=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},g.quest=o&&typeof o=="object"?o:{enabled:!1},g.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},g.push=d&&typeof d=="object"?d:{enabled:!1},g.skincare=c&&typeof c=="object"?c:null,g.werkstatt=je(),ws(e),vs(Z()||_(e.timezone)),Qo(),ml(),pl(),Ba(),Cr(),bl(),requestAnimationFrame(()=>{const m=z.querySelector(".ag-nav-pill"),f=z.querySelector(".ag-bottomnav-btn.is-active");if(m&&f){const b=f.closest(".ag-bottomnav"),y=b?b.getBoundingClientRect():null,w=f.getBoundingClientRect();y&&w.width&&(m.style.transition="none",m.style.left=`${w.left-y.left}px`,m.style.width=`${w.width}px`,requestAnimationFrame(()=>{m.style.transition=""}))}});try{kr()}catch{}try{const m=z.querySelector(".ag-stage");m&&"IntersectionObserver"in window&&new IntersectionObserver(([b])=>{m.classList.toggle("ag-stage-idle",!b.isIntersecting)},{threshold:.05}).observe(m)}catch{}ka(),g.renderedDay=_(e.timezone);const p=()=>{Z()||_(e.timezone)!==g.renderedDay&&window.location.reload()};window.setInterval(p,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(p(),xa(),da(),Wr(e.timezone),Fe().catch(()=>{}))}),z.classList.add("is-ready"),z.style.transition="opacity .18s ease",z.style.opacity="1";const h=_(e.timezone);U().some(m=>m.token===N()&&m.day===h)&&!Z()&&Tr(),da(),Wr(e.timezone),Fe().catch(()=>{}),window.setTimeout(()=>{yr().catch(()=>{})},1800)}catch(e){Ta(e)}}function Wr(e){try{const{h:t}=Pe(e||"UTC"),a=t>=22||t<5;z.classList.toggle("is-evening",a);const n=z.querySelector("[data-ag-kicker]");if(n){const r=n.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");n.textContent=a?r+" · Gute Nacht 🌙":r}}catch{}}const Be=document.currentScript,xl=(Be==null?void 0:Be.dataset.mount)||"#affektions-gacha",kl=(Be==null?void 0:Be.dataset.configBase)||"";function Sl(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const El=document.querySelector(xl)||Sl();ro(El),us(kl,null),vl().catch(e=>Ta(e));const Tl="wss://broker.hivemq.com:8884/mqtt",Or="picolight_lf26/events",Cl="web_app",Fr=10,Da=17/29,Ll={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:Da,w:1},quiet:{pos:1/29,w:.3}},Na=18e3,Hr=420,Rr=6,Gr=Hr*Rr,Pa=1600;function Kr(e){const t=Ll[e]||{pos:Da,w:0},a=t.w>=1?{pos:Da,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],i=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],o=[];for(let d=0;d<Rr;d++)o.push({at:d*Hr,payload:{on:!0,fade_steps:6,brightness:1,groups:d%2?i:r}});o.push({at:Gr,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:Fr}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let d=!1;for(let c=Gr+Pa;c<Na-Pa;c+=Pa)d=!d,o.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...d?s:n,size:Fr}]}})}return o}const zl=2500,_a=["board_a","board_b"];let qa=!1;function Al(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function Il(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}async function Ml(e){if(!qa){qa=!0;try{await Al(),await new Promise((t,a)=>{const n=window.mqtt.connect(Tl,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),r={};let i=!1,o=null,s=[],d=!1;const c=()=>{if(!d){d=!0,document.removeEventListener("visibilitychange",m);try{n.end(!0)}catch{}t()}},p=f=>{f.from=Cl;try{n.publish(Or,JSON.stringify(f))}catch{}},h=()=>{clearTimeout(o);for(const f of s)clearTimeout(f);if(s=[],!i){c();return}i=!1;for(const f of _a){const b=r[f]||r[_a.find(w=>w!==f)];if(!b)continue;const y={target:f,...Il(b)};b.on===!1?(p({...y,on:!0}),setTimeout(()=>p({target:f,on:!1}),1500)):p({...y,on:!0})}setTimeout(c,2500)},m=()=>{document.visibilityState==="hidden"&&i&&h()};document.addEventListener("visibilitychange",m),n.on("connect",()=>{n.subscribe(Or,f=>{if(f){c();return}p({nudge:!0}),setTimeout(()=>{if(!Object.keys(r).length){c();return}i=!0;for(const b of Kr(e))s.push(setTimeout(()=>p(b.payload),b.at));o=setTimeout(h,Na)},zl)})}),n.on("message",(f,b)=>{try{const y=JSON.parse(b.toString());y.from&&_a.includes(y.from)&&Array.isArray(y.groups)&&!i&&(r[y.from]=y)}catch{}}),n.on("error",()=>{i||c()}),n.on("close",()=>{i||c()}),setTimeout(()=>a(new Error("lights flash timed out")),Na+2e4)})}catch{}finally{qa=!1}}}const $l=Object.freeze(Object.defineProperty({__proto__:null,choreography:Kr,flashLightsForPull:Ml},Symbol.toStringTag,{value:"Module"}))})();

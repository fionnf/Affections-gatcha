(function(){"use strict";const p={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,push:null,skincare:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let $=null;function Hd(e){$=e}function c(e){return $.querySelector(e)}const Gr="affektions-gacha:history:v1",an="affektions-gacha:favourites:v1",Kr="affektions-gacha:tokens:v1",Yr="affektions-gacha:tokens-sent:v1",Vr="affektions-gacha:streak-cache:v1",Jr="affektions-gacha:streak-synced:v1",Zr="affektions-gacha:streak-restore:v1",Xr="affektions-gacha:wish:v1",Qr="affektions-gacha:milestones:v1",ct="affektions-gacha:notif:v2",ei="affektions-gacha:baerlauch-scores:v1",Gd="affektions-gacha:baerlauch-history:v1",ti="affektions-gacha:gesprach-idx:v1",ai="affektions-gacha:last-ping:v1",Kd="affektions-gacha:sound:v1",ni="affektions-gacha:gipfelbuch:v1",ri="affektions-gacha:quest:v1",nn="affektions-gacha:quest-points:v1",Yd=5,Vd=20,ii=[100,75,50,25],oi="affektions-gacha:glossary:v1",rn="affektions-gacha:stimmung:v1",si="affektions-gacha:freikarte:v1",on="affektions-gacha:freikarte-reroll:v1",sn={"🌿":{goal:6,reward:"Essen: Fionn kocht, oder ein Café deiner Wahl"},"🏔":{goal:7,reward:"Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg"},"🎬":{goal:6,reward:"Ein Abend aus: Film, Konzert oder DJ — du wählst"},"🛁":{goal:5,reward:"Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag"},"💚":{goal:6,reward:"Eine Überraschung von Fionn, mit handgeschriebenem Brief"},"✈️":{goal:8,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}},Jd={"☕":"🌿","🔥":"🏔","🎧":"🎬","🍕":"🛁","☁️":"🛁","⭐":"💚"};function li(e){return Jd[e]||e}function ln(e){const t=sn[e];return t&&t.goal||Yd}function dn(e){const t=sn[e];return t&&t.reward||""}const di=10,ci="🛁";let cn=0;function Zd(e){cn=Number.isInteger(e)&&e>=0&&e<24?e:0}function J(e,t){const a=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hourCycle:"h23"}).formatToParts(new Date),n=s=>Number(a.find(l=>l.type===s).value);let r=n("year"),i=n("month"),o=n("day");if(n("hour")%24<cn){const s=new Date(Date.UTC(r,i-1,o-1));r=s.getUTCFullYear(),i=s.getUTCMonth()+1,o=s.getUTCDate()}return`${r}-${String(i).padStart(2,"0")}-${String(o).padStart(2,"0")}`}function gn(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function na(e,t){const[a,n]=String(e).split(":").map(Number);if(!Number.isFinite(a))return!0;const r=gn(t),i=l=>l<cn?l+24:l,o=i(r.h),s=i(a);return o>s||o===s&&r.m>=(n||0)}let gi=null;const ui=new Map;function Xd(e,t="Europe/Zurich"){const a=typeof e=="number"?e:Date.parse(e||"");if(!Number.isFinite(a)||a<=0)return"";try{let n=ui.get(t);return n||(n=new Intl.DateTimeFormat("de-CH",{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:t}),ui.set(t,n)),n.format(new Date(a))}catch{return""}}function ke(e){const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return gi||(gi=new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})),gi.format(r)}catch{return e}}function Qd(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function un(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function ec(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function Ce(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function tc(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function ac(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function pe(e){return ac(tc(e))()}function pn(e,t){return t?Math.floor(pe(e)*t):0}function nc(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function rc(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function K(){return"lennart"}function oe(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ic(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function ra(e){let t;if(e){const[r,i,o]=J(e).split("-").map(Number);t=new Date(Date.UTC(r,i-1,o))}else{const r=new Date;t=new Date(Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate()))}t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Dt(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=J(t),[n,r,i]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,r-1,i)).getTime()/864e5);return Math.floor(o/(((l=e.quest)==null?void 0:l.periodDays)||2))}function ia(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Dt(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function pi(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function oc(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const hn=new Set;function sc(e){hn.clear();const t=Array.isArray(e&&e.categories)?e.categories:[];for(const a of t)for(const n of Array.isArray(a.outcomes)?a.outcomes:[])n&&n.voucher===!0&&n.title&&hn.add(n.title)}function It(e){return e?e.voucher===!0?!0:e.voucher===!1?!1:!!e.title&&hn.has(e.title):!1}function q(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function Me(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[K()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[K()]:n})),n}catch{return t}}function he(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[K()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}let hi=null,fn=null;function H(){try{if(typeof window>"u"||!window.localStorage)return p.syncedHistory||[];const e=window.localStorage.getItem(Gr);if(!e)return p.syncedHistory||[];if(e===hi&&fn)return fn;const t=JSON.parse(e);if(!Array.isArray(t))return p.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?(hi=e,fn=a,a):p.syncedHistory||[]}catch{return p.syncedHistory||[]}}function ze(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Gr,JSON.stringify(e))}catch{}}function fi(e,t){var r;const a=H(),n=a.find(i=>i.day===e&&i.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=J(((r=p.theme)==null?void 0:r.timezone)||"UTC"),ze(a)),n):null}function lc(e,t,a){const n=H(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.beweisUrl=a,ze(n),r):null}function dc(e,t,a){if(!a||typeof a.t!="number")return null;const n=H(),r=n.find(i=>i.day===e&&i.token===t);return!r||r.weather?null:(r.weather=a,ze(n),r)}function cc(e,t,a){const n=H(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.reaction=a,ze(n),r):null}function Ue(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(an);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=p.theme)!=null&&e.timezone?J(p.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function oa(e){try{if(typeof window>"u"||!window.localStorage)return;uc(window.localStorage.getItem(an),e),window.localStorage.setItem(an,JSON.stringify(e))}catch{}}const mn="affektions-gacha:favourite-tombstones:v1",gc=200;function mi(e){return`${e.day}|${String(e.token||"").toLowerCase()}`}function sa(){try{const e=JSON.parse(window.localStorage.getItem(mn)||"[]");return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}catch{return[]}}function bi(e){try{e.length?window.localStorage.setItem(mn,JSON.stringify(e.slice(-gc))):window.localStorage.removeItem(mn)}catch{}}function uc(e,t){let a=[];try{a=JSON.parse(e||"[]")}catch{a=[]}Array.isArray(a)||(a=[]);const n=new Set((Array.isArray(t)?t:[]).filter(Boolean).map(mi)),r=a.filter(Boolean).map(mi).filter(l=>!n.has(l)),i=sa(),o=i.filter(l=>!n.has(l)),s=r.filter(l=>!o.includes(l));(s.length||o.length!==i.length)&&bi(o.concat(s))}function pc(e){if(!e||!e.length)return;const t=new Set(e),a=sa(),n=a.filter(r=>!t.has(r));n.length!==a.length&&bi(n)}function yi(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;if(r<=0)continue;const i=li(a);t[i]=(t[i]||0)+r}return t}function gt(){const e=Me(Kr,{});return yi(e&&typeof e=="object"&&!Array.isArray(e)?e:{})}function bn(e){he(Kr,e)}function la(e){e=li(e);const t=gt();return t[e]=(t[e]||0)+1,bn(t),t[e]}function hc(e,t){const a=gt(),n=Number(t);a[e]=Number.isFinite(n)&&n>0?Math.max(0,(a[e]||0)-n):0,bn(a)}function da(e){return yi(e)}function fc(){const e=Me(Yr,null);return e&&typeof e=="object"&&!Array.isArray(e)?da(e):null}function yn(e){he(Yr,da(e))}let wn=0;function mc(){return wn}function wi(e){return typeof e=="number"&&e!==wn}function xi(e){yn(e),wn++}function bc(e,t){if(wi(t))return!1;const a=da(e),n=da(gt());let r=fc();r===null&&(r=n,yn(n));const i=new Set([...Object.keys(a),...Object.keys(n),...Object.keys(r)]),o={};for(const s of i){const l=(a[s]||0)+((n[s]||0)-(r[s]||0));l>0&&(o[s]=l)}return bn(o),yn(a),[...i].some(s=>(o[s]||0)!==(a[s]||0))}function xn(){try{const e=localStorage.getItem(si),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function vi(e){try{localStorage.setItem(si,JSON.stringify(e))}catch{}}function yc(e){return xn()[e]||0}function ki(e){const t=xn();return t[e]=(t[e]||0)+1,vi(t),t[e]}function wc(e){const t=xn();return t[e]>0?(t[e]-=1,vi(t),!0):!1}function $i(e,t){try{const a=localStorage.getItem(on),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function xc(e,t,a){try{const n=localStorage.getItem(on),r=n?JSON.parse(n):{},i=r&&typeof r=="object"?r:{};i[`${e}|${t}`]=a,localStorage.setItem(on,JSON.stringify(i))}catch{}}function vn(){if(typeof window>"u"||!window.localStorage)return null;const e=Me(Xr,null);return e&&typeof e=="object"?e:null}function Si(e){typeof window>"u"||!window.localStorage||he(Xr,e)}function He(){const e=Me(Zr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ca(e){he(Zr,e)}function vc(){const e=Me(Vr,0);return typeof e=="number"?e:parseInt(e,10)||0}function kn(e){he(Vr,e)}function kc(){const e=Me(Jr,0);return typeof e=="number"?e:parseInt(e,10)||0}function $c(e){he(Jr,e)}function ga(){try{const e=window.localStorage.getItem(ni);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ua(e){try{window.localStorage.setItem(ni,JSON.stringify(e))}catch{}}function $n(){try{const e=localStorage.getItem(ei),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Li(){try{const e=localStorage.getItem(Gd),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Nt(e=()=>Dt(p)){try{const t=Me(ri,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Sn(e){he(ri,e)}function pa(){const e=Me(nn,0);return typeof e=="number"?e:parseInt(e,10)||0}function Sc(e){try{const t=pa()+e;return he(nn,t),t}catch{return e}}function Lc(e){he(nn,e)}function Ei(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Qr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ec(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Qr,JSON.stringify(e))}catch{}}function Tc(e,t){return Ei().includes(`${e}|${t}`)}function Mc(e,t){const a=`${e}|${t}`,n=Ei();n.includes(a)||Ec([...n,a])}function Ln(e){return!1}const Ti="affektions-gacha:baerlauch-weekly:v1";function Ac(e){const t=Me(Ti,null);return!!(t&&typeof t=="object"&&t.week===e)}function Cc(e){he(Ti,{week:e,at:Date.now()})}const En="affektions-gacha:wish-replies:v1";function ha(){const e=Me(En,null);return e&&typeof e=="object"&&!Array.isArray(e)?e:{wishes:[],shown:null}}function zc(e){const t=ha(),a=(Array.isArray(e)?e:[]).filter(n=>n&&n.timestamp).map(n=>({timestamp:String(n.timestamp),text:String(n.text||""),status:String(n.status||""),statusAt:String(n.statusAt||"")}));he(En,{wishes:a,shown:t.shown||null})}function Mi(){const{wishes:e}=ha(),t=e.filter(a=>a.status&&a.statusAt);return t.length?(t.sort((a,n)=>a.statusAt<n.statusAt?1:a.statusAt>n.statusAt?-1:0),t[0]):null}function _c(e){const t=Mi();if(!t)return null;const{shown:a}=ha();return a&&a.statusAt===t.statusAt&&a.day!==e?null:t}function Dc(e,t){const a=ha();a.shown&&a.shown.statusAt===e&&a.shown.day===t||he(En,{...a,shown:{statusAt:e,day:t}})}const Ai="affektions-gacha:hug-log:v1";function Ci(){const e=Me(Ai,[]);return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}const Ic=9e4;function zi(e){const t=new Set(Ci());for(const r of Array.isArray(e)?e:[])typeof r=="string"&&r&&t.add(r);const a=[...t].sort(),n=[];for(const r of a){const i=n[n.length-1];i&&Math.abs(Date.parse(r)-Date.parse(i))<Ic||n.push(r)}return he(Ai,n.slice(-500)),n}function Nc(e){return zi([e])}const Tn="affektions-gacha:pfand:v1";function ut(){const e=Me(Tn,{count:0});return e&&typeof e=="object"&&Number.isFinite(e.count)?e:{count:0}}function Mn(e,t=di){const a=Math.max(0,Math.floor(Number(e)||0));return{inCycle:a%t,every:t,earned:a>0&&a%t===0}}function Pc(){const t=(ut().count||0)+1;return he(Tn,{count:t,at:Date.now()}),{count:t,...Mn(t)}}function jc(e){const t=ut(),a=Math.max(t.count||0,Math.floor(Number(e)||0));return a!==(t.count||0)&&he(Tn,{...t,count:a}),a}function Bc(e,t){const a=H(),n=a.find(r=>r.day===e&&r.token===t);return!n||n.pfand?!1:(n.pfand=!0,ze(a),!0)}const _i="affektions-gacha:flaschenpost:v1";function pt(){const e=Me(_i,[]);return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&t.id&&t.text&&t.dueDay):[]}function An(e){he(_i,(Array.isArray(e)?e:[]).slice(-40))}function Di(e,t){const[a,n,r]=e.split("-").map(Number);return new Date(Date.UTC(a,n-1,r+t)).toISOString().slice(0,10)}function Oc(e,t,a){return e==="30"?Di(t,30):Di(t,20+Math.floor(pe(`flaschenpost|${a}`)*71))}function Fc(e,t,a){const n=String(e||"").trim().slice(0,280);if(!n)return null;const r=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,i={id:r,text:n,mode:t==="30"?"30":"irgendwann",createdDay:a,dueDay:Oc(t,a,r),deliveredDay:null};return An([...pt(),i]),i}function qc(e){const t=pt(),a=t.find(n=>n.deliveredDay===e);return a||t.filter(n=>!n.deliveredDay&&n.dueDay<=e).sort((n,r)=>n.dueDay<r.dueDay?-1:1)[0]||null}function Wc(e,t){const a=pt(),n=a.find(r=>r.id===e);return!n||n.deliveredDay?!1:(n.deliveredDay=t,An(a),!0)}function Rc(e){const t=new Map(pt().map(n=>[n.id,n]));for(const n of Array.isArray(e)?e:[]){if(!n||!n.id||!n.text||!n.dueDay)continue;const r=t.get(n.id);t.set(n.id,r?{...r,deliveredDay:r.deliveredDay||n.deliveredDay||null}:n)}const a=[...t.values()].sort((n,r)=>n.createdDay<r.createdDay?-1:1);return An(a),a}const Uc=60;function fa(){const e=He();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function Hc(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>Uc))return null;const n=He(),r=fa().filter(i=>!(i.from===e&&i.to===t));return r.push({from:e,to:t}),r.sort((i,o)=>i.from.localeCompare(o.from)),ca({...n,vacations:r}),{from:e,to:t}}function Gc(e,t){const a=He();ca({...a,vacations:fa().filter(n=>!(n.from===e&&n.to===t))})}function Ii(e){return fa().some(t=>e>=t.from&&e<=t.to)}function Ge(){var g;const e=K(),t=H().filter(m=>m.token===e);if(!t.length)return Math.max(vc(),kc());const a=((g=p.theme)==null?void 0:g.timezone)||"UTC",n=J(a),r=new Set(t.map(m=>m.day)),[i,o,s]=n.split("-").map(Number);let l=new Date(Date.UTC(i,o-1,s)),d=n;r.has(d)||(l.setUTCDate(l.getUTCDate()-1),d=l.toISOString().slice(0,10));let u=0;for(;r.has(d)||Ii(d);)r.has(d)&&u++,l.setUTCDate(l.getUTCDate()-1),d=l.toISOString().slice(0,10);return u}function Ni(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Pi(e){if(e<5)return p.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return p.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Kc=45,Yc=10,Vc=.5,Jc=1.8;function Zc(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=H().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,l)=>l.day.localeCompare(s.day)).slice(0,Kc);if(r.length<Yc)return e;const i=e.reduce((s,l)=>s+l.weight,0);if(!i)return e;const o={};for(const s of r)o[s.categoryId]=(o[s.categoryId]||0)+1;return e.map(s=>{const l=r.length*s.weight/i,d=Math.min(Jc,Math.max(Vc,(l+1)/((o[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*d))}})}function Xc(e,t,a=[],n=null){const r=Pi(t),i=n?Zc(r,n.token,n.day):r,o=a.length?i.filter(g=>!a.includes(g.id)):i,s=o.length?o:i,l=s.reduce((g,m)=>g+m.weight,0),d=Math.floor(pe(e)*l);let u=0;for(const g of s)if(u+=g.weight,d<u)return p.outcomes.categories.find(m=>m.id===g.id)||g;return p.outcomes.categories[p.outcomes.categories.length-1]}function ji(){const e=He();return Math.floor((e.maxStreak||0)/Vd)}function ma(){var n;if(He().birthdayBonus2026Used)return 0;const t=((n=p.theme)==null?void 0:n.timezone)||"UTC";return J(t)==="2026-05-29"?1:0}function ba(){const e=He();return Math.max(0,ji()-(e.used||0))+ma()}function Cn(){var u;const e=K(),t=((u=p.theme)==null?void 0:u.timezone)||"UTC",a=J(t),n=new Set(H().filter(g=>g.token===e&&g.day<=a).map(g=>g.day));if(!n.size)return null;const r=[...n].sort()[0],[i,o,s]=a.split("-").map(Number),l=new Date(Date.UTC(i,o-1,s));let d=a;for(n.has(d)||(l.setUTCDate(l.getUTCDate()-1),d=l.toISOString().slice(0,10));n.has(d)||Ii(d);)l.setUTCDate(l.getUTCDate()-1),d=l.toISOString().slice(0,10);return d<r?null:d}function Bi(){return ba()>0&&Cn()!==null}function Qc(e){if(ba()<=0)return null;const t=Cn();if(!t)return null;const a=K(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,i=[n,...H()].filter(d=>{const u=`${d.day}|${d.token}`;return r.has(u)?!1:(r.add(u),!0)}).sort((d,u)=>d.day<u.day?1:d.day>u.day?-1:0);ze(i);const o=He(),l=Math.max(0,ji()-(o.used||0))===0&&ma()>0;return ca({...o,used:l?o.used||0:(o.used||0)+1,birthdayBonus2026Used:l?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),kn(Ge()),t}const Oi=new Map;function Ke(e){Oi.set(e,Date.now())}function zn(e,t=6e3){const a=Oi.get(e);return typeof a=="number"&&Date.now()-a<t}const eg="affektions-gacha:pending-ops:",Fi=200,tg=["glossary","gipfelbuch"];function _n(e){return`${eg}${e}:v1`}function ya(e){try{const t=JSON.parse(window.localStorage.getItem(_n(e))||"[]");return Array.isArray(t)?t.filter(a=>a&&a.id&&(a.kind==="upsert"||a.kind==="delete")):[]}catch{return[]}}function Dn(e,t){try{return t.length?window.localStorage.setItem(_n(e),JSON.stringify(t)):window.localStorage.removeItem(_n(e)),!0}catch{return!1}}function ag(e){const t=a=>{if(!a||typeof a!="object")return a;const n={...a};for(const[r,i]of Object.entries(n))typeof i=="string"&&i.startsWith("data:")&&(n[r]=null);return n};return{...e,entry:t(e.entry),body:t(e.body)}}let ng=0;function qi(e,{kind:t,id:a,entry:n=null,body:r}){if(!a)return null;const i={kind:t,id:a,entry:n,body:r,seq:`${Date.now()}-${++ng}`,queuedAt:Date.now()};let o=ya(e).filter(s=>s.id!==a);return o.push(i),o.length>Fi&&(o=o.slice(o.length-Fi)),Dn(e,o)||Dn(e,o.map(s=>s===i?ag(s):s)),i}function rg(e,t){const a=ya(e),n=a.filter(r=>!(r.id===t.id&&r.seq===t.seq));n.length!==a.length&&Dn(e,n)}function Wi(e,t){const a=ya(e);if(!a.length)return t;const n=new Set(a.filter(o=>o.kind==="delete").map(o=>o.id)),r=new Map(a.filter(o=>o.kind==="upsert"&&o.entry).map(o=>[o.id,o.entry])),i=[];for(const o of t)if(!n.has(o.id)){if(r.has(o.id)){i.push(r.get(o.id)),r.delete(o.id);continue}i.push(o)}return[...r.values()].reverse().concat(i)}const Ri=new Map;function wa(e){return Ri.get(e)||0}function Ui(e,t){return wa(e)!==t}const ig={"Content-Type":"text/plain;charset=utf-8"};async function og(e,t){const a={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:ig,body:JSON.stringify(t)};try{const n=await fetch(e,a);if(!n||!n.ok)return!1;const r=await n.json();return!!(r&&r.ok===!0)}catch{try{await fetch(e,{...a,mode:"no-cors"})}catch{}return!1}}const xa=new Map;function va(e,t){if(!t)return Promise.resolve(0);if(sg(t),xa.has(e))return xa.get(e);const a=(async()=>{const n=new Set;let r=0;for(;;){const i=ya(e).find(o=>!n.has(o.seq));if(!i)break;n.add(i.seq),await og(t,i.body)&&(rg(e,i),Ri.set(e,wa(e)+1),r++)}return r})().finally(()=>{xa.delete(e)});return xa.set(e,a),a}function Hi(e){return Promise.all(tg.map(t=>va(t,e).catch(()=>0)))}let In=null;function sg(e){const t=In===null;if(In=e,!!t)try{typeof window<"u"&&typeof window.addEventListener=="function"&&window.addEventListener("online",()=>{Hi(In).catch(()=>{})})}catch{}}function Pt(){var e;return J(((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function Gi(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:K()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function lg(e){if(!e||typeof e!="object"||zn("stimmung"))return;const t=Pt();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){ht()&&(Vi(),Nn());return}ht()!==a&&(Yi(a),jt(a))}function Ki(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(i,o)=>Math.round(o+(i-o)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function jt(e){document.body.style.background=Ki(e),Ji(e)}function Nn(){document.body.style.removeProperty("background"),Ji(null)}function ht(){try{const e=localStorage.getItem(rn);if(!e)return null;const t=JSON.parse(e);return t.day!==Pt()?null:t.hex||null}catch{return null}}function Yi(e){try{localStorage.setItem(rn,JSON.stringify({day:Pt(),hex:e}))}catch{}}function dg(e){const t=Pt();Yi(e),Ke("stimmung"),Gi(t,e)}function Vi(){try{localStorage.removeItem(rn)}catch{}}function cg(){const e=Pt();Vi(),Ke("stimmung"),Gi(e,"")}function gg(){const e=ht();e&&jt(e)}function Ji(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Zi(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=ht()||"#4aaa5a";Xi(e,t),Pn(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function ug(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=ht();t?jt(t):Nn()}function pg(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function i(o){Pn(e,o),jt(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),i(t.value)}),a&&a.addEventListener("input",()=>{const o=Qi(a.value);o&&(t&&(t.value=o),i(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||Qi((a==null?void 0:a.value)||"")||"#4aaa5a";dg(o),jt(o),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{cg(),Nn(),Xi(e,"#4aaa5a"),Pn(e,"#4aaa5a")})}function Xi(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Pn(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=Ki(t))}function Qi(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,i]=a;return`#${n}${n}${r}${r}${i}${i}`.toLowerCase()}return null}let jn="",Bn=null;function hg(e,t){jn=e,Bn=t}function On(){if(Bn)return Bn();if(!jn)return window.location.href;try{return new URL(jn,window.location.href).toString()}catch{return window.location.href}}function _e(e,t=null){const a=new URL(e,On()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function ka(e){var t;try{const a=$&&$.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=p.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function Bt(){var e;try{const t=p.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=K(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=mc(),i=wa("gipfelbuch");Hi(t.endpointUrl).catch(()=>{});const o=new AbortController,s=setTimeout(()=>o.abort(),12e3);let l;try{l=await fetch(n,{cache:"no-store",signal:o.signal})}finally{clearTimeout(s)}if(!l.ok)return ka(!1),!1;const d=await l.json();if(!d.ok)return ka(!1),!1;const u=wi(r),g=J(((e=p.theme)==null?void 0:e.timezone)||"UTC"),m=H(),x=m.filter(k=>k.title!=="(wiederhergestellt)"&&k.day<=g);x.length!==m.length&&ze(x);const b=Ue(),f=b.filter(k=>k.day<=g);if(f.length!==b.length&&oa(f),Array.isArray(d.history)&&d.history.length){const k=H(),z=new Map(k.map(y=>[`${y.day}|${y.token}`,y]));for(const y of d.history){if(y.title==="(wiederhergestellt)")continue;const w=oc(y.day);if(!w||w>g)continue;const S=typeof y.token=="string"?y.token.toLowerCase():y.token,T=`${w}|${S}`,M={...y,day:w,token:S},v=z.get(T);if(u&&v)continue;v&&v.bestanden&&!M.bestanden&&(M.bestanden=!0,M.bestandenAt=v.bestandenAt||null),v&&v.beweisUrl&&!M.beweisUrl&&(M.beweisUrl=v.beweisUrl),v&&v.reaction&&!M.reaction&&(M.reaction=v.reaction),v&&v.weather&&!M.weather&&(M.weather=v.weather),v&&v.pfand&&!M.pfand&&(M.pfand=!0),v&&v.revealedAt&&!M.revealedAt&&(M.revealedAt=v.revealedAt),v&&v.used&&!M.used&&(M.used=!0,M.usedAt=v.usedAt||null),v&&v.promptAnswer&&!M.promptAnswer&&(M.promptAnswer=v.promptAnswer);const O=v?$i(S,w):null;if(O&&v.categoryId===O.categoryId&&M.categoryId!==O.categoryId)for(const ee of["categoryId","categoryLabel","tone","title","message","link","unlockTime","photo","voucher"])M[ee]=v[ee];z.set(T,M)}const I=Array.from(z.values()).sort((y,w)=>w.day.localeCompare(y.day));ze(I),p.syncedHistory=I,kn(Ge())}if(Array.isArray(d.favourites)&&d.favourites.length&&!u){const k=Ue(),z=new Map(k.map(y=>[`${y.day}|${y.token}`,y])),I=new Set(sa());for(const y of d.favourites){if(y.day>g)continue;const w=typeof y.token=="string"?y.token.toLowerCase():y.token;I.has(`${y.day}|${w}`)||z.set(`${y.day}|${w}`,{...y,token:w})}oa(Array.from(z.values()).sort((y,w)=>w.day.localeCompare(y.day)))}if(d.tokens&&typeof d.tokens=="object"&&bc(d.tokens,r)&&we(),typeof d.questPoints=="number"&&d.questPoints>pa()&&Lc(d.questPoints),typeof d.streak=="number"&&d.streak>0&&$c(d.streak),d.baerlauchScores&&typeof d.baerlauchScores=="object"){const k=$n();let z=!1;for(const[I,y]of Object.entries(d.baerlauchScores))typeof y=="number"&&y>(k[I]||0)&&(k[I]=y,z=!0);if(z)try{localStorage.setItem(ei,JSON.stringify(k))}catch{}}if(typeof d.pfand=="number")try{jc(d.pfand)}catch{}if(Array.isArray(d.flaschenpost))try{Rc(d.flaschenpost)}catch{}if(Array.isArray(d.hugs))try{zi(d.hugs)}catch{}if(Array.isArray(d.wishes))try{zc(d.wishes)}catch{}if(typeof d.latestPing=="string"&&d.latestPing)try{const k=window.localStorage.getItem(ai)||"";d.latestPing>k&&(window.localStorage.setItem(ai,d.latestPing),p._newPing=!0)}catch{}if(d.stimmung)try{lg(d.stimmung)}catch{}if(Array.isArray(d.gipfelbuch)&&!zn("gipfelbuch")&&!Ui("gipfelbuch",i)){const k=Wi("gipfelbuch",d.gipfelbuch.filter(z=>z.id)).sort((z,I)=>(I.date||"").localeCompare(z.date||""));ua(k)}return $&&$.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:d}})),ka(!0),Array.isArray(d.history)?d.history.length:0}catch{return ka(!1),-1}}function we(){try{const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=K(),a=H().filter(u=>(u.token||"").toLowerCase()===t.toLowerCase()),n=Ue().filter(u=>(u.token||"").toLowerCase()===t.toLowerCase()),r=gt(),i=sa(),o=Nt(()=>Dt(p)),s=o.solved&&o.pointsEarned&&!o._logged?{challenge:ia(p),attempts:o.attempts,points:o.pointsEarned,period:o.period}:void 0;s&&(o._logged=!0,Sn(o));const l=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:Ge(),tokens:r,questPoints:pa(),flaschenpost:pt(),pfand:ut().count||0,...s?{questLog:s}:{}}),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:l};return fetch(e.endpointUrl,d).then(async u=>{let g=null;try{g=await u.json()}catch{g=null}!u.ok||g&&g.ok===!1||(xi(r),g&&g.ok===!0&&pc(i))},()=>fetch(e.endpointUrl,{...d,mode:"no-cors"}).then(()=>{xi(r)}).catch(()=>{}))}catch{}}function E(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const eo={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function fg(e){E(eo[e]||eo.soft)}const mg=20,bg=5;function yg(e){return e>=mg||e<bg}const wg=56,xg=700;function vg(e,t,a){return a<=xg&&Math.hypot(e,t)>=wg}let nt=!1,$a=null,De=null,Fn=null;function kg(){return nt}function $g({onChange:e}={}){nt||(nt=!0,Fn=e||null,De=document.querySelector("[data-ag-candle-veil]"),De&&(De.hidden=!1,De.classList.remove("is-blown"),requestAnimationFrame(()=>De.classList.add("is-lit")),Sg(De,(t,a)=>qn({dx:t,dy:a}))),document.documentElement.classList.add("is-candle"),E([10,40,10]),Promise.resolve().then(()=>st).then(t=>{$a=t.startCandleLights()}).catch(()=>{}),e&&e(!0))}function qn({dx:e=0,dy:t=-1}={}){if(!nt)return;nt=!1;const a=Fn;if(Fn=null,De){De.style.setProperty("--ag-blow-x",`${Math.max(-1,Math.min(1,e/120)).toFixed(2)}`),De.style.setProperty("--ag-blow-y",`${Math.max(-1,Math.min(1,t/120)).toFixed(2)}`),De.classList.add("is-blown"),De.classList.remove("is-lit");const n=De;setTimeout(()=>{nt||(n.hidden=!0,n.classList.remove("is-blown"))},900)}if(document.documentElement.classList.remove("is-candle"),E([30,20,10]),$a){try{$a()}catch{}$a=null}a&&a(!1)}function Sg(e,t){var n;if(e.dataset.bound)return;e.dataset.bound="1";let a=null;e.addEventListener("pointerdown",r=>{a={x:r.clientX,y:r.clientY,t:performance.now()}}),e.addEventListener("pointerup",r=>{if(!a)return;const i=r.clientX-a.x,o=r.clientY-a.y,s=performance.now()-a.t;a=null,vg(i,o,s)&&t(i,o)}),e.addEventListener("pointercancel",()=>{a=null}),(n=e.querySelector("[data-ag-candle-out]"))==null||n.addEventListener("click",()=>t(0,-1)),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&nt&&qn({})})}const Sa=29.530588853,Lg=Date.UTC(2e3,0,6,18,14),Eg=864e5;function Tg(e=new Date){const n=(((e instanceof Date?e.getTime():Date.parse(e))-Lg)/Eg%Sa+Sa)%Sa,r=n/Sa,i=(1-Math.cos(2*Math.PI*r))/2;return{age:n,phase:r,illumination:i}}const Mg=["Neumond","Zunehmende Sichel","Erstes Viertel","Zunehmender Mond","Vollmond","Abnehmender Mond","Letztes Viertel","Abnehmende Sichel"];function Ag(e){return Math.round(e*8)%8}function Cg(e,t=20){const a=(e%1+1)%1,n=a<=.5,r=Math.cos(2*Math.PI*a),i=Math.abs(r)*t,o=t,s=0,l=2*t,d=n?1:0,u=r<0,g=n?u?1:0:u?0:1;return`M${o},${s} A${t},${t} 0 0 ${d} ${o},${l} A${i.toFixed(2)},${t} 0 0 ${g} ${o},${s} Z`}function zg(e,{evening:t=!1,date:a=new Date}={}){if(!e)return;if(!t){e.innerHTML="",e.hidden=!0;return}const{phase:n,illumination:r}=Tg(a),i=20;e.hidden=!1,e.title=`${Mg[Ag(n)]} · ${Math.round(r*100)}%`,e.innerHTML=`<svg viewBox="0 0 ${2*i} ${2*i}" aria-hidden="true">
    <circle cx="${i}" cy="${i}" r="${i}" class="ag-moon-dark"/>
    <path d="${Cg(n,i)}" class="ag-moon-lit"/>
  </svg>`,e.classList.toggle("is-full",r>.97)}function to(e){const t=Array.isArray(p.specialDays&&p.specialDays.days)?p.specialDays.days:[],a=e.slice(5),n=K();for(const r of t){const i=r.repeat==="yearly";if((r.date===e||i&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}const ao=270;function _g(e,t){const a=H().filter(n=>n.token===e&&n.day<t&&typeof n.categoryId=="string"&&n.categoryId!=="special").sort((n,r)=>r.day.localeCompare(n.day)).slice(0,ao);return a.length<ao?!1:!a.some(n=>n.categoryId==="jackpot")}function no(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Dg(e){const t=c("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Ot(){return(p.photos||[]).filter(e=>e.type!=="video")}const Ig=4;function Ng(e,t){return H().filter(a=>a.token===e&&a.day<t&&It(a)&&!a.used).length}function ro(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,i=K(),o=`${p.theme.secret}|${i}|${e}${r?"|"+r:""}`,s=r?null:H().find(w=>w.token===i&&w.day===e),l=to(e);if(l&&!r&&(!s||s.categoryId==="special")){const w=Array.isArray(l.outcomes)&&l.outcomes.length?l.outcomes:[{title:l.label,message:""}],S=w[pn(`${o}|special|outcome`,w.length)],T={id:"special",label:l.label,weight:0,tone:l.tone||"jackpot",outcomes:w},M=l.photo&&l.photo.url?{type:"image",...l.photo}:l.photoAlt&&p.photos.length&&Ot().find(v=>v.alt===l.photoAlt)||null;return{day:e,token:i,category:T,outcome:S,photo:M,collectToken:S.token||null,unlockTime:l.unlockTime||null,unlockTimezone:l.unlockTimezone||null}}const d=r?null:$i(i,e),u=!r&&(!s||s.categoryId==="flaschenpost")?qc(e):null;if(u){const w=u.mode==="30"?"in 30 Tagen":"irgendwann";return{day:e,token:i,category:{id:"flaschenpost",label:"Flaschenpost 🍾",weight:0,tone:"warm",outcomes:[]},outcome:{title:"Post von dir selbst",message:`Versiegelt am ${ke(u.createdDay)}, mit „${w}“ drauf. Heute ist ${u.mode==="30"?"der dreissigste Tag":"irgendwann"}.

„${u.text}“`},photo:null,collectToken:null,voucher:!1,freikarte:!1,flaschenpost:u.id}}let g;d&&(g=p.outcomes.categories.find(w=>w.id===d.categoryId)),!g&&s&&s.categoryId&&(g=p.outcomes.categories.find(w=>w.id===s.categoryId)||null),g||(g=Xc(`${o}|category`,t||0,n,{token:i,day:e}),!r&&_g(i,e)&&(g=p.outcomes.categories.find(w=>w.id==="jackpot")||g));const m=ic();if(m){const w=p.outcomes.categories.find(S=>S.id===m);w&&(g=w)}g.id==="photo"&&!Ot().length&&(g=p.outcomes.categories.find(w=>w.id==="common")||g);const x=H().filter(w=>w.token===i&&w.day<e&&w.categoryId===g.id).sort((w,S)=>w.day.localeCompare(S.day)).map(w=>w.title),b=io(x,g.outcomes.map(w=>w.title));let f=g.outcomes.filter(w=>!b.has(w.title));if(f.length||(f=g.outcomes),!r&&Ng(i,e)>=Ig){const w=f.filter(S=>S.voucher!==!0);w.length&&(f=w)}const z=(s&&s.categoryId===g.id?g.outcomes.find(w=>w.title===s.title):null)||d&&g.outcomes.find(w=>w.title===d.outcomeTitle)||f[pn(`${o}|${g.id}|outcome`,f.length)],I=Ot();let y=null;if(g.id==="photo"&&s&&s.categoryId===g.id&&s.photo&&s.photo.url)y=s.photo;else if(g.id==="photo"&&I.length){const w=H().filter(v=>v.token===i&&v.day<e&&v.photo).sort((v,O)=>v.day.localeCompare(O.day)).map(v=>v.photo.url),S=io(w,I.map(v=>v.url)),T=I.filter(v=>!S.has(v.url)),M=T.length>0?T:I;y=M[pn(`${o}|photo`,M.length)]}return{day:e,token:i,category:g,outcome:z,photo:y,collectToken:z.token||null,voucher:z.voucher||!1,freikarte:z.freikarte===!0}}function io(e,t){const a=new Set(t);let n=new Set;for(const r of e)a.has(r)&&(n.add(r),n.size>=a.size&&(n=a.size>1?new Set([r]):new Set));return n}function Pg(){const e=oe()||J(p.theme.timezone),t=Ge();return ro(e,t)}function jg(e,t){return ro(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function Bg(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Og(e){const t=(r,i)=>$.style.setProperty(r,i),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const oo={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},so={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Fg(e){const t=to(e);if(!t)return;const a=(n,r)=>$.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))oo[n]&&typeof r=="string"&&a(oo[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))so[n]&&typeof r=="string"&&a(so[n],r)}const qg=`
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
         Glossar, Stimmung and Skincare — the smallest real navigation in the
         app, on the smallest current iPhone. Rather than fatten them to 44pt
         and wreck the chip row, the hit area is extended past the pill:
         28 + 2*8 = 44pt tall, while the visible design is untouched. The row
         gap is 8px, so ±4px sideways cannot make two chips overlap.

         On ::before deliberately: the active-state dots (quest, Stimmung)
         live on ::after, and one element only gets one ::after. */
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
      .ag-history-date{color:var(--ag-muted);font-size:.78rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase;min-width:0;white-space:nowrap}
      .ag-history-meta{display:block;font-size:.72rem;letter-spacing:.03em;text-transform:none;font-weight:400;opacity:.85;margin-top:1px}
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

      /* The draw button's sheen lives in the aurora rules further down,
         together with every other primary button. */

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
      /* Same pop for in-flow blocks: no translate, which ag-pop keeps for the centred capsule. */
      @keyframes ag-pop-in{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}
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
           375px-wide phone) before the first card. A title that fits on one
           or two lines and tighter copy keep the draw button near; the
           machine itself stays big — it is the app's face, and at 172px it
           read as an icon rather than a machine. */
        .ag-hero{gap:10px}
        .ag-machine-wrap{max-width:250px}
        .ag-emoji{font-size:clamp(.95rem,2.8vw,1.15rem)}
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
      /* Slower, not dimmer: the emoji keep their own colours at every hour. */
      .ag-widget.is-evening .ag-emoji{animation-duration:calc(var(--ag-emoji-duration,32s) * 2.2)}
      .ag-widget.is-evening .ag-machine-capsule{animation-duration:9s}

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
          bottom:calc(12px + var(--ag-safe-bottom) + var(--ag-nav-shift,0px));
          /* Its own compositing layer: WebKit has left fixed elements with a
             backdrop-filter stranded mid-scroll without one. */
          transform:translateZ(0);
          transition:opacity 150ms var(--ag-ease);
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
  /* Opaque enough that a card's text passing under it reads as texture, not
     as a second line of words fighting the labels. */
  background:rgba(12,24,15,.74);
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
   the face, the orb breathes. Pressed, it sinks. The halo reuses the old
   sheen pseudo-element, which rests one button-width to the left and slides
   across on hover; pin it in place or the halo floats beside the button.
   Both pseudo-elements sit at z-index -1, which still paints above the
   button's own background, so the face gradient lives on the sheen layer
   and the halo only shows around the rim. */
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
  transform:none;transition:none;
  animation:ag-hue 5s linear infinite;
}
.ag-widget .ag-button:hover::before{transform:none}
.ag-widget .ag-button::after{
  content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:-1;
  background:
    linear-gradient(115deg,transparent 42%,rgba(255,255,255,.45) 50%,transparent 58%),
    linear-gradient(135deg,#a9e3b5 0%,#5fb27a 45%,#2f7a4f 100%);
  background-size:260% 100%,100% 100%;
  animation:ag-sheen 3.4s ease-in-out infinite;
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
/* Once the day is drawn the title and kicker fold to one line; the machine
   keeps its size — shrinking it to 112px made the app's face an icon. */
@media (max-width:760px){
  .ag-widget .ag-copy h1{transition:font-size 400ms var(--ag-ease),margin 400ms var(--ag-ease)}
  .ag-widget.has-drawn .ag-copy h1{font-size:clamp(1.25rem,1rem + 2.6vw,1.7rem);margin:2px 0 10px}
  .ag-widget.has-drawn .ag-kicker{font-size:.62rem}
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

/* Streak-Retter in the bank: a gem count beside the streak, same pill
   language, quieter. Hidden while the rescue button itself is showing. */
.ag-widget .ag-streak-gems{
  display:inline-flex;align-items:center;gap:2px;
  padding:4px 9px;border-radius:999px;font-size:.78rem;
  font-variant-numeric:tabular-nums;color:var(--ag-muted);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
}
/* Bärlauch-Saison: the chip breathes green from March to May. */
.ag-widget .ag-chip-saison{
  position:relative;box-shadow:0 0 0 1px rgba(143,207,158,.45),0 0 14px rgba(143,207,158,.28);
  animation:ag-saison-breathe 3.2s ease-in-out infinite;
}
@keyframes ag-saison-breathe{
  0%,100%{box-shadow:0 0 0 1px rgba(143,207,158,.35),0 0 10px rgba(143,207,158,.18)}
  50%{box-shadow:0 0 0 1px rgba(143,207,158,.6),0 0 18px rgba(143,207,158,.4)}
}
@media (prefers-reduced-motion:reduce){.ag-widget .ag-chip-saison{animation:none}}
/* The one hint the machine gives about the hidden letter. */
.ag-widget .ag-draw-hint.is-secret{color:var(--ag-gold);font-style:italic;opacity:.9}

/* Fionn's reply on a wish: one line at the top of the card, gold like the
   milestone, quieter. */
.ag-widget .ag-wish-reply{
  margin:0 0 12px;padding:9px 12px;border-radius:var(--ag-radius-md);
  font-size:.86rem;line-height:1.4;color:var(--ag-gold);
  background:rgba(224,167,93,.1);border:1px solid rgba(224,167,93,.28);
}
/* The Stups banner now lives above the draw card, where it is seen before a
   pull, not only after one. */
.ag-widget .ag-ping-banner{margin:0 0 12px}

/* ── Licht tab: the lamps on the same glass ─────────────────────────────── */
/* The panel is a grid; a 1fr track takes the item's min-content width as its
   floor, and the scrolling mood row would hand it 700px. min-width:0 keeps the
   card at the panel's width and lets the row scroll inside it. */
.ag-widget .ag-licht-card{display:flex;flex-direction:column;gap:14px;min-width:0;width:100%}
.ag-widget .ag-licht-moods{min-width:0}
.ag-widget .ag-licht-head{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ag-widget .ag-licht-lamps{display:flex;gap:8px;flex-wrap:wrap}
.ag-widget .ag-licht-lamp{
  display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;
  font-size:.78rem;letter-spacing:.02em;color:var(--ag-muted);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
}
.ag-widget .ag-licht-lamp-dot{width:7px;height:7px;border-radius:999px;background:rgba(255,255,255,.25)}
.ag-widget .ag-licht-lamp[data-state="on"]{color:var(--ag-text)}
.ag-widget .ag-licht-lamp[data-state="on"] .ag-licht-lamp-dot{background:#8fcf9e;box-shadow:0 0 8px rgba(143,207,158,.6)}
.ag-widget .ag-licht-lamp[data-state="standby"] .ag-licht-lamp-dot{background:var(--ag-gold);opacity:.8}
.ag-widget .ag-licht-lamp-sub{opacity:.7;font-size:.7rem}
.ag-widget .ag-licht-conn{
  appearance:none;background:none;border:none;font-family:inherit;cursor:pointer;
  font-size:.72rem;color:var(--ag-muted);padding:4px 0 4px 12px;display:inline-flex;align-items:center;gap:6px;
  max-width:52%;text-align:right;line-height:1.3;flex:none;
}
.ag-widget .ag-licht-conn::before{content:"";width:6px;height:6px;border-radius:999px;background:var(--ag-muted);opacity:.45}
.ag-widget .ag-licht-conn[data-state="connected"]::before{background:#8fcf9e;opacity:.9;box-shadow:0 0 8px rgba(143,207,158,.5)}
.ag-widget .ag-licht-conn[data-state="error"]::before{background:#e0a75d;opacity:.9}
.ag-widget .ag-licht-conn[data-state="connecting"]::before{animation:ag-pulse 1.2s ease-in-out infinite}
/* Ten LEDs, as the lamps show them right now. */
.ag-widget .ag-licht-strip{display:flex;align-items:center;padding:10px 8px;border-radius:var(--ag-radius-md);background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.06)}
.ag-widget .ag-licht-strip i{display:block;flex:1;height:14px;border-radius:999px;background:var(--ag-led);box-shadow:0 0 10px var(--ag-led);transition:background 400ms var(--ag-ease),opacity 400ms var(--ag-ease),box-shadow 400ms var(--ag-ease)}
.ag-widget .ag-licht-strip.is-live i{cursor:pointer}
.ag-widget .ag-licht-strip i.is-selected{outline:2px solid #fff;outline-offset:2px}
/* The gaps are the cuts: a thin mark where a group ends, a tap target between
   every pair of lights either way. */
.ag-widget .ag-licht-strip b{display:block;flex:none;width:9px;height:26px;position:relative;cursor:pointer}
.ag-widget .ag-licht-strip b::after{content:"";position:absolute;left:3.5px;top:7px;width:2px;height:12px;border-radius:2px;background:rgba(255,255,255,.12);transition:background 160ms,height 160ms,top 160ms}
.ag-widget .ag-licht-strip b.is-cut::after{background:rgba(255,255,255,.75);height:22px;top:2px}
.ag-widget .ag-licht-strip:not(.is-live) b{pointer-events:none}
.ag-widget .ag-licht-strip.is-off i{box-shadow:none}
.ag-widget .ag-licht-row{display:flex;align-items:center;gap:12px}
.ag-widget .ag-licht-power{
  appearance:none;font-family:inherit;cursor:pointer;flex:none;
  width:64px;height:40px;border-radius:999px;font-size:.82rem;font-weight:500;letter-spacing:.02em;
  color:var(--ag-muted);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
  transition:background 200ms var(--ag-ease),color 200ms var(--ag-ease),box-shadow 200ms var(--ag-ease);
}
.ag-widget .ag-licht-power.is-on{color:#0d1f12;background:#8fcf9e;border-color:#8fcf9e;box-shadow:0 0 18px rgba(143,207,158,.35)}
.ag-widget .ag-licht-power:disabled{opacity:.45;cursor:default}
.ag-widget .ag-licht-slider{flex:1;display:flex;flex-direction:column;gap:4px;font-size:.72rem;color:var(--ag-muted)}
.ag-widget .ag-licht-slider input{width:100%;accent-color:var(--ag-gold);margin:0}
/* Sliders: a finger-sized thumb on a slim track. pan-y keeps the page
   scrollable over them while a sideways drag stays with the slider. */
.ag-widget .ag-licht-slider input[type=range]{-webkit-appearance:none;appearance:none;height:30px;background:transparent;touch-action:pan-y;cursor:pointer}
.ag-widget .ag-licht-slider input[type=range]::-webkit-slider-runnable-track{height:6px;border-radius:999px;background:linear-gradient(to right,var(--ag-gold) var(--ag-fill,50%),rgba(255,255,255,.16) var(--ag-fill,50%))}
.ag-widget .ag-licht-slider input[type=range]::-moz-range-track{height:6px;border-radius:999px;background:rgba(255,255,255,.16)}
.ag-widget .ag-licht-slider input[type=range]::-moz-range-progress{height:6px;border-radius:999px;background:var(--ag-gold)}
.ag-widget .ag-licht-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;margin-top:-9px;border-radius:50%;background:#fbf4e2;border:0;box-shadow:0 2px 8px rgba(0,0,0,.45),0 0 0 4px rgba(255,255,255,.06);transition:transform 140ms ease}
.ag-widget .ag-licht-slider input[type=range]::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:#fbf4e2;border:0;box-shadow:0 2px 8px rgba(0,0,0,.45)}
.ag-widget .ag-licht-slider input[type=range]:active::-webkit-slider-thumb{transform:scale(1.12)}
.ag-widget .ag-licht-slider input[type=range]:disabled{opacity:.45;cursor:default}
/* The palette bar: the firmware's 30 tints, tap to set. */
.ag-widget .ag-licht-palette{
  position:relative;height:34px;border-radius:999px;cursor:pointer;outline:none;
  touch-action:none;-webkit-user-select:none;user-select:none;
  background:linear-gradient(to right,rgb(255,200,80) 0%,rgb(255,60,0) 10%,rgb(255,0,140) 20%,rgb(80,0,255) 31%,rgb(0,140,255) 41%,rgb(0,255,160) 52%,rgb(80,255,0) 62%,rgb(255,240,0) 72%,rgb(255,80,160) 83%,rgb(0,180,180) 93%,rgb(255,220,120) 100%);
  border:1px solid rgba(255,255,255,.12);
}
.ag-widget .ag-licht-palette::after{
  content:"";position:absolute;top:50%;left:var(--ag-pick,0%);width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:999px;
  background:rgba(255,255,255,.18);border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.45);
  transition:left 300ms var(--ag-ease);
}
.ag-widget .ag-licht-palette:focus-visible{box-shadow:0 0 0 3px rgba(255,255,255,.35)}
.ag-widget .ag-licht-moods{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px 0;margin:0 -4px;padding-inline:4px}
.ag-widget .ag-licht-moods::-webkit-scrollbar{display:none}
.ag-widget .ag-licht-mood{
  appearance:none;flex:none;display:inline-flex;align-items:center;gap:7px;font-family:inherit;cursor:pointer;
  padding:7px 12px 7px 9px;border-radius:999px;font-size:.8rem;color:var(--ag-text);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
}
.ag-widget .ag-licht-mood:disabled{opacity:.45;cursor:default}
.ag-widget .ag-licht-mood-dot{width:14px;height:14px;border-radius:999px;background:var(--ag-mood);box-shadow:0 0 8px var(--ag-mood)}
.ag-widget .ag-licht-label{margin:0 0 6px;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ag-muted)}
.ag-widget .ag-licht-scene-list{display:flex;flex-wrap:wrap;gap:8px}
.ag-widget .ag-licht-scene{
  appearance:none;display:inline-flex;align-items:center;gap:8px;font-family:inherit;cursor:pointer;
  padding:7px 12px;border-radius:999px;font-size:.8rem;color:var(--ag-text);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
}
.ag-widget .ag-licht-scene:disabled{opacity:.45;cursor:default}
.ag-widget .ag-licht-scene-dots{display:inline-flex;gap:3px}
.ag-widget .ag-licht-scene-dots i{width:9px;height:9px;border-radius:999px}
.ag-widget .ag-licht-foot{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px}
.ag-widget .ag-licht-foot .ag-secondary{display:inline-flex;align-items:center;justify-content:center;text-align:center;min-width:0;padding-inline:10px;font-size:.84rem}
.ag-widget .ag-licht-note{margin:0;font-size:.74rem;line-height:1.45;color:var(--ag-muted)}

/* A button waiting for its second tap (see confirm.js). */
.ag-widget .is-armed{
  color:var(--ag-gold)!important;border-color:rgba(224,167,93,.6)!important;
  background:rgba(224,167,93,.14)!important;box-shadow:0 0 0 2px rgba(224,167,93,.25);
  animation:ag-pulse 1.1s ease-in-out infinite;
}

/* ── Kapsel-Wetter: the hero under the sky ────────────────────────────── */
/* The weather sits over the machine, not over the title: an overlay on the
   machine wrap, a little wider than the machine itself. */
.ag-widget.is-raining .ag-machine-wrap::after,
.ag-widget.is-snowing .ag-machine-wrap::after,
.ag-widget.is-foggy .ag-machine-wrap::after{
  content:"";position:absolute;inset:-6% -14%;pointer-events:none;border-radius:32px;z-index:3;
  -webkit-mask-image:radial-gradient(ellipse at center,#000 55%,transparent 78%);mask-image:radial-gradient(ellipse at center,#000 55%,transparent 78%);
}
.ag-widget.is-raining .ag-machine-wrap::after{
  background:repeating-linear-gradient(100deg,transparent 0 14px,rgba(170,200,255,.22) 14px 15px,transparent 15px 26px);
  background-size:100% 220%;animation:ag-rain 900ms linear infinite;opacity:.55;
}
@keyframes ag-rain{from{background-position:0 -120%}to{background-position:0 100%}}
.ag-widget.is-raining .ag-emoji{filter:drop-shadow(0 7px 2px rgba(140,180,255,.35))}
.ag-widget.is-snowing .ag-machine-wrap::after{
  background-image:radial-gradient(circle,rgba(255,255,255,.9) 0 1.5px,transparent 2.5px),radial-gradient(circle,rgba(255,255,255,.6) 0 1px,transparent 2px);
  background-size:38px 38px,61px 61px;background-position:0 0,17px 29px;
  animation:ag-snow 6s linear infinite;opacity:.8;
}
@keyframes ag-snow{from{background-position:0 -38px,17px -32px}to{background-position:9px 38px,2px 90px}}
.ag-widget.is-foggy .ag-machine-wrap::after{background:linear-gradient(180deg,rgba(200,210,205,0) 30%,rgba(200,210,205,.22) 70%,rgba(200,210,205,.32));animation:ag-fog 7s ease-in-out infinite alternate}
@keyframes ag-fog{from{opacity:.5}to{opacity:1}}
.ag-widget.is-stormy .ag-stage{animation:ag-lightning 9s linear infinite}
@keyframes ag-lightning{0%,89%,93%,100%{filter:none}90%,92%{filter:brightness(1.9) saturate(.6)}}
@media (prefers-reduced-motion:reduce){.ag-widget .ag-machine-wrap::after,.ag-widget.is-stormy .ag-stage{animation:none!important}}

/* ── Geheimtinte ───────────────────────────────────────────────────────── */
.ag-widget .ag-ink{-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;cursor:pointer;touch-action:none}
.ag-widget .ag-ink .ag-ink-ch{opacity:.06;transition:opacity 260ms ease;transition-delay:calc(var(--i) * 9ms);text-shadow:0 0 6px rgba(255,255,255,.18)}
.ag-widget .ag-ink.is-held .ag-ink-ch{opacity:1;text-shadow:none}
.ag-widget .ag-ink-hint{margin:0 0 8px;font-size:.78rem;color:var(--ag-gold);font-style:italic;opacity:.9}

/* ── Nachtlicht: after 22:00 the orbit is fireflies ────────────────────── */
.ag-widget.is-evening .ag-emoji{font-size:0;pointer-events:auto;cursor:pointer;padding:12px;margin:-12px;filter:none;opacity:1}
.ag-widget.is-evening .ag-emoji::after{
  content:"";display:block;width:7px;height:7px;border-radius:50%;
  background:#ffe9a0;box-shadow:0 0 10px 4px rgba(255,220,120,.55);
  animation:ag-firefly 2.8s ease-in-out infinite;animation-delay:var(--ag-emoji-delay,0s);
}
.ag-widget.is-evening .ag-emoji.is-flare::after{animation:ag-flare 900ms ease-out}
@keyframes ag-firefly{0%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1.15)}}
@keyframes ag-flare{0%{box-shadow:0 0 14px 8px rgba(255,230,140,.9);transform:scale(1.8)}100%{box-shadow:0 0 10px 4px rgba(255,220,120,.55);transform:scale(1)}}

/* ── Münzschlitz + Zugeklappt: things that fly into the nav ────────────── */
.ag-coin,.ag-envelope{position:fixed;z-index:3000;pointer-events:none;font-size:1.8rem;line-height:1;transform:translate(-50%,-50%);will-change:transform,opacity;filter:drop-shadow(0 4px 8px rgba(0,0,0,.45))}
.ag-envelope{font-size:2rem}
.ag-widget .ag-bottomnav-btn-icon.is-clink{animation:ag-clink 600ms var(--ag-ease)}
@keyframes ag-clink{0%{transform:none}30%{transform:translateY(-6px) scale(1.25)}55%{transform:translateY(2px) scale(.95)}100%{transform:none}}

/* ── Umarmungs-Zähler ──────────────────────────────────────────────────── */
.ag-widget .ag-hugs{margin:18px 4px 6px}
.ag-widget .ag-hugs-label{display:block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ag-muted);margin-bottom:6px}
.ag-widget .ag-hugs-row{display:flex;flex-wrap:wrap;gap:2px}
.ag-widget .ag-hug-heart{appearance:none;background:none;border:none;padding:2px;font-family:inherit;font-size:.95rem;line-height:1;color:#e0a75d;opacity:.85;cursor:pointer;transition:transform 160ms var(--ag-ease)}
.ag-widget .ag-hug-heart.is-flare{transform:scale(1.6);color:#ffd27a;opacity:1}

/* ── Licht: the second set of controls ──────────────────────────────────── */
.ag-widget .ag-licht-lamp{appearance:none;font-family:inherit;cursor:pointer}
.ag-widget .ag-licht-target{display:inline-flex;align-self:flex-start;padding:3px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
.ag-widget .ag-licht-target button{appearance:none;border:none;background:none;font-family:inherit;cursor:pointer;color:var(--ag-muted);font-size:.76rem;padding:5px 12px;border-radius:999px}
.ag-widget .ag-licht-target button.is-active{color:var(--ag-text);background:rgba(255,255,255,.12)}
.ag-widget .ag-licht-random{appearance:none;font-family:inherit;cursor:pointer;flex:none;width:44px;height:40px;border-radius:999px;font-size:1.1rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
.ag-widget .ag-licht-random:disabled{opacity:.45;cursor:default}
.ag-widget .ag-licht-slider em{font-style:normal;color:var(--ag-text);margin-left:4px}
.ag-widget .ag-licht-save{display:flex;gap:8px}
.ag-widget .ag-licht-save input{flex:1;min-width:0}
.ag-widget .ag-licht-save .ag-secondary{flex:none}

/* ── Pfand: a Niete goes back into the machine ─────────────────────────── */
.ag-widget .ag-pfand{margin:12px 0 4px;padding:10px 12px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.04);border:1px dashed rgba(255,255,255,.14)}
.ag-widget .ag-pfand-handle{
  appearance:none;width:100%;font-family:inherit;cursor:grab;touch-action:none;
  display:flex;align-items:center;justify-content:center;gap:8px;
  padding:10px 12px;border-radius:999px;font-size:.88rem;color:var(--ag-text);
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
  -webkit-user-select:none;user-select:none;-webkit-touch-callout:none;
}
.ag-widget .ag-pfand-handle:active{cursor:grabbing}
.ag-widget .ag-pfand-handle.is-ready{color:#8fcf9e;border-color:rgba(143,207,158,.6);box-shadow:0 0 0 2px rgba(143,207,158,.25)}
.ag-widget .ag-pfand-count{font-variant-numeric:tabular-nums;color:var(--ag-muted);font-size:.78rem}
.ag-widget .ag-pfand-hint{margin:6px 0 0;text-align:center;font-size:.72rem;color:var(--ag-muted)}
.ag-widget .ag-result.is-pfand-dragging{will-change:transform,opacity}
.ag-pfand-capsule{position:fixed;z-index:3000;pointer-events:none;width:22px;height:30px;border-radius:11px;
  background:linear-gradient(180deg,#8fcf9e 0 50%,#f6f1e4 50% 100%);box-shadow:0 4px 10px rgba(0,0,0,.45);transform:translate(-50%,-50%)}
.ag-widget .ag-machine-wrap.is-gulp{animation:ag-gulp 600ms var(--ag-ease)}
@keyframes ag-gulp{0%{transform:none}35%{transform:scale(1.05) translateY(3px)}60%{transform:scale(.98)}100%{transform:none}}

/* ── Morsen ─────────────────────────────────────────────────────────────── */
.ag-widget .ag-morse{display:flex;flex-direction:column;gap:8px}
.ag-widget .ag-morse-pad{
  appearance:none;font-family:inherit;cursor:pointer;touch-action:none;-webkit-user-select:none;user-select:none;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  min-height:96px;border-radius:var(--ag-radius-lg);color:var(--ag-text);
  background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.12),rgba(255,255,255,.03) 70%);
  border:1px solid rgba(255,255,255,.14);transition:transform 90ms var(--ag-ease),background 120ms;
}
.ag-widget .ag-morse-pad small{font-size:.7rem;color:var(--ag-muted);font-weight:400}
.ag-widget .ag-morse-pad.is-hit{transform:scale(.97);background:radial-gradient(circle at 50% 40%,rgba(255,240,200,.35),rgba(255,255,255,.04) 70%)}
.ag-widget .ag-morse-dots{display:flex;gap:6px;min-height:10px;justify-content:center}
.ag-widget .ag-morse-dots i{width:8px;height:8px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 8px rgba(255,220,120,.6);animation:ag-pop-in 220ms var(--ag-ease) both}

.ag-widget .ag-licht-foot-single{grid-template-columns:1fr}

/* ── Flaschenpost ──────────────────────────────────────────────────────── */
.ag-widget .ag-post{margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)}
.ag-widget .ag-post-idle{display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.ag-widget .ag-post-count{margin:0;font-size:.78rem;color:var(--ag-muted)}
.ag-widget .ag-post-modes{display:inline-flex;gap:4px;padding:3px;margin:10px 0 4px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
.ag-widget .ag-post-mode{appearance:none;border:none;background:none;font-family:inherit;cursor:pointer;color:var(--ag-muted);font-size:.8rem;padding:6px 12px;border-radius:999px}
.ag-widget .ag-post-mode.is-active{color:var(--ag-text);background:rgba(255,255,255,.12)}
.ag-widget [data-tone="warm"] .ag-badge{letter-spacing:.04em}

/* ── Pulsschlag ────────────────────────────────────────────────────────── */
.ag-widget .ag-licht-lamp{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.ag-widget.is-pulsing .ag-licht-lamp-dot{animation:ag-heartbeat 1s ease-in-out infinite}
@keyframes ag-flicker{0%,100%{opacity:.55;transform:scale(.92)}17%{opacity:.9;transform:scale(1.05)}31%{opacity:.6}48%{opacity:1;transform:scale(1.1)}63%{opacity:.4;transform:scale(.88)}80%{opacity:.85}}
.ag-widget.is-flickering .ag-licht-lamp-dot{animation:ag-flicker 1.7s ease-in-out infinite}
.ag-widget.is-flickering .ag-licht-strip i{animation:ag-flicker 1.3s ease-in-out infinite;animation-delay:calc(var(--i,0) * -.13s)}
.ag-widget .ag-licht-foot .is-active{border-color:var(--ag-gold);color:var(--ag-gold);box-shadow:0 0 14px rgba(224,167,93,.3)}
@keyframes ag-rainbow-flow{to{filter:hue-rotate(360deg)}}
.ag-widget.is-rainbow .ag-licht-strip i{animation:ag-rainbow-flow 4s linear infinite;animation-delay:calc(var(--i,0) * -.4s)}
.ag-widget.is-rainbow .ag-licht-lamp-dot{animation:ag-rainbow-flow 4s linear infinite}
.ag-widget .ag-licht-foot [data-ag-licht-rainbow].is-active{border-color:transparent;background:linear-gradient(var(--ag-surface),var(--ag-surface)) padding-box,linear-gradient(90deg,#ff5a5a,#ffb84d,#8fcf9e,#8ab8cf,#c9a7ff) border-box;color:var(--ag-text);box-shadow:0 0 14px rgba(201,167,255,.3)}
.ag-widget.is-pulsing .ag-licht-strip i{animation:ag-heartbeat 1s ease-in-out infinite}
@keyframes ag-heartbeat{0%{transform:scale(1);opacity:1}18%{transform:scale(1.5);opacity:1}32%{transform:scale(1);opacity:.5}52%{transform:scale(1.3);opacity:.95}70%,100%{transform:scale(1);opacity:.45}}

/* ── Licht: groups ──────────────────────────────────────────────────────── */
.ag-widget .ag-licht-groups{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.ag-widget .ag-licht-group{
  appearance:none;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px;
  padding:5px 10px;border-radius:999px;font-size:.78rem;color:var(--ag-muted);
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-variant-numeric:tabular-nums;
}
.ag-widget .ag-licht-group.is-active{color:var(--ag-text);background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.3)}
.ag-widget .ag-licht-group:disabled{opacity:.4;cursor:default}
.ag-widget .ag-licht-group-dot{width:10px;height:10px;border-radius:50%;box-shadow:0 0 6px currentColor}
.ag-widget .ag-licht-group-op{width:32px;justify-content:center;padding:5px 0;font-size:.95rem;line-height:1}
.ag-widget .ag-licht-white{margin-top:-4px}

/* The keyboard is up: the nav steps aside instead of floating mid-screen. */
.ag-widget .ag-bottomnav.is-keyboard{opacity:0;pointer-events:none}

/* ── Der Knopf: a gashapon knob in the draw card, in place of the button ──
   A disc with a bar handle, turned by --ag-knob-angle while a finger winds
   it; the label under it carries the button's old words. */
.ag-widget .ag-draw-knob{display:flex;flex-direction:column;align-items:center;gap:8px;margin:0 auto}
.ag-widget .ag-knob{
  position:relative;width:88px;height:88px;flex:none;
  transform:rotate(var(--ag-knob-angle,0deg));
  border-radius:50%;cursor:grab;touch-action:none;
  background:
    radial-gradient(circle at 35% 30%,rgba(255,255,255,.3),transparent 48%),
    linear-gradient(180deg,#dfd8c6,#8f8773);
  box-shadow:inset 0 -4px 8px rgba(0,0,0,.35),inset 0 2px 2px rgba(255,255,255,.55),0 8px 18px rgba(0,0,0,.45),0 0 0 6px rgba(8,28,18,.55),0 0 0 7px rgba(255,255,255,.1);
  border:1px solid rgba(0,0,0,.35);
}
.ag-widget .ag-knob::before{
  content:"";position:absolute;left:50%;top:50%;width:68%;height:20%;
  transform:translate(-50%,-50%);border-radius:5px;
  background:linear-gradient(180deg,#5a5446,#2d2922);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 1px 2px rgba(0,0,0,.5);
}
.ag-widget .ag-knob::after{
  content:"";position:absolute;left:50%;top:9%;width:9%;aspect-ratio:1;border-radius:50%;
  transform:translateX(-50%);background:#e0a75d;box-shadow:0 0 8px rgba(224,167,93,.9);
}
.ag-widget .ag-knob.is-turning{cursor:grabbing;box-shadow:inset 0 -4px 8px rgba(0,0,0,.35),inset 0 2px 2px rgba(255,255,255,.55),0 10px 24px rgba(0,0,0,.5),0 0 0 6px rgba(8,28,18,.55),0 0 0 7px rgba(255,255,255,.1),0 0 26px rgba(255,236,170,.4)}
.ag-widget .ag-knob.is-springing{transition:transform 380ms cubic-bezier(.3,1.6,.4,1)}
.ag-widget .ag-knob.is-locked.is-turning{filter:saturate(.6)}
.ag-widget .ag-knob.is-fired{box-shadow:inset 0 -4px 8px rgba(0,0,0,.35),0 0 0 6px rgba(8,28,18,.55),0 0 36px rgba(255,236,170,.85)}
@keyframes ag-knob-spin{to{transform:rotate(calc(var(--ag-knob-angle,0deg) + 360deg))}}
.ag-widget.is-revealing .ag-knob{animation:ag-knob-spin .9s linear infinite}
.ag-widget.has-drawn .ag-knob{opacity:.8}
.ag-widget .ag-knob:focus-visible{outline:2px solid var(--ag-gold);outline-offset:9px}
.ag-widget .ag-knob-label{
  background:none;border:none;padding:4px 10px;cursor:pointer;
  color:var(--ag-text);font:inherit;font-size:.86rem;letter-spacing:.04em;
  border-radius:999px;transition:background 150ms ease;
}
.ag-widget .ag-knob-label:hover{background:rgba(255,255,255,.06)}
.ag-widget .ag-knob-label[disabled]{cursor:wait;color:var(--ag-muted)}
.ag-widget .ag-knob-label[disabled] span:after{content:"...";display:inline-block;width:1.2em;text-align:left}
.ag-widget .ag-draw-card{justify-content:space-between}

/* ── Mondfenster: tonight's moon in the window, upper left of the capsule ── */
.ag-widget .ag-moon{
  position:absolute;left:33%;top:31%;width:10%;aspect-ratio:1;transform:translate(-50%,-50%);
  z-index:2;pointer-events:none;opacity:0;transition:opacity 1.2s ease;
}
.ag-widget .ag-moon svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 6px rgba(255,246,214,.55))}
.ag-widget .ag-moon-dark{fill:rgba(255,246,214,.07);stroke:rgba(255,246,214,.15);stroke-width:.6}
.ag-widget .ag-moon-lit{fill:#fff6d6}
.ag-widget.is-evening .ag-moon{opacity:.95}
.ag-widget .ag-moon.is-full svg{filter:drop-shadow(0 0 12px rgba(255,246,214,.9))}

/* ── Aufkleber: the reaction stuck on the card ── */
.ag-widget .ag-result{position:relative}
.ag-widget .ag-aufkleber-layer{position:absolute;inset:0;pointer-events:none;z-index:3;border-radius:inherit}
.ag-widget .ag-aufkleber{
  position:absolute;pointer-events:auto;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;
  font-size:2rem;line-height:1;padding:4px;
  transform:translate(-50%,-50%) rotate(var(--ag-aufkleber-rot,0deg));
  filter:drop-shadow(0 3px 3px rgba(0,0,0,.35));
  transition:transform 200ms var(--ag-ease);
}
.ag-widget .ag-aufkleber::before{
  content:"";position:absolute;inset:-2px;border-radius:50%;z-index:-1;
  background:radial-gradient(circle,rgba(255,255,255,.95) 55%,rgba(255,255,255,.6) 70%,transparent 72%);
}
.ag-widget .ag-aufkleber.is-dragging{cursor:grabbing;transform:translate(-50%,-50%) rotate(var(--ag-aufkleber-rot,0deg)) scale(1.18);filter:drop-shadow(0 10px 10px rgba(0,0,0,.4));transition:none}

/* ── Kneifen: the card's copy that flies into the star ── */
.ag-fav-ghost{
  position:fixed;z-index:9999;pointer-events:none;border-radius:4px;
  background:#fbf8f1;box-shadow:0 10px 30px rgba(0,0,0,.45);transform-origin:center;
  border:8px solid #fbf8f1;border-bottom-width:22px;box-sizing:border-box;
}
.ag-fav-ghost::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(143,207,158,.5),rgba(47,122,79,.6))}

/* ── Kerze ── */
.ag-widget .ag-candle{
  background:none;border:1px solid rgba(255,255,255,.14);border-radius:999px;
  width:34px;height:34px;padding:0;font-size:1.05rem;line-height:1;cursor:pointer;
  align-self:flex-start;margin-top:2px;
  box-shadow:0 0 0 0 rgba(255,200,120,0);transition:box-shadow 400ms ease,transform 200ms var(--ag-ease);
}
.ag-widget .ag-candle:hover{transform:translateY(-1px);box-shadow:0 0 16px rgba(255,200,120,.35)}
.ag-candle-veil{
  position:fixed;inset:0;z-index:10000;touch-action:none;cursor:pointer;
  background:radial-gradient(60% 50% at 50% 92%,rgba(255,170,70,.22),rgba(6,10,8,.94) 60%);
  opacity:0;transition:opacity 900ms ease;
  display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:14px;
  padding-bottom:calc(72px + var(--ag-safe-bottom,0px));
}
.ag-candle-veil.is-lit{opacity:1;animation:ag-candle-room 3.1s ease-in-out infinite}
@keyframes ag-candle-room{0%,100%{filter:brightness(1)}30%{filter:brightness(1.06)}55%{filter:brightness(.97)}80%{filter:brightness(1.04)}}
.ag-candle-veil .ag-candle-body{
  width:26px;height:84px;border-radius:5px 5px 3px 3px;
  background:linear-gradient(90deg,#f4e9cf,#e6d8b4 50%,#c9b88f);
  box-shadow:0 10px 20px rgba(0,0,0,.6);position:relative;
}
.ag-candle-veil .ag-candle-body::after{content:"";position:absolute;left:50%;top:-8px;width:3px;height:10px;background:#222;transform:translateX(-50%)}
.ag-candle-veil .ag-flame{
  width:22px;height:44px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
  background:radial-gradient(circle at 50% 70%,#fff8d6 0 18%,#ffcf5a 40%,#ff8c2a 70%,rgba(255,80,20,.1) 100%);
  box-shadow:0 0 30px rgba(255,180,80,.8),0 0 80px rgba(255,140,40,.45);
  transform-origin:50% 100%;margin-bottom:-6px;
  animation:ag-flame 1.3s ease-in-out infinite alternate;
  transition:transform 500ms ease,opacity 500ms ease;
}
@keyframes ag-flame{0%{transform:scale(1,1) rotate(-3deg)}40%{transform:scale(.92,1.08) rotate(2deg)}100%{transform:scale(1.04,.96) rotate(-1deg)}}
.ag-candle-veil.is-blown .ag-flame{animation:none;transform:translate(calc(var(--ag-blow-x,0) * 60px),calc(var(--ag-blow-y,-1) * 30px)) scale(.3,.5) rotate(calc(var(--ag-blow-x,0) * 50deg));opacity:0}
.ag-candle-veil.is-blown{opacity:0}
.ag-candle-veil .ag-candle-hint{margin:0;color:rgba(255,236,190,.7);font-size:.82rem;letter-spacing:.06em;text-transform:uppercase}
.ag-candle-veil .ag-candle-out{background:none;border:1px solid rgba(255,236,190,.25);color:rgba(255,236,190,.85);border-radius:999px;padding:6px 14px;font-size:.8rem;cursor:pointer}
@media (prefers-reduced-motion:reduce){
  .ag-candle-veil.is-lit,.ag-candle-veil .ag-flame,.ag-widget.is-revealing .ag-knob{animation:none}
}

/* ── Wanderweg: the Lieblinge as a hike ── */
.ag-widget .ag-wanderweg{position:relative;width:100%;border-radius:var(--ag-radius-md);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),inset 0 2px 14px rgba(0,0,0,.35)}
.ag-widget .ag-ww-scene{position:absolute;inset:0;display:block}
.ag-widget .ag-ww-star{fill:#fff6d6;opacity:.35;animation:ag-ww-twinkle 3.2s ease-in-out infinite}
@keyframes ag-ww-twinkle{0%,100%{opacity:.25}50%{opacity:.8}}
.ag-widget .ag-ww-ridge{fill:#0d2117;stroke:rgba(255,255,255,.07);stroke-width:1}
.ag-widget .ag-ww-trail-shadow{fill:none;stroke:rgba(0,0,0,.45);stroke-width:7;stroke-linecap:round}
.ag-widget .ag-ww-trail{fill:none;stroke:#f1e9d2;stroke-width:2.5;stroke-dasharray:6 8;stroke-linecap:round;opacity:.85}
.ag-widget .ag-ww-summit,.ag-widget .ag-ww-start{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none;color:#f1e9d2}
.ag-widget .ag-ww-flag{font-size:1.5rem;line-height:1;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6));animation:ag-ww-wave 2.4s ease-in-out infinite;transform-origin:20% 90%}
@keyframes ag-ww-wave{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
.ag-widget .ag-ww-summit-label,.ag-widget .ag-ww-start-label{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;opacity:.75;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.7)}
.ag-widget .ag-ww-start-label{margin-top:10px}
.ag-widget .ag-ww-hiker{position:absolute;transform:translate(-50%,-78%);font-size:1.35rem;line-height:1;filter:drop-shadow(0 3px 3px rgba(0,0,0,.6));transition:left 220ms ease-out,top 220ms ease-out;pointer-events:none;z-index:3}
.ag-widget .ag-ww-hiker.is-facing-left{transform:translate(-50%,-78%) scaleX(-1)}
.ag-widget .ag-ww-stop{
  position:absolute;transform:translate(-7px,-50%);background:none;border:none;padding:0;cursor:pointer;
  display:flex;align-items:center;gap:8px;color:var(--ag-text);text-align:left;font:inherit;z-index:2;
}
.ag-widget .ag-ww-stop.is-right{flex-direction:row-reverse;text-align:right;transform:translate(calc(-100% + 7px),-50%)}
.ag-widget .ag-ww-dot{width:14px;height:14px;border-radius:50%;flex:none;background:#f1e9d2;box-shadow:0 0 0 3px rgba(8,28,18,.8),0 0 14px rgba(255,236,170,.6)}
.ag-widget .ag-ww-stop[data-tone="jackpot"] .ag-ww-dot,.ag-widget .ag-ww-stop[data-tone="special"] .ag-ww-dot{background:var(--ag-gold)}
.ag-widget .ag-ww-stop[data-tone="photo"] .ag-ww-dot,.ag-widget .ag-ww-stop[data-tone="rare"] .ag-ww-dot{background:var(--ag-green)}
.ag-widget .ag-ww-label{
  display:flex;align-items:center;gap:8px;max-width:min(54vw,196px);padding:6px 10px 6px 6px;border-radius:14px;
  background:rgba(10,22,16,.72);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  box-shadow:0 6px 16px rgba(0,0,0,.4);transition:transform 160ms var(--ag-ease),border-color 160ms;
}
.ag-widget .ag-ww-stop.is-right .ag-ww-label{flex-direction:row-reverse;padding:6px 6px 6px 10px}
.ag-widget .ag-ww-stop:hover .ag-ww-label,.ag-widget .ag-ww-stop:focus-visible .ag-ww-label{transform:translateY(-1px);border-color:rgba(255,255,255,.3)}
.ag-widget .ag-ww-stop:focus-visible{outline:none}
.ag-widget .ag-ww-thumb{width:46px;height:46px;border-radius:50%;overflow:hidden;flex:none;box-shadow:0 0 0 2px rgba(255,255,255,.25)}
.ag-widget .ag-ww-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.ag-widget .ag-ww-mark{width:38px;height:38px;border-radius:50%;flex:none;display:grid;place-items:center;font-size:1.15rem;background:rgba(255,255,255,.08)}
.ag-widget .ag-ww-text{display:flex;flex-direction:column;min-width:0;gap:1px}
.ag-widget .ag-ww-date{font-size:.6rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ag-muted);white-space:nowrap}
.ag-widget .ag-ww-title{font-size:.86rem;font-weight:500;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ag-widget .ag-ww-line{font-size:.72rem;color:var(--ag-muted);line-height:1.3;font-style:italic;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
/* The open card, right on the trail */
.ag-widget .ag-ww-stop.is-open .ag-ww-label{border-color:rgba(255,236,170,.6);box-shadow:0 6px 16px rgba(0,0,0,.4),0 0 18px rgba(255,236,170,.25)}
.ag-widget .ag-ww-stop.is-open .ag-ww-dot{box-shadow:0 0 0 3px rgba(8,28,18,.8),0 0 18px rgba(255,236,170,.9)}
.ag-widget .ag-ww-card{position:absolute;left:8px;right:8px;z-index:4;animation:ag-ww-card-rise 260ms var(--ag-ease) both}
@keyframes ag-ww-card-rise{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.ag-widget .ag-ww-card .ag-history{display:block}
.ag-widget .ag-ww-card .ag-history-item{content-visibility:visible;contain-intrinsic-size:auto;background:rgba(14,28,20,.94);border-color:rgba(255,255,255,.14);box-shadow:0 14px 30px rgba(0,0,0,.5)}
@media (prefers-reduced-motion:reduce){
  .ag-widget .ag-ww-star,.ag-widget .ag-ww-flag,.ag-widget .ag-ww-card{animation:none}
  .ag-widget .ag-ww-hiker{transition:none}
}

/* ── Kurs: a course read one step at a time under the message ── */
.ag-widget .ag-kurs{margin:14px 0 6px;padding:14px 14px 12px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}
.ag-widget .ag-kurs-count{margin:0 0 4px;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ag-muted)}
.ag-widget .ag-kurs-title{margin:0 0 8px;font-family:"Boska",Georgia,serif;font-size:1.25rem;line-height:1.2;letter-spacing:-.01em}
.ag-widget .ag-kurs-figure{margin:4px 0 12px;padding:8px 6px;border-radius:12px;background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.08)}
.ag-widget .ag-kurs-figure svg{display:block;width:100%;height:auto;font-family:inherit}
.ag-widget .ag-kurs-text{min-height:3em}
.ag-widget .ag-kurs-dots{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0 10px}
.ag-widget .ag-kurs-dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.14)}
.ag-widget .ag-kurs-dots i.is-past{background:var(--ag-green)}
.ag-widget .ag-kurs-dots i.is-now{background:var(--ag-gold);box-shadow:0 0 8px rgba(224,167,93,.8);transform:scale(1.25)}
.ag-widget .ag-kurs-nav{display:flex;justify-content:space-between;gap:10px}
.ag-widget .ag-kurs-nav .ag-kurs-next{min-height:40px;padding:0 18px}
.ag-widget .ag-kurs-nav .ag-kurs-prev[disabled]{opacity:.4;cursor:default}
.ag-widget .ag-kurs.is-done{border-color:rgba(143,207,158,.4)}
.ag-widget #ag-kurs-panel .ag-kurs{margin-top:10px}
.ag-widget .ag-kurs.is-done .ag-kurs-dots i{background:var(--ag-green)}

/* ── Einstellungen at the foot of the page ── */
.ag-widget .ag-settings{margin:18px 0 6px;padding:12px 14px;border-radius:var(--ag-radius-md);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
.ag-widget .ag-setting-row{display:flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.ag-widget .ag-setting-backup{margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;gap:10px}
.ag-widget .ag-setting-actions{display:flex;gap:8px;flex-wrap:wrap}
.ag-widget .ag-setting-actions .ag-secondary{flex:1 1 auto}
.ag-widget .ag-switch-input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.ag-widget .ag-switch{position:relative;flex:none;width:44px;height:26px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.14);transition:background 180ms ease,border-color 180ms ease}
.ag-widget .ag-switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#f1e9d2;box-shadow:0 2px 4px rgba(0,0,0,.4);transition:transform 180ms cubic-bezier(.3,1.4,.4,1)}
.ag-widget .ag-switch-input:checked + .ag-switch{background:var(--ag-primary);border-color:transparent}
.ag-widget .ag-switch-input:checked + .ag-switch::after{transform:translateX(18px)}
.ag-widget .ag-switch-input:focus-visible + .ag-switch{outline:2px solid var(--ag-gold);outline-offset:2px}
.ag-widget .ag-setting-text{display:flex;flex-direction:column;gap:2px;min-width:0;font-size:.9rem}
.ag-widget .ag-setting-text strong{font-weight:500}
.ag-widget .ag-setting-text small{font-size:.74rem;color:var(--ag-muted);line-height:1.35}
      /* Liste: a few things at once, each with its picture, nothing to tap through. */
      .ag-liste{margin:14px 0 6px}
      .ag-liste-item{padding:12px 0 2px;border-top:1px solid rgba(255,255,255,.08)}
      .ag-liste-item:first-child{border-top:0;padding-top:4px}
      .ag-liste-item .ag-kurs-title{margin:0 0 6px;font-size:1.12rem}
      .ag-liste-item .ag-kurs-figure{margin:0 0 10px}
      .ag-liste-text{margin:0;font-size:.95rem;line-height:1.5;color:var(--ag-text)}
    `;function Wg(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=qg.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function Rg(){return`
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
    `}function Ug(){return`
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
    `}const Hg=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${Rg()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${Ug()}
                <div class="ag-machine-capsule" data-capsule role="button" tabindex="0" aria-label="Kapsel: halten zum Ziehen" title="Halten zum Ziehen">
                  <span class="ag-capsule-shine"></span>
                </div>
                <div class="ag-orbit" aria-hidden="true">
                  <span></span><span></span><span></span><span></span>
                </div>
                <div class="ag-emoji-orbit" data-ag-emoji-orbit aria-hidden="true"></div>
                <div class="ag-moon" data-ag-moon hidden></div>
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
                  <button class="ag-tab" type="button" role="tab" aria-selected="false" data-ag-tab="licht" aria-label="Licht" title="Licht"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.5-1 2.5h-5c0-1-.4-1.9-1-2.5z"/></svg></button>
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

          <section class="ag-card ag-mini-panel" id="ag-kurs-panel" hidden>
            <div class="ag-mini-head">
              <span class="ag-badge">Kurs</span>
              <button class="ag-secondary" type="button" id="ag-kurs-close">✕</button>
            </div>
            <h2 class="ag-mini-title" id="ag-kurs-panel-title">Kurs</h2>
            <p class="ag-mini-copy" id="ag-kurs-panel-copy"></p>
            <div class="ag-kurs" data-ag-kurs-panel-block hidden>
              <p class="ag-kurs-count" data-ag-kurs-count></p>
              <h3 class="ag-kurs-title" data-ag-kurs-title></h3>
              <div class="ag-kurs-figure" data-ag-kurs-figure hidden></div>
              <div class="ag-kurs-text ag-message" data-ag-kurs-text></div>
              <div class="ag-kurs-dots" data-ag-kurs-dots aria-hidden="true"></div>
              <div class="ag-kurs-nav">
                <button class="ag-secondary ag-kurs-prev" type="button" data-ag-kurs-prev>‹ Zurück</button>
                <button class="ag-button ag-kurs-next" type="button" data-ag-kurs-next>Weiter ›</button>
              </div>
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
                <button class="ag-glossary-tab" type="button" data-lang="kapsel">Kapsel</button>
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

          <section class="ag-panel" data-ag-panel-today role="tabpanel">
            <div class="ag-ping-banner" data-ag-ping-banner hidden>
              <span data-ag-ping-text>👋 Fionn denkt gerade an dich.</span>
              <button class="ag-ping-dismiss" type="button" data-ag-ping-dismiss aria-label="Schließen">✕</button>
            </div>
            <div class="ag-card ag-draw-card">
              <div class="ag-draw-meta">
                <span class="ag-pill" data-ag-today-pill>Heute</span>
                <span class="ag-streak" data-ag-streak hidden></span>
                <span class="ag-streak-gems" data-ag-streak-gems hidden></span>
                <button class="ag-streak-restore" data-ag-streak-restore type="button" hidden title="Stelle deinen Streak einmalig wieder her">💎 Streak retten</button>
                <span class="ag-draw-hint" data-ag-draw-hint></span>
              </div>
              <button class="ag-candle" type="button" data-ag-candle hidden aria-label="Kerze anzünden" title="Kerze anzünden">🕯️</button>
              <div class="ag-draw-knob">
                <div class="ag-knob" data-ag-knob role="button" tabindex="0" aria-label="Knopf: eine Runde drehen zum Ziehen" title="Eine Runde drehen"></div>
                <button class="ag-knob-label" type="button" data-ag-draw>
                  <span data-ag-button-text>Kapsel ziehen</span>
                </button>
              </div>
            </div>

            <article class="ag-card ag-result" data-ag-result aria-live="polite" hidden>
              <div class="ag-aufkleber-layer" data-ag-aufkleber aria-hidden="true"></div>
              <div class="ag-milestone" data-ag-milestone hidden>
                <span data-ag-milestone-text></span>
              </div>
              <p class="ag-wish-reply" data-ag-wish-reply hidden></p>
              <div class="ag-result-head">
                <span class="ag-badge" data-ag-rarity></span>
                <span class="ag-date" data-ag-date></span>
              </div>
              <h2 data-ag-title></h2>
              <div class="ag-message" data-ag-message hidden></div>
              <section class="ag-kurs" data-ag-kurs hidden aria-label="Kurs">
                <p class="ag-kurs-count" data-ag-kurs-count></p>
                <h3 class="ag-kurs-title" data-ag-kurs-title></h3>
                <div class="ag-kurs-figure" data-ag-kurs-figure hidden></div>
                <div class="ag-kurs-text ag-message" data-ag-kurs-text></div>
                <div class="ag-kurs-dots" data-ag-kurs-dots aria-hidden="true"></div>
                <div class="ag-kurs-nav">
                  <button class="ag-secondary ag-kurs-prev" type="button" data-ag-kurs-prev>‹ Zurück</button>
                  <button class="ag-button ag-kurs-next" type="button" data-ag-kurs-next>Weiter ›</button>
                </div>
              </section>
              <div class="ag-liste" data-ag-liste hidden></div>
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
              <div class="ag-pfand" data-ag-pfand hidden>
                <button class="ag-pfand-handle" type="button" data-ag-pfand-handle>♻︎ Leere Kapsel zurückgeben <span class="ag-pfand-count" data-ag-pfand-count></span></button>
                <p class="ag-pfand-hint">Nach oben in die Maschine ziehen — jede zehnte zahlt ein Token</p>
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
              <div class="ag-post" data-ag-post>
                <div class="ag-post-idle" data-ag-post-idle>
                  <button class="ag-secondary" type="button" data-ag-post-open>🍾 Flaschenpost an dich selbst</button>
                  <p class="ag-post-count" data-ag-post-count hidden></p>
                </div>
                <div class="ag-post-form" data-ag-post-form hidden>
                  <p class="ag-wish-label">Eine Zeile an dich, später</p>
                  <textarea class="ag-wish-input" data-ag-post-input rows="3" maxlength="280" placeholder="Was du dir in ein paar Wochen sagen willst…"></textarea>
                  <div class="ag-post-modes" role="radiogroup" aria-label="Wann">
                    <button type="button" class="ag-post-mode is-active" data-ag-post-mode="30" role="radio" aria-checked="true">in 30 Tagen</button>
                    <button type="button" class="ag-post-mode" data-ag-post-mode="irgendwann" role="radio" aria-checked="false">irgendwann</button>
                  </div>
                  <div class="ag-wish-actions">
                    <button class="ag-secondary" type="button" data-ag-post-cancel>Abbrechen</button>
                    <button class="ag-button" type="button" data-ag-post-seal>
                      <span class="ag-button-orb" aria-hidden="true"></span>
                      <span>Versiegeln</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
            <div class="ag-hugs" data-ag-hugs hidden>
              <span class="ag-hugs-label" data-ag-hugs-label></span>
              <div class="ag-hugs-row" data-ag-hugs-row></div>
            </div>
          </section>
          <section class="ag-panel" data-ag-panel-lieblinge role="tabpanel" hidden>
            <div class="ag-card">
              <p class="ag-history-note" data-ag-lieblinge-note></p>
              <div class="ag-wanderweg" data-ag-lieblinge></div>
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
          <section class="ag-panel" data-ag-panel-licht role="tabpanel" hidden>
            <div class="ag-card ag-licht-card">
              <div class="ag-licht-head">
                <div class="ag-licht-lamps" data-ag-licht-lamps aria-live="polite"></div>
                <button class="ag-licht-conn" type="button" data-ag-licht-conn data-state="idle"></button>
              </div>
              <div class="ag-licht-strip" data-ag-licht-strip role="group" aria-label="Lichtleiste: tippen zwischen zwei Lichtern teilt, auf ein Licht wählt die Gruppe"></div>
              <div class="ag-licht-groups" data-ag-licht-groups role="group" aria-label="Gruppen"></div>
              <div class="ag-licht-target" data-ag-licht-target role="radiogroup" aria-label="Welche Lampe">
                <button type="button" class="is-active" data-target="" role="radio" aria-checked="true">Beide</button>
                <button type="button" data-target="board_a" role="radio" aria-checked="false">Fionn</button>
                <button type="button" data-target="board_b" role="radio" aria-checked="false">Lennart</button>
              </div>
              <div class="ag-licht-row">
                <button class="ag-licht-power" type="button" data-ag-licht-power aria-pressed="false" disabled>Aus</button>
                <label class="ag-licht-slider">
                  <span>Helligkeit</span>
                  <input type="range" min="2" max="100" value="60" data-ag-licht-brightness aria-label="Helligkeit" disabled>
                </label>
              </div>
              <div class="ag-licht-palette" data-ag-licht-palette role="slider" tabindex="0" aria-label="Farbe" aria-valuemin="0" aria-valuemax="29" aria-valuenow="0"></div>
              <label class="ag-licht-slider ag-licht-white">
                <span data-ag-licht-white-label>Weissanteil</span>
                <input type="range" min="0" max="100" value="0" data-ag-licht-white aria-label="Weissanteil" disabled>
              </label>
              <div class="ag-licht-row">
                <button class="ag-licht-random" type="button" data-ag-licht-random disabled title="Zufällige Farben">🎲</button>
                <label class="ag-licht-slider">
                  <span>Übergang <em data-ag-licht-fade-val>1,0 s</em></span>
                  <input type="range" min="10" max="600" value="60" data-ag-licht-fade aria-label="Übergang" disabled>
                </label>
              </div>
              <div class="ag-licht-moods" data-ag-licht-moods></div>
              <div class="ag-licht-save" data-ag-licht-save>
                <input class="ag-berge-input" type="text" data-ag-licht-scene-name placeholder="Name der Szene" maxlength="32" autocomplete="off" disabled>
                <button class="ag-secondary" type="button" data-ag-licht-scene-save disabled>Sichern</button>
              </div>
              <div class="ag-licht-scenes" data-ag-licht-scenes hidden>
                <p class="ag-licht-label">Gespeicherte Szenen</p>
                <div class="ag-licht-scene-list" data-ag-licht-scene-list></div>
              </div>
              <div class="ag-licht-foot">
                <button class="ag-secondary" type="button" data-ag-licht-wink disabled>👋 Lampen winken</button>
                <button class="ag-secondary" type="button" data-ag-licht-flicker disabled>🕯️ Kerzenflackern</button>
                <button class="ag-secondary" type="button" data-ag-licht-rainbow disabled>🌈 Regenbogen</button>
                <button class="ag-secondary" type="button" data-ag-licht-morse-open disabled>🥁 Rhythmus auf die Lampen</button>
              </div>
              <div class="ag-morse" data-ag-morse hidden>
                <button class="ag-morse-pad" type="button" data-ag-morse-pad><span>Tipp einen Rhythmus</span><small>Die Lampen blinken ihn nach · nach einer Pause geht er los</small></button>
                <div class="ag-morse-dots" data-ag-morse-dots aria-hidden="true"></div>
              </div>
              <div class="ag-licht-foot ag-licht-foot-single">
                <a class="ag-secondary ag-link" href="./lichter.html">Alle Einstellungen ›</a>
              </div>
              <p class="ag-licht-note">Beide Lampen hängen am selben Draht: was du hier stellst, sieht Fionn bei sich. Gruppen, WLAN und Neustart wohnen auf der grossen Seite.</p>
            </div>
          </section>
          <div class="ag-settings" data-ag-settings>
            <label class="ag-setting-row">
              <input class="ag-switch-input" type="checkbox" data-ag-lights-toggle checked>
              <span class="ag-switch" aria-hidden="true"></span>
              <span class="ag-setting-text"><strong>💡 Lampen reagieren auf die App</strong><small>Kapselzug, Reaktion, Notfall-Umarmung. Aus: die Lampen bleiben ruhig. Licht-Tab und Kerze bleiben.</small></span>
            </label>
            <div class="ag-setting-backup">
              <span class="ag-setting-text"><strong>💾 Sicherung</strong><small>Alles, was die App sich merkt, als eine Datei — für ein neues Handy, oder einfach zum Aufheben.</small></span>
              <div class="ag-setting-actions">
                <button class="ag-secondary" type="button" data-ag-backup-export>Sichern</button>
                <button class="ag-secondary" type="button" data-ag-backup-import>Zurückholen</button>
                <input type="file" accept="application/json,.json" data-ag-backup-file hidden>
              </div>
            </div>
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
      <div class="ag-candle-veil" data-ag-candle-veil hidden role="dialog" aria-label="Kerze">
        <div class="ag-flame" aria-hidden="true"></div>
        <div class="ag-candle-body" aria-hidden="true"></div>
        <p class="ag-candle-hint">Zum Ausblasen wischen</p>
        <button class="ag-candle-out" type="button" data-ag-candle-out>Ausblasen</button>
      </div>
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
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="licht" aria-label="Licht">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.5-1 2.5h-5c0-1-.4-1.9-1-2.5z"/></svg></span>
          <span class="ag-bottomnav-btn-label">Licht</span>
        </button>
      </nav>
    `;function Gg(){$.className="ag-widget",$.setAttribute("aria-labelledby","ag-title"),$.innerHTML=Hg}function Kg(e,t=1400,a=.82){return new Promise((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);try{const s=Math.min(1,t/Math.max(o.naturalWidth||1,o.naturalHeight||1)),l=Math.max(1,Math.round((o.naturalWidth||1)*s)),d=Math.max(1,Math.round((o.naturalHeight||1)*s)),u=document.createElement("canvas");u.width=l,u.height=d,u.getContext("2d").drawImage(o,0,0,l,d);const g=u.toDataURL("image/jpeg",a);if(!g||g==="data:,"){r(new Error("encode failed"));return}n(g)}catch(s){r(s)}},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("decode failed"))},o.src=i})}async function Yg(e,t,a){const n=p.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await Kg(a),i=r.slice(r.indexOf(",")+1),o=new AbortController,s=setTimeout(()=>o.abort(),3e4);let l;try{l=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:o.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:i})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let d=null;try{d=await l.json()}catch{}if(!d||!d.ok||!d.url)throw Object.assign(new Error(d&&d.error||"no url"),{code:"old-script"});return d.url}function $e(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let i=0;i<e;i++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,d=Math.random()*100,u=Math.random()*.6,g=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${d}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${g}s ${u}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const i=document.createElement("style");i.id="ag-confetti-style",i.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(i)}setTimeout(()=>r.remove(),3e3)}const ft=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?","Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?","Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?","Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?","Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?","Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?","Welches Lied erinnert dich an uns, ohne dass ich das je wusste?","Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?","Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?","Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?","Woran merkst du, dass ich gerade einen guten Tag habe?","Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?","Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?","Was ist etwas, das du als Kind geliebt hast und heute vergisst?","Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?","Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?","Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?","Welcher Streit war im Nachhinein der nützlichste?","Was macht dich an mir manchmal nervös, und ist das schlimm?","Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?","Was ist dein Lieblingsbild von uns, und warum genau das?","Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?","Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?","Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?","Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?","Was wünschst du dir für mich, das nichts mit dir zu tun hat?","Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?","Was war das Erste, das dir an meiner Wohnung aufgefallen ist?","Welche Angewohnheit von mir hast du inzwischen übernommen?","Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?","Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?","Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?","Welcher Geruch gehört für dich zu mir?","Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?","Worauf freust du dich im Winter, worauf im Sommer?","Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?","Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?","Wann hast du zuletzt gedacht: genau das hier, so soll es sein?","Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?","Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?","Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?","Welchen Teil deines Alltags würdest du mir gern öfter zeigen?","Was glaubst du, worin ich dich unterschätze?","Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?","Welche Jahreszeit passt zu uns, und warum?","Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?","Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?","Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?","Was ist eine Tradition, die wir uns ausdenken sollten?","Was macht dich zuverlässig fröhlich, und mache ich davon genug?","Welche Seite von dir glaubst du, kenne ich noch gar nicht?","Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?","Was wäre dein perfekter Sonntagmorgen, bis ins Detail?","Was ist eine Sache, über die wir nie reden, und sollten wir?","Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?","Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?","Was würdest du gern öfter von mir hören?","Welche Ecke von Zürich fühlt sich am meisten nach uns an?","Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?","Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?","Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"],lo=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]];let La=-1;function co(){const e=c("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(ti);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<ft.length){La=a;const n=c("#ag-gesprach-question");n&&(n.textContent=ft[a]);return}}}catch{}go()}}function Vg(){const e=c("#ag-gesprach-panel");e&&(e.hidden=!0)}function go(){let e;do e=Math.floor(Math.random()*ft.length);while(e===La&&ft.length>1);La=e;try{localStorage.setItem(ti,String(e))}catch{}const t=c("#ag-gesprach-question");t&&(t.textContent=ft[e])}function Jg(){const e=ft[La]||"";if(!e)return;const t=p.theme&&p.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function uo(){var e;return!!((e=p.quest)!=null&&e.enabled&&ia(p))}function po(){const e=c("#ag-quest-panel");e&&(e.hidden=!1,ho())}function Zg(){const e=c("#ag-quest-panel");e&&(e.hidden=!0)}function ho(){const e=ia(p),t=Nt(),a=c("#ag-quest-challenge"),n=c("#ag-quest-hint-history"),r=c("#ag-quest-loading"),i=c("#ag-quest-actions"),o=c("#ag-quest-result"),s=c("#ag-quest-points"),l=c("#ag-quest-copy"),d=c("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){d&&(d.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),i&&(i.hidden=!0);return}if(a&&(a.textContent=u),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((g,m)=>`<div class="ag-hint-item"><span class="ag-hint-num">${m+1}</span><p>${g}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){d&&(d.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),i&&(i.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${pa()}`,s.hidden=!1);return}d&&(d.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),i&&(i.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Xg(e){if(!e)return;const t=c("#ag-quest-actions"),a=c("#ag-quest-loading"),n=c("#ag-quest-result"),r=c("#ag-quest-points"),i=c("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await Qg(e),s=Nt(),l=ia(p),d=(l==null?void 0:l.prompt)||"",u=(l==null?void 0:l.solution)||"";try{const g=await eu(o,d,u,s.attempts+1,s.hints);if(s.attempts+=1,g.success){const m=ii[Math.min(s.attempts-1,ii.length-1)],x=Sc(m);s.solved=!0,s.pointsEarned=m,s.successMessage=g.message||"Perfekt.",Sn(s),we(),n&&(n.textContent=g.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${m} Punkte · Gesamt: ${x}`,r.hidden=!1),a&&(a.hidden=!0),i&&(i.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=c("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),E([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],g.hint||"Versuch nochmal."],Sn(s),ho()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Qg(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function eu(e,t,a,n,r){var s;const i=(s=p.quest)==null?void 0:s.proxyUrl;if(!i)throw new Error("no proxy");const o=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!o.ok)throw new Error("proxy error");return o.json()}function tu(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let d=0;d<n;d++)i[d]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(l),l.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([d,u,g,m,x])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(d,a+g),b.frequency.exponentialRampToValueAtTime(u,a+g+m*.55);const f=t.createGain();f.gain.setValueAtTime(0,a+g),f.gain.linearRampToValueAtTime(x,a+g+.09),f.gain.exponentialRampToValueAtTime(.001,a+g+m),b.connect(f),f.connect(t.destination),b.start(a+g),b.stop(a+g+m+.05)})}catch{}}function au(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const i=document.createElement("span");i.className="ag-letter-word",i.textContent=n,i.style.animationDelay=`${320+r*155}ms`,a.appendChild(i),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function fo(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}const mo="affektions-gacha:letter-opened:v1",nu=10;function ru(){try{return localStorage.getItem(mo)==="yes"}catch{return!1}}function iu(e){return ru()?!1:e>0&&e%nu===0}const ou="Psst: Der Knopf hat ein Geheimnis. Drei Sekunden lang halten. 🍀";function Wn(){const e=c("#ag-letter-overlay");if(!e)return;try{localStorage.setItem(mo,"yes")}catch{}e.hidden=!1,e.focus(),E([20,60,20]),tu();const t=c("#ag-letter-photo");if(t&&p.photos&&p.photos.length){const a=Ot(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}su()}async function su(){var n;const e=c("#ag-letter-body");if(!e)return;au(e);const t=(n=p.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const i=await r.json();if(i.paragraphs&&i.paragraphs.length){fo(e,i.paragraphs);return}}}catch{}const a=lo[Math.floor(Math.random()*lo.length)];fo(e,a)}function Rn(){const e=c("#ag-letter-overlay");e&&(e.hidden=!0)}const bo="affektions-gacha:wetter:v1",lu=30*60*1e3,du=5e3;function Un(e,t=!0){const a=Number(e);return a===0?t?"☀️":"🌙":a===1?t?"🌤":"🌙":a===2?t?"⛅":"☁️":a===3?"☁️":a===45||a===48?"🌫":a>=51&&a<=57?"🌦":a>=61&&a<=67?"🌧":a>=71&&a<=77?"🌨":a>=80&&a<=82?"🌧":a===85||a===86?"🌨":a>=95&&a<=99?"⛈":"🌡"}function cu(e){const t=Number(e);return t>=51&&t<=67||t>=80&&t<=82?"rain":t>=71&&t<=77||t===85||t===86?"snow":t===45||t===48?"fog":t>=95?"storm":null}function yo(e){return!e||typeof e.t!="number"?"":`${Math.round(e.t)}° ${e.e||Un(e.c,e.d!==!1)}`}function gu(){try{const e=localStorage.getItem(bo);if(!e)return null;const t=JSON.parse(e);return t&&typeof t.t=="number"&&typeof t.at=="number"?t:null}catch{return null}}function uu(e){try{localStorage.setItem(bo,JSON.stringify(e))}catch{}}async function Hn({force:e=!1}={}){const t=p.theme&&p.theme.weather;if(!t||typeof t.latitude!="number"||typeof t.longitude!="number")return null;const a=gu();if(a&&!e&&Date.now()-a.at<lu)return p.weather=a,a;const n=`https://api.open-meteo.com/v1/forecast?latitude=${t.latitude}&longitude=${t.longitude}&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(p.theme.timezone||"Europe/Zurich")}`,r=new AbortController,i=setTimeout(()=>r.abort(),du);try{const o=await fetch(n,{cache:"no-store",signal:r.signal});if(!o.ok)throw new Error("weather "+o.status);const s=await o.json(),l=s&&s.current;if(!l||typeof l.temperature_2m!="number")throw new Error("weather shape");const d={t:l.temperature_2m,c:Number(l.weather_code)||0,d:l.is_day!==0,at:Date.now()};return d.e=Un(d.c,d.d),uu(d),p.weather=d,d}catch{return a&&Date.now()-(a.at||0)<3*36e5?(p.weather=a,a):null}finally{clearTimeout(i)}}function wo(e){return!e||typeof e.t!="number"?null:{t:Math.round(e.t*10)/10,c:e.c,e:e.e||Un(e.c,e.d!==!1)}}const pu=["is-raining","is-snowing","is-foggy","is-stormy"];function hu(e){if(!$)return;for(const a of pu)$.classList.remove(a);const t=e?cu(e.c):null;t==="rain"&&$.classList.add("is-raining"),t==="snow"&&$.classList.add("is-snowing"),t==="fog"&&$.classList.add("is-foggy"),t==="storm"&&$.classList.add("is-stormy","is-raining")}function B(e){const t=$.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}let Gn=null;function Kn(){if(!Gn)try{Gn=new(window.AudioContext||window.webkitAudioContext)}catch{}return Gn}function fu(){const e=Kn();if(e)try{e.state==="suspended"&&e.resume().catch(()=>{});const t=e.createBufferSource();t.buffer=e.createBuffer(1,1,22050),t.connect(e.destination),t.start(0)}catch{}}if(typeof document<"u"&&document.addEventListener){const e=()=>{fu(),document.removeEventListener("pointerdown",e,!0),document.removeEventListener("touchend",e,!0)};document.addEventListener("pointerdown",e,!0),document.addEventListener("touchend",e,!0)}function xo(){try{return window.localStorage.getItem(Kd)!=="off"}catch{return!0}}function ce(e,t,a,n,r=.15,i="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=i,o.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(r,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),o.start(l),o.stop(l+n+.05)}function Ea(e){if(!xo())return;const t=Kn();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":ce(t,280,0,.18,.08,"sine"),ce(t,210,.12,.22,.06,"sine");break;case"cursed":ce(t,220,0,.12,.1,"triangle"),ce(t,170,.09,.28,.07,"triangle");break;case"uncommon":ce(t,523,0,.14,.14,"sine"),ce(t,784,.1,.22,.12,"sine");break;case"rare":ce(t,523,0,.12,.14,"sine"),ce(t,659,.09,.12,.14,"sine"),ce(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>ce(t,a,n*.09,.18,.13,"sine")),ce(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>ce(t,a,n*.08,.16,.13,"sine")),ce(t,2093,.45,.5,.05,"sine");break;default:ce(t,523,0,.12,.13,"sine"),ce(t,659,.09,.18,.1,"sine");break}}function Ta(){if(!xo())return;const e=Kn();e&&(e.state==="suspended"&&e.resume().catch(()=>{}),ce(e,1760,0,.09,.1,"triangle"),ce(e,2637,.05,.14,.07,"sine"),ce(e,1319,.11,.22,.05,"sine"))}function Yn(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function mu(e,t){if(!e)return;const a=e.parentNode&&e.parentNode.querySelector("[data-ag-ink-hint]");if(!t){e.classList.remove("ag-ink","is-held"),a&&(a.hidden=!0);return}e.classList.add("ag-ink"),e.classList.remove("is-held");let n=0;const r=document.createTreeWalker(e,4),i=[];for(;r.nextNode();)i.push(r.currentNode);for(const s of i){const l=document.createDocumentFragment();for(const d of s.nodeValue){const u=document.createElement("span");u.className="ag-ink-ch",u.textContent=d,u.style.setProperty("--i",String(n++)),l.appendChild(u)}s.parentNode.replaceChild(l,s)}let o=a;if(o||(o=document.createElement("p"),o.className="ag-ink-hint",o.setAttribute("data-ag-ink-hint",""),e.parentNode.insertBefore(o,e)),o.hidden=!1,o.textContent="🫥 Geheimtinte — Finger auf den Text legen",!e.dataset.inkBound){e.dataset.inkBound="1";const s=()=>{e.classList.contains("ag-ink")&&(e.classList.add("is-held"),E(6))},l=()=>e.classList.remove("is-held");e.addEventListener("pointerdown",s),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("pointerleave",l)}}const Vn=["Lieblingsmensch","Sternschnuppe","Heimathafen","Gleichklang","Morgenlicht","Fernweh","Herzklopfen","Nachtfalter","Kuschelwetter","Augenblick","Geborgenheit","Sommersprosse","Lichtblick","Zuhause","Wegbegleiter","Glühwürmchen","Nähe","Du","Nachtschwärmer","Sanft","Wir"];function bu(e=Math.random()){return Vn[Math.floor(e*Vn.length)%Vn.length]}function yu(e){e.addEventListener("click",()=>{!$||!$.classList.contains("is-evening")||(e.classList.add("is-flare"),setTimeout(()=>e.classList.remove("is-flare"),900),E(6),B(`✨ ${bu()}`))})}function vo(e,t){if(!$)return;const a=$.querySelector('.ag-bottomnav-btn[data-ag-tab="today"] .ag-bottomnav-btn-icon');if(!t||!a||Yn()){Ta(),Promise.resolve().then(()=>st).then(d=>d.flashLightsForPull("uncommon")).catch(()=>{});return}const n=t.getBoundingClientRect(),r=a.getBoundingClientRect(),i=document.createElement("div");i.className="ag-coin",i.textContent=e,i.style.left=`${n.left+n.width/2}px`,i.style.top=`${n.top+n.height/2}px`,document.body.appendChild(i);const o=r.left+r.width/2-(n.left+n.width/2),s=r.top+r.height/2-(n.top+n.height/2),l=i.animate([{transform:"translate(-50%,-50%) scale(1) rotateY(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(o*.45).toFixed(0)}px), calc(-50% + ${(s*.35-110).toFixed(0)}px)) scale(1.35) rotateY(200deg)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${o.toFixed(0)}px), calc(-50% + ${s.toFixed(0)}px)) scale(0.25) rotateY(560deg)`,opacity:.15}],{duration:950,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});l.onfinish=()=>{i.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),Ta(),E([10,50,22]),Promise.resolve().then(()=>st).then(d=>d.flashLightsForPull("uncommon")).catch(()=>{})}}function wu(e){if(!$||!e||p.foldedFor===e.day)return;const t=c("[data-ag-result]"),a=$.querySelector('.ag-bottomnav-btn[data-ag-tab="history"] .ag-bottomnav-btn-icon');if(!t||t.hidden||!a||(p.foldedFor=e.day,Yn()))return;const n=t.getBoundingClientRect(),r=window.innerHeight||800,i=n.left+n.width/2,o=n.bottom<0||n.top>r?r/2:Math.max(60,Math.min(r-60,n.top+Math.min(n.height,r)/2)),s=a.getBoundingClientRect(),l=document.createElement("div");l.className="ag-envelope",l.textContent="✉️",l.style.left=`${i}px`,l.style.top=`${o}px`,document.body.appendChild(l);const d=s.left+s.width/2-i,u=s.top+s.height/2-o,g=l.animate([{transform:"translate(-50%,-50%) scale(2.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1.4)",opacity:1,offset:.25},{transform:`translate(calc(-50% + ${d.toFixed(0)}px), calc(-50% + ${u.toFixed(0)}px)) scale(0.3)`,opacity:.2}],{duration:720,easing:"cubic-bezier(.4,.6,.3,1)",fill:"forwards"});g.onfinish=()=>{l.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),E(8)}}const ko=/[\p{L}\p{M}’'-]/u;function xu(e,t){if(typeof e!="string"||!e.length)return"";let a=Math.min(Math.max(t,0),e.length),n=a;for(;a>0&&ko.test(e[a-1]);)a--;for(;n<e.length&&ko.test(e[n]);)n++;return e.slice(a,n).replace(/^[-'’]+|[-'’]+$/g,"")}function vu(e,t){let a=null,n=0;try{if(document.caretPositionFromPoint){const r=document.caretPositionFromPoint(e,t);r&&(a=r.offsetNode,n=r.offset)}else if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(e,t);r&&(a=r.startContainer,n=r.startOffset)}}catch{return""}return!a||a.nodeType!==3?"":xu(a.nodeValue,n)}function ku(e,t){if(!e||e.dataset.wordBound)return;e.dataset.wordBound="1";let a=null,n=0,r=0;const i=()=>{a&&(clearTimeout(a),a=null)};e.addEventListener("pointerdown",o=>{e.classList.contains("ag-ink")||(n=o.clientX,r=o.clientY,i(),a=setTimeout(()=>{a=null;const s=vu(n,r);s&&s.length>=3&&t(s)},650))}),e.addEventListener("pointermove",o=>{a&&Math.hypot(o.clientX-n,o.clientY-r)>10&&i()}),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i),e.addEventListener("pointerleave",i),e.addEventListener("contextmenu",o=>{a&&o.preventDefault()})}const Jn=120;function $u(e,t,a){if(!e||!t||e.dataset.pfandBound)return;e.dataset.pfandBound="1";let n=!1,r=0,i=0,o=!1;const s=()=>{t.style.transition="transform 320ms cubic-bezier(.3,.7,.3,1.2), opacity 320ms ease",t.style.transform="",t.style.opacity="",setTimeout(()=>{t.style.transition=""},340),t.classList.remove("is-pfand-dragging")};e.addEventListener("pointerdown",d=>{n=!0,o=!1,r=d.clientY,i=0;try{e.setPointerCapture(d.pointerId)}catch{}t.style.transition="none",t.classList.add("is-pfand-dragging")}),e.addEventListener("pointermove",d=>{if(!n)return;i=Math.min(0,d.clientY-r),i<-6&&(o=!0);const u=Math.min(1,-i/Jn);t.style.transform=`translateY(${(i*.7).toFixed(0)}px) scale(${(1-.22*u).toFixed(3)})`,t.style.opacity=String(1-.35*u),e.classList.toggle("is-ready",-i>=Jn)});const l=()=>{if(n){if(n=!1,e.classList.remove("is-ready"),-i>=Jn){s(),a();return}s()}};e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("click",d=>{if(o){d.preventDefault();return}Promise.resolve().then(()=>Ku).then(u=>{u.armConfirm(e,"Zurückgeben? Nochmal tippen")&&a()})})}function Su(e){if(!$)return;const t=$.querySelector(".ag-machine-wrap");if(!e||!t)return;const a=e.getBoundingClientRect(),n=t.getBoundingClientRect(),r=document.createElement("div");r.className="ag-pfand-capsule",r.style.left=`${a.left+a.width/2}px`,r.style.top=`${a.top+a.height/2}px`,document.body.appendChild(r);const i=n.left+n.width/2-(a.left+a.width/2),o=n.top+n.height*.55-(a.top+a.height/2);if(Yn()){r.remove();return}const s=r.animate([{transform:"translate(-50%,-50%) scale(1) rotate(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(i*.5).toFixed(0)}px), calc(-50% + ${(o*.5-60).toFixed(0)}px)) scale(1.1) rotate(180deg)`,opacity:1,offset:.5},{transform:`translate(calc(-50% + ${i.toFixed(0)}px), calc(-50% + ${o.toFixed(0)}px)) scale(.3) rotate(420deg)`,opacity:.1}],{duration:820,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});s.onfinish=()=>{r.remove(),t.classList.add("is-gulp"),setTimeout(()=>t.classList.remove("is-gulp"),700),Ta(),E([10,40,20])}}function Zn(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=J(((e=p.theme)==null?void 0:e.timezone)||"UTC"),a=K(),r=H().some(i=>i.token===a&&i.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}let Xn=null,$o=!1;function Lu(e){if(!Xn||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));Xn(t,a)}function Eu(){$o||($o=!0,window.addEventListener("deviceorientation",Lu,{passive:!0}),$&&$.classList.add("has-tilt"))}function Tu({onTilt:e}={}){if(Xn=e||null,typeof window>"u")return;const t=window.DeviceOrientationEvent;t&&typeof t.requestPermission!="function"&&Eu()}const Ma={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function So(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Mu(e){if(So())return;const t=Ma[e]||Ma.soft;t.rumble!=="none"&&($.classList.add("is-rumbling"),t.rumble==="hard"&&$.classList.add("is-rumbling-hard"))}function Au(){$.classList.remove("is-rumbling","is-rumbling-hard")}function Qn(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function Lo(e=0){const t=$.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function Cu(e){const t=Ma[e]||Ma.soft;if(So()){Qn(t.flash);return}Lo(0),Lo(160),Qn(t.flash),t.double&&Qn(t.flash,260),t.shutter&&$.classList.add("is-shutter"),setTimeout(()=>$.classList.remove("is-shutter"),700);try{$e(t.particles,t.palette)}catch{}}const Eo=360,zu=45,_u=22;class Du{constructor({locked:t=!1}={}){this.locked=t,this.wound=0,this.last=null,this.detents=0,this.fired=!1}move(t){if(this.last===null)return this.last=t,{detent:0,fired:!1};let a=t-this.last;for(;a>180;)a-=360;for(;a<=-180;)a+=360;if(this.last=t,this.fired)return{detent:0,fired:!1};const n=this.locked?_u:Eo;this.wound=Math.min(n,Math.max(0,this.wound+a));const r=Math.floor(this.wound/zu),i=r>this.detents?r-this.detents:0;this.detents=r;const o=!this.locked&&this.wound>=Eo;return o&&(this.fired=!0),{detent:i,fired:o}}}function To(e,t,a){const n=e.getBoundingClientRect();return Math.atan2(a-(n.top+n.height/2),t-(n.left+n.width/2))*180/Math.PI}const Iu=3e3,Mo=8;function Nu(e,{drawable:t,onFire:a,onTick:n,onHold:r}={}){if(!e)return;let i=null,o=null;const s=()=>{clearTimeout(o),o=null},l=g=>e.style.setProperty("--ag-knob-angle",`${g.toFixed(1)}deg`),d=()=>{e.classList.add("is-springing"),l(0),setTimeout(()=>e.classList.remove("is-springing"),420)};e.addEventListener("pointerdown",g=>{if(g.button&&g.button!==0)return;g.preventDefault();const m=t?t():!0;i=new Du({locked:!m}),i.move(To(e,g.clientX,g.clientY)),e.classList.remove("is-springing"),e.classList.add("is-turning"),e.classList.toggle("is-locked",!m);try{e.setPointerCapture(g.pointerId)}catch{}s(),r&&(o=setTimeout(()=>{i&&i.wound<Mo&&(u(),r())},Iu))}),e.addEventListener("pointermove",g=>{if(!i)return;const{detent:m,fired:x}=i.move(To(e,g.clientX,g.clientY));i.wound>=Mo&&s(),l(i.wound),m&&(E(i.locked?4:6+i.detents),n&&n(i.detents,i.locked)),x&&(i=null,e.classList.remove("is-turning"),e.classList.add("is-fired"),E([20,30,50]),setTimeout(()=>{e.classList.remove("is-fired"),d()},500),a&&(!t||t())&&a())});const u=()=>{if(s(),!i)return;const g=i.locked&&i.wound>4;i=null,e.classList.remove("is-turning"),g&&E([8,30,8]),d()};e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u),e.addEventListener("lostpointercapture",u),e.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(!t||t())&&(g.preventDefault(),E(12),a&&a())})}const A="#f1e9d2",R="rgba(241,233,210,.45)",P="#e0a75d",je="#8fcf9e",xe="#8ab8cf",Ao="#3e8a55",Y="rgba(241,233,210,.12)",fe=`font-family:inherit;fill:${A}`,te=(e,t,a,n="")=>`<text x="${e}" y="${t}" style="${fe};font-size:11px;${n}">${a}</text>`,Z=(e,t,a,n="")=>`<text x="${e}" y="${t}" style="${fe};font-size:9px;fill:${R};${n}">${a}</text>`,ne=(e,t=160)=>`<svg viewBox="0 0 320 ${t}" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${e}</svg>`,Pu={kamera:()=>ne(`
    <rect x="30" y="56" width="260" height="64" rx="8" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <rect x="130" y="40" width="60" height="18" rx="4" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="34" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="24" fill="none" stroke="${R}" stroke-width="1"/>
    <circle cx="160" cy="118" r="14" fill="none" stroke="${R}" stroke-width="1"/>
    <circle cx="256" cy="64" r="14" fill="${Y}" stroke="${P}" stroke-width="1.5"/>
    <text x="256" y="67" text-anchor="middle" style="${fe};font-size:7px">500</text>
    <rect x="236" y="60" width="9" height="8" rx="1" fill="none" stroke="${P}" stroke-width="1"/>
    <path d="M276 50 l16 -10" stroke="${A}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="64" r="10" fill="none" stroke="${A}" stroke-width="1.5"/>
    <path d="M62 54 v-8 h10" stroke="${A}" stroke-width="1.5" fill="none"/>
    <rect x="200" y="58" width="22" height="10" rx="2" fill="none" stroke="${R}"/>
    ${Z(203,66,"24")}
    ${te(312,26,"Zeitenrad + ASA-Fenster",`fill:${P};text-anchor:end`)}
    <path d="M254 30 v18" stroke="${P}" stroke-width="1" stroke-dasharray="2 2"/>
    ${te(8,26,"Rückspulkurbel")}
    <path d="M60 30 v22" stroke="${R}" stroke-width="1" stroke-dasharray="2 2"/>
    ${Z(298,36,"Hebel")}
    ${Z(200,82,"Zählwerk")}
    ${te(8,112,"Fokusring")}
    <path d="M58 108 h60" stroke="${R}" stroke-width="1" stroke-dasharray="2 2"/>
    ${te(8,134,"Blendenring")}
    <path d="M70 130 h66" stroke="${R}" stroke-width="1" stroke-dasharray="2 2"/>
    ${te(206,150,"FD- / FL-Objektiv")}
  `),einlegen:()=>ne(`
    <rect x="30" y="40" width="260" height="90" rx="8" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <rect x="44" y="52" width="36" height="66" rx="6" fill="none" stroke="${A}" stroke-width="1.5"/>
    <circle cx="62" cy="85" r="5" fill="none" stroke="${R}"/>
    <path d="M80 70 h130 q10 0 10 10 v16" fill="none" stroke="${A}" stroke-width="2.5" stroke-dasharray="6 3"/>
    <rect x="200" y="52" width="76" height="66" rx="6" fill="none" stroke="${P}" stroke-width="1.5"/>
    ${Z(207,66,"QL",`fill:${P};font-size:11px;font-weight:600`)}
    <path d="M226 84 v22" stroke="${P}" stroke-width="3" stroke-linecap="round"/>
    ${[0,1,2,3,4,5,6].map(e=>`<rect x="${92+e*16}" y="60" width="5" height="4" fill="${R}"/><rect x="${92+e*16}" y="76" width="5" height="4" fill="${R}"/>`).join("")}
    ${te(44,146,"Patrone links")}
    ${te(290,146,"Anfang bis zur Marke","text-anchor:end")}
    ${Z(100,32,"Perforation auf den Zähnen")}
  `),iso:()=>ne(`
    ${[["100",50,.35],["200",125,.55],["400",200,.8],["800",275,1]].map(([e,t,a])=>`
      <rect x="${t-28}" y="${110-a*70}" width="56" height="${a*70}" rx="6" fill="${je}" opacity="${.35+a*.5}"/>
      <text x="${t}" y="128" text-anchor="middle" style="${fe};font-size:12px">${e}</text>`).join("")}
    ${[88,163,238].map(e=>`<path d="M${e-6} 24 h12" stroke="${P}" stroke-width="1.5"/><path d="M${e} 18 v12" stroke="${P}" stroke-width="1.5"/>`).join("")}
    ${Z(160,150,"jede Stufe doppelt so empfindlich: eine Blende weniger Licht","text-anchor:middle")}
    ${Z(20,28,"ISO")}
  `,160),blende:()=>ne(`
    ${["2","2.8","4","5.6","8","11","16"].map((e,t)=>{const a=30+t*43,n=16-t*2.1;return`<circle cx="${a}" cy="60" r="19" fill="none" stroke="${R}" stroke-width="1"/>
        <circle cx="${a}" cy="60" r="${n.toFixed(1)}" fill="${A}" opacity=".9"/>
        <text x="${a}" y="100" text-anchor="middle" style="${fe};font-size:11px">f/${e}</text>`}).join("")}
    <path d="M40 124 H280" stroke="${P}" stroke-width="1.5" marker-end="url(#ag-arr)"/>
    <defs><marker id="ag-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${P}"/></marker></defs>
    ${Z(40,140,"pro Schritt halb so viel Licht · mehr Schärfentiefe")}
    ${Z(40,24,"viel Licht, dünne Schärfe")}
    ${Z(280,24,"wenig Licht, alles scharf","text-anchor:end")}
  `),zeit:()=>ne(`
    ${["500","250","125","60","30","15"].map((e,t)=>{const a=36+t*50,n=t*1.6;return`<g transform="translate(${a},44)">
        <circle cx="0" cy="0" r="6" fill="${A}"/>
        <path d="M0 6 v18 M0 12 l-8 8 M0 12 l8 8 M0 24 l-6 12 M0 24 l6 12" stroke="${A}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        ${n?`<path d="M${-10-n*3} 14 h${n*3} M${-10-n*3} 26 h${n*3}" stroke="${R}" stroke-width="2"/>`:""}
        <text x="0" y="68" text-anchor="middle" style="${fe};font-size:11px">1/${e}</text>
      </g>`}).join("")}
    <path d="M186 20 v100" stroke="${P}" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${Z(312,132,"ab hier freihand wackelig (50er)",`fill:${P};text-anchor:end`)}
    ${Z(36,150,"kurz: eingefroren")}
    ${Z(286,150,"lang: Wisch","text-anchor:end")}
  `),dreieck:()=>ne(`
    <path d="M160 18 L60 118 L260 118 Z" fill="none" stroke="${A}" stroke-width="1.5"/>
    ${te(160,14,"ISO","text-anchor:middle")}
    ${te(48,134,"Blende","text-anchor:middle")}
    ${te(272,134,"Zeit","text-anchor:middle")}
    <rect x="94" y="56" width="132" height="44" rx="8" fill="${Y}" stroke="${P}" stroke-width="1"/>
    ${te(160,74,"f/8 · 1/125","text-anchor:middle")}
    ${Z(160,90,"= f/5.6 · 1/250 = f/11 · 1/60","text-anchor:middle")}
    ${Z(60,154,"ein Schritt doppelt, der andere halb: gleich hell")}
  `),sunny16:()=>ne(`
    ${[["☀️","f/16","Sonne",!1],["🌤️","f/11","leicht bewölkt",!1],["☁️","f/8","zu · heute",!0],["🌧️","f/5.6","dunkel",!1],["🏚️","f/4","Schatten",!1]].map(([e,t,a,n],r)=>`<g transform="translate(${32+r*64},0)">
        ${n?`<rect x="-26" y="14" width="56" height="118" rx="10" fill="${Y}" stroke="${P}" stroke-width="1.5"/>`:""}
        <text x="2" y="48" text-anchor="middle" style="font-size:24px">${e}</text>
        <text x="2" y="84" text-anchor="middle" style="${fe};font-size:14px;${n?`fill:${P};font-weight:600`:""}">${t}</text>
        <text x="2" y="104" text-anchor="middle" style="${fe};font-size:8px;fill:${R}">${a}</text>
      </g>`).join("")}
    ${te(160,152,"Zeit immer 1/ISO · ISO 400 → 1/500 · ISO 200 → 1/250","text-anchor:middle;font-size:10px")}
  `),fokus:()=>ne(`
    <g transform="translate(80,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${R}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${A}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${A}" stroke-width="1"/>
      <path d="M-6 -12 V0 M4 0 V12" stroke="${P}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${fe};font-size:9px;fill:${R}">unscharf: versetzt</text>
    </g>
    <path d="M150 80 h18" stroke="${P}" stroke-width="1.5" marker-end="url(#ag-arr2)"/>
    <defs><marker id="ag-arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${P}"/></marker></defs>
    <g transform="translate(240,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${R}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${A}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${A}" stroke-width="1"/>
      <path d="M0 -12 V12" stroke="${je}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${fe};font-size:9px;fill:${R}">scharf: eine Linie</text>
    </g>
    ${Z(160,150,"Schnittbild mittig, Mikroprismenring aussen","text-anchor:middle")}
  `),schaerfentiefe:()=>ne(`
    ${[["f/2",50,10],["f/11",110,120]].map(([e,t,a])=>`
      <path d="M40 ${t} H280" stroke="${R}" stroke-width="1"/>
      <rect x="${150-a/2}" y="${t-10}" width="${a}" height="20" rx="4" fill="${je}" opacity=".7"/>
      <text x="22" y="${t+4}" text-anchor="middle" style="${fe};font-size:11px">${e}</text>`).join("")}
    ${[["1m",60],["2m",105],["3m",150],["5m",205],["∞",270]].map(([e,t])=>`<path d="M${t} 36 v6 M${t} 96 v6" stroke="${R}"/><text x="${t}" y="30" text-anchor="middle" style="${fe};font-size:9px;fill:${R}">${e}</text>`).join("")}
    <path d="M150 20 v100" stroke="${P}" stroke-width="1" stroke-dasharray="3 3"/>
    ${Z(150,142,"Fokus auf 3 m · grün ist scharf","text-anchor:middle")}
  `),zonenfokus:()=>ne(`
    <rect x="30" y="50" width="260" height="56" rx="8" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    ${[["1",60],["1.5",95],["2",125],["3",160],["5",200],["10",235],["∞",270]].map(([e,t])=>`<path d="M${t} 50 v8" stroke="${A}"/><text x="${t}" y="72" text-anchor="middle" style="${fe};font-size:10px">${e}</text>`).join("")}
    <path d="M160 40 v10" stroke="${P}" stroke-width="2.5"/>
    ${[["16",92],["11",110],["8",126],["4",148],["4",172],["8",194],["11",210],["16",228]].map(([e,t])=>`<text x="${t}" y="98" text-anchor="middle" style="${fe};font-size:9px;fill:${e==="8"?P:R}">${e}</text>`).join("")}
    <path d="M126 106 v8 H194 v-8" fill="none" stroke="${P}" stroke-width="1.5"/>
    ${te(160,130,"bei f/8 scharf von 2 bis 5 m","text-anchor:middle")}
    ${Z(160,150,"Ring auf 3 m, nicht mehr fokussieren, nur auslösen","text-anchor:middle")}
  `),mitziehen:()=>ne(`
    ${[30,40,50,60,70,80,90,100].map(e=>`<path d="M24 ${e} h272" stroke="${R}" stroke-width="2" stroke-dasharray="${8+e%20} 10"/>`).join("")}
    <rect x="96" y="44" width="128" height="50" rx="8" fill="#0e1c14" stroke="${A}" stroke-width="2"/>
    ${[108,134,160,186].map(e=>`<rect x="${e}" y="54" width="20" height="16" rx="2" fill="${Y}" stroke="${A}" stroke-width="1"/>`).join("")}
    <circle cx="124" cy="98" r="6" fill="${A}"/><circle cx="196" cy="98" r="6" fill="${A}"/>
    <path d="M232 120 h40" stroke="${P}" stroke-width="2" marker-end="url(#ag-arr3)"/>
    <defs><marker id="ag-arr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${P}"/></marker></defs>
    ${Z(232,134,"Kamera dreht mit",`fill:${P}`)}
    ${te(24,150,"1/15 · f/16 · auslösen, während du drehst")}
  `),rueckspulen:()=>ne(`
    ${[["1","Knopf am Boden drücken",56],["2","Kurbel drehen, bis sie leicht geht",160],["3","erst dann die Rückwand öffnen",264]].map(([e,t,a])=>`
      <circle cx="${a}" cy="52" r="22" fill="${Y}" stroke="${e==="3"?je:A}" stroke-width="1.5"/>
      <text x="${a}" y="58" text-anchor="middle" style="${fe};font-size:16px">${e}</text>
      <foreignObject x="${a-50}" y="82" width="100" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:9.5px;line-height:1.3;font-family:inherit;color:${A};opacity:.85;text-align:center">${t}</div></foreignObject>`).join("")}
    <path d="M80 52 h54 M184 52 h54" stroke="${R}" stroke-width="1" stroke-dasharray="3 3"/>
  `,122),azulejo:()=>ne(`
    ${[0,1,2,3].map(e=>{const t=104+e%2*56,a=14+Math.floor(e/2)*44;return`
      <rect x="${t}" y="${a}" width="54" height="42" rx="3" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
      <circle cx="${t+27}" cy="${a+21}" r="4" fill="${xe}"/>
      ${[[0,-11],[11,0],[0,11],[-11,0]].map(([n,r])=>`<ellipse cx="${t+27+n}" cy="${a+21+r}" rx="${n?7:4}" ry="${n?4:7}" fill="none" stroke="${xe}" stroke-width="1.6"/>`).join("")}
      ${[[4,4],[50,4],[4,38],[50,38]].map(([n,r])=>`<circle cx="${t+n}" cy="${a+r}" r="1.6" fill="${xe}"/>`).join("")}`}).join("")}
    <path d="M60 60 h30 M226 60 h30" stroke="${R}" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="48" cy="60" r="5" fill="none" stroke="${P}" stroke-width="1.5"/><circle cx="48" cy="60" r="1.5" fill="${P}"/>
    ${te(160,114,"frontal · f/8 · Fugen gerade","text-anchor:middle")}
  `,122),nata:()=>ne(`
    <path d="M118 52 l4 36 q38 10 76 0 l4 -36 q-42 -8 -84 0z" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    ${[126,140,154,168,182,196].map(e=>`<path d="M${e} 56 l3 30" stroke="${R}" stroke-width="1"/>`).join("")}
    <ellipse cx="160" cy="52" rx="42" ry="12" fill="${P}" stroke="${A}" stroke-width="1.5"/>
    ${[[146,50],[162,46],[174,54],[155,57]].map(([e,t])=>`<ellipse cx="${e}" cy="${t}" rx="5" ry="2.6" fill="#5a3a1a" opacity=".85"/>`).join("")}
    ${[150,160,170].map((e,t)=>`<path d="M${e} ${34-t*2} q-5 -8 0 -16" stroke="${R}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`).join("")}
    <path d="M236 70 h30 v16 q0 8 -8 8 h-14 q-8 0 -8 -8z" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <path d="M266 76 q10 0 10 7 q0 7 -10 7" fill="none" stroke="${A}" stroke-width="1.5"/>
    <ellipse cx="251" cy="94" rx="14" ry="2" fill="none" stroke="${R}" stroke-width="1"/>
    <circle cx="70" cy="70" r="14" fill="none" stroke="${P}" stroke-width="1.5"/><circle cx="70" cy="70" r="6" fill="${P}"/>
    ${Z(70,98,"0,6 m","text-anchor:middle")}
    ${te(160,114,"nah ran · f/4 · 1/60 · Ellbogen auf den Tisch","text-anchor:middle")}
  `,122),tuer:()=>ne(`
    <rect x="124" y="14" width="72" height="92" rx="4" fill="${je}" opacity=".9"/>
    <rect x="132" y="22" width="56" height="30" rx="3" fill="none" stroke="#0e1c14" stroke-width="1.5" opacity=".6"/>
    <rect x="132" y="60" width="56" height="40" rx="3" fill="none" stroke="#0e1c14" stroke-width="1.5" opacity=".6"/>
    <circle cx="182" cy="68" r="3.5" fill="${P}"/>
    <rect x="146" y="2" width="28" height="12" rx="2" fill="${A}"/>
    <text x="160" y="11.5" text-anchor="middle" style="${fe};font-size:8.5px;fill:#0e1c14;font-weight:700">17</text>
    ${[0,1,2].map(e=>`<rect x="98" y="${16+e*30}" width="22" height="26" rx="2" fill="${Y}" stroke="${xe}" stroke-width="1"/><rect x="200" y="${16+e*30}" width="22" height="26" rx="2" fill="${Y}" stroke="${xe}" stroke-width="1"/>`).join("")}
    <path d="M60 60 h26" stroke="${P}" stroke-width="1.5"/><circle cx="54" cy="60" r="4" fill="${P}"/>
    ${Z(70,50,"2 m","text-anchor:middle")}
    <path d="M258 60 h20" stroke="${R}" stroke-width="1.5" stroke-dasharray="3 3"/>
    ${te(160,120,"Zonenfokus 2 m · f/8 · hinstellen, drücken","text-anchor:middle")}
  `,128),tram:()=>ne(`
    ${[34,52,70].map((e,t)=>`<path d="M22 ${e} h${50+t*14}" stroke="${R}" stroke-width="2" stroke-linecap="round" stroke-dasharray="10 8"/>`).join("")}
    <path d="M160 18 v10 M146 20 l14 8 l14 -8" stroke="${A}" stroke-width="1.5" fill="none"/>
    <rect x="108" y="28" width="104" height="58" rx="10" fill="${P}" stroke="${A}" stroke-width="1.5"/>
    ${[118,144,170].map(e=>`<rect x="${e}" y="38" width="20" height="18" rx="3" fill="#0e1c14" opacity=".75"/>`).join("")}
    <rect x="196" y="38" width="10" height="18" rx="3" fill="#0e1c14" opacity=".75"/>
    <rect x="108" y="66" width="104" height="6" fill="#0e1c14" opacity=".35"/>
    <circle cx="130" cy="90" r="7" fill="#0e1c14" stroke="${A}" stroke-width="1.5"/><circle cx="190" cy="90" r="7" fill="#0e1c14" stroke="${A}" stroke-width="1.5"/>
    <circle cx="204" cy="78" r="3" fill="${A}"/>
    <path d="M230 90 h30" stroke="${P}" stroke-width="2" marker-end="url(#ag-arr4)"/>
    <defs><marker id="ag-arr4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${P}"/></marker></defs>
    ${te(160,114,"1/30 · mitdrehen · drei Versuche","text-anchor:middle")}
  `,122),meer:()=>ne(`
    <circle cx="238" cy="52" r="16" fill="${P}"/>
    <rect x="20" y="52" width="280" height="30" fill="#0e1c14"/>
    <path d="M20 52 h280" stroke="${A}" stroke-width="1.5"/>
    ${[62,72].map(e=>`<path d="M24 ${e} q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t16 0" fill="none" stroke="${xe}" stroke-width="1.5"/>`).join("")}
    <circle cx="124" cy="80" r="7" fill="${A}"/><path d="M124 87 v18 M114 96 h20 M124 105 l-7 12 M124 105 l7 12" stroke="${A}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="150" cy="80" r="7" fill="${P}"/><path d="M150 87 v18 M140 96 h20 M150 105 l-7 12 M150 105 l7 12" stroke="${P}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M137 70 c-5 -4 -6 -9 -2 -10 c2 0 3 2 3 3 c0 -1 1 -3 3 -3 c4 1 3 6 -2 10z" fill="${je}"/>
    <rect x="40" y="90" width="40" height="26" rx="2" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
    <rect x="50" y="80" width="20" height="12" rx="2" fill="#0e1c14" stroke="${A}" stroke-width="1.2"/><circle cx="60" cy="86" r="3.5" fill="none" stroke="${A}" stroke-width="1.2"/>
    ${Z(60,126,"Mauer + Selbstauslöser","text-anchor:middle")}
    ${te(160,142,"f/8 · 1/250 · Selbstauslöser · dann zu mir laufen","text-anchor:middle")}
  `,150),elevador:()=>ne(`
    <path d="M30 100 L290 36" stroke="${R}" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 108 L290 44" stroke="${R}" stroke-width="3" stroke-linecap="round"/>
    ${[[40,48,30],[78,40,34],[240,0,26],[274,-6,30]].map(([e,t,a])=>`
      <rect x="${e}" y="${t+20}" width="26" height="${a}" fill="${Y}" stroke="${A}" stroke-width="1"/>
      <rect x="${e+7}" y="${t+28}" width="6" height="8" fill="${xe}" opacity=".8"/><rect x="${e+7}" y="${t+42}" width="6" height="8" fill="${xe}" opacity=".8"/>`).join("")}
    <g transform="translate(160 72) rotate(-14)">
      <rect x="-40" y="-26" width="80" height="40" rx="8" fill="${P}" stroke="${A}" stroke-width="1.5"/>
      ${[-30,-8,14].map(e=>`<rect x="${e}" y="-18" width="16" height="14" rx="2" fill="#0e1c14" opacity=".75"/>`).join("")}
      <circle cx="-22" cy="18" r="5" fill="#0e1c14" stroke="${A}" stroke-width="1.5"/><circle cx="22" cy="18" r="5" fill="#0e1c14" stroke="${A}" stroke-width="1.5"/>
      <path d="M0 -26 v-10 M-8 -30 l8 -6 l8 6" stroke="${A}" stroke-width="1.5" fill="none"/>
    </g>
    <path d="M150 50 c-4 -3 -5 -7 -2 -8 c2 0 2 2 2 2 c0 0 0 -2 2 -2 c3 1 2 5 -2 8z" fill="${je}"/>
    ${te(160,122,"oben einsteigen, unten aussteigen, dann zu Fuss zurück","text-anchor:middle")}
  `,130),miradouro:()=>ne(`
    <circle cx="200" cy="48" r="14" fill="${P}"/>
    <rect x="20" y="48" width="280" height="14" fill="${xe}" opacity=".45"/>
    ${[[30,70,18],[52,64,24],[80,72,16],[100,60,28],[132,68,20],[156,74,14],[174,64,22],[200,70,18],[222,62,26],[252,72,16],[272,66,22]].map(([e,t,a])=>`
      <rect x="${e}" y="${t}" width="${a}" height="${90-t}" fill="${Y}" stroke="${A}" stroke-width=".8"/>
      <path d="M${e} ${t} l${a/2} -6 l${a/2} 6" fill="#b9432c" opacity=".8"/>`).join("")}
    <path d="M20 92 h280" stroke="${A}" stroke-width="2"/>
    ${[40,70,100,130,160,190,220,250,280].map(e=>`<path d="M${e} 92 v16" stroke="${A}" stroke-width="1.5"/>`).join("")}
    <path d="M20 108 h280" stroke="${A}" stroke-width="2"/>
    <path d="M280 80 l5 22 h-14 l5 -22z" fill="#b9432c" stroke="${A}" stroke-width="1.2"/><path d="M272 80 h22" stroke="${A}" stroke-width="1.5"/>
    <path d="M60 86 c-5 -4 -6 -9 -2 -10 c2 0 3 2 3 3 c0 -1 1 -3 3 -3 c4 1 3 6 -2 10z" fill="${je}"/>
    ${te(160,128,"kurz vor Sonnenuntergang da sein, dann nichts mehr tun","text-anchor:middle")}
  `,136),arcos:()=>ne(`
    <rect x="22" y="30" width="56" height="86" rx="3" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
    <rect x="36" y="48" width="28" height="68" rx="2" fill="#0e1c14" stroke="${A}" stroke-width="1.2"/><circle cx="58" cy="84" r="2" fill="${P}"/>
    ${Z(22,128,"Portas de Sto. Antão 58")}
    <path d="M90 74 h12" stroke="${R}" stroke-width="1.5" stroke-dasharray="3 3"/>
    ${[124,182,240].map(e=>`
      <path d="M${e-22} 116 v-50 a22 22 0 0 1 44 0 v50" fill="${Y}" stroke="${P}" stroke-width="1.8"/>
      <path d="M${e-22} 66 a22 22 0 0 1 44 0" fill="none" stroke="${P}" stroke-width="1.8" stroke-dasharray="4 3"/>
      <circle cx="${e}" cy="60" r="3" fill="${xe}"/>`).join("")}
    ${[0,1,2,3,4,5,6].map(e=>`<rect x="${106+e*26}" y="116" width="24" height="10" fill="none" stroke="${xe}" stroke-width="1"/><circle cx="${118+e*26}" cy="121" r="2" fill="${xe}"/>`).join("")}
    ${te(182,30,"drinnen: Hof, Kacheln, Kaffee im Salon","text-anchor:middle")}
  `,134),panoramico:()=>ne(`
    <circle cx="246" cy="40" r="13" fill="${P}"/>
    <path d="M20 118 q140 -70 280 0z" fill="${Y}" stroke="${A}" stroke-width="1"/>
    ${[[60,102],[100,92],[220,90],[262,100]].map(([e,t])=>`<path d="M${e} ${t} l-6 14 h12z M${e} ${t-8} l-5 12 h10z" fill="${Ao}"/>`).join("")}
    <rect x="150" y="80" width="20" height="30" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
    <ellipse cx="160" cy="80" rx="52" ry="12" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <ellipse cx="160" cy="68" rx="52" ry="12" fill="${Y}" stroke="${A}" stroke-width="1.5"/>
    <path d="M108 68 v12 M212 68 v12" stroke="${A}" stroke-width="1.5"/>
    ${[[118,74,"#e85d75"],[134,72,je],[150,76,xe],[168,72,P],[186,75,"#e85d75"],[202,73,xe]].map(([e,t,a])=>`<rect x="${e}" y="${t}" width="10" height="6" rx="2" fill="${a}" opacity=".85"/>`).join("")}
    <ellipse cx="160" cy="56" rx="52" ry="12" fill="none" stroke="${A}" stroke-width="1.5"/>
    <path d="M108 56 v12 M212 56 v12" stroke="${A}" stroke-width="1.5"/>
    ${[[-30,0],[30,0],[0,-8]].map(([e,t])=>`<circle cx="${160+e}" cy="${52+t}" r="2" fill="${A}"/>`).join("")}
    ${Z(160,36,"360°","text-anchor:middle;fill:"+P)}
    ${te(160,134,"goldene Stunde oben · bleiben, bis es dunkel ist","text-anchor:middle")}
  `,142),zypressen:()=>ne(`
    <path d="M20 54 h280" stroke="${R}" stroke-width="1"/>
    <path d="M190 54 v-14 M230 54 v-14 M180 44 h60 M178 54 c18 -14 36 -14 54 0" stroke="#b9432c" stroke-width="1.5" fill="none"/>
    ${[[40,1],[66,.85],[90,.7],[110,.58],[126,.48],[194,.48],[210,.58],[230,.7],[254,.85],[280,1]].map(([e,t])=>`
      <path d="M${e} 106 l${-8*t} 0 l${8*t} ${-62*t} l${8*t} ${62*t}z" fill="${Ao}"/>
      <path d="M${e} 106 v${-62*t}" stroke="#0e1c14" stroke-width="1" opacity=".5"/>`).join("")}
    <path d="M128 106 L160 56 L192 106z" fill="${Y}" stroke="${R}" stroke-width="1"/>
    <path d="M20 106 h280" stroke="${A}" stroke-width="1.5"/>
    <rect x="22" y="110" width="30" height="16" rx="5" fill="${P}" stroke="${A}" stroke-width="1"/><rect x="28" y="113" width="6" height="6" fill="#0e1c14" opacity=".7"/><rect x="38" y="113" width="6" height="6" fill="#0e1c14" opacity=".7"/>
    ${Z(66,122,"28, Endstation")}
    ${Z(300,36,"Ponte 25 de Abril","text-anchor:end")}
    ${te(160,140,"die Alleen entlang, dann ein Pastel bei Aloma","text-anchor:middle")}
  `,148),kirche:()=>ne(`
    <path d="M60 110 v-50 q100 -60 200 0 v50z" fill="#2a1410" opacity=".9"/>
    <path d="M60 60 q100 -60 200 0" fill="none" stroke="${A}" stroke-width="1.5"/>
    ${[84,124,196,236].map(e=>`
      <rect x="${e-7}" y="56" width="14" height="54" fill="#1a0c0a" stroke="${A}" stroke-width="1"/>
      <path d="M${e-7} 70 q7 6 14 0 M${e-7} 86 q7 -6 14 0 M${e-7} 100 q7 6 14 0" fill="none" stroke="#b9432c" stroke-width="1.2" opacity=".9"/>`).join("")}
    <circle cx="160" cy="88" r="26" fill="#e85d75" opacity=".18"/><circle cx="160" cy="88" r="14" fill="#e85d75" opacity=".25"/>
    <rect x="148" y="78" width="24" height="32" rx="2" fill="#1a0c0a" stroke="${P}" stroke-width="1.2"/>
    <path d="M160 72 v-10 M154 66 h12" stroke="${P}" stroke-width="1.5"/>
    ${[100,112,208,220].map(e=>`<rect x="${e}" y="96" width="8" height="14" fill="${Y}" stroke="${R}" stroke-width=".8"/>`).join("")}
    ${Z(160,24,"1959 gebrannt, so gelassen","text-anchor:middle")}
    ${te(160,130,"am Rossio, Tür immer offen, kostet nichts","text-anchor:middle")}
  `,138),monteagudo:()=>ne(`
    ${[[30,92,12],[48,86,16],[70,94,10],[250,90,14],[270,84,18],[292,92,10]].map(([e,t,a])=>`<rect x="${e}" y="${t}" width="${a}" height="${110-t}" fill="${Y}" stroke="${R}" stroke-width=".8"/>`).join("")}
    <path d="M20 112 h280" stroke="${R}" stroke-width="1"/>
    <path d="M80 112 q80 -70 160 0z" fill="#1f4633" stroke="${A}" stroke-width="1.2"/>
    <rect x="128" y="56" width="26" height="22" rx="2" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
    <path d="M122 56 h38 l-6 -10 h-26z" fill="${P}" stroke="${A}" stroke-width="1"/>
    ${[131,139,147].map(e=>`<path d="M${e} 46 v10" stroke="#0e1c14" stroke-width="2"/>`).join("")}
    <rect x="166" y="68" width="30" height="4" rx="1" fill="${A}"/><path d="M170 72 v8 M192 72 v8" stroke="${A}" stroke-width="1.5"/>
    <circle cx="176" cy="62" r="4" fill="${A}"/><circle cx="186" cy="62" r="4" fill="${P}"/>
    <path d="M181 56 c-3 -2 -3 -5 -1 -5 c1 0 1 1 1 1 c0 0 0 -1 1 -1 c2 0 2 3 -1 5z" fill="${je}"/>
    ${Z(160,30,"Anjos · kein Reisebus kommt hier hoch","text-anchor:middle")}
    ${te(160,130,"Quiosque, Bank, Graça und der Fluss, sonst nichts","text-anchor:middle")}
  `,138),faehre:()=>ne(`
    ${[[30,44,10,22],[44,38,8,28],[56,46,14,20],[74,40,10,26],[88,48,12,18],[104,42,8,24],[116,36,12,30],[132,46,10,20]].map(([e,t,a,n])=>`<rect x="${e}" y="${t}" width="${a}" height="${n}" fill="${Y}" stroke="${R}" stroke-width=".8"/>`).join("")}
    <path d="M20 66 h280" stroke="${A}" stroke-width="1.5"/>
    ${[76,86,96].map(e=>`<path d="M20 ${e} q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="${xe}" stroke-width="1.2" opacity=".8"/>`).join("")}
    <path d="M150 90 l10 10 h60 l10 -10z" fill="${P}" stroke="${A}" stroke-width="1.2"/>
    <rect x="166" y="78" width="38" height="12" rx="2" fill="${Y}" stroke="${A}" stroke-width="1.2"/>
    ${[170,180,190].map(e=>`<rect x="${e}" y="81" width="6" height="6" fill="#0e1c14" opacity=".7"/>`).join("")}
    <path d="M188 78 v-6" stroke="${A}" stroke-width="1.5"/>
    <path d="M236 110 h60 M240 110 v-10 h50 v10" fill="none" stroke="${A}" stroke-width="1.5"/>
    <rect x="252" y="90" width="26" height="4" rx="1" fill="${A}"/><path d="M265 94 v6" stroke="${A}" stroke-width="1.5"/>
    <circle cx="248" cy="84" r="4" fill="${A}"/><circle cx="282" cy="84" r="4" fill="${P}"/>
    <path d="M262 86 l2 -6 l2 6z" fill="#b9432c"/><path d="M270 86 l2 -6 l2 6z" fill="#b9432c"/>
    ${Z(80,30,"Lissabon, von drüben","text-anchor:middle")}
    ${Z(266,120,"Ponto Final","text-anchor:middle")}
    ${te(160,134,"Fähre ab Cais do Sodré · 10 Min · reservieren","text-anchor:middle")}
  `,142)};function Co(e){const t=Pu[e];return t?t():""}function zo(e){return String(e||"").split(/\n{2,}/).map(t=>`<p>${q(t).replace(/\n/g,"<br>")}</p>`).join("")}const _o="affektions-gacha:kurs:v1",Do="affektions-gacha:kurs:last";function Io(){try{const e=JSON.parse(window.localStorage.getItem(_o)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function No(e){const t=Io()[e];return Number.isInteger(t)&&t>=0?t:0}function ju(e,t){try{const a=Io();a[e]=t;const n=Object.keys(a).sort();for(;n.length>60;)delete a[n.shift()];window.localStorage.setItem(_o,JSON.stringify(a))}catch{}}function Bu(e){const t=Aa(e&&e.outcome&&e.outcome.steps);if(t.length)try{window.localStorage.setItem(Do,JSON.stringify({day:e.day,title:e.outcome.title||"",label:e.category&&e.category.label||"",steps:t,done:e.outcome.done||""}))}catch{}}function Ou(){try{const e=JSON.parse(window.localStorage.getItem(Do)||"null");return!e||typeof e.day!="string"||!Aa(e.steps).length?null:e}catch{return null}}function Fu(e=p.specialDays&&p.specialDays.days,t=J((a=>(a=p.theme)==null?void 0:a.timezone)()||"UTC")){const n=[];for(const r of Array.isArray(e)?e:[]){if(r.tone!=="quest")continue;const i=String(r.date||""),o=/^\d{2}-\d{2}$/.test(i)?`${t.slice(0,4)}-${i}`:i;if(!(!o||o>t))for(const s of Array.isArray(r.outcomes)?r.outcomes:[]){const l=Aa(s.steps);l.length&&n.push({day:o,title:s.title||"",label:r.label||"",steps:l,done:s.done||""})}}return n.sort((r,i)=>r.day<i.day?1:r.day>i.day?-1:0)}function Po(){return Fu()[0]||Ou()}function qu(e){return{day:e.day,category:{label:e.label},outcome:{title:e.title,steps:e.steps,done:e.done}}}function jo(){const e=document.querySelector("[data-ag-chips]");if(!e||e.querySelector("#ag-btn-kurs")||!Po())return;const t=document.createElement("li");t.id="ag-btn-kurs",t.textContent="Kurs 🎞️",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label","Kurs öffnen"),t.classList.add("ag-chip-clickable");const a=()=>{E(6),Wu()};t.addEventListener("click",a),t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),a())}),e.appendChild(t)}function Wu(){const e=document.querySelector("#ag-kurs-panel"),t=Po();if(!e||!t)return;const a=e.querySelector("#ag-kurs-panel-title");a&&(a.textContent=t.title||"Kurs");const n=e.querySelector("#ag-kurs-panel-copy");n&&(n.textContent=t.label?`${t.label} · ${t.day}`:t.day),Oo(e.querySelector("[data-ag-kurs-panel-block]"),qu(t),{remember:!1}),e.hidden=!1;try{e.scrollIntoView({block:"start",behavior:"smooth"})}catch{}}function Ru(){const e=document.querySelector("#ag-kurs-panel");e&&(e.hidden=!0)}function Bo(e,t){return!Number.isFinite(e)||t<=0?0:Math.min(t,Math.max(0,Math.round(e)))}function Aa(e){return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&typeof t.title=="string"&&typeof t.text=="string"):[]}function Oo(e,t,{remember:a=!0}={}){if(!e)return;const n=Aa(t&&t.outcome&&t.outcome.steps);if(!n.length){e.hidden=!0;return}e.hidden=!1,a&&(Bu(t),jo());const r=t.day,i=s=>{const l=Bo(No(r),n.length),d=l>=n.length,u=d?null:n[l];e.classList.toggle("is-done",d),e.querySelector("[data-ag-kurs-count]").textContent=d?`${n.length} von ${n.length} · fertig`:`Schritt ${l+1} von ${n.length}`,e.querySelector("[data-ag-kurs-title]").textContent=d?"Alle Schritte durch 🎞️":u.title;const g=e.querySelector("[data-ag-kurs-figure]");if(g){const b=d?"":Co(u.figure);g.innerHTML=b,g.hidden=!b}e.querySelector("[data-ag-kurs-text]").innerHTML=zo(d?t.outcome.done||"Das war der Kurs. Jetzt gilt nur noch das Notizbuch und der Film.":u.text),e.querySelector("[data-ag-kurs-dots]").innerHTML=n.map((b,f)=>`<i class="${f<l?"is-past":f===l&&!d?"is-now":""}"></i>`).join("");const m=e.querySelector("[data-ag-kurs-prev]"),x=e.querySelector("[data-ag-kurs-next]");if(m.disabled=l===0,x.hidden=d,x.textContent=l===n.length-1?"Fertig ✓":"Weiter ›",s)try{e.scrollIntoView({block:"start",behavior:"smooth"})}catch{}},o=s=>{const l=Bo(No(r)+s,n.length);ju(r,l),E(s>0?[8,20,8]:6),i(!0)};e.querySelector("[data-ag-kurs-prev]").onclick=()=>o(-1),e.querySelector("[data-ag-kurs-next]").onclick=()=>o(1),i(!1)}const er="affektions-gacha:einstellung:lichtreaktionen";function Ft(){try{return window.localStorage.getItem(er)!=="aus"}catch{return!0}}function Uu(e){try{e?window.localStorage.removeItem(er):window.localStorage.setItem(er,"aus")}catch{}return Ft()}function Hu(e){e&&(e.checked=Ft(),e.addEventListener("change",()=>{const t=Uu(e.checked);e.checked=t,E(6),B(t?"💡 Die Lampen reagieren wieder auf die App":"💡 Die Lampen bleiben bei App-Aktionen ruhig")}))}const mt=new WeakMap,Fo=4e3;function rt(e,t="Sicher? Nochmal tippen",a=Fo){if(!e)return!0;const n=mt.get(e);if(n)return clearTimeout(n.timer),mt.delete(e),e.classList.remove("is-armed"),e.innerHTML=n.html,!0;const r=e.innerHTML;e.classList.add("is-armed"),e.textContent=t;const i=setTimeout(()=>{mt.delete(e),e.classList.remove("is-armed"),e.innerHTML=r},a);return mt.set(e,{timer:i,html:r}),!1}function Gu(e){const t=e&&mt.get(e);t&&(clearTimeout(t.timer),mt.delete(e),e.classList.remove("is-armed"),e.innerHTML=t.html)}const Ku=Object.freeze(Object.defineProperty({__proto__:null,ARM_MS:Fo,armConfirm:rt,disarm:Gu},Symbol.toStringTag,{value:"Module"})),qo="affektions-gacha:",Wo="affektions-gacha-sicherung";function Yu(e=window.localStorage,t=new Date){const a={};for(let n=0;n<e.length;n++){const r=e.key(n);r&&r.startsWith(qo)&&(a[r]=e.getItem(r))}return{format:Wo,version:1,exportedAt:t.toISOString(),data:a}}function Vu(e,t=window.localStorage){if(!e||e.format!==Wo||typeof e.data!="object"||!e.data)throw new Error("Das ist keine Sicherung dieser App.");if(e.version!==1)throw new Error("Diese Sicherung ist von einer neueren Version.");const a=Object.entries(e.data).filter(([n,r])=>n.startsWith(qo)&&typeof r=="string");if(!a.length)throw new Error("Die Sicherung ist leer.");for(const[n,r]of a)t.setItem(n,r);return a.length}function Ju(e=new Date){return`affektions-gacha-${e.toISOString().slice(0,10)}.json`}async function Zu(){const e=Yu(),t=new Blob([JSON.stringify(e,null,1)],{type:"application/json"}),a=Ju();try{const i=new File([t],a,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[i]}))return await navigator.share({files:[i],title:"Affektions-Gacha Sicherung"}),!0}catch(i){if(i&&i.name==="AbortError")return!1}const n=URL.createObjectURL(t),r=document.createElement("a");return r.href=n,r.download=a,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e4),!0}function Xu(e,t,a){e&&e.addEventListener("click",async()=>{E(6);try{await Zu()&&B("💾 Sicherung erstellt")}catch{B("Sicherung fehlgeschlagen")}}),t&&a&&(t.addEventListener("click",()=>{rt(t,"Überschreibt diesen Stand — nochmal tippen")&&a.click()}),a.addEventListener("change",async()=>{const n=a.files&&a.files[0];if(a.value="",!!n)try{const r=Vu(JSON.parse(await n.text()));B(`💾 ${r} Einträge zurückgeholt — lädt neu…`),setTimeout(()=>window.location.reload(),1200)}catch(r){B(r&&r.message&&/Sicherung|Version/.test(r.message)?r.message:"Die Datei konnte nicht gelesen werden.")}}))}const Ro=.72;function Qu(e,t){return e>0&&t/e<=Ro}function ep(e,t){if(!e)return;const a=new Map;let n=0,r=!1;const i=()=>{const[l,d]=[...a.values()];return Math.hypot(l.x-d.x,l.y-d.y)};e.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&(n=i(),r=!1))}),e.addEventListener("pointermove",l=>{a.has(l.pointerId)&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&!r&&Qu(n,i())&&(r=!0,t()))});const o=l=>{a.delete(l.pointerId),a.size<2&&(n=0)};e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o);let s=!1;e.addEventListener("gesturestart",()=>{s=!1}),e.addEventListener("gesturechange",l=>{!s&&l.scale&&l.scale<=Ro&&(s=!0,t())})}function tp(e){const t=e&&e.closest(".ag-widget"),a=t&&t.querySelector('.ag-bottomnav-btn[data-ag-tab="lieblinge"] .ag-bottomnav-btn-icon');if(!e||!a)return;const n=e.getBoundingClientRect(),r=a.getBoundingClientRect(),i=document.createElement("div");i.className="ag-fav-ghost",i.style.left=`${n.left}px`,i.style.top=`${n.top}px`,i.style.width=`${n.width}px`,i.style.height=`${Math.min(n.height,260)}px`,document.body.appendChild(i);const o=r.left+r.width/2-(n.left+n.width/2),s=r.top+r.height/2-(n.top+Math.min(n.height,260)/2),l=i.animate([{transform:"translate(0,0) scale(1) rotate(0deg)",opacity:.9},{transform:`translate(${(o*.5).toFixed(0)}px, ${(s*.5).toFixed(0)}px) scale(.4) rotate(-6deg)`,opacity:.9,offset:.6},{transform:`translate(${o.toFixed(0)}px, ${s.toFixed(0)}px) scale(.05) rotate(4deg)`,opacity:.2}],{duration:700,easing:"cubic-bezier(.3,.7,.3,1)",fill:"forwards"});l.onfinish=()=>{i.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),E([10,40,20])}}const ap=["So","Mo","Di","Mi","Do","Fr","Sa"];function np(e){try{const[t,a,n]=J(e||"UTC").split("-").map(Number),r=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return ap[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(r)]||null}catch{return null}}function rp(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function Uo(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const i=rp(n,t),o=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${q(n.when)}</span>`:"";return`
      <li class="ag-skin-step${i?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${q(n.name||"")}${o}</span>
          ${n.note?`<span class="ag-skin-note">${q(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${q(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function ip(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=p.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=np(p.theme&&p.theme.timezone);e.innerHTML=Uo(t.morning,a)+Uo(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${q(t.footer)}</p>`:"")}function Ho(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,ip(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),E(10))}function op(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}function sp(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function tr(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function lp(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${tr(r)}× ${n}`}return null}function dp(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const i=Number(r&&r.elevation);!Number.isFinite(i)||i<=0||(!a||i>a.h)&&(a={h:i,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${tr(n)}× euer höchster Gipfel (${a.name})`:`≈ ${tr(n)}× euer höchster Gipfel`}function cp(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,i]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+i+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function gp(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const i=r.indexOf("?"),o=i===-1?r:r.slice(0,i),s=i===-1?"":r.slice(i+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),o+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),i=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${i}`)}const n=cp(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function ar(e,t){const a=e==="gipfel-delete";qi("gipfelbuch",{kind:a?"delete":"upsert",id:t&&t.id,entry:a?null:t,body:{type:e,...t}});const n=p.backup;return!n||!n.enabled||!n.endpointUrl?Promise.resolve(0):va("gipfelbuch",n.endpointUrl).catch(()=>0)}function up(e){const t=ga();t.unshift(e),ua(t),Ke("gipfelbuch"),ar("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function pp(e){ua(ga().filter(t=>t.id!==e)),Ke("gipfelbuch"),ar("gipfel-delete",{id:e})}function hp(e,t){const a=ga(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,ua(a),Ke("gipfelbuch"),ar("gipfel-upsert",r)}function fp(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?nc(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?gp(e.activityUrl):null,i=f=>typeof f=="string"&&/^https?:\/\//i.test(f.trim()),o=i(e.cover)?`<div class="ag-gipfel-cover"><img src="${q(e.cover)}" alt="${q(e.name||"")}" loading="lazy" decoding="async"></div>`:"",s=e.elevGain||e.elevation,l=e.distance?`${q(e.distance)} km`:"",d=i(e.activityUrl)?`<a class="ag-gipfel-trail-arrow" href="${q(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",u=l||d?`<div class="ag-gipfel-stats">${l}${l&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${o}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${q(Qd(e.date))}</div>
        <div class="ag-gipfel-name">${q(e.name||"—")}</div>
      </div>
      ${s?`<div class="ag-gipfel-elev">↑ ${un(s)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${q(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${q(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${u}
    ${e.notes?`<p class="ag-gipfel-notes">${q(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const g=t.querySelector("[data-ag-gipfel-edit]");g&&g.addEventListener("click",()=>{var X;const f=c("[data-ag-berge-form]"),k=c("[data-ag-berge-add]");if(!f)return;const z=c("[data-ag-berge-edit-id]");z&&(z.value=e.id);const I=c("[data-ag-berge-name]");I&&(I.value=e.name||"");const y=c("[data-ag-berge-dist]");y&&(y.value=e.distance||"");const w=c("[data-ag-berge-gain]");w&&(w.value=e.elevGain||e.elevation||"");const S=c("[data-ag-berge-date]");S&&(S.value=e.date||"");const T=c("[data-ag-berge-url]");T&&(T.value=e.activityUrl||"");const M=c("[data-ag-berge-cover]");M&&(M.value=e.cover||"");const v=c("[data-ag-berge-notes]");v&&(v.value=e.notes||"");const O=c("[data-ag-berge-lat]");O&&(O.value=e.lat||"");const ee=c("[data-ag-berge-lng]");ee&&(ee.value=e.lng||"");const F=c("[data-ag-berge-loc-label]");F&&(F.value=e.locLabel||"");const de=c("[data-ag-loc-search]");de&&(de.value=e.locLabel||"");const D=c("[data-ag-berge-form-title]");D&&(D.textContent="Eintrag bearbeiten");const N=c("[data-ag-berge-save] span:last-child");N&&(N.textContent="Speichern"),f.hidden=!1,k&&(k.hidden=!0),(X=c("[data-ag-sheet-backdrop]"))==null||X.classList.add("is-open"),f.scrollIntoView({behavior:"smooth",block:"nearest"}),I&&I.focus(),E(8)});const m=t.querySelector("[data-ag-gipfel-delete]");m&&m.addEventListener("click",()=>{rt(m,"Löschen? Nochmal tippen")&&(pp(e.id),qt(),E(8),B("Eintrag gelöscht"))});const x=t.querySelector("[data-ag-map-komoot]");x&&x.addEventListener("click",()=>{const f=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(f){if(!f.hidden){f.hidden=!0,x.textContent="🗺 Komoot-Karte";return}f.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,f.hidden=!1,x.textContent="Karte schließen",E(4)}});const b=t.querySelector("[data-ag-map-alltrails]");return b&&r&&b.addEventListener("click",()=>{const f=t.querySelector("[data-ag-map-wrap-alltrails]");if(f){if(!f.hidden){f.hidden=!0,b.textContent="🗺 AllTrails-Karte";return}f.innerHTML=`<iframe src="${q(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,f.hidden=!1,b.textContent="Karte schließen",E(4)}}),t}function qt({loading:e=!1}={}){const t=c("[data-ag-berge-list]"),a=c("[data-ag-berge-empty]"),n=c("[data-ag-berge-total]"),r=c("[data-ag-berge-analogy]"),i=c("[data-ag-berge-total-dist]"),o=c("[data-ag-berge-dist-analogy]"),s=c("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=ga().sort((g,m)=>{const x=g.date||"",b=m.date||"";return b<x?-1:b>x?1:0});t.innerHTML="";const d=l.reduce((g,m)=>g+(Number(m.elevGain)||Number(m.elevation)||0),0);if(n&&(n.textContent=d>0?un(d):"— m"),r){const g=sp(d);g?(r.textContent=g,r.hidden=!1):r.hidden=!0}const u=l.reduce((g,m)=>{const x=Number(m.distance);return g+(Number.isFinite(x)&&x>0?x:0)},0);if(i&&(i.textContent=u>0?`${ec(u)} km`:"— km"),o){const g=lp(u);g?(o.textContent=g,o.hidden=!1):o.hidden=!0}if(s){const g=dp(d,l);g?(s.textContent=g,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),Go([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(g=>t.appendChild(fp(g))),Go(l)}function mp(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const i=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");i&&(i.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const i=t.value.trim();if(!i){r();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(d=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=d.display_name,u.addEventListener("click",()=>{const g=e.querySelector("[data-ag-berge-lat]"),m=e.querySelector("[data-ag-berge-lng]"),x=e.querySelector("[data-ag-berge-loc-label]");g&&(g.value=d.lat),m&&(m.value=d.lon),x&&(x.value=d.display_name),t.value=d.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!a.contains(i.target)&&(a.hidden=!0)})}function bp(){mp($)}let Ne=null,Ca=null;function nr(){Ne&&setTimeout(()=>Ne.invalidateSize(),150)}async function yp(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function Go(e){const t=c("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await yp()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const i=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!Ne){Ne=n.map(r).fitBounds(i),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(Ne);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),l.classList.add("is-active");const d=l.dataset.mapView==="eu"?o:i;Ne.fitBounds(d)})})}Ca?Ca.clearLayers():Ca=n.layerGroup().addTo(Ne),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),d=document.createElement("div");d.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;d.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${q(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${un(u)}</div>`:""}
    `;const g=document.createElement("button");g.type="button",g.textContent="Zum Eintrag",g.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",g.addEventListener("click",()=>{l.closePopup();const m=$.querySelector(`[data-ag-gipfel-id="${window.CSS.escape(String(s.id))}"]`);m&&(m.scrollIntoView({behavior:"smooth",block:"center"}),m.classList.add("ag-gipfel-highlight"),setTimeout(()=>m.classList.remove("ag-gipfel-highlight"),1200))}),d.appendChild(g),l.bindPopup(d),Ca.addLayer(l)}),requestAnimationFrame(()=>{Ne&&Ne.invalidateSize()}),setTimeout(()=>{Ne&&Ne.invalidateSize()},250)}const Ko=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}],wp=5,rr="🌿";function xp(e=new Date){const t=e.getMonth()+1;return t>=3&&t<=5}function vp(e,t){return e>=wp&&!Ac(t)}function Yo(e){return Ko[Math.min(e-1,Ko.length-1)]}function bt(e,t){return e+Math.random()*(t-e)}function Vo(){const e=c("#ag-baerlauch-level");e&&(e.textContent=`Level ${p.baerlauch.level}`)}function Wt(){p.baerlauch.timerId&&(clearInterval(p.baerlauch.timerId),p.baerlauch.timerId=null)}function Jo(e){const t=c("#ag-baerlauch-field"),a=c("#ag-baerlauch-success"),n=c("#ag-baerlauch-reward"),r=c("#ag-baerlauch-photo"),i=c("#ag-baerlauch-text"),o=c("#ag-baerlauch-actions");o&&(o.hidden=!0),Wt(),p.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),i&&(i.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Zo(K(),p.baerlauch.level,!1),or()}function kp(){var u;const e=c("#ag-baerlauch-success"),t=c("#ag-baerlauch-reward"),a=c("#ag-baerlauch-photo"),n=c("#ag-baerlauch-text"),r=c("#ag-baerlauch-actions"),i=c("#ag-baerlauch-next");Wt(),document.querySelectorAll("#ag-baerlauch-field .ag-forage-item").forEach(g=>{g.disabled=!0});const o=p.baerlauch.level;p.baerlauch.level+=1;const s=Lp(K(),p.baerlauch.level);Zo(K(),o,!0),or(),Vo(),s&&$e();let l=!1;const d=ra((u=p.theme)==null?void 0:u.timezone);if(vp(o,d)){Cc(d);try{la(rr)}catch{}try{Et()}catch{}try{we()}catch{}try{B(`${rr} Sammeltoken für Level ${o} — in der Token-Bank`)}catch{}l=!0}if(e&&(e.hidden=!1,e.textContent=l?`Level ${o} geschafft, nur guten Bärlauch gesammelt. Dafür gibt es diese Woche ein ${rr}. 💚`:"Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&p.photos&&p.photos.length){const g=Ot(),m=g.length?g[Math.floor(Math.random()*g.length)]:null;Al(a,m),t.hidden=!1;const x=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=x[Math.floor(Math.random()*x.length)]}i&&(i.textContent=`Level ${p.baerlauch.level} starten`),r&&(r.hidden=!1)}function $p(e){const t=c("#ag-baerlauch-timer"),a=c("#ag-baerlauch-darkness"),r=Yo(p.baerlauch.level).timeMs;p.baerlauch.durationMs=r,p.baerlauch.startedAt=performance.now(),Wt(),p.baerlauch.timerId=setInterval(()=>{const i=performance.now()-p.baerlauch.startedAt,o=Math.max(0,r-i),s=Math.min(1,i/r);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),d=Math.pow(s,1.4);l.forEach(u=>{u.style.filter=`brightness(${1-d*.72}) saturate(${1-d*.45}) hue-rotate(${d*8}deg)`,u.style.opacity=String(1-d*.28)}),o<=0&&(Wt(),e())},50)}function ir(){const e=c("#ag-baerlauch-panel"),t=c("#ag-baerlauch-field"),a=c("#ag-baerlauch-success"),n=c("#ag-baerlauch-reward"),r=c("#ag-baerlauch-photo"),i=c("#ag-baerlauch-text"),o=c("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!i)return;if(e.hidden=!1,or(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),p.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",i.textContent="",o&&(o.hidden=!0),Vo();const s=Yo(p.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],d=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...l.slice(0,s.good).map(x=>({emoji:x,good:!0})),...d.slice(0,s.bad).map(x=>({emoji:x,good:!1}))];let g=0;const m=u.filter(x=>x.good).length;u.forEach(x=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=x.emoji,b.dataset.good=x.good?"true":"false",b.style.left=`${bt(8,82)}%`,b.style.top=`${bt(10,72)}%`,b.style.setProperty("--dx",`${bt(-320,320)}px`),b.style.setProperty("--dy",`${bt(-220,220)}px`),b.style.setProperty("--dur",`${bt(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${bt(-1.8,0)}s`),b.addEventListener("click",()=>{p.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,g+=1,setTimeout(()=>b.remove(),140),g===m&&kp()):Jo("poison"))}),t.appendChild(b)}),$p(()=>Jo("timeout"))}function Sp(){const e=c("#ag-baerlauch-panel");Wt(),e&&(e.hidden=!0)}function Lp(e,t){const a=$n(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=p.backup;if(r&&r.enabled&&r.endpointUrl){const i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"baerlauch-score",player:e,level:t})};fetch(r.endpointUrl,i).catch(()=>fetch(r.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}}return n}function Zo(e,t,a){var o;const n=Li(),r=((o=p.theme)==null?void 0:o.timezone)||"UTC",i=J(r);n.unshift({date:i,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function or(){var u;const e=c("#ag-baerlauch-scores");if(!e)return;const t="lennart",a="Fionn",n=$n(),r=Li(),i="fionn",o=t in n||i in n;if(!o&&!r.length){e.hidden=!0;return}e.hidden=!1;const s=((u=p.theme)==null?void 0:u.timezone)||"UTC",l=g=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:s}).format(new Date(g+"T12:00:00Z"))}catch{return g}};let d="";if(o){const g=n[t]??0,m=n[i]??0;d+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${g||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${a}</span><span class="ag-score-result">Level ${m||"—"}</span></div>
    </div>`}if(r.length){const g=r.slice(0,8).map(m=>{const x=m.player===t,b=x?"ag-score-mine":"ag-score-theirs",f=x?"Du":a,k=m.won?`✓ Level ${m.level}`:`✗ Level ${m.level}`;return`<div class="ag-score-row"><span class="ag-score-date">${l(m.date)}</span><span class="ag-score-pill ${b}">${f}</span><span class="ag-score-result">${k}</span></div>`}).join("");d+=`<div class="ag-score-table">${g}</div>`}e.innerHTML=d}const U={recorder:null,audioBlob:null,lang:"swabian"};function za(){try{return JSON.parse(window.localStorage.getItem(oi)||"[]")||[]}catch{return[]}}function _a(e){try{window.localStorage.setItem(oi,JSON.stringify(e))}catch{}}function Xo(e){const t=za();t.unshift(e),_a(t),Ke("glossary"),sr("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Ep(e,t){const a=za(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,_a(a),Ke("glossary"),sr("glossary-upsert",r)}function Tp(e){_a(za().filter(t=>t.id!==e)),Ke("glossary"),sr("glossary-delete",{id:e})}let Da=!1;async function Qo(){const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;const t=wa("glossary");va("glossary",e.endpointUrl).catch(()=>{});try{const a=K(),n=`${e.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,i=setTimeout(()=>r.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(i)}if(!o.ok)return 0;const s=await o.json();return!s.ok||!Array.isArray(s.glossary)?0:(zn("glossary")||Ui("glossary",t)||_a(Wi("glossary",s.glossary.filter(l=>l.id))),s.glossary.length)}catch{return 0}}function sr(e,t){const a={type:e,token:K(),...t},n=e==="glossary-delete";qi("glossary",{kind:n?"delete":"upsert",id:t&&t.id,entry:n?null:t,body:a});const r=p.backup;return!r||!r.enabled||!r.endpointUrl?Promise.resolve(0):va("glossary",r.endpointUrl).catch(()=>0)}async function lr(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Mp(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return lr(e);try{const n=await lr(e),r=n.split(",")[1],i=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:K(),filename:`glossary-${t}.webm`,mimeType:i,data:r}),s=new AbortController,l=setTimeout(()=>s.abort(),2e4);let d;try{d=await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o,signal:s.signal})}finally{clearTimeout(l)}const u=await d.json();return u.ok&&u.url?u.url:n}catch{return lr(e)}}const Ap={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang",kapsel:"Kapsel"};function Cp(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${q(Ap[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${q(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${q(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${q(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${q(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${q(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),E(6)});const i=a.querySelector("[data-ag-glossary-edit]");i&&i.addEventListener("click",()=>{var m;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const d=document.getElementById("ag-glossary-form-title");d&&(d.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const g=document.getElementById("ag-glossary-audio-status");g&&(g.textContent=e.audioUrl?"Aufnahme vorhanden":""),U.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(m=document.getElementById("ag-glossary-word-input"))==null||m.focus(),E(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{rt(o,"Löschen? Nochmal tippen")&&(Tp(e.id),it(U.lang),E(8))}),a}function it(e){var o;U.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===U.lang)}),es();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),r=za(),i=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===U.lang);if(t.innerHTML="",!i.length){a&&(a.textContent=n?"Kein Treffer.":Da?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",Da&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),i.forEach(s=>t.appendChild(Cp(s,!!n)))}function es(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function ts(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),U.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),Da=!0,it("swabian"),window.requestAnimationFrame(()=>es()),E(10),Qo().catch(()=>0).then(()=>{Da=!1,it(U.lang)})}function zp(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),U.audioBlob=null,U.recorder&&U.recorder.state!=="inactive")try{U.recorder.stop()}catch{}U.recorder=null}const as=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],ns=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function rs(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(ct)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(ct,"granted")}catch{}await cr();return}if(e==="denied"){try{window.localStorage.setItem(ct,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function _p(){var s;const e=((s=p.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,i=8*60,o=r<i?i-r:24*60-r+i;return Date.now()+o*60*1e3}async function dr(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=K(),r=J(a);if(H().some(g=>g.token===n&&g.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=gn(a);if(o>=21)return;const l=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,d=Ja(),u=ns[pi(ns)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:u.title.replace("{name}",d),body:u.body.replace("{name}",d)})}catch{}}async function Dp(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=Ja(),i=as[pi(as)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:_p(),title:i.title.replace("{name}",r),body:i.body.replace("{name}",r)}),(t=p.quest)!=null&&t.enabled&&uo()){const o=Nt(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==Dt(p)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Dt(p)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:p.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:p.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Ip(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function cr(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",On()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),navigator.serviceWorker.addEventListener("message",t=>{t.data&&t.data.type==="PUSH_RESUBSCRIBE"&&os().catch(()=>{})}),"Notification"in window&&Notification.permission==="granted"&&(await Dp(),await dr(),await Ip(),await os())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Np(){const e=c("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(ct,"dismissed")}catch{}return}try{window.localStorage.setItem(ct,"granted")}catch{}await cr()}function is(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}async function Pp(e,t){try{const a=e&&e.options&&e.options.applicationServerKey;if(!a)return!0;const n=new Uint8Array(a),r=is(t);if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i]!==r[i])return!1;return!0}catch{return!0}}async function os(){const e=p.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();if(a&&!await Pp(a,e.vapidPublicKey)){try{await a.unsubscribe()}catch{}a=null}a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:is(e.vapidPublicKey)}));const n=p.backup&&p.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:K(),subscription:a.toJSON()}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,i).catch(()=>fetch(n,{...i,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}const ss="affektions-gacha:licht:farbe:v1",jp=7*864e5,Bp=.02;function ls(e){return(Number(e.pos)||0)>Bp}function ds(e){const t=e&&Array.isArray(e.groups)?e.groups:null;return!t||!t.length?!1:t.every(a=>!ls(a))}function cs(e){const t=e&&Array.isArray(e.groups)?e.groups:null;return!t||!t.length||e.on===!1?!1:t.some(ls)}function gr(){try{const e=JSON.parse(window.localStorage.getItem(ss)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function gs(e){try{window.localStorage.setItem(ss,JSON.stringify(e))}catch{}}function us(e,t,a=Date.now()){if(!e||!cs(t))return!1;const n=gr();return n[e]={groups:t.groups.map(r=>({pos:Number(r.pos)||0,w:Number(r.w)||0,size:Math.max(1,Math.round(Number(r.size)||1))})),brightness:typeof t.brightness=="number"?t.brightness:void 0,fade_steps:typeof t.fade_steps=="number"?t.fade_steps:void 0,at:a},gs(n),!0}function Op(e,t=Date.now()){const a=gr()[e];return!a||!Array.isArray(a.groups)||!a.groups.length||t-(a.at||0)>jp?null:a}function Fp(e){const t=gr();for(const a of e||[])delete t[a];gs(t)}function qp(e,t){const a={target:e,on:!0,groups:t.groups,fade_steps:typeof t.fade_steps=="number"?t.fade_steps:40};return typeof t.brightness=="number"&&(a.brightness=t.brightness),a}const ps="wss://broker.hivemq.com:8884/mqtt",Ia="picolight_lf26/events",hs="web_app",yt=10,Na=17/29,Wp={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:Na,w:1},quiet:{pos:1/29,w:.3}},fs=18e3,ms=420,bs=6,ys=ms*bs,ur=1600;function ws(e){const t=Wp[e]||{pos:Na,w:0},a=t.w>=1?{pos:Na,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],i=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],o=[];for(let l=0;l<bs;l++)o.push({at:l*ms,payload:{on:!0,fade_steps:6,brightness:1,groups:l%2?i:r}});o.push({at:ys,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:yt}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let l=!1;for(let d=ys+ur;d<fs-ur;d+=ur)l=!l,o.push({at:d,payload:{on:!0,fade_steps:60,groups:[{...l?s:n,size:yt}]}})}return o}const xs=2500,Ye=["board_a","board_b"];let ot=!1;function vs(){return ot}let Rt=null;function Ut(){return window.mqtt?Promise.resolve():Rt||(Rt=new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt@5.16.0/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>{Rt=null,a.remove(),t(new Error("mqtt load failed"))},document.head.appendChild(a)}),Rt)}function Rp(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}function Up(e){return Ft()?mr(ws(e),fs,null):Promise.resolve()}const ks={"🥹":{pos:25/29,w:0},"😂":{pos:0/29,w:0},"🙃":{pos:Na,w:0}},$s=1e4;function Ss(e){return[{at:0,payload:{on:!0,fade_steps:20,brightness:1,groups:[{...ks[e]||{pos:.06896551724137931,w:.3},size:yt}]}},{at:2200,payload:{fade_steps:60,brightness:.45}},{at:4400,payload:{fade_steps:60,brightness:1}},{at:6600,payload:{fade_steps:60,brightness:.45}},{at:8800,payload:{fade_steps:60,brightness:1}}]}function Hp(e,t="board_a"){return Ft()?mr(Ss(e),$s,t):Promise.resolve()}const pr="picolight_lf26/alarms",Ls="affektions-gacha:licht:wakeup-check",Es=30*6e4;function Ts(e){return!!e&&typeof e=="object"&&e.type!=="sunset"}function Gp({force:e=!1}={}){try{const t=Number(window.localStorage.getItem(Ls)||0);if(!e&&Date.now()-t<Es)return Promise.resolve(!1)}catch{}return Ut().then(()=>new Promise(t=>{const a=window.mqtt.connect(ps,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3,reconnectPeriod:0});let n=!1,r=0;const i=o=>{if(!n){if(n=!0,o)try{window.localStorage.setItem(Ls,String(Date.now()))}catch{}try{a.end()}catch{}t(r>0)}};a.on("connect",()=>{a.subscribe(pr,o=>{if(o){i(!1);return}setTimeout(()=>i(!0),4e3)})}),a.on("message",(o,s)=>{if(String(o)!==pr)return;let l;try{l=JSON.parse(s.toString())}catch{i(!0);return}if(!Array.isArray(l)){i(!0);return}const d=l.filter(u=>u&&typeof u=="object"&&!Ts(u));if(r=l.length-d.length,!r){i(!0);return}try{a.publish(pr,JSON.stringify(d),{retain:!0,qos:1}),a.publish(Ia,JSON.stringify({set_alarms:d,from:hs}),{qos:1})}catch{i(!1);return}setTimeout(()=>i(!0),1500)}),a.on("error",()=>i(!1)),a.on("close",()=>i(!1)),setTimeout(()=>i(!1),15e3)})).catch(()=>!1)}const hr=8e3,Ms=220,Kp=4/29,Yp=1.5/29;function As(e=0){const a=[];for(let r=0;r<yt;r++)a.push(Math.floor((r+e)%yt/2)%2===0?Kp:Yp);const n=[];for(const r of a){const i=n[n.length-1];i&&i.pos===r?i.size++:n.push({pos:r,w:0,size:1})}return n}function Cs(){const e=[];for(let t=0,a=0;t<hr-400;t+=Ms,a++)e.push({at:t,payload:{on:!0,fade_steps:4,brightness:a%2?.18:1,groups:As(a)}});return e}function Vp(){return Ft()?mr(Cs(),hr,null):Promise.resolve()}const zs=3200,_s={pos:1/29,w:.12};function Ds(e=Math.random){const t=[{..._s,size:yt}],a=()=>(e()-.5)*.08;return[{at:0,payload:{on:!0,fade_steps:70,brightness:.3+a(),groups:t}},{at:900,payload:{fade_steps:60,brightness:.42+a()}},{at:1700,payload:{fade_steps:50,brightness:.26+a()}},{at:2400,payload:{fade_steps:60,brightness:.38+a()}}]}function Jp(){let e=!1,t=null;return eh(()=>Ds(),zs,a=>{t=a,e&&a()}).catch(()=>{}),()=>{e=!0,t&&t()}}const Zp=e=>new Promise(t=>setTimeout(t,e)),Xp=["on","brightness","groups","fade_steps","drift_enabled"],Qp=25e3;async function Is(){const e=Date.now()+Qp;for(;ot&&!fr&&Date.now()<e;)await Zp(400);return!ot}function Ns({target:e=null,onCaptured:t,onTakeover:a}){const n="gachafx_"+Math.random().toString(16).slice(2),r=window.mqtt.connect(ps,{clientId:n,clean:!0,connectTimeout:8e3}),i={},o=new Set;let s=!0;const l={client:r,captured:i,skip:o,boards(){return(e?[e]:Ye).filter(d=>i[d]&&!o.has(d))},publish(d){try{r.publish(Ia,JSON.stringify({...d,from:hs,fx:n}))}catch{}},send(d){const u=l.boards();if(u.length)if(!e&&u.length===Ye.length)l.publish(d);else for(const g of u)l.publish({...d,target:g})},restore(d){for(const u of d){const g=i[u];if(!g||o.has(u))continue;const m={target:u,...Rp(g)};l.publish({...m,on:!0}),g.on===!1&&setTimeout(()=>l.publish({target:u,on:!1}),1500)}},stopCapturing(){s=!1}};return r.on("message",(d,u)=>{let g;try{g=JSON.parse(u.toString())}catch{return}if(!g||typeof g!="object")return;if(g.from&&Ye.includes(g.from)&&Array.isArray(g.groups)){s&&(i[g.from]=g,t&&t(g.from));return}if(s||g.fx===n||g.from===void 0||Ye.includes(g.from)||!Xp.some(b=>g[b]!==void 0))return;const m=g.target?[g.target]:Ye;let x=!1;for(const b of m)Ye.includes(b)&&!o.has(b)&&(o.add(b),x=!0);x&&a&&a()}),l}let fr=!1;async function eh(e,t,a){if(!await Is()){a(()=>{});return}ot=!0,fr=!0;try{await Ut(),await new Promise(n=>{let r=!1,i=!1,o=[],s=null;const l=()=>{if(!i){i=!0;try{u.client.end()}catch{}n()}},d=()=>{clearTimeout(s);for(const x of o)clearTimeout(x);o=[]},u=Ns({onTakeover:()=>{r&&!u.boards().length&&(d(),r=!1,setTimeout(l,500))}}),g=()=>{if(d(),!!u.boards().length){for(const x of e())o.push(setTimeout(()=>u.send({...x.payload}),x.at));s=setTimeout(g,t)}},m=()=>{if(d(),!r){l();return}r=!1,u.restore(Ye),setTimeout(l,2500)};u.client.on("connect",()=>{u.client.subscribe(Ia,x=>{if(x){l(),a(()=>{});return}u.publish({nudge:!0}),setTimeout(()=>{if(!i){if(u.stopCapturing(),!u.boards().length){l(),a(()=>{});return}r=!0,g(),a(m)}},xs)})}),u.client.on("error",()=>{r||(l(),a(()=>{}))}),u.client.on("close",()=>{r||(l(),a(()=>{}))})})}catch{a(()=>{})}finally{ot=!1,fr=!1}}async function mr(e,t,a){if(await Is()){ot=!0;try{await Ut(),await new Promise((n,r)=>{let i=!1,o=!1,s=null,l=[];const d=()=>{if(!o){o=!0,document.removeEventListener("visibilitychange",x);try{m.client.end()}catch{}n()}},u=()=>{clearTimeout(s);for(const b of l)clearTimeout(b);l=[]},g=()=>{if(u(),!i){d();return}i=!1,m.restore(a?[a]:Ye),setTimeout(d,2500)},m=Ns({target:a,onTakeover:()=>{i&&g()}}),x=()=>{document.visibilityState==="hidden"&&i&&g()};document.addEventListener("visibilitychange",x),m.client.on("connect",()=>{m.client.subscribe(Ia,b=>{if(b){d();return}m.publish({nudge:!0}),setTimeout(()=>{if(!o){if(m.stopCapturing(),!m.boards().length){d();return}i=!0;for(const f of e)l.push(setTimeout(()=>m.send({...f.payload}),f.at));s=setTimeout(g,t)}},xs)})}),m.client.on("error",()=>{i||d()}),m.client.on("close",()=>{i||d()}),setTimeout(()=>r(new Error("lights flash timed out")),t+2e4)})}catch{}finally{ot=!1}}}const st=Object.freeze(Object.defineProperty({__proto__:null,CANDLE_PERIOD_MS:zs,CANDLE_TINT:_s,HUG_MS:hr,HUG_STEP_MS:Ms,REACTION_LIGHT:ks,REACTION_MS:$s,WAKEUP_CHECK_EVERY_MS:Es,candleCycle:Ds,choreography:ws,clearWakeUpAlarms:Gp,flashHugOnLamps:Vp,flashLightsForPull:Up,flashReactionOnLamp:Hp,hugChoreography:Cs,hugGroups:As,isFxBusy:vs,isWakeUpAlarm:Ts,loadMqtt:Ut,reactionChoreography:Ss,startCandleLights:Jp},Symbol.toStringTag,{value:"Module"})),th="wss://broker.hivemq.com:8884/mqtt",Ht="picolight_lf26",ge=10,Ie=[{id:"board_a",name:"Fionns Lampe",owner:"Fionn",short:"FF"},{id:"board_b",name:"Lennarts Lampe",owner:"Lennart",short:"LS"}],ah="web_app",lt=1500,nh=15e4,Pa=[[255,200,80],[255,160,0],[255,120,0],[255,60,0],[255,0,0],[255,0,60],[255,0,140],[200,0,200],[140,0,255],[80,0,255],[0,0,255],[0,60,255],[0,140,255],[0,200,255],[0,255,220],[0,255,160],[0,255,80],[0,220,0],[80,255,0],[160,255,0],[220,255,0],[255,240,0],[255,180,40],[255,100,80],[255,80,160],[180,40,255],[40,100,255],[0,180,180],[20,255,120],[255,220,120]],ja=(e,t,a)=>e+(t-e)*a;function rh(e){const a=Math.min(Math.max(Number(e)||0,0),.9999)*(Pa.length-1),n=Math.floor(a),r=a-n,i=Pa[n],o=Pa[Math.min(n+1,Pa.length-1)];return[0,1,2].map(s=>Math.round(ja(i[s],o[s],r)))}const ih=200;function Ps(e){const t=Math.min(Math.max(Number(e)||0,0),.9999),a=rh(t),n=ih*(1-t);return[Math.min(255,Math.round(a[0]*t+n)),Math.min(255,Math.round(a[1]*t+n*.8)),Math.min(255,Math.round(a[2]*t+n*.6))]}function Ba(e){const[t,a,n]=Ps(e.pos),r=Math.min(Math.max(Number(e.w)||0,0),1)*.45;return[Math.round(ja(t,255,r)),Math.round(ja(a,244,r)),Math.round(ja(n,225,r))]}function oh(e=24){const t=[];for(let a=0;a<=e;a++){const[n,r,i]=Ps(a/e);t.push(`rgb(${n},${r},${i}) ${Math.round(a/e*100)}%`)}return`linear-gradient(to right, ${t.join(", ")})`}const js=.5;function wt(e,t=0){return[{pos:e,w:t,size:ge}]}const xt=ge;function Ve(e){let t=(Array.isArray(e)?e:[]).map(n=>({pos:Math.min(1,Math.max(0,Number(n&&n.pos)||0)),w:Math.min(1,Math.max(0,Number(n&&n.w)||0)),size:Math.max(1,Math.round(Number(n&&n.size)||1))})).slice(0,xt);if(!t.length)return wt(0,1);let a=t.reduce((n,r)=>n+r.size,0);for(;a>ge;){const n=t[t.length-1];n.size>1?(n.size--,a--):(t.pop(),a=t.reduce((r,i)=>r+i.size,0))}return a<ge&&(t[t.length-1].size+=ge-a),t}function Oa(e){const t=[];let a=0;for(const n of Ve(e).slice(0,-1))a+=n.size,t.push(a);return t}function Bs(e,t){let a=0;const n=Ve(e);for(let r=0;r<n.length;r++)if(a+=n[r].size,t<a)return r;return n.length-1}function br(e,t){const a=Ve(t),r=[0,...[...new Set(e.filter(i=>Number.isInteger(i)&&i>0&&i<ge))].sort((i,o)=>i-o).slice(0,xt-1),ge];return r.slice(0,-1).map((i,o)=>{const s=a[Bs(a,i)];return{pos:s.pos,w:s.w,size:r[o+1]-i}})}function sh(e,t){const a=Oa(e),n=a.indexOf(t);return n>=0?a.splice(n,1):a.push(t),br(a,e)}function lh(e,t){const a=Ve(e),n=Math.min(Math.max(t,0),a.length-1);if(a[n].size<2||a.length>=xt)return a;let r=0;for(let i=0;i<n;i++)r+=a[i].size;return br([...Oa(a),r+Math.ceil(a[n].size/2)],a)}function dh(e,t){const a=Ve(e);if(a.length<2)return a;const n=Math.min(Math.max(t,0),a.length-1),r=Oa(a),i=n<a.length-1?r[n]:r[n-1];return br(r.filter(o=>o!==i),a)}function Os(e,t,a,n){const r=Ve(e);return t==null?r.map(i=>({...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n})):r.map((i,o)=>o===t?{...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n}:i)}const ch=[{id:"warm",label:"Warm",emoji:"🕯",brightness:.55,groups:[{pos:0,w:.75,size:ge}]},{id:"weiss",label:"Weiß",emoji:"💡",brightness:.8,groups:[{pos:0,w:1,size:ge}]},{id:"wald",label:"Wald",emoji:"🌿",brightness:.7,groups:[{pos:17/29,w:0,size:ge}]},{id:"gold",label:"Gold",emoji:"✨",brightness:.8,groups:[{pos:0,w:0,size:5},{pos:29/29,w:0,size:5}]},{id:"abend",label:"Abendrot",emoji:"🌇",brightness:.65,groups:[{pos:2/29,w:0,size:4},{pos:23/29,w:0,size:3},{pos:24/29,w:0,size:3}]},{id:"meer",label:"Meer",emoji:"🌊",brightness:.6,groups:[{pos:13/29,w:0,size:5},{pos:27/29,w:.2,size:5}]},{id:"nacht",label:"Nacht",emoji:"🌙",brightness:.18,groups:[{pos:10/29,w:0,size:ge}]}];function gh(e){return{on:!0,fade_steps:40,brightness:e.brightness,groups:e.groups.map(t=>({...t}))}}function Fs(e){let t=Array.isArray(e.groups)&&e.groups.length?e.groups:null;if(!t&&Array.isArray(e.groupPositions)){const a=[0,...(Array.isArray(e.boundaries)?e.boundaries:[]).slice().sort((n,r)=>n-r),ge];t=a.slice(0,-1).map((n,r)=>({pos:e.groupPositions[r]??0,w:(e.groupWLevels||[])[r]??1,size:a[r+1]-n}))}return t||(t=wt(0,1)),{on:e.on!==!1,brightness:typeof e.brightness=="number"?e.brightness:.6,fade_steps:typeof e.fadeSteps=="number"?e.fadeSteps:60,groups:t.map(a=>({pos:Number(a.pos)||0,w:Number(a.w)||0,size:Math.max(1,Number(a.size)||1)}))}}function uh(e){const a=[{at:0,payload:{on:!0,brightness:1,fade_steps:6,groups:wt(.5862068965517241,0)}},{at:450,payload:{brightness:.12,fade_steps:6}},{at:900,payload:{brightness:1,fade_steps:6}},{at:1350,payload:{brightness:.12,fade_steps:6}},{at:1800,payload:{brightness:1,fade_steps:6}}];return e?(a.push({at:2700,payload:{on:!0,groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps}}),e.on===!1&&a.push({at:4200,payload:{on:!1}})):a.push({at:2700,payload:{on:!1}}),a}let G=null,Je=null,vt=0,Fa=0,kt="",Gt=null,se=0;const W={};let $t=[],yr=!1,St=[],qa=[],Kt=[],Se="",ae=null,Le="idle";function qs(){return`${Ht}/events`}function ph(){return`${Ht}/status/+`}function wr(){return`${Ht}/scenes`}function xr(){return`${Ht}/alarms`}function vr(e,t=Date.now()){const a=W[e];return!a||Le!=="connected"||a.online===!1?!1:a.online===!0?!0:!!(a.seenAt&&t-a.seenAt<nh)}function Ws(){return Object.values(W).filter(e=>e.groups).sort((e,t)=>(t.seenAt||0)-(e.seenAt||0))[0]||null}function Ze(e){Le=e,be()}function Be(){return Le==="connected"||Le==="connecting"||Le==="error"&&!!G}let Oe=[];const Rs=8,hh=3e4,Us=e=>Object.keys(e).filter(t=>t!=="target").sort().join(",")+"|"+(e.target||"");function fh(e){const t=Us(e);Oe=Oe.filter(a=>Us(a.payload)!==t),Oe.push({payload:e,at:Date.now()}),Oe.length>Rs&&(Oe=Oe.slice(-Rs))}function mh(){if(!G||!G.connected||!Oe.length)return;const e=Oe.filter(t=>Date.now()-t.at<hh);if(Oe=[],!!e.length){se=Date.now()+lt;for(const t of e)le(t.payload)}}function Hs(){if(G&&G.connected)return Ze("connected"),Promise.resolve(G);if(Je)return Je;if(G){try{G.end(!0)}catch{}G=null}const e=++vt;return Ze("connecting"),Je=Ut().then(()=>new Promise((t,a)=>{if(e!==vt){a(new Error("licht: stale connect"));return}const n=window.mqtt.connect(th,{clientId:"gacha_licht_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:1e4,reconnectPeriod:4e3,keepalive:30});G=n;const r=()=>e===vt&&G===n;let i=!1;const o=s=>{i||(i=!0,s?t(n):a(new Error(kt||"licht: no connection")))};n.on("connect",()=>{r()&&(Fa=Date.now(),kt="",n.subscribe([qs(),ph(),wr(),xr()],()=>{setTimeout(()=>{r()&&(yr=!0)},3e3)}),le({nudge:!0}),Ze("connected"),mh(),o(!0))}),n.on("message",(s,l)=>{r()&&Ks(s,l)}),n.on("reconnect",()=>{r()&&Le!=="connected"&&Ze("connecting")}),n.on("offline",()=>{r()&&Ze("error")}),n.on("error",s=>{r()&&(kt=s&&s.message||"error",Ze("error"))}),n.on("close",()=>{r()&&Ze("error")}),setTimeout(()=>o(!!n.connected),15e3)})).catch(t=>{throw e===vt&&(kt=t&&t.message||"load",Ze("error")),t}).finally(()=>{e===vt&&(Je=null)}),Je}function Gs(){const e=!!(G&&G.connected),t=Qe.length+et.length>0;for(const r of[...Qe,...et])clearTimeout(r);Qe=[],et=[],e&&t&&Tr(qe,Object.keys(qe)),qe={};const a=!!We;if(e)Lr();else if(We){clearInterval(We),We=null;for(const r of Vt)clearTimeout(r);Vt=[],Lt=null,$&&$.classList.remove("is-pulsing")}const n=e&&!!(ve||me||t||a);if(Mr({restore:e}),Ar({restore:e}),vt++,Je=null,Oe=[],G)try{G.end(!n)}catch{}G=null,Le="idle",Fa=0,Gt&&(clearInterval(Gt),Gt=null),be()}function bh(){Gt||(Gt=setInterval(()=>{G&&G.connected&&le({ping:!0}),be()},6e4))}const Wa={};let kr=null;function yh(e,t,a){Wa[e]={topic:t,msg:a},clearTimeout(kr),kr=setTimeout(()=>{kr=null;const n=Object.values(Wa);for(const r of Object.keys(Wa))delete Wa[r];for(const r of n)Ks(r.topic,r.msg)},Math.max(60,se-Date.now()+60))}function Ks(e,t){let a;try{a=JSON.parse(t.toString())}catch{return}if(!a||typeof a!="object")return;const n=String(e);if(n.startsWith(`${Ht}/status/`)){const i=n.split("/").pop(),o=W[i]&&W[i].online;W[i]={...W[i]||{},online:!!a.online},a.online&&(W[i].seenAt=Date.now()),a.online&&o===!1&&($r[i]=!0,le({nudge:!0})),be();return}if(n===xr()){if(Array.isArray(a)){qa=a.filter(o=>o&&typeof o=="object");const i=Qh(qa);i.length!==qa.length&&ef(i,{quiet:!0})}return}if(n===wr()){const i=Array.isArray(a.scenes)?a.scenes:[];Kt=(Array.isArray(a.deleted)?a.deleted:[]).filter(s=>typeof s=="string").slice(-50);const o=new Set(Kt);St=i.filter(s=>s&&typeof s=="object"&&!o.has(s.id)),$t=St.filter(s=>s.name),yr=!0,be();return}if(!a.from||!Ie.some(i=>i.id===a.from))return;const r=W[a.from]={...W[a.from]||{},seenAt:Date.now()};if(Date.now()<se){yh(a.from,e,t),be();return}a.on!==void 0&&(r.on=!!a.on),typeof a.brightness=="number"&&(r.brightness=a.brightness),typeof a.fade_steps=="number"&&(r.fade_steps=a.fade_steps),Array.isArray(a.groups)&&(r.groups=a.groups),Array.isArray(a.groups)&&(cs(r)?vs()||us(a.from,r):$r[a.from]&&ds(r)&&wh(a.from),$r[a.from]=!1),be()}const $r={};function wh(e){var n;const t=Op(e);if(!t)return!1;const a=qp(e,t);return W[e]={...W[e]||{},on:!0,groups:a.groups,brightness:a.brightness??((n=W[e])==null?void 0:n.brightness),fade_steps:a.fade_steps},se=Date.now()+lt,le(a),B("🎨 Farbe zurückgeholt"),!0}function le(e){if(!G||!G.connected)return!1;try{return G.publish(qs(),JSON.stringify({...e,from:ah})),!0}catch{return!1}}function Xe(e,t=Se||null){se=Date.now()+lt;const a=t?[t]:Ie.map(i=>i.id);for(const i of a){const o=W[i]={...W[i]||{}};e.on!==void 0&&(o.on=!!e.on),typeof e.brightness=="number"&&(o.brightness=e.brightness),typeof e.fade_steps=="number"&&(o.fade_steps=e.fade_steps),Array.isArray(e.groups)&&(o.groups=e.groups)}if(Array.isArray(e.groups))if(ds(e))Fp(a);else for(const i of a)us(i,W[i]);const n=t?{...e,target:t}:e;let r=le(n);return r||(fh(n),!G&&!Je&&Hs().catch(()=>{}),Date.now()-Ys>4e3&&(Ys=Date.now(),B("💡 Kommt an, sobald die Lampen verbunden sind")),r=!0),be(),r}let Ys=0;function Vs(){return Ie.some(e=>W[e.id]&&W[e.id].on)}function xh(){return Se?!!(W[Se]&&W[Se].on):Vs()}function Js(){return Se&&W[Se]&&W[Se].groups?W[Se]:Ws()}function vh(e){Xe({on:!!e}),E(8)}function kh(e){Xe({brightness:Math.min(1,Math.max(.02,e))})}function Fe(){const e=Se&&W[Se]||Ws();return Ve(e&&e.groups?e.groups:wt(0,1))}function Zs(e){const t=Fe();ae=e==null||e<0||e>=t.length||e===ae?null:e,be()}function Yt(e){const t=Ve(e);ae!==null&&ae>=t.length&&(ae=null),Xe({on:!0,fade_steps:30,groups:t})}function Sr(e,t){const a=Fe(),n=a.length===1&&ae===null;Yt(n?wt(e,js):Os(a,ae,e,t)),E(6)}function $h(e){Yt(Os(Fe(),ae,void 0,Math.min(1,Math.max(0,e))))}function Sh(e){Yt(sh(Fe(),e)),E(6)}function Lh(){const e=Fe(),t=ae!==null?ae:e.reduce((n,r,i)=>r.size>e[n].size?i:n,0),a=lh(e,t);if(a.length===e.length){B(e.length>=xt?"Mehr Gruppen gibt die Leiste nicht her":"Diese Gruppe ist schon ein einzelnes Licht");return}ae=t,Yt(a),E(6)}function Eh(){const e=Fe();if(e.length<2)return;const t=ae!==null?ae:e.length-1;Yt(dh(e,t)),ae!==null&&(ae=Math.min(t,Fe().length-1)),E(6)}function Th(e){Xe(gh(e)),E([8,20,8]),B(`${e.emoji} ${e.label}`)}function Mh(e){Xe(Fs(e)),E([8,20,8]),B(`✓ ${e.name}`)}function Ah(e){Xe({fade_steps:Math.round(Math.min(600,Math.max(10,e)))})}function Ch(e){Se=Ie.some(t=>t.id===e)?e:"",be()}function zh(e){const t=W[e],a=!!(t&&t.on!==!1);Xe({on:!a},e),E(8)}function _h(e=Math.random){const t=2+Math.floor(e()*3),a=new Set;for(;a.size<t-1;)a.add(1+Math.floor(e()*(ge-1)));const n=[0,...[...a].sort((r,i)=>r-i),ge];return n.slice(0,-1).map((r,i)=>({pos:Math.round(e()*29)/29,w:Math.round((js+(e()-.5)*.4)*100)/100,size:n[i+1]-r}))}function Dh(){Xe({on:!0,fade_steps:40,groups:_h()}),E([6,20,6])}function Ih(e,t,a=Date.now()){const n=(t&&Array.isArray(t.groups)&&t.groups.length?t.groups:wt(0,1)).map(o=>({pos:Number(o.pos)||0,w:Number(o.w)||0,size:Math.max(1,Math.round(Number(o.size)||1))})),r=[];let i=0;for(const o of n.slice(0,-1))i+=o.size,i>0&&i<ge&&r.push(i);return{id:a.toString(36)+"-"+Math.random().toString(36).slice(2,8),updated:a,name:e,groups:n,boundaries:r,groupPositions:n.map(o=>o.pos),groupWLevels:n.map(o=>o.w),brightness:t&&typeof t.brightness=="number"?t.brightness:.6,fadeSteps:t&&typeof t.fade_steps=="number"?t.fade_steps:60,on:!(t&&t.on===!1)}}function Nh(e){const t=String(e||"").trim().slice(0,32);if(!t)return B("Der Szene fehlt ein Name"),!1;if(!G||!G.connected)return B("Keine Verbindung zu den Lampen"),!1;if(!yr)return B("Szenen werden noch geladen — gleich nochmal"),!1;const a=Ih(t,{...Js()||{},groups:Fe()}),n=$t.filter(r=>r.name===t&&r.id).map(r=>r.id);Kt=[...Kt,...n].slice(-50),St=[...St.filter(r=>r.name!==t),a],$t=St.filter(r=>r.name);try{G.publish(wr(),JSON.stringify({v:1,from:"gacha_app",scenes:St,deleted:Kt}),{retain:!0,qos:1})}catch{return B("Szene konnte nicht gesichert werden"),!1}return E([8,20,8]),B(`✓ „${t}“ gesichert — auch auf der grossen Seite`),be(),!0}let Qe=[],qe={};function Ra(){return(Se?[Se]:Ie.map(t=>t.id)).filter(t=>vr(t))}function Xs(e){return e.map(t=>(Ie.find(a=>a.id===t)||{}).owner||t).join(" + ")}function Ph(e=Ra()){const t=Array.isArray(e)?e:[e];if(!t.length)return B("Gerade ist keine Lampe erreichbar"),!1;const a=t.filter(n=>W[n]&&W[n].groups);if(!a.length)return le({nudge:!0}),B("Die Lampen melden sich noch — gleich nochmal"),!1;for(const n of Qe)clearTimeout(n);Qe=[],se=Date.now()+5e3,qe={};for(const n of a){const r=W[n]&&W[n].groups?{...W[n]}:null;r&&(qe[n]=r);for(const i of uh(r))Qe.push(setTimeout(()=>le({...i.payload,target:n}),i.at))}return Qe.push(setTimeout(()=>{Qe=[],qe={}},4400)),E([12,40,12,40,12]),B(a.length>1?"👋 Beide Lampen winken":`👋 ${Xs(a)}s Lampe winkt`),!0}const Qs=14,el=110;function jh(e,t){const a=(Array.isArray(e)?e:[]).map(s=>Math.max(0,Number(s)||0)).slice(0,Qs),n=[],r={on:!0,brightness:1,fade_steps:1},i={brightness:.06,fade_steps:1};t&&t.groups&&(r.groups=t.groups);for(const s of a)n.push({at:s,payload:r}),n.push({at:s+el,payload:i});const o=(a.length?a[a.length-1]:0)+el+700;return t&&t.groups?(n.push({at:o,payload:{on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}}),t.on===!1&&n.push({at:o+1200,payload:{on:!1}})):n.push({at:o,payload:{brightness:.6,fade_steps:30}}),n}let et=[];function Bh(e,t=Ra()){const a=Array.isArray(t)?t:[t];if(!e||!e.length)return!1;if(!a.length)return B("Gerade ist keine Lampe erreichbar"),!1;for(const r of et)clearTimeout(r);et=[];let n=0;qe={};for(const r of a){const i=W[r]&&W[r].groups?{...W[r]}:null;i&&(qe[r]=i);const o=jh(e,i);n=Math.max(n,o[o.length-1].at);for(const s of o)et.push(setTimeout(()=>le({...s.payload,target:r}),s.at))}return et.push(setTimeout(()=>{et=[],qe={}},n+100)),se=Date.now()+n+500,E(e.map(()=>18)),B(`🥁 ${e.length} ${e.length===1?"Schlag":"Schläge"} unterwegs — ${a.length>1?"beide Lampen":Xs(a)+"s Lampe"}`),!0}const tl=1e3;function Oh(){return[{at:0,payload:{on:!0,brightness:1,fade_steps:4}},{at:180,payload:{brightness:.3,fade_steps:6}},{at:320,payload:{brightness:.85,fade_steps:4}},{at:520,payload:{brightness:.22,fade_steps:10}}]}let We=null,Vt=[],Lt=null;function Fh(){if(We)return!1;if(!G||!G.connected)return B("Keine Verbindung zu den Lampen"),!1;Lt={};for(const t of Ie)W[t.id]&&W[t.id].groups&&(Lt[t.id]={...W[t.id]});const e=()=>{se=Date.now()+tl+lt;for(const t of Oh())Vt.push(setTimeout(()=>le(t.payload),t.at))};return e(),We=setInterval(e,tl),E([20,120,20]),$&&$.classList.add("is-pulsing"),!0}function Lr(){if(We){clearInterval(We),We=null;for(const e of Vt)clearTimeout(e);Vt=[];for(const e of Ie){const t=Lt&&Lt[e.id];t&&(le({target:e.id,on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}),t.on===!1&&setTimeout(()=>le({target:e.id,on:!1}),1500))}Lt=null,se=Date.now()+2500,$&&$.classList.remove("is-pulsing")}}const qh={pos:1/29,w:.12},Wh=.16,Rh=.55,Er=[220,720];function Uh(e,t=Math.random){const a=t()<.08333333333333333,n=(t()-.5)*.16-(a?.18:0),r=(.36-e)*.25,i=Math.min(Rh,Math.max(Wh,e+n+r));return{brightness:Math.round(i*1e3)/1e3,fade_steps:a?8:18+Math.round(t()*26)}}function Hh(e=Math.random){return Math.round(Er[0]+e()*(Er[1]-Er[0]))}function al(e){const t={};for(const a of e)W[a]&&W[a].groups&&(t[a]={...W[a]});return t}function Tr(e,t){for(const a of t){const n=e[a];n&&(le({target:a,on:!0,groups:n.groups,brightness:n.brightness,fade_steps:n.fade_steps}),n.on===!1&&setTimeout(()=>le({target:a,on:!1}),1500))}se=Date.now()+2500}let ve=null;function Gh(e=Ra()){if(ve)return!1;if(!G||!G.connected)return B("Keine Verbindung zu den Lampen"),!1;Ar();const t=e.length?e:Ie.map(a=>a.id);ve={timers:{},level:{},snap:al(t),boards:t};for(const a of t){ve.level[a]=.36,le({target:a,on:!0,fade_steps:30,brightness:.36,groups:[{...qh,size:ge}]});const n=()=>{if(!ve)return;const r=Uh(ve.level[a]);ve.level[a]=r.brightness,se=Date.now()+1200,le({target:a,brightness:r.brightness,fade_steps:r.fade_steps}),ve.timers[a]=setTimeout(n,Hh())};ve.timers[a]=setTimeout(n,600+Math.random()*300)}return se=Date.now()+1200,E([10,40,10]),$&&$.classList.add("is-flickering"),be(),!0}function Mr({restore:e=!0}={}){if(!ve)return;const t=ve;ve=null;for(const a of Object.keys(t.timers))clearTimeout(t.timers[a]);e&&Tr(t.snap,t.boards),$&&$.classList.remove("is-flickering"),be()}function Kh(){ve?Mr():Gh()}const Ua=500,Yh=1/20,Vh=30;function nl(e=0){const t=[];for(let a=0;a<ge;a++){const n=((a/ge+e)%1+1)%1;t.push({pos:Math.round(n*1e3)/1e3,w:0,size:1})}return t}let me=null;function Jh(e=Ra()){if(me)return!1;if(!G||!G.connected)return B("Keine Verbindung zu den Lampen"),!1;Mr();const t=e.length?e:Ie.map(n=>n.id);me={timer:null,offset:0,snap:al(t),boards:t};const a=()=>{if(!me)return;me.offset=(me.offset+Yh)%1,se=Date.now()+Ua;const n=nl(me.offset);for(const r of me.boards)le({target:r,on:!0,fade_steps:Vh,groups:n});me.timer=setTimeout(a,Ua)};for(const n of t)le({target:n,on:!0,fade_steps:40,groups:nl(0)});return se=Date.now()+Ua,me.timer=setTimeout(a,Ua),E([8,30,8,30,8]),$&&$.classList.add("is-rainbow"),be(),!0}function Ar({restore:e=!0}={}){if(!me)return;const t=me;me=null,clearTimeout(t.timer),e&&Tr(t.snap,t.boards),$&&$.classList.remove("is-rainbow"),be()}function Zh(){me?Ar():Jh()}function Xh(e){return!!e&&typeof e=="object"&&e.type!=="sunset"}function Qh(e){return(Array.isArray(e)?e:[]).filter(t=>!Xh(t))}function ef(e,{quiet:t=!1}={}){if(!G||!G.connected)return t||B("Keine Verbindung zu den Lampen"),!1;try{G.publish(xr(),JSON.stringify(e),{retain:!0,qos:1}),le({set_alarms:e})}catch{return!1}return qa=e,!0}function Cr(e,t){let a=0,n=null,r;return i=>{r=i;const o=t-(Date.now()-a);clearTimeout(n),o<=0?(a=Date.now(),e(r)):n=setTimeout(()=>{a=Date.now(),e(r)},o)}}function Ha(e){if(!e)return;const t=Number(e.min)||0,a=Number(e.max)||100,n=(Number(e.value)-t)/(a-t||1)*100;e.style.setProperty("--ag-fill",`${Math.max(0,Math.min(100,n))}%`)}let rl=!1;function zr(){be(),tf(),Hs().catch(()=>{}),bh()}function tf(){if(rl||!$)return;rl=!0;const e=c("[data-ag-licht-power]");e&&e.addEventListener("click",()=>vh(!Vs()));const t=c("[data-ag-panel-licht]");t&&t.addEventListener("input",D=>{D.target&&D.target.type==="range"&&Ha(D.target)});const a=c("[data-ag-licht-brightness]");if(a){const D=Cr(N=>kh(N),140);a.addEventListener("input",()=>{se=Date.now()+lt,D(Number(a.value)/100)})}const n=c("[data-ag-licht-palette]");if(n){n.style.background=oh();const D=V=>{const Ee=n.getBoundingClientRect();if(!Ee.width)return;const _t=(V.clientX??(V.touches&&V.touches[0]?V.touches[0].clientX:0))-Ee.left;Sr(Math.min(1,Math.max(0,_t/Ee.width)))};let N=!1,X=0;n.addEventListener("pointerdown",V=>{N=!0;try{n.setPointerCapture(V.pointerId)}catch{}D(V),X=Date.now()}),n.addEventListener("pointermove",V=>{!N||Date.now()-X<110||(X=Date.now(),D(V))});const re=V=>{N&&V&&V.type==="pointerup"&&D(V),N=!1};n.addEventListener("pointerup",re),n.addEventListener("pointercancel",re),n.addEventListener("keydown",V=>{const Ee=Number(n.dataset.pos||0);V.key==="ArrowRight"&&(V.preventDefault(),Sr(Math.min(1,Ee+1/29))),V.key==="ArrowLeft"&&(V.preventDefault(),Sr(Math.max(0,Ee-1/29)))})}const r=c("[data-ag-licht-moods]");if(r){r.innerHTML="";for(const D of ch){const N=document.createElement("button");N.type="button",N.className="ag-licht-mood",N.dataset.mood=D.id;const[X,re,V]=Ba(D.groups[0]);N.style.setProperty("--ag-mood",`rgb(${X},${re},${V})`),N.innerHTML=`<span class="ag-licht-mood-dot" aria-hidden="true"></span><span>${D.emoji} ${D.label}</span>`,N.addEventListener("click",()=>Th(D)),r.appendChild(N)}}const i=c("[data-ag-licht-scene-list]");i&&i.addEventListener("click",D=>{const N=D.target.closest("[data-scene]");if(!N)return;const X=$t.find(re=>re.id===N.dataset.scene);X&&Mh(X)});const o=c("[data-ag-licht-wink]");o&&o.addEventListener("click",()=>Ph());const s=c("[data-ag-licht-flicker]");s&&s.addEventListener("click",()=>Kh());const l=c("[data-ag-licht-rainbow]");l&&l.addEventListener("click",()=>Zh());const d=c("[data-ag-licht-target]");d&&d.addEventListener("click",D=>{const N=D.target.closest("[data-target]");N&&(Ch(N.dataset.target),E(6))});const u=c("[data-ag-licht-lamps]");if(u){let D=null,N=!1,X=null;const re=V=>{clearTimeout(D),D=null,N?(Lr(),N=!1):X&&Be()&&zh(X),X=null};u.addEventListener("pointerdown",V=>{const Ee=V.target.closest("[data-lamp]");if(!(!Ee||!Be())){V.preventDefault(),X=Ee.dataset.lamp,N=!1;try{Ee.setPointerCapture(V.pointerId)}catch{}D=setTimeout(()=>{N=Fh()},450)}}),u.addEventListener("pointerup",re),u.addEventListener("pointercancel",()=>{clearTimeout(D),D=null,N&&(Lr(),N=!1),X=null})}const g=c("[data-ag-licht-fade]"),m=Cr(D=>Ah(D),180);g&&g.addEventListener("input",()=>{se=Date.now()+lt;const D=c("[data-ag-licht-fade-val]");D&&(D.textContent=`${(Number(g.value)/60).toFixed(1).replace(".",",")} s`),m(Number(g.value))});const x=c("[data-ag-licht-strip]");x&&x.addEventListener("click",D=>{if(!Be())return;const N=D.target.closest("[data-cut]");if(N){Sh(Number(N.dataset.cut));return}const X=D.target.closest("[data-led]");X&&Zs(Bs(Fe(),Number(X.dataset.led)))});const b=c("[data-ag-licht-groups]");b&&b.addEventListener("click",D=>{const N=D.target.closest("button");!N||!Be()||(N.dataset.group!==void 0?(Zs(N.dataset.group==="all"?null:Number(N.dataset.group)),E(4)):N.dataset.split!==void 0?Lh():N.dataset.merge!==void 0&&Eh())});const f=c("[data-ag-licht-white]"),k=Cr(D=>$h(D),140);f&&f.addEventListener("input",()=>{se=Date.now()+lt,k(Number(f.value)/100)});const z=c("[data-ag-licht-random]");z&&z.addEventListener("click",Dh);const I=c("[data-ag-licht-morse-open]"),y=c("[data-ag-morse]"),w=c("[data-ag-morse-pad]"),S=c("[data-ag-morse-dots]");let T=[],M=0,v=null;const O=()=>{T=[],M=0,S&&(S.innerHTML="")};I&&y&&I.addEventListener("click",()=>{y.hidden=!y.hidden,O(),y.hidden||y.scrollIntoView({behavior:"smooth",block:"nearest"})}),w&&w.addEventListener("pointerdown",D=>{D.preventDefault();const N=performance.now();if(T.length||(M=N),T.length<Qs&&T.push(Math.round(N-M)),E(14),w.classList.add("is-hit"),setTimeout(()=>w.classList.remove("is-hit"),120),S){const X=document.createElement("i");S.appendChild(X)}clearTimeout(v),v=setTimeout(()=>{const X=Bh(T);O(),X&&y&&(y.hidden=!0)},1600)});const ee=c("[data-ag-licht-scene-save]"),F=c("[data-ag-licht-scene-name]");if(ee&&F){const D=()=>{Nh(F.value)&&(F.value="")};ee.addEventListener("click",D),F.addEventListener("keydown",N=>{N.key==="Enter"&&(N.preventDefault(),D())})}const de=c("[data-ag-licht-conn]");de&&de.addEventListener("click",()=>{Le!=="connected"&&(Gs(),zr())}),document.addEventListener("visibilitychange",()=>{const D=c("[data-ag-panel-licht]");if(document.visibilityState==="hidden"){(G||Je)&&Gs();return}D&&!D.hidden&&zr()})}function be(){if(!$)return;const e=c("[data-ag-panel-licht]");if(!e||e.hidden)return;const t=c("[data-ag-licht-conn]");if(t){t.dataset.state=Le;const y=Ie.some(S=>vr(S.id)),w=Le==="connected"&&!y&&Fa&&Date.now()-Fa>4e3;t.textContent=Le==="connected"?w?"verbunden · keine Lampe antwortet":"verbunden":Le==="connecting"?"verbinde…":Le==="error"?kt?`keine Verbindung (${kt.slice(0,40)}) · tippen`:"keine Verbindung · tippen":"tippen zum Verbinden"}const a=c("[data-ag-licht-lamps]");if(a){const y=Ie.map(w=>{const S=W[w.id],M=vr(w.id)?S&&S.on===!1?"standby":"on":"offline",v=M==="offline"?"offline":M==="standby"?"aus":"an";return`<button type="button" class="ag-licht-lamp" data-lamp="${w.id}" data-state="${M}" title="${q(w.name)} — tippen schaltet, halten pulsiert"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${q(w.short)}<span class="ag-licht-lamp-sub">${v}</span></button>`}).join("");a.dataset.html!==y&&(a.innerHTML=y,a.dataset.html=y)}const n=Js(),r=xh(),i=c("[data-ag-licht-strip]"),o=Fe();if(ae!==null&&ae>=o.length&&(ae=null),i){const y=new Set(Oa(o)),w=r?n&&typeof n.brightness=="number"?.35+n.brightness*.65:.8:.18,S=[];let T=0;o.forEach((v,O)=>{const[ee,F,de]=Ba(v);for(let D=0;D<v.size;D++,T++)T>0&&S.push(`<b data-cut="${T}" class="${y.has(T)?"is-cut":""}" role="button" aria-label="${y.has(T)?"Gruppen verbinden":"Hier teilen"}"></b>`),S.push(`<i data-led="${T}" class="${O===ae?"is-selected":""}" style="--ag-led:rgb(${ee},${F},${de});opacity:${w}"></i>`)});const M=S.join("");i.dataset.html!==M&&(i.innerHTML=M,i.dataset.html=M),i.classList.toggle("is-off",!r),i.classList.toggle("is-live",Le==="connected")}const s=c("[data-ag-licht-groups]");if(s){const y=[`<button type="button" data-group="all" class="ag-licht-group ${ae===null?"is-active":""}">Alle</button>`];o.forEach((S,T)=>{const[M,v,O]=Ba(S);y.push(`<button type="button" data-group="${T}" class="ag-licht-group ${T===ae?"is-active":""}" title="${S.size} ${S.size===1?"Licht":"Lichter"}"><span class="ag-licht-group-dot" style="background:rgb(${M},${v},${O})"></span>${T+1}</button>`)}),y.push(`<button type="button" data-split class="ag-licht-group ag-licht-group-op" title="Gruppe teilen" ${o.length>=xt?"disabled":""}>+</button>`),y.push(`<button type="button" data-merge class="ag-licht-group ag-licht-group-op" title="Gruppen verbinden" ${o.length<2?"disabled":""}>−</button>`);const w=y.join("");s.dataset.html!==w&&(s.innerHTML=w,s.dataset.html=w);for(const S of s.querySelectorAll("button"))S.disabled=!Be()||S.dataset.split!==void 0&&o.length>=xt||S.dataset.merge!==void 0&&o.length<2}const l=c("[data-ag-licht-power]");l&&(l.setAttribute("aria-pressed",r?"true":"false"),l.classList.toggle("is-on",r),l.textContent=r?"An":"Aus",l.disabled=!Be());const d=c("[data-ag-licht-brightness]");d&&Date.now()>=se&&n&&typeof n.brightness=="number"&&(d.value=String(Math.round(n.brightness*100)),Ha(d)),d&&(d.disabled=!Be());const u=c("[data-ag-licht-palette]"),g=o[ae!==null?ae:0];if(u&&g){const y=Number(g.pos)||0;u.dataset.pos=String(y),u.style.setProperty("--ag-pick",`${(y*100).toFixed(1)}%`),u.setAttribute("aria-valuenow",String(Math.round(y*29))),u.setAttribute("aria-label",ae!==null?`Farbe von Gruppe ${ae+1}`:"Farbe")}const m=c("[data-ag-licht-white]");m&&g&&Date.now()>=se&&(m.value=String(Math.round((Number(g.w)||0)*100)),Ha(m)),m&&(m.disabled=!Be());const x=c("[data-ag-licht-white-label]");x&&(x.textContent=ae!==null?`Weissanteil · Gruppe ${ae+1}`:"Weissanteil");const b=e.querySelector("[data-ag-licht-flicker]");b&&(b.classList.toggle("is-active",!!ve),b.textContent=ve?"🕯️ Flackern aus":"🕯️ Kerzenflackern");const f=e.querySelector("[data-ag-licht-rainbow]");f&&(f.classList.toggle("is-active",!!me),f.textContent=me?"🌈 Regenbogen aus":"🌈 Regenbogen");for(const y of e.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink], [data-ag-licht-flicker], [data-ag-licht-rainbow], [data-ag-licht-morse-open], [data-ag-licht-random], [data-ag-licht-fade], [data-ag-licht-scene-name], [data-ag-licht-scene-save]"))y.disabled=!Be();for(const y of e.querySelectorAll("[data-ag-licht-target] [data-target]")){const w=(y.dataset.target||"")===Se;y.classList.toggle("is-active",w),y.setAttribute("aria-checked",w?"true":"false")}const k=c("[data-ag-licht-fade]");if(k&&Date.now()>=se&&n&&typeof n.fade_steps=="number"){k.value=String(Math.round(n.fade_steps)),Ha(k);const y=c("[data-ag-licht-fade-val]");y&&(y.textContent=`${(n.fade_steps/60).toFixed(1).replace(".",",")} s`)}const z=c("[data-ag-licht-scenes]"),I=c("[data-ag-licht-scene-list]");if(z&&I){z.hidden=!$t.length;const y=$t.slice(0,12).map(w=>{const T=Fs(w).groups.slice(0,5).map(M=>{const[v,O,ee]=Ba(M);return`<i style="background:rgb(${v},${O},${ee})"></i>`}).join("");return`<button type="button" class="ag-licht-scene" data-scene="${q(w.id)}"${Be()?"":" disabled"}><span class="ag-licht-scene-dots" aria-hidden="true">${T}</span><span>${q(w.name)}</span></button>`}).join("");I.dataset.html!==y&&(I.innerHTML=y,I.dataset.html=y)}}function Ga(e){if(p.activeTab==="today"&&e!=="today"&&p.revealed&&p.todaysPull&&!oe())try{wu(p.todaysPull)}catch{}p.activeTab=e,$.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=$.querySelector(".ag-bottomnav-btn.is-active"),r=$.querySelector(".ag-nav-pill");if(r&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,d=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&d.width){const u=d.left-s.left+d.width/2;r.style.width=`${a}px`,r.style.left=`${u-a/2}px`}}for(const o of["today","history","lieblinge","berge","licht"]){const s=c(`[data-ag-panel-${o}]`);if(!s)continue;const l=e===o;l&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!l}e==="history"&&Ae(),e==="licht"&&zr(),e==="lieblinge"&&At(),e==="berge"&&(nr(),qt({loading:!0}),nr(),Bt().catch(()=>{}).then(()=>{qt(),nr()}));const i=c("[data-ag-fab]");i&&(i.hidden=e!=="berge")}function Jt(e,t){const a=c("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function af(){const e=p.wishInbox,t=c("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n=new Date().toISOString(),r={timestamp:n,token:K(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Jt("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){Jt("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Jt("Stups wird gesendet…","pending");const o=JSON.stringify(r);let s=!1;const l=()=>{if(!s){s=!0;try{Nc(n)}catch{}}Jt("Fionn wurde angestupst 🫂","ok"),Promise.resolve().then(()=>st).then(u=>u.flashHugOnLamps()).catch(()=>{}),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},d=()=>{Jt("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(u=>{u&&u.ok?l():d()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l).catch(d)}catch{d()}})}function nf(e){const t=K(),a=p.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const i=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:i,message:i,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function il(e){const t=p.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:K(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),i=o=>{const s=vn();!s||s.week!==e.week||(Si({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),Ct())};i("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o=>{o&&o.ok?i("sent"):i("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>i("sent")).catch(()=>i("failed"))}catch{i("failed")}})}function rf(){var t;const e=vn();!e||e.week!==ra((t=p.theme)==null?void 0:t.timezone)||e.remoteStatus!=="sent"&&il(e)}function ol(e,t,a,n,r,i){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,i);else{const o=Array.isArray(i)?i:[i,i,i,i],[s,l,d,u]=o.map(g=>Math.min(g,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+r-d),e.quadraticCurveTo(t+n,a+r,t+n-d,a+r),e.lineTo(t+u,a+r),e.quadraticCurveTo(t,a+r,t,a+r-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function _r(e,t,a){const n=t.split(" "),r=[];let i="";for(const o of n){const s=i?`${i} ${o}`:o;e.measureText(s).width>a&&i?(r.push(i),i=o):i=s}return i&&r.push(i),r}function of(e){var S,T;const r=document.createElement("canvas"),i=Math.min(window.devicePixelRatio||1,2);r.width=640*i,r.height=340*i,r.style.width="640px",r.style.height="340px";const o=r.getContext("2d");o.scale(i,i);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",d=s?"#1a1000":"#061510",u=o.createLinearGradient(0,0,0,340);u.addColorStop(0,l),u.addColorStop(1,d),o.fillStyle=u,ol(o,0,0,640,340,20),o.fill();const g=s?"#b9782e":"#2f7a4f";o.fillStyle=g,ol(o,0,0,640,5,[20,20,0,0]),o.fill();const m=e.category.label,x=no(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${x} ${m}`,40,62);const b=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const f=o.measureText(b).width;o.fillText(b,600-f,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const k=_r(o,e.outcome.title,640-40*2);let z=108;for(const M of k)o.fillText(M,40,z),z+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const I=_r(o,e.outcome.message,640-40*2);z+=4;for(const M of I){if(z>270)break;o.fillText(M,40,z),z+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const y=((T=(S=p.theme)==null?void 0:S.brand)==null?void 0:T.machineName)||"Affektions-Gacha";o.fillText(y,40,324);const w=document.createElement("a");w.download=`gacha-${e.category.id}-${e.day}.png`,w.href=r.toDataURL("image/png"),w.click()}async function sf(e){var z,I;const r=document.createElement("canvas");r.width=1170,r.height=2532;const i=r.getContext("2d"),o=new Image;o.crossOrigin="anonymous";try{await new Promise((y,w)=>{o.onload=y,o.onerror=w,o.src=e.photo.url})}catch{B("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/o.naturalWidth,2532/o.naturalHeight),l=o.naturalWidth*s,d=o.naturalHeight*s;i.drawImage(o,(1170-l)/2,(2532-d)/2,l,d);const u=i.createLinearGradient(0,2532*.62,0,2532);u.addColorStop(0,"rgba(8,20,14,0)"),u.addColorStop(1,"rgba(8,20,14,.82)"),i.fillStyle=u,i.fillRect(0,2532*.62,1170,2532*.38);const g=e.photo.caption||e.photo.alt||"";i.font="500 56px Boska, Georgia, serif",i.fillStyle="#fffdf2";const m=_r(i,g,1170-96*2).slice(0,3);let x=2276-(m.length-1)*68;for(const y of m)i.fillText(y,96,x),x+=68;i.font="500 34px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,.62)",i.fillText(e.day,96,2356),i.fillStyle="rgba(255,255,255,.35)",i.font="28px Satoshi, Inter, system-ui, sans-serif",i.fillText(((I=(z=p.theme)==null?void 0:z.brand)==null?void 0:I.machineName)||"Affektions-Gacha",96,2406);let b;try{b=await new Promise((y,w)=>r.toBlob(S=>S?y(S):w(new Error("blob")),"image/jpeg",.92))}catch{B("Dieses Foto lässt sich nicht exportieren (CORS).");return}const f=new File([b],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[f]}))try{await navigator.share({files:[f],title:g});return}catch(y){if(y&&y.name==="AbortError")return}const k=document.createElement("a");k.download=f.name,k.href=URL.createObjectURL(b),k.click(),setTimeout(()=>URL.revokeObjectURL(k.href),4e3)}function sl(e){$.style.opacity="1",$.style.background="#0a1410",$.style.minHeight="100vh",$.style.display="flex",$.style.alignItems="center",$.style.justifyContent="center",$.style.padding="24px",$.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${q(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function lf(){const e=c("[data-ag-button-text]");e&&(e.textContent=p.theme.brand.buttonShown)}function df(){return typeof navigator<"u"&&typeof navigator.share=="function"&&typeof navigator.canShare=="function"}function cf(e,t){const a=(String(t||"image/jpeg").split("/")[1]||"jpg").replace("jpeg","jpg");return`gacha-${e.day}.${a}`}function gf(e,t){const a=e&&e.photo;return!a||a.type==="video"||!a.url||!df()?!1:((async()=>{try{const n=await fetch(a.url,{mode:"cors"});if(!n.ok)throw new Error("photo fetch "+n.status);const r=await n.blob(),i=new File([r],cf(e,r.type),{type:r.type||"image/jpeg"});if(!navigator.canShare({files:[i]}))throw new Error("cannot share files");await navigator.share({files:[i],text:qr(e),title:"Mein Gacha-Zug"})}catch(n){if(n&&n.name==="AbortError")return;try{B("Foto hing nicht dran — nur der Text geht raus")}catch{}window.location.href=t}})(),!0)}function Ka(){var x,b,f,k;p.todaysPull||(p.todaysPull=Pg());const e=c("[data-ag-draw]"),t=c("[data-ag-button-text]"),a=p.theme.loadingSteps||["Maschine rattert"];let n=0;$.classList.add("is-revealing"),e.disabled=!0;const r=oe()?Promise.resolve(null):Hn().catch(()=>null);t.textContent=a[n];const i=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((p.theme.revealDelayMs||3200)/a.length))),o=p.theme.revealDelayMs||3200,s=Array.from((c("[data-ag-emoji-orbit]")||{children:[]}).children),l=s.map(z=>parseFloat(z.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let u;function g(z){const I=Math.min((z-d)/o,1),y=1+5*I*I;s.forEach((w,S)=>{w.style.setProperty("--ag-emoji-duration",`${(l[S]/y).toFixed(3)}s`)}),I<1&&(u=requestAnimationFrame(g))}u=requestAnimationFrame(g);const m=((b=(x=p.todaysPull)==null?void 0:x.category)==null?void 0:b.id)==="special"?"special":(k=(f=p.todaysPull)==null?void 0:f.category)==null?void 0:k.tone;window.setTimeout(()=>Mu(m),Math.max(0,o-900)),window.setTimeout(()=>{var M,v,O,ee;window.clearInterval(i),cancelAnimationFrame(u),Au(),Cu(m),s.forEach((F,de)=>{F.style.setProperty("--ag-emoji-duration",`${l[de].toFixed(2)}s`)});const z=H().find(F=>F.day===p.todaysPull.day&&F.token===p.todaysPull.token),I=!!z;if(z&&(!p.todaysPull.promptAnswer&&z.promptAnswer&&(p.todaysPull.promptAnswer=z.promptAnswer),!p.todaysPull.weather&&z.weather&&(p.todaysPull.weather=z.weather)),p.todaysPull.collectToken&&!I&&la(p.todaysPull.collectToken),p.todaysPull.freikarte&&!I&&ki(p.todaysPull.token),!oe()){const F=wo(p.weather);F&&!p.todaysPull.weather&&(p.todaysPull.weather=F)}Tt(p.todaysPull);const y=F=>{const de=p.todaysPull;!F||!de||de.weather||oe()||Cl(de)};r.then(F=>{if(F){y(F);return}window.setTimeout(()=>{Hn().then(y).catch(()=>{})},8e3)}),$.classList.remove("is-revealing"),$.classList.add("is-revealed"),$.classList.add("has-drawn"),e.disabled=!1,t.textContent=p.theme.brand.buttonShown,p.revealed=!0,oe()||Yf(p.todaysPull),p.todaysPull.flaschenpost&&Ct(),Zn(),dr();const w=Ge();Zt(),jf(w),window.setTimeout(()=>{try{c("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const S=(v=(M=p.todaysPull)==null?void 0:M.category)==null?void 0:v.id,T=(ee=(O=p.todaysPull)==null?void 0:O.category)==null?void 0:ee.tone;if(S==="special"){const F=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];$e(130,F),setTimeout(()=>$e(90,F),700),Ea("special")}else if(T==="jackpot"){const F=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];$e(120,F),setTimeout(()=>$e(80,F),650),Ea("jackpot")}else T==="rare"?($e(70),Ea("rare")):Ea(T||"common");oe()||Promise.resolve().then(()=>st).then(F=>F.flashLightsForPull(S==="special"?"special":T)).catch(()=>{}),El[w]?E([30,20,30,20,60]):fg(S==="special"?"special":T),p.activeTab==="history"&&Ae(),rs()},p.theme.revealDelayMs||3200)}function uf(){var Hl,Gl,Kl,Yl,Vl,Jl,Zl,Xl,Ql,ed,td,ad,nd,rd,id,od,sd,ld,dd,cd,gd,ud,pd,hd,fd,md,bd,yd,wd,xd,vd,kd,$d,Sd,Ld,Ed,Td,Md,Ad;let e=null,t=null;const a=c("[data-ag-draw]");a.addEventListener("pointerdown",()=>{t=setTimeout(Wn,3e3)}),a.addEventListener("pointerup",()=>clearTimeout(t)),a.addEventListener("pointerleave",()=>clearTimeout(t)),a.addEventListener("pointercancel",()=>clearTimeout(t));let n=0,r=null;c("[data-ag-main-title]").addEventListener("click",()=>{if(n++,clearTimeout(r),n>=5){n=0,Wn();return}r=setTimeout(()=>{n=0},1800)}),c("[data-ag-draw]").addEventListener("click",()=>{E(12),Ka()}),Tu({onTilt:(h,L)=>{$.style.setProperty("--ag-foil-x",h.toFixed(1)+"%"),$.style.setProperty("--ag-foil-y",L.toFixed(1)+"%")}}),(Hl=c("#ag-btn-rave"))==null||Hl.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Gl=c("#ag-btn-rave"))==null||Gl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Kl=c("#ag-btn-baerlauch"))==null||Kl.addEventListener("click",ir),(Yl=c("#ag-baerlauch-close"))==null||Yl.addEventListener("click",Sp),(Vl=c("#ag-baerlauch-next"))==null||Vl.addEventListener("click",ir),(Jl=c("#ag-btn-baerlauch"))==null||Jl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),ir())}),(Zl=c("#ag-btn-gesprach"))==null||Zl.addEventListener("click",co),(Xl=c("#ag-btn-glossary"))==null||Xl.addEventListener("click",ts),(Ql=c("#ag-btn-glossary"))==null||Ql.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),ts())}),(ed=c("#ag-glossary-close"))==null||ed.addEventListener("click",zp),(td=document.getElementById("ag-glossary-refresh"))==null||td.addEventListener("click",async()=>{const h=document.getElementById("ag-glossary-refresh");h&&(h.disabled=!0,h.textContent="⏳"),E(6);const L=await Qo();it(U.lang),h&&(h.textContent=L>0?`↻${L}`:"↻",setTimeout(()=>{h.textContent="↻",h.disabled=!1},3e3)),L>0&&B(`${L} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(h=>{h.addEventListener("click",()=>{const L=document.getElementById("ag-glossary-search");L&&(L.value=""),it(h.dataset.lang),E(4)})}),(ad=document.getElementById("ag-glossary-search"))==null||ad.addEventListener("input",()=>{it(U.lang)});const i=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");i&&i.addEventListener("click",()=>{var j,Q;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const h=document.getElementById("ag-glossary-form-title");h&&(h.textContent="Neues Wort");const L=document.getElementById("ag-glossary-save-label");L&&(L.textContent="Eintragen");const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent=""),U.audioBlob=null;const _=document.getElementById("ag-glossary-play-preview");_&&(_.hidden=!0),o.hidden=!1,i.hidden=!0,(j=c("[data-ag-sheet-backdrop]"))==null||j.classList.add("is-open"),(Q=document.getElementById("ag-glossary-word-input"))==null||Q.focus(),E(8)}),(nd=document.getElementById("ag-glossary-form-cancel"))==null||nd.addEventListener("click",()=>{var h;if(o&&(o.hidden=!0),i&&(i.hidden=!1),(h=c("[data-ag-sheet-backdrop]"))==null||h.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",U.audioBlob=null,U.recorder&&U.recorder.state!=="inactive")try{U.recorder.stop()}catch{}U.recorder=null,E(6)}),(rd=document.getElementById("ag-glossary-form-save"))==null||rd.addEventListener("click",async()=>{var Q,ie,Te,ye,Re;const h=(((Q=document.getElementById("ag-glossary-word-input"))==null?void 0:Q.value)||"").trim(),L=(((ie=document.getElementById("ag-glossary-meaning-input"))==null?void 0:ie.value)||"").trim(),C=(((Te=document.getElementById("ag-glossary-edit-id"))==null?void 0:Te.value)||"").trim();if(!h){(ye=document.getElementById("ag-glossary-word-input"))==null||ye.focus();return}const _=document.getElementById("ag-glossary-audio-status");let j=null;if(U.audioBlob){_&&(_.textContent="Wird hochgeladen…");const ue=C||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;j=await Mp(U.audioBlob,ue)}if(E([20,20,40]),C){const ue={word:h,meaning:L||null};j!==null&&(ue.audioUrl=j),Ep(C,ue)}else Xo({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:U.lang,word:h,meaning:L||null,audioUrl:j,token:K()});o&&(o.hidden=!0),i&&(i.hidden=!1),(Re=c("[data-ag-sheet-backdrop]"))==null||Re.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",U.audioBlob=null,U.recorder=null,it(U.lang),B("Wort gespeichert ✓")});const s=document.getElementById("ag-glossary-record");s&&s.addEventListener("click",async()=>{if(U.recorder&&U.recorder.state==="recording"){U.recorder.stop();return}try{const h=await navigator.mediaDevices.getUserMedia({audio:!0}),L=[];U.recorder=new MediaRecorder(h),U.recorder.ondataavailable=_=>{_.data.size>0&&L.push(_.data)},U.recorder.onstop=()=>{h.getTracks().forEach(Q=>Q.stop()),U.audioBlob=new Blob(L,{type:U.recorder.mimeType||"audio/webm"});const _=document.getElementById("ag-glossary-audio-status");_&&(_.textContent="✓ Aufnahme bereit");const j=document.getElementById("ag-glossary-play-preview");j&&(j.hidden=!1),s.textContent="🎙 Neu aufnehmen"},U.recorder.start(),s.textContent="⏹ Stop";const C=document.getElementById("ag-glossary-audio-status");C&&(C.textContent="● REC"),E(10)}catch{const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="Mikrofon nicht verfügbar")}}),(id=document.getElementById("ag-glossary-play-preview"))==null||id.addEventListener("click",()=>{if(!U.audioBlob)return;const h=URL.createObjectURL(U.audioBlob),L=new Audio(h);L.onended=()=>URL.revokeObjectURL(h),L.play().catch(()=>{})}),(od=c("#ag-letter-close"))==null||od.addEventListener("click",Rn),(sd=c("#ag-letter-overlay"))==null||sd.addEventListener("click",h=>{h.target===h.currentTarget&&Rn()}),(ld=c("#ag-lightbox-close"))==null||ld.addEventListener("click",()=>{Fr()}),(dd=c("#ag-lightbox"))==null||dd.addEventListener("click",h=>{h.target===h.currentTarget&&Fr()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&(Rn(),Fr())}),(cd=c("#ag-gesprach-close"))==null||cd.addEventListener("click",Vg),(gd=c("#ag-kurs-close"))==null||gd.addEventListener("click",Ru),Hu(c("[data-ag-lights-toggle]")),Xu(c("[data-ag-backup-export]"),c("[data-ag-backup-import]"),c("[data-ag-backup-file]")),(ud=c("#ag-gesprach-next"))==null||ud.addEventListener("click",go),(pd=c("#ag-gesprach-wa"))==null||pd.addEventListener("click",Jg),(hd=c("#ag-btn-gesprach"))==null||hd.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),co())}),(fd=c("#ag-btn-quest"))==null||fd.addEventListener("click",po),(md=c("#ag-quest-close"))==null||md.addEventListener("click",Zg),(bd=c("#ag-btn-quest"))==null||bd.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),po())}),(yd=c("#ag-quest-file"))==null||yd.addEventListener("change",h=>{const L=h.target.files&&h.target.files[0];L&&Xg(L)}),c("[data-ag-copy]").addEventListener("click",async()=>{if(!p.todaysPull)return;E(8);const h=qr(p.todaysPull);try{await navigator.clipboard.writeText(h),c("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{c("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",h)}}),c("[data-ag-save-img]").addEventListener("click",()=>{p.todaysPull&&(E(8),of(p.todaysPull))}),c("[data-ag-send]").addEventListener("click",h=>{p.todaysPull&&(E(8),gf(p.todaysPull,h.currentTarget.href)&&h.preventDefault())}),c("[data-ag-star]").addEventListener("click",()=>{E(8),Dl(p.todaysPull)}),(wd=c("[data-ag-wallpaper]"))==null||wd.addEventListener("click",()=>{!p.todaysPull||!p.todaysPull.photo||(E(8),sf(p.todaysPull))});const l=c("[data-ag-sync-status]");if(l){let h=null;l.addEventListener("click",()=>{l.classList.add("is-open"),clearTimeout(h),h=setTimeout(()=>l.classList.remove("is-open"),2500)})}const d=c("[data-ag-ferien-toggle]"),u=c("[data-ag-ferien-body]");d&&u&&d.addEventListener("click",()=>{const h=u.hidden;u.hidden=!h,d.setAttribute("aria-expanded",String(h)),E(6)}),(xd=c("[data-ag-ferien-add]"))==null||xd.addEventListener("click",()=>{var _,j;const h=(((_=c("[data-ag-ferien-from]"))==null?void 0:_.value)||"").trim(),L=(((j=c("[data-ag-ferien-to]"))==null?void 0:j.value)||h).trim();if(!h){B("Erst ein Datum wählen");return}if(!Hc(h,L)){B("Höchstens 60 Tage am Stück");return}E([12,20,12]),Ur(),Zt()});const g=c("[data-capsule]");if(g){let L=null,C=null,_=!1,j=0;const Q=()=>!$.classList.contains("has-drawn")&&!$.classList.contains("is-revealing")&&!oe(),ie=()=>{clearTimeout(L),clearInterval(C),L=C=null,j=0,$.classList.remove("is-charging","is-charged")};g.addEventListener("pointerdown",ye=>{Q()&&(ye.preventDefault(),_=!1,$.classList.add("is-charging"),C=setInterval(()=>{j++,E(6+j*2)},130),L=setTimeout(()=>{_=!0,$.classList.add("is-charged"),E([20,30,40])},650))});const Te=()=>{const ye=_&&Q();ie(),_=!1,ye&&Ka()};g.addEventListener("pointerup",Te),g.addEventListener("keydown",ye=>{(ye.key==="Enter"||ye.key===" ")&&Q()&&(ye.preventDefault(),E(12),Ka())}),g.addEventListener("pointercancel",()=>{ie(),_=!1}),g.addEventListener("pointerleave",()=>{ie(),_=!1})}Nu(c("[data-ag-knob]"),{drawable:()=>!$.classList.contains("has-drawn")&&!$.classList.contains("is-revealing")&&!oe(),onFire:()=>Ka(),onHold:Wn,onTick:(h,L)=>{L||($.classList.add("is-charging"),clearTimeout(e),e=setTimeout(()=>$.classList.remove("is-charging"),600),h%4===0&&Ta())}});const m=c("[data-ag-candle]");m==null||m.addEventListener("click",()=>{kg()?qn():$g({onChange:h=>m.classList.toggle("is-lit",h)})}),ep(c("[data-ag-result]"),()=>{const h=p.todaysPull;!h||oe()||(zl(h)||Dl(h),tp(c("[data-ag-result]")),B("Als Liebling gespeichert ⭐"))}),(vd=c("[data-ag-freikarte-redeem]"))==null||vd.addEventListener("click",()=>{const h=p.todaysPull;if(!h)return;const L=h.category.tone;if(L!=="quiet"&&L!=="cursed"||!wc(h.token))return;const C=Ge(),_=jg(h.day,C);xc(h.token,h.day,{categoryId:_.category.id,outcomeTitle:_.outcome.title}),p.todaysPull={...h,category:_.category,outcome:_.outcome,photo:_.photo,collectToken:_.collectToken,voucher:_.voucher,freikarte:_.freikarte,unlockTime:null,promptAnswer:null};const j=H(),Q=j.findIndex(ie=>ie.day===h.day&&ie.token===h.token);Q!==-1&&(j[Q]={...j[Q],categoryId:_.category.id,categoryLabel:_.category.label,tone:_.category.tone,title:_.outcome.title,message:_.outcome.message,link:_.outcome.link||null,unlockTime:null,promptAnswer:null,photo:_.photo?{url:_.photo.url,alt:_.photo.alt||"",caption:(_.photo.caption||"").trim(),type:_.photo.type==="video"?"video":"image"}:null,voucher:_.voucher||!1},ze(j)),p.todaysPull.collectToken&&la(p.todaysPull.collectToken),p.todaysPull.freikarte&&ki(p.todaysPull.token),we(),Tt(p.todaysPull),p.activeTab==="history"&&Ae(),$e(50),B("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),E([20,20,40])});const x=c("[data-ag-streak-restore]");x&&x.addEventListener("click",()=>{if(!Bi()){jr();return}const h=Cn(),L=ba(),C=ma()>0&&L-ma()<=0,_=L-1,j=C?`🎂 Geschenk: ${ke(h)} retten? Nochmal tippen`:`${ke(h)} retten${_>0?` (${_} übrig)`:", der letzte"}? Nochmal tippen`;if(!rt(x,j))return;x.disabled=!0;const Q=Qc();Ae(),Zt(),Q&&($e(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),E([30,20,30,20,60])),jr(),x.disabled=!1});const b=c("[data-ag-sync-btn]");b&&b.addEventListener("click",async()=>{b.textContent="⏳",b.disabled=!0;const h=await Bt();Ae(),b.textContent=h===!1||h<0?"✗":`✓${h}`,setTimeout(()=>{b.textContent="☁",b.disabled=!1},3e3)}),$.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(h=>{h.addEventListener("click",()=>{E(5),Af(h.dataset.agFilter)})}),$.querySelectorAll("[data-ag-tab]").forEach(h=>{h.addEventListener("click",()=>{E(6),Ga(h.dataset.agTab)})}),function(){const L=$.querySelector(".ag-bottomnav"),C=window.visualViewport;if(!L||!C)return;const _=()=>{const j=C.height<window.innerHeight*.72;L.classList.toggle("is-keyboard",j);const Q=Math.max(0,Math.round(window.innerHeight-(C.offsetTop+C.height)));L.style.setProperty("--ag-nav-shift",`${j?0:Q}px`)};C.addEventListener("resize",_),C.addEventListener("scroll",_),window.addEventListener("orientationchange",()=>setTimeout(_,350)),document.addEventListener("focusout",()=>setTimeout(_,250)),window.addEventListener("pageshow",_),_()}();const f=$.querySelector(".ag-bottomnav");if(f){const h=f.querySelector(".ag-nav-pill"),L=[...f.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let C=null;f.addEventListener("pointerdown",j=>{const Q=f.getBoundingClientRect(),ie=parseFloat(h==null?void 0:h.style.width)||54;C={id:j.pointerId,startX:j.clientX-Q.left,pillStartCentre:(parseFloat(h==null?void 0:h.style.left)||0)+ie/2,pillWidth:ie,moved:!1,suppress:!1,captured:!1}}),f.addEventListener("pointermove",j=>{if(!C||j.pointerId!==C.id)return;const Q=f.getBoundingClientRect(),ie=j.clientX-Q.left-C.startX;if(!C.moved&&Math.abs(ie)<6||(C.captured||(f.setPointerCapture(j.pointerId),C.captured=!0),C.moved=!0,C.suppress=!0,!h))return;h.style.transition="none";const Te=f.getBoundingClientRect(),ye=C.pillStartCentre+ie,Re=C.pillWidth/2;let ue=ye-Re;ue<0?ue=ue*.25:ue+C.pillWidth>Te.width&&(ue=Te.width-C.pillWidth+(ue+C.pillWidth-Te.width)*.25),h.style.left=`${ue}px`});const _=j=>{if(!C||j.pointerId!==C.id)return;const Q=C.moved,ie=C.suppress;if(C=null,h&&(h.style.transition=""),!Q)return;const Te=f.getBoundingClientRect(),ye=j.clientX-Te.left;let Re=L[0],ue=1/0;if(L.forEach(dt=>{const at=dt.getBoundingClientRect(),tn=at.left-Te.left+at.width/2,aa=Math.abs(ye-tn);aa<ue&&(ue=aa,Re=dt)}),E(6),Ga(Re.dataset.agTab),ie){const dt=at=>{at.stopImmediatePropagation(),at.preventDefault()};f.addEventListener("click",dt,{capture:!0,once:!0})}};f.addEventListener("pointerup",_),f.addEventListener("pointercancel",j=>{!C||j.pointerId!==C.id||(C=null,h&&(h.style.transition=""),Ga(p.activeTab))})}$.addEventListener("ag-synced",()=>{try{if(Et(),p.todaysPull&&p.revealed&&Ll(p.todaysPull),Ct(),p._newPing){p._newPing=!1;const h=c("[data-ag-ping-banner]");h&&(h.hidden=!1);try{E([10,40,10])}catch{}}}catch{}}),(kd=c("#ag-btn-skincare"))==null||kd.addEventListener("click",Ho),($d=c("#ag-btn-skincare"))==null||$d.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Ho())}),(Sd=c("#ag-skincare-close"))==null||Sd.addEventListener("click",op),(Ld=c("#ag-btn-stimmung"))==null||Ld.addEventListener("click",Zi),(Ed=c("#ag-btn-stimmung"))==null||Ed.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Zi())}),(Td=c("#ag-stimmung-close"))==null||Td.addEventListener("click",ug),pg();const k=c("[data-ag-berge-add]"),z=c("[data-ag-berge-form]"),I=c("[data-ag-berge-cancel]"),y=c("[data-ag-berge-save]");k&&k.addEventListener("click",()=>{var L,C;E(8);const h=c("[data-ag-berge-date]");h&&!h.value&&(h.value=J(((L=p.theme)==null?void 0:L.timezone)||"Europe/Zurich")),z.hidden=!1,k.hidden=!0,(C=c("[data-ag-sheet-backdrop]"))==null||C.classList.add("is-open"),c("[data-ag-berge-name]").focus()}),I&&I.addEventListener("click",()=>{var j;E(6),z.hidden=!0,k.hidden=!1,(j=c("[data-ag-sheet-backdrop]"))==null||j.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Q=>{const ie=c(Q);ie&&(ie.value="")});const h=c("[data-ag-loc-search]");h&&(h.value="");const L=c("[data-ag-loc-dropdown]");L&&(L.hidden=!0,L.innerHTML="");const C=c("[data-ag-berge-form-title]");C&&(C.textContent="Neuer Gipfeleintrag");const _=c("[data-ag-berge-save] span:last-child");_&&(_.textContent="Eintragen")}),y&&y.addEventListener("click",()=>{var Cd,zd,_d,Dd,Id,Nd,Pd,jd,Bd,Od,Fd,qd,Wd,Rd;const h=(((Cd=c("[data-ag-berge-name]"))==null?void 0:Cd.value)||"").trim(),L=parseFloat(((zd=c("[data-ag-berge-dist]"))==null?void 0:zd.value)||""),C=parseInt(((_d=c("[data-ag-berge-gain]"))==null?void 0:_d.value)||"",10),_=((Dd=c("[data-ag-berge-date]"))==null?void 0:Dd.value)||J(((Id=p.theme)==null?void 0:Id.timezone)||"Europe/Zurich"),j=(((Nd=c("[data-ag-berge-url]"))==null?void 0:Nd.value)||"").trim(),Q=(((Pd=c("[data-ag-berge-cover]"))==null?void 0:Pd.value)||"").trim(),ie=(((jd=c("[data-ag-berge-notes]"))==null?void 0:jd.value)||"").trim(),Te=(((Bd=c("[data-ag-berge-edit-id]"))==null?void 0:Bd.value)||"").trim(),ye=(((Od=c("[data-ag-berge-lat]"))==null?void 0:Od.value)||"").trim()||null,Re=(((Fd=c("[data-ag-berge-lng]"))==null?void 0:Fd.value)||"").trim()||null,ue=(((qd=c("[data-ag-berge-loc-label]"))==null?void 0:qd.value)||"").trim()||null;if(!h){(Wd=c("[data-ag-berge-name]"))==null||Wd.focus();return}E([20,20,40]);const dt={name:h,elevation:null,distance:isNaN(L)?null:L,elevGain:isNaN(C)?null:C,date:_,activityUrl:j||null,cover:Q||null,notes:ie||null,lat:ye,lng:Re,locLabel:ue};Te?hp(Te,dt):up({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...dt,token:K()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(fm=>{const Ud=c(fm);Ud&&(Ud.value="")});const at=c("[data-ag-loc-search]");at&&(at.value="");const tn=c("[data-ag-berge-form-title]");tn&&(tn.textContent="Neuer Gipfeleintrag");const aa=c("[data-ag-berge-save] span:last-child");aa&&(aa.textContent="Eintragen"),z.hidden=!0,k.hidden=!1,(Rd=c("[data-ag-sheet-backdrop]"))==null||Rd.classList.remove("is-open"),qt(),B("Gipfel gespeichert ✓")}),bp();const w=c("[data-ag-ping-dismiss]");w&&w.addEventListener("click",()=>{const h=c("[data-ag-ping-banner]");h&&(h.hidden=!0)});const S=c("[data-ag-hug-send]");S&&S.addEventListener("click",()=>{E([20,30,20]);try{af()}catch{}});const T=c("[data-ag-post-open]"),M=c("[data-ag-post-form]"),v=c("[data-ag-post-idle]");let O="30";if(T&&M&&v){T.addEventListener("click",()=>{E(8),v.hidden=!0,M.hidden=!1;const h=c("[data-ag-post-input]");h&&h.focus()}),(Md=c("[data-ag-post-cancel]"))==null||Md.addEventListener("click",()=>{M.hidden=!0,v.hidden=!1});for(const h of M.querySelectorAll("[data-ag-post-mode]"))h.addEventListener("click",()=>{O=h.dataset.agPostMode;for(const L of M.querySelectorAll("[data-ag-post-mode]")){const C=L===h;L.classList.toggle("is-active",C),L.setAttribute("aria-checked",C?"true":"false")}E(6)});(Ad=c("[data-ag-post-seal]"))==null||Ad.addEventListener("click",()=>{const h=c("[data-ag-post-input]"),L=(h&&h.value||"").trim();if(!L){h&&h.focus();return}const C=J(p.theme.timezone);if(Fc(L,O,C)){h&&(h.value=""),M.hidden=!0,v.hidden=!1,E([20,30,40]);try{$e(40,["#8fcf9e","#e0a75d","#fff"])}catch{}B(O==="30"?"🍾 Versiegelt. In dreissig Tagen kommt sie zurück.":"🍾 Versiegelt. Die Maschine gibt sie dir zurück, wann sie will."),Ct(),we()}})}const ee=c("[data-ag-wish-open]"),F=c("[data-ag-wish-cancel]"),de=c("[data-ag-wish-submit]");ee&&ee.addEventListener("click",()=>{E(8),c("[data-ag-wish-idle]").hidden=!0,c("[data-ag-wish-form]").hidden=!1;const h=c("[data-ag-wish-input]");h&&window.setTimeout(()=>h.focus(),60)}),F&&F.addEventListener("click",()=>{E(6),c("[data-ag-wish-form]").hidden=!0,c("[data-ag-wish-idle]").hidden=!1}),de&&de.addEventListener("click",()=>{var _;const h=c("[data-ag-wish-input]"),L=((h==null?void 0:h.value)||"").trim();if(!L)return;E([20,20,40]);const C={week:ra((_=p.theme)==null?void 0:_.timezone),text:L,submittedAt:Date.now(),remoteStatus:"idle"};Si(C),Ct();try{il(C)}catch{}});const D=c("[data-ag-notif-enable]"),N=c("[data-ag-notif-dismiss]");D&&D.addEventListener("click",()=>{E(10),Np()}),N&&N.addEventListener("click",()=>{E(6);try{window.localStorage.setItem(ct,"dismissed")}catch{}const h=c("[data-ag-notif-card]");h&&(h.hidden=!0)});const X=c("[data-ag-sheet-backdrop]");X&&X.addEventListener("click",()=>{E(6);const h=c("[data-ag-berge-form]"),L=c("[data-ag-berge-add]");h&&!h.hidden&&(h.hidden=!0,L&&(L.hidden=!1));const C=document.getElementById("ag-glossary-form"),_=document.getElementById("ag-glossary-add");C&&!C.hidden&&(C.hidden=!0,_&&(_.hidden=!1)),X.classList.remove("is-open")});const re=c("[data-ag-fab]");re&&re.addEventListener("click",()=>{E(8);const h=c("[data-ag-berge-add]");h&&!h.hidden&&h.click()});const V="input, textarea, select, canvas, [role=slider], [data-ag-noswipe], .leaflet-container, .ag-licht-palette, .ag-licht-strip, .ag-licht-lamps, [data-ag-morse-pad]",Ee=h=>{for(let L=h;L&&L!==document.body;L=L.parentElement)if(L.scrollWidth>L.clientWidth+2){const C=getComputedStyle(L).overflowX;if(C==="auto"||C==="scroll")return!0}return!1},_t=["today","history","lieblinge","berge","licht"];let Wl=0,Rl=0,Hr=!1;const Ul=c(".ag-content")||$;Ul.addEventListener("touchstart",h=>{Wl=h.touches[0].clientX,Rl=h.touches[0].clientY;const L=h.target instanceof Element?h.target:null;Hr=h.touches.length>1||!!(L&&(L.closest(V)||Ee(L)))},{passive:!0}),Ul.addEventListener("touchend",h=>{if(Hr){Hr=!1;return}const L=h.changedTouches[0].clientX-Wl,C=Math.abs(h.changedTouches[0].clientY-Rl);if(Math.abs(L)>52&&C<44){const _=_t.indexOf(p.activeTab);if(_===-1)return;const j=L<0?Math.min(_+1,_t.length-1):Math.max(_-1,0);j!==_&&(E(6),Ga(_t[j]))}},{passive:!0});const ea=c("[data-ag-ptr]");let ta=0,en=!1;document.addEventListener("touchstart",h=>{const L=h.target instanceof Element?h.target:null;if(L&&L.closest(V)){ta=0;return}window.scrollY===0&&(ta=h.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",h=>{if(!ta)return;h.touches[0].clientY-ta>64&&!en&&ea&&(en=!0,ea.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{if(en&&ea){ea.classList.add("is-loading");const h=await Bt();p.activeTab==="berge"&&qt(),p.activeTab==="history"&&Ae(),ea.classList.remove("is-visible","is-loading"),B(h===!1||h<0?"Keine Verbindung ✗":"Aktualisiert ✓")}ta=0,en=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const h=document.querySelector(".ag-widget");h==null||h.classList.toggle("ag-paused",document.hidden)})}const ll="affektions-gacha:aufkleber:v1",pf=.04,hf=.96;function dl(){try{const e=window.localStorage.getItem(ll),t=e?JSON.parse(e):{};return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function ff(e){try{window.localStorage.setItem(ll,JSON.stringify(e))}catch{}}const Ya=e=>Math.min(hf,Math.max(pf,Number(e)||0));function Va(e){return{x:.86,y:.1,rot:Math.round((pe(`aufkleber:${e}`)-.5)*28)}}function mf(e){const t=dl()[e];return t&&typeof t=="object"?t:null}function Dr(e,{emoji:t,x:a,y:n,rot:r}){const i=dl(),o=i[e]||{},s={emoji:t||o.emoji||"",x:Ya(a??o.x??Va(e).x),y:Ya(n??o.y??Va(e).y),rot:Number.isFinite(r)?r:Number.isFinite(o.rot)?o.rot:Va(e).rot};i[e]=s;const l=Object.keys(i).sort();for(;l.length>400;)delete i[l.shift()];return ff(i),s}function cl(e,t){e.style.left=`${(t.x*100).toFixed(2)}%`,e.style.top=`${(t.y*100).toFixed(2)}%`,e.style.setProperty("--ag-aufkleber-rot",`${t.rot}deg`)}function gl(e,t,a,{peelFrom:n=null}={}){if(!e||(e.innerHTML="",!a))return;const r=mf(t)||Dr(t,{emoji:a,...Va(t)});r.emoji!==a&&Dr(t,{emoji:a});const i=document.createElement("span");if(i.className="ag-aufkleber",i.textContent=a,i.title="Aufkleber — zieh mich, wohin du willst",cl(i,r),e.appendChild(i),bf(i,e,t),n){const o=n.getBoundingClientRect(),s=i.getBoundingClientRect();if(o.width&&s.width){const l=o.left+o.width/2-(s.left+s.width/2),d=o.top+o.height/2-(s.top+s.height/2);i.animate([{transform:`translate(calc(-50% + ${l.toFixed(0)}px), calc(-50% + ${d.toFixed(0)}px)) rotate(0deg) scale(.9)`,opacity:.6},{transform:`translate(calc(-50% + ${(l*.4).toFixed(0)}px), calc(-50% + ${(d*.4-30).toFixed(0)}px)) rotate(${r.rot*2}deg) scale(1.5) rotateX(50deg)`,opacity:1,offset:.55},{transform:`translate(-50%,-50%) rotate(${r.rot}deg) scale(1)`,opacity:1}],{duration:640,easing:"cubic-bezier(.2,.8,.2,1)"})}}}function bf(e,t,a){let n=null;e.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),n={r:t.getBoundingClientRect(),moved:!1,x0:i.clientX,y0:i.clientY},e.classList.add("is-dragging");try{e.setPointerCapture(i.pointerId)}catch{}}),e.addEventListener("pointermove",i=>{if(!n)return;Math.hypot(i.clientX-n.x0,i.clientY-n.y0)>4&&(n.moved=!0);const o=Ya((i.clientX-n.r.left)/n.r.width),s=Ya((i.clientY-n.r.top)/n.r.height);e.style.left=`${(o*100).toFixed(2)}%`,e.style.top=`${(s*100).toFixed(2)}%`,n.x=o,n.y=s});const r=()=>{if(!n)return;const i=n;if(n=null,e.classList.remove("is-dragging"),i.moved&&i.x!==void 0){const o=Math.round((Math.random()-.5)*24),s=Dr(a,{x:i.x,y:i.y,rot:o});cl(e,s),E(8)}};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("lostpointercapture",r)}const ul=170,pl=150,yf=110,Ir=230,hl=64;function wf(e,t,{after:a=-1,extra:n=0}={}){const r=[];for(let i=0;i<e;i++){const o=i%2===0,s=a>=0&&i>a?n:0;r.push({x:Math.round(t*(o?.24:.76)),y:pl+i*ul+s,left:o})}return r}function xf(e,t=0){return pl+Math.max(0,e-1)*ul+yf+(e?t:0)}function vf(e,t,a){const n={x:Math.round(t/2),y:a-40},r={x:Math.round(t/2),y:58},i=[n,...[...e].reverse(),r];let o=`M${i[0].x},${i[0].y}`;for(let s=1;s<i.length;s++){const l=i[s-1],d=i[s],u=(l.y+d.y)/2;o+=` C${l.x},${u} ${d.x},${u} ${d.x},${d.y}`}return o}function kf(e,t,a="wanderweg"){const n=[];let r=0;for(let i=Ir*.6;i<t+Ir;i+=Ir,r++){const o=[];for(let d=0;d<=7;d++){const u=Math.round(e*d/7),g=pe(`${a}:${r}:${d}`)*70-20;o.push(`${u},${Math.round(i-g)}`)}const l=Math.min(1,i/t);n.push({points:`0,${i+80} ${o.join(" ")} ${e},${i+80}`,opacity:.22+l*.5})}return n}function fl(e,t=72){const a=String(e||"").replace(/\s+/g," ").trim();if(!a)return"";const n=a.match(/^.*?[.!?…](\s|$)/);let r=(n?n[0]:a).trim();return r.length>t&&(r=r.slice(0,t-1).trimEnd()+"…"),r}function ml(e,t,a){const r=1-(a/2-e)/t;return Math.min(1,Math.max(0,r))}const bl={photo:"📷",jackpot:"💎",special:"🎉",rare:"✨",quest:"🧭",warm:"🫶",cursed:"🪨",quiet:"🪨",soft:"🌿",uncommon:"🌼"};function $f(e){return e.photo?bl.photo:bl[e.tone]||"🌿"}function yl(e,t,{width:a,onOpen:n,expanded:r=-1,renderCard:i,extra:o=0,_pass:s=0}={}){const l=Math.max(220,Math.round(a||e.clientWidth||300)),d=r>=0&&r<t.length&&typeof i=="function",u=xf(t.length,d?o:0),g=wf(t.length,l,{after:d?r:-1,extra:d?o:0}),m=vf(g,l,u),x=kf(l,u),b=[];for(let f=0;f<18;f++){const k=Math.round(pe(`star:x:${f}`)*l),z=Math.round(pe(`star:y:${f}`)*Math.min(u,420));b.push(`<circle cx="${k}" cy="${z}" r="${(.6+pe(`star:r:${f}`)*1.1).toFixed(1)}" class="ag-ww-star" style="animation-delay:${(pe(`star:d:${f}`)*4).toFixed(1)}s"/>`)}if(e.style.height=`${u}px`,e.innerHTML=`
    <svg class="ag-ww-scene" width="${l}" height="${u}" viewBox="0 0 ${l} ${u}" aria-hidden="true">
      <defs>
        <linearGradient id="ag-ww-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1a2a"/><stop offset=".45" stop-color="#10261c"/><stop offset="1" stop-color="#1a3324"/>
        </linearGradient>
      </defs>
      <rect width="${l}" height="${u}" fill="url(#ag-ww-sky)"/>
      ${b.join("")}
      ${x.map(f=>`<polygon points="${f.points}" class="ag-ww-ridge" style="opacity:${f.opacity.toFixed(2)}"/>`).join("")}
      <path class="ag-ww-trail-shadow" d="${m}"/>
      <path class="ag-ww-trail" d="${m}" data-ag-ww-trail/>
    </svg>
    <div class="ag-ww-summit" style="left:${Math.round(l/2)}px;top:58px"><span class="ag-ww-flag">🚩</span><span class="ag-ww-summit-label">Gipfel · ${t.length} ${t.length===1?"Liebling":"Lieblinge"}</span></div>
    <div class="ag-ww-start" style="left:${Math.round(l/2)}px;top:${u-40}px"><span class="ag-ww-start-label">Start</span></div>
    <div class="ag-ww-hiker" data-ag-ww-hiker aria-hidden="true">🚶</div>
    ${t.map((f,k)=>Sf(f,g[k],k,k===r&&d)).join("")}
  `,d){const f=document.createElement("div");f.className="ag-ww-card",f.style.top=`${g[r].y+hl}px`,f.appendChild(i(t[r])),e.appendChild(f);const k=f.offsetHeight+hl+24;if(s<1&&Math.abs(k-o)>2)return yl(e,t,{width:l,onOpen:n,expanded:r,renderCard:i,extra:k,_pass:s+1})}return e.querySelectorAll("[data-ag-ww-stop]").forEach(f=>{f.addEventListener("click",()=>n&&n(t[Number(f.dataset.agWwStop)],f)),f.addEventListener("keydown",k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),n&&n(t[Number(f.dataset.agWwStop)],f))})}),Nr(e,0),{width:l,height:u}}function Sf(e,t,a,n=!1){const r=(t.left?"is-left":"is-right")+(n?" is-open":""),i=e.photo&&e.photo.url&&e.photo.type!=="video",o=i?`<span class="ag-ww-thumb"><img src="${q(e.photo.url)}" alt="" loading="lazy"></span>`:`<span class="ag-ww-mark">${$f(e)}</span>`,s=q(i&&(e.photo.caption||"").trim()||fl(e.message));return`
    <button class="ag-ww-stop ${r}" type="button" data-ag-ww-stop="${a}" style="left:${t.x}px;top:${t.y}px" data-tone="${q(e.tone||"soft")}" aria-expanded="${n?"true":"false"}">
      <span class="ag-ww-dot"></span>
      <span class="ag-ww-label">
        ${o}
        <span class="ag-ww-text">
          <span class="ag-ww-date">${q(ke(e.day))}</span>
          <span class="ag-ww-title">${q(e.title||"")}</span>
          ${s?`<span class="ag-ww-line">${s}</span>`:""}
        </span>
      </span>
    </button>`}function Nr(e,t){const a=e.querySelector("[data-ag-ww-trail]"),n=e.querySelector("[data-ag-ww-hiker]");if(!a||!n||typeof a.getTotalLength!="function")return;const r=a.getTotalLength();if(!r)return;const i=Math.min(r,Math.max(0,t*r)),o=a.getPointAtLength(i),s=a.getPointAtLength(Math.min(r,i+6));n.style.left=`${o.x}px`,n.style.top=`${o.y}px`,n.classList.toggle("is-facing-left",s.x<o.x-.5)}let wl=!1;function Lf(e){if(wl)return;wl=!0;let t=0;const a=()=>{t=0;const r=e();if(!r||!r.isConnected||r.offsetParent===null)return;const i=r.getBoundingClientRect();Nr(r,ml(i.top,i.height,window.innerHeight))},n=()=>{t||(t=requestAnimationFrame(a))};return window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),a}function Ef(e){return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&typeof t.title=="string"&&typeof t.text=="string"):[]}function Tf(e){const t=Ef(e);return t.length?t.map(a=>{const n=Co(a.figure);return`<section class="ag-liste-item">${n?`<div class="ag-kurs-figure">${n}</div>`:""}<h3 class="ag-kurs-title">${q(a.title)}</h3><p class="ag-liste-text">${q(a.text).replace(/\n/g,"<br>")}</p></section>`}).join(""):""}function Mf(e,t){if(!e)return;const a=Tf(t&&t.outcome&&t.outcome.items);e.innerHTML=a,e.hidden=!a}let tt=null,Pe="all";function Af(e){Pe=e==="vouchers"||e==="open"?e:"all",Rr=Wr,Ae()}function Pr(e){return e?q(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ja(){return K().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||p.theme.brand.displayNameDefault||"Lennart"}function Cf(){return["Bärlauch","Rave 🪩","Glossar 📖"]}let xl=null;function vl(e){try{const[t,a,n]=e.split("-").map(Number);xl||(xl=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}));const r=xl.formatToParts(new Date(Date.UTC(t,a-1,n,12))),i=o=>(r.find(s=>s.type===o)||{}).value||"";return`${i("weekday").replace(/\.$/,"")}, ${i("day")}. ${i("month")}`}catch{return e}}function zf(){const e=J(p.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const _f=["🚴","🧄"],Df=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function kl(){const e=J(p.theme.timezone),t=K();return`${p.theme.secret}|${t}|${e}|emoji`}function If(){const e=kl(),t=3+Math.floor(pe(`${e}|count`)*3),a=Df.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const i=Math.floor(pe(`${e}|pick|${r}`)*a.length);n.push(a.splice(i,1)[0])}return[..._f,...n]}let $l=!1;function Sl(){const e=c("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=If(),a=t.length,n=kl(),r=e.clientWidth||250;if(!$l){$l=!0;let i=null;window.addEventListener("resize",()=>{clearTimeout(i),i=setTimeout(Sl,200)})}t.forEach((i,o)=>{const s=document.createElement("span");s.className="ag-emoji",s.textContent=i;const l=360/a*o,d=(pe(`${n}|angle|${o}`)-.5)*28,u=l+d,g=pe(`${n}|radius|${o}`)*.1-.05,m=16+pe(`${n}|dur|${o}`)*10,x=-pe(`${n}|delay|${o}`)*m,b=pe(`${n}|dir|${o}`)>.5?1:-1;s.style.setProperty("--ag-emoji-angle",`${u}deg`),s.style.setProperty("--ag-emoji-radius",`${(r*(.42+g)).toFixed(1)}px`),s.style.setProperty("--ag-emoji-duration",`${m.toFixed(2)}s`),s.style.setProperty("--ag-emoji-delay",`${x.toFixed(2)}s`),s.style.setProperty("--ag-emoji-direction",b===1?"normal":"reverse"),yu(s),e.appendChild(s)})}function Zt(){const e=c("[data-ag-streak]"),t=Ge(),a=He();if(t>(a.maxStreak||0)&&ca({...a,maxStreak:t}),e){const n=Ni(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}jr()}function jr(){const e=c("[data-ag-streak-restore]");e&&(e.hidden=!Bi());const t=c("[data-ag-streak-gems]");if(t){const a=ba();t.hidden=!(a>0),t.textContent=`💎 ×${a}`,t.title=`${a} Streak-Retter in der Bank — springt ein, wenn mal ein Tag fehlt`,t.setAttribute("aria-label",t.title)}}function Nf(){const e=c("[data-ag-hugs]"),t=c("[data-ag-hugs-row]"),a=c("[data-ag-hugs-label]");if(!e||!t||!a)return;const n=Ci();if(e.hidden=!n.length,!n.length)return;const r=n[0].slice(0,10);a.textContent=`${n.length} ${n.length===1?"Umarmung":"Umarmungen"} seit ${ke(r)}`,t.innerHTML=n.slice(-120).map(i=>`<button type="button" class="ag-hug-heart" data-ts="${q(i)}" aria-label="Umarmung">♥</button>`).join(""),t.onclick=i=>{var d;const o=i.target.closest("[data-ts]");if(!o)return;const s=new Date(o.dataset.ts);let l=o.dataset.ts.slice(0,10);try{l=new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:((d=p.theme)==null?void 0:d.timezone)||"UTC"}).format(s)}catch{}o.classList.add("is-flare"),setTimeout(()=>o.classList.remove("is-flare"),700),B(`🫂 Umarmung am ${l}`)}}const Br={erfuellt:"erfüllt 🌿",irgendwann:"irgendwann 🕰","lieber-nicht":"lieber nicht ✗"};function Pf(e,t){const a=Br[e.status];if(!a)return"";const n=Math.round((Date.parse(t+"T12:00:00Z")-Date.parse(e.timestamp))/864e5);return`Dein Wunsch ${n>=14?"von neulich":n>=6?"von letzter Woche":"von dieser Woche"}: ${a}`}function Ll(e){var i;const t=c("[data-ag-wish-reply]");if(!t)return;if(oe()){t.hidden=!0;return}const a=J(((i=p.theme)==null?void 0:i.timezone)||"UTC"),n=_c(a),r=n?Pf(n,a):"";if(!r){t.hidden=!0;return}t.textContent=r,t.title=n.text?`„${n.text}"`:"",t.hidden=!1,Dc(n.statusAt,a)}const El={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function jf(e){const t=c("[data-ag-milestone]");if(!t)return;const a=El[e];if(!a){t.hidden=!0;return}const n=K();if(Tc(n,e)){t.hidden=!0;return}c("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Mc(n,e)}function Bf(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((l,d)=>{const u=document.createElement("div");u.className="ag-prompt-field";const g=document.createElement("p");g.className="ag-prompt-question",g.textContent=(d===0?"💭 ":"🌱 ")+l;const m=document.createElement("textarea");return m.className="ag-prompt-textarea",m.placeholder="Schreib hier deine Antwort...",m.rows=a.length>1?3:4,m.setAttribute("aria-label",l),u.appendChild(g),u.appendChild(m),n.appendChild(u),{question:l,textarea:m}}),i=document.createElement("p");i.className="ag-pin-err",i.hidden=!0,i.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const l=r.filter(u=>!u.textarea.value.trim());if(l.length){i.hidden=!1;for(const u of l)u.textarea.classList.add("ag-pin-shake"),setTimeout(()=>u.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const d=r.length===1?r[0].textarea.value.trim():r.map(u=>u.question+`
`+u.textarea.value.trim()).join(`

`);t(d)}o.addEventListener("click",s);for(const l of r)l.textarea.addEventListener("keydown",d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&s()});return n.appendChild(i),n.appendChild(o),n}function Of(e){return Array.isArray(e)?e.join(`
`):e}function Ff(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function qf(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:Of(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Wf(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Kapsel.";const i=document.createElement("div");i.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function d(){o.value.trim()===e?t():(l.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",d),o.addEventListener("keydown",u=>{u.key==="Enter"&&d()}),i.appendChild(o),i.appendChild(s),n.appendChild(r),n.appendChild(i),n.appendChild(l),n}function Rf(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const i=document.createElement("p");i.className="ag-pin-hint",i.style.marginTop="10px",i.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),Za(t,a.outcome.link)):(d.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",u),s.addEventListener("keydown",g=>{g.key==="Enter"&&u()}),o.appendChild(s),o.appendChild(l),n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(d),n}function Uf(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${r}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function Tl(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function Za(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=Ce(t);if(!a){e.hidden=!0;return}const n=Uf(a);e.appendChild(n||Tl(a)),e.hidden=!1}function Hf(e){const t=c("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||oe()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),i=e.token,o=H().filter(g=>g.token===i&&typeof g.day=="string"&&g.day.slice(5)===n&&Number(g.day.slice(0,4))<r).sort((g,m)=>m.day.localeCompare(g.day));if(!o.length)return;const s=o[0],l=r-Number(s.day.slice(0,4)),d=c("[data-ag-memory-label]"),u=c("[data-ag-memory-text]");d&&(d.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),u&&(u.textContent=s.title||""),t.hidden=!1}function Ml(e){const t=ln(e),a=dn(e);if(hc(e,t),we(),p.wishInbox&&p.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:K(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(p.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Gf(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=gt()[a]||0,r=dn(a),i=ln(a);if(n>=i)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop-in 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(i)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${i} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",s=>{vo(a,s.currentTarget),Ml(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',Et()});else{const s=i-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(i-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function Et(){const e=c("[data-ag-tokenbank]");if(!e)return;const t=gt(),a=Object.keys(sn).map(l=>{const d=ln(l),u=Math.min(t[l]||0,d);return{emoji:l,goal:d,count:u,raw:t[l]||0,reward:dn(l),done:(t[l]||0)>=d}}),n=a.reduce((l,d)=>l+d.raw,0),r=a.filter(l=>l.done).length,i=a.filter(l=>l.raw>0),o=a.length-i.length;i.sort((l,d)=>d.done-l.done||d.count/d.goal-l.count/l.goal||l.goal-d.goal);const s=c("[data-ag-tokenbank-head]");if(s){const l=o?` · ${o} ${o===1?"Sorte":"Sorten"} noch unentdeckt`:"",d=Mn(ut().count),u=d.inCycle||ut().count?` · Pfand ${d.inCycle}/${d.every}`:"";s.textContent=(n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`)+u}e.innerHTML="";for(const l of i){const d=document.createElement("div");if(d.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),d.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${q(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const u=document.createElement("button");u.type="button",u.className="ag-tokenrow-redeem",u.textContent="Einlösen",u.addEventListener("click",()=>{vo(l.emoji,u),Ml(l.emoji),E([12,30,12]),B(`${l.emoji} eingelöst — Fionn weiss Bescheid`),Et()}),d.appendChild(u)}e.appendChild(d)}}function Al(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let i;if(t.type==="video"){const o=rc(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${o}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const d=document.createElement("div");d.className="ag-drive-play-btn",d.setAttribute("aria-hidden","true"),s.appendChild(d);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",g),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const m=document.createElement("iframe");m.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,m.allow="autoplay",m.setAttribute("allowfullscreen",""),m.setAttribute("frameborder","0"),m.setAttribute("aria-label",a),m.className="ag-drive-iframe",s.appendChild(m)},g=m=>{(m.key==="Enter"||m.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",g),i=s}else i=document.createElement("video"),i.src=Ce(t.url),i.controls=!0,i.muted=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("preload","metadata"),i.setAttribute("aria-label",a),i.className="ag-media-content"}else i=document.createElement("img"),i.alt=a,i.loading="eager",i.decoding="auto",i.className="ag-media-content",i.addEventListener("load",()=>{const o=i.naturalWidth&&i.naturalHeight?i.naturalWidth/i.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),i.addEventListener("error",()=>{_e("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=Or(),l=s(o),d=l.find(u=>u.alt===t.alt&&u.type!=="video")||l.find(u=>u.type!=="video")||null;if(d&&d.url)r.style.backgroundImage=`url("${d.url}")`,i.src=Ce(d.url),p.photos=l;else{const u=i.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const o=i.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),i.src=Ce(t.url);n.appendChild(i),e.appendChild(n)}function Or(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Xt(e,t,a,n){var l,d;const r=c("#ag-lightbox"),i=c("#ag-lightbox-img"),o=c("#ag-lightbox-caption"),s=c("#ag-lightbox-drive-link");if(!(!r||!i)){(l=r.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(d=r.querySelector(".ag-lightbox-video"))==null||d.remove(),tt&&(i.removeEventListener("error",tt),tt=null),i.onerror=null,s&&(s.hidden=!0);{i.hidden=!1;const u=Ce(e);if(!u)return;i.src=u,i.alt=t||"",tt=()=>{const g=n||t;_e("config/photos.json",{photos:[]}).then(m=>{const{normalizePhotos:x}=Or(),b=x(m),f=b.find(k=>k.alt===g)||null;f&&f.url&&(i.src=Ce(f.url),p.photos=b)}).catch(()=>{})},i.addEventListener("error",tt,{once:!0})}o.textContent=t||"",o.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Fr(){var a,n;const e=c("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(tt&&(t.removeEventListener("error",tt),tt=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function qr(e){var a;return[`${no(e.category.tone)} ${Ja()}s ${p.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||na(e.unlockTime,e.unlockTimezone||((a=p.theme)==null?void 0:a.timezone)||"UTC"))?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function Cl(e,t=H().find(a=>a.day===e.day&&a.token===e.token)){let a=e.weather||t&&t.weather||null;!a&&!oe()&&e.day===J(p.theme.timezone)&&(a=wo(p.weather),a&&(e.weather=a,dc(e.day,e.token,a)));const n=yo(a),r=c("[data-ag-date]");r&&(r.textContent=n?`${vl(e.day)} · ${n}`:vl(e.day))}function Tt(e){var w;$.dataset.tone=e.category.tone,Dg(e.category.tone),c("[data-ag-rarity]").textContent=e.category.label;const t=H().find(S=>S.day===e.day&&S.token===e.token);Cl(e,t),c("[data-ag-title]").textContent=e.outcome.title;const a=c("[data-ag-message]");if(!a)return;a.innerHTML=Pr(e.outcome.message),a.hidden=!1,mu(a,e.outcome.secret===!0),ku(a,S=>{const T=p.todaysPull||e;Xo({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:"kapsel",word:S,meaning:`Aus der Kapsel „${T.outcome.title}“, ${ke(T.day)}`,audioUrl:null,token:K()});try{E([12,30,12])}catch{}B(`„${S}“ ins Glossar gelegt 📖`)});const n=c("[data-ag-result]");Oo(c("[data-ag-kurs]"),e),Mf(c("[data-ag-liste]"),e);const r=c("[data-ag-pfand]");if(r){const S=!!(t&&t.pfand),T=e.category.id==="niete"&&!oe()&&!S;r.hidden=!T;const M=c("[data-ag-pfand-handle]"),v=c("[data-ag-pfand-count]");if(v){const O=Mn(ut().count);v.textContent=`${O.inCycle}/${O.every}`}T&&M&&$u(M,c("[data-ag-result]"),()=>{if(!Bc(e.day,e.token))return;const O=Pc();if(Su(M),r.hidden=!0,O.earned){try{la(ci)}catch{}try{$e(70)}catch{}B(`♻︎ Zehn leere Kapseln zurück — ein ${ci} dafür`),Et()}else B(`♻︎ Pfand ${O.inCycle}/${di} — die Maschine nickt`);we()})}const i=c("[data-ag-freikarte-wrap]");if(i){const S=e.category.tone==="quiet"||e.category.tone==="cursed",T=!!(t&&t.pfand);i.hidden=!(S&&!T&&yc(e.token)>0&&!oe())}const o=c("[data-ag-quest-wrap]");if(o){const S=e.category.tone==="quest"&&!oe();if(o.hidden=!S,S){const T=c("[data-ag-quest-hint]"),M=c("[data-ag-quest-done]"),v=c("[data-ag-quest-photo]"),O=c("[data-ag-beweis-file]"),ee=c("[data-ag-beweis-thumb]"),F=H().find(N=>N.day===e.day&&N.token===e.token),de=!!(F&&F.bestanden),D=F&&F.beweisUrl;ee&&(ee.hidden=!D,D&&(ee.src=Ce(D),ee.onclick=()=>Xt(D,"Beweisfoto"))),T&&(T.textContent=de?`🏆 Bestanden am ${ke(F.bestandenAt||F.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),M&&(M.hidden=de,M.onclick=()=>{if(rt(M,"Wirklich geschafft? Nochmal tippen")&&fi(e.day,e.token)){we();try{$e(60)}catch{}Tt(e),p.activeTab==="history"&&Ae()}}),v&&O&&(v.hidden=!1,v.disabled=!1,v.textContent=D?"📸 Foto ersetzen":"📸 Beweis anhängen",v.onclick=()=>{O.value="",O.click()},O.onchange=async()=>{const N=O.files&&O.files[0],X=H().find(re=>re.day===e.day&&re.token===e.token);if(!(!N||!X)){v.disabled=!0,v.textContent="Lädt hoch…";try{const re=await Yg(e.day,e.token,N);lc(e.day,e.token,re),fi(e.day,e.token),we();try{$e(60)}catch{}try{B("Beweis angenommen 🏆")}catch{}}catch(re){const V=re&&re.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":re&&re.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":re&&re.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{B(V)}catch{}}Tt(e),p.activeTab==="history"&&Ae()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(a.hidden=!0,!(n?n.querySelector("[data-ag-prompt-gate]"):null)){const T=Bf(e.outcome.prompt,M=>{if(e.promptAnswer=M,T.remove(),!oe()){qf(e,M);const v=H(),O=v.findIndex(ee=>ee.day===e.day&&ee.token===e.token);O!==-1&&(v[O]={...v[O],promptAnswer:M},ze(v),we())}Tt(e),p.activeTab==="history"&&Ae()});T.setAttribute("data-ag-prompt-gate",""),a.parentNode.insertBefore(T,a)}c("[data-ag-result]").hidden=!1;return}const s=n?n.querySelector("[data-ag-pin-gate]"):null;s&&s.remove();const l=c("[data-ag-link-wrap]");if(e.outcome.pin){const S=!!e.outcome.pinMessage;if(S||(a.hidden=!Ln(e.outcome.pin)),!Ln(e.outcome.pin)){let T=null;S&&(T=document.createElement("div"),T.className="ag-message",T.hidden=!0,T.innerHTML=Pr(e.outcome.pinMessage),a.parentNode.insertBefore(T,a.nextSibling));const M=Wf(e.outcome.pin,()=>{M.remove(),S?T.hidden=!1:a.hidden=!1,e.outcome.link&&l&&Za(l,e.outcome.link)},e.outcome.pinHint);M.setAttribute("data-ag-pin-gate","");const v=S?T:a;v.parentNode.insertBefore(M,v)}}const d=c("[data-ag-photo-wrap]"),u=c("[data-ag-photo-media]"),g=c("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const S=e.unlockTimezone||((w=p.theme)==null?void 0:w.timezone)||"UTC",T=e.outcome.linkPin;if(T)if(!e.outcome.linkPinFrom||na(e.outcome.linkPinFrom,S)){const v=Rf(T,l,e);l.innerHTML="",l.appendChild(v),l.hidden=!1}else{const v=document.createElement("span");v.className="ag-outcome-link-locked",v.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,l.innerHTML="",l.appendChild(v),l.hidden=!1}else if(na(e.unlockTime,S))Za(l,e.outcome.link);else{const v=document.createElement("span");v.className="ag-outcome-link-locked",v.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,l.innerHTML="",l.appendChild(v),l.hidden=!1}}else e.outcome.pin&&!Ln(e.outcome.pin)||Za(l,e.outcome.link||null);if(Gf(c("[data-ag-token-wrap]"),e),Hf(e),e.photo){Al(u,e.photo);const S=(e.photo.caption||"").trim();S?(g.textContent=S,g.hidden=!1):(g.textContent="",g.hidden=!0),d.hidden=!!(e.outcome.prompt&&!e.promptAnswer)}else u.innerHTML="",g.textContent="",g.hidden=!0,d.hidden=!0;const m=qr(e),x=encodeURIComponent("Mein Gacha-Zug"),b=encodeURIComponent(m),f=c("[data-ag-send]");p.theme.messageTarget.startsWith("mailto:")?f.href=`${p.theme.messageTarget}?subject=${x}&body=${b}`:f.href=p.theme.messageTarget.replace("{text}",b);const k=c("[data-ag-save-img]");k&&(k.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const z=c("[data-ag-wallpaper]");z&&(z.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const I=c("[data-ag-actions-extra]");I&&(I.hidden=!(k&&!k.hidden)&&!(z&&!z.hidden));const y=c("[data-ag-reactions]");if(y){y.hidden=!1;const S=H().find(M=>M.day===e.day&&M.token===e.token),T=S&&S.reaction;for(const M of y.querySelectorAll("[data-ag-react]"))M.hidden=!!oe(),M.classList.toggle("is-chosen",M.dataset.agReact===T),M.onclick=()=>{const v=M.dataset.agReact;if(cc(e.day,e.token,v)){Ff(e,v),oe()||Promise.resolve().then(()=>st).then(O=>O.flashReactionOnLamp(v)).catch(()=>{}),we();try{E([12,30,18])}catch{}Tt(e),gl(c("[data-ag-aufkleber]"),e.day,v,{peelFrom:M})}};gl(c("[data-ag-aufkleber]"),e.day,T||"")}Ll(),c("[data-ag-result]").hidden=!1,_l()}function zl(e){return e?Ue().some(t=>t.day===e.day&&t.token===e.token):!1}function Xa(e){return Ue().some(t=>t.day===e.day&&t.token===e.token)}function _l(){const e=c("[data-ag-star]");if(!e)return;const t=zl(p.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Kf(e,t){const a=Ue(),n=a.findIndex(i=>i.day===e.day&&i.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),oa(a),we();const r=Xa(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",p.activeTab==="lieblinge"&&At()}function Dl(e){if(!e)return;const t=Ue(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),oa(t),we(),_l(),p.activeTab==="lieblinge"&&At()}function Yf(e){if(!e)return;if(e.flaschenpost)try{Wc(e.flaschenpost,e.day)}catch{}const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,unlockTimezone:e.unlockTimezone||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,weather:e.weather||null,flaschenpost:e.flaschenpost||null,revealedAt:Date.now()},a=H(),n=a.find(s=>s&&s.day===t.day&&s.token===t.token),r=n?{...n,...t,promptAnswer:t.promptAnswer||n.promptAnswer||null,weather:t.weather||n.weather||null,revealedAt:n.revealedAt||t.revealedAt}:t,i=new Set,o=[r,...a].filter(s=>{if(!s||typeof s.day!="string"||typeof s.token!="string")return!1;const l=`${s.day}|${s.token}`;return i.has(l)?!1:(i.add(l),!0)});o.sort((s,l)=>s.day<l.day?1:s.day>l.day?-1:0),ze(o),kn(0),we()}function Vf(e,t){var o;if(!e||e.used)return;const a=H().find(s=>s.day===e.day&&s.token===e.token);if(a&&a.used){Ae(),p.activeTab==="lieblinge"&&At();return}if(!rt(t,"Einlösen? Nochmal tippen"))return;const n=J(((o=p.theme)==null?void 0:o.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=H(),i=r.find(s=>s.day===e.day&&s.token===e.token);i&&(i.used=!0,i.usedAt=n,ze(r)),we();try{$e(60)}catch{}try{B("Eingelöst 💛")}catch{}try{nf(e)}catch{}t&&(t.disabled=!0),Ae(),p.activeTab==="lieblinge"&&At()}function Il(e){var n,r;if(!e.link)return null;if(e.unlockTime&&e.day===J(((n=p.theme)==null?void 0:n.timezone)||"UTC")&&!na(e.unlockTime,e.unlockTimezone||((r=p.theme)==null?void 0:r.timezone)||"UTC")){const i=document.createElement("span");return i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i}const a=Ce(e.link);return a?Tl(a):null}function Nl(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const r=yo(e.weather),i=e.restored?"":Xd(e.revealedAt);n.textContent=ke(e.day);const o=[i,r].filter(Boolean).join(" · ");if(o){const b=document.createElement("small");b.className="ag-history-meta",b.textContent=o,i&&(b.title=`Zum ersten Mal geöffnet um ${i}`),n.appendChild(b)}const s=document.createElement("span");s.className="ag-history-badge",s.textContent=e.categoryLabel||"Kapsel";const l=document.createElement("button");if(l.type="button",l.className="ag-history-star"+(Xa(e)?" is-starred":""),l.textContent=Xa(e)?"★":"☆",l.title=Xa(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",l.addEventListener("click",b=>{b.stopPropagation(),Kf(e,l)}),a.appendChild(n),a.appendChild(s),e.reaction){const b=document.createElement("span");b.className="ag-history-reaction",b.textContent=e.reaction,b.title="Deine Reaktion",a.appendChild(b)}a.appendChild(l);const d=document.createElement("p");d.className="ag-history-title",d.textContent=e.title||"";const u=document.createElement("div");u.className="ag-history-message",u.innerHTML=Pr(e.message||"");let g=null;if(e.promptAnswer){g=document.createElement("div"),g.className="ag-history-answer-wrap";const b=document.createElement("p");b.className="ag-history-answer-label",b.textContent="💭 Antwort";const f=document.createElement("blockquote");f.className="ag-history-answer",f.textContent=e.promptAnswer,g.appendChild(b),g.appendChild(f)}t.appendChild(a);const m=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,x=e.photo&&(e.photo.type==="video"||m.test(e.photo.url||""));if(e.photo&&!x){const b=document.createElement("div");b.className="ag-history-body";const f=document.createElement("div");f.className="ag-history-thumb";const k=document.createElement("img");k.src=Ce(e.photo.url),k.alt=e.photo.alt||"Foto-Drop",k.loading="lazy",k.decoding="async",k.addEventListener("error",function(){_e("config/photos.json",{photos:[]}).then(I=>{const{normalizePhotos:y}=Or(),w=y(I),S=w.find(T=>T.alt===e.photo.alt&&T.type!=="video")||w.find(T=>T.type!=="video")||null;if(S&&S.url)e.photo.url=S.url,k.src=Ce(S.url),p.photos=w;else{f.classList.add("is-broken"),k.remove();const T=document.createElement("span");T.className="ag-history-thumb-broken",T.textContent="📷",f.appendChild(T)}}).catch(()=>{f.classList.add("is-broken"),k.remove();const I=document.createElement("span");I.className="ag-history-thumb-broken",I.textContent="📷",f.appendChild(I)})},{once:!0}),f.appendChild(k),f.style.cursor="pointer",f.title="Vollansicht",f.addEventListener("click",()=>Xt(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const z=document.createElement("div");if(z.className="ag-history-text",z.appendChild(d),z.appendChild(u),g&&z.appendChild(g),e.link){const I=Il(e);I&&z.appendChild(I)}b.appendChild(f),b.appendChild(z),t.appendChild(b)}else if(t.appendChild(d),t.appendChild(u),g&&t.appendChild(g),e.link){const b=Il(e);b&&t.appendChild(b)}if(e.bestanden){const b=document.createElement("p");if(b.className="ag-history-bestanden",b.textContent=`🏆 Bestanden${e.bestandenAt?` am ${ke(e.bestandenAt)}`:""}`,t.appendChild(b),e.beweisUrl){const f=document.createElement("img");f.className="ag-history-beweis",f.src=Ce(e.beweisUrl),f.alt="Beweisfoto",f.loading="lazy",f.decoding="async",f.addEventListener("click",k=>{k.stopPropagation(),Xt(e.beweisUrl,"Beweisfoto")}),f.addEventListener("error",()=>f.remove(),{once:!0}),t.appendChild(f)}}if(It(e)){const b=document.createElement("div");if(b.className="ag-voucher-actions",!e.used){const f=H().find(k=>k.day===e.day&&k.token===e.token);f&&f.used&&(e={...e,used:!0,usedAt:f.usedAt})}if(e.used){const f=document.createElement("span");f.className="ag-voucher-used",f.textContent=`✓ Benutzt am ${e.usedAt?ke(e.usedAt):"–"}`,b.appendChild(f)}else{const f=document.createElement("button");f.type="button",f.className="ag-voucher-use",f.textContent="🎟️ Benutzen",f.addEventListener("click",k=>{k.stopPropagation(),Vf(e,f)}),b.appendChild(f)}t.appendChild(b)}return t}function Jf(e){const t=c("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===Pe),n.setAttribute("aria-selected",r===Pe?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let Mt=null;function Pl(e){var I;const t=c("[data-ag-history-calendar]");if(!t)return;if(Pe!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((I=p.theme)==null?void 0:I.timezone)||"UTC",n=J(a);Mt||(Mt=n.slice(0,7));const r=new Map(e.map(y=>[y.day,y])),[i,o]=Mt.split("-").map(Number),s=new Date(Date.UTC(i,o-1,1)),l=new Date(Date.UTC(i,o,0)).getUTCDate(),d=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),g=e.filter(y=>y.day.startsWith(Mt)).length;t.innerHTML="";const m=document.createElement("div");m.className="ag-kalender-head";const x=document.createElement("button");x.type="button",x.className="ag-kalender-nav",x.textContent="‹",x.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=g?`${u} · ${g} Kapseln`:u;const f=document.createElement("button");f.type="button",f.className="ag-kalender-nav",f.textContent="›",f.setAttribute("aria-label","Nächster Monat");const k=y=>{const w=new Date(Date.UTC(i,o-1+y,1));Mt=`${w.getUTCFullYear()}-${String(w.getUTCMonth()+1).padStart(2,"0")}`,Pl(e)};x.addEventListener("click",()=>k(-1)),f.addEventListener("click",()=>k(1)),m.appendChild(x),m.appendChild(b),m.appendChild(f),t.appendChild(m);const z=document.createElement("div");z.className="ag-kalender-grid";for(const y of["M","D","M","D","F","S","S"]){const w=document.createElement("span");w.className="ag-kalender-wd",w.textContent=y,z.appendChild(w)}for(let y=0;y<d;y++)z.appendChild(document.createElement("span"));for(let y=1;y<=l;y++){const w=`${Mt}-${String(y).padStart(2,"0")}`,S=r.get(w),T=document.createElement("span");T.className="ag-kalender-day",T.textContent=y,S&&(T.classList.add("has-pull"),T.dataset.tone=S.tone||"soft",T.title=`${S.title||"Kapsel"} (${S.categoryLabel||""})`),w===n&&T.classList.add("is-today"),w>n&&T.classList.add("is-future"),z.appendChild(T)}t.appendChild(z)}function Zf(e){var i;const t=c("[data-ag-history-tally]");if(!t)return;if(Pe!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(i=e[e.length-1])==null?void 0:i.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const Wr=15;let Rr=Wr;function Xf(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function Qf(e){const t=c("[data-ag-album-card]"),a=c("[data-ag-album]"),n=c("[data-ag-album-note]");if(!t||!a)return;const r=Xf(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const i of r){const o=document.createElement("button");o.type="button",o.className="ag-album-tile",o.title=i.caption||i.alt||i.day,o.setAttribute("aria-label",i.caption||i.alt||`Foto vom ${i.day}`);const s=document.createElement("img");s.src=i.url,s.alt=i.alt||i.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>o.remove(),{once:!0}),o.appendChild(s),o.addEventListener("click",()=>{E(8),Xt(i.url,i.caption,!1,i.alt)}),a.appendChild(o)}}function em(e){const t=c("[data-ag-trophy-card]"),a=c("[data-ag-trophies]"),n=c("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,o)=>(o.bestandenAt||o.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`),a.innerHTML="";for(const i of r){const o=document.createElement("div");o.className="ag-trophy-tile",o.title=i.title||i.categoryLabel||"Quest";const s=document.createElement("span");s.className="ag-trophy-emoji";const l=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(s.textContent=l?l[l.length-1]:"🏆",i.beweisUrl){o.classList.add("has-beweis");const g=document.createElement("img");g.className="ag-trophy-shot",g.src=Ce(i.beweisUrl),g.alt="Beweisfoto",g.loading="lazy",g.decoding="async",g.addEventListener("error",()=>{g.remove(),o.classList.remove("has-beweis")},{once:!0}),o.appendChild(g),o.addEventListener("click",()=>Xt(i.beweisUrl,i.title||"Beweisfoto"))}const d=document.createElement("span");d.className="ag-trophy-title",d.textContent=i.title||i.categoryLabel||"Quest";const u=document.createElement("span");u.className="ag-trophy-date",u.textContent=ke(i.bestandenAt||i.day),o.appendChild(s),o.appendChild(d),o.appendChild(u),a.appendChild(o)}}function Ur(){const e=c("[data-ag-ferien-list]"),t=c("[data-ag-ferien-count]");if(!e)return;const a=fa();e.innerHTML="",t&&(t.hidden=!a.length,t.textContent=a.length?`· ${a.length}`:"");for(const n of a){const r=document.createElement("li");r.className="ag-ferien-item";const i=document.createElement("span");i.textContent=n.from===n.to?ke(n.from):`${ke(n.from)} – ${ke(n.to)}`;const o=document.createElement("button");o.type="button",o.className="ag-ferien-remove",o.setAttribute("aria-label","Ferien entfernen"),o.textContent="✕",o.addEventListener("click",()=>{Gc(n.from,n.to),Ur(),Zt()}),r.appendChild(i),r.appendChild(o),e.appendChild(r)}}function Ae(){var u;Et();const e=c("[data-ag-history]"),t=c("[data-ag-history-empty]"),a=c("[data-ag-history-note]");e.innerHTML="";const n=K(),r=J(((u=p.theme)==null?void 0:u.timezone)||"UTC"),i=H().filter(g=>g.token===n&&g.day<=r).slice().sort((g,m)=>g.day<m.day?1:g.day>m.day?-1:0);Pl(i),Zf(i),Ur(),Nf(),em(i),Qf(i);const o=i.filter(g=>It(g)&&!g.used).length;Jf(o);const s=i.filter(g=>Pe==="vouchers"?It(g):Pe==="open"?It(g)&&!g.used:!0);Pe==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":Pe==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=c("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=Pe==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":Pe==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const d=s.slice(0,Rr);for(const g of d)e.appendChild(Nl(g));if(l){const g=s.length-d.length;l.hidden=g<=0,g>0&&(l.textContent=`Mehr anzeigen (${g} weitere)`,l.onclick=()=>{Rr+=Wr,Ae()})}}let Qa="";function At(){const e=c("[data-ag-lieblinge]"),t=c("[data-ag-lieblinge-empty]"),a=c("[data-ag-lieblinge-note]");e.innerHTML="",e.style.height="";const n=Ue();if(a.textContent="Dein Wanderweg — jeder Liebling eine Etappe, der neueste ganz oben am Gipfel.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel — oder kneif die Karte zusammen.";return}t.hidden=!0;const r=s=>`${s.day}|${s.token}`,i=n.findIndex(s=>r(s)===Qa);yl(e,n,{expanded:i,renderCard:s=>{const l=document.createElement("ul");return l.className="ag-history",l.appendChild(Nl(s)),l},onOpen:(s,l)=>{Qa=r(s)===Qa?"":r(s);try{E(6)}catch{}if(At(),Qa){const d=e.querySelector(`[data-ag-ww-stop="${n.indexOf(s)}"]`);d&&d.scrollIntoView&&d.scrollIntoView({block:"start",behavior:"smooth"})}}});const o=Lf(()=>c("[data-ag-lieblinge]"));o&&o(),requestAnimationFrame(()=>{const s=e.getBoundingClientRect();Nr(e,ml(s.top,s.height,window.innerHeight))})}function tm(){const e=c("[data-ag-odds]");e.innerHTML="";const t=Ge(),a=Pi(t),n=a.reduce((r,i)=>r+i.weight,0);for(const r of a){const i=document.createElement("li");i.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(i)}if(t>=5){const r=Ni(t),i=document.createElement("li");i.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,i.style.fontWeight="800",e.appendChild(i)}}function am(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function nm(){const e=c("[data-ag-post-count]");if(!e)return;const t=pt().filter(a=>!a.deliveredDay).length;e.hidden=!t,e.textContent=t===1?"🍾 Eine Flaschenpost ist unterwegs.":`🍾 ${t} Flaschenposten sind unterwegs.`}function Ct(){var i;nm();const e=c("[data-ag-wish-idle]"),t=c("[data-ag-wish-form]"),a=c("[data-ag-wish-done]");if(!e||!t||!a)return;const n=vn();if(n&&n.week===ra((i=p.theme)==null?void 0:i.timezone)){e.hidden=!0,t.hidden=!0,a.hidden=!1,c("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",c("[data-ag-wish-done-note]").textContent=`„${n.text}"`;const o=Mi(),s=o&&Math.abs(Date.parse(o.timestamp)-Number(n.submittedAt||0))<12e4&&Br[o.status];c("[data-ag-wish-done-meta]").textContent=s?`Fionn sagt: ${Br[o.status]}`:am(n.remoteStatus)}else e.hidden=!1,t.hidden=!0,a.hidden=!0}function rm(){var x;const e=Ja(),t=p.theme.brand.fromName,a=c("[data-ag-main-title]");a&&(a.textContent=p.theme.brand.titleTemplate.replace("{name}",e));const n=c("[data-ag-kicker]");n&&(n.textContent=`${p.theme.brand.kicker} · ${p.photos.length} Erinnerungen`);const r=c("[data-ag-intro]");r&&(r.textContent=p.theme.brand.intro);const i=c("[data-ag-button-text]");i&&(i.textContent=p.theme.brand.buttonIdle);const o=c("[data-ag-rules-title]");o&&(o.textContent=p.theme.brand.rulesTitle);const s=c("[data-ag-rules-text]");s&&(s.textContent=p.theme.brand.rulesText);const l=c("[data-ag-send]");l&&(l.textContent=`An ${t} schicken`);const d=c("[data-ag-today-pill]");d&&(d.textContent=zf());const u=c("[data-ag-draw-hint]");if(u){const b=H().filter(k=>k.token===K()).length,f=iu(b);u.textContent=f?ou:"Eine Kapsel · ein Tag · ein Souvenir.",u.classList.toggle("is-secret",f)}const g=c("[data-ag-chips]");g&&(g.innerHTML=""),queueMicrotask(jo);const m=Array.isArray(p.theme.stickers)&&p.theme.stickers.length?p.theme.stickers:Cf();for(const b of g?m:[]){const f=document.createElement("li");if(f.textContent=b,(b.toLowerCase().includes("bärlauch")||b.toLowerCase().includes("barlauch"))&&(f.id="ag-btn-baerlauch",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Bärlauch öffnen"),f.classList.add("ag-chip-clickable"),xp()&&(f.classList.add("ag-chip-saison"),f.title="Bärlauch-Saison — Level 5 schaffen, 🌿 kassieren")),(b.toLowerCase().includes("gespräch")||b.toLowerCase().includes("gesprach"))&&(f.id="ag-btn-gesprach",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Gespräch öffnen"),f.classList.add("ag-chip-clickable")),b.toLowerCase().includes("rave")&&(f.id="ag-btn-rave",f.tabIndex=0,f.setAttribute("role","link"),f.setAttribute("aria-label","Rave Board öffnen"),f.classList.add("ag-chip-clickable")),b.toLowerCase()==="quest"&&(f.id="ag-btn-quest",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Quest öffnen"),f.classList.add("ag-chip-clickable"),(x=p.quest)!=null&&x.enabled&&uo()&&(Nt().solved||f.classList.add("ag-chip-quest-active"))),b.toLowerCase().includes("glossar")&&(f.id="ag-btn-glossary",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Glossar öffnen"),f.classList.add("ag-chip-clickable")),(b.toLowerCase().includes("skincare")||b.toLowerCase().includes("pflege"))&&p.skincare&&(f.id="ag-btn-skincare",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Skincare-Routine öffnen"),f.classList.add("ag-chip-clickable")),b.toLowerCase().includes("stimmung")){f.id="ag-btn-stimmung",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Farbe des Tages wählen"),f.classList.add("ag-chip-clickable");const k=ht();k&&(f.classList.add("ag-chip-stimmung-set"),f.style.setProperty("--chip-dot-color",k))}g.appendChild(f)}Sl(),Zt()}const jl="affektions-gacha:install-dismissed:v1";let Qt=null;function im(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function om(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Bl(){try{return window.localStorage.getItem(jl)==="1"}catch{return!1}}function Ol(){try{window.localStorage.setItem(jl,"1")}catch{}const e=c("[data-ag-install-nudge]");e&&(e.hidden=!0)}function Fl(e){if(Bl())return;const t=c("[data-ag-install-nudge]");if(!t)return;const a=c("[data-ag-install-copy]"),n=c("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Qt&&(Qt.prompt(),await Qt.userChoice,Qt=null,Ol())}),t.hidden=!1}function sm(){var e;im()||Bl()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Qt=t,Fl(!0)}),om()&&Fl(!1),(e=c("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Ol))}const lm={photos:[]};function dm(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=On();return a.map(r=>{const i=new URL(r.url,n).toString(),o=r.type==="video"||t.test(i);return{...r,type:o?"video":"image",url:i}}).filter(r=>r.url)}async function cm(){Bg(),Wg(),Gg();try{const[e,t,a,n,r,i,o,s,l]=await Promise.all([_e("config/theme.json"),_e("config/outcomes.json"),_e("config/photos.json",lm),_e("config/special-days.json",{days:[]}),_e("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),_e("config/backup.json",{enabled:!1,endpointUrl:""}),_e("config/quest.json",{enabled:!1}),_e("config/push.json",{enabled:!1}),_e("config/skincare.json").catch(()=>null)]);p.theme=e,p.outcomes=t,sc(t),p.photos=dm(a),p.specialDays=n,Zd(e.dayStartHour),p.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},p.backup=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},p.quest=o&&typeof o=="object"?o:{enabled:!1},p.push=s&&typeof s=="object"?s:{enabled:!1},p.skincare=l&&typeof l=="object"?l:null,Og(e),Fg(oe()||J(e.timezone)),gg(),rm(),tm(),Ct(),uf(),sm(),requestAnimationFrame(()=>{const g=$.querySelector(".ag-nav-pill"),m=$.querySelector(".ag-bottomnav-btn.is-active");if(g&&m){const x=m.closest(".ag-bottomnav"),b=x?x.getBoundingClientRect():null,f=m.getBoundingClientRect();b&&f.width&&(g.style.transition="none",g.style.left=`${f.left-b.left}px`,g.style.width=`${f.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{rf()}catch{}try{const g=$.querySelector(".ag-stage");g&&"IntersectionObserver"in window&&new IntersectionObserver(([x])=>{g.classList.toggle("ag-stage-idle",!x.isIntersecting)},{threshold:.05}).observe(g)}catch{}cr();try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist().catch(()=>{})}catch{}p.renderedDay=J(e.timezone);const d=()=>{oe()||J(e.timezone)!==p.renderedDay&&window.location.reload()};window.setInterval(d,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(d(),dr(),Zn(),ql(e.timezone),Bt().catch(()=>{}))}),$.classList.add("is-ready"),$.style.transition="opacity .18s ease",$.style.opacity="1";const u=J(e.timezone);H().some(g=>g.token===K()&&g.day===u)&&!oe()&&lf(),Zn(),ql(e.timezone),Bt().catch(()=>{}),Hn().then(g=>hu(g)).catch(()=>{}),window.setTimeout(()=>{rs().catch(()=>{})},1800),window.setTimeout(()=>{Promise.resolve().then(()=>st).then(g=>g.clearWakeUpAlarms()).catch(()=>{})},3e3)}catch(e){sl(e)}}function ql(e){try{const{h:t}=gn(e||"UTC"),a=t>=22||t<5;$.classList.toggle("is-evening",a),zg($.querySelector("[data-ag-moon]"),{evening:a});const n=$.querySelector("[data-ag-candle]");n&&(n.hidden=!yg(t));const r=$.querySelector("[data-ag-kicker]");if(r){const i=r.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");r.textContent=a?i+" · Gute Nacht 🌙":i}}catch{}}const zt=document.currentScript,gm=(zt==null?void 0:zt.dataset.mount)||"#affektions-gacha",um=(zt==null?void 0:zt.dataset.configBase)||"";function pm(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const hm=document.querySelector(gm)||pm();Hd(hm),hg(um,null),cm().catch(e=>sl(e))})();

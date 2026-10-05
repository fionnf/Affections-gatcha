(function(){"use strict";const p={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,push:null,skincare:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let k=null;function Xl(e){k=e}function d(e){return k.querySelector(e)}const zr="affektions-gacha:history:v1",Ar="affektions-gacha:favourites:v1",_r="affektions-gacha:tokens:v1",Dr="affektions-gacha:tokens-sent:v1",Nr="affektions-gacha:streak-cache:v1",Ir="affektions-gacha:streak-synced:v1",Pr="affektions-gacha:streak-restore:v1",Br="affektions-gacha:wish:v1",jr="affektions-gacha:milestones:v1",it="affektions-gacha:notif:v2",Fr="affektions-gacha:baerlauch-scores:v1",Ql="affektions-gacha:baerlauch-history:v1",Or="affektions-gacha:gesprach-idx:v1",qr="affektions-gacha:last-ping:v1",ed="affektions-gacha:sound:v1",Wr="affektions-gacha:gipfelbuch:v1",Rr="affektions-gacha:quest:v1",Za="affektions-gacha:quest-points:v1",td=5,ad=20,Ur=[100,75,50,25],Hr="affektions-gacha:glossary:v1",Xa="affektions-gacha:stimmung:v1",Gr="affektions-gacha:freikarte:v1",Qa="affektions-gacha:freikarte-reroll:v1",en={"🌿":{goal:4,reward:"Essen: Fionn kocht, oder ein Café deiner Wahl"},"🏔":{goal:5,reward:"Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg"},"🎬":{goal:4,reward:"Ein Abend aus: Film, Konzert oder DJ — du wählst"},"🛁":{goal:3,reward:"Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag"},"💚":{goal:4,reward:"Eine Überraschung von Fionn, mit handgeschriebenem Brief"},"✈️":{goal:6,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}},nd={"☕":"🌿","🔥":"🏔","🎧":"🎬","🍕":"🛁","☁️":"🛁","⭐":"💚"};function Kr(e){return nd[e]||e}function tn(e){const t=en[e];return t&&t.goal||td}function an(e){const t=en[e];return t&&t.reward||""}const Yr=10,Vr="🛁";let Jr=0;function rd(e){Jr=Number.isInteger(e)&&e>=0&&e<24?e:0}function Q(e,t){const a=new Date().getTime()-Jr*36e5,n=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(a)),r=i=>n.find(o=>o.type===i).value;return`${r("year")}-${r("month")}-${r("day")}`}function Tt(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}let Zr=null;const Xr=new Map;function id(e,t="Europe/Zurich"){const a=typeof e=="number"?e:Date.parse(e||"");if(!Number.isFinite(a)||a<=0)return"";try{let n=Xr.get(t);return n||(n=new Intl.DateTimeFormat("de-CH",{hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:t}),Xr.set(t,n)),n.format(new Date(a))}catch{return""}}function ke(e){const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return Zr||(Zr=new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})),Zr.format(r)}catch{return e}}function od(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function nn(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function sd(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function Ce(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function ld(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function dd(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function he(e){return dd(ld(e))()}function rn(e,t){return t?Math.floor(he(e)*t):0}function cd(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function gd(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function G(){return"lennart"}function re(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ud(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Jt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Zt(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=Q(t),[n,r,i]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,r-1,i)).getTime()/864e5);return Math.floor(o/(((l=e.quest)==null?void 0:l.periodDays)||2))}function Xt(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Zt(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function Qr(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function pd(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const on=new Set;function fd(e){on.clear();const t=Array.isArray(e&&e.categories)?e.categories:[];for(const a of t)for(const n of Array.isArray(a.outcomes)?a.outcomes:[])n&&n.voucher===!0&&n.title&&on.add(n.title)}function $t(e){return e?e.voucher===!0?!0:e.voucher===!1?!1:!!e.title&&on.has(e.title):!1}function W(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function $e(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[G()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[G()]:n})),n}catch{return t}}function me(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[G()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}let ei=null,sn=null;function Y(){try{if(typeof window>"u"||!window.localStorage)return p.syncedHistory||[];const e=window.localStorage.getItem(zr);if(!e)return p.syncedHistory||[];if(e===ei&&sn)return sn;const t=JSON.parse(e);if(!Array.isArray(t))return p.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?(ei=e,sn=a,a):p.syncedHistory||[]}catch{return p.syncedHistory||[]}}function Ie(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(zr,JSON.stringify(e))}catch{}}function ti(e,t){var r;const a=Y(),n=a.find(i=>i.day===e&&i.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=Q(((r=p.theme)==null?void 0:r.timezone)||"UTC"),Ie(a)),n):null}function hd(e,t,a){const n=Y(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.beweisUrl=a,Ie(n),r):null}function md(e,t,a){const n=Y(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.reaction=a,Ie(n),r):null}function Re(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(Ar);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=p.theme)!=null&&e.timezone?Q(p.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function Qt(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ar,JSON.stringify(e))}catch{}}function ai(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;if(r<=0)continue;const i=Kr(a);t[i]=(t[i]||0)+r}return t}function ot(){const e=$e(_r,{});return ai(e&&typeof e=="object"&&!Array.isArray(e)?e:{})}function ln(e){me(_r,e)}function ea(e){e=Kr(e);const t=ot();return t[e]=(t[e]||0)+1,ln(t),t[e]}function bd(e){const t=ot();t[e]=0,ln(t)}function ta(e){return ai(e)}function yd(){const e=$e(Dr,null);return e&&typeof e=="object"&&!Array.isArray(e)?ta(e):null}function aa(e){me(Dr,ta(e))}function wd(e){const t=ta(e),a=ta(ot());let n=yd();n===null&&(n=a,aa(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),i={};for(const o of r){const s=(t[o]||0)+((a[o]||0)-(n[o]||0));s>0&&(i[o]=s)}return ln(i),aa(t),[...r].some(o=>(i[o]||0)!==(t[o]||0))}function dn(){try{const e=localStorage.getItem(Gr),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ni(e){try{localStorage.setItem(Gr,JSON.stringify(e))}catch{}}function xd(e){return dn()[e]||0}function ri(e){const t=dn();return t[e]=(t[e]||0)+1,ni(t),t[e]}function vd(e){const t=dn();return t[e]>0?(t[e]-=1,ni(t),!0):!1}function kd(e,t){try{const a=localStorage.getItem(Qa),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function Sd(e,t,a){try{const n=localStorage.getItem(Qa),r=n?JSON.parse(n):{},i=r&&typeof r=="object"?r:{};i[`${e}|${t}`]=a,localStorage.setItem(Qa,JSON.stringify(i))}catch{}}function cn(){if(typeof window>"u"||!window.localStorage)return null;const e=$e(Br,null);return e&&typeof e=="object"?e:null}function ii(e){typeof window>"u"||!window.localStorage||me(Br,e)}function Ue(){const e=$e(Pr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function na(e){me(Pr,e)}function Ld(){const e=$e(Nr,0);return typeof e=="number"?e:parseInt(e,10)||0}function gn(e){me(Nr,e)}function Ed(){const e=$e(Ir,0);return typeof e=="number"?e:parseInt(e,10)||0}function Td(e){me(Ir,e)}function ra(){try{const e=window.localStorage.getItem(Wr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ia(e){try{window.localStorage.setItem(Wr,JSON.stringify(e))}catch{}}function un(){try{const e=localStorage.getItem(Fr),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function oi(){try{const e=localStorage.getItem(Ql),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Ct(e){try{const t=$e(Rr,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function pn(e){me(Rr,e)}function oa(){const e=$e(Za,0);return typeof e=="number"?e:parseInt(e,10)||0}function $d(e){try{const t=oa()+e;return me(Za,t),t}catch{return e}}function Cd(e){me(Za,e)}function si(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(jr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Md(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(jr,JSON.stringify(e))}catch{}}function zd(e,t){return si().includes(`${e}|${t}`)}function Ad(e,t){const a=`${e}|${t}`,n=si();n.includes(a)||Md([...n,a])}function fn(e){return!1}const li="affektions-gacha:baerlauch-weekly:v1";function _d(e){const t=$e(li,null);return!!(t&&typeof t=="object"&&t.week===e)}function Dd(e){me(li,{week:e,at:Date.now()})}const hn="affektions-gacha:wish-replies:v1";function sa(){const e=$e(hn,null);return e&&typeof e=="object"&&!Array.isArray(e)?e:{wishes:[],shown:null}}function Nd(e){const t=sa(),a=(Array.isArray(e)?e:[]).filter(n=>n&&n.timestamp).map(n=>({timestamp:String(n.timestamp),text:String(n.text||""),status:String(n.status||""),statusAt:String(n.statusAt||"")}));me(hn,{wishes:a,shown:t.shown||null})}function di(){const{wishes:e}=sa(),t=e.filter(a=>a.status&&a.statusAt);return t.length?(t.sort((a,n)=>a.statusAt<n.statusAt?1:a.statusAt>n.statusAt?-1:0),t[0]):null}function Id(e){const t=di();if(!t)return null;const{shown:a}=sa();return a&&a.statusAt===t.statusAt&&a.day!==e?null:t}function Pd(e,t){const a=sa();a.shown&&a.shown.statusAt===e&&a.shown.day===t||me(hn,{...a,shown:{statusAt:e,day:t}})}const ci="affektions-gacha:hug-log:v1";function gi(){const e=$e(ci,[]);return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}const Bd=9e4;function ui(e){const t=new Set(gi());for(const r of Array.isArray(e)?e:[])typeof r=="string"&&r&&t.add(r);const a=[...t].sort(),n=[];for(const r of a){const i=n[n.length-1];i&&Math.abs(Date.parse(r)-Date.parse(i))<Bd||n.push(r)}return me(ci,n.slice(-500)),n}function jd(e){return ui([e])}const mn="affektions-gacha:pfand:v1";function st(){const e=$e(mn,{count:0});return e&&typeof e=="object"&&Number.isFinite(e.count)?e:{count:0}}function bn(e,t=Yr){const a=Math.max(0,Math.floor(Number(e)||0));return{inCycle:a%t,every:t,earned:a>0&&a%t===0}}function Fd(){const t=(st().count||0)+1;return me(mn,{count:t,at:Date.now()}),{count:t,...bn(t)}}function Od(e){const t=st(),a=Math.max(t.count||0,Math.floor(Number(e)||0));return a!==(t.count||0)&&me(mn,{...t,count:a}),a}function qd(e,t){const a=Y(),n=a.find(r=>r.day===e&&r.token===t);return!n||n.pfand?!1:(n.pfand=!0,Ie(a),!0)}const pi="affektions-gacha:flaschenpost:v1";function lt(){const e=$e(pi,[]);return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&t.id&&t.text&&t.dueDay):[]}function yn(e){me(pi,(Array.isArray(e)?e:[]).slice(-40))}function fi(e,t){const[a,n,r]=e.split("-").map(Number);return new Date(Date.UTC(a,n-1,r+t)).toISOString().slice(0,10)}function Wd(e,t,a){return e==="30"?fi(t,30):fi(t,20+Math.floor(he(`flaschenpost|${a}`)*71))}function Rd(e,t,a){const n=String(e||"").trim().slice(0,280);if(!n)return null;const r=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,i={id:r,text:n,mode:t==="30"?"30":"irgendwann",createdDay:a,dueDay:Wd(t,a,r),deliveredDay:null};return yn([...lt(),i]),i}function Ud(e){const t=lt(),a=t.find(n=>n.deliveredDay===e);return a||t.filter(n=>!n.deliveredDay&&n.dueDay<=e).sort((n,r)=>n.dueDay<r.dueDay?-1:1)[0]||null}function Hd(e,t){const a=lt(),n=a.find(r=>r.id===e);return!n||n.deliveredDay?!1:(n.deliveredDay=t,yn(a),!0)}function Gd(e){const t=new Map(lt().map(n=>[n.id,n]));for(const n of Array.isArray(e)?e:[]){if(!n||!n.id||!n.text||!n.dueDay)continue;const r=t.get(n.id);t.set(n.id,r?{...r,deliveredDay:r.deliveredDay||n.deliveredDay||null}:n)}const a=[...t.values()].sort((n,r)=>n.createdDay<r.createdDay?-1:1);return yn(a),a}const Kd=60;function la(){const e=Ue();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function Yd(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>Kd))return null;const n=Ue(),r=la().filter(i=>!(i.from===e&&i.to===t));return r.push({from:e,to:t}),r.sort((i,o)=>i.from.localeCompare(o.from)),na({...n,vacations:r}),{from:e,to:t}}function Vd(e,t){const a=Ue();na({...a,vacations:la().filter(n=>!(n.from===e&&n.to===t))})}function hi(e){return la().some(t=>e>=t.from&&e<=t.to)}function He(){var g;const e=G(),t=Y().filter(b=>b.token===e);if(!t.length)return Math.max(Ld(),Ed());const a=((g=p.theme)==null?void 0:g.timezone)||"UTC",n=Q(a),r=new Set(t.map(b=>b.day)),[i,o,s]=n.split("-").map(Number);let l=new Date(Date.UTC(i,o-1,s)),c=n;r.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));let u=0;for(;r.has(c)||hi(c);)r.has(c)&&u++,l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return u}function mi(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function bi(e){if(e<5)return p.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return p.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Jd=45,Zd=10,Xd=.5,Qd=1.8;function ec(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=Y().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,l)=>l.day.localeCompare(s.day)).slice(0,Jd);if(r.length<Zd)return e;const i=e.reduce((s,l)=>s+l.weight,0);if(!i)return e;const o={};for(const s of r)o[s.categoryId]=(o[s.categoryId]||0)+1;return e.map(s=>{const l=r.length*s.weight/i,c=Math.min(Qd,Math.max(Xd,(l+1)/((o[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function tc(e,t,a=[],n=null){const r=bi(t),i=n?ec(r,n.token,n.day):r,o=a.length?i.filter(g=>!a.includes(g.id)):i,s=o.length?o:i,l=s.reduce((g,b)=>g+b.weight,0),c=Math.floor(he(e)*l);let u=0;for(const g of s)if(u+=g.weight,c<u)return p.outcomes.categories.find(b=>b.id===g.id)||g;return p.outcomes.categories[p.outcomes.categories.length-1]}function yi(){const e=Ue();return Math.floor((e.maxStreak||0)/ad)}function da(){var n;if(Ue().birthdayBonus2026Used)return 0;const t=((n=p.theme)==null?void 0:n.timezone)||"UTC";return Q(t)==="2026-05-29"?1:0}function ca(){const e=Ue();return Math.max(0,yi()-(e.used||0))+da()}function wn(){var u;const e=G(),t=((u=p.theme)==null?void 0:u.timezone)||"UTC",a=Q(t),n=new Set(Y().filter(g=>g.token===e&&g.day<=a).map(g=>g.day));if(!n.size)return null;const r=[...n].sort()[0],[i,o,s]=a.split("-").map(Number),l=new Date(Date.UTC(i,o-1,s));let c=a;for(n.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));n.has(c)||hi(c);)l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return c<r?null:c}function wi(){return ca()>0&&wn()!==null}function ac(e){if(ca()<=0)return null;const t=wn();if(!t)return null;const a=G(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,i=[n,...Y()].filter(c=>{const u=`${c.day}|${c.token}`;return r.has(u)?!1:(r.add(u),!0)}).sort((c,u)=>c.day<u.day?1:c.day>u.day?-1:0);Ie(i);const o=Ue(),l=Math.max(0,yi()-(o.used||0))===0&&da()>0;return na({...o,used:l?o.used||0:(o.used||0)+1,birthdayBonus2026Used:l?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),gn(He()),t}const xi=new Map;function Ge(e){xi.set(e,Date.now())}function xn(e,t=6e3){const a=xi.get(e);return typeof a=="number"&&Date.now()-a<t}function Mt(){var e;return Q(((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function vi(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:G()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function nc(e){if(!e||typeof e!="object"||xn("stimmung"))return;const t=Mt();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){dt()&&(Li(),vn());return}dt()!==a&&(Si(a),zt(a))}function ki(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(i,o)=>Math.round(o+(i-o)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function zt(e){document.body.style.background=ki(e),Ei(e)}function vn(){document.body.style.removeProperty("background"),Ei(null)}function dt(){try{const e=localStorage.getItem(Xa);if(!e)return null;const t=JSON.parse(e);return t.day!==Mt()?null:t.hex||null}catch{return null}}function Si(e){try{localStorage.setItem(Xa,JSON.stringify({day:Mt(),hex:e}))}catch{}}function rc(e){const t=Mt();Si(e),Ge("stimmung"),vi(t,e)}function Li(){try{localStorage.removeItem(Xa)}catch{}}function ic(){const e=Mt();Li(),Ge("stimmung"),vi(e,"")}function oc(){const e=dt();e&&zt(e)}function Ei(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Ti(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=dt()||"#4aaa5a";$i(e,t),kn(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function sc(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=dt();t?zt(t):vn()}function lc(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function i(o){kn(e,o),zt(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),i(t.value)}),a&&a.addEventListener("input",()=>{const o=Ci(a.value);o&&(t&&(t.value=o),i(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||Ci((a==null?void 0:a.value)||"")||"#4aaa5a";rc(o),zt(o),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{ic(),vn(),$i(e,"#4aaa5a"),kn(e,"#4aaa5a")})}function $i(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function kn(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=ki(t))}function Ci(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,i]=a;return`#${n}${n}${r}${r}${i}${i}`.toLowerCase()}return null}let Sn="",Ln=null;function dc(e,t){Sn=e,Ln=t}function En(){if(Ln)return Ln();if(!Sn)return window.location.href;try{return new URL(Sn,window.location.href).toString()}catch{return window.location.href}}function Me(e,t=null){const a=new URL(e,En()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function ga(e){var t;try{const a=k&&k.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=p.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function At(){var e;try{const t=p.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=G(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,i=setTimeout(()=>r.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(i)}if(!o.ok)return ga(!1),!1;const s=await o.json();if(!s.ok)return ga(!1),!1;const l=Q(((e=p.theme)==null?void 0:e.timezone)||"UTC"),c=Y(),u=c.filter(w=>w.title!=="(wiederhergestellt)"&&w.day<=l);u.length!==c.length&&Ie(u);const g=Re(),b=g.filter(w=>w.day<=l);if(b.length!==g.length&&Qt(b),Array.isArray(s.history)&&s.history.length){const w=Y(),m=new Map(w.map(y=>[`${y.day}|${y.token}`,y]));for(const y of s.history){if(y.title==="(wiederhergestellt)")continue;const E=pd(y.day);if(!E||E>l)continue;const _=typeof y.token=="string"?y.token.toLowerCase():y.token,C=`${E}|${_}`,v={...y,day:E,token:_},z=m.get(C);z&&z.bestanden&&!v.bestanden&&(v.bestanden=!0,v.bestandenAt=z.bestandenAt||null),z&&z.beweisUrl&&!v.beweisUrl&&(v.beweisUrl=z.beweisUrl),z&&z.reaction&&!v.reaction&&(v.reaction=z.reaction),z&&z.weather&&!v.weather&&(v.weather=z.weather),z&&z.pfand&&!v.pfand&&(v.pfand=!0),z&&z.revealedAt&&!v.revealedAt&&(v.revealedAt=z.revealedAt),m.set(C,v)}const f=Array.from(m.values()).sort((y,E)=>E.day.localeCompare(y.day));Ie(f),p.syncedHistory=f,gn(He())}if(Array.isArray(s.favourites)&&s.favourites.length){const w=Re(),m=new Map(w.map(f=>[`${f.day}|${f.token}`,f]));for(const f of s.favourites){if(f.day>l)continue;const y=typeof f.token=="string"?f.token.toLowerCase():f.token;m.set(`${f.day}|${y}`,{...f,token:y})}Qt(Array.from(m.values()).sort((f,y)=>y.day.localeCompare(f.day)))}if(s.tokens&&typeof s.tokens=="object"&&wd(s.tokens)&&we(),typeof s.questPoints=="number"&&s.questPoints>oa()&&Cd(s.questPoints),typeof s.streak=="number"&&s.streak>0&&Td(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const w=un();let m=!1;for(const[f,y]of Object.entries(s.baerlauchScores))typeof y=="number"&&y>(w[f]||0)&&(w[f]=y,m=!0);if(m)try{localStorage.setItem(Fr,JSON.stringify(w))}catch{}}if(typeof s.pfand=="number")try{Od(s.pfand)}catch{}if(Array.isArray(s.flaschenpost))try{Gd(s.flaschenpost)}catch{}if(Array.isArray(s.hugs))try{ui(s.hugs)}catch{}if(Array.isArray(s.wishes))try{Nd(s.wishes)}catch{}if(typeof s.latestPing=="string"&&s.latestPing)try{const w=window.localStorage.getItem(qr)||"";s.latestPing>w&&(window.localStorage.setItem(qr,s.latestPing),p._newPing=!0)}catch{}if(s.stimmung)try{nc(s.stimmung)}catch{}if(Array.isArray(s.gipfelbuch)&&!xn("gipfelbuch")){const w=s.gipfelbuch.filter(m=>m.id).sort((m,f)=>(f.date||"").localeCompare(m.date||""));ia(w)}return k&&k.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),ga(!0),Array.isArray(s.history)?s.history.length:0}catch{return ga(!1),-1}}function we(){try{const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=G(),a=Y().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=Re().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=ot(),i=Ct(()=>Zt(p)),o=i.solved&&i.pointsEarned&&!i._logged?{challenge:Xt(p),attempts:i.attempts,points:i.pointsEarned,period:i.period}:void 0;o&&(i._logged=!0,pn(i));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:He(),tokens:r,questPoints:oa(),flaschenpost:lt(),pfand:st().count||0,...o?{questLog:o}:{}}),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,l).then(()=>{aa(r)}).catch(()=>fetch(e.endpointUrl,{...l,mode:"no-cors"}).then(()=>{aa(r)}).catch(()=>{}))}catch{}}function S(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const Mi={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function cc(e){S(Mi[e]||Mi.soft)}const gc=20,uc=5;function pc(e){return e>=gc||e<uc}const fc=56,hc=700;function mc(e,t,a){return a<=hc&&Math.hypot(e,t)>=fc}let tt=!1,ua=null,ze=null,Tn=null;function bc(){return tt}function yc({onChange:e}={}){tt||(tt=!0,Tn=e||null,ze=document.querySelector("[data-ag-candle-veil]"),ze&&(ze.hidden=!1,ze.classList.remove("is-blown"),requestAnimationFrame(()=>ze.classList.add("is-lit")),wc(ze,(t,a)=>$n({dx:t,dy:a}))),document.documentElement.classList.add("is-candle"),S([10,40,10]),Promise.resolve().then(()=>mt).then(t=>{ua=t.startCandleLights()}).catch(()=>{}),e&&e(!0))}function $n({dx:e=0,dy:t=-1}={}){if(!tt)return;tt=!1;const a=Tn;if(Tn=null,ze){ze.style.setProperty("--ag-blow-x",`${Math.max(-1,Math.min(1,e/120)).toFixed(2)}`),ze.style.setProperty("--ag-blow-y",`${Math.max(-1,Math.min(1,t/120)).toFixed(2)}`),ze.classList.add("is-blown"),ze.classList.remove("is-lit");const n=ze;setTimeout(()=>{tt||(n.hidden=!0,n.classList.remove("is-blown"))},900)}if(document.documentElement.classList.remove("is-candle"),S([30,20,10]),ua){try{ua()}catch{}ua=null}a&&a(!1)}function wc(e,t){var n;if(e.dataset.bound)return;e.dataset.bound="1";let a=null;e.addEventListener("pointerdown",r=>{a={x:r.clientX,y:r.clientY,t:performance.now()}}),e.addEventListener("pointerup",r=>{if(!a)return;const i=r.clientX-a.x,o=r.clientY-a.y,s=performance.now()-a.t;a=null,mc(i,o,s)&&t(i,o)}),e.addEventListener("pointercancel",()=>{a=null}),(n=e.querySelector("[data-ag-candle-out]"))==null||n.addEventListener("click",()=>t(0,-1)),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&tt&&$n({})})}const pa=29.530588853,xc=Date.UTC(2e3,0,6,18,14),zi=864e5;function vc(e=new Date){const n=(((e instanceof Date?e.getTime():Date.parse(e))-xc)/zi%pa+pa)%pa,r=n/pa,i=(1-Math.cos(2*Math.PI*r))/2;return{age:n,phase:r,illumination:i}}const kc=["Neumond","Zunehmende Sichel","Erstes Viertel","Zunehmender Mond","Vollmond","Abnehmender Mond","Letztes Viertel","Abnehmende Sichel"];function Sc(e){return Math.round(e*8)%8}const fa=e=>e*Math.PI/180;function Lc(e){const t=Math.floor(e)+.5,a=t/1236.85,n=245155009766e-5+29.530588861*t+15437e-8*a*a-15e-8*a**3+73e-11*a**4,r=1-.002516*a-74e-7*a*a,i=fa(2.5534+29.1053567*t-14e-7*a*a-11e-8*a**3),o=fa(201.5643+385.81693528*t+.0107582*a*a+1238e-8*a**3-58e-9*a**4),s=fa(160.7108+390.67050284*t-.0016118*a*a-227e-8*a**3+11e-9*a**4),l=fa(124.7746-1.56375588*t+.0020672*a*a+215e-8*a**3),c=Math.sin,u=-.40614*c(o)+.17302*r*c(i)+.01614*c(2*o)+.01043*c(2*s)+.00734*r*c(o-i)-.00515*r*c(o+i)+.00209*r*r*c(2*i)-.00111*c(o-2*s)-57e-5*c(o+2*s)+56e-5*r*c(2*o+i)-42e-5*c(3*o)+42e-5*r*c(i+2*s)+38e-5*r*c(i-2*s)-24e-5*r*c(2*o-i)-17e-5*c(l)-7e-5*c(o+2*i)+4e-5*c(2*o-2*s)+4e-5*c(3*i)+3e-5*c(o+i-2*s)+3e-5*c(2*o+2*s)-3e-5*c(o+i+2*s)+3e-5*c(o-i+2*s)-2e-5*c(o-i-2*s)-2e-5*c(3*o+i)+2e-5*c(4*o),g=n+u;return new Date((g-24405875e-1)*zi)}function Ec(e,t){try{return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}catch{return e.toISOString().slice(0,10)}}function Tc(e,t="Europe/Zurich"){const a=Date.parse(`${e}T12:00:00Z`);if(isNaN(a))return!1;const n=new Date(a).getUTCFullYear()+(new Date(a).getUTCMonth()+.5)/12,r=Math.floor((n-2e3)*12.3685);for(const i of[r-1,r,r+1])if(Ec(Lc(i),t)===e)return!0;return!1}function $c(e,t=20){const a=(e%1+1)%1,n=a<=.5,r=Math.cos(2*Math.PI*a),i=Math.abs(r)*t,o=t,s=0,l=2*t,c=n?1:0,u=r<0,g=n?u?1:0:u?0:1;return`M${o},${s} A${t},${t} 0 0 ${c} ${o},${l} A${i.toFixed(2)},${t} 0 0 ${g} ${o},${s} Z`}const Ai=["🌕 Vollmondnacht. Die Kapsel hat im Mondlicht gelegen.","🌕 Heute ist Vollmond. Die Maschine hat etwas heller geleuchtet.","🌕 Vollmond über Zürich. Einmal rausschauen, bevor du schläfst."];function Cc(e){if(!Tc(e))return"";const t=e.split("-").reduce((a,n)=>a+Number(n),0);return Ai[t%Ai.length]}function Mc(e,{evening:t=!1,date:a=new Date}={}){if(!e)return;if(!t){e.innerHTML="",e.hidden=!0;return}const{phase:n,illumination:r}=vc(a),i=20;e.hidden=!1,e.title=`${kc[Sc(n)]} · ${Math.round(r*100)}%`,e.innerHTML=`<svg viewBox="0 0 ${2*i} ${2*i}" aria-hidden="true">
    <circle cx="${i}" cy="${i}" r="${i}" class="ag-moon-dark"/>
    <path d="${$c(n,i)}" class="ag-moon-lit"/>
  </svg>`,e.classList.toggle("is-full",r>.97)}function _i(e){const t=Array.isArray(p.specialDays&&p.specialDays.days)?p.specialDays.days:[],a=e.slice(5),n=G();for(const r of t){const i=r.repeat==="yearly";if((r.date===e||i&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}const Di=270;function zc(e,t){const a=Y().filter(n=>n.token===e&&n.day<t&&typeof n.categoryId=="string"&&n.categoryId!=="special").sort((n,r)=>r.day.localeCompare(n.day)).slice(0,Di);return a.length<Di?!1:!a.some(n=>n.categoryId==="jackpot")}function Ni(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Ac(e){const t=d("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function _t(){return(p.photos||[]).filter(e=>e.type!=="video")}const _c=4;function Dc(e,t){return Y().filter(a=>a.token===e&&a.day<t&&$t(a)&&!a.used).length}function Ii(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,i=G(),o=`${p.theme.secret}|${i}|${e}${r?"|"+r:""}`,s=_i(e);if(s&&!r){const v=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],z=v[rn(`${o}|special|outcome`,v.length)],B={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:v},U=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&p.photos.length&&_t().find(x=>x.alt===s.photoAlt)||null;return{day:e,token:i,category:B,outcome:z,photo:U,collectToken:z.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const l=r?null:kd(i,e),c=r?null:Y().find(v=>v.token===i&&v.day===e),u=!r&&(!c||c.categoryId==="flaschenpost")?Ud(e):null;if(u){const v=u.mode==="30"?"in 30 Tagen":"irgendwann";return{day:e,token:i,category:{id:"flaschenpost",label:"Flaschenpost 🍾",weight:0,tone:"warm",outcomes:[]},outcome:{title:"Post von dir selbst",message:`Versiegelt am ${ke(u.createdDay)}, mit „${v}“ drauf. Heute ist ${u.mode==="30"?"der dreissigste Tag":"irgendwann"}.

„${u.text}“`},photo:null,collectToken:null,voucher:!1,freikarte:!1,flaschenpost:u.id}}let g;l&&(g=p.outcomes.categories.find(v=>v.id===l.categoryId)),!g&&c&&c.categoryId&&(g=p.outcomes.categories.find(v=>v.id===c.categoryId)||null),g||(g=tc(`${o}|category`,t||0,n,{token:i,day:e}),!r&&zc(i,e)&&(g=p.outcomes.categories.find(v=>v.id==="jackpot")||g));const b=ud();if(b){const v=p.outcomes.categories.find(z=>z.id===b);v&&(g=v)}g.id==="photo"&&!_t().length&&(g=p.outcomes.categories.find(v=>v.id==="common")||g);const w=new Set(Y().filter(v=>v.token===i&&v.day<e&&v.categoryId===g.id).map(v=>v.title)),m=g.outcomes.filter(v=>!w.has(v.title));let f=m.length?m:g.outcomes;if(!r&&Dc(i,e)>=_c){const v=f.filter(z=>z.voucher!==!0);v.length&&(f=v)}const E=(c&&c.categoryId===g.id?g.outcomes.find(v=>v.title===c.title):null)||l&&g.outcomes.find(v=>v.title===l.outcomeTitle)||f[rn(`${o}|${g.id}|outcome`,f.length)],_=_t();let C=null;if(g.id==="photo"&&_.length){const v=new Set(Y().filter(U=>U.token===i&&U.day<e&&U.photo).map(U=>U.photo.url)),z=_.filter(U=>!v.has(U.url)),B=z.length>0?z:_;C=B[rn(`${o}|photo`,B.length)]}return{day:e,token:i,category:g,outcome:E,photo:C,collectToken:E.token||null,voucher:E.voucher||!1,freikarte:E.freikarte===!0}}function Nc(){const e=re()||Q(p.theme.timezone),t=He();return Ii(e,t)}function Ic(e,t){return Ii(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function Pc(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Bc(e){const t=(r,i)=>k.style.setProperty(r,i),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Pi={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Bi={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function jc(e){const t=_i(e);if(!t)return;const a=(n,r)=>k.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))Pi[n]&&typeof r=="string"&&a(Pi[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))Bi[n]&&typeof r=="string"&&a(Bi[n],r)}const Fc=`
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
      .ag-history-date{color:var(--ag-muted);font-size:.78rem;font-weight:500;letter-spacing:.04em;text-transform:uppercase}
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
/* The palette bar: the firmware's 30 tints, tap to set. */
.ag-widget .ag-licht-palette{
  position:relative;height:30px;border-radius:999px;cursor:pointer;outline:none;
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
.ag-widget .ag-morse-dots i{width:8px;height:8px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 8px rgba(255,220,120,.6);animation:ag-pop 220ms var(--ag-ease) both}

/* ── Sonnenaufgang ─────────────────────────────────────────────────────── */
.ag-widget .ag-sunrise{padding:12px;border-radius:var(--ag-radius-md);background:linear-gradient(135deg,rgba(255,120,60,.10),rgba(255,210,140,.06));border:1px solid rgba(255,170,100,.22)}
.ag-widget .ag-sunrise-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ag-widget .ag-sunrise-title{font-size:.9rem;margin-right:auto}
.ag-widget .ag-sunrise-time,.ag-widget .ag-sunrise-days{
  font-family:inherit;font-size:.86rem;color:var(--ag-text);background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:6px 8px;
}
.ag-widget .ag-sunrise-time{color-scheme:dark}
.ag-widget .ag-sunrise-toggle{
  appearance:none;font-family:inherit;cursor:pointer;width:52px;height:34px;border-radius:999px;font-size:.78rem;
  color:var(--ag-muted);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
}
.ag-widget .ag-sunrise-toggle.is-on{color:#2a1500;background:#ffb26b;border-color:#ffb26b;box-shadow:0 0 16px rgba(255,178,107,.35)}
.ag-widget .ag-sunrise-toggle:disabled,.ag-widget .ag-sunrise-time:disabled,.ag-widget .ag-sunrise-days:disabled{opacity:.45;cursor:default}
.ag-widget .ag-sunrise-note{margin:8px 0 0;font-size:.74rem;line-height:1.45;color:var(--ag-muted)}
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
.ag-widget .ag-moon-line{margin:-4px 0 10px;font-size:.86rem;color:var(--ag-muted);font-style:italic}

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
.ag-widget .ag-switch-input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.ag-widget .ag-switch{position:relative;flex:none;width:44px;height:26px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.14);transition:background 180ms ease,border-color 180ms ease}
.ag-widget .ag-switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#f1e9d2;box-shadow:0 2px 4px rgba(0,0,0,.4);transition:transform 180ms cubic-bezier(.3,1.4,.4,1)}
.ag-widget .ag-switch-input:checked + .ag-switch{background:var(--ag-primary);border-color:transparent}
.ag-widget .ag-switch-input:checked + .ag-switch::after{transform:translateX(18px)}
.ag-widget .ag-switch-input:focus-visible + .ag-switch{outline:2px solid var(--ag-gold);outline-offset:2px}
.ag-widget .ag-setting-text{display:flex;flex-direction:column;gap:2px;min-width:0;font-size:.9rem}
.ag-widget .ag-setting-text strong{font-weight:500}
.ag-widget .ag-setting-text small{font-size:.74rem;color:var(--ag-muted);line-height:1.35}
    `;function Oc(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=Fc.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function qc(){return`
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
    `}function Wc(){return`
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
    `}const Rc=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${qc()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${Wc()}
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
              <p class="ag-moon-line" data-ag-moon-line hidden></p>
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
                <input class="ag-berge-input" type="text" data-ag-licht-scene-name placeholder="So wie jetzt — als Szene sichern…" maxlength="32" autocomplete="off" disabled>
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
              <div class="ag-sunrise" data-ag-sunrise>
                <div class="ag-sunrise-row">
                  <span class="ag-sunrise-title">🌅 Sonnenaufgang</span>
                  <input class="ag-sunrise-time" type="time" value="07:00" data-ag-sunrise-time aria-label="Uhrzeit" disabled>
                  <select class="ag-sunrise-days" data-ag-sunrise-days aria-label="Tage" disabled>
                    <option value="werktags">Mo–Fr</option>
                    <option value="taeglich">täglich</option>
                    <option value="wochenende">Sa+So</option>
                  </select>
                  <button class="ag-sunrise-toggle" type="button" data-ag-sunrise-toggle aria-pressed="false" disabled>aus</button>
                </div>
                <p class="ag-sunrise-note" data-ag-sunrise-note>Zwanzig Minuten von tiefem Rot zu Warmweiss, auf den Lampen, die oben gewählt sind.</p>
              </div>
              <div class="ag-licht-foot ag-licht-foot-single">
                <a class="ag-secondary ag-link" href="./lichter.html">Alle Einstellungen ›</a>
              </div>
              <p class="ag-licht-note">Beide Lampen hängen am selben Draht: was du hier stellst, sieht Fionn bei sich. Alarme, Gruppen, WLAN und Neustart wohnen auf der grossen Seite.</p>
            </div>
          </section>
          <div class="ag-settings" data-ag-settings>
            <label class="ag-setting-row">
              <input class="ag-switch-input" type="checkbox" data-ag-lights-toggle checked>
              <span class="ag-switch" aria-hidden="true"></span>
              <span class="ag-setting-text"><strong>💡 Lampen reagieren auf die App</strong><small>Kapselzug, Reaktion, Notfall-Umarmung. Aus: die Lampen bleiben ruhig. Licht-Tab und Kerze bleiben.</small></span>
            </label>
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
    `;function Uc(){k.className="ag-widget",k.setAttribute("aria-labelledby","ag-title"),k.innerHTML=Rc}function Hc(e,t=1400,a=.82){return new Promise((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);try{const s=Math.min(1,t/Math.max(o.naturalWidth||1,o.naturalHeight||1)),l=Math.max(1,Math.round((o.naturalWidth||1)*s)),c=Math.max(1,Math.round((o.naturalHeight||1)*s)),u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(o,0,0,l,c);const g=u.toDataURL("image/jpeg",a);if(!g||g==="data:,"){r(new Error("encode failed"));return}n(g)}catch(s){r(s)}},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("decode failed"))},o.src=i})}async function Gc(e,t,a){const n=p.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await Hc(a),i=r.slice(r.indexOf(",")+1),o=new AbortController,s=setTimeout(()=>o.abort(),3e4);let l;try{l=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:o.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:i})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await l.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function Se(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let i=0;i<e;i++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,c=Math.random()*100,u=Math.random()*.6,g=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${g}s ${u}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const i=document.createElement("style");i.id="ag-confetti-style",i.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(i)}setTimeout(()=>r.remove(),3e3)}const ct=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?","Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?","Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?","Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?","Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?","Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?","Welches Lied erinnert dich an uns, ohne dass ich das je wusste?","Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?","Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?","Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?","Woran merkst du, dass ich gerade einen guten Tag habe?","Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?","Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?","Was ist etwas, das du als Kind geliebt hast und heute vergisst?","Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?","Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?","Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?","Welcher Streit war im Nachhinein der nützlichste?","Was macht dich an mir manchmal nervös, und ist das schlimm?","Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?","Was ist dein Lieblingsbild von uns, und warum genau das?","Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?","Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?","Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?","Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?","Was wünschst du dir für mich, das nichts mit dir zu tun hat?","Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?","Was war das Erste, das dir an meiner Wohnung aufgefallen ist?","Welche Angewohnheit von mir hast du inzwischen übernommen?","Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?","Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?","Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?","Welcher Geruch gehört für dich zu mir?","Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?","Worauf freust du dich im Winter, worauf im Sommer?","Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?","Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?","Wann hast du zuletzt gedacht: genau das hier, so soll es sein?","Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?","Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?","Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?","Welchen Teil deines Alltags würdest du mir gern öfter zeigen?","Was glaubst du, worin ich dich unterschätze?","Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?","Welche Jahreszeit passt zu uns, und warum?","Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?","Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?","Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?","Was ist eine Tradition, die wir uns ausdenken sollten?","Was macht dich zuverlässig fröhlich, und mache ich davon genug?","Welche Seite von dir glaubst du, kenne ich noch gar nicht?","Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?","Was wäre dein perfekter Sonntagmorgen, bis ins Detail?","Was ist eine Sache, über die wir nie reden, und sollten wir?","Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?","Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?","Was würdest du gern öfter von mir hören?","Welche Ecke von Zürich fühlt sich am meisten nach uns an?","Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?","Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?","Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"],ji=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]];let ha=-1;function Fi(){const e=d("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Or);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<ct.length){ha=a;const n=d("#ag-gesprach-question");n&&(n.textContent=ct[a]);return}}}catch{}Oi()}}function Kc(){const e=d("#ag-gesprach-panel");e&&(e.hidden=!0)}function Oi(){let e;do e=Math.floor(Math.random()*ct.length);while(e===ha&&ct.length>1);ha=e;try{localStorage.setItem(Or,String(e))}catch{}const t=d("#ag-gesprach-question");t&&(t.textContent=ct[e])}function Yc(){const e=ct[ha]||"";if(!e)return;const t=p.theme&&p.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function qi(){var e;return!!((e=p.quest)!=null&&e.enabled&&Xt(p))}function Wi(){const e=d("#ag-quest-panel");e&&(e.hidden=!1,Ri())}function Vc(){const e=d("#ag-quest-panel");e&&(e.hidden=!0)}function Ri(){const e=Xt(p),t=Ct(),a=d("#ag-quest-challenge"),n=d("#ag-quest-hint-history"),r=d("#ag-quest-loading"),i=d("#ag-quest-actions"),o=d("#ag-quest-result"),s=d("#ag-quest-points"),l=d("#ag-quest-copy"),c=d("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),i&&(i.hidden=!0);return}if(a&&(a.textContent=u),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((g,b)=>`<div class="ag-hint-item"><span class="ag-hint-num">${b+1}</span><p>${g}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),i&&(i.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${oa()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),i&&(i.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Jc(e){if(!e)return;const t=d("#ag-quest-actions"),a=d("#ag-quest-loading"),n=d("#ag-quest-result"),r=d("#ag-quest-points"),i=d("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await Zc(e),s=Ct(),l=Xt(p),c=(l==null?void 0:l.prompt)||"",u=(l==null?void 0:l.solution)||"";try{const g=await Xc(o,c,u,s.attempts+1,s.hints);if(s.attempts+=1,g.success){const b=Ur[Math.min(s.attempts-1,Ur.length-1)],w=$d(b);s.solved=!0,s.pointsEarned=b,s.successMessage=g.message||"Perfekt.",pn(s),we(),n&&(n.textContent=g.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${b} Punkte · Gesamt: ${w}`,r.hidden=!1),a&&(a.hidden=!0),i&&(i.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const m=d("#ag-btn-quest");m&&m.classList.remove("ag-chip-quest-active"),S([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],g.hint||"Versuch nochmal."],pn(s),Ri()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Zc(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Xc(e,t,a,n,r){var s;const i=(s=p.quest)==null?void 0:s.proxyUrl;if(!i)throw new Error("no proxy");const o=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!o.ok)throw new Error("proxy error");return o.json()}function Qc(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let c=0;c<n;c++)i[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(l),l.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,u,g,b,w])=>{const m=t.createOscillator();m.type="sine",m.frequency.setValueAtTime(c,a+g),m.frequency.exponentialRampToValueAtTime(u,a+g+b*.55);const f=t.createGain();f.gain.setValueAtTime(0,a+g),f.gain.linearRampToValueAtTime(w,a+g+.09),f.gain.exponentialRampToValueAtTime(.001,a+g+b),m.connect(f),f.connect(t.destination),m.start(a+g),m.stop(a+g+b+.05)})}catch{}}function eg(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const i=document.createElement("span");i.className="ag-letter-word",i.textContent=n,i.style.animationDelay=`${320+r*155}ms`,a.appendChild(i),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Ui(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}const Hi="affektions-gacha:letter-opened:v1",tg=10;function ag(){try{return localStorage.getItem(Hi)==="yes"}catch{return!1}}function ng(e){return ag()?!1:e>0&&e%tg===0}const rg="Psst: Der Knopf hat ein Geheimnis. Drei Sekunden lang halten. 🍀";function Cn(){const e=d("#ag-letter-overlay");if(!e)return;try{localStorage.setItem(Hi,"yes")}catch{}e.hidden=!1,e.focus(),S([20,60,20]),Qc();const t=d("#ag-letter-photo");if(t&&p.photos&&p.photos.length){const a=_t(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}ig()}async function ig(){var n;const e=d("#ag-letter-body");if(!e)return;eg(e);const t=(n=p.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const i=await r.json();if(i.paragraphs&&i.paragraphs.length){Ui(e,i.paragraphs);return}}}catch{}const a=ji[Math.floor(Math.random()*ji.length)];Ui(e,a)}function Mn(){const e=d("#ag-letter-overlay");e&&(e.hidden=!0)}const Gi="affektions-gacha:wetter:v1",og=30*60*1e3,sg=5e3;function zn(e,t=!0){const a=Number(e);return a===0?t?"☀️":"🌙":a===1?t?"🌤":"🌙":a===2?t?"⛅":"☁️":a===3?"☁️":a===45||a===48?"🌫":a>=51&&a<=57?"🌦":a>=61&&a<=67?"🌧":a>=71&&a<=77?"🌨":a>=80&&a<=82?"🌧":a===85||a===86?"🌨":a>=95&&a<=99?"⛈":"🌡"}function lg(e){const t=Number(e);return t>=51&&t<=67||t>=80&&t<=82?"rain":t>=71&&t<=77||t===85||t===86?"snow":t===45||t===48?"fog":t>=95?"storm":null}function Ki(e){return!e||typeof e.t!="number"?"":`${Math.round(e.t)}° ${e.e||zn(e.c,e.d!==!1)}`}function dg(){try{const e=localStorage.getItem(Gi);if(!e)return null;const t=JSON.parse(e);return t&&typeof t.t=="number"&&typeof t.at=="number"?t:null}catch{return null}}function cg(e){try{localStorage.setItem(Gi,JSON.stringify(e))}catch{}}async function Yi({force:e=!1}={}){const t=p.theme&&p.theme.weather;if(!t||typeof t.latitude!="number"||typeof t.longitude!="number")return null;const a=dg();if(a&&!e&&Date.now()-a.at<og)return p.weather=a,a;const n=`https://api.open-meteo.com/v1/forecast?latitude=${t.latitude}&longitude=${t.longitude}&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(p.theme.timezone||"Europe/Zurich")}`,r=new AbortController,i=setTimeout(()=>r.abort(),sg);try{const o=await fetch(n,{cache:"no-store",signal:r.signal});if(!o.ok)throw new Error("weather "+o.status);const s=await o.json(),l=s&&s.current;if(!l||typeof l.temperature_2m!="number")throw new Error("weather shape");const c={t:l.temperature_2m,c:Number(l.weather_code)||0,d:l.is_day!==0,at:Date.now()};return c.e=zn(c.c,c.d),cg(c),p.weather=c,c}catch{return a?(p.weather=a,a):null}finally{clearTimeout(i)}}function gg(e){return!e||typeof e.t!="number"?null:{t:Math.round(e.t*10)/10,c:e.c,e:e.e||zn(e.c,e.d!==!1)}}const ug=["is-raining","is-snowing","is-foggy","is-stormy"];function pg(e){if(!k)return;for(const a of ug)k.classList.remove(a);const t=e?lg(e.c):null;t==="rain"&&k.classList.add("is-raining"),t==="snow"&&k.classList.add("is-snowing"),t==="fog"&&k.classList.add("is-foggy"),t==="storm"&&k.classList.add("is-stormy","is-raining")}function j(e){const t=k.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}let An=null;function Vi(){if(!An)try{An=new(window.AudioContext||window.webkitAudioContext)}catch{}return An}function Ji(){try{return window.localStorage.getItem(ed)!=="off"}catch{return!0}}function se(e,t,a,n,r=.15,i="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=i,o.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(r,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),o.start(l),o.stop(l+n+.05)}function ma(e){if(!Ji())return;const t=Vi();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":se(t,280,0,.18,.08,"sine"),se(t,210,.12,.22,.06,"sine");break;case"cursed":se(t,220,0,.12,.1,"triangle"),se(t,170,.09,.28,.07,"triangle");break;case"uncommon":se(t,523,0,.14,.14,"sine"),se(t,784,.1,.22,.12,"sine");break;case"rare":se(t,523,0,.12,.14,"sine"),se(t,659,.09,.12,.14,"sine"),se(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>se(t,a,n*.09,.18,.13,"sine")),se(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>se(t,a,n*.08,.16,.13,"sine")),se(t,2093,.45,.5,.05,"sine");break;default:se(t,523,0,.12,.13,"sine"),se(t,659,.09,.18,.1,"sine");break}}function ba(){if(!Ji())return;const e=Vi();e&&(e.state==="suspended"&&e.resume().catch(()=>{}),se(e,1760,0,.09,.1,"triangle"),se(e,2637,.05,.14,.07,"sine"),se(e,1319,.11,.22,.05,"sine"))}function _n(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function fg(e,t){if(!e)return;const a=e.parentNode&&e.parentNode.querySelector("[data-ag-ink-hint]");if(!t){e.classList.remove("ag-ink","is-held"),a&&(a.hidden=!0);return}e.classList.add("ag-ink"),e.classList.remove("is-held");let n=0;const r=document.createTreeWalker(e,4),i=[];for(;r.nextNode();)i.push(r.currentNode);for(const s of i){const l=document.createDocumentFragment();for(const c of s.nodeValue){const u=document.createElement("span");u.className="ag-ink-ch",u.textContent=c,u.style.setProperty("--i",String(n++)),l.appendChild(u)}s.parentNode.replaceChild(l,s)}let o=a;if(o||(o=document.createElement("p"),o.className="ag-ink-hint",o.setAttribute("data-ag-ink-hint",""),e.parentNode.insertBefore(o,e)),o.hidden=!1,o.textContent="🫥 Geheimtinte — Finger auf den Text legen",!e.dataset.inkBound){e.dataset.inkBound="1";const s=()=>{e.classList.contains("ag-ink")&&(e.classList.add("is-held"),S(6))},l=()=>e.classList.remove("is-held");e.addEventListener("pointerdown",s),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("pointerleave",l)}}const Dn=["Lieblingsmensch","Sternschnuppe","Heimathafen","Gleichklang","Morgenlicht","Fernweh","Herzklopfen","Nachtfalter","Kuschelwetter","Augenblick","Geborgenheit","Sommersprosse","Lichtblick","Zuhause","Wegbegleiter","Glühwürmchen","Nähe","Du","Nachtschwärmer","Sanft","Wir"];function hg(e=Math.random()){return Dn[Math.floor(e*Dn.length)%Dn.length]}function mg(e){e.addEventListener("click",()=>{!k||!k.classList.contains("is-evening")||(e.classList.add("is-flare"),setTimeout(()=>e.classList.remove("is-flare"),900),S(6),j(`✨ ${hg()}`))})}function Zi(e,t){if(!k)return;const a=k.querySelector('.ag-bottomnav-btn[data-ag-tab="today"] .ag-bottomnav-btn-icon');if(!t||!a||_n()){ba();return}const n=t.getBoundingClientRect(),r=a.getBoundingClientRect(),i=document.createElement("div");i.className="ag-coin",i.textContent=e,i.style.left=`${n.left+n.width/2}px`,i.style.top=`${n.top+n.height/2}px`,document.body.appendChild(i);const o=r.left+r.width/2-(n.left+n.width/2),s=r.top+r.height/2-(n.top+n.height/2),l=i.animate([{transform:"translate(-50%,-50%) scale(1) rotateY(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(o*.45).toFixed(0)}px), calc(-50% + ${(s*.35-110).toFixed(0)}px)) scale(1.35) rotateY(200deg)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${o.toFixed(0)}px), calc(-50% + ${s.toFixed(0)}px)) scale(0.25) rotateY(560deg)`,opacity:.15}],{duration:950,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});l.onfinish=()=>{i.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),ba(),S([10,50,22]),Promise.resolve().then(()=>mt).then(c=>c.flashLightsForPull("uncommon")).catch(()=>{})}}function bg(e){if(!k||!e||p.foldedFor===e.day)return;const t=d("[data-ag-result]"),a=k.querySelector('.ag-bottomnav-btn[data-ag-tab="history"] .ag-bottomnav-btn-icon');if(!t||t.hidden||!a||(p.foldedFor=e.day,_n()))return;const n=t.getBoundingClientRect(),r=window.innerHeight||800,i=n.left+n.width/2,o=n.bottom<0||n.top>r?r/2:Math.max(60,Math.min(r-60,n.top+Math.min(n.height,r)/2)),s=a.getBoundingClientRect(),l=document.createElement("div");l.className="ag-envelope",l.textContent="✉️",l.style.left=`${i}px`,l.style.top=`${o}px`,document.body.appendChild(l);const c=s.left+s.width/2-i,u=s.top+s.height/2-o,g=l.animate([{transform:"translate(-50%,-50%) scale(2.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1.4)",opacity:1,offset:.25},{transform:`translate(calc(-50% + ${c.toFixed(0)}px), calc(-50% + ${u.toFixed(0)}px)) scale(0.3)`,opacity:.2}],{duration:720,easing:"cubic-bezier(.4,.6,.3,1)",fill:"forwards"});g.onfinish=()=>{l.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),S(8)}}const Xi=/[\p{L}\p{M}’'-]/u;function yg(e,t){if(typeof e!="string"||!e.length)return"";let a=Math.min(Math.max(t,0),e.length),n=a;for(;a>0&&Xi.test(e[a-1]);)a--;for(;n<e.length&&Xi.test(e[n]);)n++;return e.slice(a,n).replace(/^[-'’]+|[-'’]+$/g,"")}function wg(e,t){let a=null,n=0;try{if(document.caretPositionFromPoint){const r=document.caretPositionFromPoint(e,t);r&&(a=r.offsetNode,n=r.offset)}else if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(e,t);r&&(a=r.startContainer,n=r.startOffset)}}catch{return""}return!a||a.nodeType!==3?"":yg(a.nodeValue,n)}function xg(e,t){if(!e||e.dataset.wordBound)return;e.dataset.wordBound="1";let a=null,n=0,r=0;const i=()=>{a&&(clearTimeout(a),a=null)};e.addEventListener("pointerdown",o=>{e.classList.contains("ag-ink")||(n=o.clientX,r=o.clientY,i(),a=setTimeout(()=>{a=null;const s=wg(n,r);s&&s.length>=3&&t(s)},650))}),e.addEventListener("pointermove",o=>{a&&Math.hypot(o.clientX-n,o.clientY-r)>10&&i()}),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i),e.addEventListener("pointerleave",i),e.addEventListener("contextmenu",o=>{a&&o.preventDefault()})}const Nn=120;function vg(e,t,a){if(!e||!t||e.dataset.pfandBound)return;e.dataset.pfandBound="1";let n=!1,r=0,i=0,o=!1;const s=()=>{t.style.transition="transform 320ms cubic-bezier(.3,.7,.3,1.2), opacity 320ms ease",t.style.transform="",t.style.opacity="",setTimeout(()=>{t.style.transition=""},340),t.classList.remove("is-pfand-dragging")};e.addEventListener("pointerdown",c=>{n=!0,o=!1,r=c.clientY,i=0;try{e.setPointerCapture(c.pointerId)}catch{}t.style.transition="none",t.classList.add("is-pfand-dragging")}),e.addEventListener("pointermove",c=>{if(!n)return;i=Math.min(0,c.clientY-r),i<-6&&(o=!0);const u=Math.min(1,-i/Nn);t.style.transform=`translateY(${(i*.7).toFixed(0)}px) scale(${(1-.22*u).toFixed(3)})`,t.style.opacity=String(1-.35*u),e.classList.toggle("is-ready",-i>=Nn)});const l=()=>{if(n){if(n=!1,e.classList.remove("is-ready"),-i>=Nn){s(),a();return}s()}};e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("click",c=>{if(o){c.preventDefault();return}Promise.resolve().then(()=>eu).then(u=>{u.armConfirm(e,"Zurückgeben? Nochmal tippen")&&a()})})}function kg(e){if(!k)return;const t=k.querySelector(".ag-machine-wrap");if(!e||!t)return;const a=e.getBoundingClientRect(),n=t.getBoundingClientRect(),r=document.createElement("div");r.className="ag-pfand-capsule",r.style.left=`${a.left+a.width/2}px`,r.style.top=`${a.top+a.height/2}px`,document.body.appendChild(r);const i=n.left+n.width/2-(a.left+a.width/2),o=n.top+n.height*.55-(a.top+a.height/2);if(_n()){r.remove();return}const s=r.animate([{transform:"translate(-50%,-50%) scale(1) rotate(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(i*.5).toFixed(0)}px), calc(-50% + ${(o*.5-60).toFixed(0)}px)) scale(1.1) rotate(180deg)`,opacity:1,offset:.5},{transform:`translate(calc(-50% + ${i.toFixed(0)}px), calc(-50% + ${o.toFixed(0)}px)) scale(.3) rotate(420deg)`,opacity:.1}],{duration:820,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});s.onfinish=()=>{r.remove(),t.classList.add("is-gulp"),setTimeout(()=>t.classList.remove("is-gulp"),700),ba(),S([10,40,20])}}function In(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=Q(((e=p.theme)==null?void 0:e.timezone)||"UTC"),a=G(),r=Y().some(i=>i.token===a&&i.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}let Pn=null,Qi=!1;function Sg(e){if(!Pn||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));Pn(t,a)}function Lg(){Qi||(Qi=!0,window.addEventListener("deviceorientation",Sg,{passive:!0}),k&&k.classList.add("has-tilt"))}function Eg({onTilt:e}={}){if(Pn=e||null,typeof window>"u")return;const t=window.DeviceOrientationEvent;t&&typeof t.requestPermission!="function"&&Lg()}const ya={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function eo(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Tg(e){if(eo())return;const t=ya[e]||ya.soft;t.rumble!=="none"&&(k.classList.add("is-rumbling"),t.rumble==="hard"&&k.classList.add("is-rumbling-hard"))}function $g(){k.classList.remove("is-rumbling","is-rumbling-hard")}function Bn(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function to(e=0){const t=k.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function Cg(e){const t=ya[e]||ya.soft;if(eo()){Bn(t.flash);return}to(0),to(160),Bn(t.flash),t.double&&Bn(t.flash,260),t.shutter&&k.classList.add("is-shutter"),setTimeout(()=>k.classList.remove("is-shutter"),700);try{Se(t.particles,t.palette)}catch{}}const ao=360,Mg=45,zg=22;class Ag{constructor({locked:t=!1}={}){this.locked=t,this.wound=0,this.last=null,this.detents=0,this.fired=!1}move(t){if(this.last===null)return this.last=t,{detent:0,fired:!1};let a=t-this.last;for(;a>180;)a-=360;for(;a<=-180;)a+=360;if(this.last=t,this.fired)return{detent:0,fired:!1};const n=this.locked?zg:ao;this.wound=Math.min(n,Math.max(0,this.wound+a));const r=Math.floor(this.wound/Mg),i=r>this.detents?r-this.detents:0;this.detents=r;const o=!this.locked&&this.wound>=ao;return o&&(this.fired=!0),{detent:i,fired:o}}}function no(e,t,a){const n=e.getBoundingClientRect();return Math.atan2(a-(n.top+n.height/2),t-(n.left+n.width/2))*180/Math.PI}const _g=3e3,ro=8;function Dg(e,{drawable:t,onFire:a,onTick:n,onHold:r}={}){if(!e)return;let i=null,o=null;const s=()=>{clearTimeout(o),o=null},l=g=>e.style.setProperty("--ag-knob-angle",`${g.toFixed(1)}deg`),c=()=>{e.classList.add("is-springing"),l(0),setTimeout(()=>e.classList.remove("is-springing"),420)};e.addEventListener("pointerdown",g=>{if(g.button&&g.button!==0)return;g.preventDefault();const b=t?t():!0;i=new Ag({locked:!b}),i.move(no(e,g.clientX,g.clientY)),e.classList.remove("is-springing"),e.classList.add("is-turning"),e.classList.toggle("is-locked",!b);try{e.setPointerCapture(g.pointerId)}catch{}s(),r&&(o=setTimeout(()=>{i&&i.wound<ro&&(u(),r())},_g))}),e.addEventListener("pointermove",g=>{if(!i)return;const{detent:b,fired:w}=i.move(no(e,g.clientX,g.clientY));i.wound>=ro&&s(),l(i.wound),b&&(S(i.locked?4:6+i.detents),n&&n(i.detents,i.locked)),w&&(i=null,e.classList.remove("is-turning"),e.classList.add("is-fired"),S([20,30,50]),setTimeout(()=>{e.classList.remove("is-fired"),c()},500),a&&(!t||t())&&a())});const u=()=>{if(s(),!i)return;const g=i.locked&&i.wound>4;i=null,e.classList.remove("is-turning"),g&&S([8,30,8]),c()};e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u),e.addEventListener("lostpointercapture",u),e.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(!t||t())&&(g.preventDefault(),S(12),a&&a())})}const Z="#f1e9d2",te="rgba(241,233,210,.45)",ee="#e0a75d",wa="#8fcf9e",Ae="rgba(241,233,210,.12)",xe=`font-family:inherit;fill:${Z}`,Le=(e,t,a,n="")=>`<text x="${e}" y="${t}" style="${xe};font-size:11px;${n}">${a}</text>`,oe=(e,t,a,n="")=>`<text x="${e}" y="${t}" style="${xe};font-size:9px;fill:${te};${n}">${a}</text>`,_e=(e,t=160)=>`<svg viewBox="0 0 320 ${t}" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${e}</svg>`,Ng={kamera:()=>_e(`
    <rect x="30" y="56" width="260" height="64" rx="8" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
    <rect x="130" y="40" width="60" height="18" rx="4" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="34" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
    <circle cx="160" cy="118" r="24" fill="none" stroke="${te}" stroke-width="1"/>
    <circle cx="160" cy="118" r="14" fill="none" stroke="${te}" stroke-width="1"/>
    <circle cx="256" cy="64" r="14" fill="${Ae}" stroke="${ee}" stroke-width="1.5"/>
    <text x="256" y="67" text-anchor="middle" style="${xe};font-size:7px">500</text>
    <rect x="236" y="60" width="9" height="8" rx="1" fill="none" stroke="${ee}" stroke-width="1"/>
    <path d="M276 50 l16 -10" stroke="${Z}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="64" r="10" fill="none" stroke="${Z}" stroke-width="1.5"/>
    <path d="M62 54 v-8 h10" stroke="${Z}" stroke-width="1.5" fill="none"/>
    <rect x="200" y="58" width="22" height="10" rx="2" fill="none" stroke="${te}"/>
    ${oe(203,66,"24")}
    ${Le(312,26,"Zeitenrad + ASA-Fenster",`fill:${ee};text-anchor:end`)}
    <path d="M254 30 v18" stroke="${ee}" stroke-width="1" stroke-dasharray="2 2"/>
    ${Le(8,26,"Rückspulkurbel")}
    <path d="M60 30 v22" stroke="${te}" stroke-width="1" stroke-dasharray="2 2"/>
    ${oe(298,36,"Hebel")}
    ${oe(200,82,"Zählwerk")}
    ${Le(8,112,"Fokusring")}
    <path d="M58 108 h60" stroke="${te}" stroke-width="1" stroke-dasharray="2 2"/>
    ${Le(8,134,"Blendenring")}
    <path d="M70 130 h66" stroke="${te}" stroke-width="1" stroke-dasharray="2 2"/>
    ${Le(206,150,"FD- / FL-Objektiv")}
  `),einlegen:()=>_e(`
    <rect x="30" y="40" width="260" height="90" rx="8" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
    <rect x="44" y="52" width="36" height="66" rx="6" fill="none" stroke="${Z}" stroke-width="1.5"/>
    <circle cx="62" cy="85" r="5" fill="none" stroke="${te}"/>
    <path d="M80 70 h130 q10 0 10 10 v16" fill="none" stroke="${Z}" stroke-width="2.5" stroke-dasharray="6 3"/>
    <rect x="200" y="52" width="76" height="66" rx="6" fill="none" stroke="${ee}" stroke-width="1.5"/>
    ${oe(207,66,"QL",`fill:${ee};font-size:11px;font-weight:600`)}
    <path d="M226 84 v22" stroke="${ee}" stroke-width="3" stroke-linecap="round"/>
    ${[0,1,2,3,4,5,6].map(e=>`<rect x="${92+e*16}" y="60" width="5" height="4" fill="${te}"/><rect x="${92+e*16}" y="76" width="5" height="4" fill="${te}"/>`).join("")}
    ${Le(44,146,"Patrone links")}
    ${Le(290,146,"Anfang bis zur Marke","text-anchor:end")}
    ${oe(100,32,"Perforation auf den Zähnen")}
  `),iso:()=>_e(`
    ${[["100",50,.35],["200",125,.55],["400",200,.8],["800",275,1]].map(([e,t,a])=>`
      <rect x="${t-28}" y="${110-a*70}" width="56" height="${a*70}" rx="6" fill="${wa}" opacity="${.35+a*.5}"/>
      <text x="${t}" y="128" text-anchor="middle" style="${xe};font-size:12px">${e}</text>`).join("")}
    ${[88,163,238].map(e=>`<path d="M${e-6} 24 h12" stroke="${ee}" stroke-width="1.5"/><path d="M${e} 18 v12" stroke="${ee}" stroke-width="1.5"/>`).join("")}
    ${oe(160,150,"jede Stufe doppelt so empfindlich: eine Blende weniger Licht","text-anchor:middle")}
    ${oe(20,28,"ISO")}
  `,160),blende:()=>_e(`
    ${["2","2.8","4","5.6","8","11","16"].map((e,t)=>{const a=30+t*43,n=16-t*2.1;return`<circle cx="${a}" cy="60" r="19" fill="none" stroke="${te}" stroke-width="1"/>
        <circle cx="${a}" cy="60" r="${n.toFixed(1)}" fill="${Z}" opacity=".9"/>
        <text x="${a}" y="100" text-anchor="middle" style="${xe};font-size:11px">f/${e}</text>`}).join("")}
    <path d="M40 124 H280" stroke="${ee}" stroke-width="1.5" marker-end="url(#ag-arr)"/>
    <defs><marker id="ag-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${ee}"/></marker></defs>
    ${oe(40,140,"pro Schritt halb so viel Licht · mehr Schärfentiefe")}
    ${oe(40,24,"viel Licht, dünne Schärfe")}
    ${oe(280,24,"wenig Licht, alles scharf","text-anchor:end")}
  `),zeit:()=>_e(`
    ${["500","250","125","60","30","15"].map((e,t)=>{const a=36+t*50,n=t*1.6;return`<g transform="translate(${a},44)">
        <circle cx="0" cy="0" r="6" fill="${Z}"/>
        <path d="M0 6 v18 M0 12 l-8 8 M0 12 l8 8 M0 24 l-6 12 M0 24 l6 12" stroke="${Z}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        ${n?`<path d="M${-10-n*3} 14 h${n*3} M${-10-n*3} 26 h${n*3}" stroke="${te}" stroke-width="2"/>`:""}
        <text x="0" y="68" text-anchor="middle" style="${xe};font-size:11px">1/${e}</text>
      </g>`}).join("")}
    <path d="M186 20 v100" stroke="${ee}" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${oe(312,132,"ab hier freihand wackelig (50er)",`fill:${ee};text-anchor:end`)}
    ${oe(36,150,"kurz: eingefroren")}
    ${oe(286,150,"lang: Wisch","text-anchor:end")}
  `),dreieck:()=>_e(`
    <path d="M160 18 L60 118 L260 118 Z" fill="none" stroke="${Z}" stroke-width="1.5"/>
    ${Le(160,14,"ISO","text-anchor:middle")}
    ${Le(48,134,"Blende","text-anchor:middle")}
    ${Le(272,134,"Zeit","text-anchor:middle")}
    <rect x="94" y="56" width="132" height="44" rx="8" fill="${Ae}" stroke="${ee}" stroke-width="1"/>
    ${Le(160,74,"f/8 · 1/125","text-anchor:middle")}
    ${oe(160,90,"= f/5.6 · 1/250 = f/11 · 1/60","text-anchor:middle")}
    ${oe(60,154,"ein Schritt doppelt, der andere halb: gleich hell")}
  `),sunny16:()=>_e(`
    ${[["☀️","f/16","Sonne",!1],["🌤️","f/11","leicht bewölkt",!1],["☁️","f/8","zu · heute",!0],["🌧️","f/5.6","dunkel",!1],["🏚️","f/4","Schatten",!1]].map(([e,t,a,n],r)=>`<g transform="translate(${32+r*64},0)">
        ${n?`<rect x="-26" y="14" width="56" height="118" rx="10" fill="${Ae}" stroke="${ee}" stroke-width="1.5"/>`:""}
        <text x="2" y="48" text-anchor="middle" style="font-size:24px">${e}</text>
        <text x="2" y="84" text-anchor="middle" style="${xe};font-size:14px;${n?`fill:${ee};font-weight:600`:""}">${t}</text>
        <text x="2" y="104" text-anchor="middle" style="${xe};font-size:8px;fill:${te}">${a}</text>
      </g>`).join("")}
    ${Le(160,152,"Zeit immer 1/ISO · ISO 400 → 1/500 · ISO 200 → 1/250","text-anchor:middle;font-size:10px")}
  `),fokus:()=>_e(`
    <g transform="translate(80,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${te}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${Z}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${Z}" stroke-width="1"/>
      <path d="M-6 -12 V0 M4 0 V12" stroke="${ee}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${xe};font-size:9px;fill:${te}">unscharf: versetzt</text>
    </g>
    <path d="M150 80 h18" stroke="${ee}" stroke-width="1.5" marker-end="url(#ag-arr2)"/>
    <defs><marker id="ag-arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${ee}"/></marker></defs>
    <g transform="translate(240,80)">
      <rect x="-64" y="-46" width="128" height="92" rx="6" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="24" fill="none" stroke="${te}" stroke-width="1"/>
      <circle cx="0" cy="0" r="14" fill="none" stroke="${Z}" stroke-width="1"/>
      <path d="M-14 0 H14" stroke="${Z}" stroke-width="1"/>
      <path d="M0 -12 V12" stroke="${wa}" stroke-width="3" stroke-linecap="round"/>
      <text x="0" y="40" text-anchor="middle" style="${xe};font-size:9px;fill:${te}">scharf: eine Linie</text>
    </g>
    ${oe(160,150,"Schnittbild mittig, Mikroprismenring aussen","text-anchor:middle")}
  `),schaerfentiefe:()=>_e(`
    ${[["f/2",50,10],["f/11",110,120]].map(([e,t,a])=>`
      <path d="M40 ${t} H280" stroke="${te}" stroke-width="1"/>
      <rect x="${150-a/2}" y="${t-10}" width="${a}" height="20" rx="4" fill="${wa}" opacity=".7"/>
      <text x="22" y="${t+4}" text-anchor="middle" style="${xe};font-size:11px">${e}</text>`).join("")}
    ${[["1m",60],["2m",105],["3m",150],["5m",205],["∞",270]].map(([e,t])=>`<path d="M${t} 36 v6 M${t} 96 v6" stroke="${te}"/><text x="${t}" y="30" text-anchor="middle" style="${xe};font-size:9px;fill:${te}">${e}</text>`).join("")}
    <path d="M150 20 v100" stroke="${ee}" stroke-width="1" stroke-dasharray="3 3"/>
    ${oe(150,142,"Fokus auf 3 m · grün ist scharf","text-anchor:middle")}
  `),zonenfokus:()=>_e(`
    <rect x="30" y="50" width="260" height="56" rx="8" fill="${Ae}" stroke="${Z}" stroke-width="1.5"/>
    ${[["1",60],["1.5",95],["2",125],["3",160],["5",200],["10",235],["∞",270]].map(([e,t])=>`<path d="M${t} 50 v8" stroke="${Z}"/><text x="${t}" y="72" text-anchor="middle" style="${xe};font-size:10px">${e}</text>`).join("")}
    <path d="M160 40 v10" stroke="${ee}" stroke-width="2.5"/>
    ${[["16",92],["11",110],["8",126],["4",148],["4",172],["8",194],["11",210],["16",228]].map(([e,t])=>`<text x="${t}" y="98" text-anchor="middle" style="${xe};font-size:9px;fill:${e==="8"?ee:te}">${e}</text>`).join("")}
    <path d="M126 106 v8 H194 v-8" fill="none" stroke="${ee}" stroke-width="1.5"/>
    ${Le(160,130,"bei f/8 scharf von 2 bis 5 m","text-anchor:middle")}
    ${oe(160,150,"Ring auf 3 m, nicht mehr fokussieren, nur auslösen","text-anchor:middle")}
  `),mitziehen:()=>_e(`
    ${[30,40,50,60,70,80,90,100].map(e=>`<path d="M24 ${e} h272" stroke="${te}" stroke-width="2" stroke-dasharray="${8+e%20} 10"/>`).join("")}
    <rect x="96" y="44" width="128" height="50" rx="8" fill="#0e1c14" stroke="${Z}" stroke-width="2"/>
    ${[108,134,160,186].map(e=>`<rect x="${e}" y="54" width="20" height="16" rx="2" fill="${Ae}" stroke="${Z}" stroke-width="1"/>`).join("")}
    <circle cx="124" cy="98" r="6" fill="${Z}"/><circle cx="196" cy="98" r="6" fill="${Z}"/>
    <path d="M232 120 h40" stroke="${ee}" stroke-width="2" marker-end="url(#ag-arr3)"/>
    <defs><marker id="ag-arr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${ee}"/></marker></defs>
    ${oe(232,134,"Kamera dreht mit",`fill:${ee}`)}
    ${Le(24,150,"1/15 · f/16 · auslösen, während du drehst")}
  `),rueckspulen:()=>_e(`
    ${[["1","Knopf am Boden drücken",56],["2","Kurbel drehen, bis sie leicht geht",160],["3","erst dann die Rückwand öffnen",264]].map(([e,t,a])=>`
      <circle cx="${a}" cy="52" r="22" fill="${Ae}" stroke="${e==="3"?wa:Z}" stroke-width="1.5"/>
      <text x="${a}" y="58" text-anchor="middle" style="${xe};font-size:16px">${e}</text>
      <foreignObject x="${a-50}" y="82" width="100" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:9.5px;line-height:1.3;font-family:inherit;color:${Z};opacity:.85;text-align:center">${t}</div></foreignObject>`).join("")}
    <path d="M80 52 h54 M184 52 h54" stroke="${te}" stroke-width="1" stroke-dasharray="3 3"/>
  `,122)};function Ig(e){const t=Ng[e];return t?t():""}function io(e){return String(e||"").split(/\n{2,}/).map(t=>`<p>${W(t).replace(/\n/g,"<br>")}</p>`).join("")}const oo="affektions-gacha:kurs:v1",so="affektions-gacha:kurs:last";function lo(){try{const e=JSON.parse(window.localStorage.getItem(oo)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function co(e){const t=lo()[e];return Number.isInteger(t)&&t>=0?t:0}function Pg(e,t){try{const a=lo();a[e]=t;const n=Object.keys(a).sort();for(;n.length>60;)delete a[n.shift()];window.localStorage.setItem(oo,JSON.stringify(a))}catch{}}function Bg(e){const t=xa(e&&e.outcome&&e.outcome.steps);if(t.length)try{window.localStorage.setItem(so,JSON.stringify({day:e.day,title:e.outcome.title||"",label:e.category&&e.category.label||"",steps:t,done:e.outcome.done||""}))}catch{}}function jg(){try{const e=JSON.parse(window.localStorage.getItem(so)||"null");return!e||typeof e.day!="string"||!xa(e.steps).length?null:e}catch{return null}}function Fg(e=p.specialDays&&p.specialDays.days){const t=[];for(const a of Array.isArray(e)?e:[])for(const n of Array.isArray(a.outcomes)?a.outcomes:[]){const r=xa(n.steps);r.length&&t.push({day:String(a.date||""),title:n.title||"",label:a.label||"",steps:r,done:n.done||""})}return t.sort((a,n)=>a.day<n.day?1:a.day>n.day?-1:0)}function go(){return Fg()[0]||jg()}function Og(e){return{day:e.day,category:{label:e.label},outcome:{title:e.title,steps:e.steps,done:e.done}}}function uo(){const e=document.querySelector("[data-ag-chips]");if(!e||e.querySelector("#ag-btn-kurs")||!go())return;const t=document.createElement("li");t.id="ag-btn-kurs",t.textContent="Kurs 🎞️",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label","Kurs öffnen"),t.classList.add("ag-chip-clickable");const a=()=>{S(6),qg()};t.addEventListener("click",a),t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),a())}),e.appendChild(t)}function qg(){const e=document.querySelector("#ag-kurs-panel"),t=go();if(!e||!t)return;const a=e.querySelector("#ag-kurs-panel-title");a&&(a.textContent=t.title||"Kurs");const n=e.querySelector("#ag-kurs-panel-copy");n&&(n.textContent=t.label?`${t.label} · ${t.day}`:t.day),fo(e.querySelector("[data-ag-kurs-panel-block]"),Og(t),{remember:!1}),e.hidden=!1;try{e.scrollIntoView({block:"start",behavior:"smooth"})}catch{}}function Wg(){const e=document.querySelector("#ag-kurs-panel");e&&(e.hidden=!0)}function po(e,t){return!Number.isFinite(e)||t<=0?0:Math.min(t,Math.max(0,Math.round(e)))}function xa(e){return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&typeof t.title=="string"&&typeof t.text=="string"):[]}function fo(e,t,{remember:a=!0}={}){if(!e)return;const n=xa(t&&t.outcome&&t.outcome.steps);if(!n.length){e.hidden=!0;return}e.hidden=!1,a&&(Bg(t),uo());const r=t.day,i=s=>{const l=po(co(r),n.length),c=l>=n.length,u=c?null:n[l];e.classList.toggle("is-done",c),e.querySelector("[data-ag-kurs-count]").textContent=c?`${n.length} von ${n.length} · fertig`:`Schritt ${l+1} von ${n.length}`,e.querySelector("[data-ag-kurs-title]").textContent=c?"Alle Schritte durch 🎞️":u.title;const g=e.querySelector("[data-ag-kurs-figure]");if(g){const m=c?"":Ig(u.figure);g.innerHTML=m,g.hidden=!m}e.querySelector("[data-ag-kurs-text]").innerHTML=io(c?t.outcome.done||"Das war der Kurs. Jetzt gilt nur noch das Notizbuch und der Film.":u.text),e.querySelector("[data-ag-kurs-dots]").innerHTML=n.map((m,f)=>`<i class="${f<l?"is-past":f===l&&!c?"is-now":""}"></i>`).join("");const b=e.querySelector("[data-ag-kurs-prev]"),w=e.querySelector("[data-ag-kurs-next]");if(b.disabled=l===0,w.hidden=c,w.textContent=l===n.length-1?"Fertig ✓":"Weiter ›",s)try{e.scrollIntoView({block:"start",behavior:"smooth"})}catch{}},o=s=>{const l=po(co(r)+s,n.length);Pg(r,l),S(s>0?[8,20,8]:6),i(!0)};e.querySelector("[data-ag-kurs-prev]").onclick=()=>o(-1),e.querySelector("[data-ag-kurs-next]").onclick=()=>o(1),i(!1)}const jn="affektions-gacha:einstellung:lichtreaktionen";function Dt(){try{return window.localStorage.getItem(jn)!=="aus"}catch{return!0}}function Rg(e){try{e?window.localStorage.removeItem(jn):window.localStorage.setItem(jn,"aus")}catch{}return Dt()}function Ug(e){e&&(e.checked=Dt(),e.addEventListener("change",()=>{const t=Rg(e.checked);e.checked=t,S(6),j(t?"💡 Die Lampen reagieren wieder auf die App":"💡 Die Lampen bleiben bei App-Aktionen ruhig")}))}const ho=.72;function Hg(e,t){return e>0&&t/e<=ho}function Gg(e,t){if(!e)return;const a=new Map;let n=0,r=!1;const i=()=>{const[l,c]=[...a.values()];return Math.hypot(l.x-c.x,l.y-c.y)};e.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&(n=i(),r=!1))}),e.addEventListener("pointermove",l=>{a.has(l.pointerId)&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&!r&&Hg(n,i())&&(r=!0,t()))});const o=l=>{a.delete(l.pointerId),a.size<2&&(n=0)};e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o);let s=!1;e.addEventListener("gesturestart",()=>{s=!1}),e.addEventListener("gesturechange",l=>{!s&&l.scale&&l.scale<=ho&&(s=!0,t())})}function Kg(e){const t=e&&e.closest(".ag-widget"),a=t&&t.querySelector('.ag-bottomnav-btn[data-ag-tab="lieblinge"] .ag-bottomnav-btn-icon');if(!e||!a)return;const n=e.getBoundingClientRect(),r=a.getBoundingClientRect(),i=document.createElement("div");i.className="ag-fav-ghost",i.style.left=`${n.left}px`,i.style.top=`${n.top}px`,i.style.width=`${n.width}px`,i.style.height=`${Math.min(n.height,260)}px`,document.body.appendChild(i);const o=r.left+r.width/2-(n.left+n.width/2),s=r.top+r.height/2-(n.top+Math.min(n.height,260)/2),l=i.animate([{transform:"translate(0,0) scale(1) rotate(0deg)",opacity:.9},{transform:`translate(${(o*.5).toFixed(0)}px, ${(s*.5).toFixed(0)}px) scale(.4) rotate(-6deg)`,opacity:.9,offset:.6},{transform:`translate(${o.toFixed(0)}px, ${s.toFixed(0)}px) scale(.05) rotate(4deg)`,opacity:.2}],{duration:700,easing:"cubic-bezier(.3,.7,.3,1)",fill:"forwards"});l.onfinish=()=>{i.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),S([10,40,20])}}const Yg=["So","Mo","Di","Mi","Do","Fr","Sa"];function Vg(e){try{const[t,a,n]=Q(e||"UTC").split("-").map(Number),r=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return Yg[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(r)]||null}catch{return null}}function Jg(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function mo(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const i=Jg(n,t),o=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${W(n.when)}</span>`:"";return`
      <li class="ag-skin-step${i?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${W(n.name||"")}${o}</span>
          ${n.note?`<span class="ag-skin-note">${W(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${W(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function Zg(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=p.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=Vg(p.theme&&p.theme.timezone);e.innerHTML=mo(t.morning,a)+mo(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${W(t.footer)}</p>`:"")}function bo(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,Zg(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),S(10))}function Xg(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}const gt=new WeakMap,yo=4e3;function ut(e,t="Sicher? Nochmal tippen",a=yo){if(!e)return!0;const n=gt.get(e);if(n)return clearTimeout(n.timer),gt.delete(e),e.classList.remove("is-armed"),e.innerHTML=n.html,!0;const r=e.innerHTML;e.classList.add("is-armed"),e.textContent=t;const i=setTimeout(()=>{gt.delete(e),e.classList.remove("is-armed"),e.innerHTML=r},a);return gt.set(e,{timer:i,html:r}),!1}function Qg(e){const t=e&&gt.get(e);t&&(clearTimeout(t.timer),gt.delete(e),e.classList.remove("is-armed"),e.innerHTML=t.html)}const eu=Object.freeze(Object.defineProperty({__proto__:null,ARM_MS:yo,armConfirm:ut,disarm:Qg},Symbol.toStringTag,{value:"Module"}));function tu(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function Fn(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function au(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${Fn(r)}× ${n}`}return null}function nu(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const i=Number(r&&r.elevation);!Number.isFinite(i)||i<=0||(!a||i>a.h)&&(a={h:i,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${Fn(n)}× euer höchster Gipfel (${a.name})`:`≈ ${Fn(n)}× euer höchster Gipfel`}function ru(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,i]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+i+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function iu(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const i=r.indexOf("?"),o=i===-1?r:r.slice(0,i),s=i===-1?"":r.slice(i+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),o+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),i=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${i}`)}const n=ru(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function On(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function ou(e){const t=ra();t.unshift(e),ia(t),Ge("gipfelbuch"),On("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function su(e){ia(ra().filter(t=>t.id!==e)),Ge("gipfelbuch"),On("gipfel-delete",{id:e})}function lu(e,t){const a=ra(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,ia(a),Ge("gipfelbuch"),On("gipfel-upsert",r)}function du(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?cd(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?iu(e.activityUrl):null,i=e.cover?`<div class="ag-gipfel-cover"><img src="${W(e.cover)}" alt="${W(e.name||"")}" loading="lazy" decoding="async"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${W(e.distance)} km`:"",l=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${W(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||l?`<div class="ag-gipfel-stats">${s}${s&&l?" ":""}${l}</div>`:"";t.innerHTML=`
    ${i}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${od(e.date)}</div>
        <div class="ag-gipfel-name">${W(e.name||"—")}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${nn(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${W(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${W(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${W(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var ae;const m=d("[data-ag-berge-form]"),f=d("[data-ag-berge-add]");if(!m)return;const y=d("[data-ag-berge-edit-id]");y&&(y.value=e.id);const E=d("[data-ag-berge-name]");E&&(E.value=e.name||"");const _=d("[data-ag-berge-dist]");_&&(_.value=e.distance||"");const C=d("[data-ag-berge-gain]");C&&(C.value=e.elevGain||e.elevation||"");const v=d("[data-ag-berge-date]");v&&(v.value=e.date||"");const z=d("[data-ag-berge-url]");z&&(z.value=e.activityUrl||"");const B=d("[data-ag-berge-cover]");B&&(B.value=e.cover||"");const U=d("[data-ag-berge-notes]");U&&(U.value=e.notes||"");const x=d("[data-ag-berge-lat]");x&&(x.value=e.lat||"");const A=d("[data-ag-berge-lng]");A&&(A.value=e.lng||"");const T=d("[data-ag-berge-loc-label]");T&&(T.value=e.locLabel||"");const N=d("[data-ag-loc-search]");N&&(N.value=e.locLabel||"");const F=d("[data-ag-berge-form-title]");F&&(F.textContent="Eintrag bearbeiten");const O=d("[data-ag-berge-save] span:last-child");O&&(O.textContent="Speichern"),m.hidden=!1,f&&(f.hidden=!0),(ae=d("[data-ag-sheet-backdrop]"))==null||ae.classList.add("is-open"),m.scrollIntoView({behavior:"smooth",block:"nearest"}),E&&E.focus(),S(8)});const g=t.querySelector("[data-ag-gipfel-delete]");g&&g.addEventListener("click",()=>{ut(g,"Löschen? Nochmal tippen")&&(su(e.id),Nt(),S(8),j("Eintrag gelöscht"))});const b=t.querySelector("[data-ag-map-komoot]");b&&b.addEventListener("click",()=>{const m=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(m){if(!m.hidden){m.hidden=!0,b.textContent="🗺 Komoot-Karte";return}m.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,b.textContent="Karte schließen",S(4)}});const w=t.querySelector("[data-ag-map-alltrails]");return w&&r&&w.addEventListener("click",()=>{const m=t.querySelector("[data-ag-map-wrap-alltrails]");if(m){if(!m.hidden){m.hidden=!0,w.textContent="🗺 AllTrails-Karte";return}m.innerHTML=`<iframe src="${W(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,w.textContent="Karte schließen",S(4)}}),t}function Nt({loading:e=!1}={}){const t=d("[data-ag-berge-list]"),a=d("[data-ag-berge-empty]"),n=d("[data-ag-berge-total]"),r=d("[data-ag-berge-analogy]"),i=d("[data-ag-berge-total-dist]"),o=d("[data-ag-berge-dist-analogy]"),s=d("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=ra().sort((g,b)=>{const w=g.date||"",m=b.date||"";return m<w?-1:m>w?1:0});t.innerHTML="";const c=l.reduce((g,b)=>g+(Number(b.elevGain)||Number(b.elevation)||0),0);if(n&&(n.textContent=c>0?nn(c):"— m"),r){const g=tu(c);g?(r.textContent=g,r.hidden=!1):r.hidden=!0}const u=l.reduce((g,b)=>{const w=Number(b.distance);return g+(Number.isFinite(w)&&w>0?w:0)},0);if(i&&(i.textContent=u>0?`${sd(u)} km`:"— km"),o){const g=au(u);g?(o.textContent=g,o.hidden=!1):o.hidden=!0}if(s){const g=nu(c,l);g?(s.textContent=g,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),wo([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(g=>t.appendChild(du(g))),wo(l)}function cu(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const i=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");i&&(i.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const i=t.value.trim();if(!i){r();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(c=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=c.display_name,u.addEventListener("click",()=>{const g=e.querySelector("[data-ag-berge-lat]"),b=e.querySelector("[data-ag-berge-lng]"),w=e.querySelector("[data-ag-berge-loc-label]");g&&(g.value=c.lat),b&&(b.value=c.lon),w&&(w.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!a.contains(i.target)&&(a.hidden=!0)})}function gu(){cu(k)}let Pe=null,va=null;function qn(){Pe&&setTimeout(()=>Pe.invalidateSize(),150)}async function uu(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function wo(e){const t=d("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await uu()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const i=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!Pe){Pe=n.map(r).fitBounds(i),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(Pe);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),l.classList.add("is-active");const c=l.dataset.mapView==="eu"?o:i;Pe.fitBounds(c)})})}va?va.clearLayers():va=n.layerGroup().addTo(Pe),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${W(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${nn(u)}</div>`:""}
    `;const g=document.createElement("button");g.type="button",g.textContent="Zum Eintrag",g.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",g.addEventListener("click",()=>{l.closePopup();const b=k.querySelector(`[data-ag-gipfel-id="${s.id}"]`);b&&(b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("ag-gipfel-highlight"),setTimeout(()=>b.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(g),l.bindPopup(c),va.addLayer(l)}),requestAnimationFrame(()=>{Pe&&Pe.invalidateSize()}),setTimeout(()=>{Pe&&Pe.invalidateSize()},250)}const xo=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}],pu=5,Wn="🌿";function fu(e=new Date){const t=e.getMonth()+1;return t>=3&&t<=5}function hu(e,t){return e>=pu&&!_d(t)}function vo(e){return xo[Math.min(e-1,xo.length-1)]}function pt(e,t){return e+Math.random()*(t-e)}function ko(){const e=d("#ag-baerlauch-level");e&&(e.textContent=`Level ${p.baerlauch.level}`)}function It(){p.baerlauch.timerId&&(clearInterval(p.baerlauch.timerId),p.baerlauch.timerId=null)}function So(e){const t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),i=d("#ag-baerlauch-text"),o=d("#ag-baerlauch-actions");o&&(o.hidden=!0),It(),p.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),i&&(i.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Lo(G(),p.baerlauch.level,!1),Un()}function mu(){const e=d("#ag-baerlauch-success"),t=d("#ag-baerlauch-reward"),a=d("#ag-baerlauch-photo"),n=d("#ag-baerlauch-text"),r=d("#ag-baerlauch-actions"),i=d("#ag-baerlauch-next");It();const o=p.baerlauch.level;p.baerlauch.level+=1;const s=wu(G(),p.baerlauch.level);Lo(G(),p.baerlauch.level,!0),Un(),ko(),s&&Se();let l=!1;const c=Jt();if(hu(o,c)){Dd(c);try{ea(Wn)}catch{}try{vt()}catch{}try{we()}catch{}try{j(`${Wn} Sammeltoken für Level ${o} — in der Token-Bank`)}catch{}l=!0}if(e&&(e.hidden=!1,e.textContent=l?`Level ${o} geschafft, nur guten Bärlauch gesammelt. Dafür gibt es diese Woche ein ${Wn}. 💚`:"Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&p.photos&&p.photos.length){const u=_t(),g=u.length?u[Math.floor(Math.random()*u.length)]:null;Os(a,g),t.hidden=!1;const b=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=b[Math.floor(Math.random()*b.length)]}i&&(i.textContent=`Level ${p.baerlauch.level} starten`),r&&(r.hidden=!1)}function bu(e){const t=d("#ag-baerlauch-timer"),a=d("#ag-baerlauch-darkness"),r=vo(p.baerlauch.level).timeMs;p.baerlauch.durationMs=r,p.baerlauch.startedAt=performance.now(),It(),p.baerlauch.timerId=setInterval(()=>{const i=performance.now()-p.baerlauch.startedAt,o=Math.max(0,r-i),s=Math.min(1,i/r);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);l.forEach(u=>{u.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,u.style.opacity=String(1-c*.28)}),o<=0&&(It(),e())},50)}function Rn(){const e=d("#ag-baerlauch-panel"),t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),r=d("#ag-baerlauch-photo"),i=d("#ag-baerlauch-text"),o=d("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!i)return;if(e.hidden=!1,Un(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),p.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",i.textContent="",o&&(o.hidden=!0),ko();const s=vo(p.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...l.slice(0,s.good).map(w=>({emoji:w,good:!0})),...c.slice(0,s.bad).map(w=>({emoji:w,good:!1}))];let g=0;const b=u.filter(w=>w.good).length;u.forEach(w=>{const m=document.createElement("button");m.type="button",m.className="ag-forage-item",m.textContent=w.emoji,m.dataset.good=w.good?"true":"false",m.style.left=`${pt(8,82)}%`,m.style.top=`${pt(10,72)}%`,m.style.setProperty("--dx",`${pt(-320,320)}px`),m.style.setProperty("--dy",`${pt(-220,220)}px`),m.style.setProperty("--dur",`${pt(s.speedMin,s.speedMax)}s`),m.style.setProperty("--delay",`${pt(-1.8,0)}s`),m.addEventListener("click",()=>{p.baerlauch.locked||(m.dataset.good==="true"?(m.classList.add("is-picked"),m.disabled=!0,g+=1,setTimeout(()=>m.remove(),140),g===b&&mu()):So("poison"))}),t.appendChild(m)}),bu(()=>So("timeout"))}function yu(){const e=d("#ag-baerlauch-panel");It(),e&&(e.hidden=!0)}function wu(e,t){var r;const a=un(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const i=(r=p.backup)==null?void 0:r.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Lo(e,t,a){var o;const n=oi(),r=((o=p.theme)==null?void 0:o.timezone)||"UTC",i=Q(r);n.unshift({date:i,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function Un(){var u;const e=d("#ag-baerlauch-scores");if(!e)return;const t="lennart",a="Fionn",n=un(),r=oi(),i="fionn",o=t in n||i in n;if(!o&&!r.length){e.hidden=!0;return}e.hidden=!1;const s=((u=p.theme)==null?void 0:u.timezone)||"UTC",l=g=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:s}).format(new Date(g+"T12:00:00Z"))}catch{return g}};let c="";if(o){const g=n[t]??0,b=n[i]??0;c+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${g||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${a}</span><span class="ag-score-result">Level ${b||"—"}</span></div>
    </div>`}if(r.length){const g=r.slice(0,8).map(b=>{const w=b.player===t,m=w?"ag-score-mine":"ag-score-theirs",f=w?"Du":a,y=b.won?`✓ Level ${b.level}`:`✗ Level ${b.level-1>=1?b.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${l(b.date)}</span><span class="ag-score-pill ${m}">${f}</span><span class="ag-score-result">${y}</span></div>`}).join("");c+=`<div class="ag-score-table">${g}</div>`}e.innerHTML=c}const q={recorder:null,audioBlob:null,lang:"swabian"};function ka(){try{return JSON.parse(window.localStorage.getItem(Hr)||"[]")||[]}catch{return[]}}function Sa(e){try{window.localStorage.setItem(Hr,JSON.stringify(e))}catch{}}function Eo(e){const t=ka();t.unshift(e),Sa(t),Ge("glossary"),Hn("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function xu(e,t){const a=ka(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,Sa(a),Ge("glossary"),Hn("glossary-upsert",r)}function vu(e){Sa(ka().filter(t=>t.id!==e)),Ge("glossary"),Hn("glossary-delete",{id:e})}let La=!1;async function To(){const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=G(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let i;try{i=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!i.ok)return 0;const o=await i.json();return!o.ok||!Array.isArray(o.glossary)?0:(xn("glossary")||Sa(o.glossary.filter(s=>s.id)),o.glossary.length)}catch{return 0}}function Hn(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:G(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function Gn(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function ku(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return Gn(e);try{const n=await Gn(e),r=n.split(",")[1],i=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:G(),filename:`glossary-${t}.webm`,mimeType:i,data:r}),l=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return l.ok&&l.url?l.url:n}catch{return Gn(e)}}const Su={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang",kapsel:"Kapsel"};function Lu(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${W(Su[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${W(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${W(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${W(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${W(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${W(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),S(6)});const i=a.querySelector("[data-ag-glossary-edit]");i&&i.addEventListener("click",()=>{var b;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const g=document.getElementById("ag-glossary-audio-status");g&&(g.textContent=e.audioUrl?"Aufnahme vorhanden":""),q.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(b=document.getElementById("ag-glossary-word-input"))==null||b.focus(),S(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{ut(o,"Löschen? Nochmal tippen")&&(vu(e.id),at(q.lang),S(8))}),a}function at(e){var o;q.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===q.lang)}),$o();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),r=ka(),i=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===q.lang);if(t.innerHTML="",!i.length){a&&(a.textContent=n?"Kein Treffer.":La?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",La&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),i.forEach(s=>t.appendChild(Lu(s,!!n)))}function $o(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function Co(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),q.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),La=!0,at("swabian"),window.requestAnimationFrame(()=>$o()),S(10),To().catch(()=>0).then(()=>{La=!1,at(q.lang)})}function Eu(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),q.audioBlob=null,q.recorder&&q.recorder.state!=="inactive")try{q.recorder.stop()}catch{}q.recorder=null}const Mo=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],zo=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function Ao(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(it)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(it,"granted")}catch{}await Yn();return}if(e==="denied"){try{window.localStorage.setItem(it,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function Tu(){var s;const e=((s=p.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,i=8*60,o=r<i?i-r:24*60-r+i;return Date.now()+o*60*1e3}async function Kn(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=G(),r=Q(a);if(Y().some(g=>g.token===n&&g.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=Tt(a);if(o>=21)return;const l=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=Ua(),u=zo[Qr(zo)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:u.title.replace("{name}",c),body:u.body.replace("{name}",c)})}catch{}}async function $u(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=Ua(),i=Mo[Qr(Mo)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Tu(),title:i.title.replace("{name}",r),body:i.body.replace("{name}",r)}),(t=p.quest)!=null&&t.enabled&&qi()){const o=Ct(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==Zt(p)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Zt(p)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:p.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:p.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Cu(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function Yn(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",En()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await $u(),await Kn(),await Cu(),await Au())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Mu(){const e=d("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(it,"dismissed")}catch{}return}try{window.localStorage.setItem(it,"granted")}catch{}await Yn()}function zu(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}async function Au(){const e=p.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:zu(e.vapidPublicKey)}));const n=p.backup&&p.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:G(),subscription:a.toJSON()}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,i).catch(()=>fetch(n,{...i,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}const _o="affektions-gacha:licht:farbe:v1",_u=7*864e5,Do=.85,Du=3*36e5;function Ea(e){const t=e&&Array.isArray(e.groups)?e.groups:null;return!t||!t.length?!1:t.every(a=>(Number(a.w)||0)>=Do)}function Ta(e){const t=e&&Array.isArray(e.groups)?e.groups:null;return!t||!t.length||e.on===!1?!1:t.some(a=>(Number(a.w)||0)<Do)}function Vn(){try{const e=JSON.parse(window.localStorage.getItem(_o)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function No(e){try{window.localStorage.setItem(_o,JSON.stringify(e))}catch{}}function $a(e,t,a=Date.now()){if(!e||!Ta(t))return!1;const n=Vn();return n[e]={groups:t.groups.map(r=>({pos:Number(r.pos)||0,w:Number(r.w)||0,size:Math.max(1,Math.round(Number(r.size)||1))})),brightness:typeof t.brightness=="number"?t.brightness:void 0,fade_steps:typeof t.fade_steps=="number"?t.fade_steps:void 0,at:a},No(n),!0}function Ca(e,t=Date.now()){const a=Vn()[e];return!a||!Array.isArray(a.groups)||!a.groups.length||t-(a.at||0)>_u?null:a}function Nu(e){const t=Vn();for(const a of e||[])delete t[a];No(t)}function Jn(e,t){const a={target:e,on:!0,groups:t.groups,fade_steps:typeof t.fade_steps=="number"?t.fade_steps:40};return typeof t.brightness=="number"&&(a.brightness=t.brightness),a}function Iu(e,t=new Date){if(!e||!e.enabled||!Number.isInteger(e.lh))return!1;const a=new Date(t);a.setHours(e.lh,e.lm||0,0,0),a.setMinutes(a.getMinutes()+(Number(e.duration_min)||20));const n=t-a;return n>=0&&n<=Du}const Zn="wss://broker.hivemq.com:8884/mqtt",ft="picolight_lf26/events",Xn="web_app",ht=10,Ma=17/29,Pu={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:Ma,w:1},quiet:{pos:1/29,w:.3}},Io=18e3,Po=420,Bo=6,jo=Po*Bo,Qn=1600;function Fo(e){const t=Pu[e]||{pos:Ma,w:0},a=t.w>=1?{pos:Ma,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],i=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],o=[];for(let l=0;l<Bo;l++)o.push({at:l*Po,payload:{on:!0,fade_steps:6,brightness:1,groups:l%2?i:r}});o.push({at:jo,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:ht}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let l=!1;for(let c=jo+Qn;c<Io-Qn;c+=Qn)l=!l,o.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...l?s:n,size:ht}]}})}return o}const za=2500,Ke=["board_a","board_b"];let Be=!1;function Pt(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function Oo(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}function Bu(e){return Dt()?tr(Fo(e),Io,null):Promise.resolve()}const qo={"🥹":{pos:25/29,w:0},"😂":{pos:0/29,w:0},"🙃":{pos:Ma,w:0}},Wo=1e4;function Ro(e){return[{at:0,payload:{on:!0,fade_steps:20,brightness:1,groups:[{...qo[e]||{pos:.06896551724137931,w:.3},size:ht}]}},{at:2200,payload:{fade_steps:60,brightness:.45}},{at:4400,payload:{fade_steps:60,brightness:1}},{at:6600,payload:{fade_steps:60,brightness:.45}},{at:8800,payload:{fade_steps:60,brightness:1}}]}function ju(e,t="board_a"){return Dt()?tr(Ro(e),Wo,t):Promise.resolve()}const Uo="affektions-gacha:licht:farbe:checked",Ho=20*6e4;function Fu({force:e=!1}={}){try{const t=Number(window.localStorage.getItem(Uo)||0);if(!e&&Date.now()-t<Ho)return Promise.resolve(!1);window.localStorage.setItem(Uo,String(Date.now()))}catch{}return Ke.some(t=>Ca(t))?Ou().catch(()=>!1):Promise.resolve(!1)}async function Ou(){if(Be)return!1;Be=!0;try{return await Pt(),await new Promise(e=>{const t=window.mqtt.connect(Zn,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3});let a=!1,n=0;const r=()=>{if(!a){a=!0;try{t.end(!0)}catch{}e(n>0)}},i=o=>{o.from=Xn;try{t.publish(ft,JSON.stringify(o))}catch{}};t.on("connect",()=>{t.subscribe(ft,o=>{if(o){r();return}i({nudge:!0}),setTimeout(()=>setTimeout(r,n?2e3:0),za)})}),t.on("message",(o,s)=>{try{const l=JSON.parse(s.toString());if(!l.from||!Ke.includes(l.from)||!Array.isArray(l.groups))return;if(Ta(l)){$a(l.from,l);return}const c=l.on!==!1&&Ea(l)?Ca(l.from):null;c&&(i(Jn(l.from,c)),n++)}catch{}}),t.on("error",r),t.on("close",r),setTimeout(r,za+8e3)})}finally{Be=!1}}const er=8e3,Go=220,qu=4/29,Wu=1.5/29;function Ko(e=0){const a=[];for(let r=0;r<ht;r++)a.push(Math.floor((r+e)%ht/2)%2===0?qu:Wu);const n=[];for(const r of a){const i=n[n.length-1];i&&i.pos===r?i.size++:n.push({pos:r,w:0,size:1})}return n}function Yo(){const e=[];for(let t=0,a=0;t<er-400;t+=Go,a++)e.push({at:t,payload:{on:!0,fade_steps:4,brightness:a%2?.18:1,groups:Ko(a)}});return e}function Ru(){return Dt()?tr(Yo(),er,null):Promise.resolve()}const Vo=3200,Jo={pos:1/29,w:.12};function Zo(e=Math.random){const t=[{...Jo,size:ht}],a=()=>(e()-.5)*.08;return[{at:0,payload:{on:!0,fade_steps:70,brightness:.3+a(),groups:t}},{at:900,payload:{fade_steps:60,brightness:.42+a()}},{at:1700,payload:{fade_steps:50,brightness:.26+a()}},{at:2400,payload:{fade_steps:60,brightness:.38+a()}}]}function Uu(){let e=!1,t=null;return Hu(()=>Zo(),Vo,a=>{t=a,e&&a()}).catch(()=>{}),()=>{e=!0,t&&t()}}async function Hu(e,t,a){if(Be){a(()=>{});return}Be=!0;try{await Pt(),await new Promise(n=>{const r=window.mqtt.connect(Zn,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),i={};let o=!1,s=!1,l=[],c=null;const u=()=>{if(!s){s=!0;try{r.end(!0)}catch{}n()}},g=m=>{m.from=Xn;try{r.publish(ft,JSON.stringify(m))}catch{}},b=()=>{for(const m of l)clearTimeout(m);l=[];for(const m of e())l.push(setTimeout(()=>g({...m.payload}),m.at));c=setTimeout(b,t)},w=()=>{clearTimeout(c);for(const m of l)clearTimeout(m);if(l=[],!o){u();return}o=!1;for(const m of Ke){const f=i[m]||i[Ke.find(E=>E!==m)];if(!f)continue;const y={target:m,...Oo(f)};f.on===!1?(g({...y,on:!0}),setTimeout(()=>g({target:m,on:!1}),1500)):g({...y,on:!0})}setTimeout(u,2500)};r.on("connect",()=>{r.subscribe(ft,m=>{if(m){u(),a(()=>{});return}g({nudge:!0}),setTimeout(()=>{if(!s){if(!Object.keys(i).length){u(),a(()=>{});return}o=!0,b(),a(w)}},za)})}),r.on("message",(m,f)=>{try{const y=JSON.parse(f.toString());y.from&&Ke.includes(y.from)&&Array.isArray(y.groups)&&!o&&(i[y.from]=y)}catch{}}),r.on("error",()=>{o||(u(),a(()=>{}))}),r.on("close",()=>{o||(u(),a(()=>{}))})})}catch{a(()=>{})}finally{Be=!1}}const Gu=e=>new Promise(t=>setTimeout(t,e));async function tr(e,t,a){if(Be&&a){const n=Date.now()+25e3;for(;Be&&Date.now()<n;)await Gu(500)}if(!Be){Be=!0;try{await Pt(),await new Promise((n,r)=>{const i=window.mqtt.connect(Zn,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),o={};let s=!1,l=null,c=[],u=!1;const g=()=>{if(!u){u=!0,document.removeEventListener("visibilitychange",m);try{i.end(!0)}catch{}n()}},b=f=>{f.from=Xn;try{i.publish(ft,JSON.stringify(f))}catch{}},w=()=>{clearTimeout(l);for(const f of c)clearTimeout(f);if(c=[],!s){g();return}s=!1;for(const f of a?[a]:Ke){const y=o[f]||o[Ke.find(C=>C!==f)];if(!y)continue;const E=y.on!==!1&&Ea(y)?Ca(f):null,_=E?Jn(f,E):{target:f,...Oo(y)};y.on===!1?(b({..._,on:!0}),setTimeout(()=>b({target:f,on:!1}),1500)):b({..._,on:!0})}setTimeout(g,2500)},m=()=>{document.visibilityState==="hidden"&&s&&w()};document.addEventListener("visibilitychange",m),i.on("connect",()=>{i.subscribe(ft,f=>{if(f){g();return}b({nudge:!0}),setTimeout(()=>{if(!Object.keys(o).length){g();return}s=!0;for(const y of e)c.push(setTimeout(()=>b(a?{...y.payload,target:a}:y.payload),y.at));l=setTimeout(w,t)},za)})}),i.on("message",(f,y)=>{try{const E=JSON.parse(y.toString());E.from&&Ke.includes(E.from)&&Array.isArray(E.groups)&&!s&&(o[E.from]=E,Ta(E)&&$a(E.from,E))}catch{}}),i.on("error",()=>{s||g()}),i.on("close",()=>{s||g()}),setTimeout(()=>r(new Error("lights flash timed out")),t+2e4)})}catch{}finally{Be=!1}}}const mt=Object.freeze(Object.defineProperty({__proto__:null,CANDLE_PERIOD_MS:Vo,CANDLE_TINT:Jo,CHECK_EVERY_MS:Ho,HUG_MS:er,HUG_STEP_MS:Go,REACTION_LIGHT:qo,REACTION_MS:Wo,candleCycle:Zo,checkColourOnStart:Fu,choreography:Fo,flashHugOnLamps:Ru,flashLightsForPull:Bu,flashReactionOnLamp:ju,hugChoreography:Yo,hugGroups:Ko,loadMqtt:Pt,reactionChoreography:Ro,startCandleLights:Uu},Symbol.toStringTag,{value:"Module"})),Ku="wss://broker.hivemq.com:8884/mqtt",Bt="picolight_lf26",le=10,pe=[{id:"board_a",name:"Fionns Lampe",owner:"Fionn",short:"FF"},{id:"board_b",name:"Lennarts Lampe",owner:"Lennart",short:"LS"}],Yu="web_app",bt=1500,Vu=15e4,Aa=[[255,200,80],[255,160,0],[255,120,0],[255,60,0],[255,0,0],[255,0,60],[255,0,140],[200,0,200],[140,0,255],[80,0,255],[0,0,255],[0,60,255],[0,140,255],[0,200,255],[0,255,220],[0,255,160],[0,255,80],[0,220,0],[80,255,0],[160,255,0],[220,255,0],[255,240,0],[255,180,40],[255,100,80],[255,80,160],[180,40,255],[40,100,255],[0,180,180],[20,255,120],[255,220,120]],_a=(e,t,a)=>e+(t-e)*a;function Ju(e){const a=Math.min(Math.max(Number(e)||0,0),.9999)*(Aa.length-1),n=Math.floor(a),r=a-n,i=Aa[n],o=Aa[Math.min(n+1,Aa.length-1)];return[0,1,2].map(s=>Math.round(_a(i[s],o[s],r)))}function Da(e){const[t,a,n]=Ju(e.pos),r=Math.min(Math.max(Number(e.w)||0,0),1);return[Math.round(_a(t,255,r)),Math.round(_a(a,244,r)),Math.round(_a(n,225,r))]}function yt(e,t=0){return[{pos:e,w:t,size:le}]}const wt=le;function Ye(e){let t=(Array.isArray(e)?e:[]).map(n=>({pos:Math.min(1,Math.max(0,Number(n&&n.pos)||0)),w:Math.min(1,Math.max(0,Number(n&&n.w)||0)),size:Math.max(1,Math.round(Number(n&&n.size)||1))})).slice(0,wt);if(!t.length)return yt(0,1);let a=t.reduce((n,r)=>n+r.size,0);for(;a>le;){const n=t[t.length-1];n.size>1?(n.size--,a--):(t.pop(),a=t.reduce((r,i)=>r+i.size,0))}return a<le&&(t[t.length-1].size+=le-a),t}function Na(e){const t=[];let a=0;for(const n of Ye(e).slice(0,-1))a+=n.size,t.push(a);return t}function Xo(e,t){let a=0;const n=Ye(e);for(let r=0;r<n.length;r++)if(a+=n[r].size,t<a)return r;return n.length-1}function ar(e,t){const a=Ye(t),r=[0,...[...new Set(e.filter(i=>Number.isInteger(i)&&i>0&&i<le))].sort((i,o)=>i-o).slice(0,wt-1),le];return r.slice(0,-1).map((i,o)=>{const s=a[Xo(a,i)];return{pos:s.pos,w:s.w,size:r[o+1]-i}})}function Zu(e,t){const a=Na(e),n=a.indexOf(t);return n>=0?a.splice(n,1):a.push(t),ar(a,e)}function Xu(e,t){const a=Ye(e),n=Math.min(Math.max(t,0),a.length-1);if(a[n].size<2||a.length>=wt)return a;let r=0;for(let i=0;i<n;i++)r+=a[i].size;return ar([...Na(a),r+Math.ceil(a[n].size/2)],a)}function Qu(e,t){const a=Ye(e);if(a.length<2)return a;const n=Math.min(Math.max(t,0),a.length-1),r=Na(a),i=n<a.length-1?r[n]:r[n-1];return ar(r.filter(o=>o!==i),a)}function Qo(e,t,a,n){const r=Ye(e);return t==null?r.map(i=>({...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n})):r.map((i,o)=>o===t?{...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n}:i)}const ep=[{id:"warm",label:"Warm",emoji:"🕯",brightness:.55,groups:[{pos:0,w:.75,size:le}]},{id:"weiss",label:"Weiß",emoji:"💡",brightness:.8,groups:[{pos:0,w:1,size:le}]},{id:"wald",label:"Wald",emoji:"🌿",brightness:.7,groups:[{pos:17/29,w:0,size:le}]},{id:"gold",label:"Gold",emoji:"✨",brightness:.8,groups:[{pos:0,w:0,size:5},{pos:29/29,w:0,size:5}]},{id:"abend",label:"Abendrot",emoji:"🌇",brightness:.65,groups:[{pos:2/29,w:0,size:4},{pos:23/29,w:0,size:3},{pos:24/29,w:0,size:3}]},{id:"meer",label:"Meer",emoji:"🌊",brightness:.6,groups:[{pos:13/29,w:0,size:5},{pos:27/29,w:.2,size:5}]},{id:"nacht",label:"Nacht",emoji:"🌙",brightness:.18,groups:[{pos:10/29,w:0,size:le}]}];function tp(e){return{on:!0,fade_steps:40,brightness:e.brightness,groups:e.groups.map(t=>({...t}))}}function es(e){let t=Array.isArray(e.groups)&&e.groups.length?e.groups:null;if(!t&&Array.isArray(e.groupPositions)){const a=[0,...(e.boundaries||[]).slice().sort((n,r)=>n-r),le];t=a.slice(0,-1).map((n,r)=>({pos:e.groupPositions[r]??0,w:(e.groupWLevels||[])[r]??1,size:a[r+1]-n}))}return t||(t=yt(0,1)),{on:e.on!==!1,brightness:typeof e.brightness=="number"?e.brightness:.6,fade_steps:typeof e.fadeSteps=="number"?e.fadeSteps:60,groups:t.map(a=>({pos:Number(a.pos)||0,w:Number(a.w)||0,size:Math.max(1,Number(a.size)||1)}))}}function ap(e){const a=[{at:0,payload:{on:!0,brightness:1,fade_steps:6,groups:yt(.5862068965517241,0)}},{at:450,payload:{brightness:.12,fade_steps:6}},{at:900,payload:{brightness:1,fade_steps:6}},{at:1350,payload:{brightness:.12,fade_steps:6}},{at:1800,payload:{brightness:1,fade_steps:6}}];return e?(a.push({at:2700,payload:{on:!0,groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps}}),e.on===!1&&a.push({at:4200,payload:{on:!1}})):a.push({at:2700,payload:{on:!1}}),a}let V=null,nt=null,jt=0,Ia=0,xt="",Ft=null,de=0;const K={};let Ve=[],De=[],Ot=[],Fe="",X=null,ie="idle";function ts(){return`${Bt}/events`}function np(){return`${Bt}/status/+`}function nr(){return`${Bt}/scenes`}function Pa(){return`${Bt}/alarms`}function rr(e,t=Date.now()){const a=K[e];return!a||a.online===!1?!1:a.online===!0?!0:!!(a.seenAt&&t-a.seenAt<Vu)}function ir(){return Object.values(K).filter(e=>e.groups).sort((e,t)=>(t.seenAt||0)-(e.seenAt||0))[0]||null}function Je(e){ie=e,ge()}function rp(){if(V&&V.connected)return Je("connected"),Promise.resolve(V);if(nt)return nt;const e=++jt;return Je("connecting"),nt=Pt().then(()=>new Promise((t,a)=>{const n=window.mqtt.connect(Ku,{clientId:"gacha_licht_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:1e4,reconnectPeriod:4e3,keepalive:30});V=n;const r=()=>e===jt&&V===n;let i=!1;const o=s=>{i||(i=!0,s?t(n):a(new Error(xt||"licht: no connection")))};n.on("connect",()=>{if(r()){Ia=Date.now(),xt="",n.subscribe([ts(),np(),nr(),Pa()],()=>{});for(const s of pe)Ba[s.id]=!0;ce({nudge:!0}),Je("connected"),o(!0)}}),n.on("message",(s,l)=>{r()&&op(s,l)}),n.on("reconnect",()=>{r()&&ie!=="connected"&&Je("connecting")}),n.on("offline",()=>{r()&&Je("error")}),n.on("error",s=>{r()&&(xt=s&&s.message||"error",Je("error"))}),n.on("close",()=>{r()&&Je("error")}),setTimeout(()=>o(!!n.connected),15e3)})).catch(t=>{throw e===jt&&(xt=t&&t.message||"load",Je("error")),t}).finally(()=>{e===jt&&(nt=null)}),nt}function as(){if(jt++,nt=null,gr({restore:!1}),ur({restore:!1}),V)try{V.end(!0)}catch{}V=null,ie="idle",Ia=0,Ft&&(clearInterval(Ft),Ft=null),ge()}function ip(){Ft||(Ft=setInterval(()=>{V&&V.connected&&ce({ping:!0}),ge()},6e4))}function op(e,t){let a;try{a=JSON.parse(t.toString())}catch{return}const n=String(e);if(n.startsWith(`${Bt}/status/`)){const i=n.split("/").pop(),o=K[i]&&K[i].online;K[i]={...K[i]||{},online:!!a.online},a.online&&(K[i].seenAt=Date.now()),a.online&&o===!1&&(Ba[i]=!0,ce({nudge:!0})),ge();return}if(n===Pa()){if(Array.isArray(a)){De=a.filter(o=>o&&typeof o=="object");const i=Xe(De);if(i&&Number.isInteger(i.lh)){const[o,s]=ps(i.lh,i.lm||0);if((i.hour!==o||i.minute!==s)&&(i.hour=o,i.minute=s,V&&V.connected))try{V.publish(Pa(),JSON.stringify(De),{retain:!0,qos:1}),ce({set_alarms:De})}catch{}}}ge();return}if(n===nr()){const i=Array.isArray(a.scenes)?a.scenes:[];Ot=(Array.isArray(a.deleted)?a.deleted:[]).filter(s=>typeof s=="string").slice(-50);const o=new Set(Ot);Ve=i.filter(s=>s&&typeof s=="object"&&s.name&&!o.has(s.id)),ge();return}if(!a.from||!pe.some(i=>i.id===a.from))return;const r=K[a.from]={...K[a.from]||{},seenAt:Date.now()};if(Date.now()<de){ge();return}a.on!==void 0&&(r.on=!!a.on),typeof a.brightness=="number"&&(r.brightness=a.brightness),typeof a.fade_steps=="number"&&(r.fade_steps=a.fade_steps),Array.isArray(a.groups)&&(r.groups=a.groups),Array.isArray(a.groups)&&(Ta(r)?$a(a.from,r):Ba[a.from]&&Ea(r)&&sp(a.from),Ba[a.from]=!1),ge()}const Ba={};function sp(e){var n;const t=Ca(e);if(!t||Iu(Xe(De)))return!1;const a=Jn(e,t);return K[e]={...K[e]||{},on:!0,groups:a.groups,brightness:a.brightness??((n=K[e])==null?void 0:n.brightness),fade_steps:a.fade_steps},de=Date.now()+bt,ce(a),j("🎨 Farbe zurückgeholt"),!0}function ce(e){if(!V||!V.connected)return!1;try{return V.publish(ts(),JSON.stringify({...e,from:Yu})),!0}catch{return!1}}function Ze(e,t=Fe||null){de=Date.now()+bt;const a=t?[t]:pe.map(r=>r.id);for(const r of a){const i=K[r]={...K[r]||{}};e.on!==void 0&&(i.on=!!e.on),typeof e.brightness=="number"&&(i.brightness=e.brightness),typeof e.fade_steps=="number"&&(i.fade_steps=e.fade_steps),Array.isArray(e.groups)&&(i.groups=e.groups)}if(Array.isArray(e.groups))if(Ea(e))Nu(a);else for(const r of a)$a(r,K[r]);const n=ce(t?{...e,target:t}:e);return n||j("Keine Verbindung zu den Lampen"),ge(),n}function ns(){return pe.some(e=>K[e.id]&&K[e.id].on)}function lp(e){Ze({on:!!e}),S(8)}function dp(e){Ze({brightness:Math.min(1,Math.max(.02,e))})}function Oe(){const e=Fe&&K[Fe]||ir();return Ye(e&&e.groups?e.groups:yt(0,1))}function rs(e){const t=Oe();X=e==null||e<0||e>=t.length||e===X?null:e,ge()}function qt(e){const t=Ye(e);X!==null&&X>=t.length&&(X=null),Ze({on:!0,fade_steps:30,groups:t})}function or(e,t){const a=Oe(),n=a.length===1&&X===null;qt(n?yt(e,0):Qo(a,X,e,t)),S(6)}function cp(e){qt(Qo(Oe(),X,void 0,Math.min(1,Math.max(0,e))))}function gp(e){qt(Zu(Oe(),e)),S(6)}function up(){const e=Oe(),t=X!==null?X:e.reduce((n,r,i)=>r.size>e[n].size?i:n,0),a=Xu(e,t);if(a.length===e.length){j(e.length>=wt?"Mehr Gruppen gibt die Leiste nicht her":"Diese Gruppe ist schon ein einzelnes Licht");return}X=t,qt(a),S(6)}function pp(){const e=Oe();if(e.length<2)return;const t=X!==null?X:e.length-1;qt(Qu(e,t)),X!==null&&(X=Math.min(t,Oe().length-1)),S(6)}function fp(e){Ze(tp(e)),S([8,20,8]),j(`${e.emoji} ${e.label}`)}function hp(e){Ze(es(e)),S([8,20,8]),j(`✓ ${e.name}`)}function mp(e){Ze({fade_steps:Math.round(Math.min(600,Math.max(10,e)))})}function bp(e){Fe=pe.some(t=>t.id===e)?e:"",ge()}function yp(e){const t=K[e],a=!!(t&&t.on!==!1);Ze({on:!a},e),S(8)}function wp(e=Math.random){const t=2+Math.floor(e()*3),a=new Set;for(;a.size<t-1;)a.add(1+Math.floor(e()*(le-1)));const n=[0,...[...a].sort((r,i)=>r-i),le];return n.slice(0,-1).map((r,i)=>({pos:Math.round(e()*29)/29,w:e()<.2?Math.round(e()*60)/100:0,size:n[i+1]-r}))}function xp(){Ze({on:!0,fade_steps:40,groups:wp()}),S([6,20,6])}function vp(e,t,a=Date.now()){const n=(t&&Array.isArray(t.groups)&&t.groups.length?t.groups:yt(0,1)).map(o=>({pos:Number(o.pos)||0,w:Number(o.w)||0,size:Math.max(1,Math.round(Number(o.size)||1))})),r=[];let i=0;for(const o of n.slice(0,-1))i+=o.size,i>0&&i<le&&r.push(i);return{id:a.toString(36)+"-"+Math.random().toString(36).slice(2,8),updated:a,name:e,groups:n,boundaries:r,groupPositions:n.map(o=>o.pos),groupWLevels:n.map(o=>o.w),brightness:t&&typeof t.brightness=="number"?t.brightness:.6,fadeSteps:t&&typeof t.fade_steps=="number"?t.fade_steps:60,on:!(t&&t.on===!1)}}function kp(e){const t=String(e||"").trim().slice(0,32);if(!t)return j("Der Szene fehlt ein Name"),!1;if(!V||!V.connected)return j("Keine Verbindung zu den Lampen"),!1;const a=vp(t,ir()),n=Ve.filter(r=>r.name===t&&r.id).map(r=>r.id);Ot=[...Ot,...n].slice(-50),Ve=[...Ve.filter(r=>r.name!==t),a];try{V.publish(nr(),JSON.stringify({v:1,from:"gacha_app",scenes:Ve,deleted:Ot}),{retain:!0,qos:1})}catch{return j("Szene konnte nicht gesichert werden"),!1}return S([8,20,8]),j(`✓ „${t}“ gesichert — auch auf der grossen Seite`),ge(),!0}let sr=[];function ja(){return(Fe?[Fe]:pe.map(t=>t.id)).filter(t=>rr(t))}function is(e){return e.map(t=>(pe.find(a=>a.id===t)||{}).owner||t).join(" + ")}function Sp(e=ja()){const t=Array.isArray(e)?e:[e];if(!t.length)return j("Gerade ist keine Lampe erreichbar"),!1;for(const a of sr)clearTimeout(a);sr=[],de=Date.now()+5e3;for(const a of t){const n=K[a]&&K[a].groups?{...K[a]}:null;for(const r of ap(n))sr.push(setTimeout(()=>ce({...r.payload,target:a}),r.at))}return S([12,40,12,40,12]),j(t.length>1?"👋 Beide Lampen winken":`👋 ${is(t)}s Lampe winkt`),!0}const os=14,ss=110;function Lp(e,t){const a=(Array.isArray(e)?e:[]).map(s=>Math.max(0,Number(s)||0)).slice(0,os),n=[],r={on:!0,brightness:1,fade_steps:1},i={brightness:.06,fade_steps:1};t&&t.groups&&(r.groups=t.groups);for(const s of a)n.push({at:s,payload:r}),n.push({at:s+ss,payload:i});const o=(a.length?a[a.length-1]:0)+ss+700;return t&&t.groups?(n.push({at:o,payload:{on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}}),t.on===!1&&n.push({at:o+1200,payload:{on:!1}})):n.push({at:o,payload:{brightness:.6,fade_steps:30}}),n}let lr=[];function Ep(e,t=ja()){const a=Array.isArray(t)?t:[t];if(!e||!e.length)return!1;if(!a.length)return j("Gerade ist keine Lampe erreichbar"),!1;for(const r of lr)clearTimeout(r);lr=[];let n=0;for(const r of a){const i=K[r]&&K[r].groups?{...K[r]}:null,o=Lp(e,i);n=Math.max(n,o[o.length-1].at);for(const s of o)lr.push(setTimeout(()=>ce({...s.payload,target:r}),s.at))}return de=Date.now()+n+500,S(e.map(()=>18)),j(`🥁 ${e.length} ${e.length===1?"Schlag":"Schläge"} unterwegs — ${a.length>1?"beide Lampen":is(a)+"s Lampe"}`),!0}const ls=1e3;function Tp(){return[{at:0,payload:{on:!0,brightness:1,fade_steps:4}},{at:180,payload:{brightness:.3,fade_steps:6}},{at:320,payload:{brightness:.85,fade_steps:4}},{at:520,payload:{brightness:.22,fade_steps:10}}]}let Wt=null,dr=[],Rt=null;function $p(){if(Wt)return!1;if(!V||!V.connected)return j("Keine Verbindung zu den Lampen"),!1;Rt={};for(const t of pe)K[t.id]&&K[t.id].groups&&(Rt[t.id]={...K[t.id]});const e=()=>{de=Date.now()+ls+bt;for(const t of Tp())dr.push(setTimeout(()=>ce(t.payload),t.at))};return e(),Wt=setInterval(e,ls),S([20,120,20]),k&&k.classList.add("is-pulsing"),!0}function ds(){if(Wt){clearInterval(Wt),Wt=null;for(const e of dr)clearTimeout(e);dr=[];for(const e of pe){const t=Rt&&Rt[e.id];t&&(ce({target:e.id,on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}),t.on===!1&&setTimeout(()=>ce({target:e.id,on:!1}),1500))}Rt=null,de=Date.now()+2500,k&&k.classList.remove("is-pulsing")}}const Cp={pos:1/29,w:.12},Mp=.16,zp=.55,cr=[220,720];function Ap(e,t=Math.random){const a=t()<.08333333333333333,n=(t()-.5)*.16-(a?.18:0),r=(.36-e)*.25,i=Math.min(zp,Math.max(Mp,e+n+r));return{brightness:Math.round(i*1e3)/1e3,fade_steps:a?8:18+Math.round(t()*26)}}function _p(e=Math.random){return Math.round(cr[0]+e()*(cr[1]-cr[0]))}function cs(e){const t={};for(const a of e)K[a]&&K[a].groups&&(t[a]={...K[a]});return t}function gs(e,t){for(const a of t){const n=e[a];n&&(ce({target:a,on:!0,groups:n.groups,brightness:n.brightness,fade_steps:n.fade_steps}),n.on===!1&&setTimeout(()=>ce({target:a,on:!1}),1500))}de=Date.now()+2500}let Ee=null;function Dp(e=ja()){if(Ee)return!1;if(!V||!V.connected)return j("Keine Verbindung zu den Lampen"),!1;ur();const t=e.length?e:pe.map(a=>a.id);Ee={timers:{},level:{},snap:cs(t),boards:t};for(const a of t){Ee.level[a]=.36,ce({target:a,on:!0,fade_steps:30,brightness:.36,groups:[{...Cp,size:le}]});const n=()=>{if(!Ee)return;const r=Ap(Ee.level[a]);Ee.level[a]=r.brightness,de=Date.now()+1200,ce({target:a,brightness:r.brightness,fade_steps:r.fade_steps}),Ee.timers[a]=setTimeout(n,_p())};Ee.timers[a]=setTimeout(n,600+Math.random()*300)}return de=Date.now()+1200,S([10,40,10]),k&&k.classList.add("is-flickering"),ge(),!0}function gr({restore:e=!0}={}){if(!Ee)return;const t=Ee;Ee=null;for(const a of Object.keys(t.timers))clearTimeout(t.timers[a]);e&&gs(t.snap,t.boards),k&&k.classList.remove("is-flickering"),ge()}function Np(){Ee?gr():Dp()}const Fa=500,Ip=1/20,Pp=30;function us(e=0){const t=[];for(let a=0;a<le;a++){const n=((a/le+e)%1+1)%1;t.push({pos:Math.round(n*1e3)/1e3,w:0,size:1})}return t}let ve=null;function Bp(e=ja()){if(ve)return!1;if(!V||!V.connected)return j("Keine Verbindung zu den Lampen"),!1;gr();const t=e.length?e:pe.map(n=>n.id);ve={timer:null,offset:0,snap:cs(t),boards:t};const a=()=>{if(!ve)return;ve.offset=(ve.offset+Ip)%1,de=Date.now()+Fa;const n=us(ve.offset);for(const r of ve.boards)ce({target:r,on:!0,fade_steps:Pp,groups:n});ve.timer=setTimeout(a,Fa)};for(const n of t)ce({target:n,on:!0,fade_steps:40,groups:us(0)});return de=Date.now()+Fa,ve.timer=setTimeout(a,Fa),S([8,30,8,30,8]),k&&k.classList.add("is-rainbow"),ge(),!0}function ur({restore:e=!0}={}){if(!ve)return;const t=ve;ve=null,clearTimeout(t.timer),e&&gs(t.snap,t.boards),k&&k.classList.remove("is-rainbow"),ge()}function jp(){ve?ur():Bp()}const pr={werktags:[0,1,2,3,4],taeglich:[0,1,2,3,4,5,6],wochenende:[5,6]};function ps(e,t,a=new Date){const n=new Date(a);return n.setHours(e,t,0,0),[n.getUTCHours(),n.getUTCMinutes()]}function Fp(e,{time:t="07:00",days:a="werktags",boards:n,enabled:r=!0,durationMin:i=20}={}){const[o,s]=String(t).split(":").map(b=>parseInt(b,10)),[l,c]=ps(Number.isInteger(o)?o:7,Number.isInteger(s)?s:0),u=(Array.isArray(e)?e:[]).filter(b=>!(b&&b.gacha==="sunrise")),g={gacha:"sunrise",enabled:!!r,type:"sunrise",hour:l,minute:c,lh:Number.isInteger(o)?o:7,lm:Number.isInteger(s)?s:0,duration_min:i,brightness:.9,days:pr[a]||pr.werktags,boards:Array.isArray(n)&&n.length?n:pe.map(b=>b.id)};return[...u,g]}function Xe(e){return(Array.isArray(e)?e:[]).find(t=>t&&t.gacha==="sunrise")||null}function fr(e){const t=JSON.stringify((e||[]).slice().sort());for(const[a,n]of Object.entries(pr))if(JSON.stringify(n)===t)return a;return"werktags"}function Op(e){if(!V||!V.connected)return j("Keine Verbindung zu den Lampen"),!1;try{V.publish(Pa(),JSON.stringify(e),{retain:!0,qos:1}),ce({set_alarms:e})}catch{return j("Wecker konnte nicht gestellt werden"),!1}return De=e,!0}function hr({enabled:e,time:t,days:a,retarget:n=!1}={}){const r=Xe(De)||{},i=Fe?[Fe]:pe.map(l=>l.id),o=Fp(De,{time:t||(Number.isInteger(r.lh)?`${String(r.lh).padStart(2,"0")}:${String(r.lm||0).padStart(2,"0")}`:"07:00"),days:a||fr(r.days),boards:n||!Array.isArray(r.boards)||!r.boards.length?i:r.boards,enabled:e===void 0?r.enabled!==!1:e});if(!Op(o))return!1;const s=Xe(o);return S([8,20,8]),j(s.enabled?`🌅 Sonnenaufgang um ${String(s.lh).padStart(2,"0")}:${String(s.lm).padStart(2,"0")} gestellt`:"🌅 Sonnenaufgang aus"),ge(),!0}let fs=!1,hs=null;function mr(){ge(),qp(),rp().catch(()=>{}),ip()}function qp(){if(fs||!k)return;fs=!0;const e=d("[data-ag-licht-power]");e&&e.addEventListener("click",()=>lp(!ns()));const t=d("[data-ag-licht-brightness]");t&&t.addEventListener("input",()=>{de=Date.now()+bt,clearTimeout(hs),hs=setTimeout(()=>dp(Number(t.value)/100),120)});const a=d("[data-ag-licht-palette]");if(a){const P=R=>{const ue=a.getBoundingClientRect();if(!ue.width)return;const qe=(R.clientX??(R.touches&&R.touches[0]?R.touches[0].clientX:0))-ue.left;or(Math.min(1,Math.max(0,qe/ue.width)))};let D=!1,H=0;a.addEventListener("pointerdown",R=>{D=!0;try{a.setPointerCapture(R.pointerId)}catch{}P(R),H=Date.now()}),a.addEventListener("pointermove",R=>{!D||Date.now()-H<110||(H=Date.now(),P(R))});const be=()=>{D=!1};a.addEventListener("pointerup",be),a.addEventListener("pointercancel",be),a.addEventListener("keydown",R=>{const ue=Number(a.dataset.pos||0);R.key==="ArrowRight"&&(R.preventDefault(),or(Math.min(1,ue+1/29))),R.key==="ArrowLeft"&&(R.preventDefault(),or(Math.max(0,ue-1/29)))})}const n=d("[data-ag-licht-moods]");if(n){n.innerHTML="";for(const P of ep){const D=document.createElement("button");D.type="button",D.className="ag-licht-mood",D.dataset.mood=P.id;const[H,be,R]=Da(P.groups[0]);D.style.setProperty("--ag-mood",`rgb(${H},${be},${R})`),D.innerHTML=`<span class="ag-licht-mood-dot" aria-hidden="true"></span><span>${P.emoji} ${P.label}</span>`,D.addEventListener("click",()=>fp(P)),n.appendChild(D)}}const r=d("[data-ag-licht-scene-list]");r&&r.addEventListener("click",P=>{const D=P.target.closest("[data-scene]");if(!D)return;const H=Ve.find(be=>be.id===D.dataset.scene);H&&hp(H)});const i=d("[data-ag-licht-wink]");i&&i.addEventListener("click",()=>Sp());const o=d("[data-ag-licht-flicker]");o&&o.addEventListener("click",()=>Np());const s=d("[data-ag-licht-rainbow]");s&&s.addEventListener("click",()=>jp());const l=d("[data-ag-licht-target]");l&&l.addEventListener("click",P=>{const D=P.target.closest("[data-target]");D&&(bp(D.dataset.target),S(6))});const c=d("[data-ag-licht-lamps]");if(c){let P=null,D=!1,H=null;const be=R=>{clearTimeout(P),P=null,D?(ds(),D=!1):H&&ie==="connected"&&yp(H),H=null};c.addEventListener("pointerdown",R=>{const ue=R.target.closest("[data-lamp]");if(!(!ue||ie!=="connected")){R.preventDefault(),H=ue.dataset.lamp,D=!1;try{ue.setPointerCapture(R.pointerId)}catch{}P=setTimeout(()=>{D=$p()},450)}}),c.addEventListener("pointerup",be),c.addEventListener("pointercancel",()=>{clearTimeout(P),P=null,D&&(ds(),D=!1),H=null})}const u=d("[data-ag-licht-fade]");let g=null;u&&u.addEventListener("input",()=>{de=Date.now()+bt;const P=d("[data-ag-licht-fade-val]");P&&(P.textContent=`${(Number(u.value)/60).toFixed(1).replace(".",",")} s`),clearTimeout(g),g=setTimeout(()=>mp(Number(u.value)),160)});const b=d("[data-ag-licht-strip]");b&&b.addEventListener("click",P=>{if(ie!=="connected")return;const D=P.target.closest("[data-cut]");if(D){gp(Number(D.dataset.cut));return}const H=P.target.closest("[data-led]");H&&rs(Xo(Oe(),Number(H.dataset.led)))});const w=d("[data-ag-licht-groups]");w&&w.addEventListener("click",P=>{const D=P.target.closest("button");!D||ie!=="connected"||(D.dataset.group!==void 0?(rs(D.dataset.group==="all"?null:Number(D.dataset.group)),S(4)):D.dataset.split!==void 0?up():D.dataset.merge!==void 0&&pp())});const m=d("[data-ag-licht-white]");let f=null;m&&m.addEventListener("input",()=>{de=Date.now()+bt,clearTimeout(f),f=setTimeout(()=>cp(Number(m.value)/100),120)});const y=d("[data-ag-licht-random]");y&&y.addEventListener("click",xp);const E=d("[data-ag-licht-morse-open]"),_=d("[data-ag-morse]"),C=d("[data-ag-morse-pad]"),v=d("[data-ag-morse-dots]");let z=[],B=0,U=null;const x=()=>{z=[],B=0,v&&(v.innerHTML="")};E&&_&&E.addEventListener("click",()=>{_.hidden=!_.hidden,x(),_.hidden||_.scrollIntoView({behavior:"smooth",block:"nearest"})}),C&&C.addEventListener("pointerdown",P=>{P.preventDefault();const D=performance.now();if(z.length||(B=D),z.length<os&&z.push(Math.round(D-B)),S(14),C.classList.add("is-hit"),setTimeout(()=>C.classList.remove("is-hit"),120),v){const H=document.createElement("i");v.appendChild(H)}clearTimeout(U),U=setTimeout(()=>{const H=Ep(z);x(),H&&_&&(_.hidden=!0)},1600)});const A=d("[data-ag-sunrise-time]"),T=d("[data-ag-sunrise-days]"),N=d("[data-ag-sunrise-toggle]");N&&N.addEventListener("click",()=>{const P=Xe(De),D=!(P&&P.enabled!==!1);hr({enabled:D,retarget:D,time:A&&A.value,days:T&&T.value})}),A&&A.addEventListener("change",()=>{Xe(De)&&hr({time:A.value,days:T&&T.value})}),T&&T.addEventListener("change",()=>{Xe(De)&&hr({time:A&&A.value,days:T.value})});const F=d("[data-ag-licht-scene-save]"),O=d("[data-ag-licht-scene-name]");if(F&&O){const P=()=>{kp(O.value)&&(O.value="")};F.addEventListener("click",P),O.addEventListener("keydown",D=>{D.key==="Enter"&&(D.preventDefault(),P())})}const ae=d("[data-ag-licht-conn]");ae&&ae.addEventListener("click",()=>{ie!=="connected"&&(as(),mr())}),document.addEventListener("visibilitychange",()=>{const P=d("[data-ag-panel-licht]");if(document.visibilityState==="hidden"){(V||nt)&&as();return}P&&!P.hidden&&mr()})}function ge(){if(!k)return;const e=d("[data-ag-panel-licht]");if(!e||e.hidden)return;const t=d("[data-ag-licht-conn]");if(t){t.dataset.state=ie;const x=pe.some(T=>rr(T.id)),A=ie==="connected"&&!x&&Ia&&Date.now()-Ia>4e3;t.textContent=ie==="connected"?A?"verbunden · keine Lampe antwortet":"verbunden":ie==="connecting"?"verbinde…":ie==="error"?xt?`keine Verbindung (${xt.slice(0,40)}) · tippen`:"keine Verbindung · tippen":"tippen zum Verbinden"}const a=d("[data-ag-licht-lamps]");if(a){const x=pe.map(A=>{const T=K[A.id],F=rr(A.id)?T&&T.on===!1?"standby":"on":"offline",O=F==="offline"?"offline":F==="standby"?"aus":"an";return`<button type="button" class="ag-licht-lamp" data-lamp="${A.id}" data-state="${F}" title="${W(A.name)} — tippen schaltet, halten pulsiert"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${W(A.short)}<span class="ag-licht-lamp-sub">${O}</span></button>`}).join("");a.dataset.html!==x&&(a.innerHTML=x,a.dataset.html=x)}const n=ir(),r=ns(),i=d("[data-ag-licht-strip]"),o=Oe();if(X!==null&&X>=o.length&&(X=null),i){const x=new Set(Na(o)),A=r?n&&typeof n.brightness=="number"?.35+n.brightness*.65:.8:.18,T=[];let N=0;o.forEach((O,ae)=>{const[P,D,H]=Da(O);for(let be=0;be<O.size;be++,N++)N>0&&T.push(`<b data-cut="${N}" class="${x.has(N)?"is-cut":""}" role="button" aria-label="${x.has(N)?"Gruppen verbinden":"Hier teilen"}"></b>`),T.push(`<i data-led="${N}" class="${ae===X?"is-selected":""}" style="--ag-led:rgb(${P},${D},${H});opacity:${A}"></i>`)});const F=T.join("");i.dataset.html!==F&&(i.innerHTML=F,i.dataset.html=F),i.classList.toggle("is-off",!r),i.classList.toggle("is-live",ie==="connected")}const s=d("[data-ag-licht-groups]");if(s){const x=[`<button type="button" data-group="all" class="ag-licht-group ${X===null?"is-active":""}">Alle</button>`];o.forEach((T,N)=>{const[F,O,ae]=Da(T);x.push(`<button type="button" data-group="${N}" class="ag-licht-group ${N===X?"is-active":""}" title="${T.size} ${T.size===1?"Licht":"Lichter"}"><span class="ag-licht-group-dot" style="background:rgb(${F},${O},${ae})"></span>${N+1}</button>`)}),x.push(`<button type="button" data-split class="ag-licht-group ag-licht-group-op" title="Gruppe teilen" ${o.length>=wt?"disabled":""}>+</button>`),x.push(`<button type="button" data-merge class="ag-licht-group ag-licht-group-op" title="Gruppen verbinden" ${o.length<2?"disabled":""}>−</button>`);const A=x.join("");s.dataset.html!==A&&(s.innerHTML=A,s.dataset.html=A);for(const T of s.querySelectorAll("button"))(!T.hasAttribute("disabled")||T.dataset.group!==void 0)&&(T.disabled=ie!=="connected"||T.dataset.split!==void 0&&o.length>=wt||T.dataset.merge!==void 0&&o.length<2)}const l=d("[data-ag-licht-power]");l&&(l.setAttribute("aria-pressed",r?"true":"false"),l.classList.toggle("is-on",r),l.textContent=r?"An":"Aus",l.disabled=ie!=="connected");const c=d("[data-ag-licht-brightness]");c&&Date.now()>=de&&n&&typeof n.brightness=="number"&&(c.value=String(Math.round(n.brightness*100))),c&&(c.disabled=ie!=="connected");const u=d("[data-ag-licht-palette]"),g=o[X!==null?X:0];if(u&&g){const x=Number(g.pos)||0;u.dataset.pos=String(x),u.style.setProperty("--ag-pick",`${(x*100).toFixed(1)}%`),u.setAttribute("aria-valuenow",String(Math.round(x*29))),u.setAttribute("aria-label",X!==null?`Farbe von Gruppe ${X+1}`:"Farbe")}const b=d("[data-ag-licht-white]");b&&g&&Date.now()>=de&&(b.value=String(Math.round((Number(g.w)||0)*100))),b&&(b.disabled=ie!=="connected");const w=d("[data-ag-licht-white-label]");w&&(w.textContent=X!==null?`Weissanteil · Gruppe ${X+1}`:"Weissanteil");const m=e.querySelector("[data-ag-licht-flicker]");m&&(m.classList.toggle("is-active",!!Ee),m.textContent=Ee?"🕯️ Flackern aus":"🕯️ Kerzenflackern");const f=e.querySelector("[data-ag-licht-rainbow]");f&&(f.classList.toggle("is-active",!!ve),f.textContent=ve?"🌈 Regenbogen aus":"🌈 Regenbogen");for(const x of e.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink], [data-ag-licht-flicker], [data-ag-licht-rainbow], [data-ag-licht-morse-open], [data-ag-licht-random], [data-ag-licht-fade], [data-ag-licht-scene-name], [data-ag-licht-scene-save], [data-ag-sunrise-time], [data-ag-sunrise-days], [data-ag-sunrise-toggle]"))x.disabled=ie!=="connected";const y=Xe(De),E=d("[data-ag-sunrise-time]"),_=d("[data-ag-sunrise-days]"),C=d("[data-ag-sunrise-toggle]"),v=d("[data-ag-sunrise-note]");if(y&&E&&document.activeElement!==E&&(E.value=`${String(y.lh??7).padStart(2,"0")}:${String(y.lm??0).padStart(2,"0")}`),y&&_&&document.activeElement!==_&&(_.value=fr(y.days)),C){const x=!!(y&&y.enabled!==!1);C.textContent=x?"an":"aus",C.classList.toggle("is-on",x),C.setAttribute("aria-pressed",x?"true":"false")}if(v){const x=(y&&Array.isArray(y.boards)?y.boards:pe.map(T=>T.id)).map(T=>(pe.find(N=>N.id===T)||{}).owner||T).join(" + "),A={werktags:"Mo–Fr",taeglich:"täglich",wochenende:"Sa+So"}[fr(y&&y.days)];v.textContent=y&&y.enabled!==!1?`Aktiv ${A} um ${String(y.lh??7).padStart(2,"0")}:${String(y.lm??0).padStart(2,"0")}: ${y.duration_min||20} Minuten von tiefem Rot zu Warmweiss · ${x}`:y?"Gestellt, aber aus. Tippen auf „aus“ schaltet ihn ein.":"Zwanzig Minuten von tiefem Rot zu Warmweiss, auf den Lampen, die oben gewählt sind."}for(const x of e.querySelectorAll("[data-ag-licht-target] [data-target]")){const A=(x.dataset.target||"")===Fe;x.classList.toggle("is-active",A),x.setAttribute("aria-checked",A?"true":"false")}const z=d("[data-ag-licht-fade]");if(z&&Date.now()>=de&&n&&typeof n.fade_steps=="number"){z.value=String(Math.round(n.fade_steps));const x=d("[data-ag-licht-fade-val]");x&&(x.textContent=`${(n.fade_steps/60).toFixed(1).replace(".",",")} s`)}const B=d("[data-ag-licht-scenes]"),U=d("[data-ag-licht-scene-list]");B&&U&&(B.hidden=!Ve.length,U.innerHTML=Ve.slice(0,12).map(x=>{const T=es(x).groups.slice(0,5).map(N=>{const[F,O,ae]=Da(N);return`<i style="background:rgb(${F},${O},${ae})"></i>`}).join("");return`<button type="button" class="ag-licht-scene" data-scene="${W(x.id)}"${ie!=="connected"?" disabled":""}><span class="ag-licht-scene-dots" aria-hidden="true">${T}</span><span>${W(x.name)}</span></button>`}).join(""))}function Oa(e){if(p.activeTab==="today"&&e!=="today"&&p.revealed&&p.todaysPull&&!re())try{bg(p.todaysPull)}catch{}p.activeTab=e,k.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=k.querySelector(".ag-bottomnav-btn.is-active"),r=k.querySelector(".ag-nav-pill");if(r&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const u=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${u-a/2}px`}}for(const o of["today","history","lieblinge","berge","licht"]){const s=d(`[data-ag-panel-${o}]`);if(!s)continue;const l=e===o;l&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!l}e==="history"&&Ne(),e==="licht"&&mr(),e==="lieblinge"&&Kt(),e==="berge"&&(qn(),Nt({loading:!0}),qn(),At().catch(()=>{}).then(()=>{Nt(),qn()}));const i=d("[data-ag-fab]");i&&(i.hidden=e!=="berge")}function Ut(e,t){const a=d("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function Wp(){const e=p.wishInbox,t=d("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n=new Date().toISOString(),r={timestamp:n,token:G(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Ut("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){Ut("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Ut("Stups wird gesendet…","pending");const o=JSON.stringify(r);let s=!1;const l=()=>{if(!s){s=!0;try{jd(n)}catch{}}Ut("Fionn wurde angestupst 🫂","ok"),Promise.resolve().then(()=>mt).then(u=>u.flashHugOnLamps()).catch(()=>{}),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},c=()=>{Ut("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(u=>{u&&u.ok?l():c()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l).catch(c)}catch{c()}})}function Rp(e){const t=G(),a=p.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const i=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:i,message:i,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function ms(e){const t=p.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:G(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),i=o=>{const s=cn();!s||s.week!==e.week||(ii({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),Lt())};i("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o=>{o&&o.ok?i("sent"):i("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>i("sent")).catch(()=>i("failed"))}catch{i("failed")}})}function Up(){const e=cn();!e||e.week!==Jt()||e.remoteStatus!=="sent"&&ms(e)}function bs(e,t,a,n,r,i){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,i);else{const o=Array.isArray(i)?i:[i,i,i,i],[s,l,c,u]=o.map(g=>Math.min(g,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+u,a+r),e.quadraticCurveTo(t,a+r,t,a+r-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function br(e,t,a){const n=t.split(" "),r=[];let i="";for(const o of n){const s=i?`${i} ${o}`:o;e.measureText(s).width>a&&i?(r.push(i),i=o):i=s}return i&&r.push(i),r}function Hp(e){var z,B;const r=document.createElement("canvas"),i=Math.min(window.devicePixelRatio||1,2);r.width=640*i,r.height=340*i,r.style.width="640px",r.style.height="340px";const o=r.getContext("2d");o.scale(i,i);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",u=o.createLinearGradient(0,0,0,340);u.addColorStop(0,l),u.addColorStop(1,c),o.fillStyle=u,bs(o,0,0,640,340,20),o.fill();const g=s?"#b9782e":"#2f7a4f";o.fillStyle=g,bs(o,0,0,640,5,[20,20,0,0]),o.fill();const b=e.category.label,w=Ni(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${w} ${b}`,40,62);const m=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const f=o.measureText(m).width;o.fillText(m,600-f,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const y=br(o,e.outcome.title,640-40*2);let E=108;for(const U of y)o.fillText(U,40,E),E+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const _=br(o,e.outcome.message,640-40*2);E+=4;for(const U of _){if(E>270)break;o.fillText(U,40,E),E+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const C=((B=(z=p.theme)==null?void 0:z.brand)==null?void 0:B.machineName)||"Affektions-Gacha";o.fillText(C,40,324);const v=document.createElement("a");v.download=`gacha-${e.category.id}-${e.day}.png`,v.href=r.toDataURL("image/png"),v.click()}async function Gp(e){var E,_;const r=document.createElement("canvas");r.width=1170,r.height=2532;const i=r.getContext("2d"),o=new Image;o.crossOrigin="anonymous";try{await new Promise((C,v)=>{o.onload=C,o.onerror=v,o.src=e.photo.url})}catch{j("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/o.naturalWidth,2532/o.naturalHeight),l=o.naturalWidth*s,c=o.naturalHeight*s;i.drawImage(o,(1170-l)/2,(2532-c)/2,l,c);const u=i.createLinearGradient(0,2532*.62,0,2532);u.addColorStop(0,"rgba(8,20,14,0)"),u.addColorStop(1,"rgba(8,20,14,.82)"),i.fillStyle=u,i.fillRect(0,2532*.62,1170,2532*.38);const g=e.photo.caption||e.photo.alt||"";i.font="500 56px Boska, Georgia, serif",i.fillStyle="#fffdf2";const b=br(i,g,1170-96*2).slice(0,3);let w=2276-(b.length-1)*68;for(const C of b)i.fillText(C,96,w),w+=68;i.font="500 34px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,.62)",i.fillText(e.day,96,2356),i.fillStyle="rgba(255,255,255,.35)",i.font="28px Satoshi, Inter, system-ui, sans-serif",i.fillText(((_=(E=p.theme)==null?void 0:E.brand)==null?void 0:_.machineName)||"Affektions-Gacha",96,2406);let m;try{m=await new Promise((C,v)=>r.toBlob(z=>z?C(z):v(new Error("blob")),"image/jpeg",.92))}catch{j("Dieses Foto lässt sich nicht exportieren (CORS).");return}const f=new File([m],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[f]}))try{await navigator.share({files:[f],title:g});return}catch(C){if(C&&C.name==="AbortError")return}const y=document.createElement("a");y.download=f.name,y.href=URL.createObjectURL(m),y.click(),setTimeout(()=>URL.revokeObjectURL(y.href),4e3)}function ys(e){k.style.opacity="1",k.style.background="#0a1410",k.style.minHeight="100vh",k.style.display="flex",k.style.alignItems="center",k.style.justifyContent="center",k.style.padding="24px",k.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${W(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function Kp(){const e=d("[data-ag-button-text]");e&&(e.textContent=p.theme.brand.buttonShown)}function Yp(){return typeof navigator<"u"&&typeof navigator.share=="function"&&typeof navigator.canShare=="function"}function Vp(e,t){const a=(String(t||"image/jpeg").split("/")[1]||"jpg").replace("jpeg","jpg");return`gacha-${e.day}.${a}`}function Jp(e,t){const a=e&&e.photo;return!a||a.type==="video"||!a.url||!Yp()?!1:((async()=>{try{const n=await fetch(a.url,{mode:"cors"});if(!n.ok)throw new Error("photo fetch "+n.status);const r=await n.blob(),i=new File([r],Vp(e,r.type),{type:r.type||"image/jpeg"});if(!navigator.canShare({files:[i]}))throw new Error("cannot share files");await navigator.share({files:[i],text:Tr(e),title:"Mein Gacha-Zug"})}catch(n){if(n&&n.name==="AbortError")return;try{j("Foto hing nicht dran — nur der Text geht raus")}catch{}window.location.href=t}})(),!0)}function qa(){var b,w,m,f;p.todaysPull||(p.todaysPull=Nc());const e=d("[data-ag-draw]"),t=d("[data-ag-button-text]"),a=p.theme.loadingSteps||["Maschine rattert"];let n=0;k.classList.add("is-revealing"),e.disabled=!0,re()||Yi().catch(()=>{}),t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((p.theme.revealDelayMs||3200)/a.length))),i=p.theme.revealDelayMs||3200,o=Array.from((d("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(y=>parseFloat(y.style.getPropertyValue("--ag-emoji-duration"))||20),l=performance.now();let c;function u(y){const E=Math.min((y-l)/i,1),_=1+5*E*E;o.forEach((C,v)=>{C.style.setProperty("--ag-emoji-duration",`${(s[v]/_).toFixed(3)}s`)}),E<1&&(c=requestAnimationFrame(u))}c=requestAnimationFrame(u);const g=((w=(b=p.todaysPull)==null?void 0:b.category)==null?void 0:w.id)==="special"?"special":(f=(m=p.todaysPull)==null?void 0:m.category)==null?void 0:f.tone;window.setTimeout(()=>Tg(g),Math.max(0,i-900)),window.setTimeout(()=>{var v,z,B,U;window.clearInterval(r),cancelAnimationFrame(c),$g(),Cg(g),o.forEach((x,A)=>{x.style.setProperty("--ag-emoji-duration",`${s[A].toFixed(2)}s`)});const y=Y().some(x=>x.day===p.todaysPull.day&&x.token===p.todaysPull.token);if(p.todaysPull.collectToken&&!y&&ea(p.todaysPull.collectToken),p.todaysPull.freikarte&&!y&&ri(p.todaysPull.token),!re()){const x=gg(p.weather);x&&!p.todaysPull.weather&&(p.todaysPull.weather=x)}kt(p.todaysPull),k.classList.remove("is-revealing"),k.classList.add("is-revealed"),k.classList.add("has-drawn"),e.disabled=!1,t.textContent=p.theme.brand.buttonShown,p.revealed=!0,re()||Af(p.todaysPull),p.todaysPull.flaschenpost&&Lt(),In(),Kn();const E=He();Ht(),xf(E),window.setTimeout(()=>{try{d("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const _=(z=(v=p.todaysPull)==null?void 0:v.category)==null?void 0:z.id,C=(U=(B=p.todaysPull)==null?void 0:B.category)==null?void 0:U.tone;if(_==="special"){const x=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];Se(130,x),setTimeout(()=>Se(90,x),700),ma("special")}else if(C==="jackpot"){const x=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];Se(120,x),setTimeout(()=>Se(80,x),650),ma("jackpot")}else C==="rare"?(Se(70),ma("rare")):ma(C||"common");re()||Promise.resolve().then(()=>mt).then(x=>x.flashLightsForPull(_==="special"?"special":C)).catch(()=>{}),Bs[E]?S([30,20,30,20,60]):cc(_==="special"?"special":C),p.activeTab==="history"&&Ne(),Ao()},p.theme.revealDelayMs||3200)}function Zp(){var Xs,Qs,el,tl,al,nl,rl,il,ol,sl,ll,dl,cl,gl,ul,pl,fl,hl,ml,bl,yl,wl,xl,vl,kl,Sl,Ll,El,Tl,$l,Cl,Ml,zl,Al,_l,Dl,Nl,Il,Pl;let e=null,t=null;const a=d("[data-ag-draw]");a.addEventListener("pointerdown",()=>{t=setTimeout(Cn,3e3)}),a.addEventListener("pointerup",()=>clearTimeout(t)),a.addEventListener("pointerleave",()=>clearTimeout(t)),a.addEventListener("pointercancel",()=>clearTimeout(t));let n=0,r=null;d("[data-ag-main-title]").addEventListener("click",()=>{if(n++,clearTimeout(r),n>=5){n=0,Cn();return}r=setTimeout(()=>{n=0},1800)}),d("[data-ag-draw]").addEventListener("click",()=>{S(12),qa()}),Eg({onTilt:(h,L)=>{k.style.setProperty("--ag-foil-x",h.toFixed(1)+"%"),k.style.setProperty("--ag-foil-y",L.toFixed(1)+"%")}}),(Xs=d("#ag-btn-rave"))==null||Xs.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Qs=d("#ag-btn-rave"))==null||Qs.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(el=d("#ag-btn-baerlauch"))==null||el.addEventListener("click",Rn),(tl=d("#ag-baerlauch-close"))==null||tl.addEventListener("click",yu),(al=d("#ag-baerlauch-next"))==null||al.addEventListener("click",Rn),(nl=d("#ag-btn-baerlauch"))==null||nl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Rn())}),(rl=d("#ag-btn-gesprach"))==null||rl.addEventListener("click",Fi),(il=d("#ag-btn-glossary"))==null||il.addEventListener("click",Co),(ol=d("#ag-btn-glossary"))==null||ol.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Co())}),(sl=d("#ag-glossary-close"))==null||sl.addEventListener("click",Eu),(ll=document.getElementById("ag-glossary-refresh"))==null||ll.addEventListener("click",async()=>{const h=document.getElementById("ag-glossary-refresh");h&&(h.disabled=!0,h.textContent="⏳"),S(6);const L=await To();at(q.lang),h&&(h.textContent=L>0?`↻${L}`:"↻",setTimeout(()=>{h.textContent="↻",h.disabled=!1},3e3)),L>0&&j(`${L} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(h=>{h.addEventListener("click",()=>{const L=document.getElementById("ag-glossary-search");L&&(L.value=""),at(h.dataset.lang),S(4)})}),(dl=document.getElementById("ag-glossary-search"))==null||dl.addEventListener("input",()=>{at(q.lang)});const i=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");i&&i.addEventListener("click",()=>{var I,J;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const h=document.getElementById("ag-glossary-form-title");h&&(h.textContent="Neues Wort");const L=document.getElementById("ag-glossary-save-label");L&&(L.textContent="Eintragen");const $=document.getElementById("ag-glossary-audio-status");$&&($.textContent=""),q.audioBlob=null;const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!0),o.hidden=!1,i.hidden=!0,(I=d("[data-ag-sheet-backdrop]"))==null||I.classList.add("is-open"),(J=document.getElementById("ag-glossary-word-input"))==null||J.focus(),S(8)}),(cl=document.getElementById("ag-glossary-form-cancel"))==null||cl.addEventListener("click",()=>{var h;if(o&&(o.hidden=!0),i&&(i.hidden=!1),(h=d("[data-ag-sheet-backdrop]"))==null||h.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",q.audioBlob=null,q.recorder&&q.recorder.state!=="inactive")try{q.recorder.stop()}catch{}q.recorder=null,S(6)}),(gl=document.getElementById("ag-glossary-form-save"))==null||gl.addEventListener("click",async()=>{var J,ne,Te,ye,We;const h=(((J=document.getElementById("ag-glossary-word-input"))==null?void 0:J.value)||"").trim(),L=(((ne=document.getElementById("ag-glossary-meaning-input"))==null?void 0:ne.value)||"").trim(),$=(((Te=document.getElementById("ag-glossary-edit-id"))==null?void 0:Te.value)||"").trim();if(!h){(ye=document.getElementById("ag-glossary-word-input"))==null||ye.focus();return}const M=document.getElementById("ag-glossary-audio-status");let I=null;if(q.audioBlob){M&&(M.textContent="Wird hochgeladen…");const fe=$||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;I=await ku(q.audioBlob,fe)}if(S([20,20,40]),$){const fe={word:h,meaning:L||null};I!==null&&(fe.audioUrl=I),xu($,fe)}else Eo({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:q.lang,word:h,meaning:L||null,audioUrl:I,token:G()});o&&(o.hidden=!0),i&&(i.hidden=!1),(We=d("[data-ag-sheet-backdrop]"))==null||We.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",q.audioBlob=null,q.recorder=null,at(q.lang),j("Wort gespeichert ✓")});const s=document.getElementById("ag-glossary-record");s&&s.addEventListener("click",async()=>{if(q.recorder&&q.recorder.state==="recording"){q.recorder.stop();return}try{const h=await navigator.mediaDevices.getUserMedia({audio:!0}),L=[];q.recorder=new MediaRecorder(h),q.recorder.ondataavailable=M=>{M.data.size>0&&L.push(M.data)},q.recorder.onstop=()=>{h.getTracks().forEach(J=>J.stop()),q.audioBlob=new Blob(L,{type:q.recorder.mimeType||"audio/webm"});const M=document.getElementById("ag-glossary-audio-status");M&&(M.textContent="✓ Aufnahme bereit");const I=document.getElementById("ag-glossary-play-preview");I&&(I.hidden=!1),s.textContent="🎙 Neu aufnehmen"},q.recorder.start(),s.textContent="⏹ Stop";const $=document.getElementById("ag-glossary-audio-status");$&&($.textContent="● REC"),S(10)}catch{const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="Mikrofon nicht verfügbar")}}),(ul=document.getElementById("ag-glossary-play-preview"))==null||ul.addEventListener("click",()=>{if(!q.audioBlob)return;const h=URL.createObjectURL(q.audioBlob),L=new Audio(h);L.onended=()=>URL.revokeObjectURL(h),L.play().catch(()=>{})}),(pl=d("#ag-letter-close"))==null||pl.addEventListener("click",Mn),(fl=d("#ag-letter-overlay"))==null||fl.addEventListener("click",h=>{h.target===h.currentTarget&&Mn()}),(hl=d("#ag-lightbox-close"))==null||hl.addEventListener("click",()=>{Er()}),(ml=d("#ag-lightbox"))==null||ml.addEventListener("click",h=>{h.target===h.currentTarget&&Er()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&(Mn(),Er())}),(bl=d("#ag-gesprach-close"))==null||bl.addEventListener("click",Kc),(yl=d("#ag-kurs-close"))==null||yl.addEventListener("click",Wg),Ug(d("[data-ag-lights-toggle]")),(wl=d("#ag-gesprach-next"))==null||wl.addEventListener("click",Oi),(xl=d("#ag-gesprach-wa"))==null||xl.addEventListener("click",Yc),(vl=d("#ag-btn-gesprach"))==null||vl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Fi())}),(kl=d("#ag-btn-quest"))==null||kl.addEventListener("click",Wi),(Sl=d("#ag-quest-close"))==null||Sl.addEventListener("click",Vc),(Ll=d("#ag-btn-quest"))==null||Ll.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Wi())}),(El=d("#ag-quest-file"))==null||El.addEventListener("change",h=>{const L=h.target.files&&h.target.files[0];L&&Jc(L)}),d("[data-ag-copy]").addEventListener("click",async()=>{if(!p.todaysPull)return;S(8);const h=Tr(p.todaysPull);try{await navigator.clipboard.writeText(h),d("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{d("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",h)}}),d("[data-ag-save-img]").addEventListener("click",()=>{p.todaysPull&&(S(8),Hp(p.todaysPull))}),d("[data-ag-send]").addEventListener("click",h=>{p.todaysPull&&(S(8),Jp(p.todaysPull,h.currentTarget.href)&&h.preventDefault())}),d("[data-ag-star]").addEventListener("click",()=>{S(8),Rs(p.todaysPull)}),(Tl=d("[data-ag-wallpaper]"))==null||Tl.addEventListener("click",()=>{!p.todaysPull||!p.todaysPull.photo||(S(8),Gp(p.todaysPull))});const l=d("[data-ag-sync-status]");if(l){let h=null;l.addEventListener("click",()=>{l.classList.add("is-open"),clearTimeout(h),h=setTimeout(()=>l.classList.remove("is-open"),2500)})}const c=d("[data-ag-ferien-toggle]"),u=d("[data-ag-ferien-body]");c&&u&&c.addEventListener("click",()=>{const h=u.hidden;u.hidden=!h,c.setAttribute("aria-expanded",String(h)),S(6)}),($l=d("[data-ag-ferien-add]"))==null||$l.addEventListener("click",()=>{var M,I;const h=(((M=d("[data-ag-ferien-from]"))==null?void 0:M.value)||"").trim(),L=(((I=d("[data-ag-ferien-to]"))==null?void 0:I.value)||h).trim();if(!h){j("Erst ein Datum wählen");return}if(!Yd(h,L)){j("Höchstens 60 Tage am Stück");return}S([12,20,12]),Mr(),Ht()});const g=d("[data-capsule]");if(g){let L=null,$=null,M=!1,I=0;const J=()=>!k.classList.contains("has-drawn")&&!k.classList.contains("is-revealing")&&!re(),ne=()=>{clearTimeout(L),clearInterval($),L=$=null,I=0,k.classList.remove("is-charging","is-charged")};g.addEventListener("pointerdown",ye=>{J()&&(ye.preventDefault(),M=!1,k.classList.add("is-charging"),$=setInterval(()=>{I++,S(6+I*2)},130),L=setTimeout(()=>{M=!0,k.classList.add("is-charged"),S([20,30,40])},650))});const Te=()=>{const ye=M&&J();ne(),M=!1,ye&&qa()};g.addEventListener("pointerup",Te),g.addEventListener("keydown",ye=>{(ye.key==="Enter"||ye.key===" ")&&J()&&(ye.preventDefault(),S(12),qa())}),g.addEventListener("pointercancel",()=>{ne(),M=!1}),g.addEventListener("pointerleave",()=>{ne(),M=!1})}Dg(d("[data-ag-knob]"),{drawable:()=>!k.classList.contains("has-drawn")&&!k.classList.contains("is-revealing")&&!re(),onFire:()=>qa(),onHold:Cn,onTick:(h,L)=>{L||(k.classList.add("is-charging"),clearTimeout(e),e=setTimeout(()=>k.classList.remove("is-charging"),600),h%4===0&&ba())}});const b=d("[data-ag-candle]");b==null||b.addEventListener("click",()=>{bc()?$n():yc({onChange:h=>b.classList.toggle("is-lit",h)})}),Gg(d("[data-ag-result]"),()=>{const h=p.todaysPull;!h||re()||(qs(h)||Rs(h),Kg(d("[data-ag-result]")),j("Als Liebling gespeichert ⭐"))}),(Cl=d("[data-ag-freikarte-redeem]"))==null||Cl.addEventListener("click",()=>{const h=p.todaysPull;if(!h)return;const L=h.category.tone;if(L!=="quiet"&&L!=="cursed"||!vd(h.token))return;const $=He(),M=Ic(h.day,$);Sd(h.token,h.day,{categoryId:M.category.id,outcomeTitle:M.outcome.title}),p.todaysPull={...h,category:M.category,outcome:M.outcome,photo:M.photo,collectToken:M.collectToken,voucher:M.voucher,freikarte:M.freikarte,unlockTime:null,promptAnswer:null};const I=Y(),J=I.findIndex(ne=>ne.day===h.day&&ne.token===h.token);J!==-1&&(I[J]={...I[J],categoryId:M.category.id,categoryLabel:M.category.label,tone:M.category.tone,title:M.outcome.title,message:M.outcome.message,link:M.outcome.link||null,unlockTime:null,promptAnswer:null,photo:M.photo?{url:M.photo.url,alt:M.photo.alt||"",caption:(M.photo.caption||"").trim(),type:M.photo.type==="video"?"video":"image"}:null,voucher:M.voucher||!1},Ie(I)),p.todaysPull.collectToken&&ea(p.todaysPull.collectToken),p.todaysPull.freikarte&&ri(p.todaysPull.token),we(),kt(p.todaysPull),p.activeTab==="history"&&Ne(),Se(50),j("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),S([20,20,40])});const w=d("[data-ag-streak-restore]");w&&w.addEventListener("click",()=>{if(!wi()){kr();return}const h=wn(),L=ca(),$=da()>0&&L-da()<=0,M=L-1,I=$?`🎂 Geschenk: ${ke(h)} retten? Nochmal tippen`:`${ke(h)} retten${M>0?` (${M} übrig)`:", der letzte"}? Nochmal tippen`;if(!ut(w,I))return;w.disabled=!0;const J=ac();Ne(),Ht(),J&&(Se(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),S([30,20,30,20,60])),kr(),w.disabled=!1});const m=d("[data-ag-sync-btn]");m&&m.addEventListener("click",async()=>{m.textContent="⏳",m.disabled=!0;const h=await At();Ne(),m.textContent=h<0?"✗":`✓${h}`,setTimeout(()=>{m.textContent="☁",m.disabled=!1},3e3)}),k.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(h=>{h.addEventListener("click",()=>{S(5),uf(h.dataset.agFilter)})}),k.querySelectorAll("[data-ag-tab]").forEach(h=>{h.addEventListener("click",()=>{S(6),Oa(h.dataset.agTab)})}),function(){const L=k.querySelector(".ag-bottomnav"),$=window.visualViewport;if(!L||!$)return;const M=()=>{const I=$.height<window.innerHeight*.72;L.classList.toggle("is-keyboard",I);const J=Math.max(0,Math.round(window.innerHeight-($.offsetTop+$.height)));L.style.setProperty("--ag-nav-shift",`${I?0:J}px`)};$.addEventListener("resize",M),$.addEventListener("scroll",M),window.addEventListener("orientationchange",()=>setTimeout(M,350)),document.addEventListener("focusout",()=>setTimeout(M,250)),window.addEventListener("pageshow",M),M()}();const f=k.querySelector(".ag-bottomnav");if(f){const h=f.querySelector(".ag-nav-pill"),L=[...f.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let $=null;f.addEventListener("pointerdown",I=>{const J=f.getBoundingClientRect(),ne=parseFloat(h==null?void 0:h.style.width)||54;$={id:I.pointerId,startX:I.clientX-J.left,pillStartCentre:(parseFloat(h==null?void 0:h.style.left)||0)+ne/2,pillWidth:ne,moved:!1,suppress:!1,captured:!1}}),f.addEventListener("pointermove",I=>{if(!$||I.pointerId!==$.id)return;const J=f.getBoundingClientRect(),ne=I.clientX-J.left-$.startX;if(!$.moved&&Math.abs(ne)<6||($.captured||(f.setPointerCapture(I.pointerId),$.captured=!0),$.moved=!0,$.suppress=!0,!h))return;h.style.transition="none";const Te=f.getBoundingClientRect(),ye=$.pillStartCentre+ne,We=$.pillWidth/2;let fe=ye-We;fe<0?fe=fe*.25:fe+$.pillWidth>Te.width&&(fe=Te.width-$.pillWidth+(fe+$.pillWidth-Te.width)*.25),h.style.left=`${fe}px`});const M=I=>{if(!$||I.pointerId!==$.id)return;const J=$.moved,ne=$.suppress;if($=null,h&&(h.style.transition=""),!J)return;const Te=f.getBoundingClientRect(),ye=I.clientX-Te.left;let We=L[0],fe=1/0;if(L.forEach(rt=>{const et=rt.getBoundingClientRect(),Ja=et.left-Te.left+et.width/2,Vt=Math.abs(ye-Ja);Vt<fe&&(fe=Vt,We=rt)}),S(6),Oa(We.dataset.agTab),ne){const rt=et=>{et.stopImmediatePropagation(),et.preventDefault()};f.addEventListener("click",rt,{capture:!0,once:!0})}};f.addEventListener("pointerup",M),f.addEventListener("pointercancel",I=>{!$||I.pointerId!==$.id||($=null,h&&(h.style.transition=""),Oa(p.activeTab))})}k.addEventListener("ag-synced",()=>{try{if(vt(),p.todaysPull&&p.revealed&&Ps(p.todaysPull),Lt(),p._newPing){p._newPing=!1;const h=d("[data-ag-ping-banner]");h&&(h.hidden=!1);try{S([10,40,10])}catch{}}}catch{}}),(Ml=d("#ag-btn-skincare"))==null||Ml.addEventListener("click",bo),(zl=d("#ag-btn-skincare"))==null||zl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),bo())}),(Al=d("#ag-skincare-close"))==null||Al.addEventListener("click",Xg),(_l=d("#ag-btn-stimmung"))==null||_l.addEventListener("click",Ti),(Dl=d("#ag-btn-stimmung"))==null||Dl.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Ti())}),(Nl=d("#ag-stimmung-close"))==null||Nl.addEventListener("click",sc),lc();const y=d("[data-ag-berge-add]"),E=d("[data-ag-berge-form]"),_=d("[data-ag-berge-cancel]"),C=d("[data-ag-berge-save]");y&&y.addEventListener("click",()=>{var L,$;S(8);const h=d("[data-ag-berge-date]");h&&!h.value&&(h.value=Q(((L=p.theme)==null?void 0:L.timezone)||"Europe/Zurich")),E.hidden=!1,y.hidden=!0,($=d("[data-ag-sheet-backdrop]"))==null||$.classList.add("is-open"),d("[data-ag-berge-name]").focus()}),_&&_.addEventListener("click",()=>{var I;S(6),E.hidden=!0,y.hidden=!1,(I=d("[data-ag-sheet-backdrop]"))==null||I.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(J=>{const ne=d(J);ne&&(ne.value="")});const h=d("[data-ag-loc-search]");h&&(h.value="");const L=d("[data-ag-loc-dropdown]");L&&(L.hidden=!0,L.innerHTML="");const $=d("[data-ag-berge-form-title]");$&&($.textContent="Neuer Gipfeleintrag");const M=d("[data-ag-berge-save] span:last-child");M&&(M.textContent="Eintragen")}),C&&C.addEventListener("click",()=>{var Bl,jl,Fl,Ol,ql,Wl,Rl,Ul,Hl,Gl,Kl,Yl,Vl,Jl;const h=(((Bl=d("[data-ag-berge-name]"))==null?void 0:Bl.value)||"").trim(),L=parseFloat(((jl=d("[data-ag-berge-dist]"))==null?void 0:jl.value)||""),$=parseInt(((Fl=d("[data-ag-berge-gain]"))==null?void 0:Fl.value)||"",10),M=((Ol=d("[data-ag-berge-date]"))==null?void 0:Ol.value)||Q(((ql=p.theme)==null?void 0:ql.timezone)||"Europe/Zurich"),I=(((Wl=d("[data-ag-berge-url]"))==null?void 0:Wl.value)||"").trim(),J=(((Rl=d("[data-ag-berge-cover]"))==null?void 0:Rl.value)||"").trim(),ne=(((Ul=d("[data-ag-berge-notes]"))==null?void 0:Ul.value)||"").trim(),Te=(((Hl=d("[data-ag-berge-edit-id]"))==null?void 0:Hl.value)||"").trim(),ye=(((Gl=d("[data-ag-berge-lat]"))==null?void 0:Gl.value)||"").trim()||null,We=(((Kl=d("[data-ag-berge-lng]"))==null?void 0:Kl.value)||"").trim()||null,fe=(((Yl=d("[data-ag-berge-loc-label]"))==null?void 0:Yl.value)||"").trim()||null;if(!h){(Vl=d("[data-ag-berge-name]"))==null||Vl.focus();return}S([20,20,40]);const rt={name:h,elevation:null,distance:isNaN(L)?null:L,elevGain:isNaN($)?null:$,date:M,activityUrl:I||null,cover:J||null,notes:ne||null,lat:ye,lng:We,locLabel:fe};Te?lu(Te,rt):ou({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...rt,token:G()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Xf=>{const Zl=d(Xf);Zl&&(Zl.value="")});const et=d("[data-ag-loc-search]");et&&(et.value="");const Ja=d("[data-ag-berge-form-title]");Ja&&(Ja.textContent="Neuer Gipfeleintrag");const Vt=d("[data-ag-berge-save] span:last-child");Vt&&(Vt.textContent="Eintragen"),E.hidden=!0,y.hidden=!1,(Jl=d("[data-ag-sheet-backdrop]"))==null||Jl.classList.remove("is-open"),Nt(),j("Gipfel gespeichert ✓")}),gu();const v=d("[data-ag-ping-dismiss]");v&&v.addEventListener("click",()=>{const h=d("[data-ag-ping-banner]");h&&(h.hidden=!0)});const z=d("[data-ag-hug-send]");z&&z.addEventListener("click",()=>{S([20,30,20]);try{Wp()}catch{}});const B=d("[data-ag-post-open]"),U=d("[data-ag-post-form]"),x=d("[data-ag-post-idle]");let A="30";if(B&&U&&x){B.addEventListener("click",()=>{S(8),x.hidden=!0,U.hidden=!1;const h=d("[data-ag-post-input]");h&&h.focus()}),(Il=d("[data-ag-post-cancel]"))==null||Il.addEventListener("click",()=>{U.hidden=!0,x.hidden=!1});for(const h of U.querySelectorAll("[data-ag-post-mode]"))h.addEventListener("click",()=>{A=h.dataset.agPostMode;for(const L of U.querySelectorAll("[data-ag-post-mode]")){const $=L===h;L.classList.toggle("is-active",$),L.setAttribute("aria-checked",$?"true":"false")}S(6)});(Pl=d("[data-ag-post-seal]"))==null||Pl.addEventListener("click",()=>{const h=d("[data-ag-post-input]"),L=(h&&h.value||"").trim();if(!L){h&&h.focus();return}const $=Q(p.theme.timezone);if(Rd(L,A,$)){h&&(h.value=""),U.hidden=!0,x.hidden=!1,S([20,30,40]);try{Se(40,["#8fcf9e","#e0a75d","#fff"])}catch{}j(A==="30"?"🍾 Versiegelt. In dreissig Tagen kommt sie zurück.":"🍾 Versiegelt. Die Maschine gibt sie dir zurück, wann sie will."),Lt(),we()}})}const T=d("[data-ag-wish-open]"),N=d("[data-ag-wish-cancel]"),F=d("[data-ag-wish-submit]");T&&T.addEventListener("click",()=>{S(8),d("[data-ag-wish-idle]").hidden=!0,d("[data-ag-wish-form]").hidden=!1;const h=d("[data-ag-wish-input]");h&&window.setTimeout(()=>h.focus(),60)}),N&&N.addEventListener("click",()=>{S(6),d("[data-ag-wish-form]").hidden=!0,d("[data-ag-wish-idle]").hidden=!1}),F&&F.addEventListener("click",()=>{const h=d("[data-ag-wish-input]"),L=((h==null?void 0:h.value)||"").trim();if(!L)return;S([20,20,40]);const $={week:Jt(),text:L,submittedAt:Date.now(),remoteStatus:"idle"};ii($),Lt();try{ms($)}catch{}});const O=d("[data-ag-notif-enable]"),ae=d("[data-ag-notif-dismiss]");O&&O.addEventListener("click",()=>{S(10),Mu()}),ae&&ae.addEventListener("click",()=>{S(6);try{window.localStorage.setItem(it,"dismissed")}catch{}const h=d("[data-ag-notif-card]");h&&(h.hidden=!0)});const P=d("[data-ag-sheet-backdrop]");P&&P.addEventListener("click",()=>{S(6);const h=d("[data-ag-berge-form]"),L=d("[data-ag-berge-add]");h&&!h.hidden&&(h.hidden=!0,L&&(L.hidden=!1));const $=document.getElementById("ag-glossary-form"),M=document.getElementById("ag-glossary-add");$&&!$.hidden&&($.hidden=!0,M&&(M.hidden=!1)),P.classList.remove("is-open")});const D=d("[data-ag-fab]");D&&D.addEventListener("click",()=>{S(8);const h=d("[data-ag-berge-add]");h&&!h.hidden&&h.click()});const H=["today","history","lieblinge","berge"];let be=0,R=0;const ue=d(".ag-content")||k;ue.addEventListener("touchstart",h=>{be=h.touches[0].clientX,R=h.touches[0].clientY},{passive:!0}),ue.addEventListener("touchend",h=>{const L=h.changedTouches[0].clientX-be,$=Math.abs(h.changedTouches[0].clientY-R);if(Math.abs(L)>52&&$<44){const M=H.indexOf(p.activeTab),I=L<0?Math.min(M+1,H.length-1):Math.max(M-1,0);I!==M&&(S(6),Oa(H[I]))}},{passive:!0});const qe=d("[data-ag-ptr]");let Ya=0,Va=!1;document.addEventListener("touchstart",h=>{window.scrollY===0&&(Ya=h.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",h=>{if(!Ya)return;h.touches[0].clientY-Ya>64&&!Va&&qe&&(Va=!0,qe.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Va&&qe&&(qe.classList.add("is-loading"),await At(),p.activeTab==="berge"&&Nt(),p.activeTab==="history"&&Ne(),qe.classList.remove("is-visible","is-loading"),j("Aktualisiert ✓")),Ya=0,Va=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const h=document.querySelector(".ag-widget");h==null||h.classList.toggle("ag-paused",document.hidden)})}const ws="affektions-gacha:aufkleber:v1",Xp=.04,Qp=.96;function xs(){try{const e=window.localStorage.getItem(ws),t=e?JSON.parse(e):{};return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function ef(e){try{window.localStorage.setItem(ws,JSON.stringify(e))}catch{}}const Wa=e=>Math.min(Qp,Math.max(Xp,Number(e)||0));function Ra(e){return{x:.86,y:.1,rot:Math.round((he(`aufkleber:${e}`)-.5)*28)}}function tf(e){const t=xs()[e];return t&&typeof t=="object"?t:null}function yr(e,{emoji:t,x:a,y:n,rot:r}){const i=xs(),o=i[e]||{},s={emoji:t||o.emoji||"",x:Wa(a??o.x??Ra(e).x),y:Wa(n??o.y??Ra(e).y),rot:Number.isFinite(r)?r:Number.isFinite(o.rot)?o.rot:Ra(e).rot};i[e]=s;const l=Object.keys(i).sort();for(;l.length>400;)delete i[l.shift()];return ef(i),s}function vs(e,t){e.style.left=`${(t.x*100).toFixed(2)}%`,e.style.top=`${(t.y*100).toFixed(2)}%`,e.style.setProperty("--ag-aufkleber-rot",`${t.rot}deg`)}function ks(e,t,a,{peelFrom:n=null}={}){if(!e||(e.innerHTML="",!a))return;const r=tf(t)||yr(t,{emoji:a,...Ra(t)});r.emoji!==a&&yr(t,{emoji:a});const i=document.createElement("span");if(i.className="ag-aufkleber",i.textContent=a,i.title="Aufkleber — zieh mich, wohin du willst",vs(i,r),e.appendChild(i),af(i,e,t),n){const o=n.getBoundingClientRect(),s=i.getBoundingClientRect();if(o.width&&s.width){const l=o.left+o.width/2-(s.left+s.width/2),c=o.top+o.height/2-(s.top+s.height/2);i.animate([{transform:`translate(calc(-50% + ${l.toFixed(0)}px), calc(-50% + ${c.toFixed(0)}px)) rotate(0deg) scale(.9)`,opacity:.6},{transform:`translate(calc(-50% + ${(l*.4).toFixed(0)}px), calc(-50% + ${(c*.4-30).toFixed(0)}px)) rotate(${r.rot*2}deg) scale(1.5) rotateX(50deg)`,opacity:1,offset:.55},{transform:`translate(-50%,-50%) rotate(${r.rot}deg) scale(1)`,opacity:1}],{duration:640,easing:"cubic-bezier(.2,.8,.2,1)"})}}}function af(e,t,a){let n=null;e.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),n={r:t.getBoundingClientRect(),moved:!1,x0:i.clientX,y0:i.clientY},e.classList.add("is-dragging");try{e.setPointerCapture(i.pointerId)}catch{}}),e.addEventListener("pointermove",i=>{if(!n)return;Math.hypot(i.clientX-n.x0,i.clientY-n.y0)>4&&(n.moved=!0);const o=Wa((i.clientX-n.r.left)/n.r.width),s=Wa((i.clientY-n.r.top)/n.r.height);e.style.left=`${(o*100).toFixed(2)}%`,e.style.top=`${(s*100).toFixed(2)}%`,n.x=o,n.y=s});const r=()=>{if(!n)return;const i=n;if(n=null,e.classList.remove("is-dragging"),i.moved&&i.x!==void 0){const o=Math.round((Math.random()-.5)*24),s=yr(a,{x:i.x,y:i.y,rot:o});vs(e,s),S(8)}};e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("lostpointercapture",r)}const Ss=170,Ls=150,nf=110,wr=230,Es=64;function rf(e,t,{after:a=-1,extra:n=0}={}){const r=[];for(let i=0;i<e;i++){const o=i%2===0,s=a>=0&&i>a?n:0;r.push({x:Math.round(t*(o?.24:.76)),y:Ls+i*Ss+s,left:o})}return r}function of(e,t=0){return Ls+Math.max(0,e-1)*Ss+nf+(e?t:0)}function sf(e,t,a){const n={x:Math.round(t/2),y:a-40},r={x:Math.round(t/2),y:58},i=[n,...[...e].reverse(),r];let o=`M${i[0].x},${i[0].y}`;for(let s=1;s<i.length;s++){const l=i[s-1],c=i[s],u=(l.y+c.y)/2;o+=` C${l.x},${u} ${c.x},${u} ${c.x},${c.y}`}return o}function lf(e,t,a="wanderweg"){const n=[];let r=0;for(let i=wr*.6;i<t+wr;i+=wr,r++){const o=[];for(let c=0;c<=7;c++){const u=Math.round(e*c/7),g=he(`${a}:${r}:${c}`)*70-20;o.push(`${u},${Math.round(i-g)}`)}const l=Math.min(1,i/t);n.push({points:`0,${i+80} ${o.join(" ")} ${e},${i+80}`,opacity:.22+l*.5})}return n}function Ts(e,t=72){const a=String(e||"").replace(/\s+/g," ").trim();if(!a)return"";const n=a.match(/^.*?[.!?…](\s|$)/);let r=(n?n[0]:a).trim();return r.length>t&&(r=r.slice(0,t-1).trimEnd()+"…"),r}function $s(e,t,a){const r=1-(a/2-e)/t;return Math.min(1,Math.max(0,r))}const Cs={photo:"📷",jackpot:"💎",special:"🎉",rare:"✨",quest:"🧭",warm:"🫶",cursed:"🪨",quiet:"🪨",soft:"🌿",uncommon:"🌼"};function df(e){return e.photo?Cs.photo:Cs[e.tone]||"🌿"}function Ms(e,t,{width:a,onOpen:n,expanded:r=-1,renderCard:i,extra:o=0,_pass:s=0}={}){const l=Math.max(220,Math.round(a||e.clientWidth||300)),c=r>=0&&r<t.length&&typeof i=="function",u=of(t.length,c?o:0),g=rf(t.length,l,{after:c?r:-1,extra:c?o:0}),b=sf(g,l,u),w=lf(l,u),m=[];for(let f=0;f<18;f++){const y=Math.round(he(`star:x:${f}`)*l),E=Math.round(he(`star:y:${f}`)*Math.min(u,420));m.push(`<circle cx="${y}" cy="${E}" r="${(.6+he(`star:r:${f}`)*1.1).toFixed(1)}" class="ag-ww-star" style="animation-delay:${(he(`star:d:${f}`)*4).toFixed(1)}s"/>`)}if(e.style.height=`${u}px`,e.innerHTML=`
    <svg class="ag-ww-scene" width="${l}" height="${u}" viewBox="0 0 ${l} ${u}" aria-hidden="true">
      <defs>
        <linearGradient id="ag-ww-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0b1a2a"/><stop offset=".45" stop-color="#10261c"/><stop offset="1" stop-color="#1a3324"/>
        </linearGradient>
      </defs>
      <rect width="${l}" height="${u}" fill="url(#ag-ww-sky)"/>
      ${m.join("")}
      ${w.map(f=>`<polygon points="${f.points}" class="ag-ww-ridge" style="opacity:${f.opacity.toFixed(2)}"/>`).join("")}
      <path class="ag-ww-trail-shadow" d="${b}"/>
      <path class="ag-ww-trail" d="${b}" data-ag-ww-trail/>
    </svg>
    <div class="ag-ww-summit" style="left:${Math.round(l/2)}px;top:58px"><span class="ag-ww-flag">🚩</span><span class="ag-ww-summit-label">Gipfel · ${t.length} ${t.length===1?"Liebling":"Lieblinge"}</span></div>
    <div class="ag-ww-start" style="left:${Math.round(l/2)}px;top:${u-40}px"><span class="ag-ww-start-label">Start</span></div>
    <div class="ag-ww-hiker" data-ag-ww-hiker aria-hidden="true">🚶</div>
    ${t.map((f,y)=>cf(f,g[y],y,y===r&&c)).join("")}
  `,c){const f=document.createElement("div");f.className="ag-ww-card",f.style.top=`${g[r].y+Es}px`,f.appendChild(i(t[r])),e.appendChild(f);const y=f.offsetHeight+Es+24;if(s<1&&Math.abs(y-o)>2)return Ms(e,t,{width:l,onOpen:n,expanded:r,renderCard:i,extra:y,_pass:s+1})}return e.querySelectorAll("[data-ag-ww-stop]").forEach(f=>{f.addEventListener("click",()=>n&&n(t[Number(f.dataset.agWwStop)],f)),f.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),n&&n(t[Number(f.dataset.agWwStop)],f))})}),xr(e,0),{width:l,height:u}}function cf(e,t,a,n=!1){const r=(t.left?"is-left":"is-right")+(n?" is-open":""),i=e.photo&&e.photo.url&&e.photo.type!=="video",o=i?`<span class="ag-ww-thumb"><img src="${W(e.photo.url)}" alt="" loading="lazy"></span>`:`<span class="ag-ww-mark">${df(e)}</span>`,s=W(i&&(e.photo.caption||"").trim()||Ts(e.message));return`
    <button class="ag-ww-stop ${r}" type="button" data-ag-ww-stop="${a}" style="left:${t.x}px;top:${t.y}px" data-tone="${W(e.tone||"soft")}" aria-expanded="${n?"true":"false"}">
      <span class="ag-ww-dot"></span>
      <span class="ag-ww-label">
        ${o}
        <span class="ag-ww-text">
          <span class="ag-ww-date">${W(ke(e.day))}</span>
          <span class="ag-ww-title">${W(e.title||"")}</span>
          ${s?`<span class="ag-ww-line">${s}</span>`:""}
        </span>
      </span>
    </button>`}function xr(e,t){const a=e.querySelector("[data-ag-ww-trail]"),n=e.querySelector("[data-ag-ww-hiker]");if(!a||!n||typeof a.getTotalLength!="function")return;const r=a.getTotalLength();if(!r)return;const i=Math.min(r,Math.max(0,t*r)),o=a.getPointAtLength(i),s=a.getPointAtLength(Math.min(r,i+6));n.style.left=`${o.x}px`,n.style.top=`${o.y}px`,n.classList.toggle("is-facing-left",s.x<o.x-.5)}let zs=!1;function gf(e){if(zs)return;zs=!0;let t=0;const a=()=>{t=0;const r=e();if(!r||!r.isConnected||r.offsetParent===null)return;const i=r.getBoundingClientRect();xr(r,$s(i.top,i.height,window.innerHeight))},n=()=>{t||(t=requestAnimationFrame(a))};return window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),a}let Qe=null,je="all";function uf(e){je=e==="vouchers"||e==="open"?e:"all",Cr=$r,Ne()}function vr(e){return e?W(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ua(){return G().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||p.theme.brand.displayNameDefault||"Lennart"}function pf(){return["Bärlauch","Rave 🪩","Glossar 📖"]}let As=null;function _s(e){try{const[t,a,n]=e.split("-").map(Number);As||(As=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}));const r=As.formatToParts(new Date(Date.UTC(t,a-1,n,12))),i=o=>(r.find(s=>s.type===o)||{}).value||"";return`${i("weekday").replace(/\.$/,"")}, ${i("day")}. ${i("month")}`}catch{return e}}function ff(){const e=Q(p.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const hf=["🚴","🧄"],mf=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Ds(){const e=Q(p.theme.timezone),t=G();return`${p.theme.secret}|${t}|${e}|emoji`}function bf(){const e=Ds(),t=3+Math.floor(he(`${e}|count`)*3),a=mf.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const i=Math.floor(he(`${e}|pick|${r}`)*a.length);n.push(a.splice(i,1)[0])}return[...hf,...n]}let Ns=!1;function Is(){const e=d("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=bf(),a=t.length,n=Ds(),r=e.clientWidth||250;if(!Ns){Ns=!0;let i=null;window.addEventListener("resize",()=>{clearTimeout(i),i=setTimeout(Is,200)})}t.forEach((i,o)=>{const s=document.createElement("span");s.className="ag-emoji",s.textContent=i;const l=360/a*o,c=(he(`${n}|angle|${o}`)-.5)*28,u=l+c,g=he(`${n}|radius|${o}`)*.1-.05,b=16+he(`${n}|dur|${o}`)*10,w=-he(`${n}|delay|${o}`)*b,m=he(`${n}|dir|${o}`)>.5?1:-1;s.style.setProperty("--ag-emoji-angle",`${u}deg`),s.style.setProperty("--ag-emoji-radius",`${(r*(.42+g)).toFixed(1)}px`),s.style.setProperty("--ag-emoji-duration",`${b.toFixed(2)}s`),s.style.setProperty("--ag-emoji-delay",`${w.toFixed(2)}s`),s.style.setProperty("--ag-emoji-direction",m===1?"normal":"reverse"),mg(s),e.appendChild(s)})}function Ht(){const e=d("[data-ag-streak]"),t=He(),a=Ue();if(t>(a.maxStreak||0)&&na({...a,maxStreak:t}),e){const n=mi(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}kr()}function kr(){const e=d("[data-ag-streak-restore]");e&&(e.hidden=!wi());const t=d("[data-ag-streak-gems]");if(t){const a=ca();t.hidden=!(a>0),t.textContent=`💎 ×${a}`,t.title=`${a} Streak-Retter in der Bank — springt ein, wenn mal ein Tag fehlt`,t.setAttribute("aria-label",t.title)}}function yf(){const e=d("[data-ag-hugs]"),t=d("[data-ag-hugs-row]"),a=d("[data-ag-hugs-label]");if(!e||!t||!a)return;const n=gi();if(e.hidden=!n.length,!n.length)return;const r=n[0].slice(0,10);a.textContent=`${n.length} ${n.length===1?"Umarmung":"Umarmungen"} seit ${ke(r)}`,t.innerHTML=n.slice(-120).map(i=>`<button type="button" class="ag-hug-heart" data-ts="${W(i)}" aria-label="Umarmung">♥</button>`).join(""),t.onclick=i=>{var c;const o=i.target.closest("[data-ts]");if(!o)return;const s=new Date(o.dataset.ts);let l=o.dataset.ts.slice(0,10);try{l=new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:((c=p.theme)==null?void 0:c.timezone)||"UTC"}).format(s)}catch{}o.classList.add("is-flare"),setTimeout(()=>o.classList.remove("is-flare"),700),j(`🫂 Umarmung am ${l}`)}}const Sr={erfuellt:"erfüllt 🌿",irgendwann:"irgendwann 🕰","lieber-nicht":"lieber nicht ✗"};function wf(e,t){const a=Sr[e.status];if(!a)return"";const n=Math.round((Date.parse(t+"T12:00:00Z")-Date.parse(e.timestamp))/864e5);return`Dein Wunsch ${n>=14?"von neulich":n>=6?"von letzter Woche":"von dieser Woche"}: ${a}`}function Ps(e){var i;const t=d("[data-ag-wish-reply]");if(!t)return;if(re()){t.hidden=!0;return}const a=Q(((i=p.theme)==null?void 0:i.timezone)||"UTC"),n=Id(a),r=n?wf(n,a):"";if(!r){t.hidden=!0;return}t.textContent=r,t.title=n.text?`„${n.text}"`:"",t.hidden=!1,Pd(n.statusAt,a)}const Bs={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function xf(e){const t=d("[data-ag-milestone]");if(!t)return;const a=Bs[e];if(!a){t.hidden=!0;return}const n=G();if(zd(n,e)){t.hidden=!0;return}d("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Ad(n,e)}function vf(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((l,c)=>{const u=document.createElement("div");u.className="ag-prompt-field";const g=document.createElement("p");g.className="ag-prompt-question",g.textContent=(c===0?"💭 ":"🌱 ")+l;const b=document.createElement("textarea");return b.className="ag-prompt-textarea",b.placeholder="Schreib hier deine Antwort...",b.rows=a.length>1?3:4,b.setAttribute("aria-label",l),u.appendChild(g),u.appendChild(b),n.appendChild(u),{question:l,textarea:b}}),i=document.createElement("p");i.className="ag-pin-err",i.hidden=!0,i.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const l=r.filter(u=>!u.textarea.value.trim());if(l.length){i.hidden=!1;for(const u of l)u.textarea.classList.add("ag-pin-shake"),setTimeout(()=>u.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(u=>u.question+`
`+u.textarea.value.trim()).join(`

`);t(c)}o.addEventListener("click",s);for(const l of r)l.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(i),n.appendChild(o),n}function kf(e){return Array.isArray(e)?e.join(`
`):e}function Sf(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Lf(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:kf(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Ef(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Kapsel.";const i=document.createElement("div");i.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(l.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",u=>{u.key==="Enter"&&c()}),i.appendChild(o),i.appendChild(s),n.appendChild(r),n.appendChild(i),n.appendChild(l),n}function Tf(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const i=document.createElement("p");i.className="ag-pin-hint",i.style.marginTop="10px",i.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),Ha(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",u),s.addEventListener("keydown",g=>{g.key==="Enter"&&u()}),o.appendChild(s),o.appendChild(l),n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(c),n}function $f(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${r}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function js(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function Ha(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=Ce(t);if(!a){e.hidden=!0;return}const n=$f(a);e.appendChild(n||js(a)),e.hidden=!1}function Cf(e){const t=d("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||re()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),i=e.token,o=Y().filter(g=>g.token===i&&typeof g.day=="string"&&g.day.slice(5)===n&&Number(g.day.slice(0,4))<r).sort((g,b)=>b.day.localeCompare(g.day));if(!o.length)return;const s=o[0],l=r-Number(s.day.slice(0,4)),c=d("[data-ag-memory-label]"),u=d("[data-ag-memory-text]");c&&(c.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),u&&(u.textContent=s.title||""),t.hidden=!1}function Fs(e){const t=tn(e),a=an(e);if(bd(e),we(),p.wishInbox&&p.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:G(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(p.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Mf(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=ot()[a]||0,r=an(a),i=tn(a);if(n>=i)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(i)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${i} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",s=>{Zi(a,s.currentTarget),Fs(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',vt()});else{const s=i-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(i-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function vt(){const e=d("[data-ag-tokenbank]");if(!e)return;const t=ot(),a=Object.keys(en).map(l=>{const c=tn(l),u=Math.min(t[l]||0,c);return{emoji:l,goal:c,count:u,raw:t[l]||0,reward:an(l),done:(t[l]||0)>=c}}),n=a.reduce((l,c)=>l+c.raw,0),r=a.filter(l=>l.done).length,i=a.filter(l=>l.raw>0),o=a.length-i.length;i.sort((l,c)=>c.done-l.done||c.count/c.goal-l.count/l.goal||l.goal-c.goal);const s=d("[data-ag-tokenbank-head]");if(s){const l=o?` · ${o} ${o===1?"Sorte":"Sorten"} noch unentdeckt`:"",c=bn(st().count),u=c.inCycle||st().count?` · Pfand ${c.inCycle}/${c.every}`:"";s.textContent=(n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`)+u}e.innerHTML="";for(const l of i){const c=document.createElement("div");if(c.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${W(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const u=document.createElement("button");u.type="button",u.className="ag-tokenrow-redeem",u.textContent="Einlösen",u.addEventListener("click",()=>{Zi(l.emoji,u),Fs(l.emoji),S([12,30,12]),j(`${l.emoji} eingelöst — Fionn weiss Bescheid`),vt()}),c.appendChild(u)}e.appendChild(c)}}function Os(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let i;if(t.type==="video"){const o=gd(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${o}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",g),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const b=document.createElement("iframe");b.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,b.allow="autoplay",b.setAttribute("allowfullscreen",""),b.setAttribute("frameborder","0"),b.setAttribute("aria-label",a),b.className="ag-drive-iframe",s.appendChild(b)},g=b=>{(b.key==="Enter"||b.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",g),i=s}else i=document.createElement("video"),i.src=Ce(t.url),i.controls=!0,i.muted=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("preload","metadata"),i.setAttribute("aria-label",a),i.className="ag-media-content"}else i=document.createElement("img"),i.alt=a,i.loading="eager",i.decoding="auto",i.className="ag-media-content",i.addEventListener("load",()=>{const o=i.naturalWidth&&i.naturalHeight?i.naturalWidth/i.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),i.addEventListener("error",()=>{Me("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=Lr(),l=s(o),c=l.find(u=>u.alt===t.alt&&u.type!=="video")||l.find(u=>u.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,i.src=Ce(c.url),p.photos=l;else{const u=i.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const o=i.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),i.src=Ce(t.url);n.appendChild(i),e.appendChild(n)}function Lr(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Gt(e,t,a,n){var l,c;const r=d("#ag-lightbox"),i=d("#ag-lightbox-img"),o=d("#ag-lightbox-caption"),s=d("#ag-lightbox-drive-link");if(!(!r||!i)){(l=r.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),Qe&&(i.removeEventListener("error",Qe),Qe=null),i.onerror=null,s&&(s.hidden=!0);{i.hidden=!1;const u=Ce(e);if(!u)return;i.src=u,i.alt=t||"",Qe=()=>{const g=n||t;Me("config/photos.json",{photos:[]}).then(b=>{const{normalizePhotos:w}=Lr(),m=w(b),f=m.find(y=>y.alt===g)||null;f&&f.url&&(i.src=Ce(f.url),p.photos=m)}).catch(()=>{})},i.addEventListener("error",Qe,{once:!0})}o.textContent=t||"",o.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Er(){var a,n;const e=d("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(Qe&&(t.removeEventListener("error",Qe),Qe=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Tr(e){return[`${Ni(e.category.tone)} ${Ua()}s ${p.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var i;const[a,n]=e.unlockTime.split(":").map(Number),r=Tt(e.unlockTimezone||((i=p.theme)==null?void 0:i.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function kt(e){var U;k.dataset.tone=e.category.tone,Ac(e.category.tone),d("[data-ag-rarity]").textContent=e.category.label;const t=Y().find(x=>x.day===e.day&&x.token===e.token),a=e.weather||t&&t.weather||null,n=Ki(a);d("[data-ag-date]").textContent=n?`${_s(e.day)} · ${n}`:_s(e.day),d("[data-ag-title]").textContent=e.outcome.title;const r=d("[data-ag-message]");if(!r)return;r.innerHTML=vr(e.outcome.message),r.hidden=!1,fg(r,e.outcome.secret===!0),xg(r,x=>{const A=p.todaysPull||e;Eo({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:"kapsel",word:x,meaning:`Aus der Kapsel „${A.outcome.title}“, ${ke(A.day)}`,audioUrl:null,token:G()});try{S([12,30,12])}catch{}j(`„${x}“ ins Glossar gelegt 📖`)});const i=d("[data-ag-result]");fo(d("[data-ag-kurs]"),e);const o=d("[data-ag-pfand]");if(o){const x=!!(t&&t.pfand),A=e.category.id==="niete"&&!re()&&!x;o.hidden=!A;const T=d("[data-ag-pfand-handle]"),N=d("[data-ag-pfand-count]");if(N){const F=bn(st().count);N.textContent=`${F.inCycle}/${F.every}`}A&&T&&vg(T,d("[data-ag-result]"),()=>{if(!qd(e.day,e.token))return;const F=Fd();if(kg(T),o.hidden=!0,F.earned){try{ea(Vr)}catch{}try{Se(70)}catch{}j(`♻︎ Zehn leere Kapseln zurück — ein ${Vr} dafür`),vt()}else j(`♻︎ Pfand ${F.inCycle}/${Yr} — die Maschine nickt`);we()})}const s=d("[data-ag-freikarte-wrap]");if(s){const x=e.category.tone==="quiet"||e.category.tone==="cursed",A=!!(t&&t.pfand);s.hidden=!(x&&!A&&xd(e.token)>0&&!re())}const l=d("[data-ag-quest-wrap]");if(l){const x=e.category.tone==="quest"&&!re();if(l.hidden=!x,x){const A=d("[data-ag-quest-hint]"),T=d("[data-ag-quest-done]"),N=d("[data-ag-quest-photo]"),F=d("[data-ag-beweis-file]"),O=d("[data-ag-beweis-thumb]"),ae=Y().find(H=>H.day===e.day&&H.token===e.token),P=!!(ae&&ae.bestanden),D=ae&&ae.beweisUrl;O&&(O.hidden=!D,D&&(O.src=Ce(D),O.onclick=()=>Gt(D,"Beweisfoto"))),A&&(A.textContent=P?`🏆 Bestanden am ${ke(ae.bestandenAt||ae.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),T&&(T.hidden=P,T.onclick=()=>{if(ut(T,"Wirklich geschafft? Nochmal tippen")&&ti(e.day,e.token)){we();try{Se(60)}catch{}kt(e),p.activeTab==="history"&&Ne()}}),N&&F&&(N.hidden=!1,N.disabled=!1,N.textContent=D?"📸 Foto ersetzen":"📸 Beweis anhängen",N.onclick=()=>{F.value="",F.click()},F.onchange=async()=>{const H=F.files&&F.files[0],be=Y().find(R=>R.day===e.day&&R.token===e.token);if(!(!H||!be)){N.disabled=!0,N.textContent="Lädt hoch…";try{const R=await Gc(e.day,e.token,H);hd(e.day,e.token,R),ti(e.day,e.token),we();try{Se(60)}catch{}try{j("Beweis angenommen 🏆")}catch{}}catch(R){const ue=R&&R.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":R&&R.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":R&&R.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{j(ue)}catch{}}kt(e),p.activeTab==="history"&&Ne()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(r.hidden=!0,!(i?i.querySelector("[data-ag-prompt-gate]"):null)){const A=vf(e.outcome.prompt,T=>{if(e.promptAnswer=T,A.remove(),!re()){Lf(e,T);const N=Y(),F=N.findIndex(O=>O.day===e.day&&O.token===e.token);F!==-1&&(N[F]={...N[F],promptAnswer:T},Ie(N),we())}kt(e),p.activeTab==="history"&&Ne()});A.setAttribute("data-ag-prompt-gate",""),r.parentNode.insertBefore(A,r)}d("[data-ag-result]").hidden=!1;return}const c=i?i.querySelector("[data-ag-pin-gate]"):null;c&&c.remove();const u=d("[data-ag-link-wrap]");if(e.outcome.pin){const x=!!e.outcome.pinMessage;if(x||(r.hidden=!fn(e.outcome.pin)),!fn(e.outcome.pin)){let A=null;x&&(A=document.createElement("div"),A.className="ag-message",A.hidden=!0,A.innerHTML=vr(e.outcome.pinMessage),r.parentNode.insertBefore(A,r.nextSibling));const T=Ef(e.outcome.pin,()=>{T.remove(),x?A.hidden=!1:r.hidden=!1,e.outcome.link&&u&&Ha(u,e.outcome.link)},e.outcome.pinHint);T.setAttribute("data-ag-pin-gate","");const N=x?A:r;N.parentNode.insertBefore(T,N)}}const g=d("[data-ag-photo-wrap]"),b=d("[data-ag-photo-media]"),w=d("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[x,A]=e.unlockTime.split(":").map(Number),T=Tt(e.unlockTimezone||((U=p.theme)==null?void 0:U.timezone)||"UTC"),N=e.outcome.linkPin;if(N)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[O,ae]=e.outcome.linkPinFrom.split(":").map(Number);return T.h>O||T.h===O&&T.m>=ae})()){const O=Tf(N,u,e);u.innerHTML="",u.appendChild(O),u.hidden=!1}else{const O=document.createElement("span");O.className="ag-outcome-link-locked",O.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,u.innerHTML="",u.appendChild(O),u.hidden=!1}else if(T.h>x||T.h===x&&T.m>=A)Ha(u,e.outcome.link);else{const O=document.createElement("span");O.className="ag-outcome-link-locked",O.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,u.innerHTML="",u.appendChild(O),u.hidden=!1}}else e.outcome.pin&&!fn(e.outcome.pin)||Ha(u,e.outcome.link||null);if(Mf(d("[data-ag-token-wrap]"),e),Cf(e),e.photo){Os(b,e.photo);const x=(e.photo.caption||"").trim();x?(w.textContent=x,w.hidden=!1):(w.textContent="",w.hidden=!0),g.hidden=!1}else b.innerHTML="",w.textContent="",w.hidden=!0,g.hidden=!0;const m=Tr(e),f=encodeURIComponent("Mein Gacha-Zug"),y=encodeURIComponent(m),E=d("[data-ag-send]");p.theme.messageTarget.startsWith("mailto:")?E.href=`${p.theme.messageTarget}?subject=${f}&body=${y}`:E.href=p.theme.messageTarget.replace("{text}",y);const _=d("[data-ag-save-img]");_&&(_.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const C=d("[data-ag-wallpaper]");C&&(C.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const v=d("[data-ag-actions-extra]");v&&(v.hidden=!(_&&!_.hidden)&&!(C&&!C.hidden));const z=d("[data-ag-reactions]");if(z){z.hidden=!1;const x=Y().find(T=>T.day===e.day&&T.token===e.token),A=x&&x.reaction;for(const T of z.querySelectorAll("[data-ag-react]"))T.hidden=!!re(),T.classList.toggle("is-chosen",T.dataset.agReact===A),T.onclick=()=>{const N=T.dataset.agReact;if(md(e.day,e.token,N)){Sf(e,N),re()||Promise.resolve().then(()=>mt).then(F=>F.flashReactionOnLamp(N)).catch(()=>{}),we();try{S([12,30,18])}catch{}kt(e),ks(d("[data-ag-aufkleber]"),e.day,N,{peelFrom:T})}};ks(d("[data-ag-aufkleber]"),e.day,A||"")}const B=d("[data-ag-moon-line]");if(B){const x=Cc(e.day);B.hidden=!x,B.textContent=x}Ps(),d("[data-ag-result]").hidden=!1,Ws()}function qs(e){return e?Re().some(t=>t.day===e.day&&t.token===e.token):!1}function Ga(e){return Re().some(t=>t.day===e.day&&t.token===e.token)}function Ws(){const e=d("[data-ag-star]");if(!e)return;const t=qs(p.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function zf(e,t){const a=Re(),n=a.findIndex(i=>i.day===e.day&&i.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Qt(a),we();const r=Ga(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",p.activeTab==="lieblinge"&&Kt()}function Rs(e){if(!e)return;const t=Re(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Qt(t),we(),Ws(),p.activeTab==="lieblinge"&&Kt()}function Af(e){if(!e)return;if(e.flaschenpost)try{Hd(e.flaschenpost,e.day)}catch{}const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,weather:e.weather||null,flaschenpost:e.flaschenpost||null,revealedAt:Date.now()},a=Y(),n=new Set,r=[t,...a].filter(i=>{if(!i||typeof i.day!="string"||typeof i.token!="string")return!1;const o=`${i.day}|${i.token}`;return n.has(o)?!1:(n.add(o),!0)});r.sort((i,o)=>i.day<o.day?1:i.day>o.day?-1:0),Ie(r),gn(0),we()}function _f(e,t){var i;if(!e||e.used||!ut(t,"Einlösen? Nochmal tippen"))return;const a=Q(((i=p.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=a;const n=Y(),r=n.find(o=>o.day===e.day&&o.token===e.token);r&&(r.used=!0,r.usedAt=a,Ie(n)),we();try{Se(60)}catch{}try{j("Eingelöst 💛")}catch{}try{Rp(e)}catch{}t&&(t.disabled=!0),Ne(),p.activeTab==="lieblinge"&&Kt()}function Us(e){var a;if(!e.link)return null;if(e.unlockTime){const n=Tt(e.unlockTimezone||((a=p.theme)==null?void 0:a.timezone)||"UTC"),[r,i]=e.unlockTime.split(":").map(Number);if(!(n.h>r||n.h===r&&n.m>=i)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=Ce(e.link);return t?js(t):null}function Hs(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const r=Ki(e.weather),i=e.restored?"":id(e.revealedAt);n.textContent=ke(e.day);const o=[i,r].filter(Boolean).join(" · ");if(o){const m=document.createElement("small");m.className="ag-history-meta",m.textContent=o,i&&(m.title=`Zum ersten Mal geöffnet um ${i}`),n.appendChild(m)}const s=document.createElement("span");s.className="ag-history-badge",s.textContent=e.categoryLabel||"Kapsel";const l=document.createElement("button");if(l.type="button",l.className="ag-history-star"+(Ga(e)?" is-starred":""),l.textContent=Ga(e)?"★":"☆",l.title=Ga(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",l.addEventListener("click",m=>{m.stopPropagation(),zf(e,l)}),a.appendChild(n),a.appendChild(s),e.reaction){const m=document.createElement("span");m.className="ag-history-reaction",m.textContent=e.reaction,m.title="Deine Reaktion",a.appendChild(m)}a.appendChild(l);const c=document.createElement("p");c.className="ag-history-title",c.textContent=e.title||"";const u=document.createElement("div");u.className="ag-history-message",u.innerHTML=vr(e.message||"");let g=null;if(e.promptAnswer){g=document.createElement("div"),g.className="ag-history-answer-wrap";const m=document.createElement("p");m.className="ag-history-answer-label",m.textContent="💭 Antwort";const f=document.createElement("blockquote");f.className="ag-history-answer",f.textContent=e.promptAnswer,g.appendChild(m),g.appendChild(f)}t.appendChild(a);const b=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,w=e.photo&&(e.photo.type==="video"||b.test(e.photo.url||""));if(e.photo&&!w){const m=document.createElement("div");m.className="ag-history-body";const f=document.createElement("div");f.className="ag-history-thumb";const y=document.createElement("img");y.src=Ce(e.photo.url),y.alt=e.photo.alt||"Foto-Drop",y.loading="lazy",y.decoding="async",y.addEventListener("error",function(){Me("config/photos.json",{photos:[]}).then(_=>{const{normalizePhotos:C}=Lr(),v=C(_),z=v.find(B=>B.alt===e.photo.alt&&B.type!=="video")||v.find(B=>B.type!=="video")||null;if(z&&z.url)e.photo.url=z.url,y.src=Ce(z.url),p.photos=v;else{f.classList.add("is-broken"),y.remove();const B=document.createElement("span");B.className="ag-history-thumb-broken",B.textContent="📷",f.appendChild(B)}}).catch(()=>{f.classList.add("is-broken"),y.remove();const _=document.createElement("span");_.className="ag-history-thumb-broken",_.textContent="📷",f.appendChild(_)})},{once:!0}),f.appendChild(y),f.style.cursor="pointer",f.title="Vollansicht",f.addEventListener("click",()=>Gt(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const E=document.createElement("div");if(E.className="ag-history-text",E.appendChild(c),E.appendChild(u),g&&E.appendChild(g),e.link){const _=Us(e);_&&E.appendChild(_)}m.appendChild(f),m.appendChild(E),t.appendChild(m)}else if(t.appendChild(c),t.appendChild(u),g&&t.appendChild(g),e.link){const m=Us(e);m&&t.appendChild(m)}if(e.bestanden){const m=document.createElement("p");if(m.className="ag-history-bestanden",m.textContent=`🏆 Bestanden${e.bestandenAt?` am ${ke(e.bestandenAt)}`:""}`,t.appendChild(m),e.beweisUrl){const f=document.createElement("img");f.className="ag-history-beweis",f.src=Ce(e.beweisUrl),f.alt="Beweisfoto",f.loading="lazy",f.decoding="async",f.addEventListener("click",y=>{y.stopPropagation(),Gt(e.beweisUrl,"Beweisfoto")}),f.addEventListener("error",()=>f.remove(),{once:!0}),t.appendChild(f)}}if($t(e)){const m=document.createElement("div");if(m.className="ag-voucher-actions",e.used){const f=document.createElement("span");f.className="ag-voucher-used",f.textContent=`✓ Benutzt am ${e.usedAt?ke(e.usedAt):"–"}`,m.appendChild(f)}else{const f=document.createElement("button");f.type="button",f.className="ag-voucher-use",f.textContent="🎟️ Benutzen",f.addEventListener("click",y=>{y.stopPropagation(),_f(e,f)}),m.appendChild(f)}t.appendChild(m)}return t}function Df(e){const t=d("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===je),n.setAttribute("aria-selected",r===je?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let St=null;function Gs(e){var _;const t=d("[data-ag-history-calendar]");if(!t)return;if(je!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((_=p.theme)==null?void 0:_.timezone)||"UTC",n=Q(a);St||(St=n.slice(0,7));const r=new Map(e.map(C=>[C.day,C])),[i,o]=St.split("-").map(Number),s=new Date(Date.UTC(i,o-1,1)),l=new Date(Date.UTC(i,o,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),g=e.filter(C=>C.day.startsWith(St)).length;t.innerHTML="";const b=document.createElement("div");b.className="ag-kalender-head";const w=document.createElement("button");w.type="button",w.className="ag-kalender-nav",w.textContent="‹",w.setAttribute("aria-label","Vorheriger Monat");const m=document.createElement("span");m.className="ag-kalender-label",m.textContent=g?`${u} · ${g} Kapseln`:u;const f=document.createElement("button");f.type="button",f.className="ag-kalender-nav",f.textContent="›",f.setAttribute("aria-label","Nächster Monat");const y=C=>{const v=new Date(Date.UTC(i,o-1+C,1));St=`${v.getUTCFullYear()}-${String(v.getUTCMonth()+1).padStart(2,"0")}`,Gs(e)};w.addEventListener("click",()=>y(-1)),f.addEventListener("click",()=>y(1)),b.appendChild(w),b.appendChild(m),b.appendChild(f),t.appendChild(b);const E=document.createElement("div");E.className="ag-kalender-grid";for(const C of["M","D","M","D","F","S","S"]){const v=document.createElement("span");v.className="ag-kalender-wd",v.textContent=C,E.appendChild(v)}for(let C=0;C<c;C++)E.appendChild(document.createElement("span"));for(let C=1;C<=l;C++){const v=`${St}-${String(C).padStart(2,"0")}`,z=r.get(v),B=document.createElement("span");B.className="ag-kalender-day",B.textContent=C,z&&(B.classList.add("has-pull"),B.dataset.tone=z.tone||"soft",B.title=`${z.title||"Kapsel"} (${z.categoryLabel||""})`),v===n&&B.classList.add("is-today"),v>n&&B.classList.add("is-future"),E.appendChild(B)}t.appendChild(E)}function Nf(e){var i;const t=d("[data-ag-history-tally]");if(!t)return;if(je!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(i=e[e.length-1])==null?void 0:i.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const $r=15;let Cr=$r;function If(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function Pf(e){const t=d("[data-ag-album-card]"),a=d("[data-ag-album]"),n=d("[data-ag-album-note]");if(!t||!a)return;const r=If(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const i of r){const o=document.createElement("button");o.type="button",o.className="ag-album-tile",o.title=i.caption||i.alt||i.day,o.setAttribute("aria-label",i.caption||i.alt||`Foto vom ${i.day}`);const s=document.createElement("img");s.src=i.url,s.alt=i.alt||i.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>o.remove(),{once:!0}),o.appendChild(s),o.addEventListener("click",()=>{S(8),Gt(i.url,i.caption,!1,i.alt)}),a.appendChild(o)}}function Bf(e){const t=d("[data-ag-trophy-card]"),a=d("[data-ag-trophies]"),n=d("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,o)=>(o.bestandenAt||o.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`),a.innerHTML="";for(const i of r){const o=document.createElement("div");o.className="ag-trophy-tile",o.title=i.title||i.categoryLabel||"Quest";const s=document.createElement("span");s.className="ag-trophy-emoji";const l=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(s.textContent=l?l[l.length-1]:"🏆",i.beweisUrl){o.classList.add("has-beweis");const g=document.createElement("img");g.className="ag-trophy-shot",g.src=Ce(i.beweisUrl),g.alt="Beweisfoto",g.loading="lazy",g.decoding="async",g.addEventListener("error",()=>{g.remove(),o.classList.remove("has-beweis")},{once:!0}),o.appendChild(g),o.addEventListener("click",()=>Gt(i.beweisUrl,i.title||"Beweisfoto"))}const c=document.createElement("span");c.className="ag-trophy-title",c.textContent=i.title||i.categoryLabel||"Quest";const u=document.createElement("span");u.className="ag-trophy-date",u.textContent=ke(i.bestandenAt||i.day),o.appendChild(s),o.appendChild(c),o.appendChild(u),a.appendChild(o)}}function Mr(){const e=d("[data-ag-ferien-list]"),t=d("[data-ag-ferien-count]");if(!e)return;const a=la();e.innerHTML="",t&&(t.hidden=!a.length,t.textContent=a.length?`· ${a.length}`:"");for(const n of a){const r=document.createElement("li");r.className="ag-ferien-item";const i=document.createElement("span");i.textContent=n.from===n.to?ke(n.from):`${ke(n.from)} – ${ke(n.to)}`;const o=document.createElement("button");o.type="button",o.className="ag-ferien-remove",o.setAttribute("aria-label","Ferien entfernen"),o.textContent="✕",o.addEventListener("click",()=>{Vd(n.from,n.to),Mr(),Ht()}),r.appendChild(i),r.appendChild(o),e.appendChild(r)}}function Ne(){var u;vt();const e=d("[data-ag-history]"),t=d("[data-ag-history-empty]"),a=d("[data-ag-history-note]");e.innerHTML="";const n=G(),r=Q(((u=p.theme)==null?void 0:u.timezone)||"UTC"),i=Y().filter(g=>g.token===n&&g.day<=r).slice().sort((g,b)=>g.day<b.day?1:g.day>b.day?-1:0);Gs(i),Nf(i),Mr(),yf(),Bf(i),Pf(i);const o=i.filter(g=>$t(g)&&!g.used).length;Df(o);const s=i.filter(g=>je==="vouchers"?$t(g):je==="open"?$t(g)&&!g.used:!0);je==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":je==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=d("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=je==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":je==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Cr);for(const g of c)e.appendChild(Hs(g));if(l){const g=s.length-c.length;l.hidden=g<=0,g>0&&(l.textContent=`Mehr anzeigen (${g} weitere)`,l.onclick=()=>{Cr+=$r,Ne()})}}let Ka="";function Kt(){const e=d("[data-ag-lieblinge]"),t=d("[data-ag-lieblinge-empty]"),a=d("[data-ag-lieblinge-note]");e.innerHTML="",e.style.height="";const n=Re();if(a.textContent="Dein Wanderweg — jeder Liebling eine Etappe, der neueste ganz oben am Gipfel.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel — oder kneif die Karte zusammen.";return}t.hidden=!0;const r=s=>`${s.day}|${s.token}`,i=n.findIndex(s=>r(s)===Ka);Ms(e,n,{expanded:i,renderCard:s=>{const l=document.createElement("ul");return l.className="ag-history",l.appendChild(Hs(s)),l},onOpen:(s,l)=>{Ka=r(s)===Ka?"":r(s);try{S(6)}catch{}if(Kt(),Ka){const c=e.querySelector(`[data-ag-ww-stop="${n.indexOf(s)}"]`);c&&c.scrollIntoView&&c.scrollIntoView({block:"start",behavior:"smooth"})}}});const o=gf(()=>d("[data-ag-lieblinge]"));o&&o(),requestAnimationFrame(()=>{const s=e.getBoundingClientRect();xr(e,$s(s.top,s.height,window.innerHeight))})}function jf(){const e=d("[data-ag-odds]");e.innerHTML="";const t=He(),a=bi(t),n=a.reduce((r,i)=>r+i.weight,0);for(const r of a){const i=document.createElement("li");i.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(i)}if(t>=5){const r=mi(t),i=document.createElement("li");i.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,i.style.fontWeight="800",e.appendChild(i)}}function Ff(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Of(){const e=d("[data-ag-post-count]");if(!e)return;const t=lt().filter(a=>!a.deliveredDay).length;e.hidden=!t,e.textContent=t===1?"🍾 Eine Flaschenpost ist unterwegs.":`🍾 ${t} Flaschenposten sind unterwegs.`}function Lt(){Of();const e=d("[data-ag-wish-idle]"),t=d("[data-ag-wish-form]"),a=d("[data-ag-wish-done]");if(!e||!t||!a)return;const n=cn();if(n&&n.week===Jt()){e.hidden=!0,t.hidden=!0,a.hidden=!1,d("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",d("[data-ag-wish-done-note]").textContent=`„${n.text}"`;const i=di(),o=i&&Math.abs(Date.parse(i.timestamp)-Number(n.submittedAt||0))<12e4&&Sr[i.status];d("[data-ag-wish-done-meta]").textContent=o?`Fionn sagt: ${Sr[i.status]}`:Ff(n.remoteStatus)}else e.hidden=!1,t.hidden=!0,a.hidden=!0}function qf(){var w;const e=Ua(),t=p.theme.brand.fromName,a=d("[data-ag-main-title]");a&&(a.textContent=p.theme.brand.titleTemplate.replace("{name}",e));const n=d("[data-ag-kicker]");n&&(n.textContent=`${p.theme.brand.kicker} · ${p.photos.length} Erinnerungen`);const r=d("[data-ag-intro]");r&&(r.textContent=p.theme.brand.intro);const i=d("[data-ag-button-text]");i&&(i.textContent=p.theme.brand.buttonIdle);const o=d("[data-ag-rules-title]");o&&(o.textContent=p.theme.brand.rulesTitle);const s=d("[data-ag-rules-text]");s&&(s.textContent=p.theme.brand.rulesText);const l=d("[data-ag-send]");l&&(l.textContent=`An ${t} schicken`);const c=d("[data-ag-today-pill]");c&&(c.textContent=ff());const u=d("[data-ag-draw-hint]");if(u){const m=Y().filter(y=>y.token===G()).length,f=ng(m);u.textContent=f?rg:"Eine Kapsel · ein Tag · ein Souvenir.",u.classList.toggle("is-secret",f)}const g=d("[data-ag-chips]");g&&(g.innerHTML=""),queueMicrotask(uo);const b=Array.isArray(p.theme.stickers)&&p.theme.stickers.length?p.theme.stickers:pf();for(const m of g?b:[]){const f=document.createElement("li");if(f.textContent=m,(m.toLowerCase().includes("bärlauch")||m.toLowerCase().includes("barlauch"))&&(f.id="ag-btn-baerlauch",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Bärlauch öffnen"),f.classList.add("ag-chip-clickable"),fu()&&(f.classList.add("ag-chip-saison"),f.title="Bärlauch-Saison — Level 5 schaffen, 🌿 kassieren")),(m.toLowerCase().includes("gespräch")||m.toLowerCase().includes("gesprach"))&&(f.id="ag-btn-gesprach",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Gespräch öffnen"),f.classList.add("ag-chip-clickable")),m.toLowerCase().includes("rave")&&(f.id="ag-btn-rave",f.tabIndex=0,f.setAttribute("role","link"),f.setAttribute("aria-label","Rave Board öffnen"),f.classList.add("ag-chip-clickable")),m.toLowerCase()==="quest"&&(f.id="ag-btn-quest",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Quest öffnen"),f.classList.add("ag-chip-clickable"),(w=p.quest)!=null&&w.enabled&&qi()&&(Ct().solved||f.classList.add("ag-chip-quest-active"))),m.toLowerCase().includes("glossar")&&(f.id="ag-btn-glossary",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Glossar öffnen"),f.classList.add("ag-chip-clickable")),(m.toLowerCase().includes("skincare")||m.toLowerCase().includes("pflege"))&&p.skincare&&(f.id="ag-btn-skincare",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Skincare-Routine öffnen"),f.classList.add("ag-chip-clickable")),m.toLowerCase().includes("stimmung")){f.id="ag-btn-stimmung",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Farbe des Tages wählen"),f.classList.add("ag-chip-clickable");const y=dt();y&&(f.classList.add("ag-chip-stimmung-set"),f.style.setProperty("--chip-dot-color",y))}g.appendChild(f)}Is(),Ht()}const Ks="affektions-gacha:install-dismissed:v1";let Yt=null;function Wf(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function Rf(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Ys(){try{return window.localStorage.getItem(Ks)==="1"}catch{return!1}}function Vs(){try{window.localStorage.setItem(Ks,"1")}catch{}const e=d("[data-ag-install-nudge]");e&&(e.hidden=!0)}function Js(e){if(Ys())return;const t=d("[data-ag-install-nudge]");if(!t)return;const a=d("[data-ag-install-copy]"),n=d("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Yt&&(Yt.prompt(),await Yt.userChoice,Yt=null,Vs())}),t.hidden=!1}function Uf(){var e;Wf()||Ys()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Yt=t,Js(!0)}),Rf()&&Js(!1),(e=d("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Vs))}const Hf={photos:[]};function Gf(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=En();return a.map(r=>{const i=new URL(r.url,n).toString(),o=r.type==="video"||t.test(i);return{...r,type:o?"video":"image",url:i}}).filter(r=>r.url)}async function Kf(){Pc(),Oc(),Uc();try{const[e,t,a,n,r,i,o,s,l]=await Promise.all([Me("config/theme.json"),Me("config/outcomes.json"),Me("config/photos.json",Hf),Me("config/special-days.json",{days:[]}),Me("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),Me("config/backup.json",{enabled:!1,endpointUrl:""}),Me("config/quest.json",{enabled:!1}),Me("config/push.json",{enabled:!1}),Me("config/skincare.json",null)]);p.theme=e,p.outcomes=t,fd(t),p.photos=Gf(a),p.specialDays=n,rd(e.dayStartHour),p.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},p.backup=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},p.quest=o&&typeof o=="object"?o:{enabled:!1},p.push=s&&typeof s=="object"?s:{enabled:!1},p.skincare=l&&typeof l=="object"?l:null,Bc(e),jc(re()||Q(e.timezone)),oc(),qf(),jf(),Lt(),Zp(),Uf(),requestAnimationFrame(()=>{const g=k.querySelector(".ag-nav-pill"),b=k.querySelector(".ag-bottomnav-btn.is-active");if(g&&b){const w=b.closest(".ag-bottomnav"),m=w?w.getBoundingClientRect():null,f=b.getBoundingClientRect();m&&f.width&&(g.style.transition="none",g.style.left=`${f.left-m.left}px`,g.style.width=`${f.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{Up()}catch{}try{const g=k.querySelector(".ag-stage");g&&"IntersectionObserver"in window&&new IntersectionObserver(([w])=>{g.classList.toggle("ag-stage-idle",!w.isIntersecting)},{threshold:.05}).observe(g)}catch{}Yn(),p.renderedDay=Q(e.timezone);const c=()=>{re()||Q(e.timezone)!==p.renderedDay&&window.location.reload()};window.setInterval(c,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(c(),Kn(),In(),Zs(e.timezone),At().catch(()=>{}))}),k.classList.add("is-ready"),k.style.transition="opacity .18s ease",k.style.opacity="1";const u=Q(e.timezone);Y().some(g=>g.token===G()&&g.day===u)&&!re()&&Kp(),In(),Zs(e.timezone),At().catch(()=>{}),Yi().then(g=>pg(g)).catch(()=>{}),window.setTimeout(()=>{Ao().catch(()=>{})},1800),window.setTimeout(()=>{Promise.resolve().then(()=>mt).then(g=>g.checkColourOnStart()).catch(()=>{})},4e3)}catch(e){ys(e)}}function Zs(e){try{const{h:t}=Tt(e||"UTC"),a=t>=22||t<5;k.classList.toggle("is-evening",a),Mc(k.querySelector("[data-ag-moon]"),{evening:a});const n=k.querySelector("[data-ag-candle]");n&&(n.hidden=!pc(t));const r=k.querySelector("[data-ag-kicker]");if(r){const i=r.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");r.textContent=a?i+" · Gute Nacht 🌙":i}}catch{}}const Et=document.currentScript,Yf=(Et==null?void 0:Et.dataset.mount)||"#affektions-gacha",Vf=(Et==null?void 0:Et.dataset.configBase)||"";function Jf(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Zf=document.querySelector(Yf)||Jf();Xl(Zf),dc(Vf,null),Kf().catch(e=>ys(e))})();

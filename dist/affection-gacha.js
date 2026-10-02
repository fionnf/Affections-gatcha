(function(){"use strict";const u={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,push:null,skincare:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let S=null;function bs(e){S=e}function l(e){return S.querySelector(e)}const jn="affektions-gacha:history:v1",Wn="affektions-gacha:favourites:v1",qn="affektions-gacha:tokens:v1",Fn="affektions-gacha:tokens-sent:v1",Un="affektions-gacha:streak-cache:v1",On="affektions-gacha:streak-synced:v1",Rn="affektions-gacha:streak-restore:v1",Hn="affektions-gacha:wish:v1",Gn="affektions-gacha:milestones:v1",Oe="affektions-gacha:notif:v2",Kn="affektions-gacha:baerlauch-scores:v1",ys="affektions-gacha:baerlauch-history:v1",Yn="affektions-gacha:gesprach-idx:v1",Vn="affektions-gacha:last-ping:v1",ws="affektions-gacha:sound:v1",Jn="affektions-gacha:gipfelbuch:v1",Zn="affektions-gacha:quest:v1",pa="affektions-gacha:quest-points:v1",vs=5,xs=20,Xn=[100,75,50,25],Qn="affektions-gacha:glossary:v1",ha="affektions-gacha:stimmung:v1",er="affektions-gacha:freikarte:v1",fa="affektions-gacha:freikarte-reroll:v1",ma={"🌿":{goal:4,reward:"Essen: Fionn kocht, oder ein Café deiner Wahl"},"🏔":{goal:5,reward:"Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg"},"🎬":{goal:4,reward:"Ein Abend aus: Film, Konzert oder DJ — du wählst"},"🛁":{goal:3,reward:"Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag"},"💚":{goal:4,reward:"Eine Überraschung von Fionn, mit handgeschriebenem Brief"},"✈️":{goal:6,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}},ks={"☕":"🌿","🔥":"🏔","🎧":"🎬","🍕":"🛁","☁️":"🛁","⭐":"💚"};function tr(e){return ks[e]||e}function ba(e){const t=ma[e];return t&&t.goal||vs}function ya(e){const t=ma[e];return t&&t.reward||""}const ar=10,nr="🛁";let rr=0;function Ss(e){rr=Number.isInteger(e)&&e>=0&&e<24?e:0}function Y(e,t){const a=new Date().getTime()-rr*36e5,n=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(a)),r=i=>n.find(o=>o.type===i).value;return`${r("year")}-${r("month")}-${r("day")}`}function ot(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}let ir=null;function de(e){const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return ir||(ir=new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})),ir.format(r)}catch{return e}}function Ts(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function wa(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function Es(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function fe(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Ls(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Cs(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Te(e){return Cs(Ls(e))()}function va(e,t){return t?Math.floor(Te(e)*t):0}function As(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function zs(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function U(){return"lennart"}function ae(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function Ms(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Mt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function $t(e){var s,d;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=Y(t),[n,r,i]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,r-1,i)).getTime()/864e5);return Math.floor(o/(((d=e.quest)==null?void 0:d.periodDays)||2))}function Dt(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=$t(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function or(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function $s(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const xa=new Set;function Ds(e){xa.clear();const t=Array.isArray(e&&e.categories)?e.categories:[];for(const a of t)for(const n of Array.isArray(a.outcomes)?a.outcomes:[])n&&n.voucher===!0&&n.title&&xa.add(n.title)}function st(e){return e?e.voucher===!0?!0:e.voucher===!1?!1:!!e.title&&xa.has(e.title):!1}function H(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function he(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const r=n[U()];return r===void 0?t:r}return localStorage.setItem(e,JSON.stringify({[U()]:n})),n}catch{return t}}function ie(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const r=n&&typeof n=="object"&&!Array.isArray(n)?n:{};r[U()]=t,localStorage.setItem(e,JSON.stringify(r))}catch{}}let sr=null,ka=null;function R(){try{if(typeof window>"u"||!window.localStorage)return u.syncedHistory||[];const e=window.localStorage.getItem(jn);if(!e)return u.syncedHistory||[];if(e===sr&&ka)return ka;const t=JSON.parse(e);if(!Array.isArray(t))return u.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?(sr=e,ka=a,a):u.syncedHistory||[]}catch{return u.syncedHistory||[]}}function ve(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(jn,JSON.stringify(e))}catch{}}function lr(e,t){var r;const a=R(),n=a.find(i=>i.day===e&&i.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=Y(((r=u.theme)==null?void 0:r.timezone)||"UTC"),ve(a)),n):null}function _s(e,t,a){const n=R(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.beweisUrl=a,ve(n),r):null}function Ns(e,t,a){const n=R(),r=n.find(i=>i.day===e&&i.token===t);return r?(r.reaction=a,ve(n),r):null}function ze(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(Wn);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=u.theme)!=null&&e.timezone?Y(u.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function _t(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Wn,JSON.stringify(e))}catch{}}function dr(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const r=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;if(r<=0)continue;const i=tr(a);t[i]=(t[i]||0)+r}return t}function Re(){const e=he(qn,{});return dr(e&&typeof e=="object"&&!Array.isArray(e)?e:{})}function Sa(e){ie(qn,e)}function Nt(e){e=tr(e);const t=Re();return t[e]=(t[e]||0)+1,Sa(t),t[e]}function Is(e){const t=Re();t[e]=0,Sa(t)}function It(e){return dr(e)}function Ps(){const e=he(Fn,null);return e&&typeof e=="object"&&!Array.isArray(e)?It(e):null}function Pt(e){ie(Fn,It(e))}function Bs(e){const t=It(e),a=It(Re());let n=Ps();n===null&&(n=a,Pt(a));const r=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),i={};for(const o of r){const s=(t[o]||0)+((a[o]||0)-(n[o]||0));s>0&&(i[o]=s)}return Sa(i),Pt(t),[...r].some(o=>(i[o]||0)!==(t[o]||0))}function Ta(){try{const e=localStorage.getItem(er),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function cr(e){try{localStorage.setItem(er,JSON.stringify(e))}catch{}}function js(e){return Ta()[e]||0}function gr(e){const t=Ta();return t[e]=(t[e]||0)+1,cr(t),t[e]}function Ws(e){const t=Ta();return t[e]>0?(t[e]-=1,cr(t),!0):!1}function qs(e,t){try{const a=localStorage.getItem(fa),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function Fs(e,t,a){try{const n=localStorage.getItem(fa),r=n?JSON.parse(n):{},i=r&&typeof r=="object"?r:{};i[`${e}|${t}`]=a,localStorage.setItem(fa,JSON.stringify(i))}catch{}}function Ea(){if(typeof window>"u"||!window.localStorage)return null;const e=he(Hn,null);return e&&typeof e=="object"?e:null}function ur(e){typeof window>"u"||!window.localStorage||ie(Hn,e)}function Me(){const e=he(Rn,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Bt(e){ie(Rn,e)}function Us(){const e=he(Un,0);return typeof e=="number"?e:parseInt(e,10)||0}function La(e){ie(Un,e)}function Os(){const e=he(On,0);return typeof e=="number"?e:parseInt(e,10)||0}function Rs(e){ie(On,e)}function jt(){try{const e=window.localStorage.getItem(Jn);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Wt(e){try{window.localStorage.setItem(Jn,JSON.stringify(e))}catch{}}function Ca(){try{const e=localStorage.getItem(Kn),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function pr(){try{const e=localStorage.getItem(ys),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function lt(e){try{const t=he(Zn,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Aa(e){ie(Zn,e)}function qt(){const e=he(pa,0);return typeof e=="number"?e:parseInt(e,10)||0}function Hs(e){try{const t=qt()+e;return ie(pa,t),t}catch{return e}}function Gs(e){ie(pa,e)}function hr(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Gn);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ks(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Gn,JSON.stringify(e))}catch{}}function Ys(e,t){return hr().includes(`${e}|${t}`)}function Vs(e,t){const a=`${e}|${t}`,n=hr();n.includes(a)||Ks([...n,a])}function za(e){return!1}const fr="affektions-gacha:baerlauch-weekly:v1";function Js(e){const t=he(fr,null);return!!(t&&typeof t=="object"&&t.week===e)}function Zs(e){ie(fr,{week:e,at:Date.now()})}const Ma="affektions-gacha:wish-replies:v1";function Ft(){const e=he(Ma,null);return e&&typeof e=="object"&&!Array.isArray(e)?e:{wishes:[],shown:null}}function Xs(e){const t=Ft(),a=(Array.isArray(e)?e:[]).filter(n=>n&&n.timestamp).map(n=>({timestamp:String(n.timestamp),text:String(n.text||""),status:String(n.status||""),statusAt:String(n.statusAt||"")}));ie(Ma,{wishes:a,shown:t.shown||null})}function mr(){const{wishes:e}=Ft(),t=e.filter(a=>a.status&&a.statusAt);return t.length?(t.sort((a,n)=>a.statusAt<n.statusAt?1:a.statusAt>n.statusAt?-1:0),t[0]):null}function Qs(e){const t=mr();if(!t)return null;const{shown:a}=Ft();return a&&a.statusAt===t.statusAt&&a.day!==e?null:t}function el(e,t){const a=Ft();a.shown&&a.shown.statusAt===e&&a.shown.day===t||ie(Ma,{...a,shown:{statusAt:e,day:t}})}const br="affektions-gacha:hug-log:v1";function yr(){const e=he(br,[]);return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}const tl=9e4;function wr(e){const t=new Set(yr());for(const r of Array.isArray(e)?e:[])typeof r=="string"&&r&&t.add(r);const a=[...t].sort(),n=[];for(const r of a){const i=n[n.length-1];i&&Math.abs(Date.parse(r)-Date.parse(i))<tl||n.push(r)}return ie(br,n.slice(-500)),n}function al(e){return wr([e])}const $a="affektions-gacha:pfand:v1";function He(){const e=he($a,{count:0});return e&&typeof e=="object"&&Number.isFinite(e.count)?e:{count:0}}function Da(e,t=ar){const a=Math.max(0,Math.floor(Number(e)||0));return{inCycle:a%t,every:t,earned:a>0&&a%t===0}}function nl(){const t=(He().count||0)+1;return ie($a,{count:t,at:Date.now()}),{count:t,...Da(t)}}function rl(e){const t=He(),a=Math.max(t.count||0,Math.floor(Number(e)||0));return a!==(t.count||0)&&ie($a,{...t,count:a}),a}function il(e,t){const a=R(),n=a.find(r=>r.day===e&&r.token===t);return!n||n.pfand?!1:(n.pfand=!0,ve(a),!0)}const vr="affektions-gacha:flaschenpost:v1";function Ge(){const e=he(vr,[]);return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&t.id&&t.text&&t.dueDay):[]}function _a(e){ie(vr,(Array.isArray(e)?e:[]).slice(-40))}function xr(e,t){const[a,n,r]=e.split("-").map(Number);return new Date(Date.UTC(a,n-1,r+t)).toISOString().slice(0,10)}function ol(e,t,a){return e==="30"?xr(t,30):xr(t,20+Math.floor(Te(`flaschenpost|${a}`)*71))}function sl(e,t,a){const n=String(e||"").trim().slice(0,280);if(!n)return null;const r=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,i={id:r,text:n,mode:t==="30"?"30":"irgendwann",createdDay:a,dueDay:ol(t,a,r),deliveredDay:null};return _a([...Ge(),i]),i}function ll(e){const t=Ge(),a=t.find(n=>n.deliveredDay===e);return a||t.filter(n=>!n.deliveredDay&&n.dueDay<=e).sort((n,r)=>n.dueDay<r.dueDay?-1:1)[0]||null}function dl(e,t){const a=Ge(),n=a.find(r=>r.id===e);return!n||n.deliveredDay?!1:(n.deliveredDay=t,_a(a),!0)}function cl(e){const t=new Map(Ge().map(n=>[n.id,n]));for(const n of Array.isArray(e)?e:[]){if(!n||!n.id||!n.text||!n.dueDay)continue;const r=t.get(n.id);t.set(n.id,r?{...r,deliveredDay:r.deliveredDay||n.deliveredDay||null}:n)}const a=[...t.values()].sort((n,r)=>n.createdDay<r.createdDay?-1:1);return _a(a),a}const gl=60;function Ut(){const e=Me();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function ul(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>gl))return null;const n=Me(),r=Ut().filter(i=>!(i.from===e&&i.to===t));return r.push({from:e,to:t}),r.sort((i,o)=>i.from.localeCompare(o.from)),Bt({...n,vacations:r}),{from:e,to:t}}function pl(e,t){const a=Me();Bt({...a,vacations:Ut().filter(n=>!(n.from===e&&n.to===t))})}function kr(e){return Ut().some(t=>e>=t.from&&e<=t.to)}function $e(){var g;const e=U(),t=R().filter(f=>f.token===e);if(!t.length)return Math.max(Us(),Os());const a=((g=u.theme)==null?void 0:g.timezone)||"UTC",n=Y(a),r=new Set(t.map(f=>f.day)),[i,o,s]=n.split("-").map(Number);let d=new Date(Date.UTC(i,o-1,s)),c=n;r.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));let p=0;for(;r.has(c)||kr(c);)r.has(c)&&p++,d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return p}function Sr(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Tr(e){if(e<5)return u.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return u.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const hl=45,fl=10,ml=.5,bl=1.8;function yl(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),r=R().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,d)=>d.day.localeCompare(s.day)).slice(0,hl);if(r.length<fl)return e;const i=e.reduce((s,d)=>s+d.weight,0);if(!i)return e;const o={};for(const s of r)o[s.categoryId]=(o[s.categoryId]||0)+1;return e.map(s=>{const d=r.length*s.weight/i,c=Math.min(bl,Math.max(ml,(d+1)/((o[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function wl(e,t,a=[],n=null){const r=Tr(t),i=n?yl(r,n.token,n.day):r,o=a.length?i.filter(g=>!a.includes(g.id)):i,s=o.length?o:i,d=s.reduce((g,f)=>g+f.weight,0),c=Math.floor(Te(e)*d);let p=0;for(const g of s)if(p+=g.weight,c<p)return u.outcomes.categories.find(f=>f.id===g.id)||g;return u.outcomes.categories[u.outcomes.categories.length-1]}function Er(){const e=Me();return Math.floor((e.maxStreak||0)/xs)}function Ot(){var n;if(Me().birthdayBonus2026Used)return 0;const t=((n=u.theme)==null?void 0:n.timezone)||"UTC";return Y(t)==="2026-05-29"?1:0}function Rt(){const e=Me();return Math.max(0,Er()-(e.used||0))+Ot()}function Na(){var p;const e=U(),t=((p=u.theme)==null?void 0:p.timezone)||"UTC",a=Y(t),n=new Set(R().filter(g=>g.token===e&&g.day<=a).map(g=>g.day));if(!n.size)return null;const r=[...n].sort()[0],[i,o,s]=a.split("-").map(Number),d=new Date(Date.UTC(i,o-1,s));let c=a;for(n.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));n.has(c)||kr(c);)d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return c<r?null:c}function Lr(){return Rt()>0&&Na()!==null}function vl(e){if(Rt()<=0)return null;const t=Na();if(!t)return null;const a=U(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,i=[n,...R()].filter(c=>{const p=`${c.day}|${c.token}`;return r.has(p)?!1:(r.add(p),!0)}).sort((c,p)=>c.day<p.day?1:c.day>p.day?-1:0);ve(i);const o=Me(),d=Math.max(0,Er()-(o.used||0))===0&&Ot()>0;return Bt({...o,used:d?o.used||0:(o.used||0)+1,birthdayBonus2026Used:d?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),La($e()),t}const Cr=new Map;function De(e){Cr.set(e,Date.now())}function Ia(e,t=6e3){const a=Cr.get(e);return typeof a=="number"&&Date.now()-a<t}function dt(){var e;return Y(((e=u.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function Ar(e,t){const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:U()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function xl(e){if(!e||typeof e!="object"||Ia("stimmung"))return;const t=dt();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){Ke()&&($r(),Pa());return}Ke()!==a&&(Mr(a),ct(a))}function zr(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,r=(i,o)=>Math.round(o+(i-o)*.3);return`rgb(${r(t,10)},${r(a,20)},${r(n,16)})`}function ct(e){document.body.style.background=zr(e),Dr(e)}function Pa(){document.body.style.removeProperty("background"),Dr(null)}function Ke(){try{const e=localStorage.getItem(ha);if(!e)return null;const t=JSON.parse(e);return t.day!==dt()?null:t.hex||null}catch{return null}}function Mr(e){try{localStorage.setItem(ha,JSON.stringify({day:dt(),hex:e}))}catch{}}function kl(e){const t=dt();Mr(e),De("stimmung"),Ar(t,e)}function $r(){try{localStorage.removeItem(ha)}catch{}}function Sl(){const e=dt();$r(),De("stimmung"),Ar(e,"")}function Tl(){const e=Ke();e&&ct(e)}function Dr(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function _r(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Ke()||"#4aaa5a";Nr(e,t),Ba(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function El(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=Ke();t?ct(t):Pa()}function Ll(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");function i(o){Ba(e,o),ct(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),i(t.value)}),a&&a.addEventListener("input",()=>{const o=Ir(a.value);o&&(t&&(t.value=o),i(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||Ir((a==null?void 0:a.value)||"")||"#4aaa5a";kl(o),ct(o),e&&(e.hidden=!0)}),r&&r.addEventListener("click",()=>{Sl(),Pa(),Nr(e,"#4aaa5a"),Ba(e,"#4aaa5a")})}function Nr(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Ba(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=zr(t))}function Ir(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,i]=a;return`#${n}${n}${r}${r}${i}${i}`.toLowerCase()}return null}let ja="",Wa=null;function Cl(e,t){ja=e,Wa=t}function qa(){if(Wa)return Wa();if(!ja)return window.location.href;try{return new URL(ja,window.location.href).toString()}catch{return window.location.href}}function me(e,t=null){const a=new URL(e,qa()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function Ht(e){var t;try{const a=S&&S.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=u.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function gt(){var e;try{const t=u.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=U(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,i=setTimeout(()=>r.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(i)}if(!o.ok)return Ht(!1),!1;const s=await o.json();if(!s.ok)return Ht(!1),!1;const d=Y(((e=u.theme)==null?void 0:e.timezone)||"UTC"),c=R(),p=c.filter(m=>m.title!=="(wiederhergestellt)"&&m.day<=d);p.length!==c.length&&ve(p);const g=ze(),f=g.filter(m=>m.day<=d);if(f.length!==g.length&&_t(f),Array.isArray(s.history)&&s.history.length){const m=R(),b=new Map(m.map(v=>[`${v.day}|${v.token}`,v]));for(const v of s.history){if(v.title==="(wiederhergestellt)")continue;const A=$s(v.day);if(!A||A>d)continue;const P=typeof v.token=="string"?v.token.toLowerCase():v.token,C=`${A}|${P}`,w={...v,day:A,token:P},D=b.get(C);D&&D.bestanden&&!w.bestanden&&(w.bestanden=!0,w.bestandenAt=D.bestandenAt||null),D&&D.beweisUrl&&!w.beweisUrl&&(w.beweisUrl=D.beweisUrl),D&&D.reaction&&!w.reaction&&(w.reaction=D.reaction),D&&D.weather&&!w.weather&&(w.weather=D.weather),D&&D.pfand&&!w.pfand&&(w.pfand=!0),b.set(C,w)}const y=Array.from(b.values()).sort((v,A)=>A.day.localeCompare(v.day));ve(y),u.syncedHistory=y,La($e())}if(Array.isArray(s.favourites)&&s.favourites.length){const m=ze(),b=new Map(m.map(y=>[`${y.day}|${y.token}`,y]));for(const y of s.favourites){if(y.day>d)continue;const v=typeof y.token=="string"?y.token.toLowerCase():y.token;b.set(`${y.day}|${v}`,{...y,token:v})}_t(Array.from(b.values()).sort((y,v)=>v.day.localeCompare(y.day)))}if(s.tokens&&typeof s.tokens=="object"&&Bs(s.tokens)&&se(),typeof s.questPoints=="number"&&s.questPoints>qt()&&Gs(s.questPoints),typeof s.streak=="number"&&s.streak>0&&Rs(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const m=Ca();let b=!1;for(const[y,v]of Object.entries(s.baerlauchScores))typeof v=="number"&&v>(m[y]||0)&&(m[y]=v,b=!0);if(b)try{localStorage.setItem(Kn,JSON.stringify(m))}catch{}}if(typeof s.pfand=="number")try{rl(s.pfand)}catch{}if(Array.isArray(s.flaschenpost))try{cl(s.flaschenpost)}catch{}if(Array.isArray(s.hugs))try{wr(s.hugs)}catch{}if(Array.isArray(s.wishes))try{Xs(s.wishes)}catch{}if(typeof s.latestPing=="string"&&s.latestPing)try{const m=window.localStorage.getItem(Vn)||"";s.latestPing>m&&(window.localStorage.setItem(Vn,s.latestPing),u._newPing=!0)}catch{}if(s.stimmung)try{xl(s.stimmung)}catch{}if(Array.isArray(s.gipfelbuch)&&!Ia("gipfelbuch")){const m=s.gipfelbuch.filter(b=>b.id).sort((b,y)=>(y.date||"").localeCompare(b.date||""));Wt(m)}return S&&S.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),Ht(!0),Array.isArray(s.history)?s.history.length:0}catch{return Ht(!1),-1}}function se(){try{const e=u.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=U(),a=R().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=ze().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),r=Re(),i=lt(()=>$t(u)),o=i.solved&&i.pointsEarned&&!i._logged?{challenge:Dt(u),attempts:i.attempts,points:i.pointsEarned,period:i.period}:void 0;o&&(i._logged=!0,Aa(i));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:$e(),tokens:r,questPoints:qt(),flaschenpost:Ge(),pfand:He().count||0,...o?{questLog:o}:{}}),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,d).then(()=>{Pt(r)}).catch(()=>fetch(e.endpointUrl,{...d,mode:"no-cors"}).then(()=>{Pt(r)}).catch(()=>{}))}catch{}}function Pr(e){const t=Array.isArray(u.specialDays&&u.specialDays.days)?u.specialDays.days:[],a=e.slice(5),n=U();for(const r of t){const i=r.repeat==="yearly";if((r.date===e||i&&r.date===a)&&!(r.player&&r.player!==n))return r}return null}const Br=270;function Al(e,t){const a=R().filter(n=>n.token===e&&n.day<t&&typeof n.categoryId=="string"&&n.categoryId!=="special").sort((n,r)=>r.day.localeCompare(n.day)).slice(0,Br);return a.length<Br?!1:!a.some(n=>n.categoryId==="jackpot")}function jr(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function zl(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function ut(){return(u.photos||[]).filter(e=>e.type!=="video")}const Ml=4;function $l(e,t){return R().filter(a=>a.token===e&&a.day<t&&st(a)&&!a.used).length}function Wr(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:r=""}=a,i=U(),o=`${u.theme.secret}|${i}|${e}${r?"|"+r:""}`,s=Pr(e);if(s&&!r){const w=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],D=w[va(`${o}|special|outcome`,w.length)],L={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:w},k=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&u.photos.length&&ut().find(x=>x.alt===s.photoAlt)||null;return{day:e,token:i,category:L,outcome:D,photo:k,collectToken:D.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const d=r?null:qs(i,e),c=r?null:R().find(w=>w.token===i&&w.day===e),p=!r&&(!c||c.categoryId==="flaschenpost")?ll(e):null;if(p){const w=p.mode==="30"?"in 30 Tagen":"irgendwann";return{day:e,token:i,category:{id:"flaschenpost",label:"Flaschenpost 🍾",weight:0,tone:"warm",outcomes:[]},outcome:{title:"Post von dir selbst",message:`Versiegelt am ${de(p.createdDay)}, mit „${w}“ drauf. Heute ist ${p.mode==="30"?"der dreissigste Tag":"irgendwann"}.

„${p.text}“`},photo:null,collectToken:null,voucher:!1,freikarte:!1,flaschenpost:p.id}}let g;d&&(g=u.outcomes.categories.find(w=>w.id===d.categoryId)),!g&&c&&c.categoryId&&(g=u.outcomes.categories.find(w=>w.id===c.categoryId)||null),g||(g=wl(`${o}|category`,t||0,n,{token:i,day:e}),!r&&Al(i,e)&&(g=u.outcomes.categories.find(w=>w.id==="jackpot")||g));const f=Ms();if(f){const w=u.outcomes.categories.find(D=>D.id===f);w&&(g=w)}g.id==="photo"&&!ut().length&&(g=u.outcomes.categories.find(w=>w.id==="common")||g);const m=new Set(R().filter(w=>w.token===i&&w.day<e&&w.categoryId===g.id).map(w=>w.title)),b=g.outcomes.filter(w=>!m.has(w.title));let y=b.length?b:g.outcomes;if(!r&&$l(i,e)>=Ml){const w=y.filter(D=>D.voucher!==!0);w.length&&(y=w)}const A=(c&&c.categoryId===g.id?g.outcomes.find(w=>w.title===c.title):null)||d&&g.outcomes.find(w=>w.title===d.outcomeTitle)||y[va(`${o}|${g.id}|outcome`,y.length)],P=ut();let C=null;if(g.id==="photo"&&P.length){const w=new Set(R().filter(k=>k.token===i&&k.day<e&&k.photo).map(k=>k.photo.url)),D=P.filter(k=>!w.has(k.url)),L=D.length>0?D:P;C=L[va(`${o}|photo`,L.length)]}return{day:e,token:i,category:g,outcome:A,photo:C,collectToken:A.token||null,voucher:A.voucher||!1,freikarte:A.freikarte===!0}}function Dl(){const e=ae()||Y(u.theme.timezone),t=$e();return Wr(e,t)}function _l(e,t){return Wr(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function Nl(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Il(e){const t=(r,i)=>S.style.setProperty(r,i),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const qr={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Fr={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Pl(e){const t=Pr(e);if(!t)return;const a=(n,r)=>S.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))qr[n]&&typeof r=="string"&&a(qr[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))Fr[n]&&typeof r=="string"&&a(Fr[n],r)}const Bl=`
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
    `;function jl(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=Bl.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function Wl(){return`
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
    `}function ql(){return`
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
    `}const Fl=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${Wl()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${ql()}
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
              <button class="ag-button" type="button" data-ag-draw>
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span data-ag-button-text>Kapsel ziehen</span>
              </button>
            </div>

            <article class="ag-card ag-result" data-ag-result aria-live="polite" hidden>
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
        <button class="ag-bottomnav-btn" type="button" role="tab" aria-selected="false" data-ag-tab="licht" aria-label="Licht">
          <span class="ag-bottomnav-btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.5-1 2.5h-5c0-1-.4-1.9-1-2.5z"/></svg></span>
          <span class="ag-bottomnav-btn-label">Licht</span>
        </button>
      </nav>
    `;function Ul(){S.className="ag-widget",S.setAttribute("aria-labelledby","ag-title"),S.innerHTML=Fl}function Ol(e,t=1400,a=.82){return new Promise((n,r)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{URL.revokeObjectURL(i);try{const s=Math.min(1,t/Math.max(o.naturalWidth||1,o.naturalHeight||1)),d=Math.max(1,Math.round((o.naturalWidth||1)*s)),c=Math.max(1,Math.round((o.naturalHeight||1)*s)),p=document.createElement("canvas");p.width=d,p.height=c,p.getContext("2d").drawImage(o,0,0,d,c);const g=p.toDataURL("image/jpeg",a);if(!g||g==="data:,"){r(new Error("encode failed"));return}n(g)}catch(s){r(s)}},o.onerror=()=>{URL.revokeObjectURL(i),r(new Error("decode failed"))},o.src=i})}async function Rl(e,t,a){const n=u.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const r=await Ol(a),i=r.slice(r.indexOf(",")+1),o=new AbortController,s=setTimeout(()=>o.abort(),3e4);let d;try{d=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:o.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:i})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await d.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function ce(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let i=0;i<e;i++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,c=Math.random()*100,p=Math.random()*.6,g=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${d}px;height:${d*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${g}s ${p}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const i=document.createElement("style");i.id="ag-confetti-style",i.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(i)}setTimeout(()=>r.remove(),3e3)}function T(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const Ur={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function Hl(e){T(Ur[e]||Ur.soft)}const Ye=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?","Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?","Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?","Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?","Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?","Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?","Welches Lied erinnert dich an uns, ohne dass ich das je wusste?","Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?","Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?","Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?","Woran merkst du, dass ich gerade einen guten Tag habe?","Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?","Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?","Was ist etwas, das du als Kind geliebt hast und heute vergisst?","Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?","Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?","Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?","Welcher Streit war im Nachhinein der nützlichste?","Was macht dich an mir manchmal nervös, und ist das schlimm?","Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?","Was ist dein Lieblingsbild von uns, und warum genau das?","Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?","Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?","Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?","Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?","Was wünschst du dir für mich, das nichts mit dir zu tun hat?","Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?","Was war das Erste, das dir an meiner Wohnung aufgefallen ist?","Welche Angewohnheit von mir hast du inzwischen übernommen?","Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?","Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?","Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?","Welcher Geruch gehört für dich zu mir?","Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?","Worauf freust du dich im Winter, worauf im Sommer?","Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?","Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?","Wann hast du zuletzt gedacht: genau das hier, so soll es sein?","Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?","Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?","Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?","Welchen Teil deines Alltags würdest du mir gern öfter zeigen?","Was glaubst du, worin ich dich unterschätze?","Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?","Welche Jahreszeit passt zu uns, und warum?","Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?","Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?","Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?","Was ist eine Tradition, die wir uns ausdenken sollten?","Was macht dich zuverlässig fröhlich, und mache ich davon genug?","Welche Seite von dir glaubst du, kenne ich noch gar nicht?","Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?","Was wäre dein perfekter Sonntagmorgen, bis ins Detail?","Was ist eine Sache, über die wir nie reden, und sollten wir?","Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?","Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?","Was würdest du gern öfter von mir hören?","Welche Ecke von Zürich fühlt sich am meisten nach uns an?","Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?","Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?","Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"],Or=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]];let Gt=-1;function Rr(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Yn);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<Ye.length){Gt=a;const n=l("#ag-gesprach-question");n&&(n.textContent=Ye[a]);return}}}catch{}Hr()}}function Gl(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function Hr(){let e;do e=Math.floor(Math.random()*Ye.length);while(e===Gt&&Ye.length>1);Gt=e;try{localStorage.setItem(Yn,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=Ye[e])}function Kl(){const e=Ye[Gt]||"";if(!e)return;const t=u.theme&&u.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Gr(){var e;return!!((e=u.quest)!=null&&e.enabled&&Dt(u))}function Kr(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,Yr())}function Yl(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function Yr(){const e=Dt(u),t=lt(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),r=l("#ag-quest-loading"),i=l("#ag-quest-actions"),o=l("#ag-quest-result"),s=l("#ag-quest-points"),d=l("#ag-quest-copy"),c=l("#ag-quest-title"),p=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),i&&(i.hidden=!0);return}if(a&&(a.textContent=p),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((g,f)=>`<div class="ag-hint-item"><span class="ag-hint-num">${f+1}</span><p>${g}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),i&&(i.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${qt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),i&&(i.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Vl(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),r=l("#ag-quest-points"),i=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await Jl(e),s=lt(),d=Dt(u),c=(d==null?void 0:d.prompt)||"",p=(d==null?void 0:d.solution)||"";try{const g=await Zl(o,c,p,s.attempts+1,s.hints);if(s.attempts+=1,g.success){const f=Xn[Math.min(s.attempts-1,Xn.length-1)],m=Hs(f);s.solved=!0,s.pointsEarned=f,s.successMessage=g.message||"Perfekt.",Aa(s),se(),n&&(n.textContent=g.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${f} Punkte · Gesamt: ${m}`,r.hidden=!1),a&&(a.hidden=!0),i&&(i.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const b=l("#ag-btn-quest");b&&b.classList.remove("ag-chip-quest-active"),T([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],g.hint||"Versuch nochmal."],Aa(s),Yr()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Jl(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Zl(e,t,a,n,r){var s;const i=(s=u.quest)==null?void 0:s.proxyUrl;if(!i)throw new Error("no proxy");const o=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!o.ok)throw new Error("proxy error");return o.json()}function Xl(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let c=0;c<n;c++)i[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(d),d.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,p,g,f,m])=>{const b=t.createOscillator();b.type="sine",b.frequency.setValueAtTime(c,a+g),b.frequency.exponentialRampToValueAtTime(p,a+g+f*.55);const y=t.createGain();y.gain.setValueAtTime(0,a+g),y.gain.linearRampToValueAtTime(m,a+g+.09),y.gain.exponentialRampToValueAtTime(.001,a+g+f),b.connect(y),y.connect(t.destination),b.start(a+g),b.stop(a+g+f+.05)})}catch{}}function Ql(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const i=document.createElement("span");i.className="ag-letter-word",i.textContent=n,i.style.animationDelay=`${320+r*155}ms`,a.appendChild(i),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Vr(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}const Jr="affektions-gacha:letter-opened:v1",ed=10;function td(){try{return localStorage.getItem(Jr)==="yes"}catch{return!1}}function ad(e){return td()?!1:e>0&&e%ed===0}const nd="Psst: Der Knopf hat ein Geheimnis. Drei Sekunden lang halten. 🍀";function Zr(){const e=l("#ag-letter-overlay");if(!e)return;try{localStorage.setItem(Jr,"yes")}catch{}e.hidden=!1,e.focus(),T([20,60,20]),Xl();const t=l("#ag-letter-photo");if(t&&u.photos&&u.photos.length){const a=ut(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}rd()}async function rd(){var n;const e=l("#ag-letter-body");if(!e)return;Ql(e);const t=(n=u.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const i=await r.json();if(i.paragraphs&&i.paragraphs.length){Vr(e,i.paragraphs);return}}}catch{}const a=Or[Math.floor(Math.random()*Or.length)];Vr(e,a)}function Fa(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}const Xr="affektions-gacha:wetter:v1",id=30*60*1e3,od=5e3;function Ua(e,t=!0){const a=Number(e);return a===0?t?"☀️":"🌙":a===1?t?"🌤":"🌙":a===2?t?"⛅":"☁️":a===3?"☁️":a===45||a===48?"🌫":a>=51&&a<=57?"🌦":a>=61&&a<=67?"🌧":a>=71&&a<=77?"🌨":a>=80&&a<=82?"🌧":a===85||a===86?"🌨":a>=95&&a<=99?"⛈":"🌡"}function sd(e){const t=Number(e);return t>=51&&t<=67||t>=80&&t<=82?"rain":t>=71&&t<=77||t===85||t===86?"snow":t===45||t===48?"fog":t>=95?"storm":null}function Qr(e){return!e||typeof e.t!="number"?"":`${Math.round(e.t)}° ${e.e||Ua(e.c,e.d!==!1)}`}function ld(){try{const e=localStorage.getItem(Xr);if(!e)return null;const t=JSON.parse(e);return t&&typeof t.t=="number"&&typeof t.at=="number"?t:null}catch{return null}}function dd(e){try{localStorage.setItem(Xr,JSON.stringify(e))}catch{}}async function ei({force:e=!1}={}){const t=u.theme&&u.theme.weather;if(!t||typeof t.latitude!="number"||typeof t.longitude!="number")return null;const a=ld();if(a&&!e&&Date.now()-a.at<id)return u.weather=a,a;const n=`https://api.open-meteo.com/v1/forecast?latitude=${t.latitude}&longitude=${t.longitude}&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(u.theme.timezone||"Europe/Zurich")}`,r=new AbortController,i=setTimeout(()=>r.abort(),od);try{const o=await fetch(n,{cache:"no-store",signal:r.signal});if(!o.ok)throw new Error("weather "+o.status);const s=await o.json(),d=s&&s.current;if(!d||typeof d.temperature_2m!="number")throw new Error("weather shape");const c={t:d.temperature_2m,c:Number(d.weather_code)||0,d:d.is_day!==0,at:Date.now()};return c.e=Ua(c.c,c.d),dd(c),u.weather=c,c}catch{return a?(u.weather=a,a):null}finally{clearTimeout(i)}}function cd(e){return!e||typeof e.t!="number"?null:{t:Math.round(e.t*10)/10,c:e.c,e:e.e||Ua(e.c,e.d!==!1)}}const gd=["is-raining","is-snowing","is-foggy","is-stormy"];function ud(e){if(!S)return;for(const a of gd)S.classList.remove(a);const t=e?sd(e.c):null;t==="rain"&&S.classList.add("is-raining"),t==="snow"&&S.classList.add("is-snowing"),t==="fog"&&S.classList.add("is-foggy"),t==="storm"&&S.classList.add("is-stormy","is-raining")}function W(e){const t=S.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}let Oa=null;function ti(){if(!Oa)try{Oa=new(window.AudioContext||window.webkitAudioContext)}catch{}return Oa}function ai(){try{return window.localStorage.getItem(ws)!=="off"}catch{return!0}}function ne(e,t,a,n,r=.15,i="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=i,o.frequency.value=t;const d=e.currentTime+a;s.gain.setValueAtTime(0,d),s.gain.linearRampToValueAtTime(r,d+.012),s.gain.exponentialRampToValueAtTime(1e-4,d+n),o.start(d),o.stop(d+n+.05)}function Kt(e){if(!ai())return;const t=ti();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":ne(t,280,0,.18,.08,"sine"),ne(t,210,.12,.22,.06,"sine");break;case"cursed":ne(t,220,0,.12,.1,"triangle"),ne(t,170,.09,.28,.07,"triangle");break;case"uncommon":ne(t,523,0,.14,.14,"sine"),ne(t,784,.1,.22,.12,"sine");break;case"rare":ne(t,523,0,.12,.14,"sine"),ne(t,659,.09,.12,.14,"sine"),ne(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>ne(t,a,n*.09,.18,.13,"sine")),ne(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>ne(t,a,n*.08,.16,.13,"sine")),ne(t,2093,.45,.5,.05,"sine");break;default:ne(t,523,0,.12,.13,"sine"),ne(t,659,.09,.18,.1,"sine");break}}function Ra(){if(!ai())return;const e=ti();e&&(e.state==="suspended"&&e.resume().catch(()=>{}),ne(e,1760,0,.09,.1,"triangle"),ne(e,2637,.05,.14,.07,"sine"),ne(e,1319,.11,.22,.05,"sine"))}function Ha(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function pd(e,t){if(!e)return;const a=e.parentNode&&e.parentNode.querySelector("[data-ag-ink-hint]");if(!t){e.classList.remove("ag-ink","is-held"),a&&(a.hidden=!0);return}e.classList.add("ag-ink"),e.classList.remove("is-held");let n=0;const r=document.createTreeWalker(e,4),i=[];for(;r.nextNode();)i.push(r.currentNode);for(const s of i){const d=document.createDocumentFragment();for(const c of s.nodeValue){const p=document.createElement("span");p.className="ag-ink-ch",p.textContent=c,p.style.setProperty("--i",String(n++)),d.appendChild(p)}s.parentNode.replaceChild(d,s)}let o=a;if(o||(o=document.createElement("p"),o.className="ag-ink-hint",o.setAttribute("data-ag-ink-hint",""),e.parentNode.insertBefore(o,e)),o.hidden=!1,o.textContent="🫥 Geheimtinte — Finger auf den Text legen",!e.dataset.inkBound){e.dataset.inkBound="1";const s=()=>{e.classList.contains("ag-ink")&&(e.classList.add("is-held"),T(6))},d=()=>e.classList.remove("is-held");e.addEventListener("pointerdown",s),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",d),e.addEventListener("pointerleave",d)}}const Ga=["Lieblingsmensch","Sternschnuppe","Heimathafen","Gleichklang","Morgenlicht","Fernweh","Herzklopfen","Nachtfalter","Kuschelwetter","Augenblick","Geborgenheit","Sommersprosse","Lichtblick","Zuhause","Wegbegleiter","Glühwürmchen","Nähe","Du","Nachtschwärmer","Sanft","Wir"];function hd(e=Math.random()){return Ga[Math.floor(e*Ga.length)%Ga.length]}function fd(e){e.addEventListener("click",()=>{!S||!S.classList.contains("is-evening")||(e.classList.add("is-flare"),setTimeout(()=>e.classList.remove("is-flare"),900),T(6),W(`✨ ${hd()}`))})}function ni(e,t){if(!S)return;const a=S.querySelector('.ag-bottomnav-btn[data-ag-tab="today"] .ag-bottomnav-btn-icon');if(!t||!a||Ha()){Ra();return}const n=t.getBoundingClientRect(),r=a.getBoundingClientRect(),i=document.createElement("div");i.className="ag-coin",i.textContent=e,i.style.left=`${n.left+n.width/2}px`,i.style.top=`${n.top+n.height/2}px`,document.body.appendChild(i);const o=r.left+r.width/2-(n.left+n.width/2),s=r.top+r.height/2-(n.top+n.height/2),d=i.animate([{transform:"translate(-50%,-50%) scale(1) rotateY(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(o*.45).toFixed(0)}px), calc(-50% + ${(s*.35-110).toFixed(0)}px)) scale(1.35) rotateY(200deg)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${o.toFixed(0)}px), calc(-50% + ${s.toFixed(0)}px)) scale(0.25) rotateY(560deg)`,opacity:.15}],{duration:950,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});d.onfinish=()=>{i.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),Ra(),T([10,50,22]),Promise.resolve().then(()=>hn).then(c=>c.flashLightsForPull("uncommon")).catch(()=>{})}}function md(e){if(!S||!e||u.foldedFor===e.day)return;const t=l("[data-ag-result]"),a=S.querySelector('.ag-bottomnav-btn[data-ag-tab="history"] .ag-bottomnav-btn-icon');if(!t||t.hidden||!a||(u.foldedFor=e.day,Ha()))return;const n=t.getBoundingClientRect(),r=window.innerHeight||800,i=n.left+n.width/2,o=n.bottom<0||n.top>r?r/2:Math.max(60,Math.min(r-60,n.top+Math.min(n.height,r)/2)),s=a.getBoundingClientRect(),d=document.createElement("div");d.className="ag-envelope",d.textContent="✉️",d.style.left=`${i}px`,d.style.top=`${o}px`,document.body.appendChild(d);const c=s.left+s.width/2-i,p=s.top+s.height/2-o,g=d.animate([{transform:"translate(-50%,-50%) scale(2.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1.4)",opacity:1,offset:.25},{transform:`translate(calc(-50% + ${c.toFixed(0)}px), calc(-50% + ${p.toFixed(0)}px)) scale(0.3)`,opacity:.2}],{duration:720,easing:"cubic-bezier(.4,.6,.3,1)",fill:"forwards"});g.onfinish=()=>{d.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),T(8)}}const ri=/[\p{L}\p{M}’'-]/u;function bd(e,t){if(typeof e!="string"||!e.length)return"";let a=Math.min(Math.max(t,0),e.length),n=a;for(;a>0&&ri.test(e[a-1]);)a--;for(;n<e.length&&ri.test(e[n]);)n++;return e.slice(a,n).replace(/^[-'’]+|[-'’]+$/g,"")}function yd(e,t){let a=null,n=0;try{if(document.caretPositionFromPoint){const r=document.caretPositionFromPoint(e,t);r&&(a=r.offsetNode,n=r.offset)}else if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(e,t);r&&(a=r.startContainer,n=r.startOffset)}}catch{return""}return!a||a.nodeType!==3?"":bd(a.nodeValue,n)}function wd(e,t){if(!e||e.dataset.wordBound)return;e.dataset.wordBound="1";let a=null,n=0,r=0;const i=()=>{a&&(clearTimeout(a),a=null)};e.addEventListener("pointerdown",o=>{e.classList.contains("ag-ink")||(n=o.clientX,r=o.clientY,i(),a=setTimeout(()=>{a=null;const s=yd(n,r);s&&s.length>=3&&t(s)},650))}),e.addEventListener("pointermove",o=>{a&&Math.hypot(o.clientX-n,o.clientY-r)>10&&i()}),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i),e.addEventListener("pointerleave",i),e.addEventListener("contextmenu",o=>{a&&o.preventDefault()})}const Ka=120;function vd(e,t,a){if(!e||!t||e.dataset.pfandBound)return;e.dataset.pfandBound="1";let n=!1,r=0,i=0,o=!1;const s=()=>{t.style.transition="transform 320ms cubic-bezier(.3,.7,.3,1.2), opacity 320ms ease",t.style.transform="",t.style.opacity="",setTimeout(()=>{t.style.transition=""},340),t.classList.remove("is-pfand-dragging")};e.addEventListener("pointerdown",c=>{n=!0,o=!1,r=c.clientY,i=0;try{e.setPointerCapture(c.pointerId)}catch{}t.style.transition="none",t.classList.add("is-pfand-dragging")}),e.addEventListener("pointermove",c=>{if(!n)return;i=Math.min(0,c.clientY-r),i<-6&&(o=!0);const p=Math.min(1,-i/Ka);t.style.transform=`translateY(${(i*.7).toFixed(0)}px) scale(${(1-.22*p).toFixed(3)})`,t.style.opacity=String(1-.35*p),e.classList.toggle("is-ready",-i>=Ka)});const d=()=>{if(n){if(n=!1,e.classList.remove("is-ready"),-i>=Ka){s(),a();return}s()}};e.addEventListener("pointerup",d),e.addEventListener("pointercancel",d),e.addEventListener("click",c=>{if(o){c.preventDefault();return}Promise.resolve().then(()=>Id).then(p=>{p.armConfirm(e,"Zurückgeben? Nochmal tippen")&&a()})})}function xd(e){if(!S)return;const t=S.querySelector(".ag-machine-wrap");if(!e||!t)return;const a=e.getBoundingClientRect(),n=t.getBoundingClientRect(),r=document.createElement("div");r.className="ag-pfand-capsule",r.style.left=`${a.left+a.width/2}px`,r.style.top=`${a.top+a.height/2}px`,document.body.appendChild(r);const i=n.left+n.width/2-(a.left+a.width/2),o=n.top+n.height*.55-(a.top+a.height/2);if(Ha()){r.remove();return}const s=r.animate([{transform:"translate(-50%,-50%) scale(1) rotate(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(i*.5).toFixed(0)}px), calc(-50% + ${(o*.5-60).toFixed(0)}px)) scale(1.1) rotate(180deg)`,opacity:1,offset:.5},{transform:`translate(calc(-50% + ${i.toFixed(0)}px), calc(-50% + ${o.toFixed(0)}px)) scale(.3) rotate(420deg)`,opacity:.1}],{duration:820,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});s.onfinish=()=>{r.remove(),t.classList.add("is-gulp"),setTimeout(()=>t.classList.remove("is-gulp"),700),Ra(),T([10,40,20])}}function Ya(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=Y(((e=u.theme)==null?void 0:e.timezone)||"UTC"),a=U(),r=R().some(i=>i.token===a&&i.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}const ii="affektions-gacha:motion:v1";let Va=null,Ja=!1;function oi(){try{return window.localStorage.getItem(ii)||""}catch{return""}}function kd(e){try{window.localStorage.setItem(ii,e)}catch{}}function Sd(e){if(!Va||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));Va(t,a)}function Za(){Ja||(Ja=!0,window.addEventListener("deviceorientation",Sd,{passive:!0}),S&&S.classList.add("has-tilt"))}async function Td(){const e=window.DeviceOrientationEvent;if(!(e&&typeof e.requestPermission=="function")){Za();return}if(oi()!=="denied")try{const a=await e.requestPermission();kd(a==="granted"?"granted":"denied"),a==="granted"&&Za()}catch{}}function Ed({onTilt:e}={}){if(Va=e||null,typeof window>"u")return;const t=window.DeviceOrientationEvent;if(!t)return;if(typeof t.requestPermission!="function"){Za();return}const a=()=>{Td().then(()=>{(Ja||oi()==="denied")&&document.removeEventListener("click",a)})};document.addEventListener("click",a)}const Yt={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function si(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Ld(e){if(si())return;const t=Yt[e]||Yt.soft;t.rumble!=="none"&&(S.classList.add("is-rumbling"),t.rumble==="hard"&&S.classList.add("is-rumbling-hard"))}function Cd(){S.classList.remove("is-rumbling","is-rumbling-hard")}function Xa(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function li(e=0){const t=S.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function Ad(e){const t=Yt[e]||Yt.soft;if(si()){Xa(t.flash);return}li(0),li(160),Xa(t.flash),t.double&&Xa(t.flash,260),t.shutter&&S.classList.add("is-shutter"),setTimeout(()=>S.classList.remove("is-shutter"),700);try{ce(t.particles,t.palette)}catch{}}const zd=["So","Mo","Di","Mi","Do","Fr","Sa"];function Md(e){try{const[t,a,n]=Y(e||"UTC").split("-").map(Number),r=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return zd[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(r)]||null}catch{return null}}function $d(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function di(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,r)=>{const i=$d(n,t),o=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${H(n.when)}</span>`:"";return`
      <li class="ag-skin-step${i?"":" is-off"}">
        <span class="ag-skin-num">${r+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${H(n.name||"")}${o}</span>
          ${n.note?`<span class="ag-skin-note">${H(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${H(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function Dd(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=u.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=Md(u.theme&&u.theme.timezone);e.innerHTML=di(t.morning,a)+di(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${H(t.footer)}</p>`:"")}function ci(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,Dd(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),T(10))}function _d(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}const Ve=new WeakMap,gi=4e3;function Je(e,t="Sicher? Nochmal tippen",a=gi){if(!e)return!0;const n=Ve.get(e);if(n)return clearTimeout(n.timer),Ve.delete(e),e.classList.remove("is-armed"),e.innerHTML=n.html,!0;const r=e.innerHTML;e.classList.add("is-armed"),e.textContent=t;const i=setTimeout(()=>{Ve.delete(e),e.classList.remove("is-armed"),e.innerHTML=r},a);return Ve.set(e,{timer:i,html:r}),!1}function Nd(e){const t=e&&Ve.get(e);t&&(clearTimeout(t.timer),Ve.delete(e),e.classList.remove("is-armed"),e.innerHTML=t.html)}const Id=Object.freeze(Object.defineProperty({__proto__:null,ARM_MS:gi,armConfirm:Je,disarm:Nd},Symbol.toStringTag,{value:"Module"}));function Pd(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function Qa(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function Bd(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${Qa(r)}× ${n}`}return null}function jd(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const r of t){const i=Number(r&&r.elevation);!Number.isFinite(i)||i<=0||(!a||i>a.h)&&(a={h:i,name:(r.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${Qa(n)}× euer höchster Gipfel (${a.name})`:`≈ ${Qa(n)}× euer höchster Gipfel`}function Wd(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,i]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+i+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function qd(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const i=r.indexOf("?"),o=i===-1?r:r.slice(0,i),s=i===-1?"":r.slice(i+1),d=new URLSearchParams(s);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),o+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),i=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${i}`)}const n=Wd(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function en(e,t){const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Fd(e){const t=jt();t.unshift(e),Wt(t),De("gipfelbuch"),en("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function Ud(e){Wt(jt().filter(t=>t.id!==e)),De("gipfelbuch"),en("gipfel-delete",{id:e})}function Od(e,t){const a=jt(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,Wt(a),De("gipfelbuch"),en("gipfel-upsert",r)}function Rd(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?As(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?qd(e.activityUrl):null,i=e.cover?`<div class="ag-gipfel-cover"><img src="${H(e.cover)}" alt="${H(e.name||"")}" loading="lazy" decoding="async"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${H(e.distance)} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${H(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||d?`<div class="ag-gipfel-stats">${s}${s&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${i}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Ts(e.date)}</div>
        <div class="ag-gipfel-name">${H(e.name||"—")}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${wa(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${H(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${H(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${H(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const p=t.querySelector("[data-ag-gipfel-edit]");p&&p.addEventListener("click",()=>{var N;const b=l("[data-ag-berge-form]"),y=l("[data-ag-berge-add]");if(!b)return;const v=l("[data-ag-berge-edit-id]");v&&(v.value=e.id);const A=l("[data-ag-berge-name]");A&&(A.value=e.name||"");const P=l("[data-ag-berge-dist]");P&&(P.value=e.distance||"");const C=l("[data-ag-berge-gain]");C&&(C.value=e.elevGain||e.elevation||"");const w=l("[data-ag-berge-date]");w&&(w.value=e.date||"");const D=l("[data-ag-berge-url]");D&&(D.value=e.activityUrl||"");const L=l("[data-ag-berge-cover]");L&&(L.value=e.cover||"");const k=l("[data-ag-berge-notes]");k&&(k.value=e.notes||"");const x=l("[data-ag-berge-lat]");x&&(x.value=e.lat||"");const $=l("[data-ag-berge-lng]");$&&($.value=e.lng||"");const I=l("[data-ag-berge-loc-label]");I&&(I.value=e.locLabel||"");const j=l("[data-ag-loc-search]");j&&(j.value=e.locLabel||"");const F=l("[data-ag-berge-form-title]");F&&(F.textContent="Eintrag bearbeiten");const _=l("[data-ag-berge-save] span:last-child");_&&(_.textContent="Speichern"),b.hidden=!1,y&&(y.hidden=!0),(N=l("[data-ag-sheet-backdrop]"))==null||N.classList.add("is-open"),b.scrollIntoView({behavior:"smooth",block:"nearest"}),A&&A.focus(),T(8)});const g=t.querySelector("[data-ag-gipfel-delete]");g&&g.addEventListener("click",()=>{Je(g,"Löschen? Nochmal tippen")&&(Ud(e.id),pt(),T(8),W("Eintrag gelöscht"))});const f=t.querySelector("[data-ag-map-komoot]");f&&f.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,f.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,f.textContent="Karte schließen",T(4)}});const m=t.querySelector("[data-ag-map-alltrails]");return m&&r&&m.addEventListener("click",()=>{const b=t.querySelector("[data-ag-map-wrap-alltrails]");if(b){if(!b.hidden){b.hidden=!0,m.textContent="🗺 AllTrails-Karte";return}b.innerHTML=`<iframe src="${H(r)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,m.textContent="Karte schließen",T(4)}}),t}function pt({loading:e=!1}={}){const t=l("[data-ag-berge-list]"),a=l("[data-ag-berge-empty]"),n=l("[data-ag-berge-total]"),r=l("[data-ag-berge-analogy]"),i=l("[data-ag-berge-total-dist]"),o=l("[data-ag-berge-dist-analogy]"),s=l("[data-ag-berge-gipfel-cmp]");if(!t)return;const d=jt().sort((g,f)=>{const m=g.date||"",b=f.date||"";return b<m?-1:b>m?1:0});t.innerHTML="";const c=d.reduce((g,f)=>g+(Number(f.elevGain)||Number(f.elevation)||0),0);if(n&&(n.textContent=c>0?wa(c):"— m"),r){const g=Pd(c);g?(r.textContent=g,r.hidden=!1):r.hidden=!0}const p=d.reduce((g,f)=>{const m=Number(f.distance);return g+(Number.isFinite(m)&&m>0?m:0)},0);if(i&&(i.textContent=p>0?`${Es(p)} km`:"— km"),o){const g=Bd(p);g?(o.textContent=g,o.hidden=!1):o.hidden=!0}if(s){const g=jd(c,d);g?(s.textContent=g,s.hidden=!1):s.hidden=!0}if(!d.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),ui([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),d.forEach(g=>t.appendChild(Rd(g))),ui(d)}function Hd(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const i=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");i&&(i.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const i=t.value.trim();if(!i){r();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(c=>{const p=document.createElement("button");p.type="button",p.className="ag-location-result",p.textContent=c.display_name,p.addEventListener("click",()=>{const g=e.querySelector("[data-ag-berge-lat]"),f=e.querySelector("[data-ag-berge-lng]"),m=e.querySelector("[data-ag-berge-loc-label]");g&&(g.value=c.lat),f&&(f.value=c.lon),m&&(m.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(p)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!a.contains(i.target)&&(a.hidden=!0)})}function Gd(){Hd(S)}let xe=null,Vt=null;function tn(){xe&&setTimeout(()=>xe.invalidateSize(),150)}async function Kd(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function ui(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await Kd()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const i=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!xe){xe=n.map(r).fitBounds(i),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(xe);const s=t.querySelectorAll("[data-map-view]");s.forEach(d=>{d.addEventListener("click",()=>{s.forEach(p=>p.classList.remove("is-active")),d.classList.add("is-active");const c=d.dataset.mapView==="eu"?o:i;xe.fitBounds(c)})})}Vt?Vt.clearLayers():Vt=n.layerGroup().addTo(xe),a.forEach(s=>{const d=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const p=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${H(s.name||"—")}</div>
      ${p?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${wa(p)}</div>`:""}
    `;const g=document.createElement("button");g.type="button",g.textContent="Zum Eintrag",g.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",g.addEventListener("click",()=>{d.closePopup();const f=S.querySelector(`[data-ag-gipfel-id="${s.id}"]`);f&&(f.scrollIntoView({behavior:"smooth",block:"center"}),f.classList.add("ag-gipfel-highlight"),setTimeout(()=>f.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(g),d.bindPopup(c),Vt.addLayer(d)}),requestAnimationFrame(()=>{xe&&xe.invalidateSize()}),setTimeout(()=>{xe&&xe.invalidateSize()},250)}const pi=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}],Yd=5,an="🌿";function Vd(e=new Date){const t=e.getMonth()+1;return t>=3&&t<=5}function Jd(e,t){return e>=Yd&&!Js(t)}function hi(e){return pi[Math.min(e-1,pi.length-1)]}function Ze(e,t){return e+Math.random()*(t-e)}function fi(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${u.baerlauch.level}`)}function ht(){u.baerlauch.timerId&&(clearInterval(u.baerlauch.timerId),u.baerlauch.timerId=null)}function mi(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");o&&(o.hidden=!0),ht(),u.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),i&&(i.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),bi(U(),u.baerlauch.level,!1),rn()}function Zd(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),r=l("#ag-baerlauch-actions"),i=l("#ag-baerlauch-next");ht();const o=u.baerlauch.level;u.baerlauch.level+=1;const s=ec(U(),u.baerlauch.level);bi(U(),u.baerlauch.level,!0),rn(),fi(),s&&ce();let d=!1;const c=Mt();if(Jd(o,c)){Zs(c);try{Nt(an)}catch{}try{tt()}catch{}try{se()}catch{}try{W(`${an} Sammeltoken für Level ${o} — in der Token-Bank`)}catch{}d=!0}if(e&&(e.hidden=!1,e.textContent=d?`Level ${o} geschafft, nur guten Bärlauch gesammelt. Dafür gibt es diese Woche ein ${an}. 💚`:"Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&u.photos&&u.photos.length){const p=ut(),g=p.length?p[Math.floor(Math.random()*p.length)]:null;so(a,g),t.hidden=!1;const f=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=f[Math.floor(Math.random()*f.length)]}i&&(i.textContent=`Level ${u.baerlauch.level} starten`),r&&(r.hidden=!1)}function Xd(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),r=hi(u.baerlauch.level).timeMs;u.baerlauch.durationMs=r,u.baerlauch.startedAt=performance.now(),ht(),u.baerlauch.timerId=setInterval(()=>{const i=performance.now()-u.baerlauch.startedAt,o=Math.max(0,r-i),s=Math.min(1,i/r);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);d.forEach(p=>{p.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,p.style.opacity=String(1-c*.28)}),o<=0&&(ht(),e())},50)}function nn(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!i)return;if(e.hidden=!1,rn(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),u.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",i.textContent="",o&&(o.hidden=!0),fi();const s=hi(u.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],p=[...d.slice(0,s.good).map(m=>({emoji:m,good:!0})),...c.slice(0,s.bad).map(m=>({emoji:m,good:!1}))];let g=0;const f=p.filter(m=>m.good).length;p.forEach(m=>{const b=document.createElement("button");b.type="button",b.className="ag-forage-item",b.textContent=m.emoji,b.dataset.good=m.good?"true":"false",b.style.left=`${Ze(8,82)}%`,b.style.top=`${Ze(10,72)}%`,b.style.setProperty("--dx",`${Ze(-320,320)}px`),b.style.setProperty("--dy",`${Ze(-220,220)}px`),b.style.setProperty("--dur",`${Ze(s.speedMin,s.speedMax)}s`),b.style.setProperty("--delay",`${Ze(-1.8,0)}s`),b.addEventListener("click",()=>{u.baerlauch.locked||(b.dataset.good==="true"?(b.classList.add("is-picked"),b.disabled=!0,g+=1,setTimeout(()=>b.remove(),140),g===f&&Zd()):mi("poison"))}),t.appendChild(b)}),Xd(()=>mi("timeout"))}function Qd(){const e=l("#ag-baerlauch-panel");ht(),e&&(e.hidden=!0)}function ec(e,t){var r;const a=Ca(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const i=(r=u.backup)==null?void 0:r.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function bi(e,t,a){var o;const n=pr(),r=((o=u.theme)==null?void 0:o.timezone)||"UTC",i=Y(r);n.unshift({date:i,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function rn(){var p;const e=l("#ag-baerlauch-scores");if(!e)return;const t="lennart",a="Fionn",n=Ca(),r=pr(),i="fionn",o=t in n||i in n;if(!o&&!r.length){e.hidden=!0;return}e.hidden=!1;const s=((p=u.theme)==null?void 0:p.timezone)||"UTC",d=g=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:s}).format(new Date(g+"T12:00:00Z"))}catch{return g}};let c="";if(o){const g=n[t]??0,f=n[i]??0;c+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${g||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${a}</span><span class="ag-score-result">Level ${f||"—"}</span></div>
    </div>`}if(r.length){const g=r.slice(0,8).map(f=>{const m=f.player===t,b=m?"ag-score-mine":"ag-score-theirs",y=m?"Du":a,v=f.won?`✓ Level ${f.level}`:`✗ Level ${f.level-1>=1?f.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${d(f.date)}</span><span class="ag-score-pill ${b}">${y}</span><span class="ag-score-result">${v}</span></div>`}).join("");c+=`<div class="ag-score-table">${g}</div>`}e.innerHTML=c}const q={recorder:null,audioBlob:null,lang:"swabian"};function Jt(){try{return JSON.parse(window.localStorage.getItem(Qn)||"[]")||[]}catch{return[]}}function Zt(e){try{window.localStorage.setItem(Qn,JSON.stringify(e))}catch{}}function yi(e){const t=Jt();t.unshift(e),Zt(t),De("glossary"),on("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function tc(e,t){const a=Jt(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,Zt(a),De("glossary"),on("glossary-upsert",r)}function ac(e){Zt(Jt().filter(t=>t.id!==e)),De("glossary"),on("glossary-delete",{id:e})}let Xt=!1;async function wi(){const e=u.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=U(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let i;try{i=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!i.ok)return 0;const o=await i.json();return!o.ok||!Array.isArray(o.glossary)?0:(Ia("glossary")||Zt(o.glossary.filter(s=>s.id)),o.glossary.length)}catch{return 0}}function on(e,t){const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:U(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function sn(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function nc(e,t){const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return sn(e);try{const n=await sn(e),r=n.split(",")[1],i=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:U(),filename:`glossary-${t}.webm`,mimeType:i,data:r}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return d.ok&&d.url?d.url:n}catch{return sn(e)}}const rc={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang",kapsel:"Kapsel"};function ic(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${H(rc[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${H(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${H(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${H(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${H(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${H(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),T(6)});const i=a.querySelector("[data-ag-glossary-edit]");i&&i.addEventListener("click",()=>{var f;const s=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const p=document.getElementById("ag-glossary-save-label");p&&(p.textContent="Speichern");const g=document.getElementById("ag-glossary-audio-status");g&&(g.textContent=e.audioUrl?"Aufnahme vorhanden":""),q.audioBlob=null,s.hidden=!1,d&&(d.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(f=document.getElementById("ag-glossary-word-input"))==null||f.focus(),T(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{Je(o,"Löschen? Nochmal tippen")&&(ac(e.id),We(q.lang),T(8))}),a}function We(e){var o;q.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===q.lang)}),vi();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),r=Jt(),i=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===q.lang);if(t.innerHTML="",!i.length){a&&(a.textContent=n?"Kein Treffer.":Xt?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",Xt&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),i.forEach(s=>t.appendChild(ic(s,!!n)))}function vi(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function xi(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),q.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),Xt=!0,We("swabian"),window.requestAnimationFrame(()=>vi()),T(10),wi().catch(()=>0).then(()=>{Xt=!1,We(q.lang)})}function oc(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),q.audioBlob=null,q.recorder&&q.recorder.state!=="inactive")try{q.recorder.stop()}catch{}q.recorder=null}const ki=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],Si=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function Ti(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(Oe)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(Oe,"granted")}catch{}await dn();return}if(e==="denied"){try{window.localStorage.setItem(Oe,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function sc(){var s;const e=((s=u.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,i=8*60,o=r<i?i-r:24*60-r+i;return Date.now()+o*60*1e3}async function ln(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=u.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=U(),r=Y(a);if(R().some(g=>g.token===n&&g.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=ot(a);if(o>=21)return;const d=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=sa(),p=Si[or(Si)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:p.title.replace("{name}",c),body:p.body.replace("{name}",c)})}catch{}}async function lc(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=sa(),i=ki[or(ki)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:sc(),title:i.title.replace("{name}",r),body:i.body.replace("{name}",r)}),(t=u.quest)!=null&&t.enabled&&Gr()){const o=lt(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==$t(u)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String($t(u)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:u.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:u.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function dc(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function dn(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",qa()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await lc(),await ln(),await dc(),await uc())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function cc(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Oe,"dismissed")}catch{}return}try{window.localStorage.setItem(Oe,"granted")}catch{}await dn()}function gc(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}async function uc(){const e=u.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:gc(e.vapidPublicKey)}));const n=u.backup&&u.backup.endpointUrl||"";if(!n)return;const r=JSON.stringify({type:"push-subscribe",token:U(),subscription:a.toJSON()}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(n,i).catch(()=>fetch(n,{...i,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}const pc="wss://broker.hivemq.com:8884/mqtt",Ei="picolight_lf26/events",hc="web_app",cn=10,Qt=17/29,fc={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:Qt,w:1},quiet:{pos:1/29,w:.3}},Li=18e3,Ci=420,Ai=6,zi=Ci*Ai,gn=1600;function Mi(e){const t=fc[e]||{pos:Qt,w:0},a=t.w>=1?{pos:Qt,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},r=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],i=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],o=[];for(let d=0;d<Ai;d++)o.push({at:d*Ci,payload:{on:!0,fade_steps:6,brightness:1,groups:d%2?i:r}});o.push({at:zi,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:cn}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let d=!1;for(let c=zi+gn;c<Li-gn;c+=gn)d=!d,o.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...d?s:n,size:cn}]}})}return o}const mc=2500,un=["board_a","board_b"];let ft=!1;function pn(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function bc(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}function yc(e){return Ni(Mi(e),Li,null)}const $i={"🥹":{pos:25/29,w:0},"😂":{pos:0/29,w:0},"🙃":{pos:Qt,w:0}},Di=1e4;function _i(e){return[{at:0,payload:{on:!0,fade_steps:20,brightness:1,groups:[{...$i[e]||{pos:.06896551724137931,w:.3},size:cn}]}},{at:2200,payload:{fade_steps:60,brightness:.45}},{at:4400,payload:{fade_steps:60,brightness:1}},{at:6600,payload:{fade_steps:60,brightness:.45}},{at:8800,payload:{fade_steps:60,brightness:1}}]}function wc(e,t="board_a"){return Ni(_i(e),Di,t)}const vc=e=>new Promise(t=>setTimeout(t,e));async function Ni(e,t,a){if(ft&&a){const n=Date.now()+25e3;for(;ft&&Date.now()<n;)await vc(500)}if(!ft){ft=!0;try{await pn(),await new Promise((n,r)=>{const i=window.mqtt.connect(pc,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),o={};let s=!1,d=null,c=[],p=!1;const g=()=>{if(!p){p=!0,document.removeEventListener("visibilitychange",b);try{i.end(!0)}catch{}n()}},f=y=>{y.from=hc;try{i.publish(Ei,JSON.stringify(y))}catch{}},m=()=>{clearTimeout(d);for(const y of c)clearTimeout(y);if(c=[],!s){g();return}s=!1;for(const y of a?[a]:un){const v=o[y]||o[un.find(P=>P!==y)];if(!v)continue;const A={target:y,...bc(v)};v.on===!1?(f({...A,on:!0}),setTimeout(()=>f({target:y,on:!1}),1500)):f({...A,on:!0})}setTimeout(g,2500)},b=()=>{document.visibilityState==="hidden"&&s&&m()};document.addEventListener("visibilitychange",b),i.on("connect",()=>{i.subscribe(Ei,y=>{if(y){g();return}f({nudge:!0}),setTimeout(()=>{if(!Object.keys(o).length){g();return}s=!0;for(const v of e)c.push(setTimeout(()=>f(a?{...v.payload,target:a}:v.payload),v.at));d=setTimeout(m,t)},mc)})}),i.on("message",(y,v)=>{try{const A=JSON.parse(v.toString());A.from&&un.includes(A.from)&&Array.isArray(A.groups)&&!s&&(o[A.from]=A)}catch{}}),i.on("error",()=>{s||g()}),i.on("close",()=>{s||g()}),setTimeout(()=>r(new Error("lights flash timed out")),t+2e4)})}catch{}finally{ft=!1}}}const hn=Object.freeze(Object.defineProperty({__proto__:null,REACTION_LIGHT:$i,REACTION_MS:Di,choreography:Mi,flashLightsForPull:yc,flashReactionOnLamp:wc,loadMqtt:pn,reactionChoreography:_i},Symbol.toStringTag,{value:"Module"})),xc="wss://broker.hivemq.com:8884/mqtt",mt="picolight_lf26",le=10,ge=[{id:"board_a",name:"Fionns Lampe",owner:"Fionn",short:"FF"},{id:"board_b",name:"Lennarts Lampe",owner:"Lennart",short:"LS"}],kc="web_app",bt=1500,Sc=15e4,ea=[[255,200,80],[255,160,0],[255,120,0],[255,60,0],[255,0,0],[255,0,60],[255,0,140],[200,0,200],[140,0,255],[80,0,255],[0,0,255],[0,60,255],[0,140,255],[0,200,255],[0,255,220],[0,255,160],[0,255,80],[0,220,0],[80,255,0],[160,255,0],[220,255,0],[255,240,0],[255,180,40],[255,100,80],[255,80,160],[180,40,255],[40,100,255],[0,180,180],[20,255,120],[255,220,120]],ta=(e,t,a)=>e+(t-e)*a;function Tc(e){const a=Math.min(Math.max(Number(e)||0,0),.9999)*(ea.length-1),n=Math.floor(a),r=a-n,i=ea[n],o=ea[Math.min(n+1,ea.length-1)];return[0,1,2].map(s=>Math.round(ta(i[s],o[s],r)))}function aa(e){const[t,a,n]=Tc(e.pos),r=Math.min(Math.max(Number(e.w)||0,0),1);return[Math.round(ta(t,255,r)),Math.round(ta(a,244,r)),Math.round(ta(n,225,r))]}function Xe(e,t=0){return[{pos:e,w:t,size:le}]}const Qe=le;function _e(e){let t=(Array.isArray(e)?e:[]).map(n=>({pos:Math.min(1,Math.max(0,Number(n&&n.pos)||0)),w:Math.min(1,Math.max(0,Number(n&&n.w)||0)),size:Math.max(1,Math.round(Number(n&&n.size)||1))})).slice(0,Qe);if(!t.length)return Xe(0,1);let a=t.reduce((n,r)=>n+r.size,0);for(;a>le;){const n=t[t.length-1];n.size>1?(n.size--,a--):(t.pop(),a=t.reduce((r,i)=>r+i.size,0))}return a<le&&(t[t.length-1].size+=le-a),t}function na(e){const t=[];let a=0;for(const n of _e(e).slice(0,-1))a+=n.size,t.push(a);return t}function Ii(e,t){let a=0;const n=_e(e);for(let r=0;r<n.length;r++)if(a+=n[r].size,t<a)return r;return n.length-1}function fn(e,t){const a=_e(t),r=[0,...[...new Set(e.filter(i=>Number.isInteger(i)&&i>0&&i<le))].sort((i,o)=>i-o).slice(0,Qe-1),le];return r.slice(0,-1).map((i,o)=>{const s=a[Ii(a,i)];return{pos:s.pos,w:s.w,size:r[o+1]-i}})}function Ec(e,t){const a=na(e),n=a.indexOf(t);return n>=0?a.splice(n,1):a.push(t),fn(a,e)}function Lc(e,t){const a=_e(e),n=Math.min(Math.max(t,0),a.length-1);if(a[n].size<2||a.length>=Qe)return a;let r=0;for(let i=0;i<n;i++)r+=a[i].size;return fn([...na(a),r+Math.ceil(a[n].size/2)],a)}function Cc(e,t){const a=_e(e);if(a.length<2)return a;const n=Math.min(Math.max(t,0),a.length-1),r=na(a),i=n<a.length-1?r[n]:r[n-1];return fn(r.filter(o=>o!==i),a)}function Pi(e,t,a,n){const r=_e(e);return t==null?r.map(i=>({...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n})):r.map((i,o)=>o===t?{...i,pos:a===void 0?i.pos:a,w:n===void 0?i.w:n}:i)}const Ac=[{id:"warm",label:"Warm",emoji:"🕯",brightness:.55,groups:[{pos:0,w:.75,size:le}]},{id:"weiss",label:"Weiß",emoji:"💡",brightness:.8,groups:[{pos:0,w:1,size:le}]},{id:"wald",label:"Wald",emoji:"🌿",brightness:.7,groups:[{pos:17/29,w:0,size:le}]},{id:"gold",label:"Gold",emoji:"✨",brightness:.8,groups:[{pos:0,w:0,size:5},{pos:29/29,w:0,size:5}]},{id:"abend",label:"Abendrot",emoji:"🌇",brightness:.65,groups:[{pos:2/29,w:0,size:4},{pos:23/29,w:0,size:3},{pos:24/29,w:0,size:3}]},{id:"meer",label:"Meer",emoji:"🌊",brightness:.6,groups:[{pos:13/29,w:0,size:5},{pos:27/29,w:.2,size:5}]},{id:"nacht",label:"Nacht",emoji:"🌙",brightness:.18,groups:[{pos:10/29,w:0,size:le}]}];function zc(e){return{on:!0,fade_steps:40,brightness:e.brightness,groups:e.groups.map(t=>({...t}))}}function Bi(e){let t=Array.isArray(e.groups)&&e.groups.length?e.groups:null;if(!t&&Array.isArray(e.groupPositions)){const a=[0,...(e.boundaries||[]).slice().sort((n,r)=>n-r),le];t=a.slice(0,-1).map((n,r)=>({pos:e.groupPositions[r]??0,w:(e.groupWLevels||[])[r]??1,size:a[r+1]-n}))}return t||(t=Xe(0,1)),{on:e.on!==!1,brightness:typeof e.brightness=="number"?e.brightness:.6,fade_steps:typeof e.fadeSteps=="number"?e.fadeSteps:60,groups:t.map(a=>({pos:Number(a.pos)||0,w:Number(a.w)||0,size:Math.max(1,Number(a.size)||1)}))}}function Mc(e){const a=[{at:0,payload:{on:!0,brightness:1,fade_steps:6,groups:Xe(.5862068965517241,0)}},{at:450,payload:{brightness:.12,fade_steps:6}},{at:900,payload:{brightness:1,fade_steps:6}},{at:1350,payload:{brightness:.12,fade_steps:6}},{at:1800,payload:{brightness:1,fade_steps:6}}];return e?(a.push({at:2700,payload:{on:!0,groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps}}),e.on===!1&&a.push({at:4200,payload:{on:!1}})):a.push({at:2700,payload:{on:!1}}),a}let Z=null,qe=null,yt=0,ra=0,et="",wt=null,be=0;const X={};let Ne=[],ke=[],vt=[],Le="",G=null,te="idle";function ji(){return`${mt}/events`}function $c(){return`${mt}/status/+`}function mn(){return`${mt}/scenes`}function ia(){return`${mt}/alarms`}function bn(e,t=Date.now()){const a=X[e];return!a||a.online===!1?!1:a.online===!0?!0:!!(a.seenAt&&t-a.seenAt<Sc)}function yn(){return Object.values(X).filter(e=>e.groups).sort((e,t)=>(t.seenAt||0)-(e.seenAt||0))[0]||null}function Ie(e){te=e,ue()}function Dc(){if(Z&&Z.connected)return Ie("connected"),Promise.resolve(Z);if(qe)return qe;const e=++yt;return Ie("connecting"),qe=pn().then(()=>new Promise((t,a)=>{const n=window.mqtt.connect(xc,{clientId:"gacha_licht_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:1e4,reconnectPeriod:4e3,keepalive:30});Z=n;const r=()=>e===yt&&Z===n;let i=!1;const o=s=>{i||(i=!0,s?t(n):a(new Error(et||"licht: no connection")))};n.on("connect",()=>{r()&&(ra=Date.now(),et="",n.subscribe([ji(),$c(),mn(),ia()],()=>{}),Ee({nudge:!0}),Ie("connected"),o(!0))}),n.on("message",(s,d)=>{r()&&Nc(s,d)}),n.on("reconnect",()=>{r()&&te!=="connected"&&Ie("connecting")}),n.on("offline",()=>{r()&&Ie("error")}),n.on("error",s=>{r()&&(et=s&&s.message||"error",Ie("error"))}),n.on("close",()=>{r()&&Ie("error")}),setTimeout(()=>o(!!n.connected),15e3)})).catch(t=>{throw e===yt&&(et=t&&t.message||"load",Ie("error")),t}).finally(()=>{e===yt&&(qe=null)}),qe}function Wi(){if(yt++,qe=null,Z)try{Z.end(!0)}catch{}Z=null,te="idle",ra=0,wt&&(clearInterval(wt),wt=null),ue()}function _c(){wt||(wt=setInterval(()=>{Z&&Z.connected&&Ee({ping:!0}),ue()},6e4))}function Nc(e,t){let a;try{a=JSON.parse(t.toString())}catch{return}const n=String(e);if(n.startsWith(`${mt}/status/`)){const i=n.split("/").pop();X[i]={...X[i]||{},online:!!a.online},a.online&&(X[i].seenAt=Date.now()),ue();return}if(n===ia()){if(Array.isArray(a)){ke=a.filter(o=>o&&typeof o=="object");const i=Fe(ke);if(i&&Number.isInteger(i.lh)){const[o,s]=Yi(i.lh,i.lm||0);if((i.hour!==o||i.minute!==s)&&(i.hour=o,i.minute=s,Z&&Z.connected))try{Z.publish(ia(),JSON.stringify(ke),{retain:!0,qos:1}),Ee({set_alarms:ke})}catch{}}}ue();return}if(n===mn()){const i=Array.isArray(a.scenes)?a.scenes:[];vt=(Array.isArray(a.deleted)?a.deleted:[]).filter(s=>typeof s=="string").slice(-50);const o=new Set(vt);Ne=i.filter(s=>s&&typeof s=="object"&&s.name&&!o.has(s.id)),ue();return}if(!a.from||!ge.some(i=>i.id===a.from))return;const r=X[a.from]={...X[a.from]||{},seenAt:Date.now()};if(Date.now()<be){ue();return}a.on!==void 0&&(r.on=!!a.on),typeof a.brightness=="number"&&(r.brightness=a.brightness),typeof a.fade_steps=="number"&&(r.fade_steps=a.fade_steps),Array.isArray(a.groups)&&(r.groups=a.groups),ue()}function Ee(e){if(!Z||!Z.connected)return!1;try{return Z.publish(ji(),JSON.stringify({...e,from:kc})),!0}catch{return!1}}function Pe(e,t=Le||null){be=Date.now()+bt;const a=t?[t]:ge.map(r=>r.id);for(const r of a){const i=X[r]={...X[r]||{}};e.on!==void 0&&(i.on=!!e.on),typeof e.brightness=="number"&&(i.brightness=e.brightness),typeof e.fade_steps=="number"&&(i.fade_steps=e.fade_steps),Array.isArray(e.groups)&&(i.groups=e.groups)}const n=Ee(t?{...e,target:t}:e);return n||W("Keine Verbindung zu den Lampen"),ue(),n}function qi(){return ge.some(e=>X[e.id]&&X[e.id].on)}function Ic(e){Pe({on:!!e}),T(8)}function Pc(e){Pe({brightness:Math.min(1,Math.max(.02,e))})}function Ce(){const e=Le&&X[Le]||yn();return _e(e&&e.groups?e.groups:Xe(0,1))}function Fi(e){const t=Ce();G=e==null||e<0||e>=t.length||e===G?null:e,ue()}function xt(e){const t=_e(e);G!==null&&G>=t.length&&(G=null),Pe({on:!0,fade_steps:30,groups:t})}function wn(e,t){const a=Ce(),n=a.length===1&&G===null;xt(n?Xe(e,0):Pi(a,G,e,t)),T(6)}function Bc(e){xt(Pi(Ce(),G,void 0,Math.min(1,Math.max(0,e))))}function jc(e){xt(Ec(Ce(),e)),T(6)}function Wc(){const e=Ce(),t=G!==null?G:e.reduce((n,r,i)=>r.size>e[n].size?i:n,0),a=Lc(e,t);if(a.length===e.length){W(e.length>=Qe?"Mehr Gruppen gibt die Leiste nicht her":"Diese Gruppe ist schon ein einzelnes Licht");return}G=t,xt(a),T(6)}function qc(){const e=Ce();if(e.length<2)return;const t=G!==null?G:e.length-1;xt(Cc(e,t)),G!==null&&(G=Math.min(t,Ce().length-1)),T(6)}function Fc(e){Pe(zc(e)),T([8,20,8]),W(`${e.emoji} ${e.label}`)}function Uc(e){Pe(Bi(e)),T([8,20,8]),W(`✓ ${e.name}`)}function Oc(e){Pe({fade_steps:Math.round(Math.min(600,Math.max(10,e)))})}function Rc(e){Le=ge.some(t=>t.id===e)?e:"",ue()}function Hc(e){const t=X[e],a=!!(t&&t.on!==!1);Pe({on:!a},e),T(8)}function Gc(e=Math.random){const t=2+Math.floor(e()*3),a=new Set;for(;a.size<t-1;)a.add(1+Math.floor(e()*(le-1)));const n=[0,...[...a].sort((r,i)=>r-i),le];return n.slice(0,-1).map((r,i)=>({pos:Math.round(e()*29)/29,w:e()<.2?Math.round(e()*60)/100:0,size:n[i+1]-r}))}function Kc(){Pe({on:!0,fade_steps:40,groups:Gc()}),T([6,20,6])}function Yc(e,t,a=Date.now()){const n=(t&&Array.isArray(t.groups)&&t.groups.length?t.groups:Xe(0,1)).map(o=>({pos:Number(o.pos)||0,w:Number(o.w)||0,size:Math.max(1,Math.round(Number(o.size)||1))})),r=[];let i=0;for(const o of n.slice(0,-1))i+=o.size,i>0&&i<le&&r.push(i);return{id:a.toString(36)+"-"+Math.random().toString(36).slice(2,8),updated:a,name:e,groups:n,boundaries:r,groupPositions:n.map(o=>o.pos),groupWLevels:n.map(o=>o.w),brightness:t&&typeof t.brightness=="number"?t.brightness:.6,fadeSteps:t&&typeof t.fade_steps=="number"?t.fade_steps:60,on:!(t&&t.on===!1)}}function Vc(e){const t=String(e||"").trim().slice(0,32);if(!t)return W("Der Szene fehlt ein Name"),!1;if(!Z||!Z.connected)return W("Keine Verbindung zu den Lampen"),!1;const a=Yc(t,yn()),n=Ne.filter(r=>r.name===t&&r.id).map(r=>r.id);vt=[...vt,...n].slice(-50),Ne=[...Ne.filter(r=>r.name!==t),a];try{Z.publish(mn(),JSON.stringify({v:1,from:"gacha_app",scenes:Ne,deleted:vt}),{retain:!0,qos:1})}catch{return W("Szene konnte nicht gesichert werden"),!1}return T([8,20,8]),W(`✓ „${t}“ gesichert — auch auf der grossen Seite`),ue(),!0}let vn=[];function Ui(){return(Le?[Le]:ge.map(t=>t.id)).filter(t=>bn(t))}function Oi(e){return e.map(t=>(ge.find(a=>a.id===t)||{}).owner||t).join(" + ")}function Jc(e=Ui()){const t=Array.isArray(e)?e:[e];if(!t.length)return W("Gerade ist keine Lampe erreichbar"),!1;for(const a of vn)clearTimeout(a);vn=[],be=Date.now()+5e3;for(const a of t){const n=X[a]&&X[a].groups?{...X[a]}:null;for(const r of Mc(n))vn.push(setTimeout(()=>Ee({...r.payload,target:a}),r.at))}return T([12,40,12,40,12]),W(t.length>1?"👋 Beide Lampen winken":`👋 ${Oi(t)}s Lampe winkt`),!0}const Ri=14,Hi=110;function Zc(e,t){const a=(Array.isArray(e)?e:[]).map(s=>Math.max(0,Number(s)||0)).slice(0,Ri),n=[],r={on:!0,brightness:1,fade_steps:1},i={brightness:.06,fade_steps:1};t&&t.groups&&(r.groups=t.groups);for(const s of a)n.push({at:s,payload:r}),n.push({at:s+Hi,payload:i});const o=(a.length?a[a.length-1]:0)+Hi+700;return t&&t.groups?(n.push({at:o,payload:{on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}}),t.on===!1&&n.push({at:o+1200,payload:{on:!1}})):n.push({at:o,payload:{brightness:.6,fade_steps:30}}),n}let xn=[];function Xc(e,t=Ui()){const a=Array.isArray(t)?t:[t];if(!e||!e.length)return!1;if(!a.length)return W("Gerade ist keine Lampe erreichbar"),!1;for(const r of xn)clearTimeout(r);xn=[];let n=0;for(const r of a){const i=X[r]&&X[r].groups?{...X[r]}:null,o=Zc(e,i);n=Math.max(n,o[o.length-1].at);for(const s of o)xn.push(setTimeout(()=>Ee({...s.payload,target:r}),s.at))}return be=Date.now()+n+500,T(e.map(()=>18)),W(`🥁 ${e.length} ${e.length===1?"Schlag":"Schläge"} unterwegs — ${a.length>1?"beide Lampen":Oi(a)+"s Lampe"}`),!0}const Gi=1e3;function Qc(){return[{at:0,payload:{on:!0,brightness:1,fade_steps:4}},{at:180,payload:{brightness:.3,fade_steps:6}},{at:320,payload:{brightness:.85,fade_steps:4}},{at:520,payload:{brightness:.22,fade_steps:10}}]}let kt=null,kn=[],St=null;function eg(){if(kt)return!1;if(!Z||!Z.connected)return W("Keine Verbindung zu den Lampen"),!1;St={};for(const t of ge)X[t.id]&&X[t.id].groups&&(St[t.id]={...X[t.id]});const e=()=>{be=Date.now()+Gi+bt;for(const t of Qc())kn.push(setTimeout(()=>Ee(t.payload),t.at))};return e(),kt=setInterval(e,Gi),T([20,120,20]),S&&S.classList.add("is-pulsing"),!0}function Ki(){if(kt){clearInterval(kt),kt=null;for(const e of kn)clearTimeout(e);kn=[];for(const e of ge){const t=St&&St[e.id];t&&(Ee({target:e.id,on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}),t.on===!1&&setTimeout(()=>Ee({target:e.id,on:!1}),1500))}St=null,be=Date.now()+2500,S&&S.classList.remove("is-pulsing")}}const Sn={werktags:[0,1,2,3,4],taeglich:[0,1,2,3,4,5,6],wochenende:[5,6]};function Yi(e,t,a=new Date){const n=new Date(a);return n.setHours(e,t,0,0),[n.getUTCHours(),n.getUTCMinutes()]}function tg(e,{time:t="07:00",days:a="werktags",boards:n,enabled:r=!0,durationMin:i=20}={}){const[o,s]=String(t).split(":").map(f=>parseInt(f,10)),[d,c]=Yi(Number.isInteger(o)?o:7,Number.isInteger(s)?s:0),p=(Array.isArray(e)?e:[]).filter(f=>!(f&&f.gacha==="sunrise")),g={gacha:"sunrise",enabled:!!r,type:"sunrise",hour:d,minute:c,lh:Number.isInteger(o)?o:7,lm:Number.isInteger(s)?s:0,duration_min:i,brightness:.9,days:Sn[a]||Sn.werktags,boards:Array.isArray(n)&&n.length?n:ge.map(f=>f.id)};return[...p,g]}function Fe(e){return(Array.isArray(e)?e:[]).find(t=>t&&t.gacha==="sunrise")||null}function Tn(e){const t=JSON.stringify((e||[]).slice().sort());for(const[a,n]of Object.entries(Sn))if(JSON.stringify(n)===t)return a;return"werktags"}function ag(e){if(!Z||!Z.connected)return W("Keine Verbindung zu den Lampen"),!1;try{Z.publish(ia(),JSON.stringify(e),{retain:!0,qos:1}),Ee({set_alarms:e})}catch{return W("Wecker konnte nicht gestellt werden"),!1}return ke=e,!0}function En({enabled:e,time:t,days:a,retarget:n=!1}={}){const r=Fe(ke)||{},i=Le?[Le]:ge.map(d=>d.id),o=tg(ke,{time:t||(Number.isInteger(r.lh)?`${String(r.lh).padStart(2,"0")}:${String(r.lm||0).padStart(2,"0")}`:"07:00"),days:a||Tn(r.days),boards:n||!Array.isArray(r.boards)||!r.boards.length?i:r.boards,enabled:e===void 0?r.enabled!==!1:e});if(!ag(o))return!1;const s=Fe(o);return T([8,20,8]),W(s.enabled?`🌅 Sonnenaufgang um ${String(s.lh).padStart(2,"0")}:${String(s.lm).padStart(2,"0")} gestellt`:"🌅 Sonnenaufgang aus"),ue(),!0}let Vi=!1,Ji=null;function Ln(){ue(),ng(),Dc().catch(()=>{}),_c()}function ng(){if(Vi||!S)return;Vi=!0;const e=l("[data-ag-licht-power]");e&&e.addEventListener("click",()=>Ic(!qi()));const t=l("[data-ag-licht-brightness]");t&&t.addEventListener("input",()=>{be=Date.now()+bt,clearTimeout(Ji),Ji=setTimeout(()=>Pc(Number(t.value)/100),120)});const a=l("[data-ag-licht-palette]");if(a){const _=V=>{const J=a.getBoundingClientRect();if(!J.width)return;const we=(V.clientX??(V.touches&&V.touches[0]?V.touches[0].clientX:0))-J.left;wn(Math.min(1,Math.max(0,we/J.width)))};let N=!1,O=0;a.addEventListener("pointerdown",V=>{N=!0;try{a.setPointerCapture(V.pointerId)}catch{}_(V),O=Date.now()}),a.addEventListener("pointermove",V=>{!N||Date.now()-O<110||(O=Date.now(),_(V))});const ee=()=>{N=!1};a.addEventListener("pointerup",ee),a.addEventListener("pointercancel",ee),a.addEventListener("keydown",V=>{const J=Number(a.dataset.pos||0);V.key==="ArrowRight"&&(V.preventDefault(),wn(Math.min(1,J+1/29))),V.key==="ArrowLeft"&&(V.preventDefault(),wn(Math.max(0,J-1/29)))})}const n=l("[data-ag-licht-moods]");if(n){n.innerHTML="";for(const _ of Ac){const N=document.createElement("button");N.type="button",N.className="ag-licht-mood",N.dataset.mood=_.id;const[O,ee,V]=aa(_.groups[0]);N.style.setProperty("--ag-mood",`rgb(${O},${ee},${V})`),N.innerHTML=`<span class="ag-licht-mood-dot" aria-hidden="true"></span><span>${_.emoji} ${_.label}</span>`,N.addEventListener("click",()=>Fc(_)),n.appendChild(N)}}const r=l("[data-ag-licht-scene-list]");r&&r.addEventListener("click",_=>{const N=_.target.closest("[data-scene]");if(!N)return;const O=Ne.find(ee=>ee.id===N.dataset.scene);O&&Uc(O)});const i=l("[data-ag-licht-wink]");i&&i.addEventListener("click",()=>Jc());const o=l("[data-ag-licht-target]");o&&o.addEventListener("click",_=>{const N=_.target.closest("[data-target]");N&&(Rc(N.dataset.target),T(6))});const s=l("[data-ag-licht-lamps]");if(s){let _=null,N=!1,O=null;const ee=V=>{clearTimeout(_),_=null,N?(Ki(),N=!1):O&&te==="connected"&&Hc(O),O=null};s.addEventListener("pointerdown",V=>{const J=V.target.closest("[data-lamp]");if(!(!J||te!=="connected")){V.preventDefault(),O=J.dataset.lamp,N=!1;try{J.setPointerCapture(V.pointerId)}catch{}_=setTimeout(()=>{N=eg()},450)}}),s.addEventListener("pointerup",ee),s.addEventListener("pointercancel",()=>{clearTimeout(_),_=null,N&&(Ki(),N=!1),O=null})}const d=l("[data-ag-licht-fade]");let c=null;d&&d.addEventListener("input",()=>{be=Date.now()+bt;const _=l("[data-ag-licht-fade-val]");_&&(_.textContent=`${(Number(d.value)/60).toFixed(1).replace(".",",")} s`),clearTimeout(c),c=setTimeout(()=>Oc(Number(d.value)),160)});const p=l("[data-ag-licht-strip]");p&&p.addEventListener("click",_=>{if(te!=="connected")return;const N=_.target.closest("[data-cut]");if(N){jc(Number(N.dataset.cut));return}const O=_.target.closest("[data-led]");O&&Fi(Ii(Ce(),Number(O.dataset.led)))});const g=l("[data-ag-licht-groups]");g&&g.addEventListener("click",_=>{const N=_.target.closest("button");!N||te!=="connected"||(N.dataset.group!==void 0?(Fi(N.dataset.group==="all"?null:Number(N.dataset.group)),T(4)):N.dataset.split!==void 0?Wc():N.dataset.merge!==void 0&&qc())});const f=l("[data-ag-licht-white]");let m=null;f&&f.addEventListener("input",()=>{be=Date.now()+bt,clearTimeout(m),m=setTimeout(()=>Bc(Number(f.value)/100),120)});const b=l("[data-ag-licht-random]");b&&b.addEventListener("click",Kc);const y=l("[data-ag-licht-morse-open]"),v=l("[data-ag-morse]"),A=l("[data-ag-morse-pad]"),P=l("[data-ag-morse-dots]");let C=[],w=0,D=null;const L=()=>{C=[],w=0,P&&(P.innerHTML="")};y&&v&&y.addEventListener("click",()=>{v.hidden=!v.hidden,L(),v.hidden||v.scrollIntoView({behavior:"smooth",block:"nearest"})}),A&&A.addEventListener("pointerdown",_=>{_.preventDefault();const N=performance.now();if(C.length||(w=N),C.length<Ri&&C.push(Math.round(N-w)),T(14),A.classList.add("is-hit"),setTimeout(()=>A.classList.remove("is-hit"),120),P){const O=document.createElement("i");P.appendChild(O)}clearTimeout(D),D=setTimeout(()=>{const O=Xc(C);L(),O&&v&&(v.hidden=!0)},1600)});const k=l("[data-ag-sunrise-time]"),x=l("[data-ag-sunrise-days]"),$=l("[data-ag-sunrise-toggle]");$&&$.addEventListener("click",()=>{const _=Fe(ke),N=!(_&&_.enabled!==!1);En({enabled:N,retarget:N,time:k&&k.value,days:x&&x.value})}),k&&k.addEventListener("change",()=>{Fe(ke)&&En({time:k.value,days:x&&x.value})}),x&&x.addEventListener("change",()=>{Fe(ke)&&En({time:k&&k.value,days:x.value})});const I=l("[data-ag-licht-scene-save]"),j=l("[data-ag-licht-scene-name]");if(I&&j){const _=()=>{Vc(j.value)&&(j.value="")};I.addEventListener("click",_),j.addEventListener("keydown",N=>{N.key==="Enter"&&(N.preventDefault(),_())})}const F=l("[data-ag-licht-conn]");F&&F.addEventListener("click",()=>{te!=="connected"&&(Wi(),Ln())}),document.addEventListener("visibilitychange",()=>{const _=l("[data-ag-panel-licht]");if(document.visibilityState==="hidden"){(Z||qe)&&Wi();return}_&&!_.hidden&&Ln()})}function ue(){if(!S)return;const e=l("[data-ag-panel-licht]");if(!e||e.hidden)return;const t=l("[data-ag-licht-conn]");if(t){t.dataset.state=te;const L=ge.some(x=>bn(x.id)),k=te==="connected"&&!L&&ra&&Date.now()-ra>4e3;t.textContent=te==="connected"?k?"verbunden · keine Lampe antwortet":"verbunden":te==="connecting"?"verbinde…":te==="error"?et?`keine Verbindung (${et.slice(0,40)}) · tippen`:"keine Verbindung · tippen":"tippen zum Verbinden"}const a=l("[data-ag-licht-lamps]");if(a){const L=ge.map(k=>{const x=X[k.id],I=bn(k.id)?x&&x.on===!1?"standby":"on":"offline",j=I==="offline"?"offline":I==="standby"?"aus":"an";return`<button type="button" class="ag-licht-lamp" data-lamp="${k.id}" data-state="${I}" title="${H(k.name)} — tippen schaltet, halten pulsiert"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${H(k.short)}<span class="ag-licht-lamp-sub">${j}</span></button>`}).join("");a.dataset.html!==L&&(a.innerHTML=L,a.dataset.html=L)}const n=yn(),r=qi(),i=l("[data-ag-licht-strip]"),o=Ce();if(G!==null&&G>=o.length&&(G=null),i){const L=new Set(na(o)),k=r?n&&typeof n.brightness=="number"?.35+n.brightness*.65:.8:.18,x=[];let $=0;o.forEach((j,F)=>{const[_,N,O]=aa(j);for(let ee=0;ee<j.size;ee++,$++)$>0&&x.push(`<b data-cut="${$}" class="${L.has($)?"is-cut":""}" role="button" aria-label="${L.has($)?"Gruppen verbinden":"Hier teilen"}"></b>`),x.push(`<i data-led="${$}" class="${F===G?"is-selected":""}" style="--ag-led:rgb(${_},${N},${O});opacity:${k}"></i>`)});const I=x.join("");i.dataset.html!==I&&(i.innerHTML=I,i.dataset.html=I),i.classList.toggle("is-off",!r),i.classList.toggle("is-live",te==="connected")}const s=l("[data-ag-licht-groups]");if(s){const L=[`<button type="button" data-group="all" class="ag-licht-group ${G===null?"is-active":""}">Alle</button>`];o.forEach((x,$)=>{const[I,j,F]=aa(x);L.push(`<button type="button" data-group="${$}" class="ag-licht-group ${$===G?"is-active":""}" title="${x.size} ${x.size===1?"Licht":"Lichter"}"><span class="ag-licht-group-dot" style="background:rgb(${I},${j},${F})"></span>${$+1}</button>`)}),L.push(`<button type="button" data-split class="ag-licht-group ag-licht-group-op" title="Gruppe teilen" ${o.length>=Qe?"disabled":""}>+</button>`),L.push(`<button type="button" data-merge class="ag-licht-group ag-licht-group-op" title="Gruppen verbinden" ${o.length<2?"disabled":""}>−</button>`);const k=L.join("");s.dataset.html!==k&&(s.innerHTML=k,s.dataset.html=k);for(const x of s.querySelectorAll("button"))(!x.hasAttribute("disabled")||x.dataset.group!==void 0)&&(x.disabled=te!=="connected"||x.dataset.split!==void 0&&o.length>=Qe||x.dataset.merge!==void 0&&o.length<2)}const d=l("[data-ag-licht-power]");d&&(d.setAttribute("aria-pressed",r?"true":"false"),d.classList.toggle("is-on",r),d.textContent=r?"An":"Aus",d.disabled=te!=="connected");const c=l("[data-ag-licht-brightness]");c&&Date.now()>=be&&n&&typeof n.brightness=="number"&&(c.value=String(Math.round(n.brightness*100))),c&&(c.disabled=te!=="connected");const p=l("[data-ag-licht-palette]"),g=o[G!==null?G:0];if(p&&g){const L=Number(g.pos)||0;p.dataset.pos=String(L),p.style.setProperty("--ag-pick",`${(L*100).toFixed(1)}%`),p.setAttribute("aria-valuenow",String(Math.round(L*29))),p.setAttribute("aria-label",G!==null?`Farbe von Gruppe ${G+1}`:"Farbe")}const f=l("[data-ag-licht-white]");f&&g&&Date.now()>=be&&(f.value=String(Math.round((Number(g.w)||0)*100))),f&&(f.disabled=te!=="connected");const m=l("[data-ag-licht-white-label]");m&&(m.textContent=G!==null?`Weissanteil · Gruppe ${G+1}`:"Weissanteil");for(const L of e.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink], [data-ag-licht-morse-open], [data-ag-licht-random], [data-ag-licht-fade], [data-ag-licht-scene-name], [data-ag-licht-scene-save], [data-ag-sunrise-time], [data-ag-sunrise-days], [data-ag-sunrise-toggle]"))L.disabled=te!=="connected";const b=Fe(ke),y=l("[data-ag-sunrise-time]"),v=l("[data-ag-sunrise-days]"),A=l("[data-ag-sunrise-toggle]"),P=l("[data-ag-sunrise-note]");if(b&&y&&document.activeElement!==y&&(y.value=`${String(b.lh??7).padStart(2,"0")}:${String(b.lm??0).padStart(2,"0")}`),b&&v&&document.activeElement!==v&&(v.value=Tn(b.days)),A){const L=!!(b&&b.enabled!==!1);A.textContent=L?"an":"aus",A.classList.toggle("is-on",L),A.setAttribute("aria-pressed",L?"true":"false")}if(P){const L=(b&&Array.isArray(b.boards)?b.boards:ge.map(x=>x.id)).map(x=>(ge.find($=>$.id===x)||{}).owner||x).join(" + "),k={werktags:"Mo–Fr",taeglich:"täglich",wochenende:"Sa+So"}[Tn(b&&b.days)];P.textContent=b&&b.enabled!==!1?`Aktiv ${k} um ${String(b.lh??7).padStart(2,"0")}:${String(b.lm??0).padStart(2,"0")}: ${b.duration_min||20} Minuten von tiefem Rot zu Warmweiss · ${L}`:b?"Gestellt, aber aus. Tippen auf „aus“ schaltet ihn ein.":"Zwanzig Minuten von tiefem Rot zu Warmweiss, auf den Lampen, die oben gewählt sind."}for(const L of e.querySelectorAll("[data-ag-licht-target] [data-target]")){const k=(L.dataset.target||"")===Le;L.classList.toggle("is-active",k),L.setAttribute("aria-checked",k?"true":"false")}const C=l("[data-ag-licht-fade]");if(C&&Date.now()>=be&&n&&typeof n.fade_steps=="number"){C.value=String(Math.round(n.fade_steps));const L=l("[data-ag-licht-fade-val]");L&&(L.textContent=`${(n.fade_steps/60).toFixed(1).replace(".",",")} s`)}const w=l("[data-ag-licht-scenes]"),D=l("[data-ag-licht-scene-list]");w&&D&&(w.hidden=!Ne.length,D.innerHTML=Ne.slice(0,12).map(L=>{const x=Bi(L).groups.slice(0,5).map($=>{const[I,j,F]=aa($);return`<i style="background:rgb(${I},${j},${F})"></i>`}).join("");return`<button type="button" class="ag-licht-scene" data-scene="${H(L.id)}"${te!=="connected"?" disabled":""}><span class="ag-licht-scene-dots" aria-hidden="true">${x}</span><span>${H(L.name)}</span></button>`}).join(""))}function oa(e){if(u.activeTab==="today"&&e!=="today"&&u.revealed&&u.todaysPull&&!ae())try{md(u.todaysPull)}catch{}u.activeTab=e,S.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=S.querySelector(".ag-bottomnav-btn.is-active"),r=S.querySelector(".ag-nav-pill");if(r&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const p=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${p-a/2}px`}}for(const o of["today","history","lieblinge","berge","licht"]){const s=l(`[data-ag-panel-${o}]`);if(!s)continue;const d=e===o;d&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!d}e==="history"&&ye(),e==="licht"&&Ln(),e==="lieblinge"&&ca(),e==="berge"&&(tn(),pt({loading:!0}),tn(),gt().catch(()=>{}).then(()=>{pt(),tn()}));const i=l("[data-ag-fab]");i&&(i.hidden=e!=="berge")}function Tt(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function rg(){const e=u.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n=new Date().toISOString(),r={timestamp:n,token:U(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){Tt("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){Tt("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),Tt("Stups wird gesendet…","pending");const o=JSON.stringify(r);let s=!1;const d=()=>{if(!s){s=!0;try{al(n)}catch{}}Tt("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},c=()=>{Tt("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(p=>{p&&p.ok?d():c()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(d).catch(c)}catch{c()}})}function ig(e){const t=U(),a=u.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const i=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:i,message:i,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,d).catch(()=>{fetch(n,{...d,mode:"no-cors"}).catch(()=>{})})}function Zi(e){const t=u.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:U(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),i=o=>{const s=Ea();!s||s.week!==e.week||(ur({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),rt())};i("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o=>{o&&o.ok?i("sent"):i("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>i("sent")).catch(()=>i("failed"))}catch{i("failed")}})}function og(){const e=Ea();!e||e.week!==Mt()||e.remoteStatus!=="sent"&&Zi(e)}function Xi(e,t,a,n,r,i){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,i);else{const o=Array.isArray(i)?i:[i,i,i,i],[s,d,c,p]=o.map(g=>Math.min(g,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+p,a+r),e.quadraticCurveTo(t,a+r,t,a+r-p),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function Cn(e,t,a){const n=t.split(" "),r=[];let i="";for(const o of n){const s=i?`${i} ${o}`:o;e.measureText(s).width>a&&i?(r.push(i),i=o):i=s}return i&&r.push(i),r}function sg(e){var D,L;const r=document.createElement("canvas"),i=Math.min(window.devicePixelRatio||1,2);r.width=640*i,r.height=340*i,r.style.width="640px",r.style.height="340px";const o=r.getContext("2d");o.scale(i,i);const s=e.category.id==="jackpot",d=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",p=o.createLinearGradient(0,0,0,340);p.addColorStop(0,d),p.addColorStop(1,c),o.fillStyle=p,Xi(o,0,0,640,340,20),o.fill();const g=s?"#b9782e":"#2f7a4f";o.fillStyle=g,Xi(o,0,0,640,5,[20,20,0,0]),o.fill();const f=e.category.label,m=jr(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${m} ${f}`,40,62);const b=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const y=o.measureText(b).width;o.fillText(b,600-y,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const v=Cn(o,e.outcome.title,640-40*2);let A=108;for(const k of v)o.fillText(k,40,A),A+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const P=Cn(o,e.outcome.message,640-40*2);A+=4;for(const k of P){if(A>270)break;o.fillText(k,40,A),A+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const C=((L=(D=u.theme)==null?void 0:D.brand)==null?void 0:L.machineName)||"Affektions-Gacha";o.fillText(C,40,324);const w=document.createElement("a");w.download=`gacha-${e.category.id}-${e.day}.png`,w.href=r.toDataURL("image/png"),w.click()}async function lg(e){var A,P;const r=document.createElement("canvas");r.width=1170,r.height=2532;const i=r.getContext("2d"),o=new Image;o.crossOrigin="anonymous";try{await new Promise((C,w)=>{o.onload=C,o.onerror=w,o.src=e.photo.url})}catch{W("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/o.naturalWidth,2532/o.naturalHeight),d=o.naturalWidth*s,c=o.naturalHeight*s;i.drawImage(o,(1170-d)/2,(2532-c)/2,d,c);const p=i.createLinearGradient(0,2532*.62,0,2532);p.addColorStop(0,"rgba(8,20,14,0)"),p.addColorStop(1,"rgba(8,20,14,.82)"),i.fillStyle=p,i.fillRect(0,2532*.62,1170,2532*.38);const g=e.photo.caption||e.photo.alt||"";i.font="500 56px Boska, Georgia, serif",i.fillStyle="#fffdf2";const f=Cn(i,g,1170-96*2).slice(0,3);let m=2276-(f.length-1)*68;for(const C of f)i.fillText(C,96,m),m+=68;i.font="500 34px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,.62)",i.fillText(e.day,96,2356),i.fillStyle="rgba(255,255,255,.35)",i.font="28px Satoshi, Inter, system-ui, sans-serif",i.fillText(((P=(A=u.theme)==null?void 0:A.brand)==null?void 0:P.machineName)||"Affektions-Gacha",96,2406);let b;try{b=await new Promise((C,w)=>r.toBlob(D=>D?C(D):w(new Error("blob")),"image/jpeg",.92))}catch{W("Dieses Foto lässt sich nicht exportieren (CORS).");return}const y=new File([b],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[y]}))try{await navigator.share({files:[y],title:g});return}catch(C){if(C&&C.name==="AbortError")return}const v=document.createElement("a");v.download=y.name,v.href=URL.createObjectURL(b),v.click(),setTimeout(()=>URL.revokeObjectURL(v.href),4e3)}function Qi(e){S.style.opacity="1",S.style.background="#0a1410",S.style.minHeight="100vh",S.style.display="flex",S.style.alignItems="center",S.style.justifyContent="center",S.style.padding="24px",S.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${H(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function dg(){const e=l("[data-ag-button-text]");e&&(e.textContent=u.theme.brand.buttonShown)}function cg(){return typeof navigator<"u"&&typeof navigator.share=="function"&&typeof navigator.canShare=="function"}function gg(e,t){const a=(String(t||"image/jpeg").split("/")[1]||"jpg").replace("jpeg","jpg");return`gacha-${e.day}.${a}`}function ug(e,t){const a=e&&e.photo;return!a||a.type==="video"||!a.url||!cg()?!1:((async()=>{try{const n=await fetch(a.url,{mode:"cors"});if(!n.ok)throw new Error("photo fetch "+n.status);const r=await n.blob(),i=new File([r],gg(e,r.type),{type:r.type||"image/jpeg"});if(!navigator.canShare({files:[i]}))throw new Error("cannot share files");await navigator.share({files:[i],text:Nn(e),title:"Mein Gacha-Zug"})}catch(n){if(n&&n.name==="AbortError")return;try{W("Foto hing nicht dran — nur der Text geht raus")}catch{}window.location.href=t}})(),!0)}function An(){var f,m,b,y;u.todaysPull||(u.todaysPull=Dl());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=u.theme.loadingSteps||["Maschine rattert"];let n=0;S.classList.add("is-revealing"),e.disabled=!0,ae()||ei().catch(()=>{}),t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((u.theme.revealDelayMs||3200)/a.length))),i=u.theme.revealDelayMs||3200,o=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(v=>parseFloat(v.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let c;function p(v){const A=Math.min((v-d)/i,1),P=1+5*A*A;o.forEach((C,w)=>{C.style.setProperty("--ag-emoji-duration",`${(s[w]/P).toFixed(3)}s`)}),A<1&&(c=requestAnimationFrame(p))}c=requestAnimationFrame(p);const g=((m=(f=u.todaysPull)==null?void 0:f.category)==null?void 0:m.id)==="special"?"special":(y=(b=u.todaysPull)==null?void 0:b.category)==null?void 0:y.tone;window.setTimeout(()=>Ld(g),Math.max(0,i-900)),window.setTimeout(()=>{var w,D,L,k;window.clearInterval(r),cancelAnimationFrame(c),Cd(),Ad(g),o.forEach((x,$)=>{x.style.setProperty("--ag-emoji-duration",`${s[$].toFixed(2)}s`)});const v=R().some(x=>x.day===u.todaysPull.day&&x.token===u.todaysPull.token);if(u.todaysPull.collectToken&&!v&&Nt(u.todaysPull.collectToken),u.todaysPull.freikarte&&!v&&gr(u.todaysPull.token),!ae()){const x=cd(u.weather);x&&!u.todaysPull.weather&&(u.todaysPull.weather=x)}at(u.todaysPull),S.classList.remove("is-revealing"),S.classList.add("is-revealed"),S.classList.add("has-drawn"),e.disabled=!1,t.textContent=u.theme.brand.buttonShown,u.revealed=!0,ae()||Pg(u.todaysPull),u.todaysPull.flaschenpost&&rt(),Ya(),ln();const A=$e();Et(),Sg(A),window.setTimeout(()=>{try{l("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const P=(D=(w=u.todaysPull)==null?void 0:w.category)==null?void 0:D.id,C=(k=(L=u.todaysPull)==null?void 0:L.category)==null?void 0:k.tone;if(P==="special"){const x=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ce(130,x),setTimeout(()=>ce(90,x),700),Kt("special")}else if(C==="jackpot"){const x=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ce(120,x),setTimeout(()=>ce(80,x),650),Kt("jackpot")}else C==="rare"?(ce(70),Kt("rare")):Kt(C||"common");ae()||Promise.resolve().then(()=>hn).then(x=>x.flashLightsForPull(P==="special"?"special":C)).catch(()=>{}),ro[A]?T([30,20,30,20,60]):Hl(P==="special"?"special":C),u.activeTab==="history"&&ye(),Ti()},u.theme.revealDelayMs||3200)}function pg(){var yo,wo,vo,xo,ko,So,To,Eo,Lo,Co,Ao,zo,Mo,$o,Do,_o,No,Io,Po,Bo,jo,Wo,qo,Fo,Uo,Oo,Ro,Ho,Go,Ko,Yo,Vo,Jo,Zo,Xo,Qo,es,ts;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(Zr,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,Zr();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{T(12),An()}),Ed({onTilt:(h,E)=>{S.style.setProperty("--ag-foil-x",h.toFixed(1)+"%"),S.style.setProperty("--ag-foil-y",E.toFixed(1)+"%")}}),(yo=l("#ag-btn-rave"))==null||yo.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(wo=l("#ag-btn-rave"))==null||wo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(vo=l("#ag-btn-baerlauch"))==null||vo.addEventListener("click",nn),(xo=l("#ag-baerlauch-close"))==null||xo.addEventListener("click",Qd),(ko=l("#ag-baerlauch-next"))==null||ko.addEventListener("click",nn),(So=l("#ag-btn-baerlauch"))==null||So.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),nn())}),(To=l("#ag-btn-gesprach"))==null||To.addEventListener("click",Rr),(Eo=l("#ag-btn-glossary"))==null||Eo.addEventListener("click",xi),(Lo=l("#ag-btn-glossary"))==null||Lo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),xi())}),(Co=l("#ag-glossary-close"))==null||Co.addEventListener("click",oc),(Ao=document.getElementById("ag-glossary-refresh"))==null||Ao.addEventListener("click",async()=>{const h=document.getElementById("ag-glossary-refresh");h&&(h.disabled=!0,h.textContent="⏳"),T(6);const E=await wi();We(q.lang),h&&(h.textContent=E>0?`↻${E}`:"↻",setTimeout(()=>{h.textContent="↻",h.disabled=!1},3e3)),E>0&&W(`${E} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(h=>{h.addEventListener("click",()=>{const E=document.getElementById("ag-glossary-search");E&&(E.value=""),We(h.dataset.lang),T(4)})}),(zo=document.getElementById("ag-glossary-search"))==null||zo.addEventListener("input",()=>{We(q.lang)});const r=document.getElementById("ag-glossary-add"),i=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var B,K;if(!i)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const h=document.getElementById("ag-glossary-form-title");h&&(h.textContent="Neues Wort");const E=document.getElementById("ag-glossary-save-label");E&&(E.textContent="Eintragen");const z=document.getElementById("ag-glossary-audio-status");z&&(z.textContent=""),q.audioBlob=null;const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!0),i.hidden=!1,r.hidden=!0,(B=l("[data-ag-sheet-backdrop]"))==null||B.classList.add("is-open"),(K=document.getElementById("ag-glossary-word-input"))==null||K.focus(),T(8)}),(Mo=document.getElementById("ag-glossary-form-cancel"))==null||Mo.addEventListener("click",()=>{var h;if(i&&(i.hidden=!0),r&&(r.hidden=!1),(h=l("[data-ag-sheet-backdrop]"))==null||h.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",q.audioBlob=null,q.recorder&&q.recorder.state!=="inactive")try{q.recorder.stop()}catch{}q.recorder=null,T(6)}),($o=document.getElementById("ag-glossary-form-save"))==null||$o.addEventListener("click",async()=>{var K,Q,pe,oe,Ae;const h=(((K=document.getElementById("ag-glossary-word-input"))==null?void 0:K.value)||"").trim(),E=(((Q=document.getElementById("ag-glossary-meaning-input"))==null?void 0:Q.value)||"").trim(),z=(((pe=document.getElementById("ag-glossary-edit-id"))==null?void 0:pe.value)||"").trim();if(!h){(oe=document.getElementById("ag-glossary-word-input"))==null||oe.focus();return}const M=document.getElementById("ag-glossary-audio-status");let B=null;if(q.audioBlob){M&&(M.textContent="Wird hochgeladen…");const re=z||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;B=await nc(q.audioBlob,re)}if(T([20,20,40]),z){const re={word:h,meaning:E||null};B!==null&&(re.audioUrl=B),tc(z,re)}else yi({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:q.lang,word:h,meaning:E||null,audioUrl:B,token:U()});i&&(i.hidden=!0),r&&(r.hidden=!1),(Ae=l("[data-ag-sheet-backdrop]"))==null||Ae.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",q.audioBlob=null,q.recorder=null,We(q.lang),W("Wort gespeichert ✓")});const o=document.getElementById("ag-glossary-record");o&&o.addEventListener("click",async()=>{if(q.recorder&&q.recorder.state==="recording"){q.recorder.stop();return}try{const h=await navigator.mediaDevices.getUserMedia({audio:!0}),E=[];q.recorder=new MediaRecorder(h),q.recorder.ondataavailable=M=>{M.data.size>0&&E.push(M.data)},q.recorder.onstop=()=>{h.getTracks().forEach(K=>K.stop()),q.audioBlob=new Blob(E,{type:q.recorder.mimeType||"audio/webm"});const M=document.getElementById("ag-glossary-audio-status");M&&(M.textContent="✓ Aufnahme bereit");const B=document.getElementById("ag-glossary-play-preview");B&&(B.hidden=!1),o.textContent="🎙 Neu aufnehmen"},q.recorder.start(),o.textContent="⏹ Stop";const z=document.getElementById("ag-glossary-audio-status");z&&(z.textContent="● REC"),T(10)}catch{const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent="Mikrofon nicht verfügbar")}}),(Do=document.getElementById("ag-glossary-play-preview"))==null||Do.addEventListener("click",()=>{if(!q.audioBlob)return;const h=URL.createObjectURL(q.audioBlob),E=new Audio(h);E.onended=()=>URL.revokeObjectURL(h),E.play().catch(()=>{})}),(_o=l("#ag-letter-close"))==null||_o.addEventListener("click",Fa),(No=l("#ag-letter-overlay"))==null||No.addEventListener("click",h=>{h.target===h.currentTarget&&Fa()}),(Io=l("#ag-lightbox-close"))==null||Io.addEventListener("click",()=>{_n()}),(Po=l("#ag-lightbox"))==null||Po.addEventListener("click",h=>{h.target===h.currentTarget&&_n()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&(Fa(),_n())}),(Bo=l("#ag-gesprach-close"))==null||Bo.addEventListener("click",Gl),(jo=l("#ag-gesprach-next"))==null||jo.addEventListener("click",Hr),(Wo=l("#ag-gesprach-wa"))==null||Wo.addEventListener("click",Kl),(qo=l("#ag-btn-gesprach"))==null||qo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Rr())}),(Fo=l("#ag-btn-quest"))==null||Fo.addEventListener("click",Kr),(Uo=l("#ag-quest-close"))==null||Uo.addEventListener("click",Yl),(Oo=l("#ag-btn-quest"))==null||Oo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),Kr())}),(Ro=l("#ag-quest-file"))==null||Ro.addEventListener("change",h=>{const E=h.target.files&&h.target.files[0];E&&Vl(E)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!u.todaysPull)return;T(8);const h=Nn(u.todaysPull);try{await navigator.clipboard.writeText(h),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",h)}}),l("[data-ag-save-img]").addEventListener("click",()=>{u.todaysPull&&(T(8),sg(u.todaysPull))}),l("[data-ag-send]").addEventListener("click",h=>{u.todaysPull&&(T(8),ug(u.todaysPull,h.currentTarget.href)&&h.preventDefault())}),l("[data-ag-star]").addEventListener("click",()=>{T(8),Ig(u.todaysPull)}),(Ho=l("[data-ag-wallpaper]"))==null||Ho.addEventListener("click",()=>{!u.todaysPull||!u.todaysPull.photo||(T(8),lg(u.todaysPull))});const s=l("[data-ag-sync-status]");if(s){let h=null;s.addEventListener("click",()=>{s.classList.add("is-open"),clearTimeout(h),h=setTimeout(()=>s.classList.remove("is-open"),2500)})}const d=l("[data-ag-ferien-toggle]"),c=l("[data-ag-ferien-body]");d&&c&&d.addEventListener("click",()=>{const h=c.hidden;c.hidden=!h,d.setAttribute("aria-expanded",String(h)),T(6)}),(Go=l("[data-ag-ferien-add]"))==null||Go.addEventListener("click",()=>{var M,B;const h=(((M=l("[data-ag-ferien-from]"))==null?void 0:M.value)||"").trim(),E=(((B=l("[data-ag-ferien-to]"))==null?void 0:B.value)||h).trim();if(!h){W("Erst ein Datum wählen");return}if(!ul(h,E)){W("Höchstens 60 Tage am Stück");return}T([12,20,12]),Bn(),Et()});const p=l("[data-capsule]");if(p){let E=null,z=null,M=!1,B=0;const K=()=>!S.classList.contains("has-drawn")&&!S.classList.contains("is-revealing")&&!ae(),Q=()=>{clearTimeout(E),clearInterval(z),E=z=null,B=0,S.classList.remove("is-charging","is-charged")};p.addEventListener("pointerdown",oe=>{K()&&(oe.preventDefault(),M=!1,S.classList.add("is-charging"),z=setInterval(()=>{B++,T(6+B*2)},130),E=setTimeout(()=>{M=!0,S.classList.add("is-charged"),T([20,30,40])},650))});const pe=()=>{const oe=M&&K();Q(),M=!1,oe&&An()};p.addEventListener("pointerup",pe),p.addEventListener("keydown",oe=>{(oe.key==="Enter"||oe.key===" ")&&K()&&(oe.preventDefault(),T(12),An())}),p.addEventListener("pointercancel",()=>{Q(),M=!1}),p.addEventListener("pointerleave",()=>{Q(),M=!1})}(Ko=l("[data-ag-freikarte-redeem]"))==null||Ko.addEventListener("click",()=>{const h=u.todaysPull;if(!h)return;const E=h.category.tone;if(E!=="quiet"&&E!=="cursed"||!Ws(h.token))return;const z=$e(),M=_l(h.day,z);Fs(h.token,h.day,{categoryId:M.category.id,outcomeTitle:M.outcome.title}),u.todaysPull={...h,category:M.category,outcome:M.outcome,photo:M.photo,collectToken:M.collectToken,voucher:M.voucher,freikarte:M.freikarte,unlockTime:null,promptAnswer:null};const B=R(),K=B.findIndex(Q=>Q.day===h.day&&Q.token===h.token);K!==-1&&(B[K]={...B[K],categoryId:M.category.id,categoryLabel:M.category.label,tone:M.category.tone,title:M.outcome.title,message:M.outcome.message,link:M.outcome.link||null,unlockTime:null,promptAnswer:null,photo:M.photo?{url:M.photo.url,alt:M.photo.alt||"",caption:(M.photo.caption||"").trim(),type:M.photo.type==="video"?"video":"image"}:null,voucher:M.voucher||!1},ve(B)),u.todaysPull.collectToken&&Nt(u.todaysPull.collectToken),u.todaysPull.freikarte&&gr(u.todaysPull.token),se(),at(u.todaysPull),u.activeTab==="history"&&ye(),ce(50),W("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),T([20,20,40])});const g=l("[data-ag-streak-restore]");g&&g.addEventListener("click",()=>{if(!Lr()){Mn();return}const h=Na(),E=Rt(),z=Ot()>0&&E-Ot()<=0,M=E-1,B=z?`🎂 Geschenk: ${de(h)} retten? Nochmal tippen`:`${de(h)} retten${M>0?` (${M} übrig)`:", der letzte"}? Nochmal tippen`;if(!Je(g,B))return;g.disabled=!0;const K=vl();ye(),Et(),K&&(ce(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),T([30,20,30,20,60])),Mn(),g.disabled=!1});const f=l("[data-ag-sync-btn]");f&&f.addEventListener("click",async()=>{f.textContent="⏳",f.disabled=!0;const h=await gt();ye(),f.textContent=h<0?"✗":`✓${h}`,setTimeout(()=>{f.textContent="☁",f.disabled=!1},3e3)}),S.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(h=>{h.addEventListener("click",()=>{T(5),hg(h.dataset.agFilter)})}),S.querySelectorAll("[data-ag-tab]").forEach(h=>{h.addEventListener("click",()=>{T(6),oa(h.dataset.agTab)})});const m=S.querySelector(".ag-bottomnav");if(m){const h=m.querySelector(".ag-nav-pill"),E=[...m.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let z=null;m.addEventListener("pointerdown",B=>{const K=m.getBoundingClientRect(),Q=parseFloat(h==null?void 0:h.style.width)||54;z={id:B.pointerId,startX:B.clientX-K.left,pillStartCentre:(parseFloat(h==null?void 0:h.style.left)||0)+Q/2,pillWidth:Q,moved:!1,suppress:!1,captured:!1}}),m.addEventListener("pointermove",B=>{if(!z||B.pointerId!==z.id)return;const K=m.getBoundingClientRect(),Q=B.clientX-K.left-z.startX;if(!z.moved&&Math.abs(Q)<6||(z.captured||(m.setPointerCapture(B.pointerId),z.captured=!0),z.moved=!0,z.suppress=!0,!h))return;h.style.transition="none";const pe=m.getBoundingClientRect(),oe=z.pillStartCentre+Q,Ae=z.pillWidth/2;let re=oe-Ae;re<0?re=re*.25:re+z.pillWidth>pe.width&&(re=pe.width-z.pillWidth+(re+z.pillWidth-pe.width)*.25),h.style.left=`${re}px`});const M=B=>{if(!z||B.pointerId!==z.id)return;const K=z.moved,Q=z.suppress;if(z=null,h&&(h.style.transition=""),!K)return;const pe=m.getBoundingClientRect(),oe=B.clientX-pe.left;let Ae=E[0],re=1/0;if(E.forEach(Ue=>{const je=Ue.getBoundingClientRect(),ua=je.left-pe.left+je.width/2,zt=Math.abs(oe-ua);zt<re&&(re=zt,Ae=Ue)}),T(6),oa(Ae.dataset.agTab),Q){const Ue=je=>{je.stopImmediatePropagation(),je.preventDefault()};m.addEventListener("click",Ue,{capture:!0,once:!0})}};m.addEventListener("pointerup",M),m.addEventListener("pointercancel",B=>{!z||B.pointerId!==z.id||(z=null,h&&(h.style.transition=""),oa(u.activeTab))})}S.addEventListener("ag-synced",()=>{try{if(tt(),u.todaysPull&&u.revealed&&no(u.todaysPull),rt(),u._newPing){u._newPing=!1;const h=l("[data-ag-ping-banner]");h&&(h.hidden=!1);try{T([10,40,10])}catch{}}}catch{}}),(Yo=l("#ag-btn-skincare"))==null||Yo.addEventListener("click",ci),(Vo=l("#ag-btn-skincare"))==null||Vo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),ci())}),(Jo=l("#ag-skincare-close"))==null||Jo.addEventListener("click",_d),(Zo=l("#ag-btn-stimmung"))==null||Zo.addEventListener("click",_r),(Xo=l("#ag-btn-stimmung"))==null||Xo.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),_r())}),(Qo=l("#ag-stimmung-close"))==null||Qo.addEventListener("click",El),Ll();const b=l("[data-ag-berge-add]"),y=l("[data-ag-berge-form]"),v=l("[data-ag-berge-cancel]"),A=l("[data-ag-berge-save]");b&&b.addEventListener("click",()=>{var E,z;T(8);const h=l("[data-ag-berge-date]");h&&!h.value&&(h.value=Y(((E=u.theme)==null?void 0:E.timezone)||"Europe/Zurich")),y.hidden=!1,b.hidden=!0,(z=l("[data-ag-sheet-backdrop]"))==null||z.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),v&&v.addEventListener("click",()=>{var B;T(6),y.hidden=!0,b.hidden=!1,(B=l("[data-ag-sheet-backdrop]"))==null||B.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(K=>{const Q=l(K);Q&&(Q.value="")});const h=l("[data-ag-loc-search]");h&&(h.value="");const E=l("[data-ag-loc-dropdown]");E&&(E.hidden=!0,E.innerHTML="");const z=l("[data-ag-berge-form-title]");z&&(z.textContent="Neuer Gipfeleintrag");const M=l("[data-ag-berge-save] span:last-child");M&&(M.textContent="Eintragen")}),A&&A.addEventListener("click",()=>{var as,ns,rs,is,os,ss,ls,ds,cs,gs,us,ps,hs,fs;const h=(((as=l("[data-ag-berge-name]"))==null?void 0:as.value)||"").trim(),E=parseFloat(((ns=l("[data-ag-berge-dist]"))==null?void 0:ns.value)||""),z=parseInt(((rs=l("[data-ag-berge-gain]"))==null?void 0:rs.value)||"",10),M=((is=l("[data-ag-berge-date]"))==null?void 0:is.value)||Y(((os=u.theme)==null?void 0:os.timezone)||"Europe/Zurich"),B=(((ss=l("[data-ag-berge-url]"))==null?void 0:ss.value)||"").trim(),K=(((ls=l("[data-ag-berge-cover]"))==null?void 0:ls.value)||"").trim(),Q=(((ds=l("[data-ag-berge-notes]"))==null?void 0:ds.value)||"").trim(),pe=(((cs=l("[data-ag-berge-edit-id]"))==null?void 0:cs.value)||"").trim(),oe=(((gs=l("[data-ag-berge-lat]"))==null?void 0:gs.value)||"").trim()||null,Ae=(((us=l("[data-ag-berge-lng]"))==null?void 0:us.value)||"").trim()||null,re=(((ps=l("[data-ag-berge-loc-label]"))==null?void 0:ps.value)||"").trim()||null;if(!h){(hs=l("[data-ag-berge-name]"))==null||hs.focus();return}T([20,20,40]);const Ue={name:h,elevation:null,distance:isNaN(E)?null:E,elevGain:isNaN(z)?null:z,date:M,activityUrl:B||null,cover:K||null,notes:Q||null,lat:oe,lng:Ae,locLabel:re};pe?Od(pe,Ue):Fd({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...Ue,token:U()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(nu=>{const ms=l(nu);ms&&(ms.value="")});const je=l("[data-ag-loc-search]");je&&(je.value="");const ua=l("[data-ag-berge-form-title]");ua&&(ua.textContent="Neuer Gipfeleintrag");const zt=l("[data-ag-berge-save] span:last-child");zt&&(zt.textContent="Eintragen"),y.hidden=!0,b.hidden=!1,(fs=l("[data-ag-sheet-backdrop]"))==null||fs.classList.remove("is-open"),pt(),W("Gipfel gespeichert ✓")}),Gd();const P=l("[data-ag-ping-dismiss]");P&&P.addEventListener("click",()=>{const h=l("[data-ag-ping-banner]");h&&(h.hidden=!0)});const C=l("[data-ag-hug-send]");C&&C.addEventListener("click",()=>{T([20,30,20]);try{rg()}catch{}});const w=l("[data-ag-post-open]"),D=l("[data-ag-post-form]"),L=l("[data-ag-post-idle]");let k="30";if(w&&D&&L){w.addEventListener("click",()=>{T(8),L.hidden=!0,D.hidden=!1;const h=l("[data-ag-post-input]");h&&h.focus()}),(es=l("[data-ag-post-cancel]"))==null||es.addEventListener("click",()=>{D.hidden=!0,L.hidden=!1});for(const h of D.querySelectorAll("[data-ag-post-mode]"))h.addEventListener("click",()=>{k=h.dataset.agPostMode;for(const E of D.querySelectorAll("[data-ag-post-mode]")){const z=E===h;E.classList.toggle("is-active",z),E.setAttribute("aria-checked",z?"true":"false")}T(6)});(ts=l("[data-ag-post-seal]"))==null||ts.addEventListener("click",()=>{const h=l("[data-ag-post-input]"),E=(h&&h.value||"").trim();if(!E){h&&h.focus();return}const z=Y(u.theme.timezone);if(sl(E,k,z)){h&&(h.value=""),D.hidden=!0,L.hidden=!1,T([20,30,40]);try{ce(40,["#8fcf9e","#e0a75d","#fff"])}catch{}W(k==="30"?"🍾 Versiegelt. In dreissig Tagen kommt sie zurück.":"🍾 Versiegelt. Die Maschine gibt sie dir zurück, wann sie will."),rt(),se()}})}const x=l("[data-ag-wish-open]"),$=l("[data-ag-wish-cancel]"),I=l("[data-ag-wish-submit]");x&&x.addEventListener("click",()=>{T(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const h=l("[data-ag-wish-input]");h&&window.setTimeout(()=>h.focus(),60)}),$&&$.addEventListener("click",()=>{T(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),I&&I.addEventListener("click",()=>{const h=l("[data-ag-wish-input]"),E=((h==null?void 0:h.value)||"").trim();if(!E)return;T([20,20,40]);const z={week:Mt(),text:E,submittedAt:Date.now(),remoteStatus:"idle"};ur(z),rt();try{Zi(z)}catch{}});const j=l("[data-ag-notif-enable]"),F=l("[data-ag-notif-dismiss]");j&&j.addEventListener("click",()=>{T(10),cc()}),F&&F.addEventListener("click",()=>{T(6);try{window.localStorage.setItem(Oe,"dismissed")}catch{}const h=l("[data-ag-notif-card]");h&&(h.hidden=!0)});const _=l("[data-ag-sheet-backdrop]");_&&_.addEventListener("click",()=>{T(6);const h=l("[data-ag-berge-form]"),E=l("[data-ag-berge-add]");h&&!h.hidden&&(h.hidden=!0,E&&(E.hidden=!1));const z=document.getElementById("ag-glossary-form"),M=document.getElementById("ag-glossary-add");z&&!z.hidden&&(z.hidden=!0,M&&(M.hidden=!1)),_.classList.remove("is-open")});const N=l("[data-ag-fab]");N&&N.addEventListener("click",()=>{T(8);const h=l("[data-ag-berge-add]");h&&!h.hidden&&h.click()});const O=["today","history","lieblinge","berge"];let ee=0,V=0;const J=l(".ag-content")||S;J.addEventListener("touchstart",h=>{ee=h.touches[0].clientX,V=h.touches[0].clientY},{passive:!0}),J.addEventListener("touchend",h=>{const E=h.changedTouches[0].clientX-ee,z=Math.abs(h.changedTouches[0].clientY-V);if(Math.abs(E)>52&&z<44){const M=O.indexOf(u.activeTab),B=E<0?Math.min(M+1,O.length-1):Math.max(M-1,0);B!==M&&(T(6),oa(O[B]))}},{passive:!0});const we=l("[data-ag-ptr]");let At=0,ga=!1;document.addEventListener("touchstart",h=>{window.scrollY===0&&(At=h.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",h=>{if(!At)return;h.touches[0].clientY-At>64&&!ga&&we&&(ga=!0,we.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{ga&&we&&(we.classList.add("is-loading"),await gt(),u.activeTab==="berge"&&pt(),u.activeTab==="history"&&ye(),we.classList.remove("is-visible","is-loading"),W("Aktualisiert ✓")),At=0,ga=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const h=document.querySelector(".ag-widget");h==null||h.classList.toggle("ag-paused",document.hidden)})}let Be=null,Se="all";function hg(e){Se=e==="vouchers"||e==="open"?e:"all",Pn=In,ye()}function zn(e){return e?H(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function sa(){return U().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||u.theme.brand.displayNameDefault||"Lennart"}function fg(){return["Bärlauch","Rave 🪩","Glossar 📖"]}let eo=null;function to(e){try{const[t,a,n]=e.split("-").map(Number);eo||(eo=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}));const r=eo.formatToParts(new Date(Date.UTC(t,a-1,n,12))),i=o=>(r.find(s=>s.type===o)||{}).value||"";return`${i("weekday").replace(/\.$/,"")}, ${i("day")}. ${i("month")}`}catch{return e}}function mg(){const e=Y(u.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const bg=["🚴","🧄"],yg=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function ao(){const e=Y(u.theme.timezone),t=U();return`${u.theme.secret}|${t}|${e}|emoji`}function wg(){const e=ao(),t=3+Math.floor(Te(`${e}|count`)*3),a=yg.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const i=Math.floor(Te(`${e}|pick|${r}`)*a.length);n.push(a.splice(i,1)[0])}return[...bg,...n]}function vg(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=wg(),a=t.length,n=ao();t.forEach((r,i)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=r;const s=360/a*i,d=(Te(`${n}|angle|${i}`)-.5)*28,c=s+d,p=Te(`${n}|radius|${i}`)*21-10.5,g=16+Te(`${n}|dur|${i}`)*10,f=-Te(`${n}|delay|${i}`)*g,m=Te(`${n}|dir|${i}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${c}deg`),o.style.setProperty("--ag-emoji-radius",`${250+p}%`),o.style.setProperty("--ag-emoji-duration",`${g.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${f.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",m===1?"normal":"reverse"),fd(o),e.appendChild(o)})}function Et(){const e=l("[data-ag-streak]"),t=$e(),a=Me();if(t>(a.maxStreak||0)&&Bt({...a,maxStreak:t}),e){const n=Sr(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}Mn()}function Mn(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!Lr());const t=l("[data-ag-streak-gems]");if(t){const a=Rt();t.hidden=!(a>0),t.textContent=`💎 ×${a}`,t.title=`${a} Streak-Retter in der Bank — springt ein, wenn mal ein Tag fehlt`,t.setAttribute("aria-label",t.title)}}function xg(){const e=l("[data-ag-hugs]"),t=l("[data-ag-hugs-row]"),a=l("[data-ag-hugs-label]");if(!e||!t||!a)return;const n=yr();if(e.hidden=!n.length,!n.length)return;const r=n[0].slice(0,10);a.textContent=`${n.length} ${n.length===1?"Umarmung":"Umarmungen"} seit ${de(r)}`,t.innerHTML=n.slice(-120).map(i=>`<button type="button" class="ag-hug-heart" data-ts="${H(i)}" aria-label="Umarmung">♥</button>`).join(""),t.onclick=i=>{var c;const o=i.target.closest("[data-ts]");if(!o)return;const s=new Date(o.dataset.ts);let d=o.dataset.ts.slice(0,10);try{d=new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:((c=u.theme)==null?void 0:c.timezone)||"UTC"}).format(s)}catch{}o.classList.add("is-flare"),setTimeout(()=>o.classList.remove("is-flare"),700),W(`🫂 Umarmung am ${d}`)}}const $n={erfuellt:"erfüllt 🌿",irgendwann:"irgendwann 🕰","lieber-nicht":"lieber nicht ✗"};function kg(e,t){const a=$n[e.status];if(!a)return"";const n=Math.round((Date.parse(t+"T12:00:00Z")-Date.parse(e.timestamp))/864e5);return`Dein Wunsch ${n>=14?"von neulich":n>=6?"von letzter Woche":"von dieser Woche"}: ${a}`}function no(e){var i;const t=l("[data-ag-wish-reply]");if(!t)return;if(ae()){t.hidden=!0;return}const a=Y(((i=u.theme)==null?void 0:i.timezone)||"UTC"),n=Qs(a),r=n?kg(n,a):"";if(!r){t.hidden=!0;return}t.textContent=r,t.title=n.text?`„${n.text}"`:"",t.hidden=!1,el(n.statusAt,a)}const ro={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Sg(e){const t=l("[data-ag-milestone]");if(!t)return;const a=ro[e];if(!a){t.hidden=!0;return}const n=U();if(Ys(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Vs(n,e)}function Tg(e,t){const a=(Array.isArray(e)?e:[e]).map(d=>String(d||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const r=a.map((d,c)=>{const p=document.createElement("div");p.className="ag-prompt-field";const g=document.createElement("p");g.className="ag-prompt-question",g.textContent=(c===0?"💭 ":"🌱 ")+d;const f=document.createElement("textarea");return f.className="ag-prompt-textarea",f.placeholder="Schreib hier deine Antwort...",f.rows=a.length>1?3:4,f.setAttribute("aria-label",d),p.appendChild(g),p.appendChild(f),n.appendChild(p),{question:d,textarea:f}}),i=document.createElement("p");i.className="ag-pin-err",i.hidden=!0,i.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const d=r.filter(p=>!p.textarea.value.trim());if(d.length){i.hidden=!1;for(const p of d)p.textarea.classList.add("ag-pin-shake"),setTimeout(()=>p.textarea.classList.remove("ag-pin-shake"),450);d[0].textarea.focus();return}const c=r.length===1?r[0].textarea.value.trim():r.map(p=>p.question+`
`+p.textarea.value.trim()).join(`

`);t(c)}o.addEventListener("click",s);for(const d of r)d.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(i),n.appendChild(o),n}function Eg(e){return Array.isArray(e)?e.join(`
`):e}function Lg(e,t){try{const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Cg(e,t){try{const a=u.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:Eg(e.outcome.prompt),answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function Ag(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Kapsel.";const i=document.createElement("div");i.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(d.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",p=>{p.key==="Enter"&&c()}),i.appendChild(o),i.appendChild(s),n.appendChild(r),n.appendChild(i),n.appendChild(d),n}function zg(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const i=document.createElement("p");i.className="ag-pin-hint",i.style.marginTop="10px",i.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function p(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),la(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",p),s.addEventListener("keydown",g=>{g.key==="Enter"&&p()}),o.appendChild(s),o.appendChild(d),n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(c),n}function Mg(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${r}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function io(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function la(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=fe(t);if(!a){e.hidden=!0;return}const n=Mg(a);e.appendChild(n||io(a)),e.hidden=!1}function $g(e){const t=l("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||ae()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],r=Number(a),i=e.token,o=R().filter(g=>g.token===i&&typeof g.day=="string"&&g.day.slice(5)===n&&Number(g.day.slice(0,4))<r).sort((g,f)=>f.day.localeCompare(g.day));if(!o.length)return;const s=o[0],d=r-Number(s.day.slice(0,4)),c=l("[data-ag-memory-label]"),p=l("[data-ag-memory-text]");c&&(c.textContent=d===1?"Vor einem Jahr":`Vor ${d} Jahren`),p&&(p.textContent=s.title||""),t.hidden=!1}function oo(e){const t=ba(e),a=ya(e);if(Is(e),se(),u.wishInbox&&u.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:U(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(u.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function Dg(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Re()[a]||0,r=ya(a),i=ba(a);if(n>=i)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(i)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${i} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",s=>{ni(a,s.currentTarget),oo(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',tt()});else{const s=i-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(i-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function tt(){const e=l("[data-ag-tokenbank]");if(!e)return;const t=Re(),a=Object.keys(ma).map(d=>{const c=ba(d),p=Math.min(t[d]||0,c);return{emoji:d,goal:c,count:p,raw:t[d]||0,reward:ya(d),done:(t[d]||0)>=c}}),n=a.reduce((d,c)=>d+c.raw,0),r=a.filter(d=>d.done).length,i=a.filter(d=>d.raw>0),o=a.length-i.length;i.sort((d,c)=>c.done-d.done||c.count/c.goal-d.count/d.goal||d.goal-c.goal);const s=l("[data-ag-tokenbank-head]");if(s){const d=o?` · ${o} ${o===1?"Sorte":"Sorten"} noch unentdeckt`:"",c=Da(He().count),p=c.inCycle||He().count?` · Pfand ${c.inCycle}/${c.every}`:"";s.textContent=(n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":r?`${n} Tokens · ${r} ${r===1?"Belohnung":"Belohnungen"} einlösbar${d}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${d}`)+p}e.innerHTML="";for(const d of i){const c=document.createElement("div");if(c.className="ag-tokenrow"+(d.done?" is-done":"")+(d.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${d.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${H(d.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${d.count/d.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${d.count}<span class="ag-tokenrow-goal">/${d.goal}</span></span>
    `,d.done){const p=document.createElement("button");p.type="button",p.className="ag-tokenrow-redeem",p.textContent="Einlösen",p.addEventListener("click",()=>{ni(d.emoji,p),oo(d.emoji),T([12,30,12]),W(`${d.emoji} eingelöst — Fionn weiss Bescheid`),tt()}),c.appendChild(p)}e.appendChild(c)}}function so(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let i;if(t.type==="video"){const o=zs(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${o}`,d.alt=a,d.loading="lazy",d.decoding="async",d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),s.appendChild(d);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const p=()=>{s.removeEventListener("click",p),s.removeEventListener("keydown",g),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const f=document.createElement("iframe");f.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,f.allow="autoplay",f.setAttribute("allowfullscreen",""),f.setAttribute("frameborder","0"),f.setAttribute("aria-label",a),f.className="ag-drive-iframe",s.appendChild(f)},g=f=>{(f.key==="Enter"||f.key===" ")&&p()};s.addEventListener("click",p),s.addEventListener("keydown",g),i=s}else i=document.createElement("video"),i.src=fe(t.url),i.controls=!0,i.muted=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("preload","metadata"),i.setAttribute("aria-label",a),i.className="ag-media-content"}else i=document.createElement("img"),i.alt=a,i.loading="eager",i.decoding="auto",i.className="ag-media-content",i.addEventListener("load",()=>{const o=i.naturalWidth&&i.naturalHeight?i.naturalWidth/i.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),i.addEventListener("error",()=>{me("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=Dn(),d=s(o),c=d.find(p=>p.alt===t.alt&&p.type!=="video")||d.find(p=>p.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,i.src=fe(c.url),u.photos=d;else{const p=i.closest("[data-ag-photo-wrap]");p&&(p.hidden=!0)}}).catch(()=>{const o=i.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),i.src=fe(t.url);n.appendChild(i),e.appendChild(n)}function Dn(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function Lt(e,t,a,n){var d,c;const r=l("#ag-lightbox"),i=l("#ag-lightbox-img"),o=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!r||!i)){(d=r.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),Be&&(i.removeEventListener("error",Be),Be=null),i.onerror=null,s&&(s.hidden=!0);{i.hidden=!1;const p=fe(e);if(!p)return;i.src=p,i.alt=t||"",Be=()=>{const g=n||t;me("config/photos.json",{photos:[]}).then(f=>{const{normalizePhotos:m}=Dn(),b=m(f),y=b.find(v=>v.alt===g)||null;y&&y.url&&(i.src=fe(y.url),u.photos=b)}).catch(()=>{})},i.addEventListener("error",Be,{once:!0})}o.textContent=t||"",o.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function _n(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(Be&&(t.removeEventListener("error",Be),Be=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Nn(e){return[`${jr(e.category.tone)} ${sa()}s ${u.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var i;const[a,n]=e.unlockTime.split(":").map(Number),r=ot(e.unlockTimezone||((i=u.theme)==null?void 0:i.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function at(e){var L;S.dataset.tone=e.category.tone,zl(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label;const t=R().find(k=>k.day===e.day&&k.token===e.token),a=e.weather||t&&t.weather||null,n=Qr(a);l("[data-ag-date]").textContent=n?`${to(e.day)} · ${n}`:to(e.day),l("[data-ag-title]").textContent=e.outcome.title;const r=l("[data-ag-message]");if(!r)return;r.innerHTML=zn(e.outcome.message),r.hidden=!1,pd(r,e.outcome.secret===!0),wd(r,k=>{const x=u.todaysPull||e;yi({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:"kapsel",word:k,meaning:`Aus der Kapsel „${x.outcome.title}“, ${de(x.day)}`,audioUrl:null,token:U()});try{T([12,30,12])}catch{}W(`„${k}“ ins Glossar gelegt 📖`)});const i=l("[data-ag-result]"),o=l("[data-ag-pfand]");if(o){const k=!!(t&&t.pfand),x=e.category.id==="niete"&&!ae()&&!k;o.hidden=!x;const $=l("[data-ag-pfand-handle]"),I=l("[data-ag-pfand-count]");if(I){const j=Da(He().count);I.textContent=`${j.inCycle}/${j.every}`}x&&$&&vd($,l("[data-ag-result]"),()=>{if(!il(e.day,e.token))return;const j=nl();if(xd($),o.hidden=!0,j.earned){try{Nt(nr)}catch{}try{ce(70)}catch{}W(`♻︎ Zehn leere Kapseln zurück — ein ${nr} dafür`),tt()}else W(`♻︎ Pfand ${j.inCycle}/${ar} — die Maschine nickt`);se()})}const s=l("[data-ag-freikarte-wrap]");if(s){const k=e.category.tone==="quiet"||e.category.tone==="cursed",x=!!(t&&t.pfand);s.hidden=!(k&&!x&&js(e.token)>0&&!ae())}const d=l("[data-ag-quest-wrap]");if(d){const k=e.category.tone==="quest"&&!ae();if(d.hidden=!k,k){const x=l("[data-ag-quest-hint]"),$=l("[data-ag-quest-done]"),I=l("[data-ag-quest-photo]"),j=l("[data-ag-beweis-file]"),F=l("[data-ag-beweis-thumb]"),_=R().find(ee=>ee.day===e.day&&ee.token===e.token),N=!!(_&&_.bestanden),O=_&&_.beweisUrl;F&&(F.hidden=!O,O&&(F.src=fe(O),F.onclick=()=>Lt(O,"Beweisfoto"))),x&&(x.textContent=N?`🏆 Bestanden am ${de(_.bestandenAt||_.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),$&&($.hidden=N,$.onclick=()=>{if(Je($,"Wirklich geschafft? Nochmal tippen")&&lr(e.day,e.token)){se();try{ce(60)}catch{}at(e),u.activeTab==="history"&&ye()}}),I&&j&&(I.hidden=!1,I.disabled=!1,I.textContent=O?"📸 Foto ersetzen":"📸 Beweis anhängen",I.onclick=()=>{j.value="",j.click()},j.onchange=async()=>{const ee=j.files&&j.files[0],V=R().find(J=>J.day===e.day&&J.token===e.token);if(!(!ee||!V)){I.disabled=!0,I.textContent="Lädt hoch…";try{const J=await Rl(e.day,e.token,ee);_s(e.day,e.token,J),lr(e.day,e.token),se();try{ce(60)}catch{}try{W("Beweis angenommen 🏆")}catch{}}catch(J){const we=J&&J.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":J&&J.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":J&&J.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{W(we)}catch{}}at(e),u.activeTab==="history"&&ye()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(r.hidden=!0,!(i?i.querySelector("[data-ag-prompt-gate]"):null)){const x=Tg(e.outcome.prompt,$=>{if(e.promptAnswer=$,x.remove(),!ae()){Cg(e,$);const I=R(),j=I.findIndex(F=>F.day===e.day&&F.token===e.token);j!==-1&&(I[j]={...I[j],promptAnswer:$},ve(I),se())}at(e),u.activeTab==="history"&&ye()});x.setAttribute("data-ag-prompt-gate",""),r.parentNode.insertBefore(x,r)}l("[data-ag-result]").hidden=!1;return}const c=i?i.querySelector("[data-ag-pin-gate]"):null;c&&c.remove();const p=l("[data-ag-link-wrap]");if(e.outcome.pin){const k=!!e.outcome.pinMessage;if(k||(r.hidden=!za(e.outcome.pin)),!za(e.outcome.pin)){let x=null;k&&(x=document.createElement("div"),x.className="ag-message",x.hidden=!0,x.innerHTML=zn(e.outcome.pinMessage),r.parentNode.insertBefore(x,r.nextSibling));const $=Ag(e.outcome.pin,()=>{$.remove(),k?x.hidden=!1:r.hidden=!1,e.outcome.link&&p&&la(p,e.outcome.link)},e.outcome.pinHint);$.setAttribute("data-ag-pin-gate","");const I=k?x:r;I.parentNode.insertBefore($,I)}}const g=l("[data-ag-photo-wrap]"),f=l("[data-ag-photo-media]"),m=l("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[k,x]=e.unlockTime.split(":").map(Number),$=ot(e.unlockTimezone||((L=u.theme)==null?void 0:L.timezone)||"UTC"),I=e.outcome.linkPin;if(I)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[F,_]=e.outcome.linkPinFrom.split(":").map(Number);return $.h>F||$.h===F&&$.m>=_})()){const F=zg(I,p,e);p.innerHTML="",p.appendChild(F),p.hidden=!1}else{const F=document.createElement("span");F.className="ag-outcome-link-locked",F.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,p.innerHTML="",p.appendChild(F),p.hidden=!1}else if($.h>k||$.h===k&&$.m>=x)la(p,e.outcome.link);else{const F=document.createElement("span");F.className="ag-outcome-link-locked",F.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,p.innerHTML="",p.appendChild(F),p.hidden=!1}}else e.outcome.pin&&!za(e.outcome.pin)||la(p,e.outcome.link||null);if(Dg(l("[data-ag-token-wrap]"),e),$g(e),e.photo){so(f,e.photo);const k=(e.photo.caption||"").trim();k?(m.textContent=k,m.hidden=!1):(m.textContent="",m.hidden=!0),g.hidden=!1}else f.innerHTML="",m.textContent="",m.hidden=!0,g.hidden=!0;const b=Nn(e),y=encodeURIComponent("Mein Gacha-Zug"),v=encodeURIComponent(b),A=l("[data-ag-send]");u.theme.messageTarget.startsWith("mailto:")?A.href=`${u.theme.messageTarget}?subject=${y}&body=${v}`:A.href=u.theme.messageTarget.replace("{text}",v);const P=l("[data-ag-save-img]");P&&(P.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const C=l("[data-ag-wallpaper]");C&&(C.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const w=l("[data-ag-actions-extra]");w&&(w.hidden=!(P&&!P.hidden)&&!(C&&!C.hidden));const D=l("[data-ag-reactions]");if(D){D.hidden=!1;const k=R().find($=>$.day===e.day&&$.token===e.token),x=k&&k.reaction;for(const $ of D.querySelectorAll("[data-ag-react]"))$.hidden=!!ae(),$.classList.toggle("is-chosen",$.dataset.agReact===x),$.onclick=()=>{const I=$.dataset.agReact;if(Ns(e.day,e.token,I)){Lg(e,I),ae()||Promise.resolve().then(()=>hn).then(j=>j.flashReactionOnLamp(I)).catch(()=>{}),se();try{T([12,30,18])}catch{}at(e)}}}no(),l("[data-ag-result]").hidden=!1,lo()}function _g(e){return e?ze().some(t=>t.day===e.day&&t.token===e.token):!1}function da(e){return ze().some(t=>t.day===e.day&&t.token===e.token)}function lo(){const e=l("[data-ag-star]");if(!e)return;const t=_g(u.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Ng(e,t){const a=ze(),n=a.findIndex(i=>i.day===e.day&&i.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),_t(a),se();const r=da(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",u.activeTab==="lieblinge"&&ca()}function Ig(e){if(!e)return;const t=ze(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),_t(t),se(),lo(),u.activeTab==="lieblinge"&&ca()}function Pg(e){if(!e)return;if(e.flaschenpost)try{dl(e.flaschenpost,e.day)}catch{}const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,weather:e.weather||null,flaschenpost:e.flaschenpost||null,revealedAt:Date.now()},a=R(),n=new Set,r=[t,...a].filter(i=>{if(!i||typeof i.day!="string"||typeof i.token!="string")return!1;const o=`${i.day}|${i.token}`;return n.has(o)?!1:(n.add(o),!0)});r.sort((i,o)=>i.day<o.day?1:i.day>o.day?-1:0),ve(r),La(0),se()}function Bg(e,t){var i;if(!e||e.used||!Je(t,"Einlösen? Nochmal tippen"))return;const a=Y(((i=u.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=a;const n=R(),r=n.find(o=>o.day===e.day&&o.token===e.token);r&&(r.used=!0,r.usedAt=a,ve(n)),se();try{ce(60)}catch{}try{W("Eingelöst 💛")}catch{}try{ig(e)}catch{}t&&(t.disabled=!0),ye(),u.activeTab==="lieblinge"&&ca()}function co(e){var a;if(!e.link)return null;if(e.unlockTime){const n=ot(e.unlockTimezone||((a=u.theme)==null?void 0:a.timezone)||"UTC"),[r,i]=e.unlockTime.split(":").map(Number);if(!(n.h>r||n.h===r&&n.m>=i)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=fe(e.link);return t?io(t):null}function go(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const r=Qr(e.weather);n.textContent=r?`${de(e.day)} · ${r}`:de(e.day);const i=document.createElement("span");i.className="ag-history-badge",i.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");if(o.type="button",o.className="ag-history-star"+(da(e)?" is-starred":""),o.textContent=da(e)?"★":"☆",o.title=da(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",f=>{f.stopPropagation(),Ng(e,o)}),a.appendChild(n),a.appendChild(i),e.reaction){const f=document.createElement("span");f.className="ag-history-reaction",f.textContent=e.reaction,f.title="Deine Reaktion",a.appendChild(f)}a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const d=document.createElement("div");d.className="ag-history-message",d.innerHTML=zn(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const f=document.createElement("p");f.className="ag-history-answer-label",f.textContent="💭 Antwort";const m=document.createElement("blockquote");m.className="ag-history-answer",m.textContent=e.promptAnswer,c.appendChild(f),c.appendChild(m)}t.appendChild(a);const p=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,g=e.photo&&(e.photo.type==="video"||p.test(e.photo.url||""));if(e.photo&&!g){const f=document.createElement("div");f.className="ag-history-body";const m=document.createElement("div");m.className="ag-history-thumb";const b=document.createElement("img");b.src=fe(e.photo.url),b.alt=e.photo.alt||"Foto-Drop",b.loading="lazy",b.decoding="async",b.addEventListener("error",function(){me("config/photos.json",{photos:[]}).then(v=>{const{normalizePhotos:A}=Dn(),P=A(v),C=P.find(w=>w.alt===e.photo.alt&&w.type!=="video")||P.find(w=>w.type!=="video")||null;if(C&&C.url)e.photo.url=C.url,b.src=fe(C.url),u.photos=P;else{m.classList.add("is-broken"),b.remove();const w=document.createElement("span");w.className="ag-history-thumb-broken",w.textContent="📷",m.appendChild(w)}}).catch(()=>{m.classList.add("is-broken"),b.remove();const v=document.createElement("span");v.className="ag-history-thumb-broken",v.textContent="📷",m.appendChild(v)})},{once:!0}),m.appendChild(b),m.style.cursor="pointer",m.title="Vollansicht",m.addEventListener("click",()=>Lt(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(s),y.appendChild(d),c&&y.appendChild(c),e.link){const v=co(e);v&&y.appendChild(v)}f.appendChild(m),f.appendChild(y),t.appendChild(f)}else if(t.appendChild(s),t.appendChild(d),c&&t.appendChild(c),e.link){const f=co(e);f&&t.appendChild(f)}if(e.bestanden){const f=document.createElement("p");if(f.className="ag-history-bestanden",f.textContent=`🏆 Bestanden${e.bestandenAt?` am ${de(e.bestandenAt)}`:""}`,t.appendChild(f),e.beweisUrl){const m=document.createElement("img");m.className="ag-history-beweis",m.src=fe(e.beweisUrl),m.alt="Beweisfoto",m.loading="lazy",m.decoding="async",m.addEventListener("click",b=>{b.stopPropagation(),Lt(e.beweisUrl,"Beweisfoto")}),m.addEventListener("error",()=>m.remove(),{once:!0}),t.appendChild(m)}}if(st(e)){const f=document.createElement("div");if(f.className="ag-voucher-actions",e.used){const m=document.createElement("span");m.className="ag-voucher-used",m.textContent=`✓ Benutzt am ${e.usedAt?de(e.usedAt):"–"}`,f.appendChild(m)}else{const m=document.createElement("button");m.type="button",m.className="ag-voucher-use",m.textContent="🎟️ Benutzen",m.addEventListener("click",b=>{b.stopPropagation(),Bg(e,m)}),f.appendChild(m)}t.appendChild(f)}return t}function jg(e){const t=l("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===Se),n.setAttribute("aria-selected",r===Se?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let nt=null;function uo(e){var P;const t=l("[data-ag-history-calendar]");if(!t)return;if(Se!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((P=u.theme)==null?void 0:P.timezone)||"UTC",n=Y(a);nt||(nt=n.slice(0,7));const r=new Map(e.map(C=>[C.day,C])),[i,o]=nt.split("-").map(Number),s=new Date(Date.UTC(i,o-1,1)),d=new Date(Date.UTC(i,o,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,p=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),g=e.filter(C=>C.day.startsWith(nt)).length;t.innerHTML="";const f=document.createElement("div");f.className="ag-kalender-head";const m=document.createElement("button");m.type="button",m.className="ag-kalender-nav",m.textContent="‹",m.setAttribute("aria-label","Vorheriger Monat");const b=document.createElement("span");b.className="ag-kalender-label",b.textContent=g?`${p} · ${g} Kapseln`:p;const y=document.createElement("button");y.type="button",y.className="ag-kalender-nav",y.textContent="›",y.setAttribute("aria-label","Nächster Monat");const v=C=>{const w=new Date(Date.UTC(i,o-1+C,1));nt=`${w.getUTCFullYear()}-${String(w.getUTCMonth()+1).padStart(2,"0")}`,uo(e)};m.addEventListener("click",()=>v(-1)),y.addEventListener("click",()=>v(1)),f.appendChild(m),f.appendChild(b),f.appendChild(y),t.appendChild(f);const A=document.createElement("div");A.className="ag-kalender-grid";for(const C of["M","D","M","D","F","S","S"]){const w=document.createElement("span");w.className="ag-kalender-wd",w.textContent=C,A.appendChild(w)}for(let C=0;C<c;C++)A.appendChild(document.createElement("span"));for(let C=1;C<=d;C++){const w=`${nt}-${String(C).padStart(2,"0")}`,D=r.get(w),L=document.createElement("span");L.className="ag-kalender-day",L.textContent=C,D&&(L.classList.add("has-pull"),L.dataset.tone=D.tone||"soft",L.title=`${D.title||"Kapsel"} (${D.categoryLabel||""})`),w===n&&L.classList.add("is-today"),w>n&&L.classList.add("is-future"),A.appendChild(L)}t.appendChild(A)}function Wg(e){var i;const t=l("[data-ag-history-tally]");if(!t)return;if(Se!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(i=e[e.length-1])==null?void 0:i.day;let r="";if(n)try{r=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{r=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${r?`, seit ${r}`:""}.`}const In=15;let Pn=In;function qg(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const r=n&&n.photo;!r||!r.url||r.type==="video"||t.has(r.url)||(t.add(r.url),a.push({url:r.url,caption:(r.caption||"").trim(),alt:r.alt||"",day:n.day}))}return a}function Fg(e){const t=l("[data-ag-album-card]"),a=l("[data-ag-album]"),n=l("[data-ag-album-note]");if(!t||!a)return;const r=qg(e);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${r.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const i of r){const o=document.createElement("button");o.type="button",o.className="ag-album-tile",o.title=i.caption||i.alt||i.day,o.setAttribute("aria-label",i.caption||i.alt||`Foto vom ${i.day}`);const s=document.createElement("img");s.src=i.url,s.alt=i.alt||i.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>o.remove(),{once:!0}),o.appendChild(s),o.addEventListener("click",()=>{T(8),Lt(i.url,i.caption,!1,i.alt)}),a.appendChild(o)}}function Ug(e){const t=l("[data-ag-trophy-card]"),a=l("[data-ag-trophies]"),n=l("[data-ag-trophy-note]");if(!t||!a)return;const r=e.filter(i=>i.bestanden).sort((i,o)=>(o.bestandenAt||o.day)<(i.bestandenAt||i.day)?-1:1);if(t.hidden=r.length===0,!r.length){a.innerHTML="";return}n&&(n.textContent=r.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${r.length} bestandene Quests.`),a.innerHTML="";for(const i of r){const o=document.createElement("div");o.className="ag-trophy-tile",o.title=i.title||i.categoryLabel||"Quest";const s=document.createElement("span");s.className="ag-trophy-emoji";const d=(i.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(s.textContent=d?d[d.length-1]:"🏆",i.beweisUrl){o.classList.add("has-beweis");const g=document.createElement("img");g.className="ag-trophy-shot",g.src=fe(i.beweisUrl),g.alt="Beweisfoto",g.loading="lazy",g.decoding="async",g.addEventListener("error",()=>{g.remove(),o.classList.remove("has-beweis")},{once:!0}),o.appendChild(g),o.addEventListener("click",()=>Lt(i.beweisUrl,i.title||"Beweisfoto"))}const c=document.createElement("span");c.className="ag-trophy-title",c.textContent=i.title||i.categoryLabel||"Quest";const p=document.createElement("span");p.className="ag-trophy-date",p.textContent=de(i.bestandenAt||i.day),o.appendChild(s),o.appendChild(c),o.appendChild(p),a.appendChild(o)}}function Bn(){const e=l("[data-ag-ferien-list]"),t=l("[data-ag-ferien-count]");if(!e)return;const a=Ut();e.innerHTML="",t&&(t.hidden=!a.length,t.textContent=a.length?`· ${a.length}`:"");for(const n of a){const r=document.createElement("li");r.className="ag-ferien-item";const i=document.createElement("span");i.textContent=n.from===n.to?de(n.from):`${de(n.from)} – ${de(n.to)}`;const o=document.createElement("button");o.type="button",o.className="ag-ferien-remove",o.setAttribute("aria-label","Ferien entfernen"),o.textContent="✕",o.addEventListener("click",()=>{pl(n.from,n.to),Bn(),Et()}),r.appendChild(i),r.appendChild(o),e.appendChild(r)}}function ye(){var p;tt();const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=U(),r=Y(((p=u.theme)==null?void 0:p.timezone)||"UTC"),i=R().filter(g=>g.token===n&&g.day<=r).slice().sort((g,f)=>g.day<f.day?1:g.day>f.day?-1:0);uo(i),Wg(i),Bn(),xg(),Ug(i),Fg(i);const o=i.filter(g=>st(g)&&!g.used).length;jg(o);const s=i.filter(g=>Se==="vouchers"?st(g):Se==="open"?st(g)&&!g.used:!0);Se==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":Se==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const d=l("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=Se==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":Se==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",d&&(d.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Pn);for(const g of c)e.appendChild(go(g));if(d){const g=s.length-c.length;d.hidden=g<=0,g>0&&(d.textContent=`Mehr anzeigen (${g} weitere)`,d.onclick=()=>{Pn+=In,ye()})}}function ca(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=ze();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild(go(r))}function Og(){const e=l("[data-ag-odds]");e.innerHTML="";const t=$e(),a=Tr(t),n=a.reduce((r,i)=>r+i.weight,0);for(const r of a){const i=document.createElement("li");i.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(i)}if(t>=5){const r=Sr(t),i=document.createElement("li");i.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,i.style.fontWeight="800",e.appendChild(i)}}function Rg(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Hg(){const e=l("[data-ag-post-count]");if(!e)return;const t=Ge().filter(a=>!a.deliveredDay).length;e.hidden=!t,e.textContent=t===1?"🍾 Eine Flaschenpost ist unterwegs.":`🍾 ${t} Flaschenposten sind unterwegs.`}function rt(){Hg();const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Ea();if(n&&n.week===Mt()){e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`;const i=mr(),o=i&&Math.abs(Date.parse(i.timestamp)-Number(n.submittedAt||0))<12e4&&$n[i.status];l("[data-ag-wish-done-meta]").textContent=o?`Fionn sagt: ${$n[i.status]}`:Rg(n.remoteStatus)}else e.hidden=!1,t.hidden=!0,a.hidden=!0}function Gg(){var m;const e=sa(),t=u.theme.brand.fromName,a=l("[data-ag-main-title]");a&&(a.textContent=u.theme.brand.titleTemplate.replace("{name}",e));const n=l("[data-ag-kicker]");n&&(n.textContent=`${u.theme.brand.kicker} · ${u.photos.length} Erinnerungen`);const r=l("[data-ag-intro]");r&&(r.textContent=u.theme.brand.intro);const i=l("[data-ag-button-text]");i&&(i.textContent=u.theme.brand.buttonIdle);const o=l("[data-ag-rules-title]");o&&(o.textContent=u.theme.brand.rulesTitle);const s=l("[data-ag-rules-text]");s&&(s.textContent=u.theme.brand.rulesText);const d=l("[data-ag-send]");d&&(d.textContent=`An ${t} schicken`);const c=l("[data-ag-today-pill]");c&&(c.textContent=mg());const p=l("[data-ag-draw-hint]");if(p){const b=R().filter(v=>v.token===U()).length,y=ad(b);p.textContent=y?nd:"Eine Kapsel · ein Tag · ein Souvenir.",p.classList.toggle("is-secret",y)}const g=l("[data-ag-chips]");g&&(g.innerHTML="");const f=Array.isArray(u.theme.stickers)&&u.theme.stickers.length?u.theme.stickers:fg();for(const b of g?f:[]){const y=document.createElement("li");if(y.textContent=b,(b.toLowerCase().includes("bärlauch")||b.toLowerCase().includes("barlauch"))&&(y.id="ag-btn-baerlauch",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Bärlauch öffnen"),y.classList.add("ag-chip-clickable"),Vd()&&(y.classList.add("ag-chip-saison"),y.title="Bärlauch-Saison — Level 5 schaffen, 🌿 kassieren")),(b.toLowerCase().includes("gespräch")||b.toLowerCase().includes("gesprach"))&&(y.id="ag-btn-gesprach",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Gespräch öffnen"),y.classList.add("ag-chip-clickable")),b.toLowerCase().includes("rave")&&(y.id="ag-btn-rave",y.tabIndex=0,y.setAttribute("role","link"),y.setAttribute("aria-label","Rave Board öffnen"),y.classList.add("ag-chip-clickable")),b.toLowerCase()==="quest"&&(y.id="ag-btn-quest",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Quest öffnen"),y.classList.add("ag-chip-clickable"),(m=u.quest)!=null&&m.enabled&&Gr()&&(lt().solved||y.classList.add("ag-chip-quest-active"))),b.toLowerCase().includes("glossar")&&(y.id="ag-btn-glossary",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Glossar öffnen"),y.classList.add("ag-chip-clickable")),(b.toLowerCase().includes("skincare")||b.toLowerCase().includes("pflege"))&&u.skincare&&(y.id="ag-btn-skincare",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Skincare-Routine öffnen"),y.classList.add("ag-chip-clickable")),b.toLowerCase().includes("stimmung")){y.id="ag-btn-stimmung",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Farbe des Tages wählen"),y.classList.add("ag-chip-clickable");const v=Ke();v&&(y.classList.add("ag-chip-stimmung-set"),y.style.setProperty("--chip-dot-color",v))}g.appendChild(y)}vg(),Et()}const po="affektions-gacha:install-dismissed:v1";let Ct=null;function Kg(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function Yg(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function ho(){try{return window.localStorage.getItem(po)==="1"}catch{return!1}}function fo(){try{window.localStorage.setItem(po,"1")}catch{}const e=l("[data-ag-install-nudge]");e&&(e.hidden=!0)}function mo(e){if(ho())return;const t=l("[data-ag-install-nudge]");if(!t)return;const a=l("[data-ag-install-copy]"),n=l("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Ct&&(Ct.prompt(),await Ct.userChoice,Ct=null,fo())}),t.hidden=!1}function Vg(){var e;Kg()||ho()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Ct=t,mo(!0)}),Yg()&&mo(!1),(e=l("[data-ag-install-dismiss]"))==null||e.addEventListener("click",fo))}const Jg={photos:[]};function Zg(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=qa();return a.map(r=>{const i=new URL(r.url,n).toString(),o=r.type==="video"||t.test(i);return{...r,type:o?"video":"image",url:i}}).filter(r=>r.url)}async function Xg(){Nl(),jl(),Ul();try{const[e,t,a,n,r,i,o,s,d]=await Promise.all([me("config/theme.json"),me("config/outcomes.json"),me("config/photos.json",Jg),me("config/special-days.json",{days:[]}),me("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),me("config/backup.json",{enabled:!1,endpointUrl:""}),me("config/quest.json",{enabled:!1}),me("config/push.json",{enabled:!1}),me("config/skincare.json",null)]);u.theme=e,u.outcomes=t,Ds(t),u.photos=Zg(a),u.specialDays=n,Ss(e.dayStartHour),u.wishInbox=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},u.backup=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},u.quest=o&&typeof o=="object"?o:{enabled:!1},u.push=s&&typeof s=="object"?s:{enabled:!1},u.skincare=d&&typeof d=="object"?d:null,Il(e),Pl(ae()||Y(e.timezone)),Tl(),Gg(),Og(),rt(),pg(),Vg(),requestAnimationFrame(()=>{const g=S.querySelector(".ag-nav-pill"),f=S.querySelector(".ag-bottomnav-btn.is-active");if(g&&f){const m=f.closest(".ag-bottomnav"),b=m?m.getBoundingClientRect():null,y=f.getBoundingClientRect();b&&y.width&&(g.style.transition="none",g.style.left=`${y.left-b.left}px`,g.style.width=`${y.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{og()}catch{}try{const g=S.querySelector(".ag-stage");g&&"IntersectionObserver"in window&&new IntersectionObserver(([m])=>{g.classList.toggle("ag-stage-idle",!m.isIntersecting)},{threshold:.05}).observe(g)}catch{}dn(),u.renderedDay=Y(e.timezone);const c=()=>{ae()||Y(e.timezone)!==u.renderedDay&&window.location.reload()};window.setInterval(c,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(c(),ln(),Ya(),bo(e.timezone),gt().catch(()=>{}))}),S.classList.add("is-ready"),S.style.transition="opacity .18s ease",S.style.opacity="1";const p=Y(e.timezone);R().some(g=>g.token===U()&&g.day===p)&&!ae()&&dg(),Ya(),bo(e.timezone),gt().catch(()=>{}),ei().then(g=>ud(g)).catch(()=>{}),window.setTimeout(()=>{Ti().catch(()=>{})},1800)}catch(e){Qi(e)}}function bo(e){try{const{h:t}=ot(e||"UTC"),a=t>=22||t<5;S.classList.toggle("is-evening",a);const n=S.querySelector("[data-ag-kicker]");if(n){const r=n.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");n.textContent=a?r+" · Gute Nacht 🌙":r}}catch{}}const it=document.currentScript,Qg=(it==null?void 0:it.dataset.mount)||"#affektions-gacha",eu=(it==null?void 0:it.dataset.configBase)||"";function tu(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const au=document.querySelector(Qg)||tu();bs(au),Cl(eu,null),Xg().catch(e=>Qi(e))})();

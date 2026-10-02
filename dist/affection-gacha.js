(function(){"use strict";const p={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,push:null,skincare:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let S=null;function Us(e){S=e}function d(e){return S.querySelector(e)}const Vn="affektions-gacha:history:v1",Jn="affektions-gacha:favourites:v1",Zn="affektions-gacha:tokens:v1",Xn="affektions-gacha:tokens-sent:v1",Qn="affektions-gacha:streak-cache:v1",er="affektions-gacha:streak-synced:v1",tr="affektions-gacha:streak-restore:v1",ar="affektions-gacha:wish:v1",nr="affektions-gacha:milestones:v1",Ge="affektions-gacha:notif:v2",rr="affektions-gacha:baerlauch-scores:v1",Rs="affektions-gacha:baerlauch-history:v1",ir="affektions-gacha:gesprach-idx:v1",or="affektions-gacha:last-ping:v1",Hs="affektions-gacha:sound:v1",sr="affektions-gacha:gipfelbuch:v1",lr="affektions-gacha:quest:v1",za="affektions-gacha:quest-points:v1",Gs=5,Ks=20,dr=[100,75,50,25],cr="affektions-gacha:glossary:v1",Aa="affektions-gacha:stimmung:v1",gr="affektions-gacha:freikarte:v1",Ma="affektions-gacha:freikarte-reroll:v1",$a={"🌿":{goal:4,reward:"Essen: Fionn kocht, oder ein Café deiner Wahl"},"🏔":{goal:5,reward:"Ein Abenteuer: Bergtour mit Hütte, oder ein Wochenende weg"},"🎬":{goal:4,reward:"Ein Abend aus: Film, Konzert oder DJ — du wählst"},"🛁":{goal:3,reward:"Ein Abend zuhause: Essen kommt, Wellness dazu, oder ein ganzer fauler Tag"},"💚":{goal:4,reward:"Eine Überraschung von Fionn, mit handgeschriebenem Brief"},"✈️":{goal:6,reward:"Ein Städtetrip — ein ganzes Wochenende weg"}},Ys={"☕":"🌿","🔥":"🏔","🎧":"🎬","🍕":"🛁","☁️":"🛁","⭐":"💚"};function ur(e){return Ys[e]||e}function Da(e){const t=$a[e];return t&&t.goal||Gs}function _a(e){const t=$a[e];return t&&t.reward||""}const pr=10,fr="🛁";let hr=0;function Vs(e){hr=Number.isInteger(e)&&e>=0&&e<24?e:0}function V(e,t){const a=new Date().getTime()-hr*36e5,n=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(a)),i=r=>n.find(o=>o.type===r).value;return`${i("year")}-${i("month")}-${i("day")}`}function ut(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value);return{h:a("hour"),m:a("minute")}}let mr=null;function ce(e){const[t,a,n]=e.split("-").map(Number),i=new Date(Date.UTC(t,a-1,n));try{return mr||(mr=new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"})),mr.format(i)}catch{return e}}function Js(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Na(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function Zs(e){const t=Number(e);return Number.isFinite(t)?t<100?t.toLocaleString("de-CH",{minimumFractionDigits:1,maximumFractionDigits:1}):Math.round(t).toLocaleString("de-CH"):"—"}function me(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Xs(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Qs(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function xe(e){return Qs(Xs(e))()}function Ia(e,t){return t?Math.floor(xe(e)*t):0}function el(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function tl(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function q(){return"lennart"}function Q(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function al(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Nt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function It(e){var s,l;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=V(t),[n,i,r]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,i-1,r)).getTime()/864e5);return Math.floor(o/(((l=e.quest)==null?void 0:l.periodDays)||2))}function Pt(e){var i;const t=(i=e.quest)==null?void 0:i.challenges;if(!Array.isArray(t)||!t.length)return null;const a=It(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function br(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function nl(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const Pa=new Set;function rl(e){Pa.clear();const t=Array.isArray(e&&e.categories)?e.categories:[];for(const a of t)for(const n of Array.isArray(a.outcomes)?a.outcomes:[])n&&n.voucher===!0&&n.title&&Pa.add(n.title)}function pt(e){return e?e.voucher===!0?!0:e.voucher===!1?!1:!!e.title&&Pa.has(e.title):!1}function G(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function he(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const i=n[q()];return i===void 0?t:i}return localStorage.setItem(e,JSON.stringify({[q()]:n})),n}catch{return t}}function ie(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const i=n&&typeof n=="object"&&!Array.isArray(n)?n:{};i[q()]=t,localStorage.setItem(e,JSON.stringify(i))}catch{}}let yr=null,Ba=null;function R(){try{if(typeof window>"u"||!window.localStorage)return p.syncedHistory||[];const e=window.localStorage.getItem(Vn);if(!e)return p.syncedHistory||[];if(e===yr&&Ba)return Ba;const t=JSON.parse(e);if(!Array.isArray(t))return p.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?(yr=e,Ba=a,a):p.syncedHistory||[]}catch{return p.syncedHistory||[]}}function ke(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Vn,JSON.stringify(e))}catch{}}function wr(e,t){var i;const a=R(),n=a.find(r=>r.day===e&&r.token===t);return n?(n.bestanden||(n.bestanden=!0,n.bestandenAt=V(((i=p.theme)==null?void 0:i.timezone)||"UTC"),ke(a)),n):null}function il(e,t,a){const n=R(),i=n.find(r=>r.day===e&&r.token===t);return i?(i.beweisUrl=a,ke(n),i):null}function ol(e,t,a){const n=R(),i=n.find(r=>r.day===e&&r.token===t);return i?(i.reaction=a,ke(n),i):null}function Me(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(Jn);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=p.theme)!=null&&e.timezone?V(p.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(i=>i&&typeof i.day=="string"&&typeof i.token=="string"&&i.day<=n)}catch{return[]}}function Bt(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Jn,JSON.stringify(e))}catch{}}function vr(e){const t={};if(!e||typeof e!="object")return t;for(const[a,n]of Object.entries(e)){const i=typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):0;if(i<=0)continue;const r=ur(a);t[r]=(t[r]||0)+i}return t}function Ke(){const e=he(Zn,{});return vr(e&&typeof e=="object"&&!Array.isArray(e)?e:{})}function ja(e){ie(Zn,e)}function jt(e){e=ur(e);const t=Ke();return t[e]=(t[e]||0)+1,ja(t),t[e]}function sl(e){const t=Ke();t[e]=0,ja(t)}function Ft(e){return vr(e)}function ll(){const e=he(Xn,null);return e&&typeof e=="object"&&!Array.isArray(e)?Ft(e):null}function Ot(e){ie(Xn,Ft(e))}function dl(e){const t=Ft(e),a=Ft(Ke());let n=ll();n===null&&(n=a,Ot(a));const i=new Set([...Object.keys(t),...Object.keys(a),...Object.keys(n)]),r={};for(const o of i){const s=(t[o]||0)+((a[o]||0)-(n[o]||0));s>0&&(r[o]=s)}return ja(r),Ot(t),[...i].some(o=>(r[o]||0)!==(t[o]||0))}function Fa(){try{const e=localStorage.getItem(gr),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function xr(e){try{localStorage.setItem(gr,JSON.stringify(e))}catch{}}function cl(e){return Fa()[e]||0}function kr(e){const t=Fa();return t[e]=(t[e]||0)+1,xr(t),t[e]}function gl(e){const t=Fa();return t[e]>0?(t[e]-=1,xr(t),!0):!1}function ul(e,t){try{const a=localStorage.getItem(Ma),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function pl(e,t,a){try{const n=localStorage.getItem(Ma),i=n?JSON.parse(n):{},r=i&&typeof i=="object"?i:{};r[`${e}|${t}`]=a,localStorage.setItem(Ma,JSON.stringify(r))}catch{}}function Oa(){if(typeof window>"u"||!window.localStorage)return null;const e=he(ar,null);return e&&typeof e=="object"?e:null}function Sr(e){typeof window>"u"||!window.localStorage||ie(ar,e)}function $e(){const e=he(tr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Wt(e){ie(tr,e)}function fl(){const e=he(Qn,0);return typeof e=="number"?e:parseInt(e,10)||0}function Wa(e){ie(Qn,e)}function hl(){const e=he(er,0);return typeof e=="number"?e:parseInt(e,10)||0}function ml(e){ie(er,e)}function qt(){try{const e=window.localStorage.getItem(sr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ut(e){try{window.localStorage.setItem(sr,JSON.stringify(e))}catch{}}function qa(){try{const e=localStorage.getItem(rr),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Er(){try{const e=localStorage.getItem(Rs),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function ft(e){try{const t=he(lr,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function Ua(e){ie(lr,e)}function Rt(){const e=he(za,0);return typeof e=="number"?e:parseInt(e,10)||0}function bl(e){try{const t=Rt()+e;return ie(za,t),t}catch{return e}}function yl(e){ie(za,e)}function Lr(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(nr);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function wl(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(nr,JSON.stringify(e))}catch{}}function vl(e,t){return Lr().includes(`${e}|${t}`)}function xl(e,t){const a=`${e}|${t}`,n=Lr();n.includes(a)||wl([...n,a])}function Ra(e){return!1}const Tr="affektions-gacha:baerlauch-weekly:v1";function kl(e){const t=he(Tr,null);return!!(t&&typeof t=="object"&&t.week===e)}function Sl(e){ie(Tr,{week:e,at:Date.now()})}const Ha="affektions-gacha:wish-replies:v1";function Ht(){const e=he(Ha,null);return e&&typeof e=="object"&&!Array.isArray(e)?e:{wishes:[],shown:null}}function El(e){const t=Ht(),a=(Array.isArray(e)?e:[]).filter(n=>n&&n.timestamp).map(n=>({timestamp:String(n.timestamp),text:String(n.text||""),status:String(n.status||""),statusAt:String(n.statusAt||"")}));ie(Ha,{wishes:a,shown:t.shown||null})}function Cr(){const{wishes:e}=Ht(),t=e.filter(a=>a.status&&a.statusAt);return t.length?(t.sort((a,n)=>a.statusAt<n.statusAt?1:a.statusAt>n.statusAt?-1:0),t[0]):null}function Ll(e){const t=Cr();if(!t)return null;const{shown:a}=Ht();return a&&a.statusAt===t.statusAt&&a.day!==e?null:t}function Tl(e,t){const a=Ht();a.shown&&a.shown.statusAt===e&&a.shown.day===t||ie(Ha,{...a,shown:{statusAt:e,day:t}})}const zr="affektions-gacha:hug-log:v1";function Ar(){const e=he(zr,[]);return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}const Cl=9e4;function Mr(e){const t=new Set(Ar());for(const i of Array.isArray(e)?e:[])typeof i=="string"&&i&&t.add(i);const a=[...t].sort(),n=[];for(const i of a){const r=n[n.length-1];r&&Math.abs(Date.parse(i)-Date.parse(r))<Cl||n.push(i)}return ie(zr,n.slice(-500)),n}function zl(e){return Mr([e])}const Ga="affektions-gacha:pfand:v1";function Ye(){const e=he(Ga,{count:0});return e&&typeof e=="object"&&Number.isFinite(e.count)?e:{count:0}}function Ka(e,t=pr){const a=Math.max(0,Math.floor(Number(e)||0));return{inCycle:a%t,every:t,earned:a>0&&a%t===0}}function Al(){const t=(Ye().count||0)+1;return ie(Ga,{count:t,at:Date.now()}),{count:t,...Ka(t)}}function Ml(e){const t=Ye(),a=Math.max(t.count||0,Math.floor(Number(e)||0));return a!==(t.count||0)&&ie(Ga,{...t,count:a}),a}function $l(e,t){const a=R(),n=a.find(i=>i.day===e&&i.token===t);return!n||n.pfand?!1:(n.pfand=!0,ke(a),!0)}const $r="affektions-gacha:flaschenpost:v1";function Ve(){const e=he($r,[]);return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&t.id&&t.text&&t.dueDay):[]}function Ya(e){ie($r,(Array.isArray(e)?e:[]).slice(-40))}function Dr(e,t){const[a,n,i]=e.split("-").map(Number);return new Date(Date.UTC(a,n-1,i+t)).toISOString().slice(0,10)}function Dl(e,t,a){return e==="30"?Dr(t,30):Dr(t,20+Math.floor(xe(`flaschenpost|${a}`)*71))}function _l(e,t,a){const n=String(e||"").trim().slice(0,280);if(!n)return null;const i=`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,r={id:i,text:n,mode:t==="30"?"30":"irgendwann",createdDay:a,dueDay:Dl(t,a,i),deliveredDay:null};return Ya([...Ve(),r]),r}function Nl(e){const t=Ve(),a=t.find(n=>n.deliveredDay===e);return a||t.filter(n=>!n.deliveredDay&&n.dueDay<=e).sort((n,i)=>n.dueDay<i.dueDay?-1:1)[0]||null}function Il(e,t){const a=Ve(),n=a.find(i=>i.id===e);return!n||n.deliveredDay?!1:(n.deliveredDay=t,Ya(a),!0)}function Pl(e){const t=new Map(Ve().map(n=>[n.id,n]));for(const n of Array.isArray(e)?e:[]){if(!n||!n.id||!n.text||!n.dueDay)continue;const i=t.get(n.id);t.set(n.id,i?{...i,deliveredDay:i.deliveredDay||n.deliveredDay||null}:n)}const a=[...t.values()].sort((n,i)=>n.createdDay<i.createdDay?-1:1);return Ya(a),a}const Bl=60;function Gt(){const e=$e();return Array.isArray(e.vacations)?e.vacations.filter(t=>t&&t.from&&t.to):[]}function jl(e,t){if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!/^\d{4}-\d{2}-\d{2}$/.test(t)||(t<e&&([e,t]=[t,e]),(Date.parse(t)-Date.parse(e))/864e5+1>Bl))return null;const n=$e(),i=Gt().filter(r=>!(r.from===e&&r.to===t));return i.push({from:e,to:t}),i.sort((r,o)=>r.from.localeCompare(o.from)),Wt({...n,vacations:i}),{from:e,to:t}}function Fl(e,t){const a=$e();Wt({...a,vacations:Gt().filter(n=>!(n.from===e&&n.to===t))})}function _r(e){return Gt().some(t=>e>=t.from&&e<=t.to)}function De(){var g;const e=q(),t=R().filter(h=>h.token===e);if(!t.length)return Math.max(fl(),hl());const a=((g=p.theme)==null?void 0:g.timezone)||"UTC",n=V(a),i=new Set(t.map(h=>h.day)),[r,o,s]=n.split("-").map(Number);let l=new Date(Date.UTC(r,o-1,s)),c=n;i.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));let u=0;for(;i.has(c)||_r(c);)i.has(c)&&u++,l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return u}function Nr(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Ir(e){if(e<5)return p.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return p.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}const Ol=45,Wl=10,ql=.5,Ul=1.8;function Rl(e,t,a){if(!t||!a)return e;const n=new Set(e.map(s=>s.id)),i=R().filter(s=>s.token===t&&s.day<a&&n.has(s.categoryId)).sort((s,l)=>l.day.localeCompare(s.day)).slice(0,Ol);if(i.length<Wl)return e;const r=e.reduce((s,l)=>s+l.weight,0);if(!r)return e;const o={};for(const s of i)o[s.categoryId]=(o[s.categoryId]||0)+1;return e.map(s=>{const l=i.length*s.weight/r,c=Math.min(Ul,Math.max(ql,(l+1)/((o[s.id]||0)+1)));return{...s,weight:Math.max(1,Math.round(s.weight*c))}})}function Hl(e,t,a=[],n=null){const i=Ir(t),r=n?Rl(i,n.token,n.day):i,o=a.length?r.filter(g=>!a.includes(g.id)):r,s=o.length?o:r,l=s.reduce((g,h)=>g+h.weight,0),c=Math.floor(xe(e)*l);let u=0;for(const g of s)if(u+=g.weight,c<u)return p.outcomes.categories.find(h=>h.id===g.id)||g;return p.outcomes.categories[p.outcomes.categories.length-1]}function Pr(){const e=$e();return Math.floor((e.maxStreak||0)/Ks)}function Kt(){var n;if($e().birthdayBonus2026Used)return 0;const t=((n=p.theme)==null?void 0:n.timezone)||"UTC";return V(t)==="2026-05-29"?1:0}function Yt(){const e=$e();return Math.max(0,Pr()-(e.used||0))+Kt()}function Va(){var u;const e=q(),t=((u=p.theme)==null?void 0:u.timezone)||"UTC",a=V(t),n=new Set(R().filter(g=>g.token===e&&g.day<=a).map(g=>g.day));if(!n.size)return null;const i=[...n].sort()[0],[r,o,s]=a.split("-").map(Number),l=new Date(Date.UTC(r,o-1,s));let c=a;for(n.has(c)||(l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10));n.has(c)||_r(c);)l.setUTCDate(l.getUTCDate()-1),c=l.toISOString().slice(0,10);return c<i?null:c}function Br(){return Yt()>0&&Va()!==null}function Gl(e){if(Yt()<=0)return null;const t=Va();if(!t)return null;const a=q(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},i=new Set,r=[n,...R()].filter(c=>{const u=`${c.day}|${c.token}`;return i.has(u)?!1:(i.add(u),!0)}).sort((c,u)=>c.day<u.day?1:c.day>u.day?-1:0);ke(r);const o=$e(),l=Math.max(0,Pr()-(o.used||0))===0&&Kt()>0;return Wt({...o,used:l?o.used||0:(o.used||0)+1,birthdayBonus2026Used:l?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),Wa(De()),t}const jr=new Map;function _e(e){jr.set(e,Date.now())}function Ja(e,t=6e3){const a=jr.get(e);return typeof a=="number"&&Date.now()-a<t}function ht(){var e;return V(((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function Fr(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:q()}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}function Kl(e){if(!e||typeof e!="object"||Ja("stimmung"))return;const t=ht();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){Je()&&(qr(),Za());return}Je()!==a&&(Wr(a),mt(a))}function Or(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,i=(r,o)=>Math.round(o+(r-o)*.3);return`rgb(${i(t,10)},${i(a,20)},${i(n,16)})`}function mt(e){document.body.style.background=Or(e),Ur(e)}function Za(){document.body.style.removeProperty("background"),Ur(null)}function Je(){try{const e=localStorage.getItem(Aa);if(!e)return null;const t=JSON.parse(e);return t.day!==ht()?null:t.hex||null}catch{return null}}function Wr(e){try{localStorage.setItem(Aa,JSON.stringify({day:ht(),hex:e}))}catch{}}function Yl(e){const t=ht();Wr(e),_e("stimmung"),Fr(t,e)}function qr(){try{localStorage.removeItem(Aa)}catch{}}function Vl(){const e=ht();qr(),_e("stimmung"),Fr(e,"")}function Jl(){const e=Je();e&&mt(e)}function Ur(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Rr(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Je()||"#4aaa5a";Hr(e,t),Xa(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Zl(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=Je();t?mt(t):Za()}function Xl(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),i=e.querySelector("#ag-stimmung-reset");function r(o){Xa(e,o),mt(o)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),r(t.value)}),a&&a.addEventListener("input",()=>{const o=Gr(a.value);o&&(t&&(t.value=o),r(o))}),n&&n.addEventListener("click",()=>{const o=(t==null?void 0:t.value)||Gr((a==null?void 0:a.value)||"")||"#4aaa5a";Yl(o),mt(o),e&&(e.hidden=!0)}),i&&i.addEventListener("click",()=>{Vl(),Za(),Hr(e,"#4aaa5a"),Xa(e,"#4aaa5a")})}function Hr(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Xa(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=Or(t))}function Gr(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,i,r]=a;return`#${n}${n}${i}${i}${r}${r}`.toLowerCase()}return null}let Qa="",en=null;function Ql(e,t){Qa=e,en=t}function tn(){if(en)return en();if(!Qa)return window.location.href;try{return new URL(Qa,window.location.href).toString()}catch{return window.location.href}}function be(e,t=null){const a=new URL(e,tn()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function Vt(e){var t;try{const a=S&&S.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=p.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function bt(){var e;try{const t=p.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=q(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,i=new AbortController,r=setTimeout(()=>i.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:i.signal})}finally{clearTimeout(r)}if(!o.ok)return Vt(!1),!1;const s=await o.json();if(!s.ok)return Vt(!1),!1;const l=V(((e=p.theme)==null?void 0:e.timezone)||"UTC"),c=R(),u=c.filter(y=>y.title!=="(wiederhergestellt)"&&y.day<=l);u.length!==c.length&&ke(u);const g=Me(),h=g.filter(y=>y.day<=l);if(h.length!==g.length&&Bt(h),Array.isArray(s.history)&&s.history.length){const y=R(),m=new Map(y.map(w=>[`${w.day}|${w.token}`,w]));for(const w of s.history){if(w.title==="(wiederhergestellt)")continue;const T=nl(w.day);if(!T||T>l)continue;const j=typeof w.token=="string"?w.token.toLowerCase():w.token,z=`${T}|${j}`,v={...w,day:T,token:j},I=m.get(z);I&&I.bestanden&&!v.bestanden&&(v.bestanden=!0,v.bestandenAt=I.bestandenAt||null),I&&I.beweisUrl&&!v.beweisUrl&&(v.beweisUrl=I.beweisUrl),I&&I.reaction&&!v.reaction&&(v.reaction=I.reaction),I&&I.weather&&!v.weather&&(v.weather=I.weather),I&&I.pfand&&!v.pfand&&(v.pfand=!0),m.set(z,v)}const b=Array.from(m.values()).sort((w,T)=>T.day.localeCompare(w.day));ke(b),p.syncedHistory=b,Wa(De())}if(Array.isArray(s.favourites)&&s.favourites.length){const y=Me(),m=new Map(y.map(b=>[`${b.day}|${b.token}`,b]));for(const b of s.favourites){if(b.day>l)continue;const w=typeof b.token=="string"?b.token.toLowerCase():b.token;m.set(`${b.day}|${w}`,{...b,token:w})}Bt(Array.from(m.values()).sort((b,w)=>w.day.localeCompare(b.day)))}if(s.tokens&&typeof s.tokens=="object"&&dl(s.tokens)&&le(),typeof s.questPoints=="number"&&s.questPoints>Rt()&&yl(s.questPoints),typeof s.streak=="number"&&s.streak>0&&ml(s.streak),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const y=qa();let m=!1;for(const[b,w]of Object.entries(s.baerlauchScores))typeof w=="number"&&w>(y[b]||0)&&(y[b]=w,m=!0);if(m)try{localStorage.setItem(rr,JSON.stringify(y))}catch{}}if(typeof s.pfand=="number")try{Ml(s.pfand)}catch{}if(Array.isArray(s.flaschenpost))try{Pl(s.flaschenpost)}catch{}if(Array.isArray(s.hugs))try{Mr(s.hugs)}catch{}if(Array.isArray(s.wishes))try{El(s.wishes)}catch{}if(typeof s.latestPing=="string"&&s.latestPing)try{const y=window.localStorage.getItem(or)||"";s.latestPing>y&&(window.localStorage.setItem(or,s.latestPing),p._newPing=!0)}catch{}if(s.stimmung)try{Kl(s.stimmung)}catch{}if(Array.isArray(s.gipfelbuch)&&!Ja("gipfelbuch")){const y=s.gipfelbuch.filter(m=>m.id).sort((m,b)=>(b.date||"").localeCompare(m.date||""));Ut(y)}return S&&S.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),Vt(!0),Array.isArray(s.history)?s.history.length:0}catch{return Vt(!1),-1}}function le(){try{const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=q(),a=R().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),n=Me().filter(c=>(c.token||"").toLowerCase()===t.toLowerCase()),i=Ke(),r=ft(()=>It(p)),o=r.solved&&r.pointsEarned&&!r._logged?{challenge:Pt(p),attempts:r.attempts,points:r.pointsEarned,period:r.period}:void 0;o&&(r._logged=!0,Ua(r));const s=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:De(),tokens:i,questPoints:Rt(),flaschenpost:Ve(),pfand:Ye().count||0,...o?{questLog:o}:{}}),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};return fetch(e.endpointUrl,l).then(()=>{Ot(i)}).catch(()=>fetch(e.endpointUrl,{...l,mode:"no-cors"}).then(()=>{Ot(i)}).catch(()=>{}))}catch{}}function k(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const Kr={quiet:[15],cursed:[40,30,40],soft:[20,20,40],quest:[20,20,40],warm:[20,20,40],photo:[20,15,20,15,50],uncommon:[20,15,20,15,40],rare:[25,20,25,20,70],jackpot:[30,20,30,20,30,20,140],special:[30,20,30,20,30,20,140]};function ed(e){k(Kr[e]||Kr.soft)}const td=20,ad=5;function nd(e){return e>=td||e<ad}const rd=56,id=700;function od(e,t,a){return a<=id&&Math.hypot(e,t)>=rd}let We=!1,Jt=null,ye=null,an=null;function sd(){return We}function ld({onChange:e}={}){We||(We=!0,an=e||null,ye=document.querySelector("[data-ag-candle-veil]"),ye&&(ye.hidden=!1,ye.classList.remove("is-blown"),requestAnimationFrame(()=>ye.classList.add("is-lit")),dd(ye,(t,a)=>nn({dx:t,dy:a}))),document.documentElement.classList.add("is-candle"),k([10,40,10]),Promise.resolve().then(()=>da).then(t=>{Jt=t.startCandleLights()}).catch(()=>{}),e&&e(!0))}function nn({dx:e=0,dy:t=-1}={}){if(!We)return;We=!1;const a=an;if(an=null,ye){ye.style.setProperty("--ag-blow-x",`${Math.max(-1,Math.min(1,e/120)).toFixed(2)}`),ye.style.setProperty("--ag-blow-y",`${Math.max(-1,Math.min(1,t/120)).toFixed(2)}`),ye.classList.add("is-blown"),ye.classList.remove("is-lit");const n=ye;setTimeout(()=>{We||(n.hidden=!0,n.classList.remove("is-blown"))},900)}if(document.documentElement.classList.remove("is-candle"),k([30,20,10]),Jt){try{Jt()}catch{}Jt=null}a&&a(!1)}function dd(e,t){var n;if(e.dataset.bound)return;e.dataset.bound="1";let a=null;e.addEventListener("pointerdown",i=>{a={x:i.clientX,y:i.clientY,t:performance.now()}}),e.addEventListener("pointerup",i=>{if(!a)return;const r=i.clientX-a.x,o=i.clientY-a.y,s=performance.now()-a.t;a=null,od(r,o,s)&&t(r,o)}),e.addEventListener("pointercancel",()=>{a=null}),(n=e.querySelector("[data-ag-candle-out]"))==null||n.addEventListener("click",()=>t(0,-1)),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&We&&nn({})})}function Yr(e){const t=Array.isArray(p.specialDays&&p.specialDays.days)?p.specialDays.days:[],a=e.slice(5),n=q();for(const i of t){const r=i.repeat==="yearly";if((i.date===e||r&&i.date===a)&&!(i.player&&i.player!==n))return i}return null}const Vr=270;function cd(e,t){const a=R().filter(n=>n.token===e&&n.day<t&&typeof n.categoryId=="string"&&n.categoryId!=="special").sort((n,i)=>i.day.localeCompare(n.day)).slice(0,Vr);return a.length<Vr?!1:!a.some(n=>n.categoryId==="jackpot")}function Jr(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function gd(e){const t=d("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function yt(){return(p.photos||[]).filter(e=>e.type!=="video")}const ud=4;function pd(e,t){return R().filter(a=>a.token===e&&a.day<t&&pt(a)&&!a.used).length}function Zr(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:i=""}=a,r=q(),o=`${p.theme.secret}|${r}|${e}${i?"|"+i:""}`,s=Yr(e);if(s&&!i){const v=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],I=v[Ia(`${o}|special|outcome`,v.length)],C={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:v},D=s.photo&&s.photo.url?{type:"image",...s.photo}:s.photoAlt&&p.photos.length&&yt().find(x=>x.alt===s.photoAlt)||null;return{day:e,token:r,category:C,outcome:I,photo:D,collectToken:I.token||null,unlockTime:s.unlockTime||null,unlockTimezone:s.unlockTimezone||null}}const l=i?null:ul(r,e),c=i?null:R().find(v=>v.token===r&&v.day===e),u=!i&&(!c||c.categoryId==="flaschenpost")?Nl(e):null;if(u){const v=u.mode==="30"?"in 30 Tagen":"irgendwann";return{day:e,token:r,category:{id:"flaschenpost",label:"Flaschenpost 🍾",weight:0,tone:"warm",outcomes:[]},outcome:{title:"Post von dir selbst",message:`Versiegelt am ${ce(u.createdDay)}, mit „${v}“ drauf. Heute ist ${u.mode==="30"?"der dreissigste Tag":"irgendwann"}.

„${u.text}“`},photo:null,collectToken:null,voucher:!1,freikarte:!1,flaschenpost:u.id}}let g;l&&(g=p.outcomes.categories.find(v=>v.id===l.categoryId)),!g&&c&&c.categoryId&&(g=p.outcomes.categories.find(v=>v.id===c.categoryId)||null),g||(g=Hl(`${o}|category`,t||0,n,{token:r,day:e}),!i&&cd(r,e)&&(g=p.outcomes.categories.find(v=>v.id==="jackpot")||g));const h=al();if(h){const v=p.outcomes.categories.find(I=>I.id===h);v&&(g=v)}g.id==="photo"&&!yt().length&&(g=p.outcomes.categories.find(v=>v.id==="common")||g);const y=new Set(R().filter(v=>v.token===r&&v.day<e&&v.categoryId===g.id).map(v=>v.title)),m=g.outcomes.filter(v=>!y.has(v.title));let b=m.length?m:g.outcomes;if(!i&&pd(r,e)>=ud){const v=b.filter(I=>I.voucher!==!0);v.length&&(b=v)}const T=(c&&c.categoryId===g.id?g.outcomes.find(v=>v.title===c.title):null)||l&&g.outcomes.find(v=>v.title===l.outcomeTitle)||b[Ia(`${o}|${g.id}|outcome`,b.length)],j=yt();let z=null;if(g.id==="photo"&&j.length){const v=new Set(R().filter(D=>D.token===r&&D.day<e&&D.photo).map(D=>D.photo.url)),I=j.filter(D=>!v.has(D.url)),C=I.length>0?I:j;z=C[Ia(`${o}|photo`,C.length)]}return{day:e,token:r,category:g,outcome:T,photo:z,collectToken:T.token||null,voucher:T.voucher||!1,freikarte:T.freikarte===!0}}function fd(){const e=Q()||V(p.theme.timezone),t=De();return Zr(e,t)}function hd(e,t){return Zr(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}function md(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function bd(e){const t=(i,r)=>S.style.setProperty(i,r),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Xr={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Qr={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function yd(e){const t=Yr(e);if(!t)return;const a=(n,i)=>S.style.setProperty(n,i);if(t.colors&&typeof t.colors=="object")for(const[n,i]of Object.entries(t.colors))Xr[n]&&typeof i=="string"&&a(Xr[n],i);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,i]of Object.entries(t.darkColors))Qr[n]&&typeof i=="string"&&a(Qr[n],i)}const wd=`
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

/* ── Vollmond: the line on the card ── */
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
    `;function vd(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=wd.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function xd(){return`
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
    `}function kd(){return`
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
    `}const Sd=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${xd()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap">
                ${kd()}
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
    `;function Ed(){S.className="ag-widget",S.setAttribute("aria-labelledby","ag-title"),S.innerHTML=Sd}function Ld(e,t=1400,a=.82){return new Promise((n,i)=>{const r=URL.createObjectURL(e),o=new Image;o.onload=()=>{URL.revokeObjectURL(r);try{const s=Math.min(1,t/Math.max(o.naturalWidth||1,o.naturalHeight||1)),l=Math.max(1,Math.round((o.naturalWidth||1)*s)),c=Math.max(1,Math.round((o.naturalHeight||1)*s)),u=document.createElement("canvas");u.width=l,u.height=c,u.getContext("2d").drawImage(o,0,0,l,c);const g=u.toDataURL("image/jpeg",a);if(!g||g==="data:,"){i(new Error("encode failed"));return}n(g)}catch(s){i(s)}},o.onerror=()=>{URL.revokeObjectURL(r),i(new Error("decode failed"))},o.src=r})}async function Td(e,t,a){const n=p.backup;if(!n||!n.enabled||!n.endpointUrl)throw Object.assign(new Error("backup disabled"),{code:"no-endpoint"});const i=await Ld(a),r=i.slice(i.indexOf(",")+1),o=new AbortController,s=setTimeout(()=>o.abort(),3e4);let l;try{l=await fetch(n.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},signal:o.signal,body:JSON.stringify({type:"beweis-upload",token:t,day:e,mime:"image/jpeg",image:r})})}catch{throw Object.assign(new Error("network"),{code:"network"})}finally{clearTimeout(s)}let c=null;try{c=await l.json()}catch{}if(!c||!c.ok||!c.url)throw Object.assign(new Error(c&&c.error||"no url"),{code:"old-script"});return c.url}function ge(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(i);for(let r=0;r<e;r++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],l=8+Math.random()*8,c=Math.random()*100,u=Math.random()*.6,g=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${l}px;height:${l*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${g}s ${u}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),i.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const r=document.createElement("style");r.id="ag-confetti-style",r.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(r)}setTimeout(()=>i.remove(),3e3)}const Ze=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?","Welche kleine Gewohnheit von mir würdest du sofort vermissen, wenn sie plötzlich weg wäre?","Was war das Beste, das dir diese Woche passiert ist, und wusste ich davon?","Wenn du einen Tag lang in meinem Kopf wohnen könntest: Was würdest du dir als Erstes anschauen?","Welche Frage hast du mir noch nie gestellt, weil du Angst vor der Antwort hattest?","Was glaubst du, worüber ich nachts nachdenke, wenn ich nicht schlafen kann?","Welches Lied erinnert dich an uns, ohne dass ich das je wusste?","Was war der Moment, in dem du zum ersten Mal richtig über mich gelacht hast?","Wenn unsere Beziehung ein Gericht wäre: Was wäre es, und wer hat es gekocht?","Was ist eine Sache, die du gern besser könntest, und bei der ich dir helfen könnte?","Woran merkst du, dass ich gerade einen guten Tag habe?","Woran merkst du, dass ich gerade einen schlechten habe, bevor ich es sage?","Welchen Ort möchtest du mir unbedingt noch zeigen, und warum gerade den?","Was ist etwas, das du als Kind geliebt hast und heute vergisst?","Wenn wir in zehn Jahren zusammen auf heute zurückschauen: Was werden wir als das Wichtigste sehen?","Welche drei Dinge sollten in jeder Wohnung sein, in der wir je wohnen?","Was hast du von mir gelernt, ohne dass ich es dir beibringen wollte?","Welcher Streit war im Nachhinein der nützlichste?","Was macht dich an mir manchmal nervös, und ist das schlimm?","Wenn du mir eine Fähigkeit schenken könntest: welche, und was würde ich damit machen?","Was ist dein Lieblingsbild von uns, und warum genau das?","Was möchtest du unbedingt einmal zusammen kochen, obwohl es wahrscheinlich schiefgeht?","Wie würdest du mich jemandem beschreiben, der mich noch nie gesehen hat, in drei Sätzen?","Was ist ein Kompliment, das du bekommen hast und nie vergessen wirst?","Welche Regel sollte es in unserer Beziehung geben, die es noch nicht gibt?","Was wünschst du dir für mich, das nichts mit dir zu tun hat?","Welcher Tag würdest du gern einmal komplett ohne Handy mit mir verbringen, und was machen wir?","Was war das Erste, das dir an meiner Wohnung aufgefallen ist?","Welche Angewohnheit von mir hast du inzwischen übernommen?","Was ist eine Sache, die ich für selbstverständlich halte, die du an mir bemerkst?","Wenn du einen Abend lang die Playlist für unser Leben machst: Welche drei Lieder sind sicher drin?","Was wolltest du mir schon länger vorschlagen, hast es aber verschoben?","Welcher Geruch gehört für dich zu mir?","Was ist die beste Entscheidung, die wir bisher gemeinsam getroffen haben?","Worauf freust du dich im Winter, worauf im Sommer?","Welche Sache würdest du gern einmal mit mir lernen, bei der wir beide bei null anfangen?","Was ist etwas, das du dich bei mir nicht traust zu fragen, obwohl du es gern wüsstest?","Wann hast du zuletzt gedacht: genau das hier, so soll es sein?","Welche meiner Geschichten hast du schon dreimal gehört und hörst sie trotzdem gern?","Was ist der kleinste Luxus, den du dir mit mir gern öfter gönnen würdest?","Wenn du einen Satz für ein Schild über unserer Tür schreiben müsstest: Was stünde drauf?","Welchen Teil deines Alltags würdest du mir gern öfter zeigen?","Was glaubst du, worin ich dich unterschätze?","Was glaubst du, worin du dich selbst unterschätzt, und was sehe ich stattdessen?","Welche Jahreszeit passt zu uns, und warum?","Was war ein Moment, in dem du stolz auf mich warst, ohne es gesagt zu haben?","Wenn wir ein Wochenende mit nur einer Tasche wegfahren: Was ist drin, und wohin?","Welches Wort aus deiner Kindheit sollte ich unbedingt lernen?","Was ist eine Tradition, die wir uns ausdenken sollten?","Was macht dich zuverlässig fröhlich, und mache ich davon genug?","Welche Seite von dir glaubst du, kenne ich noch gar nicht?","Wenn du mir heute einen Brief schreiben müsstest: Wie würde der erste Satz lauten?","Was wäre dein perfekter Sonntagmorgen, bis ins Detail?","Was ist eine Sache, über die wir nie reden, und sollten wir?","Welche Entscheidung in deinem Leben hat uns überhaupt erst möglich gemacht?","Wie sieht ein Streit aus, den wir gut führen? Woran würde man das merken?","Was würdest du gern öfter von mir hören?","Welche Ecke von Zürich fühlt sich am meisten nach uns an?","Was ist ein Wunsch, der dir zu klein vorkommt, um ihn auszusprechen?","Wenn du einen Tag aus unserem ersten Monat noch einmal haben könntest: welchen?","Was glaubst du, worüber wir in einem Jahr lachen werden, das uns heute noch ernst vorkommt?"],ei=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]];let Zt=-1;function ti(){const e=d("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(ir);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<Ze.length){Zt=a;const n=d("#ag-gesprach-question");n&&(n.textContent=Ze[a]);return}}}catch{}ai()}}function Cd(){const e=d("#ag-gesprach-panel");e&&(e.hidden=!0)}function ai(){let e;do e=Math.floor(Math.random()*Ze.length);while(e===Zt&&Ze.length>1);Zt=e;try{localStorage.setItem(ir,String(e))}catch{}const t=d("#ag-gesprach-question");t&&(t.textContent=Ze[e])}function zd(){const e=Ze[Zt]||"";if(!e)return;const t=p.theme&&p.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function ni(){var e;return!!((e=p.quest)!=null&&e.enabled&&Pt(p))}function ri(){const e=d("#ag-quest-panel");e&&(e.hidden=!1,ii())}function Ad(){const e=d("#ag-quest-panel");e&&(e.hidden=!0)}function ii(){const e=Pt(p),t=ft(),a=d("#ag-quest-challenge"),n=d("#ag-quest-hint-history"),i=d("#ag-quest-loading"),r=d("#ag-quest-actions"),o=d("#ag-quest-result"),s=d("#ag-quest-points"),l=d("#ag-quest-copy"),c=d("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),l&&(l.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),r&&(r.hidden=!0);return}if(a&&(a.textContent=u),i&&(i.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((g,h)=>`<div class="ag-hint-item"><span class="ag-hint-num">${h+1}</span><p>${g}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),l&&(l.textContent="Gut gemacht."),r&&(r.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Rt()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),l&&(l.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),r&&(r.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Md(e){if(!e)return;const t=d("#ag-quest-actions"),a=d("#ag-quest-loading"),n=d("#ag-quest-result"),i=d("#ag-quest-points"),r=d("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await $d(e),s=ft(),l=Pt(p),c=(l==null?void 0:l.prompt)||"",u=(l==null?void 0:l.solution)||"";try{const g=await Dd(o,c,u,s.attempts+1,s.hints);if(s.attempts+=1,g.success){const h=dr[Math.min(s.attempts-1,dr.length-1)],y=bl(h);s.solved=!0,s.pointsEarned=h,s.successMessage=g.message||"Perfekt.",Ua(s),le(),n&&(n.textContent=g.message||"Perfekt.",n.hidden=!1),i&&(i.textContent=`+${h} Punkte · Gesamt: ${y}`,i.hidden=!1),a&&(a.hidden=!0),r&&(r.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const m=d("#ag-btn-quest");m&&m.classList.remove("ag-chip-quest-active"),k([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],g.hint||"Versuch nochmal."],Ua(s),ii()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function $d(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Dd(e,t,a,n,i){var s;const r=(s=p.quest)==null?void 0:s.proxyUrl;if(!r)throw new Error("no proxy");const o=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:i})});if(!o.ok)throw new Error("proxy error");return o.json()}function _d(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let c=0;c<n;c++)r[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=i;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const l=t.createGain();l.gain.setValueAtTime(0,a),l.gain.linearRampToValueAtTime(.055,a+.06),l.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(l),l.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,u,g,h,y])=>{const m=t.createOscillator();m.type="sine",m.frequency.setValueAtTime(c,a+g),m.frequency.exponentialRampToValueAtTime(u,a+g+h*.55);const b=t.createGain();b.gain.setValueAtTime(0,a+g),b.gain.linearRampToValueAtTime(y,a+g+.09),b.gain.exponentialRampToValueAtTime(.001,a+g+h),m.connect(b),b.connect(t.destination),m.start(a+g),m.stop(a+g+h+.05)})}catch{}}function Nd(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,i)=>{const r=document.createElement("span");r.className="ag-letter-word",r.textContent=n,r.style.animationDelay=`${320+i*155}ms`,a.appendChild(r),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function oi(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}const si="affektions-gacha:letter-opened:v1",Id=10;function Pd(){try{return localStorage.getItem(si)==="yes"}catch{return!1}}function Bd(e){return Pd()?!1:e>0&&e%Id===0}const jd="Psst: Der Knopf hat ein Geheimnis. Drei Sekunden lang halten. 🍀";function rn(){const e=d("#ag-letter-overlay");if(!e)return;try{localStorage.setItem(si,"yes")}catch{}e.hidden=!1,e.focus(),k([20,60,20]),_d();const t=d("#ag-letter-photo");if(t&&p.photos&&p.photos.length){const a=yt(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Fd()}async function Fd(){var n;const e=d("#ag-letter-body");if(!e)return;Nd(e);const t=(n=p.quest)==null?void 0:n.proxyUrl;if(t)try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(i.ok){const r=await i.json();if(r.paragraphs&&r.paragraphs.length){oi(e,r.paragraphs);return}}}catch{}const a=ei[Math.floor(Math.random()*ei.length)];oi(e,a)}function on(){const e=d("#ag-letter-overlay");e&&(e.hidden=!0)}const li="affektions-gacha:wetter:v1",Od=30*60*1e3,Wd=5e3;function sn(e,t=!0){const a=Number(e);return a===0?t?"☀️":"🌙":a===1?t?"🌤":"🌙":a===2?t?"⛅":"☁️":a===3?"☁️":a===45||a===48?"🌫":a>=51&&a<=57?"🌦":a>=61&&a<=67?"🌧":a>=71&&a<=77?"🌨":a>=80&&a<=82?"🌧":a===85||a===86?"🌨":a>=95&&a<=99?"⛈":"🌡"}function qd(e){const t=Number(e);return t>=51&&t<=67||t>=80&&t<=82?"rain":t>=71&&t<=77||t===85||t===86?"snow":t===45||t===48?"fog":t>=95?"storm":null}function di(e){return!e||typeof e.t!="number"?"":`${Math.round(e.t)}° ${e.e||sn(e.c,e.d!==!1)}`}function Ud(){try{const e=localStorage.getItem(li);if(!e)return null;const t=JSON.parse(e);return t&&typeof t.t=="number"&&typeof t.at=="number"?t:null}catch{return null}}function Rd(e){try{localStorage.setItem(li,JSON.stringify(e))}catch{}}async function ci({force:e=!1}={}){const t=p.theme&&p.theme.weather;if(!t||typeof t.latitude!="number"||typeof t.longitude!="number")return null;const a=Ud();if(a&&!e&&Date.now()-a.at<Od)return p.weather=a,a;const n=`https://api.open-meteo.com/v1/forecast?latitude=${t.latitude}&longitude=${t.longitude}&current=temperature_2m,weather_code,is_day&timezone=${encodeURIComponent(p.theme.timezone||"Europe/Zurich")}`,i=new AbortController,r=setTimeout(()=>i.abort(),Wd);try{const o=await fetch(n,{cache:"no-store",signal:i.signal});if(!o.ok)throw new Error("weather "+o.status);const s=await o.json(),l=s&&s.current;if(!l||typeof l.temperature_2m!="number")throw new Error("weather shape");const c={t:l.temperature_2m,c:Number(l.weather_code)||0,d:l.is_day!==0,at:Date.now()};return c.e=sn(c.c,c.d),Rd(c),p.weather=c,c}catch{return a?(p.weather=a,a):null}finally{clearTimeout(r)}}function Hd(e){return!e||typeof e.t!="number"?null:{t:Math.round(e.t*10)/10,c:e.c,e:e.e||sn(e.c,e.d!==!1)}}const Gd=["is-raining","is-snowing","is-foggy","is-stormy"];function Kd(e){if(!S)return;for(const a of Gd)S.classList.remove(a);const t=e?qd(e.c):null;t==="rain"&&S.classList.add("is-raining"),t==="snow"&&S.classList.add("is-snowing"),t==="fog"&&S.classList.add("is-foggy"),t==="storm"&&S.classList.add("is-stormy","is-raining")}function F(e){const t=S.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}let ln=null;function gi(){if(!ln)try{ln=new(window.AudioContext||window.webkitAudioContext)}catch{}return ln}function ui(){try{return window.localStorage.getItem(Hs)!=="off"}catch{return!0}}function ae(e,t,a,n,i=.15,r="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=r,o.frequency.value=t;const l=e.currentTime+a;s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(i,l+.012),s.gain.exponentialRampToValueAtTime(1e-4,l+n),o.start(l),o.stop(l+n+.05)}function Xt(e){if(!ui())return;const t=gi();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":ae(t,280,0,.18,.08,"sine"),ae(t,210,.12,.22,.06,"sine");break;case"cursed":ae(t,220,0,.12,.1,"triangle"),ae(t,170,.09,.28,.07,"triangle");break;case"uncommon":ae(t,523,0,.14,.14,"sine"),ae(t,784,.1,.22,.12,"sine");break;case"rare":ae(t,523,0,.12,.14,"sine"),ae(t,659,.09,.12,.14,"sine"),ae(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>ae(t,a,n*.09,.18,.13,"sine")),ae(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>ae(t,a,n*.08,.16,.13,"sine")),ae(t,2093,.45,.5,.05,"sine");break;default:ae(t,523,0,.12,.13,"sine"),ae(t,659,.09,.18,.1,"sine");break}}function Qt(){if(!ui())return;const e=gi();e&&(e.state==="suspended"&&e.resume().catch(()=>{}),ae(e,1760,0,.09,.1,"triangle"),ae(e,2637,.05,.14,.07,"sine"),ae(e,1319,.11,.22,.05,"sine"))}function dn(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Yd(e,t){if(!e)return;const a=e.parentNode&&e.parentNode.querySelector("[data-ag-ink-hint]");if(!t){e.classList.remove("ag-ink","is-held"),a&&(a.hidden=!0);return}e.classList.add("ag-ink"),e.classList.remove("is-held");let n=0;const i=document.createTreeWalker(e,4),r=[];for(;i.nextNode();)r.push(i.currentNode);for(const s of r){const l=document.createDocumentFragment();for(const c of s.nodeValue){const u=document.createElement("span");u.className="ag-ink-ch",u.textContent=c,u.style.setProperty("--i",String(n++)),l.appendChild(u)}s.parentNode.replaceChild(l,s)}let o=a;if(o||(o=document.createElement("p"),o.className="ag-ink-hint",o.setAttribute("data-ag-ink-hint",""),e.parentNode.insertBefore(o,e)),o.hidden=!1,o.textContent="🫥 Geheimtinte — Finger auf den Text legen",!e.dataset.inkBound){e.dataset.inkBound="1";const s=()=>{e.classList.contains("ag-ink")&&(e.classList.add("is-held"),k(6))},l=()=>e.classList.remove("is-held");e.addEventListener("pointerdown",s),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("pointerleave",l)}}const cn=["Lieblingsmensch","Sternschnuppe","Heimathafen","Gleichklang","Morgenlicht","Fernweh","Herzklopfen","Nachtfalter","Kuschelwetter","Augenblick","Geborgenheit","Sommersprosse","Lichtblick","Zuhause","Wegbegleiter","Glühwürmchen","Nähe","Du","Nachtschwärmer","Sanft","Wir"];function Vd(e=Math.random()){return cn[Math.floor(e*cn.length)%cn.length]}function Jd(e){e.addEventListener("click",()=>{!S||!S.classList.contains("is-evening")||(e.classList.add("is-flare"),setTimeout(()=>e.classList.remove("is-flare"),900),k(6),F(`✨ ${Vd()}`))})}function pi(e,t){if(!S)return;const a=S.querySelector('.ag-bottomnav-btn[data-ag-tab="today"] .ag-bottomnav-btn-icon');if(!t||!a||dn()){Qt();return}const n=t.getBoundingClientRect(),i=a.getBoundingClientRect(),r=document.createElement("div");r.className="ag-coin",r.textContent=e,r.style.left=`${n.left+n.width/2}px`,r.style.top=`${n.top+n.height/2}px`,document.body.appendChild(r);const o=i.left+i.width/2-(n.left+n.width/2),s=i.top+i.height/2-(n.top+n.height/2),l=r.animate([{transform:"translate(-50%,-50%) scale(1) rotateY(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(o*.45).toFixed(0)}px), calc(-50% + ${(s*.35-110).toFixed(0)}px)) scale(1.35) rotateY(200deg)`,opacity:1,offset:.45},{transform:`translate(calc(-50% + ${o.toFixed(0)}px), calc(-50% + ${s.toFixed(0)}px)) scale(0.25) rotateY(560deg)`,opacity:.15}],{duration:950,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});l.onfinish=()=>{r.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),Qt(),k([10,50,22]),Promise.resolve().then(()=>da).then(c=>c.flashLightsForPull("uncommon")).catch(()=>{})}}function Zd(e){if(!S||!e||p.foldedFor===e.day)return;const t=d("[data-ag-result]"),a=S.querySelector('.ag-bottomnav-btn[data-ag-tab="history"] .ag-bottomnav-btn-icon');if(!t||t.hidden||!a||(p.foldedFor=e.day,dn()))return;const n=t.getBoundingClientRect(),i=window.innerHeight||800,r=n.left+n.width/2,o=n.bottom<0||n.top>i?i/2:Math.max(60,Math.min(i-60,n.top+Math.min(n.height,i)/2)),s=a.getBoundingClientRect(),l=document.createElement("div");l.className="ag-envelope",l.textContent="✉️",l.style.left=`${r}px`,l.style.top=`${o}px`,document.body.appendChild(l);const c=s.left+s.width/2-r,u=s.top+s.height/2-o,g=l.animate([{transform:"translate(-50%,-50%) scale(2.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1.4)",opacity:1,offset:.25},{transform:`translate(calc(-50% + ${c.toFixed(0)}px), calc(-50% + ${u.toFixed(0)}px)) scale(0.3)`,opacity:.2}],{duration:720,easing:"cubic-bezier(.4,.6,.3,1)",fill:"forwards"});g.onfinish=()=>{l.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),k(8)}}const fi=/[\p{L}\p{M}’'-]/u;function Xd(e,t){if(typeof e!="string"||!e.length)return"";let a=Math.min(Math.max(t,0),e.length),n=a;for(;a>0&&fi.test(e[a-1]);)a--;for(;n<e.length&&fi.test(e[n]);)n++;return e.slice(a,n).replace(/^[-'’]+|[-'’]+$/g,"")}function Qd(e,t){let a=null,n=0;try{if(document.caretPositionFromPoint){const i=document.caretPositionFromPoint(e,t);i&&(a=i.offsetNode,n=i.offset)}else if(document.caretRangeFromPoint){const i=document.caretRangeFromPoint(e,t);i&&(a=i.startContainer,n=i.startOffset)}}catch{return""}return!a||a.nodeType!==3?"":Xd(a.nodeValue,n)}function ec(e,t){if(!e||e.dataset.wordBound)return;e.dataset.wordBound="1";let a=null,n=0,i=0;const r=()=>{a&&(clearTimeout(a),a=null)};e.addEventListener("pointerdown",o=>{e.classList.contains("ag-ink")||(n=o.clientX,i=o.clientY,r(),a=setTimeout(()=>{a=null;const s=Qd(n,i);s&&s.length>=3&&t(s)},650))}),e.addEventListener("pointermove",o=>{a&&Math.hypot(o.clientX-n,o.clientY-i)>10&&r()}),e.addEventListener("pointerup",r),e.addEventListener("pointercancel",r),e.addEventListener("pointerleave",r),e.addEventListener("contextmenu",o=>{a&&o.preventDefault()})}const gn=120;function tc(e,t,a){if(!e||!t||e.dataset.pfandBound)return;e.dataset.pfandBound="1";let n=!1,i=0,r=0,o=!1;const s=()=>{t.style.transition="transform 320ms cubic-bezier(.3,.7,.3,1.2), opacity 320ms ease",t.style.transform="",t.style.opacity="",setTimeout(()=>{t.style.transition=""},340),t.classList.remove("is-pfand-dragging")};e.addEventListener("pointerdown",c=>{n=!0,o=!1,i=c.clientY,r=0;try{e.setPointerCapture(c.pointerId)}catch{}t.style.transition="none",t.classList.add("is-pfand-dragging")}),e.addEventListener("pointermove",c=>{if(!n)return;r=Math.min(0,c.clientY-i),r<-6&&(o=!0);const u=Math.min(1,-r/gn);t.style.transform=`translateY(${(r*.7).toFixed(0)}px) scale(${(1-.22*u).toFixed(3)})`,t.style.opacity=String(1-.35*u),e.classList.toggle("is-ready",-r>=gn)});const l=()=>{if(n){if(n=!1,e.classList.remove("is-ready"),-r>=gn){s(),a();return}s()}};e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),e.addEventListener("click",c=>{if(o){c.preventDefault();return}Promise.resolve().then(()=>Sc).then(u=>{u.armConfirm(e,"Zurückgeben? Nochmal tippen")&&a()})})}function ac(e){if(!S)return;const t=S.querySelector(".ag-machine-wrap");if(!e||!t)return;const a=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=document.createElement("div");i.className="ag-pfand-capsule",i.style.left=`${a.left+a.width/2}px`,i.style.top=`${a.top+a.height/2}px`,document.body.appendChild(i);const r=n.left+n.width/2-(a.left+a.width/2),o=n.top+n.height*.55-(a.top+a.height/2);if(dn()){i.remove();return}const s=i.animate([{transform:"translate(-50%,-50%) scale(1) rotate(0deg)",opacity:1},{transform:`translate(calc(-50% + ${(r*.5).toFixed(0)}px), calc(-50% + ${(o*.5-60).toFixed(0)}px)) scale(1.1) rotate(180deg)`,opacity:1,offset:.5},{transform:`translate(calc(-50% + ${r.toFixed(0)}px), calc(-50% + ${o.toFixed(0)}px)) scale(.3) rotate(420deg)`,opacity:.1}],{duration:820,easing:"cubic-bezier(.35,.7,.35,1)",fill:"forwards"});s.onfinish=()=>{i.remove(),t.classList.add("is-gulp"),setTimeout(()=>t.classList.remove("is-gulp"),700),Qt(),k([10,40,20])}}function un(){var e;try{if(typeof navigator>"u"||typeof navigator.setAppBadge!="function")return;const t=V(((e=p.theme)==null?void 0:e.timezone)||"UTC"),a=q(),i=R().some(r=>r.token===a&&r.day===t)?navigator.clearAppBadge():navigator.setAppBadge(1);i&&typeof i.catch=="function"&&i.catch(()=>{})}catch{}}let pn=null,hi=!1;function nc(e){if(!pn||e.gamma===null||e.beta===null)return;const t=Math.max(0,Math.min(100,(e.gamma+45)/90*100)),a=Math.max(0,Math.min(100,(e.beta+30)/120*100));pn(t,a)}function rc(){hi||(hi=!0,window.addEventListener("deviceorientation",nc,{passive:!0}),S&&S.classList.add("has-tilt"))}function ic({onTilt:e}={}){if(pn=e||null,typeof window>"u")return;const t=window.DeviceOrientationEvent;t&&typeof t.requestPermission!="function"&&rc()}const ea={jackpot:{flash:"rgba(255,215,120,.92)",double:!0,particles:140,palette:["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"],rumble:"hard"},special:{flash:"rgba(255,240,200,.9)",double:!0,particles:150,palette:["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"],rumble:"hard"},rare:{flash:"rgba(190,140,255,.85)",double:!1,particles:90,palette:["#b58cff","#d9c2ff","#8ab8cf","#fff","#e0a75d"],rumble:"hard"},uncommon:{flash:"rgba(120,220,220,.7)",double:!1,particles:60,palette:["#7fd6d6","#b7e5c2","#fff","#8fcf9e"],rumble:"soft"},quest:{flash:"rgba(120,180,255,.7)",double:!1,particles:55,palette:["#8ab8cf","#4dabf7","#dceaf3","#fff"],rumble:"soft"},photo:{flash:"rgba(255,255,255,.96)",double:!1,particles:40,palette:["#fff","#dfeedb","#8fcf9e"],rumble:"soft",shutter:!0},warm:{flash:"rgba(255,200,120,.6)",double:!1,particles:50,palette:["#e0a75d","#ffe0b3","#8fcf9e","#fff"],rumble:"soft"},soft:{flash:"rgba(143,207,158,.55)",double:!1,particles:36,palette:["#8fcf9e","#b7e5c2","#dfeedb"],rumble:"soft"},cursed:{flash:"rgba(200,40,40,.7)",double:!0,particles:30,palette:["#5a0f0f","#a02020","#2b1a1a","#000"],rumble:"hard"},quiet:{flash:"rgba(120,130,120,.35)",double:!1,particles:10,palette:["#6b7a6b","#9faf9a"],rumble:"none"}};function mi(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function oc(e){if(mi())return;const t=ea[e]||ea.soft;t.rumble!=="none"&&(S.classList.add("is-rumbling"),t.rumble==="hard"&&S.classList.add("is-rumbling-hard"))}function sc(){S.classList.remove("is-rumbling","is-rumbling-hard")}function fn(e,t=0){const a=document.createElement("div");a.className="ag-flash",a.style.setProperty("--ag-flash-color",e),a.style.animationDelay=t+"ms",document.body.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1600+t)}function bi(e=0){const t=S.querySelector(".ag-machine-wrap");if(!t)return;const a=document.createElement("div");a.className="ag-shockwave",a.style.animationDelay=e+"ms",t.appendChild(a),a.addEventListener("animationend",()=>a.remove(),{once:!0}),setTimeout(()=>a.remove(),1400+e)}function lc(e){const t=ea[e]||ea.soft;if(mi()){fn(t.flash);return}bi(0),bi(160),fn(t.flash),t.double&&fn(t.flash,260),t.shutter&&S.classList.add("is-shutter"),setTimeout(()=>S.classList.remove("is-shutter"),700);try{ge(t.particles,t.palette)}catch{}}const yi=360,dc=45,cc=22;class gc{constructor({locked:t=!1}={}){this.locked=t,this.wound=0,this.last=null,this.detents=0,this.fired=!1}move(t){if(this.last===null)return this.last=t,{detent:0,fired:!1};let a=t-this.last;for(;a>180;)a-=360;for(;a<=-180;)a+=360;if(this.last=t,this.fired)return{detent:0,fired:!1};const n=this.locked?cc:yi;this.wound=Math.min(n,Math.max(0,this.wound+a));const i=Math.floor(this.wound/dc),r=i>this.detents?i-this.detents:0;this.detents=i;const o=!this.locked&&this.wound>=yi;return o&&(this.fired=!0),{detent:r,fired:o}}}function wi(e,t,a){const n=e.getBoundingClientRect();return Math.atan2(a-(n.top+n.height/2),t-(n.left+n.width/2))*180/Math.PI}const uc=3e3,vi=8;function pc(e,{drawable:t,onFire:a,onTick:n,onHold:i}={}){if(!e)return;let r=null,o=null;const s=()=>{clearTimeout(o),o=null},l=g=>e.style.setProperty("--ag-knob-angle",`${g.toFixed(1)}deg`),c=()=>{e.classList.add("is-springing"),l(0),setTimeout(()=>e.classList.remove("is-springing"),420)};e.addEventListener("pointerdown",g=>{if(g.button&&g.button!==0)return;g.preventDefault();const h=t?t():!0;r=new gc({locked:!h}),r.move(wi(e,g.clientX,g.clientY)),e.classList.remove("is-springing"),e.classList.add("is-turning"),e.classList.toggle("is-locked",!h);try{e.setPointerCapture(g.pointerId)}catch{}s(),i&&(o=setTimeout(()=>{r&&r.wound<vi&&(u(),i())},uc))}),e.addEventListener("pointermove",g=>{if(!r)return;const{detent:h,fired:y}=r.move(wi(e,g.clientX,g.clientY));r.wound>=vi&&s(),l(r.wound),h&&(k(r.locked?4:6+r.detents),n&&n(r.detents,r.locked)),y&&(r=null,e.classList.remove("is-turning"),e.classList.add("is-fired"),k([20,30,50]),setTimeout(()=>{e.classList.remove("is-fired"),c()},500),a&&(!t||t())&&a())});const u=()=>{if(s(),!r)return;const g=r.locked&&r.wound>4;r=null,e.classList.remove("is-turning"),g&&k([8,30,8]),c()};e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u),e.addEventListener("lostpointercapture",u),e.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(!t||t())&&(g.preventDefault(),k(12),a&&a())})}const xi=.72;function fc(e,t){return e>0&&t/e<=xi}function hc(e,t){if(!e)return;const a=new Map;let n=0,i=!1;const r=()=>{const[l,c]=[...a.values()];return Math.hypot(l.x-c.x,l.y-c.y)};e.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&(n=r(),i=!1))}),e.addEventListener("pointermove",l=>{a.has(l.pointerId)&&(a.set(l.pointerId,{x:l.clientX,y:l.clientY}),a.size===2&&!i&&fc(n,r())&&(i=!0,t()))});const o=l=>{a.delete(l.pointerId),a.size<2&&(n=0)};e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o);let s=!1;e.addEventListener("gesturestart",()=>{s=!1}),e.addEventListener("gesturechange",l=>{!s&&l.scale&&l.scale<=xi&&(s=!0,t())})}function mc(e){const t=e&&e.closest(".ag-widget"),a=t&&t.querySelector('.ag-bottomnav-btn[data-ag-tab="lieblinge"] .ag-bottomnav-btn-icon');if(!e||!a)return;const n=e.getBoundingClientRect(),i=a.getBoundingClientRect(),r=document.createElement("div");r.className="ag-fav-ghost",r.style.left=`${n.left}px`,r.style.top=`${n.top}px`,r.style.width=`${n.width}px`,r.style.height=`${Math.min(n.height,260)}px`,document.body.appendChild(r);const o=i.left+i.width/2-(n.left+n.width/2),s=i.top+i.height/2-(n.top+Math.min(n.height,260)/2),l=r.animate([{transform:"translate(0,0) scale(1) rotate(0deg)",opacity:.9},{transform:`translate(${(o*.5).toFixed(0)}px, ${(s*.5).toFixed(0)}px) scale(.4) rotate(-6deg)`,opacity:.9,offset:.6},{transform:`translate(${o.toFixed(0)}px, ${s.toFixed(0)}px) scale(.05) rotate(4deg)`,opacity:.2}],{duration:700,easing:"cubic-bezier(.3,.7,.3,1)",fill:"forwards"});l.onfinish=()=>{r.remove(),a.classList.add("is-clink"),setTimeout(()=>a.classList.remove("is-clink"),700),k([10,40,20])}}const bc=["So","Mo","Di","Mi","Do","Fr","Sa"];function yc(e){try{const[t,a,n]=V(e||"UTC").split("-").map(Number),i=new Intl.DateTimeFormat("en-CH",{weekday:"short",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)));return bc[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(i)]||null}catch{return null}}function wc(e,t){const a=e&&typeof e.when=="string"?e.when.trim():"";return!a||a.toLowerCase()==="daily"||a.toLowerCase()==="täglich"||!t?!0:a.split(",").map(n=>n.trim().toLowerCase()).includes(t.toLowerCase())}function ki(e,t){if(!e||!Array.isArray(e.steps)||!e.steps.length)return"";const a=e.steps.map((n,i)=>{const r=wc(n,t),o=n.when&&!/^(daily|täglich)$/i.test(n.when)?`<span class="ag-skin-when">${G(n.when)}</span>`:"";return`
      <li class="ag-skin-step${r?"":" is-off"}">
        <span class="ag-skin-num">${i+1}</span>
        <span class="ag-skin-body">
          <span class="ag-skin-name">${G(n.name||"")}${o}</span>
          ${n.note?`<span class="ag-skin-note">${G(n.note)}</span>`:""}
        </span>
      </li>`}).join("");return`
    <div class="ag-skin-block">
      <p class="ag-skin-block-title">${G(e.title||"")}</p>
      <ol class="ag-skin-steps">${a}</ol>
    </div>`}function vc(){const e=document.getElementById("ag-skincare-body");if(!e)return;const t=p.skincare;if(!t||!t.morning&&!t.evening){e.innerHTML='<p class="ag-mini-copy">Noch keine Routine hinterlegt.</p>';return}const a=yc(p.theme&&p.theme.timezone);e.innerHTML=ki(t.morning,a)+ki(t.evening,a)+(t.footer?`<p class="ag-skin-footer">${G(t.footer)}</p>`:"")}function Si(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!1,vc(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),k(10))}function xc(){const e=document.getElementById("ag-skincare-panel");e&&(e.hidden=!0)}const Xe=new WeakMap,Ei=4e3;function Qe(e,t="Sicher? Nochmal tippen",a=Ei){if(!e)return!0;const n=Xe.get(e);if(n)return clearTimeout(n.timer),Xe.delete(e),e.classList.remove("is-armed"),e.innerHTML=n.html,!0;const i=e.innerHTML;e.classList.add("is-armed"),e.textContent=t;const r=setTimeout(()=>{Xe.delete(e),e.classList.remove("is-armed"),e.innerHTML=i},a);return Xe.set(e,{timer:r,html:i}),!1}function kc(e){const t=e&&Xe.get(e);t&&(clearTimeout(t.timer),Xe.delete(e),e.classList.remove("is-armed"),e.innerHTML=t.html)}const Sc=Object.freeze(Object.defineProperty({__proto__:null,ARM_MS:Ei,armConfirm:Qe,disarm:kc},Symbol.toStringTag,{value:"Module"}));function Ec(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const i=e/a;if(i>=.7)return`≈ ${i>=2?Math.round(i):(Math.round(i*10)/10).toString().replace(".",",")}× ${n}`}return null}function hn(e){return e>=2?String(Math.round(e)):(Math.round(e*10)/10).toString().replace(".",",")}function Lc(e){if(!e||e<=0)return null;const t=[[800,"Jakobsweg"],[42.195,"Marathon"],[21.0975,"Halbmarathon"],[10,"10-km-Lauf"]];for(const[a,n]of t){const i=e/a;if(i>=.7)return`≈ ${hn(i)}× ${n}`}return null}function Tc(e,t){if(!e||e<=0||!Array.isArray(t))return null;let a=null;for(const i of t){const r=Number(i&&i.elevation);!Number.isFinite(r)||r<=0||(!a||r>a.h)&&(a={h:r,name:(i.name||"").trim()})}if(!a)return null;const n=e/a.h;return n<.7?null:a.name?`≈ ${hn(n)}× euer höchster Gipfel (${a.name})`:`≈ ${hn(n)}× euer höchster Gipfel`}function Cc(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[i,r]of Object.entries(n))if(a.startsWith("trail/"+i)){a="trail/"+r+a.slice(6+i.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function zc(e){if(!e||!e.includes("alltrails.com"))return null;function t(i){const r=i.indexOf("?"),o=r===-1?i:i.slice(0,r),s=r===-1?"":i.slice(r+1),l=new URLSearchParams(s);return l.set("scrollZoom","false"),l.set("u","m"),l.set("elevationDiagram","false"),o+"?"+l.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const i=e.match(/[?&]sh=([^&#]+)/),r=i?`&sh=${i[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${r}`)}const n=Cc(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function mn(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}function Ac(e){const t=qt();t.unshift(e),Ut(t),_e("gipfelbuch"),mn("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function Mc(e){Ut(qt().filter(t=>t.id!==e)),_e("gipfelbuch"),mn("gipfel-delete",{id:e})}function $c(e,t){const a=qt(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,Ut(a),_e("gipfelbuch"),mn("gipfel-upsert",i)}function Dc(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?el(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),i=n?zc(e.activityUrl):null,r=e.cover?`<div class="ag-gipfel-cover"><img src="${G(e.cover)}" alt="${G(e.name||"")}" loading="lazy" decoding="async"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${G(e.distance)} km`:"",l=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${G(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||l?`<div class="ag-gipfel-stats">${s}${s&&l?" ":""}${l}</div>`:"";t.innerHTML=`
    ${r}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Js(e.date)}</div>
        <div class="ag-gipfel-name">${G(e.name||"—")}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${Na(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${G(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${G(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${G(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&i?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var $;const m=d("[data-ag-berge-form]"),b=d("[data-ag-berge-add]");if(!m)return;const w=d("[data-ag-berge-edit-id]");w&&(w.value=e.id);const T=d("[data-ag-berge-name]");T&&(T.value=e.name||"");const j=d("[data-ag-berge-dist]");j&&(j.value=e.distance||"");const z=d("[data-ag-berge-gain]");z&&(z.value=e.elevGain||e.elevation||"");const v=d("[data-ag-berge-date]");v&&(v.value=e.date||"");const I=d("[data-ag-berge-url]");I&&(I.value=e.activityUrl||"");const C=d("[data-ag-berge-cover]");C&&(C.value=e.cover||"");const D=d("[data-ag-berge-notes]");D&&(D.value=e.notes||"");const x=d("[data-ag-berge-lat]");x&&(x.value=e.lat||"");const _=d("[data-ag-berge-lng]");_&&(_.value=e.lng||"");const N=d("[data-ag-berge-loc-label]");N&&(N.value=e.locLabel||"");const B=d("[data-ag-loc-search]");B&&(B.value=e.locLabel||"");const W=d("[data-ag-berge-form-title]");W&&(W.textContent="Eintrag bearbeiten");const A=d("[data-ag-berge-save] span:last-child");A&&(A.textContent="Speichern"),m.hidden=!1,b&&(b.hidden=!0),($=d("[data-ag-sheet-backdrop]"))==null||$.classList.add("is-open"),m.scrollIntoView({behavior:"smooth",block:"nearest"}),T&&T.focus(),k(8)});const g=t.querySelector("[data-ag-gipfel-delete]");g&&g.addEventListener("click",()=>{Qe(g,"Löschen? Nochmal tippen")&&(Mc(e.id),wt(),k(8),F("Eintrag gelöscht"))});const h=t.querySelector("[data-ag-map-komoot]");h&&h.addEventListener("click",()=>{const m=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(m){if(!m.hidden){m.hidden=!0,h.textContent="🗺 Komoot-Karte";return}m.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,h.textContent="Karte schließen",k(4)}});const y=t.querySelector("[data-ag-map-alltrails]");return y&&i&&y.addEventListener("click",()=>{const m=t.querySelector("[data-ag-map-wrap-alltrails]");if(m){if(!m.hidden){m.hidden=!0,y.textContent="🗺 AllTrails-Karte";return}m.innerHTML=`<iframe src="${G(i)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,y.textContent="Karte schließen",k(4)}}),t}function wt({loading:e=!1}={}){const t=d("[data-ag-berge-list]"),a=d("[data-ag-berge-empty]"),n=d("[data-ag-berge-total]"),i=d("[data-ag-berge-analogy]"),r=d("[data-ag-berge-total-dist]"),o=d("[data-ag-berge-dist-analogy]"),s=d("[data-ag-berge-gipfel-cmp]");if(!t)return;const l=qt().sort((g,h)=>{const y=g.date||"",m=h.date||"";return m<y?-1:m>y?1:0});t.innerHTML="";const c=l.reduce((g,h)=>g+(Number(h.elevGain)||Number(h.elevation)||0),0);if(n&&(n.textContent=c>0?Na(c):"— m"),i){const g=Ec(c);g?(i.textContent=g,i.hidden=!1):i.hidden=!0}const u=l.reduce((g,h)=>{const y=Number(h.distance);return g+(Number.isFinite(y)&&y>0?y:0)},0);if(r&&(r.textContent=u>0?`${Zs(u)} km`:"— km"),o){const g=Lc(u);g?(o.textContent=g,o.hidden=!1):o.hidden=!0}if(s){const g=Tc(c,l);g?(s.textContent=g,s.hidden=!1):s.hidden=!0}if(!l.length){a&&(a.textContent=e?"Gipfel werden geladen …":"Noch kein Gipfel eingetragen. Der erste wartet.",a.classList.toggle("is-loading",e),a.hidden=!1),Li([]);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),l.forEach(g=>t.appendChild(Dc(g))),Li(l)}function _c(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function i(){const r=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");r&&(r.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const r=t.value.trim();if(!r){i();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=5&addressdetails=1`,l=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!l.length){a.hidden=!0;return}l.forEach(c=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=c.display_name,u.addEventListener("click",()=>{const g=e.querySelector("[data-ag-berge-lat]"),h=e.querySelector("[data-ag-berge-lng]"),y=e.querySelector("[data-ag-berge-loc-label]");g&&(g.value=c.lat),h&&(h.value=c.lon),y&&(y.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",r=>{!t.contains(r.target)&&!a.contains(r.target)&&(a.hidden=!0)})}function Nc(){_c(S)}let Se=null,ta=null;function bn(){Se&&setTimeout(()=>Se.invalidateSize(),150)}async function Ic(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function Li(e){const t=d("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await Ic()}catch{return}const n=window.L,i=document.getElementById("ag-gipfel-map");if(!i)return;const r=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!Se){Se=n.map(i).fitBounds(r),n.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',subdomains:"abc",maxZoom:17}).addTo(Se);const s=t.querySelectorAll("[data-map-view]");s.forEach(l=>{l.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),l.classList.add("is-active");const c=l.dataset.mapView==="eu"?o:r;Se.fitBounds(c)})})}ta?ta.clearLayers():ta=n.layerGroup().addTo(Se),a.forEach(s=>{const l=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${G(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Na(u)}</div>`:""}
    `;const g=document.createElement("button");g.type="button",g.textContent="Zum Eintrag",g.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",g.addEventListener("click",()=>{l.closePopup();const h=S.querySelector(`[data-ag-gipfel-id="${s.id}"]`);h&&(h.scrollIntoView({behavior:"smooth",block:"center"}),h.classList.add("ag-gipfel-highlight"),setTimeout(()=>h.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(g),l.bindPopup(c),ta.addLayer(l)}),requestAnimationFrame(()=>{Se&&Se.invalidateSize()}),setTimeout(()=>{Se&&Se.invalidateSize()},250)}const Ti=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}],Pc=5,yn="🌿";function Bc(e=new Date){const t=e.getMonth()+1;return t>=3&&t<=5}function jc(e,t){return e>=Pc&&!kl(t)}function Ci(e){return Ti[Math.min(e-1,Ti.length-1)]}function et(e,t){return e+Math.random()*(t-e)}function zi(){const e=d("#ag-baerlauch-level");e&&(e.textContent=`Level ${p.baerlauch.level}`)}function vt(){p.baerlauch.timerId&&(clearInterval(p.baerlauch.timerId),p.baerlauch.timerId=null)}function Ai(e){const t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),i=d("#ag-baerlauch-photo"),r=d("#ag-baerlauch-text"),o=d("#ag-baerlauch-actions");o&&(o.hidden=!0),vt(),p.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),i&&(i.innerHTML=""),r&&(r.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Mi(q(),p.baerlauch.level,!1),vn()}function Fc(){const e=d("#ag-baerlauch-success"),t=d("#ag-baerlauch-reward"),a=d("#ag-baerlauch-photo"),n=d("#ag-baerlauch-text"),i=d("#ag-baerlauch-actions"),r=d("#ag-baerlauch-next");vt();const o=p.baerlauch.level;p.baerlauch.level+=1;const s=qc(q(),p.baerlauch.level);Mi(q(),p.baerlauch.level,!0),vn(),zi(),s&&ge();let l=!1;const c=Nt();if(jc(o,c)){Sl(c);try{jt(yn)}catch{}try{it()}catch{}try{le()}catch{}try{F(`${yn} Sammeltoken für Level ${o} — in der Token-Bank`)}catch{}l=!0}if(e&&(e.hidden=!1,e.textContent=l?`Level ${o} geschafft, nur guten Bärlauch gesammelt. Dafür gibt es diese Woche ein ${yn}. 💚`:"Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&p.photos&&p.photos.length){const u=yt(),g=u.length?u[Math.floor(Math.random()*u.length)]:null;Do(a,g),t.hidden=!1;const h=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=h[Math.floor(Math.random()*h.length)]}r&&(r.textContent=`Level ${p.baerlauch.level} starten`),i&&(i.hidden=!1)}function Oc(e){const t=d("#ag-baerlauch-timer"),a=d("#ag-baerlauch-darkness"),i=Ci(p.baerlauch.level).timeMs;p.baerlauch.durationMs=i,p.baerlauch.startedAt=performance.now(),vt(),p.baerlauch.timerId=setInterval(()=>{const r=performance.now()-p.baerlauch.startedAt,o=Math.max(0,i-r),s=Math.min(1,r/i);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const l=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);l.forEach(u=>{u.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,u.style.opacity=String(1-c*.28)}),o<=0&&(vt(),e())},50)}function wn(){const e=d("#ag-baerlauch-panel"),t=d("#ag-baerlauch-field"),a=d("#ag-baerlauch-success"),n=d("#ag-baerlauch-reward"),i=d("#ag-baerlauch-photo"),r=d("#ag-baerlauch-text"),o=d("#ag-baerlauch-actions");if(!e||!t||!a||!n||!i||!r)return;if(e.hidden=!1,vn(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),p.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,i.innerHTML="",r.textContent="",o&&(o.hidden=!0),zi();const s=Ci(p.baerlauch.level),l=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...l.slice(0,s.good).map(y=>({emoji:y,good:!0})),...c.slice(0,s.bad).map(y=>({emoji:y,good:!1}))];let g=0;const h=u.filter(y=>y.good).length;u.forEach(y=>{const m=document.createElement("button");m.type="button",m.className="ag-forage-item",m.textContent=y.emoji,m.dataset.good=y.good?"true":"false",m.style.left=`${et(8,82)}%`,m.style.top=`${et(10,72)}%`,m.style.setProperty("--dx",`${et(-320,320)}px`),m.style.setProperty("--dy",`${et(-220,220)}px`),m.style.setProperty("--dur",`${et(s.speedMin,s.speedMax)}s`),m.style.setProperty("--delay",`${et(-1.8,0)}s`),m.addEventListener("click",()=>{p.baerlauch.locked||(m.dataset.good==="true"?(m.classList.add("is-picked"),m.disabled=!0,g+=1,setTimeout(()=>m.remove(),140),g===h&&Fc()):Ai("poison"))}),t.appendChild(m)}),Oc(()=>Ai("timeout"))}function Wc(){const e=d("#ag-baerlauch-panel");vt(),e&&(e.hidden=!0)}function qc(e,t){var i;const a=qa(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=(i=p.backup)==null?void 0:i.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Mi(e,t,a){var o;const n=Er(),i=((o=p.theme)==null?void 0:o.timezone)||"UTC",r=V(i);n.unshift({date:r,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function vn(){var u;const e=d("#ag-baerlauch-scores");if(!e)return;const t="lennart",a="Fionn",n=qa(),i=Er(),r="fionn",o=t in n||r in n;if(!o&&!i.length){e.hidden=!0;return}e.hidden=!1;const s=((u=p.theme)==null?void 0:u.timezone)||"UTC",l=g=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:s}).format(new Date(g+"T12:00:00Z"))}catch{return g}};let c="";if(o){const g=n[t]??0,h=n[r]??0;c+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${g||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${a}</span><span class="ag-score-result">Level ${h||"—"}</span></div>
    </div>`}if(i.length){const g=i.slice(0,8).map(h=>{const y=h.player===t,m=y?"ag-score-mine":"ag-score-theirs",b=y?"Du":a,w=h.won?`✓ Level ${h.level}`:`✗ Level ${h.level-1>=1?h.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${l(h.date)}</span><span class="ag-score-pill ${m}">${b}</span><span class="ag-score-result">${w}</span></div>`}).join("");c+=`<div class="ag-score-table">${g}</div>`}e.innerHTML=c}const O={recorder:null,audioBlob:null,lang:"swabian"};function aa(){try{return JSON.parse(window.localStorage.getItem(cr)||"[]")||[]}catch{return[]}}function na(e){try{window.localStorage.setItem(cr,JSON.stringify(e))}catch{}}function $i(e){const t=aa();t.unshift(e),na(t),_e("glossary"),xn("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Uc(e,t){const a=aa(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,na(a),_e("glossary"),xn("glossary-upsert",i)}function Rc(e){na(aa().filter(t=>t.id!==e)),_e("glossary"),xn("glossary-delete",{id:e})}let ra=!1;async function Di(){const e=p.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=q(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,i=setTimeout(()=>n.abort(),12e3);let r;try{r=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(i)}if(!r.ok)return 0;const o=await r.json();return!o.ok||!Array.isArray(o.glossary)?0:(Ja("glossary")||na(o.glossary.filter(s=>s.id)),o.glossary.length)}catch{return 0}}function xn(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:q(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function kn(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Hc(e,t){const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return kn(e);try{const n=await kn(e),i=n.split(",")[1],r=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:q(),filename:`glossary-${t}.webm`,mimeType:r,data:i}),l=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return l.ok&&l.url?l.url:n}catch{return kn(e)}}const Gc={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang",kapsel:"Kapsel"};function Kc(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${G(Gc[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${G(e.word||"—")}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${G(e.meaning)}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${G(e.id)}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${G(e.id)}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${G(e.id)}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const i=a.querySelector("[data-ag-glossary-play]");i&&e.audioUrl&&i.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),k(6)});const r=a.querySelector("[data-ag-glossary-edit]");r&&r.addEventListener("click",()=>{var h;const s=document.getElementById("ag-glossary-form"),l=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const g=document.getElementById("ag-glossary-audio-status");g&&(g.textContent=e.audioUrl?"Aufnahme vorhanden":""),O.audioBlob=null,s.hidden=!1,l&&(l.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(h=document.getElementById("ag-glossary-word-input"))==null||h.focus(),k(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{Qe(o,"Löschen? Nochmal tippen")&&(Rc(e.id),qe(O.lang),k(8))}),a}function qe(e){var o;O.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===O.lang)}),_i();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),i=aa(),r=n?i.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):i.filter(s=>s.lang===O.lang);if(t.innerHTML="",!r.length){a&&(a.textContent=n?"Kein Treffer.":ra?"Wörter werden geladen …":"Noch kein Wort hier. Füg eins hinzu.",a.classList.toggle("is-loading",ra&&!n),a.hidden=!1);return}a&&(a.hidden=!0,a.classList.remove("is-loading")),r.forEach(s=>t.appendChild(Kc(s,!!n)))}function _i(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function Ni(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),O.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),ra=!0,qe("swabian"),window.requestAnimationFrame(()=>_i()),k(10),Di().catch(()=>0).then(()=>{ra=!1,qe(O.lang)})}function Yc(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),O.audioBlob=null,O.recorder&&O.recorder.state!=="inactive")try{O.recorder.stop()}catch{}O.recorder=null}const Ii=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],Pi=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function Bi(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(Ge)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(Ge,"granted")}catch{}await En();return}if(e==="denied"){try{window.localStorage.setItem(Ge,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"),t.classList.add("is-floating"))}function Vc(){var s;const e=((s=p.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),i=a*60+n,r=8*60,o=i<r?r-i:24*60-i+r;return Date.now()+o*60*1e3}async function Sn(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=p.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=q(),i=V(a);if(R().some(g=>g.token===n&&g.day===i)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=ut(a);if(o>=21)return;const l=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=xa(),u=Pi[br(Pi)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,l),title:u.title.replace("{name}",c),body:u.body.replace("{name}",c)})}catch{}}async function Jc(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,i=xa(),r=Ii[br(Ii)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Vc(),title:r.title.replace("{name}",i),body:r.body.replace("{name}",i)}),(t=p.quest)!=null&&t.enabled&&ni()){const o=ft(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==It(p)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(It(p)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:p.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:p.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Zc(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function En(){if("serviceWorker"in navigator)try{const e=new URL("sw.js",tn()).toString();if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await Jc(),await Sn(),await Zc(),await eg())}catch(e){console.warn("[ag] service worker registration failed:",e&&e.message)}}async function Xc(){const e=d("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Ge,"dismissed")}catch{}return}try{window.localStorage.setItem(Ge,"granted")}catch{}await En()}function Qc(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),i=new Uint8Array(n.length);for(let r=0;r<n.length;r++)i[r]=n.charCodeAt(r);return i}async function eg(){const e=p.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Qc(e.vapidPublicKey)}));const n=p.backup&&p.backup.endpointUrl||"";if(!n)return;const i=JSON.stringify({type:"push-subscribe",token:q(),subscription:a.toJSON()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i};fetch(n,r).catch(()=>fetch(n,{...r,mode:"no-cors"}).catch(()=>{}))}catch(t){console.warn("[ag] push subscription failed:",t&&t.message)}}const ji="wss://broker.hivemq.com:8884/mqtt",ia="picolight_lf26/events",Fi="web_app",oa=10,sa=17/29,tg={jackpot:{pos:0/29,w:0},special:{pos:0/29,w:0},rare:{pos:25/29,w:0},quest:{pos:12/29,w:0},cursed:{pos:4/29,w:0},uncommon:{pos:14/29,w:0},photo:{pos:sa,w:1},quiet:{pos:1/29,w:.3}},Oi=18e3,Wi=420,qi=6,Ui=Wi*qi,Ln=1600;function Ri(e){const t=tg[e]||{pos:sa,w:0},a=t.w>=1?{pos:sa,w:0}:{pos:t.pos,w:1},n={pos:t.pos,w:t.w},i=[{...n,size:3},{...a,size:2},{...n,size:3},{...a,size:2}],r=[{...a,size:2},{...n,size:3},{...a,size:2},{...n,size:3}],o=[];for(let l=0;l<qi;l++)o.push({at:l*Wi,payload:{on:!0,fade_steps:6,brightness:1,groups:l%2?r:i}});o.push({at:Ui,payload:{on:!0,fade_steps:40,brightness:1,groups:[{...n,size:oa}]}});const s=e==="jackpot"||e==="special"?{pos:29/29,w:0}:e==="rare"?{pos:8/29,w:0}:null;if(s){let l=!1;for(let c=Ui+Ln;c<Oi-Ln;c+=Ln)l=!l,o.push({at:c,payload:{on:!0,fade_steps:60,groups:[{...l?s:n,size:oa}]}})}return o}const Hi=2500,tt=["board_a","board_b"];let Ne=!1;function la(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function Gi(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}function ag(e){return Qi(Ri(e),Oi,null)}const Ki={"🥹":{pos:25/29,w:0},"😂":{pos:0/29,w:0},"🙃":{pos:sa,w:0}},Yi=1e4;function Vi(e){return[{at:0,payload:{on:!0,fade_steps:20,brightness:1,groups:[{...Ki[e]||{pos:.06896551724137931,w:.3},size:oa}]}},{at:2200,payload:{fade_steps:60,brightness:.45}},{at:4400,payload:{fade_steps:60,brightness:1}},{at:6600,payload:{fade_steps:60,brightness:.45}},{at:8800,payload:{fade_steps:60,brightness:1}}]}function ng(e,t="board_a"){return Qi(Vi(e),Yi,t)}const Ji=3200,Zi={pos:1/29,w:.12};function Xi(e=Math.random){const t=[{...Zi,size:oa}],a=()=>(e()-.5)*.08;return[{at:0,payload:{on:!0,fade_steps:70,brightness:.3+a(),groups:t}},{at:900,payload:{fade_steps:60,brightness:.42+a()}},{at:1700,payload:{fade_steps:50,brightness:.26+a()}},{at:2400,payload:{fade_steps:60,brightness:.38+a()}}]}function rg(){let e=!1,t=null;return ig(()=>Xi(),Ji,a=>{t=a,e&&a()}).catch(()=>{}),()=>{e=!0,t&&t()}}async function ig(e,t,a){if(Ne){a(()=>{});return}Ne=!0;try{await la(),await new Promise(n=>{const i=window.mqtt.connect(ji,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),r={};let o=!1,s=!1,l=[],c=null;const u=()=>{if(!s){s=!0;try{i.end(!0)}catch{}n()}},g=m=>{m.from=Fi;try{i.publish(ia,JSON.stringify(m))}catch{}},h=()=>{for(const m of l)clearTimeout(m);l=[];for(const m of e())l.push(setTimeout(()=>g({...m.payload}),m.at));c=setTimeout(h,t)},y=()=>{clearTimeout(c);for(const m of l)clearTimeout(m);if(l=[],!o){u();return}o=!1;for(const m of tt){const b=r[m]||r[tt.find(T=>T!==m)];if(!b)continue;const w={target:m,...Gi(b)};b.on===!1?(g({...w,on:!0}),setTimeout(()=>g({target:m,on:!1}),1500)):g({...w,on:!0})}setTimeout(u,2500)};i.on("connect",()=>{i.subscribe(ia,m=>{if(m){u(),a(()=>{});return}g({nudge:!0}),setTimeout(()=>{if(!s){if(!Object.keys(r).length){u(),a(()=>{});return}o=!0,h(),a(y)}},Hi)})}),i.on("message",(m,b)=>{try{const w=JSON.parse(b.toString());w.from&&tt.includes(w.from)&&Array.isArray(w.groups)&&!o&&(r[w.from]=w)}catch{}}),i.on("error",()=>{o||(u(),a(()=>{}))}),i.on("close",()=>{o||(u(),a(()=>{}))})})}catch{a(()=>{})}finally{Ne=!1}}const og=e=>new Promise(t=>setTimeout(t,e));async function Qi(e,t,a){if(Ne&&a){const n=Date.now()+25e3;for(;Ne&&Date.now()<n;)await og(500)}if(!Ne){Ne=!0;try{await la(),await new Promise((n,i)=>{const r=window.mqtt.connect(ji,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),o={};let s=!1,l=null,c=[],u=!1;const g=()=>{if(!u){u=!0,document.removeEventListener("visibilitychange",m);try{r.end(!0)}catch{}n()}},h=b=>{b.from=Fi;try{r.publish(ia,JSON.stringify(b))}catch{}},y=()=>{clearTimeout(l);for(const b of c)clearTimeout(b);if(c=[],!s){g();return}s=!1;for(const b of a?[a]:tt){const w=o[b]||o[tt.find(j=>j!==b)];if(!w)continue;const T={target:b,...Gi(w)};w.on===!1?(h({...T,on:!0}),setTimeout(()=>h({target:b,on:!1}),1500)):h({...T,on:!0})}setTimeout(g,2500)},m=()=>{document.visibilityState==="hidden"&&s&&y()};document.addEventListener("visibilitychange",m),r.on("connect",()=>{r.subscribe(ia,b=>{if(b){g();return}h({nudge:!0}),setTimeout(()=>{if(!Object.keys(o).length){g();return}s=!0;for(const w of e)c.push(setTimeout(()=>h(a?{...w.payload,target:a}:w.payload),w.at));l=setTimeout(y,t)},Hi)})}),r.on("message",(b,w)=>{try{const T=JSON.parse(w.toString());T.from&&tt.includes(T.from)&&Array.isArray(T.groups)&&!s&&(o[T.from]=T)}catch{}}),r.on("error",()=>{s||g()}),r.on("close",()=>{s||g()}),setTimeout(()=>i(new Error("lights flash timed out")),t+2e4)})}catch{}finally{Ne=!1}}}const da=Object.freeze(Object.defineProperty({__proto__:null,CANDLE_PERIOD_MS:Ji,CANDLE_TINT:Zi,REACTION_LIGHT:Ki,REACTION_MS:Yi,candleCycle:Xi,choreography:Ri,flashLightsForPull:ag,flashReactionOnLamp:ng,loadMqtt:la,reactionChoreography:Vi,startCandleLights:rg},Symbol.toStringTag,{value:"Module"})),sg="wss://broker.hivemq.com:8884/mqtt",xt="picolight_lf26",de=10,ue=[{id:"board_a",name:"Fionns Lampe",owner:"Fionn",short:"FF"},{id:"board_b",name:"Lennarts Lampe",owner:"Lennart",short:"LS"}],lg="web_app",kt=1500,dg=15e4,ca=[[255,200,80],[255,160,0],[255,120,0],[255,60,0],[255,0,0],[255,0,60],[255,0,140],[200,0,200],[140,0,255],[80,0,255],[0,0,255],[0,60,255],[0,140,255],[0,200,255],[0,255,220],[0,255,160],[0,255,80],[0,220,0],[80,255,0],[160,255,0],[220,255,0],[255,240,0],[255,180,40],[255,100,80],[255,80,160],[180,40,255],[40,100,255],[0,180,180],[20,255,120],[255,220,120]],ga=(e,t,a)=>e+(t-e)*a;function cg(e){const a=Math.min(Math.max(Number(e)||0,0),.9999)*(ca.length-1),n=Math.floor(a),i=a-n,r=ca[n],o=ca[Math.min(n+1,ca.length-1)];return[0,1,2].map(s=>Math.round(ga(r[s],o[s],i)))}function ua(e){const[t,a,n]=cg(e.pos),i=Math.min(Math.max(Number(e.w)||0,0),1);return[Math.round(ga(t,255,i)),Math.round(ga(a,244,i)),Math.round(ga(n,225,i))]}function at(e,t=0){return[{pos:e,w:t,size:de}]}const nt=de;function Ie(e){let t=(Array.isArray(e)?e:[]).map(n=>({pos:Math.min(1,Math.max(0,Number(n&&n.pos)||0)),w:Math.min(1,Math.max(0,Number(n&&n.w)||0)),size:Math.max(1,Math.round(Number(n&&n.size)||1))})).slice(0,nt);if(!t.length)return at(0,1);let a=t.reduce((n,i)=>n+i.size,0);for(;a>de;){const n=t[t.length-1];n.size>1?(n.size--,a--):(t.pop(),a=t.reduce((i,r)=>i+r.size,0))}return a<de&&(t[t.length-1].size+=de-a),t}function pa(e){const t=[];let a=0;for(const n of Ie(e).slice(0,-1))a+=n.size,t.push(a);return t}function eo(e,t){let a=0;const n=Ie(e);for(let i=0;i<n.length;i++)if(a+=n[i].size,t<a)return i;return n.length-1}function Tn(e,t){const a=Ie(t),i=[0,...[...new Set(e.filter(r=>Number.isInteger(r)&&r>0&&r<de))].sort((r,o)=>r-o).slice(0,nt-1),de];return i.slice(0,-1).map((r,o)=>{const s=a[eo(a,r)];return{pos:s.pos,w:s.w,size:i[o+1]-r}})}function gg(e,t){const a=pa(e),n=a.indexOf(t);return n>=0?a.splice(n,1):a.push(t),Tn(a,e)}function ug(e,t){const a=Ie(e),n=Math.min(Math.max(t,0),a.length-1);if(a[n].size<2||a.length>=nt)return a;let i=0;for(let r=0;r<n;r++)i+=a[r].size;return Tn([...pa(a),i+Math.ceil(a[n].size/2)],a)}function pg(e,t){const a=Ie(e);if(a.length<2)return a;const n=Math.min(Math.max(t,0),a.length-1),i=pa(a),r=n<a.length-1?i[n]:i[n-1];return Tn(i.filter(o=>o!==r),a)}function to(e,t,a,n){const i=Ie(e);return t==null?i.map(r=>({...r,pos:a===void 0?r.pos:a,w:n===void 0?r.w:n})):i.map((r,o)=>o===t?{...r,pos:a===void 0?r.pos:a,w:n===void 0?r.w:n}:r)}const fg=[{id:"warm",label:"Warm",emoji:"🕯",brightness:.55,groups:[{pos:0,w:.75,size:de}]},{id:"weiss",label:"Weiß",emoji:"💡",brightness:.8,groups:[{pos:0,w:1,size:de}]},{id:"wald",label:"Wald",emoji:"🌿",brightness:.7,groups:[{pos:17/29,w:0,size:de}]},{id:"gold",label:"Gold",emoji:"✨",brightness:.8,groups:[{pos:0,w:0,size:5},{pos:29/29,w:0,size:5}]},{id:"abend",label:"Abendrot",emoji:"🌇",brightness:.65,groups:[{pos:2/29,w:0,size:4},{pos:23/29,w:0,size:3},{pos:24/29,w:0,size:3}]},{id:"meer",label:"Meer",emoji:"🌊",brightness:.6,groups:[{pos:13/29,w:0,size:5},{pos:27/29,w:.2,size:5}]},{id:"nacht",label:"Nacht",emoji:"🌙",brightness:.18,groups:[{pos:10/29,w:0,size:de}]}];function hg(e){return{on:!0,fade_steps:40,brightness:e.brightness,groups:e.groups.map(t=>({...t}))}}function ao(e){let t=Array.isArray(e.groups)&&e.groups.length?e.groups:null;if(!t&&Array.isArray(e.groupPositions)){const a=[0,...(e.boundaries||[]).slice().sort((n,i)=>n-i),de];t=a.slice(0,-1).map((n,i)=>({pos:e.groupPositions[i]??0,w:(e.groupWLevels||[])[i]??1,size:a[i+1]-n}))}return t||(t=at(0,1)),{on:e.on!==!1,brightness:typeof e.brightness=="number"?e.brightness:.6,fade_steps:typeof e.fadeSteps=="number"?e.fadeSteps:60,groups:t.map(a=>({pos:Number(a.pos)||0,w:Number(a.w)||0,size:Math.max(1,Number(a.size)||1)}))}}function mg(e){const a=[{at:0,payload:{on:!0,brightness:1,fade_steps:6,groups:at(.5862068965517241,0)}},{at:450,payload:{brightness:.12,fade_steps:6}},{at:900,payload:{brightness:1,fade_steps:6}},{at:1350,payload:{brightness:.12,fade_steps:6}},{at:1800,payload:{brightness:1,fade_steps:6}}];return e?(a.push({at:2700,payload:{on:!0,groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps}}),e.on===!1&&a.push({at:4200,payload:{on:!1}})):a.push({at:2700,payload:{on:!1}}),a}let J=null,Ue=null,St=0,fa=0,rt="",Et=null,we=0;const Z={};let Pe=[],Ee=[],Lt=[],Ce="",Y=null,ee="idle";function no(){return`${xt}/events`}function bg(){return`${xt}/status/+`}function Cn(){return`${xt}/scenes`}function ha(){return`${xt}/alarms`}function zn(e,t=Date.now()){const a=Z[e];return!a||a.online===!1?!1:a.online===!0?!0:!!(a.seenAt&&t-a.seenAt<dg)}function An(){return Object.values(Z).filter(e=>e.groups).sort((e,t)=>(t.seenAt||0)-(e.seenAt||0))[0]||null}function Be(e){ee=e,pe()}function yg(){if(J&&J.connected)return Be("connected"),Promise.resolve(J);if(Ue)return Ue;const e=++St;return Be("connecting"),Ue=la().then(()=>new Promise((t,a)=>{const n=window.mqtt.connect(sg,{clientId:"gacha_licht_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:1e4,reconnectPeriod:4e3,keepalive:30});J=n;const i=()=>e===St&&J===n;let r=!1;const o=s=>{r||(r=!0,s?t(n):a(new Error(rt||"licht: no connection")))};n.on("connect",()=>{i()&&(fa=Date.now(),rt="",n.subscribe([no(),bg(),Cn(),ha()],()=>{}),Te({nudge:!0}),Be("connected"),o(!0))}),n.on("message",(s,l)=>{i()&&vg(s,l)}),n.on("reconnect",()=>{i()&&ee!=="connected"&&Be("connecting")}),n.on("offline",()=>{i()&&Be("error")}),n.on("error",s=>{i()&&(rt=s&&s.message||"error",Be("error"))}),n.on("close",()=>{i()&&Be("error")}),setTimeout(()=>o(!!n.connected),15e3)})).catch(t=>{throw e===St&&(rt=t&&t.message||"load",Be("error")),t}).finally(()=>{e===St&&(Ue=null)}),Ue}function ro(){if(St++,Ue=null,J)try{J.end(!0)}catch{}J=null,ee="idle",fa=0,Et&&(clearInterval(Et),Et=null),pe()}function wg(){Et||(Et=setInterval(()=>{J&&J.connected&&Te({ping:!0}),pe()},6e4))}function vg(e,t){let a;try{a=JSON.parse(t.toString())}catch{return}const n=String(e);if(n.startsWith(`${xt}/status/`)){const r=n.split("/").pop();Z[r]={...Z[r]||{},online:!!a.online},a.online&&(Z[r].seenAt=Date.now()),pe();return}if(n===ha()){if(Array.isArray(a)){Ee=a.filter(o=>o&&typeof o=="object");const r=Re(Ee);if(r&&Number.isInteger(r.lh)){const[o,s]=fo(r.lh,r.lm||0);if((r.hour!==o||r.minute!==s)&&(r.hour=o,r.minute=s,J&&J.connected))try{J.publish(ha(),JSON.stringify(Ee),{retain:!0,qos:1}),Te({set_alarms:Ee})}catch{}}}pe();return}if(n===Cn()){const r=Array.isArray(a.scenes)?a.scenes:[];Lt=(Array.isArray(a.deleted)?a.deleted:[]).filter(s=>typeof s=="string").slice(-50);const o=new Set(Lt);Pe=r.filter(s=>s&&typeof s=="object"&&s.name&&!o.has(s.id)),pe();return}if(!a.from||!ue.some(r=>r.id===a.from))return;const i=Z[a.from]={...Z[a.from]||{},seenAt:Date.now()};if(Date.now()<we){pe();return}a.on!==void 0&&(i.on=!!a.on),typeof a.brightness=="number"&&(i.brightness=a.brightness),typeof a.fade_steps=="number"&&(i.fade_steps=a.fade_steps),Array.isArray(a.groups)&&(i.groups=a.groups),pe()}function Te(e){if(!J||!J.connected)return!1;try{return J.publish(no(),JSON.stringify({...e,from:lg})),!0}catch{return!1}}function je(e,t=Ce||null){we=Date.now()+kt;const a=t?[t]:ue.map(i=>i.id);for(const i of a){const r=Z[i]={...Z[i]||{}};e.on!==void 0&&(r.on=!!e.on),typeof e.brightness=="number"&&(r.brightness=e.brightness),typeof e.fade_steps=="number"&&(r.fade_steps=e.fade_steps),Array.isArray(e.groups)&&(r.groups=e.groups)}const n=Te(t?{...e,target:t}:e);return n||F("Keine Verbindung zu den Lampen"),pe(),n}function io(){return ue.some(e=>Z[e.id]&&Z[e.id].on)}function xg(e){je({on:!!e}),k(8)}function kg(e){je({brightness:Math.min(1,Math.max(.02,e))})}function ze(){const e=Ce&&Z[Ce]||An();return Ie(e&&e.groups?e.groups:at(0,1))}function oo(e){const t=ze();Y=e==null||e<0||e>=t.length||e===Y?null:e,pe()}function Tt(e){const t=Ie(e);Y!==null&&Y>=t.length&&(Y=null),je({on:!0,fade_steps:30,groups:t})}function Mn(e,t){const a=ze(),n=a.length===1&&Y===null;Tt(n?at(e,0):to(a,Y,e,t)),k(6)}function Sg(e){Tt(to(ze(),Y,void 0,Math.min(1,Math.max(0,e))))}function Eg(e){Tt(gg(ze(),e)),k(6)}function Lg(){const e=ze(),t=Y!==null?Y:e.reduce((n,i,r)=>i.size>e[n].size?r:n,0),a=ug(e,t);if(a.length===e.length){F(e.length>=nt?"Mehr Gruppen gibt die Leiste nicht her":"Diese Gruppe ist schon ein einzelnes Licht");return}Y=t,Tt(a),k(6)}function Tg(){const e=ze();if(e.length<2)return;const t=Y!==null?Y:e.length-1;Tt(pg(e,t)),Y!==null&&(Y=Math.min(t,ze().length-1)),k(6)}function Cg(e){je(hg(e)),k([8,20,8]),F(`${e.emoji} ${e.label}`)}function zg(e){je(ao(e)),k([8,20,8]),F(`✓ ${e.name}`)}function Ag(e){je({fade_steps:Math.round(Math.min(600,Math.max(10,e)))})}function Mg(e){Ce=ue.some(t=>t.id===e)?e:"",pe()}function $g(e){const t=Z[e],a=!!(t&&t.on!==!1);je({on:!a},e),k(8)}function Dg(e=Math.random){const t=2+Math.floor(e()*3),a=new Set;for(;a.size<t-1;)a.add(1+Math.floor(e()*(de-1)));const n=[0,...[...a].sort((i,r)=>i-r),de];return n.slice(0,-1).map((i,r)=>({pos:Math.round(e()*29)/29,w:e()<.2?Math.round(e()*60)/100:0,size:n[r+1]-i}))}function _g(){je({on:!0,fade_steps:40,groups:Dg()}),k([6,20,6])}function Ng(e,t,a=Date.now()){const n=(t&&Array.isArray(t.groups)&&t.groups.length?t.groups:at(0,1)).map(o=>({pos:Number(o.pos)||0,w:Number(o.w)||0,size:Math.max(1,Math.round(Number(o.size)||1))})),i=[];let r=0;for(const o of n.slice(0,-1))r+=o.size,r>0&&r<de&&i.push(r);return{id:a.toString(36)+"-"+Math.random().toString(36).slice(2,8),updated:a,name:e,groups:n,boundaries:i,groupPositions:n.map(o=>o.pos),groupWLevels:n.map(o=>o.w),brightness:t&&typeof t.brightness=="number"?t.brightness:.6,fadeSteps:t&&typeof t.fade_steps=="number"?t.fade_steps:60,on:!(t&&t.on===!1)}}function Ig(e){const t=String(e||"").trim().slice(0,32);if(!t)return F("Der Szene fehlt ein Name"),!1;if(!J||!J.connected)return F("Keine Verbindung zu den Lampen"),!1;const a=Ng(t,An()),n=Pe.filter(i=>i.name===t&&i.id).map(i=>i.id);Lt=[...Lt,...n].slice(-50),Pe=[...Pe.filter(i=>i.name!==t),a];try{J.publish(Cn(),JSON.stringify({v:1,from:"gacha_app",scenes:Pe,deleted:Lt}),{retain:!0,qos:1})}catch{return F("Szene konnte nicht gesichert werden"),!1}return k([8,20,8]),F(`✓ „${t}“ gesichert — auch auf der grossen Seite`),pe(),!0}let $n=[];function so(){return(Ce?[Ce]:ue.map(t=>t.id)).filter(t=>zn(t))}function lo(e){return e.map(t=>(ue.find(a=>a.id===t)||{}).owner||t).join(" + ")}function Pg(e=so()){const t=Array.isArray(e)?e:[e];if(!t.length)return F("Gerade ist keine Lampe erreichbar"),!1;for(const a of $n)clearTimeout(a);$n=[],we=Date.now()+5e3;for(const a of t){const n=Z[a]&&Z[a].groups?{...Z[a]}:null;for(const i of mg(n))$n.push(setTimeout(()=>Te({...i.payload,target:a}),i.at))}return k([12,40,12,40,12]),F(t.length>1?"👋 Beide Lampen winken":`👋 ${lo(t)}s Lampe winkt`),!0}const co=14,go=110;function Bg(e,t){const a=(Array.isArray(e)?e:[]).map(s=>Math.max(0,Number(s)||0)).slice(0,co),n=[],i={on:!0,brightness:1,fade_steps:1},r={brightness:.06,fade_steps:1};t&&t.groups&&(i.groups=t.groups);for(const s of a)n.push({at:s,payload:i}),n.push({at:s+go,payload:r});const o=(a.length?a[a.length-1]:0)+go+700;return t&&t.groups?(n.push({at:o,payload:{on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}}),t.on===!1&&n.push({at:o+1200,payload:{on:!1}})):n.push({at:o,payload:{brightness:.6,fade_steps:30}}),n}let Dn=[];function jg(e,t=so()){const a=Array.isArray(t)?t:[t];if(!e||!e.length)return!1;if(!a.length)return F("Gerade ist keine Lampe erreichbar"),!1;for(const i of Dn)clearTimeout(i);Dn=[];let n=0;for(const i of a){const r=Z[i]&&Z[i].groups?{...Z[i]}:null,o=Bg(e,r);n=Math.max(n,o[o.length-1].at);for(const s of o)Dn.push(setTimeout(()=>Te({...s.payload,target:i}),s.at))}return we=Date.now()+n+500,k(e.map(()=>18)),F(`🥁 ${e.length} ${e.length===1?"Schlag":"Schläge"} unterwegs — ${a.length>1?"beide Lampen":lo(a)+"s Lampe"}`),!0}const uo=1e3;function Fg(){return[{at:0,payload:{on:!0,brightness:1,fade_steps:4}},{at:180,payload:{brightness:.3,fade_steps:6}},{at:320,payload:{brightness:.85,fade_steps:4}},{at:520,payload:{brightness:.22,fade_steps:10}}]}let Ct=null,_n=[],zt=null;function Og(){if(Ct)return!1;if(!J||!J.connected)return F("Keine Verbindung zu den Lampen"),!1;zt={};for(const t of ue)Z[t.id]&&Z[t.id].groups&&(zt[t.id]={...Z[t.id]});const e=()=>{we=Date.now()+uo+kt;for(const t of Fg())_n.push(setTimeout(()=>Te(t.payload),t.at))};return e(),Ct=setInterval(e,uo),k([20,120,20]),S&&S.classList.add("is-pulsing"),!0}function po(){if(Ct){clearInterval(Ct),Ct=null;for(const e of _n)clearTimeout(e);_n=[];for(const e of ue){const t=zt&&zt[e.id];t&&(Te({target:e.id,on:!0,groups:t.groups,brightness:t.brightness,fade_steps:t.fade_steps}),t.on===!1&&setTimeout(()=>Te({target:e.id,on:!1}),1500))}zt=null,we=Date.now()+2500,S&&S.classList.remove("is-pulsing")}}const Nn={werktags:[0,1,2,3,4],taeglich:[0,1,2,3,4,5,6],wochenende:[5,6]};function fo(e,t,a=new Date){const n=new Date(a);return n.setHours(e,t,0,0),[n.getUTCHours(),n.getUTCMinutes()]}function Wg(e,{time:t="07:00",days:a="werktags",boards:n,enabled:i=!0,durationMin:r=20}={}){const[o,s]=String(t).split(":").map(h=>parseInt(h,10)),[l,c]=fo(Number.isInteger(o)?o:7,Number.isInteger(s)?s:0),u=(Array.isArray(e)?e:[]).filter(h=>!(h&&h.gacha==="sunrise")),g={gacha:"sunrise",enabled:!!i,type:"sunrise",hour:l,minute:c,lh:Number.isInteger(o)?o:7,lm:Number.isInteger(s)?s:0,duration_min:r,brightness:.9,days:Nn[a]||Nn.werktags,boards:Array.isArray(n)&&n.length?n:ue.map(h=>h.id)};return[...u,g]}function Re(e){return(Array.isArray(e)?e:[]).find(t=>t&&t.gacha==="sunrise")||null}function In(e){const t=JSON.stringify((e||[]).slice().sort());for(const[a,n]of Object.entries(Nn))if(JSON.stringify(n)===t)return a;return"werktags"}function qg(e){if(!J||!J.connected)return F("Keine Verbindung zu den Lampen"),!1;try{J.publish(ha(),JSON.stringify(e),{retain:!0,qos:1}),Te({set_alarms:e})}catch{return F("Wecker konnte nicht gestellt werden"),!1}return Ee=e,!0}function Pn({enabled:e,time:t,days:a,retarget:n=!1}={}){const i=Re(Ee)||{},r=Ce?[Ce]:ue.map(l=>l.id),o=Wg(Ee,{time:t||(Number.isInteger(i.lh)?`${String(i.lh).padStart(2,"0")}:${String(i.lm||0).padStart(2,"0")}`:"07:00"),days:a||In(i.days),boards:n||!Array.isArray(i.boards)||!i.boards.length?r:i.boards,enabled:e===void 0?i.enabled!==!1:e});if(!qg(o))return!1;const s=Re(o);return k([8,20,8]),F(s.enabled?`🌅 Sonnenaufgang um ${String(s.lh).padStart(2,"0")}:${String(s.lm).padStart(2,"0")} gestellt`:"🌅 Sonnenaufgang aus"),pe(),!0}let ho=!1,mo=null;function Bn(){pe(),Ug(),yg().catch(()=>{}),wg()}function Ug(){if(ho||!S)return;ho=!0;const e=d("[data-ag-licht-power]");e&&e.addEventListener("click",()=>xg(!io()));const t=d("[data-ag-licht-brightness]");t&&t.addEventListener("input",()=>{we=Date.now()+kt,clearTimeout(mo),mo=setTimeout(()=>kg(Number(t.value)/100),120)});const a=d("[data-ag-licht-palette]");if(a){const A=U=>{const oe=a.getBoundingClientRect();if(!oe.width)return;const ne=(U.clientX??(U.touches&&U.touches[0]?U.touches[0].clientX:0))-oe.left;Mn(Math.min(1,Math.max(0,ne/oe.width)))};let $=!1,H=0;a.addEventListener("pointerdown",U=>{$=!0;try{a.setPointerCapture(U.pointerId)}catch{}A(U),H=Date.now()}),a.addEventListener("pointermove",U=>{!$||Date.now()-H<110||(H=Date.now(),A(U))});const te=()=>{$=!1};a.addEventListener("pointerup",te),a.addEventListener("pointercancel",te),a.addEventListener("keydown",U=>{const oe=Number(a.dataset.pos||0);U.key==="ArrowRight"&&(U.preventDefault(),Mn(Math.min(1,oe+1/29))),U.key==="ArrowLeft"&&(U.preventDefault(),Mn(Math.max(0,oe-1/29)))})}const n=d("[data-ag-licht-moods]");if(n){n.innerHTML="";for(const A of fg){const $=document.createElement("button");$.type="button",$.className="ag-licht-mood",$.dataset.mood=A.id;const[H,te,U]=ua(A.groups[0]);$.style.setProperty("--ag-mood",`rgb(${H},${te},${U})`),$.innerHTML=`<span class="ag-licht-mood-dot" aria-hidden="true"></span><span>${A.emoji} ${A.label}</span>`,$.addEventListener("click",()=>Cg(A)),n.appendChild($)}}const i=d("[data-ag-licht-scene-list]");i&&i.addEventListener("click",A=>{const $=A.target.closest("[data-scene]");if(!$)return;const H=Pe.find(te=>te.id===$.dataset.scene);H&&zg(H)});const r=d("[data-ag-licht-wink]");r&&r.addEventListener("click",()=>Pg());const o=d("[data-ag-licht-target]");o&&o.addEventListener("click",A=>{const $=A.target.closest("[data-target]");$&&(Mg($.dataset.target),k(6))});const s=d("[data-ag-licht-lamps]");if(s){let A=null,$=!1,H=null;const te=U=>{clearTimeout(A),A=null,$?(po(),$=!1):H&&ee==="connected"&&$g(H),H=null};s.addEventListener("pointerdown",U=>{const oe=U.target.closest("[data-lamp]");if(!(!oe||ee!=="connected")){U.preventDefault(),H=oe.dataset.lamp,$=!1;try{oe.setPointerCapture(U.pointerId)}catch{}A=setTimeout(()=>{$=Og()},450)}}),s.addEventListener("pointerup",te),s.addEventListener("pointercancel",()=>{clearTimeout(A),A=null,$&&(po(),$=!1),H=null})}const l=d("[data-ag-licht-fade]");let c=null;l&&l.addEventListener("input",()=>{we=Date.now()+kt;const A=d("[data-ag-licht-fade-val]");A&&(A.textContent=`${(Number(l.value)/60).toFixed(1).replace(".",",")} s`),clearTimeout(c),c=setTimeout(()=>Ag(Number(l.value)),160)});const u=d("[data-ag-licht-strip]");u&&u.addEventListener("click",A=>{if(ee!=="connected")return;const $=A.target.closest("[data-cut]");if($){Eg(Number($.dataset.cut));return}const H=A.target.closest("[data-led]");H&&oo(eo(ze(),Number(H.dataset.led)))});const g=d("[data-ag-licht-groups]");g&&g.addEventListener("click",A=>{const $=A.target.closest("button");!$||ee!=="connected"||($.dataset.group!==void 0?(oo($.dataset.group==="all"?null:Number($.dataset.group)),k(4)):$.dataset.split!==void 0?Lg():$.dataset.merge!==void 0&&Tg())});const h=d("[data-ag-licht-white]");let y=null;h&&h.addEventListener("input",()=>{we=Date.now()+kt,clearTimeout(y),y=setTimeout(()=>Sg(Number(h.value)/100),120)});const m=d("[data-ag-licht-random]");m&&m.addEventListener("click",_g);const b=d("[data-ag-licht-morse-open]"),w=d("[data-ag-morse]"),T=d("[data-ag-morse-pad]"),j=d("[data-ag-morse-dots]");let z=[],v=0,I=null;const C=()=>{z=[],v=0,j&&(j.innerHTML="")};b&&w&&b.addEventListener("click",()=>{w.hidden=!w.hidden,C(),w.hidden||w.scrollIntoView({behavior:"smooth",block:"nearest"})}),T&&T.addEventListener("pointerdown",A=>{A.preventDefault();const $=performance.now();if(z.length||(v=$),z.length<co&&z.push(Math.round($-v)),k(14),T.classList.add("is-hit"),setTimeout(()=>T.classList.remove("is-hit"),120),j){const H=document.createElement("i");j.appendChild(H)}clearTimeout(I),I=setTimeout(()=>{const H=jg(z);C(),H&&w&&(w.hidden=!0)},1600)});const D=d("[data-ag-sunrise-time]"),x=d("[data-ag-sunrise-days]"),_=d("[data-ag-sunrise-toggle]");_&&_.addEventListener("click",()=>{const A=Re(Ee),$=!(A&&A.enabled!==!1);Pn({enabled:$,retarget:$,time:D&&D.value,days:x&&x.value})}),D&&D.addEventListener("change",()=>{Re(Ee)&&Pn({time:D.value,days:x&&x.value})}),x&&x.addEventListener("change",()=>{Re(Ee)&&Pn({time:D&&D.value,days:x.value})});const N=d("[data-ag-licht-scene-save]"),B=d("[data-ag-licht-scene-name]");if(N&&B){const A=()=>{Ig(B.value)&&(B.value="")};N.addEventListener("click",A),B.addEventListener("keydown",$=>{$.key==="Enter"&&($.preventDefault(),A())})}const W=d("[data-ag-licht-conn]");W&&W.addEventListener("click",()=>{ee!=="connected"&&(ro(),Bn())}),document.addEventListener("visibilitychange",()=>{const A=d("[data-ag-panel-licht]");if(document.visibilityState==="hidden"){(J||Ue)&&ro();return}A&&!A.hidden&&Bn()})}function pe(){if(!S)return;const e=d("[data-ag-panel-licht]");if(!e||e.hidden)return;const t=d("[data-ag-licht-conn]");if(t){t.dataset.state=ee;const C=ue.some(x=>zn(x.id)),D=ee==="connected"&&!C&&fa&&Date.now()-fa>4e3;t.textContent=ee==="connected"?D?"verbunden · keine Lampe antwortet":"verbunden":ee==="connecting"?"verbinde…":ee==="error"?rt?`keine Verbindung (${rt.slice(0,40)}) · tippen`:"keine Verbindung · tippen":"tippen zum Verbinden"}const a=d("[data-ag-licht-lamps]");if(a){const C=ue.map(D=>{const x=Z[D.id],N=zn(D.id)?x&&x.on===!1?"standby":"on":"offline",B=N==="offline"?"offline":N==="standby"?"aus":"an";return`<button type="button" class="ag-licht-lamp" data-lamp="${D.id}" data-state="${N}" title="${G(D.name)} — tippen schaltet, halten pulsiert"><span class="ag-licht-lamp-dot" aria-hidden="true"></span>${G(D.short)}<span class="ag-licht-lamp-sub">${B}</span></button>`}).join("");a.dataset.html!==C&&(a.innerHTML=C,a.dataset.html=C)}const n=An(),i=io(),r=d("[data-ag-licht-strip]"),o=ze();if(Y!==null&&Y>=o.length&&(Y=null),r){const C=new Set(pa(o)),D=i?n&&typeof n.brightness=="number"?.35+n.brightness*.65:.8:.18,x=[];let _=0;o.forEach((B,W)=>{const[A,$,H]=ua(B);for(let te=0;te<B.size;te++,_++)_>0&&x.push(`<b data-cut="${_}" class="${C.has(_)?"is-cut":""}" role="button" aria-label="${C.has(_)?"Gruppen verbinden":"Hier teilen"}"></b>`),x.push(`<i data-led="${_}" class="${W===Y?"is-selected":""}" style="--ag-led:rgb(${A},${$},${H});opacity:${D}"></i>`)});const N=x.join("");r.dataset.html!==N&&(r.innerHTML=N,r.dataset.html=N),r.classList.toggle("is-off",!i),r.classList.toggle("is-live",ee==="connected")}const s=d("[data-ag-licht-groups]");if(s){const C=[`<button type="button" data-group="all" class="ag-licht-group ${Y===null?"is-active":""}">Alle</button>`];o.forEach((x,_)=>{const[N,B,W]=ua(x);C.push(`<button type="button" data-group="${_}" class="ag-licht-group ${_===Y?"is-active":""}" title="${x.size} ${x.size===1?"Licht":"Lichter"}"><span class="ag-licht-group-dot" style="background:rgb(${N},${B},${W})"></span>${_+1}</button>`)}),C.push(`<button type="button" data-split class="ag-licht-group ag-licht-group-op" title="Gruppe teilen" ${o.length>=nt?"disabled":""}>+</button>`),C.push(`<button type="button" data-merge class="ag-licht-group ag-licht-group-op" title="Gruppen verbinden" ${o.length<2?"disabled":""}>−</button>`);const D=C.join("");s.dataset.html!==D&&(s.innerHTML=D,s.dataset.html=D);for(const x of s.querySelectorAll("button"))(!x.hasAttribute("disabled")||x.dataset.group!==void 0)&&(x.disabled=ee!=="connected"||x.dataset.split!==void 0&&o.length>=nt||x.dataset.merge!==void 0&&o.length<2)}const l=d("[data-ag-licht-power]");l&&(l.setAttribute("aria-pressed",i?"true":"false"),l.classList.toggle("is-on",i),l.textContent=i?"An":"Aus",l.disabled=ee!=="connected");const c=d("[data-ag-licht-brightness]");c&&Date.now()>=we&&n&&typeof n.brightness=="number"&&(c.value=String(Math.round(n.brightness*100))),c&&(c.disabled=ee!=="connected");const u=d("[data-ag-licht-palette]"),g=o[Y!==null?Y:0];if(u&&g){const C=Number(g.pos)||0;u.dataset.pos=String(C),u.style.setProperty("--ag-pick",`${(C*100).toFixed(1)}%`),u.setAttribute("aria-valuenow",String(Math.round(C*29))),u.setAttribute("aria-label",Y!==null?`Farbe von Gruppe ${Y+1}`:"Farbe")}const h=d("[data-ag-licht-white]");h&&g&&Date.now()>=we&&(h.value=String(Math.round((Number(g.w)||0)*100))),h&&(h.disabled=ee!=="connected");const y=d("[data-ag-licht-white-label]");y&&(y.textContent=Y!==null?`Weissanteil · Gruppe ${Y+1}`:"Weissanteil");for(const C of e.querySelectorAll(".ag-licht-mood, [data-ag-licht-wink], [data-ag-licht-morse-open], [data-ag-licht-random], [data-ag-licht-fade], [data-ag-licht-scene-name], [data-ag-licht-scene-save], [data-ag-sunrise-time], [data-ag-sunrise-days], [data-ag-sunrise-toggle]"))C.disabled=ee!=="connected";const m=Re(Ee),b=d("[data-ag-sunrise-time]"),w=d("[data-ag-sunrise-days]"),T=d("[data-ag-sunrise-toggle]"),j=d("[data-ag-sunrise-note]");if(m&&b&&document.activeElement!==b&&(b.value=`${String(m.lh??7).padStart(2,"0")}:${String(m.lm??0).padStart(2,"0")}`),m&&w&&document.activeElement!==w&&(w.value=In(m.days)),T){const C=!!(m&&m.enabled!==!1);T.textContent=C?"an":"aus",T.classList.toggle("is-on",C),T.setAttribute("aria-pressed",C?"true":"false")}if(j){const C=(m&&Array.isArray(m.boards)?m.boards:ue.map(x=>x.id)).map(x=>(ue.find(_=>_.id===x)||{}).owner||x).join(" + "),D={werktags:"Mo–Fr",taeglich:"täglich",wochenende:"Sa+So"}[In(m&&m.days)];j.textContent=m&&m.enabled!==!1?`Aktiv ${D} um ${String(m.lh??7).padStart(2,"0")}:${String(m.lm??0).padStart(2,"0")}: ${m.duration_min||20} Minuten von tiefem Rot zu Warmweiss · ${C}`:m?"Gestellt, aber aus. Tippen auf „aus“ schaltet ihn ein.":"Zwanzig Minuten von tiefem Rot zu Warmweiss, auf den Lampen, die oben gewählt sind."}for(const C of e.querySelectorAll("[data-ag-licht-target] [data-target]")){const D=(C.dataset.target||"")===Ce;C.classList.toggle("is-active",D),C.setAttribute("aria-checked",D?"true":"false")}const z=d("[data-ag-licht-fade]");if(z&&Date.now()>=we&&n&&typeof n.fade_steps=="number"){z.value=String(Math.round(n.fade_steps));const C=d("[data-ag-licht-fade-val]");C&&(C.textContent=`${(n.fade_steps/60).toFixed(1).replace(".",",")} s`)}const v=d("[data-ag-licht-scenes]"),I=d("[data-ag-licht-scene-list]");v&&I&&(v.hidden=!Pe.length,I.innerHTML=Pe.slice(0,12).map(C=>{const x=ao(C).groups.slice(0,5).map(_=>{const[N,B,W]=ua(_);return`<i style="background:rgb(${N},${B},${W})"></i>`}).join("");return`<button type="button" class="ag-licht-scene" data-scene="${G(C.id)}"${ee!=="connected"?" disabled":""}><span class="ag-licht-scene-dots" aria-hidden="true">${x}</span><span>${G(C.name)}</span></button>`}).join(""))}function ma(e){if(p.activeTab==="today"&&e!=="today"&&p.revealed&&p.todaysPull&&!Q())try{Zd(p.todaysPull)}catch{}p.activeTab=e,S.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=S.querySelector(".ag-bottomnav-btn.is-active"),i=S.querySelector(".ag-nav-pill");if(i&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const u=c.left-s.left+c.width/2;i.style.width=`${a}px`,i.style.left=`${u-a/2}px`}}for(const o of["today","history","lieblinge","berge","licht"]){const s=d(`[data-ag-panel-${o}]`);if(!s)continue;const l=e===o;l&&s.hidden&&(s.classList.remove("is-entering"),s.offsetWidth,s.classList.add("is-entering"),s.addEventListener("animationend",()=>s.classList.remove("is-entering"),{once:!0})),s.hidden=!l}e==="history"&&ve(),e==="licht"&&Bn(),e==="lieblinge"&&Ea(),e==="berge"&&(bn(),wt({loading:!0}),bn(),bt().catch(()=>{}).then(()=>{wt(),bn()}));const r=d("[data-ag-fab]");r&&(r.hidden=e!=="berge")}function At(e,t){const a=d("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function Rg(){const e=p.wishInbox,t=d("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n=new Date().toISOString(),i={timestamp:n,token:q(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){At("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){At("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),At("Stups wird gesendet…","pending");const o=JSON.stringify(i);let s=!1;const l=()=>{if(!s){s=!0;try{zl(n)}catch{}}At("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},c=()=>{At("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(u=>{u&&u.ok?l():c()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(l).catch(c)}catch{c()}})}function Hg(e){const t=q(),a=p.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const r=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:r,message:r,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),l={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,l).catch(()=>{fetch(n,{...l,mode:"no-cors"}).catch(()=>{})})}function bo(e){const t=p.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:q(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},i=JSON.stringify(n),r=o=>{const s=Oa();!s||s.week!==e.week||(Sr({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),lt())};r("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(o=>{o&&o.ok?r("sent"):r("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(()=>r("sent")).catch(()=>r("failed"))}catch{r("failed")}})}function Gg(){const e=Oa();!e||e.week!==Nt()||e.remoteStatus!=="sent"&&bo(e)}function yo(e,t,a,n,i,r){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,i,r);else{const o=Array.isArray(r)?r:[r,r,r,r],[s,l,c,u]=o.map(g=>Math.min(g,n/2,i/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-l,a),e.quadraticCurveTo(t+n,a,t+n,a+l),e.lineTo(t+n,a+i-c),e.quadraticCurveTo(t+n,a+i,t+n-c,a+i),e.lineTo(t+u,a+i),e.quadraticCurveTo(t,a+i,t,a+i-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function jn(e,t,a){const n=t.split(" "),i=[];let r="";for(const o of n){const s=r?`${r} ${o}`:o;e.measureText(s).width>a&&r?(i.push(r),r=o):r=s}return r&&i.push(r),i}function Kg(e){var I,C;const i=document.createElement("canvas"),r=Math.min(window.devicePixelRatio||1,2);i.width=640*r,i.height=340*r,i.style.width="640px",i.style.height="340px";const o=i.getContext("2d");o.scale(r,r);const s=e.category.id==="jackpot",l=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",u=o.createLinearGradient(0,0,0,340);u.addColorStop(0,l),u.addColorStop(1,c),o.fillStyle=u,yo(o,0,0,640,340,20),o.fill();const g=s?"#b9782e":"#2f7a4f";o.fillStyle=g,yo(o,0,0,640,5,[20,20,0,0]),o.fill();const h=e.category.label,y=Jr(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${y} ${h}`,40,62);const m=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const b=o.measureText(m).width;o.fillText(m,600-b,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const w=jn(o,e.outcome.title,640-40*2);let T=108;for(const D of w)o.fillText(D,40,T),T+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const j=jn(o,e.outcome.message,640-40*2);T+=4;for(const D of j){if(T>270)break;o.fillText(D,40,T),T+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const z=((C=(I=p.theme)==null?void 0:I.brand)==null?void 0:C.machineName)||"Affektions-Gacha";o.fillText(z,40,324);const v=document.createElement("a");v.download=`gacha-${e.category.id}-${e.day}.png`,v.href=i.toDataURL("image/png"),v.click()}async function Yg(e){var T,j;const i=document.createElement("canvas");i.width=1170,i.height=2532;const r=i.getContext("2d"),o=new Image;o.crossOrigin="anonymous";try{await new Promise((z,v)=>{o.onload=z,o.onerror=v,o.src=e.photo.url})}catch{F("Foto konnte nicht geladen werden.");return}const s=Math.max(1170/o.naturalWidth,2532/o.naturalHeight),l=o.naturalWidth*s,c=o.naturalHeight*s;r.drawImage(o,(1170-l)/2,(2532-c)/2,l,c);const u=r.createLinearGradient(0,2532*.62,0,2532);u.addColorStop(0,"rgba(8,20,14,0)"),u.addColorStop(1,"rgba(8,20,14,.82)"),r.fillStyle=u,r.fillRect(0,2532*.62,1170,2532*.38);const g=e.photo.caption||e.photo.alt||"";r.font="500 56px Boska, Georgia, serif",r.fillStyle="#fffdf2";const h=jn(r,g,1170-96*2).slice(0,3);let y=2276-(h.length-1)*68;for(const z of h)r.fillText(z,96,y),y+=68;r.font="500 34px Satoshi, Inter, system-ui, sans-serif",r.fillStyle="rgba(255,255,255,.62)",r.fillText(e.day,96,2356),r.fillStyle="rgba(255,255,255,.35)",r.font="28px Satoshi, Inter, system-ui, sans-serif",r.fillText(((j=(T=p.theme)==null?void 0:T.brand)==null?void 0:j.machineName)||"Affektions-Gacha",96,2406);let m;try{m=await new Promise((z,v)=>i.toBlob(I=>I?z(I):v(new Error("blob")),"image/jpeg",.92))}catch{F("Dieses Foto lässt sich nicht exportieren (CORS).");return}const b=new File([m],`gacha-hintergrund-${e.day}.jpg`,{type:"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[b]}))try{await navigator.share({files:[b],title:g});return}catch(z){if(z&&z.name==="AbortError")return}const w=document.createElement("a");w.download=b.name,w.href=URL.createObjectURL(m),w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),4e3)}function wo(e){S.style.opacity="1",S.style.background="#0a1410",S.style.minHeight="100vh",S.style.display="flex",S.style.alignItems="center",S.style.justifyContent="center",S.style.padding="24px",S.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${G(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function Vg(){const e=d("[data-ag-button-text]");e&&(e.textContent=p.theme.brand.buttonShown)}function Jg(){return typeof navigator<"u"&&typeof navigator.share=="function"&&typeof navigator.canShare=="function"}function Zg(e,t){const a=(String(t||"image/jpeg").split("/")[1]||"jpg").replace("jpeg","jpg");return`gacha-${e.day}.${a}`}function Xg(e,t){const a=e&&e.photo;return!a||a.type==="video"||!a.url||!Jg()?!1:((async()=>{try{const n=await fetch(a.url,{mode:"cors"});if(!n.ok)throw new Error("photo fetch "+n.status);const i=await n.blob(),r=new File([i],Zg(e,i.type),{type:i.type||"image/jpeg"});if(!navigator.canShare({files:[r]}))throw new Error("cannot share files");await navigator.share({files:[r],text:Hn(e),title:"Mein Gacha-Zug"})}catch(n){if(n&&n.name==="AbortError")return;try{F("Foto hing nicht dran — nur der Text geht raus")}catch{}window.location.href=t}})(),!0)}function ba(){var h,y,m,b;p.todaysPull||(p.todaysPull=fd());const e=d("[data-ag-draw]"),t=d("[data-ag-button-text]"),a=p.theme.loadingSteps||["Maschine rattert"];let n=0;S.classList.add("is-revealing"),e.disabled=!0,Q()||ci().catch(()=>{}),t.textContent=a[n];const i=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((p.theme.revealDelayMs||3200)/a.length))),r=p.theme.revealDelayMs||3200,o=Array.from((d("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(w=>parseFloat(w.style.getPropertyValue("--ag-emoji-duration"))||20),l=performance.now();let c;function u(w){const T=Math.min((w-l)/r,1),j=1+5*T*T;o.forEach((z,v)=>{z.style.setProperty("--ag-emoji-duration",`${(s[v]/j).toFixed(3)}s`)}),T<1&&(c=requestAnimationFrame(u))}c=requestAnimationFrame(u);const g=((y=(h=p.todaysPull)==null?void 0:h.category)==null?void 0:y.id)==="special"?"special":(b=(m=p.todaysPull)==null?void 0:m.category)==null?void 0:b.tone;window.setTimeout(()=>oc(g),Math.max(0,r-900)),window.setTimeout(()=>{var v,I,C,D;window.clearInterval(i),cancelAnimationFrame(c),sc(),lc(g),o.forEach((x,_)=>{x.style.setProperty("--ag-emoji-duration",`${s[_].toFixed(2)}s`)});const w=R().some(x=>x.day===p.todaysPull.day&&x.token===p.todaysPull.token);if(p.todaysPull.collectToken&&!w&&jt(p.todaysPull.collectToken),p.todaysPull.freikarte&&!w&&kr(p.todaysPull.token),!Q()){const x=Hd(p.weather);x&&!p.todaysPull.weather&&(p.todaysPull.weather=x)}ot(p.todaysPull),S.classList.remove("is-revealing"),S.classList.add("is-revealed"),S.classList.add("has-drawn"),e.disabled=!1,t.textContent=p.theme.brand.buttonShown,p.revealed=!0,Q()||Mu(p.todaysPull),p.todaysPull.flaschenpost&&lt(),un(),Sn();const T=De();Mt(),wu(T),window.setTimeout(()=>{try{d("[data-ag-result]").scrollIntoView({behavior:"smooth",block:"start"})}catch{}},680);const j=(I=(v=p.todaysPull)==null?void 0:v.category)==null?void 0:I.id,z=(D=(C=p.todaysPull)==null?void 0:C.category)==null?void 0:D.tone;if(j==="special"){const x=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ge(130,x),setTimeout(()=>ge(90,x),700),Xt("special")}else if(z==="jackpot"){const x=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ge(120,x),setTimeout(()=>ge(80,x),650),Xt("jackpot")}else z==="rare"?(ge(70),Xt("rare")):Xt(z||"common");Q()||Promise.resolve().then(()=>da).then(x=>x.flashLightsForPull(j==="special"?"special":z)).catch(()=>{}),Ao[T]?k([30,20,30,20,60]):ed(j==="special"?"special":z),p.activeTab==="history"&&ve(),Bi()},p.theme.revealDelayMs||3200)}function Qg(){var Ro,Ho,Go,Ko,Yo,Vo,Jo,Zo,Xo,Qo,es,ts,as,ns,rs,is,os,ss,ls,ds,cs,gs,us,ps,fs,hs,ms,bs,ys,ws,vs,xs,ks,Ss,Es,Ls,Ts,Cs;let e=null,t=null;const a=d("[data-ag-draw]");a.addEventListener("pointerdown",()=>{t=setTimeout(rn,3e3)}),a.addEventListener("pointerup",()=>clearTimeout(t)),a.addEventListener("pointerleave",()=>clearTimeout(t)),a.addEventListener("pointercancel",()=>clearTimeout(t));let n=0,i=null;d("[data-ag-main-title]").addEventListener("click",()=>{if(n++,clearTimeout(i),n>=5){n=0,rn();return}i=setTimeout(()=>{n=0},1800)}),d("[data-ag-draw]").addEventListener("click",()=>{k(12),ba()}),ic({onTilt:(f,E)=>{S.style.setProperty("--ag-foil-x",f.toFixed(1)+"%"),S.style.setProperty("--ag-foil-y",E.toFixed(1)+"%")}}),(Ro=d("#ag-btn-rave"))==null||Ro.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Ho=d("#ag-btn-rave"))==null||Ho.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Go=d("#ag-btn-baerlauch"))==null||Go.addEventListener("click",wn),(Ko=d("#ag-baerlauch-close"))==null||Ko.addEventListener("click",Wc),(Yo=d("#ag-baerlauch-next"))==null||Yo.addEventListener("click",wn),(Vo=d("#ag-btn-baerlauch"))==null||Vo.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),wn())}),(Jo=d("#ag-btn-gesprach"))==null||Jo.addEventListener("click",ti),(Zo=d("#ag-btn-glossary"))==null||Zo.addEventListener("click",Ni),(Xo=d("#ag-btn-glossary"))==null||Xo.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),Ni())}),(Qo=d("#ag-glossary-close"))==null||Qo.addEventListener("click",Yc),(es=document.getElementById("ag-glossary-refresh"))==null||es.addEventListener("click",async()=>{const f=document.getElementById("ag-glossary-refresh");f&&(f.disabled=!0,f.textContent="⏳"),k(6);const E=await Di();qe(O.lang),f&&(f.textContent=E>0?`↻${E}`:"↻",setTimeout(()=>{f.textContent="↻",f.disabled=!1},3e3)),E>0&&F(`${E} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(f=>{f.addEventListener("click",()=>{const E=document.getElementById("ag-glossary-search");E&&(E.value=""),qe(f.dataset.lang),k(4)})}),(ts=document.getElementById("ag-glossary-search"))==null||ts.addEventListener("input",()=>{qe(O.lang)});const r=document.getElementById("ag-glossary-add"),o=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var P,K;if(!o)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const f=document.getElementById("ag-glossary-form-title");f&&(f.textContent="Neues Wort");const E=document.getElementById("ag-glossary-save-label");E&&(E.textContent="Eintragen");const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent=""),O.audioBlob=null;const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!0),o.hidden=!1,r.hidden=!0,(P=d("[data-ag-sheet-backdrop]"))==null||P.classList.add("is-open"),(K=document.getElementById("ag-glossary-word-input"))==null||K.focus(),k(8)}),(as=document.getElementById("ag-glossary-form-cancel"))==null||as.addEventListener("click",()=>{var f;if(o&&(o.hidden=!0),r&&(r.hidden=!1),(f=d("[data-ag-sheet-backdrop]"))==null||f.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",O.audioBlob=null,O.recorder&&O.recorder.state!=="inactive")try{O.recorder.stop()}catch{}O.recorder=null,k(6)}),(ns=document.getElementById("ag-glossary-form-save"))==null||ns.addEventListener("click",async()=>{var K,X,fe,se,Ae;const f=(((K=document.getElementById("ag-glossary-word-input"))==null?void 0:K.value)||"").trim(),E=(((X=document.getElementById("ag-glossary-meaning-input"))==null?void 0:X.value)||"").trim(),L=(((fe=document.getElementById("ag-glossary-edit-id"))==null?void 0:fe.value)||"").trim();if(!f){(se=document.getElementById("ag-glossary-word-input"))==null||se.focus();return}const M=document.getElementById("ag-glossary-audio-status");let P=null;if(O.audioBlob){M&&(M.textContent="Wird hochgeladen…");const re=L||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;P=await Hc(O.audioBlob,re)}if(k([20,20,40]),L){const re={word:f,meaning:E||null};P!==null&&(re.audioUrl=P),Uc(L,re)}else $i({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:O.lang,word:f,meaning:E||null,audioUrl:P,token:q()});o&&(o.hidden=!0),r&&(r.hidden=!1),(Ae=d("[data-ag-sheet-backdrop]"))==null||Ae.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",O.audioBlob=null,O.recorder=null,qe(O.lang),F("Wort gespeichert ✓")});const s=document.getElementById("ag-glossary-record");s&&s.addEventListener("click",async()=>{if(O.recorder&&O.recorder.state==="recording"){O.recorder.stop();return}try{const f=await navigator.mediaDevices.getUserMedia({audio:!0}),E=[];O.recorder=new MediaRecorder(f),O.recorder.ondataavailable=M=>{M.data.size>0&&E.push(M.data)},O.recorder.onstop=()=>{f.getTracks().forEach(K=>K.stop()),O.audioBlob=new Blob(E,{type:O.recorder.mimeType||"audio/webm"});const M=document.getElementById("ag-glossary-audio-status");M&&(M.textContent="✓ Aufnahme bereit");const P=document.getElementById("ag-glossary-play-preview");P&&(P.hidden=!1),s.textContent="🎙 Neu aufnehmen"},O.recorder.start(),s.textContent="⏹ Stop";const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="● REC"),k(10)}catch{const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent="Mikrofon nicht verfügbar")}}),(rs=document.getElementById("ag-glossary-play-preview"))==null||rs.addEventListener("click",()=>{if(!O.audioBlob)return;const f=URL.createObjectURL(O.audioBlob),E=new Audio(f);E.onended=()=>URL.revokeObjectURL(f),E.play().catch(()=>{})}),(is=d("#ag-letter-close"))==null||is.addEventListener("click",on),(os=d("#ag-letter-overlay"))==null||os.addEventListener("click",f=>{f.target===f.currentTarget&&on()}),(ss=d("#ag-lightbox-close"))==null||ss.addEventListener("click",()=>{Rn()}),(ls=d("#ag-lightbox"))==null||ls.addEventListener("click",f=>{f.target===f.currentTarget&&Rn()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&(on(),Rn())}),(ds=d("#ag-gesprach-close"))==null||ds.addEventListener("click",Cd),(cs=d("#ag-gesprach-next"))==null||cs.addEventListener("click",ai),(gs=d("#ag-gesprach-wa"))==null||gs.addEventListener("click",zd),(us=d("#ag-btn-gesprach"))==null||us.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),ti())}),(ps=d("#ag-btn-quest"))==null||ps.addEventListener("click",ri),(fs=d("#ag-quest-close"))==null||fs.addEventListener("click",Ad),(hs=d("#ag-btn-quest"))==null||hs.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),ri())}),(ms=d("#ag-quest-file"))==null||ms.addEventListener("change",f=>{const E=f.target.files&&f.target.files[0];E&&Md(E)}),d("[data-ag-copy]").addEventListener("click",async()=>{if(!p.todaysPull)return;k(8);const f=Hn(p.todaysPull);try{await navigator.clipboard.writeText(f),d("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{d("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",f)}}),d("[data-ag-save-img]").addEventListener("click",()=>{p.todaysPull&&(k(8),Kg(p.todaysPull))}),d("[data-ag-send]").addEventListener("click",f=>{p.todaysPull&&(k(8),Xg(p.todaysPull,f.currentTarget.href)&&f.preventDefault())}),d("[data-ag-star]").addEventListener("click",()=>{k(8),Io(p.todaysPull)}),(bs=d("[data-ag-wallpaper]"))==null||bs.addEventListener("click",()=>{!p.todaysPull||!p.todaysPull.photo||(k(8),Yg(p.todaysPull))});const l=d("[data-ag-sync-status]");if(l){let f=null;l.addEventListener("click",()=>{l.classList.add("is-open"),clearTimeout(f),f=setTimeout(()=>l.classList.remove("is-open"),2500)})}const c=d("[data-ag-ferien-toggle]"),u=d("[data-ag-ferien-body]");c&&u&&c.addEventListener("click",()=>{const f=u.hidden;u.hidden=!f,c.setAttribute("aria-expanded",String(f)),k(6)}),(ys=d("[data-ag-ferien-add]"))==null||ys.addEventListener("click",()=>{var M,P;const f=(((M=d("[data-ag-ferien-from]"))==null?void 0:M.value)||"").trim(),E=(((P=d("[data-ag-ferien-to]"))==null?void 0:P.value)||f).trim();if(!f){F("Erst ein Datum wählen");return}if(!jl(f,E)){F("Höchstens 60 Tage am Stück");return}k([12,20,12]),Yn(),Mt()});const g=d("[data-capsule]");if(g){let E=null,L=null,M=!1,P=0;const K=()=>!S.classList.contains("has-drawn")&&!S.classList.contains("is-revealing")&&!Q(),X=()=>{clearTimeout(E),clearInterval(L),E=L=null,P=0,S.classList.remove("is-charging","is-charged")};g.addEventListener("pointerdown",se=>{K()&&(se.preventDefault(),M=!1,S.classList.add("is-charging"),L=setInterval(()=>{P++,k(6+P*2)},130),E=setTimeout(()=>{M=!0,S.classList.add("is-charged"),k([20,30,40])},650))});const fe=()=>{const se=M&&K();X(),M=!1,se&&ba()};g.addEventListener("pointerup",fe),g.addEventListener("keydown",se=>{(se.key==="Enter"||se.key===" ")&&K()&&(se.preventDefault(),k(12),ba())}),g.addEventListener("pointercancel",()=>{X(),M=!1}),g.addEventListener("pointerleave",()=>{X(),M=!1})}pc(d("[data-ag-knob]"),{drawable:()=>!S.classList.contains("has-drawn")&&!S.classList.contains("is-revealing")&&!Q(),onFire:()=>ba(),onHold:rn,onTick:(f,E)=>{E||(S.classList.add("is-charging"),clearTimeout(e),e=setTimeout(()=>S.classList.remove("is-charging"),600),f%4===0&&Qt())}});const h=d("[data-ag-candle]");h==null||h.addEventListener("click",()=>{sd()?nn():ld({onChange:f=>h.classList.toggle("is-lit",f)})}),hc(d("[data-ag-result]"),()=>{const f=p.todaysPull;!f||Q()||(_o(f)||Io(f),mc(d("[data-ag-result]")),F("Als Liebling gespeichert ⭐"))}),(ws=d("[data-ag-freikarte-redeem]"))==null||ws.addEventListener("click",()=>{const f=p.todaysPull;if(!f)return;const E=f.category.tone;if(E!=="quiet"&&E!=="cursed"||!gl(f.token))return;const L=De(),M=hd(f.day,L);pl(f.token,f.day,{categoryId:M.category.id,outcomeTitle:M.outcome.title}),p.todaysPull={...f,category:M.category,outcome:M.outcome,photo:M.photo,collectToken:M.collectToken,voucher:M.voucher,freikarte:M.freikarte,unlockTime:null,promptAnswer:null};const P=R(),K=P.findIndex(X=>X.day===f.day&&X.token===f.token);K!==-1&&(P[K]={...P[K],categoryId:M.category.id,categoryLabel:M.category.label,tone:M.category.tone,title:M.outcome.title,message:M.outcome.message,link:M.outcome.link||null,unlockTime:null,promptAnswer:null,photo:M.photo?{url:M.photo.url,alt:M.photo.alt||"",caption:(M.photo.caption||"").trim(),type:M.photo.type==="video"?"video":"image"}:null,voucher:M.voucher||!1},ke(P)),p.todaysPull.collectToken&&jt(p.todaysPull.collectToken),p.todaysPull.freikarte&&kr(p.todaysPull.token),le(),ot(p.todaysPull),p.activeTab==="history"&&ve(),ge(50),F("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),k([20,20,40])});const y=d("[data-ag-streak-restore]");y&&y.addEventListener("click",()=>{if(!Br()){Wn();return}const f=Va(),E=Yt(),L=Kt()>0&&E-Kt()<=0,M=E-1,P=L?`🎂 Geschenk: ${ce(f)} retten? Nochmal tippen`:`${ce(f)} retten${M>0?` (${M} übrig)`:", der letzte"}? Nochmal tippen`;if(!Qe(y,P))return;y.disabled=!0;const K=Gl();ve(),Mt(),K&&(ge(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),k([30,20,30,20,60])),Wn(),y.disabled=!1});const m=d("[data-ag-sync-btn]");m&&m.addEventListener("click",async()=>{m.textContent="⏳",m.disabled=!0;const f=await bt();ve(),m.textContent=f<0?"✗":`✓${f}`,setTimeout(()=>{m.textContent="☁",m.disabled=!1},3e3)}),S.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(f=>{f.addEventListener("click",()=>{k(5),cu(f.dataset.agFilter)})}),S.querySelectorAll("[data-ag-tab]").forEach(f=>{f.addEventListener("click",()=>{k(6),ma(f.dataset.agTab)})}),function(){const E=S.querySelector(".ag-bottomnav"),L=window.visualViewport;if(!E||!L)return;const M=()=>{const P=L.height<window.innerHeight*.72;E.classList.toggle("is-keyboard",P);const K=Math.max(0,Math.round(window.innerHeight-(L.offsetTop+L.height)));E.style.setProperty("--ag-nav-shift",`${P?0:K}px`)};L.addEventListener("resize",M),L.addEventListener("scroll",M),window.addEventListener("orientationchange",()=>setTimeout(M,350)),document.addEventListener("focusout",()=>setTimeout(M,250)),window.addEventListener("pageshow",M),M()}();const b=S.querySelector(".ag-bottomnav");if(b){const f=b.querySelector(".ag-nav-pill"),E=[...b.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let L=null;b.addEventListener("pointerdown",P=>{const K=b.getBoundingClientRect(),X=parseFloat(f==null?void 0:f.style.width)||54;L={id:P.pointerId,startX:P.clientX-K.left,pillStartCentre:(parseFloat(f==null?void 0:f.style.left)||0)+X/2,pillWidth:X,moved:!1,suppress:!1,captured:!1}}),b.addEventListener("pointermove",P=>{if(!L||P.pointerId!==L.id)return;const K=b.getBoundingClientRect(),X=P.clientX-K.left-L.startX;if(!L.moved&&Math.abs(X)<6||(L.captured||(b.setPointerCapture(P.pointerId),L.captured=!0),L.moved=!0,L.suppress=!0,!f))return;f.style.transition="none";const fe=b.getBoundingClientRect(),se=L.pillStartCentre+X,Ae=L.pillWidth/2;let re=se-Ae;re<0?re=re*.25:re+L.pillWidth>fe.width&&(re=fe.width-L.pillWidth+(re+L.pillWidth-fe.width)*.25),f.style.left=`${re}px`});const M=P=>{if(!L||P.pointerId!==L.id)return;const K=L.moved,X=L.suppress;if(L=null,f&&(f.style.transition=""),!K)return;const fe=b.getBoundingClientRect(),se=P.clientX-fe.left;let Ae=E[0],re=1/0;if(E.forEach(He=>{const Oe=He.getBoundingClientRect(),Ca=Oe.left-fe.left+Oe.width/2,_t=Math.abs(se-Ca);_t<re&&(re=_t,Ae=He)}),k(6),ma(Ae.dataset.agTab),X){const He=Oe=>{Oe.stopImmediatePropagation(),Oe.preventDefault()};b.addEventListener("click",He,{capture:!0,once:!0})}};b.addEventListener("pointerup",M),b.addEventListener("pointercancel",P=>{!L||P.pointerId!==L.id||(L=null,f&&(f.style.transition=""),ma(p.activeTab))})}S.addEventListener("ag-synced",()=>{try{if(it(),p.todaysPull&&p.revealed&&zo(p.todaysPull),lt(),p._newPing){p._newPing=!1;const f=d("[data-ag-ping-banner]");f&&(f.hidden=!1);try{k([10,40,10])}catch{}}}catch{}}),(vs=d("#ag-btn-skincare"))==null||vs.addEventListener("click",Si),(xs=d("#ag-btn-skincare"))==null||xs.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),Si())}),(ks=d("#ag-skincare-close"))==null||ks.addEventListener("click",xc),(Ss=d("#ag-btn-stimmung"))==null||Ss.addEventListener("click",Rr),(Es=d("#ag-btn-stimmung"))==null||Es.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),Rr())}),(Ls=d("#ag-stimmung-close"))==null||Ls.addEventListener("click",Zl),Xl();const w=d("[data-ag-berge-add]"),T=d("[data-ag-berge-form]"),j=d("[data-ag-berge-cancel]"),z=d("[data-ag-berge-save]");w&&w.addEventListener("click",()=>{var E,L;k(8);const f=d("[data-ag-berge-date]");f&&!f.value&&(f.value=V(((E=p.theme)==null?void 0:E.timezone)||"Europe/Zurich")),T.hidden=!1,w.hidden=!0,(L=d("[data-ag-sheet-backdrop]"))==null||L.classList.add("is-open"),d("[data-ag-berge-name]").focus()}),j&&j.addEventListener("click",()=>{var P;k(6),T.hidden=!0,w.hidden=!1,(P=d("[data-ag-sheet-backdrop]"))==null||P.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(K=>{const X=d(K);X&&(X.value="")});const f=d("[data-ag-loc-search]");f&&(f.value="");const E=d("[data-ag-loc-dropdown]");E&&(E.hidden=!0,E.innerHTML="");const L=d("[data-ag-berge-form-title]");L&&(L.textContent="Neuer Gipfeleintrag");const M=d("[data-ag-berge-save] span:last-child");M&&(M.textContent="Eintragen")}),z&&z.addEventListener("click",()=>{var zs,As,Ms,$s,Ds,_s,Ns,Is,Ps,Bs,js,Fs,Os,Ws;const f=(((zs=d("[data-ag-berge-name]"))==null?void 0:zs.value)||"").trim(),E=parseFloat(((As=d("[data-ag-berge-dist]"))==null?void 0:As.value)||""),L=parseInt(((Ms=d("[data-ag-berge-gain]"))==null?void 0:Ms.value)||"",10),M=(($s=d("[data-ag-berge-date]"))==null?void 0:$s.value)||V(((Ds=p.theme)==null?void 0:Ds.timezone)||"Europe/Zurich"),P=(((_s=d("[data-ag-berge-url]"))==null?void 0:_s.value)||"").trim(),K=(((Ns=d("[data-ag-berge-cover]"))==null?void 0:Ns.value)||"").trim(),X=(((Is=d("[data-ag-berge-notes]"))==null?void 0:Is.value)||"").trim(),fe=(((Ps=d("[data-ag-berge-edit-id]"))==null?void 0:Ps.value)||"").trim(),se=(((Bs=d("[data-ag-berge-lat]"))==null?void 0:Bs.value)||"").trim()||null,Ae=(((js=d("[data-ag-berge-lng]"))==null?void 0:js.value)||"").trim()||null,re=(((Fs=d("[data-ag-berge-loc-label]"))==null?void 0:Fs.value)||"").trim()||null;if(!f){(Os=d("[data-ag-berge-name]"))==null||Os.focus();return}k([20,20,40]);const He={name:f,elevation:null,distance:isNaN(E)?null:E,elevGain:isNaN(L)?null:L,date:M,activityUrl:P||null,cover:K||null,notes:X||null,lat:se,lng:Ae,locLabel:re};fe?$c(fe,He):Ac({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...He,token:q()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Zu=>{const qs=d(Zu);qs&&(qs.value="")});const Oe=d("[data-ag-loc-search]");Oe&&(Oe.value="");const Ca=d("[data-ag-berge-form-title]");Ca&&(Ca.textContent="Neuer Gipfeleintrag");const _t=d("[data-ag-berge-save] span:last-child");_t&&(_t.textContent="Eintragen"),T.hidden=!0,w.hidden=!1,(Ws=d("[data-ag-sheet-backdrop]"))==null||Ws.classList.remove("is-open"),wt(),F("Gipfel gespeichert ✓")}),Nc();const v=d("[data-ag-ping-dismiss]");v&&v.addEventListener("click",()=>{const f=d("[data-ag-ping-banner]");f&&(f.hidden=!0)});const I=d("[data-ag-hug-send]");I&&I.addEventListener("click",()=>{k([20,30,20]);try{Rg()}catch{}});const C=d("[data-ag-post-open]"),D=d("[data-ag-post-form]"),x=d("[data-ag-post-idle]");let _="30";if(C&&D&&x){C.addEventListener("click",()=>{k(8),x.hidden=!0,D.hidden=!1;const f=d("[data-ag-post-input]");f&&f.focus()}),(Ts=d("[data-ag-post-cancel]"))==null||Ts.addEventListener("click",()=>{D.hidden=!0,x.hidden=!1});for(const f of D.querySelectorAll("[data-ag-post-mode]"))f.addEventListener("click",()=>{_=f.dataset.agPostMode;for(const E of D.querySelectorAll("[data-ag-post-mode]")){const L=E===f;E.classList.toggle("is-active",L),E.setAttribute("aria-checked",L?"true":"false")}k(6)});(Cs=d("[data-ag-post-seal]"))==null||Cs.addEventListener("click",()=>{const f=d("[data-ag-post-input]"),E=(f&&f.value||"").trim();if(!E){f&&f.focus();return}const L=V(p.theme.timezone);if(_l(E,_,L)){f&&(f.value=""),D.hidden=!0,x.hidden=!1,k([20,30,40]);try{ge(40,["#8fcf9e","#e0a75d","#fff"])}catch{}F(_==="30"?"🍾 Versiegelt. In dreissig Tagen kommt sie zurück.":"🍾 Versiegelt. Die Maschine gibt sie dir zurück, wann sie will."),lt(),le()}})}const N=d("[data-ag-wish-open]"),B=d("[data-ag-wish-cancel]"),W=d("[data-ag-wish-submit]");N&&N.addEventListener("click",()=>{k(8),d("[data-ag-wish-idle]").hidden=!0,d("[data-ag-wish-form]").hidden=!1;const f=d("[data-ag-wish-input]");f&&window.setTimeout(()=>f.focus(),60)}),B&&B.addEventListener("click",()=>{k(6),d("[data-ag-wish-form]").hidden=!0,d("[data-ag-wish-idle]").hidden=!1}),W&&W.addEventListener("click",()=>{const f=d("[data-ag-wish-input]"),E=((f==null?void 0:f.value)||"").trim();if(!E)return;k([20,20,40]);const L={week:Nt(),text:E,submittedAt:Date.now(),remoteStatus:"idle"};Sr(L),lt();try{bo(L)}catch{}});const A=d("[data-ag-notif-enable]"),$=d("[data-ag-notif-dismiss]");A&&A.addEventListener("click",()=>{k(10),Xc()}),$&&$.addEventListener("click",()=>{k(6);try{window.localStorage.setItem(Ge,"dismissed")}catch{}const f=d("[data-ag-notif-card]");f&&(f.hidden=!0)});const H=d("[data-ag-sheet-backdrop]");H&&H.addEventListener("click",()=>{k(6);const f=d("[data-ag-berge-form]"),E=d("[data-ag-berge-add]");f&&!f.hidden&&(f.hidden=!0,E&&(E.hidden=!1));const L=document.getElementById("ag-glossary-form"),M=document.getElementById("ag-glossary-add");L&&!L.hidden&&(L.hidden=!0,M&&(M.hidden=!1)),H.classList.remove("is-open")});const te=d("[data-ag-fab]");te&&te.addEventListener("click",()=>{k(8);const f=d("[data-ag-berge-add]");f&&!f.hidden&&f.click()});const U=["today","history","lieblinge","berge"];let oe=0,ne=0;const ct=d(".ag-content")||S;ct.addEventListener("touchstart",f=>{oe=f.touches[0].clientX,ne=f.touches[0].clientY},{passive:!0}),ct.addEventListener("touchend",f=>{const E=f.changedTouches[0].clientX-oe,L=Math.abs(f.changedTouches[0].clientY-ne);if(Math.abs(E)>52&&L<44){const M=U.indexOf(p.activeTab),P=E<0?Math.min(M+1,U.length-1):Math.max(M-1,0);P!==M&&(k(6),ma(U[P]))}},{passive:!0});const gt=d("[data-ag-ptr]");let La=0,Ta=!1;document.addEventListener("touchstart",f=>{window.scrollY===0&&(La=f.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",f=>{if(!La)return;f.touches[0].clientY-La>64&&!Ta&&gt&&(Ta=!0,gt.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Ta&&gt&&(gt.classList.add("is-loading"),await bt(),p.activeTab==="berge"&&wt(),p.activeTab==="history"&&ve(),gt.classList.remove("is-visible","is-loading"),F("Aktualisiert ✓")),La=0,Ta=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const f=document.querySelector(".ag-widget");f==null||f.classList.toggle("ag-paused",document.hidden)})}const vo="affektions-gacha:aufkleber:v1",eu=.04,tu=.96;function xo(){try{const e=window.localStorage.getItem(vo),t=e?JSON.parse(e):{};return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}function au(e){try{window.localStorage.setItem(vo,JSON.stringify(e))}catch{}}const ya=e=>Math.min(tu,Math.max(eu,Number(e)||0));function wa(e){return{x:.86,y:.1,rot:Math.round((xe(`aufkleber:${e}`)-.5)*28)}}function nu(e){const t=xo()[e];return t&&typeof t=="object"?t:null}function Fn(e,{emoji:t,x:a,y:n,rot:i}){const r=xo(),o=r[e]||{},s={emoji:t||o.emoji||"",x:ya(a??o.x??wa(e).x),y:ya(n??o.y??wa(e).y),rot:Number.isFinite(i)?i:Number.isFinite(o.rot)?o.rot:wa(e).rot};r[e]=s;const l=Object.keys(r).sort();for(;l.length>400;)delete r[l.shift()];return au(r),s}function ko(e,t){e.style.left=`${(t.x*100).toFixed(2)}%`,e.style.top=`${(t.y*100).toFixed(2)}%`,e.style.setProperty("--ag-aufkleber-rot",`${t.rot}deg`)}function So(e,t,a,{peelFrom:n=null}={}){if(!e||(e.innerHTML="",!a))return;const i=nu(t)||Fn(t,{emoji:a,...wa(t)});i.emoji!==a&&Fn(t,{emoji:a});const r=document.createElement("span");if(r.className="ag-aufkleber",r.textContent=a,r.title="Aufkleber — zieh mich, wohin du willst",ko(r,i),e.appendChild(r),ru(r,e,t),n){const o=n.getBoundingClientRect(),s=r.getBoundingClientRect();if(o.width&&s.width){const l=o.left+o.width/2-(s.left+s.width/2),c=o.top+o.height/2-(s.top+s.height/2);r.animate([{transform:`translate(calc(-50% + ${l.toFixed(0)}px), calc(-50% + ${c.toFixed(0)}px)) rotate(0deg) scale(.9)`,opacity:.6},{transform:`translate(calc(-50% + ${(l*.4).toFixed(0)}px), calc(-50% + ${(c*.4-30).toFixed(0)}px)) rotate(${i.rot*2}deg) scale(1.5) rotateX(50deg)`,opacity:1,offset:.55},{transform:`translate(-50%,-50%) rotate(${i.rot}deg) scale(1)`,opacity:1}],{duration:640,easing:"cubic-bezier(.2,.8,.2,1)"})}}}function ru(e,t,a){let n=null;e.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),n={r:t.getBoundingClientRect(),moved:!1,x0:r.clientX,y0:r.clientY},e.classList.add("is-dragging");try{e.setPointerCapture(r.pointerId)}catch{}}),e.addEventListener("pointermove",r=>{if(!n)return;Math.hypot(r.clientX-n.x0,r.clientY-n.y0)>4&&(n.moved=!0);const o=ya((r.clientX-n.r.left)/n.r.width),s=ya((r.clientY-n.r.top)/n.r.height);e.style.left=`${(o*100).toFixed(2)}%`,e.style.top=`${(s*100).toFixed(2)}%`,n.x=o,n.y=s});const i=()=>{if(!n)return;const r=n;if(n=null,e.classList.remove("is-dragging"),r.moved&&r.x!==void 0){const o=Math.round((Math.random()-.5)*24),s=Fn(a,{x:r.x,y:r.y,rot:o});ko(e,s),k(8)}};e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i),e.addEventListener("lostpointercapture",i)}const iu=864e5,va=e=>e*Math.PI/180;function ou(e){const t=Math.floor(e)+.5,a=t/1236.85,n=245155009766e-5+29.530588861*t+15437e-8*a*a-15e-8*a**3+73e-11*a**4,i=1-.002516*a-74e-7*a*a,r=va(2.5534+29.1053567*t-14e-7*a*a-11e-8*a**3),o=va(201.5643+385.81693528*t+.0107582*a*a+1238e-8*a**3-58e-9*a**4),s=va(160.7108+390.67050284*t-.0016118*a*a-227e-8*a**3+11e-9*a**4),l=va(124.7746-1.56375588*t+.0020672*a*a+215e-8*a**3),c=Math.sin,u=-.40614*c(o)+.17302*i*c(r)+.01614*c(2*o)+.01043*c(2*s)+.00734*i*c(o-r)-.00515*i*c(o+r)+.00209*i*i*c(2*r)-.00111*c(o-2*s)-57e-5*c(o+2*s)+56e-5*i*c(2*o+r)-42e-5*c(3*o)+42e-5*i*c(r+2*s)+38e-5*i*c(r-2*s)-24e-5*i*c(2*o-r)-17e-5*c(l)-7e-5*c(o+2*r)+4e-5*c(2*o-2*s)+4e-5*c(3*r)+3e-5*c(o+r-2*s)+3e-5*c(2*o+2*s)-3e-5*c(o+r+2*s)+3e-5*c(o-r+2*s)-2e-5*c(o-r-2*s)-2e-5*c(3*o+r)+2e-5*c(4*o),g=n+u;return new Date((g-24405875e-1)*iu)}function su(e,t){try{return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}catch{return e.toISOString().slice(0,10)}}function lu(e,t="Europe/Zurich"){const a=Date.parse(`${e}T12:00:00Z`);if(isNaN(a))return!1;const n=new Date(a).getUTCFullYear()+(new Date(a).getUTCMonth()+.5)/12,i=Math.floor((n-2e3)*12.3685);for(const r of[i-1,i,i+1])if(su(ou(r),t)===e)return!0;return!1}const Eo=["🌕 Vollmondnacht. Die Kapsel hat im Mondlicht gelegen.","🌕 Heute ist Vollmond. Die Maschine hat etwas heller geleuchtet.","🌕 Vollmond über Zürich. Einmal rausschauen, bevor du schläfst."];function du(e){if(!lu(e))return"";const t=e.split("-").reduce((a,n)=>a+Number(n),0);return Eo[t%Eo.length]}let Fe=null,Le="all";function cu(e){Le=e==="vouchers"||e==="open"?e:"all",Kn=Gn,ve()}function On(e){return e?G(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function xa(){return q().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||p.theme.brand.displayNameDefault||"Lennart"}function gu(){return["Bärlauch","Rave 🪩","Glossar 📖"]}let Lo=null;function To(e){try{const[t,a,n]=e.split("-").map(Number);Lo||(Lo=new Intl.DateTimeFormat("de-CH",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}));const i=Lo.formatToParts(new Date(Date.UTC(t,a-1,n,12))),r=o=>(i.find(s=>s.type===o)||{}).value||"";return`${r("weekday").replace(/\.$/,"")}, ${r("day")}. ${r("month")}`}catch{return e}}function uu(){const e=V(p.theme.timezone);try{const[t,a,n]=e.split("-").map(Number);return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(t,a-1,n,12)))}catch{return e}}const pu=["🚴","🧄"],fu=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Co(){const e=V(p.theme.timezone),t=q();return`${p.theme.secret}|${t}|${e}|emoji`}function hu(){const e=Co(),t=3+Math.floor(xe(`${e}|count`)*3),a=fu.slice(),n=[];for(let i=0;i<t&&a.length;i+=1){const r=Math.floor(xe(`${e}|pick|${i}`)*a.length);n.push(a.splice(r,1)[0])}return[...pu,...n]}function mu(){const e=d("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=hu(),a=t.length,n=Co();t.forEach((i,r)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=i;const s=360/a*r,l=(xe(`${n}|angle|${r}`)-.5)*28,c=s+l,u=xe(`${n}|radius|${r}`)*21-10.5,g=16+xe(`${n}|dur|${r}`)*10,h=-xe(`${n}|delay|${r}`)*g,y=xe(`${n}|dir|${r}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${c}deg`),o.style.setProperty("--ag-emoji-radius",`${250+u}%`),o.style.setProperty("--ag-emoji-duration",`${g.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${h.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",y===1?"normal":"reverse"),Jd(o),e.appendChild(o)})}function Mt(){const e=d("[data-ag-streak]"),t=De(),a=$e();if(t>(a.maxStreak||0)&&Wt({...a,maxStreak:t}),e){const n=Nr(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}Wn()}function Wn(){const e=d("[data-ag-streak-restore]");e&&(e.hidden=!Br());const t=d("[data-ag-streak-gems]");if(t){const a=Yt();t.hidden=!(a>0),t.textContent=`💎 ×${a}`,t.title=`${a} Streak-Retter in der Bank — springt ein, wenn mal ein Tag fehlt`,t.setAttribute("aria-label",t.title)}}function bu(){const e=d("[data-ag-hugs]"),t=d("[data-ag-hugs-row]"),a=d("[data-ag-hugs-label]");if(!e||!t||!a)return;const n=Ar();if(e.hidden=!n.length,!n.length)return;const i=n[0].slice(0,10);a.textContent=`${n.length} ${n.length===1?"Umarmung":"Umarmungen"} seit ${ce(i)}`,t.innerHTML=n.slice(-120).map(r=>`<button type="button" class="ag-hug-heart" data-ts="${G(r)}" aria-label="Umarmung">♥</button>`).join(""),t.onclick=r=>{var c;const o=r.target.closest("[data-ts]");if(!o)return;const s=new Date(o.dataset.ts);let l=o.dataset.ts.slice(0,10);try{l=new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:((c=p.theme)==null?void 0:c.timezone)||"UTC"}).format(s)}catch{}o.classList.add("is-flare"),setTimeout(()=>o.classList.remove("is-flare"),700),F(`🫂 Umarmung am ${l}`)}}const qn={erfuellt:"erfüllt 🌿",irgendwann:"irgendwann 🕰","lieber-nicht":"lieber nicht ✗"};function yu(e,t){const a=qn[e.status];if(!a)return"";const n=Math.round((Date.parse(t+"T12:00:00Z")-Date.parse(e.timestamp))/864e5);return`Dein Wunsch ${n>=14?"von neulich":n>=6?"von letzter Woche":"von dieser Woche"}: ${a}`}function zo(e){var r;const t=d("[data-ag-wish-reply]");if(!t)return;if(Q()){t.hidden=!0;return}const a=V(((r=p.theme)==null?void 0:r.timezone)||"UTC"),n=Ll(a),i=n?yu(n,a):"";if(!i){t.hidden=!0;return}t.textContent=i,t.title=n.text?`„${n.text}"`:"",t.hidden=!1,Tl(n.statusAt,a)}const Ao={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function wu(e){const t=d("[data-ag-milestone]");if(!t)return;const a=Ao[e];if(!a){t.hidden=!0;return}const n=q();if(vl(n,e)){t.hidden=!0;return}d("[data-ag-milestone-text]").textContent=a,t.hidden=!1,xl(n,e)}function vu(e,t){const a=(Array.isArray(e)?e:[e]).map(l=>String(l||"").trim()).filter(Boolean);a.length||a.push("");const n=document.createElement("div");n.className="ag-prompt-gate";const i=a.map((l,c)=>{const u=document.createElement("div");u.className="ag-prompt-field";const g=document.createElement("p");g.className="ag-prompt-question",g.textContent=(c===0?"💭 ":"🌱 ")+l;const h=document.createElement("textarea");return h.className="ag-prompt-textarea",h.placeholder="Schreib hier deine Antwort...",h.rows=a.length>1?3:4,h.setAttribute("aria-label",l),u.appendChild(g),u.appendChild(h),n.appendChild(u),{question:l,textarea:h}}),r=document.createElement("p");r.className="ag-pin-err",r.hidden=!0,r.textContent=a.length>1?"Bitte beide beantworten.":"Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const l=i.filter(u=>!u.textarea.value.trim());if(l.length){r.hidden=!1;for(const u of l)u.textarea.classList.add("ag-pin-shake"),setTimeout(()=>u.textarea.classList.remove("ag-pin-shake"),450);l[0].textarea.focus();return}const c=i.length===1?i[0].textarea.value.trim():i.map(u=>u.question+`
`+u.textarea.value.trim()).join(`

`);t(c)}o.addEventListener("click",s);for(const l of i)l.textarea.addEventListener("keydown",c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&s()});return n.appendChild(r),n.appendChild(o),n}function xu(e){return Array.isArray(e)?e.join(`
`):e}function ku(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:`Reaktion auf «${e.outcome.title}»`,answer:t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>{fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{})})}catch{}}function Su(e,t){try{const a=p.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:xu(e.outcome.prompt),answer:t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>{fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{})})}catch{}}function Eu(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("p");i.className="ag-pin-hint",i.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Kapsel.";const r=document.createElement("div");r.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const l=document.createElement("p");l.className="ag-pin-err",l.hidden=!0,l.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(l.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",u=>{u.key==="Enter"&&c()}),r.appendChild(o),r.appendChild(s),n.appendChild(i),n.appendChild(r),n.appendChild(l),n}function Lu(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("span");i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const r=document.createElement("p");r.className="ag-pin-hint",r.style.marginTop="10px",r.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const l=document.createElement("button");l.type="button",l.className="ag-secondary",l.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),ka(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return l.addEventListener("click",u),s.addEventListener("keydown",g=>{g.key==="Enter"&&u()}),o.appendChild(s),o.appendChild(l),n.appendChild(i),n.appendChild(r),n.appendChild(o),n.appendChild(c),n}function Tu(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],i=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${i}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function Mo(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function ka(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=me(t);if(!a){e.hidden=!0;return}const n=Tu(a);e.appendChild(n||Mo(a)),e.hidden=!1}function Cu(e){const t=d("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||Q()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],i=Number(a),r=e.token,o=R().filter(g=>g.token===r&&typeof g.day=="string"&&g.day.slice(5)===n&&Number(g.day.slice(0,4))<i).sort((g,h)=>h.day.localeCompare(g.day));if(!o.length)return;const s=o[0],l=i-Number(s.day.slice(0,4)),c=d("[data-ag-memory-label]"),u=d("[data-ag-memory-text]");c&&(c.textContent=l===1?"Vor einem Jahr":`Vor ${l} Jahren`),u&&(u.textContent=s.title||""),t.hidden=!1}function $o(e){const t=Da(e),a=_a(e);if(sl(e),le(),p.wishInbox&&p.wishInbox.enabled){const n=JSON.stringify({timestamp:new Date().toISOString(),token:q(),wish:`🎁 Sammelkapsel eingelöst: ${e} × ${t} — ${a}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(p.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{})}}function zu(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=Ke()[a]||0,i=_a(a),r=Da(a);if(n>=r)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(r)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${r} erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${i}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",s=>{pi(a,s.currentTarget),$o(a),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',it()});else{const s=r-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(r-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${i}</em></p>
      </div>`,e.hidden=!1}}function it(){const e=d("[data-ag-tokenbank]");if(!e)return;const t=Ke(),a=Object.keys($a).map(l=>{const c=Da(l),u=Math.min(t[l]||0,c);return{emoji:l,goal:c,count:u,raw:t[l]||0,reward:_a(l),done:(t[l]||0)>=c}}),n=a.reduce((l,c)=>l+c.raw,0),i=a.filter(l=>l.done).length,r=a.filter(l=>l.raw>0),o=a.length-r.length;r.sort((l,c)=>c.done-l.done||c.count/c.goal-l.count/l.goal||l.goal-c.goal);const s=d("[data-ag-tokenbank-head]");if(s){const l=o?` · ${o} ${o===1?"Sorte":"Sorten"} noch unentdeckt`:"",c=Ka(Ye().count),u=c.inCycle||Ye().count?` · Pfand ${c.inCycle}/${c.every}`:"";s.textContent=(n===0?"Noch keine Sammeltokens — sie fallen bei etwa jeder fünften Kapsel.":i?`${n} Tokens · ${i} ${i===1?"Belohnung":"Belohnungen"} einlösbar${l}`:`${n} ${n===1?"Token":"Tokens"} gesammelt${l}`)+u}e.innerHTML="";for(const l of r){const c=document.createElement("div");if(c.className="ag-tokenrow"+(l.done?" is-done":"")+(l.raw===0?" is-empty":""),c.innerHTML=`
      <span class="ag-tokenrow-emoji" aria-hidden="true">${l.emoji}</span>
      <span class="ag-tokenrow-body">
        <span class="ag-tokenrow-reward">${G(l.reward)}</span>
        <span class="ag-tokenrow-bar"><span class="ag-tokenrow-fill" style="width:${l.count/l.goal*100}%"></span></span>
      </span>
      <span class="ag-tokenrow-count">${l.count}<span class="ag-tokenrow-goal">/${l.goal}</span></span>
    `,l.done){const u=document.createElement("button");u.type="button",u.className="ag-tokenrow-redeem",u.textContent="Einlösen",u.addEventListener("click",()=>{pi(l.emoji,u),$o(l.emoji),k([12,30,12]),F(`${l.emoji} eingelöst — Fionn weiss Bescheid`),it()}),c.appendChild(u)}e.appendChild(c)}}function Do(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const i=document.createElement("div");i.className="ag-media-backdrop",i.setAttribute("aria-hidden","true"),t.type!=="video"&&(i.style.backgroundImage=`url("${t.url}")`),n.appendChild(i);let r;if(t.type==="video"){const o=tl(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const l=document.createElement("img");l.src=`https://lh3.googleusercontent.com/d/${o}`,l.alt=a,l.loading="lazy",l.decoding="async",l.className="ag-drive-poster-img",l.addEventListener("error",()=>l.remove(),{once:!0}),s.appendChild(l);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",g),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const h=document.createElement("iframe");h.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,h.allow="autoplay",h.setAttribute("allowfullscreen",""),h.setAttribute("frameborder","0"),h.setAttribute("aria-label",a),h.className="ag-drive-iframe",s.appendChild(h)},g=h=>{(h.key==="Enter"||h.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",g),r=s}else r=document.createElement("video"),r.src=me(t.url),r.controls=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("playsinline",""),r.setAttribute("preload","metadata"),r.setAttribute("aria-label",a),r.className="ag-media-content"}else r=document.createElement("img"),r.alt=a,r.loading="eager",r.decoding="auto",r.className="ag-media-content",r.addEventListener("load",()=>{const o=r.naturalWidth&&r.naturalHeight?r.naturalWidth/r.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),r.addEventListener("error",()=>{be("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=Un(),l=s(o),c=l.find(u=>u.alt===t.alt&&u.type!=="video")||l.find(u=>u.type!=="video")||null;if(c&&c.url)i.style.backgroundImage=`url("${c.url}")`,r.src=me(c.url),p.photos=l;else{const u=r.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const o=r.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),r.src=me(t.url);n.appendChild(r),e.appendChild(n)}function Un(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const i=n.type==="video"||t.test(n.url||"");return{...n,type:i?"video":"image"}}).filter(n=>n.url)}}}function $t(e,t,a,n){var l,c;const i=d("#ag-lightbox"),r=d("#ag-lightbox-img"),o=d("#ag-lightbox-caption"),s=d("#ag-lightbox-drive-link");if(!(!i||!r)){(l=i.querySelector(".ag-lightbox-iframe"))==null||l.remove(),(c=i.querySelector(".ag-lightbox-video"))==null||c.remove(),Fe&&(r.removeEventListener("error",Fe),Fe=null),r.onerror=null,s&&(s.hidden=!0);{r.hidden=!1;const u=me(e);if(!u)return;r.src=u,r.alt=t||"",Fe=()=>{const g=n||t;be("config/photos.json",{photos:[]}).then(h=>{const{normalizePhotos:y}=Un(),m=y(h),b=m.find(w=>w.alt===g)||null;b&&b.url&&(r.src=me(b.url),p.photos=m)}).catch(()=>{})},r.addEventListener("error",Fe,{once:!0})}o.textContent=t||"",o.hidden=!t,i.hidden=!1,document.body.style.overflow="hidden"}}function Rn(){var a,n;const e=d("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(Fe&&(t.removeEventListener("error",Fe),Fe=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Hn(e){return[`${Jr(e.category.tone)} ${xa()}s ${p.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var r;const[a,n]=e.unlockTime.split(":").map(Number),i=ut(e.unlockTimezone||((r=p.theme)==null?void 0:r.timezone)||"UTC");return i.h>a||i.h===a&&i.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function ot(e){var D;S.dataset.tone=e.category.tone,gd(e.category.tone),d("[data-ag-rarity]").textContent=e.category.label;const t=R().find(x=>x.day===e.day&&x.token===e.token),a=e.weather||t&&t.weather||null,n=di(a);d("[data-ag-date]").textContent=n?`${To(e.day)} · ${n}`:To(e.day),d("[data-ag-title]").textContent=e.outcome.title;const i=d("[data-ag-message]");if(!i)return;i.innerHTML=On(e.outcome.message),i.hidden=!1,Yd(i,e.outcome.secret===!0),ec(i,x=>{const _=p.todaysPull||e;$i({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:"kapsel",word:x,meaning:`Aus der Kapsel „${_.outcome.title}“, ${ce(_.day)}`,audioUrl:null,token:q()});try{k([12,30,12])}catch{}F(`„${x}“ ins Glossar gelegt 📖`)});const r=d("[data-ag-result]"),o=d("[data-ag-pfand]");if(o){const x=!!(t&&t.pfand),_=e.category.id==="niete"&&!Q()&&!x;o.hidden=!_;const N=d("[data-ag-pfand-handle]"),B=d("[data-ag-pfand-count]");if(B){const W=Ka(Ye().count);B.textContent=`${W.inCycle}/${W.every}`}_&&N&&tc(N,d("[data-ag-result]"),()=>{if(!$l(e.day,e.token))return;const W=Al();if(ac(N),o.hidden=!0,W.earned){try{jt(fr)}catch{}try{ge(70)}catch{}F(`♻︎ Zehn leere Kapseln zurück — ein ${fr} dafür`),it()}else F(`♻︎ Pfand ${W.inCycle}/${pr} — die Maschine nickt`);le()})}const s=d("[data-ag-freikarte-wrap]");if(s){const x=e.category.tone==="quiet"||e.category.tone==="cursed",_=!!(t&&t.pfand);s.hidden=!(x&&!_&&cl(e.token)>0&&!Q())}const l=d("[data-ag-quest-wrap]");if(l){const x=e.category.tone==="quest"&&!Q();if(l.hidden=!x,x){const _=d("[data-ag-quest-hint]"),N=d("[data-ag-quest-done]"),B=d("[data-ag-quest-photo]"),W=d("[data-ag-beweis-file]"),A=d("[data-ag-beweis-thumb]"),$=R().find(U=>U.day===e.day&&U.token===e.token),H=!!($&&$.bestanden),te=$&&$.beweisUrl;A&&(A.hidden=!te,te&&(A.src=me(te),A.onclick=()=>$t(te,"Beweisfoto"))),_&&(_.textContent=H?`🏆 Bestanden am ${ce($.bestandenAt||$.day)}`:"🏆 Auftrag erledigt? Häng ein Beweisfoto an, oder schick es Fionn und hol dir den Haken."),N&&(N.hidden=H,N.onclick=()=>{if(Qe(N,"Wirklich geschafft? Nochmal tippen")&&wr(e.day,e.token)){le();try{ge(60)}catch{}ot(e),p.activeTab==="history"&&ve()}}),B&&W&&(B.hidden=!1,B.disabled=!1,B.textContent=te?"📸 Foto ersetzen":"📸 Beweis anhängen",B.onclick=()=>{W.value="",W.click()},W.onchange=async()=>{const U=W.files&&W.files[0],oe=R().find(ne=>ne.day===e.day&&ne.token===e.token);if(!(!U||!oe)){B.disabled=!0,B.textContent="Lädt hoch…";try{const ne=await Td(e.day,e.token,U);il(e.day,e.token,ne),wr(e.day,e.token),le();try{ge(60)}catch{}try{F("Beweis angenommen 🏆")}catch{}}catch(ne){const ct=ne&&ne.code==="old-script"?"Upload noch nicht bereit — das Tabellen-Skript muss neu deployt werden.":ne&&ne.code==="no-endpoint"?"Sync ist aus — Beweis kann gerade nicht hochgeladen werden.":ne&&ne.code==="network"?"Kein Netz — versuch es später nochmal.":"Foto konnte nicht gelesen werden.";try{F(ct)}catch{}}ot(e),p.activeTab==="history"&&ve()}})}}if(e.outcome.prompt&&!e.promptAnswer){if(i.hidden=!0,!(r?r.querySelector("[data-ag-prompt-gate]"):null)){const _=vu(e.outcome.prompt,N=>{if(e.promptAnswer=N,_.remove(),!Q()){Su(e,N);const B=R(),W=B.findIndex(A=>A.day===e.day&&A.token===e.token);W!==-1&&(B[W]={...B[W],promptAnswer:N},ke(B),le())}ot(e),p.activeTab==="history"&&ve()});_.setAttribute("data-ag-prompt-gate",""),i.parentNode.insertBefore(_,i)}d("[data-ag-result]").hidden=!1;return}const c=r?r.querySelector("[data-ag-pin-gate]"):null;c&&c.remove();const u=d("[data-ag-link-wrap]");if(e.outcome.pin){const x=!!e.outcome.pinMessage;if(x||(i.hidden=!Ra(e.outcome.pin)),!Ra(e.outcome.pin)){let _=null;x&&(_=document.createElement("div"),_.className="ag-message",_.hidden=!0,_.innerHTML=On(e.outcome.pinMessage),i.parentNode.insertBefore(_,i.nextSibling));const N=Eu(e.outcome.pin,()=>{N.remove(),x?_.hidden=!1:i.hidden=!1,e.outcome.link&&u&&ka(u,e.outcome.link)},e.outcome.pinHint);N.setAttribute("data-ag-pin-gate","");const B=x?_:i;B.parentNode.insertBefore(N,B)}}const g=d("[data-ag-photo-wrap]"),h=d("[data-ag-photo-media]"),y=d("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[x,_]=e.unlockTime.split(":").map(Number),N=ut(e.unlockTimezone||((D=p.theme)==null?void 0:D.timezone)||"UTC"),B=e.outcome.linkPin;if(B)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[A,$]=e.outcome.linkPinFrom.split(":").map(Number);return N.h>A||N.h===A&&N.m>=$})()){const A=Lu(B,u,e);u.innerHTML="",u.appendChild(A),u.hidden=!1}else{const A=document.createElement("span");A.className="ag-outcome-link-locked",A.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,u.innerHTML="",u.appendChild(A),u.hidden=!1}else if(N.h>x||N.h===x&&N.m>=_)ka(u,e.outcome.link);else{const A=document.createElement("span");A.className="ag-outcome-link-locked",A.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,u.innerHTML="",u.appendChild(A),u.hidden=!1}}else e.outcome.pin&&!Ra(e.outcome.pin)||ka(u,e.outcome.link||null);if(zu(d("[data-ag-token-wrap]"),e),Cu(e),e.photo){Do(h,e.photo);const x=(e.photo.caption||"").trim();x?(y.textContent=x,y.hidden=!1):(y.textContent="",y.hidden=!0),g.hidden=!1}else h.innerHTML="",y.textContent="",y.hidden=!0,g.hidden=!0;const m=Hn(e),b=encodeURIComponent("Mein Gacha-Zug"),w=encodeURIComponent(m),T=d("[data-ag-send]");p.theme.messageTarget.startsWith("mailto:")?T.href=`${p.theme.messageTarget}?subject=${b}&body=${w}`:T.href=p.theme.messageTarget.replace("{text}",w);const j=d("[data-ag-save-img]");j&&(j.hidden=!(e.category.id==="rare"||e.category.id==="jackpot"));const z=d("[data-ag-wallpaper]");z&&(z.hidden=!(e.photo&&e.photo.type!=="video"&&e.photo.url));const v=d("[data-ag-actions-extra]");v&&(v.hidden=!(j&&!j.hidden)&&!(z&&!z.hidden));const I=d("[data-ag-reactions]");if(I){I.hidden=!1;const x=R().find(N=>N.day===e.day&&N.token===e.token),_=x&&x.reaction;for(const N of I.querySelectorAll("[data-ag-react]"))N.hidden=!!Q(),N.classList.toggle("is-chosen",N.dataset.agReact===_),N.onclick=()=>{const B=N.dataset.agReact;if(ol(e.day,e.token,B)){ku(e,B),Q()||Promise.resolve().then(()=>da).then(W=>W.flashReactionOnLamp(B)).catch(()=>{}),le();try{k([12,30,18])}catch{}ot(e),So(d("[data-ag-aufkleber]"),e.day,B,{peelFrom:N})}};So(d("[data-ag-aufkleber]"),e.day,_||"")}const C=d("[data-ag-moon-line]");if(C){const x=du(e.day);C.hidden=!x,C.textContent=x}zo(),d("[data-ag-result]").hidden=!1,No()}function _o(e){return e?Me().some(t=>t.day===e.day&&t.token===e.token):!1}function Sa(e){return Me().some(t=>t.day===e.day&&t.token===e.token)}function No(){const e=d("[data-ag-star]");if(!e)return;const t=_o(p.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Au(e,t){const a=Me(),n=a.findIndex(r=>r.day===e.day&&r.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Bt(a),le();const i=Sa(e);t.textContent=i?"★":"☆",t.classList.toggle("is-starred",i),t.title=i?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",p.activeTab==="lieblinge"&&Ea()}function Io(e){if(!e)return;const t=Me(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Bt(t),le(),No(),p.activeTab==="lieblinge"&&Ea()}function Mu(e){if(!e)return;if(e.flaschenpost)try{Il(e.flaschenpost,e.day)}catch{}const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,weather:e.weather||null,flaschenpost:e.flaschenpost||null,revealedAt:Date.now()},a=R(),n=new Set,i=[t,...a].filter(r=>{if(!r||typeof r.day!="string"||typeof r.token!="string")return!1;const o=`${r.day}|${r.token}`;return n.has(o)?!1:(n.add(o),!0)});i.sort((r,o)=>r.day<o.day?1:r.day>o.day?-1:0),ke(i),Wa(0),le()}function $u(e,t){var r;if(!e||e.used||!Qe(t,"Einlösen? Nochmal tippen"))return;const a=V(((r=p.theme)==null?void 0:r.timezone)||"UTC");e.used=!0,e.usedAt=a;const n=R(),i=n.find(o=>o.day===e.day&&o.token===e.token);i&&(i.used=!0,i.usedAt=a,ke(n)),le();try{ge(60)}catch{}try{F("Eingelöst 💛")}catch{}try{Hg(e)}catch{}t&&(t.disabled=!0),ve(),p.activeTab==="lieblinge"&&Ea()}function Po(e){var a;if(!e.link)return null;if(e.unlockTime){const n=ut(e.unlockTimezone||((a=p.theme)==null?void 0:a.timezone)||"UTC"),[i,r]=e.unlockTime.split(":").map(Number);if(!(n.h>i||n.h===i&&n.m>=r)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=me(e.link);return t?Mo(t):null}function Bo(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const i=di(e.weather);n.textContent=i?`${ce(e.day)} · ${i}`:ce(e.day);const r=document.createElement("span");r.className="ag-history-badge",r.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");if(o.type="button",o.className="ag-history-star"+(Sa(e)?" is-starred":""),o.textContent=Sa(e)?"★":"☆",o.title=Sa(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",h=>{h.stopPropagation(),Au(e,o)}),a.appendChild(n),a.appendChild(r),e.reaction){const h=document.createElement("span");h.className="ag-history-reaction",h.textContent=e.reaction,h.title="Deine Reaktion",a.appendChild(h)}a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const l=document.createElement("div");l.className="ag-history-message",l.innerHTML=On(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const h=document.createElement("p");h.className="ag-history-answer-label",h.textContent="💭 Antwort";const y=document.createElement("blockquote");y.className="ag-history-answer",y.textContent=e.promptAnswer,c.appendChild(h),c.appendChild(y)}t.appendChild(a);const u=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,g=e.photo&&(e.photo.type==="video"||u.test(e.photo.url||""));if(e.photo&&!g){const h=document.createElement("div");h.className="ag-history-body";const y=document.createElement("div");y.className="ag-history-thumb";const m=document.createElement("img");m.src=me(e.photo.url),m.alt=e.photo.alt||"Foto-Drop",m.loading="lazy",m.decoding="async",m.addEventListener("error",function(){be("config/photos.json",{photos:[]}).then(w=>{const{normalizePhotos:T}=Un(),j=T(w),z=j.find(v=>v.alt===e.photo.alt&&v.type!=="video")||j.find(v=>v.type!=="video")||null;if(z&&z.url)e.photo.url=z.url,m.src=me(z.url),p.photos=j;else{y.classList.add("is-broken"),m.remove();const v=document.createElement("span");v.className="ag-history-thumb-broken",v.textContent="📷",y.appendChild(v)}}).catch(()=>{y.classList.add("is-broken"),m.remove();const w=document.createElement("span");w.className="ag-history-thumb-broken",w.textContent="📷",y.appendChild(w)})},{once:!0}),y.appendChild(m),y.style.cursor="pointer",y.title="Vollansicht",y.addEventListener("click",()=>$t(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const b=document.createElement("div");if(b.className="ag-history-text",b.appendChild(s),b.appendChild(l),c&&b.appendChild(c),e.link){const w=Po(e);w&&b.appendChild(w)}h.appendChild(y),h.appendChild(b),t.appendChild(h)}else if(t.appendChild(s),t.appendChild(l),c&&t.appendChild(c),e.link){const h=Po(e);h&&t.appendChild(h)}if(e.bestanden){const h=document.createElement("p");if(h.className="ag-history-bestanden",h.textContent=`🏆 Bestanden${e.bestandenAt?` am ${ce(e.bestandenAt)}`:""}`,t.appendChild(h),e.beweisUrl){const y=document.createElement("img");y.className="ag-history-beweis",y.src=me(e.beweisUrl),y.alt="Beweisfoto",y.loading="lazy",y.decoding="async",y.addEventListener("click",m=>{m.stopPropagation(),$t(e.beweisUrl,"Beweisfoto")}),y.addEventListener("error",()=>y.remove(),{once:!0}),t.appendChild(y)}}if(pt(e)){const h=document.createElement("div");if(h.className="ag-voucher-actions",e.used){const y=document.createElement("span");y.className="ag-voucher-used",y.textContent=`✓ Benutzt am ${e.usedAt?ce(e.usedAt):"–"}`,h.appendChild(y)}else{const y=document.createElement("button");y.type="button",y.className="ag-voucher-use",y.textContent="🎟️ Benutzen",y.addEventListener("click",m=>{m.stopPropagation(),$u(e,y)}),h.appendChild(y)}t.appendChild(h)}return t}function Du(e){const t=d("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const i=n.dataset.agFilter;n.classList.toggle("is-active",i===Le),n.setAttribute("aria-selected",i===Le?"true":"false"),i==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let st=null;function jo(e){var j;const t=d("[data-ag-history-calendar]");if(!t)return;if(Le!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((j=p.theme)==null?void 0:j.timezone)||"UTC",n=V(a);st||(st=n.slice(0,7));const i=new Map(e.map(z=>[z.day,z])),[r,o]=st.split("-").map(Number),s=new Date(Date.UTC(r,o-1,1)),l=new Date(Date.UTC(r,o,0)).getUTCDate(),c=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),g=e.filter(z=>z.day.startsWith(st)).length;t.innerHTML="";const h=document.createElement("div");h.className="ag-kalender-head";const y=document.createElement("button");y.type="button",y.className="ag-kalender-nav",y.textContent="‹",y.setAttribute("aria-label","Vorheriger Monat");const m=document.createElement("span");m.className="ag-kalender-label",m.textContent=g?`${u} · ${g} Kapseln`:u;const b=document.createElement("button");b.type="button",b.className="ag-kalender-nav",b.textContent="›",b.setAttribute("aria-label","Nächster Monat");const w=z=>{const v=new Date(Date.UTC(r,o-1+z,1));st=`${v.getUTCFullYear()}-${String(v.getUTCMonth()+1).padStart(2,"0")}`,jo(e)};y.addEventListener("click",()=>w(-1)),b.addEventListener("click",()=>w(1)),h.appendChild(y),h.appendChild(m),h.appendChild(b),t.appendChild(h);const T=document.createElement("div");T.className="ag-kalender-grid";for(const z of["M","D","M","D","F","S","S"]){const v=document.createElement("span");v.className="ag-kalender-wd",v.textContent=z,T.appendChild(v)}for(let z=0;z<c;z++)T.appendChild(document.createElement("span"));for(let z=1;z<=l;z++){const v=`${st}-${String(z).padStart(2,"0")}`,I=i.get(v),C=document.createElement("span");C.className="ag-kalender-day",C.textContent=z,I&&(C.classList.add("has-pull"),C.dataset.tone=I.tone||"soft",C.title=`${I.title||"Kapsel"} (${I.categoryLabel||""})`),v===n&&C.classList.add("is-today"),v>n&&C.classList.add("is-future"),T.appendChild(C)}t.appendChild(T)}function _u(e){var r;const t=d("[data-ag-history-tally]");if(!t)return;if(Le!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(r=e[e.length-1])==null?void 0:r.day;let i="";if(n)try{i=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{i=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${i?`, seit ${i}`:""}.`}const Gn=15;let Kn=Gn;function Nu(e){const t=new Set,a=[];for(const n of Array.isArray(e)?e:[]){const i=n&&n.photo;!i||!i.url||i.type==="video"||t.has(i.url)||(t.add(i.url),a.push({url:i.url,caption:(i.caption||"").trim(),alt:i.alt||"",day:n.day}))}return a}function Iu(e){const t=d("[data-ag-album-card]"),a=d("[data-ag-album]"),n=d("[data-ag-album-note]");if(!t||!a)return;const i=Nu(e);if(t.hidden=i.length===0,!i.length){a.innerHTML="";return}n&&(n.textContent=i.length===1?"Ein Bild, das die Maschine schon ausgespuckt hat.":`${i.length} Bilder, die die Maschine schon ausgespuckt hat.`),a.innerHTML="";for(const r of i){const o=document.createElement("button");o.type="button",o.className="ag-album-tile",o.title=r.caption||r.alt||r.day,o.setAttribute("aria-label",r.caption||r.alt||`Foto vom ${r.day}`);const s=document.createElement("img");s.src=r.url,s.alt=r.alt||r.caption||"Foto von uns",s.loading="lazy",s.decoding="async",s.addEventListener("error",()=>o.remove(),{once:!0}),o.appendChild(s),o.addEventListener("click",()=>{k(8),$t(r.url,r.caption,!1,r.alt)}),a.appendChild(o)}}function Pu(e){const t=d("[data-ag-trophy-card]"),a=d("[data-ag-trophies]"),n=d("[data-ag-trophy-note]");if(!t||!a)return;const i=e.filter(r=>r.bestanden).sort((r,o)=>(o.bestandenAt||o.day)<(r.bestandenAt||r.day)?-1:1);if(t.hidden=i.length===0,!i.length){a.innerHTML="";return}n&&(n.textContent=i.length===1?"Eine bestandene Quest. Der Anfang einer Sammlung.":`${i.length} bestandene Quests.`),a.innerHTML="";for(const r of i){const o=document.createElement("div");o.className="ag-trophy-tile",o.title=r.title||r.categoryLabel||"Quest";const s=document.createElement("span");s.className="ag-trophy-emoji";const l=(r.categoryLabel||"").match(new RegExp("\\p{Extended_Pictographic}","gu"));if(s.textContent=l?l[l.length-1]:"🏆",r.beweisUrl){o.classList.add("has-beweis");const g=document.createElement("img");g.className="ag-trophy-shot",g.src=me(r.beweisUrl),g.alt="Beweisfoto",g.loading="lazy",g.decoding="async",g.addEventListener("error",()=>{g.remove(),o.classList.remove("has-beweis")},{once:!0}),o.appendChild(g),o.addEventListener("click",()=>$t(r.beweisUrl,r.title||"Beweisfoto"))}const c=document.createElement("span");c.className="ag-trophy-title",c.textContent=r.title||r.categoryLabel||"Quest";const u=document.createElement("span");u.className="ag-trophy-date",u.textContent=ce(r.bestandenAt||r.day),o.appendChild(s),o.appendChild(c),o.appendChild(u),a.appendChild(o)}}function Yn(){const e=d("[data-ag-ferien-list]"),t=d("[data-ag-ferien-count]");if(!e)return;const a=Gt();e.innerHTML="",t&&(t.hidden=!a.length,t.textContent=a.length?`· ${a.length}`:"");for(const n of a){const i=document.createElement("li");i.className="ag-ferien-item";const r=document.createElement("span");r.textContent=n.from===n.to?ce(n.from):`${ce(n.from)} – ${ce(n.to)}`;const o=document.createElement("button");o.type="button",o.className="ag-ferien-remove",o.setAttribute("aria-label","Ferien entfernen"),o.textContent="✕",o.addEventListener("click",()=>{Fl(n.from,n.to),Yn(),Mt()}),i.appendChild(r),i.appendChild(o),e.appendChild(i)}}function ve(){var u;it();const e=d("[data-ag-history]"),t=d("[data-ag-history-empty]"),a=d("[data-ag-history-note]");e.innerHTML="";const n=q(),i=V(((u=p.theme)==null?void 0:u.timezone)||"UTC"),r=R().filter(g=>g.token===n&&g.day<=i).slice().sort((g,h)=>g.day<h.day?1:g.day>h.day?-1:0);jo(r),_u(r),Yn(),bu(),Pu(r),Iu(r);const o=r.filter(g=>pt(g)&&!g.used).length;Du(o);const s=r.filter(g=>Le==="vouchers"?pt(g):Le==="open"?pt(g)&&!g.used:!0);Le==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":Le==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const l=d("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=Le==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":Le==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",l&&(l.hidden=!0);return}t.hidden=!0;const c=s.slice(0,Kn);for(const g of c)e.appendChild(Bo(g));if(l){const g=s.length-c.length;l.hidden=g<=0,g>0&&(l.textContent=`Mehr anzeigen (${g} weitere)`,l.onclick=()=>{Kn+=Gn,ve()})}}function Ea(){const e=d("[data-ag-lieblinge]"),t=d("[data-ag-lieblinge-empty]"),a=d("[data-ag-lieblinge-note]");e.innerHTML="";const n=Me();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert, oder mit zwei Fingern zusammengekniffen.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const i of n)e.appendChild(Bo(i))}function Bu(){const e=d("[data-ag-odds]");e.innerHTML="";const t=De(),a=Ir(t),n=a.reduce((i,r)=>i+r.weight,0);for(const i of a){const r=document.createElement("li");r.textContent=`${i.label}: ${(i.weight/n*100).toFixed(1)} %`,e.appendChild(r)}if(t>=5){const i=Nr(t),r=document.createElement("li");r.textContent=`${i.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,r.style.fontWeight="800",e.appendChild(r)}}function ju(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Fu(){const e=d("[data-ag-post-count]");if(!e)return;const t=Ve().filter(a=>!a.deliveredDay).length;e.hidden=!t,e.textContent=t===1?"🍾 Eine Flaschenpost ist unterwegs.":`🍾 ${t} Flaschenposten sind unterwegs.`}function lt(){Fu();const e=d("[data-ag-wish-idle]"),t=d("[data-ag-wish-form]"),a=d("[data-ag-wish-done]");if(!e||!t||!a)return;const n=Oa();if(n&&n.week===Nt()){e.hidden=!0,t.hidden=!0,a.hidden=!1,d("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",d("[data-ag-wish-done-note]").textContent=`„${n.text}"`;const r=Cr(),o=r&&Math.abs(Date.parse(r.timestamp)-Number(n.submittedAt||0))<12e4&&qn[r.status];d("[data-ag-wish-done-meta]").textContent=o?`Fionn sagt: ${qn[r.status]}`:ju(n.remoteStatus)}else e.hidden=!1,t.hidden=!0,a.hidden=!0}function Ou(){var y;const e=xa(),t=p.theme.brand.fromName,a=d("[data-ag-main-title]");a&&(a.textContent=p.theme.brand.titleTemplate.replace("{name}",e));const n=d("[data-ag-kicker]");n&&(n.textContent=`${p.theme.brand.kicker} · ${p.photos.length} Erinnerungen`);const i=d("[data-ag-intro]");i&&(i.textContent=p.theme.brand.intro);const r=d("[data-ag-button-text]");r&&(r.textContent=p.theme.brand.buttonIdle);const o=d("[data-ag-rules-title]");o&&(o.textContent=p.theme.brand.rulesTitle);const s=d("[data-ag-rules-text]");s&&(s.textContent=p.theme.brand.rulesText);const l=d("[data-ag-send]");l&&(l.textContent=`An ${t} schicken`);const c=d("[data-ag-today-pill]");c&&(c.textContent=uu());const u=d("[data-ag-draw-hint]");if(u){const m=R().filter(w=>w.token===q()).length,b=Bd(m);u.textContent=b?jd:"Eine Kapsel · ein Tag · ein Souvenir.",u.classList.toggle("is-secret",b)}const g=d("[data-ag-chips]");g&&(g.innerHTML="");const h=Array.isArray(p.theme.stickers)&&p.theme.stickers.length?p.theme.stickers:gu();for(const m of g?h:[]){const b=document.createElement("li");if(b.textContent=m,(m.toLowerCase().includes("bärlauch")||m.toLowerCase().includes("barlauch"))&&(b.id="ag-btn-baerlauch",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Bärlauch öffnen"),b.classList.add("ag-chip-clickable"),Bc()&&(b.classList.add("ag-chip-saison"),b.title="Bärlauch-Saison — Level 5 schaffen, 🌿 kassieren")),(m.toLowerCase().includes("gespräch")||m.toLowerCase().includes("gesprach"))&&(b.id="ag-btn-gesprach",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Gespräch öffnen"),b.classList.add("ag-chip-clickable")),m.toLowerCase().includes("rave")&&(b.id="ag-btn-rave",b.tabIndex=0,b.setAttribute("role","link"),b.setAttribute("aria-label","Rave Board öffnen"),b.classList.add("ag-chip-clickable")),m.toLowerCase()==="quest"&&(b.id="ag-btn-quest",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Quest öffnen"),b.classList.add("ag-chip-clickable"),(y=p.quest)!=null&&y.enabled&&ni()&&(ft().solved||b.classList.add("ag-chip-quest-active"))),m.toLowerCase().includes("glossar")&&(b.id="ag-btn-glossary",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Glossar öffnen"),b.classList.add("ag-chip-clickable")),(m.toLowerCase().includes("skincare")||m.toLowerCase().includes("pflege"))&&p.skincare&&(b.id="ag-btn-skincare",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Skincare-Routine öffnen"),b.classList.add("ag-chip-clickable")),m.toLowerCase().includes("stimmung")){b.id="ag-btn-stimmung",b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","Farbe des Tages wählen"),b.classList.add("ag-chip-clickable");const w=Je();w&&(b.classList.add("ag-chip-stimmung-set"),b.style.setProperty("--chip-dot-color",w))}g.appendChild(b)}mu(),Mt()}const Fo="affektions-gacha:install-dismissed:v1";let Dt=null;function Wu(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function qu(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Oo(){try{return window.localStorage.getItem(Fo)==="1"}catch{return!1}}function Wo(){try{window.localStorage.setItem(Fo,"1")}catch{}const e=d("[data-ag-install-nudge]");e&&(e.hidden=!0)}function qo(e){if(Oo())return;const t=d("[data-ag-install-nudge]");if(!t)return;const a=d("[data-ag-install-copy]"),n=d("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Dt&&(Dt.prompt(),await Dt.userChoice,Dt=null,Wo())}),t.hidden=!1}function Uu(){var e;Wu()||Oo()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Dt=t,qo(!0)}),qu()&&qo(!1),(e=d("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Wo))}const Ru={photos:[]};function Hu(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=tn();return a.map(i=>{const r=new URL(i.url,n).toString(),o=i.type==="video"||t.test(r);return{...i,type:o?"video":"image",url:r}}).filter(i=>i.url)}async function Gu(){md(),vd(),Ed();try{const[e,t,a,n,i,r,o,s,l]=await Promise.all([be("config/theme.json"),be("config/outcomes.json"),be("config/photos.json",Ru),be("config/special-days.json",{days:[]}),be("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),be("config/backup.json",{enabled:!1,endpointUrl:""}),be("config/quest.json",{enabled:!1}),be("config/push.json",{enabled:!1}),be("config/skincare.json",null)]);p.theme=e,p.outcomes=t,rl(t),p.photos=Hu(a),p.specialDays=n,Vs(e.dayStartHour),p.wishInbox=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},p.backup=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},p.quest=o&&typeof o=="object"?o:{enabled:!1},p.push=s&&typeof s=="object"?s:{enabled:!1},p.skincare=l&&typeof l=="object"?l:null,bd(e),yd(Q()||V(e.timezone)),Jl(),Ou(),Bu(),lt(),Qg(),Uu(),requestAnimationFrame(()=>{const g=S.querySelector(".ag-nav-pill"),h=S.querySelector(".ag-bottomnav-btn.is-active");if(g&&h){const y=h.closest(".ag-bottomnav"),m=y?y.getBoundingClientRect():null,b=h.getBoundingClientRect();m&&b.width&&(g.style.transition="none",g.style.left=`${b.left-m.left}px`,g.style.width=`${b.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{Gg()}catch{}try{const g=S.querySelector(".ag-stage");g&&"IntersectionObserver"in window&&new IntersectionObserver(([y])=>{g.classList.toggle("ag-stage-idle",!y.isIntersecting)},{threshold:.05}).observe(g)}catch{}En(),p.renderedDay=V(e.timezone);const c=()=>{Q()||V(e.timezone)!==p.renderedDay&&window.location.reload()};window.setInterval(c,6e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(c(),Sn(),un(),Uo(e.timezone),bt().catch(()=>{}))}),S.classList.add("is-ready"),S.style.transition="opacity .18s ease",S.style.opacity="1";const u=V(e.timezone);R().some(g=>g.token===q()&&g.day===u)&&!Q()&&Vg(),un(),Uo(e.timezone),bt().catch(()=>{}),ci().then(g=>Kd(g)).catch(()=>{}),window.setTimeout(()=>{Bi().catch(()=>{})},1800)}catch(e){wo(e)}}function Uo(e){try{const{h:t}=ut(e||"UTC"),a=t>=22||t<5;S.classList.toggle("is-evening",a);const n=S.querySelector("[data-ag-candle]");n&&(n.hidden=!nd(t));const i=S.querySelector("[data-ag-kicker]");if(i){const r=i.textContent.replace(/\u2009·\u2009Gute Nacht 🌙$/,"");i.textContent=a?r+" · Gute Nacht 🌙":r}}catch{}}const dt=document.currentScript,Ku=(dt==null?void 0:dt.dataset.mount)||"#affektions-gacha",Yu=(dt==null?void 0:dt.dataset.configBase)||"";function Vu(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Ju=document.querySelector(Ku)||Vu();Us(Ju),Ql(Yu,null),Gu().catch(e=>wo(e))})();

(function(){"use strict";const c={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,push:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let C=null;function Kr(e){C=e}function l(e){return C.querySelector(e)}const ra="affektions-gacha:history:v1",oa="affektions-gacha:favourites:v1",ia="affektions-gacha:tokens:v1",sa="affektions-gacha:streak-cache:v1",la="affektions-gacha:streak-synced:v1",da="affektions-gacha:streak-restore:v1",ca="affektions-gacha:wish:v1",ga="affektions-gacha:milestones:v1",ue="affektions-gacha:notif:v1",pa="affektions-gacha:baerlauch-scores:v1",Yr="affektions-gacha:baerlauch-history:v1",ua="affektions-gacha:mission-log:v1",ma="affektions-gacha:gesprach-idx:v1",Jr="affektions-gacha:sound:v1",fa="affektions-gacha:gipfelbuch:v1",ha="affektions-gacha:quest:v1",pt="affektions-gacha:quest-points:v1",Vr=20,ba=[100,75,50,25],ya="affektions-gacha:glossary:v1",ut="affektions-gacha:stimmung:v1",va="affektions-gacha:reactions:v1",xa="affektions-gacha:reactions-seen:v1",wa="affektions-gacha:freikarte:v1",mt="affektions-gacha:freikarte-reroll:v1",Zr={"🌿":"Fionn kocht dir ein Abendessen nach Wahl","🔥":"Wochenend-Abenteuer — Ziel nach deiner Wahl","⭐":"Fionns Überraschung — er entscheidet","☁️":"Ein ganzer fauler Tag ohne Pläne","🏔":"Eine richtige Bergtour, Hütte inklusive","☕":"Ein Ausflug in dein Traumcafé, egal wo","💚":"Ein langer, handgeschriebener Brief"};function $(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=o=>a.find(r=>r.type===o).value;return`${n("year")}-${n("month")}-${n("day")}`}function ft(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(o=>o.type===n).value);return{h:a("hour"),m:a("minute")}}function Xr(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function ht(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function K(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Qr(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function eo(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Y(e){return eo(Qr(e))()}function Oe(e,t){return t?Math.floor(Y(e)*t):0}function to(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function ao(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function no(e,t,a){return new URL(e,a()).toString()}function M(){return O()==="fionn"?"fionn":"lennart"}function O(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function te(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ro(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function bt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Re(e){var s,d;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=$(t),[n,o,r]=a.split("-").map(Number),i=Math.floor(new Date(Date.UTC(n,o-1,r)).getTime()/864e5);return Math.floor(i/(((d=e.quest)==null?void 0:d.periodDays)||2))}function Fe(e){var o;const t=(o=e.quest)==null?void 0:o.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Re(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function ka(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function Sa(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const oo=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,io=/nicht\s+einlös|kein\s+gutschein/i,so=new Set(["photo","collect","niete"]);function He(e){if(!e)return!1;if(e.voucher===!0)return!0;if(so.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return io.test(t)?!1:oo.test(t)}function P(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function de(e,t){try{const a=localStorage.getItem(e);if(a===null)return t;const n=JSON.parse(a);if(n&&typeof n=="object"&&!Array.isArray(n)&&("lennart"in n||"fionn"in n)){const o=n[M()];return o===void 0?t:o}return localStorage.setItem(e,JSON.stringify({[M()]:n})),n}catch{return t}}function ae(e,t){try{const a=localStorage.getItem(e);let n=null;try{n=a!==null?JSON.parse(a):null}catch{n=null}const o=n&&typeof n=="object"&&!Array.isArray(n)?n:{};o[M()]=t,localStorage.setItem(e,JSON.stringify(o))}catch{}}function B(){try{if(typeof window>"u"||!window.localStorage)return c.syncedHistory||[];const e=window.localStorage.getItem(ra);if(!e)return c.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return c.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:c.syncedHistory||[]}catch{return c.syncedHistory||[]}}function ce(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ra,JSON.stringify(e))}catch{}}function ne(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(oa);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=c.theme)!=null&&e.timezone?$(c.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(o=>o&&typeof o.day=="string"&&typeof o.token=="string"&&o.day<=n)}catch{return[]}}function Ge(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(oa,JSON.stringify(e))}catch{}}function We(){const e=de(ia,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function yt(e){ae(ia,e)}function Ea(e){const t=We();return t[e]=(t[e]||0)+1,yt(t),t[e]}function lo(e){const t=We();t[e]=0,yt(t)}function Ta(){try{const e=localStorage.getItem(wa),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Ca(e){try{localStorage.setItem(wa,JSON.stringify(e))}catch{}}function La(e){const t=Ta();return t[e]=(t[e]||0)+1,Ca(t),t[e]}function co(e){const t=Ta();return t[e]>0?(t[e]-=1,Ca(t),!0):!1}function go(e,t){try{const a=localStorage.getItem(mt),n=a?JSON.parse(a):{};return n&&typeof n=="object"&&n[`${e}|${t}`]||null}catch{return null}}function po(e,t,a){try{const n=localStorage.getItem(mt),o=n?JSON.parse(n):{},r=o&&typeof o=="object"?o:{};r[`${e}|${t}`]=a,localStorage.setItem(mt,JSON.stringify(r))}catch{}}function vt(){if(typeof window>"u"||!window.localStorage)return null;const e=de(ca,null);return e&&typeof e=="object"?e:null}function Aa(e){typeof window>"u"||!window.localStorage||ae(ca,e)}function ke(){const e=de(da,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function za(e){ae(da,e)}function uo(){const e=de(sa,0);return typeof e=="number"?e:parseInt(e,10)||0}function Ke(e){ae(sa,e)}function mo(){const e=de(la,0);return typeof e=="number"?e:parseInt(e,10)||0}function fo(e){ae(la,e)}function Ye(){try{const e=window.localStorage.getItem(fa);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Je(e){try{window.localStorage.setItem(fa,JSON.stringify(e))}catch{}}function Ve(){try{const e=localStorage.getItem(ua),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function xt(e){try{localStorage.setItem(ua,JSON.stringify(e))}catch{}}function wt(){try{const e=localStorage.getItem(pa),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Ia(){try{const e=localStorage.getItem(Yr),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Se(e){try{const t=de(ha,{}),a=e();return!t||t.period!==a?{period:a,solved:!1,attempts:0,hints:[]}:t}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function kt(e){ae(ha,e)}function Ze(){const e=de(pt,0);return typeof e=="number"?e:parseInt(e,10)||0}function ho(e){try{const t=Ze()+e;return ae(pt,t),t}catch{return e}}function bo(e){ae(pt,e)}function Ma(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(ga);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function yo(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ga,JSON.stringify(e))}catch{}}function vo(e,t){return Ma().includes(`${e}|${t}`)}function xo(e,t){const a=`${e}|${t}`,n=Ma();n.includes(a)||yo([...n,a])}function St(e){return!1}function J(){var m;const e=M(),t=B().filter(b=>b.token===e);if(!t.length)return 0;const a=((m=c.theme)==null?void 0:m.timezone)||"UTC",n=$(a),o=new Set(t.map(b=>b.day)),[r,i,s]=n.split("-").map(Number);let d=new Date(Date.UTC(r,i-1,s)),g=n;o.has(g)||(d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10));let u=0;for(;o.has(g);)u++,d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10);return Math.max(u,uo(),mo())}function $a(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Da(e){if(e<5)return c.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return c.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function wo(e,t,a=[]){const n=Da(t),o=a.length?n.filter(g=>!a.includes(g.id)):n,r=o.length?o:n,i=r.reduce((g,u)=>g+u.weight,0),s=Math.floor(Y(e)*i);let d=0;for(const g of r)if(d+=g.weight,s<d)return c.outcomes.categories.find(u=>u.id===g.id)||g;return c.outcomes.categories[c.outcomes.categories.length-1]}function Na(){const e=ke();return Math.floor((e.maxStreak||0)/Vr)}function Xe(){var n;if(ke().birthdayBonus2026Used)return 0;const t=((n=c.theme)==null?void 0:n.timezone)||"UTC";return $(t)==="2026-05-29"?1:0}function Et(){const e=ke();return Math.max(0,Na()-(e.used||0))+Xe()}function Tt(){var u;const e=M(),t=((u=c.theme)==null?void 0:u.timezone)||"UTC",a=$(t),n=new Set(B().filter(m=>m.token===e&&m.day<=a).map(m=>m.day));if(!n.size)return null;const o=[...n].sort()[0],[r,i,s]=a.split("-").map(Number),d=new Date(Date.UTC(r,i-1,s));let g=a;for(n.has(g)||(d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10));n.has(g);)d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10);return g<o?null:g}function Pa(){return Et()>0&&Tt()!==null}function ko(e){if(Et()<=0)return null;const t=Tt();if(!t)return null;const a=M(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},o=new Set,r=[n,...B()].filter(g=>{const u=`${g.day}|${g.token}`;return o.has(u)?!1:(o.add(u),!0)}).sort((g,u)=>g.day<u.day?1:g.day>u.day?-1:0);ce(r);const i=ke(),d=Math.max(0,Na()-(i.used||0))===0&&Xe()>0;return za({...i,used:d?i.used||0:(i.used||0)+1,birthdayBonus2026Used:d?!0:i.birthdayBonus2026Used||!1,usedAt:Date.now()}),Ke(J()),t}const _a=new Map;function V(e){_a.set(e,Date.now())}function Ct(e,t=6e3){const a=_a.get(e);return typeof a=="number"&&Date.now()-a<t}function So(e){const t=Array.isArray(c.specialDays&&c.specialDays.days)?c.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}function Lt(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Eo(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Ee(){return(c.photos||[]).filter(e=>e.type!=="video")}function Ba(e,t,a={}){const{excludeCategoryIds:n=[],seedSuffix:o=""}=a,r=M(),i=`${c.theme.secret}|${r}|${e}${o?"|"+o:""}`,s=So(e);if(s&&!o){const x=Array.isArray(s.outcomes)&&s.outcomes.length?s.outcomes:[{title:s.label,message:""}],I=x[Oe(`${i}|special|outcome`,x.length)],T={id:"special",label:s.label,weight:0,tone:s.tone||"jackpot",outcomes:x},E=s.photoAlt&&c.photos.length&&Ee().find(D=>D.alt===s.photoAlt)||null;return{day:e,token:r,category:T,outcome:I,photo:E,unlockTime:s.unlockTime||null}}const d=o?null:go(r,e);let g;d&&(g=c.outcomes.categories.find(x=>x.id===d.categoryId)),g||(g=wo(`${i}|category`,t||0,n));const u=ro();if(u){const x=c.outcomes.categories.find(I=>I.id===u);x&&(g=x)}g.id==="photo"&&!Ee().length&&(g=c.outcomes.categories.find(x=>x.id==="common")||g);const m=new Set(B().filter(x=>x.token===r&&x.day<e&&x.categoryId===g.id).map(x=>x.title)),b=g.outcomes.filter(x=>!m.has(x.title)),f=b.length>0?b:g.outcomes,h=d&&g.outcomes.find(x=>x.title===d.outcomeTitle)||f[Oe(`${i}|${g.id}|outcome`,f.length)],v=Ee();let y=null;if(g.id==="photo"&&v.length){const x=new Set(B().filter(E=>E.token===r&&E.day<e&&E.photo).map(E=>E.photo.url)),I=v.filter(E=>!x.has(E.url)),T=I.length>0?I:v;y=T[Oe(`${i}|photo`,T.length)]}return{day:e,token:r,category:g,outcome:h,photo:y,collectToken:h.token||null,voucher:h.voucher||!1,freikarte:h.freikarte===!0}}function To(){const e=te()||$(c.theme.timezone),t=J();return Ba(e,t)}function Co(e,t){return Ba(e,t,{excludeCategoryIds:["niete","cursed"],seedSuffix:"freikarte"})}const Lo=["❤️","😂","🥹","😮","🫂"];function Ao(){const e=c.theme&&c.theme.reactionEmojis;return Array.isArray(e)&&e.length?e:Lo}function qa(){return M()==="fionn"?"lennart":"fionn"}function Te(){const e=qa();return e.charAt(0).toLocaleUpperCase("de-CH")+e.slice(1)}function Ce(){var e;return $(((e=c.theme)==null?void 0:e.timezone)||"UTC")}function Le(e){return`${e.day}|${e.from}|${e.to}`}function Qe(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(va),t=e?JSON.parse(e):[];return Array.isArray(t)?t.filter(a=>a&&typeof a.day=="string"&&typeof a.from=="string"&&typeof a.to=="string"&&a.emoji):[]}catch{return[]}}function Ua(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(va,JSON.stringify(e))}catch{}}function zo(){try{const e=window.localStorage.getItem(xa);return e===null?null:e}catch{return null}}function Io(e){try{window.localStorage.setItem(xa,String(e))}catch{}}function Mo(e){const t=M(),a=Ce(),n=new Map(Qe().map(d=>[Le(d),d]));for(const d of Array.isArray(e)?e:[]){if(!d)continue;const g=Sa(d.day),u=String(d.from||"").toLowerCase(),m=String(d.to||"").toLowerCase(),b=String(d.emoji||"").slice(0,16);if(!g||g>a||!u||!m||!b)continue;const f={day:g,from:u,to:m,emoji:b,updatedAt:String(d.updatedAt||"")},h=n.get(Le(f));(!h||String(h.updatedAt||"")<=f.updatedAt)&&n.set(Le(f),f)}const o=Array.from(n.values()).sort((d,g)=>g.day.localeCompare(d.day)).slice(0,120);Ua(o);const r=zo(),i=[];let s=r||"";for(const d of o){if(d.to!==t)continue;const g=String(d.updatedAt||"");g>s&&(s=g),r!==null&&g>r&&i.push(d)}return(r===null||s!==r)&&Io(s),i.sort((d,g)=>String(d.updatedAt).localeCompare(String(g.updatedAt))),i}function ja(e){return!e||!e.day||!e.token?null:Qe().find(t=>t.to===e.token&&t.day===e.day)||null}function $o(e){const t=e||Ce(),a=M();return Qe().find(n=>n.from===a&&n.day===t)||null}function Do(e,t){const a=M(),n=qa(),r={day:c.partnerToday&&c.partnerToday.day||Ce(),from:a,to:n,emoji:e,updatedAt:new Date().toISOString()},i=Qe().filter(u=>Le(u)!==Le(r));i.unshift(r),Ua(i),V("reactions");const s=c.backup;if(!s||!s.enabled||!s.endpointUrl||te())return r;const d=JSON.stringify({type:"reaction",...r}),g={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:d};return fetch(s.endpointUrl,g).catch(()=>{fetch(s.endpointUrl,{...g,mode:"no-cors"}).catch(()=>{})}),r}function At(){if(!C)return;const e=l("[data-ag-partner-card]");if(!e)return;if(!c.backup||!c.backup.enabled){e.hidden=!0;return}const t=Te(),a=l("[data-ag-partner-title]");a&&(a.textContent=`${t}s Kapsel heute`);const n=l("[data-ag-partner-badge]"),o=l("[data-ag-partner-pull]"),r=l("[data-ag-reaction-bar]"),i=l("[data-ag-partner-note]");if(!o||!r)return;const s=Ce(),d=c.partnerToday;if(!!!(d&&d.day===s&&d.title)){n&&(n.hidden=!0),o.textContent=`Noch keine Kapsel heute — sobald ${t} zieht, siehst du sie hier.`,o.classList.add("is-waiting"),r.hidden=!0,i&&(i.hidden=!0),e.hidden=!1;return}n&&(n.textContent=d.categoryLabel||"Kapsel",n.hidden=!1),o.classList.remove("is-waiting"),o.textContent=`${Lt(d.tone)} „${d.title}“`;const u=$o(s);r.innerHTML="";for(const m of Ao()){const b=document.createElement("button");b.type="button",b.className="ag-reaction-btn"+(u&&u.emoji===m?" is-selected":""),b.dataset.agReaction=m,b.textContent=m,b.setAttribute("aria-label",`Mit ${m} reagieren`),u&&u.emoji===m&&b.setAttribute("aria-pressed","true"),r.appendChild(b)}r.hidden=!1,i&&(u?(i.textContent=`Deine Reaktion ist bei ${t} gelandet 💌`,i.hidden=!1):(i.textContent="Tipp ein Emoji — es erscheint drüben auf der Kapsel.",i.hidden=!1)),e.hidden=!1}function Oa(){if(!C)return;const e=l("[data-ag-reaction-received]");if(!e)return;const t=ja({day:Ce(),token:M()});if(!t){e.hidden=!0,e.textContent="";return}e.innerHTML="";const a=document.createElement("span");a.className="ag-reaction-received-emoji",a.textContent=t.emoji;const n=document.createElement("span");n.textContent=`${Te()} hat auf deine Kapsel reagiert`,e.appendChild(a),e.appendChild(n),e.hidden=!1}function Ae(){var e;return $(((e=c.theme)==null?void 0:e.timezone)||"Europe/Zurich")}function Ra(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"stimmung-set",day:e,hex:t,token:M()}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,o).catch(()=>fetch(a.endpointUrl,{...o,mode:"no-cors"}).catch(()=>{}))}function No(e){if(!e||typeof e!="object"||Ct("stimmung"))return;const t=Ae();if(e.day!==t)return;const a=typeof e.hex=="string"?e.hex.trim():"";if(!a){me()&&(Ga(),zt());return}me()!==a&&(Ha(a),ze(a))}function Fa(e){const t=parseInt(e.slice(1,3),16)||0,a=parseInt(e.slice(3,5),16)||0,n=parseInt(e.slice(5,7),16)||0,o=(r,i)=>Math.round(i+(r-i)*.3);return`rgb(${o(t,10)},${o(a,20)},${o(n,16)})`}function ze(e){document.body.style.background=Fa(e),Wa(e)}function zt(){document.body.style.removeProperty("background"),Wa(null)}function me(){try{const e=localStorage.getItem(ut);if(!e)return null;const t=JSON.parse(e);return t.day!==Ae()?null:t.hex||null}catch{return null}}function Ha(e){try{localStorage.setItem(ut,JSON.stringify({day:Ae(),hex:e}))}catch{}}function Po(e){const t=Ae();Ha(e),V("stimmung"),Ra(t,e)}function Ga(){try{localStorage.removeItem(ut)}catch{}}function _o(){const e=Ae();Ga(),V("stimmung"),Ra(e,"")}function Bo(){const e=me();e&&ze(e)}function Wa(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Ka(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=me()||"#4aaa5a";Ya(e,t),It(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function qo(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0);const t=me();t?ze(t):zt()}function Uo(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),o=e.querySelector("#ag-stimmung-reset");function r(i){It(e,i),ze(i)}t&&t.addEventListener("input",()=>{a&&(a.value=t.value),r(t.value)}),a&&a.addEventListener("input",()=>{const i=Ja(a.value);i&&(t&&(t.value=i),r(i))}),n&&n.addEventListener("click",()=>{const i=(t==null?void 0:t.value)||Ja((a==null?void 0:a.value)||"")||"#4aaa5a";Po(i),ze(i),e&&(e.hidden=!0)}),o&&o.addEventListener("click",()=>{_o(),zt(),Ya(e,"#4aaa5a"),It(e,"#4aaa5a")})}function Ya(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function It(e,t){const a=e.querySelector(".ag-stimmung-preview");a&&(a.style.background=Fa(t))}function Ja(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,o,r]=a;return`#${n}${n}${o}${o}${r}${r}`.toLowerCase()}return null}let Mt="",$t=null;function jo(e,t){Mt=e,$t=t}function Va(){if($t)return $t();if(!Mt)return window.location.href;try{return new URL(Mt,window.location.href).toString()}catch{return window.location.href}}function R(e,t=null){const a=new URL(e,Va()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}function et(e){var t;try{const a=C&&C.querySelector("[data-ag-sync-status]");if(!a)return;if(a.hidden=!1,e){const n=new Intl.DateTimeFormat("de-CH",{timeZone:((t=c.theme)==null?void 0:t.timezone)||"Europe/Zurich",hour:"2-digit",minute:"2-digit"}).format(new Date);a.textContent=`Synchronisiert ${n} ✓`,a.dataset.agSyncState="ok"}else a.textContent="Offline — zeigt lokalen Stand",a.dataset.agSyncState="error"}catch{}}async function Ie(){var e;try{const t=c.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=M(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,o=new AbortController,r=setTimeout(()=>o.abort(),12e3);let i;try{i=await fetch(n,{cache:"no-store",signal:o.signal})}finally{clearTimeout(r)}if(!i.ok)return et(!1),!1;const s=await i.json();if(!s.ok)return et(!1),!1;const d=$(((e=c.theme)==null?void 0:e.timezone)||"UTC"),g=B(),u=g.filter(f=>f.title!=="(wiederhergestellt)"&&f.day<=d);u.length!==g.length&&ce(u);const m=ne(),b=m.filter(f=>f.day<=d);if(b.length!==m.length&&Ge(b),Array.isArray(s.history)&&s.history.length){const f=B(),h=new Map(f.map(y=>[`${y.day}|${y.token}`,y]));for(const y of s.history){if(y.title==="(wiederhergestellt)")continue;const x=Sa(y.day);if(!x||x>d)continue;const I=typeof y.token=="string"?y.token.toLowerCase():y.token;h.set(`${x}|${I}`,{...y,day:x,token:I})}const v=Array.from(h.values()).sort((y,x)=>x.day.localeCompare(y.day));ce(v),c.syncedHistory=v,Ke(J())}if(Array.isArray(s.favourites)&&s.favourites.length){const f=ne(),h=new Map(f.map(v=>[`${v.day}|${v.token}`,v]));for(const v of s.favourites){if(v.day>d)continue;const y=typeof v.token=="string"?v.token.toLowerCase():v.token;h.set(`${v.day}|${y}`,{...v,token:y})}Ge(Array.from(h.values()).sort((v,y)=>y.day.localeCompare(v.day)))}if(s.tokens&&typeof s.tokens=="object"&&yt(s.tokens),typeof s.questPoints=="number"&&s.questPoints>Ze()&&bo(s.questPoints),typeof s.streak=="number"&&s.streak>0&&(fo(s.streak),s.streak>J()&&Ke(s.streak)),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const f=wt();let h=!1;for(const[v,y]of Object.entries(s.baerlauchScores))typeof y=="number"&&y>(f[v]||0)&&(f[v]=y,h=!0);if(h)try{localStorage.setItem(pa,JSON.stringify(f))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const f=Ve(),h=new Map(f.map(y=>[`${y.day}|${y.player}`,y]));for(const y of s.missionLog)!y.day||!y.player||h.set(`${y.day}|${y.player}`,y);const v=Array.from(h.values()).sort((y,x)=>x.day.localeCompare(y.day));xt(v)}if(typeof s.latestPing=="string"&&s.latestPing&&M()!=="fionn")try{const f="affektions-gacha:last-ping:v1",h=window.localStorage.getItem(f)||"";s.latestPing>h&&(window.localStorage.setItem(f,s.latestPing),c._newPing=!0)}catch{}if(Array.isArray(s.reactions))try{const f=Mo(s.reactions);f.length&&(c._freshReactions=f)}catch{}if(s.partnerToday&&typeof s.partnerToday=="object"&&s.partnerToday.day&&(c.partnerToday=s.partnerToday),s.stimmung)try{No(s.stimmung)}catch{}if(Array.isArray(s.gipfelbuch)&&!Ct("gipfelbuch")){const f=s.gipfelbuch.filter(h=>h.id).sort((h,v)=>(v.date||"").localeCompare(h.date||""));Je(f)}return C&&C.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),et(!0),Array.isArray(s.history)?s.history.length:0}catch{return et(!1),-1}}function re(){try{const e=c.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=M(),a=B().filter(d=>(d.token||"").toLowerCase()===t.toLowerCase()),n=ne().filter(d=>(d.token||"").toLowerCase()===t.toLowerCase()),o=Se(()=>Re(c)),r=o.solved&&o.pointsEarned&&!o._logged?{challenge:Fe(c),attempts:o.attempts,points:o.pointsEarned,period:o.period}:void 0;r&&(o._logged=!0,kt(o));const i=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:n,streak:J(),tokens:We(),questPoints:Ze(),...r?{questLog:r}:{}}),s={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i};fetch(e.endpointUrl,s).catch(()=>{fetch(e.endpointUrl,{...s,mode:"no-cors"}).catch(()=>{})})}catch{}}function Oo(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Ro(e){const t=(o,r)=>C.style.setProperty(o,r),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Za={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Xa={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Fo(e){const t=Ho(e);if(!t)return;const a=(n,o)=>C.style.setProperty(n,o);if(t.colors&&typeof t.colors=="object")for(const[n,o]of Object.entries(t.colors))Za[n]&&typeof o=="string"&&a(Za[n],o);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,o]of Object.entries(t.darkColors))Xa[n]&&typeof o=="string"&&a(Xa[n],o)}function Ho(e){const t=Array.isArray(c.specialDays&&c.specialDays.days)?c.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}const Go=`
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

      /* ── Kapsel-Echo (partner pull + emoji reactions) ── */
      .ag-partner-card{}
      .ag-partner-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px}
      .ag-partner-head .ag-wish-label{margin:0;flex:1 1 auto}
      .ag-partner-pull{margin:4px 0 0;color:var(--ag-text);font-size:.98rem;line-height:1.55;font-weight:600}
      .ag-partner-pull.is-waiting{color:var(--ag-muted);font-weight:500;font-style:italic}
      .ag-reaction-bar{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
      .ag-reaction-btn{
        width:46px;height:46px;border-radius:999px;
        border:1px solid var(--ag-border);
        background:var(--ag-surface);
        font-size:1.3rem;line-height:1;cursor:pointer;
        display:inline-flex;align-items:center;justify-content:center;
        transition:transform 120ms var(--ag-ease),border-color 150ms var(--ag-ease),box-shadow 150ms var(--ag-ease);
      }
      .ag-reaction-btn:hover{transform:translateY(-1px) scale(1.05)}
      .ag-reaction-btn:active{transform:scale(.9)}
      .ag-reaction-btn.is-selected{
        border-color:var(--ag-primary);
        box-shadow:0 0 0 2px var(--ag-primary) inset,0 4px 14px rgba(47,122,79,.18);
        transform:scale(1.08);
      }
      .ag-reaction-pop{animation:ag-reaction-pop 420ms var(--ag-ease)}
      @keyframes ag-reaction-pop{
        0%{transform:scale(1)}
        40%{transform:scale(1.35) rotate(-8deg)}
        100%{transform:scale(1.08)}
      }
      .ag-partner-note{margin:10px 0 0;color:var(--ag-muted);font-size:.85rem;line-height:1.5}
      .ag-reaction-received{
        display:flex;align-items:center;gap:10px;
        margin:14px 0 0;padding:10px 14px;border-radius:var(--ag-radius-sm);
        border:1px dashed var(--ag-border);
        background:linear-gradient(135deg,rgba(232,164,164,.10),rgba(47,122,79,.08));
        color:var(--ag-text);font-size:.9rem;font-weight:600;
        animation:ag-echo-in 400ms var(--ag-ease) both;
      }
      @keyframes ag-echo-in{from{opacity:0;transform:translateY(8px) scale(.95)}to{opacity:1;transform:none}}
      .ag-reaction-received-emoji{font-size:1.4rem;line-height:1}
      .ag-history-reaction{
        font-size:.95rem;line-height:1;
        padding:2px 6px;border-radius:999px;
        border:1px solid var(--ag-border);
        background:var(--ag-surface);
      }
      @media (prefers-color-scheme:dark){
        .ag-reaction-btn{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.14)}
        .ag-reaction-received{background:linear-gradient(135deg,rgba(232,164,164,.10),rgba(47,122,79,.14))}
        .ag-history-reaction{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)}
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
    `;function Wo(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=Go.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function Ko(){return`
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
    `}function Yo(){return`
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
    `}const Jo=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${Ko()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${Yo()}
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
              <div class="ag-reaction-received" data-ag-reaction-received hidden></div>
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

            <div class="ag-card ag-partner-card" data-ag-partner-card hidden>
              <div class="ag-partner-head">
                <p class="ag-wish-label" data-ag-partner-title>Kapsel des Tages</p>
                <span class="ag-history-badge" data-ag-partner-badge hidden></span>
              </div>
              <p class="ag-partner-pull" data-ag-partner-pull></p>
              <div class="ag-reaction-bar" data-ag-reaction-bar role="group" aria-label="Mit Emoji reagieren" hidden></div>
              <p class="ag-partner-note" data-ag-partner-note hidden></p>
            </div>

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
              <p class="ag-history-tally" data-ag-history-tally hidden></p>
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
    `;function Vo(){C.className="ag-widget",C.setAttribute("aria-labelledby","ag-title"),C.innerHTML=Jo}function Z(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(o);for(let r=0;r<e;r++){const i=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,g=Math.random()*100,u=Math.random()*.6,m=1.4+Math.random()*.8;i.style.cssText=`position:absolute;top:-20px;left:${g}%;width:${d}px;height:${d*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${m}s ${u}s ease-in forwards;transform-origin:center;`,i.style.setProperty("--r",`${Math.random()*720-360}deg`),o.appendChild(i)}if(!document.getElementById("ag-confetti-style")){const r=document.createElement("style");r.id="ag-confetti-style",r.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(r)}setTimeout(()=>o.remove(),3e3)}function L(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}const fe=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],Qa=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],en="affektions-gacha:mission-done:v1",tn="affektions-gacha:mission-feedback:v1";function Dt(){var r,i;const e=(r=c.missions)==null?void 0:r.pairs;if(!Array.isArray(e)||!e.length)return null;const t=$(((i=c.theme)==null?void 0:i.timezone)||"UTC"),a=Oe(`${c.theme.secret}|mission|${t}`,e.length),n=e[a];return O()==="fionn"?n.fionn:n.lennart}function an(){var e;try{const t=$(((e=c.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${en}:${O()}`)===t}catch{return!1}}function Zo(){var e,t;try{const a=$(((e=c.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${en}:${O()}`,a);const n=O(),o=Dt(),r=new Date().toISOString();ei({day:a,player:n,mission:o,doneAt:r});const i=(t=c.backup)==null?void 0:t.endpointUrl;i&&o&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:o,doneAt:r}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function nn(){var e;try{const t=$(((e=c.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(`${tn}:${O()}`)===t}catch{return!1}}function Xo(){var e;try{const t=$(((e=c.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(`${tn}:${O()}`,t)}catch{}}function Qo(e,t){var i,s;const a=$(((i=c.theme)==null?void 0:i.timezone)||"UTC"),n=O(),o=Dt();ti(a,n,{rating:e,comment:t||""}),Xo();const r=(s=c.backup)==null?void 0:s.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:o,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function ei(e){const t=Ve(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),xt(t)}function ti(e,t,a){const n=Ve(),o=n.findIndex(r=>r.day===e&&r.player===t);o>=0&&(n[o]={...n[o],...a},xt(n))}function ai(e,t){var g;if(!e)return;const a=Ve(),n=((g=c.theme)==null?void 0:g.timezone)||"UTC",o=$(n),r=new Map;for(const u of a)r.has(u.day)||r.set(u.day,{}),r.get(u.day)[u.player]=u;const i=Array.from(r.keys()).sort((u,m)=>m.localeCompare(u)).slice(0,30);if(!i.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},d=u=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(u+"T12:00:00Z"))}catch{return u}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+i.map(u=>{const m=r.get(u),b=m.lennart,f=m.fionn,h=u===o,v=[];if(b&&t!=="fionn"){const y=b.doneAt?'<span class="ag-log-done">✓</span>':"",x=b.rating?`<span class="ag-log-rating">${s[b.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${P(b.mission||"")}</span>${y}${x}</div>`)}if(f&&t!=="lennart"){const y=f.doneAt?'<span class="ag-log-done">✓</span>':"",x=f.rating?`<span class="ag-log-rating">${s[f.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${P(f.mission||"")}</span>${y}${x}</div>`)}return v.length?`<div class="ag-log-day${h?" ag-log-today":""}"><span class="ag-log-date">${d(u)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function rn(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),o=l("#ag-mission-feedback-sent"),r=l("#ag-mission-done-note"),i=e.querySelector(".ag-mini-copy");i&&(i.hidden=!0);const s=Dt();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const d=an(),g=nn();a&&(a.hidden=d),n&&(n.hidden=!d,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(u=>{u.hidden=g})),o&&(o.hidden=!g),r&&(r.hidden=!d),e.querySelectorAll(".ag-mission-rate-btn").forEach(u=>u.classList.remove("is-selected")),ai(l("#ag-mission-log"),O()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function ni(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let tt=-1;function on(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(ma);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<fe.length){tt=a;const n=l("#ag-gesprach-question");n&&(n.textContent=fe[a]);return}}}catch{}sn()}}function ri(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function sn(){let e;do e=Math.floor(Math.random()*fe.length);while(e===tt&&fe.length>1);tt=e;try{localStorage.setItem(ma,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=fe[e])}function oi(){const e=fe[tt]||"";if(!e)return;const t=c.theme&&c.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function ln(){var e;return!!((e=c.quest)!=null&&e.enabled&&Fe(c))}function dn(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,cn())}function ii(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function cn(){const e=Fe(c),t=Se(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),o=l("#ag-quest-loading"),r=l("#ag-quest-actions"),i=l("#ag-quest-result"),s=l("#ag-quest-points"),d=l("#ag-quest-copy"),g=l("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){g&&(g.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),r&&(r.hidden=!0);return}if(a&&(a.textContent=u),o&&(o.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((m,b)=>`<div class="ag-hint-item"><span class="ag-hint-num">${b+1}</span><p>${m}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){g&&(g.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),r&&(r.hidden=!0),i&&(i.textContent=t.successMessage||"",i.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Ze()}`,s.hidden=!1);return}g&&(g.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),r&&(r.hidden=!1),i&&(i.hidden=!0),s&&(s.hidden=!0)}async function si(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),o=l("#ag-quest-points"),r=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const i=await li(e),s=Se(),d=Fe(c),g=(d==null?void 0:d.prompt)||"",u=(d==null?void 0:d.solution)||"";try{const m=await di(i,g,u,s.attempts+1,s.hints);if(s.attempts+=1,m.success){const b=ba[Math.min(s.attempts-1,ba.length-1)],f=ho(b);s.solved=!0,s.pointsEarned=b,s.successMessage=m.message||"Perfekt.",kt(s),re(),n&&(n.textContent=m.message||"Perfekt.",n.hidden=!1),o&&(o.textContent=`+${b} Punkte · Gesamt: ${f}`,o.hidden=!1),a&&(a.hidden=!0),r&&(r.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const h=l("#ag-btn-quest");h&&h.classList.remove("ag-chip-quest-active"),L([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],m.hint||"Versuch nochmal."],kt(s),cn()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function li(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function di(e,t,a,n,o){var s;const r=(s=c.quest)==null?void 0:s.proxyUrl;if(!r)throw new Error("no proxy");const i=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:o})});if(!i.ok)throw new Error("proxy error");return i.json()}function ci(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),o=t.createBuffer(1,n,t.sampleRate),r=o.getChannelData(0);for(let g=0;g<n;g++)r[g]=Math.random()*2-1;const i=t.createBufferSource();i.buffer=o;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),i.connect(s),s.connect(d),d.connect(t.destination),i.start(a),i.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([g,u,m,b,f])=>{const h=t.createOscillator();h.type="sine",h.frequency.setValueAtTime(g,a+m),h.frequency.exponentialRampToValueAtTime(u,a+m+b*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+m),v.gain.linearRampToValueAtTime(f,a+m+.09),v.gain.exponentialRampToValueAtTime(.001,a+m+b),h.connect(v),v.connect(t.destination),h.start(a+m),h.stop(a+m+b+.05)})}catch{}}function gi(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,o)=>{const r=document.createElement("span");r.className="ag-letter-word",r.textContent=n,r.style.animationDelay=`${320+o*155}ms`,a.appendChild(r),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function gn(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function pn(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),L([20,60,20]),ci();const t=l("#ag-letter-photo");if(t&&c.photos&&c.photos.length){const a=Ee(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}pi()}async function pi(){var n;const e=l("#ag-letter-body");if(!e)return;gi(e);const t=(n=c.quest)==null?void 0:n.proxyUrl;if(t)try{const o=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(o.ok){const r=await o.json();if(r.paragraphs&&r.paragraphs.length){gn(e,r.paragraphs);return}}}catch{}const a=Qa[Math.floor(Math.random()*Qa.length)];gn(e,a)}function Nt(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let Pt=null;function ui(){if(!Pt)try{Pt=new(window.AudioContext||window.webkitAudioContext)}catch{}return Pt}function mi(){try{return window.localStorage.getItem(Jr)!=="off"}catch{return!0}}function j(e,t,a,n,o=.15,r="sine"){const i=e.createOscillator(),s=e.createGain();i.connect(s),s.connect(e.destination),i.type=r,i.frequency.value=t;const d=e.currentTime+a;s.gain.setValueAtTime(0,d),s.gain.linearRampToValueAtTime(o,d+.012),s.gain.exponentialRampToValueAtTime(1e-4,d+n),i.start(d),i.stop(d+n+.05)}function at(e){if(!mi())return;const t=ui();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":j(t,280,0,.18,.08,"sine"),j(t,210,.12,.22,.06,"sine");break;case"cursed":j(t,220,0,.12,.1,"triangle"),j(t,170,.09,.28,.07,"triangle");break;case"uncommon":j(t,523,0,.14,.14,"sine"),j(t,784,.1,.22,.12,"sine");break;case"rare":j(t,523,0,.12,.14,"sine"),j(t,659,.09,.12,.14,"sine"),j(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>j(t,a,n*.09,.18,.13,"sine")),j(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>j(t,a,n*.08,.16,.13,"sine")),j(t,2093,.45,.5,.05,"sine");break;default:j(t,523,0,.12,.13,"sine"),j(t,659,.09,.18,.1,"sine");break}}function fi(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const o=e/a;if(o>=.7)return`≈ ${o>=2?Math.round(o):(Math.round(o*10)/10).toString().replace(".",",")}× ${n}`}return null}function hi(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[o,r]of Object.entries(n))if(a.startsWith("trail/"+o)){a="trail/"+r+a.slice(6+o.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function bi(e){if(!e||!e.includes("alltrails.com"))return null;function t(o){const r=o.indexOf("?"),i=r===-1?o:o.slice(0,r),s=r===-1?"":o.slice(r+1),d=new URLSearchParams(s);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),i+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const o=e.match(/[?&]sh=([^&#]+)/),r=o?`&sh=${o[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${r}`)}const n=hi(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function _t(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,o).catch(()=>fetch(a.endpointUrl,{...o,mode:"no-cors"}).catch(()=>{}))}function yi(e){const t=Ye();t.unshift(e),Je(t),V("gipfelbuch"),_t("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function vi(e){Je(Ye().filter(t=>t.id!==e)),V("gipfelbuch"),_t("gipfel-delete",{id:e})}function xi(e,t){const a=Ye(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const o={...a[n],...t};a[n]=o,Je(a),V("gipfelbuch"),_t("gipfel-upsert",o)}function wi(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?to(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),o=n?bi(e.activityUrl):null,r=e.cover?`<div class="ag-gipfel-cover"><img src="${P(e.cover)}" alt="${P(e.name||"")}" loading="lazy" decoding="async"></div>`:"",i=e.elevGain||e.elevation,s=e.distance?`${P(e.distance)} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${P(e.activityUrl)}" target="_blank" rel="noopener noreferrer">↗</a>`:"",g=s||d?`<div class="ag-gipfel-stats">${s}${s&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${r}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Xr(e.date)}</div>
        <div class="ag-gipfel-name">${P(e.name||"—")}</div>
      </div>
      ${i?`<div class="ag-gipfel-elev">↑ ${ht(i)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${P(e.id)}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${P(e.id)}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${g}
    ${e.notes?`<p class="ag-gipfel-notes">${P(e.notes)}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&o?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var ie;const h=l("[data-ag-berge-form]"),v=l("[data-ag-berge-add]");if(!h)return;const y=l("[data-ag-berge-edit-id]");y&&(y.value=e.id);const x=l("[data-ag-berge-name]");x&&(x.value=e.name||"");const I=l("[data-ag-berge-dist]");I&&(I.value=e.distance||"");const T=l("[data-ag-berge-gain]");T&&(T.value=e.elevGain||e.elevation||"");const E=l("[data-ag-berge-date]");E&&(E.value=e.date||"");const D=l("[data-ag-berge-url]");D&&(D.value=e.activityUrl||"");const q=l("[data-ag-berge-cover]");q&&(q.value=e.cover||"");const Q=l("[data-ag-berge-notes]");Q&&(Q.value=e.notes||"");const xe=l("[data-ag-berge-lat]");xe&&(xe.value=e.lat||"");const _e=l("[data-ag-berge-lng]");_e&&(_e.value=e.lng||"");const we=l("[data-ag-berge-loc-label]");we&&(we.value=e.locLabel||"");const Be=l("[data-ag-loc-search]");Be&&(Be.value=e.locLabel||"");const qe=l("[data-ag-berge-form-title]");qe&&(qe.textContent="Eintrag bearbeiten");const Ue=l("[data-ag-berge-save] span:last-child");Ue&&(Ue.textContent="Speichern"),h.hidden=!1,v&&(v.hidden=!0),(ie=l("[data-ag-sheet-backdrop]"))==null||ie.classList.add("is-open"),h.scrollIntoView({behavior:"smooth",block:"nearest"}),x&&x.focus(),L(8)});const m=t.querySelector("[data-ag-gipfel-delete]");m&&m.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(vi(e.id),Me(),L(8),Promise.resolve().then(()=>Fi).then(h=>h.showToast("Eintrag gelöscht")).catch(()=>{}))});const b=t.querySelector("[data-ag-map-komoot]");b&&b.addEventListener("click",()=>{const h=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(h){if(!h.hidden){h.hidden=!0,b.textContent="🗺 Komoot-Karte";return}h.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,h.hidden=!1,b.textContent="Karte schließen",L(4)}});const f=t.querySelector("[data-ag-map-alltrails]");return f&&o&&f.addEventListener("click",()=>{const h=t.querySelector("[data-ag-map-wrap-alltrails]");if(h){if(!h.hidden){h.hidden=!0,f.textContent="🗺 AllTrails-Karte";return}h.innerHTML=`<iframe src="${P(o)}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,h.hidden=!1,f.textContent="Karte schließen",L(4)}}),t}function Me(){const e=l("[data-ag-berge-list]"),t=l("[data-ag-berge-empty]"),a=l("[data-ag-berge-total]"),n=l("[data-ag-berge-analogy]");if(!e)return;const o=Ye().sort((i,s)=>{const d=i.date||"",g=s.date||"";return g<d?-1:g>d?1:0});e.innerHTML="";const r=o.reduce((i,s)=>i+(Number(s.elevGain)||Number(s.elevation)||0),0);if(a&&(a.textContent=r>0?ht(r):"— m"),n){const i=fi(r);i?(n.textContent=i,n.hidden=!1):n.hidden=!0}if(!o.length){t&&(t.hidden=!1),mn([]);return}t&&(t.hidden=!0),o.forEach(i=>e.appendChild(wi(i))),mn(o)}function ki(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function o(){const r=e.querySelector("[data-ag-berge-lat]"),i=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");r&&(r.value=""),i&&(i.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const r=t.value.trim();if(!r){o();return}n=setTimeout(async()=>{try{const i=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(i,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(g=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=g.display_name,u.addEventListener("click",()=>{const m=e.querySelector("[data-ag-berge-lat]"),b=e.querySelector("[data-ag-berge-lng]"),f=e.querySelector("[data-ag-berge-loc-label]");m&&(m.value=g.lat),b&&(b.value=g.lon),f&&(f.value=g.display_name),t.value=g.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",r=>{!t.contains(r.target)&&!a.contains(r.target)&&(a.hidden=!0)})}function Si(){ki(C)}let H=null,nt=null;function un(){H&&setTimeout(()=>H.invalidateSize(),150)}async function Ei(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function mn(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await Ei()}catch{return}const n=window.L,o=document.getElementById("ag-gipfel-map");if(!o)return;const r=[[45.8,5.9],[47.8,10.5]],i=[[35,-11],[71,32]];if(!H){H=n.map(o).fitBounds(r),n.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',subdomains:"abcd",maxZoom:19}).addTo(H);const s=t.querySelectorAll("[data-map-view]");s.forEach(d=>{d.addEventListener("click",()=>{s.forEach(u=>u.classList.remove("is-active")),d.classList.add("is-active");const g=d.dataset.mapView==="eu"?i:r;H.fitBounds(g)})})}nt?nt.clearLayers():nt=n.layerGroup().addTo(H),a.forEach(s=>{const d=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),g=document.createElement("div");g.style.cssText="min-width:130px";const u=s.elevGain||s.elevation;g.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${P(s.name||"—")}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${ht(u)}</div>`:""}
    `;const m=document.createElement("button");m.type="button",m.textContent="Zum Eintrag",m.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",m.addEventListener("click",()=>{d.closePopup();const b=C.querySelector(`[data-ag-gipfel-id="${s.id}"]`);b&&(b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("ag-gipfel-highlight"),setTimeout(()=>b.classList.remove("ag-gipfel-highlight"),1200))}),g.appendChild(m),d.bindPopup(g),nt.addLayer(d)}),requestAnimationFrame(()=>{H&&H.invalidateSize()}),setTimeout(()=>{H&&H.invalidateSize()},250)}const fn=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function hn(e){return fn[Math.min(e-1,fn.length-1)]}function he(e,t){return e+Math.random()*(t-e)}function bn(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${c.baerlauch.level}`)}function $e(){c.baerlauch.timerId&&(clearInterval(c.baerlauch.timerId),c.baerlauch.timerId=null)}function yn(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),o=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),i=l("#ag-baerlauch-actions");i&&(i.hidden=!0),$e(),c.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),o&&(o.innerHTML=""),r&&(r.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),vn(O(),c.baerlauch.level,!1),qt()}function Ti(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions"),r=l("#ag-baerlauch-next");$e(),c.baerlauch.level+=1;const i=Ai(O(),c.baerlauch.level);if(vn(O(),c.baerlauch.level,!0),qt(),bn(),i&&Z(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&c.photos&&c.photos.length){const s=Ee(),d=s.length?s[Math.floor(Math.random()*s.length)]:null;Pn(a,d),t.hidden=!1;const g=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=g[Math.floor(Math.random()*g.length)]}r&&(r.textContent=`Level ${c.baerlauch.level} starten`),o&&(o.hidden=!1)}function Ci(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),o=hn(c.baerlauch.level).timeMs;c.baerlauch.durationMs=o,c.baerlauch.startedAt=performance.now(),$e(),c.baerlauch.timerId=setInterval(()=>{const r=performance.now()-c.baerlauch.startedAt,i=Math.max(0,o-r),s=Math.min(1,r/o);t&&(t.textContent=(i/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),g=Math.pow(s,1.4);d.forEach(u=>{u.style.filter=`brightness(${1-g*.72}) saturate(${1-g*.45}) hue-rotate(${g*8}deg)`,u.style.opacity=String(1-g*.28)}),i<=0&&($e(),e())},50)}function Bt(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),o=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),i=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!o||!r)return;if(e.hidden=!1,qt(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),c.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,o.innerHTML="",r.textContent="",i&&(i.hidden=!0),bn();const s=hn(c.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],g=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...d.slice(0,s.good).map(f=>({emoji:f,good:!0})),...g.slice(0,s.bad).map(f=>({emoji:f,good:!1}))];let m=0;const b=u.filter(f=>f.good).length;u.forEach(f=>{const h=document.createElement("button");h.type="button",h.className="ag-forage-item",h.textContent=f.emoji,h.dataset.good=f.good?"true":"false",h.style.left=`${he(8,82)}%`,h.style.top=`${he(10,72)}%`,h.style.setProperty("--dx",`${he(-320,320)}px`),h.style.setProperty("--dy",`${he(-220,220)}px`),h.style.setProperty("--dur",`${he(s.speedMin,s.speedMax)}s`),h.style.setProperty("--delay",`${he(-1.8,0)}s`),h.addEventListener("click",()=>{c.baerlauch.locked||(h.dataset.good==="true"?(h.classList.add("is-picked"),h.disabled=!0,m+=1,setTimeout(()=>h.remove(),140),m===b&&Ti()):yn("poison"))}),t.appendChild(h)}),Ci(()=>yn("timeout"))}function Li(){const e=l("#ag-baerlauch-panel");$e(),e&&(e.hidden=!0)}function Ai(e,t){var o;const a=wt(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=(o=c.backup)==null?void 0:o.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function vn(e,t,a){var i;const n=Ia(),o=((i=c.theme)==null?void 0:i.timezone)||"UTC",r=$(o);n.unshift({date:r,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function qt(){var m;const e=l("#ag-baerlauch-scores");if(!e)return;const a=O()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",o=wt(),r=Ia(),i=a==="fionn"?"lennart":"fionn",s=a in o||i in o;if(!s&&!r.length){e.hidden=!0;return}e.hidden=!1;const d=((m=c.theme)==null?void 0:m.timezone)||"UTC",g=b=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:d}).format(new Date(b+"T12:00:00Z"))}catch{return b}};let u="";if(s){const b=o[a]??0,f=o[i]??0;u+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${b||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${f||"—"}</span></div>
    </div>`}if(r.length){const b=r.slice(0,8).map(f=>{const h=f.player===a,v=h?"ag-score-mine":"ag-score-theirs",y=h?"Du":n,x=f.won?`✓ Level ${f.level}`:`✗ Level ${f.level-1>=1?f.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${g(f.date)}</span><span class="ag-score-pill ${v}">${y}</span><span class="ag-score-result">${x}</span></div>`}).join("");u+=`<div class="ag-score-table">${b}</div>`}e.innerHTML=u}const z={recorder:null,audioBlob:null,lang:"swabian"};function rt(){try{return JSON.parse(window.localStorage.getItem(ya)||"[]")||[]}catch{return[]}}function ot(e){try{window.localStorage.setItem(ya,JSON.stringify(e))}catch{}}function zi(e){const t=rt();t.unshift(e),ot(t),V("glossary"),Ut("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Ii(e,t){const a=rt(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const o={...a[n],...t};a[n]=o,ot(a),V("glossary"),Ut("glossary-upsert",o)}function Mi(e){ot(rt().filter(t=>t.id!==e)),V("glossary"),Ut("glossary-delete",{id:e})}async function xn(){const e=c.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=M(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,o=setTimeout(()=>n.abort(),12e3);let r;try{r=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(o)}if(!r.ok)return 0;const i=await r.json();return!i.ok||!Array.isArray(i.glossary)?0:(Ct("glossary")||ot(i.glossary.filter(s=>s.id)),i.glossary.length)}catch{return 0}}function Ut(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:M(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function jt(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function $i(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return jt(e);try{const n=await jt(e),o=n.split(",")[1],r=e.type||"audio/webm",i=JSON.stringify({type:"glossary-audio",token:M(),filename:`glossary-${t}.webm`,mimeType:r,data:o}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i})).json();return d.ok&&d.url?d.url:n}catch{return jt(e)}}const Di={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function Ni(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${P(Di[e.lang]||e.lang)}</span>`:"";a.innerHTML=`
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
  `;const o=a.querySelector("[data-ag-glossary-play]");o&&e.audioUrl&&o.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),L(6)});const r=a.querySelector("[data-ag-glossary-edit]");r&&r.addEventListener("click",()=>{var b;const s=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const g=document.getElementById("ag-glossary-form-title");g&&(g.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const m=document.getElementById("ag-glossary-audio-status");m&&(m.textContent=e.audioUrl?"Aufnahme vorhanden":""),z.audioBlob=null,s.hidden=!1,d&&(d.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(b=document.getElementById("ag-glossary-word-input"))==null||b.focus(),L(8)});const i=a.querySelector("[data-ag-glossary-del]");return i&&i.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(Mi(e.id),ge(z.lang),L(8))}),a}function ge(e){var i;z.lang=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===z.lang)}),wn();const n=(((i=document.getElementById("ag-glossary-search"))==null?void 0:i.value)||"").trim().toLowerCase(),o=rt(),r=n?o.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):o.filter(s=>s.lang===z.lang);if(t.innerHTML="",!r.length){a&&(a.textContent=n?"Kein Treffer.":"Noch kein Wort hier. Füg eins hinzu.",a.hidden=!1);return}a&&(a.hidden=!0),r.forEach(s=>t.appendChild(Ni(s,!!n)))}function wn(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function kn(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),z.lang="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),ge("swabian"),window.requestAnimationFrame(()=>wn()),L(10),xn().then(a=>{a>0&&ge(z.lang)})}function Pi(){var n;const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),(n=document.querySelector("[data-ag-sheet-backdrop]"))==null||n.classList.remove("is-open"),z.audioBlob=null,z.recorder&&z.recorder.state!=="inactive")try{z.recorder.stop()}catch{}z.recorder=null}const Sn=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],En=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];async function _i(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(ue)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(ue,"granted")}catch{}await Rt();return}if(e==="denied"){try{window.localStorage.setItem(ue,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"))}function Bi(){var s;const e=((s=c.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),o=a*60+n,r=8*60,i=o<r?r-o:24*60-o+r;return Date.now()+i*60*1e3}async function Ot(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=c.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=M(),o=$(a);if(B().some(m=>m.token===n&&m.day===o)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:i,m:s}=ft(a);if(i>=21)return;const d=((21-i)*60-s)*60*1e3-new Date().getSeconds()*1e3,g=Ne(),u=En[ka(En)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:u.title.replace("{name}",g),body:u.body.replace("{name}",g)})}catch{}}async function qi(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,o=Ne(),r=Sn[ka(Sn)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Bi(),title:r.title.replace("{name}",o),body:r.body.replace("{name}",o)}),(t=c.quest)!=null&&t.enabled&&ln()){const i=Se(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!i.solved&&s!==Re(c)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Re(c)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:c.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:c.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Ui(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function Rt(){if("serviceWorker"in navigator)try{const e=no("sw.js");if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await qi(),await Ot(),await Ui(),await Ri())}catch{}}async function ji(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(ue,"dismissed")}catch{}return}try{window.localStorage.setItem(ue,"granted")}catch{}await Rt()}function Oi(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(a),o=new Uint8Array(n.length);for(let r=0;r<n.length;r++)o[r]=n.charCodeAt(r);return o}async function Ri(){const e=c.push;if(!(!e||!e.enabled||!e.vapidPublicKey)&&!(!("serviceWorker"in navigator)||!("PushManager"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;let a=await t.pushManager.getSubscription();a||(a=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Oi(e.vapidPublicKey)}));const n=c.backup&&c.backup.endpointUrl||"";if(!n)return;const o=JSON.stringify({type:"push-subscribe",token:M(),subscription:a.toJSON()}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o};fetch(n,r).catch(()=>fetch(n,{...r,mode:"no-cors"}).catch(()=>{}))}catch{}}function X(e){const t=C.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}function De(e){c.activeTab=e,C.querySelectorAll("[data-ag-tab]").forEach(i=>{const s=i.dataset.agTab===e;i.classList.toggle("is-active",s),i.setAttribute("aria-selected",s?"true":"false")});const a=54,n=C.querySelector(".ag-bottomnav-btn.is-active"),o=C.querySelector(".ag-nav-pill");if(o&&n){const i=n.closest(".ag-bottomnav"),s=i?i.getBoundingClientRect():null,g=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&g.width){const u=g.left-s.left+g.width/2;o.style.width=`${a}px`,o.style.left=`${u-a/2}px`}}l("[data-ag-panel-today]").hidden=e!=="today",l("[data-ag-panel-history]").hidden=e!=="history",l("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",l("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&W(),e==="lieblinge"&&lt(),e==="berge"&&(un(),Ie().then(()=>{Me(),un()}).catch(()=>Me()));const r=l("[data-ag-fab]");r&&(r.hidden=e!=="berge")}function Tn(){const e=c.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:M(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,o).then(r=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...o,mode:"no-cors"}).then(()=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok")}).catch(()=>{a&&(a.textContent="Gerade keine Verbindung – gleich nochmal probieren.",a.dataset.agHugState="error")}).finally(()=>{t&&window.setTimeout(()=>{t.disabled=!1},2e3)})})}function be(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function Cn(){const e=c.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:M(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){be("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const o=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!o){be("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),be("Stups wird gesendet…","pending");const r=JSON.stringify(n),i=()=>{be("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{be("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(o,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(d=>{d&&d.ok?i():s()}).catch(()=>{try{fetch(o,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(i).catch(s)}catch{s()}})}function Ln(e){const t=M();if(t==="fionn")return;const a=c.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const r=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,i={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:r,message:r,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(i),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,d).catch(()=>{fetch(n,{...d,mode:"no-cors"}).catch(()=>{})})}function Ft(e){const t=c.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:M(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},o=JSON.stringify(n),r=i=>{const s=vt();!s||s.week!==e.week||(Aa({...s,remoteStatus:i,remoteUpdatedAt:Date.now()}),ta())};r("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(i=>{i&&i.ok?r("sent"):r("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).then(()=>r("sent")).catch(()=>r("failed"))}catch{r("failed")}})}function An(){const e=vt();!e||e.week!==bt()||e.remoteStatus!=="sent"&&Ft(e)}function Ht(e,t,a,n,o,r){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,o,r);else{const i=Array.isArray(r)?r:[r,r,r,r],[s,d,g,u]=i.map(m=>Math.min(m,n/2,o/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+o-g),e.quadraticCurveTo(t+n,a+o,t+n-g,a+o),e.lineTo(t+u,a+o),e.quadraticCurveTo(t,a+o,t,a+o-u),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function Gt(e,t,a){const n=t.split(" "),o=[];let r="";for(const i of n){const s=r?`${r} ${i}`:i;e.measureText(s).width>a&&r?(o.push(r),r=i):r=s}return r&&o.push(r),o}function zn(e){var D,q;const o=document.createElement("canvas"),r=Math.min(window.devicePixelRatio||1,2);o.width=640*r,o.height=340*r,o.style.width="640px",o.style.height="340px";const i=o.getContext("2d");i.scale(r,r);const s=e.category.id==="jackpot",d=s?"#2d1f00":"#0d2b1c",g=s?"#1a1000":"#061510",u=i.createLinearGradient(0,0,0,340);u.addColorStop(0,d),u.addColorStop(1,g),i.fillStyle=u,Ht(i,0,0,640,340,20),i.fill();const m=s?"#b9782e":"#2f7a4f";i.fillStyle=m,Ht(i,0,0,640,5,[20,20,0,0]),i.fill();const b=e.category.label,f=Lt(e.category.tone);i.font="bold 13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle=s?"#d4a24c":"#5aba7e",i.fillText(`${f} ${b}`,40,62);const h=e.day;i.font="13px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.45)";const v=i.measureText(h).width;i.fillText(h,600-v,62),i.strokeStyle="rgba(255,255,255,0.1)",i.lineWidth=1,i.beginPath(),i.moveTo(40,76),i.lineTo(600,76),i.stroke(),i.font="bold 24px Boska, Georgia, serif",i.fillStyle="#ffffff";const y=Gt(i,e.outcome.title,640-40*2);let x=108;for(const Q of y)i.fillText(Q,40,x),x+=32;i.font="15px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.72)";const I=Gt(i,e.outcome.message,640-40*2);x+=4;for(const Q of I){if(x>270)break;i.fillText(Q,40,x),x+=22}i.font="11px Satoshi, Inter, system-ui, sans-serif",i.fillStyle="rgba(255,255,255,0.25)";const T=((q=(D=c.theme)==null?void 0:D.brand)==null?void 0:q.machineName)||"Affektions-Gacha";i.fillText(T,40,324);const E=document.createElement("a");E.download=`gacha-${e.category.id}-${e.day}.png`,E.href=o.toDataURL("image/png"),E.click()}function Wt(e){C.style.opacity="1",C.style.background="#0a1410",C.style.minHeight="100vh",C.style.display="flex",C.style.alignItems="center",C.style.justifyContent="center",C.style.padding="24px",C.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${P(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function In(){c.todaysPull||(c.todaysPull=To());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=c.theme.loadingSteps||["Maschine rattert"];let n=0;C.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const o=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((c.theme.revealDelayMs||3200)/a.length))),r=c.theme.revealDelayMs||3200,i=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=i.map(m=>parseFloat(m.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let g;function u(m){const b=Math.min((m-d)/r,1),f=1+5*b*b;i.forEach((h,v)=>{h.style.setProperty("--ag-emoji-duration",`${(s[v]/f).toFixed(3)}s`)}),b<1&&(g=requestAnimationFrame(u))}g=requestAnimationFrame(u),window.setTimeout(()=>{var v,y,x,I;window.clearInterval(o),cancelAnimationFrame(g),i.forEach((T,E)=>{T.style.setProperty("--ag-emoji-duration",`${s[E].toFixed(2)}s`)});const m=B().some(T=>T.day===c.todaysPull.day&&T.token===c.todaysPull.token);c.todaysPull.collectToken&&!m&&Ea(c.todaysPull.collectToken),c.todaysPull.freikarte&&!m&&La(c.todaysPull.token),Xt(c.todaysPull),C.classList.remove("is-revealing"),C.classList.add("is-revealed"),C.classList.add("has-drawn"),e.disabled=!1,t.textContent=c.theme.brand.buttonShown,c.revealed=!0,te()||ds(c.todaysPull),Ot();const b=J();Yt(),Zi(b);const f=(y=(v=c.todaysPull)==null?void 0:v.category)==null?void 0:y.id,h=(I=(x=c.todaysPull)==null?void 0:x.category)==null?void 0:I.tone;if(f==="special"){const T=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];Z(130,T),setTimeout(()=>Z(90,T),700),at("special")}else if(h==="jackpot"){const T=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];Z(120,T),setTimeout(()=>Z(80,T),650),at("jackpot")}else h==="rare"?(Z(70),at("rare")):at(h||"common");te()||Promise.resolve().then(()=>Ns).then(T=>T.flashLightsForPull()).catch(()=>{}),Dn[b]?L([30,20,30,20,60]):L([20,20,40]),c.activeTab==="history"&&W(),_i()},c.theme.revealDelayMs||3200)}function Mn(){var Yn,Jn,Vn,Zn,Xn,Qn,er,tr,ar,nr,rr,or,ir,sr,lr,dr,cr,gr,pr,ur,mr,fr,hr,br,yr,vr,xr,wr,kr,Sr,Er,Tr,Cr,Lr,Ar,zr,Ir,Mr;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(pn,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,pn();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{L(12),In()}),(Yn=l("#ag-btn-rave"))==null||Yn.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Jn=l("#ag-btn-rave"))==null||Jn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Vn=l("#ag-btn-baerlauch"))==null||Vn.addEventListener("click",Bt),(Zn=l("#ag-baerlauch-close"))==null||Zn.addEventListener("click",Li),(Xn=l("#ag-baerlauch-next"))==null||Xn.addEventListener("click",Bt),(Qn=l("#ag-btn-baerlauch"))==null||Qn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Bt())}),(er=l("#ag-btn-gesprach"))==null||er.addEventListener("click",on),(tr=l("#ag-btn-glossary"))==null||tr.addEventListener("click",kn),(ar=l("#ag-btn-glossary"))==null||ar.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),kn())}),(nr=l("#ag-glossary-close"))==null||nr.addEventListener("click",Pi),(rr=document.getElementById("ag-glossary-refresh"))==null||rr.addEventListener("click",async()=>{const p=document.getElementById("ag-glossary-refresh");p&&(p.disabled=!0,p.textContent="⏳"),L(6);const w=await xn();ge(z.lang),p&&(p.textContent=w>0?`↻${w}`:"↻",setTimeout(()=>{p.textContent="↻",p.disabled=!1},3e3)),w>0&&X(`${w} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(p=>{p.addEventListener("click",()=>{const w=document.getElementById("ag-glossary-search");w&&(w.value=""),ge(p.dataset.lang),L(4)})}),(or=document.getElementById("ag-glossary-search"))==null||or.addEventListener("input",()=>{ge(z.lang)});const o=document.getElementById("ag-glossary-add"),r=document.getElementById("ag-glossary-form");o&&o.addEventListener("click",()=>{var A,N;if(!r)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const p=document.getElementById("ag-glossary-form-title");p&&(p.textContent="Neues Wort");const w=document.getElementById("ag-glossary-save-label");w&&(w.textContent="Eintragen");const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent=""),z.audioBlob=null;const S=document.getElementById("ag-glossary-play-preview");S&&(S.hidden=!0),r.hidden=!1,o.hidden=!0,(A=l("[data-ag-sheet-backdrop]"))==null||A.classList.add("is-open"),(N=document.getElementById("ag-glossary-word-input"))==null||N.focus(),L(8)}),(ir=document.getElementById("ag-glossary-form-cancel"))==null||ir.addEventListener("click",()=>{var p;if(r&&(r.hidden=!0),o&&(o.hidden=!1),(p=l("[data-ag-sheet-backdrop]"))==null||p.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",z.audioBlob=null,z.recorder&&z.recorder.state!=="inactive")try{z.recorder.stop()}catch{}z.recorder=null,L(6)}),(sr=document.getElementById("ag-glossary-form-save"))==null||sr.addEventListener("click",async()=>{var N,_,F,se,ee;const p=(((N=document.getElementById("ag-glossary-word-input"))==null?void 0:N.value)||"").trim(),w=(((_=document.getElementById("ag-glossary-meaning-input"))==null?void 0:_.value)||"").trim(),k=(((F=document.getElementById("ag-glossary-edit-id"))==null?void 0:F.value)||"").trim();if(!p){(se=document.getElementById("ag-glossary-word-input"))==null||se.focus();return}const S=document.getElementById("ag-glossary-audio-status");let A=null;if(z.audioBlob){S&&(S.textContent="Wird hochgeladen…");const U=k||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;A=await $i(z.audioBlob,U)}if(L([20,20,40]),k){const U={word:p,meaning:w||null};A!==null&&(U.audioUrl=A),Ii(k,U)}else zi({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:z.lang,word:p,meaning:w||null,audioUrl:A,token:M()});r&&(r.hidden=!0),o&&(o.hidden=!1),(ee=l("[data-ag-sheet-backdrop]"))==null||ee.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",z.audioBlob=null,z.recorder=null,ge(z.lang),X("Wort gespeichert ✓")});const i=document.getElementById("ag-glossary-record");i&&i.addEventListener("click",async()=>{if(z.recorder&&z.recorder.state==="recording"){z.recorder.stop();return}try{const p=await navigator.mediaDevices.getUserMedia({audio:!0}),w=[];z.recorder=new MediaRecorder(p),z.recorder.ondataavailable=S=>{S.data.size>0&&w.push(S.data)},z.recorder.onstop=()=>{p.getTracks().forEach(N=>N.stop()),z.audioBlob=new Blob(w,{type:z.recorder.mimeType||"audio/webm"});const S=document.getElementById("ag-glossary-audio-status");S&&(S.textContent="✓ Aufnahme bereit");const A=document.getElementById("ag-glossary-play-preview");A&&(A.hidden=!1),i.textContent="🎙 Neu aufnehmen"},z.recorder.start(),i.textContent="⏹ Stop";const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent="● REC"),L(10)}catch{const w=document.getElementById("ag-glossary-audio-status");w&&(w.textContent="Mikrofon nicht verfügbar")}}),(lr=document.getElementById("ag-glossary-play-preview"))==null||lr.addEventListener("click",()=>{if(!z.audioBlob)return;const p=URL.createObjectURL(z.audioBlob),w=new Audio(p);w.onended=()=>URL.revokeObjectURL(p),w.play().catch(()=>{})}),(dr=l("#ag-btn-mission"))==null||dr.addEventListener("click",rn),(cr=l("#ag-btn-mission"))==null||cr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),rn())}),(gr=l("#ag-mission-close"))==null||gr.addEventListener("click",ni),(pr=l("#ag-mission-done"))==null||pr.addEventListener("click",()=>{Zo();const p=l("#ag-mission-actions"),w=l("#ag-mission-feedback"),k=l("#ag-mission-done-note"),S=l("#ag-btn-mission");p&&(p.hidden=!0),k&&(k.hidden=!1),w&&!nn()&&(w.hidden=!1),S&&S.classList.remove("ag-chip-mission-active")}),(ur=l("#ag-mission-panel"))==null||ur.querySelectorAll(".ag-mission-rate-btn").forEach(p=>{p.addEventListener("click",()=>{var w;(w=l("#ag-mission-panel"))==null||w.querySelectorAll(".ag-mission-rate-btn").forEach(k=>k.classList.remove("is-selected")),p.classList.add("is-selected")})}),(mr=l("#ag-mission-feedback-send"))==null||mr.addEventListener("click",()=>{var N;const p=l("#ag-mission-panel"),w=p==null?void 0:p.querySelector(".ag-mission-rate-btn.is-selected"),k=(w==null?void 0:w.dataset.rating)||null,S=(((N=l("#ag-mission-comment"))==null?void 0:N.value)||"").trim();Qo(k,S);const A=l("#ag-mission-feedback-sent");p==null||p.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(_=>{_.hidden=!0}),A&&(A.hidden=!1)}),(fr=l("#ag-letter-close"))==null||fr.addEventListener("click",Nt),(hr=l("#ag-letter-overlay"))==null||hr.addEventListener("click",p=>{p.target===p.currentTarget&&Nt()}),(br=l("#ag-lightbox-close"))==null||br.addEventListener("click",()=>{Zt()}),(yr=l("#ag-lightbox"))==null||yr.addEventListener("click",p=>{p.target===p.currentTarget&&Zt()}),document.addEventListener("keydown",p=>{p.key==="Escape"&&(Nt(),Zt())}),(vr=l("#ag-gesprach-close"))==null||vr.addEventListener("click",ri),(xr=l("#ag-gesprach-next"))==null||xr.addEventListener("click",sn),(wr=l("#ag-gesprach-wa"))==null||wr.addEventListener("click",oi),(kr=l("#ag-btn-gesprach"))==null||kr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),on())}),(Sr=l("#ag-btn-quest"))==null||Sr.addEventListener("click",dn),(Er=l("#ag-quest-close"))==null||Er.addEventListener("click",ii),(Tr=l("#ag-btn-quest"))==null||Tr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),dn())}),(Cr=l("#ag-quest-file"))==null||Cr.addEventListener("change",p=>{const w=p.target.files&&p.target.files[0];w&&si(w)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!c.todaysPull)return;L(8);const p=_n(c.todaysPull);try{await navigator.clipboard.writeText(p),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",p)}}),l("[data-ag-save-img]").addEventListener("click",()=>{c.todaysPull&&(L(8),zn(c.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{L(8),ls(c.todaysPull)}),(Lr=l("[data-ag-freikarte-redeem]"))==null||Lr.addEventListener("click",()=>{const p=c.todaysPull;if(!p)return;const w=p.category.tone;if(w!=="quiet"&&w!=="cursed"||!co(p.token))return;const k=J(),S=Co(p.day,k);po(p.token,p.day,{categoryId:S.category.id,outcomeTitle:S.outcome.title}),c.todaysPull={...p,category:S.category,outcome:S.outcome,photo:S.photo,collectToken:S.collectToken,voucher:S.voucher,freikarte:S.freikarte,unlockTime:null,promptAnswer:null};const A=B(),N=A.findIndex(_=>_.day===p.day&&_.token===p.token);N!==-1&&(A[N]={...A[N],categoryId:S.category.id,categoryLabel:S.category.label,tone:S.category.tone,title:S.outcome.title,message:S.outcome.message,link:S.outcome.link||null,unlockTime:null,promptAnswer:null,photo:S.photo?{url:S.photo.url,alt:S.photo.alt||"",caption:(S.photo.caption||"").trim(),type:S.photo.type==="video"?"video":"image"}:null,voucher:S.voucher||!1},ce(A)),re(),c.todaysPull.collectToken&&Ea(c.todaysPull.collectToken),c.todaysPull.freikarte&&La(c.todaysPull.token),Xt(c.todaysPull),c.activeTab==="history"&&W(),Z(50),X("Freikarte eingelöst — nochmal gezogen! 🎟️✨"),L([20,20,40])});const s=l("[data-ag-streak-restore]");s&&s.addEventListener("click",()=>{if(!Pa()){Jt();return}const p=Tt(),w=Et(),S=Xe()>0&&w-Xe()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${w-1} Streak-Retter übrig.`;if(!window.confirm(S))return;s.disabled=!0;const N=ko();W(),Yt(),N&&(Z(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),L([30,20,30,20,60])),Jt(),s.disabled=!1});const d=l("[data-ag-sync-btn]");d&&d.addEventListener("click",async()=>{d.textContent="⏳",d.disabled=!0;const p=await Ie();W(),d.textContent=p<0?"✗":`✓${p}`,setTimeout(()=>{d.textContent="☁",d.disabled=!1},3e3)}),C.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(p=>{p.addEventListener("click",()=>{L(5),Hi(p.dataset.agFilter)})}),C.querySelectorAll("[data-ag-tab]").forEach(p=>{p.addEventListener("click",()=>{L(6),De(p.dataset.agTab)})});const g=C.querySelector(".ag-bottomnav");if(g){const p=g.querySelector(".ag-nav-pill"),w=[...g.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let k=null;g.addEventListener("pointerdown",A=>{const N=g.getBoundingClientRect(),_=parseFloat(p==null?void 0:p.style.width)||54;k={id:A.pointerId,startX:A.clientX-N.left,pillStartCentre:(parseFloat(p==null?void 0:p.style.left)||0)+_/2,pillWidth:_,moved:!1,suppress:!1,captured:!1}}),g.addEventListener("pointermove",A=>{if(!k||A.pointerId!==k.id)return;const N=g.getBoundingClientRect(),_=A.clientX-N.left-k.startX;if(!k.moved&&Math.abs(_)<6||(k.captured||(g.setPointerCapture(A.pointerId),k.captured=!0),k.moved=!0,k.suppress=!0,!p))return;p.style.transition="none";const F=g.getBoundingClientRect(),se=k.pillStartCentre+_,ee=k.pillWidth/2;let U=se-ee;U<0?U=U*.25:U+k.pillWidth>F.width&&(U=F.width-k.pillWidth+(U+k.pillWidth-F.width)*.25),p.style.left=`${U}px`});const S=A=>{if(!k||A.pointerId!==k.id)return;const N=k.moved,_=k.suppress;if(k=null,p&&(p.style.transition=""),!N)return;const F=g.getBoundingClientRect(),se=A.clientX-F.left;let ee=w[0],U=1/0;if(w.forEach(pe=>{const le=pe.getBoundingClientRect(),gt=le.left-F.left+le.width/2,je=Math.abs(se-gt);je<U&&(U=je,ee=pe)}),L(6),De(ee.dataset.agTab),_){const pe=le=>{le.stopImmediatePropagation(),le.preventDefault()};g.addEventListener("click",pe,{capture:!0,once:!0})}};g.addEventListener("pointerup",S),g.addEventListener("pointercancel",A=>{!k||A.pointerId!==k.id||(k=null,p&&(p.style.transition=""),De(c.activeTab))})}const u=l("[data-ag-reaction-bar]");u&&u.addEventListener("click",p=>{var S;const w=p.target.closest("[data-ag-reaction]");if(!w)return;L([10,10,20]);const k=w.dataset.agReaction;Do(k),At(),(S=u.querySelector(`[data-ag-reaction="${k}"]`))==null||S.classList.add("ag-reaction-pop"),X(`Reaktion an ${Te()} gesendet 💌`)}),C.addEventListener("ag-synced",()=>{try{At(),Oa();const p=c._freshReactions;if(c._freshReactions=null,Array.isArray(p)&&p.length){const w=p[p.length-1];X(`${Te()} hat mit ${w.emoji} auf deine Kapsel reagiert`),L([15,20,15]),c.activeTab==="history"&&W()}}catch{}}),(Ar=l("#ag-btn-stimmung"))==null||Ar.addEventListener("click",Ka),(zr=l("#ag-btn-stimmung"))==null||zr.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Ka())}),(Ir=l("#ag-stimmung-close"))==null||Ir.addEventListener("click",qo),Uo();const m=l("[data-ag-berge-add]"),b=l("[data-ag-berge-form]"),f=l("[data-ag-berge-cancel]"),h=l("[data-ag-berge-save]");m&&m.addEventListener("click",()=>{var w,k;L(8);const p=l("[data-ag-berge-date]");p&&!p.value&&(p.value=$(((w=c.theme)==null?void 0:w.timezone)||"Europe/Zurich")),b.hidden=!1,m.hidden=!0,(k=l("[data-ag-sheet-backdrop]"))==null||k.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),f&&f.addEventListener("click",()=>{var A;L(6),b.hidden=!0,m.hidden=!1,(A=l("[data-ag-sheet-backdrop]"))==null||A.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(N=>{const _=l(N);_&&(_.value="")});const p=l("[data-ag-loc-search]");p&&(p.value="");const w=l("[data-ag-loc-dropdown]");w&&(w.hidden=!0,w.innerHTML="");const k=l("[data-ag-berge-form-title]");k&&(k.textContent="Neuer Gipfeleintrag");const S=l("[data-ag-berge-save] span:last-child");S&&(S.textContent="Eintragen")}),h&&h.addEventListener("click",()=>{var $r,Dr,Nr,Pr,_r,Br,qr,Ur,jr,Or,Rr,Fr,Hr,Gr;const p=((($r=l("[data-ag-berge-name]"))==null?void 0:$r.value)||"").trim(),w=parseFloat(((Dr=l("[data-ag-berge-dist]"))==null?void 0:Dr.value)||""),k=parseInt(((Nr=l("[data-ag-berge-gain]"))==null?void 0:Nr.value)||"",10),S=((Pr=l("[data-ag-berge-date]"))==null?void 0:Pr.value)||$(((_r=c.theme)==null?void 0:_r.timezone)||"Europe/Zurich"),A=(((Br=l("[data-ag-berge-url]"))==null?void 0:Br.value)||"").trim(),N=(((qr=l("[data-ag-berge-cover]"))==null?void 0:qr.value)||"").trim(),_=(((Ur=l("[data-ag-berge-notes]"))==null?void 0:Ur.value)||"").trim(),F=(((jr=l("[data-ag-berge-edit-id]"))==null?void 0:jr.value)||"").trim(),se=(((Or=l("[data-ag-berge-lat]"))==null?void 0:Or.value)||"").trim()||null,ee=(((Rr=l("[data-ag-berge-lng]"))==null?void 0:Rr.value)||"").trim()||null,U=(((Fr=l("[data-ag-berge-loc-label]"))==null?void 0:Fr.value)||"").trim()||null;if(!p){(Hr=l("[data-ag-berge-name]"))==null||Hr.focus();return}L([20,20,40]);const pe={name:p,elevation:null,distance:isNaN(w)?null:w,elevGain:isNaN(k)?null:k,date:S,activityUrl:A||null,cover:N||null,notes:_||null,lat:se,lng:ee,locLabel:U};F?xi(F,pe):yi({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...pe,token:M()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Ps=>{const Wr=l(Ps);Wr&&(Wr.value="")});const le=l("[data-ag-loc-search]");le&&(le.value="");const gt=l("[data-ag-berge-form-title]");gt&&(gt.textContent="Neuer Gipfeleintrag");const je=l("[data-ag-berge-save] span:last-child");je&&(je.textContent="Eintragen"),b.hidden=!0,m.hidden=!1,(Gr=l("[data-ag-sheet-backdrop]"))==null||Gr.classList.remove("is-open"),Me(),X("Gipfel gespeichert ✓")}),Si();const v=l("[data-ag-ping-card]");v&&(v.hidden=!(M()==="fionn"&&((Mr=c.backup)!=null&&Mr.enabled)));const y=l("[data-ag-ping-dismiss]");y&&y.addEventListener("click",()=>{const p=l("[data-ag-ping-banner]");p&&(p.hidden=!0)});const x=l("[data-ag-ping-send]");x&&x.addEventListener("click",()=>{L([20,30,20]);try{Tn()}catch{}});const I=l("[data-ag-hug-send]");I&&I.addEventListener("click",()=>{L([20,30,20]);try{Cn()}catch{}});const T=l("[data-ag-wish-open]"),E=l("[data-ag-wish-cancel]"),D=l("[data-ag-wish-submit]");T&&T.addEventListener("click",()=>{L(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const p=l("[data-ag-wish-input]");p&&window.setTimeout(()=>p.focus(),60)}),E&&E.addEventListener("click",()=>{L(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),D&&D.addEventListener("click",()=>{const p=l("[data-ag-wish-input]"),w=((p==null?void 0:p.value)||"").trim();if(!w)return;L([20,20,40]);const k={week:bt(),text:w,submittedAt:Date.now(),remoteStatus:"idle"};Aa(k),ta();try{Ft(k)}catch{}});const q=l("[data-ag-notif-enable]"),Q=l("[data-ag-notif-dismiss]");q&&q.addEventListener("click",()=>{L(10),ji()}),Q&&Q.addEventListener("click",()=>{L(6);try{window.localStorage.setItem(ue,"dismissed")}catch{}const p=l("[data-ag-notif-card]");p&&(p.hidden=!0)});const xe=l("[data-ag-sheet-backdrop]");xe&&xe.addEventListener("click",()=>{L(6);const p=l("[data-ag-berge-form]"),w=l("[data-ag-berge-add]");p&&!p.hidden&&(p.hidden=!0,w&&(w.hidden=!1));const k=document.getElementById("ag-glossary-form"),S=document.getElementById("ag-glossary-add");k&&!k.hidden&&(k.hidden=!0,S&&(S.hidden=!1)),xe.classList.remove("is-open")});const _e=l("[data-ag-fab]");_e&&_e.addEventListener("click",()=>{L(8);const p=l("[data-ag-berge-add]");p&&!p.hidden&&p.click()});const we=["today","history","lieblinge","berge"];let Be=0,qe=0;const Ue=l(".ag-content")||C;Ue.addEventListener("touchstart",p=>{Be=p.touches[0].clientX,qe=p.touches[0].clientY},{passive:!0}),Ue.addEventListener("touchend",p=>{const w=p.changedTouches[0].clientX-Be,k=Math.abs(p.changedTouches[0].clientY-qe);if(Math.abs(w)>52&&k<44){const S=we.indexOf(c.activeTab),A=w<0?Math.min(S+1,we.length-1):Math.max(S-1,0);A!==S&&(L(6),De(we[A]))}},{passive:!0});const ie=l("[data-ag-ptr]");let dt=0,ct=!1;document.addEventListener("touchstart",p=>{window.scrollY===0&&(dt=p.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",p=>{if(!dt)return;p.touches[0].clientY-dt>64&&!ct&&ie&&(ct=!0,ie.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{ct&&ie&&(ie.classList.add("is-loading"),await Ie(),c.activeTab==="berge"&&Me(),c.activeTab==="history"&&W(),ie.classList.remove("is-visible","is-loading"),X("Aktualisiert ✓")),dt=0,ct=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const p=document.querySelector(".ag-widget");p==null||p.classList.toggle("ag-paused",document.hidden)})}const Fi=Object.freeze(Object.defineProperty({__proto__:null,bindEvents:Mn,downloadResultAsImage:zn,drawRoundRect:Ht,escapeHtml:P,notifyPartnerVoucherRedeemed:Ln,renderError:Wt,retryPendingWishSend:An,reveal:In,sendHugToInbox:Cn,sendPingToBackend:Tn,sendWishToInbox:Ft,setActiveTab:De,setHugStatus:be,showToast:X,wrapText:Gt},Symbol.toStringTag,{value:"Module"}));let oe=null,G="all";function Hi(e){G=e==="vouchers"||e==="open"?e:"all",ea=Qt,W()}function Kt(e){return e?P(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ne(){return M().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||c.theme.brand.displayNameDefault||"Lennart"}function Gi(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function Wi(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:c.theme.timezone}).format(e)}catch{return $(c.theme.timezone)}}const Ki=["🚴","🧄"],Yi=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function $n(){const e=$(c.theme.timezone),t=M();return`${c.theme.secret}|${t}|${e}|emoji`}function Ji(){const e=$n(),t=3+Math.floor(Y(`${e}|count`)*3),a=Yi.slice(),n=[];for(let o=0;o<t&&a.length;o+=1){const r=Math.floor(Y(`${e}|pick|${o}`)*a.length);n.push(a.splice(r,1)[0])}return[...Ki,...n]}function Vi(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Ji(),a=t.length,n=$n();t.forEach((o,r)=>{const i=document.createElement("span");i.className="ag-emoji",i.textContent=o;const s=360/a*r,d=(Y(`${n}|angle|${r}`)-.5)*28,g=s+d,u=Y(`${n}|radius|${r}`)*21-10.5,m=16+Y(`${n}|dur|${r}`)*10,b=-Y(`${n}|delay|${r}`)*m,f=Y(`${n}|dir|${r}`)>.5?1:-1;i.style.setProperty("--ag-emoji-angle",`${g}deg`),i.style.setProperty("--ag-emoji-radius",`${250+u}%`),i.style.setProperty("--ag-emoji-duration",`${m.toFixed(2)}s`),i.style.setProperty("--ag-emoji-delay",`${b.toFixed(2)}s`),i.style.setProperty("--ag-emoji-direction",f===1?"normal":"reverse"),e.appendChild(i)})}function Yt(){const e=l("[data-ag-streak]"),t=J(),a=ke();if(t>(a.maxStreak||0)&&za({...a,maxStreak:t}),e){const n=$a(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}Jt()}function Jt(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!Pa())}const Dn={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Zi(e){const t=l("[data-ag-milestone]");if(!t)return;const a=Dn[e];if(!a){t.hidden=!0;return}const n=M();if(vo(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,xo(n,e)}function Xi(e,t){const a=document.createElement("div");a.className="ag-prompt-gate";const n=document.createElement("p");n.className="ag-prompt-question",n.textContent="💭 "+e;const o=document.createElement("textarea");o.className="ag-prompt-textarea",o.placeholder="Schreib hier deine Antwort...",o.rows=4;const r=document.createElement("p");r.className="ag-pin-err",r.hidden=!0,r.textContent="Bitte erst antworten.";const i=document.createElement("button");i.type="button",i.className="ag-button",i.style.cssText="width:100%;margin-top:4px",i.textContent="Kapsel öffnen ✨";function s(){const d=o.value.trim();if(!d){r.hidden=!1,o.classList.add("ag-pin-shake"),setTimeout(()=>o.classList.remove("ag-pin-shake"),450);return}t(d)}return i.addEventListener("click",s),o.addEventListener("keydown",d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&s()}),a.appendChild(n),a.appendChild(o),a.appendChild(r),a.appendChild(i),a}function Qi(e,t){try{const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:e.outcome.prompt,answer:t}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,o).catch(()=>{fetch(a.endpointUrl,{...o,mode:"no-cors"}).catch(()=>{})})}catch{}}function es(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const o=document.createElement("p");o.className="ag-pin-hint",o.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const r=document.createElement("div");r.className="ag-pin-row";const i=document.createElement("input");i.type="text",i.inputMode="numeric",i.pattern="[0-9]*",i.maxLength=4,i.className="ag-pin-input",i.placeholder="_ _ _ _",i.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Falsche Zahl. Noch einmal.";function g(){i.value.trim()===e?t():(d.hidden=!1,i.classList.add("ag-pin-shake"),i.value="",setTimeout(()=>i.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",g),i.addEventListener("keydown",u=>{u.key==="Enter"&&g()}),r.appendChild(i),r.appendChild(s),n.appendChild(o),n.appendChild(r),n.appendChild(d),n}function ts(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const o=document.createElement("span");o.className="ag-outcome-link-locked",o.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const r=document.createElement("p");r.className="ag-pin-hint",r.style.marginTop="10px",r.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const i=document.createElement("div");i.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const g=document.createElement("p");g.className="ag-pin-err",g.hidden=!0,g.textContent="Nicht ganz. Versuch nochmal.";function u(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),it(t,a.outcome.link)):(g.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",u),s.addEventListener("keydown",m=>{m.key==="Enter"&&u()}),i.appendChild(s),i.appendChild(d),n.appendChild(o),n.appendChild(r),n.appendChild(i),n.appendChild(g),n}function as(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],o=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const i=document.createElement("iframe");return i.src=`https://open.spotify.com/embed/${n}/${o}`,i.width="100%",i.height=n==="track"||n==="episode"?"80":"152",i.setAttribute("frameborder","0"),i.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",i.loading="lazy",i.setAttribute("allowtransparency","true"),i.setAttribute("title","Spotify player"),i.className="ag-spotify-iframe",i}catch{return null}}function Nn(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function it(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=K(t);if(!a){e.hidden=!0;return}const n=as(a);e.appendChild(n||Nn(a)),e.hidden=!1}function ns(e){const t=l("[data-ag-memory]");if(!t||(t.hidden=!0,!e||!e.day||te()))return;const[a,n]=[e.day.slice(0,4),e.day.slice(5)],o=Number(a),r=e.token,i=B().filter(m=>m.token===r&&typeof m.day=="string"&&m.day.slice(5)===n&&Number(m.day.slice(0,4))<o).sort((m,b)=>b.day.localeCompare(m.day));if(!i.length)return;const s=i[0],d=o-Number(s.day.slice(0,4)),g=l("[data-ag-memory-label]"),u=l("[data-ag-memory-text]");g&&(g.textContent=d===1?"Vor einem Jahr":`Vor ${d} Jahren`),u&&(u.textContent=s.title||""),t.hidden=!1}function rs(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=We()[a]||0,o=Zr[a]||"",r=5;if(n>=r)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(r)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${o}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{if(lo(a),re(),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',c.wishInbox&&c.wishInbox.enabled){const s=JSON.stringify({timestamp:new Date().toISOString(),token:M(),wish:`🎁 Sammelkapsel eingelöst: ${a} × ${r} — ${o}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(c.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s}).catch(()=>{})}});else{const s=r-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(r-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${o}</em></p>
      </div>`,e.hidden=!1}}function Pn(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const o=document.createElement("div");o.className="ag-media-backdrop",o.setAttribute("aria-hidden","true"),t.type!=="video"&&(o.style.backgroundImage=`url("${t.url}")`),n.appendChild(o);let r;if(t.type==="video"){const i=ao(t.url);if(i){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${i}`,d.alt=a,d.loading="lazy",d.decoding="async",d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),s.appendChild(d);const g=document.createElement("div");g.className="ag-drive-play-btn",g.setAttribute("aria-hidden","true"),s.appendChild(g);const u=()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",m),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const b=document.createElement("iframe");b.src=`https://drive.google.com/file/d/${i}/preview?autoplay=1`,b.allow="autoplay",b.setAttribute("allowfullscreen",""),b.setAttribute("frameborder","0"),b.setAttribute("aria-label",a),b.className="ag-drive-iframe",s.appendChild(b)},m=b=>{(b.key==="Enter"||b.key===" ")&&u()};s.addEventListener("click",u),s.addEventListener("keydown",m),r=s}else r=document.createElement("video"),r.src=K(t.url),r.controls=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("playsinline",""),r.setAttribute("preload","metadata"),r.setAttribute("aria-label",a),r.className="ag-media-content"}else r=document.createElement("img"),r.alt=a,r.loading="eager",r.decoding="auto",r.className="ag-media-content",r.addEventListener("load",()=>{const i=r.naturalWidth&&r.naturalHeight?r.naturalWidth/r.naturalHeight:1;n.dataset.orientation=i<.95?"portrait":i>1.15?"landscape":"square"},{once:!0}),r.addEventListener("error",()=>{R("config/photos.json",{photos:[]}).then(i=>{const{normalizePhotos:s}=Vt(),d=s(i),g=d.find(u=>u.alt===t.alt&&u.type!=="video")||d.find(u=>u.type!=="video")||null;if(g&&g.url)o.style.backgroundImage=`url("${g.url}")`,r.src=K(g.url),c.photos=d;else{const u=r.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const i=r.closest("[data-ag-photo-wrap]");i&&(i.hidden=!0)})},{once:!0}),r.src=K(t.url);n.appendChild(r),e.appendChild(n)}function Vt(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const o=n.type==="video"||t.test(n.url||"");return{...n,type:o?"video":"image"}}).filter(n=>n.url)}}}function os(e,t,a,n){var d,g;const o=l("#ag-lightbox"),r=l("#ag-lightbox-img"),i=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!o||!r)){(d=o.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(g=o.querySelector(".ag-lightbox-video"))==null||g.remove(),oe&&(r.removeEventListener("error",oe),oe=null),r.onerror=null,s&&(s.hidden=!0);{r.hidden=!1;const u=K(e);if(!u)return;r.src=u,r.alt=t||"",oe=()=>{const m=n||t;R("config/photos.json",{photos:[]}).then(b=>{const{normalizePhotos:f}=Vt(),h=f(b),v=h.find(y=>y.alt===m)||null;v&&v.url&&(r.src=K(v.url),c.photos=h)}).catch(()=>{})},r.addEventListener("error",oe,{once:!0})}i.textContent=t||"",i.hidden=!t,o.hidden=!1,document.body.style.overflow="hidden"}}function Zt(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(oe&&(t.removeEventListener("error",oe),oe=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function _n(e){return[`${Lt(e.category.tone)} ${Ne()}s ${c.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var r;const[a,n]=e.unlockTime.split(":").map(Number),o=ft(((r=c.theme)==null?void 0:r.timezone)||"UTC");return o.h>a||o.h===a&&o.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function Xt(e){var h;C.dataset.tone=e.category.tone,Eo(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=e.day,l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=Kt(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]"),n=l("[data-ag-freikarte-wrap]");if(n){const v=e.category.tone==="quiet"||e.category.tone==="cursed";n.hidden=!(v&&freikarteCount(e.token)>0&&!te())}if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const y=Xi(e.outcome.prompt,x=>{if(e.promptAnswer=x,y.remove(),!te()){Qi(e,x);const I=B(),T=I.findIndex(E=>E.day===e.day&&E.token===e.token);T!==-1&&(I[T]={...I[T],promptAnswer:x},ce(I),re())}Xt(e),c.activeTab==="history"&&W()});y.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(y,t)}l("[data-ag-result]").hidden=!1;return}const o=a?a.querySelector("[data-ag-pin-gate]"):null;o&&o.remove();const r=l("[data-ag-link-wrap]");if(e.outcome.pin){const v=!!e.outcome.pinMessage;if(v||(t.hidden=!St(e.outcome.pin)),!St(e.outcome.pin)){let y=null;v&&(y=document.createElement("div"),y.className="ag-message",y.hidden=!0,y.innerHTML=Kt(e.outcome.pinMessage),t.parentNode.insertBefore(y,t.nextSibling));const x=es(e.outcome.pin,()=>{x.remove(),v?y.hidden=!1:t.hidden=!1,e.outcome.link&&r&&it(r,e.outcome.link)},e.outcome.pinHint);x.setAttribute("data-ag-pin-gate","");const I=v?y:t;I.parentNode.insertBefore(x,I)}}const i=l("[data-ag-photo-wrap]"),s=l("[data-ag-photo-media]"),d=l("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[v,y]=e.unlockTime.split(":").map(Number),x=ft(((h=c.theme)==null?void 0:h.timezone)||"UTC"),I=e.outcome.linkPin;if(I)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[E,D]=e.outcome.linkPinFrom.split(":").map(Number);return x.h>E||x.h===E&&x.m>=D})()){const E=ts(I,r,e);r.innerHTML="",r.appendChild(E),r.hidden=!1}else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(E),r.hidden=!1}else if(x.h>v||x.h===v&&x.m>=y)it(r,e.outcome.link);else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(E),r.hidden=!1}}else e.outcome.pin&&!St(e.outcome.pin)||it(r,e.outcome.link||null);if(rs(l("[data-ag-token-wrap]"),e),ns(e),e.photo){Pn(s,e.photo);const v=(e.photo.caption||"").trim();v?(d.textContent=v,d.hidden=!1):(d.textContent="",d.hidden=!0),i.hidden=!1}else s.innerHTML="",d.textContent="",d.hidden=!0,i.hidden=!0;const g=_n(e),u=encodeURIComponent("Mein Gacha-Zug"),m=encodeURIComponent(g),b=l("[data-ag-send]");c.theme.messageTarget.startsWith("mailto:")?b.href=`${c.theme.messageTarget}?subject=${u}&body=${m}`:b.href=c.theme.messageTarget.replace("{text}",m);const f=l("[data-ag-save-img]");f&&(f.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),l("[data-ag-result]").hidden=!1,Oa(),Bn()}function is(e){return e?ne().some(t=>t.day===e.day&&t.token===e.token):!1}function st(e){return ne().some(t=>t.day===e.day&&t.token===e.token)}function Bn(){const e=l("[data-ag-star]");if(!e)return;const t=is(c.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function ss(e,t){const a=ne(),n=a.findIndex(r=>r.day===e.day&&r.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Ge(a),re();const o=st(e);t.textContent=o?"★":"☆",t.classList.toggle("is-starred",o),t.title=o?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",c.activeTab==="lieblinge"&&lt()}function ls(e){if(!e)return;const t=ne(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Ge(t),re(),Bn(),c.activeTab==="lieblinge"&&lt()}function ds(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=B(),n=new Set,o=[t,...a].filter(r=>{if(!r||typeof r.day!="string"||typeof r.token!="string")return!1;const i=`${r.day}|${r.token}`;return n.has(i)?!1:(n.add(i),!0)});o.sort((r,i)=>r.day<i.day?1:r.day>i.day?-1:0),ce(o),Ke(0),re()}function cs(e,t){var i;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=$(((i=c.theme)==null?void 0:i.timezone)||"UTC");e.used=!0,e.usedAt=n;const o=B(),r=o.find(s=>s.day===e.day&&s.token===e.token);r&&(r.used=!0,r.usedAt=n,ce(o)),re();try{Z(60)}catch{}try{X("Eingelöst 💛")}catch{}try{Ln(e)}catch{}t&&(t.disabled=!0),W(),c.activeTab==="lieblinge"&&lt()}function qn(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,o]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=o)){const i=document.createElement("span");return i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,i}}const t=K(e.link);return t?Nn(t):null}function Un(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:o}=jn();n.textContent=o(e.day);const r=document.createElement("span");r.className="ag-history-badge",r.textContent=e.categoryLabel||"Kapsel";const i=document.createElement("button");i.type="button",i.className="ag-history-star"+(st(e)?" is-starred":""),i.textContent=st(e)?"★":"☆",i.title=st(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",i.addEventListener("click",f=>{f.stopPropagation(),ss(e,i)}),a.appendChild(n),a.appendChild(r);const s=e.token===M()?ja(e):null;if(s){const f=document.createElement("span");f.className="ag-history-reaction",f.textContent=s.emoji,f.title=`${Te()} hat darauf reagiert`,a.appendChild(f)}a.appendChild(i);const d=document.createElement("p");d.className="ag-history-title",d.textContent=e.title||"";const g=document.createElement("div");g.className="ag-history-message",g.innerHTML=Kt(e.message||"");let u=null;if(e.promptAnswer){u=document.createElement("div"),u.className="ag-history-answer-wrap";const f=document.createElement("p");f.className="ag-history-answer-label",f.textContent="💭 Antwort";const h=document.createElement("blockquote");h.className="ag-history-answer",h.textContent=e.promptAnswer,u.appendChild(f),u.appendChild(h)}t.appendChild(a);const m=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,b=e.photo&&(e.photo.type==="video"||m.test(e.photo.url||""));if(e.photo&&!b){const f=document.createElement("div");f.className="ag-history-body";const h=document.createElement("div");h.className="ag-history-thumb";const v=document.createElement("img");v.src=K(e.photo.url),v.alt=e.photo.alt||"Foto-Drop",v.loading="lazy",v.decoding="async",v.addEventListener("error",function(){R("config/photos.json",{photos:[]}).then(x=>{const{normalizePhotos:I}=Vt(),T=I(x),E=T.find(D=>D.alt===e.photo.alt&&D.type!=="video")||T.find(D=>D.type!=="video")||null;if(E&&E.url)e.photo.url=E.url,v.src=K(E.url),c.photos=T;else{h.classList.add("is-broken"),v.remove();const D=document.createElement("span");D.className="ag-history-thumb-broken",D.textContent="📷",h.appendChild(D)}}).catch(()=>{h.classList.add("is-broken"),v.remove();const x=document.createElement("span");x.className="ag-history-thumb-broken",x.textContent="📷",h.appendChild(x)})},{once:!0}),h.appendChild(v),h.style.cursor="pointer",h.title="Vollansicht",h.addEventListener("click",()=>os(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(d),y.appendChild(g),u&&y.appendChild(u),e.link){const x=qn(e);x&&y.appendChild(x)}f.appendChild(h),f.appendChild(y),t.appendChild(f)}else if(t.appendChild(d),t.appendChild(g),u&&t.appendChild(u),e.link){const f=qn(e);f&&t.appendChild(f)}if(He(e)){const f=document.createElement("div");if(f.className="ag-voucher-actions",e.used){const h=document.createElement("span");h.className="ag-voucher-used";const{formatHistoryDate:v}=jn();h.textContent=`✓ Benutzt am ${e.usedAt?v(e.usedAt):"–"}`,f.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="ag-voucher-use",h.textContent="🎟️ Benutzen",h.addEventListener("click",v=>{v.stopPropagation(),cs(e,h)}),f.appendChild(h)}t.appendChild(f)}return t}function jn(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),o=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(o)}catch{return e}}}}function gs(e){const t=l("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const o=n.dataset.agFilter;n.classList.toggle("is-active",o===G),n.setAttribute("aria-selected",o===G?"true":"false"),o==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}let ye=null;function On(e){var I;const t=l("[data-ag-history-calendar]");if(!t)return;if(G!=="all"){t.hidden=!0;return}t.hidden=!1;const a=((I=c.theme)==null?void 0:I.timezone)||"UTC",n=$(a);ye||(ye=n.slice(0,7));const o=new Map(e.map(T=>[T.day,T])),[r,i]=ye.split("-").map(Number),s=new Date(Date.UTC(r,i-1,1)),d=new Date(Date.UTC(r,i,0)).getUTCDate(),g=(s.getUTCDay()+6)%7,u=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(s),m=e.filter(T=>T.day.startsWith(ye)).length;t.innerHTML="";const b=document.createElement("div");b.className="ag-kalender-head";const f=document.createElement("button");f.type="button",f.className="ag-kalender-nav",f.textContent="‹",f.setAttribute("aria-label","Vorheriger Monat");const h=document.createElement("span");h.className="ag-kalender-label",h.textContent=m?`${u} · ${m} Kapseln`:u;const v=document.createElement("button");v.type="button",v.className="ag-kalender-nav",v.textContent="›",v.setAttribute("aria-label","Nächster Monat");const y=T=>{const E=new Date(Date.UTC(r,i-1+T,1));ye=`${E.getUTCFullYear()}-${String(E.getUTCMonth()+1).padStart(2,"0")}`,On(e)};f.addEventListener("click",()=>y(-1)),v.addEventListener("click",()=>y(1)),b.appendChild(f),b.appendChild(h),b.appendChild(v),t.appendChild(b);const x=document.createElement("div");x.className="ag-kalender-grid";for(const T of["M","D","M","D","F","S","S"]){const E=document.createElement("span");E.className="ag-kalender-wd",E.textContent=T,x.appendChild(E)}for(let T=0;T<g;T++)x.appendChild(document.createElement("span"));for(let T=1;T<=d;T++){const E=`${ye}-${String(T).padStart(2,"0")}`,D=o.get(E),q=document.createElement("span");q.className="ag-kalender-day",q.textContent=T,D&&(q.classList.add("has-pull"),q.dataset.tone=D.tone||"soft",q.title=`${D.title||"Kapsel"} (${D.categoryLabel||""})`),E===n&&q.classList.add("is-today"),E>n&&q.classList.add("is-future"),x.appendChild(q)}t.appendChild(x)}function ps(e){var r;const t=l("[data-ag-history-tally]");if(!t)return;if(G!=="all"||!e.length){t.hidden=!0;return}const a=e.length,n=(r=e[e.length-1])==null?void 0:r.day;let o="";if(n)try{o=new Intl.DateTimeFormat("de-CH",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(n+"T12:00:00Z"))}catch{o=""}t.hidden=!1,t.textContent=a===1?"Eine Kapsel bisher geöffnet.":`${a} Kapseln geöffnet${o?`, seit ${o}`:""}.`}const Qt=60;let ea=Qt;function W(){var u;const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=M(),o=$(((u=c.theme)==null?void 0:u.timezone)||"UTC"),r=B().filter(m=>m.token===n&&m.day<=o).slice().sort((m,b)=>m.day<b.day?1:m.day>b.day?-1:0);On(r),ps(r);const i=r.filter(m=>He(m)&&!m.used).length;gs(i);const s=r.filter(m=>G==="vouchers"?He(m):G==="open"?He(m)&&!m.used:!0);G==="open"?a.textContent=i?`Du hast ${i} offene${i===1?"n":""} Gutschein${i===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":G==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.";const d=l("[data-ag-history-more]");if(!s.length){t.hidden=!1,t.textContent=G==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":G==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.",d&&(d.hidden=!0);return}t.hidden=!0;const g=s.slice(0,ea);for(const m of g)e.appendChild(Un(m));if(d){const m=s.length-g.length;d.hidden=m<=0,m>0&&(d.textContent=`Mehr anzeigen (${m} weitere)`,d.onclick=()=>{ea+=Qt,W()})}}function lt(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=ne();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const o of n)e.appendChild(Un(o))}function us(){const e=l("[data-ag-odds]");e.innerHTML="";const t=J(),a=Da(t),n=a.reduce((o,r)=>o+r.weight,0);for(const o of a){const r=document.createElement("li");r.textContent=`${o.label}: ${(o.weight/n*100).toFixed(1)} %`,e.appendChild(r)}if(t>=5){const o=$a(t),r=document.createElement("li");r.textContent=`${o.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,r.style.fontWeight="800",e.appendChild(r)}}function ms(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function ta(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=vt();n&&n.week===bt()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=ms(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function fs(){var h;const e=O()==="fionn",t=e?c.theme.brand.fromName:Ne(),a=e?Ne():c.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=c.theme.brand.titleTemplate.replace("{name}",t));const o=l("[data-ag-kicker]");o&&(o.textContent=`${c.theme.brand.kicker} · ${c.photos.length} Erinnerungen`);const r=l("[data-ag-intro]");r&&(r.textContent=c.theme.brand.intro);const i=l("[data-ag-button-text]");i&&(i.textContent=c.theme.brand.buttonIdle);const s=l("[data-ag-rules-title]");s&&(s.textContent=c.theme.brand.rulesTitle);const d=l("[data-ag-rules-text]");d&&(d.textContent=c.theme.brand.rulesText);const g=l("[data-ag-send]");g&&(g.textContent=`An ${a} schicken`);const u=l("[data-ag-today-pill]");u&&(u.textContent=Wi());const m=l("[data-ag-draw-hint]");m&&(m.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const b=l("[data-ag-chips]");b&&(b.innerHTML="");const f=Array.isArray(c.theme.stickers)&&c.theme.stickers.length?c.theme.stickers:Gi();for(const v of b?f:[]){const y=document.createElement("li");if(y.textContent=v,(v.toLowerCase().includes("bärlauch")||v.toLowerCase().includes("barlauch"))&&(y.id="ag-btn-baerlauch",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Bärlauch öffnen"),y.classList.add("ag-chip-clickable")),(v.toLowerCase().includes("gespräch")||v.toLowerCase().includes("gesprach"))&&(y.id="ag-btn-gesprach",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Gespräch öffnen"),y.classList.add("ag-chip-clickable")),v.toLowerCase().includes("rave")&&(y.id="ag-btn-rave",y.tabIndex=0,y.setAttribute("role","link"),y.setAttribute("aria-label","Rave Board öffnen"),y.classList.add("ag-chip-clickable")),v.toLowerCase()==="quest"&&(y.id="ag-btn-quest",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Quest öffnen"),y.classList.add("ag-chip-clickable"),(h=c.quest)!=null&&h.enabled&&ln()&&(Se().solved||y.classList.add("ag-chip-quest-active"))),v.toLowerCase().includes("glossar")&&(y.id="ag-btn-glossary",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Glossar öffnen"),y.classList.add("ag-chip-clickable")),v.toLowerCase()==="mission"&&(y.id="ag-btn-mission",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Mission öffnen"),y.classList.add("ag-chip-clickable"),an()||y.classList.add("ag-chip-mission-active")),v.toLowerCase().includes("stimmung")){y.id="ag-btn-stimmung",y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","Farbe des Tages wählen"),y.classList.add("ag-chip-clickable");const x=me();x&&(y.classList.add("ag-chip-stimmung-set"),y.style.setProperty("--chip-dot-color",x))}b.appendChild(y)}Vi(),Yt()}const Rn="affektions-gacha:install-dismissed:v1";let Pe=null;function hs(){var e,t;try{return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(display-mode: standalone)"))==null?void 0:t.matches)||window.navigator.standalone===!0}catch{return!1}}function bs(){try{const e=window.navigator.userAgent||"",t=/iPad|iPhone|iPod/.test(e),a=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return t||a}catch{return!1}}function Fn(){try{return window.localStorage.getItem(Rn)==="1"}catch{return!1}}function Hn(){try{window.localStorage.setItem(Rn,"1")}catch{}const e=l("[data-ag-install-nudge]");e&&(e.hidden=!0)}function Gn(e){if(Fn())return;const t=l("[data-ag-install-nudge]");if(!t)return;const a=l("[data-ag-install-copy]"),n=l("[data-ag-install-action]");a&&(a.textContent=e?"Für Benachrichtigungen und den vollen App-Feel: zum Home-Bildschirm hinzufügen.":"Für Benachrichtigungen: Teilen-Symbol tippen, dann „Zum Home-Bildschirm“."),n&&(n.hidden=!e,n.onclick=async()=>{Pe&&(Pe.prompt(),await Pe.userChoice,Pe=null,Hn())}),t.hidden=!1}function ys(){var e;hs()||Fn()||(window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Pe=t,Gn(!0)}),bs()&&Gn(!1),(e=l("[data-ag-install-dismiss]"))==null||e.addEventListener("click",Hn))}const vs={photos:[]};function xs(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=Va();return a.map(o=>{const r=new URL(o.url,n).toString(),i=o.type==="video"||t.test(r);return{...o,type:i?"video":"image",url:r}}).filter(o=>o.url)}async function ws(){Oo(),Wo(),Vo();try{const[e,t,a,n,o,r,i,s,d]=await Promise.all([R("config/theme.json"),R("config/outcomes.json"),R("config/photos.json",vs),R("config/special-days.json",{days:[]}),R("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),R("config/backup.json",{enabled:!1,endpointUrl:""}),R("config/quest.json",{enabled:!1}),R("config/missions.json",{pairs:[]}),R("config/push.json",{enabled:!1})]);c.theme=e,c.outcomes=t,c.photos=xs(a),c.specialDays=n,c.wishInbox=o&&typeof o=="object"?o:{enabled:!1,endpointUrl:""},c.backup=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},c.quest=i&&typeof i=="object"?i:{enabled:!1},c.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},c.push=d&&typeof d=="object"?d:{enabled:!1},Ro(e),Fo(te()||$(e.timezone)),Bo(),fs(),us(),ta(),At(),Mn(),ys(),requestAnimationFrame(()=>{const u=C.querySelector(".ag-nav-pill"),m=C.querySelector(".ag-bottomnav-btn.is-active");if(u&&m){const b=m.closest(".ag-bottomnav"),f=b?b.getBoundingClientRect():null,h=m.getBoundingClientRect();f&&h.width&&(u.style.transition="none",u.style.left=`${h.left-f.left}px`,u.style.width=`${h.width}px`,requestAnimationFrame(()=>{u.style.transition=""}))}});try{An()}catch{}try{const u=C.querySelector(".ag-stage");u&&"IntersectionObserver"in window&&new IntersectionObserver(([b])=>{u.classList.toggle("ag-stage-idle",!b.isIntersecting)},{threshold:.05}).observe(u)}catch{}Rt(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(Ot(),Ie().catch(()=>{}))}),C.classList.add("is-ready"),C.style.transition="opacity .18s ease",C.style.opacity="1";const g=$(e.timezone);B().some(u=>u.token===M()&&u.day===g)&&C.classList.add("has-drawn"),Ie().catch(()=>{})}catch(e){Wt(e)}}const ve=document.currentScript,ks=(ve==null?void 0:ve.dataset.mount)||"#affektions-gacha",Ss=(ve==null?void 0:ve.dataset.configBase)||"";function Es(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Ts=document.querySelector(ks)||Es();Kr(Ts),jo(Ss,null),ws().catch(e=>Wt(e));const Cs="wss://broker.hivemq.com:8884/mqtt",Wn="picolight_lf26/events",Ls="web_app",As=10,zs=17/29,Kn=1e4,Is=2500,aa=["board_a","board_b"];let na=!1;function Ms(){return window.mqtt?Promise.resolve():new Promise((e,t)=>{const a=document.createElement("script");a.src="https://unpkg.com/mqtt/dist/mqtt.min.js",a.onload=()=>e(),a.onerror=()=>t(new Error("mqtt load failed")),document.head.appendChild(a)})}function $s(e){return{groups:e.groups,brightness:e.brightness,fade_steps:e.fade_steps,drift_enabled:e.drift_enabled,drift_interval:e.drift_interval}}async function Ds(){if(!na){na=!0;try{await Ms(),await new Promise((e,t)=>{const a=window.mqtt.connect(Cs,{clientId:"gachafx_"+Math.random().toString(16).slice(2),clean:!0,connectTimeout:8e3}),n={};let o=!1,r=null,i=!1;const s=()=>{if(!i){i=!0,document.removeEventListener("visibilitychange",u);try{a.end(!0)}catch{}e()}},d=m=>{m.from=Ls;try{a.publish(Wn,JSON.stringify(m))}catch{}},g=()=>{if(clearTimeout(r),!o){s();return}o=!1;for(const m of aa){const b=n[m]||n[aa.find(h=>h!==m)];if(!b)continue;const f={target:m,...$s(b)};b.on===!1?(d({...f,on:!0}),setTimeout(()=>d({target:m,on:!1}),1500)):d({...f,on:!0})}setTimeout(s,2500)},u=()=>{document.visibilityState==="hidden"&&o&&g()};document.addEventListener("visibilitychange",u),a.on("connect",()=>{a.subscribe(Wn,m=>{if(m){s();return}d({nudge:!0}),setTimeout(()=>{if(!Object.keys(n).length){s();return}o=!0,d({on:!0,groups:[{pos:zs,w:0,size:As}]}),r=setTimeout(g,Kn)},Is)})}),a.on("message",(m,b)=>{try{const f=JSON.parse(b.toString());f.from&&aa.includes(f.from)&&Array.isArray(f.groups)&&!o&&(n[f.from]=f)}catch{}}),a.on("error",()=>{o||s()}),a.on("close",()=>{o||s()}),setTimeout(()=>t(new Error("lights flash timed out")),Kn+2e4)})}catch{}finally{na=!1}}}const Ns=Object.freeze(Object.defineProperty({__proto__:null,flashLightsForPull:Ds},Symbol.toStringTag,{value:"Module"}))})();

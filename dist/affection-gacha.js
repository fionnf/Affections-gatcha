(function(){"use strict";const d={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let C=null;function Pn(e){C=e}function l(e){return C.querySelector(e)}const xt="affektions-gacha:history:v1",wt="affektions-gacha:favourites:v1",kt="affektions-gacha:tokens:v1",St="affektions-gacha:streak-cache:v1",Et="affektions-gacha:streak-synced:v1",Tt="affektions-gacha:streak-restore:v1",Ct="affektions-gacha:wish:v1",Lt="affektions-gacha:milestones:v1",he="affektions-gacha:notif:v1",At="affektions-gacha:baerlauch-scores:v1",Bn="affektions-gacha:baerlauch-history:v1",It="affektions-gacha:mission-log:v1",Mt="affektions-gacha:gesprach-idx:v1",Un="affektions-gacha:sound:v1",zt="affektions-gacha:gipfelbuch:v1",Dt="affektions-gacha:quest:v1",qe="affektions-gacha:quest-points:v1",qn=20,$t=[100,75,50,25],Nt="affektions-gacha:glossary:v1",jn={"🌿":"Fionn kocht dir ein Abendessen nach Wahl","🔥":"Wochenend-Abenteuer — Ziel nach deiner Wahl","⭐":"Fionns Überraschung — er entscheidet"};function A(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=i=>a.find(r=>r.type===i).value;return`${n("year")}-${n("month")}-${n("day")}`}function je(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value);return{h:a("hour"),m:a("minute")}}function _n(e){if(!e)return"";try{return new Date(e+"T12:00:00").toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return e}}function Pt(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function _(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function On(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Rn(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function O(e){return Rn(On(e))()}function fe(e,t){return t?Math.floor(O(e)*t):0}function Hn(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function Fn(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function Gn(e,t,a){return new URL(e,a()).toString()}function I(){return U()==="fionn"?"fionn":"lennart"}function U(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function _e(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function Wn(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Oe(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function be(e){var s,c;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=A(t),[n,i,r]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,i-1,r)).getTime()/864e5);return Math.floor(o/(((c=e.quest)==null?void 0:c.periodDays)||2))}function ye(e){var i;const t=(i=e.quest)==null?void 0:i.challenges;if(!Array.isArray(t)||!t.length)return null;const a=be(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function Bt(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function Kn(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}function $(){try{if(typeof window>"u"||!window.localStorage)return d.syncedHistory||[];const e=window.localStorage.getItem(xt);if(!e)return d.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return d.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:d.syncedHistory||[]}catch{return d.syncedHistory||[]}}function ne(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(xt,JSON.stringify(e))}catch{}}function H(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(wt);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=d.theme)!=null&&e.timezone?A(d.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(i=>i&&typeof i.day=="string"&&typeof i.token=="string"&&i.day<=n)}catch{return[]}}function ve(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(wt,JSON.stringify(e))}catch{}}function xe(){try{const e=localStorage.getItem(kt),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Re(e){try{localStorage.setItem(kt,JSON.stringify(e))}catch{}}function Yn(e){const t=xe();return t[e]=(t[e]||0)+1,Re(t),t[e]}function Jn(e){const t=xe();t[e]=0,Re(t)}function He(){try{if(typeof window>"u"||!window.localStorage)return null;const e=window.localStorage.getItem(Ct);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch{return null}}function Ut(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ct,JSON.stringify(e))}catch{}}function re(){try{return JSON.parse(localStorage.getItem(Tt)||"{}")||{}}catch{return{}}}function qt(e){try{localStorage.setItem(Tt,JSON.stringify(e))}catch{}}function Vn(){try{return parseInt(localStorage.getItem(St)||"0",10)||0}catch{return 0}}function ie(e){try{localStorage.setItem(St,String(e))}catch{}}function Zn(){try{return parseInt(localStorage.getItem(Et)||"0",10)||0}catch{return 0}}function Qn(e){try{localStorage.setItem(Et,String(e))}catch{}}function oe(){try{const e=window.localStorage.getItem(zt);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function we(e){try{window.localStorage.setItem(zt,JSON.stringify(e))}catch{}}function ke(){try{const e=localStorage.getItem(It),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Fe(e){try{localStorage.setItem(It,JSON.stringify(e))}catch{}}function Ge(){try{const e=localStorage.getItem(At),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function jt(){try{const e=localStorage.getItem(Bn),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function se(e){try{const t=localStorage.getItem(Dt),a=t?JSON.parse(t):{},n=e();return a.period!==n?{period:n,solved:!1,attempts:0,hints:[]}:a}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function We(e){try{localStorage.setItem(Dt,JSON.stringify(e))}catch{}}function Se(){try{return parseInt(localStorage.getItem(qe)||"0",10)}catch{return 0}}function Xn(e){try{const t=Se()+e;return localStorage.setItem(qe,String(t)),t}catch{return e}}function _t(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(Lt);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function er(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Lt,JSON.stringify(e))}catch{}}function tr(e,t){return _t().includes(`${e}|${t}`)}function ar(e,t){const a=`${e}|${t}`,n=_t();n.includes(a)||er([...n,a])}function Ot(e){try{return localStorage.getItem("affektions-gacha:pin-unlock:"+e)==="1"}catch{return!1}}function Rt(e){try{localStorage.setItem("affektions-gacha:pin-unlock:"+e,"1")}catch{}}function R(){var f;const e=I(),t=$().filter(b=>b.token===e);if(!t.length)return 0;const a=((f=d.theme)==null?void 0:f.timezone)||"UTC",n=A(a),i=new Set(t.map(b=>b.day)),[r,o,s]=n.split("-").map(Number);let c=new Date(Date.UTC(r,o-1,s)),g=n;i.has(g)||(c.setUTCDate(c.getUTCDate()-1),g=c.toISOString().slice(0,10));let p=0;for(;i.has(g);)p++,c.setUTCDate(c.getUTCDate()-1),g=c.toISOString().slice(0,10);return Math.max(p,Vn(),Zn())}function Ht(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function Ft(e){if(e<5)return d.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return d.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function nr(e,t){const a=Ft(t),n=a.reduce((o,s)=>o+s.weight,0),i=Math.floor(O(e)*n);let r=0;for(const o of a)if(r+=o.weight,i<r)return d.outcomes.categories.find(s=>s.id===o.id)||o;return d.outcomes.categories[d.outcomes.categories.length-1]}function Gt(){const e=re();return Math.floor((e.maxStreak||0)/qn)}function Ee(){var n;if(re().birthdayBonus2026Used)return 0;const t=((n=d.theme)==null?void 0:n.timezone)||"UTC";return A(t)==="2026-05-29"?1:0}function Ke(){const e=re();return Math.max(0,Gt()-(e.used||0))+Ee()}function Ye(){var p;const e=I(),t=((p=d.theme)==null?void 0:p.timezone)||"UTC",a=A(t),n=new Set($().filter(f=>f.token===e&&f.day<=a).map(f=>f.day));if(!n.size)return null;const i=[...n].sort()[0],[r,o,s]=a.split("-").map(Number),c=new Date(Date.UTC(r,o-1,s));let g=a;for(n.has(g)||(c.setUTCDate(c.getUTCDate()-1),g=c.toISOString().slice(0,10));n.has(g);)c.setUTCDate(c.getUTCDate()-1),g=c.toISOString().slice(0,10);return g<i?null:g}function Wt(){return Ke()>0&&Ye()!==null}function rr(e){if(Ke()<=0)return null;const t=Ye();if(!t)return null;const a=I(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},i=new Set,r=[n,...$()].filter(g=>{const p=`${g.day}|${g.token}`;return i.has(p)?!1:(i.add(p),!0)}).sort((g,p)=>g.day<p.day?1:g.day>p.day?-1:0);ne(r);const o=re(),c=Math.max(0,Gt()-(o.used||0))===0&&Ee()>0;return qt({...o,used:c?o.used||0:(o.used||0)+1,birthdayBonus2026Used:c?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),ie(R()),t}let Je="",Ve=null;function ir(e,t){Je=e,Ve=t}function Kt(){if(Ve)return Ve();if(!Je)return window.location.href;try{return new URL(Je,window.location.href).toString()}catch{return window.location.href}}function N(e,t=null){const a=new URL(e,Kt()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}async function Te(){var e;try{const t=d.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=I(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,i=new AbortController,r=setTimeout(()=>i.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:i.signal})}finally{clearTimeout(r)}if(!o.ok)return!1;const s=await o.json();if(!s.ok)return!1;const c=A(((e=d.theme)==null?void 0:e.timezone)||"UTC"),g=$(),p=g.filter(m=>m.title!=="(wiederhergestellt)"&&m.day<=c);p.length!==g.length&&ne(p);const f=H(),b=f.filter(m=>m.day<=c);if(b.length!==f.length&&ve(b),Array.isArray(s.history)&&s.history.length){const m=$(),y=new Map(m.map(h=>[h.day,h]));for(const h of s.history){if(h.title==="(wiederhergestellt)")continue;const w=Kn(h.day);if(!w||w>c)continue;const L=typeof h.token=="string"?h.token.toLowerCase():h.token;y.set(w,{...h,day:w,token:L})}const v=Array.from(y.values()).sort((h,w)=>w.day.localeCompare(h.day));ne(v),d.syncedHistory=v,ie(R())}if(Array.isArray(s.favourites)&&s.favourites.length){const m=H(),y=new Map(m.map(v=>[v.day,v]));for(const v of s.favourites)v.day<=c&&y.set(v.day,v);ve(Array.from(y.values()).sort((v,h)=>h.day.localeCompare(v.day)))}if(s.tokens&&typeof s.tokens=="object"&&Re(s.tokens),typeof s.questPoints=="number"&&s.questPoints>Se())try{localStorage.setItem(qe,String(s.questPoints))}catch{}if(typeof s.streak=="number"&&s.streak>0&&(Qn(s.streak),s.streak>R()&&ie(s.streak)),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const m=Ge();let y=!1;for(const[v,h]of Object.entries(s.baerlauchScores))typeof h=="number"&&h>(m[v]||0)&&(m[v]=h,y=!0);if(y)try{localStorage.setItem(At,JSON.stringify(m))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const m=ke(),y=new Map(m.map(h=>[`${h.day}|${h.player}`,h]));for(const h of s.missionLog)!h.day||!h.player||y.set(`${h.day}|${h.player}`,h);const v=Array.from(y.values()).sort((h,w)=>w.day.localeCompare(h.day));Fe(v)}if(typeof s.latestPing=="string"&&s.latestPing&&I()!=="fionn")try{const m="affektions-gacha:last-ping:v1",y=window.localStorage.getItem(m)||"";s.latestPing>y&&(window.localStorage.setItem(m,s.latestPing),d._newPing=!0)}catch{}if(Array.isArray(s.gipfelbuch)&&s.gipfelbuch.length){const m=oe(),y=new Map(m.map(h=>[h.id,h]));for(const h of s.gipfelbuch)h.id&&y.set(h.id,h);const v=Array.from(y.values()).sort((h,w)=>(w.date||"").localeCompare(h.date||""));we(v)}return C&&C.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),Array.isArray(s.history)?s.history.length:0}catch{return-1}}function Z(){try{const e=d.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=I(),a=$().filter(s=>(s.token||"").toLowerCase()===t.toLowerCase()),n=se(()=>be(d)),i=n.solved&&n.pointsEarned&&!n._logged?{challenge:ye(d),attempts:n.attempts,points:n.pointsEarned,period:n.period}:void 0;i&&(n._logged=!0,We(n));const r=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:H(),streak:R(),tokens:xe(),questPoints:Se(),...i?{questLog:i}:{}}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(e.endpointUrl,o).catch(()=>{fetch(e.endpointUrl,{...o,mode:"no-cors"}).catch(()=>{})})}catch{}}function or(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function sr(e){const t=(i,r)=>C.style.setProperty(i,r),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Yt={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Jt={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function lr(e){const t=dr(e);if(!t)return;const a=(n,i)=>C.style.setProperty(n,i);if(t.colors&&typeof t.colors=="object")for(const[n,i]of Object.entries(t.colors))Yt[n]&&typeof i=="string"&&a(Yt[n],i);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,i]of Object.entries(t.darkColors))Jt[n]&&typeof i=="string"&&a(Jt[n],i)}function dr(e){const t=Array.isArray(d.specialDays&&d.specialDays.days)?d.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}const cr=`
      .ag-widget,.ag-widget *{box-sizing:border-box}
      .ag-widget [hidden]{display:none!important}
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
        will-change:transform;
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
          box-shadow:0 12px 36px rgba(0,0,0,.4);
        }
      }

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

      .ag-gipfel-card{
        position:relative;
        animation:ag-enter 350ms var(--ag-ease);
        overflow:hidden;
      }
      .ag-gipfel-head{
        display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
        margin-bottom:10px;
      }
      .ag-gipfel-name{font-size:1.15rem;font-weight:800;color:var(--ag-text);line-height:1.2;margin-bottom:3px}
      .ag-gipfel-date{font-size:.82rem;color:var(--ag-muted);font-weight:500}
      .ag-gipfel-elev{
        font-size:2.2rem;font-weight:800;
        color:var(--ag-primary-dark);
        letter-spacing:-.03em;line-height:1;
        white-space:nowrap;flex-shrink:0;
      }
      .ag-gipfel-notes{margin:0 0 12px;color:var(--ag-muted);font-size:.9rem;line-height:1.55}
      .ag-gipfel-embed-wrap{margin-top:10px}
      .ag-gipfel-load-btn{width:100%;justify-content:center;text-align:center}
      .ag-gipfel-iframe-wrap iframe{display:block;border-radius:8px;width:100%}
      .ag-gipfel-delete{
        position:absolute;top:10px;right:10px;
        background:none;border:none;cursor:pointer;
        color:var(--ag-muted);font-size:.85rem;padding:4px 6px;
        border-radius:4px;opacity:.5;transition:opacity 120ms;
      }
      .ag-gipfel-delete:hover{opacity:1;color:var(--ag-text)}
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
        backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
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
        border-radius:0 var(--ag-radius-md) var(--ag-radius-md) 0;
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

      /* Gipfel cards: taller cover, more breathing room */
      .ag-gipfel-card{padding:18px 20px !important}
      .ag-gipfel-cover{height:190px;border-radius:var(--ag-radius-md)}
      @media (prefers-color-scheme:dark){
        .ag-gipfel-elev{color:#8fcf9e}
        .ag-berge-total-elev{color:#8fcf9e}
      }

      /* Berge stats counter: bigger */
      .ag-berge-total-elev{font-size:2.4rem}

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
      @media (max-width:640px){
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
          backdrop-filter:blur(48px) saturate(1.9) brightness(1.06);
          -webkit-backdrop-filter:blur(48px) saturate(1.9) brightness(1.06);
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
          border-radius:20px;
          background:rgba(255,255,255,.20);
          backdrop-filter:blur(32px) saturate(2.2) brightness(1.08);
          -webkit-backdrop-filter:blur(32px) saturate(2.2) brightness(1.08);
          border:1px solid rgba(255,255,255,.55);
          box-shadow:
            0 2px 0 rgba(255,255,255,.40) inset,
            0 -1px 0 rgba(0,0,0,.06) inset,
            0 8px 24px rgba(0,0,0,.14),
            0 1px 3px rgba(0,0,0,.08);
          pointer-events:none;
          z-index:0;
          will-change:left,width;
          transition:left 340ms cubic-bezier(.34,1.56,.64,1),width 340ms cubic-bezier(.34,1.56,.64,1);
        }
        @media (prefers-color-scheme:dark){
          .ag-nav-pill{
            background:rgba(255,255,255,.10);
            border-color:rgba(255,255,255,.28);
            box-shadow:
              0 1.5px 0 rgba(255,255,255,.18) inset,
              0 8px 28px rgba(0,0,0,.40);
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
      @media (max-width:640px){
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
        display:none;position:fixed;inset:0;z-index:900;
        background:rgba(0,0,0,.48);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);
        animation:ag-letter-fade-in 200ms ease both;
      }
      .ag-sheet-backdrop.is-open{display:block}

      /* ── Bottom sheet: berge & glossary forms on mobile ── */
      @media (max-width:640px){
        [data-ag-berge-form]:not([hidden]),
        #ag-glossary-form:not([hidden]){
          position:fixed;bottom:0;left:0;right:0;
          z-index:901;
          background:var(--ag-surface);
          border-radius:var(--ag-radius-lg) var(--ag-radius-lg) 0 0;
          padding:24px 20px calc(24px + env(safe-area-inset-bottom));
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

      /* ── Larger tap targets for action buttons ── */
      .ag-gipfel-edit{min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center}
      .ag-gipfel-delete{min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center}
      .ag-glossary-edit-btn{min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center}
      .ag-glossary-del-btn{min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center}
      .ag-glossary-play-btn{width:36px;height:36px}
    `;function gr(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=cr,document.head.appendChild(e)}function ur(){return`
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
    `}function pr(){return`
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
    `}const mr=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${ur()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${pr()}
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
              <button class="ag-secondary" type="button" id="ag-glossary-close">✕</button>
            </div>
            <h2 class="ag-mini-title">Unser Glossar</h2>
            <div class="ag-glossary-tabs" id="ag-glossary-tabs">
              <div class="ag-glossary-tab-track">
                <div class="ag-glossary-tab-pill" id="ag-glossary-pill"></div>
                <button class="ag-glossary-tab is-active" type="button" data-lang="swabian">Schwäbisch</button>
                <button class="ag-glossary-tab" type="button" data-lang="portuguese">Português</button>
                <button class="ag-glossary-tab" type="button" data-lang="irish">Gaeilge</button>
              </div>
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
              <div class="ag-wish-actions">
                <button class="ag-secondary" type="button" id="ag-glossary-form-cancel">Abbrechen</button>
                <button class="ag-button" type="button" id="ag-glossary-form-save">
                  <span class="ag-button-orb" aria-hidden="true"></span>
                  <span id="ag-glossary-save-label">Eintragen</span>
                </button>
              </div>
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
                <button class="ag-sync-btn" data-ag-recover-btn type="button" title="Mai-Verlauf wiederherstellen">↺</button>
                <button class="ag-sync-btn" data-ag-sync-btn type="button" title="Verlauf aus Cloud neu laden">☁</button>
              </div>
              <ol class="ag-history" data-ag-history></ol>
              <p class="ag-history-empty" data-ag-history-empty hidden></p>
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
                <div class="ag-berge-row">
                  <input class="ag-berge-input ag-berge-elev-input" type="number" data-ag-berge-elev placeholder="Gipfelhöhe (m)" min="0" max="9000">
                  <input class="ag-berge-input" type="date" data-ag-berge-date>
                </div>
                <div class="ag-berge-row">
                  <input class="ag-berge-input" type="number" data-ag-berge-dist placeholder="Distanz (km)" min="0" max="500" step="0.1">
                  <input class="ag-berge-input" type="number" data-ag-berge-gain placeholder="Höhenmeter (↑ m)" min="0" max="9000">
                </div>
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
          </section>
          <div class="ag-lighting-link-wrap" style="text-align:center;padding:4px 0 8px;">
              <a href="https://fionnf.github.io/linked_friend_lights/" target="_blank" rel="noopener noreferrer" class="ag-button" style="display:inline-flex;text-decoration:none;background:var(--ag-bg);box-shadow:none;">
                <span class="ag-button-orb" aria-hidden="true"></span>
                <span>💡 Lichtsteuerung</span>
              </a>
            </div>
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
    `;function hr(){C.className="ag-widget",C.setAttribute("aria-labelledby","ag-title"),C.innerHTML=mr}function K(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(i);for(let r=0;r<e;r++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],c=8+Math.random()*8,g=Math.random()*100,p=Math.random()*.6,f=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${g}%;width:${c}px;height:${c*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${f}s ${p}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),i.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const r=document.createElement("style");r.id="ag-confetti-style",r.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(r)}setTimeout(()=>i.remove(),3e3)}function fr(e){const t=Array.isArray(d.specialDays&&d.specialDays.days)?d.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}function Vt(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function br(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function le(){return(d.photos||[]).filter(e=>e.type!=="video")}function yr(e,t){const a=I(),n=`${d.theme.secret}|${a}|${e}`,i=fr(e);if(i){const m=Array.isArray(i.outcomes)&&i.outcomes.length?i.outcomes:[{title:i.label,message:""}],y=m[fe(`${n}|special|outcome`,m.length)],v={id:"special",label:i.label,weight:0,tone:i.tone||"jackpot",outcomes:m},h=i.photoAlt&&d.photos.length&&le().find(w=>w.alt===i.photoAlt)||null;return{day:e,token:a,category:v,outcome:y,photo:h,unlockTime:i.unlockTime||null}}let r=nr(`${n}|category`,t||0);const o=Wn();if(o){const m=d.outcomes.categories.find(y=>y.id===o);m&&(r=m)}r.id==="photo"&&!le().length&&(r=d.outcomes.categories.find(m=>m.id==="common")||r);const s=new Set($().filter(m=>m.token===a&&m.day<e&&m.categoryId===r.id).map(m=>m.title)),c=r.outcomes.filter(m=>!s.has(m.title)),g=c.length>0?c:r.outcomes,p=g[fe(`${n}|${r.id}|outcome`,g.length)],f=le(),b=r.id==="photo"&&f.length?f[fe(`${n}|photo`,f.length)]:null;return{day:e,token:a,category:r,outcome:p,photo:b,collectToken:p.token||null}}function vr(){const e=_e()||A(d.theme.timezone),t=R();return yr(e,t)}function k(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function Zt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Q=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],Qt=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],Xt="affektions-gacha:mission-done:v1",ea="affektions-gacha:mission-feedback:v1";function Ze(){var r,o;const e=(r=d.missions)==null?void 0:r.pairs;if(!Array.isArray(e)||!e.length)return null;const t=A(((o=d.theme)==null?void 0:o.timezone)||"UTC"),a=fe(`${d.theme.secret}|mission|${t}`,e.length),n=e[a];return U()==="fionn"?n.fionn:n.lennart}function ta(){var e;try{const t=A(((e=d.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(Xt)===t}catch{return!1}}function xr(){var e,t;try{const a=A(((e=d.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(Xt,a);const n=U(),i=Ze(),r=new Date().toISOString();Sr({day:a,player:n,mission:i,doneAt:r});const o=(t=d.backup)==null?void 0:t.endpointUrl;o&&i&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:i,doneAt:r}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function aa(){var e;try{const t=A(((e=d.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(ea)===t}catch{return!1}}function wr(){var e;try{const t=A(((e=d.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(ea,t)}catch{}}function kr(e,t){var o,s;const a=A(((o=d.theme)==null?void 0:o.timezone)||"UTC"),n=U(),i=Ze();Er(a,n,{rating:e,comment:t||""}),wr();const r=(s=d.backup)==null?void 0:s.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:i,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function Sr(e){const t=ke(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),Fe(t)}function Er(e,t,a){const n=ke(),i=n.findIndex(r=>r.day===e&&r.player===t);i>=0&&(n[i]={...n[i],...a},Fe(n))}function Tr(e,t){var g;if(!e)return;const a=ke(),n=((g=d.theme)==null?void 0:g.timezone)||"UTC",i=A(n),r=new Map;for(const p of a)r.has(p.day)||r.set(p.day,{}),r.get(p.day)[p.player]=p;const o=Array.from(r.keys()).sort((p,f)=>f.localeCompare(p)).slice(0,30);if(!o.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},c=p=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(p+"T12:00:00Z"))}catch{return p}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+o.map(p=>{const f=r.get(p),b=f.lennart,m=f.fionn,y=p===i,v=[];if(b&&t!=="fionn"){const h=b.doneAt?'<span class="ag-log-done">✓</span>':"",w=b.rating?`<span class="ag-log-rating">${s[b.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${Zt(b.mission||"")}</span>${h}${w}</div>`)}if(m&&t!=="lennart"){const h=m.doneAt?'<span class="ag-log-done">✓</span>':"",w=m.rating?`<span class="ag-log-rating">${s[m.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${Zt(m.mission||"")}</span>${h}${w}</div>`)}return v.length?`<div class="ag-log-day${y?" ag-log-today":""}"><span class="ag-log-date">${c(p)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function na(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),i=l("#ag-mission-feedback-sent"),r=l("#ag-mission-done-note"),o=e.querySelector(".ag-mini-copy");o&&(o.hidden=!0);const s=Ze();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const c=ta(),g=aa();a&&(a.hidden=c),n&&(n.hidden=!c,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(p=>{p.hidden=g})),i&&(i.hidden=!g),r&&(r.hidden=!c),e.querySelectorAll(".ag-mission-rate-btn").forEach(p=>p.classList.remove("is-selected")),Tr(l("#ag-mission-log"),U()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Cr(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let Ce=-1;function ra(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Mt);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<Q.length){Ce=a;const n=l("#ag-gesprach-question");n&&(n.textContent=Q[a]);return}}}catch{}ia()}}function Lr(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function ia(){let e;do e=Math.floor(Math.random()*Q.length);while(e===Ce&&Q.length>1);Ce=e;try{localStorage.setItem(Mt,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=Q[e])}function Ar(){const e=Q[Ce]||"";if(!e)return;const t=d.theme&&d.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function oa(){var e;return!!((e=d.quest)!=null&&e.enabled&&ye(d))}function sa(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,la())}function Ir(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function la(){const e=ye(d),t=se(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),i=l("#ag-quest-loading"),r=l("#ag-quest-actions"),o=l("#ag-quest-result"),s=l("#ag-quest-points"),c=l("#ag-quest-copy"),g=l("#ag-quest-title"),p=(e==null?void 0:e.prompt)||"";if(!e){g&&(g.textContent="Keine Aufgabe"),c&&(c.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),r&&(r.hidden=!0);return}if(a&&(a.textContent=p),i&&(i.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((f,b)=>`<div class="ag-hint-item"><span class="ag-hint-num">${b+1}</span><p>${f}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){g&&(g.textContent="Aufgabe gelöst ✓"),c&&(c.textContent="Gut gemacht."),r&&(r.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Se()}`,s.hidden=!1);return}g&&(g.textContent="Foto-Aufgabe 📷"),c&&(c.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),r&&(r.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function Mr(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),i=l("#ag-quest-points"),r=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await zr(e),s=se(),c=ye(d),g=(c==null?void 0:c.prompt)||"",p=(c==null?void 0:c.solution)||"";try{const f=await Dr(o,g,p,s.attempts+1,s.hints);if(s.attempts+=1,f.success){const b=$t[Math.min(s.attempts-1,$t.length-1)],m=Xn(b);s.solved=!0,s.pointsEarned=b,s.successMessage=f.message||"Perfekt.",We(s),Z(),n&&(n.textContent=f.message||"Perfekt.",n.hidden=!1),i&&(i.textContent=`+${b} Punkte · Gesamt: ${m}`,i.hidden=!1),a&&(a.hidden=!0),r&&(r.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const y=l("#ag-btn-quest");y&&y.classList.remove("ag-chip-quest-active"),k([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],f.hint||"Versuch nochmal."],We(s),la()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function zr(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Dr(e,t,a,n,i){var s;const r=(s=d.quest)==null?void 0:s.proxyUrl;if(!r)throw new Error("no proxy");const o=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:i})});if(!o.ok)throw new Error("proxy error");return o.json()}function $r(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let g=0;g<n;g++)r[g]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=i;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const c=t.createGain();c.gain.setValueAtTime(0,a),c.gain.linearRampToValueAtTime(.055,a+.06),c.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(c),c.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([g,p,f,b,m])=>{const y=t.createOscillator();y.type="sine",y.frequency.setValueAtTime(g,a+f),y.frequency.exponentialRampToValueAtTime(p,a+f+b*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+f),v.gain.linearRampToValueAtTime(m,a+f+.09),v.gain.exponentialRampToValueAtTime(.001,a+f+b),y.connect(v),v.connect(t.destination),y.start(a+f),y.stop(a+f+b+.05)})}catch{}}function Nr(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,i)=>{const r=document.createElement("span");r.className="ag-letter-word",r.textContent=n,r.style.animationDelay=`${320+i*155}ms`,a.appendChild(r),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function da(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function ca(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),k([20,60,20]),$r();const t=l("#ag-letter-photo");if(t&&d.photos&&d.photos.length){const a=le(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Pr()}async function Pr(){var n;const e=l("#ag-letter-body");if(!e)return;Nr(e);const t=(n=d.quest)==null?void 0:n.proxyUrl;if(t)try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(i.ok){const r=await i.json();if(r.paragraphs&&r.paragraphs.length){da(e,r.paragraphs);return}}}catch{}const a=Qt[Math.floor(Math.random()*Qt.length)];da(e,a)}function Qe(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let F=null;function Br(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ga(e){return e?Br(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function de(){return I().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||d.theme.brand.displayNameDefault||"Lennart"}function Ur(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function qr(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:d.theme.timezone}).format(e)}catch{return A(d.theme.timezone)}}const jr=["🚴","🧄"],_r=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function ua(){const e=A(d.theme.timezone),t=I();return`${d.theme.secret}|${t}|${e}|emoji`}function Or(){const e=ua(),t=3+Math.floor(O(`${e}|count`)*3),a=_r.slice(),n=[];for(let i=0;i<t&&a.length;i+=1){const r=Math.floor(O(`${e}|pick|${i}`)*a.length);n.push(a.splice(r,1)[0])}return[...jr,...n]}function Rr(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Or(),a=t.length,n=ua();t.forEach((i,r)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=i;const s=360/a*r,c=(O(`${n}|angle|${r}`)-.5)*28,g=s+c,p=O(`${n}|radius|${r}`)*21-10.5,f=16+O(`${n}|dur|${r}`)*10,b=-O(`${n}|delay|${r}`)*f,m=O(`${n}|dir|${r}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${g}deg`),o.style.setProperty("--ag-emoji-radius",`${250+p}%`),o.style.setProperty("--ag-emoji-duration",`${f.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${b.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",m===1?"normal":"reverse"),e.appendChild(o)})}function Le(){const e=l("[data-ag-streak]"),t=R(),a=re();if(t>(a.maxStreak||0)&&qt({...a,maxStreak:t}),e){const n=Ht(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}Xe()}function Xe(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!Wt())}const pa={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Hr(e){const t=l("[data-ag-milestone]");if(!t)return;const a=pa[e];if(!a){t.hidden=!0;return}const n=I();if(tr(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,ar(n,e)}function Fr(e,t){const a=document.createElement("div");a.className="ag-pin-gate";const n=document.createElement("p");n.className="ag-pin-hint",n.textContent="🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const i=document.createElement("div");i.className="ag-pin-row";const r=document.createElement("input");r.type="text",r.inputMode="numeric",r.pattern="[0-9]*",r.maxLength=4,r.className="ag-pin-input",r.placeholder="_ _ _ _",r.autocomplete="off";const o=document.createElement("button");o.type="button",o.className="ag-secondary",o.textContent="Öffnen";const s=document.createElement("p");s.className="ag-pin-err",s.hidden=!0,s.textContent="Falsche Zahl. Noch einmal.";function c(){r.value.trim()===e?(Rt(e),t()):(s.hidden=!1,r.classList.add("ag-pin-shake"),r.value="",setTimeout(()=>r.classList.remove("ag-pin-shake"),450))}return o.addEventListener("click",c),r.addEventListener("keydown",g=>{g.key==="Enter"&&c()}),i.appendChild(r),i.appendChild(o),a.appendChild(n),a.appendChild(i),a.appendChild(s),a}function Gr(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("span");i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const r=document.createElement("p");r.className="ag-pin-hint",r.style.marginTop="10px",r.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const c=document.createElement("button");c.type="button",c.className="ag-secondary",c.textContent="Öffnen";const g=document.createElement("p");g.className="ag-pin-err",g.hidden=!0,g.textContent="Nicht ganz. Versuch nochmal.";function p(){s.value.trim().toLowerCase()===e.toLowerCase()?(Rt("link-"+e),n.remove(),Ae(t,a.outcome.link)):(g.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return c.addEventListener("click",p),s.addEventListener("keydown",f=>{f.key==="Enter"&&p()}),o.appendChild(s),o.appendChild(c),n.appendChild(i),n.appendChild(r),n.appendChild(o),n.appendChild(g),n}function Wr(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],i=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${i}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function ma(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function Ae(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=_(t);if(!a){e.hidden=!0;return}const n=Wr(a);e.appendChild(n||ma(a)),e.hidden=!1}function Kr(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=xe()[a]||0,i=jn[a]||"",r=5;if(n>=r)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(r)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${i}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{if(Jn(a),Z(),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',d.wishInbox&&d.wishInbox.enabled){const s=JSON.stringify({timestamp:new Date().toISOString(),token:I(),wish:`🎁 Sammelkapsel eingelöst: ${a} × ${r} — ${i}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(d.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s}).catch(()=>{})}});else{const s=r-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(r-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${i}</em></p>
      </div>`,e.hidden=!1}}function ha(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const i=document.createElement("div");i.className="ag-media-backdrop",i.setAttribute("aria-hidden","true"),t.type!=="video"&&(i.style.backgroundImage=`url("${t.url}")`),n.appendChild(i);let r;if(t.type==="video"){const o=Fn(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const c=document.createElement("img");c.src=`https://lh3.googleusercontent.com/d/${o}`,c.alt=a,c.className="ag-drive-poster-img",c.addEventListener("error",()=>c.remove(),{once:!0}),s.appendChild(c);const g=document.createElement("div");g.className="ag-drive-play-btn",g.setAttribute("aria-hidden","true"),s.appendChild(g);const p=()=>{s.removeEventListener("click",p),s.removeEventListener("keydown",f),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const b=document.createElement("iframe");b.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,b.allow="autoplay",b.setAttribute("allowfullscreen",""),b.setAttribute("frameborder","0"),b.setAttribute("aria-label",a),b.className="ag-drive-iframe",s.appendChild(b)},f=b=>{(b.key==="Enter"||b.key===" ")&&p()};s.addEventListener("click",p),s.addEventListener("keydown",f),r=s}else r=document.createElement("video"),r.src=_(t.url),r.controls=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("playsinline",""),r.setAttribute("preload","metadata"),r.setAttribute("aria-label",a),r.className="ag-media-content"}else r=document.createElement("img"),r.alt=a,r.loading="eager",r.decoding="auto",r.className="ag-media-content",r.addEventListener("load",()=>{const o=r.naturalWidth&&r.naturalHeight?r.naturalWidth/r.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),r.addEventListener("error",()=>{N("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=et(),c=s(o),g=c.find(p=>p.alt===t.alt&&p.type!=="video")||c.find(p=>p.type!=="video")||null;if(g&&g.url)i.style.backgroundImage=`url("${g.url}")`,r.src=_(g.url),d.photos=c;else{const p=r.closest("[data-ag-photo-wrap]");p&&(p.hidden=!0)}}).catch(()=>{const o=r.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),r.src=_(t.url);n.appendChild(r),e.appendChild(n)}function et(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const i=n.type==="video"||t.test(n.url||"");return{...n,type:i?"video":"image"}}).filter(n=>n.url)}}}function Yr(e,t,a,n){var c,g;const i=l("#ag-lightbox"),r=l("#ag-lightbox-img"),o=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!i||!r)){(c=i.querySelector(".ag-lightbox-iframe"))==null||c.remove(),(g=i.querySelector(".ag-lightbox-video"))==null||g.remove(),F&&(r.removeEventListener("error",F),F=null),r.onerror=null,s&&(s.hidden=!0);{r.hidden=!1;const p=_(e);if(!p)return;r.src=p,r.alt=t||"",F=()=>{const f=n||t;N("config/photos.json",{photos:[]}).then(b=>{const{normalizePhotos:m}=et(),y=m(b),v=y.find(h=>h.alt===f)||null;v&&v.url&&(r.src=_(v.url),d.photos=y)}).catch(()=>{})},r.addEventListener("error",F,{once:!0})}o.textContent=t||"",o.hidden=!t,i.hidden=!1,document.body.style.overflow="hidden"}}function tt(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(F&&(t.removeEventListener("error",F),F=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function fa(e){return[`${Vt(e.category.tone)} ${de()}s ${d.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var r;const[a,n]=e.unlockTime.split(":").map(Number),i=je(((r=d.theme)==null?void 0:r.timezone)||"UTC");return i.h>a||i.h===a&&i.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function Jr(e){var m;C.dataset.tone=e.category.tone,br(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=e.day,l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=ga(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]"),n=a?a.querySelector("[data-ag-pin-gate]"):null;if(n&&n.remove(),e.outcome.pin&&!Ot(e.outcome.pin)){t.hidden=!0;const y=Fr(e.outcome.pin,()=>{y.remove(),t.hidden=!1});y.setAttribute("data-ag-pin-gate",""),t.parentNode.insertBefore(y,t.nextSibling)}const i=l("[data-ag-photo-wrap]"),r=l("[data-ag-photo-media]"),o=l("[data-ag-photo-caption]"),s=l("[data-ag-link-wrap]");if(e.outcome.link&&e.unlockTime){const[y,v]=e.unlockTime.split(":").map(Number),h=je(((m=d.theme)==null?void 0:m.timezone)||"UTC"),w=e.outcome.linkPin;if(w)if(Ot("link-"+w))Ae(s,e.outcome.link);else if((()=>{if(!e.outcome.linkPinFrom)return!0;const[S,P]=e.outcome.linkPinFrom.split(":").map(Number);return h.h>S||h.h===S&&h.m>=P})()){const S=Gr(w,s,e);s.innerHTML="",s.appendChild(S),s.hidden=!1}else{const S=document.createElement("span");S.className="ag-outcome-link-locked",S.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s.innerHTML="",s.appendChild(S),s.hidden=!1}else if(h.h>y||h.h===y&&h.m>=v)Ae(s,e.outcome.link);else{const S=document.createElement("span");S.className="ag-outcome-link-locked",S.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s.innerHTML="",s.appendChild(S),s.hidden=!1}}else Ae(s,e.outcome.link||null);if(Kr(l("[data-ag-token-wrap]"),e),e.photo){ha(r,e.photo);const y=(e.photo.caption||"").trim();y?(o.textContent=y,o.hidden=!1):(o.textContent="",o.hidden=!0),i.hidden=!1}else r.innerHTML="",o.textContent="",o.hidden=!0,i.hidden=!0;const c=fa(e),g=encodeURIComponent("Mein Gacha-Zug"),p=encodeURIComponent(c),f=l("[data-ag-send]");d.theme.messageTarget.startsWith("mailto:")?f.href=`${d.theme.messageTarget}?subject=${g}&body=${p}`:f.href=d.theme.messageTarget.replace("{text}",p);const b=l("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),l("[data-ag-result]").hidden=!1,ba()}function Vr(e){return e?H().some(t=>t.day===e.day&&t.token===e.token):!1}function Ie(e){return H().some(t=>t.day===e.day&&t.token===e.token)}function ba(){const e=l("[data-ag-star]");if(!e)return;const t=Vr(d.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function Zr(e,t){const a=H(),n=a.findIndex(r=>r.day===e.day&&r.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),ve(a),Z();const i=Ie(e);t.textContent=i?"★":"☆",t.classList.toggle("is-starred",i),t.title=i?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",d.activeTab==="lieblinge"&&at()}function Qr(e){if(!e)return;const t=H(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),ve(t),Z(),ba(),d.activeTab==="lieblinge"&&at()}function Xr(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,revealedAt:Date.now()},a=$(),n=new Set,i=[t,...a].filter(r=>{if(!r||typeof r.day!="string"||typeof r.token!="string")return!1;const o=`${r.day}|${r.token}`;return n.has(o)?!1:(n.add(o),!0)});i.sort((r,o)=>r.day<o.day?1:r.day>o.day?-1:0),ne(i),ie(0),Z()}function ya(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,i]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=i)){const o=document.createElement("span");return o.className="ag-outcome-link-locked",o.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o}}const t=_(e.link);return t?ma(t):null}function va(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:i}=ei();n.textContent=i(e.day);const r=document.createElement("span");r.className="ag-history-badge",r.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");o.type="button",o.className="ag-history-star"+(Ie(e)?" is-starred":""),o.textContent=Ie(e)?"★":"☆",o.title=Ie(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",f=>{f.stopPropagation(),Zr(e,o)}),a.appendChild(n),a.appendChild(r),a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const c=document.createElement("div");c.className="ag-history-message",c.innerHTML=ga(e.message||""),t.appendChild(a);const g=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,p=e.photo&&(e.photo.type==="video"||g.test(e.photo.url||""));if(e.photo&&!p){const f=document.createElement("div");f.className="ag-history-body";const b=document.createElement("div");b.className="ag-history-thumb";const m=document.createElement("img");m.src=_(e.photo.url),m.alt=e.photo.alt||"Foto-Drop",m.loading="lazy",m.decoding="async",m.addEventListener("error",function(){N("config/photos.json",{photos:[]}).then(v=>{const{normalizePhotos:h}=et(),w=h(v),L=w.find(S=>S.alt===e.photo.alt&&S.type!=="video")||w.find(S=>S.type!=="video")||null;if(L&&L.url)e.photo.url=L.url,m.src=_(L.url),d.photos=w;else{b.classList.add("is-broken"),m.remove();const S=document.createElement("span");S.className="ag-history-thumb-broken",S.textContent="📷",b.appendChild(S)}}).catch(()=>{b.classList.add("is-broken"),m.remove();const v=document.createElement("span");v.className="ag-history-thumb-broken",v.textContent="📷",b.appendChild(v)})},{once:!0}),b.appendChild(m),b.style.cursor="pointer",b.title="Vollansicht",b.addEventListener("click",()=>Yr(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(s),y.appendChild(c),e.link){const v=ya(e);v&&y.appendChild(v)}f.appendChild(b),f.appendChild(y),t.appendChild(f)}else if(t.appendChild(s),t.appendChild(c),e.link){const f=ya(e);f&&t.appendChild(f)}return t}function ei(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),i=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(i)}catch{return e}}}}function X(){var o;const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=I(),i=A(((o=d.theme)==null?void 0:o.timezone)||"UTC"),r=$().filter(s=>s.token===n&&s.day<=i).slice().sort((s,c)=>s.day<c.day?1:s.day>c.day?-1:0);if(a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.",!r.length){t.hidden=!1,t.textContent="Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.";return}t.hidden=!0;for(const s of r)e.appendChild(va(s))}function at(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=H();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const i of n)e.appendChild(va(i))}function ti(){const e=l("[data-ag-odds]");e.innerHTML="";const t=R(),a=Ft(t),n=a.reduce((i,r)=>i+r.weight,0);for(const i of a){const r=document.createElement("li");r.textContent=`${i.label}: ${(i.weight/n*100).toFixed(1)} %`,e.appendChild(r)}if(t>=5){const i=Ht(t),r=document.createElement("li");r.textContent=`${i.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,r.style.fontWeight="800",e.appendChild(r)}}function ai(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function nt(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=He();n&&n.week===Oe()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=ai(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function ni(){var y;const e=U()==="fionn",t=e?d.theme.brand.fromName:de(),a=e?de():d.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=d.theme.brand.titleTemplate.replace("{name}",t));const i=l("[data-ag-kicker]");i&&(i.textContent=`${d.theme.brand.kicker} · ${d.photos.length} Erinnerungen`);const r=l("[data-ag-intro]");r&&(r.textContent=d.theme.brand.intro);const o=l("[data-ag-button-text]");o&&(o.textContent=d.theme.brand.buttonIdle);const s=l("[data-ag-rules-title]");s&&(s.textContent=d.theme.brand.rulesTitle);const c=l("[data-ag-rules-text]");c&&(c.textContent=d.theme.brand.rulesText);const g=l("[data-ag-send]");g&&(g.textContent=`An ${a} schicken`);const p=l("[data-ag-today-pill]");p&&(p.textContent=qr());const f=l("[data-ag-draw-hint]");f&&(f.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const b=l("[data-ag-chips]");b&&(b.innerHTML="");const m=Array.isArray(d.theme.stickers)&&d.theme.stickers.length?d.theme.stickers:Ur();for(const v of b?m:[]){const h=document.createElement("li");h.textContent=v,(v.toLowerCase().includes("bärlauch")||v.toLowerCase().includes("barlauch"))&&(h.id="ag-btn-baerlauch",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Bärlauch öffnen"),h.classList.add("ag-chip-clickable")),(v.toLowerCase().includes("gespräch")||v.toLowerCase().includes("gesprach"))&&(h.id="ag-btn-gesprach",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Gespräch öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase().includes("rave")&&(h.id="ag-btn-rave",h.tabIndex=0,h.setAttribute("role","link"),h.setAttribute("aria-label","Rave Board öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="quest"&&(h.id="ag-btn-quest",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Quest öffnen"),h.classList.add("ag-chip-clickable"),(y=d.quest)!=null&&y.enabled&&oa()&&(se().solved||h.classList.add("ag-chip-quest-active"))),v.toLowerCase().includes("glossar")&&(h.id="ag-btn-glossary",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Glossar öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="mission"&&(h.id="ag-btn-mission",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Mission öffnen"),h.classList.add("ag-chip-clickable"),ta()||h.classList.add("ag-chip-mission-active")),b.appendChild(h)}Rr(),Le()}let rt=null;function ri(){if(!rt)try{rt=new(window.AudioContext||window.webkitAudioContext)}catch{}return rt}function ii(){try{return window.localStorage.getItem(Un)!=="off"}catch{return!0}}function D(e,t,a,n,i=.15,r="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=r,o.frequency.value=t;const c=e.currentTime+a;s.gain.setValueAtTime(0,c),s.gain.linearRampToValueAtTime(i,c+.012),s.gain.exponentialRampToValueAtTime(1e-4,c+n),o.start(c),o.stop(c+n+.05)}function Me(e){if(!ii())return;const t=ri();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":D(t,280,0,.18,.08,"sine"),D(t,210,.12,.22,.06,"sine");break;case"cursed":D(t,220,0,.12,.1,"triangle"),D(t,170,.09,.28,.07,"triangle");break;case"uncommon":D(t,523,0,.14,.14,"sine"),D(t,784,.1,.22,.12,"sine");break;case"rare":D(t,523,0,.12,.14,"sine"),D(t,659,.09,.12,.14,"sine"),D(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>D(t,a,n*.09,.18,.13,"sine")),D(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>D(t,a,n*.08,.16,.13,"sine")),D(t,2093,.45,.5,.05,"sine");break;default:D(t,523,0,.12,.13,"sine"),D(t,659,.09,.18,.1,"sine");break}}function oi(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const i=e/a;if(i>=.7)return`≈ ${i>=2?Math.round(i):(Math.round(i*10)/10).toString().replace(".",",")}× ${n}`}return null}function si(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[i,r]of Object.entries(n))if(a.startsWith("trail/"+i)){a="trail/"+r+a.slice(6+i.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function li(e){if(!e||!e.includes("alltrails.com"))return null;function t(i){const r=i.indexOf("?"),o=r===-1?i:i.slice(0,r),s=r===-1?"":i.slice(r+1),c=new URLSearchParams(s);return c.set("scrollZoom","false"),c.set("u","m"),c.set("elevationDiagram","false"),o+"?"+c.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const i=e.match(/[?&]sh=([^&#]+)/),r=i?`&sh=${i[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${r}`)}const n=si(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function it(e,t){const a=d.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}function di(e){const t=oe();t.unshift(e),we(t),it("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function ci(e){we(oe().filter(t=>t.id!==e)),it("gipfel-delete",{id:e})}function gi(e,t){const a=oe(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,we(a),it("gipfel-upsert",i)}function ui(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?Hn(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),i=n?li(e.activityUrl):null,r=e.cover?`<div class="ag-gipfel-cover"><img src="${e.cover}" alt="${e.name||""}" loading="lazy"></div>`:"",o=e.distance?`${e.distance} km`:"",s=e.elevGain?`↑ ${e.elevGain} m`:"",c=o||s?`<div class="ag-gipfel-stats">${[o,s].filter(Boolean).join(" · ")}</div>`:"";t.innerHTML=`
    ${r}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-name">${e.name||"—"}</div>
        <div class="ag-gipfel-date">${_n(e.date)}</div>
      </div>
      <div class="ag-gipfel-elev">${Pt(e.elevation)}</div>
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${e.id}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${e.id}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${e.notes}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button><a class="ag-secondary" href="${e.activityUrl}" target="_blank" rel="noopener noreferrer">↗ Komoot öffnen</a></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n?`${i?`<div class="ag-gipfel-map-preview"><iframe src="${i}" height="220" frameborder="0" scrolling="no" loading="lazy" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe></div>`:""}<a class="ag-secondary" href="${e.activityUrl}" target="_blank" rel="noopener noreferrer">↗ AllTrails öffnen</a>`:""}
    ${e.activityUrl&&!a&&!n?`<a class="ag-secondary" href="${e.activityUrl}" target="_blank" rel="noopener noreferrer">↗ Tour öffnen</a>`:""}
  `;const g=t.querySelector("[data-ag-gipfel-edit]");g&&g.addEventListener("click",()=>{const b=l("[data-ag-berge-form]"),m=l("[data-ag-berge-add]");if(!b)return;const y=l("[data-ag-berge-edit-id]");y&&(y.value=e.id);const v=l("[data-ag-berge-name]");v&&(v.value=e.name||"");const h=l("[data-ag-berge-elev]");h&&(h.value=e.elevation||"");const w=l("[data-ag-berge-dist]");w&&(w.value=e.distance||"");const L=l("[data-ag-berge-gain]");L&&(L.value=e.elevGain||"");const S=l("[data-ag-berge-date]");S&&(S.value=e.date||"");const P=l("[data-ag-berge-url]");P&&(P.value=e.activityUrl||"");const G=l("[data-ag-berge-cover]");G&&(G.value=e.cover||"");const W=l("[data-ag-berge-notes]");W&&(W.value=e.notes||"");const j=l("[data-ag-berge-form-title]");j&&(j.textContent="Eintrag bearbeiten");const ue=l("[data-ag-berge-save] span:last-child");ue&&(ue.textContent="Speichern"),b.hidden=!1,m&&(m.hidden=!0),b.scrollIntoView({behavior:"smooth",block:"nearest"}),v&&v.focus(),k(8)});const p=t.querySelector("[data-ag-gipfel-delete]");p&&p.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(ci(e.id),ce(),k(8),Promise.resolve().then(()=>Ei).then(b=>b.showToast("Eintrag gelöscht")).catch(()=>{}))});const f=t.querySelector("[data-ag-map-komoot]");return f&&f.addEventListener("click",()=>{const b=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(b){if(!b.hidden){b.hidden=!0,f.textContent="🗺 Komoot-Karte";return}b.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,b.hidden=!1,f.textContent="Karte schließen",k(4)}}),t}function ce(){const e=l("[data-ag-berge-list]"),t=l("[data-ag-berge-empty]"),a=l("[data-ag-berge-total]"),n=l("[data-ag-berge-analogy]");if(!e)return;const i=oe();e.innerHTML="";const r=i.reduce((o,s)=>o+(Number(s.elevation)||0),0);if(a&&(a.textContent=r>0?Pt(r):"— m"),n){const o=oi(r);o?(n.textContent=o,n.hidden=!1):n.hidden=!0}if(!i.length){t&&(t.hidden=!1);return}t&&(t.hidden=!0),i.forEach(o=>e.appendChild(ui(o)))}const xa=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function wa(e){return xa[Math.min(e-1,xa.length-1)]}function ee(e,t){return e+Math.random()*(t-e)}function ka(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${d.baerlauch.level}`)}function ge(){d.baerlauch.timerId&&(clearInterval(d.baerlauch.timerId),d.baerlauch.timerId=null)}function Sa(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");o&&(o.hidden=!0),ge(),d.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),i&&(i.innerHTML=""),r&&(r.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Ea(U(),d.baerlauch.level,!1),st()}function pi(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),i=l("#ag-baerlauch-actions"),r=l("#ag-baerlauch-next");ge(),d.baerlauch.level+=1;const o=fi(U(),d.baerlauch.level);if(Ea(U(),d.baerlauch.level,!0),st(),ka(),o&&K(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&d.photos&&d.photos.length){const s=le(),c=s.length?s[Math.floor(Math.random()*s.length)]:null;ha(a,c),t.hidden=!1;const g=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=g[Math.floor(Math.random()*g.length)]}r&&(r.textContent=`Level ${d.baerlauch.level} starten`),i&&(i.hidden=!1)}function mi(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),i=wa(d.baerlauch.level).timeMs;d.baerlauch.durationMs=i,d.baerlauch.startedAt=performance.now(),ge(),d.baerlauch.timerId=setInterval(()=>{const r=performance.now()-d.baerlauch.startedAt,o=Math.max(0,i-r),s=Math.min(1,r/i);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const c=document.querySelectorAll(".ag-forage-item"),g=Math.pow(s,1.4);c.forEach(p=>{p.style.filter=`brightness(${1-g*.72}) saturate(${1-g*.45}) hue-rotate(${g*8}deg)`,p.style.opacity=String(1-g*.28)}),o<=0&&(ge(),e())},50)}function ot(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!i||!r)return;if(e.hidden=!1,st(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),d.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,i.innerHTML="",r.textContent="",o&&(o.hidden=!0),ka();const s=wa(d.baerlauch.level),c=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],g=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],p=[...c.slice(0,s.good).map(m=>({emoji:m,good:!0})),...g.slice(0,s.bad).map(m=>({emoji:m,good:!1}))];let f=0;const b=p.filter(m=>m.good).length;p.forEach(m=>{const y=document.createElement("button");y.type="button",y.className="ag-forage-item",y.textContent=m.emoji,y.dataset.good=m.good?"true":"false",y.style.left=`${ee(8,82)}%`,y.style.top=`${ee(10,72)}%`,y.style.setProperty("--dx",`${ee(-320,320)}px`),y.style.setProperty("--dy",`${ee(-220,220)}px`),y.style.setProperty("--dur",`${ee(s.speedMin,s.speedMax)}s`),y.style.setProperty("--delay",`${ee(-1.8,0)}s`),y.addEventListener("click",()=>{d.baerlauch.locked||(y.dataset.good==="true"?(y.classList.add("is-picked"),y.disabled=!0,f+=1,setTimeout(()=>y.remove(),140),f===b&&pi()):Sa("poison"))}),t.appendChild(y)}),mi(()=>Sa("timeout"))}function hi(){const e=l("#ag-baerlauch-panel");ge(),e&&(e.hidden=!0)}function fi(e,t){var i;const a=Ge(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=(i=d.backup)==null?void 0:i.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Ea(e,t,a){var o;const n=jt(),i=((o=d.theme)==null?void 0:o.timezone)||"UTC",r=A(i);n.unshift({date:r,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function st(){var f;const e=l("#ag-baerlauch-scores");if(!e)return;const a=U()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",i=Ge(),r=jt(),o=a==="fionn"?"lennart":"fionn",s=a in i||o in i;if(!s&&!r.length){e.hidden=!0;return}e.hidden=!1;const c=((f=d.theme)==null?void 0:f.timezone)||"UTC",g=b=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:c}).format(new Date(b+"T12:00:00Z"))}catch{return b}};let p="";if(s){const b=i[a]??0,m=i[o]??0;p+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${b||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${m||"—"}</span></div>
    </div>`}if(r.length){const b=r.slice(0,8).map(m=>{const y=m.player===a,v=y?"ag-score-mine":"ag-score-theirs",h=y?"Du":n,w=m.won?`✓ Level ${m.level}`:`✗ Level ${m.level-1>=1?m.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${g(m.date)}</span><span class="ag-score-pill ${v}">${h}</span><span class="ag-score-result">${w}</span></div>`}).join("");p+=`<div class="ag-score-table">${b}</div>`}e.innerHTML=p}let z=null,q=null,Y="swabian";function ze(){try{return JSON.parse(window.localStorage.getItem(Nt)||"[]")||[]}catch{return[]}}function lt(e){try{window.localStorage.setItem(Nt,JSON.stringify(e))}catch{}}function bi(e){const t=ze();t.unshift(e),lt(t),dt("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function yi(e,t){const a=ze(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,lt(a),dt("glossary-upsert",i)}function vi(e){lt(ze().filter(t=>t.id!==e)),dt("glossary-delete",{id:e})}function dt(e,t){const a=d.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:I(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function ct(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function xi(e,t){const a=d.backup;if(!a||!a.enabled||!a.endpointUrl)return ct(e);try{const n=await ct(e),i=n.split(",")[1],r=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:I(),filename:`glossary-${t}.webm`,mimeType:r,data:i}),c=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return c.ok&&c.url?c.url:n}catch{return ct(e)}}function wi(e){const t=document.createElement("div");t.className="ag-glossary-card",t.dataset.agGlossaryId=e.id,t.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${e.word||"—"}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${e.meaning}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${e.id}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${e.id}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${e.id}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const a=t.querySelector("[data-ag-glossary-play]");a&&e.audioUrl&&a.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),k(6)});const n=t.querySelector("[data-ag-glossary-edit]");n&&n.addEventListener("click",()=>{var p;const r=document.getElementById("ag-glossary-form"),o=document.getElementById("ag-glossary-add");if(!r)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const s=document.getElementById("ag-glossary-form-title");s&&(s.textContent="Wort bearbeiten");const c=document.getElementById("ag-glossary-save-label");c&&(c.textContent="Speichern");const g=document.getElementById("ag-glossary-audio-status");g&&(g.textContent=e.audioUrl?"Aufnahme vorhanden":""),q=null,r.hidden=!1,o&&(o.hidden=!0),r.scrollIntoView({behavior:"smooth",block:"nearest"}),(p=document.getElementById("ag-glossary-word-input"))==null||p.focus(),k(8)});const i=t.querySelector("[data-ag-glossary-del]");return i&&i.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(vi(e.id),De(Y),k(8))}),t}function De(e){Y=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(i=>{i.classList.toggle("is-active",i.dataset.lang===Y)}),Ta();const n=ze().filter(i=>i.lang===Y);if(t.innerHTML="",!n.length){a&&(a.hidden=!1);return}a&&(a.hidden=!0),n.forEach(i=>t.appendChild(wi(i)))}function Ta(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function Ca(){const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),Y="swabian",De("swabian"),window.requestAnimationFrame(()=>Ta()),k(10))}function ki(){const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),q=null,z&&z.state!=="inactive")try{z.stop()}catch{}z=null}const gt=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],ut=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];function $e(e){const t=C.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}function pt(e){d.activeTab=e,C.querySelectorAll("[data-ag-tab]").forEach(n=>{const i=n.dataset.agTab===e;n.classList.toggle("is-active",i),n.setAttribute("aria-selected",i?"true":"false")}),l("[data-ag-panel-today]").hidden=e!=="today",l("[data-ag-panel-history]").hidden=e!=="history",l("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",l("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&X(),e==="lieblinge"&&at(),e==="berge"&&(ce(),Te().then(()=>ce()).catch(()=>{}));const a=l("[data-ag-fab]");a&&(a.hidden=e!=="berge")}function La(){const e=d.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:I(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,i).then(r=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}),a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)})}function te(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function Aa(){const e=d.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:I(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){te("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){te("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),te("Stups wird gesendet…","pending");const r=JSON.stringify(n),o=()=>{te("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{te("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(c=>{c&&c.ok?o():s()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o).catch(s)}catch{s()}})}function mt(e){const t=d.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:I(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},i=JSON.stringify(n),r=o=>{const s=He();!s||s.week!==e.week||(Ut({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),nt())};r("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(o=>{o&&o.ok?r("sent"):r("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(()=>r("sent")).catch(()=>r("failed"))}catch{r("failed")}})}function Ia(){const e=He();!e||e.week!==Oe()||e.remoteStatus!=="sent"&&mt(e)}function Ma(){const e=document.querySelector("[data-ag-notif-card]");if(e&&"Notification"in window&&!(Notification.permission==="granted"||Notification.permission==="denied")){try{if(window.localStorage.getItem(he)==="dismissed")return}catch{}e.hidden=!1,e.removeAttribute("hidden")}}function Si(){var s;const e=((s=d.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),i=a*60+n,r=8*60,o=i<r?r-i:24*60-i+r;return Date.now()+o*60*1e3}async function Ne(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=d.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=I(),i=A(a);if($().some(f=>f.token===n&&f.day===i)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=je(a);if(o>=21)return;const c=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,g=de(),p=ut[Bt(ut)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,c),title:p.title.replace("{name}",g),body:p.body.replace("{name}",g)})}catch{}}async function za(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,i=de(),r=gt[Bt(gt)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Si(),title:r.title.replace("{name}",i),body:r.body.replace("{name}",i)}),(t=d.quest)!=null&&t.enabled&&oa()){const o=se(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==be(d)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(be(d)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:d.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:d.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Da(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function ht(){if("serviceWorker"in navigator)try{const e=Gn("sw.js");if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await za(),await Ne(),await Da())}catch{}}async function $a(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(he,"dismissed")}catch{}return}try{window.localStorage.setItem(he,"granted")}catch{}await ht()}function ft(e,t,a,n,i,r){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,i,r);else{const o=Array.isArray(r)?r:[r,r,r,r],[s,c,g,p]=o.map(f=>Math.min(f,n/2,i/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-c,a),e.quadraticCurveTo(t+n,a,t+n,a+c),e.lineTo(t+n,a+i-g),e.quadraticCurveTo(t+n,a+i,t+n-g,a+i),e.lineTo(t+p,a+i),e.quadraticCurveTo(t,a+i,t,a+i-p),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function bt(e,t,a){const n=t.split(" "),i=[];let r="";for(const o of n){const s=r?`${r} ${o}`:o;e.measureText(s).width>a&&r?(i.push(r),r=o):r=s}return r&&i.push(r),i}function Na(e){var G,W;const i=document.createElement("canvas"),r=Math.min(window.devicePixelRatio||1,2);i.width=640*r,i.height=340*r,i.style.width="640px",i.style.height="340px";const o=i.getContext("2d");o.scale(r,r);const s=e.category.id==="jackpot",c=s?"#2d1f00":"#0d2b1c",g=s?"#1a1000":"#061510",p=o.createLinearGradient(0,0,0,340);p.addColorStop(0,c),p.addColorStop(1,g),o.fillStyle=p,ft(o,0,0,640,340,20),o.fill();const f=s?"#b9782e":"#2f7a4f";o.fillStyle=f,ft(o,0,0,640,5,[20,20,0,0]),o.fill();const b=e.category.label,m=Vt(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${m} ${b}`,40,62);const y=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const v=o.measureText(y).width;o.fillText(y,600-v,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const h=bt(o,e.outcome.title,640-40*2);let w=108;for(const j of h)o.fillText(j,40,w),w+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const L=bt(o,e.outcome.message,640-40*2);w+=4;for(const j of L){if(w>270)break;o.fillText(j,40,w),w+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const S=((W=(G=d.theme)==null?void 0:G.brand)==null?void 0:W.machineName)||"Affektions-Gacha";o.fillText(S,40,324);const P=document.createElement("a");P.download=`gacha-${e.category.id}-${e.day}.png`,P.href=i.toDataURL("image/png"),P.click()}function yt(e){C.style.opacity="1",C.innerHTML=`
    <div class="ag-error">
      <h2>Die Maschine klemmt.</h2>
      <p>${Pa(e.message||String(e))}</p>
    </div>
  `}function Pa(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function Ba(){d.todaysPull||(d.todaysPull=vr());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=d.theme.loadingSteps||["Maschine rattert"];let n=0;C.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const i=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((d.theme.revealDelayMs||3200)/a.length))),r=d.theme.revealDelayMs||3200,o=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(f=>parseFloat(f.style.getPropertyValue("--ag-emoji-duration"))||20),c=performance.now();let g;function p(f){const b=Math.min((f-c)/r,1),m=1+5*b*b;o.forEach((y,v)=>{y.style.setProperty("--ag-emoji-duration",`${(s[v]/m).toFixed(3)}s`)}),b<1&&(g=requestAnimationFrame(p))}g=requestAnimationFrame(p),window.setTimeout(()=>{var y,v,h,w;window.clearInterval(i),cancelAnimationFrame(g),o.forEach((L,S)=>{L.style.setProperty("--ag-emoji-duration",`${s[S].toFixed(2)}s`)}),d.todaysPull.collectToken&&($().some(S=>S.day===d.todaysPull.day&&S.token===d.todaysPull.token)||Yn(d.todaysPull.collectToken)),Jr(d.todaysPull),C.classList.remove("is-revealing"),C.classList.add("is-revealed"),C.classList.add("has-drawn"),e.disabled=!1,t.textContent=d.theme.brand.buttonShown,d.revealed=!0,_e()||Xr(d.todaysPull),Ne();const f=R();Le(),Hr(f);const b=(v=(y=d.todaysPull)==null?void 0:y.category)==null?void 0:v.id,m=(w=(h=d.todaysPull)==null?void 0:h.category)==null?void 0:w.tone;if(b==="special"){const L=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];K(130,L),setTimeout(()=>K(90,L),700),Me("special")}else if(m==="jackpot"){const L=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];K(120,L),setTimeout(()=>K(80,L),650),Me("jackpot")}else m==="rare"?(K(70),Me("rare")):Me(m||"common");pa[f]?k([30,20,30,20,60]):k([20,20,40]),d.activeTab==="history"&&X(),Ma()},d.theme.revealDelayMs||3200)}function Ua(){var Oa,Ra,Ha,Fa,Ga,Wa,Ka,Ya,Ja,Va,Za,Qa,Xa,en,tn,an,nn,rn,on,sn,ln,dn,cn,gn,un,pn,mn,hn,fn,bn,yn,vn;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(ca,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,ca();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{k(12),Ba()}),(Oa=l("#ag-btn-rave"))==null||Oa.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Ra=l("#ag-btn-rave"))==null||Ra.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Ha=l("#ag-btn-baerlauch"))==null||Ha.addEventListener("click",ot),(Fa=l("#ag-baerlauch-close"))==null||Fa.addEventListener("click",hi),(Ga=l("#ag-baerlauch-next"))==null||Ga.addEventListener("click",ot),(Wa=l("#ag-btn-baerlauch"))==null||Wa.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),ot())}),(Ka=l("#ag-btn-gesprach"))==null||Ka.addEventListener("click",ra),(Ya=l("#ag-btn-glossary"))==null||Ya.addEventListener("click",Ca),(Ja=l("#ag-btn-glossary"))==null||Ja.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Ca())}),(Va=l("#ag-glossary-close"))==null||Va.addEventListener("click",ki),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(u=>{u.addEventListener("click",()=>{De(u.dataset.lang),k(4)})});const i=document.getElementById("ag-glossary-add"),r=document.getElementById("ag-glossary-form");i&&i.addEventListener("click",()=>{var M;if(!r)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const u=document.getElementById("ag-glossary-form-title");u&&(u.textContent="Neues Wort");const x=document.getElementById("ag-glossary-save-label");x&&(x.textContent="Eintragen");const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent=""),q=null;const T=document.getElementById("ag-glossary-play-preview");T&&(T.hidden=!0),r.hidden=!1,i.hidden=!0,(M=document.getElementById("ag-glossary-word-input"))==null||M.focus(),k(8)}),(Za=document.getElementById("ag-glossary-form-cancel"))==null||Za.addEventListener("click",()=>{if(r&&(r.hidden=!0),i&&(i.hidden=!1),document.getElementById("ag-glossary-edit-id").value="",q=null,z&&z.state!=="inactive")try{z.stop()}catch{}z=null,k(6)}),(Qa=document.getElementById("ag-glossary-form-save"))==null||Qa.addEventListener("click",async()=>{var B,J,Ue,me;const u=(((B=document.getElementById("ag-glossary-word-input"))==null?void 0:B.value)||"").trim(),x=(((J=document.getElementById("ag-glossary-meaning-input"))==null?void 0:J.value)||"").trim(),E=(((Ue=document.getElementById("ag-glossary-edit-id"))==null?void 0:Ue.value)||"").trim();if(!u){(me=document.getElementById("ag-glossary-word-input"))==null||me.focus();return}const T=document.getElementById("ag-glossary-audio-status");let M=null;if(q){T&&(T.textContent="Wird hochgeladen…");const V=E||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;M=await xi(q,V)}if(k([20,20,40]),E){const V={word:u,meaning:x||null};M!==null&&(V.audioUrl=M),yi(E,V)}else bi({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:Y,word:u,meaning:x||null,audioUrl:M,token:I()});r&&(r.hidden=!0),i&&(i.hidden=!1),document.getElementById("ag-glossary-edit-id").value="",q=null,z=null,De(Y),$e("Wort gespeichert ✓")});const o=document.getElementById("ag-glossary-record");o&&o.addEventListener("click",async()=>{if(z&&z.state==="recording"){z.stop();return}try{const u=await navigator.mediaDevices.getUserMedia({audio:!0}),x=[];z=new MediaRecorder(u),z.ondataavailable=T=>{T.data.size>0&&x.push(T.data)},z.onstop=()=>{u.getTracks().forEach(B=>B.stop()),q=new Blob(x,{type:z.mimeType||"audio/webm"});const T=document.getElementById("ag-glossary-audio-status");T&&(T.textContent="✓ Aufnahme bereit");const M=document.getElementById("ag-glossary-play-preview");M&&(M.hidden=!1),o.textContent="🎙 Neu aufnehmen"},z.start(),o.textContent="⏹ Stop";const E=document.getElementById("ag-glossary-audio-status");E&&(E.textContent="● REC"),k(10)}catch{const x=document.getElementById("ag-glossary-audio-status");x&&(x.textContent="Mikrofon nicht verfügbar")}}),(Xa=document.getElementById("ag-glossary-play-preview"))==null||Xa.addEventListener("click",()=>{if(!q)return;const u=URL.createObjectURL(q),x=new Audio(u);x.onended=()=>URL.revokeObjectURL(u),x.play().catch(()=>{})}),(en=l("#ag-btn-mission"))==null||en.addEventListener("click",na),(tn=l("#ag-btn-mission"))==null||tn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),na())}),(an=l("#ag-mission-close"))==null||an.addEventListener("click",Cr),(nn=l("#ag-mission-done"))==null||nn.addEventListener("click",()=>{xr();const u=l("#ag-mission-actions"),x=l("#ag-mission-feedback"),E=l("#ag-mission-done-note"),T=l("#ag-btn-mission");u&&(u.hidden=!0),E&&(E.hidden=!1),x&&!aa()&&(x.hidden=!1),T&&T.classList.remove("ag-chip-mission-active")}),(rn=l("#ag-mission-panel"))==null||rn.querySelectorAll(".ag-mission-rate-btn").forEach(u=>{u.addEventListener("click",()=>{var x;(x=l("#ag-mission-panel"))==null||x.querySelectorAll(".ag-mission-rate-btn").forEach(E=>E.classList.remove("is-selected")),u.classList.add("is-selected")})}),(on=l("#ag-mission-feedback-send"))==null||on.addEventListener("click",()=>{var B;const u=l("#ag-mission-panel"),x=u==null?void 0:u.querySelector(".ag-mission-rate-btn.is-selected"),E=(x==null?void 0:x.dataset.rating)||null,T=(((B=l("#ag-mission-comment"))==null?void 0:B.value)||"").trim();kr(E,T);const M=l("#ag-mission-feedback-sent");u==null||u.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(J=>{J.hidden=!0}),M&&(M.hidden=!1)}),(sn=l("#ag-letter-close"))==null||sn.addEventListener("click",Qe),(ln=l("#ag-letter-overlay"))==null||ln.addEventListener("click",u=>{u.target===u.currentTarget&&Qe()}),(dn=l("#ag-lightbox-close"))==null||dn.addEventListener("click",()=>{tt()}),(cn=l("#ag-lightbox"))==null||cn.addEventListener("click",u=>{u.target===u.currentTarget&&tt()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&(Qe(),tt())}),(gn=l("#ag-gesprach-close"))==null||gn.addEventListener("click",Lr),(un=l("#ag-gesprach-next"))==null||un.addEventListener("click",ia),(pn=l("#ag-gesprach-wa"))==null||pn.addEventListener("click",Ar),(mn=l("#ag-btn-gesprach"))==null||mn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),ra())}),(hn=l("#ag-btn-quest"))==null||hn.addEventListener("click",sa),(fn=l("#ag-quest-close"))==null||fn.addEventListener("click",Ir),(bn=l("#ag-btn-quest"))==null||bn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),sa())}),(yn=l("#ag-quest-file"))==null||yn.addEventListener("change",u=>{const x=u.target.files&&u.target.files[0];x&&Mr(x)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!d.todaysPull)return;k(8);const u=fa(d.todaysPull);try{await navigator.clipboard.writeText(u),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",u)}}),l("[data-ag-save-img]").addEventListener("click",()=>{d.todaysPull&&(k(8),Na(d.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{k(8),Qr(d.todaysPull)});const s=l("[data-ag-recover-btn]");s&&s.addEventListener("click",()=>{s.textContent="⏳",s.disabled=!0;const u=Li();X(),Le(),s.textContent=u>0?`↺${u}`:"✓",setTimeout(()=>{s.textContent="↺",s.disabled=!1},3e3)});const c=l("[data-ag-streak-restore]");c&&c.addEventListener("click",()=>{if(!Wt()){Xe();return}const u=Ye(),x=Ke(),T=Ee()>0&&x-Ee()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${x-1} Streak-Retter übrig.`;if(!window.confirm(T))return;c.disabled=!0;const B=rr();X(),Le(),B&&(K(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),k([30,20,30,20,60])),Xe(),c.disabled=!1});const g=l("[data-ag-sync-btn]");g&&g.addEventListener("click",async()=>{g.textContent="⏳",g.disabled=!0;const u=await Te();X(),g.textContent=u<0?"✗":`✓${u}`,setTimeout(()=>{g.textContent="☁",g.disabled=!1},3e3)}),C.querySelectorAll("[data-ag-tab]").forEach(u=>{u.addEventListener("click",()=>{k(6),pt(u.dataset.agTab)})});const p=l("[data-ag-berge-add]"),f=l("[data-ag-berge-form]"),b=l("[data-ag-berge-cancel]"),m=l("[data-ag-berge-save]");p&&p.addEventListener("click",()=>{var x,E;k(8);const u=l("[data-ag-berge-date]");u&&!u.value&&(u.value=A(((x=d.theme)==null?void 0:x.timezone)||"Europe/Zurich")),f.hidden=!1,p.hidden=!0,(E=l("[data-ag-sheet-backdrop]"))==null||E.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),b&&b.addEventListener("click",()=>{var u;k(6),f.hidden=!0,p.hidden=!1,(u=l("[data-ag-sheet-backdrop]"))==null||u.classList.remove("is-open")}),m&&m.addEventListener("click",()=>{var kn,Sn,En,Tn,Cn,Ln,An,In,Mn,zn,Dn,$n;const u=(((kn=l("[data-ag-berge-name]"))==null?void 0:kn.value)||"").trim(),x=parseInt(((Sn=l("[data-ag-berge-elev]"))==null?void 0:Sn.value)||"",10),E=parseFloat(((En=l("[data-ag-berge-dist]"))==null?void 0:En.value)||""),T=parseInt(((Tn=l("[data-ag-berge-gain]"))==null?void 0:Tn.value)||"",10),M=((Cn=l("[data-ag-berge-date]"))==null?void 0:Cn.value)||A(((Ln=d.theme)==null?void 0:Ln.timezone)||"Europe/Zurich"),B=(((An=l("[data-ag-berge-url]"))==null?void 0:An.value)||"").trim(),J=(((In=l("[data-ag-berge-cover]"))==null?void 0:In.value)||"").trim(),Ue=(((Mn=l("[data-ag-berge-notes]"))==null?void 0:Mn.value)||"").trim(),me=(((zn=l("[data-ag-berge-edit-id]"))==null?void 0:zn.value)||"").trim();if(!u){(Dn=l("[data-ag-berge-name]"))==null||Dn.focus();return}k([20,20,40]);const V={name:u,elevation:isNaN(x)?null:x,distance:isNaN(E)?null:E,elevGain:isNaN(T)?null:T,date:M,activityUrl:B||null,cover:J||null,notes:Ue||null};me?gi(me,V):di({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...V,token:I()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-elev]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]"].forEach($i=>{const Nn=l($i);Nn&&(Nn.value="")});const xn=l("[data-ag-berge-form-title]");xn&&(xn.textContent="Neuer Gipfeleintrag");const wn=l("[data-ag-berge-save] span:last-child");wn&&(wn.textContent="Eintragen"),f.hidden=!0,p.hidden=!1,($n=l("[data-ag-sheet-backdrop]"))==null||$n.classList.remove("is-open"),ce(),$e("Gipfel gespeichert ✓")});const y=l("[data-ag-ping-card]");y&&(y.hidden=!(I()==="fionn"&&((vn=d.backup)!=null&&vn.enabled)));const v=l("[data-ag-ping-dismiss]");v&&v.addEventListener("click",()=>{const u=l("[data-ag-ping-banner]");u&&(u.hidden=!0)});const h=l("[data-ag-ping-send]");h&&h.addEventListener("click",()=>{k([20,30,20]);try{La()}catch{}});const w=l("[data-ag-hug-send]");w&&w.addEventListener("click",()=>{k([20,30,20]);try{Aa()}catch{}});const L=l("[data-ag-wish-open]"),S=l("[data-ag-wish-cancel]"),P=l("[data-ag-wish-submit]");L&&L.addEventListener("click",()=>{k(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const u=l("[data-ag-wish-input]");u&&window.setTimeout(()=>u.focus(),60)}),S&&S.addEventListener("click",()=>{k(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),P&&P.addEventListener("click",()=>{const u=l("[data-ag-wish-input]"),x=((u==null?void 0:u.value)||"").trim();if(!x)return;k([20,20,40]);const E={week:Oe(),text:x,submittedAt:Date.now(),remoteStatus:"idle"};Ut(E),nt();try{mt(E)}catch{}});const G=l("[data-ag-notif-enable]"),W=l("[data-ag-notif-dismiss]");G&&G.addEventListener("click",()=>{k(10),$a()}),W&&W.addEventListener("click",()=>{k(6);try{window.localStorage.setItem(he,"dismissed")}catch{}const u=l("[data-ag-notif-card]");u&&(u.hidden=!0)});const j=l("[data-ag-sheet-backdrop]");j&&j.addEventListener("click",()=>{k(6);const u=l("[data-ag-berge-form]"),x=l("[data-ag-berge-add]");u&&!u.hidden&&(u.hidden=!0,x&&(x.hidden=!1));const E=document.getElementById("ag-glossary-form"),T=document.getElementById("ag-glossary-add");E&&!E.hidden&&(E.hidden=!0,T&&(T.hidden=!1)),j.classList.remove("is-open")});const ue=l("[data-ag-fab]");ue&&ue.addEventListener("click",()=>{k(8);const u=l("[data-ag-berge-add]");u&&!u.hidden&&u.click()});const vt=["today","history","lieblinge","berge"];let qa=0,ja=0;const _a=l(".ag-content")||C;_a.addEventListener("touchstart",u=>{qa=u.touches[0].clientX,ja=u.touches[0].clientY},{passive:!0}),_a.addEventListener("touchend",u=>{const x=u.changedTouches[0].clientX-qa,E=Math.abs(u.changedTouches[0].clientY-ja);if(Math.abs(x)>52&&E<44){const T=vt.indexOf(d.activeTab),M=x<0?Math.min(T+1,vt.length-1):Math.max(T-1,0);M!==T&&(k(6),pt(vt[M]))}},{passive:!0});const pe=l("[data-ag-ptr]");let Pe=0,Be=!1;document.addEventListener("touchstart",u=>{window.scrollY===0&&(Pe=u.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",u=>{if(!Pe)return;u.touches[0].clientY-Pe>64&&!Be&&pe&&(Be=!0,pe.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Be&&pe&&(pe.classList.add("is-loading"),await Te(),d.activeTab==="berge"&&ce(),d.activeTab==="history"&&X(),pe.classList.remove("is-visible","is-loading"),$e("Aktualisiert ✓")),Pe=0,Be=!1},{passive:!0})}const Ei=Object.freeze(Object.defineProperty({__proto__:null,DAILY_REMINDER_POOL:gt,STREAK_WARN_POOL:ut,bindEvents:Ua,downloadResultAsImage:Na,drawRoundRect:ft,enableNotifications:$a,escapeHtml:Pa,registerServiceWorker:ht,renderError:yt,retryPendingWishSend:Ia,reveal:Ba,scheduleNotification:za,scheduleStreakWarning:Ne,sendHugToInbox:Aa,sendPingToBackend:La,sendWishToInbox:mt,setActiveTab:pt,setHugStatus:te,showNotifPrompt:Ma,showToast:$e,tryPeriodicSync:Da,wrapText:bt},Symbol.toStringTag,{value:"Module"})),Ti={photos:[]};function Ci(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=Kt();return a.map(i=>{const r=new URL(i.url,n).toString(),o=i.type==="video"||t.test(r);return{...i,type:o?"video":"image",url:r}}).filter(i=>i.url)}function Li(){var s;const e=I(),t=A(((s=d.theme)==null?void 0:s.timezone)||"UTC"),a=[{day:"2026-05-01",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-02",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Foto-Drop",message:"Die Maschine spuckt eine Erinnerung aus. Das zählt als Preis, auch wenn sie sentimental tut."},{day:"2026-05-03",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-04",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Der Fionn-Quest-Sieger",message:"Lennart ist der offizielle Gewinner. 24h lang hast du die absolute Entscheidungsgewalt über alle Freizeitaktivitäten."},{day:"2026-05-05",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Barróg (IE)",message:"Eine feste Umarmung (20 Sekunden Minimum)."},{day:"2026-05-06",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Sprachnachricht",message:"Du darfst eine kleine Sprachnachricht anfordern. Thema frei, Länge wie eine gute Aussicht: nicht zu kurz."},{day:"2026-05-07",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Baugespann-Sperre",message:"Hier entsteht demnächst ein Gewinn. Aktuell sieht man nur die Holzpfosten auf dem Dach."},{day:"2026-05-08",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Design-Safari",message:"Schick mir ein Foto von einem Gebäude oder Detail, das du heute siehst und das entweder genial oder ein Verbrechen ist."},{day:"2026-05-09",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Überraschungs-Wochenende",message:"Fionn plant einen kompletten Tag für dich. Du musst nur sagen, wann du Zeit hast."},{day:"2026-05-10",categoryId:"special",categoryLabel:"Laf Schnell!",tone:"jackpot",title:"🌟 SSR-Speed-Dämon-Pull! 🌟",message:"Hey Lennart! An diesem besonderen Tag in München beim Wings for Life World Run, möge dein Lauf mit deine friends ein legendärer Gacha-Pull sein: epische Speed, Ausdauer-Verlust und alle Kumpels SSR-Rarität (Super Super Rare, die Besten der Besten!) für maximalen Spaß! Rennt wie die Teufel, lacht euch schlapp und erobert die Strecke aus dem Olympiapark wie Bosse. Ich vermisse dich total hier in Zürich, aber freue mich fuer dich!"},{day:"2026-05-11",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Gedanken-Ping",message:"Du musst jetzt acht Sekunden an mich denken. Die Maschine behauptet, sie könne das überprüfen <3."},{day:"2026-05-12",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Geräusch-Notiz",message:"Beschreib mir das markanteste Geräusch deines Tages in maximal fünf Wörtern. Poetisch oder komplett nüchtern ist beides erlaubt."},{day:"2026-05-13",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Foto-Anfrage",message:"Du darfst ein süßes, schönes oder dummes Foto anfordern. Die Maschine empfiehlt: Alle drei."},{day:"2026-05-14",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Saudades (PT)",message:"Wenn man sich mal einen Tag vermisst: Ein Gutschein für ein spontanes Facetime-Date."},{day:"2026-05-15",categoryId:"special",categoryLabel:"Abendessen 🍽️",tone:"rare",title:"Fionn lädt zum Abendessen ein 🍽️",message:"Heute Abend geht's auf Fionns Rechnung. Treffpunkt: Stauffacher, 20:00 Uhr."},{day:"2026-05-16",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Bildkapsel",message:"Heute gibt es kein Gutschein-Drama, nur ein kleines Bild."},{day:"2026-05-17",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Tehran & Guatemala Tales",message:"Du darfst eine Geschichte aus deiner Reisezeit einfordern, die du noch nicht kennst."},{day:"2026-05-18",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Züri-Regen",message:"Grauer Himmel über Wiedikon. Kein Preis, nur das Bedürfnis nach einem sehr großen Tee."},{day:"2026-05-19",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Drei-Wort-Reisebericht",message:"Schick Fionn deinen Tag in genau drei Worten, als wärst du sehr erschöpft in einem Zug."},{day:"2026-05-20",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Denkmalschutz",message:"Dieser Slot darf aus historischen Gründen heute nicht verändert oder mit Preisen befüllt werden. Ein Klassiker unter den Nieten."},{day:"2026-05-21",categoryId:"special",categoryLabel:"Packliste 🧳",tone:"quest",title:"Deine Aufgabe: ein Brief 💌",message:`Ich kann es kaum erwarten. Den Rest findest du auf der Liste die ich dir gegeben habe — aber eins noch: deine HiFi-Ohrstöpsel. Vertrau mir.

Und eine Aufgabe von der Maschine: Schreib mir einen kurzen Brief auf Papier. Nicht lang, nicht perfekt — einfach was du gerade denkst. Bring ihn mit. Ich lese ihn wenn wir uns sehen. Bis bald. 🐚`}],n=$(),i=new Set(n.map(c=>c.day)),r=a.filter(c=>!i.has(c.day)&&c.day<=t).map(c=>({...c,token:e,link:null,photo:null,unlockTime:null,revealedAt:new Date(c.day+"T12:00:00").getTime()}));if(!r.length)return 0;const o=[...n,...r].sort((c,g)=>g.day.localeCompare(c.day));return ne(o),d.syncedHistory=o,ie(R()),Z(),r.length}async function Ai(){or(),gr(),hr();try{const[e,t,a,n,i,r,o,s]=await Promise.all([N("config/theme.json"),N("config/outcomes.json"),N("config/photos.json",Ti),N("config/special-days.json",{days:[]}),N("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),N("config/backup.json",{enabled:!1,endpointUrl:""}),N("config/quest.json",{enabled:!1}),N("config/missions.json",{pairs:[]})]);d.theme=e,d.outcomes=t,d.photos=Ci(a),d.specialDays=n,d.wishInbox=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},d.backup=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},d.quest=o&&typeof o=="object"?o:{enabled:!1},d.missions=s&&Array.isArray(s.pairs)?s:{pairs:[]},sr(e),lr(_e()||A(e.timezone)),ni(),ti(),nt(),Ua(),requestAnimationFrame(()=>{const g=C.querySelector(".ag-nav-pill"),p=C.querySelector(".ag-bottomnav-btn.is-active");if(g&&p){const f=p.closest(".ag-bottomnav"),b=f?f.getBoundingClientRect():null,m=p.getBoundingClientRect();b&&m.width&&(g.style.transition="none",g.style.left=`${m.left-b.left}px`,g.style.width=`${m.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{Ia()}catch{}ht(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&Ne()}),C.classList.add("is-ready"),C.style.transition="opacity .18s ease",C.style.opacity="1";const c=A(e.timezone);$().some(g=>g.token===I()&&g.day===c)&&C.classList.add("has-drawn"),Te().catch(()=>{})}catch(e){yt(e)}}const ae=document.currentScript,Ii=(ae==null?void 0:ae.dataset.mount)||"#affektions-gacha",Mi=(ae==null?void 0:ae.dataset.configBase)||"";function zi(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Di=document.querySelector(Ii)||zi();Pn(Di),ir(Mi,null),Ai().catch(e=>yt(e))})();

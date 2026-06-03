(function(){"use strict";const c={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let C=null;function Fn(e){C=e}function l(e){return C.querySelector(e)}const Dt="affektions-gacha:history:v1",$t="affektions-gacha:favourites:v1",Nt="affektions-gacha:tokens:v1",Bt="affektions-gacha:streak-cache:v1",Pt="affektions-gacha:streak-synced:v1",qt="affektions-gacha:streak-restore:v1",Ut="affektions-gacha:wish:v1",_t="affektions-gacha:milestones:v1",Ae="affektions-gacha:notif:v1",jt="affektions-gacha:baerlauch-scores:v1",Wn="affektions-gacha:baerlauch-history:v1",Ot="affektions-gacha:mission-log:v1",Rt="affektions-gacha:gesprach-idx:v1",Kn="affektions-gacha:sound:v1",Ht="affektions-gacha:gipfelbuch:v1",Gt="affektions-gacha:quest:v1",Ze="affektions-gacha:quest-points:v1",Yn=20,Ft=[100,75,50,25],Wt="affektions-gacha:glossary:v1",Jn={"🌿":"Fionn kocht dir ein Abendessen nach Wahl","🔥":"Wochenend-Abenteuer — Ziel nach deiner Wahl","⭐":"Fionns Überraschung — er entscheidet"};function z(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),n=i=>a.find(r=>r.type===i).value;return`${n("year")}-${n("month")}-${n("day")}`}function Xe(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value);return{h:a("hour"),m:a("minute")}}function Vn(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Qe(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function G(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function Zn(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Xn(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function F(e){return Xn(Zn(e))()}function ze(e,t){return t?Math.floor(F(e)*t):0}function Qn(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function er(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function tr(e,t,a){return new URL(e,a()).toString()}function I(){return R()==="fionn"?"fionn":"lennart"}function R(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function et(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ar(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function tt(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Ie(e){var o,d;const t=((o=e.theme)==null?void 0:o.timezone)||"UTC",a=z(t),[n,i,r]=a.split("-").map(Number),s=Math.floor(new Date(Date.UTC(n,i-1,r)).getTime()/864e5);return Math.floor(s/(((d=e.quest)==null?void 0:d.periodDays)||2))}function Me(e){var i;const t=(i=e.quest)==null?void 0:i.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Ie(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function Kt(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function nr(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}function B(){try{if(typeof window>"u"||!window.localStorage)return c.syncedHistory||[];const e=window.localStorage.getItem(Dt);if(!e)return c.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return c.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:c.syncedHistory||[]}catch{return c.syncedHistory||[]}}function ge(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Dt,JSON.stringify(e))}catch{}}function Y(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem($t);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=c.theme)!=null&&e.timezone?z(c.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(i=>i&&typeof i.day=="string"&&typeof i.token=="string"&&i.day<=n)}catch{return[]}}function De(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem($t,JSON.stringify(e))}catch{}}function $e(){try{const e=localStorage.getItem(Nt),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function at(e){try{localStorage.setItem(Nt,JSON.stringify(e))}catch{}}function rr(e){const t=$e();return t[e]=(t[e]||0)+1,at(t),t[e]}function ir(e){const t=$e();t[e]=0,at(t)}function nt(){try{if(typeof window>"u"||!window.localStorage)return null;const e=window.localStorage.getItem(Ut);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch{return null}}function Yt(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Ut,JSON.stringify(e))}catch{}}function pe(){try{return JSON.parse(localStorage.getItem(qt)||"{}")||{}}catch{return{}}}function Jt(e){try{localStorage.setItem(qt,JSON.stringify(e))}catch{}}function or(){try{return parseInt(localStorage.getItem(Bt)||"0",10)||0}catch{return 0}}function ue(e){try{localStorage.setItem(Bt,String(e))}catch{}}function sr(){try{return parseInt(localStorage.getItem(Pt)||"0",10)||0}catch{return 0}}function lr(e){try{localStorage.setItem(Pt,String(e))}catch{}}function me(){try{const e=window.localStorage.getItem(Ht);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ne(e){try{window.localStorage.setItem(Ht,JSON.stringify(e))}catch{}}function Be(){try{const e=localStorage.getItem(Ot),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function rt(e){try{localStorage.setItem(Ot,JSON.stringify(e))}catch{}}function it(){try{const e=localStorage.getItem(jt),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function Vt(){try{const e=localStorage.getItem(Wn),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function fe(e){try{const t=localStorage.getItem(Gt),a=t?JSON.parse(t):{},n=e();return a.period!==n?{period:n,solved:!1,attempts:0,hints:[]}:a}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function ot(e){try{localStorage.setItem(Gt,JSON.stringify(e))}catch{}}function Pe(){try{return parseInt(localStorage.getItem(Ze)||"0",10)}catch{return 0}}function dr(e){try{const t=Pe()+e;return localStorage.setItem(Ze,String(t)),t}catch{return e}}function Zt(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(_t);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function cr(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(_t,JSON.stringify(e))}catch{}}function gr(e,t){return Zt().includes(`${e}|${t}`)}function pr(e,t){const a=`${e}|${t}`,n=Zt();n.includes(a)||cr([...n,a])}function Xt(e){try{return localStorage.getItem("affektions-gacha:pin-unlock:"+e)==="1"}catch{return!1}}function Qt(e){try{localStorage.setItem("affektions-gacha:pin-unlock:"+e,"1")}catch{}}function W(){var f;const e=I(),t=B().filter(b=>b.token===e);if(!t.length)return 0;const a=((f=c.theme)==null?void 0:f.timezone)||"UTC",n=z(a),i=new Set(t.map(b=>b.day)),[r,s,o]=n.split("-").map(Number);let d=new Date(Date.UTC(r,s-1,o)),g=n;i.has(g)||(d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10));let u=0;for(;i.has(g);)u++,d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10);return Math.max(u,or(),sr())}function ea(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function ta(e){if(e<5)return c.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return c.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function ur(e,t){const a=ta(t),n=a.reduce((s,o)=>s+o.weight,0),i=Math.floor(F(e)*n);let r=0;for(const s of a)if(r+=s.weight,i<r)return c.outcomes.categories.find(o=>o.id===s.id)||s;return c.outcomes.categories[c.outcomes.categories.length-1]}function aa(){const e=pe();return Math.floor((e.maxStreak||0)/Yn)}function qe(){var n;if(pe().birthdayBonus2026Used)return 0;const t=((n=c.theme)==null?void 0:n.timezone)||"UTC";return z(t)==="2026-05-29"?1:0}function st(){const e=pe();return Math.max(0,aa()-(e.used||0))+qe()}function lt(){var u;const e=I(),t=((u=c.theme)==null?void 0:u.timezone)||"UTC",a=z(t),n=new Set(B().filter(f=>f.token===e&&f.day<=a).map(f=>f.day));if(!n.size)return null;const i=[...n].sort()[0],[r,s,o]=a.split("-").map(Number),d=new Date(Date.UTC(r,s-1,o));let g=a;for(n.has(g)||(d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10));n.has(g);)d.setUTCDate(d.getUTCDate()-1),g=d.toISOString().slice(0,10);return g<i?null:g}function na(){return st()>0&&lt()!==null}function mr(e){if(st()<=0)return null;const t=lt();if(!t)return null;const a=I(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},i=new Set,r=[n,...B()].filter(g=>{const u=`${g.day}|${g.token}`;return i.has(u)?!1:(i.add(u),!0)}).sort((g,u)=>g.day<u.day?1:g.day>u.day?-1:0);ge(r);const s=pe(),d=Math.max(0,aa()-(s.used||0))===0&&qe()>0;return Jt({...s,used:d?s.used||0:(s.used||0)+1,birthdayBonus2026Used:d?!0:s.birthdayBonus2026Used||!1,usedAt:Date.now()}),ue(W()),t}let dt="",ct=null;function fr(e,t){dt=e,ct=t}function ra(){if(ct)return ct();if(!dt)return window.location.href;try{return new URL(dt,window.location.href).toString()}catch{return window.location.href}}function U(e,t=null){const a=new URL(e,ra()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}async function Ue(){var e;try{const t=c.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=I(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,i=new AbortController,r=setTimeout(()=>i.abort(),12e3);let s;try{s=await fetch(n,{cache:"no-store",signal:i.signal})}finally{clearTimeout(r)}if(!s.ok)return!1;const o=await s.json();if(!o.ok)return!1;const d=z(((e=c.theme)==null?void 0:e.timezone)||"UTC"),g=B(),u=g.filter(m=>m.title!=="(wiederhergestellt)"&&m.day<=d);u.length!==g.length&&ge(u);const f=Y(),b=f.filter(m=>m.day<=d);if(b.length!==f.length&&De(b),Array.isArray(o.history)&&o.history.length){const m=B(),y=new Map(m.map(h=>[h.day,h]));for(const h of o.history){if(h.title==="(wiederhergestellt)")continue;const k=nr(h.day);if(!k||k>d)continue;const A=typeof h.token=="string"?h.token.toLowerCase():h.token;y.set(k,{...h,day:k,token:A})}const v=Array.from(y.values()).sort((h,k)=>k.day.localeCompare(h.day));ge(v),c.syncedHistory=v,ue(W())}if(Array.isArray(o.favourites)&&o.favourites.length){const m=Y(),y=new Map(m.map(v=>[v.day,v]));for(const v of o.favourites)v.day<=d&&y.set(v.day,v);De(Array.from(y.values()).sort((v,h)=>h.day.localeCompare(v.day)))}if(o.tokens&&typeof o.tokens=="object"&&at(o.tokens),typeof o.questPoints=="number"&&o.questPoints>Pe())try{localStorage.setItem(Ze,String(o.questPoints))}catch{}if(typeof o.streak=="number"&&o.streak>0&&(lr(o.streak),o.streak>W()&&ue(o.streak)),o.baerlauchScores&&typeof o.baerlauchScores=="object"){const m=it();let y=!1;for(const[v,h]of Object.entries(o.baerlauchScores))typeof h=="number"&&h>(m[v]||0)&&(m[v]=h,y=!0);if(y)try{localStorage.setItem(jt,JSON.stringify(m))}catch{}}if(Array.isArray(o.missionLog)&&o.missionLog.length){const m=Be(),y=new Map(m.map(h=>[`${h.day}|${h.player}`,h]));for(const h of o.missionLog)!h.day||!h.player||y.set(`${h.day}|${h.player}`,h);const v=Array.from(y.values()).sort((h,k)=>k.day.localeCompare(h.day));rt(v)}if(typeof o.latestPing=="string"&&o.latestPing&&I()!=="fionn")try{const m="affektions-gacha:last-ping:v1",y=window.localStorage.getItem(m)||"";o.latestPing>y&&(window.localStorage.setItem(m,o.latestPing),c._newPing=!0)}catch{}if(Array.isArray(o.gipfelbuch)&&o.gipfelbuch.length){const m=me(),y=new Map(m.map(h=>[h.id,h]));for(const h of o.gipfelbuch)h.id&&y.set(h.id,h);const v=Array.from(y.values()).sort((h,k)=>(k.date||"").localeCompare(h.date||""));Ne(v)}return C&&C.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:o}})),Array.isArray(o.history)?o.history.length:0}catch{return-1}}function ne(){try{const e=c.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=I(),a=B().filter(o=>(o.token||"").toLowerCase()===t.toLowerCase()),n=fe(()=>Ie(c)),i=n.solved&&n.pointsEarned&&!n._logged?{challenge:Me(c),attempts:n.attempts,points:n.pointsEarned,period:n.period}:void 0;i&&(n._logged=!0,ot(n));const r=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:Y(),streak:W(),tokens:$e(),questPoints:Pe(),...i?{questLog:i}:{}}),s={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r};fetch(e.endpointUrl,s).catch(()=>{fetch(e.endpointUrl,{...s,mode:"no-cors"}).catch(()=>{})})}catch{}}function hr(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function br(e){const t=(i,r)=>C.style.setProperty(i,r),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const ia={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},oa={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function yr(e){const t=vr(e);if(!t)return;const a=(n,i)=>C.style.setProperty(n,i);if(t.colors&&typeof t.colors=="object")for(const[n,i]of Object.entries(t.colors))ia[n]&&typeof i=="string"&&a(ia[n],i);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,i]of Object.entries(t.darkColors))oa[n]&&typeof i=="string"&&a(oa[n],i)}function vr(e){const t=Array.isArray(c.specialDays&&c.specialDays.days)?c.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}const xr=`
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
          border-radius:16px;
          background:linear-gradient(170deg,rgba(255,255,255,.32) 0%,rgba(255,255,255,.10) 100%);
          backdrop-filter:blur(28px) saturate(2.8) brightness(1.14);
          -webkit-backdrop-filter:blur(28px) saturate(2.8) brightness(1.14);
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
      @media (max-width:640px){
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
    `;function wr(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=xr,document.head.appendChild(e)}function kr(){return`
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
    `}function Sr(){return`
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
    `}const Er=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${kr()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${Sr()}
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
    `;function Tr(){C.className="ag-widget",C.setAttribute("aria-labelledby","ag-title"),C.innerHTML=Er}function te(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(i);for(let r=0;r<e;r++){const s=document.createElement("div"),o=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,g=Math.random()*100,u=Math.random()*.6,f=1.4+Math.random()*.8;s.style.cssText=`position:absolute;top:-20px;left:${g}%;width:${d}px;height:${d*.6}px;background:${o};border-radius:2px;animation:ag-confetti-fall ${f}s ${u}s ease-in forwards;transform-origin:center;`,s.style.setProperty("--r",`${Math.random()*720-360}deg`),i.appendChild(s)}if(!document.getElementById("ag-confetti-style")){const r=document.createElement("style");r.id="ag-confetti-style",r.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(r)}setTimeout(()=>i.remove(),3e3)}function Lr(e){const t=Array.isArray(c.specialDays&&c.specialDays.days)?c.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}function sa(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function Cr(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function he(){return(c.photos||[]).filter(e=>e.type!=="video")}function Ar(e,t){const a=I(),n=`${c.theme.secret}|${a}|${e}`,i=Lr(e);if(i){const m=Array.isArray(i.outcomes)&&i.outcomes.length?i.outcomes:[{title:i.label,message:""}],y=m[ze(`${n}|special|outcome`,m.length)],v={id:"special",label:i.label,weight:0,tone:i.tone||"jackpot",outcomes:m},h=i.photoAlt&&c.photos.length&&he().find(k=>k.alt===i.photoAlt)||null;return{day:e,token:a,category:v,outcome:y,photo:h,unlockTime:i.unlockTime||null}}let r=ur(`${n}|category`,t||0);const s=ar();if(s){const m=c.outcomes.categories.find(y=>y.id===s);m&&(r=m)}r.id==="photo"&&!he().length&&(r=c.outcomes.categories.find(m=>m.id==="common")||r);const o=new Set(B().filter(m=>m.token===a&&m.day<e&&m.categoryId===r.id).map(m=>m.title)),d=r.outcomes.filter(m=>!o.has(m.title)),g=d.length>0?d:r.outcomes,u=g[ze(`${n}|${r.id}|outcome`,g.length)],f=he(),b=r.id==="photo"&&f.length?f[ze(`${n}|photo`,f.length)]:null;return{day:e,token:a,category:r,outcome:u,photo:b,collectToken:u.token||null}}function zr(){const e=et()||z(c.theme.timezone),t=W();return Ar(e,t)}function S(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function la(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const re=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],da=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],ca="affektions-gacha:mission-done:v1",ga="affektions-gacha:mission-feedback:v1";function gt(){var r,s;const e=(r=c.missions)==null?void 0:r.pairs;if(!Array.isArray(e)||!e.length)return null;const t=z(((s=c.theme)==null?void 0:s.timezone)||"UTC"),a=ze(`${c.theme.secret}|mission|${t}`,e.length),n=e[a];return R()==="fionn"?n.fionn:n.lennart}function pa(){var e;try{const t=z(((e=c.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(ca)===t}catch{return!1}}function Ir(){var e,t;try{const a=z(((e=c.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(ca,a);const n=R(),i=gt(),r=new Date().toISOString();$r({day:a,player:n,mission:i,doneAt:r});const s=(t=c.backup)==null?void 0:t.endpointUrl;s&&i&&fetch(s,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:i,doneAt:r}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function ua(){var e;try{const t=z(((e=c.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(ga)===t}catch{return!1}}function Mr(){var e;try{const t=z(((e=c.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(ga,t)}catch{}}function Dr(e,t){var s,o;const a=z(((s=c.theme)==null?void 0:s.timezone)||"UTC"),n=R(),i=gt();Nr(a,n,{rating:e,comment:t||""}),Mr();const r=(o=c.backup)==null?void 0:o.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:i,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function $r(e){const t=Be(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),rt(t)}function Nr(e,t,a){const n=Be(),i=n.findIndex(r=>r.day===e&&r.player===t);i>=0&&(n[i]={...n[i],...a},rt(n))}function Br(e,t){var g;if(!e)return;const a=Be(),n=((g=c.theme)==null?void 0:g.timezone)||"UTC",i=z(n),r=new Map;for(const u of a)r.has(u.day)||r.set(u.day,{}),r.get(u.day)[u.player]=u;const s=Array.from(r.keys()).sort((u,f)=>f.localeCompare(u)).slice(0,30);if(!s.length){e.hidden=!0;return}e.hidden=!1;const o={fire:"🔥",ok:"👍",meh:"😴"},d=u=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(u+"T12:00:00Z"))}catch{return u}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+s.map(u=>{const f=r.get(u),b=f.lennart,m=f.fionn,y=u===i,v=[];if(b&&t!=="fionn"){const h=b.doneAt?'<span class="ag-log-done">✓</span>':"",k=b.rating?`<span class="ag-log-rating">${o[b.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${la(b.mission||"")}</span>${h}${k}</div>`)}if(m&&t!=="lennart"){const h=m.doneAt?'<span class="ag-log-done">✓</span>':"",k=m.rating?`<span class="ag-log-rating">${o[m.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${la(m.mission||"")}</span>${h}${k}</div>`)}return v.length?`<div class="ag-log-day${y?" ag-log-today":""}"><span class="ag-log-date">${d(u)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function ma(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),i=l("#ag-mission-feedback-sent"),r=l("#ag-mission-done-note"),s=e.querySelector(".ag-mini-copy");s&&(s.hidden=!0);const o=gt();t&&(t.textContent=o||"Heute keine Mission verfügbar.");const d=pa(),g=ua();a&&(a.hidden=d),n&&(n.hidden=!d,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(u=>{u.hidden=g})),i&&(i.hidden=!g),r&&(r.hidden=!d),e.querySelectorAll(".ag-mission-rate-btn").forEach(u=>u.classList.remove("is-selected")),Br(l("#ag-mission-log"),R()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Pr(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let _e=-1;function fa(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(Rt);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<re.length){_e=a;const n=l("#ag-gesprach-question");n&&(n.textContent=re[a]);return}}}catch{}ha()}}function qr(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function ha(){let e;do e=Math.floor(Math.random()*re.length);while(e===_e&&re.length>1);_e=e;try{localStorage.setItem(Rt,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=re[e])}function Ur(){const e=re[_e]||"";if(!e)return;const t=c.theme&&c.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function ba(){var e;return!!((e=c.quest)!=null&&e.enabled&&Me(c))}function ya(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,va())}function _r(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function va(){const e=Me(c),t=fe(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),i=l("#ag-quest-loading"),r=l("#ag-quest-actions"),s=l("#ag-quest-result"),o=l("#ag-quest-points"),d=l("#ag-quest-copy"),g=l("#ag-quest-title"),u=(e==null?void 0:e.prompt)||"";if(!e){g&&(g.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),r&&(r.hidden=!0);return}if(a&&(a.textContent=u),i&&(i.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((f,b)=>`<div class="ag-hint-item"><span class="ag-hint-num">${b+1}</span><p>${f}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){g&&(g.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),r&&(r.hidden=!0),s&&(s.textContent=t.successMessage||"",s.hidden=!1),o&&(o.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Pe()}`,o.hidden=!1);return}g&&(g.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),r&&(r.hidden=!1),s&&(s.hidden=!0),o&&(o.hidden=!0)}async function jr(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),i=l("#ag-quest-points"),r=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const s=await Or(e),o=fe(),d=Me(c),g=(d==null?void 0:d.prompt)||"",u=(d==null?void 0:d.solution)||"";try{const f=await Rr(s,g,u,o.attempts+1,o.hints);if(o.attempts+=1,f.success){const b=Ft[Math.min(o.attempts-1,Ft.length-1)],m=dr(b);o.solved=!0,o.pointsEarned=b,o.successMessage=f.message||"Perfekt.",ot(o),ne(),n&&(n.textContent=f.message||"Perfekt.",n.hidden=!1),i&&(i.textContent=`+${b} Punkte · Gesamt: ${m}`,i.hidden=!1),a&&(a.hidden=!0),r&&(r.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const y=l("#ag-btn-quest");y&&y.classList.remove("ag-chip-quest-active"),S([20,20,40,20,60])}else a&&(a.hidden=!0),o.hints=[...o.hints||[],f.hint||"Versuch nochmal."],ot(o),va()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function Or(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function Rr(e,t,a,n,i){var o;const r=(o=c.quest)==null?void 0:o.proxyUrl;if(!r)throw new Error("no proxy");const s=await fetch(r,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:i})});if(!s.ok)throw new Error("proxy error");return s.json()}function Hr(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let g=0;g<n;g++)r[g]=Math.random()*2-1;const s=t.createBufferSource();s.buffer=i;const o=t.createBiquadFilter();o.type="bandpass",o.Q.value=1.2,o.frequency.setValueAtTime(500,a),o.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),s.connect(o),o.connect(d),d.connect(t.destination),s.start(a),s.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([g,u,f,b,m])=>{const y=t.createOscillator();y.type="sine",y.frequency.setValueAtTime(g,a+f),y.frequency.exponentialRampToValueAtTime(u,a+f+b*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+f),v.gain.linearRampToValueAtTime(m,a+f+.09),v.gain.exponentialRampToValueAtTime(.001,a+f+b),y.connect(v),v.connect(t.destination),y.start(a+f),y.stop(a+f+b+.05)})}catch{}}function Gr(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,i)=>{const r=document.createElement("span");r.className="ag-letter-word",r.textContent=n,r.style.animationDelay=`${320+i*155}ms`,a.appendChild(r),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function xa(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function wa(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),S([20,60,20]),Hr();const t=l("#ag-letter-photo");if(t&&c.photos&&c.photos.length){const a=he(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Fr()}async function Fr(){var n;const e=l("#ag-letter-body");if(!e)return;Gr(e);const t=(n=c.quest)==null?void 0:n.proxyUrl;if(t)try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(i.ok){const r=await i.json();if(r.paragraphs&&r.paragraphs.length){xa(e,r.paragraphs);return}}}catch{}const a=da[Math.floor(Math.random()*da.length)];xa(e,a)}function pt(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let J=null;function Wr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ka(e){return e?Wr(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function be(){return I().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||c.theme.brand.displayNameDefault||"Lennart"}function Kr(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function Yr(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:c.theme.timezone}).format(e)}catch{return z(c.theme.timezone)}}const Jr=["🚴","🧄"],Vr=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function Sa(){const e=z(c.theme.timezone),t=I();return`${c.theme.secret}|${t}|${e}|emoji`}function Zr(){const e=Sa(),t=3+Math.floor(F(`${e}|count`)*3),a=Vr.slice(),n=[];for(let i=0;i<t&&a.length;i+=1){const r=Math.floor(F(`${e}|pick|${i}`)*a.length);n.push(a.splice(r,1)[0])}return[...Jr,...n]}function Xr(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=Zr(),a=t.length,n=Sa();t.forEach((i,r)=>{const s=document.createElement("span");s.className="ag-emoji",s.textContent=i;const o=360/a*r,d=(F(`${n}|angle|${r}`)-.5)*28,g=o+d,u=F(`${n}|radius|${r}`)*21-10.5,f=16+F(`${n}|dur|${r}`)*10,b=-F(`${n}|delay|${r}`)*f,m=F(`${n}|dir|${r}`)>.5?1:-1;s.style.setProperty("--ag-emoji-angle",`${g}deg`),s.style.setProperty("--ag-emoji-radius",`${250+u}%`),s.style.setProperty("--ag-emoji-duration",`${f.toFixed(2)}s`),s.style.setProperty("--ag-emoji-delay",`${b.toFixed(2)}s`),s.style.setProperty("--ag-emoji-direction",m===1?"normal":"reverse"),e.appendChild(s)})}function je(){const e=l("[data-ag-streak]"),t=W(),a=pe();if(t>(a.maxStreak||0)&&Jt({...a,maxStreak:t}),e){const n=ea(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}ut()}function ut(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!na())}const Ea={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function Qr(e){const t=l("[data-ag-milestone]");if(!t)return;const a=Ea[e];if(!a){t.hidden=!0;return}const n=I();if(gr(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,pr(n,e)}function ei(e,t){const a=document.createElement("div");a.className="ag-pin-gate";const n=document.createElement("p");n.className="ag-pin-hint",n.textContent="🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const i=document.createElement("div");i.className="ag-pin-row";const r=document.createElement("input");r.type="text",r.inputMode="numeric",r.pattern="[0-9]*",r.maxLength=4,r.className="ag-pin-input",r.placeholder="_ _ _ _",r.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const o=document.createElement("p");o.className="ag-pin-err",o.hidden=!0,o.textContent="Falsche Zahl. Noch einmal.";function d(){r.value.trim()===e?(Qt(e),t()):(o.hidden=!1,r.classList.add("ag-pin-shake"),r.value="",setTimeout(()=>r.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",d),r.addEventListener("keydown",g=>{g.key==="Enter"&&d()}),i.appendChild(r),i.appendChild(s),a.appendChild(n),a.appendChild(i),a.appendChild(o),a}function ti(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const i=document.createElement("span");i.className="ag-outcome-link-locked",i.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const r=document.createElement("p");r.className="ag-pin-hint",r.style.marginTop="10px",r.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const s=document.createElement("div");s.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.maxLength=3,o.className="ag-pin-input",o.placeholder="_ _ _",o.autocomplete="off",o.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const g=document.createElement("p");g.className="ag-pin-err",g.hidden=!0,g.textContent="Nicht ganz. Versuch nochmal.";function u(){o.value.trim().toLowerCase()===e.toLowerCase()?(Qt("link-"+e),n.remove(),Oe(t,a.outcome.link)):(g.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",u),o.addEventListener("keydown",f=>{f.key==="Enter"&&u()}),s.appendChild(o),s.appendChild(d),n.appendChild(i),n.appendChild(r),n.appendChild(s),n.appendChild(g),n}function ai(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],i=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const s=document.createElement("iframe");return s.src=`https://open.spotify.com/embed/${n}/${i}`,s.width="100%",s.height=n==="track"||n==="episode"?"80":"152",s.setAttribute("frameborder","0"),s.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",s.loading="lazy",s.setAttribute("allowtransparency","true"),s.setAttribute("title","Spotify player"),s.className="ag-spotify-iframe",s}catch{return null}}function Ta(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function Oe(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=G(t);if(!a){e.hidden=!0;return}const n=ai(a);e.appendChild(n||Ta(a)),e.hidden=!1}function ni(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=$e()[a]||0,i=Jn[a]||"",r=5;if(n>=r)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(r)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${i}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{if(ir(a),ne(),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',c.wishInbox&&c.wishInbox.enabled){const o=JSON.stringify({timestamp:new Date().toISOString(),token:I(),wish:`🎁 Sammelkapsel eingelöst: ${a} × ${r} — ${i}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(c.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o}).catch(()=>{})}});else{const o=r-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(r-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${o} × ${a} bis: <em>${i}</em></p>
      </div>`,e.hidden=!1}}function La(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const i=document.createElement("div");i.className="ag-media-backdrop",i.setAttribute("aria-hidden","true"),t.type!=="video"&&(i.style.backgroundImage=`url("${t.url}")`),n.appendChild(i);let r;if(t.type==="video"){const s=er(t.url);if(s){const o=document.createElement("div");o.className="ag-media-content ag-drive-poster",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${s}`,d.alt=a,d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),o.appendChild(d);const g=document.createElement("div");g.className="ag-drive-play-btn",g.setAttribute("aria-hidden","true"),o.appendChild(g);const u=()=>{o.removeEventListener("click",u),o.removeEventListener("keydown",f),o.removeAttribute("role"),o.removeAttribute("tabindex"),o.style.cursor="",o.innerHTML="";const b=document.createElement("iframe");b.src=`https://drive.google.com/file/d/${s}/preview?autoplay=1`,b.allow="autoplay",b.setAttribute("allowfullscreen",""),b.setAttribute("frameborder","0"),b.setAttribute("aria-label",a),b.className="ag-drive-iframe",o.appendChild(b)},f=b=>{(b.key==="Enter"||b.key===" ")&&u()};o.addEventListener("click",u),o.addEventListener("keydown",f),r=o}else r=document.createElement("video"),r.src=G(t.url),r.controls=!0,r.muted=!0,r.playsInline=!0,r.setAttribute("playsinline",""),r.setAttribute("preload","metadata"),r.setAttribute("aria-label",a),r.className="ag-media-content"}else r=document.createElement("img"),r.alt=a,r.loading="eager",r.decoding="auto",r.className="ag-media-content",r.addEventListener("load",()=>{const s=r.naturalWidth&&r.naturalHeight?r.naturalWidth/r.naturalHeight:1;n.dataset.orientation=s<.95?"portrait":s>1.15?"landscape":"square"},{once:!0}),r.addEventListener("error",()=>{U("config/photos.json",{photos:[]}).then(s=>{const{normalizePhotos:o}=mt(),d=o(s),g=d.find(u=>u.alt===t.alt&&u.type!=="video")||d.find(u=>u.type!=="video")||null;if(g&&g.url)i.style.backgroundImage=`url("${g.url}")`,r.src=G(g.url),c.photos=d;else{const u=r.closest("[data-ag-photo-wrap]");u&&(u.hidden=!0)}}).catch(()=>{const s=r.closest("[data-ag-photo-wrap]");s&&(s.hidden=!0)})},{once:!0}),r.src=G(t.url);n.appendChild(r),e.appendChild(n)}function mt(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const i=n.type==="video"||t.test(n.url||"");return{...n,type:i?"video":"image"}}).filter(n=>n.url)}}}function ri(e,t,a,n){var d,g;const i=l("#ag-lightbox"),r=l("#ag-lightbox-img"),s=l("#ag-lightbox-caption"),o=l("#ag-lightbox-drive-link");if(!(!i||!r)){(d=i.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(g=i.querySelector(".ag-lightbox-video"))==null||g.remove(),J&&(r.removeEventListener("error",J),J=null),r.onerror=null,o&&(o.hidden=!0);{r.hidden=!1;const u=G(e);if(!u)return;r.src=u,r.alt=t||"",J=()=>{const f=n||t;U("config/photos.json",{photos:[]}).then(b=>{const{normalizePhotos:m}=mt(),y=m(b),v=y.find(h=>h.alt===f)||null;v&&v.url&&(r.src=G(v.url),c.photos=y)}).catch(()=>{})},r.addEventListener("error",J,{once:!0})}s.textContent=t||"",s.hidden=!t,i.hidden=!1,document.body.style.overflow="hidden"}}function ft(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(J&&(t.removeEventListener("error",J),J=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function Ca(e){return[`${sa(e.category.tone)} ${be()}s ${c.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var r;const[a,n]=e.unlockTime.split(":").map(Number),i=Xe(((r=c.theme)==null?void 0:r.timezone)||"UTC");return i.h>a||i.h===a&&i.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function ii(e){var m;C.dataset.tone=e.category.tone,Cr(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=e.day,l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=ka(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]"),n=a?a.querySelector("[data-ag-pin-gate]"):null;if(n&&n.remove(),e.outcome.pin&&!Xt(e.outcome.pin)){t.hidden=!0;const y=ei(e.outcome.pin,()=>{y.remove(),t.hidden=!1});y.setAttribute("data-ag-pin-gate",""),t.parentNode.insertBefore(y,t.nextSibling)}const i=l("[data-ag-photo-wrap]"),r=l("[data-ag-photo-media]"),s=l("[data-ag-photo-caption]"),o=l("[data-ag-link-wrap]");if(e.outcome.link&&e.unlockTime){const[y,v]=e.unlockTime.split(":").map(Number),h=Xe(((m=c.theme)==null?void 0:m.timezone)||"UTC"),k=e.outcome.linkPin;if(k)if(Xt("link-"+k))Oe(o,e.outcome.link);else if((()=>{if(!e.outcome.linkPinFrom)return!0;const[E,j]=e.outcome.linkPinFrom.split(":").map(Number);return h.h>E||h.h===E&&h.m>=j})()){const E=ti(k,o,e);o.innerHTML="",o.appendChild(E),o.hidden=!1}else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o.innerHTML="",o.appendChild(E),o.hidden=!1}else if(h.h>y||h.h===y&&h.m>=v)Oe(o,e.outcome.link);else{const E=document.createElement("span");E.className="ag-outcome-link-locked",E.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o.innerHTML="",o.appendChild(E),o.hidden=!1}}else Oe(o,e.outcome.link||null);if(ni(l("[data-ag-token-wrap]"),e),e.photo){La(r,e.photo);const y=(e.photo.caption||"").trim();y?(s.textContent=y,s.hidden=!1):(s.textContent="",s.hidden=!0),i.hidden=!1}else r.innerHTML="",s.textContent="",s.hidden=!0,i.hidden=!0;const d=Ca(e),g=encodeURIComponent("Mein Gacha-Zug"),u=encodeURIComponent(d),f=l("[data-ag-send]");c.theme.messageTarget.startsWith("mailto:")?f.href=`${c.theme.messageTarget}?subject=${g}&body=${u}`:f.href=c.theme.messageTarget.replace("{text}",u);const b=l("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),l("[data-ag-result]").hidden=!1,Aa()}function oi(e){return e?Y().some(t=>t.day===e.day&&t.token===e.token):!1}function Re(e){return Y().some(t=>t.day===e.day&&t.token===e.token)}function Aa(){const e=l("[data-ag-star]");if(!e)return;const t=oi(c.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function si(e,t){const a=Y(),n=a.findIndex(r=>r.day===e.day&&r.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),De(a),ne();const i=Re(e);t.textContent=i?"★":"☆",t.classList.toggle("is-starred",i),t.title=i?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",c.activeTab==="lieblinge"&&ht()}function li(e){if(!e)return;const t=Y(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),De(t),ne(),Aa(),c.activeTab==="lieblinge"&&ht()}function di(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,revealedAt:Date.now()},a=B(),n=new Set,i=[t,...a].filter(r=>{if(!r||typeof r.day!="string"||typeof r.token!="string")return!1;const s=`${r.day}|${r.token}`;return n.has(s)?!1:(n.add(s),!0)});i.sort((r,s)=>r.day<s.day?1:r.day>s.day?-1:0),ge(i),ue(0),ne()}function za(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,i]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=i)){const s=document.createElement("span");return s.className="ag-outcome-link-locked",s.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,s}}const t=G(e.link);return t?Ta(t):null}function Ia(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:i}=ci();n.textContent=i(e.day);const r=document.createElement("span");r.className="ag-history-badge",r.textContent=e.categoryLabel||"Kapsel";const s=document.createElement("button");s.type="button",s.className="ag-history-star"+(Re(e)?" is-starred":""),s.textContent=Re(e)?"★":"☆",s.title=Re(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",s.addEventListener("click",f=>{f.stopPropagation(),si(e,s)}),a.appendChild(n),a.appendChild(r),a.appendChild(s);const o=document.createElement("p");o.className="ag-history-title",o.textContent=e.title||"";const d=document.createElement("div");d.className="ag-history-message",d.innerHTML=ka(e.message||""),t.appendChild(a);const g=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,u=e.photo&&(e.photo.type==="video"||g.test(e.photo.url||""));if(e.photo&&!u){const f=document.createElement("div");f.className="ag-history-body";const b=document.createElement("div");b.className="ag-history-thumb";const m=document.createElement("img");m.src=G(e.photo.url),m.alt=e.photo.alt||"Foto-Drop",m.loading="lazy",m.decoding="async",m.addEventListener("error",function(){U("config/photos.json",{photos:[]}).then(v=>{const{normalizePhotos:h}=mt(),k=h(v),A=k.find(E=>E.alt===e.photo.alt&&E.type!=="video")||k.find(E=>E.type!=="video")||null;if(A&&A.url)e.photo.url=A.url,m.src=G(A.url),c.photos=k;else{b.classList.add("is-broken"),m.remove();const E=document.createElement("span");E.className="ag-history-thumb-broken",E.textContent="📷",b.appendChild(E)}}).catch(()=>{b.classList.add("is-broken"),m.remove();const v=document.createElement("span");v.className="ag-history-thumb-broken",v.textContent="📷",b.appendChild(v)})},{once:!0}),b.appendChild(m),b.style.cursor="pointer",b.title="Vollansicht",b.addEventListener("click",()=>ri(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const y=document.createElement("div");if(y.className="ag-history-text",y.appendChild(o),y.appendChild(d),e.link){const v=za(e);v&&y.appendChild(v)}f.appendChild(b),f.appendChild(y),t.appendChild(f)}else if(t.appendChild(o),t.appendChild(d),e.link){const f=za(e);f&&t.appendChild(f)}return t}function ci(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),i=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(i)}catch{return e}}}}function ie(){var s;const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=I(),i=z(((s=c.theme)==null?void 0:s.timezone)||"UTC"),r=B().filter(o=>o.token===n&&o.day<=i).slice().sort((o,d)=>o.day<d.day?1:o.day>d.day?-1:0);if(a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.",!r.length){t.hidden=!1,t.textContent="Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.";return}t.hidden=!0;for(const o of r)e.appendChild(Ia(o))}function ht(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=Y();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const i of n)e.appendChild(Ia(i))}function gi(){const e=l("[data-ag-odds]");e.innerHTML="";const t=W(),a=ta(t),n=a.reduce((i,r)=>i+r.weight,0);for(const i of a){const r=document.createElement("li");r.textContent=`${i.label}: ${(i.weight/n*100).toFixed(1)} %`,e.appendChild(r)}if(t>=5){const i=ea(t),r=document.createElement("li");r.textContent=`${i.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,r.style.fontWeight="800",e.appendChild(r)}}function pi(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function bt(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=nt();n&&n.week===tt()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=pi(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function ui(){var y;const e=R()==="fionn",t=e?c.theme.brand.fromName:be(),a=e?be():c.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=c.theme.brand.titleTemplate.replace("{name}",t));const i=l("[data-ag-kicker]");i&&(i.textContent=`${c.theme.brand.kicker} · ${c.photos.length} Erinnerungen`);const r=l("[data-ag-intro]");r&&(r.textContent=c.theme.brand.intro);const s=l("[data-ag-button-text]");s&&(s.textContent=c.theme.brand.buttonIdle);const o=l("[data-ag-rules-title]");o&&(o.textContent=c.theme.brand.rulesTitle);const d=l("[data-ag-rules-text]");d&&(d.textContent=c.theme.brand.rulesText);const g=l("[data-ag-send]");g&&(g.textContent=`An ${a} schicken`);const u=l("[data-ag-today-pill]");u&&(u.textContent=Yr());const f=l("[data-ag-draw-hint]");f&&(f.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const b=l("[data-ag-chips]");b&&(b.innerHTML="");const m=Array.isArray(c.theme.stickers)&&c.theme.stickers.length?c.theme.stickers:Kr();for(const v of b?m:[]){const h=document.createElement("li");h.textContent=v,(v.toLowerCase().includes("bärlauch")||v.toLowerCase().includes("barlauch"))&&(h.id="ag-btn-baerlauch",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Bärlauch öffnen"),h.classList.add("ag-chip-clickable")),(v.toLowerCase().includes("gespräch")||v.toLowerCase().includes("gesprach"))&&(h.id="ag-btn-gesprach",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Gespräch öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase().includes("rave")&&(h.id="ag-btn-rave",h.tabIndex=0,h.setAttribute("role","link"),h.setAttribute("aria-label","Rave Board öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="quest"&&(h.id="ag-btn-quest",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Quest öffnen"),h.classList.add("ag-chip-clickable"),(y=c.quest)!=null&&y.enabled&&ba()&&(fe().solved||h.classList.add("ag-chip-quest-active"))),v.toLowerCase().includes("glossar")&&(h.id="ag-btn-glossary",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Glossar öffnen"),h.classList.add("ag-chip-clickable")),v.toLowerCase()==="mission"&&(h.id="ag-btn-mission",h.tabIndex=0,h.setAttribute("role","button"),h.setAttribute("aria-label","Mission öffnen"),h.classList.add("ag-chip-clickable"),pa()||h.classList.add("ag-chip-mission-active")),b.appendChild(h)}Xr(),je()}let yt=null;function mi(){if(!yt)try{yt=new(window.AudioContext||window.webkitAudioContext)}catch{}return yt}function fi(){try{return window.localStorage.getItem(Kn)!=="off"}catch{return!0}}function N(e,t,a,n,i=.15,r="sine"){const s=e.createOscillator(),o=e.createGain();s.connect(o),o.connect(e.destination),s.type=r,s.frequency.value=t;const d=e.currentTime+a;o.gain.setValueAtTime(0,d),o.gain.linearRampToValueAtTime(i,d+.012),o.gain.exponentialRampToValueAtTime(1e-4,d+n),s.start(d),s.stop(d+n+.05)}function He(e){if(!fi())return;const t=mi();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":N(t,280,0,.18,.08,"sine"),N(t,210,.12,.22,.06,"sine");break;case"cursed":N(t,220,0,.12,.1,"triangle"),N(t,170,.09,.28,.07,"triangle");break;case"uncommon":N(t,523,0,.14,.14,"sine"),N(t,784,.1,.22,.12,"sine");break;case"rare":N(t,523,0,.12,.14,"sine"),N(t,659,.09,.12,.14,"sine"),N(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>N(t,a,n*.09,.18,.13,"sine")),N(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>N(t,a,n*.08,.16,.13,"sine")),N(t,2093,.45,.5,.05,"sine");break;default:N(t,523,0,.12,.13,"sine"),N(t,659,.09,.18,.1,"sine");break}}function hi(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const i=e/a;if(i>=.7)return`≈ ${i>=2?Math.round(i):(Math.round(i*10)/10).toString().replace(".",",")}× ${n}`}return null}function bi(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[i,r]of Object.entries(n))if(a.startsWith("trail/"+i)){a="trail/"+r+a.slice(6+i.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function yi(e){if(!e||!e.includes("alltrails.com"))return null;function t(i){const r=i.indexOf("?"),s=r===-1?i:i.slice(0,r),o=r===-1?"":i.slice(r+1),d=new URLSearchParams(o);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),s+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const i=e.match(/[?&]sh=([^&#]+)/),r=i?`&sh=${i[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${r}`)}const n=bi(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function vt(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,i).catch(()=>fetch(a.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}))}function vi(e){const t=me();t.unshift(e),Ne(t),vt("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function xi(e){Ne(me().filter(t=>t.id!==e)),vt("gipfel-delete",{id:e})}function wi(e,t){const a=me(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,Ne(a),vt("gipfel-upsert",i)}function ki(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?Qn(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),i=n?yi(e.activityUrl):null,r=e.cover?`<div class="ag-gipfel-cover"><img src="${e.cover}" alt="${e.name||""}" loading="lazy"></div>`:"",s=e.elevGain||e.elevation,o=e.distance?`${e.distance} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${e.activityUrl}" target="_blank" rel="noopener noreferrer">↗</a>`:"",g=o||d?`<div class="ag-gipfel-stats">${o}${o&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${r}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${Vn(e.date)}</div>
        <div class="ag-gipfel-name">${e.name||"—"}</div>
      </div>
      ${s?`<div class="ag-gipfel-elev">↑ ${Qe(s)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${e.id}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${e.id}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${g}
    ${e.notes?`<p class="ag-gipfel-notes">${e.notes}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&i?`<div class="ag-gipfel-map-preview"><iframe src="${i}" height="220" frameborder="0" scrolling="no" loading="lazy" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe></div>`:""}
  `;const u=t.querySelector("[data-ag-gipfel-edit]");u&&u.addEventListener("click",()=>{var Te;const m=l("[data-ag-berge-form]"),y=l("[data-ag-berge-add]");if(!m)return;const v=l("[data-ag-berge-edit-id]");v&&(v.value=e.id);const h=l("[data-ag-berge-name]");h&&(h.value=e.name||"");const k=l("[data-ag-berge-dist]");k&&(k.value=e.distance||"");const A=l("[data-ag-berge-gain]");A&&(A.value=e.elevGain||e.elevation||"");const E=l("[data-ag-berge-date]");E&&(E.value=e.date||"");const j=l("[data-ag-berge-url]");j&&(j.value=e.activityUrl||"");const Z=l("[data-ag-berge-cover]");Z&&(Z.value=e.cover||"");const X=l("[data-ag-berge-notes]");X&&(X.value=e.notes||"");const K=l("[data-ag-berge-lat]");K&&(K.value=e.lat||"");const de=l("[data-ag-berge-lng]");de&&(de.value=e.lng||"");const ke=l("[data-ag-berge-loc-label]");ke&&(ke.value=e.locLabel||"");const ce=l("[data-ag-loc-search]");ce&&(ce.value=e.locLabel||"");const Se=l("[data-ag-berge-form-title]");Se&&(Se.textContent="Eintrag bearbeiten");const Ee=l("[data-ag-berge-save] span:last-child");Ee&&(Ee.textContent="Speichern"),m.hidden=!1,y&&(y.hidden=!0),(Te=l("[data-ag-sheet-backdrop]"))==null||Te.classList.add("is-open"),m.scrollIntoView({behavior:"smooth",block:"nearest"}),h&&h.focus(),S(8)});const f=t.querySelector("[data-ag-gipfel-delete]");f&&f.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&(xi(e.id),ye(),S(8),Promise.resolve().then(()=>_i).then(m=>m.showToast("Eintrag gelöscht")).catch(()=>{}))});const b=t.querySelector("[data-ag-map-komoot]");return b&&b.addEventListener("click",()=>{const m=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(m){if(!m.hidden){m.hidden=!0,b.textContent="🗺 Komoot-Karte";return}m.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,b.textContent="Karte schließen",S(4)}}),t}function ye(){const e=l("[data-ag-berge-list]"),t=l("[data-ag-berge-empty]"),a=l("[data-ag-berge-total]"),n=l("[data-ag-berge-analogy]");if(!e)return;const i=me().sort((s,o)=>{const d=s.date||"",g=o.date||"";return g<d?-1:g>d?1:0});e.innerHTML="";const r=i.reduce((s,o)=>s+(Number(o.elevGain)||Number(o.elevation)||0),0);if(a&&(a.textContent=r>0?Qe(r):"— m"),n){const s=hi(r);s?(n.textContent=s,n.hidden=!1):n.hidden=!0}if(!i.length){t&&(t.hidden=!1),Ma([]);return}t&&(t.hidden=!0),i.forEach(s=>e.appendChild(ki(s))),Ma(i)}function Si(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function i(){const r=e.querySelector("[data-ag-berge-lat]"),s=e.querySelector("[data-ag-berge-lng]"),o=e.querySelector("[data-ag-berge-loc-label]");r&&(r.value=""),s&&(s.value=""),o&&(o.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const r=t.value.trim();if(!r){i();return}n=setTimeout(async()=>{try{const s=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(s,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(g=>{const u=document.createElement("button");u.type="button",u.className="ag-location-result",u.textContent=g.display_name,u.addEventListener("click",()=>{const f=e.querySelector("[data-ag-berge-lat]"),b=e.querySelector("[data-ag-berge-lng]"),m=e.querySelector("[data-ag-berge-loc-label]");f&&(f.value=g.lat),b&&(b.value=g.lon),m&&(m.value=g.display_name),t.value=g.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(u)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",r=>{!t.contains(r.target)&&!a.contains(r.target)&&(a.hidden=!0)})}function Ei(){Si(C)}let _=null,Ge=null;function Ti(){_&&setTimeout(()=>_.invalidateSize(),150)}async function Li(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function Ma(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(o=>o.lat&&o.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await Li()}catch{return}const n=window.L,i=document.getElementById("ag-gipfel-map");if(!i)return;const r=[[45.8,5.9],[47.8,10.5]],s=[[35,-11],[71,32]];if(!_){_=n.map(i).fitBounds(r),n.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',subdomains:"abcd",maxZoom:19}).addTo(_);const o=t.querySelectorAll("[data-map-view]");o.forEach(d=>{d.addEventListener("click",()=>{o.forEach(u=>u.classList.remove("is-active")),d.classList.add("is-active");const g=d.dataset.mapView==="eu"?s:r;_.fitBounds(g)})})}Ge?Ge.clearLayers():Ge=n.layerGroup().addTo(_),a.forEach(o=>{const d=n.circleMarker([parseFloat(o.lat),parseFloat(o.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),g=document.createElement("div");g.style.cssText="min-width:130px";const u=o.elevGain||o.elevation;g.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${o.name||"—"}</div>
      ${u?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Qe(u)}</div>`:""}
    `;const f=document.createElement("button");f.type="button",f.textContent="Zum Eintrag",f.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",f.addEventListener("click",()=>{d.closePopup();const b=C.querySelector(`[data-ag-gipfel-id="${o.id}"]`);b&&(b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("ag-gipfel-highlight"),setTimeout(()=>b.classList.remove("ag-gipfel-highlight"),1200))}),g.appendChild(f),d.bindPopup(g),Ge.addLayer(d)}),requestAnimationFrame(()=>{_&&_.invalidateSize()}),setTimeout(()=>{_&&_.invalidateSize()},250)}const Da=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function $a(e){return Da[Math.min(e-1,Da.length-1)]}function oe(e,t){return e+Math.random()*(t-e)}function Na(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${c.baerlauch.level}`)}function ve(){c.baerlauch.timerId&&(clearInterval(c.baerlauch.timerId),c.baerlauch.timerId=null)}function Ba(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),s=l("#ag-baerlauch-actions");s&&(s.hidden=!0),ve(),c.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),i&&(i.innerHTML=""),r&&(r.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Pa(R(),c.baerlauch.level,!1),wt()}function Ci(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),i=l("#ag-baerlauch-actions"),r=l("#ag-baerlauch-next");ve(),c.baerlauch.level+=1;const s=Ii(R(),c.baerlauch.level);if(Pa(R(),c.baerlauch.level,!0),wt(),Na(),s&&te(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&c.photos&&c.photos.length){const o=he(),d=o.length?o[Math.floor(Math.random()*o.length)]:null;La(a,d),t.hidden=!1;const g=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=g[Math.floor(Math.random()*g.length)]}r&&(r.textContent=`Level ${c.baerlauch.level} starten`),i&&(i.hidden=!1)}function Ai(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),i=$a(c.baerlauch.level).timeMs;c.baerlauch.durationMs=i,c.baerlauch.startedAt=performance.now(),ve(),c.baerlauch.timerId=setInterval(()=>{const r=performance.now()-c.baerlauch.startedAt,s=Math.max(0,i-r),o=Math.min(1,r/i);t&&(t.textContent=(s/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(o,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),g=Math.pow(o,1.4);d.forEach(u=>{u.style.filter=`brightness(${1-g*.72}) saturate(${1-g*.45}) hue-rotate(${g*8}deg)`,u.style.opacity=String(1-g*.28)}),s<=0&&(ve(),e())},50)}function xt(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),i=l("#ag-baerlauch-photo"),r=l("#ag-baerlauch-text"),s=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!i||!r)return;if(e.hidden=!1,wt(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),c.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,i.innerHTML="",r.textContent="",s&&(s.hidden=!0),Na();const o=$a(c.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],g=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],u=[...d.slice(0,o.good).map(m=>({emoji:m,good:!0})),...g.slice(0,o.bad).map(m=>({emoji:m,good:!1}))];let f=0;const b=u.filter(m=>m.good).length;u.forEach(m=>{const y=document.createElement("button");y.type="button",y.className="ag-forage-item",y.textContent=m.emoji,y.dataset.good=m.good?"true":"false",y.style.left=`${oe(8,82)}%`,y.style.top=`${oe(10,72)}%`,y.style.setProperty("--dx",`${oe(-320,320)}px`),y.style.setProperty("--dy",`${oe(-220,220)}px`),y.style.setProperty("--dur",`${oe(o.speedMin,o.speedMax)}s`),y.style.setProperty("--delay",`${oe(-1.8,0)}s`),y.addEventListener("click",()=>{c.baerlauch.locked||(y.dataset.good==="true"?(y.classList.add("is-picked"),y.disabled=!0,f+=1,setTimeout(()=>y.remove(),140),f===b&&Ci()):Ba("poison"))}),t.appendChild(y)}),Ai(()=>Ba("timeout"))}function zi(){const e=l("#ag-baerlauch-panel");ve(),e&&(e.hidden=!0)}function Ii(e,t){var i;const a=it(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const r=(i=c.backup)==null?void 0:i.endpointUrl;r&&fetch(r,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Pa(e,t,a){var s;const n=Vt(),i=((s=c.theme)==null?void 0:s.timezone)||"UTC",r=z(i);n.unshift({date:r,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function wt(){var f;const e=l("#ag-baerlauch-scores");if(!e)return;const a=R()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",i=it(),r=Vt(),s=a==="fionn"?"lennart":"fionn",o=a in i||s in i;if(!o&&!r.length){e.hidden=!0;return}e.hidden=!1;const d=((f=c.theme)==null?void 0:f.timezone)||"UTC",g=b=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:d}).format(new Date(b+"T12:00:00Z"))}catch{return b}};let u="";if(o){const b=i[a]??0,m=i[s]??0;u+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${b||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${m||"—"}</span></div>
    </div>`}if(r.length){const b=r.slice(0,8).map(m=>{const y=m.player===a,v=y?"ag-score-mine":"ag-score-theirs",h=y?"Du":n,k=m.won?`✓ Level ${m.level}`:`✗ Level ${m.level-1>=1?m.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${g(m.date)}</span><span class="ag-score-pill ${v}">${h}</span><span class="ag-score-result">${k}</span></div>`}).join("");u+=`<div class="ag-score-table">${b}</div>`}e.innerHTML=u}let $=null,H=null,V="swabian";function Fe(){try{return JSON.parse(window.localStorage.getItem(Wt)||"[]")||[]}catch{return[]}}function kt(e){try{window.localStorage.setItem(Wt,JSON.stringify(e))}catch{}}function Mi(e){const t=Fe();t.unshift(e),kt(t),St("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Di(e,t){const a=Fe(),n=a.findIndex(r=>r.id===e);if(n===-1)return;const i={...a[n],...t};a[n]=i,kt(a),St("glossary-upsert",i)}function $i(e){kt(Fe().filter(t=>t.id!==e)),St("glossary-delete",{id:e})}function St(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:I(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function Et(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Ni(e,t){const a=c.backup;if(!a||!a.enabled||!a.endpointUrl)return Et(e);try{const n=await Et(e),i=n.split(",")[1],r=e.type||"audio/webm",s=JSON.stringify({type:"glossary-audio",token:I(),filename:`glossary-${t}.webm`,mimeType:r,data:i}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s})).json();return d.ok&&d.url?d.url:n}catch{return Et(e)}}const Bi={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge"};function Pi(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${Bi[e.lang]||e.lang}</span>`:"";a.innerHTML=`
    <div class="ag-glossary-card-body">
      <div class="ag-glossary-card-text">
        <div class="ag-glossary-word">${e.word||"—"}${n}</div>
        ${e.meaning?`<div class="ag-glossary-meaning-text">${e.meaning}</div>`:""}
      </div>
      <div class="ag-glossary-card-btns">
        ${e.audioUrl?`<button class="ag-glossary-play-btn" type="button" data-ag-glossary-play="${e.id}" aria-label="Abspielen">▶</button>`:""}
        <button class="ag-glossary-edit-btn" type="button" data-ag-glossary-edit="${e.id}" aria-label="Bearbeiten">Bearbeiten</button>
        <button class="ag-glossary-del-btn" type="button" data-ag-glossary-del="${e.id}" aria-label="Löschen">✕</button>
      </div>
    </div>
  `;const i=a.querySelector("[data-ag-glossary-play]");i&&e.audioUrl&&i.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),S(6)});const r=a.querySelector("[data-ag-glossary-edit]");r&&r.addEventListener("click",()=>{var b;const o=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!o)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const g=document.getElementById("ag-glossary-form-title");g&&(g.textContent="Wort bearbeiten");const u=document.getElementById("ag-glossary-save-label");u&&(u.textContent="Speichern");const f=document.getElementById("ag-glossary-audio-status");f&&(f.textContent=e.audioUrl?"Aufnahme vorhanden":""),H=null,o.hidden=!1,d&&(d.hidden=!0),o.scrollIntoView({behavior:"smooth",block:"nearest"}),(b=document.getElementById("ag-glossary-word-input"))==null||b.focus(),S(8)});const s=a.querySelector("[data-ag-glossary-del]");return s&&s.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&($i(e.id),xe(V),S(8))}),a}function xe(e){var s;V=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(o=>{o.classList.toggle("is-active",o.dataset.lang===V)}),qa();const n=(((s=document.getElementById("ag-glossary-search"))==null?void 0:s.value)||"").trim().toLowerCase(),i=Fe(),r=n?i.filter(o=>(o.word||"").toLowerCase().includes(n)||(o.meaning||"").toLowerCase().includes(n)):i.filter(o=>o.lang===V);if(t.innerHTML="",!r.length){a&&(a.textContent=n?"Kein Treffer.":"Noch kein Wort hier. Füg eins hinzu.",a.hidden=!1);return}a&&(a.hidden=!0),r.forEach(o=>t.appendChild(Pi(o,!!n)))}function qa(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function Ua(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),V="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),xe("swabian"),window.requestAnimationFrame(()=>qa()),S(10)}function qi(){const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),H=null,$&&$.state!=="inactive")try{$.stop()}catch{}$=null}const Tt=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],Lt=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];function We(e){const t=C.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}function we(e){c.activeTab=e,C.querySelectorAll("[data-ag-tab]").forEach(s=>{const o=s.dataset.agTab===e;s.classList.toggle("is-active",o),s.setAttribute("aria-selected",o?"true":"false")});const a=54,n=C.querySelector(".ag-bottomnav-btn.is-active"),i=C.querySelector(".ag-nav-pill");if(i&&n){const s=n.closest(".ag-bottomnav"),o=s?s.getBoundingClientRect():null,g=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(o&&g.width){const u=g.left-o.left+g.width/2;i.style.width=`${a}px`,i.style.left=`${u-a/2}px`}}l("[data-ag-panel-today]").hidden=e!=="today",l("[data-ag-panel-history]").hidden=e!=="history",l("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",l("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&ie(),e==="lieblinge"&&ht(),e==="berge"&&(ye(),Ti(),Ue().then(()=>ye()).catch(()=>{}));const r=l("[data-ag-fab]");r&&(r.hidden=e!=="berge")}function _a(){const e=c.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:I(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),i={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,i).then(r=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...i,mode:"no-cors"}).catch(()=>{}),a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)})}function se(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function ja(){const e=c.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:I(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){se("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const i=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!i){se("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),se("Stups wird gesendet…","pending");const r=JSON.stringify(n),s=()=>{se("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},o=()=>{se("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(i,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(d=>{d&&d.ok?s():o()}).catch(()=>{try{fetch(i,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(s).catch(o)}catch{o()}})}function Ct(e){const t=c.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:I(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},i=JSON.stringify(n),r=s=>{const o=nt();!o||o.week!==e.week||(Yt({...o,remoteStatus:s,remoteUpdatedAt:Date.now()}),bt())};r("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(s=>{s&&s.ok?r("sent"):r("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(()=>r("sent")).catch(()=>r("failed"))}catch{r("failed")}})}function Oa(){const e=nt();!e||e.week!==tt()||e.remoteStatus!=="sent"&&Ct(e)}function Ra(){const e=document.querySelector("[data-ag-notif-card]");if(e&&"Notification"in window&&!(Notification.permission==="granted"||Notification.permission==="denied")){try{if(window.localStorage.getItem(Ae)==="dismissed")return}catch{}e.hidden=!1,e.removeAttribute("hidden")}}function Ui(){var o;const e=((o=c.theme)==null?void 0:o.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),i=a*60+n,r=8*60,s=i<r?r-i:24*60-i+r;return Date.now()+s*60*1e3}async function Ke(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=c.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=I(),i=z(a);if(B().some(f=>f.token===n&&f.day===i)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:s,m:o}=Xe(a);if(s>=21)return;const d=((21-s)*60-o)*60*1e3-new Date().getSeconds()*1e3,g=be(),u=Lt[Kt(Lt)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:u.title.replace("{name}",g),body:u.body.replace("{name}",g)})}catch{}}async function Ha(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,i=be(),r=Tt[Kt(Tt)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:Ui(),title:r.title.replace("{name}",i),body:r.body.replace("{name}",i)}),(t=c.quest)!=null&&t.enabled&&ba()){const s=fe(),o=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!s.solved&&o!==Ie(c)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Ie(c)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:c.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:c.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function Ga(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function At(){if("serviceWorker"in navigator)try{const e=tr("sw.js");if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await Ha(),await Ke(),await Ga())}catch{}}async function Fa(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(Ae,"dismissed")}catch{}return}try{window.localStorage.setItem(Ae,"granted")}catch{}await At()}function zt(e,t,a,n,i,r){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,i,r);else{const s=Array.isArray(r)?r:[r,r,r,r],[o,d,g,u]=s.map(f=>Math.min(f,n/2,i/2));e.beginPath(),e.moveTo(t+o,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+i-g),e.quadraticCurveTo(t+n,a+i,t+n-g,a+i),e.lineTo(t+u,a+i),e.quadraticCurveTo(t,a+i,t,a+i-u),e.lineTo(t,a+o),e.quadraticCurveTo(t,a,t+o,a),e.closePath()}}function It(e,t,a){const n=t.split(" "),i=[];let r="";for(const s of n){const o=r?`${r} ${s}`:s;e.measureText(o).width>a&&r?(i.push(r),r=s):r=o}return r&&i.push(r),i}function Wa(e){var Z,X;const i=document.createElement("canvas"),r=Math.min(window.devicePixelRatio||1,2);i.width=640*r,i.height=340*r,i.style.width="640px",i.style.height="340px";const s=i.getContext("2d");s.scale(r,r);const o=e.category.id==="jackpot",d=o?"#2d1f00":"#0d2b1c",g=o?"#1a1000":"#061510",u=s.createLinearGradient(0,0,0,340);u.addColorStop(0,d),u.addColorStop(1,g),s.fillStyle=u,zt(s,0,0,640,340,20),s.fill();const f=o?"#b9782e":"#2f7a4f";s.fillStyle=f,zt(s,0,0,640,5,[20,20,0,0]),s.fill();const b=e.category.label,m=sa(e.category.tone);s.font="bold 13px Satoshi, Inter, system-ui, sans-serif",s.fillStyle=o?"#d4a24c":"#5aba7e",s.fillText(`${m} ${b}`,40,62);const y=e.day;s.font="13px Satoshi, Inter, system-ui, sans-serif",s.fillStyle="rgba(255,255,255,0.45)";const v=s.measureText(y).width;s.fillText(y,600-v,62),s.strokeStyle="rgba(255,255,255,0.1)",s.lineWidth=1,s.beginPath(),s.moveTo(40,76),s.lineTo(600,76),s.stroke(),s.font="bold 24px Boska, Georgia, serif",s.fillStyle="#ffffff";const h=It(s,e.outcome.title,640-40*2);let k=108;for(const K of h)s.fillText(K,40,k),k+=32;s.font="15px Satoshi, Inter, system-ui, sans-serif",s.fillStyle="rgba(255,255,255,0.72)";const A=It(s,e.outcome.message,640-40*2);k+=4;for(const K of A){if(k>270)break;s.fillText(K,40,k),k+=22}s.font="11px Satoshi, Inter, system-ui, sans-serif",s.fillStyle="rgba(255,255,255,0.25)";const E=((X=(Z=c.theme)==null?void 0:Z.brand)==null?void 0:X.machineName)||"Affektions-Gacha";s.fillText(E,40,324);const j=document.createElement("a");j.download=`gacha-${e.category.id}-${e.day}.png`,j.href=i.toDataURL("image/png"),j.click()}function Mt(e){C.style.opacity="1",C.innerHTML=`
    <div class="ag-error">
      <h2>Die Maschine klemmt.</h2>
      <p>${Ka(e.message||String(e))}</p>
    </div>
  `}function Ka(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function Ya(){c.todaysPull||(c.todaysPull=zr());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=c.theme.loadingSteps||["Maschine rattert"];let n=0;C.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const i=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((c.theme.revealDelayMs||3200)/a.length))),r=c.theme.revealDelayMs||3200,s=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),o=s.map(f=>parseFloat(f.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let g;function u(f){const b=Math.min((f-d)/r,1),m=1+5*b*b;s.forEach((y,v)=>{y.style.setProperty("--ag-emoji-duration",`${(o[v]/m).toFixed(3)}s`)}),b<1&&(g=requestAnimationFrame(u))}g=requestAnimationFrame(u),window.setTimeout(()=>{var y,v,h,k;window.clearInterval(i),cancelAnimationFrame(g),s.forEach((A,E)=>{A.style.setProperty("--ag-emoji-duration",`${o[E].toFixed(2)}s`)}),c.todaysPull.collectToken&&(B().some(E=>E.day===c.todaysPull.day&&E.token===c.todaysPull.token)||rr(c.todaysPull.collectToken)),ii(c.todaysPull),C.classList.remove("is-revealing"),C.classList.add("is-revealed"),C.classList.add("has-drawn"),e.disabled=!1,t.textContent=c.theme.brand.buttonShown,c.revealed=!0,et()||di(c.todaysPull),Ke();const f=W();je(),Qr(f);const b=(v=(y=c.todaysPull)==null?void 0:y.category)==null?void 0:v.id,m=(k=(h=c.todaysPull)==null?void 0:h.category)==null?void 0:k.tone;if(b==="special"){const A=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];te(130,A),setTimeout(()=>te(90,A),700),He("special")}else if(m==="jackpot"){const A=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];te(120,A),setTimeout(()=>te(80,A),650),He("jackpot")}else m==="rare"?(te(70),He("rare")):He(m||"common");Ea[f]?S([30,20,30,20,60]):S([20,20,40]),c.activeTab==="history"&&ie(),Ra()},c.theme.revealDelayMs||3200)}function Ja(){var Va,Za,Xa,Qa,en,tn,an,nn,rn,on,sn,ln,dn,cn,gn,pn,un,mn,fn,hn,bn,yn,vn,xn,wn,kn,Sn,En,Tn,Ln,Cn,An,zn;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(wa,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,wa();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{S(12),Ya()}),(Va=l("#ag-btn-rave"))==null||Va.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(Za=l("#ag-btn-rave"))==null||Za.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(Xa=l("#ag-btn-baerlauch"))==null||Xa.addEventListener("click",xt),(Qa=l("#ag-baerlauch-close"))==null||Qa.addEventListener("click",zi),(en=l("#ag-baerlauch-next"))==null||en.addEventListener("click",xt),(tn=l("#ag-btn-baerlauch"))==null||tn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),xt())}),(an=l("#ag-btn-gesprach"))==null||an.addEventListener("click",fa),(nn=l("#ag-btn-glossary"))==null||nn.addEventListener("click",Ua),(rn=l("#ag-btn-glossary"))==null||rn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Ua())}),(on=l("#ag-glossary-close"))==null||on.addEventListener("click",qi),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(p=>{p.addEventListener("click",()=>{const x=document.getElementById("ag-glossary-search");x&&(x.value=""),xe(p.dataset.lang),S(4)})}),(sn=document.getElementById("ag-glossary-search"))==null||sn.addEventListener("input",()=>{xe(V)});const i=document.getElementById("ag-glossary-add"),r=document.getElementById("ag-glossary-form");i&&i.addEventListener("click",()=>{var T,M;if(!r)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const p=document.getElementById("ag-glossary-form-title");p&&(p.textContent="Neues Wort");const x=document.getElementById("ag-glossary-save-label");x&&(x.textContent="Eintragen");const w=document.getElementById("ag-glossary-audio-status");w&&(w.textContent=""),H=null;const L=document.getElementById("ag-glossary-play-preview");L&&(L.hidden=!0),r.hidden=!1,i.hidden=!0,(T=l("[data-ag-sheet-backdrop]"))==null||T.classList.add("is-open"),(M=document.getElementById("ag-glossary-word-input"))==null||M.focus(),S(8)}),(ln=document.getElementById("ag-glossary-form-cancel"))==null||ln.addEventListener("click",()=>{var p;if(r&&(r.hidden=!0),i&&(i.hidden=!1),(p=l("[data-ag-sheet-backdrop]"))==null||p.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",H=null,$&&$.state!=="inactive")try{$.stop()}catch{}$=null,S(6)}),(dn=document.getElementById("ag-glossary-form-save"))==null||dn.addEventListener("click",async()=>{var M,D,P,Q;const p=(((M=document.getElementById("ag-glossary-word-input"))==null?void 0:M.value)||"").trim(),x=(((D=document.getElementById("ag-glossary-meaning-input"))==null?void 0:D.value)||"").trim(),w=(((P=document.getElementById("ag-glossary-edit-id"))==null?void 0:P.value)||"").trim();if(!p){(Q=document.getElementById("ag-glossary-word-input"))==null||Q.focus();return}const L=document.getElementById("ag-glossary-audio-status");let T=null;if(H){L&&(L.textContent="Wird hochgeladen…");const O=w||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;T=await Ni(H,O)}if(S([20,20,40]),w){const O={word:p,meaning:x||null};T!==null&&(O.audioUrl=T),Di(w,O)}else Mi({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:V,word:p,meaning:x||null,audioUrl:T,token:I()});r&&(r.hidden=!0),i&&(i.hidden=!1),document.getElementById("ag-glossary-edit-id").value="",H=null,$=null,xe(V),We("Wort gespeichert ✓")});const s=document.getElementById("ag-glossary-record");s&&s.addEventListener("click",async()=>{if($&&$.state==="recording"){$.stop();return}try{const p=await navigator.mediaDevices.getUserMedia({audio:!0}),x=[];$=new MediaRecorder(p),$.ondataavailable=L=>{L.data.size>0&&x.push(L.data)},$.onstop=()=>{p.getTracks().forEach(M=>M.stop()),H=new Blob(x,{type:$.mimeType||"audio/webm"});const L=document.getElementById("ag-glossary-audio-status");L&&(L.textContent="✓ Aufnahme bereit");const T=document.getElementById("ag-glossary-play-preview");T&&(T.hidden=!1),s.textContent="🎙 Neu aufnehmen"},$.start(),s.textContent="⏹ Stop";const w=document.getElementById("ag-glossary-audio-status");w&&(w.textContent="● REC"),S(10)}catch{const x=document.getElementById("ag-glossary-audio-status");x&&(x.textContent="Mikrofon nicht verfügbar")}}),(cn=document.getElementById("ag-glossary-play-preview"))==null||cn.addEventListener("click",()=>{if(!H)return;const p=URL.createObjectURL(H),x=new Audio(p);x.onended=()=>URL.revokeObjectURL(p),x.play().catch(()=>{})}),(gn=l("#ag-btn-mission"))==null||gn.addEventListener("click",ma),(pn=l("#ag-btn-mission"))==null||pn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),ma())}),(un=l("#ag-mission-close"))==null||un.addEventListener("click",Pr),(mn=l("#ag-mission-done"))==null||mn.addEventListener("click",()=>{Ir();const p=l("#ag-mission-actions"),x=l("#ag-mission-feedback"),w=l("#ag-mission-done-note"),L=l("#ag-btn-mission");p&&(p.hidden=!0),w&&(w.hidden=!1),x&&!ua()&&(x.hidden=!1),L&&L.classList.remove("ag-chip-mission-active")}),(fn=l("#ag-mission-panel"))==null||fn.querySelectorAll(".ag-mission-rate-btn").forEach(p=>{p.addEventListener("click",()=>{var x;(x=l("#ag-mission-panel"))==null||x.querySelectorAll(".ag-mission-rate-btn").forEach(w=>w.classList.remove("is-selected")),p.classList.add("is-selected")})}),(hn=l("#ag-mission-feedback-send"))==null||hn.addEventListener("click",()=>{var M;const p=l("#ag-mission-panel"),x=p==null?void 0:p.querySelector(".ag-mission-rate-btn.is-selected"),w=(x==null?void 0:x.dataset.rating)||null,L=(((M=l("#ag-mission-comment"))==null?void 0:M.value)||"").trim();Dr(w,L);const T=l("#ag-mission-feedback-sent");p==null||p.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(D=>{D.hidden=!0}),T&&(T.hidden=!1)}),(bn=l("#ag-letter-close"))==null||bn.addEventListener("click",pt),(yn=l("#ag-letter-overlay"))==null||yn.addEventListener("click",p=>{p.target===p.currentTarget&&pt()}),(vn=l("#ag-lightbox-close"))==null||vn.addEventListener("click",()=>{ft()}),(xn=l("#ag-lightbox"))==null||xn.addEventListener("click",p=>{p.target===p.currentTarget&&ft()}),document.addEventListener("keydown",p=>{p.key==="Escape"&&(pt(),ft())}),(wn=l("#ag-gesprach-close"))==null||wn.addEventListener("click",qr),(kn=l("#ag-gesprach-next"))==null||kn.addEventListener("click",ha),(Sn=l("#ag-gesprach-wa"))==null||Sn.addEventListener("click",Ur),(En=l("#ag-btn-gesprach"))==null||En.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),fa())}),(Tn=l("#ag-btn-quest"))==null||Tn.addEventListener("click",ya),(Ln=l("#ag-quest-close"))==null||Ln.addEventListener("click",_r),(Cn=l("#ag-btn-quest"))==null||Cn.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),ya())}),(An=l("#ag-quest-file"))==null||An.addEventListener("change",p=>{const x=p.target.files&&p.target.files[0];x&&jr(x)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!c.todaysPull)return;S(8);const p=Ca(c.todaysPull);try{await navigator.clipboard.writeText(p),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",p)}}),l("[data-ag-save-img]").addEventListener("click",()=>{c.todaysPull&&(S(8),Wa(c.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{S(8),li(c.todaysPull)});const o=l("[data-ag-recover-btn]");o&&o.addEventListener("click",()=>{o.textContent="⏳",o.disabled=!0;const p=Ri();ie(),je(),o.textContent=p>0?`↺${p}`:"✓",setTimeout(()=>{o.textContent="↺",o.disabled=!1},3e3)});const d=l("[data-ag-streak-restore]");d&&d.addEventListener("click",()=>{if(!na()){ut();return}const p=lt(),x=st(),L=qe()>0&&x-qe()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${p}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${x-1} Streak-Retter übrig.`;if(!window.confirm(L))return;d.disabled=!0;const M=mr();ie(),je(),M&&(te(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),S([30,20,30,20,60])),ut(),d.disabled=!1});const g=l("[data-ag-sync-btn]");g&&g.addEventListener("click",async()=>{g.textContent="⏳",g.disabled=!0;const p=await Ue();ie(),g.textContent=p<0?"✗":`✓${p}`,setTimeout(()=>{g.textContent="☁",g.disabled=!1},3e3)}),C.querySelectorAll("[data-ag-tab]").forEach(p=>{p.addEventListener("click",()=>{S(6),we(p.dataset.agTab)})});const u=C.querySelector(".ag-bottomnav");if(u){const p=u.querySelector(".ag-nav-pill"),x=[...u.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let w=null;u.addEventListener("pointerdown",T=>{const M=u.getBoundingClientRect();u.setPointerCapture(T.pointerId);const D=parseFloat(p==null?void 0:p.style.width)||54;w={id:T.pointerId,startX:T.clientX-M.left,pillStartCentre:(parseFloat(p==null?void 0:p.style.left)||0)+D/2,pillWidth:D,moved:!1,suppress:!1}}),u.addEventListener("pointermove",T=>{if(!w||T.pointerId!==w.id)return;const M=u.getBoundingClientRect(),D=T.clientX-M.left-w.startX;if(!w.moved&&Math.abs(D)<6||(w.moved=!0,w.suppress=!0,!p))return;p.style.transition="none";const P=u.getBoundingClientRect(),Q=w.pillStartCentre+D,O=w.pillWidth/2;let q=Q-O;q<0?q=q*.25:q+w.pillWidth>P.width&&(q=P.width-w.pillWidth+(q+w.pillWidth-P.width)*.25),p.style.left=`${q}px`});const L=T=>{if(!w||T.pointerId!==w.id)return;const M=w.moved,D=w.suppress;if(w=null,p&&(p.style.transition=""),!M)return;const P=u.getBoundingClientRect(),Q=T.clientX-P.left;let O=x[0],q=1/0;if(x.forEach(ae=>{const ee=ae.getBoundingClientRect(),Ve=ee.left-P.left+ee.width/2,Ce=Math.abs(Q-Ve);Ce<q&&(q=Ce,O=ae)}),S(6),we(O.dataset.agTab),D){const ae=ee=>{ee.stopImmediatePropagation(),ee.preventDefault()};u.addEventListener("click",ae,{capture:!0,once:!0})}};u.addEventListener("pointerup",L),u.addEventListener("pointercancel",T=>{!w||T.pointerId!==w.id||(w=null,p&&(p.style.transition=""),we(c.activeTab))})}const f=l("[data-ag-berge-add]"),b=l("[data-ag-berge-form]"),m=l("[data-ag-berge-cancel]"),y=l("[data-ag-berge-save]");f&&f.addEventListener("click",()=>{var x,w;S(8);const p=l("[data-ag-berge-date]");p&&!p.value&&(p.value=z(((x=c.theme)==null?void 0:x.timezone)||"Europe/Zurich")),b.hidden=!1,f.hidden=!0,(w=l("[data-ag-sheet-backdrop]"))==null||w.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),m&&m.addEventListener("click",()=>{var T;S(6),b.hidden=!0,f.hidden=!1,(T=l("[data-ag-sheet-backdrop]"))==null||T.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(M=>{const D=l(M);D&&(D.value="")});const p=l("[data-ag-loc-search]");p&&(p.value="");const x=l("[data-ag-loc-dropdown]");x&&(x.hidden=!0,x.innerHTML="");const w=l("[data-ag-berge-form-title]");w&&(w.textContent="Neuer Gipfeleintrag");const L=l("[data-ag-berge-save] span:last-child");L&&(L.textContent="Eintragen")}),y&&y.addEventListener("click",()=>{var In,Mn,Dn,$n,Nn,Bn,Pn,qn,Un,_n,jn,On,Rn,Hn;const p=(((In=l("[data-ag-berge-name]"))==null?void 0:In.value)||"").trim(),x=parseFloat(((Mn=l("[data-ag-berge-dist]"))==null?void 0:Mn.value)||""),w=parseInt(((Dn=l("[data-ag-berge-gain]"))==null?void 0:Dn.value)||"",10),L=(($n=l("[data-ag-berge-date]"))==null?void 0:$n.value)||z(((Nn=c.theme)==null?void 0:Nn.timezone)||"Europe/Zurich"),T=(((Bn=l("[data-ag-berge-url]"))==null?void 0:Bn.value)||"").trim(),M=(((Pn=l("[data-ag-berge-cover]"))==null?void 0:Pn.value)||"").trim(),D=(((qn=l("[data-ag-berge-notes]"))==null?void 0:qn.value)||"").trim(),P=(((Un=l("[data-ag-berge-edit-id]"))==null?void 0:Un.value)||"").trim(),Q=(((_n=l("[data-ag-berge-lat]"))==null?void 0:_n.value)||"").trim()||null,O=(((jn=l("[data-ag-berge-lng]"))==null?void 0:jn.value)||"").trim()||null,q=(((On=l("[data-ag-berge-loc-label]"))==null?void 0:On.value)||"").trim()||null;if(!p){(Rn=l("[data-ag-berge-name]"))==null||Rn.focus();return}S([20,20,40]);const ae={name:p,elevation:null,distance:isNaN(x)?null:x,elevGain:isNaN(w)?null:w,date:L,activityUrl:T||null,cover:M||null,notes:D||null,lat:Q,lng:O,locLabel:q};P?wi(P,ae):vi({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...ae,token:I()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Yi=>{const Gn=l(Yi);Gn&&(Gn.value="")});const ee=l("[data-ag-loc-search]");ee&&(ee.value="");const Ve=l("[data-ag-berge-form-title]");Ve&&(Ve.textContent="Neuer Gipfeleintrag");const Ce=l("[data-ag-berge-save] span:last-child");Ce&&(Ce.textContent="Eintragen"),b.hidden=!0,f.hidden=!1,(Hn=l("[data-ag-sheet-backdrop]"))==null||Hn.classList.remove("is-open"),ye(),We("Gipfel gespeichert ✓")}),Ei();const v=l("[data-ag-ping-card]");v&&(v.hidden=!(I()==="fionn"&&((zn=c.backup)!=null&&zn.enabled)));const h=l("[data-ag-ping-dismiss]");h&&h.addEventListener("click",()=>{const p=l("[data-ag-ping-banner]");p&&(p.hidden=!0)});const k=l("[data-ag-ping-send]");k&&k.addEventListener("click",()=>{S([20,30,20]);try{_a()}catch{}});const A=l("[data-ag-hug-send]");A&&A.addEventListener("click",()=>{S([20,30,20]);try{ja()}catch{}});const E=l("[data-ag-wish-open]"),j=l("[data-ag-wish-cancel]"),Z=l("[data-ag-wish-submit]");E&&E.addEventListener("click",()=>{S(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const p=l("[data-ag-wish-input]");p&&window.setTimeout(()=>p.focus(),60)}),j&&j.addEventListener("click",()=>{S(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),Z&&Z.addEventListener("click",()=>{const p=l("[data-ag-wish-input]"),x=((p==null?void 0:p.value)||"").trim();if(!x)return;S([20,20,40]);const w={week:tt(),text:x,submittedAt:Date.now(),remoteStatus:"idle"};Yt(w),bt();try{Ct(w)}catch{}});const X=l("[data-ag-notif-enable]"),K=l("[data-ag-notif-dismiss]");X&&X.addEventListener("click",()=>{S(10),Fa()}),K&&K.addEventListener("click",()=>{S(6);try{window.localStorage.setItem(Ae,"dismissed")}catch{}const p=l("[data-ag-notif-card]");p&&(p.hidden=!0)});const de=l("[data-ag-sheet-backdrop]");de&&de.addEventListener("click",()=>{S(6);const p=l("[data-ag-berge-form]"),x=l("[data-ag-berge-add]");p&&!p.hidden&&(p.hidden=!0,x&&(x.hidden=!1));const w=document.getElementById("ag-glossary-form"),L=document.getElementById("ag-glossary-add");w&&!w.hidden&&(w.hidden=!0,L&&(L.hidden=!1)),de.classList.remove("is-open")});const ke=l("[data-ag-fab]");ke&&ke.addEventListener("click",()=>{S(8);const p=l("[data-ag-berge-add]");p&&!p.hidden&&p.click()});const ce=["today","history","lieblinge","berge"];let Se=0,Ee=0;const Te=l(".ag-content")||C;Te.addEventListener("touchstart",p=>{Se=p.touches[0].clientX,Ee=p.touches[0].clientY},{passive:!0}),Te.addEventListener("touchend",p=>{const x=p.changedTouches[0].clientX-Se,w=Math.abs(p.changedTouches[0].clientY-Ee);if(Math.abs(x)>52&&w<44){const L=ce.indexOf(c.activeTab),T=x<0?Math.min(L+1,ce.length-1):Math.max(L-1,0);T!==L&&(S(6),we(ce[T]))}},{passive:!0});const Le=l("[data-ag-ptr]");let Ye=0,Je=!1;document.addEventListener("touchstart",p=>{window.scrollY===0&&(Ye=p.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",p=>{if(!Ye)return;p.touches[0].clientY-Ye>64&&!Je&&Le&&(Je=!0,Le.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{Je&&Le&&(Le.classList.add("is-loading"),await Ue(),c.activeTab==="berge"&&ye(),c.activeTab==="history"&&ie(),Le.classList.remove("is-visible","is-loading"),We("Aktualisiert ✓")),Ye=0,Je=!1},{passive:!0})}const _i=Object.freeze(Object.defineProperty({__proto__:null,DAILY_REMINDER_POOL:Tt,STREAK_WARN_POOL:Lt,bindEvents:Ja,downloadResultAsImage:Wa,drawRoundRect:zt,enableNotifications:Fa,escapeHtml:Ka,registerServiceWorker:At,renderError:Mt,retryPendingWishSend:Oa,reveal:Ya,scheduleNotification:Ha,scheduleStreakWarning:Ke,sendHugToInbox:ja,sendPingToBackend:_a,sendWishToInbox:Ct,setActiveTab:we,setHugStatus:se,showNotifPrompt:Ra,showToast:We,tryPeriodicSync:Ga,wrapText:It},Symbol.toStringTag,{value:"Module"})),ji={photos:[]};function Oi(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=ra();return a.map(i=>{const r=new URL(i.url,n).toString(),s=i.type==="video"||t.test(r);return{...i,type:s?"video":"image",url:r}}).filter(i=>i.url)}function Ri(){var o;const e=I(),t=z(((o=c.theme)==null?void 0:o.timezone)||"UTC"),a=[{day:"2026-05-01",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-02",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Foto-Drop",message:"Die Maschine spuckt eine Erinnerung aus. Das zählt als Preis, auch wenn sie sentimental tut."},{day:"2026-05-03",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-04",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Der Fionn-Quest-Sieger",message:"Lennart ist der offizielle Gewinner. 24h lang hast du die absolute Entscheidungsgewalt über alle Freizeitaktivitäten."},{day:"2026-05-05",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Barróg (IE)",message:"Eine feste Umarmung (20 Sekunden Minimum)."},{day:"2026-05-06",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Sprachnachricht",message:"Du darfst eine kleine Sprachnachricht anfordern. Thema frei, Länge wie eine gute Aussicht: nicht zu kurz."},{day:"2026-05-07",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Baugespann-Sperre",message:"Hier entsteht demnächst ein Gewinn. Aktuell sieht man nur die Holzpfosten auf dem Dach."},{day:"2026-05-08",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Design-Safari",message:"Schick mir ein Foto von einem Gebäude oder Detail, das du heute siehst und das entweder genial oder ein Verbrechen ist."},{day:"2026-05-09",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Überraschungs-Wochenende",message:"Fionn plant einen kompletten Tag für dich. Du musst nur sagen, wann du Zeit hast."},{day:"2026-05-10",categoryId:"special",categoryLabel:"Laf Schnell!",tone:"jackpot",title:"🌟 SSR-Speed-Dämon-Pull! 🌟",message:"Hey Lennart! An diesem besonderen Tag in München beim Wings for Life World Run, möge dein Lauf mit deine friends ein legendärer Gacha-Pull sein: epische Speed, Ausdauer-Verlust und alle Kumpels SSR-Rarität (Super Super Rare, die Besten der Besten!) für maximalen Spaß! Rennt wie die Teufel, lacht euch schlapp und erobert die Strecke aus dem Olympiapark wie Bosse. Ich vermisse dich total hier in Zürich, aber freue mich fuer dich!"},{day:"2026-05-11",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Gedanken-Ping",message:"Du musst jetzt acht Sekunden an mich denken. Die Maschine behauptet, sie könne das überprüfen <3."},{day:"2026-05-12",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Geräusch-Notiz",message:"Beschreib mir das markanteste Geräusch deines Tages in maximal fünf Wörtern. Poetisch oder komplett nüchtern ist beides erlaubt."},{day:"2026-05-13",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Foto-Anfrage",message:"Du darfst ein süßes, schönes oder dummes Foto anfordern. Die Maschine empfiehlt: Alle drei."},{day:"2026-05-14",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Saudades (PT)",message:"Wenn man sich mal einen Tag vermisst: Ein Gutschein für ein spontanes Facetime-Date."},{day:"2026-05-15",categoryId:"special",categoryLabel:"Abendessen 🍽️",tone:"rare",title:"Fionn lädt zum Abendessen ein 🍽️",message:"Heute Abend geht's auf Fionns Rechnung. Treffpunkt: Stauffacher, 20:00 Uhr."},{day:"2026-05-16",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Bildkapsel",message:"Heute gibt es kein Gutschein-Drama, nur ein kleines Bild."},{day:"2026-05-17",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Tehran & Guatemala Tales",message:"Du darfst eine Geschichte aus deiner Reisezeit einfordern, die du noch nicht kennst."},{day:"2026-05-18",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Züri-Regen",message:"Grauer Himmel über Wiedikon. Kein Preis, nur das Bedürfnis nach einem sehr großen Tee."},{day:"2026-05-19",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Drei-Wort-Reisebericht",message:"Schick Fionn deinen Tag in genau drei Worten, als wärst du sehr erschöpft in einem Zug."},{day:"2026-05-20",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Denkmalschutz",message:"Dieser Slot darf aus historischen Gründen heute nicht verändert oder mit Preisen befüllt werden. Ein Klassiker unter den Nieten."},{day:"2026-05-21",categoryId:"special",categoryLabel:"Packliste 🧳",tone:"quest",title:"Deine Aufgabe: ein Brief 💌",message:`Ich kann es kaum erwarten. Den Rest findest du auf der Liste die ich dir gegeben habe — aber eins noch: deine HiFi-Ohrstöpsel. Vertrau mir.

Und eine Aufgabe von der Maschine: Schreib mir einen kurzen Brief auf Papier. Nicht lang, nicht perfekt — einfach was du gerade denkst. Bring ihn mit. Ich lese ihn wenn wir uns sehen. Bis bald. 🐚`}],n=B(),i=new Set(n.map(d=>d.day)),r=a.filter(d=>!i.has(d.day)&&d.day<=t).map(d=>({...d,token:e,link:null,photo:null,unlockTime:null,revealedAt:new Date(d.day+"T12:00:00").getTime()}));if(!r.length)return 0;const s=[...n,...r].sort((d,g)=>g.day.localeCompare(d.day));return ge(s),c.syncedHistory=s,ue(W()),ne(),r.length}async function Hi(){hr(),wr(),Tr();try{const[e,t,a,n,i,r,s,o]=await Promise.all([U("config/theme.json"),U("config/outcomes.json"),U("config/photos.json",ji),U("config/special-days.json",{days:[]}),U("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),U("config/backup.json",{enabled:!1,endpointUrl:""}),U("config/quest.json",{enabled:!1}),U("config/missions.json",{pairs:[]})]);c.theme=e,c.outcomes=t,c.photos=Oi(a),c.specialDays=n,c.wishInbox=i&&typeof i=="object"?i:{enabled:!1,endpointUrl:""},c.backup=r&&typeof r=="object"?r:{enabled:!1,endpointUrl:""},c.quest=s&&typeof s=="object"?s:{enabled:!1},c.missions=o&&Array.isArray(o.pairs)?o:{pairs:[]},br(e),yr(et()||z(e.timezone)),ui(),gi(),bt(),Ja(),requestAnimationFrame(()=>{const g=C.querySelector(".ag-nav-pill"),u=C.querySelector(".ag-bottomnav-btn.is-active");if(g&&u){const f=u.closest(".ag-bottomnav"),b=f?f.getBoundingClientRect():null,m=u.getBoundingClientRect();b&&m.width&&(g.style.transition="none",g.style.left=`${m.left-b.left}px`,g.style.width=`${m.width}px`,requestAnimationFrame(()=>{g.style.transition=""}))}});try{Oa()}catch{}At(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&Ke()}),C.classList.add("is-ready"),C.style.transition="opacity .18s ease",C.style.opacity="1";const d=z(e.timezone);B().some(g=>g.token===I()&&g.day===d)&&C.classList.add("has-drawn"),Ue().catch(()=>{})}catch(e){Mt(e)}}const le=document.currentScript,Gi=(le==null?void 0:le.dataset.mount)||"#affektions-gacha",Fi=(le==null?void 0:le.dataset.configBase)||"";function Wi(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Ki=document.querySelector(Gi)||Wi();Fn(Ki),fr(Fi,null),Hi().catch(e=>Mt(e))})();

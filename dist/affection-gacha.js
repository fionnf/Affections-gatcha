(function(){"use strict";const g={theme:null,outcomes:null,photos:null,specialDays:null,quest:null,missions:null,radio:null,todaysPull:null,activeTab:"today",revealed:!1,syncedHistory:null,baerlauch:{level:1,locked:!1,timerId:null,startedAt:null,durationMs:8e3}};let E=null;function Cr(e){E=e}function l(e){return E.querySelector(e)}const Kt="affektions-gacha:history:v1",Yt="affektions-gacha:favourites:v1",Vt="affektions-gacha:tokens:v1",Jt="affektions-gacha:streak-cache:v1",Zt="affektions-gacha:streak-synced:v1",Qt="affektions-gacha:streak-restore:v1",Xt="affektions-gacha:wish:v1",ea="affektions-gacha:milestones:v1",ge="affektions-gacha:notif:v1",ta="affektions-gacha:baerlauch-scores:v1",Lr="affektions-gacha:baerlauch-history:v1",aa="affektions-gacha:mission-log:v1",na="affektions-gacha:gesprach-idx:v1",Ar="affektions-gacha:sound:v1",ra="affektions-gacha:gipfelbuch:v1",ia="affektions-gacha:quest:v1",ct="affektions-gacha:quest-points:v1",zr=20,oa=[100,75,50,25],sa="affektions-gacha:glossary:v1",gt="affektions-gacha:stimmung:v1",Ir={"🌿":"Fionn kocht dir ein Abendessen nach Wahl","🔥":"Wochenend-Abenteuer — Ziel nach deiner Wahl","⭐":"Fionns Überraschung — er entscheidet"};function z(e,t){const a=new Intl.DateTimeFormat("de-CH",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(t||new Date),n=r=>a.find(i=>i.type===r).value;return`${n("year")}-${n("month")}-${n("day")}`}function je(e){const t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).formatToParts(new Date),a=n=>Number(t.find(r=>r.type===n).value);return{h:a("hour"),m:a("minute")}}function Mr(e){const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}function la(e){if(!e)return"";try{const t=String(e).trim(),a=/^\d{4}-\d{2}-\d{2}/.test(t)?t.slice(0,10):t,n=new Date(a+"T12:00:00");return isNaN(n.getTime())?t:n.toLocaleDateString("de-CH",{day:"numeric",month:"long",year:"numeric"})}catch{return String(e)}}function Oe(e){return!e&&e!==0?"—":Number(e).toLocaleString("de-CH")+" m"}function W(e){if(typeof e!="string")return"";try{const t=new URL(e,window.location.href);return t.protocol==="https:"||t.protocol==="http:"?t.href:""}catch{return""}}function $r(e){let t=2166136261;for(let a=0;a<e.length;a+=1)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return t>>>0}function Dr(e){return function(){let t=e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function K(e){return Dr($r(e))()}function ke(e,t){return t?Math.floor(K(e)*t):0}function da(e){const t=e.match(/komoot\.com(?:\/[a-z-]+)?\/tour\/(\d+)/);return t?t[1]:null}function ca(e){if(typeof e!="string")return null;const t=/drive\.google\.com\/(?:uc\?(?:[^&]*&)*id=([^&]+)|file\/d\/([^/?]+))/.exec(e);return t?t[1]||t[2]:null}function ga(e,t,a){return new URL(e,a()).toString()}function I(){return R()==="fionn"?"fionn":"lennart"}function R(){try{return new URLSearchParams(window.location.search).get("player")==="fionn"?"fionn":"lennart"}catch{return"lennart"}}function Se(){const t=new URLSearchParams(window.location.search).get("preview-day");return t?/^\d{4}-\d{2}-\d{2}$/.test(t)?t:/^\d{2}-\d{2}$/.test(t)?`${new Date().getFullYear().toString()}-${t}`:null:null}function ua(){const t=(new URLSearchParams(window.location.search).get("preview-category")||"").trim().toLowerCase();return t||null}function Re(){const e=new Date,t=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));const a=new Date(Date.UTC(t.getUTCFullYear(),0,1)),n=Math.ceil(((t-a)/864e5+1)/7);return`${t.getUTCFullYear()}-W${String(n).padStart(2,"0")}`}function Ee(e){var s,d;const t=((s=e.theme)==null?void 0:s.timezone)||"UTC",a=z(t),[n,r,i]=a.split("-").map(Number),o=Math.floor(new Date(Date.UTC(n,r-1,i)).getTime()/864e5);return Math.floor(o/(((d=e.quest)==null?void 0:d.periodDays)||2))}function Te(e){var r;const t=(r=e.quest)==null?void 0:r.challenges;if(!Array.isArray(t)||!t.length)return null;const a=Ee(e),n=t[a%t.length];return typeof n=="string"?{prompt:n,solution:""}:n}function ut(e){const t=new Date;return Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%e.length}function pa(e){const t=String(e||"").trim();if(!t)return"";if(/^\d{4}-\d{2}-\d{2}/.test(t)||/^\d{4}-\d{2}-\d{2}T/.test(t))return t.slice(0,10);const a={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},n=t.match(/([A-Za-z]{3})\s+(\d{1,2})/);return n&&a[n[1]]?`${new Date().getFullYear()}-${a[n[1]]}-${String(n[2]).padStart(2,"0")}`:""}const Nr=/gutschein|lädt\s+(dich\s+)?(zum|zur|ein)|einladung|voucher/i,Br=/nicht\s+einlös|kein\s+gutschein/i,Pr=new Set(["photo","collect","niete"]);function Ce(e){if(!e)return!1;if(e.voucher===!0)return!0;if(Pr.has(e.categoryId))return!1;const t=`${e.title||""} ${e.message||""}`;return Br.test(t)?!1:Nr.test(t)}const qr=Object.freeze(Object.defineProperty({__proto__:null,currentChallenge:Te,currentQuestPeriod:Ee,currentWeekKey:Re,dailyMsgIdx:ut,dateKeyInTimezone:z,extractDriveFileId:ca,extractKomootId:da,formatBergeDate:la,formatElev:Oe,formatHistoryDate:Mr,getMissionPlayer:R,getPreviewCategory:ua,getPreviewDay:Se,getToken:I,hmInTimezone:je,isVoucherEntry:Ce,normaliseDay:pa,safeUrl:W,seededIndex:ke,seededRandom:K,urlFor:ga},Symbol.toStringTag,{value:"Module"}));function B(){try{if(typeof window>"u"||!window.localStorage)return g.syncedHistory||[];const e=window.localStorage.getItem(Kt);if(!e)return g.syncedHistory||[];const t=JSON.parse(e);if(!Array.isArray(t))return g.syncedHistory||[];const a=t.filter(n=>n&&typeof n.day=="string"&&typeof n.token=="string").map(n=>n.token===n.token.toLowerCase()?n:{...n,token:n.token.toLowerCase()});return a.length?a:g.syncedHistory||[]}catch{return g.syncedHistory||[]}}function le(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Kt,JSON.stringify(e))}catch{}}function te(){var e;try{if(typeof window>"u"||!window.localStorage)return[];const t=window.localStorage.getItem(Yt);if(!t)return[];const a=JSON.parse(t);if(!Array.isArray(a))return[];const n=(e=g.theme)!=null&&e.timezone?z(g.theme.timezone):new Date().toISOString().slice(0,10);return a.filter(r=>r&&typeof r.day=="string"&&typeof r.token=="string"&&r.day<=n)}catch{return[]}}function Ge(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Yt,JSON.stringify(e))}catch{}}function He(){try{const e=localStorage.getItem(Vt),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function pt(e){try{localStorage.setItem(Vt,JSON.stringify(e))}catch{}}function Ur(e){const t=He();return t[e]=(t[e]||0)+1,pt(t),t[e]}function _r(e){const t=He();t[e]=0,pt(t)}function mt(){try{if(typeof window>"u"||!window.localStorage)return null;const e=window.localStorage.getItem(Xt);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch{return null}}function ma(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(Xt,JSON.stringify(e))}catch{}}function Le(){try{return JSON.parse(localStorage.getItem(Qt)||"{}")||{}}catch{return{}}}function fa(e){try{localStorage.setItem(Qt,JSON.stringify(e))}catch{}}function jr(){try{return parseInt(localStorage.getItem(Jt)||"0",10)||0}catch{return 0}}function Ae(e){try{localStorage.setItem(Jt,String(e))}catch{}}function Or(){try{return parseInt(localStorage.getItem(Zt)||"0",10)||0}catch{return 0}}function Rr(e){try{localStorage.setItem(Zt,String(e))}catch{}}function Fe(){try{const e=window.localStorage.getItem(ra);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function We(e){try{window.localStorage.setItem(ra,JSON.stringify(e))}catch{}}function Ke(){try{const e=localStorage.getItem(aa),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function ft(e){try{localStorage.setItem(aa,JSON.stringify(e))}catch{}}function ht(){try{const e=localStorage.getItem(ta),t=e?JSON.parse(e):{};return typeof t=="object"&&t!==null?t:{}}catch{return{}}}function ha(){try{const e=localStorage.getItem(Lr),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function ze(e){try{const t=localStorage.getItem(ia),a=t?JSON.parse(t):{},n=e();return a.period!==n?{period:n,solved:!1,attempts:0,hints:[]}:a}catch{return{period:e(),solved:!1,attempts:0,hints:[]}}}function bt(e){try{localStorage.setItem(ia,JSON.stringify(e))}catch{}}function Ye(){try{return parseInt(localStorage.getItem(ct)||"0",10)}catch{return 0}}function Gr(e){try{const t=Ye()+e;return localStorage.setItem(ct,String(t)),t}catch{return e}}function ba(){try{if(typeof window>"u"||!window.localStorage)return[];const e=window.localStorage.getItem(ea);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Hr(e){try{if(typeof window>"u"||!window.localStorage)return;window.localStorage.setItem(ea,JSON.stringify(e))}catch{}}function Fr(e,t){return ba().includes(`${e}|${t}`)}function Wr(e,t){const a=`${e}|${t}`,n=ba();n.includes(a)||Hr([...n,a])}function yt(e){return!1}function J(){var y;const e=I(),t=B().filter(b=>b.token===e);if(!t.length)return 0;const a=((y=g.theme)==null?void 0:y.timezone)||"UTC",n=z(a),r=new Set(t.map(b=>b.day)),[i,o,s]=n.split("-").map(Number);let d=new Date(Date.UTC(i,o-1,s)),c=n;r.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));let p=0;for(;r.has(c);)p++,d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return Math.max(p,jr(),Or())}function ya(e){if(e<=0)return null;const t=e===1?"Tag":"Tage";return e>=20?{emoji:"💎",label:`${e} ${t}`,tier:3}:e>=10?{emoji:"🔥",label:`${e} ${t}`,tier:2}:e>=5?{emoji:"✨",label:`${e} ${t}`,tier:1}:{emoji:"🌱",label:`${e} ${t}`,tier:0}}function va(e){if(e<5)return g.outcomes.categories;const t=e>=20?{niete:.4,jackpot:2,rare:1.5,uncommon:1.3}:e>=10?{niete:.6,jackpot:1.5,rare:1.3,uncommon:1.2}:{niete:.8,jackpot:1.2,rare:1.15,uncommon:1.1};return g.outcomes.categories.map(a=>({...a,weight:Math.max(1,Math.round(a.weight*(t[a.id]||1)))}))}function Kr(e,t){const a=va(t),n=a.reduce((o,s)=>o+s.weight,0),r=Math.floor(K(e)*n);let i=0;for(const o of a)if(i+=o.weight,r<i)return g.outcomes.categories.find(s=>s.id===o.id)||o;return g.outcomes.categories[g.outcomes.categories.length-1]}function xa(){const e=Le();return Math.floor((e.maxStreak||0)/zr)}function Ve(){var n;if(Le().birthdayBonus2026Used)return 0;const t=((n=g.theme)==null?void 0:n.timezone)||"UTC";return z(t)==="2026-05-29"?1:0}function vt(){const e=Le();return Math.max(0,xa()-(e.used||0))+Ve()}function xt(){var p;const e=I(),t=((p=g.theme)==null?void 0:p.timezone)||"UTC",a=z(t),n=new Set(B().filter(y=>y.token===e&&y.day<=a).map(y=>y.day));if(!n.size)return null;const r=[...n].sort()[0],[i,o,s]=a.split("-").map(Number),d=new Date(Date.UTC(i,o-1,s));let c=a;for(n.has(c)||(d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10));n.has(c);)d.setUTCDate(d.getUTCDate()-1),c=d.toISOString().slice(0,10);return c<r?null:c}function wa(){return vt()>0&&xt()!==null}function Yr(e){if(vt()<=0)return null;const t=xt();if(!t)return null;const a=I(),n={day:t,token:a,categoryId:"niete",categoryLabel:"Streak gerettet",tone:"quiet",title:"Streak gerettet 💎",message:"Dieser Tag wurde mit einem Streak-Retter wiederhergestellt.",link:null,photo:null,unlockTime:null,revealedAt:new Date(t+"T12:00:00").getTime(),restored:!0},r=new Set,i=[n,...B()].filter(c=>{const p=`${c.day}|${c.token}`;return r.has(p)?!1:(r.add(p),!0)}).sort((c,p)=>c.day<p.day?1:c.day>p.day?-1:0);le(i);const o=Le(),d=Math.max(0,xa()-(o.used||0))===0&&Ve()>0;return fa({...o,used:d?o.used||0:(o.used||0)+1,birthdayBonus2026Used:d?!0:o.birthdayBonus2026Used||!1,usedAt:Date.now()}),Ae(J()),t}let wt="",kt=null;function Vr(e,t){wt=e,kt=t}function ka(){if(kt)return kt();if(!wt)return window.location.href;try{return new URL(wt,window.location.href).toString()}catch{return window.location.href}}function _(e,t=null){const a=new URL(e,ka()).toString();return fetch(a,{cache:"no-store"}).then(n=>{if(!n.ok){if(t!==null)return t;throw new Error(`${e}: HTTP ${n.status}`)}return n.json()})}async function Je(){var e;try{const t=g.backup;if(!t||!t.enabled||!t.endpointUrl)return!1;const a=I(),n=`${t.endpointUrl}?token=${encodeURIComponent(a)}`,r=new AbortController,i=setTimeout(()=>r.abort(),12e3);let o;try{o=await fetch(n,{cache:"no-store",signal:r.signal})}finally{clearTimeout(i)}if(!o.ok)return!1;const s=await o.json();if(!s.ok)return!1;const d=z(((e=g.theme)==null?void 0:e.timezone)||"UTC"),c=B(),p=c.filter(h=>h.title!=="(wiederhergestellt)"&&h.day<=d);p.length!==c.length&&le(p);const y=te(),b=y.filter(h=>h.day<=d);if(b.length!==y.length&&Ge(b),Array.isArray(s.history)&&s.history.length){const h=B(),m=new Map(h.map(f=>[f.day,f]));for(const f of s.history){if(f.title==="(wiederhergestellt)")continue;const x=pa(f.day);if(!x||x>d)continue;const C=typeof f.token=="string"?f.token.toLowerCase():f.token;m.set(x,{...f,day:x,token:C})}const v=Array.from(m.values()).sort((f,x)=>x.day.localeCompare(f.day));le(v),g.syncedHistory=v,Ae(J())}if(Array.isArray(s.favourites)&&s.favourites.length){const h=te(),m=new Map(h.map(v=>[v.day,v]));for(const v of s.favourites)v.day<=d&&m.set(v.day,v);Ge(Array.from(m.values()).sort((v,f)=>f.day.localeCompare(v.day)))}if(s.tokens&&typeof s.tokens=="object"&&pt(s.tokens),typeof s.questPoints=="number"&&s.questPoints>Ye())try{localStorage.setItem(ct,String(s.questPoints))}catch{}if(typeof s.streak=="number"&&s.streak>0&&(Rr(s.streak),s.streak>J()&&Ae(s.streak)),s.baerlauchScores&&typeof s.baerlauchScores=="object"){const h=ht();let m=!1;for(const[v,f]of Object.entries(s.baerlauchScores))typeof f=="number"&&f>(h[v]||0)&&(h[v]=f,m=!0);if(m)try{localStorage.setItem(ta,JSON.stringify(h))}catch{}}if(Array.isArray(s.missionLog)&&s.missionLog.length){const h=Ke(),m=new Map(h.map(f=>[`${f.day}|${f.player}`,f]));for(const f of s.missionLog)!f.day||!f.player||m.set(`${f.day}|${f.player}`,f);const v=Array.from(m.values()).sort((f,x)=>x.day.localeCompare(f.day));ft(v)}if(typeof s.latestPing=="string"&&s.latestPing&&I()!=="fionn")try{const h="affektions-gacha:last-ping:v1",m=window.localStorage.getItem(h)||"";s.latestPing>m&&(window.localStorage.setItem(h,s.latestPing),g._newPing=!0)}catch{}if(Array.isArray(s.gipfelbuch)){const h=s.gipfelbuch.filter(m=>m.id).sort((m,v)=>(v.date||"").localeCompare(m.date||""));We(h)}return E&&E.dispatchEvent(new CustomEvent("ag-synced",{bubbles:!1,detail:{data:s}})),Array.isArray(s.history)?s.history.length:0}catch{return-1}}function ae(){try{const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=I(),a=B().filter(s=>(s.token||"").toLowerCase()===t.toLowerCase()),n=ze(()=>Ee(g)),r=n.solved&&n.pointsEarned&&!n._logged?{challenge:Te(g),attempts:n.attempts,points:n.pointsEarned,period:n.period}:void 0;r&&(n._logged=!0,bt(n));const i=JSON.stringify({type:"gacha-backup",token:t,history:a,favourites:te(),streak:J(),tokens:He(),questPoints:Ye(),...r?{questLog:r}:{}}),o={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i};fetch(e.endpointUrl,o).catch(()=>{fetch(e.endpointUrl,{...o,mode:"no-cors"}).catch(()=>{})})}catch{}}function Jr(){if(document.querySelector("[data-ag-fonts]"))return;const e=document.createElement("link");e.dataset.agFonts="true",e.rel="stylesheet",e.href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@400,500,700&display=swap",document.head.appendChild(e)}function Zr(e){const t=(r,i)=>E.style.setProperty(r,i),a=e.colors||{},n=e.darkColors||a;t("--ag-bg",a.background),t("--ag-surface",a.surface),t("--ag-surface-2",a.surfaceAlt),t("--ag-text",a.text),t("--ag-muted",a.muted),t("--ag-border",a.border),t("--ag-primary",a.primary),t("--ag-primary-dark",a.primaryDark),t("--ag-gold",a.gold),t("--ag-green",a.green),t("--ag-blue",a.blue),t("--ag-sky",a.sky),t("--ag-mountain",a.mountain),t("--ag-dark-bg",n.background),t("--ag-dark-surface",n.surface),t("--ag-dark-surface-2",n.surfaceAlt),t("--ag-dark-text",n.text),t("--ag-dark-muted",n.muted),t("--ag-dark-border",n.border),t("--ag-dark-primary",n.primary),t("--ag-dark-primary-dark",n.primaryDark),t("--ag-dark-gold",n.gold),t("--ag-dark-green",n.green),t("--ag-dark-blue",n.blue),t("--ag-dark-sky",n.sky),t("--ag-dark-mountain",n.mountain)}const Sa={background:"--ag-bg",surface:"--ag-surface",surfaceAlt:"--ag-surface-2",text:"--ag-text",muted:"--ag-muted",border:"--ag-border",primary:"--ag-primary",primaryDark:"--ag-primary-dark",gold:"--ag-gold",green:"--ag-green",blue:"--ag-blue",sky:"--ag-sky",mountain:"--ag-mountain"},Ea={background:"--ag-dark-bg",surface:"--ag-dark-surface",surfaceAlt:"--ag-dark-surface-2",text:"--ag-dark-text",muted:"--ag-dark-muted",border:"--ag-dark-border",primary:"--ag-dark-primary",primaryDark:"--ag-dark-primary-dark",gold:"--ag-dark-gold",green:"--ag-dark-green",blue:"--ag-dark-blue",sky:"--ag-dark-sky",mountain:"--ag-dark-mountain"};function Qr(e){const t=Xr(e);if(!t)return;const a=(n,r)=>E.style.setProperty(n,r);if(t.colors&&typeof t.colors=="object")for(const[n,r]of Object.entries(t.colors))Sa[n]&&typeof r=="string"&&a(Sa[n],r);if(t.darkColors&&typeof t.darkColors=="object")for(const[n,r]of Object.entries(t.darkColors))Ea[n]&&typeof r=="string"&&a(Ea[n],r)}function Xr(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}const ei=`
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
      }
      .ag-chip-stimmung-set::after {
        content: '';
        position: absolute;
        top: -3px; right: -3px;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--chip-dot-color, var(--ag-primary));
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

      /* ── Radio Zweisam ── */
      .ag-radio-visualizer{
        display:flex;align-items:flex-end;justify-content:center;gap:5px;
        height:40px;margin:14px 0 10px;
      }
      .ag-radio-visualizer span{
        display:block;width:5px;border-radius:3px;
        background:var(--ag-primary);opacity:.35;
        height:6px;transition:height .1s ease;
      }
      .ag-radio-visualizer.is-playing span{opacity:.75}
      .ag-radio-visualizer.is-playing span:nth-child(1){animation:ag-bar 1.1s ease-in-out infinite}
      .ag-radio-visualizer.is-playing span:nth-child(2){animation:ag-bar 0.9s ease-in-out infinite .15s}
      .ag-radio-visualizer.is-playing span:nth-child(3){animation:ag-bar 1.3s ease-in-out infinite .05s}
      .ag-radio-visualizer.is-playing span:nth-child(4){animation:ag-bar 0.8s ease-in-out infinite .3s}
      .ag-radio-visualizer.is-playing span:nth-child(5){animation:ag-bar 1.2s ease-in-out infinite .1s}
      .ag-radio-visualizer.is-playing span:nth-child(6){animation:ag-bar 1.0s ease-in-out infinite .25s}
      .ag-radio-visualizer.is-playing span:nth-child(7){animation:ag-bar 0.95s ease-in-out infinite .2s}
      .ag-radio-visualizer.is-playing span:nth-child(8){animation:ag-bar 1.15s ease-in-out infinite .08s}
      @keyframes ag-bar{
        0%,100%{height:6px}
        50%{height:32px}
      }
      .ag-radio-words-wrap{margin:8px 0 12px}
      .ag-radio-words-label{font-size:.8rem;opacity:.55;margin:0 0 6px;text-transform:uppercase;letter-spacing:.04em}
      .ag-radio-words{display:flex;flex-wrap:wrap;gap:6px}
      .ag-radio-word{
        display:inline-block;padding:3px 10px;border-radius:999px;
        background:rgba(126,207,163,.15);border:1px solid rgba(126,207,163,.25);
        font-size:.82rem;color:var(--ag-text);
      }
      .ag-radio-controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:4px}
      .ag-radio-voice-info{font-size:.78rem;opacity:.5;margin:8px 0 0}
      .ag-radio-open-btn{background:linear-gradient(135deg,rgba(126,207,163,.22),rgba(82,160,255,.18))!important}
      .ag-radio-open-btn:hover{box-shadow:0 4px 14px rgba(126,207,163,.25)!important}
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
    `;function ti(){if(document.querySelector("[data-ag-styles]"))return;const e=document.createElement("style");e.dataset.agStyles="true",e.textContent=ei.replace(/@media\s*\(prefers-color-scheme:dark\)/g,"@media all"),document.head.appendChild(e)}function ai(){return`
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
    `}function ni(){return`
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
    `}const ri=`
      <div class="ag-frame">
        <div class="ag-stage">
          ${ai()}
          <div class="ag-stage-veil" aria-hidden="true"></div>
          <div class="ag-shell">
            <header class="ag-hero">
              <div class="ag-machine-wrap" aria-hidden="true">
                ${ni()}
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
            <p class="ag-mini-copy">Wähle eine Farbe — die Seite passt sich an, bis Mitternacht.</p>
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
              <div class="ag-history-filter" data-ag-history-filter role="tablist" aria-label="Verlauf filtern">
                <button class="ag-history-filter-chip is-active" type="button" data-ag-filter="all" role="tab" aria-selected="true">Alle</button>
                <button class="ag-history-filter-chip" type="button" data-ag-filter="vouchers" role="tab" aria-selected="false">Gutscheine</button>
                <button class="ag-history-filter-chip" type="button" data-ag-filter="open" role="tab" aria-selected="false">Offen</button>
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
    `;function ii(){E.className="ag-widget",E.setAttribute("aria-labelledby","ag-title"),E.innerHTML=ri}function ne(e=80,t){const n=t||["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"],r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;",document.body.appendChild(r);for(let i=0;i<e;i++){const o=document.createElement("div"),s=n[Math.floor(Math.random()*n.length)],d=8+Math.random()*8,c=Math.random()*100,p=Math.random()*.6,y=1.4+Math.random()*.8;o.style.cssText=`position:absolute;top:-20px;left:${c}%;width:${d}px;height:${d*.6}px;background:${s};border-radius:2px;animation:ag-confetti-fall ${y}s ${p}s ease-in forwards;transform-origin:center;`,o.style.setProperty("--r",`${Math.random()*720-360}deg`),r.appendChild(o)}if(!document.getElementById("ag-confetti-style")){const i=document.createElement("style");i.id="ag-confetti-style",i.textContent="@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}",document.head.appendChild(i)}setTimeout(()=>r.remove(),3e3)}function oi(e){const t=Array.isArray(g.specialDays&&g.specialDays.days)?g.specialDays.days:[],a=e.slice(5);for(const n of t)if(n.date===e||n.date===a)return n;return null}function Ta(e){return{quiet:"🌙",soft:"🌿",quest:"🧭",warm:"✨",cursed:"😈",rare:"💫",photo:"📸",jackpot:"🎰"}[e]||"❤️"}function si(e){const t=l("[data-capsule]");if(!t)return;const a={quiet:"linear-gradient(90deg, #9faf9a 0 50%, #e6efdf 50% 100%)",soft:"linear-gradient(90deg, var(--ag-primary) 0 50%, #d8ecbf 50% 100%)",quest:"linear-gradient(90deg, var(--ag-blue) 0 50%, #d8ecbf 50% 100%)",warm:"linear-gradient(90deg, var(--ag-gold) 0 50%, #e1efc8 50% 100%)",cursed:"linear-gradient(90deg, #172018 0 50%, var(--ag-primary) 50% 100%)",rare:"linear-gradient(90deg, var(--ag-green) 0 50%, #f2df9d 50% 100%)",photo:"linear-gradient(90deg, var(--ag-green) 0 50%, var(--ag-sky) 50% 100%)",jackpot:"linear-gradient(90deg, var(--ag-gold) 0 50%, #fff0a8 50% 100%)"};t.style.background=a[e]||a.soft}function Ie(){return(g.photos||[]).filter(e=>e.type!=="video")}function li(e,t){const a=I(),n=`${g.theme.secret}|${a}|${e}`,r=oi(e);if(r){const h=Array.isArray(r.outcomes)&&r.outcomes.length?r.outcomes:[{title:r.label,message:""}],m=h[ke(`${n}|special|outcome`,h.length)],v={id:"special",label:r.label,weight:0,tone:r.tone||"jackpot",outcomes:h},f=r.photoAlt&&g.photos.length&&Ie().find(x=>x.alt===r.photoAlt)||null;return{day:e,token:a,category:v,outcome:m,photo:f,unlockTime:r.unlockTime||null}}let i=Kr(`${n}|category`,t||0);const o=ua();if(o){const h=g.outcomes.categories.find(m=>m.id===o);h&&(i=h)}i.id==="photo"&&!Ie().length&&(i=g.outcomes.categories.find(h=>h.id==="common")||i);const s=new Set(B().filter(h=>h.token===a&&h.day<e&&h.categoryId===i.id).map(h=>h.title)),d=i.outcomes.filter(h=>!s.has(h.title)),c=d.length>0?d:i.outcomes,p=c[ke(`${n}|${i.id}|outcome`,c.length)],y=Ie();let b=null;if(i.id==="photo"&&y.length){const h=new Set(B().filter(f=>f.token===a&&f.day<e&&f.photo).map(f=>f.photo.url)),m=y.filter(f=>!h.has(f.url)),v=m.length>0?m:y;b=v[ke(`${n}|photo`,v.length)]}return{day:e,token:a,category:i,outcome:p,photo:b,collectToken:p.token||null,voucher:p.voucher||!1}}function di(){const e=Se()||z(g.theme.timezone),t=J();return li(e,t)}function S(e){if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function Ca(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ue=["Wenn wir ein Restaurant eröffnen würden — was servieren wir, wie heißt es, und wo steht es?","Was ist eine Sache, die du mit mir noch erleben möchtest, die wir noch nie gemacht haben?","Welcher Moment aus unserer Zeit zusammen würdest du am liebsten noch einmal erleben?","Was ist die seltsamste Eigenschaft von mir, die du heimlich magst?","Wenn wir für ein Jahr irgendwo auf der Welt leben könnten — wo, und was wäre unser Alltag?","In welchem Moment hast du gemerkt, dass ich dir wirklich wichtig bin?","Was ist etwas, das du mir noch nie gesagt hast, mir aber vielleicht heute sagen könntest?","Was macht dich gerade in deinem Leben am stolzesten?","Was ist eine Eigenschaft von mir, die du bewunderst, die ich selbst wahrscheinlich nicht merke?","Wann fühlst du dich bei mir am geborgensten?","Gibt es etwas, das ich öfter machen könnte, das dir gut tun würde?","Was ist ein Ritual, das du gerne mit mir hätte — etwas nur für uns zwei?","Wenn du meine Gedanken lesen könntest, was glaubst du, würde ich gerade denken?","Was ist deine liebste Erinnerung an einen ganz normalen Tag mit mir?","Was würde die Version von uns in 10 Jahren über uns heute denken?","Was ist ein Traum, den du dir noch nicht erlaubt hast, laut auszusprechen?","Wie sieht ein perfekter Tag für dich aus — von morgens bis nachts?","Was ist etwas, das du von mir gelernt hast?","Was fehlt dir gerade, und wie könnte ich helfen?","Was war dein Lieblingsmoment auf unserer Reise nach Lissabon?","Wenn wir spontan ein Wochenende planen würden — wohin, und warum genau dorthin?","Was brauchst du gerade von mir, das du dir vielleicht noch nicht getraut hast zu sagen?","Was ist der Unterschied zwischen dem Lennart von vor einem Jahr und dem heute?","Wie hat sich das Gefühl für mich für dich in den letzten Monaten verändert?","Wenn du einen Brief an dich selbst in einem Jahr schreiben würdest — was würde drin stehen?","Was ist eine kleine Sache, die ich tue, die du magst, ohne dass ich es weiß?","Welchen meiner Züge findest du am lustigsten?","Was ist etwas, das du an Zürich vermissen würdest, wenn wir woanders leben würden?","Wenn ich ein Tier wäre — welches, und warum genau das?","Was wäre dein perfektes Date mit mir, völlig egal ob realistisch oder nicht?"],La=[["Du bist mein Lieblingsmensch.","Jeden Tag ein bisschen mehr als am Tag davor.","Pass auf dich auf."],["Manchmal mach ich was und denke sofort: Das muss ich dir zeigen.","Ich find es schön, dass wir so sind. Einfach so."],["Weißt du wie besonders du bist? Nicht weil ich dir das sage — einfach so, grundsätzlich.","Das wollte ich irgendwo festhalten."],["Ich hab diese Maschine gebaut weil ich nicht immer weiß wie ich solche Sachen sage.","Aber hier, wo es niemand sieht: Du machst alles besser."],["Nicht jeder findet seine Geheimverstecke. Du schon.","Danke, dass du so bist wie du bist."],["Es gibt Momente wo ich denke: Das hier ist sehr gut. Mit dir.","Kein Drama, kein Aufwand — einfach sehr gut."],["Ich bin froh, dass du in meinem Leben bist.","So einfach ist das."]],Aa="affektions-gacha:mission-done:v1",za="affektions-gacha:mission-feedback:v1";function St(){var i,o;const e=(i=g.missions)==null?void 0:i.pairs;if(!Array.isArray(e)||!e.length)return null;const t=z(((o=g.theme)==null?void 0:o.timezone)||"UTC"),a=ke(`${g.theme.secret}|mission|${t}`,e.length),n=e[a];return R()==="fionn"?n.fionn:n.lennart}function Ia(){var e;try{const t=z(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(Aa)===t}catch{return!1}}function ci(){var e,t;try{const a=z(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(Aa,a);const n=R(),r=St(),i=new Date().toISOString();pi({day:a,player:n,mission:r,doneAt:i});const o=(t=g.backup)==null?void 0:t.endpointUrl;o&&r&&fetch(o,{method:"POST",body:JSON.stringify({type:"mission-log",player:n,day:a,mission:r,doneAt:i}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}catch{}}function Ma(){var e;try{const t=z(((e=g.theme)==null?void 0:e.timezone)||"UTC");return localStorage.getItem(za)===t}catch{return!1}}function gi(){var e;try{const t=z(((e=g.theme)==null?void 0:e.timezone)||"UTC");localStorage.setItem(za,t)}catch{}}function ui(e,t){var o,s;const a=z(((o=g.theme)==null?void 0:o.timezone)||"UTC"),n=R(),r=St();mi(a,n,{rating:e,comment:t||""}),gi();const i=(s=g.backup)==null?void 0:s.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"mission-feedback",player:n,day:a,mission:r,rating:e,comment:t||""}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}function pi(e){const t=Ke(),a=t.findIndex(n=>n.day===e.day&&n.player===e.player);a>=0?t[a]={...t[a],...e}:(t.unshift(e),t.length>60&&t.splice(60)),ft(t)}function mi(e,t,a){const n=Ke(),r=n.findIndex(i=>i.day===e&&i.player===t);r>=0&&(n[r]={...n[r],...a},ft(n))}function fi(e,t){var c;if(!e)return;const a=Ke(),n=((c=g.theme)==null?void 0:c.timezone)||"UTC",r=z(n),i=new Map;for(const p of a)i.has(p.day)||i.set(p.day,{}),i.get(p.day)[p.player]=p;const o=Array.from(i.keys()).sort((p,y)=>y.localeCompare(p)).slice(0,30);if(!o.length){e.hidden=!0;return}e.hidden=!1;const s={fire:"🔥",ok:"👍",meh:"😴"},d=p=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:n}).format(new Date(p+"T12:00:00Z"))}catch{return p}};e.innerHTML='<h3 class="ag-mission-log-title">Verlauf</h3>'+o.map(p=>{const y=i.get(p),b=y.lennart,h=y.fionn,m=p===r,v=[];if(b&&t!=="fionn"){const f=b.doneAt?'<span class="ag-log-done">✓</span>':"",x=b.rating?`<span class="ag-log-rating">${s[b.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-lennart">Lennart</span><span class="ag-log-text">${Ca(b.mission||"")}</span>${f}${x}</div>`)}if(h&&t!=="lennart"){const f=h.doneAt?'<span class="ag-log-done">✓</span>':"",x=h.rating?`<span class="ag-log-rating">${s[h.rating]||""}</span>`:"";v.push(`<div class="ag-log-row"><span class="ag-log-who ag-log-fionn">Fionn</span><span class="ag-log-text">${Ca(h.mission||"")}</span>${f}${x}</div>`)}return v.length?`<div class="ag-log-day${m?" ag-log-today":""}"><span class="ag-log-date">${d(p)}</span>${v.join("")}</div>`:""}).filter(Boolean).join("")}function $a(){const e=l("#ag-mission-panel");if(!e)return;const t=l("#ag-mission-text"),a=l("#ag-mission-actions"),n=l("#ag-mission-feedback"),r=l("#ag-mission-feedback-sent"),i=l("#ag-mission-done-note"),o=e.querySelector(".ag-mini-copy");o&&(o.hidden=!0);const s=St();t&&(t.textContent=s||"Heute keine Mission verfügbar.");const d=Ia(),c=Ma();a&&(a.hidden=d),n&&(n.hidden=!d,e.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(p=>{p.hidden=c})),r&&(r.hidden=!c),i&&(i.hidden=!d),e.querySelectorAll(".ag-mission-rate-btn").forEach(p=>p.classList.remove("is-selected")),fi(l("#ag-mission-log"),R()),e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"})}function hi(){const e=l("#ag-mission-panel");e&&(e.hidden=!0)}let Ze=-1;function Da(){const e=l("#ag-gesprach-panel");if(e){e.hidden=!1;try{const t=localStorage.getItem(na);if(t!==null){const a=parseInt(t,10);if(Number.isFinite(a)&&a>=0&&a<ue.length){Ze=a;const n=l("#ag-gesprach-question");n&&(n.textContent=ue[a]);return}}}catch{}Na()}}function bi(){const e=l("#ag-gesprach-panel");e&&(e.hidden=!0)}function Na(){let e;do e=Math.floor(Math.random()*ue.length);while(e===Ze&&ue.length>1);Ze=e;try{localStorage.setItem(na,String(e))}catch{}const t=l("#ag-gesprach-question");t&&(t.textContent=ue[e])}function yi(){const e=ue[Ze]||"";if(!e)return;const t=g.theme&&g.theme.messageTarget||"https://wa.me/?text={text}",a=encodeURIComponent(`💬 Gespräch-Frage:

`+e+`

(via Affektions-Gacha)`),n=t.replace("{text}",a);window.location.href=n}function Ba(){var e;return!!((e=g.quest)!=null&&e.enabled&&Te(g))}function Pa(){const e=l("#ag-quest-panel");e&&(e.hidden=!1,qa())}function vi(){const e=l("#ag-quest-panel");e&&(e.hidden=!0)}function qa(){const e=Te(g),t=ze(),a=l("#ag-quest-challenge"),n=l("#ag-quest-hint-history"),r=l("#ag-quest-loading"),i=l("#ag-quest-actions"),o=l("#ag-quest-result"),s=l("#ag-quest-points"),d=l("#ag-quest-copy"),c=l("#ag-quest-title"),p=(e==null?void 0:e.prompt)||"";if(!e){c&&(c.textContent="Keine Aufgabe"),d&&(d.textContent="Schau später nochmal vorbei."),a&&(a.textContent=""),i&&(i.hidden=!0);return}if(a&&(a.textContent=p),r&&(r.hidden=!0),n&&(t.hints&&t.hints.length>0?(n.innerHTML=t.hints.map((y,b)=>`<div class="ag-hint-item"><span class="ag-hint-num">${b+1}</span><p>${y}</p></div>`).join(""),n.hidden=!1):n.hidden=!0),t.solved){c&&(c.textContent="Aufgabe gelöst ✓"),d&&(d.textContent="Gut gemacht."),i&&(i.hidden=!0),o&&(o.textContent=t.successMessage||"",o.hidden=!1),s&&(s.textContent=`+${t.pointsEarned} Punkte · Gesamt: ${Ye()}`,s.hidden=!1);return}c&&(c.textContent="Foto-Aufgabe 📷"),d&&(d.textContent=t.attempts===0?"Fotografiere und schick mir das Resultat.":`Versuch ${t.attempts+1} — du schaffst das.`),i&&(i.hidden=!1),o&&(o.hidden=!0),s&&(s.hidden=!0)}async function xi(e){if(!e)return;const t=l("#ag-quest-actions"),a=l("#ag-quest-loading"),n=l("#ag-quest-result"),r=l("#ag-quest-points"),i=l("#ag-quest-copy");t&&(t.hidden=!0),a&&(a.hidden=!1),n&&(n.hidden=!0);const o=await wi(e),s=ze(),d=Te(g),c=(d==null?void 0:d.prompt)||"",p=(d==null?void 0:d.solution)||"";try{const y=await ki(o,c,p,s.attempts+1,s.hints);if(s.attempts+=1,y.success){const b=oa[Math.min(s.attempts-1,oa.length-1)],h=Gr(b);s.solved=!0,s.pointsEarned=b,s.successMessage=y.message||"Perfekt.",bt(s),ae(),n&&(n.textContent=y.message||"Perfekt.",n.hidden=!1),r&&(r.textContent=`+${b} Punkte · Gesamt: ${h}`,r.hidden=!1),a&&(a.hidden=!0),i&&(i.textContent="Aufgabe gelöst ✓"),t&&(t.hidden=!0);const m=l("#ag-btn-quest");m&&m.classList.remove("ag-chip-quest-active"),S([20,20,40,20,60])}else a&&(a.hidden=!0),s.hints=[...s.hints||[],y.hint||"Versuch nochmal."],bt(s),qa()}catch{a&&(a.hidden=!0),n&&(n.textContent="Fehler — versuch nochmal.",n.hidden=!1),t&&(t.hidden=!1)}}function wi(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result.split(",")[1]),n.onerror=a,n.readAsDataURL(e)})}async function ki(e,t,a,n,r){var s;const i=(s=g.quest)==null?void 0:s.proxyUrl;if(!i)throw new Error("no proxy");const o=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({base64:e,challenge:t,solution:a,attemptNumber:n,previousHints:r})});if(!o.ok)throw new Error("proxy error");return o.json()}function Si(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,a=t.currentTime,n=Math.floor(t.sampleRate*.9),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let c=0;c<n;c++)i[c]=Math.random()*2-1;const o=t.createBufferSource();o.buffer=r;const s=t.createBiquadFilter();s.type="bandpass",s.Q.value=1.2,s.frequency.setValueAtTime(500,a),s.frequency.exponentialRampToValueAtTime(2200,a+.55);const d=t.createGain();d.gain.setValueAtTime(0,a),d.gain.linearRampToValueAtTime(.055,a+.06),d.gain.exponentialRampToValueAtTime(.001,a+.85),o.connect(s),s.connect(d),d.connect(t.destination),o.start(a),o.stop(a+.9),[[290,640,0,1.5,.12],[435,870,.07,1.3,.08],[580,1100,.14,1.1,.05]].forEach(([c,p,y,b,h])=>{const m=t.createOscillator();m.type="sine",m.frequency.setValueAtTime(c,a+y),m.frequency.exponentialRampToValueAtTime(p,a+y+b*.55);const v=t.createGain();v.gain.setValueAtTime(0,a+y),v.gain.linearRampToValueAtTime(h,a+y+.09),v.gain.exponentialRampToValueAtTime(.001,a+y+b),m.connect(v),v.connect(t.destination),m.start(a+y),m.stop(a+y+b+.05)})}catch{}}function Ei(e){const t="you didn't see this message coming did you…",a=document.createElement("p");a.className="ag-letter-prelude",t.split(" ").forEach((n,r)=>{const i=document.createElement("span");i.className="ag-letter-word",i.textContent=n,i.style.animationDelay=`${320+r*155}ms`,a.appendChild(i),a.appendChild(document.createTextNode(" "))}),e.innerHTML="",e.appendChild(a)}function Ua(e,t){e.innerHTML=t.map(a=>`<p>${a}</p>`).join("")+'<p class="ag-letter-sign">— Fionn 🍀</p>',e.style.animation="none",e.getBoundingClientRect(),e.style.animation=""}function _a(){const e=l("#ag-letter-overlay");if(!e)return;e.hidden=!1,e.focus(),S([20,60,20]),Si();const t=l("#ag-letter-photo");if(t&&g.photos&&g.photos.length){const a=Ie(),n=a.length?a[Math.floor(Math.random()*a.length)]:null;n&&(t.src=n.url,t.hidden=!1)}Ti()}async function Ti(){var n;const e=l("#ag-letter-body");if(!e)return;Ei(e);const t=(n=g.quest)==null?void 0:n.proxyUrl;if(t)try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({type:"letter"})});if(r.ok){const i=await r.json();if(i.paragraphs&&i.paragraphs.length){Ua(e,i.paragraphs);return}}}catch{}const a=La[Math.floor(Math.random()*La.length)];Ua(e,a)}function Et(){const e=l("#ag-letter-overlay");e&&(e.hidden=!0)}let Tt=null;function Ci(){if(!Tt)try{Tt=new(window.AudioContext||window.webkitAudioContext)}catch{}return Tt}function Li(){try{return window.localStorage.getItem(Ar)!=="off"}catch{return!0}}function q(e,t,a,n,r=.15,i="sine"){const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type=i,o.frequency.value=t;const d=e.currentTime+a;s.gain.setValueAtTime(0,d),s.gain.linearRampToValueAtTime(r,d+.012),s.gain.exponentialRampToValueAtTime(1e-4,d+n),o.start(d),o.stop(d+n+.05)}function Qe(e){if(!Li())return;const t=Ci();if(t)switch(t.state==="suspended"&&t.resume().catch(()=>{}),e){case"quiet":q(t,280,0,.18,.08,"sine"),q(t,210,.12,.22,.06,"sine");break;case"cursed":q(t,220,0,.12,.1,"triangle"),q(t,170,.09,.28,.07,"triangle");break;case"uncommon":q(t,523,0,.14,.14,"sine"),q(t,784,.1,.22,.12,"sine");break;case"rare":q(t,523,0,.12,.14,"sine"),q(t,659,.09,.12,.14,"sine"),q(t,1047,.18,.3,.12,"sine");break;case"jackpot":[523,659,784,1047,1319].forEach((a,n)=>q(t,a,n*.09,.18,.13,"sine")),q(t,2093,.4,.4,.04,"sine");break;case"special":[523,659,784,1047,1319,1568].forEach((a,n)=>q(t,a,n*.08,.16,.13,"sine")),q(t,2093,.45,.5,.05,"sine");break;default:q(t,523,0,.12,.13,"sine"),q(t,659,.09,.18,.1,"sine");break}}function Ai(e){if(!e||e<=0)return null;const t=[[8849,"Everest"],[4478,"Matterhorn"],[3692,"Titlis"],[2415,"Säntis"],[1897,"Pilatus"],[1782,"Rigi"],[869,"Üetliberg"],[668,"Grosse Mythen"]];for(const[a,n]of t){const r=e/a;if(r>=.7)return`≈ ${r>=2?Math.round(r):(Math.round(r*10)/10).toString().replace(".",",")}× ${n}`}return null}function zi(e){if(!e||!e.includes("alltrails.com"))return null;const t=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?([^?#]+)/);if(!t)return null;let a=t[1].replace(/\/$/,"");a=a.replace(/^(?:wanderweg|sentier|sendero|percorso|trilha|rutt|sti|stezka|tura|spor|trase|traseu|wandeling|ruta)\//,"trail/");const n={"schweiz/":"switzerland/","deutschland/":"germany/","österreich/":"austria/","frankreich/":"france/","italien/":"italy/","spanien/":"spain/","niederlande/":"netherlands/","suisse/":"switzerland/","svizzera/":"switzerland/","suiza/":"switzerland/"};for(const[r,i]of Object.entries(n))if(a.startsWith("trail/"+r)){a="trail/"+i+a.slice(6+r.length);break}return!a.startsWith("trail/")||a.split("/").length<3?null:a}function Ii(e){if(!e||!e.includes("alltrails.com"))return null;function t(r){const i=r.indexOf("?"),o=i===-1?r:r.slice(0,i),s=i===-1?"":r.slice(i+1),d=new URLSearchParams(s);return d.set("scrollZoom","false"),d.set("u","m"),d.set("elevationDiagram","false"),o+"?"+d.toString()}if(e.includes("/widget/"))return t(e);const a=e.match(/alltrails\.com\/(?:[a-z]{2}\/)?(?:explore\/)?recording\/([^?#/]+)/);if(a){const r=e.match(/[?&]sh=([^&#]+)/),i=r?`&sh=${r[1]}`:"";return t(`https://www.alltrails.com/widget/recording/${a[1]}?scrollZoom=false&u=m${i}`)}const n=zi(e);return n?t(`https://www.alltrails.com/widget/${n}?scrollZoom=false&u=m`):null}function Ct(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,...t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}))}function Mi(e){const t=Fe();t.unshift(e),We(t),Ct("gipfel-upsert",{...e,createdAt:new Date().toISOString()})}function $i(e){We(Fe().filter(t=>t.id!==e)),Ct("gipfel-delete",{id:e})}function Di(e,t){const a=Fe(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,We(a),Ct("gipfel-upsert",r)}function Ni(e){const t=document.createElement("div");t.className="ag-card ag-gipfel-card",t.dataset.agGipfelId=e.id;const a=e.activityUrl?da(e.activityUrl):null,n=e.activityUrl&&e.activityUrl.includes("alltrails.com"),r=n?Ii(e.activityUrl):null,i=e.cover?`<div class="ag-gipfel-cover"><img src="${e.cover}" alt="${e.name||""}" loading="lazy"></div>`:"",o=e.elevGain||e.elevation,s=e.distance?`${e.distance} km`:"",d=e.activityUrl?`<a class="ag-gipfel-trail-arrow" href="${e.activityUrl}" target="_blank" rel="noopener noreferrer">↗</a>`:"",c=s||d?`<div class="ag-gipfel-stats">${s}${s&&d?" ":""}${d}</div>`:"";t.innerHTML=`
    ${i}
    <div class="ag-gipfel-head">
      <div class="ag-gipfel-head-info">
        <div class="ag-gipfel-date">${la(e.date)}</div>
        <div class="ag-gipfel-name">${e.name||"—"}</div>
      </div>
      ${o?`<div class="ag-gipfel-elev">↑ ${Oe(o)}</div>`:""}
      <div class="ag-gipfel-actions">
        <button class="ag-gipfel-edit" type="button" data-ag-gipfel-edit="${e.id}" aria-label="Bearbeiten" title="Bearbeiten">✏️</button>
        <button class="ag-gipfel-delete" type="button" data-ag-gipfel-delete="${e.id}" aria-label="Löschen" title="Löschen">✕</button>
      </div>
    </div>
    ${c}
    ${e.notes?`<p class="ag-gipfel-notes">${e.notes}</p>`:""}
    ${a?`<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-komoot="${a}">🗺 Komoot-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-komoot="${a}" hidden></div>`:""}
    ${n&&r?'<div class="ag-gipfel-embed-row"><button class="ag-secondary ag-gipfel-map-btn" type="button" data-ag-map-alltrails="true">🗺 AllTrails-Karte</button></div><div class="ag-gipfel-map-preview" data-ag-map-wrap-alltrails="true" hidden></div>':""}
  `;const p=t.querySelector("[data-ag-gipfel-edit]");p&&p.addEventListener("click",()=>{var ie;const m=l("[data-ag-berge-form]"),v=l("[data-ag-berge-add]");if(!m)return;const f=l("[data-ag-berge-edit-id]");f&&(f.value=e.id);const x=l("[data-ag-berge-name]");x&&(x.value=e.name||"");const C=l("[data-ag-berge-dist]");C&&(C.value=e.distance||"");const T=l("[data-ag-berge-gain]");T&&(T.value=e.elevGain||e.elevation||"");const M=l("[data-ag-berge-date]");M&&(M.value=e.date||"");const V=l("[data-ag-berge-url]");V&&(V.value=e.activityUrl||"");const H=l("[data-ag-berge-cover]");H&&(H.value=e.cover||"");const ee=l("[data-ag-berge-notes]");ee&&(ee.value=e.notes||"");const xe=l("[data-ag-berge-lat]");xe&&(xe.value=e.lat||"");const Be=l("[data-ag-berge-lng]");Be&&(Be.value=e.lng||"");const we=l("[data-ag-berge-loc-label]");we&&(we.value=e.locLabel||"");const Pe=l("[data-ag-loc-search]");Pe&&(Pe.value=e.locLabel||"");const qe=l("[data-ag-berge-form-title]");qe&&(qe.textContent="Eintrag bearbeiten");const Ue=l("[data-ag-berge-save] span:last-child");Ue&&(Ue.textContent="Speichern"),m.hidden=!1,v&&(v.hidden=!0),(ie=l("[data-ag-sheet-backdrop]"))==null||ie.classList.add("is-open"),m.scrollIntoView({behavior:"smooth",block:"nearest"}),x&&x.focus(),S(8)});const y=t.querySelector("[data-ag-gipfel-delete]");y&&y.addEventListener("click",()=>{window.confirm(`„${e.name}" löschen?`)&&($i(e.id),Me(),S(8),Promise.resolve().then(()=>ro).then(m=>m.showToast("Eintrag gelöscht")).catch(()=>{}))});const b=t.querySelector("[data-ag-map-komoot]");b&&b.addEventListener("click",()=>{const m=t.querySelector(`[data-ag-map-wrap-komoot="${a}"]`);if(m){if(!m.hidden){m.hidden=!0,b.textContent="🗺 Komoot-Karte";return}m.innerHTML=`<iframe src="https://www.komoot.com/tour/${a}/embed?profile=1" height="220" frameborder="0" scrolling="no" loading="lazy" title="Komoot Tour" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,b.textContent="Karte schließen",S(4)}});const h=t.querySelector("[data-ag-map-alltrails]");return h&&r&&h.addEventListener("click",()=>{const m=t.querySelector("[data-ag-map-wrap-alltrails]");if(m){if(!m.hidden){m.hidden=!0,h.textContent="🗺 AllTrails-Karte";return}m.innerHTML=`<iframe src="${r}" height="220" frameborder="0" scrolling="no" title="AllTrails Route" style="display:block;width:100%;border:0;border-radius:8px"></iframe>`,m.hidden=!1,h.textContent="Karte schließen",S(4)}}),t}function Me(){const e=l("[data-ag-berge-list]"),t=l("[data-ag-berge-empty]"),a=l("[data-ag-berge-total]"),n=l("[data-ag-berge-analogy]");if(!e)return;const r=Fe().sort((o,s)=>{const d=o.date||"",c=s.date||"";return c<d?-1:c>d?1:0});e.innerHTML="";const i=r.reduce((o,s)=>o+(Number(s.elevGain)||Number(s.elevation)||0),0);if(a&&(a.textContent=i>0?Oe(i):"— m"),n){const o=Ai(i);o?(n.textContent=o,n.hidden=!1):n.hidden=!0}if(!r.length){t&&(t.hidden=!1),Oa([]);return}t&&(t.hidden=!0),r.forEach(o=>e.appendChild(Ni(o))),Oa(r)}function Bi(e){const t=e.querySelector("[data-ag-loc-search]"),a=e.querySelector("[data-ag-loc-dropdown]");if(!t||!a)return;let n=null;function r(){const i=e.querySelector("[data-ag-berge-lat]"),o=e.querySelector("[data-ag-berge-lng]"),s=e.querySelector("[data-ag-berge-loc-label]");i&&(i.value=""),o&&(o.value=""),s&&(s.value=""),a.hidden=!0,a.innerHTML=""}t.addEventListener("input",()=>{clearTimeout(n);const i=t.value.trim();if(!i){r();return}n=setTimeout(async()=>{try{const o=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=5&addressdetails=1`,d=await(await fetch(o,{headers:{"User-Agent":"affections-gacha/1.0"}})).json();if(a.innerHTML="",!d.length){a.hidden=!0;return}d.forEach(c=>{const p=document.createElement("button");p.type="button",p.className="ag-location-result",p.textContent=c.display_name,p.addEventListener("click",()=>{const y=e.querySelector("[data-ag-berge-lat]"),b=e.querySelector("[data-ag-berge-lng]"),h=e.querySelector("[data-ag-berge-loc-label]");y&&(y.value=c.lat),b&&(b.value=c.lon),h&&(h.value=c.display_name),t.value=c.display_name,a.hidden=!0,a.innerHTML=""}),a.appendChild(p)}),a.hidden=!1}catch{a.hidden=!0}},300)}),document.addEventListener("click",i=>{!t.contains(i.target)&&!a.contains(i.target)&&(a.hidden=!0)})}function Pi(){Bi(E)}let G=null,Xe=null;function ja(){G&&setTimeout(()=>G.invalidateSize(),150)}async function qi(){window.L||await new Promise((e,t)=>{const a=document.createElement("link");a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(a);const n=document.createElement("script");n.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",n.onload=e,n.onerror=t,document.head.appendChild(n)})}async function Oa(e){const t=l("[data-ag-gipfel-map-section]");if(!t)return;const a=e.filter(s=>s.lat&&s.lng);if(!a.length){t.hidden=!0;return}t.hidden=!1;try{await qi()}catch{return}const n=window.L,r=document.getElementById("ag-gipfel-map");if(!r)return;const i=[[45.8,5.9],[47.8,10.5]],o=[[35,-11],[71,32]];if(!G){G=n.map(r).fitBounds(i),n.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:'© <a href="https://www.openstreetmap.org">OSM</a> © <a href="https://carto.com">CARTO</a>',subdomains:"abcd",maxZoom:19}).addTo(G);const s=t.querySelectorAll("[data-map-view]");s.forEach(d=>{d.addEventListener("click",()=>{s.forEach(p=>p.classList.remove("is-active")),d.classList.add("is-active");const c=d.dataset.mapView==="eu"?o:i;G.fitBounds(c)})})}Xe?Xe.clearLayers():Xe=n.layerGroup().addTo(G),a.forEach(s=>{const d=n.circleMarker([parseFloat(s.lat),parseFloat(s.lng)],{radius:8,fillColor:"#7ecfa3",color:"#1a4a2c",weight:2,fillOpacity:.9}),c=document.createElement("div");c.style.cssText="min-width:130px";const p=s.elevGain||s.elevation;c.innerHTML=`
      <div style="font-weight:700;margin-bottom:4px;font-size:.92rem">${s.name||"—"}</div>
      ${p?`<div style="font-size:.8rem;opacity:.7;margin-bottom:6px">↑ ${Oe(p)}</div>`:""}
    `;const y=document.createElement("button");y.type="button",y.textContent="Zum Eintrag",y.style.cssText="background:rgba(47,122,79,.3);border:1px solid rgba(126,207,163,.4);color:#7ecfa3;border-radius:6px;padding:4px 10px;font-size:.78rem;cursor:pointer;font-family:inherit;width:100%",y.addEventListener("click",()=>{d.closePopup();const b=E.querySelector(`[data-ag-gipfel-id="${s.id}"]`);b&&(b.scrollIntoView({behavior:"smooth",block:"center"}),b.classList.add("ag-gipfel-highlight"),setTimeout(()=>b.classList.remove("ag-gipfel-highlight"),1200))}),c.appendChild(y),d.bindPopup(c),Xe.addLayer(d)}),requestAnimationFrame(()=>{G&&G.invalidateSize()}),setTimeout(()=>{G&&G.invalidateSize()},250)}const Ra=[{timeMs:2e4,good:10,bad:8,speedMin:3.2,speedMax:3.7},{timeMs:17e3,good:10,bad:12,speedMin:3,speedMax:3.7},{timeMs:14500,good:12,bad:18,speedMin:2.8,speedMax:3.6},{timeMs:12200,good:14,bad:20,speedMin:2.6,speedMax:3.3},{timeMs:10200,good:14,bad:25,speedMin:1.45,speedMax:2.05},{timeMs:8500,good:16,bad:25,speedMin:1.3,speedMax:1.85},{timeMs:7e3,good:18,bad:28,speedMin:1.15,speedMax:1.65},{timeMs:5800,good:20,bad:30,speedMin:1,speedMax:1.45},{timeMs:4700,good:22,bad:30,speedMin:.9,speedMax:1.25},{timeMs:3800,good:30,bad:30,speedMin:.4,speedMax:.8}];function Ga(e){return Ra[Math.min(e-1,Ra.length-1)]}function pe(e,t){return e+Math.random()*(t-e)}function Ha(){const e=l("#ag-baerlauch-level");e&&(e.textContent=`Level ${g.baerlauch.level}`)}function $e(){g.baerlauch.timerId&&(clearInterval(g.baerlauch.timerId),g.baerlauch.timerId=null)}function Fa(e){const t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");o&&(o.hidden=!0),$e(),g.baerlauch.locked=!0,t&&(t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness" style="opacity:.78"></div>'),n&&(n.hidden=!0),r&&(r.innerHTML=""),i&&(i.textContent=""),a&&(a.hidden=!1,a.style.color="#fff",a.textContent=e==="timeout"?"Es wurde zu dunkel, und wir hatten natürlich keine Stirnlampen dabei. Jetzt ist es vorbei.":"Oops. Ich fürchte, wir haben toten Lauch oder etwas Giftiges gesammelt und sind tragisch eingegangen. Jetzt ist es vorbei."),Wa(R(),g.baerlauch.level,!1),At()}function Ui(){const e=l("#ag-baerlauch-success"),t=l("#ag-baerlauch-reward"),a=l("#ag-baerlauch-photo"),n=l("#ag-baerlauch-text"),r=l("#ag-baerlauch-actions"),i=l("#ag-baerlauch-next");$e(),g.baerlauch.level+=1;const o=Oi(R(),g.baerlauch.level);if(Wa(R(),g.baerlauch.level,!0),At(),Ha(),o&&ne(),e&&(e.hidden=!1,e.textContent="Sehr stark. Du hast nur den guten Bärlauch gesammelt. 💚"),t&&a&&n&&g.photos&&g.photos.length){const s=Ie(),d=s.length?s[Math.floor(Math.random()*s.length)]:null;hn(a,d),t.hidden=!1;const c=["Du bist eindeutig mein Lieblingsfund.","Mit dir würde ich jederzeit wieder Bärlauch sammeln.","Sehr beruhigend, dass du uns nicht vergiftet hast.","Wald mit dir > fast alles andere.","Das war ausgesprochen sammel-kompetent von dir.","Ich würde mit dir auch poisoned Bärlauch essen. Aber bitte nicht.","Du sammelst Bärlauch so gut wie du alles andere machst.","Nächstes Mal bring ich Käse. Du bringst dich.","Ehrlich gesagt bin ich gekommen wegen dir, nicht wegen dem Lauch.","So stell ich mir perfekte Wochenenden vor — Wald, du, Bärlauch.","Rekord. Und du weißt genau, dass ich damit dich meine.","Botanik-Talent plus gute Gesellschaft. Was will man mehr.","Wenn das hier ein Film wäre, würde jetzt Credit-Musik laufen.","Pesto später? Verdient."];n.textContent=c[Math.floor(Math.random()*c.length)]}i&&(i.textContent=`Level ${g.baerlauch.level} starten`),r&&(r.hidden=!1)}function _i(e){const t=l("#ag-baerlauch-timer"),a=l("#ag-baerlauch-darkness"),r=Ga(g.baerlauch.level).timeMs;g.baerlauch.durationMs=r,g.baerlauch.startedAt=performance.now(),$e(),g.baerlauch.timerId=setInterval(()=>{const i=performance.now()-g.baerlauch.startedAt,o=Math.max(0,r-i),s=Math.min(1,i/r);t&&(t.textContent=(o/1e3).toFixed(1)),a&&(a.style.opacity=String(Math.pow(s,1.5)*.92));const d=document.querySelectorAll(".ag-forage-item"),c=Math.pow(s,1.4);d.forEach(p=>{p.style.filter=`brightness(${1-c*.72}) saturate(${1-c*.45}) hue-rotate(${c*8}deg)`,p.style.opacity=String(1-c*.28)}),o<=0&&($e(),e())},50)}function Lt(){const e=l("#ag-baerlauch-panel"),t=l("#ag-baerlauch-field"),a=l("#ag-baerlauch-success"),n=l("#ag-baerlauch-reward"),r=l("#ag-baerlauch-photo"),i=l("#ag-baerlauch-text"),o=l("#ag-baerlauch-actions");if(!e||!t||!a||!n||!r||!i)return;if(e.hidden=!1,At(),e.scrollIntoView({behavior:"smooth",block:"nearest"}),g.baerlauch.locked){a.hidden=!1,a.textContent="Diese Runde ist vorbei. Vielleicht nach einem Neuladen nochmal.";return}t.innerHTML='<div class="ag-forage-darkness" id="ag-baerlauch-darkness"></div>',a.hidden=!0,n.hidden=!0,r.innerHTML="",i.textContent="",o&&(o.hidden=!0),Ha();const s=Ga(g.baerlauch.level),d=["🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🌿","🌱","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🍀","🌿","🌱","🍃","🌿","🌱","🍀","🍃","🌿","🌱","🍃","🌿","🍀"],c=["🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","🥀","🌸","☠️","🧄","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","🍂","💀","🪦","🌾","🥀","🌸","🌸","🌸","🌸","🌸","🌸","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","☠️","☠️","☠️","☠️","☠️","☠️","☠️","🧄","🍂","💀","🪦","🌾","🥀","🌸","☠️","🧄","🍂","💀"],p=[...d.slice(0,s.good).map(h=>({emoji:h,good:!0})),...c.slice(0,s.bad).map(h=>({emoji:h,good:!1}))];let y=0;const b=p.filter(h=>h.good).length;p.forEach(h=>{const m=document.createElement("button");m.type="button",m.className="ag-forage-item",m.textContent=h.emoji,m.dataset.good=h.good?"true":"false",m.style.left=`${pe(8,82)}%`,m.style.top=`${pe(10,72)}%`,m.style.setProperty("--dx",`${pe(-320,320)}px`),m.style.setProperty("--dy",`${pe(-220,220)}px`),m.style.setProperty("--dur",`${pe(s.speedMin,s.speedMax)}s`),m.style.setProperty("--delay",`${pe(-1.8,0)}s`),m.addEventListener("click",()=>{g.baerlauch.locked||(m.dataset.good==="true"?(m.classList.add("is-picked"),m.disabled=!0,y+=1,setTimeout(()=>m.remove(),140),y===b&&Ui()):Fa("poison"))}),t.appendChild(m)}),_i(()=>Fa("timeout"))}function ji(){const e=l("#ag-baerlauch-panel");$e(),e&&(e.hidden=!0)}function Oi(e,t){var r;const a=ht(),n=(a[e]||0)<t;if(n){a[e]=t;try{localStorage.setItem("affektions-gacha:baerlauch-scores:v1",JSON.stringify(a))}catch{}const i=(r=g.backup)==null?void 0:r.endpointUrl;i&&fetch(i,{method:"POST",body:JSON.stringify({type:"baerlauch-score",player:e,level:t}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}return n}function Wa(e,t,a){var o;const n=ha(),r=((o=g.theme)==null?void 0:o.timezone)||"UTC",i=z(r);n.unshift({date:i,player:e,level:t,won:a}),n.length>50&&n.splice(50);try{localStorage.setItem("affektions-gacha:baerlauch-history:v1",JSON.stringify(n))}catch{}}function At(){var y;const e=l("#ag-baerlauch-scores");if(!e)return;const a=R()==="fionn"?"fionn":"lennart",n=a==="lennart"?"Fionn":"Lennart",r=ht(),i=ha(),o=a==="fionn"?"lennart":"fionn",s=a in r||o in r;if(!s&&!i.length){e.hidden=!0;return}e.hidden=!1;const d=((y=g.theme)==null?void 0:y.timezone)||"UTC",c=b=>{try{return new Intl.DateTimeFormat("de-CH",{day:"numeric",month:"short",timeZone:d}).format(new Date(b+"T12:00:00Z"))}catch{return b}};let p="";if(s){const b=r[a]??0,h=r[o]??0;p+=`<div class="ag-score-highscores">
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-mine">Du</span><span class="ag-score-result">Level ${b||"—"}</span></div>
      <div class="ag-score-row"><span class="ag-score-date">Bestleistung</span><span class="ag-score-pill ag-score-theirs">${n}</span><span class="ag-score-result">Level ${h||"—"}</span></div>
    </div>`}if(i.length){const b=i.slice(0,8).map(h=>{const m=h.player===a,v=m?"ag-score-mine":"ag-score-theirs",f=m?"Du":n,x=h.won?`✓ Level ${h.level}`:`✗ Level ${h.level-1>=1?h.level-1:"–"}`;return`<div class="ag-score-row"><span class="ag-score-date">${c(h.date)}</span><span class="ag-score-pill ${v}">${f}</span><span class="ag-score-result">${x}</span></div>`}).join("");p+=`<div class="ag-score-table">${b}</div>`}e.innerHTML=p}let N=null,Y=null,Z="swabian";function de(){try{return JSON.parse(window.localStorage.getItem(sa)||"[]")||[]}catch{return[]}}function et(e){try{window.localStorage.setItem(sa,JSON.stringify(e))}catch{}}function Ri(e){const t=de();t.unshift(e),et(t),zt("glossary-upsert",{...e,createdAt:new Date().toISOString()})}function Gi(e,t){const a=de(),n=a.findIndex(i=>i.id===e);if(n===-1)return;const r={...a[n],...t};a[n]=r,et(a),zt("glossary-upsert",r)}function Hi(e){et(de().filter(t=>t.id!==e)),zt("glossary-delete",{id:e})}async function Fi(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return 0;try{const t=I(),a=`${e.endpointUrl}?token=${encodeURIComponent(t)}`,n=new AbortController,r=setTimeout(()=>n.abort(),12e3);let i;try{i=await fetch(a,{cache:"no-store",signal:n.signal})}finally{clearTimeout(r)}if(!i.ok)return 0;const o=await i.json();if(!o.ok||!Array.isArray(o.glossary)||!o.glossary.length)return 0;const s=de(),d=new Map(s.map(c=>[c.id,c]));for(const c of o.glossary)c.id&&d.set(c.id,c);return et(Array.from(d.values())),o.glossary.length}catch{return 0}}function zt(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:e,token:I(),...t});fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>fetch(a.endpointUrl,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n}).catch(()=>{}))}async function It(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Wi(e,t){const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return It(e);try{const n=await It(e),r=n.split(",")[1],i=e.type||"audio/webm",o=JSON.stringify({type:"glossary-audio",token:I(),filename:`glossary-${t}.webm`,mimeType:i,data:r}),d=await(await fetch(a.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:o})).json();return d.ok&&d.url?d.url:n}catch{return It(e)}}const Ki={swabian:"Schwäbisch",portuguese:"Português",irish:"Gaeilge","deutsch-slang":"Deutsch Slang"};function Yi(e,t=!1){const a=document.createElement("div");a.className="ag-glossary-card",a.dataset.agGlossaryId=e.id;const n=t&&e.lang?`<span class="ag-glossary-lang-badge">${Ki[e.lang]||e.lang}</span>`:"";a.innerHTML=`
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
  `;const r=a.querySelector("[data-ag-glossary-play]");r&&e.audioUrl&&r.addEventListener("click",()=>{new Audio(e.audioUrl).play().catch(()=>{}),S(6)});const i=a.querySelector("[data-ag-glossary-edit]");i&&i.addEventListener("click",()=>{var b;const s=document.getElementById("ag-glossary-form"),d=document.getElementById("ag-glossary-add");if(!s)return;document.getElementById("ag-glossary-edit-id").value=e.id,document.getElementById("ag-glossary-word-input").value=e.word||"",document.getElementById("ag-glossary-meaning-input").value=e.meaning||"";const c=document.getElementById("ag-glossary-form-title");c&&(c.textContent="Wort bearbeiten");const p=document.getElementById("ag-glossary-save-label");p&&(p.textContent="Speichern");const y=document.getElementById("ag-glossary-audio-status");y&&(y.textContent=e.audioUrl?"Aufnahme vorhanden":""),Y=null,s.hidden=!1,d&&(d.hidden=!0),s.scrollIntoView({behavior:"smooth",block:"nearest"}),(b=document.getElementById("ag-glossary-word-input"))==null||b.focus(),S(8)});const o=a.querySelector("[data-ag-glossary-del]");return o&&o.addEventListener("click",()=>{window.confirm(`„${e.word}" löschen?`)&&(Hi(e.id),me(Z),S(8))}),a}function me(e){var o;Z=e||"swabian";const t=document.getElementById("ag-glossary-list"),a=document.getElementById("ag-glossary-empty");if(!t)return;document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(s=>{s.classList.toggle("is-active",s.dataset.lang===Z)}),Ka();const n=(((o=document.getElementById("ag-glossary-search"))==null?void 0:o.value)||"").trim().toLowerCase(),r=de(),i=n?r.filter(s=>(s.word||"").toLowerCase().includes(n)||(s.meaning||"").toLowerCase().includes(n)):r.filter(s=>s.lang===Z);if(t.innerHTML="",!i.length){a&&(a.textContent=n?"Kein Treffer.":"Noch kein Wort hier. Füg eins hinzu.",a.hidden=!1);return}a&&(a.hidden=!0),i.forEach(s=>t.appendChild(Yi(s,!!n)))}function Ka(){const e=document.getElementById("ag-glossary-pill"),t=document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab");if(!e||!t.length)return;const a=document.querySelector("#ag-glossary-tabs .ag-glossary-tab.is-active");a&&(e.style.transform=`translateX(${a.offsetLeft}px)`,e.style.width=`${a.offsetWidth}px`)}function Ya(){const e=document.getElementById("ag-glossary-panel");if(!e)return;e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),Z="swabian";const t=document.getElementById("ag-glossary-search");t&&(t.value=""),me("swabian"),window.requestAnimationFrame(()=>Ka()),S(10)}function Vi(){const e=document.getElementById("ag-glossary-panel");e&&(e.hidden=!0);const t=document.getElementById("ag-glossary-form");t&&(t.hidden=!0);const a=document.getElementById("ag-glossary-add");if(a&&(a.hidden=!1),Y=null,N&&N.state!=="inactive")try{N.stop()}catch{}N=null}const Ji=["--ag-bg","--ag-dark-bg"];function Va(e){const t=document.querySelector(".ag-widget");t&&(t.style.setProperty("--ag-bg",e),t.style.setProperty("--ag-dark-bg",e),Ja(e))}function Zi(){const e=document.querySelector(".ag-widget");e&&Ji.forEach(t=>e.style.removeProperty(t)),Ja(null)}function Mt(){try{const e=localStorage.getItem(gt);if(!e)return null;const t=JSON.parse(e),a=new Date().toISOString().slice(0,10);return t.day!==a?null:t.hex||null}catch{return null}}function Qi(e){const t=new Date().toISOString().slice(0,10);localStorage.setItem(gt,JSON.stringify({day:t,hex:e}))}function Xi(){localStorage.removeItem(gt)}function eo(){const e=Mt();e&&Va(e)}function Ja(e){const t=document.getElementById("ag-btn-stimmung");t&&(e?(t.classList.add("ag-chip-stimmung-set"),t.style.setProperty("--chip-dot-color",e)):(t.classList.remove("ag-chip-stimmung-set"),t.style.removeProperty("--chip-dot-color")))}function Za(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;e.hidden=!1;const t=Mt()||"#4aaa5a";ao(e,t),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function Qa(){const e=document.getElementById("ag-stimmung-panel");e&&(e.hidden=!0)}function to(){const e=document.getElementById("ag-stimmung-panel");if(!e)return;const t=e.querySelector("#ag-stimmung-picker"),a=e.querySelector("#ag-stimmung-hex"),n=e.querySelector("#ag-stimmung-apply"),r=e.querySelector("#ag-stimmung-reset");t&&t.addEventListener("input",()=>{a&&(a.value=t.value)}),a&&a.addEventListener("input",()=>{const i=Xa(a.value);i&&t&&(t.value=i)}),n&&n.addEventListener("click",()=>{const i=(t==null?void 0:t.value)||Xa((a==null?void 0:a.value)||"")||"#4aaa5a";Va(i),Qi(i),Qa()}),r&&r.addEventListener("click",()=>{Xi(),Zi()})}function ao(e,t){const a=e.querySelector("#ag-stimmung-picker"),n=e.querySelector("#ag-stimmung-hex");a&&(a.value=t),n&&(n.value=t)}function Xa(e){const t=e.trim(),a=t.startsWith("#")?t:`#${t}`;if(/^#[0-9a-fA-F]{6}$/.test(a))return a.toLowerCase();if(/^#[0-9a-fA-F]{3}$/.test(a)){const[,n,r,i]=a;return`#${n}${n}${r}${r}${i}${i}`.toLowerCase()}return null}const $t=[{title:"{name}s Kapsel wartet 🎲",body:"Heute noch keine Kapsel gezogen — zieh jetzt!"},{title:"Guten Morgen, {name} 🌿",body:"Deine tägliche Kapsel ist bereit."},{title:"Die Maschine dreht sich 🎲",body:"Du hast heute noch nicht gezogen — auf geht's!"},{title:"{name}s tägliche Kapsel ✨",body:"Eine neue Chance — die Maschine dreht sich."},{title:"Heute wartet etwas 🎲",body:"Die Kapsel des Tages ist für dich bereit."},{title:"Zeit für die Kapsel 🌿",body:"Zieh heute und sieh, was die Maschine bereithält."},{title:"Die Maschine ruft 🎰",body:"Deine Kapsel läuft nicht weg — aber der Tag schon."}],Dt=[{title:"{name}s Kapsel läuft ab! 🎲",body:"Noch 3 Stunden — dann ist sie weg für heute."},{title:"Nicht vergessen! 🎲",body:"Deine Kapsel wartet noch. Noch 3 Stunden bis Mitternacht."},{title:"Fast zu spät, {name}! 🌙",body:"21 Uhr — in 3 Stunden ist der Tag vorbei."},{title:"Die Maschine wartet auf dich 🎲",body:"Heute noch nicht gezogen. Auf geht's — es ist gleich zu spät."},{title:"{name}s Streak wackelt! 💎",body:"Noch 3 Stunden — dann ist der Streak in Gefahr."}];function fe(e){const t=E.querySelector("[data-ag-toasts]");if(!t)return;const a=document.createElement("div");a.className="ag-toast",a.textContent=e,t.appendChild(a),setTimeout(()=>{a.classList.add("is-leaving"),setTimeout(()=>a.remove(),300)},2400)}function De(e){g.activeTab=e,E.querySelectorAll("[data-ag-tab]").forEach(o=>{const s=o.dataset.agTab===e;o.classList.toggle("is-active",s),o.setAttribute("aria-selected",s?"true":"false")});const a=54,n=E.querySelector(".ag-bottomnav-btn.is-active"),r=E.querySelector(".ag-nav-pill");if(r&&n){const o=n.closest(".ag-bottomnav"),s=o?o.getBoundingClientRect():null,c=(n.querySelector(".ag-bottomnav-btn-icon")||n).getBoundingClientRect();if(s&&c.width){const p=c.left-s.left+c.width/2;r.style.width=`${a}px`,r.style.left=`${p-a/2}px`}}l("[data-ag-panel-today]").hidden=e!=="today",l("[data-ag-panel-history]").hidden=e!=="history",l("[data-ag-panel-lieblinge]").hidden=e!=="lieblinge",l("[data-ag-panel-berge]").hidden=e!=="berge",e==="history"&&X(),e==="lieblinge"&&ot(),e==="berge"&&(ja(),Je().then(()=>{Me(),ja()}).catch(()=>Me()));const i=l("[data-ag-fab]");i&&(i.hidden=e!=="berge")}function en(){const e=g.backup;if(!e||!e.enabled||!e.endpointUrl)return;const t=l("[data-ag-ping-send]"),a=l("[data-ag-ping-status]");t&&(t.disabled=!0),a&&(a.hidden=!1,a.textContent="Wird gesendet…",delete a.dataset.agHugState);const n=JSON.stringify({type:"ping",token:I(),pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(e.endpointUrl,r).then(i=>{a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)}).catch(()=>{fetch(e.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{}),a&&(a.textContent="Stups gesendet 👋",a.dataset.agHugState="ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)})}function he(e,t){const a=l("[data-ag-hug-status]");if(a){if(!e){a.hidden=!0,a.textContent="",delete a.dataset.agHugState;return}a.hidden=!1,a.textContent=e,t?a.dataset.agHugState=t:delete a.dataset.agHugState}}function tn(){const e=g.wishInbox,t=l("[data-ag-hug-send]"),a="🫂 Notfall-Umarmung gebraucht",n={timestamp:new Date().toISOString(),token:I(),type:"hug",event:"hug",wish:a,message:a,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""};if(!e||!e.enabled){he("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}const r=typeof e.endpointUrl=="string"?e.endpointUrl.trim():"";if(!r){he("Fionn wurde angestupst 🫂 (offline notiert)","ok");return}t&&(t.disabled=!0),he("Stups wird gesendet…","pending");const i=JSON.stringify(n),o=()=>{he("Fionn wurde angestupst 🫂","ok"),t&&window.setTimeout(()=>{t.disabled=!1},4e3)},s=()=>{he("Konnte gerade nicht gesendet werden – bitte gleich nochmal.","error"),t&&(t.disabled=!1)};fetch(r,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(d=>{d&&d.ok?o():s()}).catch(()=>{try{fetch(r,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:i}).then(o).catch(s)}catch{s()}})}function an(e){const t=I();if(t==="fionn")return;const a=g.wishInbox;if(!a||!a.enabled)return;const n=typeof a.endpointUrl=="string"?a.endpointUrl.trim():"";if(!n)return;const i=`🎟️ Gutschein eingelöst: ${e&&e.title?e.title:"Gutschein"}`,o={timestamp:new Date().toISOString(),token:t,type:"voucher",event:"voucher-redeemed",wish:i,message:i,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},s=JSON.stringify(o),d={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s};fetch(n,d).catch(()=>{fetch(n,{...d,mode:"no-cors"}).catch(()=>{})})}function Nt(e){const t=g.wishInbox;if(!t||!t.enabled)return;const a=typeof t.endpointUrl=="string"?t.endpointUrl.trim():"";if(!a)return;const n={timestamp:new Date(e.submittedAt||Date.now()).toISOString(),token:I(),wish:e.text,pageUrl:typeof window<"u"&&window.location?window.location.href:"",userAgent:typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:""},r=JSON.stringify(n),i=o=>{const s=mt();!s||s.week!==e.week||(ma({...s,remoteStatus:o,remoteUpdatedAt:Date.now()}),Rt())};i("pending"),fetch(a,{method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(o=>{o&&o.ok?i("sent"):i("failed")}).catch(()=>{try{fetch(a,{method:"POST",mode:"no-cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:r}).then(()=>i("sent")).catch(()=>i("failed"))}catch{i("failed")}})}function nn(){const e=mt();!e||e.week!==Re()||e.remoteStatus!=="sent"&&Nt(e)}async function rn(){if(!("Notification"in window)||Notification.permission==="granted"||Notification.permission==="denied")return;try{if(window.localStorage.getItem(ge)==="dismissed")return}catch{}let e="default";try{e=await Notification.requestPermission()}catch{}if(e==="granted"){try{window.localStorage.setItem(ge,"granted")}catch{}await at();return}if(e==="denied"){try{window.localStorage.setItem(ge,"dismissed")}catch{}return}const t=document.querySelector("[data-ag-notif-card]");t&&(t.hidden=!1,t.removeAttribute("hidden"))}function no(){var s;const e=((s=g.theme)==null?void 0:s.timezone)||"Europe/Zurich",t=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"2-digit",minute:"2-digit",hour12:!1}).format(new Date),[a,n]=t.split(":").map(Number),r=a*60+n,i=8*60,o=r<i?i-r:24*60-r+i;return Date.now()+o*60*1e3}async function tt(){var e;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const t=await navigator.serviceWorker.ready;if(!t.active)return;const a=((e=g.theme)==null?void 0:e.timezone)||"Europe/Zurich",n=I(),r=z(a);if(B().some(y=>y.token===n&&y.day===r)){t.active.postMessage({type:"CANCEL_NOTIFICATION",tag:"ag-streak-warn"});return}const{h:o,m:s}=je(a);if(o>=21)return;const d=((21-o)*60-s)*60*1e3-new Date().getSeconds()*1e3,c=Ne(),p=Dt[ut(Dt)];t.active.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-streak-warn",targetTime:Date.now()+Math.max(0,d),title:p.title.replace("{name}",c),body:p.body.replace("{name}",c)})}catch{}}async function on(){var e,t,a;if(!(!("serviceWorker"in navigator)||!("Notification"in window))&&Notification.permission==="granted")try{const n=await navigator.serviceWorker.ready,r=Ne(),i=$t[ut($t)];if((e=n.active)==null||e.postMessage({type:"SCHEDULE_NOTIFICATION",tag:"ag-daily",targetTime:no(),title:i.title.replace("{name}",r),body:i.body.replace("{name}",r)}),(t=g.quest)!=null&&t.enabled&&Ba()){const o=ze(),s=(()=>{try{return parseInt(localStorage.getItem("affektions-gacha:quest-notif:v1")||"-1",10)}catch{return-1}})();if(!o.solved&&s!==Ee(g)){try{localStorage.setItem("affektions-gacha:quest-notif:v1",String(Ee(g)))}catch{}(a=n.active)==null||a.postMessage({type:"SCHEDULE_NOTIFICATION",targetTime:Date.now()+500,title:g.quest.pushTitle||"Neue Foto-Aufgabe 📷",body:g.quest.pushBody||"Die Maschine hat eine neue Aufgabe für dich."})}}}catch{}}async function sn(){if("serviceWorker"in navigator)try{const e=await navigator.serviceWorker.ready;if(!("periodicSync"in e))return;await e.periodicSync.register("ag-daily-reminder",{minInterval:20*60*60*1e3})}catch{}}async function at(){if("serviceWorker"in navigator)try{const e=ga("sw.js");if(new URL(e).origin!==window.location.origin)return;await navigator.serviceWorker.register(e,{scope:new URL("./",e).pathname}),Notification.permission==="granted"&&(await on(),await tt(),await sn())}catch{}}async function ln(){const e=l("[data-ag-notif-card]");if(!("Notification"in window)){e&&(e.hidden=!0);return}const t=await Notification.requestPermission();if(e&&(e.hidden=!0),t!=="granted"){try{window.localStorage.setItem(ge,"dismissed")}catch{}return}try{window.localStorage.setItem(ge,"granted")}catch{}await at()}function Bt(e,t,a,n,r,i){if(typeof e.roundRect=="function")e.beginPath(),e.roundRect(t,a,n,r,i);else{const o=Array.isArray(i)?i:[i,i,i,i],[s,d,c,p]=o.map(y=>Math.min(y,n/2,r/2));e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+n-d,a),e.quadraticCurveTo(t+n,a,t+n,a+d),e.lineTo(t+n,a+r-c),e.quadraticCurveTo(t+n,a+r,t+n-c,a+r),e.lineTo(t+p,a+r),e.quadraticCurveTo(t,a+r,t,a+r-p),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}}function Pt(e,t,a){const n=t.split(" "),r=[];let i="";for(const o of n){const s=i?`${i} ${o}`:o;e.measureText(s).width>a&&i?(r.push(i),i=o):i=s}return i&&r.push(i),r}function dn(e){var V,H;const r=document.createElement("canvas"),i=Math.min(window.devicePixelRatio||1,2);r.width=640*i,r.height=340*i,r.style.width="640px",r.style.height="340px";const o=r.getContext("2d");o.scale(i,i);const s=e.category.id==="jackpot",d=s?"#2d1f00":"#0d2b1c",c=s?"#1a1000":"#061510",p=o.createLinearGradient(0,0,0,340);p.addColorStop(0,d),p.addColorStop(1,c),o.fillStyle=p,Bt(o,0,0,640,340,20),o.fill();const y=s?"#b9782e":"#2f7a4f";o.fillStyle=y,Bt(o,0,0,640,5,[20,20,0,0]),o.fill();const b=e.category.label,h=Ta(e.category.tone);o.font="bold 13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle=s?"#d4a24c":"#5aba7e",o.fillText(`${h} ${b}`,40,62);const m=e.day;o.font="13px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.45)";const v=o.measureText(m).width;o.fillText(m,600-v,62),o.strokeStyle="rgba(255,255,255,0.1)",o.lineWidth=1,o.beginPath(),o.moveTo(40,76),o.lineTo(600,76),o.stroke(),o.font="bold 24px Boska, Georgia, serif",o.fillStyle="#ffffff";const f=Pt(o,e.outcome.title,640-40*2);let x=108;for(const ee of f)o.fillText(ee,40,x),x+=32;o.font="15px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.72)";const C=Pt(o,e.outcome.message,640-40*2);x+=4;for(const ee of C){if(x>270)break;o.fillText(ee,40,x),x+=22}o.font="11px Satoshi, Inter, system-ui, sans-serif",o.fillStyle="rgba(255,255,255,0.25)";const T=((H=(V=g.theme)==null?void 0:V.brand)==null?void 0:H.machineName)||"Affektions-Gacha";o.fillText(T,40,324);const M=document.createElement("a");M.download=`gacha-${e.category.id}-${e.day}.png`,M.href=r.toDataURL("image/png"),M.click()}function qt(e){E.style.opacity="1",E.style.background="#0a1410",E.style.minHeight="100vh",E.style.display="flex",E.style.alignItems="center",E.style.justifyContent="center",E.style.padding="24px",E.innerHTML=`
    <div class="ag-error" style="background:#122018;border:1px solid #2a4a35;border-radius:18px;padding:24px;color:#c8e6c9;max-width:400px;width:100%">
      <h2 style="margin:0 0 8px;font-size:1.1rem">Die Maschine klemmt.</h2>
      <p style="margin:0 0 16px;opacity:.7;font-size:.9rem">${cn(e.message||String(e))}</p>
      <button onclick="location.reload()" style="background:#1e3d2a;border:1px solid #3a6a48;color:#8ecf9e;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:.9rem">Neu laden</button>
    </div>
  `}function cn(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function gn(){g.todaysPull||(g.todaysPull=di());const e=l("[data-ag-draw]"),t=l("[data-ag-button-text]"),a=g.theme.loadingSteps||["Maschine rattert"];let n=0;E.classList.add("is-revealing"),e.disabled=!0,t.textContent=a[n];const r=window.setInterval(()=>{n=Math.min(n+1,a.length-1),t.textContent=a[n]},Math.max(420,Math.floor((g.theme.revealDelayMs||3200)/a.length))),i=g.theme.revealDelayMs||3200,o=Array.from((l("[data-ag-emoji-orbit]")||{children:[]}).children),s=o.map(y=>parseFloat(y.style.getPropertyValue("--ag-emoji-duration"))||20),d=performance.now();let c;function p(y){const b=Math.min((y-d)/i,1),h=1+5*b*b;o.forEach((m,v)=>{m.style.setProperty("--ag-emoji-duration",`${(s[v]/h).toFixed(3)}s`)}),b<1&&(c=requestAnimationFrame(p))}c=requestAnimationFrame(p),window.setTimeout(()=>{var m,v,f,x;window.clearInterval(r),cancelAnimationFrame(c),o.forEach((C,T)=>{C.style.setProperty("--ag-emoji-duration",`${s[T].toFixed(2)}s`)}),g.todaysPull.collectToken&&(B().some(T=>T.day===g.todaysPull.day&&T.token===g.todaysPull.token)||Ur(g.todaysPull.collectToken)),yn(g.todaysPull),E.classList.remove("is-revealing"),E.classList.add("is-revealed"),E.classList.add("has-drawn"),e.disabled=!1,t.textContent=g.theme.brand.buttonShown,g.revealed=!0,Se()||To(g.todaysPull),tt();const y=J();nt(),mo(y);const b=(v=(m=g.todaysPull)==null?void 0:m.category)==null?void 0:v.id,h=(x=(f=g.todaysPull)==null?void 0:f.category)==null?void 0:x.tone;if(b==="special"){const C=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#da77f2","#f783ac","#fff"];ne(130,C),setTimeout(()=>ne(90,C),700),Qe("special")}else if(h==="jackpot"){const C=["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"];ne(120,C),setTimeout(()=>ne(80,C),650),Qe("jackpot")}else h==="rare"?(ne(70),Qe("rare")):Qe(h||"common");mn[y]?S([30,20,30,20,60]):S([20,20,40]),g.activeTab==="history"&&X(),rn()},g.theme.revealDelayMs||3200)}function un(){var An,zn,In,Mn,$n,Dn,Nn,Bn,Pn,qn,Un,_n,jn,On,Rn,Gn,Hn,Fn,Wn,Kn,Yn,Vn,Jn,Zn,Qn,Xn,er,tr,ar,nr,rr,ir,or,sr,lr,dr,cr;let e=null;const t=l("[data-ag-draw]");t.addEventListener("pointerdown",()=>{e=setTimeout(_a,3e3)}),t.addEventListener("pointerup",()=>clearTimeout(e)),t.addEventListener("pointerleave",()=>clearTimeout(e)),t.addEventListener("pointercancel",()=>clearTimeout(e));let a=0,n=null;l("[data-ag-main-title]").addEventListener("click",()=>{if(a++,clearTimeout(n),a>=5){a=0,_a();return}n=setTimeout(()=>{a=0},1800)}),l("[data-ag-draw]").addEventListener("click",()=>{S(12),gn()}),(An=l("#ag-btn-rave"))==null||An.addEventListener("click",()=>{window.open("https://rave-board.vercel.app/","_blank","noopener")}),(zn=l("#ag-btn-rave"))==null||zn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),window.open("https://rave-board.vercel.app/","_blank","noopener"))}),(In=l("#ag-btn-baerlauch"))==null||In.addEventListener("click",Lt),(Mn=l("#ag-baerlauch-close"))==null||Mn.addEventListener("click",ji),($n=l("#ag-baerlauch-next"))==null||$n.addEventListener("click",Lt),(Dn=l("#ag-btn-baerlauch"))==null||Dn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Lt())}),(Nn=l("#ag-btn-gesprach"))==null||Nn.addEventListener("click",Da),(Bn=l("#ag-btn-glossary"))==null||Bn.addEventListener("click",Ya),(Pn=l("#ag-btn-glossary"))==null||Pn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Ya())}),(qn=l("#ag-glossary-close"))==null||qn.addEventListener("click",Vi),(Un=document.getElementById("ag-glossary-refresh"))==null||Un.addEventListener("click",async()=>{const u=document.getElementById("ag-glossary-refresh");u&&(u.disabled=!0,u.textContent="⏳"),S(6);const w=await Fi();me(Z),u&&(u.textContent=w>0?`↻${w}`:"↻",setTimeout(()=>{u.textContent="↻",u.disabled=!1},3e3)),w>0&&fe(`${w} Wörter aktualisiert ✓`)}),document.querySelectorAll("#ag-glossary-tabs .ag-glossary-tab").forEach(u=>{u.addEventListener("click",()=>{const w=document.getElementById("ag-glossary-search");w&&(w.value=""),me(u.dataset.lang),S(4)})}),(_n=document.getElementById("ag-glossary-search"))==null||_n.addEventListener("input",()=>{me(Z)});const r=document.getElementById("ag-glossary-add"),i=document.getElementById("ag-glossary-form");r&&r.addEventListener("click",()=>{var L,$;if(!i)return;document.getElementById("ag-glossary-edit-id").value="",document.getElementById("ag-glossary-word-input").value="",document.getElementById("ag-glossary-meaning-input").value="";const u=document.getElementById("ag-glossary-form-title");u&&(u.textContent="Neues Wort");const w=document.getElementById("ag-glossary-save-label");w&&(w.textContent="Eintragen");const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent=""),Y=null;const A=document.getElementById("ag-glossary-play-preview");A&&(A.hidden=!0),i.hidden=!1,r.hidden=!0,(L=l("[data-ag-sheet-backdrop]"))==null||L.classList.add("is-open"),($=document.getElementById("ag-glossary-word-input"))==null||$.focus(),S(8)}),(jn=document.getElementById("ag-glossary-form-cancel"))==null||jn.addEventListener("click",()=>{var u;if(i&&(i.hidden=!0),r&&(r.hidden=!1),(u=l("[data-ag-sheet-backdrop]"))==null||u.classList.remove("is-open"),document.getElementById("ag-glossary-edit-id").value="",Y=null,N&&N.state!=="inactive")try{N.stop()}catch{}N=null,S(6)}),(On=document.getElementById("ag-glossary-form-save"))==null||On.addEventListener("click",async()=>{var $,D,j,oe;const u=((($=document.getElementById("ag-glossary-word-input"))==null?void 0:$.value)||"").trim(),w=(((D=document.getElementById("ag-glossary-meaning-input"))==null?void 0:D.value)||"").trim(),k=(((j=document.getElementById("ag-glossary-edit-id"))==null?void 0:j.value)||"").trim();if(!u){(oe=document.getElementById("ag-glossary-word-input"))==null||oe.focus();return}const A=document.getElementById("ag-glossary-audio-status");let L=null;if(Y){A&&(A.textContent="Wird hochgeladen…");const F=k||`${Date.now()}-${Math.random().toString(36).slice(2,6)}`;L=await Wi(Y,F)}if(S([20,20,40]),k){const F={word:u,meaning:w||null};L!==null&&(F.audioUrl=L),Gi(k,F)}else Ri({id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`,lang:Z,word:u,meaning:w||null,audioUrl:L,token:I()});i&&(i.hidden=!0),r&&(r.hidden=!1),document.getElementById("ag-glossary-edit-id").value="",Y=null,N=null,me(Z),fe("Wort gespeichert ✓")});const o=document.getElementById("ag-glossary-record");o&&o.addEventListener("click",async()=>{if(N&&N.state==="recording"){N.stop();return}try{const u=await navigator.mediaDevices.getUserMedia({audio:!0}),w=[];N=new MediaRecorder(u),N.ondataavailable=A=>{A.data.size>0&&w.push(A.data)},N.onstop=()=>{u.getTracks().forEach($=>$.stop()),Y=new Blob(w,{type:N.mimeType||"audio/webm"});const A=document.getElementById("ag-glossary-audio-status");A&&(A.textContent="✓ Aufnahme bereit");const L=document.getElementById("ag-glossary-play-preview");L&&(L.hidden=!1),o.textContent="🎙 Neu aufnehmen"},N.start(),o.textContent="⏹ Stop";const k=document.getElementById("ag-glossary-audio-status");k&&(k.textContent="● REC"),S(10)}catch{const w=document.getElementById("ag-glossary-audio-status");w&&(w.textContent="Mikrofon nicht verfügbar")}}),(Rn=document.getElementById("ag-glossary-play-preview"))==null||Rn.addEventListener("click",()=>{if(!Y)return;const u=URL.createObjectURL(Y),w=new Audio(u);w.onended=()=>URL.revokeObjectURL(u),w.play().catch(()=>{})}),(Gn=l("#ag-btn-mission"))==null||Gn.addEventListener("click",$a),(Hn=l("#ag-btn-mission"))==null||Hn.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),$a())}),(Fn=l("#ag-mission-close"))==null||Fn.addEventListener("click",hi),(Wn=l("#ag-mission-done"))==null||Wn.addEventListener("click",()=>{ci();const u=l("#ag-mission-actions"),w=l("#ag-mission-feedback"),k=l("#ag-mission-done-note"),A=l("#ag-btn-mission");u&&(u.hidden=!0),k&&(k.hidden=!1),w&&!Ma()&&(w.hidden=!1),A&&A.classList.remove("ag-chip-mission-active")}),(Kn=l("#ag-mission-panel"))==null||Kn.querySelectorAll(".ag-mission-rate-btn").forEach(u=>{u.addEventListener("click",()=>{var w;(w=l("#ag-mission-panel"))==null||w.querySelectorAll(".ag-mission-rate-btn").forEach(k=>k.classList.remove("is-selected")),u.classList.add("is-selected")})}),(Yn=l("#ag-mission-feedback-send"))==null||Yn.addEventListener("click",()=>{var $;const u=l("#ag-mission-panel"),w=u==null?void 0:u.querySelector(".ag-mission-rate-btn.is-selected"),k=(w==null?void 0:w.dataset.rating)||null,A=((($=l("#ag-mission-comment"))==null?void 0:$.value)||"").trim();ui(k,A);const L=l("#ag-mission-feedback-sent");u==null||u.querySelectorAll(".ag-mission-rating, .ag-mission-comment, .ag-mission-feedback-send, .ag-mission-feedback-label").forEach(D=>{D.hidden=!0}),L&&(L.hidden=!1)}),(Vn=l("#ag-letter-close"))==null||Vn.addEventListener("click",Et),(Jn=l("#ag-letter-overlay"))==null||Jn.addEventListener("click",u=>{u.target===u.currentTarget&&Et()}),(Zn=l("#ag-lightbox-close"))==null||Zn.addEventListener("click",()=>{Ot()}),(Qn=l("#ag-lightbox"))==null||Qn.addEventListener("click",u=>{u.target===u.currentTarget&&Ot()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&(Et(),Ot())}),(Xn=l("#ag-gesprach-close"))==null||Xn.addEventListener("click",bi),(er=l("#ag-gesprach-next"))==null||er.addEventListener("click",Na),(tr=l("#ag-gesprach-wa"))==null||tr.addEventListener("click",yi),(ar=l("#ag-btn-gesprach"))==null||ar.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Da())}),(nr=l("#ag-btn-quest"))==null||nr.addEventListener("click",Pa),(rr=l("#ag-quest-close"))==null||rr.addEventListener("click",vi),(ir=l("#ag-btn-quest"))==null||ir.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Pa())}),(or=l("#ag-quest-file"))==null||or.addEventListener("change",u=>{const w=u.target.files&&u.target.files[0];w&&xi(w)}),l("[data-ag-copy]").addEventListener("click",async()=>{if(!g.todaysPull)return;S(8);const u=bn(g.todaysPull);try{await navigator.clipboard.writeText(u),l("[data-ag-copy]").textContent="Kopiert",window.setTimeout(()=>{l("[data-ag-copy]").textContent="Resultat kopieren"},1400)}catch{window.prompt("Resultat kopieren:",u)}}),l("[data-ag-save-img]").addEventListener("click",()=>{g.todaysPull&&(S(8),dn(g.todaysPull))}),l("[data-ag-star]").addEventListener("click",()=>{S(8),Eo(g.todaysPull)});const s=l("[data-ag-recover-btn]");s&&s.addEventListener("click",()=>{s.textContent="⏳",s.disabled=!0;const u=Do();X(),nt(),s.textContent=u>0?`↺${u}`:"✓",setTimeout(()=>{s.textContent="↺",s.disabled=!1},3e3)});const d=l("[data-ag-streak-restore]");d&&d.addEventListener("click",()=>{if(!wa()){_t();return}const u=xt(),w=vt(),A=Ve()>0&&w-Ve()<=0?`🎂 Geburtstagsgeschenk! Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen?`:`Verpassten Tag (${u}) auffüllen und deinen Streak wiederherstellen? Du hast danach noch ${w-1} Streak-Retter übrig.`;if(!window.confirm(A))return;d.disabled=!0;const $=Yr();X(),nt(),$&&(ne(110,["#ffd700","#ffb300","#ffe066","#fff0a0","#f0a000","#fff","#e8c87a"]),S([30,20,30,20,60])),_t(),d.disabled=!1});const c=l("[data-ag-sync-btn]");c&&c.addEventListener("click",async()=>{c.textContent="⏳",c.disabled=!0;const u=await Je();X(),c.textContent=u<0?"✗":`✓${u}`,setTimeout(()=>{c.textContent="☁",c.disabled=!1},3e3)}),E.querySelectorAll("[data-ag-history-filter] [data-ag-filter]").forEach(u=>{u.addEventListener("click",()=>{S(5),io(u.dataset.agFilter)})}),E.querySelectorAll("[data-ag-tab]").forEach(u=>{u.addEventListener("click",()=>{S(6),De(u.dataset.agTab)})});const p=E.querySelector(".ag-bottomnav");if(p){const u=p.querySelector(".ag-nav-pill"),w=[...p.querySelectorAll(".ag-bottomnav-btn[data-ag-tab]")];let k=null;p.addEventListener("pointerdown",L=>{const $=p.getBoundingClientRect();p.setPointerCapture(L.pointerId);const D=parseFloat(u==null?void 0:u.style.width)||54;k={id:L.pointerId,startX:L.clientX-$.left,pillStartCentre:(parseFloat(u==null?void 0:u.style.left)||0)+D/2,pillWidth:D,moved:!1,suppress:!1}}),p.addEventListener("pointermove",L=>{if(!k||L.pointerId!==k.id)return;const $=p.getBoundingClientRect(),D=L.clientX-$.left-k.startX;if(!k.moved&&Math.abs(D)<6||(k.moved=!0,k.suppress=!0,!u))return;u.style.transition="none";const j=p.getBoundingClientRect(),oe=k.pillStartCentre+D,F=k.pillWidth/2;let O=oe-F;O<0?O=O*.25:O+k.pillWidth>j.width&&(O=j.width-k.pillWidth+(O+k.pillWidth-j.width)*.25),u.style.left=`${O}px`});const A=L=>{if(!k||L.pointerId!==k.id)return;const $=k.moved,D=k.suppress;if(k=null,u&&(u.style.transition=""),!$)return;const j=p.getBoundingClientRect(),oe=L.clientX-j.left;let F=w[0],O=1/0;if(w.forEach(ce=>{const se=ce.getBoundingClientRect(),dt=se.left-j.left+se.width/2,_e=Math.abs(oe-dt);_e<O&&(O=_e,F=ce)}),S(6),De(F.dataset.agTab),D){const ce=se=>{se.stopImmediatePropagation(),se.preventDefault()};p.addEventListener("click",ce,{capture:!0,once:!0})}};p.addEventListener("pointerup",A),p.addEventListener("pointercancel",L=>{!k||L.pointerId!==k.id||(k=null,u&&(u.style.transition=""),De(g.activeTab))})}(sr=l("#ag-btn-stimmung"))==null||sr.addEventListener("click",Za),(lr=l("#ag-btn-stimmung"))==null||lr.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),Za())}),(dr=l("#ag-stimmung-close"))==null||dr.addEventListener("click",Qa),to();const y=l("[data-ag-berge-add]"),b=l("[data-ag-berge-form]"),h=l("[data-ag-berge-cancel]"),m=l("[data-ag-berge-save]");y&&y.addEventListener("click",()=>{var w,k;S(8);const u=l("[data-ag-berge-date]");u&&!u.value&&(u.value=z(((w=g.theme)==null?void 0:w.timezone)||"Europe/Zurich")),b.hidden=!1,y.hidden=!0,(k=l("[data-ag-sheet-backdrop]"))==null||k.classList.add("is-open"),l("[data-ag-berge-name]").focus()}),h&&h.addEventListener("click",()=>{var L;S(6),b.hidden=!0,y.hidden=!1,(L=l("[data-ag-sheet-backdrop]"))==null||L.classList.remove("is-open"),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach($=>{const D=l($);D&&(D.value="")});const u=l("[data-ag-loc-search]");u&&(u.value="");const w=l("[data-ag-loc-dropdown]");w&&(w.hidden=!0,w.innerHTML="");const k=l("[data-ag-berge-form-title]");k&&(k.textContent="Neuer Gipfeleintrag");const A=l("[data-ag-berge-save] span:last-child");A&&(A.textContent="Eintragen")}),m&&m.addEventListener("click",()=>{var gr,ur,pr,mr,fr,hr,br,yr,vr,xr,wr,kr,Sr,Er;const u=(((gr=l("[data-ag-berge-name]"))==null?void 0:gr.value)||"").trim(),w=parseFloat(((ur=l("[data-ag-berge-dist]"))==null?void 0:ur.value)||""),k=parseInt(((pr=l("[data-ag-berge-gain]"))==null?void 0:pr.value)||"",10),A=((mr=l("[data-ag-berge-date]"))==null?void 0:mr.value)||z(((fr=g.theme)==null?void 0:fr.timezone)||"Europe/Zurich"),L=(((hr=l("[data-ag-berge-url]"))==null?void 0:hr.value)||"").trim(),$=(((br=l("[data-ag-berge-cover]"))==null?void 0:br.value)||"").trim(),D=(((yr=l("[data-ag-berge-notes]"))==null?void 0:yr.value)||"").trim(),j=(((vr=l("[data-ag-berge-edit-id]"))==null?void 0:vr.value)||"").trim(),oe=(((xr=l("[data-ag-berge-lat]"))==null?void 0:xr.value)||"").trim()||null,F=(((wr=l("[data-ag-berge-lng]"))==null?void 0:wr.value)||"").trim()||null,O=(((kr=l("[data-ag-berge-loc-label]"))==null?void 0:kr.value)||"").trim()||null;if(!u){(Sr=l("[data-ag-berge-name]"))==null||Sr.focus();return}S([20,20,40]);const ce={name:u,elevation:null,distance:isNaN(w)?null:w,elevGain:isNaN(k)?null:k,date:A,activityUrl:L||null,cover:$||null,notes:D||null,lat:oe,lng:F,locLabel:O};j?Di(j,ce):Mi({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,...ce,token:I()}),["[data-ag-berge-edit-id]","[data-ag-berge-name]","[data-ag-berge-dist]","[data-ag-berge-gain]","[data-ag-berge-date]","[data-ag-berge-url]","[data-ag-berge-cover]","[data-ag-berge-notes]","[data-ag-berge-lat]","[data-ag-berge-lng]","[data-ag-berge-loc-label]"].forEach(Ko=>{const Tr=l(Ko);Tr&&(Tr.value="")});const se=l("[data-ag-loc-search]");se&&(se.value="");const dt=l("[data-ag-berge-form-title]");dt&&(dt.textContent="Neuer Gipfeleintrag");const _e=l("[data-ag-berge-save] span:last-child");_e&&(_e.textContent="Eintragen"),b.hidden=!0,y.hidden=!1,(Er=l("[data-ag-sheet-backdrop]"))==null||Er.classList.remove("is-open"),Me(),fe("Gipfel gespeichert ✓")}),Pi();const v=l("[data-ag-ping-card]");v&&(v.hidden=!(I()==="fionn"&&((cr=g.backup)!=null&&cr.enabled)));const f=l("[data-ag-ping-dismiss]");f&&f.addEventListener("click",()=>{const u=l("[data-ag-ping-banner]");u&&(u.hidden=!0)});const x=l("[data-ag-ping-send]");x&&x.addEventListener("click",()=>{S([20,30,20]);try{en()}catch{}});const C=l("[data-ag-hug-send]");C&&C.addEventListener("click",()=>{S([20,30,20]);try{tn()}catch{}});const T=l("[data-ag-wish-open]"),M=l("[data-ag-wish-cancel]"),V=l("[data-ag-wish-submit]");T&&T.addEventListener("click",()=>{S(8),l("[data-ag-wish-idle]").hidden=!0,l("[data-ag-wish-form]").hidden=!1;const u=l("[data-ag-wish-input]");u&&window.setTimeout(()=>u.focus(),60)}),M&&M.addEventListener("click",()=>{S(6),l("[data-ag-wish-form]").hidden=!0,l("[data-ag-wish-idle]").hidden=!1}),V&&V.addEventListener("click",()=>{const u=l("[data-ag-wish-input]"),w=((u==null?void 0:u.value)||"").trim();if(!w)return;S([20,20,40]);const k={week:Re(),text:w,submittedAt:Date.now(),remoteStatus:"idle"};ma(k),Rt();try{Nt(k)}catch{}});const H=l("[data-ag-notif-enable]"),ee=l("[data-ag-notif-dismiss]");H&&H.addEventListener("click",()=>{S(10),ln()}),ee&&ee.addEventListener("click",()=>{S(6);try{window.localStorage.setItem(ge,"dismissed")}catch{}const u=l("[data-ag-notif-card]");u&&(u.hidden=!0)});const xe=l("[data-ag-sheet-backdrop]");xe&&xe.addEventListener("click",()=>{S(6);const u=l("[data-ag-berge-form]"),w=l("[data-ag-berge-add]");u&&!u.hidden&&(u.hidden=!0,w&&(w.hidden=!1));const k=document.getElementById("ag-glossary-form"),A=document.getElementById("ag-glossary-add");k&&!k.hidden&&(k.hidden=!0,A&&(A.hidden=!1)),xe.classList.remove("is-open")});const Be=l("[data-ag-fab]");Be&&Be.addEventListener("click",()=>{S(8);const u=l("[data-ag-berge-add]");u&&!u.hidden&&u.click()});const we=["today","history","lieblinge","berge"];let Pe=0,qe=0;const Ue=l(".ag-content")||E;Ue.addEventListener("touchstart",u=>{Pe=u.touches[0].clientX,qe=u.touches[0].clientY},{passive:!0}),Ue.addEventListener("touchend",u=>{const w=u.changedTouches[0].clientX-Pe,k=Math.abs(u.changedTouches[0].clientY-qe);if(Math.abs(w)>52&&k<44){const A=we.indexOf(g.activeTab),L=w<0?Math.min(A+1,we.length-1):Math.max(A-1,0);L!==A&&(S(6),De(we[L]))}},{passive:!0});const ie=l("[data-ag-ptr]");let st=0,lt=!1;document.addEventListener("touchstart",u=>{window.scrollY===0&&(st=u.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",u=>{if(!st)return;u.touches[0].clientY-st>64&&!lt&&ie&&(lt=!0,ie.classList.add("is-visible"))},{passive:!0}),document.addEventListener("touchend",async()=>{lt&&ie&&(ie.classList.add("is-loading"),await Je(),g.activeTab==="berge"&&Me(),g.activeTab==="history"&&X(),ie.classList.remove("is-visible","is-loading"),fe("Aktualisiert ✓")),st=0,lt=!1},{passive:!0}),document.addEventListener("visibilitychange",()=>{const u=document.querySelector(".ag-widget");u==null||u.classList.toggle("ag-paused",document.hidden)})}const ro=Object.freeze(Object.defineProperty({__proto__:null,DAILY_REMINDER_POOL:$t,STREAK_WARN_POOL:Dt,bindEvents:un,downloadResultAsImage:dn,drawRoundRect:Bt,enableNotifications:ln,escapeHtml:cn,notifyPartnerVoucherRedeemed:an,registerServiceWorker:at,renderError:qt,retryPendingWishSend:nn,reveal:gn,scheduleNotification:on,scheduleStreakWarning:tt,sendHugToInbox:tn,sendPingToBackend:en,sendWishToInbox:Nt,setActiveTab:De,setHugStatus:he,showNotifPrompt:rn,showToast:fe,tryPeriodicSync:sn,wrapText:Pt},Symbol.toStringTag,{value:"Module"}));let re=null,Q="all";function io(e){Q=e==="vouchers"||e==="open"?e:"all",X()}function oo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ut(e){return e?oo(e).split(/\n\n+/).map(a=>`<p>${a.replace(/\n/g,"<br>")}</p>`).join(""):""}function Ne(){return I().replace(/[-_]+/g," ").trim().split(/\s+/).filter(Boolean).map(t=>t.charAt(0).toLocaleUpperCase("de-CH")+t.slice(1)).join(" ")||g.theme.brand.displayNameDefault||"Lennart"}function so(){return["Bärlauch","Rave 🪩","Glossar 📖"]}function lo(){try{const e=new Date;return new Intl.DateTimeFormat("de-CH",{weekday:"long",day:"2-digit",month:"long",timeZone:g.theme.timezone}).format(e)}catch{return z(g.theme.timezone)}}const co=["🚴","🧄"],go=["🥾","🌲","🧗‍♂️","✨","📚","💭","🌙","☕","🔥","💛","🫶","🌿","🎿","❄️","😄","🎶","🌊","🚤","🍃","🌍","💌","🥹","🌈","🕊️","😏","💫","🧠","⚡","🍝","🍷","😋","🌆","🎧","🎵","💃","🪩","🌄","🧭","🚶‍♂️","🍂","💬","👀","🤍","🔐","🏔️","🪨","💪","🌤️","😂","🤭","🎯","💥","🛤️","🌌","🕯️","📖","❤️‍🔥","😇","😈","🍓","🍫","😚","🫂","🌻","🌞","🐻","🛌","🎻","👨‍❤️‍👨"];function pn(){const e=z(g.theme.timezone),t=I();return`${g.theme.secret}|${t}|${e}|emoji`}function uo(){const e=pn(),t=3+Math.floor(K(`${e}|count`)*3),a=go.slice(),n=[];for(let r=0;r<t&&a.length;r+=1){const i=Math.floor(K(`${e}|pick|${r}`)*a.length);n.push(a.splice(i,1)[0])}return[...co,...n]}function po(){const e=l("[data-ag-emoji-orbit]");if(!e)return;e.innerHTML="";const t=uo(),a=t.length,n=pn();t.forEach((r,i)=>{const o=document.createElement("span");o.className="ag-emoji",o.textContent=r;const s=360/a*i,d=(K(`${n}|angle|${i}`)-.5)*28,c=s+d,p=K(`${n}|radius|${i}`)*21-10.5,y=16+K(`${n}|dur|${i}`)*10,b=-K(`${n}|delay|${i}`)*y,h=K(`${n}|dir|${i}`)>.5?1:-1;o.style.setProperty("--ag-emoji-angle",`${c}deg`),o.style.setProperty("--ag-emoji-radius",`${250+p}%`),o.style.setProperty("--ag-emoji-duration",`${y.toFixed(2)}s`),o.style.setProperty("--ag-emoji-delay",`${b.toFixed(2)}s`),o.style.setProperty("--ag-emoji-direction",h===1?"normal":"reverse"),e.appendChild(o)})}function nt(){const e=l("[data-ag-streak]"),t=J(),a=Le();if(t>(a.maxStreak||0)&&fa({...a,maxStreak:t}),e){const n=ya(t);n?(e.hidden=!1,e.textContent=`${n.emoji} ${n.label}`,e.dataset.agStreakTier=n.tier):e.hidden=!0}_t()}function _t(){const e=l("[data-ag-streak-restore]");e&&(e.hidden=!wa())}const mn={7:"🌿 Sieben Tage am Stück. Die Maschine nickt anerkennend.",14:"🔥 Zwei Wochen am Stück. Offiziell notiert im Maschinenregister.",21:"✨ Drei Wochen. Die Maschine neigt sich leicht. Respekt.",30:"💎 Dreißig Tage. Die Maschine ist gerührt und würde applaudieren, wenn sie Hände hätte.",50:"🌿 Fünfzig Tage. Ein kleines Wunder in der Praxis der Beständigkeit.",60:"🔥 Sechzig Tage. Die Maschine erinnert sich an jeden davon.",75:"✨ Fünfundsiebzig Tage. Dreiviertel einer Jahreszeit. Unbeirrbar.",100:"💎 Hundert Tage. Die Maschine schweigt kurz aus Respekt. Dann: Bravo.",150:"🌿 Hundertfünfzig Tage. Die meisten Dinge scheitern an weniger.",200:"🔥 Zweihundert Tage. Ein Name, der im Maschinenregister unterstrichen ist.",365:"💎 Ein ganzes Jahr. Die Maschine verbeugt sich tief."};function mo(e){const t=l("[data-ag-milestone]");if(!t)return;const a=mn[e];if(!a){t.hidden=!0;return}const n=I();if(Fr(n,e)){t.hidden=!0;return}l("[data-ag-milestone-text]").textContent=a,t.hidden=!1,Wr(n,e)}function fo(e,t){const a=document.createElement("div");a.className="ag-prompt-gate";const n=document.createElement("p");n.className="ag-prompt-question",n.textContent="💭 "+e;const r=document.createElement("textarea");r.className="ag-prompt-textarea",r.placeholder="Schreib hier deine Antwort...",r.rows=4;const i=document.createElement("p");i.className="ag-pin-err",i.hidden=!0,i.textContent="Bitte erst antworten.";const o=document.createElement("button");o.type="button",o.className="ag-button",o.style.cssText="width:100%;margin-top:4px",o.textContent="Kapsel öffnen ✨";function s(){const d=r.value.trim();if(!d){i.hidden=!1,r.classList.add("ag-pin-shake"),setTimeout(()=>r.classList.remove("ag-pin-shake"),450);return}t(d)}return o.addEventListener("click",s),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&s()}),a.appendChild(n),a.appendChild(r),a.appendChild(i),a.appendChild(o),a}function ho(e,t){try{const a=g.backup;if(!a||!a.enabled||!a.endpointUrl)return;const n=JSON.stringify({type:"prompt-answer",token:e.token,day:e.day,prompt:e.outcome.prompt,answer:t}),r={method:"POST",mode:"cors",credentials:"omit",cache:"no-store",headers:{"Content-Type":"text/plain;charset=utf-8"},body:n};fetch(a.endpointUrl,r).catch(()=>{fetch(a.endpointUrl,{...r,mode:"no-cors"}).catch(()=>{})})}catch{}}function bo(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("p");r.className="ag-pin-hint",r.textContent=a||"🔐 Wie viele Tage kennen wir uns? Die Zahl öffnet die Mission.";const i=document.createElement("div");i.className="ag-pin-row";const o=document.createElement("input");o.type="text",o.inputMode="numeric",o.pattern="[0-9]*",o.maxLength=4,o.className="ag-pin-input",o.placeholder="_ _ _ _",o.autocomplete="off";const s=document.createElement("button");s.type="button",s.className="ag-secondary",s.textContent="Öffnen";const d=document.createElement("p");d.className="ag-pin-err",d.hidden=!0,d.textContent="Falsche Zahl. Noch einmal.";function c(){o.value.trim()===e?t():(d.hidden=!1,o.classList.add("ag-pin-shake"),o.value="",setTimeout(()=>o.classList.remove("ag-pin-shake"),450))}return s.addEventListener("click",c),o.addEventListener("keydown",p=>{p.key==="Enter"&&c()}),i.appendChild(o),i.appendChild(s),n.appendChild(r),n.appendChild(i),n.appendChild(d),n}function yo(e,t,a){const n=document.createElement("div");n.className="ag-pin-gate";const r=document.createElement("span");r.className="ag-outcome-link-locked",r.textContent=`🔒 Ab ${a.unlockTime} verfügbar`;const i=document.createElement("p");i.className="ag-pin-hint",i.style.marginTop="10px",i.textContent="Oder: erste drei Buchstaben deines Ziels 🗺️";const o=document.createElement("div");o.className="ag-pin-row";const s=document.createElement("input");s.type="text",s.maxLength=3,s.className="ag-pin-input",s.placeholder="_ _ _",s.autocomplete="off",s.spellcheck=!1;const d=document.createElement("button");d.type="button",d.className="ag-secondary",d.textContent="Öffnen";const c=document.createElement("p");c.className="ag-pin-err",c.hidden=!0,c.textContent="Nicht ganz. Versuch nochmal.";function p(){s.value.trim().toLowerCase()===e.toLowerCase()?(n.remove(),rt(t,a.outcome.link)):(c.hidden=!1,s.classList.add("ag-pin-shake"),s.value="",setTimeout(()=>s.classList.remove("ag-pin-shake"),450))}return d.addEventListener("click",p),s.addEventListener("keydown",y=>{y.key==="Enter"&&p()}),o.appendChild(s),o.appendChild(d),n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(c),n}function vo(e){try{const t=new URL(e);if(t.hostname!=="open.spotify.com")return null;const a=t.pathname.split("/").filter(Boolean);if(a.length<2)return null;const n=a[0],r=a[1];if(!["track","album","playlist","artist","episode","show"].includes(n))return null;const o=document.createElement("iframe");return o.src=`https://open.spotify.com/embed/${n}/${r}`,o.width="100%",o.height=n==="track"||n==="episode"?"80":"152",o.setAttribute("frameborder","0"),o.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",o.loading="lazy",o.setAttribute("allowtransparency","true"),o.setAttribute("title","Spotify player"),o.className="ag-spotify-iframe",o}catch{return null}}function fn(e){const t=document.createElement("a");return t.href=e,t.rel="noopener noreferrer",t.target="_blank",t.className="ag-outcome-link ag-secondary",t.textContent="🔗 Link öffnen",t}function rt(e,t){if(e.innerHTML="",!t){e.hidden=!0;return}const a=W(t);if(!a){e.hidden=!0;return}const n=vo(a);e.appendChild(n||fn(a)),e.hidden=!1}function xo(e,t){if(e.innerHTML="",!t.collectToken){e.hidden=!0;return}const a=t.collectToken,n=He()[a]||0,r=Ir[a]||"",i=5;if(n>=i)e.innerHTML=`
      <div style="text-align:center;padding:16px 0;animation:ag-pop 400ms var(--ag-ease) both">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.repeat(i)}</div>
        <p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">5 erreicht — einlösbar!</p>
        <p style="opacity:0.8;font-size:0.9rem;margin-bottom:12px">${r}</p>
        <button class="ag-button" type="button" id="ag-token-redeem">
          <span class="ag-button-orb" aria-hidden="true"></span>
          <span>Einlösen</span>
        </button>
      </div>`,e.hidden=!1,e.querySelector("#ag-token-redeem").addEventListener("click",()=>{if(_r(a),ae(),e.innerHTML='<p style="text-align:center;padding:12px;opacity:0.7;font-size:0.9rem">✅ Eingelöst! Fionn wurde informiert.</p>',g.wishInbox&&g.wishInbox.enabled){const s=JSON.stringify({timestamp:new Date().toISOString(),token:I(),wish:`🎁 Sammelkapsel eingelöst: ${a} × ${i} — ${r}`,pageUrl:location.href,userAgent:navigator.userAgent});fetch(g.wishInbox.endpointUrl,{method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain;charset=utf-8"},body:s}).catch(()=>{})}});else{const s=i-n;e.innerHTML=`
      <div style="text-align:center;padding:12px 0">
        <div style="font-size:1.6rem;letter-spacing:2px;margin-bottom:6px;word-break:break-all;max-width:100%">${a.repeat(n)}${"⬜".repeat(i-n)}</div>
        <p style="opacity:0.7;font-size:0.85rem">${s} × ${a} bis: <em>${r}</em></p>
      </div>`,e.hidden=!1}}function hn(e,t){if(e.innerHTML="",!t||t.type==="video")return;const a=t.alt||"Foto von uns",n=document.createElement("div");n.className="ag-media-frame";const r=document.createElement("div");r.className="ag-media-backdrop",r.setAttribute("aria-hidden","true"),t.type!=="video"&&(r.style.backgroundImage=`url("${t.url}")`),n.appendChild(r);let i;if(t.type==="video"){const o=ca(t.url);if(o){const s=document.createElement("div");s.className="ag-media-content ag-drive-poster",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label",`${a} abspielen`);const d=document.createElement("img");d.src=`https://lh3.googleusercontent.com/d/${o}`,d.alt=a,d.className="ag-drive-poster-img",d.addEventListener("error",()=>d.remove(),{once:!0}),s.appendChild(d);const c=document.createElement("div");c.className="ag-drive-play-btn",c.setAttribute("aria-hidden","true"),s.appendChild(c);const p=()=>{s.removeEventListener("click",p),s.removeEventListener("keydown",y),s.removeAttribute("role"),s.removeAttribute("tabindex"),s.style.cursor="",s.innerHTML="";const b=document.createElement("iframe");b.src=`https://drive.google.com/file/d/${o}/preview?autoplay=1`,b.allow="autoplay",b.setAttribute("allowfullscreen",""),b.setAttribute("frameborder","0"),b.setAttribute("aria-label",a),b.className="ag-drive-iframe",s.appendChild(b)},y=b=>{(b.key==="Enter"||b.key===" ")&&p()};s.addEventListener("click",p),s.addEventListener("keydown",y),i=s}else i=document.createElement("video"),i.src=W(t.url),i.controls=!0,i.muted=!0,i.playsInline=!0,i.setAttribute("playsinline",""),i.setAttribute("preload","metadata"),i.setAttribute("aria-label",a),i.className="ag-media-content"}else i=document.createElement("img"),i.alt=a,i.loading="eager",i.decoding="auto",i.className="ag-media-content",i.addEventListener("load",()=>{const o=i.naturalWidth&&i.naturalHeight?i.naturalWidth/i.naturalHeight:1;n.dataset.orientation=o<.95?"portrait":o>1.15?"landscape":"square"},{once:!0}),i.addEventListener("error",()=>{_("config/photos.json",{photos:[]}).then(o=>{const{normalizePhotos:s}=jt(),d=s(o),c=d.find(p=>p.alt===t.alt&&p.type!=="video")||d.find(p=>p.type!=="video")||null;if(c&&c.url)r.style.backgroundImage=`url("${c.url}")`,i.src=W(c.url),g.photos=d;else{const p=i.closest("[data-ag-photo-wrap]");p&&(p.hidden=!0)}}).catch(()=>{const o=i.closest("[data-ag-photo-wrap]");o&&(o.hidden=!0)})},{once:!0}),i.src=W(t.url);n.appendChild(i),e.appendChild(n)}function jt(){return{normalizePhotos:e=>{const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i;return(Array.isArray(e==null?void 0:e.photos)?e.photos:[]).map(n=>{const r=n.type==="video"||t.test(n.url||"");return{...n,type:r?"video":"image"}}).filter(n=>n.url)}}}function wo(e,t,a,n){var d,c;const r=l("#ag-lightbox"),i=l("#ag-lightbox-img"),o=l("#ag-lightbox-caption"),s=l("#ag-lightbox-drive-link");if(!(!r||!i)){(d=r.querySelector(".ag-lightbox-iframe"))==null||d.remove(),(c=r.querySelector(".ag-lightbox-video"))==null||c.remove(),re&&(i.removeEventListener("error",re),re=null),i.onerror=null,s&&(s.hidden=!0);{i.hidden=!1;const p=W(e);if(!p)return;i.src=p,i.alt=t||"",re=()=>{const y=n||t;_("config/photos.json",{photos:[]}).then(b=>{const{normalizePhotos:h}=jt(),m=h(b),v=m.find(f=>f.alt===y)||null;v&&v.url&&(i.src=W(v.url),g.photos=m)}).catch(()=>{})},i.addEventListener("error",re,{once:!0})}o.textContent=t||"",o.hidden=!t,r.hidden=!1,document.body.style.overflow="hidden"}}function Ot(){var a,n;const e=l("#ag-lightbox");if(!e)return;(a=e.querySelector(".ag-lightbox-iframe"))==null||a.remove(),(n=e.querySelector(".ag-lightbox-video"))==null||n.remove();const t=e.querySelector(".ag-lightbox-img");t&&(re&&(t.removeEventListener("error",re),re=null),t.hidden=!1),e.hidden=!0,document.body.style.overflow=""}function bn(e){return[`${Ta(e.category.tone)} ${Ne()}s ${g.theme.brand.machineName}: ${e.category.label}`,e.outcome.title,e.outcome.message,e.outcome.link&&(!e.unlockTime||(()=>{var i;const[a,n]=e.unlockTime.split(":").map(Number),r=je(((i=g.theme)==null?void 0:i.timezone)||"UTC");return r.h>a||r.h===a&&r.m>=n})())?`🔗 ${e.outcome.link}`:"",e.photo?`📸 ${e.photo.caption||e.photo.alt||"Foto-Drop"}`:"",`Tag: ${e.day}`].filter(Boolean).join(`
`)}function yn(e){var h;E.dataset.tone=e.category.tone,si(e.category.tone),l("[data-ag-rarity]").textContent=e.category.label,l("[data-ag-date]").textContent=e.day,l("[data-ag-title]").textContent=e.outcome.title;const t=l("[data-ag-message]");if(!t)return;t.innerHTML=Ut(e.outcome.message),t.hidden=!1;const a=l("[data-ag-result]");if(e.outcome.prompt&&!e.promptAnswer){if(t.hidden=!0,!(a?a.querySelector("[data-ag-prompt-gate]"):null)){const v=fo(e.outcome.prompt,f=>{if(e.promptAnswer=f,v.remove(),!Se()){ho(e,f);const x=B(),C=x.findIndex(T=>T.day===e.day&&T.token===e.token);C!==-1&&(x[C]={...x[C],promptAnswer:f},le(x),ae())}yn(e),g.activeTab==="history"&&X()});v.setAttribute("data-ag-prompt-gate",""),t.parentNode.insertBefore(v,t)}l("[data-ag-result]").hidden=!1;return}const n=a?a.querySelector("[data-ag-pin-gate]"):null;n&&n.remove();const r=l("[data-ag-link-wrap]");if(e.outcome.pin){const m=!!e.outcome.pinMessage;if(m||(t.hidden=!yt(e.outcome.pin)),!yt(e.outcome.pin)){let v=null;m&&(v=document.createElement("div"),v.className="ag-message",v.hidden=!0,v.innerHTML=Ut(e.outcome.pinMessage),t.parentNode.insertBefore(v,t.nextSibling));const f=bo(e.outcome.pin,()=>{f.remove(),m?v.hidden=!1:t.hidden=!1,e.outcome.link&&r&&rt(r,e.outcome.link)},e.outcome.pinHint);f.setAttribute("data-ag-pin-gate","");const x=m?v:t;x.parentNode.insertBefore(f,x)}}const i=l("[data-ag-photo-wrap]"),o=l("[data-ag-photo-media]"),s=l("[data-ag-photo-caption]");if(e.outcome.link&&e.unlockTime){const[m,v]=e.unlockTime.split(":").map(Number),f=je(((h=g.theme)==null?void 0:h.timezone)||"UTC"),x=e.outcome.linkPin;if(x)if((()=>{if(!e.outcome.linkPinFrom)return!0;const[T,M]=e.outcome.linkPinFrom.split(":").map(Number);return f.h>T||f.h===T&&f.m>=M})()){const T=yo(x,r,e);r.innerHTML="",r.appendChild(T),r.hidden=!1}else{const T=document.createElement("span");T.className="ag-outcome-link-locked",T.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(T),r.hidden=!1}else if(f.h>m||f.h===m&&f.m>=v)rt(r,e.outcome.link);else{const T=document.createElement("span");T.className="ag-outcome-link-locked",T.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,r.innerHTML="",r.appendChild(T),r.hidden=!1}}else e.outcome.pin&&!yt(e.outcome.pin)||rt(r,e.outcome.link||null);if(xo(l("[data-ag-token-wrap]"),e),e.photo){hn(o,e.photo);const m=(e.photo.caption||"").trim();m?(s.textContent=m,s.hidden=!1):(s.textContent="",s.hidden=!0),i.hidden=!1}else o.innerHTML="",s.textContent="",s.hidden=!0,i.hidden=!0;const d=bn(e),c=encodeURIComponent("Mein Gacha-Zug"),p=encodeURIComponent(d),y=l("[data-ag-send]");g.theme.messageTarget.startsWith("mailto:")?y.href=`${g.theme.messageTarget}?subject=${c}&body=${p}`:y.href=g.theme.messageTarget.replace("{text}",p);const b=l("[data-ag-save-img]");b&&(b.hidden=!(e.category.id==="rare"||e.category.id==="jackpot")),l("[data-ag-result]").hidden=!1,vn()}function ko(e){return e?te().some(t=>t.day===e.day&&t.token===e.token):!1}function it(e){return te().some(t=>t.day===e.day&&t.token===e.token)}function vn(){const e=l("[data-ag-star]");if(!e)return;const t=ko(g.todaysPull);e.textContent=t?"★":"☆",e.classList.toggle("is-starred",t),e.title=t?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern"}function So(e,t){const a=te(),n=a.findIndex(i=>i.day===e.day&&i.token===e.token);n>=0?a.splice(n,1):a.unshift({day:e.day,token:e.token,categoryId:e.categoryId,categoryLabel:e.categoryLabel,tone:e.tone,title:e.title,message:e.message,link:e.link||null,unlockTime:e.unlockTime||null,photo:e.photo||null,starredAt:Date.now()}),Ge(a),ae();const r=it(e);t.textContent=r?"★":"☆",t.classList.toggle("is-starred",r),t.title=r?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",g.activeTab==="lieblinge"&&ot()}function Eo(e){if(!e)return;const t=te(),a=t.findIndex(n=>n.day===e.day&&n.token===e.token);a>=0?t.splice(a,1):t.unshift({day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,starredAt:Date.now()}),Ge(t),ae(),vn(),g.activeTab==="lieblinge"&&ot()}function To(e){if(!e)return;const t={day:e.day,token:e.token,categoryId:e.category.id,categoryLabel:e.category.label,tone:e.category.tone,title:e.outcome.title,message:e.outcome.message,link:e.outcome.link||null,unlockTime:e.unlockTime||null,promptAnswer:e.promptAnswer||null,photo:e.photo?{url:e.photo.url,alt:e.photo.alt||"",caption:(e.photo.caption||"").trim(),type:e.photo.type==="video"?"video":"image"}:null,voucher:e.voucher||!1,revealedAt:Date.now()},a=B(),n=new Set,r=[t,...a].filter(i=>{if(!i||typeof i.day!="string"||typeof i.token!="string")return!1;const o=`${i.day}|${i.token}`;return n.has(o)?!1:(n.add(o),!0)});r.sort((i,o)=>i.day<o.day?1:i.day>o.day?-1:0),le(r),Ae(0),ae()}function Co(e,t){var o;if(!e||e.used||!(typeof window>"u"||!window.confirm?!0:window.confirm("Diesen Gutschein jetzt einlösen? Das lässt sich nicht rückgängig machen.")))return;const n=z(((o=g.theme)==null?void 0:o.timezone)||"UTC");e.used=!0,e.usedAt=n;const r=B(),i=r.find(s=>s.day===e.day&&s.token===e.token);i&&(i.used=!0,i.usedAt=n,le(r)),ae();try{ne(60)}catch{}try{fe("Eingelöst 💛")}catch{}try{an(e)}catch{}t&&(t.disabled=!0),X(),g.activeTab==="lieblinge"&&ot()}function xn(e){if(!e.link)return null;if(e.unlockTime){const a=new Date,[n,r]=e.unlockTime.split(":").map(Number);if(!(a.getHours()>n||a.getHours()===n&&a.getMinutes()>=r)){const o=document.createElement("span");return o.className="ag-outcome-link-locked",o.textContent=`🔒 Ab ${e.unlockTime} verfügbar`,o}}const t=W(e.link);return t?fn(t):null}function wn(e){const t=document.createElement("li");t.className="ag-history-item",t.dataset.tone=e.tone||"soft";const a=document.createElement("div");a.className="ag-history-head";const n=document.createElement("span");n.className="ag-history-date";const{formatHistoryDate:r}=kn();n.textContent=r(e.day);const i=document.createElement("span");i.className="ag-history-badge",i.textContent=e.categoryLabel||"Kapsel";const o=document.createElement("button");o.type="button",o.className="ag-history-star"+(it(e)?" is-starred":""),o.textContent=it(e)?"★":"☆",o.title=it(e)?"Aus Lieblingen entfernen":"Als Lieblingspreis speichern",o.addEventListener("click",b=>{b.stopPropagation(),So(e,o)}),a.appendChild(n),a.appendChild(i),a.appendChild(o);const s=document.createElement("p");s.className="ag-history-title",s.textContent=e.title||"";const d=document.createElement("div");d.className="ag-history-message",d.innerHTML=Ut(e.message||"");let c=null;if(e.promptAnswer){c=document.createElement("div"),c.className="ag-history-answer-wrap";const b=document.createElement("p");b.className="ag-history-answer-label",b.textContent="💭 Antwort";const h=document.createElement("blockquote");h.className="ag-history-answer",h.textContent=e.promptAnswer,c.appendChild(b),c.appendChild(h)}t.appendChild(a);const p=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,y=e.photo&&(e.photo.type==="video"||p.test(e.photo.url||""));if(e.photo&&!y){const b=document.createElement("div");b.className="ag-history-body";const h=document.createElement("div");h.className="ag-history-thumb";const m=document.createElement("img");m.src=W(e.photo.url),m.alt=e.photo.alt||"Foto-Drop",m.loading="lazy",m.decoding="async",m.addEventListener("error",function(){_("config/photos.json",{photos:[]}).then(f=>{const{normalizePhotos:x}=jt(),C=x(f),T=C.find(M=>M.alt===e.photo.alt&&M.type!=="video")||C.find(M=>M.type!=="video")||null;if(T&&T.url)e.photo.url=T.url,m.src=W(T.url),g.photos=C;else{h.classList.add("is-broken"),m.remove();const M=document.createElement("span");M.className="ag-history-thumb-broken",M.textContent="📷",h.appendChild(M)}}).catch(()=>{h.classList.add("is-broken"),m.remove();const f=document.createElement("span");f.className="ag-history-thumb-broken",f.textContent="📷",h.appendChild(f)})},{once:!0}),h.appendChild(m),h.style.cursor="pointer",h.title="Vollansicht",h.addEventListener("click",()=>wo(e.photo.url,e.photo.caption||e.photo.alt||"",!1,e.photo.alt));const v=document.createElement("div");if(v.className="ag-history-text",v.appendChild(s),v.appendChild(d),c&&v.appendChild(c),e.link){const f=xn(e);f&&v.appendChild(f)}b.appendChild(h),b.appendChild(v),t.appendChild(b)}else if(t.appendChild(s),t.appendChild(d),c&&t.appendChild(c),e.link){const b=xn(e);b&&t.appendChild(b)}if(Ce(e)){const b=document.createElement("div");if(b.className="ag-voucher-actions",e.used){const h=document.createElement("span");h.className="ag-voucher-used";const{formatHistoryDate:m}=kn();h.textContent=`✓ Benutzt am ${e.usedAt?m(e.usedAt):"–"}`,b.appendChild(h)}else{const h=document.createElement("button");h.type="button",h.className="ag-voucher-use",h.textContent="🎟️ Benutzen",h.addEventListener("click",m=>{m.stopPropagation(),Co(e,h)}),b.appendChild(h)}t.appendChild(b)}return t}function kn(){return{formatHistoryDate:e=>{const[t,a,n]=e.split("-").map(Number),r=new Date(Date.UTC(t,a-1,n));try{return new Intl.DateTimeFormat("de-CH",{day:"2-digit",month:"short",year:"numeric"}).format(r)}catch{return e}}}}function Lo(e){const t=l("[data-ag-history-filter]");if(!t)return;t.querySelectorAll("[data-ag-filter]").forEach(n=>{const r=n.dataset.agFilter;n.classList.toggle("is-active",r===Q),n.setAttribute("aria-selected",r===Q?"true":"false"),r==="open"&&(n.textContent=e>0?`Offen (${e})`:"Offen")})}function X(){var d;const e=l("[data-ag-history]"),t=l("[data-ag-history-empty]"),a=l("[data-ag-history-note]");e.innerHTML="";const n=I(),r=z(((d=g.theme)==null?void 0:d.timezone)||"UTC"),i=B().filter(c=>c.token===n&&c.day<=r).slice().sort((c,p)=>c.day<p.day?1:c.day>p.day?-1:0),o=i.filter(c=>Ce(c)&&!c.used).length;Lo(o);const s=i.filter(c=>Q==="vouchers"?Ce(c):Q==="open"?Ce(c)&&!c.used:!0);if(Q==="open"?a.textContent=o?`Du hast ${o} offene${o===1?"n":""} Gutschein${o===1?"":"e"} zum Einlösen 🎟️`:"Alle Gutscheine sind eingelöst. 💛":Q==="vouchers"?a.textContent="Alle deine Gutscheine — eingelöst und offen.":a.textContent="Tatsächlich geöffnete Kapseln auf diesem Gerät, neueste zuerst.",!s.length){t.hidden=!1,t.textContent=Q==="all"?"Noch keine Kapseln auf diesem Gerät bzw. Browser geöffnet. Zieh heute eine — dann erscheint sie hier.":Q==="open"?"Keine offenen Gutscheine — alles eingelöst. 💛":"Noch keine Gutscheine gezogen.";return}t.hidden=!0;for(const c of s)e.appendChild(wn(c))}function ot(){const e=l("[data-ag-lieblinge]"),t=l("[data-ag-lieblinge-empty]"),a=l("[data-ag-lieblinge-note]");e.innerHTML="";const n=te();if(a.textContent="Deine gespeicherten Lieblingspreise — per Stern markiert.",!n.length){t.hidden=!1,t.textContent="Noch keine Lieblinge gespeichert. Tippe auf ☆ nach dem Ziehen einer Kapsel.";return}t.hidden=!0;for(const r of n)e.appendChild(wn(r))}function Ao(){const e=l("[data-ag-odds]");e.innerHTML="";const t=J(),a=va(t),n=a.reduce((r,i)=>r+i.weight,0);for(const r of a){const i=document.createElement("li");i.textContent=`${r.label}: ${(r.weight/n*100).toFixed(1)} %`,e.appendChild(i)}if(t>=5){const r=ya(t),i=document.createElement("li");i.textContent=`${r.emoji} Streak-Bonus aktiv (${t} ${t===1?"Tag":"Tage"} am Stück)`,i.style.fontWeight="800",e.appendChild(i)}}function zo(e){const t="Die Maschine hat es notiert. Ob etwas passiert, bleibt offen.";return e==="sent"?"Die Maschine hat es notiert und an Fionn weitergeleitet.":e==="pending"?"Die Maschine hat es notiert. Sie versucht, es weiterzuleiten…":e==="failed"?"Die Maschine hat es notiert. Die Weiterleitung hat nicht geklappt – beim nächsten Öffnen wird es erneut versucht.":t}function Rt(){const e=l("[data-ag-wish-idle]"),t=l("[data-ag-wish-form]"),a=l("[data-ag-wish-done]");if(!e||!t||!a)return;const n=mt();n&&n.week===Re()?(e.hidden=!0,t.hidden=!0,a.hidden=!1,l("[data-ag-wish-done-title]").textContent="✨ Wunsch eingereicht",l("[data-ag-wish-done-note]").textContent=`„${n.text}"`,l("[data-ag-wish-done-meta]").textContent=zo(n.remoteStatus)):(e.hidden=!1,t.hidden=!0,a.hidden=!0)}function Io(){var m;const e=R()==="fionn",t=e?g.theme.brand.fromName:Ne(),a=e?Ne():g.theme.brand.fromName,n=l("[data-ag-main-title]");n&&(n.textContent=g.theme.brand.titleTemplate.replace("{name}",t));const r=l("[data-ag-kicker]");r&&(r.textContent=`${g.theme.brand.kicker} · ${g.photos.length} Erinnerungen`);const i=l("[data-ag-intro]");i&&(i.textContent=g.theme.brand.intro);const o=l("[data-ag-button-text]");o&&(o.textContent=g.theme.brand.buttonIdle);const s=l("[data-ag-rules-title]");s&&(s.textContent=g.theme.brand.rulesTitle);const d=l("[data-ag-rules-text]");d&&(d.textContent=g.theme.brand.rulesText);const c=l("[data-ag-send]");c&&(c.textContent=`An ${a} schicken`);const p=l("[data-ag-today-pill]");p&&(p.textContent=lo());const y=l("[data-ag-draw-hint]");y&&(y.textContent="Eine Kapsel · ein Tag · ein Souvenir.");const b=l("[data-ag-chips]");b&&(b.innerHTML="");const h=Array.isArray(g.theme.stickers)&&g.theme.stickers.length?g.theme.stickers:so();for(const v of b?h:[]){const f=document.createElement("li");if(f.textContent=v,(v.toLowerCase().includes("bärlauch")||v.toLowerCase().includes("barlauch"))&&(f.id="ag-btn-baerlauch",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Bärlauch öffnen"),f.classList.add("ag-chip-clickable")),(v.toLowerCase().includes("gespräch")||v.toLowerCase().includes("gesprach"))&&(f.id="ag-btn-gesprach",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Gespräch öffnen"),f.classList.add("ag-chip-clickable")),v.toLowerCase().includes("rave")&&(f.id="ag-btn-rave",f.tabIndex=0,f.setAttribute("role","link"),f.setAttribute("aria-label","Rave Board öffnen"),f.classList.add("ag-chip-clickable")),v.toLowerCase()==="quest"&&(f.id="ag-btn-quest",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Quest öffnen"),f.classList.add("ag-chip-clickable"),(m=g.quest)!=null&&m.enabled&&Ba()&&(ze().solved||f.classList.add("ag-chip-quest-active"))),v.toLowerCase().includes("glossar")&&(f.id="ag-btn-glossary",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Glossar öffnen"),f.classList.add("ag-chip-clickable")),v.toLowerCase()==="mission"&&(f.id="ag-btn-mission",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Mission öffnen"),f.classList.add("ag-chip-clickable"),Ia()||f.classList.add("ag-chip-mission-active")),v.toLowerCase().includes("stimmung")){f.id="ag-btn-stimmung",f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-label","Farbe des Tages wählen"),f.classList.add("ag-chip-clickable");const x=Mt();x&&(f.classList.add("ag-chip-stimmung-set"),f.style.setProperty("--chip-dot-color",x))}b.appendChild(f)}po(),nt()}const Mo={photos:[]};function $o(e){const t=/\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i,a=Array.isArray(e==null?void 0:e.photos)?e.photos:[],n=ka();return a.map(r=>{const i=new URL(r.url,n).toString(),o=r.type==="video"||t.test(i);return{...r,type:o?"video":"image",url:i}}).filter(r=>r.url)}function Do(){var s;const e=I(),t=z(((s=g.theme)==null?void 0:s.timezone)||"UTC"),a=[{day:"2026-05-01",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-02",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Foto-Drop",message:"Die Maschine spuckt eine Erinnerung aus. Das zählt als Preis, auch wenn sie sentimental tut."},{day:"2026-05-03",categoryId:"rare",categoryLabel:"Selten",tone:"rare",title:"6a-Belay-Pass",message:"Ich bin dein persönlicher Coach beim nächsten Klettern und motiviere dich bis zum Top."},{day:"2026-05-04",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Der Fionn-Quest-Sieger",message:"Lennart ist der offizielle Gewinner. 24h lang hast du die absolute Entscheidungsgewalt über alle Freizeitaktivitäten."},{day:"2026-05-05",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Barróg (IE)",message:"Eine feste Umarmung (20 Sekunden Minimum)."},{day:"2026-05-06",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Sprachnachricht",message:"Du darfst eine kleine Sprachnachricht anfordern. Thema frei, Länge wie eine gute Aussicht: nicht zu kurz."},{day:"2026-05-07",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Baugespann-Sperre",message:"Hier entsteht demnächst ein Gewinn. Aktuell sieht man nur die Holzpfosten auf dem Dach."},{day:"2026-05-08",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Design-Safari",message:"Schick mir ein Foto von einem Gebäude oder Detail, das du heute siehst und das entweder genial oder ein Verbrechen ist."},{day:"2026-05-09",categoryId:"jackpot",categoryLabel:"JACKPOT",tone:"jackpot",title:"JACKPOT: Überraschungs-Wochenende",message:"Fionn plant einen kompletten Tag für dich. Du musst nur sagen, wann du Zeit hast."},{day:"2026-05-10",categoryId:"special",categoryLabel:"Laf Schnell!",tone:"jackpot",title:"🌟 SSR-Speed-Dämon-Pull! 🌟",message:"Hey Lennart! An diesem besonderen Tag in München beim Wings for Life World Run, möge dein Lauf mit deine friends ein legendärer Gacha-Pull sein: epische Speed, Ausdauer-Verlust und alle Kumpels SSR-Rarität (Super Super Rare, die Besten der Besten!) für maximalen Spaß! Rennt wie die Teufel, lacht euch schlapp und erobert die Strecke aus dem Olympiapark wie Bosse. Ich vermisse dich total hier in Zürich, aber freue mich fuer dich!"},{day:"2026-05-11",categoryId:"common",categoryLabel:"Gewöhnlich",tone:"soft",title:"Gedanken-Ping",message:"Du musst jetzt acht Sekunden an mich denken. Die Maschine behauptet, sie könne das überprüfen <3."},{day:"2026-05-12",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Geräusch-Notiz",message:"Beschreib mir das markanteste Geräusch deines Tages in maximal fünf Wörtern. Poetisch oder komplett nüchtern ist beides erlaubt."},{day:"2026-05-13",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Foto-Anfrage",message:"Du darfst ein süßes, schönes oder dummes Foto anfordern. Die Maschine empfiehlt: Alle drei."},{day:"2026-05-14",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Saudades (PT)",message:"Wenn man sich mal einen Tag vermisst: Ein Gutschein für ein spontanes Facetime-Date."},{day:"2026-05-15",categoryId:"special",categoryLabel:"Abendessen 🍽️",tone:"rare",title:"Fionn lädt zum Abendessen ein 🍽️",message:"Heute Abend geht's auf Fionns Rechnung. Treffpunkt: Stauffacher, 20:00 Uhr."},{day:"2026-05-16",categoryId:"photo",categoryLabel:"Foto-Drop",tone:"photo",title:"Bildkapsel",message:"Heute gibt es kein Gutschein-Drama, nur ein kleines Bild."},{day:"2026-05-17",categoryId:"uncommon",categoryLabel:"Ungewöhnlich",tone:"warm",title:"Tehran & Guatemala Tales",message:"Du darfst eine Geschichte aus deiner Reisezeit einfordern, die du noch nicht kennst."},{day:"2026-05-18",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Züri-Regen",message:"Grauer Himmel über Wiedikon. Kein Preis, nur das Bedürfnis nach einem sehr großen Tee."},{day:"2026-05-19",categoryId:"quest",categoryLabel:"Mini-Quest",tone:"quest",title:"Drei-Wort-Reisebericht",message:"Schick Fionn deinen Tag in genau drei Worten, als wärst du sehr erschöpft in einem Zug."},{day:"2026-05-20",categoryId:"niete",categoryLabel:"Niete",tone:"quiet",title:"Denkmalschutz",message:"Dieser Slot darf aus historischen Gründen heute nicht verändert oder mit Preisen befüllt werden. Ein Klassiker unter den Nieten."},{day:"2026-05-21",categoryId:"special",categoryLabel:"Packliste 🧳",tone:"quest",title:"Deine Aufgabe: ein Brief 💌",message:`Ich kann es kaum erwarten. Den Rest findest du auf der Liste die ich dir gegeben habe — aber eins noch: deine HiFi-Ohrstöpsel. Vertrau mir.

Und eine Aufgabe von der Maschine: Schreib mir einen kurzen Brief auf Papier. Nicht lang, nicht perfekt — einfach was du gerade denkst. Bring ihn mit. Ich lese ihn wenn wir uns sehen. Bis bald. 🐚`}],n=B(),r=new Set(n.map(d=>d.day)),i=a.filter(d=>!r.has(d.day)&&d.day<=t).map(d=>({...d,token:e,link:null,photo:null,unlockTime:null,revealedAt:new Date(d.day+"T12:00:00").getTime()}));if(!i.length)return 0;const o=[...n,...i].sort((d,c)=>c.day.localeCompare(d.day));return le(o),g.syncedHistory=o,Ae(J()),ae(),i.length}async function No(){var e,t,a,n;Jr(),ti(),ii();try{const[r,i,o,s,d,c,p,y,b]=await Promise.all([_("config/theme.json"),_("config/outcomes.json"),_("config/photos.json",Mo),_("config/special-days.json",{days:[]}),_("config/wish-inbox.json",{enabled:!1,endpointUrl:""}),_("config/backup.json",{enabled:!1,endpointUrl:""}),_("config/quest.json",{enabled:!1}),_("config/missions.json",{pairs:[]}),_("config/radio.json",{enabled:!1})]);g.theme=r,g.outcomes=i,g.photos=$o(o),g.specialDays=s,g.wishInbox=d&&typeof d=="object"?d:{enabled:!1,endpointUrl:""},g.backup=c&&typeof c=="object"?c:{enabled:!1,endpointUrl:""},g.quest=p&&typeof p=="object"?p:{enabled:!1},g.missions=y&&Array.isArray(y.pairs)?y:{pairs:[]},g.radio=b&&typeof b=="object"?b:{enabled:!1},Zr(r),Qr(Se()||z(r.timezone)),eo(),Io(),Ao(),Rt(),un(),requestAnimationFrame(()=>{const m=E.querySelector(".ag-nav-pill"),v=E.querySelector(".ag-bottomnav-btn.is-active");if(m&&v){const f=v.closest(".ag-bottomnav"),x=f?f.getBoundingClientRect():null,C=v.getBoundingClientRect();x&&C.width&&(m.style.transition="none",m.style.left=`${C.left-x.left}px`,m.style.width=`${C.width}px`,requestAnimationFrame(()=>{m.style.transition=""}))}});try{nn()}catch{}at(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&tt()}),E.classList.add("is-ready"),E.style.transition="opacity .18s ease",E.style.opacity="1";const h=z(r.timezone);if(B().some(m=>m.token===I()&&m.day===h)&&E.classList.add("has-drawn"),new URLSearchParams(location.search).get("radio")==="1"){const m=E.querySelector("[data-ag-notif-card]");if(m){const v=document.createElement("div");v.className="ag-card ag-radio-card",v.id="ag-radio-card",v.innerHTML='<div class="ag-hug-row"><div class="ag-hug-text"><p class="ag-wish-label">Radio Zweisam 📻</p><p class="ag-wish-note" style="margin-bottom:0">KI-Musik aus euren Glossarwörtern — täglich neu generiert, manchmal chill, manchmal tanzbar.</p></div><button class="ag-hug-button ag-radio-open-btn" type="button" id="ag-radio-open-btn" aria-label="Radio öffnen"><span class="ag-hug-emoji" aria-hidden="true">📻</span><span class="ag-hug-label">Öffnen</span></button></div>',m.insertAdjacentElement("beforebegin",v);const f=E.querySelector("#ag-glossary-panel")||m,x=document.createElement("section");x.className="ag-card ag-mini-panel",x.id="ag-radio-panel",x.hidden=!0,x.innerHTML='<div class="ag-mini-head"><span class="ag-badge">Radio Zweisam 📻</span><button class="ag-secondary" type="button" id="ag-radio-close">✕</button></div><h2 class="ag-mini-title">Euer täglicher Soundtrack</h2><p class="ag-mini-copy" id="ag-radio-status">KI-Musik, täglich neu — inspiriert von euren Glossarwörtern.</p><div class="ag-radio-visualizer" id="ag-radio-visualizer" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="ag-radio-words-wrap"><p class="ag-radio-words-label">Inspiriert von:</p><div class="ag-radio-words" id="ag-radio-words"></div></div><div class="ag-radio-controls"><button class="ag-button" type="button" id="ag-radio-play-btn"><span class="ag-button-orb" aria-hidden="true"></span><span>▶ Abspielen</span></button><button class="ag-secondary" type="button" id="ag-radio-download-btn" hidden>⬇ Download</button></div><p class="ag-radio-voice-info" id="ag-radio-voice-info"></p>',f.insertAdjacentElement("beforebegin",x);const{openRadioPanel:C,closeRadioPanel:T,startOrToggleRadio:M,downloadRadioTrack:V}=await Promise.resolve().then(()=>Wo),{dateKeyInTimezone:H}=await Promise.resolve().then(()=>qr);(e=v.querySelector("#ag-radio-open-btn"))==null||e.addEventListener("click",C),(t=x.querySelector("#ag-radio-close"))==null||t.addEventListener("click",T),(a=x.querySelector("#ag-radio-play-btn"))==null||a.addEventListener("click",()=>M(H(r.timezone))),(n=x.querySelector("#ag-radio-download-btn"))==null||n.addEventListener("click",()=>V(H(r.timezone)))}}Je().catch(()=>{})}catch(r){qt(r)}}const be=document.currentScript,Bo=(be==null?void 0:be.dataset.mount)||"#affektions-gacha",Po=(be==null?void 0:be.dataset.configBase)||"";function qo(){const e=document.createElement("section");return e.id="affektions-gacha",document.body.appendChild(e),e}const Uo=document.querySelector(Bo)||qo();Cr(Uo),Vr(Po,null),No().catch(e=>qt(e));const Gt="ag:radio:track:",_o=[{label:"Chill",prompt:"ambient lo-fi instrumental, soft piano and gentle synth pads, slow dreamy tempo 65 bpm, warm and tender, no drums, peaceful"},{label:"Mittel",prompt:"indie folk pop instrumental, acoustic guitar and light brushed drums, melodic and emotional, 92 bpm, warm and hopeful, violin strings"},{label:"Energetisch",prompt:"upbeat electronic dance instrumental, punchy kick drum, driving synth bass, vibrant and joyful, 126 bpm, four-on-the-floor, euphoric"}];let P=null,U=null,ye=[],ve=0;function jo(e){const t=e.replace(/-/g,"").split("").reduce((a,n)=>a*31+n.charCodeAt(0),7);return Math.abs(t)%3}function Ht(e=5){const t=de().filter(a=>a.word);return t.length?[...t].sort(()=>Math.random()-.5).slice(0,e):[]}function Sn(e){const t=jo(e),a=_o[t],n=Ht(3),r=n.filter(o=>o.meaning&&o.meaning.length<60&&/^[\x00-\x7F]*$/.test(o.meaning)).map(o=>o.meaning).join(", "),i=r?`, ${r}`:"";return{prompt:a.prompt+i,energyLabel:a.label,energyIdx:t,inspirationWords:n}}function Ft(e){try{return localStorage.getItem(Gt+e)||null}catch{return null}}function En(e,t){try{for(const a of Object.keys(localStorage))a.startsWith(Gt)&&localStorage.removeItem(a);localStorage.setItem(Gt+e,t)}catch{}}async function Oo(e){return new Promise(t=>{const a=new FileReader;a.onload=()=>t(a.result),a.readAsDataURL(e)})}async function Tn(e){const t=g.radio;if(!(t!=null&&t.enabled)||!(t!=null&&t.hfToken))throw new Error("Radio nicht konfiguriert");const a=t.model||"facebook/musicgen-small",n={Authorization:`Bearer ${t.hfToken}`,"Content-Type":"application/json"},r=JSON.stringify({inputs:e}),i=[`https://router.huggingface.co/hf-inference/models/${a}`,`https://api-inference.huggingface.co/models/${a}`],o=async(s=0,d=0)=>{const c=i[d]||i[0],p=new AbortController,y=setTimeout(()=>p.abort(),18e4);let b;try{b=await fetch(c,{method:"POST",headers:n,body:r,signal:p.signal})}catch(m){if(clearTimeout(y),d===0)return o(s,1);throw new Error(`Netzwerkfehler: ${m.message}`)}if(clearTimeout(y),b.status===503&&s<6){const m=await b.json().catch(()=>({})),v=Math.min((m.estimated_time||30)*1e3,9e4),f=document.getElementById("ag-radio-status");return f&&(f.textContent=`Modell lädt — noch ca. ${Math.round(v/1e3)}s...`),await new Promise(x=>setTimeout(x,v)),o(s+1,d)}if(!b.ok){const m=await b.text().catch(()=>String(b.status));if(d===0&&b.status>=400&&b.status<500)return console.warn(`[Radio] ${c} returned ${b.status}, trying fallback`),o(0,1);throw new Error(`HF ${b.status}: ${String(m).slice(0,150)}`)}const h=b.headers.get("content-type")||"";if(!h.includes("audio")&&!h.includes("octet")){const m=await b.text();throw new Error(`Kein Audio: ${m.slice(0,150)}`)}return b.blob()};return o()}function Wt(e){const t=document.getElementById("ag-radio-words");if(t){if(!e.length){t.innerHTML="<em style='opacity:.5'>Keine Glossarwörter gefunden</em>";return}t.innerHTML=e.map(a=>`<span class="ag-radio-word" title="${a.meaning||""}">${a.word}</span>`).join("")}}function Cn(){!ye.length||!P||P.paused||(ve=(ve+1)%ye.length,U=new Audio(ye[ve]),U.volume=.65,U.onended=()=>setTimeout(Cn,3500+Math.random()*3e3),U.play().catch(()=>{}))}function Ln(){var a;if(P){try{P.pause(),P.src=""}catch{}P=null}if(U){try{U.pause(),U.src=""}catch{}U=null}ye=[],ve=0;const e=document.getElementById("ag-radio-play-btn");e&&(e.textContent="▶ Abspielen",e.dataset.playing="",e.disabled=!1),(a=document.getElementById("ag-radio-visualizer"))==null||a.classList.remove("is-playing");const t=document.getElementById("ag-radio-download-btn");t&&(t.hidden=!0)}async function Ro(e){var n,r,i;const t=document.getElementById("ag-radio-play-btn"),a=document.getElementById("ag-radio-status");if(P&&!P.paused){P.pause(),U&&U.pause(),t&&(t.textContent="▶ Weiterspielen",t.dataset.playing=""),(n=document.getElementById("ag-radio-visualizer"))==null||n.classList.remove("is-playing");return}if(P){P.play().catch(()=>{}),U&&U.play().catch(()=>{}),t&&(t.textContent="⏸ Pausieren",t.dataset.playing="1"),(r=document.getElementById("ag-radio-visualizer"))==null||r.classList.add("is-playing");return}t&&(t.disabled=!0,t.textContent="⏳ Lädt..."),a&&(a.textContent="Die Maschine komponiert — einen Moment..."),S(6);try{let o=Ft(e);if(o)Wt(Ht(5));else{const{prompt:c,energyLabel:p,inspirationWords:y}=Sn(e);Wt(y),a&&(a.textContent=`Energie: ${p} — generiere...`);const b=await Tn(c);o=await Oo(b),En(e,o)}P=new Audio(o),P.loop=!0,P.volume=.45,await P.play(),t&&(t.disabled=!1,t.textContent="⏸ Pausieren",t.dataset.playing="1"),a&&(a.textContent=""),(i=document.getElementById("ag-radio-visualizer"))==null||i.classList.add("is-playing");const s=document.getElementById("ag-radio-download-btn");s&&(s.hidden=!1);const d=de().filter(c=>c.audioUrl);if(d.length){ye=[...d].sort(()=>Math.random()-.5).map(p=>p.audioUrl),ve=-1;const c=document.getElementById("ag-radio-voice-info");c&&(c.textContent=`${d.length} Stimmaufnahme${d.length!==1?"n":""} aus dem Glossar`),setTimeout(Cn,6e3)}}catch(o){console.error("[Radio Zweisam]",o),t&&(t.disabled=!1,t.textContent="▶ Nochmal versuchen");const s=o!=null&&o.message?o.message.slice(0,120):"Unbekannter Fehler";a&&(a.textContent=`Fehler: ${s}`)}}function Go(e){const t=Ft(e);if(!t)return;const a=document.createElement("a");a.href=t,a.download=`radio-zweisam-${e}.wav`,a.click()}function Ho(){const e=document.getElementById("ag-radio-panel");e&&(e.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"nearest"}),S(10))}function Fo(){Ln();const e=document.getElementById("ag-radio-panel");e&&(e.hidden=!0)}const Wo=Object.freeze(Object.defineProperty({__proto__:null,get _radioAudio(){return P},get _voiceAudio(){return U},get _voiceIdx(){return ve},get _voiceQueue(){return ye},buildMusicPrompt:Sn,closeRadioPanel:Fo,downloadRadioTrack:Go,generateTrack:Tn,getCachedTrack:Ft,getInspirationWords:Ht,openRadioPanel:Ho,renderInspirationWords:Wt,setCachedTrack:En,startOrToggleRadio:Ro,stopRadio:Ln},Symbol.toStringTag,{value:"Module"}))})();

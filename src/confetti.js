// ── Confetti ─────────────────────────────────────────────────────────────────

export function triggerConfetti(count = 80, colors) {
  const defaultColors = ["#2f7a4f","#b9782e","#4a9e6b","#e8c87a","#7ec8a0","#f0e6c8"];
  const palette = colors || defaultColors;
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:9999;";
  document.body.appendChild(container);
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const color = palette[Math.floor(Math.random() * palette.length)];
    const size = 8 + Math.random() * 8;
    const x = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const dur = 1.4 + Math.random() * 0.8;
    el.style.cssText = `position:absolute;top:-20px;left:${x}%;width:${size}px;height:${size * 0.6}px;background:${color};border-radius:2px;animation:ag-confetti-fall ${dur}s ${delay}s ease-in forwards;transform-origin:center;`;
    el.style.setProperty("--r", `${Math.random() * 720 - 360}deg`);
    container.appendChild(el);
  }
  if (!document.getElementById("ag-confetti-style")) {
    const style = document.createElement("style");
    style.id = "ag-confetti-style";
    style.textContent = `@keyframes ag-confetti-fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(var(--r,360deg));opacity:0}}`;
    document.head.appendChild(style);
  }
  setTimeout(() => container.remove(), 3000);
}

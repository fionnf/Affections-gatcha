// Rollo, the camera whose lens is a face. Moods: happy, wow, sleepy.
export const mascot = (mood = "happy", cls = "") => {
  const eyes = mood === "sleepy"
    ? `<path d="M41 62q7 6 14 0M65 62q7 6 14 0" stroke="#2b1620" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<g class="eyes"><ellipse cx="48" cy="62" rx="5" ry="6.5" fill="#2b1620"/><ellipse cx="72" cy="62" rx="5" ry="6.5" fill="#2b1620"/><circle cx="49.8" cy="59.5" r="1.9" fill="#fff"/><circle cx="73.8" cy="59.5" r="1.9" fill="#fff"/></g>`;
  const mouth = mood === "wow"
    ? `<ellipse cx="60" cy="79" rx="5" ry="6" fill="#7a2b3a"/>`
    : `<path d="M52 76q8 9 16 0" stroke="#7a2b3a" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  return `<svg class="mascot ${cls}" viewBox="0 0 120 112" aria-hidden="true">
    <rect x="8" y="26" width="104" height="80" rx="26" fill="#ff9fb2"/>
    <rect x="42" y="10" width="34" height="22" rx="9" fill="#ff9fb2"/>
    <rect x="84" y="14" width="16" height="11" rx="4" fill="#fff3b0"/>
    <circle cx="24" cy="24" r="7" fill="#ff7d96"/>
    <circle cx="60" cy="66" r="33" fill="#fff6f0" stroke="#f0728a" stroke-width="5"/>
    ${eyes}${mouth}
    <ellipse cx="37" cy="74" rx="6.5" ry="4" fill="#ff9fb2" opacity=".75"/><ellipse cx="83" cy="74" rx="6.5" ry="4" fill="#ff9fb2" opacity=".75"/>
  </svg>`;
};

// Which weekly card is current. Dates are compared as calendar days in
// Zurich, so all three of us flip to the new week on the same morning.

export function zurichToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

const dayNumber = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
};

// 1 for the week starting on `start`; 0 or less before it.
export function weekIndex(today, start) {
  return Math.floor((dayNumber(today) - dayNumber(start)) / 7) + 1;
}

// Cards that are out by now: at least week 1 (so it can be previewed), at most all.
export function releasedWeeks(today, start, total) {
  return Math.min(Math.max(weekIndex(today, start), 1), total);
}

export function weekMonday(start, n) {
  const [y, m, d] = start.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + (n - 1) * 7));
}

export function weekLabel(start, n) {
  return new Intl.DateTimeFormat("de-CH", { timeZone: "UTC", day: "numeric", month: "long" }).format(weekMonday(start, n));
}

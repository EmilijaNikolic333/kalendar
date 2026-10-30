export const MONTHS = [
  "januar", "februar", "mart", "april", "maj", "jun",
  "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
];
export const DOW = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const DOW_LONG = ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"];

export const pad = (n) => String(n).padStart(2, "0");

// Date -> "GGGG-MM-DD"
export const toIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// "GGGG-MM-DD" -> "četvrtak, 29. oktobar 2026."
export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DOW_LONG[dt.getDay()]}, ${d}. ${MONTHS[m - 1]} ${y}.`;
}

// Dani za prikaz meseca: počinje od ponedeljka, 5 ili 6 nedelja
export function monthDays(viewDate) {
  const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - ((first.getDay() + 6) % 7));
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (i === 35 && d.getMonth() !== first.getMonth()) break;
    days.push(d);
  }
  return days;
}

// Sve stavke (predavanja + obaveze) za dati dan, sortirane po vremenu
export function eventsOn(date, lectures, tasks) {
  return [...lectures.filter((l) => l.date === date), ...tasks.filter((t) => t.date === date)]
    .sort((a, b) => a.time.localeCompare(b.time));
}

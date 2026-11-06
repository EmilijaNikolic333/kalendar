import { toIso } from "../utils/dates.js";

// Aktivnosti koje se ponavljaju svake nedelje
// Da dodaš ili izmeniš aktivnost, menjaj samo ovaj niz:
//   text – naziv
//   days – dani u nedelji (0 = nedelja, 1 = ponedeljak, … 6 = subota)
//   time – vreme početka
const WEEKLY = [
  { text: "Trening", days: [2, 0], time: "20:30" },
  { text: "Ples", days: [6], time: "20:00" },
];

// Period za koji se termini prikazuju
const FROM = new Date(2026, 10, 1); // 1. novembar 2026.
const TO = new Date(2027, 11, 31); // 31. decembar 2027.

export const ACTIVITIES = [];
for (const d = new Date(FROM); d <= TO; d.setDate(d.getDate() + 1)) {
  const date = toIso(d);
  for (const a of WEEKLY) {
    if (a.days.includes(d.getDay())) {
      ACTIVITIES.push({ id: `activity-${a.text}-${date}`, type: "activity", date, time: a.time, text: a.text });
    }
  }
}

// Izvor: MAS-2026-27-Raspored-nastave-v6.pdf (stanje na dan 22.10.2026.)
// Modul: Tehnologije elektronskog poslovanja
//
// Da dodaš ili izmeniš predavanje, menjaj samo ovaj niz:
//   date      – datum u formatu GGGG-MM-DD
//   room      – sala
//   subject   – (opciono) naziv predmeta, ako nije Ekosistemi
//   cancelled – true ako je termin otkazan

const SUBJECT = "Ekosistemi elektronskog poslovanja";

const RAW = [
  { date: "2026-10-19", room: "A116 (Sala 20)" },
  { date: "2026-10-21", room: "D311 (Sala 60)" },
  { date: "2026-10-22", room: "D311 (Sala 60)", cancelled: true },
  { date: "2026-10-23", room: "C002 (Sala 07)" },
  { date: "2026-10-26", room: "C002 (Sala 07)" },
  { date: "2026-10-29", room: "D311 (Sala 60)" },
  { date: "2026-10-30", room: "C002 (Sala 07)" },
  { date: "2026-11-02", room: "C002 (Sala 07)" },
  { date: "2026-11-04", room: "D311 (Sala 60)" },
  { date: "2026-11-05", room: "C002 (Sala 07)" },
  { date: "2026-11-06", room: "D311 (Sala 60)" },
  { date: "2026-11-12", room: "D311 (Sala 60)" },
  { date: "2026-11-13", room: "D311 (Sala 60)" },
  { date: "2026-11-16", room: "C002 (Sala 07)" },
  { date: "2026-11-17", room: "C002 (Sala 07)" },
  { date: "2026-11-18", room: "D311 (Sala 60)" },
];

export const LECTURES = RAW.map((l) => ({
  id: `lecture-${l.date}`,
  type: "lecture",
  date: l.date,
  time: "18:15",
  end: "21:30",
  text: l.subject ?? SUBJECT,
  room: l.room,
  cancelled: !!l.cancelled,
}));

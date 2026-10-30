# Moj kalendar

Kalendar predavanja (MAS 2026/27, modul Tehnologije elektronskog poslovanja) i ličnih obaveza.
React + Vite.

## Pokretanje

```bash
npm install
npm run dev
```

Sajt se otvara na http://localhost:5173.

## Gde šta menjam

- `src/data/lectures.js` – termini predavanja
- `src/index.css` – boje i izgled (boje su na vrhu, u `:root`)
- `src/components/` – delovi stranice (kalendar, dan, forma, lista „Sledeće“, dijalog)
- `src/hooks/useTasks.js` – čuvanje obaveza (u browseru, `localStorage`)

import { DOW, MONTHS, monthDays, toIso, eventsOn } from "../utils/dates.js";
import DayCell from "./DayCell.jsx";

export default function Calendar({ view, setView, lectures, tasks, onDayClick }) {
  const todayIso = toIso(new Date());

  const shiftMonth = (delta) =>
    setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));

  const goToday = () => {
    const d = new Date();
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  return (
    <section className="card">
      <div className="cal-head">
        <h2>{MONTHS[view.getMonth()]} {view.getFullYear()}.</h2>
        <div className="nav">
          <button className="icon" aria-label="Prethodni mesec" onClick={() => shiftMonth(-1)}>‹</button>
          <button onClick={goToday}>Danas</button>
          <button className="icon" aria-label="Sledeći mesec" onClick={() => shiftMonth(1)}>›</button>
        </div>
      </div>

      <div className="grid">
        {DOW.map((d) => (
          <div key={d} className="dow">{d}</div>
        ))}
        {monthDays(view).map((d) => {
          const key = toIso(d);
          return (
            <DayCell
              key={key}
              day={d.getDate()}
              events={eventsOn(key, lectures, tasks)}
              isOtherMonth={d.getMonth() !== view.getMonth()}
              isToday={key === todayIso}
              onClick={() => onDayClick(key)}
            />
          );
        })}
      </div>

      <div className="legend">
        <span className="l1">Predavanje</span>
        <span className="l2">Moja obaveza</span>
        <span className="l3">Otkazano</span>
      </div>
    </section>
  );
}

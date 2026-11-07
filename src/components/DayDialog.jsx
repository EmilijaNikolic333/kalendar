import { useEffect, useRef } from "react";
import { formatDate, eventsOn } from "../utils/dates.js";
import EventItem from "./EventItem.jsx";

export default function DayDialog({ date, lectures, tasks, onClose, onAddForDay, onToggle, onDelete }) {
  const ref = useRef(null);

  // Otvori/zatvori <dialog> kad se promeni izabrani dan
  useEffect(() => {
    const dlg = ref.current;
    if (date && !dlg.open) dlg.showModal();
    if (!date && dlg.open) dlg.close();
  }, [date]);

  const events = date ? eventsOn(date, lectures, tasks) : [];

  return (
    <dialog ref={ref} onClose={onClose}>
      {date && (
        <>
          <h3>{formatDate(date)}</h3>
          <ul className="list">
            {events.length ? (
              events.map((ev) => (
                <EventItem key={ev.id} ev={ev} onToggle={onToggle} onDelete={onDelete} />
              ))
            ) : (
              <li className="empty">Ništa za ovaj dan.</li>
            )}
          </ul>
          <div className="dlg-actions">
            {onAddForDay && <button onClick={() => onAddForDay(date)}>Dodaj obavezu za ovaj dan</button>}
            <button className="primary" onClick={onClose}>Zatvori</button>
          </div>
        </>
      )}
    </dialog>
  );
}

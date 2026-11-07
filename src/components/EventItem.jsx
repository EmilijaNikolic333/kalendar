import { formatDate } from "../utils/dates.js";

// Jedna stavka u listi ("Sledeće" i dijalog za dan)
export default function EventItem({ ev, showDate, onToggle, onDelete }) {
  const when =
    (showDate ? formatDate(ev.date) + " · " : "") +
    (ev.type === "lecture" ? `${ev.time}–${ev.end} · ${ev.room}` : ev.time);
  const cls = ev.type === "task" ? "task" + (ev.done ? " done" : "") : ev.type;

  return (
    <li className={"item " + cls}>
      <div className="when">{when}</div>
      <div className="what">
        {ev.type === "lecture" && ev.cancelled ? (
          <>
            <s>{ev.text}</s> (otkazano)
          </>
        ) : (
          ev.text
        )}
      </div>
      {ev.type === "task" && onToggle && (
        <div className="actions">
          <button onClick={() => onToggle(ev.id)}>{ev.done ? "Vrati" : "Završeno"}</button>
          <button onClick={() => onDelete(ev.id)}>Obriši</button>
        </div>
      )}
    </li>
  );
}

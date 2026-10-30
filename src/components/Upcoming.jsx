import { pad, toIso } from "../utils/dates.js";
import EventItem from "./EventItem.jsx";

const MAX_ITEMS = 8;

export default function Upcoming({ lectures, tasks, onToggle, onDelete }) {
  const now = new Date();
  const nowKey = `${toIso(now)} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const items = [...lectures.filter((l) => !l.cancelled), ...tasks.filter((t) => !t.done)]
    .filter((e) => `${e.date} ${e.type === "lecture" ? e.end : e.time}` >= nowKey)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, MAX_ITEMS);

  return (
    <div className="card">
      <h3>Sledeće</h3>
      <ul className="list">
        {items.length ? (
          items.map((ev) => (
            <EventItem key={ev.id} ev={ev} showDate onToggle={onToggle} onDelete={onDelete} />
          ))
        ) : (
          <li className="empty">Nema predstojećih stavki.</li>
        )}
      </ul>
    </div>
  );
}

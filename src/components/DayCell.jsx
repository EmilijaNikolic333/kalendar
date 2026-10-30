// Koliko stavki se najviše vidi u jednom danu (ostalo je "+ još N")
const MAX_SHOWN = 3;

function eventClass(ev) {
  if (ev.type === "lecture") return ev.cancelled ? "cancelled" : "lecture";
  return "task" + (ev.done ? " done" : "");
}

function eventTitle(ev) {
  return ev.type === "lecture"
    ? `${ev.text}\n${ev.time}–${ev.end}, ${ev.room}${ev.cancelled ? "\nOTKAZANO" : ""}`
    : `${ev.text}\n${ev.time}`;
}

export default function DayCell({ day, events, isOtherMonth, isToday, onClick }) {
  // broj aktivnih stavki (bez otkazanih i završenih)
  const active = events.filter((ev) => !ev.cancelled && !ev.done).length;
  const className = "day" + (isOtherMonth ? " other" : "") + (isToday ? " today" : "");

  return (
    <div className={className} onClick={onClick}>
      <div className="day-head">
        <div className="num">{day}</div>
        {active > 0 && (
          <span className={"count" + (active >= 3 ? " busy" : "")} title={`${active} stavki`}>
            {active}
          </span>
        )}
      </div>

      {events.slice(0, MAX_SHOWN).map((ev) => (
        <div key={ev.id} className={"ev " + eventClass(ev)} title={eventTitle(ev)}>
          {ev.type === "lecture" ? (
            <>
              <span className="t">{ev.time} · {ev.room.split(" ")[0]}</span>
              <span className="x">Predavanje</span>
            </>
          ) : (
            <>
              <span className="t">{ev.time}</span>
              <span className="x">{ev.text}</span>
            </>
          )}
        </div>
      ))}

      {events.length > MAX_SHOWN && (
        <div className="more">+ još {events.length - MAX_SHOWN}</div>
      )}
    </div>
  );
}

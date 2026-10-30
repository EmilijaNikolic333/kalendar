import { useEffect, useRef, useState } from "react";

// 24-časovni format (00–23), nezavisno od jezika pregledača
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

export default function TaskForm({ onAdd, preset }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("00");
  const time = hour ? `${hour}:${minute}` : "";
  const textRef = useRef(null);

  // Kad se iz dijaloga klikne "Dodaj obavezu za ovaj dan"
  useEffect(() => {
    if (preset) {
      setDate(preset.date);
      textRef.current?.focus();
    }
  }, [preset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !date || !time) return;
    onAdd({ text: trimmed, date, time });
    setText("");
    setDate("");
    setHour("");
    setMinute("00");
  };

  return (
    <div className="card">
      <h3>Dodaj obavezu</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Tekst obaveze
          <textarea
            ref={textRef}
            required
            placeholder="npr. Predati domaći iz Ekosistema"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <div className="row">
          <label>
            Datum
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Vreme
            <div className="time-pick">
              <select required value={hour} onChange={(e) => setHour(e.target.value)} aria-label="Sat">
                <option value="" disabled>--</option>
                {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <span>:</span>
              <select value={minute} onChange={(e) => setMinute(e.target.value)} aria-label="Minut">
                {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </label>
        </div>
        <button type="submit" className="primary">Dodaj obavezu</button>
      </form>
    </div>
  );
}

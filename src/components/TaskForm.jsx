import { useEffect, useRef, useState } from "react";

export default function TaskForm({ onAdd, preset }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
    setTime("");
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
            <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>
        <button type="submit" className="primary">Dodaj obavezu</button>
      </form>
    </div>
  );
}

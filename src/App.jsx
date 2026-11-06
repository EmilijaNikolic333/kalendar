import { useState } from "react";
import { LECTURES } from "./data/lectures.js";
import { ACTIVITIES } from "./data/activities.js";
import { useTasks } from "./hooks/useTasks.js";
import Calendar from "./components/Calendar.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Upcoming from "./components/Upcoming.jsx";
import DayDialog from "./components/DayDialog.jsx";

// Stalni termini iz koda (predavanja + nedeljne aktivnosti)
const FIXED = [...LECTURES, ...ACTIVITIES];

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, error } = useTasks();
  const [view, setView] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [openDate, setOpenDate] = useState(null); // dan otvoren u dijalogu
  // datum unapred popunjen u formi (objekat, da i isti datum ponovo okine popunjavanje)
  const [formPreset, setFormPreset] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Obrisati ovu obavezu?")) deleteTask(id);
  };

  const handleAdd = (task) => {
    addTask(task);
    const [y, m] = task.date.split("-").map(Number);
    setView(new Date(y, m - 1, 1));
  };

  const itemActions = { onToggle: toggleTask, onDelete: handleDelete };

  return (
    <div className="wrap">
      <div className="topbar">
        <div className="logo">Moj kalendar</div>
        <span className="pill-tag">MAS 2026/27</span>
      </div>

      <header className="hero">
        <h1>Obaveze</h1>
      </header>

      {error && <div className="notice">{error}</div>}

      <div className="layout">
        <Calendar
          view={view}
          setView={setView}
          lectures={FIXED}
          tasks={tasks}
          onDayClick={setOpenDate}
        />

        <aside>
          <TaskForm onAdd={handleAdd} preset={formPreset} />
          <Upcoming lectures={FIXED} tasks={tasks} {...itemActions} />
        </aside>
      </div>

      <DayDialog
        date={openDate}
        lectures={FIXED}
        tasks={tasks}
        onClose={() => setOpenDate(null)}
        onAddForDay={(date) => {
          setOpenDate(null);
          setFormPreset({ date });
        }}
        {...itemActions}
      />
    </div>
  );
}

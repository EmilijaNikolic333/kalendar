import { useEffect, useState } from "react";

// Isti ključ kao u staroj verziji, da se sačuvane obaveze ne izgube
const STORE_KEY = "raspored-obaveze";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

// Obaveze se čuvaju u browseru (localStorage)
export function useTasks() {
  const [tasks, setTasks] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
    } catch {
      // nije moguće sačuvati (npr. privatni prozor)
    }
  }, [tasks]);

  const addTask = ({ text, date, time }) =>
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        type: "task",
        text,
        date,
        time,
        done: false,
      },
    ]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return { tasks, addTask, toggleTask, deleteTask };
}

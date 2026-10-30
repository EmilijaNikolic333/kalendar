import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

// Isti ključ kao u staroj verziji, da se sačuvane obaveze ne izgube
const STORE_KEY = "raspored-obaveze";
const TABLE = "obaveze";

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocal(tasks) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
  } catch {
    // nije moguće sačuvati (npr. privatni prozor)
  }
}

const fromRow = (r) => ({ id: r.id, type: "task", text: r.text, date: r.date, time: r.time, done: r.done });
const toRow = (t) => ({ id: t.id, text: t.text, date: t.date, time: t.time, done: t.done });

// Obaveze se čuvaju u Supabase-u (iste na svim uređajima),
// a ako Supabase nije podešen, u browseru (localStorage)
export function useTasks() {
  const [tasks, setTasks] = useState(() => (supabase ? [] : loadLocal()));
  const [error, setError] = useState(null);

  // Bez Supabase-a: čuvanje u localStorage kao ranije
  useEffect(() => {
    if (!supabase) saveLocal(tasks);
  }, [tasks]);

  useEffect(() => {
    if (!supabase) return;

    const fetchAll = async () => {
      const { data, error } = await supabase.from(TABLE).select("*");
      if (error) return setError("Obaveze nije moguće učitati.");
      setError(null);
      setTasks(data.map(fromRow));
    };

    // Jednom prebaci obaveze sačuvane samo na ovom uređaju u bazu
    const migrate = async () => {
      const local = loadLocal();
      if (!local.length) return;
      const { error } = await supabase.from(TABLE).upsert(local.map(toRow));
      if (!error) localStorage.removeItem(STORE_KEY);
    };

    migrate().then(fetchAll);

    // Promene sa drugih uređaja stižu odmah
    const channel = supabase
      .channel("obaveze")
      .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, fetchAll)
      .subscribe();

    window.addEventListener("focus", fetchAll);
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("focus", fetchAll);
    };
  }, []);

  // Promena se odmah prikaže, a ako upis u bazu ne uspe, vraća se prethodno stanje
  const run = async (update, query) => {
    const prev = tasks;
    setTasks(update);
    if (!supabase) return;
    const { error } = await query();
    if (error) {
      setTasks(prev);
      setError("Promena nije sačuvana. Proveri internet vezu.");
    } else {
      setError(null);
    }
  };

  const addTask = ({ text, date, time }) => {
    const task = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: "task",
      text,
      date,
      time,
      done: false,
    };
    run((prev) => [...prev, task], () => supabase.from(TABLE).insert(toRow(task)));
  };

  const toggleTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    run(
      (prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      () => supabase.from(TABLE).update({ done: !task.done }).eq("id", id)
    );
  };

  const deleteTask = (id) =>
    run((prev) => prev.filter((t) => t.id !== id), () => supabase.from(TABLE).delete().eq("id", id));

  return { tasks, addTask, toggleTask, deleteTask, error };
}

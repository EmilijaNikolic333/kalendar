import { useEffect, useState } from "react";
import { supabase, OWNER_EMAIL } from "../lib/supabase.js";

// Prijava vlasnice kalendara: upisuje se samo šifra, email je uvek isti.
// Bez Supabase-a (samo localStorage) izmene su uvek dozvoljene.
export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setLoggedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);

  // Vraća poruku o grešci, ili null ako je prijava uspela
  const login = async (password) => {
    const { error } = await supabase.auth.signInWithPassword({ email: OWNER_EMAIL, password });
    return error ? "Pogrešna šifra." : null;
  };

  const logout = () => supabase.auth.signOut();

  return { canEdit: !supabase || loggedIn, canLogin: !!supabase, loggedIn, login, logout };
}

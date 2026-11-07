import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Jedini nalog koji sme da menja obaveze (isto mora da piše i u supabase.sql)
export const OWNER_EMAIL = "nikolicemilija03@gmail.com";

// Bez podešenih ključeva aplikacija radi kao ranije (samo localStorage)
export const supabase = url && key ? createClient(url, key) : null;

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Koyi manual header ya local storage nahi chahiye!
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
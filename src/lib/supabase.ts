import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABSE_PUBLIC_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing supabase Url or supabase public key");
}

// initialize supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

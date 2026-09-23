import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pjxnhvibdhedpedjsggk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeG5odmliZGhlZHBlZGpzZ2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NzU1NjUsImV4cCI6MjEwNDQ1MTU2NX0.VgoYX6Xd29D-Ko4PvrkADZaObkjlUXcIvdSnv36L8m8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

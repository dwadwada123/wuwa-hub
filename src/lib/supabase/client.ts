import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tfzpswmzalxigqtcoiej.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmenBzd216YWx4aWdxdGNvaWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMjY2NjEsImV4cCI6MjEwNjcwMjY2MX0.gJXntqUqlTKKI4KWIhoByP-kbyrRPTuQITn-rP2N6Tk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {\n  auth: {\n    persistSession: true,\n    autoRefreshToken: true,\n  },\n});

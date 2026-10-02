import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srntillpcrqivktyrwza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybnRpbGxwY3JxaXZrdHlyd3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NDk5NzcsImV4cCI6MjEwNjUyNTk3N30.-iBbzi9BUYd3Wyp8Rd81s3mqs_fQqfmkpdzx9v694kI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

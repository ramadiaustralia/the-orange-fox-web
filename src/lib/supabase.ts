import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lylnsguyizwztqrdfavr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bG5zZ3V5aXp3enRxcmRmYXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTgwODEsImV4cCI6MjA5MDQ3NDA4MX0.rqBGgnwt5GCgaqhhTOBibjAkpTmtnO9bVdbrIFN8gRQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const PUBLIC_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const PUBLIC_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente público (solo lectura, RLS aplicado)
export const supabase = createClient(PUBLIC_URL, PUBLIC_ANON);

// Cliente admin (server-side, RLS bypass, storage write)
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(PUBLIC_URL, SERVICE_ROLE); 
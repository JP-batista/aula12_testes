import { createClient } from '@supabase/supabase-js';

// Pega as variáveis de ambiente que você definiu no .env.local
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
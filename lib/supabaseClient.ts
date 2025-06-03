// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// ✅ تأكد أن هذه المتغيرات موجودة في Vercel Environment Variables بنفس الاسم:
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

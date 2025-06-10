import { supabase } from '../../../../lib/supabaseClient';

export const dynamic = 'force-static';

const serviceUnavailableResponse = () =>
  new Response(JSON.stringify({ error: 'Service unavailable: Supabase client is not configured.' }), { status: 503, headers: { 'Content-Type': 'application/json' } });

export async function GET() {
  if (!supabase) {
    return serviceUnavailableResponse();
  }
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req: Request) {
  if (!supabase) {
    return serviceUnavailableResponse();
  }
  const body = await req.json();
  const { data, error } = await supabase.from('projects').insert([body]);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

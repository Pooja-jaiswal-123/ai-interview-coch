import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = await cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Code ko session mein badal kar cookies set karega
    await supabase.auth.exchangeCodeForSession(code);
  }

  // ✅ Ab ye user ko seedha home page (root) par bhej dega
  return NextResponse.redirect(new URL('/', request.url));
}
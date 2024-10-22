import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import createIntMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing';


const intMiddleware = createIntMiddleware(routing);

export async function updateSession(request: NextRequest) {
  // let supabaseResponse = NextResponse.next({
  //   request,
  // })
  let intlResponse = intMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          intlResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => intlResponse.cookies.set(name, value, options));
          // supabaseResponse = NextResponse.next({
          //   request,
          // })
          // cookiesToSet.forEach(({ name, value, options }) =>
          //   supabaseResponse.cookies.set(name, value, options)
          // )
        },
      },
    }
  );

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser();

  if(user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/sign-up'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // return supabaseResponse;
  return intlResponse;
}
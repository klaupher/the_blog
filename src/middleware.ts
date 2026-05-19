import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/login/manager-login';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = request.method === 'GET';

  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) return NextResponse.next();

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;
  const isAuthenticated = await verifyJWT(jwtSession);
  if (!isAuthenticated)
    return NextResponse.redirect(new URL('/admin/login', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

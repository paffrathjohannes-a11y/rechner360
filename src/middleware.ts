import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www
  if (host === 'rechner360.de') {
    const url = request.nextUrl.clone();
    url.host = 'www.rechner360.de';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|ads.txt|robots.txt|sitemap.xml).*)',
};

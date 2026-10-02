import { NextResponse } from 'next/server';
import { chain, type CustomMiddleware } from '@/utils';

/** Any route other than the landing page goes back to `/`. Files (resume, media) stay. */
const withHomeRedirect =
  (next: CustomMiddleware): CustomMiddleware =>
  (request, event, response) => {
    const { pathname } = request.nextUrl;
    const isFile = pathname.split('/').pop()?.includes('.') ?? false;

    if (pathname !== '/' && !isFile) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.search = '';
      return NextResponse.redirect(url);
    }

    return next(request, event, response);
  };

export default chain([withHomeRedirect]);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|favicons|file|assets|robots.txt|sitemap-0.xml|sitemap.xml).*)',
  ],
};

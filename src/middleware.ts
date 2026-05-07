import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Generates a per-request CSP nonce. The nonce is propagated to:
 *  - the response header `Content-Security-Policy`
 *  - the request header `x-csp-nonce` (read in app/layout via headers())
 */
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV !== 'production';
  const directives = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `object-src 'none'`,
    `img-src 'self' data: blob: https://cdn.sanity.io https://c.clarity.ms`,
    `font-src 'self' data:`,
    `media-src 'self' blob:`,
    `connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://*.ingest.sentry.io https://www.clarity.ms https://*.clarity.ms https://*.bing.com`,
    `style-src 'self' 'unsafe-inline'`,
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'strict-dynamic'`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `worker-src 'self' blob:`,
    `upgrade-insecure-requests`,
  ];
  return directives.join('; ');
}

/** Routes that require a valid bearer token (server-side gating). */
const PROTECTED_PREFIXES = ['/theme-lab', '/studio', '/pitch'];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function middleware(req: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  const csp = buildCsp(nonce);

  // Locale routing first
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-csp-nonce', nonce);
  requestHeaders.set('x-csp', csp);

  const reqWithNonce = new NextRequest(req, {
    headers: requestHeaders,
  });
  const intlResponse = intlMiddleware(reqWithNonce);

  // Auth gate for protected paths (very minimal — replace with real auth later)
  const { pathname } = req.nextUrl;
  if (isProtected(pathname)) {
    const cookie = req.cookies.get('pepl_pitch')?.value;
    const expected = process.env.PITCH_ACCESS_TOKEN;
    if (!expected || cookie !== expected) {
      const url = req.nextUrl.clone();
      url.pathname = '/'; // soft-redirect to landing
      url.searchParams.set('gate', '1');
      return NextResponse.redirect(url);
    }
  }

  intlResponse.headers.set('Content-Security-Policy', csp);
  intlResponse.headers.set('x-csp-nonce', nonce);
  return intlResponse;
}

export const config = {
  // Match all paths except static assets, _next internals, and API routes that
  // need to remain unmodified by the i18n middleware.
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

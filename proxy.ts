import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Skip proxy for static files and API routes
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

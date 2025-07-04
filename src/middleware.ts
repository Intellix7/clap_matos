import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const data = await fetch(`${req.nextUrl.origin}/api/users/me`, {
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });
  const user = await data.json();

  // If user is not authenticated, redirect to /signin
  if (!user || user.role !== 'admin') {
    const signinUrl = req.nextUrl.clone();
    signinUrl.pathname = '/signin';
    return NextResponse.redirect(signinUrl);
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

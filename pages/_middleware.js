import { NextResponse } from 'next/server';
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  const { connect_auth_cookie } = req.cookies;
  if (pathname === '/' && !connect_auth_cookie)
    return NextResponse.redirect('/home');
  return NextResponse.next();
}

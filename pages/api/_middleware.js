const jwt = require('jsonwebtoken');
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';
export function middleware(req) {
  const { connect_auth_cookie } = req.cookies;
  if (!connect_auth_cookie) {
    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
  const id = req.headers.get('id');
  const emailAddress = req.headers.get('emailAddress');
  let { uid, email } = jwt.decode(connect_auth_cookie, process.env.JWT_SECRET);
  if (uid === id && email === emailAddress) {
    return NextResponse.next();
  } else {
    return new Response('Invalid Auth', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
}

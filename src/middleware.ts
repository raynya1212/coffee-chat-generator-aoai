import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const basicAuthUser = process.env.BASIC_AUTH_USER;
    const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

    // If credentials are not set in environment, we skip auth (good for local dev without env vars)
    // However, in production, you should ensure these are set.
    if (!basicAuthUser || !basicAuthPassword) {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === basicAuthUser && pwd === basicAuthPassword) {
            return NextResponse.next();
        }
    }

    const url = req.nextUrl;
    return new NextResponse('Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': `Basic realm="Secure Area"`,
        },
    });
}

// Ensure middleware runs on all paths, optionally omitting static assets/next specifics
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

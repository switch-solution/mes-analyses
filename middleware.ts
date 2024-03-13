import { env } from "./lib/env"
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
export const config = {
    matcher: ["/home/:patch*", "/profile", "/client/:path*", "/editor/:path*", "/support/:path*", "/project/:path*", "/setup/:path*", "/feedback",]
}


const ratelimit = new Ratelimit({
    redis: kv,
    // 5 requests from the same IP in 10 seconds
    limiter: Ratelimit.slidingWindow(5, '10 s'),
})

import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
    //Application is only available in France 
    if (request.geo?.country !== "FR" && env.NODE_ENV === "production") {
        return new Response('Blocked for legal reasons', { status: 451 })
    }

    //Application maintenance mode
    if (env.MAINTENANCE) {
        return new Response('Service Unavailable', { status: 503 })
    }



    //Ip blocking




    /** 
    //CSP 
    //https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim()

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-nonce', nonce)

    requestHeaders.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    )

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    )
    */
    // Rewrite to URL
    return NextResponse.rewrite(request.nextUrl)

}



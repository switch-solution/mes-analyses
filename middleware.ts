import { env } from "./lib/env"
import { ipAddress } from '@vercel/edge'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
export const config = {
    //matcher: ["/home/:patch*", "/profile", "/client/:path*", "/editor/:path*", "/support/:path*", "/project/:path*", "/setup/:path*", "/feedback", "/about", "/profil"]
}
const domain = env.DOMAIN
const api = env.API_KEY
const node_env = env.NODE_ENV
const mode = env.MODE
const ratelimit = new Ratelimit({
    redis: kv,
    // 10 requests from the same IP in 10 seconds
    limiter: Ratelimit.slidingWindow(50, '10 s'),
    timeout: 1000, // 1 second
})

import { NextRequest, NextResponse } from 'next/server'
import { redirect } from "next/dist/server/api-utils"


export async function middleware(request: NextRequest) {
    //Application is only available in France 
    if (request.geo?.country !== "FR" && env.NODE_ENV === "production") {
        return new Response('Blocked for legal reasons', { status: 451 })
    }

    //Application maintenance mode
    if (env.MAINTENANCE) {
        return new Response('Service Unavailable', { status: 503 })
    }

    //Application route user not eanbled
    if (!request.nextUrl.pathname.startsWith('/api/v1')) {

        const cookie = request.headers.get('Cookie')
        if (cookie) {
            //return NextResponse.redirect(new URL('/home', request.url))
        }

    }



    //API route
    if (request.nextUrl.pathname.startsWith('/api/v1')) {
        //rate limiting only for production

        if (node_env === "production" && mode === "SAAS") {
            const ip = ipAddress(request) || '127.0.0.1'
            const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
            if (!success) {
                return new Response('Blocked for rate limit', { status: 503 })
            }
        }

        //Test API Key is present
        const clientApi = request.headers.get('Authorization')
        if (!clientApi) {
            return new Response('API token is required', { status: 400 })
        }
        //Test API Key is valid

        const fetchUrl = `${domain}/api/security/`
        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': api,
                },
                body: JSON.stringify({ clientApi }),
            })
            if (!response.ok) {
                return new Response('API is not valid', { status: 401 })
            }
        } catch (err: unknown) {
            return new Response(err as string, { status: 401 })
        }




    }

    //Cookie


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



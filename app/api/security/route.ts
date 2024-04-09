import { type NextRequest } from 'next/server'
import { env } from 'process';
const API_KEY = env.API_KEY
export async function POST(request: NextRequest) {
    try {
        const apiKey = request.headers.get('Authorization')
        if (apiKey !== API_KEY) {
            return new Response('API root is not valid', { status: 400 })
        }
        const json = await request.json()
        const apiIsValid = json.api === 'valid'
        if (!apiIsValid) {
            return Response.json({ error: "API is not valid" })
        }
        return Response.json({ json })
    } catch (err) {
        return new Response('API is not valid', { status: 401 })

    }

}
import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" })
        }
        const security = new Security()
        try {
            const clientSlug = await security.apiIsValid(api, request.url)
            const client = new Client(clientSlug)
            const clientDetail = await client.clientDetail()
            return Response.json({ clientDetail })
        } catch (err) {
            console.error(err)
            return Response.json(
                {
                    error: (err as Error).message
                },
                {
                    status: 400
                }
            )
        }

    } catch (err) {
        return Response.json(
            {
                error: (err as Error).message
            },
            {
                status: 500
            }
        )
    }

}
import { Security } from "@/src/classes/security"
import { prisma } from "@/lib/prisma"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" })
        }
        const security = new Security()
        try {
            const clientSlug = await security.apiIsValid({
                apiKey: api,
                url: request.url,
                country: request.geo?.country,
                city: request.geo?.city,
                ip: request.ip,
                method: 'GET'

            })
            if (!clientSlug) {
                return Response.json({ error: "Unauthorized" })
            }
            const idcc = await prisma.idcc.findMany()
            return Response.json({ idcc })
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
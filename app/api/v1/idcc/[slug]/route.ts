import { Security } from "@/src/classes/security"
import { Idcc } from "@/src/classes/idcc"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" })
        }
        const security = new Security()
        try {
            const clientSlug = await security.apiIsValid(api, request.url)
            if (!clientSlug) {
                return Response.json({ error: "Unauthorized" })
            }
            const idcc = new Idcc(params.slug)
            const paramsIdcc = await idcc.params()
            return Response.json({ paramsIdcc })
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
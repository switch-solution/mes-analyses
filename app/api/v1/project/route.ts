import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import { type NextRequest } from 'next/server'
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const status = searchParams.get('status')
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const security = new Security()

        const clientSlug = await security.apiIsValid(api, request.url)
        if (!clientSlug) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
        const client = new Client(clientSlug)

        const projects = await client.getProjects(
            status ? status : 'Actif'
        )
        return Response.json({ projects }, { status: 200 })

    } catch (err) {
        console.error(err)
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
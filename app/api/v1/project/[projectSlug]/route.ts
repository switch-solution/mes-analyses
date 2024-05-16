import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import { Project } from "@/src/classes/project"
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { projectSlug: string } }) {
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
            const client = new Client(clientSlug)
            const clientDetail = await client.clientDetail()
            const projectSlug = new Project(params.projectSlug)
            const projectExist = await projectSlug.projectExist()
            if (!projectExist) {
                return Response.json({ error: "Project not found" }, { status: 404 })

            }
            const project = await projectSlug.projectDatas()
            return Response.json({ project })
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
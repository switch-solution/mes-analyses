
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import { type NextRequest } from 'next/server'
import { ProcessusFactory } from "@/src/classes/processusFactory"
import { Project } from "@/src/classes/project"
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const projectSlug = params.slug
        if (!projectSlug) {
            return Response.json({ error: "Slug manquant" })
        }
        const project = new Project(projectSlug)
        const projectExist = await project.projectExist()
        if (!projectExist) {
            return Response.json({ error: "Projet inexistant" })
        }
        const projectDetail = await project.projectDetails()
        if (!projectDetail) {
            return Response.json({ error: "Erreur lors de la récupération des détails du projet" })
        }
        const searchParams = request.nextUrl.searchParams
        const processusSlug = searchParams.get('processusSlug')
        if (!processusSlug) {
            return Response.json({ error: "Slug du processus manquant" }, { status: 400 })
        }
        const api = request.headers.get('Authorization')
        if (!api) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }
        const security = new Security()
        try {
            const clientSlug = await security.apiIsValid(api, request.url)
            const client = new Client(clientSlug)
            const clientDetail = await client.clientDetail()
            if (clientDetail?.siren !== projectDetail.clientId) {
                return Response.json({ error: "Client non autorisé" })
            }
            try {
                const processus = ProcessusFactory.create({
                    processusSlug,
                    clientId: projectDetail.clientId,
                    projectLabel: projectDetail.label,
                    sofwareLabel: projectDetail.softwareLabel
                })
                const extraction = await processus.extraction()

                return Response.json({ extraction })
            } catch (err) {
                return Response.json({ error: "Le processus n'existe pas" }, { status: 400 })

            }

        } catch (err) {
            return Response.json({ error: "Erreur lors de la vérification de l'API" }, { status: 400 })
        }

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

import { getProjectBySlug } from "@/src/query/project.query"
import { getClientIdByApiKey } from "@/src/query/security.query";
import { getSocietyByProject } from "@/src/query/project_data.query"
export async function GET(request: Request, { params }: { params: { projectSlug: string } }
) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) return Response.json({ message: "Unauthorized" }, { status: 401 })
        const clientId = await getClientIdByApiKey(api, request.url)
        if (!clientId) return Response.json({ message: "Client not found" }, { status: 404 })
        const projectsExist = await getProjectBySlug(params.projectSlug)
        if (!projectsExist) return Response.json({ message: "Project not found" }, { status: 404 })
        const clientProject = projectsExist.clientId
        if (clientId !== clientProject) return Response.json({ message: "Unauthorized" }, { status: 401 })

        const society = await getSocietyByProject({
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel,
            clientId: projectsExist.clientId

        })
        return Response.json({ society })
    } catch (err) {
        return Response.json({ error: "Erreur interne" })

    }

}
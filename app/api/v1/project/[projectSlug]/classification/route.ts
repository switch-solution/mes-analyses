import { getProjectBySlug } from "@/src/query/project.query"
import { getClassificationByProject } from "@/src/query/project_data.query"
export async function GET(request: Request, { params }: { params: { projectSlug: string } }
) {
    try {
        const projectsExist = await getProjectBySlug(params.projectSlug)
        if (!projectsExist) return Response.json({ message: "Project not found" }, { status: 404 })
        const classification = await getClassificationByProject({
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel,
            clientId: projectsExist.clientId

        })
        return Response.json({ classification })
    } catch (err) {
        return Response.json({ error: "Erreur interne" })

    }

}
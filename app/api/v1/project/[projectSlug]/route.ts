import { getProjectBySlug } from "@/src/query/project.query"
export async function GET(request: Request, { params }: { params: { projectSlug: string } }
) {
    try {
        const api = request.headers.get('Authorization')
        if (!api) return Response.json({ message: "Unauthorized" }, { status: 401 })
        const projectsExist = await getProjectBySlug(params.projectSlug)
        if (!projectsExist) return Response.json({ message: "Project not found" }, { status: 404 })
        return Response.json({ projectsExist })
    } catch (err) {
        return Response.json({ error: "Erreur interne" })

    }

}
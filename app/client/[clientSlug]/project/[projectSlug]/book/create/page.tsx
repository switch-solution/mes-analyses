import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import ImportBook from "@/components/form/project_book/import";
import { getBookBySoftwareLabelAndClientSlug } from "@/src/query/software.query"
import { getProjectBySlug } from "@/src/query/project.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    const project = await getProjectBySlug(params.projectSlug)
    if (!project) throw new Error("Le projet n'existe pas")
    const books = await getBookBySoftwareLabelAndClientSlug(project.softwareLabel, params.clientSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (
        <div>
            <ImportBook clientSlug={params.clientSlug} projectSlug={params.projectSlug} books={books} />
        </div>)
}
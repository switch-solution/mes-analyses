import { Security } from "@/src/classes/security"
import { Project } from "@/src/classes/project"
import Modal from "./projectModal"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {

    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    const isAdminProject = await security.isAdministratorInThisProject(params.projectSlug)
    if (!isAdminProject) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
    }
    const project = new Project(params.projectSlug)
    const projectDetail = await project.projectDetails()
    return (
        <Modal clientSlug={params.clientSlug} projectSlug={params.projectSlug} project={{
            label: projectDetail.label,
            description: projectDetail.description,
            status: projectDetail.status as 'Actif' | 'Archivé' | 'En attente'
        }} />
    )
}
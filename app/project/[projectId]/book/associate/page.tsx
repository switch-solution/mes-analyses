import { getBookBySoftware } from "@/src/query/standard_book.query"
import { getProjectById } from "@/src/query/project.query"
import AssociateBookToProjectForm from "@/src/features/form/project/associate"
export default async function AddBookToProject({ params }: { params: { projectId: string } }) {
    const projet = await getProjectById(params.projectId)
    if (!projet) {
        throw new Error("Impossible de récupérer le projet")
    }
    const books = await getBookBySoftware(projet.softwareId)
    return (<AssociateBookToProjectForm projectId={params.projectId} books={books} />)
}
import BookCreateForm from "@/components/form/software_book/create"
import { userIsEditorClient } from "@/src/query/security.query"
import { getSoftwareBySlug } from "@/src/query/software.query";
export default async function CreateBook({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) throw new Error("Le logiciel n'existe pas.")
    return (<BookCreateForm softwareSlug={params.softwareSlug} clientSlug={params.clientSlug} />)
}
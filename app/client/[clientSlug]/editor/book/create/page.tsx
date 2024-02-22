import BookCreateForm from "@/components/form/stdBook/create"
import { userIsEditor } from "@/src/query/security.query"
import { getMySoftware } from "@/src/query/user.query";
export default async function CreateBook({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwares = await getMySoftware()
    return (<BookCreateForm softwares={softwares} clientSlug={params.clientSlug} />)
}
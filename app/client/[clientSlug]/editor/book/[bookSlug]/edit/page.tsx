import { userIsEditor } from "@/src/query/security.query"
import BookEditForm from "@/components/form/software_book/edit"
export default async function BookEdit({ params }: { params: { clientSlug: string, bookSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (<div><p>test</p></div >)
}
import { userIsEditor } from "@/src/query/security.query"
import { getStdBookBySlug } from "@/src/query/software_book.query"
import BookEditForm from "@/components/form/software_book/edit"
export default async function BookEdit({ params }: { params: { clientSlug: string, bookSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdBook = await getStdBookBySlug(params.bookSlug)
    if (!stdBook) throw new Error("Le livre n'existe pas.")
    return <div><BookEditForm stdBook={stdBook} clientSlug={params.clientSlug} /></div >
}
import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getProjectBook } from "@/src/query/project.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const booksList = await getProjectBook(params.projectSlug)
    const stdBook = booksList.map((book) => {
        return {
            label: book.label,
            description: book.description,
            softwareLabel: book.projectSoftwareLabel,
            clientSlug: params.clientSlug,
            slug: book.slug,
            isValidate: book.isValidate,
            isHold: book.isHold,
            isStarted: book.isStarted,
            isModifiedAfertValidation: book.isModifiedAfertValidation,
            projectSlug: params.projectSlug
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={stdBook} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/book/create`} buttonLabel="Créer un nouveau livre" />
        </div>
    )
}
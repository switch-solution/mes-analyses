import { userIsValid } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
import { getBookBySoftwares } from "@/src/query/book.query";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const booksList = await getBookBySoftwares()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const softwares = await getSoftwareByUserIsEditor()
    const books = booksList.map((book) => {
        return {
            id: book.id,
            software: softwares.find((software) => software.id === book.softwareId)?.name || 'Inconnu',
            label: book.label,
            description: book.description,
            status: book.status,
            open: book.id,
            edit: book.id,
            delete: book.id,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={books} href={`/editor/book/`} hrefToCreate={`/editor/book/create`} searchPlaceholder="Chercher libellé" inputSearch="label" />
        </div>
    )
}
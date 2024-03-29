import { userIsEditorClient } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={[]} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/attachment/create`} buttonLabel="Ajouter une PJ" />
        </div>
    )
}
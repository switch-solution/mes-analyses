import { userIsEditorClient } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getSoftwaresItemsFilterByUserSoftware } from "@/src/query/software.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    const itemsList = await getSoftwaresItemsFilterByUserSoftware()
    const items = itemsList.map((item) => {
        return {
            clientSlug: params.clientSlug,
            code: item.id,
            type: item.type,
            label: item.label,
            softwareLabel: item.softwareLabel,
            slug: item.slug,
            description: item.description,
            idccCode: item.idccCode,

        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={items} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/item/create`} buttonLabel="Ajouter une rubrique" />
        </div>
    )
}
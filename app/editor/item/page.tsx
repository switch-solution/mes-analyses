import { userIsValid } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getSoftwareItems } from "@/src/query/softwareItems.query";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const itemsList = await getSoftwareItems()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const softwares = await getSoftwareByUserIsEditor()
    const items = itemsList.map((item) => {
        return {
            id: item.slug,
            software: softwares.find((software) => software.id === item.softwareId)?.name || 'Inconnu',
            code: item.id,
            type: item.type,
            label: item.label,
            version: item.version.toString(),
            open: item.id,
            edit: item.id,
            delete: item.id,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={items} href={`/editor/item/`} hrefToCreate={`/editor/item/create`} searchPlaceholder="Chercher code rubrique" inputSearch="code" />
        </div>
    )
}
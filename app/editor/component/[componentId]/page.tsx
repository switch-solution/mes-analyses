import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { userIsEditorClient, userIsValid } from "@/src/query/security.query";
import { getStandardComponentClient } from "@/src/query/stdcomponent.query"
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query"
export default async function Page({ params }: { params: { componentId: string } }) {

    const user = await userIsValid()
    if (!user) throw new Error('Vous devez être connecté')
    const clientId = await getStandardComponentClient(params.componentId)
    const userIsEditor = await userIsEditorClient(clientId)
    if (!userIsEditor) throw new Error('Vous n\'avez pas les droits pour accéder à cette page')
    const componentInputList = await getStandardInputByComponentId(params.componentId)
    const invoices = componentInputList.map((component) => {
        return {
            id: component.id,
            type: component.type,
            label: component.label,
            isCode: component.isCode ? 'Oui' : 'Non',
            isLabel: component.isLabel ? 'Oui' : 'Non',
            isDescription: component.isDescription ? 'Oui' : 'Non',
            order: component.order,
            open: component.id,
            edit: component.id,
            delete: component.id,

        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={invoices} href={`/editor/component/${params.componentId}/input/`} hrefToCreate={`/editor/component/${params.componentId}/create`} searchPlaceholder="Chercher par nom" inputSearch="label" />
        </div>
    )
}
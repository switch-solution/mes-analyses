import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { userIsValid } from "@/src/query/security.query";
import { getValuesByComponentIdAndVersion, getLastOrderInput } from "@/src/query/sandboxValues.query"
import { transformRowsToColumns } from "@/src/features/formBuilder/formBuilder";
import { getIsCode, getIsLabel, getIsDescription } from "@/src/query/stdComponentInput.query"
import type { Row } from "@/src/helpers/type";

export default async function Page({ params }: { params: { componentId: string } }) {

    const user = await userIsValid()
    if (!user) {
        throw new Error("You are not authorized to access this page")
    }
    const numberOfLastVesrsion = await getLastOrderInput(params.componentId)

    const values = await getValuesByComponentIdAndVersion(params.componentId, numberOfLastVesrsion ? numberOfLastVesrsion : 1)
    const fieldIsCode = await getIsCode(params.componentId)
    const fieldIsLabel = await getIsLabel(params.componentId)
    const fieldIsDescription = await getIsDescription(params.componentId)
    if (!fieldIsCode || !fieldIsLabel || !fieldIsDescription) {
        throw new Error("The component does not have the required fields")
    }
    const data = [
        {
            id: params.componentId,
            code: values.find((value) => value.Standard_Composant_InputId === fieldIsCode.id)?.value,
            label: values.find((value) => value.Standard_Composant_InputId === fieldIsLabel.id)?.value,
            description: values.find((value) => value.Standard_Composant_InputId === fieldIsDescription.id)?.value,
            open: params.componentId,
            edit: params.componentId,
            delete: params.componentId,
        }
    ]

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} href={`/editor/component/${params.componentId}/sandbox/`} hrefToCreate={`/editor/component/${params.componentId}/sandbox/create`} searchPlaceholder="Chercher par code" inputSearch="code" />
        </div>
    )
}
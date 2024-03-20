import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query"
import { getStandardInputById } from "@/src/query/sofwtare_input.query"
import { getSoftwareByClientSlugAndSoftwareLabel } from "@/src/query/software.query"
import { getOptionsByInputSlug } from "@/src/query/software_option.query"
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string, inputSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const input = await getStandardInputById(params.inputSlug)
    const software = await getSoftwareByClientSlugAndSoftwareLabel(params.clientSlug, input.softwareLabel)
    if (!software) throw new Error("Le logiciel n'existe pas")
    const optionsList = await getOptionsByInputSlug(params.inputSlug)
    const options = optionsList.map((option) => {
        return {
            inputSlug: params.inputSlug,
            clientSlug: params.clientSlug,
            componentSlug: params.componentSlug,
            label: option.label,
            defaultValue: option.selected,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={options} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/component/${params.componentSlug}/input/${params.inputSlug}/option/create`} buttonLabel="Créer une option" />
        </div>
    )


}
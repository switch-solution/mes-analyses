import { userIsEditor } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getSoftwareConstantFilterByUserSoftware } from "@/src/query/software.query";
import { getConstantLegal } from "@/src/query/constantLegal.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    const constantList = await getSoftwareConstantFilterByUserSoftware()
    const constants = constantList.map((constant) => {
        return {
            clientSlug: params.clientSlug,
            code: constant.id,
            value: constant.value,
            dateStart: constant.dateStart.toLocaleDateString(),
            label: constant.label,
            softwareLabel: constant.softwareLabel,
            slug: constant.slug,
            description: constant.description,
            idccCode: constant.idccCode,
            level: 'Logiciel'

        }
    })
    const constantLegal = await getConstantLegal()
    const constansLegal = constantLegal.map((constant) => {
        return {
            code: constant.id,
            clientSlug: params.clientSlug,
            label: constant.label,
            description: constant.description,
            idccCode: constant.idccCode,
            value: constant.value,
            level: 'Standard',
            dateStart: constant.dateStart.toLocaleDateString(),
            softwareLabel: '',
            slug: constant.slug
        }
    })
    const allConstants = [...constansLegal, ...constants]
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={allConstants} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/constant/create`} buttonLabel="Ajouter une constante" />
        </div>
    )
}
import { userIsEditor } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getConstantLegal } from "@/src/query/constantLegal.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    const constantLegal = await getConstantLegal(params.clientSlug)
    const constansLegal = constantLegal.map((constant) => {
        return {
            code: constant.id,
            clientSlug: params.clientSlug,
            label: constant.label,
            description: constant.description,
            idccCode: constant.idccCode,
            value: constant.value,
            level: constant.level,
            dateStart: constant.dateStart.toLocaleDateString(),
            dateEnd: constant.dateEnd.toLocaleDateString(),
            softwareLabel: constant.level === 'Standard' ? 'Tous' : constant.softwareLabel,
            slug: constant.slug
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={constansLegal} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/constant/create`} buttonLabel="Ajouter une constante" />
        </div>
    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { userIsEditor } from "@/src/query/security.query";
import { getComponnentByClientFilterUserSoftware } from "@/src/query/software_component.query";

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const componentsList = await getComponnentByClientFilterUserSoftware(params.clientSlug)
    const component = componentsList.map((component) => {
        return {
            clientSlug: params.clientSlug,
            label: component.label,
            description: component.description,
            status: component.status,
            softwareLabel: component.softwareLabel,
            slug: component.slug

        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={component} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/component/create`} buttonLabel="Créer un nouveau composant" />
        </div>
    )
}
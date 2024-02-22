import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getSoftwareClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    const softwaresList = await getSoftwareClientList(params.clientSlug)
    const softwares = softwaresList.map((software) => {
        return {
            id: software.slug,
            label: software.label,
            clientSlug: software.client.slug
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={softwares} inputSearch="label" inputSearchPlaceholder="Chercher par logiciel" href={`/client/${params.clientSlug}/administrator/software/create`} buttonLabel="Créer un nouveau logiciel" />
        </div>
    )
}
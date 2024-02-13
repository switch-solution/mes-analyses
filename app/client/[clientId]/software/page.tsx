import { getAuthSession } from "@/lib/auth";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getSoftwareClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { getUser } from "@/src/query/user.query";
export default async function Page({ params }: { params: { clientId: string } }) {

    const user = await getUser()
    const isAdmin = await userIsAdminClient(params.clientId)
    const softwaresList = await getSoftwareClientList(params.clientId)
    const softwares = softwaresList.map((software) => {
        return {
            id: software.id,
            name: software.name,
            provider: software.provider,
            open: software.id,
            edit: software.id,
            delete: software.id,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={softwares} href={`/client/${params.clientId}/software`} hrefToCreate={`/client/${params.clientId}/software/create`} searchPlaceholder={'Chercher par logiciel'} inputSearch="name" />
        </div>
    )
}
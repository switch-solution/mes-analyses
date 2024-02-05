import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getUsersClientList } from "@/src/query/client.query";
import { userIsAdminClient, userIsValid } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientId: string } }) {

    const user = await userIsValid()
    await userIsAdminClient(params.clientId)
    const userClient = await getUsersClientList(params.clientId)
    const users = userClient.map((user) => {
        return {
            id: user.user.id,
            name: user.user.name,
            status: user.isBillable === true ? "Oui" : "Non",
            email: user.user.email,
            image: user.user.image,
            open: user.user.id,
            edit: user.user.id,
            delete: user.user.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} href={`/client/${params.clientId}/user`} hrefToCreate={`/client/${params.clientId}/invitation`} searchPlaceholder="Chercher par email" inputSearch="email" />
        </div>
    )
}
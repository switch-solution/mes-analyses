import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getUsersClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {


    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const userClient = await getUsersClientList(params.clientSlug)
    const users = userClient.map((user) => {
        return {
            name: `${user.user.UserOtherData.at(0)?.lastname} ${user.user.UserOtherData.at(0)?.firstname}`,
            status: user.isActivated === true ? "Oui" : "Non",
            email: user.user.email,
            image: user.user.image,
            open: user.user.id,
            edit: user.user.id,
            delete: user.user.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} inputSearch="email" inputSearchPlaceholder="Chercher par email" href={`/client/${params.clientSlug}/administrator/software/create`} buttonLabel="Inviter un utilisateur" />
        </div>
    )
}
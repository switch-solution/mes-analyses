import { getAuthSession } from "@/lib/auth";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { getUsersClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { redirect } from 'next/navigation';
export default async function UserList({ params }: { params: { id: string } }) {

    if (!params?.id) redirect('/home')

    const session = await getAuthSession()
    if (!session) {
        redirect('/api/auth/signin');
    }
    if (session.user.id) {
        try {
            await userIsAdminClient(session.user.id, params.id)

        } catch (e) {
            redirect('/home');
        }
    }

    const userClient = await getUsersClientList(params.id)
    const users = userClient.map((user) => {
        return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            image: user.user.image,
            open: user.user.id,
            edit: user.user.id,
            delete: user.user.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} href={`/client/${params.id}`} />
        </div>
    )
}
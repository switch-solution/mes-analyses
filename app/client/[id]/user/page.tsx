import { getAuthSession } from "@/lib/auth";
import { columns } from "./columns"
import { DataTable } from "./data-table"
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
    const user = []
    user.push(userClient[0].user)

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={user} />
        </div>
    )
}
import { userIsAdminClient } from "@/src/query/security.query"
import AssociateSoftwareForm from "@/components/form/software/associate"
import { getUser } from "@/src/query/user.query"
import { getUsersClientList } from "@/src/query/client.query"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const users = await getUsersClientList(params.clientSlug)
    return (
        <div>
            <AssociateSoftwareForm clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} users={users} />
        </div>
    )
}
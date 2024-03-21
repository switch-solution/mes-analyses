import { userIsAdminClient } from "@/src/query/security.query"
import CreateUserSoftware from "@/components/form/software/createUserSoftware"
import { getUserInternalNotInSoftware } from "@/src/query/software.query"
import Container from "@/components/layout/container"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const users = await getUserInternalNotInSoftware(params.softwareSlug)
    return (
        <Container>
            <CreateUserSoftware clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} users={users} />
        </Container>
    )
}
import CreateUserSoftware from "@/components/form/software/createUserSoftware"
import { getUserInternalNotInSoftware } from "@/src/query/software.query"
import { Container, ContainerDataTable, ContainerForm } from "@/components/layout/container"
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()

    const isAdmin = await security.isAdministratorClient(params.clientSlug)
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
import { userIsAdminClient } from "@/src/query/security.query"
import EditClient from "@/components/form/client/editClient"
import { getClientBySlug } from "@/src/query/client.query"
import Container from "@/components/layout/container"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    await userIsAdminClient(params.clientSlug)
    if (!params.clientSlug) throw new Error("Vous devez etre administrateur pour effectuer cette action.")

    const client = await getClientBySlug(params.clientSlug)

    return (
        <Container>
            <EditClient slug={params.clientSlug} client={client} />
        </Container>
    )

}
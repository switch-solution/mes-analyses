import { userIsAdminClient } from "@/src/query/security.query"
import Modal from "./clientModal"
import { getClientBySlug } from "@/src/query/client.query"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    await userIsAdminClient(params.clientSlug)
    const client = await getClientBySlug(params.clientSlug)
    return (
        <Modal clientSlug={params.clientSlug} client={client} />
    )
}
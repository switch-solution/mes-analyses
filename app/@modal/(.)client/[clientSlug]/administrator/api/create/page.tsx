import { userIsAdminClient } from "@/src/query/security.query"
import Modal from "./apiModal"
import { getClientBySlug } from "@/src/query/client.query"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    await userIsAdminClient(params.clientSlug)
    const client = await getClientBySlug(params.clientSlug)
    if (!client) {
        throw new Error("Client not found")
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )
}
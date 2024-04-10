import Modal from "./apiModal"
import { getClientBySlug } from "@/src/query/client.query"
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userIsAdmin = await security.isAdministratorClient(params.clientSlug)
    const client = await getClientBySlug(params.clientSlug)
    if (!client) {
        throw new Error("Client not found")
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )
}
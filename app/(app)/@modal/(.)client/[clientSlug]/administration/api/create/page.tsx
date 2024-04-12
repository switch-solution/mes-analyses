import Modal from "./apiModal"
import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Client not found")
    }
    const clientDetail = await client.clientDetail()
    if (!clientDetail) {
        throw new Error("Client not found")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorClient(clientDetail?.siren)
    if (!client) {
        throw new Error("Client not found")
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )
}
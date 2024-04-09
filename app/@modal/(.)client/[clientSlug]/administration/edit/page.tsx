import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import Modal from "./clientModal"
import { notFound } from "next/navigation"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté pour effectuer cette action.")
    }
    const client = new Client(params.clientSlug)
    const clientDetail = await client.clientDetail()
    if (!clientDetail) {
        notFound()
    }
    const userIsAdminClient = await security.isAdministratorClient(clientDetail?.siren)
    if (!userIsAdminClient) {
        throw new Error("Vous devez etre administrateur pour effectuer cette action.")
    }
    return (
        <Modal clientSlug={params.clientSlug} client={clientDetail} />
    )
}
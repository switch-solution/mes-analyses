import { Security } from "@/src/classes/security"
import { Client } from "@/src/classes/client"
import Modal from "./softwareModal"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas.")
    }
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    const isEditor = await security.isEditorClient(clientExist.siren)
    if (!isEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )
}
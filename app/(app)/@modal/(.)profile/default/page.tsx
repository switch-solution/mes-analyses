import { Security } from "@/src/classes/security"
import { User } from "@/src/classes/user";
import Modal from "./defaultModal"
export default async function Page() {
    const security = new Security()
    const userIsValid = await security.userIsValid()
    if (!userIsValid) {
        throw new Error("Vous devez être connecté pour accéder à cette page")
    }
    const user = new User(security.userId)
    if (!user) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const client = await user.getMyClientActive()
    const software = await user.getMySoftwareActive()
    const softwares = await user.getMySoftwaresAll()
    const clients = await user.getMyClientsAll()
    const clientsMap = clients.map((client) => {
        return {
            slug: client.slug,
            socialReason: client.socialReason,
            siren: client.siren
        }
    })
    const softwaresMap = softwares.map((software) => {
        return {
            slug: software.slug,
            label: software.label
        }
    })
    return (
        <Modal clientActive={client.clientSlug} softwareActive={software.softwareSlug} clients={clientsMap} softwares={softwaresMap} />

    )
}
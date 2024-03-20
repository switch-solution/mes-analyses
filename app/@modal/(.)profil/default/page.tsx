import { userIsValid } from "@/src/query/security.query";
import Modal from "./defaultModal"
import { getMySoftware, getMyClient, getMyClientActive, getMySoftwareActive } from "@/src/query/user.query";
export default async function Page() {

    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const clientActive = await getMyClientActive()
    const softwareActive = await getMySoftwareActive()
    const clients = await getMyClient()
    const softwares = await getMySoftware()
    return (
        <Modal clientActive={clientActive} softwareActive={softwareActive} clients={clients} softwares={softwares} />

    )
}
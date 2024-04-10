import Modal from "./feedbackModal"
import { Security } from "@/src/classes/security"
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    return (
        <Modal />
    )
}
import { userIsValid } from "@/src/query/security.query"
import Modal from "./feedbackModal"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    return (
        <Modal />
    )
}
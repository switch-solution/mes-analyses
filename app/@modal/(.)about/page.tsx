import { Security } from "@/src/classes/security"
import Modal from "./aboutModal"
export default async function Page() {
    const security = new Security()
    const user = await security.userIsValid()
    if (!user) {
        throw new Error("Not found")
    }
    return (
        <Modal />
    )
}
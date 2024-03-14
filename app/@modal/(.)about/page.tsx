import { userIsValid } from "@/src/query/security.query"
import Modal from "./aboutModal"
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("Not found")
    }
    return (
        <Modal />
    )
}
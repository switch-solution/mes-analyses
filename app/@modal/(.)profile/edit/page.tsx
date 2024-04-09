import Modal from "./userModal"
import { Security } from "@/src/classes/security"
import { User } from "@/src/classes/user"
export default async function Page() {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    const user = new User(userId.id)
    const userDetail = await user.getUserOtherData()

    return (
        <Modal user={userDetail} />
    )
}
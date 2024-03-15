import { userIsValid } from "@/src/query/security.query"
import Modal from "./userModal"
import { getUserOtherData } from "@/src/query/user.query"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    const userDetail = await getUserOtherData(userId)

    return (
        <Modal user={userDetail} />
    )
}
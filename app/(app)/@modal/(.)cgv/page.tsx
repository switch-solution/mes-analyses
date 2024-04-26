import Modal from "./cgvModal"
import { User } from "@/src/classes/user"
import { Security } from "@/src/classes/security"
export default async function Page() {
    const security = new Security()
    const session = await security.session()
    if (!session?.user.id) {
        throw new Error("Vous devez etre connecté")
    }
    const user = new User(session.user.id)
    const userDetail = await user.getUserOtherData()
    return (
        <Modal cgv={userDetail.cgv} />
    )
}
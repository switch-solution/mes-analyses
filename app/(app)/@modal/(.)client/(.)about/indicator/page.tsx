import Modal from "./indicatorModal"
import { getCountAllTables } from "@/src/query/bdd.query"
import { Security } from "@/src/classes/security"
export default async function Page() {
    const security = new Security()
    const user = await security.userIsValid()
    if (!user) {
        throw new Error("Not found")
    }
    const count = await getCountAllTables()
    return (
        <Modal count={count} />
    )
}
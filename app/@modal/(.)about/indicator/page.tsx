import { userIsValid } from "@/src/query/security.query"
import Modal from "./indicatorModal"
import { getCountAllTables } from "@/src/query/bdd.query"
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("Not found")
    }
    const count = await getCountAllTables()
    return (
        <Modal count={count} />
    )
}
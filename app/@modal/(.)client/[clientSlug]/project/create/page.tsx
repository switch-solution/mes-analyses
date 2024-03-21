import { userIsValid } from "@/src/query/security.query"
import Modal from "./projectModal"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )
}
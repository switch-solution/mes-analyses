import { userIsAdminClient } from "@/src/query/security.query";
import Modal from "./userModal"

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userIsAdmin = await userIsAdminClient(params.clientSlug);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    return (
        <Modal clientSlug={params.clientSlug} />
    )

}
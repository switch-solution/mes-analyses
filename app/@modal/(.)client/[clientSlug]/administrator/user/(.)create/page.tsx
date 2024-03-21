import { userIsAdminClient } from "@/src/query/security.query";
import Modal from "./userModal"
import { getMySoftware } from "@/src/query/user.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userIsAdmin = await userIsAdminClient(params.clientSlug);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    const softwares = await getMySoftware();
    return (
        <Modal clientSlug={params.clientSlug} softwares={softwares} />
    )

}
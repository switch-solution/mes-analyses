import Modal from "./userModal"
import { Security } from "@/src/classes/security";
import { User } from "@/src/classes/user";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security();
    const userIsAdmin = await security.isAdministratorClient(params.clientSlug);
    if (!userIsAdmin) {
        throw new Error("Vous devez etre admin pour acceder a cette page");
    }
    const user = new User(security.userId);
    const softwares = await user.getMySoftwaresAll();
    return (
        <Modal clientSlug={params.clientSlug} softwares={softwares} />
    )

}
import CreateSetup from "@/src/features/form/setup/create";
import { userIsValid } from "@/src/query/security.query";
import { getMyClient } from "@/src/query/user.query";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté pour acceder à cette page.")
    }
    const client = await getMyClient()
    if (client?.length !== 0) {
        throw new Error("Vous avez déjà une configuration.")
    }
    return (<div>
        <CreateSetup />
    </div>)
}
import { userIsValid } from "@/src/query/security.query";
import CreateClient from "@/src/features/form/client/create";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    return (<div>
        <CreateClient />
    </div>)
}
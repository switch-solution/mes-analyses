import CreateProject from "@/src/features/form/project/create"
import { getSoftwareByClientId } from "@/src/query/software.query"
import { getMyClient, getMySoftware } from "@/src/query/user.query"
export default async function ProjectCreate() {
    const clients = await getMyClient()
    const softwares = await getMySoftware()
    if (!clients) {
        throw new Error("Pas de client associé à votre compte")
    }
    return (<div>
        <CreateProject clients={clients} softwares={softwares} />
    </div>)
}
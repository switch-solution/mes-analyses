import ProjectCreateForm from "@/src/features/form/project/create"
import { getMyClient } from "@/src/query/user.query"
import { getSoftwareByClient } from "@/src/query/software.query"
export default async function ProjectCreate() {
    const clients = await getMyClient()
    if (!clients) {
        throw new Error("Pas de client associé à votre compte")
    }
    const softwares = await getSoftwareByClient(clients)
    return (<ProjectCreateForm clients={clients} softwares={softwares} />)
}
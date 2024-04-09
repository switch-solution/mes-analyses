import CreateSoftwareItem from "@/components/form/softwareItems/create"
import { getIdcc } from "@/src/query/idcc.query"
import { Client } from "@/src/classes/client"
import { User } from "@/src/classes/user"
import { Security } from "@/src/classes/security"
import { id } from "date-fns/locale"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()

    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const user = new User(security.userId)
    const softwares = await user.getMySoftwaresAll()
    const idccList = await getIdcc()
    const typeRubrique = [
        {
            id: '1',
            label: 'Rubrique 1',
            description: 'ukihiu',
            value: 'joij',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'hiojioj',
            softwareLabel: 'jiojioj',
            clientId: 'jiojioj',
            slug: 'ijioj',
            comment: 'jokpok'

        }

    ]
    return (<div>
        <CreateSoftwareItem softwares={softwares} idccList={idccList} typeRubrique={typeRubrique} />

    </div>)
}
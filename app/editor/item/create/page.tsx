import Create from "@/src/features/form/softwareItems/create"
import { getIdcc } from "@/src/query/idcc.query"
import { userIsValid } from "@/src/query/security.query"
import { getSoftwareByUserIsEditor } from "@/src/query/software.query"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('not authorized')
    }
    const softwares = await getSoftwareByUserIsEditor()
    const idccList = await getIdcc()
    return (<div>
        <Create softwares={softwares} idccList={idccList} />

    </div>)
}
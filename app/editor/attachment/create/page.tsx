import CreateStandardAttachment from "@/src/features/form/standardAttachment/create"
import { userIsValid } from "@/src/query/security.query"
import { getSoftwareByUserIsEditor } from "@/src/query/software.query"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const softwares = await getSoftwareByUserIsEditor()
    return (<div>
        <CreateStandardAttachment softwares={softwares} />
    </div>)
}
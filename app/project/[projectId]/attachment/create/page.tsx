import { userIsValid } from "@/src/query/security.query"
import CreateAttachment from "@/src/features/form/attachment/create"
export default async function Page({ params }: { params: { projectId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }

    return (<div><CreateAttachment projetId={params.projectId} /></div>)

}
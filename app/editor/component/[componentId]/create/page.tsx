import Create from "@/src/features/form/stdComponentInput/create"
import { userIsEditorClient, userIsValid } from "@/src/query/security.query"
import { getStandardComponentClient } from "@/src/query/stdcomponent.query"
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('You are not connected')
    }
    const clientId = await getStandardComponentClient(params.componentId)
    const userIsEditor = await userIsEditorClient(clientId)
    if (!userIsEditor) {
        throw new Error('You are not allowed to edit this component')
    }
    return (<Create composantId={params.componentId} />)
}
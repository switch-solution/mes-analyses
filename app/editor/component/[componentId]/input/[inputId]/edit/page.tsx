import { userIsValid, userIsEditorClient } from "@/src/query/security.query"
import { getStandardComponentClient } from "@/src/query/stdcomponent.query"

export default async function Page({ params }: { params: { componentId: string; inputId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('You are not connected')
    }
    const clientId = await getStandardComponentClient(params.componentId)
    const userIsEditor = await userIsEditorClient(clientId)

    return (<p>test</p>)

}
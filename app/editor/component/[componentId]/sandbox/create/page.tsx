import { userIsValid, userIsClientEditor } from "@/src/query/security.query"
import { getStandardComponentClient } from "@/src/query/stdcomponent.query"
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query"
import DynamicForm from "@/src/features/dynamic/dynamicForm"
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }
    const clientId = await getStandardComponentClient(params.componentId)
    const userIdEditor = await userIsClientEditor(clientId)

    if (!userIdEditor) {
        throw new Error('Vous n\'avez pas les droits pour accéder à cette page.')
    }
    const getStdComponentInput = await getStandardInputByComponentId(params.componentId)
    return (<div>
        <DynamicForm componentId={params.componentId} inputs={getStdComponentInput} />
    </div>
    )

}
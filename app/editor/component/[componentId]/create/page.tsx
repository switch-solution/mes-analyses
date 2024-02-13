import CreateInput from "@/src/features/form/stdComponentInput/create"
import { userIsEditorClient, userIsValid } from "@/src/query/security.query"
import { getStandardComponentById, getStandardComponentClient } from "@/src/query/stdcomponent.query"
import type { InputStandardType } from "@/src/helpers/type"
import { getStandardInput } from "@/src/query/standardInput.query"
import { CreateReactQuill } from "@/src/features/layout/reactQuill"
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
    const componentExist = await getStandardComponentById(params.componentId)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')

    }

    const standardInput = await getStandardInput()

    return (
        <div>
            {componentExist.type === 'textarea' ? <CreateReactQuill componentId={params.componentId} /> : <CreateInput componentId={params.componentId} inputType={standardInput} />}

        </div>
    )
}
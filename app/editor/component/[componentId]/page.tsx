import { userIsValid } from "@/src/query/security.query"
import { getStandardComponentById, getStandardComponentInput } from "@/src/query/stdcomponent.query"
import DynamicForm from "@/src/features/form/dynamic/dynamicForm"
import CreateInput from "@/src/features/form/stdComponentInput/create"
import { getStandardInput } from "@/src/query/standardInput.query"
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    if (!userId) throw new Error('Vous devez etre conneté pour acceder à cette page.')
    const componentExist = await getStandardComponentById(params.componentId)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    const inputs = await getStandardComponentInput(params.componentId)
    const inputType = await getStandardInput()
    return (
        <div className="container mx-auto py-10">
            <DynamicForm componentId={params.componentId} inputs={inputs} />
            <CreateInput componentId={params.componentId} inputType={inputType} />
        </div>

    )
}
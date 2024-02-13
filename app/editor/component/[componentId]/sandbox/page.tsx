import DynamicForm from "@/src/features/form/dynamic/dynamicForm";
import { userIsValid } from "@/src/query/security.query";
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query";
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('You are not connected')
    }
    const inputs = await getStandardInputByComponentId(params.componentId)
    return (<div><DynamicForm componentId={params.componentId} inputs={inputs} /></div>)
}
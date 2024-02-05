import AddInputToComponent from "@/src/features/form/formBuilder/AddInput"
import { getMaxStdComponetWithInput, getStdComponentWithInput } from "@/src/query/stdcomponent.query"
import { getStandardInput } from "@/src/query/standardInput.query"
export default async function Page({ params }: { params: { componentId: string } }) {
    const component = await getStdComponentWithInput(params.componentId)
    const maxOrder = await getMaxStdComponetWithInput(params.componentId)
    const standardInput = await getStandardInput()
    return (

        component ? <AddInputToComponent component={component} stdInput={standardInput} nextOrder={maxOrder._max.order ? maxOrder._max.order + 1 : 1} /> : undefined

    )




}
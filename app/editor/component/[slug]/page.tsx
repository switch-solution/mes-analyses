import AddInputToComponent from "@/src/features/form/component/addInput"
import { getStdComponentWithInput } from "@/src/query/stdcomponent.query"
export default async function CreateComponent({ params }: { params: { slug: string } }) {
    const component = await getStdComponentWithInput(params.slug)
    console
    return (
        <AddInputToComponent component={component} />

    )
}
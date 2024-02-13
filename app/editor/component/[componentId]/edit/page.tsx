import { userIsValid } from "@/src/query/security.query"
import { getStandardComponentById, getStandardComponentInput } from "@/src/query/stdcomponent.query"
import { EditTextArea } from "@/src/features/layout/reactQuill"
import { getStandardComponentTeaxtArea } from "@/src/query/stdcomponent.query"
import { redirect } from "next/navigation"
export default async function Page({ params }: { params: { componentId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('You are not connected')
    }
    const componentExist = await getStandardComponentById(params.componentId)
    if (!componentExist) {
        throw new Error('The component does not exist')
    }
    const componentType = componentExist.type
    let textarea = await getStandardComponentTeaxtArea(params.componentId)
    if (componentType !== 'textarea') {
        redirect(`/editor/component/${params.componentId}/`)
    }

    return (<div>
        {componentType === 'textarea' && textarea && <EditTextArea textarea={textarea} />}
    </div>
    )

}
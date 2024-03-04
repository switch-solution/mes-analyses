import DynamicForm from "@/components/form/dynamic/dynamicForm";
import { userIsEditor } from "@/src/query/security.query";
import { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query";
import { CreateReactQuill, EditTextArea } from "@/components/react-quill/reactQuil";
import { getStdComponentBySlug } from "@/src/query/software_component.query";
import { getTextAreaByComponentSlug } from "@/src/query/sofwtare_textArea";

export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdComponent = await getStdComponentBySlug(params.componentSlug)
    const inputs = await getStdInputsByStdComponentSlug(params.componentSlug)
    let textArea
    if (stdComponent.type === 'textarea') {
        textArea = await getTextAreaByComponentSlug(params.componentSlug)
    }
    return (<div className="w-full h-full lg:w-1/2">
        {stdComponent.isForm ? <DynamicForm componentSlug={params.componentSlug} clientSlug={params.clientSlug} inputs={inputs} stdComponent={stdComponent} /> :
            stdComponent.isTextArea && textArea ? <EditTextArea textarea={textArea} clientSlug={params.clientSlug} componentSlug={params.componentSlug} stdComponent={stdComponent} /> : <CreateReactQuill componentSlug={params.componentSlug} clientSlug={params.clientSlug} />
        }
    </div>)
}
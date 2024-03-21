import DynamicForm from "@/components/dynamic/dynamicForm";
import { userIsEditorClient } from "@/src/query/security.query";
import { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query";
import { getStdComponentBySlug } from "@/src/query/software_component.query";

export default async function Page({ params }: { params: { clientSlug: string, formSlug: string, softwareSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdComponent = await getStdComponentBySlug(params.formSlug)
    const inputs = await getStdInputsByStdComponentSlug(params.formSlug)
    return (<div className="size-full lg:w-1/2">
        <DynamicForm formSlug={params.formSlug} softwareSlug={params.softwareSlug} clientSlug={params.clientSlug} inputs={inputs} stdComponent={stdComponent} />
    </div>)
}
import DynamicForm from "@/components/dynamic/dynamicForm";
import { userIsEditor } from "@/src/query/security.query";
import { getStdInputsByStdComponentSlug } from "@/src/query/sofwtare_component_input.query";
import { getStdComponentBySlug } from "@/src/query/software_component.query";

export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdComponent = await getStdComponentBySlug(params.componentSlug)
    const inputs = await getStdInputsByStdComponentSlug(params.componentSlug)
    return (<div className="size-full lg:w-1/2">
        <DynamicForm componentSlug={params.componentSlug} clientSlug={params.clientSlug} inputs={inputs} stdComponent={stdComponent} />

    </div>)
}
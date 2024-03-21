import { userIsEditorClient } from "@/src/query/security.query";
import { getStdComponentBySlug } from "@/src/query/software_component.query";
import EditFormComponent from "@/components/form/component/edit";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdComponent = await getStdComponentBySlug(params.componentSlug)

    return (
        <EditFormComponent clientSlug={params.clientSlug} component={stdComponent} />
    )

}
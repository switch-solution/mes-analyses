import CreateFormComponent from '@/components/form/component/create'
import { userIsEditorClient } from "@/src/query/security.query";
export default async function CreateComponent({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    return (
        <CreateFormComponent clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} />
    )
}
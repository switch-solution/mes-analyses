import { userIsEditorClient } from "@/src/query/security.query"
import FormUpload from "@/components/form/upload/formUpload";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (
        <FormUpload clientSlug={params.clientSlug} componentSlug={params.componentSlug} />
    );
}
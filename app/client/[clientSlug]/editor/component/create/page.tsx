import CreateFormComponent from '@/components/form/component/create'
import { userIsEditor } from "@/src/query/security.query";
import { getMySoftware } from '@/src/query/user.query';
export default async function CreateComponent({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwares = await getMySoftware()
    return (
        <CreateFormComponent clientSlug={params.clientSlug} softwares={softwares} />
    )
}
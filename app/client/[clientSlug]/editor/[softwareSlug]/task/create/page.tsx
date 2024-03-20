import CreateStandardAttachment from "@/components/form/sotware_attachment/create"
import { userIsEditorClient } from "@/src/query/security.query"
import { getMySoftware } from "@/src/query/user.query";
import Container from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwares = await getMySoftware()
    return (<Container>
        <CreateStandardAttachment clientSlug={params.clientSlug} softwares={softwares} />
    </Container>)
}
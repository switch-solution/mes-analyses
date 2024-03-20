import { userIsEditorClient } from "@/src/query/security.query";
import CreateOption from "@/components/form/software_Input/createOption";
import Container from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string, inputSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (
        <Container>
            <CreateOption clientSlug={params.clientSlug} componentSlug={params.componentSlug} inputSlug={params.inputSlug} />
        </Container>

    )

}
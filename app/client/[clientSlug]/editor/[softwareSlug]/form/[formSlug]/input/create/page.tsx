import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import CreateSoftwareInput from "@/components/form/software_Input/createSoftwareInput";
export default async function Page({ params }: { params: { clientSlug: string, formSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    return (
        <Container>
            <CreateSoftwareInput clientSlug={params.clientSlug} formSlug={params.formSlug} softwareSlug={params.softwareSlug} />
        </Container>
    )

}
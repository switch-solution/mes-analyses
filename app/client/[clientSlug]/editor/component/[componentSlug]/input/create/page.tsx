import { userIsEditor } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import CreateSoftwareInput from "@/components/form/software_Input/createSoftwareInput";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    return (
        <Container>
            <CreateSoftwareInput clientSlug={params.clientSlug} componentSlug={params.componentSlug} />
        </Container>
    )

}
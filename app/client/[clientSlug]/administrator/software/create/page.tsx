import SoftwareCreateForm from "@/components/form/software/SoftwareCreateForm"
import Container from "@/components/layout/container";
import { userIsAdminClient } from "@/src/query/security.query";

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    return (
        <Container>
            <SoftwareCreateForm clientSlug={params.clientSlug} />
        </Container>
    )
}
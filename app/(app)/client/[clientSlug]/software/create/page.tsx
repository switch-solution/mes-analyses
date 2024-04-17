import { Container, ContainerBreadCrumb } from "@/components/layout/container";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import CreateSoftware from "@/components/form/software/createSoftware";

export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas.")
    }
    const security = new Security()
    const isAdmin = await security.isAdministratorClient(clientExist.siren)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    return (
        <Container>
            <CreateSoftware clientSlug={params.clientSlug} />
        </Container>
    )
}
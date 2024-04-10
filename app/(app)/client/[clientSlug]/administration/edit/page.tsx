import { Security } from "@/src/classes/security"
import EditClient from "@/components/form/client/editClient"
import { Container } from "@/components/layout/container"
import { Client } from "@/src/classes/client"
import { notFound } from "next/navigation"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté pour effectuer cette action.")
    }
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        notFound()
    }
    const clientDetail = await client.clientDetail()
    if (!clientDetail) {
        throw new Error("La fiche client est incomplète.")
    }
    const isAdmin = await security.isAdministratorClient(clientDetail?.siren)
    if (!isAdmin) {
        throw new Error("Vous devez etre administrateur pour effectuer cette action.")
    }

    return (
        <Container>
            <EditClient slug={params.clientSlug} client={clientDetail} />
        </Container>
    )

}
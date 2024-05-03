import CreatePage from "@/components/form/page/createPage"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from "@/src/classes/client"
import { Security } from "@/src/classes/security"
import { notFound } from "next/navigation"
export default async function ProjectCreate({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("Vous devez être connecté")
    }
    const client = new Client(params.clientSlug)
    if (!client) {
        notFound()
    }
    const clientDetail = await client.clientDetail()
    if (!clientDetail) {
        throw new Error("Client introuvable")
    }
    const isEditor = await security.isEditorClient(clientDetail.siren)
    if (!isEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
    }
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title="Création d'une nouvelle page">
                <CreatePage clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} />
            </ContainerForm>
        </Container>)
}
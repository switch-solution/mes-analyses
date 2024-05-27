import CreateForm from "@/components/form/form/createForm"
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
import { Software } from "@/src/classes/software"
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
    const software = new Software(params.softwareSlug)
    const softwareExist = await software.softwareExist()
    if (!softwareExist) {
        notFound()
    }
    const refs = await software.getSettingByLabel('Référentiel')
    if (!refs) {
        throw new Error("Référentiel introuvable")
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form`}>Formulaire</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form/create`}>Création formulaire</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title="Création d'un nouveau formulaire">
                <CreateForm clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} refs={refs} />
            </ContainerForm>
        </Container>)
}
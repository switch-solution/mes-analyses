import EditSoftwareAccumulation from "components/form/software_accumulation/editSoftwareAccumulation"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getAccumulationBySlug } from "@/src/query/software_accumulation.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, accumulationSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
    }
    const accumulation = await getAccumulationBySlug(params.accumulationSlug)
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/accumulation`}>Cumul de paie</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <EditSoftwareAccumulation clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} accumulationSlug={params.accumulationSlug} accumulation={accumulation} />
            </ContainerForm>
        </Container>
    )

}
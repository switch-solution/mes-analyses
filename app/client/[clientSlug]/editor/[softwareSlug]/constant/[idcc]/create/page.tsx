
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";
import CreateConstant from "@/components/form/constant/createConstant"
import { getSoftwareBySlug } from "@/src/query/software.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getIdccByCode } from "@/src/query/idcc.query";
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) {
        throw new Error("Cet IDCC n'existe pas.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
    return (<Container>
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant`}>Constante</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/constant/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ContainerBreadCrumb>
        <ContainerForm>
            <CreateConstant clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} idcc={params.idcc} />
        </ContainerForm>
    </Container>)

}
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { notFound } from "next/navigation";
import EditPage from "@/components/form/page/editPage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { Software } from "@/src/classes/software";
import { DynamicPage } from "@/src/classes/dynamicPage";
export default async function Page({ params }: { params: { clientSlug: string, pageSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        notFound();
    }
    const clientDetail = await client.clientDetail();
    if (!clientDetail) {
        notFound();
    }
    const page = new DynamicPage(params.pageSlug);
    const pageExist = await page.pageExist();
    if (!pageExist) {
        notFound();
    }
    const security = new Security();
    const userIsAuthorized = await security.isEditorClient(clientDetail.siren);
    if (!userIsAuthorized) {
        throw new Error('Vous devez etre editor pour acceder a cette page');
    }
    const software = new Software(params.softwareSlug);
    const softwareExist = await software.softwareExist();
    if (!softwareExist) {
        notFound();
    }

    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/page`}>Page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <EditPage
                    clientSlug={params.clientSlug}
                    softwareSlug={params.softwareSlug}
                    pageSlug={params.pageSlug}
                    page={{
                        label: pageExist.label,
                        status: pageExist.status as 'Actif' | 'Archivé' | 'En attente',
                        order: pageExist.order
                    }}
                />
            </ContainerForm>
        </Container>
    )

}
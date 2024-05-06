import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { notFound } from "next/navigation";
import DynamicPageAnalyse from "@/components/dynamicPageAnalyse/dynamicPageAnalyse";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { DynamicPage } from "@/src/classes/dynamicPage";
import { Container, ContainerBreadCrumb, ContainerForm, } from "@/components/layout/container";
import EditBlock from "@/components/form/page/editBlock";
export default async function Page({ params }: { params: { clientSlug: string, pageSlug: string, softwareSlug: string, blockSlug: string } }) {
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
    const blocks = await page.getblocks();
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
                                <Link href={`/client/${params.clientSlug}/editor`}>Editeur</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/page`}>Page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/page/${params.pageSlug}/edit`}>Edition</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title={`${pageExist.internalId} ${pageExist.label}`}>
                <EditBlock clientSlug={params.clientSlug} pageSlug={params.pageSlug} blockSlug={params.blockSlug} softwareSlug={params.softwareSlug} />
            </ContainerForm>
        </Container>
    )

}
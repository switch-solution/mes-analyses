import { prisma } from "@/lib/prisma"
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { notFound } from "next/navigation";
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
import EditBlockText from "@/components/form/page/editBlockText";
import EditBlockNumber from "@/components/form/page/editBlockNumber";
import EditBlockSelect from "@/components/form/page/editBlockSelect";
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
    const block = await page.blockExist(params.blockSlug);
    if (!block) {
        notFound();
    }
    const dsn = await prisma.dsn_Structure.findMany()
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
                {block.typeInput === 'text' && block.htmlElement === 'input' && <EditBlockText
                    dsn={dsn}
                    clientSlug={params.clientSlug}
                    pageSlug={params.pageSlug}
                    blockSlug={params.blockSlug}
                    softwareSlug={params.softwareSlug}
                    block={
                        {
                            label: block.label,
                            minLength: block.minLength,
                            maxLength: block.maxLength,
                            required: block.required,
                            readonly: block.readonly,
                            sourceDsnId: block.sourceDsnId ? block.sourceDsnId : ''
                        }
                    }
                />}
                {block.typeInput === 'number' && block.htmlElement === 'input' && <EditBlockNumber
                    clientSlug={params.clientSlug}
                    pageSlug={params.pageSlug}
                    blockSlug={params.blockSlug}
                    softwareSlug={params.softwareSlug}
                    block={
                        {
                            label: block.label,
                            min: block.min,
                            max: block.max,
                            required: block.required,
                            readonly: block.readonly
                        }
                    }
                />}
                {block.htmlElement === 'select' && <EditBlockSelect
                    clientSlug={params.clientSlug}
                    pageSlug={params.pageSlug}
                    blockSlug={params.blockSlug}
                    softwareSlug={params.softwareSlug}
                    block={
                        {
                            label: block.label,
                            min: block.min,
                            max: block.max,
                            required: block.required,
                            readonly: block.readonly
                        }
                    }
                />}

            </ContainerForm>
        </Container>
    )

}
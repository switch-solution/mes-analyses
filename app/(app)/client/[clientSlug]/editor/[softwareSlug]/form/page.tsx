import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { columns } from "./dataTablecolumns"
import { notFound } from "next/navigation";
import { DataTable } from "@/components/layout/dataTable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { User } from "@/src/classes/user";
import { Software } from "@/src/classes/software";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        notFound();
    }
    const clientDetail = await client.clientDetail();
    if (!clientDetail) {
        notFound();
    }
    const security = new Security();
    const userIsAuthorized = await security.isEditorClient(clientDetail.siren);
    if (!userIsAuthorized) {
        throw new Error('Vous devez etre editor pour acceder a cette page');
    }
    const user = new User(security.userId);
    const softwareActive = await new Software(params.softwareSlug).softwareExist()
    if (!softwareActive) {
        notFound()
    }
    const softwareForm = await prisma.form.findMany({
        where: {
            level: 'Logiciel',
            clientId: clientDetail.siren,
            softwareLabel: softwareActive.label
        }
    })
    const forms = [...softwareForm].map((page) => {
        return {
            internalId: page.internalId,
            level: page.level,
            label: page.label,
            slug: page.slug,
            clientSlug: params.clientSlug,
            softwareSlug: params.softwareSlug,
            status: page.status,
            repository: page.repository
        }
    })

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
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form`}>Formulaire</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={forms} inputSearch="internalId" inputSearchPlaceholder="Chercher par identifiant" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form/create`} buttonLabel="Créer un nouveau formulaire" />
            </ContainerDataTable>
        </Container>
    )

}
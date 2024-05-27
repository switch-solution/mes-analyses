import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { notFound } from "next/navigation";
import EditForm from "@/components/form/form/editForm";
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
import { Form } from "@/src/classes/form";
export default async function Page({ params }: { params: { clientSlug: string, formSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        notFound();
    }
    const clientDetail = await client.clientDetail();
    if (!clientDetail) {
        notFound();
    }
    const form = new Form(params.formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
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

    const refs = await software.getSettingByLabel('Référentiel')
    if (!refs) {
        throw new Error("Référentiel introuvable")
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
                <EditForm
                    clientSlug={params.clientSlug}
                    softwareSlug={params.softwareSlug}
                    formSlug={params.formSlug}
                    refs={refs}
                    formData={{
                        label: formExist.label,
                        status: formExist.status as 'Actif' | 'Archivé' | 'En attente',
                        description: formExist.description,
                        repository: formExist.repository
                    }}
                />
            </ContainerForm>
        </Container>
    )

}
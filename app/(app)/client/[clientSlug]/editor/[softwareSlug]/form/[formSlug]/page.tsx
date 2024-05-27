import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
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
import EditFormField from "@/components/form/form/editFormField";
import { Software } from "@/src/classes/software";
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
    const fieldsList = await form.getFiedls();
    const fields = fieldsList.map((fields) => {
        return fields.FormField.map((field) => {
            return {
                id: field.id,
                label: field.label,
                type: field.type,
                slug: field.slug,
            }
        })

    }).flat(1)
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
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form`}>Formulaire</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <EditFormField
                    clientSlug={params.clientSlug}
                    softwareSlug={params.softwareSlug}
                    formProps={
                        {
                            id: formExist.id,
                            version: formExist.version,
                            label: formExist.label,
                            slug: formExist.slug,
                            description: formExist.description,
                        }
                    }
                    fields={fields}

                />
            </ContainerForm>
        </Container>
    )

}
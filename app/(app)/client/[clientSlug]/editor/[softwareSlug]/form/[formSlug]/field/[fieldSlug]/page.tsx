import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import EditSelect from "@/components/form/form/editSelect";
import EditInputNumber from "@/components/form/form/editInputNumber";
import EditInputText from "@/components/form/form/editInputText";
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
import { prisma } from "@/lib/prisma";
import { Field } from "@/src/classes/field";
import { Software } from "@/src/classes/software";
import { Form } from "@/src/classes/form";
export default async function Page({ params }: { params: { clientSlug: string, formSlug: string, fieldSlug: string, softwareSlug: string } }) {
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
    const software = new Software(params.softwareSlug);
    const softwareExist = await software.softwareExist();
    if (!softwareExist) {
        notFound();
    }
    const form = new Form(params.formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
        notFound();
    }
    const field = new Field(params.fieldSlug);
    const fieldExist = await field.fieldExist();
    if (!fieldExist) {
        notFound();
    }
    const dsn = await prisma.dsn_Structure.findMany()
    console.log(fieldExist)
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
                                <Link href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/formulaire`}>Formulaire</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                {fieldExist.type === 'Champ texte' &&
                    <EditInputText
                        fieldSlug={params.fieldSlug}
                        dsn={dsn}
                        clientSlug={params.clientSlug}
                        formSlug={params.formSlug}
                        softwareSlug={params.softwareSlug}
                        field={fieldExist} />}
            </ContainerForm>
        </Container>
    )

}
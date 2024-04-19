import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
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
import { Software } from "@/src/classes/software";
import { notFound } from "next/navigation";
import { Form } from "@/src/classes/form"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, processusSlug: string, formSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const software = new Software(params.softwareSlug)
    const softwareExist = await software.softwareExist()
    if (!softwareExist) {
        notFound()
    }

    const form = new Form(params.formSlug)
    const inputsList = await form.getInput()
    const inputs = inputsList.map((input) => {
        return {
            id: input.id,
            label: input.label,
            type: input.type,
            order: input.order,
            required: input.required,
            formSlug: input.formSlug,
            processusSlug: params.processusSlug,
            clientSlug: params.clientSlug,
            softwareSlug: params.softwareSlug,
            slug: input.slug
        }
    })
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus`}>Processus</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus/${params.processusSlug}`}>{params.processusSlug}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus/${params.processusSlug}/form/${params.formSlug}`}>{params.formSlug}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={inputs} inputSearch="id" inputSearchPlaceholder="Chercher par code processus" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus/create`} buttonLabel="Créer un nouveau processus" />
            </ContainerDataTable>
        </Container>
    )
}
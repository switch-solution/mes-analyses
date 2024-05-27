import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
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

import { prisma } from "@/lib/prisma";
import { Form } from "@/src/classes/form";
import { Software } from "@/src/classes/software";
import ButtonAddFormValue from "@/components/form/form/buttonAddFormValue";
import DynamicForms from "@/components/form/form/dynamicForms";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, settingSlug: string } }) {
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
    const formSlug = await prisma.form.findFirst({
        where: {
            clientId: clientDetail.siren,
            softwareLabel: softwareExist.label,
            repository: params.settingSlug
        }
    })
    if (!formSlug) {
        throw new Error('Impossible de trouver le formulaire')
    }
    const form = new Form(formSlug.slug)
    const formExist = await form.formExist()
    if (!formExist) {
        notFound()
    }
    const dynamicForm = await form.getDynamicFormElements({
        clientId: clientDetail.siren,
        softwareLabel: softwareExist.label,
        mode: 'Editeur',
        projectLabel: null,
        pageId: null
    })

    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form`}>Formulaire</BreadcrumbLink>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <ButtonAddFormValue
                    clientSlug={params.clientSlug}
                    softwareSlug={params.softwareSlug}
                    settingSlug={params.settingSlug}
                    formSlug={formSlug.slug}
                    mode="Editeur"
                    projectSlug={undefined}
                    pageSlug={undefined}
                    buttonLabel={dynamicForm.form.buttonLabel}
                    projectPageSlug={undefined}

                />
                <DynamicForms
                    clientSlug={params.clientSlug}
                    settingSlug={params.settingSlug}
                    formSlug={formSlug.slug}
                    softwareSlug={params.softwareSlug}
                    pageSlug={null}
                    formGroup={dynamicForm.formGroup?.Form_Group ? dynamicForm.formGroup.Form_Group : null}
                    projectSlug={null}
                    formProps={dynamicForm.form}
                    datas={dynamicForm.datas}
                    fields={dynamicForm.fields}
                />

            </ContainerDataTable>

        </Container>
    )

}
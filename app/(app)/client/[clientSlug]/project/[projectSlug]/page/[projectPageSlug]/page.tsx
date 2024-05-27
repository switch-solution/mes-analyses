import Link from "next/link"
import { Security } from "@/src/classes/security";
import { Project } from "@/src/classes/project";
import { Client } from "@/src/classes/client";
import { ProjectPage } from "@/src/classes/projectPage";
import { Form } from "@/src/classes/form";
import { Container, ContainerBreadCrumb, ContainerPage } from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation";
import { DynamicPage } from "@/src/classes/dynamicPage"
import ButtonAddFormValue from "@/components/form/form/buttonAddFormValue";
import DynamicForms from "@/components/form/form/dynamicForms";

type DynamicForm = {
    form: {
        id: string,
        repository: string | null | undefined,
        internalId: string,
        version: number,
        level: string,
        description: string | null | undefined,
        status: string,
        label: string,
        slug: string,
        softwareLabel: string | null | undefined,
        clientId: string | null | undefined,
        originalFormId: string | null,
        originalFormVersion: number | null,
        buttonLabel: string,
        isArchived: boolean
    },
    fields: {
        id: string,
        label: string,
        type: string,
        htmlElement: string,
        order: number,
        min: number,
        max: number,
        required: boolean,
        slug: string,
        sourceDsnId: string | null,
        optionsFormId: string | null,
        optionsInputId: string | null,
        options: string | null,
        minLength: number,
        maxLength: number,
        placeholder: string | null
    }[],
    formGroup: {
        id: string,
        repository: string,
        internalId: string,
        version: number,
        level: string,
        description: string,
        status: string,
        label: string,
        slug: string,
        softwareLabel: string,
        clientId: string,
        originalFormId: string | null,
        originalFormVersion: string | null,
        buttonLabel: string,
        isArchived: boolean
        Form_Group: {
            formId: string,
            formVersion: number,
            formGroup: string,
            mode: string,
            softwareLabel: string,
            clientId: string,
            pageId: string | null,
            projectLabel: string | null,


        }[] | null
    },
    datas: { formGroup: string, [key: string]: string }[]
}


export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, projectPageSlug: string } }) {
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
    const project = new Project(params.projectSlug);
    const projectExist = await project.projectExist();
    if (!projectExist) {
        notFound();
    }
    const projectPage = new ProjectPage(params.projectPageSlug);
    const projectPageExist = await projectPage.projectPageExist();
    if (!projectPageExist) {
        notFound();
    }
    const projectDetail = await project.projetDetail();
    if (!projectDetail) {
        notFound();
    }
    const softwareLabel = projectDetail.softwareLabel
    const softwareSlug = await prisma.software.findFirstOrThrow({
        where: {
            label: softwareLabel,
            clientId: clientDetail.siren
        },
        select: {
            slug: true
        }
    })
    const pageSlug = await projectPage.getPageSlug();
    const page = new DynamicPage(pageSlug);
    const pageExist = await page.pageExist();
    if (!pageExist) {
        notFound();
    }
    const dynamicPage = new DynamicPage(pageSlug);
    const forms = await dynamicPage.getForms();
    const blocks = await dynamicPage.getBlocks();
    const formsList: DynamicForm[] = [];
    for (const form of forms) {
        const projectForm = new Form(form.slug)
        const dynamicForm = await projectForm.getDynamicFormElements({
            clientId: clientDetail.siren,
            softwareLabel: projectDetail.softwareLabel,
            mode: 'Project',
            projectLabel: projectDetail.label,
            pageId: pageExist.id,
        })

        if (dynamicForm) {
            formsList.push(dynamicForm as DynamicForm)
        }
    }


    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Projet</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${params.projectPageSlug}`}>Page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <div className="mt-2 md:mt-0">
                <ContainerPage title="">
                    {blocks.map(block => {
                        const dynamicForm = formsList.find(form => form.form.id === block.Page_Block_Form.at(0)?.formId)
                        const formSlug = formsList.find(form => form.form.id === block.Page_Block_Form.at(0)?.formId)?.form.slug
                        return (
                            <>
                                {block.htmlElement === 'h1' && <h1 key={block.slug}>{block.label}</h1>}
                                {block.htmlElement === 'h2' && <h2 key={block.slug}>{block.label}</h2>}
                                {block.htmlElement === 'h3' && <h3 key={block.slug}>{block.label}</h3>}
                                {block.htmlElement === 'h4' && <h4 key={block.slug}>{block.label}</h4>}
                                {block.htmlElement === 'h5' && <h5 key={block.slug}>{block.label}</h5>}
                                {block.htmlElement === 'h6' && <h6 key={block.slug}>{block.label}</h6>}
                                {block.htmlElement === 'p' && <p key={block.slug}>{block.label}</p>}
                                {block.htmlElement === 'form' && dynamicForm && formSlug &&
                                    <div key={block.slug}>
                                        <ButtonAddFormValue
                                            clientSlug={params.clientSlug}
                                            softwareSlug={softwareSlug.slug}
                                            formSlug={formSlug}
                                            mode="Project"
                                            projectSlug={params.projectSlug}
                                            pageSlug={pageSlug}
                                            buttonLabel={dynamicForm.form.buttonLabel}
                                            projectPageSlug={params.projectPageSlug}
                                        />
                                        <DynamicForms
                                            clientSlug={params.clientSlug}
                                            formSlug={formSlug}
                                            softwareSlug={softwareSlug.slug}
                                            pageSlug={params.projectPageSlug}
                                            formGroup={dynamicForm.formGroup?.Form_Group ? dynamicForm.formGroup.Form_Group : null}
                                            projectSlug={params.projectSlug}
                                            formProps={dynamicForm.form}
                                            datas={dynamicForm.datas}
                                            fields={dynamicForm.fields}
                                        />
                                    </div>
                                }
                            </>
                        )
                    })}
                </ContainerPage>
            </div>
        </Container>
    )

}

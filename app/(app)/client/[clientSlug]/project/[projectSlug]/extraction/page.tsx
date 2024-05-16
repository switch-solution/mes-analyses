import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Project } from "@/src/classes/project"
import { notFound } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Security } from "@/src/classes/security"
import { DynamicPage } from "@/src/classes/dynamicPage"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)

    const filesList = await project.files()

    const pages = await project.pages()
    const projectDetail = await project.projectDetails()
    const extraction = await project.projectDatas()
    const dataTable = extraction.map((data) => {
        return {
            ...data,
            formTitle: data.formTitle,
            projectSlug: params.projectSlug,
            clientSlug: params.clientSlug,
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{params.projectSlug}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus`}>Processus</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={dataTable} inputSearch="formTitle" inputSearchPlaceholder="Chercher par formulaire" />
            </ContainerDataTable>
        </Container>
    )

}
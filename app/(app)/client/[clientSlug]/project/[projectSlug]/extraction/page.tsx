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
import { ProcessusFactory } from "@/src/classes/processusFactory";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const projectDetail = await project.projectDetails()
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)

    const processusList = await project.processus()
    const processus = await Promise.all(processusList.map(async (processus) => {
        const processusFactory = ProcessusFactory.create({
            processusSlug: processus.processusSlug,
            clientId: projectDetail.clientId,
            projectLabel: projectDetail.label,
            sofwareLabel: projectDetail.softwareLabel

        });
        const extraction = await processusFactory.extraction()
        const count = extraction.datas.length
        return (
            {
                clientSlug: params.clientSlug,
                projectSlug: params.projectSlug,
                slug: processus.processusSlug,
                label: processus.label,
                data: extraction.datas,
                count: count

            })
    }).flat(1))
    console.log(processus)
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
                <DataTable columns={columns} data={processus} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" />
            </ContainerDataTable>
        </Container>
    )

}
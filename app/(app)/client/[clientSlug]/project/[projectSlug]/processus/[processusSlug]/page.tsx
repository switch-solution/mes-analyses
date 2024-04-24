import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Processus } from "@/src/classes/processus";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { notFound } from "next/navigation"
import { Project } from "@/src/classes/project";
import { Security } from "@/src/classes/security"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) {
        throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    }

    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) {
        throw new Error("Processus introuvable")
    }

    const projectDetail = await project.projectDetails()
    if (!projectDetail) {
        throw new Error("Projet introuvable")
    }

    const processusFactory = ProcessusFactory.create({
        processusSlug: params.processusSlug,
        clientId: projectDetail.clientId,
        projectLabel: projectDetail.label,
        sofwareLabel: projectDetail.softwareLabel

    });
    const datasList = await processusFactory.dataTable()

    const datas = datasList?.map((data) => {
        return {
            ...data,
            projectSlug: params.projectSlug,
            processusSlug: params.processusSlug,
            status: data.status,
            clientSlug: params.clientSlug,
            isTable: processusExist.isTable
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectDetail.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}`}>{processusExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={datas ? datas : []} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/form`} buttonLabel="Créer une nouvelle valeur" />
            </ContainerDataTable>
        </Container>
    )

}
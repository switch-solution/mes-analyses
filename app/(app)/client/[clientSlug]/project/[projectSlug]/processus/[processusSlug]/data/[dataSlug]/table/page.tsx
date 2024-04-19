import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Project } from "@/src/classes/project";
import { Processus } from "@/src/classes/processus";
import TableSeniority from "@/components/table/tableSeniority";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
type Seniority = {
    Project_Table_Seniority_Row: {
        id: string,
        minMonth: number,
        maxMonth: number,
        percentage: number
    }[]
}

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string, dataSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.");
    }
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new Error("Le projet n'existe pas")
    }
    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) {
        throw new Error("Le processus n'existe pas")
    }


    const projectDetail = await project.projectDetails()
    if (!projectDetail) {
        throw new Error("Projet introuvable")
    }

    const processusFactory = ProcessusFactory.create({
        processusSlug: processusExist.slug,
        clientId: projectDetail.clientId,
        projectLabel: projectDetail.label,
        sofwareLabel: projectDetail.softwareLabel
    })
    const datas = await processusFactory.read<Seniority>(params.dataSlug)
    let datasSeniority = datas.Project_Table_Seniority_Row.map((data) => {
        return {
            id: data.id,
            minMonth: data.minMonth,
            maxMonth: data.maxMonth,
            percentage: data.percentage
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus`}>Processus</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}`}>{processusExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/data/${params.dataSlug}/edit`}>Vue</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <TableSeniority rows={datasSeniority} clientSlug={params.clientSlug} projectSlug={params.projectSlug} processusSlug='Standard_Processus_Table_Seniority_Row' tableSlug={params.dataSlug} />
            </ContainerForm>
        </Container>
    )
}
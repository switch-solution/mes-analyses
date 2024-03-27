import Container from "@/components/layout/container";
import { getProcessusProject, getProjectBySlug } from "@/src/query/project.query";
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const { standardProcessus, clientProcessus, softwareProcessus } = await getProcessusProject(params.projectSlug)
    const processus = []
    processus.push(standardProcessus.map((processus) => {
        return {
            ...processus,
            label: processus.Processus.label,
            formUrl: processus.Processus.formUrl,
            description: processus.Processus.description,
            descriptionUrl: processus.Processus.descriptionUrl,
            slug: processus.Processus.slug,
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug
        }

    }))
    processus.push(clientProcessus.map((processus) => {
        return {
            ...processus,
            label: processus.Client_Processus.label,
            formUrl: processus.Client_Processus.formUrl,
            description: processus.Client_Processus.description,
            descriptionUrl: processus.Client_Processus.descriptionUrl,
            slug: processus.Client_Processus.slug,
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug
        }
    }))
    processus.push(softwareProcessus.map((processus) => {
        return {
            ...processus,
            label: processus.Software_Processus.label,
            formUrl: processus.Software_Processus.formUrl,
            description: processus.Software_Processus.description,
            descriptionUrl: processus.Software_Processus.descriptionUrl,
            slug: processus.Software_Processus.slug,
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug
        }
    }))

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus`}>Processus</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={processus.flat(1)} inputSearch="value" inputSearchPlaceholder="Chercher par valeur" />
        </Container>
    )

}
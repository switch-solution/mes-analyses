import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import Container from "@/components/layout/container";
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProjectBySlug } from "@/src/query/project.query";
import { getDsnByProjectSlug } from "@/src/query/project_dsn.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorize = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorize) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        throw new Error("Projet non trouvé")
    }
    const dsnList = await getDsnByProjectSlug(params.projectSlug)
    const dsn = dsnList.map((dsn) => {
        return {
            projectSlug: params.projectSlug,
            clientSlug: params.clientSlug,
            id: dsn.id,
            value: dsn.value,
            label: dsn.label,
            siret: dsn.siret,
            date: dsn.date
        }
    })
    return (
        <Container>
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={dsn} inputSearch="value" inputSearchPlaceholder="Chercher par valeur" />
        </Container>
    )
}
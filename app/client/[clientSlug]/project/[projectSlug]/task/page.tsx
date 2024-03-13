import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import Container from "@/components/layout/container";
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { getProjectTask } from "@/src/query/project_task.query";
import { getProjectBySlug } from "@/src/query/project.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorize = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorize) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) throw new Error("Projet non trouvé")
    const tasksList = await getProjectTask(params.projectSlug)
    if (!tasksList) {
        throw new Error("No projects")
    }
    const tasks = tasksList.map((task) => {
        return {
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug,
            label: task.label,
            description: task.description,
            status: task.status,
            deadline: task.deadline.toLocaleDateString(),
            isUpload: task.isUpload,
            slug: task.slug
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
            <DataTable columns={columns} data={tasks} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/create`} buttonLabel="Créer un nouveau projet" />
        </Container>
    )
}
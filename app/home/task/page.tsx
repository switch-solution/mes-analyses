import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsValid } from "@/src/query/security.query";
import { Slash } from "lucide-react"
import Container from "@/components/layout/container"
import { getMyTasks } from "@/src/query/project_task.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const tasksList = await getMyTasks()
    if (!tasksList) {
        throw new Error("No projects")
    }
    const tasks = tasksList.map((task) => {
        return {
            projectSlug: task.Project.slug,
            clientSlug: task.Project.client.slug,
            projectLabel: task.projectLabel,
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
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={tasks} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/home/task`} buttonLabel="Créer une nouvelle tache" />
        </Container>


    )
}
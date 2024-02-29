import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getMyProjects } from "@/src/query/project.query";
import { userIsValid } from "@/src/query/security.query";
import { getMyTasks } from "@/src/query/project_task.query";
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
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tasks} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/home/task`} buttonLabel="Créer une nouvelle tache" />
        </div>
    )
}
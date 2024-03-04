import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import Breadcrumb from "@/components/ui/breadcrumb";

import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { getProjectTask } from "@/src/query/project_task.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorize = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorize) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
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
        <div className="container mx-auto py-10">
            <Breadcrumb />
            <DataTable columns={columns} data={tasks} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/create`} buttonLabel="Créer un nouveau projet" />
        </div>
    )
}
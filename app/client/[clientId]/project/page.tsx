import { getUser } from "@/src/query/user.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { getProjectsClient } from "@/src/query/client.query";
import { DataTable } from "@/src/features/layout/dataTable";
import { columns } from "./dataTablecolumns";
export default async function Page({ params }: { params: { clientId: string } }) {
    await getUser()
    await userIsAdminClient(params.clientId)
    const projectsList = await getProjectsClient(params.clientId)
    const projects = projectsList.map((project) => {
        return {
            id: project.id,
            name: project.name,
            description: project.description,
            software: project.softwareId,
            status: project.status,
            open: project.id,
            edit: project.id,
            delete: project.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={projects} href={`/project/`} hrefToCreate={`/project/create`} searchPlaceholder="Chercher nom de projet" inputSearch="name" isEditable={false} />
        </div>
    )

}
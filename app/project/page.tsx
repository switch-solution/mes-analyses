import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/DataTable";
import { getMyProjects } from "@/src/query/project.query";
import { getUser } from "@/src/query/user.query";
export default async function Page() {
    await getUser()
    const myProjects = await getMyProjects()
    if (!myProjects) {
        throw new Error("No projects")
    }
    const projects = myProjects.map((project) => {
        return {
            id: project.project.id,
            name: project.project.name,
            description: project.project.description,
            software: project.project.softwareId,
            status: project.project.status,
            open: project.project.id,
            edit: project.project.id,
            delete: project.project.id,
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={projects} href={`/project/`} hrefToCreate={`/project/create`} searchPlaceholder="Chercher nom de projet" inputSearch="name" />
        </div>
    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getMyProjects } from "@/src/query/project.query";
import { userIsValid } from "@/src/query/security.query";
import { getMySoftware } from "@/src/query/user.query";
export default async function Page() {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const myProjects = await getMyProjects()
    if (!myProjects) {
        throw new Error("No projects")
    }
    const softwares = await getMySoftware()
    const projects = myProjects.map((project) => {
        return {
            id: project.project.id,
            name: project.project.name,
            description: project.project.description,
            software: softwares.find(software => software.id === project.project.softwareId)?.name ?? "Inconnu",
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
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getMyProjects } from "@/src/query/project.query";
import { userIsValid } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const myProjects = await getMyProjects()
    if (!myProjects) {
        throw new Error("No projects")
    }
    const projects = myProjects.map((project) => {
        return {
            slug: project.project.slug,
            label: project.project.label,
            description: project.project.description,
            status: project.project.status,
            clientSlug: params.clientSlug
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={projects} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/create`} buttonLabel="Créer un nouveau projet" />
        </div>
    )
}
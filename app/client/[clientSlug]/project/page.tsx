import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getMyProjects } from "@/src/query/project.query";
import { userIsValid } from "@/src/query/security.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Container from "@/components/layout/container";
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
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={projects} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/create`} buttonLabel="Créer un nouveau projet" />
        </Container>
    )
}
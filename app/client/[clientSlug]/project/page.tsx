import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Security } from "@/src/classes/security";
import { User } from "@/src/classes/user";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const security = new Security()
    const userId = await security.userIsValid()
    if (!userId) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const user = new User(userId.id)
    const myProjects = await user.getMyProject()
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
            <ContainerBreadCrumb>
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
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={projects} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/create`} buttonLabel="Créer un nouveau projet" />
            </ContainerDataTable>
        </Container>
    )
}
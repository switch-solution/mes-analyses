import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Project } from "@/src/classes/project";
import { Security } from "@/src/classes/security";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new Error("Le projet n'existe pas.")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorInThisProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const usersList = await project.getUsers()
    const users = usersList.map((user) => {
        return (
            user.user.UserOtherData.map(userData => {
                return {
                    image: user.user.image,
                    clientSlug: params.clientSlug,
                    projectSlug: params.projectSlug,
                    firstname: userData?.firstname,
                    lastname: userData?.lastname,
                    isAdmin: user.isAdmin,
                    isEditor: user.isEditor,
                    isValidator: user.isValidator,
                    isActivated: true
                }
            }))

    }).flat(1)

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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.slug}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" href={`/client/${params.clientSlug}/project/${params.projectSlug}/user/create`} buttonLabel="Inviter un utilisateur" />
        </Container>
    )
}
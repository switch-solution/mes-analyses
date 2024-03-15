import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsAdminProject } from "@/src/query/security.query";
import { getUsersProject } from "@/src/query/project.query";
import { getProjectBySlug } from "@/src/query/project.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Container from "@/components/layout/container";
import { getUserIsInvited } from "@/src/query/project.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) throw new Error("Projet non trouvé")
    const userIsAdmin = await userIsAdminProject(params.projectSlug)
    if (!userIsAdmin) {
        throw new Error("L'utilisateur n'est pas connecté.")
    }
    const usersList = await getUsersProject(params.projectSlug)
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
    const invitedUsers = await getUserIsInvited(params.projectSlug)
    invitedUsers.map((user) => {
        users.push({
            image: "",
            clientSlug: params.clientSlug,
            projectSlug: params.projectSlug,
            firstname: user.firstname,
            lastname: user.lastname,
            isAdmin: false,
            isEditor: false,
            isValidator: false,
            isActivated: false

        })
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par nom" href={`/client/${params.clientSlug}/project/${params.projectSlug}/user/create`} buttonLabel="Inviter un utilisateur" />
        </Container>
    )
}
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
import { Client } from "@/src/classes/client"
import { DataTable } from "@/components/layout/dataTable";
import { Security } from "@/src/classes/security"
import { notFound } from "next/navigation"
import { columns } from "./dataTablecolumns"
import { Project } from "@/src/classes/project"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        notFound()
    }
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const projectDetail = await project.projectDetails()
    if (!projectDetail) {
        notFound()
    }
    const security = new Security()
    const userIsValid = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsValid) {
        throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    }
    const usersList = await project.getUsers()
    if (!usersList) {
        throw new Error("Erreur lors de la récupération des utilisateurs.")
    }
    const users = usersList.map(user => {
        return {
            civility: user.civility,
            lastname: user.lastName,
            firstname: user.firstName,
            status: user.isAdmin ? 'Administrateur' : 'Utilisateur'
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Projet</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/user`}>Utilisateurs</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={users} inputSearch="lastname" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/project/${params.projectSlug}/user/create`} buttonLabel="Ajouter un utilisateur" />
            </ContainerDataTable>
        </Container>
    )


}
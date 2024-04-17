import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import { Client } from "@/src/classes/client"
import AddUserProject from "@/components/form/project/addUserProject"
import { Security } from "@/src/classes/security"
import { notFound } from "next/navigation"
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
    const usersList = await client.getUsers()
    if (!usersList) {
        throw new Error("Erreur lors de la récupération des utilisateurs.")
    }

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
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/user`}>Utilisateurs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/user/create`}>Ajouter un utilisateur</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <AddUserProject clientSlug={params.clientSlug} projectSlug={params.projectSlug} users={usersList} />
            </ContainerForm>
        </Container>
    )


}
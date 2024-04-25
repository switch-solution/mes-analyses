import Link from "next/link"
import EditProject from "@/components/form/project/editProject"
import { Security } from "@/src/classes/security";
import { Project } from "@/src/classes/project";
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const security = new Security()
    const userIsAuthorize = await security.isAdministratorInThisProject(params.projectSlug)
    if (!userIsAuthorize) {
        throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce projet')
    }
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }

    const projectDetail = await project.projectDetails()

    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/home">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project`}>Projets</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/Mon projet`}>Mon projet</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <EditProject clientSlug={params.clientSlug} projectSlug={params.projectSlug} project={{
                    label: projectDetail.label,
                    description: projectDetail.description,
                    status: projectDetail.status as 'Actif' | 'Archivé' | 'En attente'
                }} />
            </ContainerForm>
        </Container>
    )

}
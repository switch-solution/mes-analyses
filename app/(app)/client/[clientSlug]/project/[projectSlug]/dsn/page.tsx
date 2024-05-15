import { Security } from "@/src/classes/security"
import { Project } from "@/src/classes/project"
import { notFound } from "next/navigation"
import { User } from "@/src/classes/user"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
import UploadFileDsn from "@/components/form/dsn/upload"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }

    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)
    const user = new User(security.userId)
    const client = await user.getMyClientActive()
    const projectDetails = await project.projectDetails()
    if (!projectDetails) {
        notFound()
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/dsn`}>DSN</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <UploadFileDsn clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
            </ContainerForm>
        </Container>
    )
}
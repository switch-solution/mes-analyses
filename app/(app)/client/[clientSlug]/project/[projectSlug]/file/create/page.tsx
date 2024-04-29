import { Security } from "@/src/classes/security";
import Link from "next/link"

import { Project } from "@/src/classes/project"; import { notFound } from "next/navigation";
import { UploadFile } from "@/components/form/upload/formUpload";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/layout/container"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const security = new Security();

    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist
    if (!projectExist) {
        notFound()
    }
    const userId = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userId) {
        throw new Error("Vous n'êtes pas autorisé à accéder à ce projet")
    }

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
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Project</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/file`}>Fichiers</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm>
                <UploadFile clientSlug={params.clientSlug} projectSlug={params.projectSlug} />
            </ContainerForm>
        </Container>
    )


}
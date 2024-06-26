import Link from "next/link"
import { Security } from "@/src/classes/security";
import { Project } from "@/src/classes/project";
import { Container, ContainerBreadCrumb, ContainerPage } from "@/components/layout/container"
import DuplicatePage from "@/components/form/page/duplicatePage"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation";
import { DynamicPage } from "@/src/classes/dynamicPage"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, pageSlug: string } }) {
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

    const dynamicPage = new DynamicPage(params.pageSlug)
    const pageExist = await dynamicPage.pageExist()
    if (!pageExist) {
        notFound()
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
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>Projet</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${params.pageSlug}`}>Page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${params.pageSlug}/import`}>Copier la page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerPage title={`${pageExist.internalId} ${pageExist.label} `}>
                <DuplicatePage clientSlug={params.clientSlug} pageSlug={params.pageSlug} projectSlug={params.projectSlug} />
            </ContainerPage>
        </Container>
    )

}
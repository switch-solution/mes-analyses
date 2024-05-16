import Link from "next/link"
import { Security } from "@/src/classes/security";
import { Project } from "@/src/classes/project";
import { Container, ContainerBreadCrumb, ContainerPage } from "@/components/layout/container"
import { ProjectData } from "@/src/classes/projectData";
import DynamicPageView from "@/components/dynamicPageAnalyse/dynamicPageView";
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
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, projectPageSlug: string } }) {
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
    const projectDatas = new ProjectData({
        slug: params.projectPageSlug,
        projectLabel: projectDetail.label,
        softwareLabel: projectDetail.softwareLabel,
        clientId: projectDetail.clientId
    })
    const projectsDatasExist = await projectDatas.projectDataExist()
    if (!projectsDatasExist) {
        notFound()
    }
    const pageSlug = projectsDatasExist.Page.slug

    const dynamicPage = new DynamicPage(projectsDatasExist.Page.slug)
    const pageExist = await dynamicPage.pageExist()
    if (!pageExist) {
        notFound()
    }

    const pageBlock = await dynamicPage.getblocks()
    const datas = await projectDatas.datas()
    const options = await projectDatas.getOptions()
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="flex">
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
                                <Link href={`/client/${params.clientSlug}/project/${params.projectSlug}/page/${params.projectPageSlug}`}>Page</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <div className="mt-2 md:mt-0">
                <ContainerPage title={`${pageExist.internalId} ${pageExist.label}`}>
                    <DynamicPageView
                        blocks={pageBlock}
                        clientSlug={params.clientSlug}
                        projectPageSlug={params.projectPageSlug}
                        pageSlug={pageSlug}
                        internalId={pageExist.internalId}
                        label={pageExist.label}
                        projectSlug={params.projectSlug}
                        datas={datas}
                        options={options}
                    />
                </ContainerPage>
            </div>
        </Container>
    )

}
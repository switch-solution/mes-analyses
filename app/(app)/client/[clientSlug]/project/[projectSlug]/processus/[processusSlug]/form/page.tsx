import { Container, ContainerBreadCrumb } from "@/components/layout/container";
import CreateDynamicForm from "@/components/form/project_standard_form/createDynamicForm";
import { Slash } from "lucide-react"
import UploadFileDsn from "@/components/form/dsn/upload";
import { getDsnStructure } from "@/src/query/dsn.query";
import { Project } from "@/src/classes/project";
import { Processus } from "@/src/classes/processus";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSelectOptions } from "@/src/query/form.query";
import { notFound } from "next/navigation"
import { Security } from "@/src/classes/security"

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string } }) {
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")

    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) {
        throw new Error("Le processus n'existe pas")
    }
    const form = await processus.createFormAndInput()
    if (!form) {
        throw new Error("Le formulaire n'existe pas")
    }
    const inputs = form.at(0)?.Form.at(0)?.Form_Input
    if (!inputs && processusExist.slug !== "Standard_Processus_DSN") {
        throw new Error("Les inputs n'existent pas")
    }
    const projectDetail = await project.projectDetails()
    if (!projectDetail) throw new Error("Projet introuvable")
    const options = await getSelectOptions({
        projectLabel: projectDetail.label,
        softwareLabel: projectDetail.softwareLabel,
        clientId: projectDetail.clientId

    })
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectDetail.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus`}>Processus</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}`}>{processusExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/form`}>{form.at(0)?.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            {processusExist.slug === "Standard_Processus_DSN" && <UploadFileDsn clientSlug={params.clientSlug} projectSlug={params.projectSlug} dsnStructure={await getDsnStructure()} processusSlug={params.processusSlug} />}
            {processusExist.slug !== "Standard_Processus_DSN" && inputs && <CreateDynamicForm
                inputs={inputs.map((input) => ({
                    ...input,
                    clientId: projectDetail.clientId,
                    softwareLabel: processusExist.label,
                    projectLabel: projectDetail.label,
                }))}
                clientSlug={params.clientSlug}
                projectSlug={params.projectSlug}
                processusSlug={processusExist.slug}
                options={options}
            />}


        </Container>
    )
}
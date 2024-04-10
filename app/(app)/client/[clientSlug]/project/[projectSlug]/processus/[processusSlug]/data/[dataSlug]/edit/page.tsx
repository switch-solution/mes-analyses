import { Container } from "@/components/layout/container";
import { Slash } from "lucide-react"
import EditDynamicForm from "@/components/form/project_standard_form/editDynamicForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Project } from "@/src/classes/project";
import { Processus } from "@/src/classes/processus";
import { getSelectOptions } from "@/src/query/form.query";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string, dataSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.");
    }
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new Error("Le projet n'existe pas")
    }
    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) {
        throw new Error("Le processus n'existe pas")
    }
    const form = await processus.editFormAndInput()
    if (!form) {
        throw new Error("Le formulaire n'existe pas")
    }
    const inputs = form.at(0)?.Form.at(0)?.Form_Input
    if (!inputs && processusExist.slug !== "Standard_Processus_DSN") {
        throw new Error("Les inputs n'existent pas")
    }
    const projectDetail = await project.projectDetails()
    if (!projectDetail) {
        throw new Error("Projet introuvable")
    }
    const options = await getSelectOptions({
        projectLabel: projectDetail.label,
        softwareLabel: projectDetail.softwareLabel,
        clientId: projectDetail.clientId

    })
    const processusFactory = ProcessusFactory.create({
        processusSlug: processusExist.slug,
        clientId: projectDetail.clientId,
        projectLabel: projectDetail.label,
        sofwareLabel: projectDetail.softwareLabel
    })
    const datas = await processusFactory.read(params.dataSlug)
    return (
        <Container>
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/data/${params.dataSlug}/edit`}>Edition</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <EditDynamicForm
                inputs={inputs ? inputs.map((input) => ({
                    ...input,
                    clientId: projectDetail.clientId,
                    softwareLabel: processusExist.label,
                    projectLabel: projectDetail.label,
                })) : []}
                datas={datas}
                clientSlug={params.clientSlug}
                projectSlug={params.projectSlug}
                processusSlug={processusExist.slug}
                options={options}
            />
        </Container>
    )
}
import Container from "@/components/layout/container";
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { dataByTable } from "@/src/query/extraction.query";
import { getProjectProcessusExist } from "@/src/query/project.query";
import { Slash } from "lucide-react"
import EditDynamicForm from "@/components/form/project_standard_form/editDynamicForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getFormAndInput } from "@/src/query/form.query";
import { getProjectBySlug } from "@/src/query/project.query";
import { getSelectOptions } from "@/src/query/form.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string, dataSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.");
    }
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        throw new Error("Le projet n'existe pas.")
    }
    const processusExist = await getProjectProcessusExist(params.projectSlug, params.processusSlug)
    if (!processusExist) {
        throw new Error("Le processus n'existe pas.")
    }
    const form = await getFormAndInput(params.projectSlug, params.processusSlug)
    if (!form) {
        throw new Error("Le formulaire n'existe pas")
    }
    const inputs = form.at(0)?.Project_Form_Input
    if (!inputs) {
        throw new Error("Les inputs n'existent pas")
    }
    const options = await getSelectOptions(params.projectSlug, params.processusSlug)

    const datas = await dataByTable({ projectSlug: params.projectSlug, table: processusExist.table, slug: params.dataSlug })
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
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
                inputs={inputs.map((input) => ({
                    ...input,
                }))}
                datas={datas}
                clientSlug={params.clientSlug}
                projectSlug={params.projectSlug}
                processusSlug={processusExist.slug}
                table={processusExist.table}
                options={options}
            />
        </Container>
    )
}
import Container from "@/components/layout/container";
import { getProjectBySlug, getProjectProcessusExist } from "@/src/query/project.query";
import { getFormInputByIdForMyActiveClientAndSoftware } from "@/src/query/form.query";
import CreateStandardSociety from "@/components/form/project_standard_form/createStandardSociety";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        throw new Error("Le projet n'existe pas")
    }
    const processusExist = await getProjectProcessusExist(params.projectSlug, "Standard_Processus_Society")
    if (!processusExist) {
        throw new Error("Le processus n'existe pas")
    }
    const inputs = await getFormInputByIdForMyActiveClientAndSoftware(processusExist.formId)
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${processusExist.formUrl}`}>{processusExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateStandardSociety inputs={inputs} clientSlug={params.clientSlug} projectSlug={params.projectSlug} processusSlug={processusExist.slug} />
        </Container>
    )
}
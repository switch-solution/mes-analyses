import Container from "@/components/layout/container";
import { getProjectBySlug, getProjectProcessusExist } from "@/src/query/project.query";
import { getFormAndInput } from "@/src/query/form.query";
import CreateDynamicForm from "@/components/form/project_standard_form/createDynamicForm";
import { Slash } from "lucide-react"
import UploadFileDsn from "@/components/form/dsn/upload";
import { getDsnStructure } from "@/src/query/dsn.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSelectOptions } from "@/src/query/form.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) {
        throw new Error("Le projet n'existe pas")
    }
    const processusExist = await getProjectProcessusExist(params.projectSlug, params.processusSlug)
    if (!processusExist) {
        throw new Error("Le processus n'existe pas")
    }
    const form = await getFormAndInput(params.projectSlug, params.processusSlug)
    if (!form) {
        throw new Error("Le formulaire n'existe pas")
    }
    const inputs = form.at(0)?.Project_Form_Input
    if (!inputs && processusExist.table !== "Project_DSN") {
        throw new Error("Les inputs n'existent pas")
    }
    const options = await getSelectOptions(params.projectSlug, params.processusSlug)
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/processus/${params.processusSlug}/form`}>{form.at(0)?.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {processusExist.table === "Project_DSN" && <UploadFileDsn clientSlug={params.clientSlug} projectSlug={params.projectSlug} dsnStructure={await getDsnStructure()} processusSlug={params.processusSlug} />}
            {processusExist.table !== "Project_DSN" && inputs && <CreateDynamicForm
                inputs={inputs.map((input) => ({
                    ...input,
                }))}
                clientSlug={params.clientSlug}
                projectSlug={params.projectSlug}
                processusSlug={processusExist.slug}
                table={processusExist.table}
                options={options}
            />}


        </Container>
    )
}
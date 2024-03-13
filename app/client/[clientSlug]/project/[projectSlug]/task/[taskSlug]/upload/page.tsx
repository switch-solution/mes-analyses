import Container from "@/components/layout/container"
import { getTaskBySlug } from "@/src/query/project_task.query"
import UploadFileDsn from "@/components/form/dsn/upload"
import { getInputDsnByProjectSlug } from "@/src/query/project_input.query"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProjectBySlug } from "@/src/query/project.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, taskSlug: string } }) {
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) throw new Error("Projet non trouvé")
    const task = await getTaskBySlug(params.taskSlug)
    const inputs = await getInputDsnByProjectSlug(params.projectSlug)
    return (
        <Container>
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}/task`}>taches</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            {task.label === "DSN" ? <UploadFileDsn projectSlug={params.projectSlug} clientSlug={params.clientSlug} inputs={inputs} /> : undefined}
        </Container>
    )
}
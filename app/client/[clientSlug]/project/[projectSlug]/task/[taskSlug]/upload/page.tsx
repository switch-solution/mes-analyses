import Container from "@/components/layout/container"
import { getTaskBySlug } from "@/src/query/project_task.query"
import UploadFileDsn from "@/components/form/dsn/upload"
import { getInputDsnByProjectSlug } from "@/src/query/project_input.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, taskSlug: string } }) {
    const task = await getTaskBySlug(params.taskSlug)
    const inputs = await getInputDsnByProjectSlug(params.projectSlug)
    return (
        <Container>
            {task.label === "DSN" ? <UploadFileDsn projectSlug={params.projectSlug} clientSlug={params.clientSlug} inputs={inputs} /> : undefined}
        </Container>
    )
}
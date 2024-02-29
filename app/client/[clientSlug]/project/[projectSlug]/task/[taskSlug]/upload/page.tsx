import UploadFile from "@/components/form/project_attachment/create"
import Container from "@/components/layout/container"
import { getTaskBySlug } from "@/src/query/project_task.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, taskSlug: string } }) {
    const task = await getTaskBySlug(params.taskSlug)
    return (
        <Container>
            <UploadFile projectSlug={params.projectSlug} clientSlug={params.clientSlug} task={task} />
        </Container>
    )
}
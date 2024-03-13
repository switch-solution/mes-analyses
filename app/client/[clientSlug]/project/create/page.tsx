import CreateProject from "@/components/form/project/createProject"
import { getMySoftware } from "@/src/query/user.query"
import Container from "@/components/layout/container"
export default async function ProjectCreate({ params }: { params: { clientSlug: string } }) {

    const softwares = await getMySoftware()

    return (<Container>
        <CreateProject clientSlug={params.clientSlug} softwares={softwares} />
    </Container>)
}
import CreateProject from "@/components/form/project/create"
import { getMySoftware } from "@/src/query/user.query"
export default async function ProjectCreate({ params }: { params: { clientSlug: string } }) {

    const softwares = await getMySoftware()

    return (<div>
        <CreateProject clientSlug={params.clientSlug} softwares={softwares} />
    </div>)
}
import DynamicFormBook from "@/components/form/project_book/dynamicFormBook"
import { getInputByProjectSlug } from "@/src/query/projectInput.query"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string } }) {
    const inputs = await getInputByProjectSlug(params.projectSlug)
    return (<div>
        <DynamicFormBook clientSlug={params.clientSlug} projectSlug={params.projectSlug} inputs={inputs} />
    </div>)

}
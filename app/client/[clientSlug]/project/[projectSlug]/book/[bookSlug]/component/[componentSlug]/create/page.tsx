import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import DynamicForm from "@/components/form/project_book/dynamicFormBook"
import { getComponentAndInputAndValuesBySlug } from "@/src/query/project_component.query"
import Container from "@/components/layout/container"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string, componentSlug: string } }) {

    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const component = await getComponentAndInputAndValuesBySlug(params.componentSlug)
    return (
        <Container>
            <DynamicForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} bookSlug={params.bookSlug} component={component} />
        </Container>
    )


}
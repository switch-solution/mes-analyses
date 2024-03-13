import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import DynamicForm from "@/components/form/project_book/dynamicFormBook"
import { getValueByRecordId } from "@/src/query/project_value.query"
import { getCountValueByRecordIdForValidation } from "@/src/query/security.query"
import Container from "@/components/layout/container"

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string, componentSlug: string, recordId: string } }) {

    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const component = await getValueByRecordId(params.componentSlug, params.recordId)
    //En modififiant les valeurs de l'url un utilisateur peut accéder à un enregistrement d'un autre de ses projets. 
    //Il est donc nécessaire de vérifier que le recordId appartient bien au projet.
    const countRecordId = await getCountValueByRecordIdForValidation({
        recordId: params.recordId,
        projectSlug: params.projectSlug,
        bookSlug: params.bookSlug,
        clientSlug: params.clientSlug
    })
    if (countRecordId === 0) throw new Error("Vous n'êtes pas autorisé à accéder à cet enregistrement.")
    return (
        <Container>
            <div className="flex w-full flex-col">
                <h1>Formulaire de modification des {component?.label}</h1>
                <span>Version : {component?.Project_Input.at(0)?.Project_Value.at(0)?.version}</span>
                <span>Création : {component?.Project_Input.at(0)?.Project_Value.at(0)?.origin}</span>
                <span>Date de création : {component?.Project_Input.at(0)?.Project_Value.at(0)?.createdAt.toLocaleDateString()}</span>
            </div>
            <DynamicForm clientSlug={params.clientSlug} projectSlug={params.projectSlug} bookSlug={params.bookSlug} component={component} recordId={params.recordId} />
        </Container>
    )


}
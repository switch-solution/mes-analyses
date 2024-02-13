import { userIsValid } from "@/src/query/security.query"
import Container from "@/src/features/layout/container"
import CardWithOptions from "@/src/features/layout/cardWithOptions"
import { getCountProjectUsers, getCountProjectBook, getCountProjectAttchment } from "@/src/query/project.query"
export default async function Page({ params }: { params: { projectId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté')
    }
    const countUser = await getCountProjectUsers(params.projectId)
    const countBook = await getCountProjectBook(params.projectId)
    const countAttachment = await getCountProjectAttchment(params.projectId)
    return (
        <Container>
            <CardWithOptions titre="Utilisateurs" content={countUser ? countUser : 0} href={`/project/${params.projectId}/user`} />
            <CardWithOptions titre="Cahiers" content={countBook ? countBook : 0} href={`/project/${params.projectId}/book`} />
            <CardWithOptions titre="Element à fournir" content={countAttachment ? countAttachment : 0} href={`/project/${params.projectId}/attachment`} />
            <CardWithOptions titre="Tableau de bord" content={countUser ? countUser : 0} href={`/project/${params.projectId}/dashboard`} />

        </Container>

    )
}
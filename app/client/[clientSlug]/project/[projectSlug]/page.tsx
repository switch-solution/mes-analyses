import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { getProjectsHome } from "@/src/query/project.query"
import Container from "@/src/features/layout/container"
import CardWithOptions from "@/src/features/layout/cardWithOptions";

export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {

    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const { countBook, countUserProject, countAttachment, countConstant, countItems, countDsn } = await getProjectsHome(params.projectSlug)
    return (
        <Container>
            <CardWithOptions titre="Nombre de cahiers" content={countBook} href={`/client/${params.clientSlug}/project/${params.projectSlug}/book`} />
            <CardWithOptions titre="Nombre d&apos;utilisateurs" content={countUserProject} href={`/client/${params.clientSlug}//project/${params.projectSlug}/user`} />
            <CardWithOptions titre="Nombre de pièces jointes en attente" content={countAttachment} href={`/client/${params.clientSlug}/project/${params.projectSlug}/attachment`} />
            <CardWithOptions titre="Nombre de constantes" content={countConstant} href={`/client/${params.clientSlug}/project/${params.projectSlug}/constant`} />
            <CardWithOptions titre="Nombre de rubriques" content={countItems} href={`/client/${params.clientSlug}/project/${params.projectSlug}/items`} />
            <CardWithOptions titre="Nombre de DSN" content={countDsn} href={`/client/${params.clientSlug}/project/${params.projectSlug}/dsn`} />

        </Container>

    )
}
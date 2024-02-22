import { getClientHome, getClientSirenBySlug } from "@/src/query/client.query"
import CardWithOptions from "@/src/features/layout/cardWithOptions";
import Container from "@/src/features/layout/container";
import { userIsAdminClient } from "@/src/query/security.query";
export default async function Client({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    const { countUser, countContact, countProject, countUserIsBillable, countSoftware, countInvitation, numberDaysBeforeEndTrial, countLogger } = await getClientHome(params.clientSlug)

    return (<Container>

        <CardWithOptions titre="Nombre d&apos;utilisateurs" content={countUser} href={`/client/${params.clientSlug}/administrator/user`} />
        <CardWithOptions titre="Nombre de logiciel" content={countSoftware} href={`/client/${params.clientSlug}/administrator/software`} />
        <CardWithOptions titre="Nombre de projets" content={countProject} href={`/client/${params.clientSlug}/project`} />
        <CardWithOptions titre="Nombre de contacts" content={countContact} href={`/client/${params.clientSlug}/administrator/contact`} />
        <CardWithOptions titre="Nombre d&apos;invitation" content={countInvitation} href={`/client/${params.clientSlug}/administrator/invitation`} />
        <CardWithOptions titre="Nombre de jours d'essai" content={numberDaysBeforeEndTrial} href={`/client/${params.clientSlug}/`} />
        <CardWithOptions titre="Evenements" content={countLogger} href={`/client/${params.clientSlug}/event`} />

    </Container>

    )
}
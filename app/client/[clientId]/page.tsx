import { getUser } from "@/src/query/user.query";
import { getCountUsersClient, getCountInvitation, getCountSoftwareClient, getCountProjectClient, getCountContactClient, getNumberDaysBeforeEndTrial, getFutureBilling } from "@/src/query/client.query"
import { userIsAdminClient } from "@/src/query/security.query";
import CardWithOptions from "@/src/features/layout/cardWithOptions";
import Container from "@/src/features/layout/container";
export default async function Client({ params }: { params: { clientId: string } }) {

    await getUser()
    await userIsAdminClient(params.clientId)

    const countUser = await getCountUsersClient(params.clientId)
    const countInvitation = await getCountInvitation(params.clientId)
    const countSoftware = await getCountSoftwareClient(params.clientId)
    const countProject = await getCountProjectClient(params.clientId)
    const countContact = await getCountContactClient(params.clientId)
    const numberDaysBeforeEndTrial = await getNumberDaysBeforeEndTrial(params.clientId)
    const futureBilling = await getFutureBilling(params.clientId)
    return (<Container>

        <CardWithOptions titre="Nombre d&apos;utilisateurs" content={countUser} href={`/client/${params.clientId}/user`} />
        <CardWithOptions titre="Nombre de logiciel" content={countSoftware} href={`/client/${params.clientId}/software`} />
        <CardWithOptions titre="Nombre de projets" content={countProject} href={`/client/${params.clientId}/project`} />
        <CardWithOptions titre="Nombre de contacts" content={countContact} href={`/client/${params.clientId}/contact`} />
        <CardWithOptions titre="Nombre d&apos;invitation" content={countInvitation} href={`/client/${params.clientId}/invitation`} />
        <CardWithOptions titre="Nombre de jours d'essai" content={numberDaysBeforeEndTrial} href={`/client/${params.clientId}/`} />
        <CardWithOptions titre="Prochaine facture" content={`${futureBilling}€`} href={`/client/${params.clientId}/bill`} />

    </Container>

    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getUsersClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getInvitationByClientSlug } from "@/src/query/invitation.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const userClient = await getUsersClientList(params.clientSlug)
    const invitationsList = await getInvitationByClientSlug(params.clientSlug)
    const invitations = invitationsList.map((invitation) => {
        return {
            name: `${invitation.lastname} ${invitation.firstname}`,
            isBilling: "Non",
            email: invitation.email,
            image: null,
            isActivated: false,
            isBlocked: true
        }
    })
    const usersClient = userClient.map((user) => {
        return {
            name: `${user.user.UserOtherData.at(0)?.lastname} ${user.user.UserOtherData.at(0)?.firstname}`,
            isBilling: user.isActivated === true ? "Oui" : "Non",
            email: user.user.email,
            image: user.user.image,
            isActivated: true,
            isBlocked: user.user.UserOtherData.at(0)?.isBlocked === true ? true : false



        }
    })
    const users = [...usersClient, ...invitations]
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/`}>Client</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={users} inputSearch="email" inputSearchPlaceholder="Chercher par email" href={`/client/${params.clientSlug}/administrator/user/create`} buttonLabel="Inviter un utilisateur" />
        </Container>
    )
}
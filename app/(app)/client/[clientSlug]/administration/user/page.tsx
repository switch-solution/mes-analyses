import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getUsersClientList } from "@/src/query/client.query";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { getInvitationByClientSlug } from "@/src/query/invitation.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isAdmin = await security.isAdministratorClient(clientExist.siren);
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
            <ContainerBreadCrumb>
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
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={users} inputSearch="email" inputSearchPlaceholder="Chercher par email" href={`/client/${params.clientSlug}/administrator/user/create`} buttonLabel="Inviter un utilisateur" />
            </ContainerDataTable>
        </Container>
    )
}
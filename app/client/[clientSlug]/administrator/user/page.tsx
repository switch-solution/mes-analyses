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
export default async function Page({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) {
        throw new Error('User is not admin')
    }
    const userClient = await getUsersClientList(params.clientSlug)
    const users = userClient.map((user) => {
        return {
            name: `${user.user.UserOtherData.at(0)?.lastname} ${user.user.UserOtherData.at(0)?.firstname}`,
            status: user.isActivated === true ? "Oui" : "Non",
            email: user.user.email,
            image: user.user.image,
            open: user.user.id,
            edit: user.user.id,
            delete: user.user.id,
        }
    })

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
            <DataTable columns={columns} data={users} inputSearch="email" inputSearchPlaceholder="Chercher par email" href={`/client/${params.clientSlug}/administrator/software/create`} buttonLabel="Inviter un utilisateur" />
        </Container>
    )
}
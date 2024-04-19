import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getApiActivityByUuid } from "@/src/query/client_api.query";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
type API = {
    url: string,
    createdAt: Date,

}
export default async function Page({ params }: { params: { clientSlug: string, apiSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsAdmin = await security.isAdministratorClient(clientExist.siren)
    if (!userIsAdmin) {
        throw new Error("Unauthorized")
    }

    const apiList = await getApiActivityByUuid(params.apiSlug)
    const api = apiList.map((apiDetail: API) => {
        return {
            url: apiDetail.url,
            createdAt: apiDetail.createdAt.toTimeString(),
            clientSlug: params.clientSlug
        }
    })
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
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/administration/api`}>API</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/administration/api/${params.apiSlug}/activiy`}>Activité</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={api} inputSearch="url" inputSearchPlaceholder="Chercher par url" />
            </ContainerDataTable>

        </Container>

    )
}
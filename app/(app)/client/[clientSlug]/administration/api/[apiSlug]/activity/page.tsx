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
import { prisma } from "@/lib/prisma";
import { ClientApi } from "@/src/classes/clientApi";
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

    const apiKey = await prisma.client_API.findUniqueOrThrow({
        select: {
            apiKey: true
        },
        where: {
            slug: params.apiSlug
        }
    })
    const clientApi = new ClientApi(`Bearer ${apiKey.apiKey}`)
    const activityList = await clientApi.actvity()
    const activity = activityList.map((apiDetail) => {
        return {
            url: apiDetail.url,
            createdAt: apiDetail.createdAt.toLocaleDateString(),
            clientSlug: params.clientSlug,
            apiSlug: params.apiSlug,
            country: apiDetail.country,
            city: apiDetail.city,
            method: apiDetail.method,
            ip: apiDetail.ip
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
                <DataTable columns={columns} data={activity} inputSearch="url" inputSearchPlaceholder="Chercher par url" />
            </ContainerDataTable>

        </Container>

    )
}
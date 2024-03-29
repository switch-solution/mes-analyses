import { userIsAdminClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getApiByClientSlug } from "@/src/query/client_api.query";
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const userIsAdmin = await userIsAdminClient(params.clientSlug)
    if (!userIsAdmin) {
        throw new Error("Unauthorized")
    }
    const maskApiKey = (apiKey: string) => {
        const start = apiKey.substr(0, 2); // Prend les 2 premiers caractères
        const end = apiKey.substr(-2); // Prend les 2 derniers caractères
        const masked = '*'.repeat(30); // Crée une chaîne de 30 étoiles
        return start + masked + end; // Concatène le début, les étoiles et la fin
    }
    const apiList = await getApiByClientSlug(params.clientSlug)
    const api = apiList.map(api => {
        return {
            label: maskApiKey(api.apiKey),
            count: api._count?.Client_API_Activity.toString(),
            slug: api.slug,
            revoked: api.revoked,
            clientSlug: params.clientSlug
        }
    })
    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/`}>Client</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/administrator`}>API</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={api} inputSearch="label" inputSearchPlaceholder="Chercher par valeur" />

        </Container>

    )
}
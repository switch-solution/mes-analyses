import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import Container from "@/components/layout/container";
import { getSoftwareClientList } from "@/src/query/client.query";
import { userIsAdminClient } from "@/src/query/security.query";
import { Slash } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string } }) {

    const isAdmin = await userIsAdminClient(params.clientSlug)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour acceder à cette page.")
    const softwaresList = await getSoftwareClientList(params.clientSlug)
    const softwares = softwaresList.map((software) => {
        return {
            softwareSlug: software.slug,
            label: software.label,
            clientSlug: software.client.slug
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}`}>Fiche client</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={softwares} inputSearch="label" inputSearchPlaceholder="Chercher par logiciel" href={`/client/${params.clientSlug}/administrator/software/create`} buttonLabel="Créer un nouveau logiciel" />
        </Container>
    )
}
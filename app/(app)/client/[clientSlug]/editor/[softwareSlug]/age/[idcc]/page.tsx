import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getIdccByCode, getTableAgeByIdcc } from "@/src/query/idcc.query";
import { ContactIcon } from "lucide-react";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Client non trouvé")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tablesList = await getTableAgeByIdcc(params.idcc)
    const tableStandard = tablesList.map((table) => {
        return (
            table.Table_Age.map((table) => {
                return {
                    id: table.id,
                    label: table.label,
                    level: table.level,
                    softwareSlug: params.softwareSlug,
                    clientSlug: params.clientSlug,
                    slug: table.slug,
                    idcc: params.idcc
                }
            })
        )
    }).flat(1)
    const tableClient = tablesList.map((table) => {
        return (
            table.Client_Table_Age.map((table) => {
                return {
                    id: table.id,
                    label: table.label,
                    level: table.level,
                    softwareSlug: params.softwareSlug,
                    clientSlug: params.clientSlug,
                    slug: table.slug,
                    idcc: params.idcc
                }
            })
        )
    }).flat(1)
    const tableSoftware = tablesList.map((table) => {
        return (
            table.Software_Table_Age.map((table) => {
                return {
                    id: table.id,
                    label: table.label,
                    level: table.level,
                    softwareSlug: params.softwareSlug,
                    clientSlug: params.clientSlug,
                    slug: table.slug,
                    idcc: params.idcc
                }
            })
        )
    }).flat(1)
    const tables = [...tableStandard, ...tableClient, ...tableSoftware]
    return (
        <Container>
            <ContainerBreadCrumb >
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age`}>Table des ages</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={tables} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/create`} buttonLabel="Ajouter une table" />
            </ContainerDataTable>
        </Container>
    )
}
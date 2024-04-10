import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Client } from "@/src/classes/client";
import { Security } from "@/src/classes/security";
import { getIdccByCode, getTableSeniorityByIdcc } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tablesList = await getTableSeniorityByIdcc(params.idcc)
    const tableStandard = tablesList.map((table) => {
        return (
            table.Table_Seniority.map((table) => {
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
            table.Client_Table_Seniority.map((table) => {
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
            table.Software_Table_Seniority.map((table) => {
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
            <ContainerBreadCrumb>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/`}>Table d&apos;ancienneté</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={tables} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/${params.idcc}/create`} buttonLabel="Ajouter une table" />
            </ContainerDataTable>
        </Container>
    )
}
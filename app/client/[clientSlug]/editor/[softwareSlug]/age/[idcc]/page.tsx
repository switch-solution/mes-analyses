import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getIdccByCode, getTableAgeByIdcc } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
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
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/home">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/`}>Table des ages</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={tables} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/create`} buttonLabel="Ajouter une table" />
        </Container>
    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { Slash } from "lucide-react"
import { getTableAgeByLevelAndIdccAndSlug } from "@/src/query/table_age.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getIdccByCode } from "@/src/query/idcc.query";
import { getTableClientRowsByIdccAndSlug, getTableSoftwareRowsByIdccAndSlug, getTableStandardRowsByIdccAndSlug } from "@/src/query/table_age_row.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableAgeSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tableExist = await getTableAgeByLevelAndIdccAndSlug(params.level, params.idcc, params.tableAgeSlug)
    if (!tableExist) throw new Error("Table d'âge non trouvée")
    let rows
    switch (params.level) {
        case 'client':
            const rowsClient = await getTableClientRowsByIdccAndSlug(params.idcc, params.tableAgeSlug)
            rows = rowsClient.map(row => {
                return (
                    row.Client_Table_Age_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            id: row.id,
                            label: row.label,
                            level: row.level,
                            age: row.age,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            schoolYear: row.schoolYear,
                            pourcentage: row.pourcentage
                        }
                    })
                )
            }).flat(1)

            break;
        case 'logiciel':
            const rowsSoftware = await getTableSoftwareRowsByIdccAndSlug(params.idcc, params.tableAgeSlug)
            rows = rowsSoftware.map(row => {
                return (
                    row.Software_Table_Age_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            id: row.id,
                            label: row.label,
                            level: row.level,
                            age: row.age,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            schoolYear: row.schoolYear,
                            pourcentage: row.pourcentage
                        }
                    })
                )
            }).flat(1)

            break;
        default:
            const rowsStandard = await getTableStandardRowsByIdccAndSlug(params.idcc, params.tableAgeSlug)
            rows = rowsStandard.map(row => {
                return (
                    row.Table_Age_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            id: row.id,
                            label: row.label,
                            level: row.level,
                            age: row.age,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            schoolYear: row.schoolYear,
                            pourcentage: row.pourcentage
                        }
                    })
                )
            }).flat(1)
            break;
    }


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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}`}>{tableExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={rows} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/age/${params.idcc}/${params.level}/${params.tableAgeSlug}/create`} buttonLabel="Ajouter une ligne" />
        </Container>
    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { Slash } from "lucide-react"
import { getTableSeniorityByLevelAndIdccAndSlug } from "@/src/query/table_seniority.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getIdccByCode } from "@/src/query/idcc.query";
import { getTableClientSeniorityRowsByIdccAndSlug, getTableSoftwareSeniorityRowsByIdccAndSlug, getTableStandardRowsSeniorityByIdccAndSlug } from "@/src/query/table_seniority_row.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, idcc: string, level: 'logiciel' | 'client', tableSenioritySlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idccExist = await getIdccByCode(params.idcc)
    if (!idccExist) throw new Error("IDCC non trouvé")
    const tableExist = await getTableSeniorityByLevelAndIdccAndSlug(params.level, params.idcc, params.tableSenioritySlug)
    if (!tableExist) throw new Error("Table d'âge non trouvée")
    let rows
    switch (params.level) {
        case 'client':
            const rowsClient = await getTableClientSeniorityRowsByIdccAndSlug(params.idcc, params.tableSenioritySlug)
            rows = rowsClient.map(row => {
                return (
                    row.Client_Table_Seniority_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            label: row.label,
                            level: row.level,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            pourcentage: row.pourcentage,
                            coefficient: row.coefficient,
                            qualification: row.qualification,
                            indice: row.indice,
                            echelon: row.echelon,
                        }
                    })
                )
            }).flat(1)

            break;
        case 'logiciel':
            const rowsSoftware = await getTableSoftwareSeniorityRowsByIdccAndSlug(params.idcc, params.tableSenioritySlug)
            rows = rowsSoftware.map(row => {
                return (
                    row.Software_Table_Seniority_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            label: row.label,
                            level: row.level,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            pourcentage: row.pourcentage,
                            coefficient: row.coefficient,
                            qualification: row.qualification,
                            indice: row.indice,
                            echelon: row.echelon,
                        }
                    })
                )
            }).flat(1)

            break;
        default:
            const rowsStandard = await getTableStandardRowsSeniorityByIdccAndSlug(params.idcc, params.tableSenioritySlug)
            rows = rowsStandard.map(row => {
                return (
                    row.Table_Seniority_Row.map(row => {
                        return {
                            clientSlug: params.clientSlug,
                            softwareSlug: params.softwareSlug,
                            slug: row.slug,
                            label: row.label,
                            level: row.level,
                            minMonth: row.minMonth,
                            maxMonth: row.maxMonth,
                            pourcentage: row.pourcentage,
                            coefficient: row.coefficient,
                            qualification: row.qualification,
                            indice: row.indice,
                            echelon: row.echelon,
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/`}>Table d&apos;ancienneté</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/${params.idcc}`}>{idccExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/${params.idcc}`}>{tableExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={rows} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/seniority/${params.idcc}/${params.level}/${params.tableSenioritySlug}/create`} buttonLabel="Ajouter une ligne" />
        </Container>
    )
}
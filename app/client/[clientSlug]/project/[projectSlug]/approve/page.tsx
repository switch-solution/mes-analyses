import Container from '@/components/layout/container'
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getProjectBySlug } from "@/src/query/project.query";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { userIsValidatorProject } from '@/src/query/security.query';
import { getMyRowAwaitingApproval } from '@/src/query/user.query';
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsValidator = await userIsValidatorProject(params.projectSlug)
    if (!userIsValidator) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const projectExist = await getProjectBySlug(params.projectSlug)
    const rowsList = await getMyRowAwaitingApproval(params.projectSlug, userIsValidator.userId)
    const rows = rowsList.map(row => {
        return {
            projectSlug: params.projectSlug,
            clientSlug: params.clientSlug,
            table: row.table,
            response: row.response,
            processusLabel: row.processusLabel,
            rowSlug: row.rowSlug,
            slug: row.slug,
            valueId: row.valueId,
            valueLabel: row.valueLabel
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={rows} inputSearch="processusLabel" inputSearchPlaceholder="Chercher par processus" />
        </Container>
    )
}
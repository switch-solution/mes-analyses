import Container from "@/components/layout/container"
import { columns } from "./dataTablecolumns"
import { userIsEditorClient } from "@/src/query/security.query"
import { getSoftwareBySlug } from "@/src/query/software.query"
import { getComponentTextareta } from "@/src/query/software_component.query"
import { DataTable } from "@/components/layout/dataTable";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error('Le logiciel n\'existe pas')
    }
    const softwareTableList = await getComponentTextareta()
    const table = softwareTableList.map((table) => {
        return {
            clientSlug: params.clientSlug,
            id: table.id,
            softwareSlug: params.softwareSlug,
            code: table.id,
            label: table.label,
            description: table.description,
            slug: table.slug,
            type: table.type
        }
    })
    return (
        <Container>
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
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={table} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/textarea/create`} buttonLabel="Ajouter une table" />
        </Container>

    )
}
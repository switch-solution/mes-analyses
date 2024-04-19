import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { Security } from "@/src/classes/security";
import { Client } from "@/src/classes/client";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Idcc } from "@/src/classes/idcc"
export default async function Page({ params }: { params: { clientSlug: string, idcc: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Le client n'existe pas")
    }
    const security = new Security()
    const isEditor = await security.isEditorClient(clientExist.siren);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const idcc = new Idcc(params.idcc)
    const tableList = await idcc.tableKeeping()

    const tables = tableList.map((table) => {
        return {
            id: table.id,
            label: table.label,
            idcc: table.idcc,
            dateStart: table.dateStart.toLocaleDateString('fr-FR'),
            dateEnd: table.dateEnd?.toLocaleDateString('fr-FR'),
            clientSlug: params.clientSlug,
            slug: table.slug,
            type: table.type
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc`}>Idcc</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}`}>{params.idcc}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/tableKeeping`}>Table des maintien</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={tables} inputSearch="id" inputSearchPlaceholder="Chercher par code idcc" />
            </ContainerDataTable>
        </Container>
    )
}
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
import { Idcc } from "@/src/classes/idcc";
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
    const countElement = await idcc.countElement()
    const elements = [
        {
            label: 'Table d\'ancienneté',
            slug: 'tableSeniority',
            count: countElement.tableSeniority,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: false
        },
        {
            label: 'Table des salaires',
            slug: 'tableWage',
            count: countElement.tableWage,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: false
        },
        {
            label: 'Table des maintiens',
            slug: 'tableKeeping',
            count: countElement.tableKeeping,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: false
        },
        {
            label: 'Constantes',
            slug: 'constant',
            count: countElement.constant,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: false
        },
        {
            label: 'Coefficient',
            slug: 'coefficient',
            count: countElement.coefficient,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: true
        },
        {
            label: 'Niveau',
            slug: 'niveau',
            count: countElement.niveau,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: true
        },
        {
            label: 'Echelon',
            slug: 'Echelon',
            count: countElement.echelon,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: true
        },
        {
            label: 'Position',
            slug: 'position',
            count: countElement.position,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: true
        },
        {
            label: 'Qualification',
            slug: 'qualification',
            count: countElement.qualification,
            clientSlug: params.clientSlug,
            idcc: params.idcc,
            classification: true
        },

    ]
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
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={elements} inputSearch="id" inputSearchPlaceholder="Chercher par code idcc" />
            </ContainerDataTable>
        </Container>
    )
}
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
    const constantList = await idcc.constant()

    const constants = constantList.map((constant) => {
        return {
            id: constant.id,
            label: constant.label,
            idcc: constant.idccCode,
            dateStart: constant.dateStart.toLocaleDateString('fr-FR'),
            dateEnd: constant.dateEnd?.toLocaleDateString('fr-FR'),
            value: constant.value,
            clientSlug: params.clientSlug,
            slug: constant.slug,
            extended: constant.extended
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/idcc/${params.idcc}/constant`}>Constante</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={constants} inputSearch="id" inputSearchPlaceholder="Chercher par code idcc" />
            </ContainerDataTable>
        </Container>
    )
}
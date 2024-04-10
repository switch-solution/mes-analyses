import { columns } from "./dataTablecolumns"
import { getSoftwareBySlug } from "@/src/query/software.query";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container";
import { DataTable } from "@/components/layout/dataTable";
import { getAccumulationForSoftwareActive } from "@/src/query/software_accumulation.query";
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
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
    }

    const accumationList = await getAccumulationForSoftwareActive({
        clientId: clientExist.siren,
        softwareLabel: softwareExist.label
    })
    if (!accumationList) {
        throw new Error("Aucun cumul de paie n'est disponible.")
    }
    const accumulation = accumationList.map((accumulation) => {
        return {
            ...accumulation,
            softwareSlug: params.softwareSlug,
            clientSlug: params.clientSlug
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
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={accumulation} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/accumulation/create`} buttonLabel="Créer un cumul de paie" />
            </ContainerDataTable>
        </Container >
    )

}
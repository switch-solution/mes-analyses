import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/layout/container"
import { columns } from "./dataTablecolumns"
import { Slash } from "lucide-react"
import { DataTable } from "@/components/layout/dataTable";
import { getSofwareAbsenceForMyActiveSoftware } from "@/src/query/software_absence.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
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
import { User } from "@/src/classes/user";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const client = new Client(params.clientSlug)
    const clientExist = await client.clientExist()
    if (!clientExist) {
        throw new Error("Ce client n'existe pas.")
    }
    const security = new Security()
    const userIsEditor = await security.isEditorClient(clientExist.siren)
    if (!userIsEditor) {
        throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Ce logiciel n'existe pas.")
    }
    const user = new User(security.userId)
    const softwareActive = await user.getMySoftwareActive()
    const clientActive = await user.getMyClientActive()
    const absencesList = await getSofwareAbsenceForMyActiveSoftware({
        clientId: clientActive.clientId,
        softwareLabel: softwareActive.softwareLabel
    })
    const absences = absencesList.map((absence) => {
        return {
            label: absence.label,
            description: absence.description,
            softwareLabel: absence.softwareLabel,
            clientSlug: params.clientSlug,
            slug: absence.slug,
            isArchived: absence.isArchived,
            softwareSlug: params.softwareSlug
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
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={absences} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/absence/create`} buttonLabel="Créer une nouvelle absence" />
            </ContainerDataTable>
        </Container>

    )
}
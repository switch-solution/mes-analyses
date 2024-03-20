import { userIsEditorClient } from "@/src/query/security.query";
import { columns } from "./dataTablecolumns"
import { getSoftwareBySlug } from "@/src/query/software.query";
import Container from "@/components/layout/container";
import { DataTable } from "@/components/layout/dataTable";
import { getAccumulationForSoftwareActive } from "@/src/query/software_accumulation.query";
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const userEditor = await userIsEditorClient()
    if (!userEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
    }

    const accumationList = await getAccumulationForSoftwareActive()
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
            <DataTable columns={columns} data={accumulation} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/accumulation/create`} buttonLabel="Créer un cumul de paie" />
        </Container>
    )

}
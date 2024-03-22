import EditSoftwareAccumulation from "components/form/software_accumulation/editSoftwareAccumulation"
import Container from "@/components/layout/container"
import { userIsEditorClient } from "@/src/query/security.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getAccumulationBySlug } from "@/src/query/software_accumulation.query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string, accumulationSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
    }
    const accumulation = await getAccumulationBySlug(params.accumulationSlug)
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/accumulation`}>Cumul de paie</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <EditSoftwareAccumulation clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} accumulationSlug={params.accumulationSlug} accumulation={accumulation} />
        </Container>
    )

}
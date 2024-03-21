import { userIsEditorClient } from "@/src/query/security.query"
import { getSoftwareBySlug } from "@/src/query/software.query"
import Container from "@/components/layout/container"
import CreateSoftwareAccumulation from "@/components/form/software_accumulation/createSoftwareAccumulation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const userIsEditor = await userIsEditorClient(params.clientSlug)
    if (!userIsEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
    }
    const softwareExist = await getSoftwareBySlug(params.softwareSlug)
    if (!softwareExist) {
        throw new Error("Le logiciel n'existe pas.")
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/accumulation`}>Cumul de paie</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CreateSoftwareAccumulation clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} />
        </Container>
    )
}
import { userIsEditorClient } from "@/src/query/security.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import Container from "@/components/layout/container";
import CreateSoftwareComponentForm from "@/components/form/software_component/createSoftwareComponentForm";
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form`}>Formulaire</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <CreateSoftwareComponentForm clientSlug={params.clientSlug} softwareSlug={params.softwareSlug} />
        </Container>
    )

}
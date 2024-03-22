import CreateStandardAttachment from "@/components/form/sotware_attachment/create"
import { userIsEditorClient } from "@/src/query/security.query"
import { getMySoftwareActive } from "@/src/query/user.query";
import Container from "@/components/layout/container";
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
    const softwareSlug = await getMySoftwareActive()
    return (<Container>
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
                    <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/task`}>Tache</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
            </BreadcrumbList>
        </Breadcrumb>
        <CreateStandardAttachment clientSlug={params.clientSlug} softwareSlug={softwareSlug} />
    </Container>)
}
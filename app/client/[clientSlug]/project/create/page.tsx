import CreateProject from "@/components/form/project/createProject"
import Container from "@/components/layout/container"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { userIsEditorClient } from "@/src/query/security.query"
export default async function ProjectCreate({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug)
    if (!isEditor) {
        throw new Error("Vous n'avez pas les droits pour accéder à cette page")
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/`}>Projets</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <CreateProject clientSlug={params.clientSlug} />
        </Container>)
}
import { userIsAuthorizeInThisProject } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getProjectBook, getProjectBySlug } from "@/src/query/project.query";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const booksList = await getProjectBook(params.projectSlug)
    const projectExist = await getProjectBySlug(params.projectSlug)
    if (!projectExist) throw new Error("Projet non trouvé")
    const stdBook = booksList.map((book) => {
        return {
            label: book.label,
            description: book.description,
            softwareLabel: book.projectSoftwareLabel,
            clientSlug: params.clientSlug,
            slug: book.slug,
            isValidate: book.isValidate,
            isHold: book.isHold,
            isStarted: book.isStarted,
            isModifiedAfertValidation: book.isModifiedAfertValidation,
            projectSlug: params.projectSlug
        }
    })
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/project/${params.projectSlug}`}>{projectExist.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={stdBook} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/book/create`} buttonLabel="Créer un nouveau livre" />
        </Container>
    )
}
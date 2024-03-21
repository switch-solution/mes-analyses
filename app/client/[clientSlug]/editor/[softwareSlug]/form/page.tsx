import Container from "@/components/layout/container"
import { columns } from "./dataTablecolumns"
import { userIsEditorClient } from "@/src/query/security.query"
import { getSoftwareBySlug } from "@/src/query/software.query"
import { getComponentForm } from "@/src/query/software_component.query"
import { DataTable } from "@/components/layout/dataTable";
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
    const softwareFormList = await getComponentForm()
    const forms = softwareFormList.map((form) => {
        return {
            clientSlug: params.clientSlug,
            id: form.id,
            softwareSlug: params.softwareSlug,
            code: form.id,
            label: form.label,
            description: form.description,
            slug: form.slug,
            type: form.type
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={forms} inputSearch="id" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/form/create`} buttonLabel="Ajouter un formulaire" />
        </Container>

    )
}
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
import { getComponnentByClientFilterAndSoftware } from "@/src/query/software_component.query";
import Container from "@/components/layout/container";
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
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const componentsList = await getComponnentByClientFilterAndSoftware(params.clientSlug, params.softwareSlug)
    const component = componentsList.map((component) => {
        return {
            clientSlug: params.clientSlug,
            label: component.label,
            description: component.description,
            status: component.status,
            softwareLabel: component.softwareLabel,
            slug: component.slug,
            isForm: component.isForm,
            isTextArea: component.isTextArea,
            isImage: component.isImage,
            softwareSlug: params.softwareSlug

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

            <DataTable columns={columns} data={component} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/component/create`} buttonLabel="Créer un nouveau composant" />
        </Container>
    )
}
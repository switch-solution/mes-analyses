import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { userIsEditorClient } from "@/src/query/security.query";
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
import { getAllProcessusForMyActiveClientAndSoftwareActive } from "@/src/query/processus.query";
import { getIdcc } from "@/src/query/idcc.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const processusList = await getAllProcessusForMyActiveClientAndSoftwareActive()
    const processus = processusList.map((processus) => {
        return {
            clientSlug: params.clientSlug,
            softwareSlug: params.softwareSlug,
            id: processus.id,
            label: processus.label,
            slug: processus.slug,
            level: processus.level,
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus`}>Processus</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={processus} inputSearch="id" inputSearchPlaceholder="Chercher par code processus" href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/processus/create`} buttonLabel="Créer un nouveau processus" />
        </Container>
    )
}
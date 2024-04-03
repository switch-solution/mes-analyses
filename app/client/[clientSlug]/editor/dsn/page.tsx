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
import { getDsnStructure } from "@/src/query/dsn.query";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditorClient(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const dsnList = await getDsnStructure()
    const dsn = dsnList.map((dsnId) => {
        return {
            id: dsnId.id,
            label: dsnId.label,
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
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/${params.softwareSlug}/idcc`}>Idcc</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={dsn} inputSearch="id" inputSearchPlaceholder="Chercher par code idcc" />
        </Container>
    )
}
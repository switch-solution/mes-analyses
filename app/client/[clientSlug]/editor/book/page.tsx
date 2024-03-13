import { userIsEditor } from "@/src/query/security.query"
import { getStdBookByClientFilterByUserSoftware } from "@/src/query/software_book.query"
import { columns } from "./dataTablecolumns"
import Container from "@/components/layout/container";
import { DataTable } from "@/components/layout/dataTable";
import { Slash } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const stdBookList = await getStdBookByClientFilterByUserSoftware(params.clientSlug)
    const stdBook = stdBookList.map((book) => {
        return {
            label: book.label,
            description: book.description,
            softwareLabel: book.softwareLabel,
            clientSlug: params.clientSlug,
            slug: book.slug,
            status: book.status
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={stdBook} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/book/create`} buttonLabel="Créer un nouveau livre" />
        </Container>
    )
}
import { userIsEditor } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getBookChapterByBookSlug } from "@/src/query/software_book.query";
import Container from "@/components/layout/container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { clientSlug: string, bookSlug: string } }) {

    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const chaptersList = await getBookChapterByBookSlug(params.bookSlug)

    const chapters = chaptersList.map((chapter) => {
        return {
            clientSlug: params.clientSlug,
            bookSlug: params.bookSlug,
            bookLabel: chapter.bookLabel,
            slug: chapter.slug,
            label: chapter.label,
            level: `${chapter.level_1}.${chapter.level_2}.${chapter.level_3}`
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
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/`}>Editeur</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/client/${params.clientSlug}/editor/book`}>Cahiers</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DataTable columns={columns} data={chapters} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/book/${params.bookSlug}/chapter/create`} buttonLabel="Créer un nouveau chapitre" />
        </Container>
    )
}
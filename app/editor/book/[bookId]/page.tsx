import { userIsValid } from "@/src/query/security.query"
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/src/features/layout/dataTable";
import { getStdComponentByBookId } from "@/src/query/standard_book.query";
export default async function Page({ params }: { params: { bookId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez etre connecté pour accéder à cette page.')
    }

    const componentsList = await getStdComponentByBookId(params.bookId)
    const components = componentsList.map((component) => {
        return {
            id: component.chapterId,
            chapter: `${component.StandardChapter.level_1}.${component.StandardChapter.level_2}.${component.StandardChapter.level_3}.${component.StandardChapter.label}`,
            component: component.standardComposant.title,
            type: component.standardComposant.type,
            open: component.chapterId,
            edit: component.chapterId,
            delete: component.chapterId,
        }
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={components} href={`/editor/book/${params.bookId}/chapter`} hrefToCreate={`/editor/book/${params.bookId}/chapter/create`} searchPlaceholder="Chercher par chapitre" inputSearch="chapter" />

        </div>
    )
}
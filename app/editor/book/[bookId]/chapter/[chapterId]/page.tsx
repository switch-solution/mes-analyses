import DynamicForm from "@/src/features/form/dynamic/dynamicForm";
import Summary from "@/src/features/layout/summary";
import { getChapterBook } from "@/src/query/standard_book.query";
import { getChapterStdComponents, getStandardInputByChapter } from "@/src/query/chapter_composant.query"
import { userIsValid } from "@/src/query/security.query"
export default async function Chapter({ params }: { params: { bookId: string, chapterId: string } }) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error("Vous devez etre connecté")
    }
    const chapters = await getChapterBook(params.bookId)

    const components = await getChapterStdComponents(params.chapterId)
    const inputs = await getStandardInputByChapter(params.chapterId)
    return <div>
        <Summary chapters={chapters} />
        <div className="mt-4 ml-10">
            {components.map(component =>
                <DynamicForm key={component.standardComposant.id} componentId={component.standardComposant.id} inputs={inputs} />

            )}
        </div>

    </div>
}
import { getComposantsAndInputAndValueByChapterId } from "@/src/query/composant.query"
import DisplayChapterProject from "@/src/features/form/formBuilder/DisplayChapterProject"
export default async function Page({ params }: { params: { projectId: string, bookId: string, chapterId: string } }) {
    const composants = await getComposantsAndInputAndValueByChapterId(params.chapterId)
    return <DisplayChapterProject composants={composants} />

}
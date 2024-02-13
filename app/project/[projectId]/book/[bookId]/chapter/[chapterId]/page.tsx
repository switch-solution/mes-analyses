import { getComposantsAndInputAndValueByChapterId } from "@/src/query/composant.query"
export default async function Page({ params }: { params: { projectId: string, bookId: string, chapterId: string } }) {
    const composants = await getComposantsAndInputAndValueByChapterId(params.chapterId)
    return (<p></p>)

}
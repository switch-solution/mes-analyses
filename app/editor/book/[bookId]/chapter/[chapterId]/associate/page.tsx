import { getChapterComponentsValid } from "@/src/query/standard_chapter.query"
import FormAssociateChapterAndStdComponent from "@/src/features/form/chapter_stdcomponents/FormAssociate"
export default async function AssociateChapterAndStdComposant({ params }: { params: { chapterId: string } }) {
    const standardComponents = await getChapterComponentsValid(params.chapterId)
    return (
        <div>
            <FormAssociateChapterAndStdComponent chapterId={params.chapterId} standardComponents={standardComponents} />
        </div>
    )
}
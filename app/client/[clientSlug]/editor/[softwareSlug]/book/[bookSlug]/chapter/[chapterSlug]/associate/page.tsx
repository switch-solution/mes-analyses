import { userIsEditorClient } from "@/src/query/security.query";
import { getComponentByChapterSlug, getComponentNotInChapterSlug } from "@/src/query/software_chapter.query";
import { Transferabilty } from "@/components/layout/transferabilty";
export default async function Page({ params }: { params: { clientSlug: string, chapterSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const componentsInChapter = await getComponentByChapterSlug(params.chapterSlug);
    const componentsNotInChapter = await getComponentNotInChapterSlug(params.chapterSlug);
    const availableValues = componentsNotInChapter.map((component) => component.componentLabel)
    const useValues = componentsInChapter.map((component) => component.componentLabel)
    return (
        <div className="h-full">
            <Transferabilty availableValues={availableValues} useValues={useValues} chapterSlug={params.chapterSlug} clientSlug={params.clientSlug} />
        </div>
    )

}
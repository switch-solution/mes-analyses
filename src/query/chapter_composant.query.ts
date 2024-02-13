import { prisma } from "@/lib/prisma";
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query"
export const getChapterStdComponents = async (chapterId: string) => {
    try {
        const chapterComponents = await prisma.chapterStdComposant.findMany({
            where: {
                chapterId: chapterId
            },
            include: {
                standardComposant: true
            },

        })

        return chapterComponents

    } catch (err) {

        console.error(err)
        throw new Error("Impossible de récupérer les composants du chapitre.")

    }

}

export const getStandardInputByChapter = async (chapterId: string) => {
    try {
        const chapters = await getChapterStdComponents(chapterId)

        const componentsInput = []

        for (let chapter of chapters) {
            componentsInput.push(...await getStandardInputByComponentId(chapter.standardComposant.id))
        }

        return componentsInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des composants standards')
    }

}
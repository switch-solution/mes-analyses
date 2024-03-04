import { prisma } from "@/lib/prisma";

export const getComponentByChapterSlug = async (chapterSlug: string) => {
    try {
        const chapterExist = await getChapterBySlug(chapterSlug)
        const components = await prisma.softwareChapterSoftwareComponent.findMany({
            where: {
                clientId: chapterExist.clientId,
                bookLabel: chapterExist.bookLabel,
                level_1: chapterExist.level_1,
                level_2: chapterExist.level_2,
                level_3: chapterExist.level_3,
            },
            select: {
                componentLabel: true
            }
        })
        return components
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le composant")
    }

}

export const getComponentNotInChapterSlug = async (chapterSlug: string) => {
    try {
        const chapterExist = await getChapterBySlug(chapterSlug)
        const componentsNotIn = await prisma.softwareChapterSoftwareComponent.findMany({
            where: {
                NOT: [
                    {
                        clientId: chapterExist.clientId,
                        bookLabel: chapterExist.bookLabel,
                        level_1: chapterExist.level_1,
                        level_2: chapterExist.level_2,
                        level_3: chapterExist.level_3,
                    }
                ]

            },
            select: {
                componentLabel: true
            }

        })
        return componentsNotIn
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le composant")
    }

}


export const getChapterBySlug = async (chapterSlug: string) => {
    try {
        const chapter = await prisma.software_Chapter.findUniqueOrThrow({
            where: {
                slug: chapterSlug
            }
        })
        return chapter
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le chapitre")
    }

}
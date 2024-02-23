import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
export const getChapterStdComponents = async (chapterId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const components = await prisma.chapterStdComponent.findMany({
            where: {
                clientId: chapterId
            },
        })

        return components

    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer les composants du chapitre."
        )
    }

}

export const getParent = async ({
    clientId,
    bookLabel,
    bookSoftwareLabel,
    level_1,
    level_2,
    level_3

}: {
    clientId: string,
    bookLabel: string,
    bookSoftwareLabel: string,
    level_1: number | undefined,
    level_2: number | undefined,
    level_3: number | undefined


}) => {
    try {
        if (level_1 && !level_2 && !level_3) {
            return null
        }
        if (level_1 && level_2 && !level_3) {
            return await prisma.standard_Chapter.findFirst({
                where: {
                    bookLabel: bookLabel,
                    clientId: clientId,
                    bookSoftwareLabel: bookSoftwareLabel,
                    level_1: level_1,
                    level_2: undefined,
                    level_3: undefined
                }
            })
        }
        if (level_1 && level_2 && level_3) {
            return await prisma.standard_Chapter.findFirst({
                where: {
                    bookLabel: bookLabel,
                    clientId: clientId,
                    bookSoftwareLabel: bookSoftwareLabel,
                    level_1: level_1,
                    level_2: level_2,
                    level_3: undefined
                }
            })
        }

    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupèrer le chapitre")
    }
}

export const getChapterComponentsValid = async (chapterId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const getChapterDetail = await prisma.standard_Chapter.findUniqueOrThrow({
            where: {
                id: chapterId
            },
            include: {
                book: {
                    include: {
                        software: {
                            select: {
                                clientId: true
                            }
                        }
                    }
                }
            }

        })
        if (!getChapterDetail) {
            throw new Error("Le chapitre n'existe pas.")
        }
        const clientId = getChapterDetail.book.software.clientId
        const softwareId = getChapterDetail.book.softwareId
        const getComponentsForTheClient = await prisma.standard_Component.findMany({
            where: {
                clientId: clientId,
                softwareId: softwareId

            }
        })

        return getComponentsForTheClient


    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer les composants du chapitre."
        )
    }

}


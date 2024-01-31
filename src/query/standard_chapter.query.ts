import { prisma } from "@/lib/prisma";
import { userIsEditorClient, userIsValid } from "./security.query";
import { getStdComponent } from "./stdcomponent.query";
export const getChapterStdComponents = async (chapterId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const components = await prisma.chapterStdComposant.findMany({
            where: {
                chapterId: chapterId
            },
        })

        return components

    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer les composants du chapitre."
        )
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
        const getComponentsForTheClient = await prisma.standard_Composant.findMany({
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


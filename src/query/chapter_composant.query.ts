import { prisma } from "@/lib/prisma";
import { userIsEditorClient, userIsValid } from "./security.query";

export const getChapterStdComponents = async (chapterId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }

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
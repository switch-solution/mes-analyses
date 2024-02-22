import { prisma } from "@/lib/prisma";
import { userIsAuthorizeForProject, userIsValid } from "./security.query";
import { getBookById } from "./project_Book.query";
import { Prisma } from '@prisma/client'

export const getComposantsAndInputAndValueByChapterId = async (chapterId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) throw new Error('Utilisateur non connecté')
        const chapter = await prisma.project_Chapter.findUniqueOrThrow({
            where: {
                id: chapterId
            },
            include: {
                Project_Composant: {
                    include: {
                        Project_Input: {
                            include: {
                                Project_Value: true
                            }
                        },
                    }
                }
            }
        })
        if (!chapter) throw new Error('Chapitre non trouvé')
        const bookId = chapter.bookId
        const book = await getBookById(bookId)
        if (!book) throw new Error('Livre non trouvé')
        const projectId = book.projectId
        await userIsAuthorizeForProject(projectId)
        return chapter.Project_Composant
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des composants');
    }

}

export type getComposantsAndInputAndValueByChapterId = Prisma.PromiseReturnType<typeof getComposantsAndInputAndValueByChapterId>[number];
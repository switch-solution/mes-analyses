import { prisma } from "@/lib/prisma";
import { userIsAuthorizeForProject, userIsValid } from "@/src/query/security.query";
export const getBookChapter = async (bookId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const bookExist = await getBookById(bookId)
        if (!bookExist) {
            throw new Error('Le cahier n\'existe pas')
        }
        const chapters = await prisma.chapter.findMany({
            where: {
                bookId: bookId
            }
        })
        return chapters
    } catch (err) {
        throw new Error('Une erreur est survenue lors de la récupération des chapitres du cahier')
    }

}

export const getBookById = async (bookId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const book = await prisma.book.findUniqueOrThrow({
            where: {
                id: bookId
            },

        })
        if (!book) {
            throw new Error('Le cahier n\'existe pas')
        }
        const projectId = book.projectId
        const userIsAuthorize = await userIsAuthorizeForProject(projectId)
        if (!userIsAuthorize) {
            throw new Error('Vous n\'êtes pas autorisé à accéder à ce projet')
        }
        return book
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération du cahier')
    }
}


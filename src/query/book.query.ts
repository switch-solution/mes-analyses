import { prisma } from "@/lib/prisma";
import { userIsEditorClient, userIsValid } from "./security.query";

export const countChapter = async (bookId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clientId = await getBookClient(bookId)
        if (!clientId) { throw new Error("Le client n'existe pas.") }
        const isEditor = await userIsEditorClient(userId, clientId)
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur d'un client.")
        }

        const countChapter = await prisma.chapter.count({
            where: {
                bookId: bookId
            }
        })

        return countChapter
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le nombre de chapitre.")
    }

}

export const getBookClient = async (bookId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }

        const book = await prisma.standard_Book.findUnique({ where: { id: bookId } })
        if (!book) {
            throw new Error("Le livre n'existe pas.")
        }
        const bookSoftware = book.softwareId

        const softwareBookInfo = await prisma.software.findUnique({
            where: {
                id: bookSoftware
            }
        })

        if (!softwareBookInfo) { throw new Error("Le logiciel du livre n'existe pas.") }

        return softwareBookInfo?.clientId
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le client du livre.")
    }
}

export const getChapterBook = async (bookId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clientId = await getBookClient(bookId)

        const isEditor = await userIsEditorClient(userId, clientId)
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur d'un client.")
        }

        const chapters = await prisma.chapter.findMany({
            where: {
                bookId: bookId
            }
        })
        return chapters
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer les chapitres du livre.")
    }
}

export const getBookExist = async (bookId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const book = await prisma.standard_Book.count({ where: { id: bookId } })
        return book
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer les chapitres du livre.")
    }
}
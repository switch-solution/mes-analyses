import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";
export const getStdBookForSoftwareActive = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }

        const stdBook = await prisma.software_Book.findMany({
            where: {
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }

        })
        return stdBook
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des livres.")
    }

}

export type getStdBookForSoftwareActive = Prisma.PromiseReturnType<typeof getStdBookForSoftwareActive>;

export const getSoftwareBookBySlug = async (bookSlug: string) => {
    try {
        const book = await prisma.software_Book.findUniqueOrThrow({
            where: {
                slug: bookSlug
            }

        })
        return book
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du livre.")
    }

}

export type getSoftwareBookBySlug = Prisma.PromiseReturnType<typeof getSoftwareBookBySlug>;

export const getBookChapterByBookSlug = async (bookSlug: string) => {
    try {
        const bookExist = await getSoftwareBookBySlug(bookSlug)
        if (!bookExist) throw new Error("Le livre n'existe pas.")
        const stdChapter = await prisma.software_Chapter.findMany({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId
            }

        })
        return stdChapter
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des chapitres du livre.")
    }

}

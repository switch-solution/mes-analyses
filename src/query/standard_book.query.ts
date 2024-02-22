import { prisma } from "@/lib/prisma";
import { getMySoftware } from "./user.query";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'

export const getStdBookByClientFilterByUserSoftware = async (clientSlug: string) => {
    try {

        const softwaresUser = await getMySoftware()
        const clientId = await getClientBySlug(clientSlug)
        const stdBook = await prisma.standard_Book.findMany({
            where: {
                softwareLabel: {
                    in: softwaresUser.map(software => software.softwareLabel)
                },
                clientId: clientId.siren
            }

        })
        return stdBook
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des livres.")
    }

}

export type getStdBookByClientFilterByUserSoftware = Prisma.PromiseReturnType<typeof getStdBookByClientFilterByUserSoftware>;

export const getStdBookBySlug = async (bookSlug: string) => {
    try {
        const book = await prisma.standard_Book.findUniqueOrThrow({
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

export type getStdBookBySlug = Prisma.PromiseReturnType<typeof getStdBookBySlug>;

export const getBookChapterByBookSlug = async (bookSlug: string) => {
    try {
        const bookExist = await getStdBookBySlug(bookSlug)
        if (!bookExist) throw new Error("Le livre n'existe pas.")
        const stdChapter = await prisma.standard_Chapter.findMany({
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

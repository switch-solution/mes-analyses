import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getProjectBySlug } from "./project.query";

export const getComponentAndChapterByBookSlug = async (bookSlug: string) => {
    try {
        const bookExist = await getProjectBookByslug(bookSlug)
        if (!bookExist) throw new Error('Book inexistant')
        const chapters = await prisma.project_Component.findMany({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId,
                projectLabel: bookExist.projectLabel,
                projectSoftwareLabel: bookExist.projectSoftwareLabel
            },
            include: {
                Project_Input: true
            },
            orderBy: [
                {
                    chapterLevel_1: 'asc'
                },
                {
                    chapterLevel_2: 'asc'
                },
                {
                    chapterLevel_3: 'asc'
                }
            ]
        })
        return chapters
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}
export type getComponentAndChapterByBookSlug = Prisma.PromiseReturnType<typeof getComponentAndChapterByBookSlug>;

export const getChapterByBookSlug = async (bookSlug: string) => {
    try {
        const bookExist = await getProjectBookByslug(bookSlug)
        if (!bookExist) throw new Error('Book inexistant')
        const chapters = await prisma.project_Chapter.findMany({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId,
                projectLabel: bookExist.projectLabel,
                projectSoftwareLabel: bookExist.projectSoftwareLabel
            },
            orderBy: [
                {
                    level_1: 'asc'
                },
                {
                    level_2: 'asc'
                },
                {
                    level_3: 'asc'
                }
            ]
        })
        return chapters
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export type getChapterByBookSlug = Prisma.PromiseReturnType<typeof getChapterByBookSlug>;


export const getProjectBookByslug = async (bookSlug: string) => {
    try {
        const projectBook = await prisma.project_Book.findUniqueOrThrow({
            where: {
                slug: bookSlug
            }
        })
        return projectBook
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export const getCountBookByProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        const count = await prisma.project_Book.count({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
            }
        })
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export const getProjectBookBySlug = async (bookSlug: string) => {
    try {
        const bookExist = await prisma.project_Book.findUniqueOrThrow({
            where: {
                slug: bookSlug
            }
        })
        return bookExist
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}
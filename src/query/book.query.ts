import { prisma } from '@/lib/prisma'
import { getSoftwareBySlug } from './software.query'
import { getProjectBySlug } from './project.query'
export const copyBook = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error("Ce logiciel n'existe pas")
        const books = await prisma.book.findMany({
            where: {
                status: "actif"
            },
        })
        if (!books) throw new Error("Aucun cahier n'a été trouvé")
        await prisma.software_Book.createMany({
            data: books.map(book => {
                return {
                    label: book.label,
                    description: book.description,
                    clientId: softwareExist.clientId,
                    softwareLabel: softwareExist.label,
                    createdBy: softwareExist.createdBy,
                    status: "actif",
                    slug: `${softwareExist.slug}-${book.slug}`,
                }

            })

        })
        const chapters = await prisma.chapter.findMany({
            where: {
                bookLabel: {
                    in: books.map(book => book.label)
                }
            }
        })
        if (!chapters) throw new Error("Aucun chapitre n'a été trouvé")
        await prisma.software_Chapter.createMany({
            data: chapters.map(chapter => {
                return {
                    label: chapter.label,
                    bookLabel: chapter.bookLabel,
                    clientId: softwareExist.clientId,
                    bookSoftwareLabel: softwareExist.label,
                    level_1: chapter.level_1,
                    level_2: chapter.level_2,
                    level_3: chapter.level_3,
                    slug: `${softwareExist.slug}-${chapter.slug}`,
                    parentId: chapter.parentId,
                    createdBy: softwareExist.createdBy,
                }
            })
        })
        const form = await prisma.form.findMany({
            where: {
                status: "actif",
            }
        })
        const chapterForm = await prisma.chapterForm.findMany({
            where: {
                bookLabel: {
                    in: books.map(book => book.label)
                },
                formTitle: {
                    in: form.map(form => form.title)
                }
            }
        })
        await prisma.softwareChapterSoftwareComponent.createMany({
            data: chapterForm.map(chapterForm => {
                return {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId,
                    bookLabel: chapterForm.bookLabel,
                    level_1: chapterForm.level_1,
                    level_2: chapterForm.level_2,
                    level_3: chapterForm.level_3,
                    componentLabel: chapterForm.formTitle,
                    componentType: chapterForm.formType,
                    createdBy: softwareExist.createdBy,
                    bookSoftwareLabel: softwareExist.label,
                }
            })
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}

export const getBookByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Ce projet n'existe pas")
        const books = await prisma.project_Book.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
            }
        })
        return books
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}
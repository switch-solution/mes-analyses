import { prisma } from "@/lib/prisma";
import { getProjectBookByslug } from "./project_book.query";

export const getComponentWitchInputByBookSlug = async (bookSlug: string) => {
    try {
        const bookExist = await getProjectBookByslug(bookSlug)
        if (!bookExist) throw new Error("Le livre n'existe pas")
        const lastVersion = await prisma.project_Value.findFirst({
            where: {
                bookLabel: bookExist.label,
                projectLabel: bookExist.projectLabel,
                clientId: bookExist.clientId,
                projectSoftwareLabel: bookExist.projectSoftwareLabel,
                isCode: true
            },
            select: {
                version: true
            },
            orderBy: {
                version: 'desc'
            }
        })
        const components = await prisma.project_Component.findMany({
            where: {
                bookLabel: bookExist.label,
                projectLabel: bookExist.projectLabel,
                clientId: bookExist.clientId,
                projectSoftwareLabel: bookExist.projectSoftwareLabel
            },
            include: {
                Project_Input: {
                    include: {
                        Project_Value: true
                    }
                }
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



        return components
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données")
    }

}


import { prisma } from "@/lib/prisma";
import { getProjectBookByslug } from "./project_book.query";
import { getProjectBySlug } from "./project.query";
import { getComponentBySlug } from "./project_component.query";

export const getValueForDataTable = async (bookSlug: string, projectSlug: string, clientSlug: string) => {
    try {
        const bookExist = await getProjectBookByslug(bookSlug)
        if (!bookExist) throw new Error("Le livre n'existe pas")
        const components = await prisma.project_Component.findMany({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId,
                projectLabel: bookExist.projectLabel,
                projectSoftwareLabel: bookExist.projectSoftwareLabel
            }
        })
        const values = []

        for (const component of components) {
            const componentRecordIdList = await prisma.project_Value.groupBy({
                by: ['recordId'],
                where: {
                    clientId: bookExist.clientId,
                    projectLabel: bookExist.projectLabel,
                    projectSoftwareLabel: bookExist.projectSoftwareLabel,
                    bookLabel: bookExist.label,
                    chapterLevel_1: component.chapterLevel_1,
                    chapterLevel_2: component.chapterLevel_2,
                    chapterLevel_3: component.chapterLevel_3,
                }
            })
            for (const recordId of componentRecordIdList) {
                const recordIdValues = await prisma.project_Value.findMany({
                    where: {
                        recordId: recordId.recordId,
                        OR: [
                            {
                                isCode: true
                            },
                            {
                                isLabel: true
                            },
                            {
                                isDescription: true
                            }
                        ]
                    }
                })
                values.push({
                    isCode: recordIdValues.find(value => value.isCode)?.textValue,
                    isLabel: recordIdValues.find(value => value.isLabel)?.textValue,
                    isDescription: recordIdValues.find(value => value.isDescription)?.textValue,
                    recordId: recordId.recordId,
                    projectSlug: projectSlug,
                    bookSlug: bookSlug,
                    clientSlug: clientSlug,
                    componentSlug: component.slug
                })
            }

        }
        return values

    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données")
    }

}

export const countValueByPojectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        const count = await prisma.project_Value.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données")
    }

}

export const getCountComponentByComponentSlug = async (componentSlug: string) => {
    try {
        const componentExist = await getComponentBySlug(componentSlug)
        if (!componentExist) throw new Error("Le composant n'existe pas")
        const count = await prisma.project_Value.count({
            where: {
                clientId: componentExist.clientId,
                projectLabel: componentExist.projectLabel,
                projectSoftwareLabel: componentExist.projectSoftwareLabel,
                chapterLevel_1: componentExist.chapterLevel_1,
                chapterLevel_2: componentExist.chapterLevel_2,
                chapterLevel_3: componentExist.chapterLevel_3
            }
        })
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données")
    }

}

const getValuesBySlug = async (slug: string) => {
    try {
        const values = await prisma.project_Value.findMany({
            where: {
                slug: slug
            }
        })
        return values

    } catch (err) {

    }

}


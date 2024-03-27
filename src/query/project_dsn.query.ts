import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "./project.query";

export const getDsnByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet non trouvé")
        const dsn = await prisma.project_DSN.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                softwareLabel: projectExist.softwareLabel

            },
            include: {
                Project_DSN_Data: true
            },
            orderBy: [
                {
                    dsnDate: 'asc'
                }
            ]
        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des DSN')
    }

}

export const getRandomFieldDsnByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet non trouvé")
        const dsn = await prisma.project_DSN.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                softwareLabel: projectExist.softwareLabel
            },
            select: {
                random: true
            }
        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des DSN')
    }
}

export const getDsnByProjectSlugAndRandomFilterByType = async (projectSlug: string, random: string, type: 'DSN' | 'Society' | 'Establishment' | 'Mutual' | 'Job' | 'Contract') => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        const dsnStructure = await prisma.dsn_Structure.findMany({
            where: {
                type: type
            }
        })
        const dsn = await prisma.project_DSN.findFirst({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                softwareLabel: projectExist.softwareLabel,
                random: random,
            },
            include: {
                Project_DSN_Data: {
                    where: {
                        id: {
                            in: dsnStructure.map((structure) => structure.id)
                        }
                    }
                }
            }
        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des DSN')
    }

}


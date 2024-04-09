import { prisma } from "@/lib/prisma";
import { Project } from "../classes/project";
export const getDsnByProjectSlug = async (projectSlug: string) => {
    try {
        const projet = new Project(projectSlug)
        const projectExist = await projet.projectExist()
        const projetDetail = await projet.projetDetail()
        if (!projetDetail) throw new Error("Projet non trouvé")
        const dsn = await prisma.project_DSN.findMany({
            where: {
                projectLabel: projetDetail.label,
                clientId: projetDetail.clientId,
                softwareLabel: projetDetail.softwareLabel

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

/**
 * This function is used to get a random field DSN by project
 * @param param0 
 * @returns 
 */

export const getRandomFieldDsnByProject = async ({
    clientId,
    projectLabel,
    softwareLabel
}: {
    clientId: string,
    projectLabel: string,
    softwareLabel: string
}) => {
    try {
        const dsn = await prisma.project_DSN.findMany({
            where: {
                projectLabel,
                clientId,
                softwareLabel
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

/**
 * This function return this data by type DSN
 * @param param0 
 * @returns 
 */

export const getDsnByProjectAndRandomFilterByType = async ({
    clientId,
    projectLabel,
    softwareLabel,
    random,
    type
}: {
    clientId: string,
    projectLabel: string,
    softwareLabel: string,
    random: string,
    type: 'DSN' | 'Society' | 'Establishment' | 'Mutual' | 'Job' | 'Contract' | 'RateAt' | 'OPS'
}) => {
    try {
        const dsnStructure = await prisma.dsn_Structure.findMany({
            where: {
                type: type
            }
        })
        const dsn = await prisma.project_DSN.findFirst({
            where: {
                projectLabel,
                clientId,
                softwareLabel,
                random,
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


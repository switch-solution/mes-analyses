import { prisma } from "@/lib/prisma"
import { getProjectBySlug } from "./project.query"

export const getWorkFlowByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet non trouvé")
        const workflow = await prisma.project_Book_WorkFlow.findMany({
            where: {
                projectLabel: projectExist.label
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                },
                Project_Book: true
            },

        })
        return workflow
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du workflow du projet.")
    }

}

export const getPourcentageValidation = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet non trouvé")
        const bookIsValid = await prisma.project_Book_WorkFlow.count({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                isValid: true
            }
        })
        const bookTotal = await prisma.project_Book_WorkFlow.count({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId
            }

        })
        const pourcentage = (bookIsValid / bookTotal) * 100
        return Math.round(pourcentage)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du pourcentage de validation du projet.")
    }

}
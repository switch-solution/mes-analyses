import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";

export const getMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const myProjects = await prisma.userProject.findMany({
            where: {
                userId: userId
            },
            include: {
                project: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return myProjects
    } catch (err) {
        console.log(err)
    }

}

export const getProjectBySlug = async (projectSlug: string) => {
    try {
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                slug: projectSlug
            }
        })
        return project
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `L'utilisateur essaye d'accéder à un projet qui n'existe pas ${projectSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error('Une erreur est survenue lors de la récupération du projet')
    }
}

export const getCountMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const countMyProjects = await prisma.userProject.count({
            where: {
                userId: userId
            }
        })
        return countMyProjects
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}

export const getProjectsHome = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const countBook = await prisma.project_Book.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countUserProject = await prisma.userProject.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                projectClientId: projectExist.clientId
            }
        })
        const countAttachment = await prisma.project_Attachment.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countConstant = await prisma.project_Constant.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countItems = await prisma.project_Items.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countDsn = await prisma.dsn.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })

        return {
            countBook,
            countUserProject,
            countAttachment,
            countConstant,
            countItems,
            countDsn

        }
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }
}

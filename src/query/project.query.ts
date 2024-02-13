import { prisma } from "@/lib/prisma";
import { userIsAuthorizeForProject, userIsValid } from "./security.query";

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
export const getProjectBook = async (projectId: string) => {
    try {
        const projetExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projetExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const projectBook = await prisma.book.findMany({
            where: {
                projectId: projectId
            }
        })
        return projectBook
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération des cahiers du projet')
    }

}

export const getCountProjectAttchment = async (projectId: string) => {
    try {
        const projetExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projetExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const countAttachment = await prisma.attachment.count({
            where: {
                projectId: projectId
            }
        })
        return countAttachment
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des cahiers du projet')
    }
}

export const getProjectAttachment = async (projectId: string) => {
    try {
        const projectExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const projectAttachment = await prisma.attachment.findMany({
            where: {
                projectId: projectId
            }
        })
        return projectAttachment
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des cahiers du projet')
    }
}

export const getCountProjectBook = async (projectId: string) => {
    try {
        const projetExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projetExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const countBook = await prisma.book.count({
            where: {
                projectId: projectId
            }
        })
        return countBook
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des cahiers du projet')
    }

}

export const getMyProjectSoftware = async () => {
    try {
        const myProjects = await getMyProjects()
        if (!myProjects) {
            throw new Error('Vous n\'avez pas de projet')
        }
        const projectSoftware = await prisma.software.findMany({
            where: {
                id: {
                    in: myProjects.map(project => project.project.softwareId)
                }
            }
        })


        return projectSoftware
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération des logiciels du projet')
    }

}
/**
 * Test project exist and user is authorize
 * @param projectId 
 * @returns 
 */
export const getProjectByIdAndTestAuthorize = async (projectId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const userIsAuthorize = await userIsAuthorizeForProject(projectId)
        if (!userIsAuthorize) {
            throw new Error('Vous n\'êtes pas autorisé à accéder à ce projet')
        }
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                id: projectId
            }
        })

        return project
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération du projet')
    }

}

export const getProjectUsers = async (projectId: string) => {
    try {
        const projetExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projetExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const users = await prisma.userProject.findMany({
            where: {
                projectId: projectId

            }
        })
        return users
    } catch (err) {

    }

}

export const getCountProjectUsers = async (projectId: string) => {
    try {
        const projetExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projetExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const count = await prisma.userProject.count({
            where: {
                projectId: projectId

            }
        })
        return count
    } catch (err) {

    }

}
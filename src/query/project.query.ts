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
            }

        })
        return myProjects
    } catch (err) {
        console.log(err)
    }

}

export const getProjectBook = async (projectId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const userIsAuthorize = await userIsAuthorizeForProject(projectId)
        if (!userIsAuthorize) {
            throw new Error('Vous n\'êtes pas autorisé à accéder à ce projet')
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

export const getMyProjectSoftware = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
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

export const getProjectById = async (projectId: string) => {

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
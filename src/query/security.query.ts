import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { ActionError } from "@/lib/safe-actions";
import { getClientBySlug } from "./client.query";
import { createLog } from "./logger.query";
import type { Logger } from "@/src/helpers/type";
import { getMyProjects, getProjectBySlug } from "./project.query";
import { getMyClientActive, getMySoftwareActive } from "./user.query";
import { getSoftwareBySlug } from "./software.query";
/**
 * Test if the user is an admin at least once
 * @param userId 
 * @param clientId 
 * @returns 
 */
export const userIsAdminClient = async (clientSlug: string) => {
    try {
        if (!clientSlug) throw new ActionError("Le slug est obligatoire")
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const client = await getClientBySlug(clientSlug)
        if (!client) throw new ActionError("Le client n'existe pas.")
        const isAdmin = await prisma.userClient.findFirstOrThrow({
            where: {
                userId: userId,
                clientId: client.siren,
                isBlocked: false,
                isBillable: true,
                isAdministrator: true
            }
        })
        if (!isAdmin) {
            const log: Logger = {
                level: "security",
                message: `L'utilisateur essaye d'accéder à la page admin client sans les droits`,
                scope: "client",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }
        return {
            userId,
            clientId: client.siren
        }
    } catch (err) {
        console.error(err)
        throw new ActionError(`Une erreur est survenue lors des données de la table UserClient`)
    }

}

/**
 * This function test if user is editor 
 * @param clientSlug 
 * @returns 
 */

export const userIsEditorClient = async (clientSlug: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        const clientActive = validation.clientSlug
        if (clientActive !== clientSlug) {
            const log: Logger = {
                level: "security",
                message: `L'utilisateur essaye d'accéder de réaliser une opération d'édition sur le client sans les droits`,
                scope: "client",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }
        const isAdmin = await prisma.userClient.findFirstOrThrow({
            where: {
                userId: userId,
                clientId: validation.clientId,
                isBlocked: false,
                isBillable: true,
                isEditor: true
            }
        })
        if (!isAdmin) {
            const log: Logger = {
                level: "security",
                message: `L'utilisateur essaye d'accéder de réaliser une opération d'édition sur le client sans les droits`,
                scope: "client",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }
        return {
            userId,
            clientId: validation.clientId,
            clientSlug: validation.clientSlug,
            softwareLabel: validation.softwareLabel,
            softwareSlug: validation.softwareSlug

        }
    } catch (err) {
        console.error(err)
        throw new ActionError(`Une erreur est survenue lors des données de la table UserClient`)
    }

}

export const userIsAdminSystem = async () => {

    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new Error("L'utilisateur n'existe pas")

        }
        if (user.email !== env.ADMIN_EMAIL) {
            const log: Logger = {
                level: "security",
                message: `L'utilisateur essaye d'accéder à la page admin sans les droits`,
                scope: "administrator",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new Error("L'utilisateur n'est pas administrateur du système.")
        }
        return true
    } catch (err) {
        console.error(err)
        throw new Error("L'utilisateur n'est pas administrateur du système.")
    }

}


/**
 * Validate if the user is connected and return the userId
 * @returns  userId
 */
export const userIsValid = async () => {
    try {
        const session = await getAuthSession()
        if (!session?.user.email) {
            throw new ActionError("Vous n'êtes pas connecté")
        }
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            const log: Logger = {
                level: "error",
                message: `Erreur de connexion de l'utilisateur`,
                scope: "client",
            }
            await createLog(log)
            throw new ActionError("L'utilisateur n'existe pas")
        }
        const userIsBlocked = await prisma.userOtherData.findFirst({
            where: {
                userId: user.id,
                isBlocked: true,
            }
        })
        if (userIsBlocked) {
            await prisma.logger.create({
                data: {
                    level: "security",
                    message: `L'utilisateur essaye de se connecter avec un compte bloqué`,
                    scope: "user",
                    createdBy: "system",
                    userId: user.id
                }
            })
            throw new ActionError("L'utilisateur n'existe est bloqué")
        }
        const userIsActivated = await prisma.userOtherData.findFirst({
            where: {
                userId: user.id,
                isBlocked: false,
            }
        })
        if (!userIsActivated?.cgv) throw new ActionError("Vous devez accepter les CGV")
        if (!userIsActivated?.gdpr) throw new ActionError("Vous devez accepter les RGPD")
        return user.id
    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la vérification de l'utilisateur")
    }

}



export const userIsEditorProject = async (projectSlug: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const projectsExist = await getProjectBySlug(projectSlug)
        if (!projectsExist) {
            new ActionError("Le projet n'existe pas")
        }
        const userProjects = await getMyProjects()
        if (!userProjects) throw new ActionError("Vous n'avez pas de projet")
        const userExistInThisProject = userProjects.find((project) => project.project.slug === projectSlug)
        if (!userExistInThisProject) {
            const log: Logger = {
                level: "security",
                message: `Tentative d'accès au projet ${projectSlug} sans les droits`,
                scope: "project",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }

        const isEditor = await prisma.userProject.findFirst({
            where: {
                userId: userId,
                projectLabel: projectsExist.label,
                isEditor: true
            }
        })
        if (!isEditor) throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        return {
            userId,
            clientId: projectsExist.clientId,
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel
        }
    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la vérification de l'utilisateur")
    }
}

export const userIsValidatorProject = async (projectSlug: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const projectsExist = await getProjectBySlug(projectSlug)
        if (!projectsExist) {
            new ActionError("Le projet n'existe pas")
        }
        const userProjects = await getMyProjects()
        if (!userProjects) throw new ActionError("Vous n'avez pas de projet")
        const userExistInThisProject = userProjects.find((project) => project.project.slug === projectSlug)
        if (!userExistInThisProject) {
            const log: Logger = {
                level: "security",
                message: `Tentative d'accès au projet ${projectSlug} sans les droits`,
                scope: "project",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }

        const isEditor = await prisma.userProject.findFirst({
            where: {
                userId: userId,
                projectLabel: projectsExist.label,
                isValidator: true
            }
        })
        if (!isEditor) throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        return {
            userId,
            clientId: projectsExist.clientId,
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel
        }
    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la vérification de l'utilisateur")
    }
}





export const userIsAdminProject = async (projectSlug: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const projectsExist = await getProjectBySlug(projectSlug)
        if (!projectsExist) {
            new ActionError("Le projet n'existe pas")
        }
        const userProjects = await getMyProjects()
        if (!userProjects) throw new ActionError("Vous n'avez pas de projet")
        const userExistInThisProject = userProjects.find((project) => project.project.slug === projectSlug)
        if (!userExistInThisProject) {
            const log: Logger = {
                level: "security",
                message: `Tentative d'accès au projet ${projectSlug} sans les droits`,
                scope: "project",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }

        const isAdmin = await prisma.userProject.findFirst({
            where: {
                userId: userId,
                projectLabel: projectsExist.label,
                isAdmin: true
            }
        })
        if (!isAdmin) throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        return {
            userId,
            clientId: projectsExist.clientId,
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel
        }
    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la vérification de l'utilisateur")
    }
}

/**
 * This function is used to check if the user is authorized to access the project
 * @param projectSlug 
 * @returns 
 */

export const userIsAuthorizeInThisProject = async (projectSlug: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        const projectsExist = await prisma.project.findUniqueOrThrow({
            where: {
                slug: projectSlug
            }
        })
        if (!projectsExist) {
            new ActionError("Le projet n'existe pas")
        }
        const userProject = await prisma.userProject.findFirstOrThrow({
            where: {
                userId: userId,
                projectLabel: projectsExist.label
            }
        })
        if (!userProject) {
            const log: Logger = {
                level: "security",
                message: `Tentative d'accès au projet ${projectSlug} sans les droits`,
                scope: "project",
            }
            await createLog(log)
            await banUser(await userIsValid())
            throw new ActionError("Vous n'avez pas les droits pour effectuer cette action.")
        }
        return {
            userId,
            clientId: projectsExist.clientId,
            projectLabel: projectsExist.label,
            softwareLabel: projectsExist.softwareLabel
        }
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "security",
                message: `L'utilisateur essaye d'accéder au projet ${projectSlug} sans les droits`,
                scope: "project",
                createdBy: "system"
            }
        })
        await banUser(await userIsValid())
        throw new ActionError("Une erreur est survenue lors de la vérification de l'utilisateur")
    }
}


/**
 * This function is used to ban a user if he has more than 3 security incidents
 * @param userId 
 */

export const banUser = async (userId: string) => {
    try {
        const countIncident = await prisma.logger.count({
            where: {
                createdBy: userId,
                level: "security"
            }
        })
        if (countIncident > 3) {
            await prisma.userOtherData.update({
                where: {
                    userId: userId
                },
                data: {
                    isBlocked: true
                }
            })
            await prisma.logger.create({
                data: {
                    level: "security",
                    message: `L'utilisateur a été bloqué suite à plus de 3 incidents de sécurité`,
                    scope: "user",
                    userId: userId,
                    createdBy: "system"
                }

            })
        }


    } catch (err) {
        console.error(err)
        throw new ActionError(`Une erreur est survenue lors de la vérification des droits`)
    }


}


export const userRole = async () => {
    try {
        const session = await getAuthSession()
        if (!session) return null
        const userIsAdminClient = await prisma.userClient.findFirst({
            where: {
                userId: session.user.id,
                isAdministrator: true,
                isActivated: true
            }
        })
        const userIsEditorClient = await prisma.userClient.findFirst({
            where: {
                userId: session.user.id,
                isEditor: true,
                isActivated: true
            }
        })
        return {
            isAdminClient: userIsAdminClient ? true : false,
            isEditorClient: userIsEditorClient ? true : false
        }
    } catch (err) {
        console.error(err)
    }
}


/**
 * This function return the client and software active for the user
 * @returns 
 */
export const getClientActiveAndSoftwareActive = async () => {
    try {
        const clientActive = await getMyClientActive()
        if (!clientActive) throw new Error('Client inexistant')
        const softwareActive = await getMySoftwareActive()

        const clientExist = await getClientBySlug(clientActive)
        if (!clientExist) throw new Error('Client inexistant')
        const softwareExist = await getSoftwareBySlug(softwareActive)

        //User is authorized to access for this client and software

        const validation = await prisma.client.findFirst({
            where: {
                siren: clientExist.siren,
            },
            include: {
                Software: {
                    where: {
                        label: softwareExist.label,
                        clientId: clientExist.siren
                    }
                }
            }

        })
        if (!validation) throw new Error('Vous n\'avez pas les droits pour réaliser cettea action')

        return {
            clientSlug: clientExist.slug,
            softwareSlug: softwareExist.slug,
            clientId: clientExist.siren,
            softwareLabel: softwareExist.label
        }

    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données")
    }


}



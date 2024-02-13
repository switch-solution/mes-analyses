import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUser } from "./user.query";
import { getProjectByIdAndTestAuthorize } from "./project.query";
import { env } from "@/lib/env";
/**
 * Test if the user is an admin at least once
 * @param userId 
 * @param clientId 
 * @returns 
 */
export const userIsAdminClient = async (clientId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        if (!userIsAuthorize) {
            throw new Error("Le client n'existe pas.")
        }
        const isAdmin = await prisma.userClient.findFirst({
            where: {
                userId: userId,
                clientId: clientId,
                isBlocked: false,
                isBillable: true,
                isAdministrator: true
            }
        })
        if (!isAdmin) {
            throw new Error("L'utilisateur n'est pas administrateur du client.")
        }
        return true
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors des données de la table UserClient")
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
            throw new Error("L'utilisateur n'est pas administrateur du système.")
        }
        return true
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table UserClient")
    }

}
/**
 * Test if the user is an editor for this client
 * @param userId 
 * @returns 
 */

export const userIsEditorClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

        const isEditor = await prisma.userClient.count({
            where: {
                userId: userId,
                isEditor: true,
                isBillable: true,
                isBlocked: false,
                clientId: clientId
            }
        })

        if (!isEditor) { throw new Error("L'utilisateur n'est pas éditeur du client.") }
        return isEditor

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors des données de la table UserClient")
    }


}

export const userIsEditor = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const isEditor = await prisma.userClient.count({
            where: {
                userId: userId,
                isEditor: true,
                isBillable: true,
                isBlocked: false
            }
        })
        return isEditor
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors des données de la table UserClient")
    }
}

export const userIsClientEditor = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const isEditor = await prisma.userClient.count({
            where: {
                userId: userId,
                isEditor: true,
                isBillable: true,
                isBlocked: false,
                clientId: clientId
            }
        })
        return isEditor
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification des droits.")
    }
}
/**
 * Validate if the user is connected and return the userId
 * @returns  userId
 */
export const userIsValid = async () => {
    const session = await getAuthSession()
    if (!session?.user.email) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const user = await getUser()
    if (!user) throw new Error("Errreur lors de la récupération de l'utilisateur")
    return user.id

}

export const userIsAuthorizeForClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const userClientsList = await prisma.userClient.findFirstOrThrow({
            where: {
                userId: userId,
                isBillable: true,
                isBlocked: false,
                clientId: clientId
            }
        })
        if (!userClientsList) throw new Error("L'utilisateur n'a pas de client.")

        return userClientsList

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification des droits.")
    }
}

export const userIsAuthorizeForProject = async (projectId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const userIsAuthorizeInProject = await prisma.userProject.findFirstOrThrow({
            where: {
                userId: userId,
                projectId: projectId
            }
        })

        if (!userIsAuthorizeInProject) throw new Error("L'utilisateur n'est pas autorisé pour ce projet")

        return userIsAuthorizeInProject

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification des droits.")
    }
}

export const userIsAuthorizeToTheProject = async (projectId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const userIsAuthorizeToPoject = await prisma.userProject.findFirstOrThrow({
            where: {
                userId: userId,
                projectId: projectId
            }

        })
        if (!userIsAuthorizeToPoject) throw new Error("L'utilisateur n'est pas autorisé pour ce client")

        return userIsAuthorizeToPoject

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification des droits.")

    }

}

export const userIsAuthorizeToAddBookInProject = async (projectId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const projectExist = await getProjectByIdAndTestAuthorize(projectId)
        if (!projectExist) throw new Error("Le projet n'existe pas")
        const userIsAuthorizeInClient = await userIsAuthorizeForClient(projectExist.clientId)
        if (!userIsAuthorizeInClient) throw new Error("L'utilisateur n'est pas autorisé pour ce client")

        const userIsEditorInProject = await prisma.userProject.findFirstOrThrow({
            where: {
                userId: userId,
                projectId: projectId,
                isEditor: true

            }
        })

        if (!userIsEditorInProject) throw new Error("L'utilisateur n'est pas éditeur dans ce projet")

        return true


    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification des droits.")
    }

}

export const userIsAuthorizeToEditSoftware = async (softwareId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const software = await prisma.userSoftware.findFirstOrThrow({
            where: {
                userId: userId,
                softwareId: softwareId,
                isEditor: true
            },
        })
        return software
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels.")
    }
}


import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUser } from "./user.query";
/**
 * Test if the user is an admin at least once
 * @param userId 
 * @param clientId 
 * @returns 
 */
export const userIsAdminClient = async (userId: string, clientId: string) => {

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
/**
 * Test if the user is an editor for this client
 * @param userId 
 * @returns 
 */

export const userIsEditorClient = async (userId: string, clientId: string) => {
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

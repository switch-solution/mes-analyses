import { prisma } from "@/lib/prisma"
import { userIsValid } from "./security.query"
import { getAuthSession } from "@/lib/auth"
import { getClientBySlug, getMyClientActive } from "./client.query"
import { Prisma } from '@prisma/client'

export const getUser = async () => {
    //Ajouter une notion si user est actif
    const session = await getAuthSession()
    if (!session?.user.email) {
        return null
    }
    const user = await prisma.user.findUniqueOrThrow({
        select: {
            id: true,
        },
        where: {
            email: session.user.email
        }
    })
    return user
}

export const userIsComplete = async () => {
    try {
        const session = await getAuthSession()
        const user = await prisma.userClient.count({
            where: {
                userId: session?.user.id,
                isBlocked: false,
            },

        })
        return user

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur.")

    }
}

export const getUserById = async (id: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        })
        return user
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur.")
    }

}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (err) {
        console.error(err)
    }

}

export const getMySoftware = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clientDefaultSlug = await getMyClientActive()
        if (!clientDefaultSlug) throw new Error("Vous n'êtes pas rattaché à un client actif.")
        const clientId = await getClientBySlug(clientDefaultSlug)
        const softwares = await prisma.userSoftware.findMany({
            where: {
                userId: userId,
                softwareClientId: clientId.siren,
                isEditor: true
            },

        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels de l'utilisateur.")
    }

}
export type getMySoftware = Prisma.PromiseReturnType<typeof getMySoftware>;

/**
 * Return the client of the user
 * @returns 
 */
export const getMyClient = async () => {

    const userId = await userIsValid()
    if (!userId) {
        return null
    }
    const client = await prisma.client.findMany({
        select: {
            socialReason: true,
            siren: true,
            slug: true,

        },
        where: {
            UserClient: {
                some: {
                    userId: userId
                }
            }
        }

    })
    return client
}

export const getRoleUser = async () => {
    const userId = await userIsValid()

    if (!userId) {
        throw new Error("Vous n'êtes pas connecté")
    }
    const role = await prisma.userClient.findMany({
        select: {
            isAdministrator: true,
            isEditor: true,
        },
        where: {
            OR: [{
                isAdministrator: true,
                isEditor: true,
            }],
            userId: userId
        }
    })
    return role

}


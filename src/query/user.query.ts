import { prisma } from "@/lib/prisma"
import { userIsValid } from "./security.query"
import { getAuthSession } from "@/lib/auth"
import { getClientBySlug, getMyClientActive } from "./client.query"
import { Prisma } from '@prisma/client'
import { getMyProjects } from "./project.query"
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

export type getUserById = Prisma.PromiseReturnType<typeof getUserById>;


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

export const getUserOtherData = async (userId: string) => {
    try {
        const userOther = await prisma.userOtherData.findUnique({
            where: {
                userId
            }

        })
        return userOther
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de l'utilisateur.")
    }

}

export type getUserOtherData = Prisma.PromiseReturnType<typeof getUserOtherData>;

export const getEvents = async (limit: number) => {
    try {
        const clientActiveSlug = await getMyClientActive()
        if (!clientActiveSlug) throw new Error("Vous n'êtes pas rattaché à un client actif.")
        const clientId = await getClientBySlug(clientActiveSlug)
        if (!clientId) throw new Error("Vous n'êtes pas rattaché à un client actif.")
        const myProjects = await getMyProjects()
        if (!myProjects || myProjects.length === 0) throw new Error("Vous n'êtes pas rattaché à un projet actif.")
        const events = await prisma.logger.findMany({
            where: {
                clientId: clientId.siren,
                projectLabel: {
                    in: myProjects.map(project => project.projectLabel)
                },
                level: {
                    in: ["info", "warning", "error"]
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: limit
        })
        return events
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des événements de l'utilisateur.")
    }

}


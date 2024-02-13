import { prisma } from "@/lib/prisma"
import { userIsValid } from "./security.query"
import { getAuthSession } from "@/lib/auth"

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

export const userIsFirstConnection = async (userId: string) => {
    try {
        const user = await prisma.userOtherData.findFirst({
            where: {
                userId: userId
            }
        })
        return user
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur.")

    }
}

export const getSoftwareUser = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clients = await getMyClient()
        if (!clients) {
            throw new Error("Vous n'avez pas de client.")
        }
        const softwares = await prisma.software.findMany({
            where: {
                clientId: {
                    in: clients.map((client) => client.id)
                }
            },

        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels de l'utilisateur.")
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
        const mySoftwares = await prisma.userSoftware.findMany({
            where: {
                userId: userId
            },
            select: {
                softwareId: true
            }

        })
        const softwares = await prisma.software.findMany({
            where: {
                id: {
                    in: mySoftwares.map(software => software.softwareId)
                }
            }
        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels de l'utilisateur.")
    }

}
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
            id: true,

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


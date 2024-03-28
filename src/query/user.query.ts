import { prisma } from "@/lib/prisma"
import { userIsValid } from "./security.query"
import { getAuthSession } from "@/lib/auth"
import { getClientBySlug } from "./client.query"
import { Prisma } from '@prisma/client'
import { getProjectBySlug } from "./project.query"
export const userSetup = async (id: string) => {
    try {
        const userExist = await prisma.userOtherData.findUnique({
            where: {
                userId: id
            }
        })
        if (!userExist) {
            throw new Error("L'utilisateur n'existe pas.")
        }
        const user = await prisma.userOtherData.update({
            where: {
                userId: id
            },
            data: {
                isSetup: true
            }
        })
        return

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification de l'utilisateur.")

    }

}

export const userIsSetup = async () => {
    try {
        const session = await getAuthSession()
        if (!session?.user.email) {
            return null
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                UserOtherData: true
            }
        })
        if (user?.UserOtherData.at(0)?.isSetup === true) {
            return true
        } else {
            return false
        }

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la vérification de l'utilisateur.")

    }

}
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

/**
 * This function return the software slug active of the user
 * @returns 
 */

export const getMySoftwareActive = async () => {
    try {
        const session = await getAuthSession()
        if (!session) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const softwareId = await prisma.userSoftware.findFirstOrThrow({
            where: {
                userId: session.user.id,
                isActivated: true,
            },
            include: {
                software: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        return softwareId?.software?.slug
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}
export type getMySoftwareActive = Prisma.PromiseReturnType<typeof getMySoftwareActive>;

/**
 * Return the client slug active of the user
 * @returns 
 */

export const getMyClientActive = async () => {
    try {
        const session = await getAuthSession()
        if (!session) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clientId = await prisma.userClient.findFirstOrThrow({
            where: {
                userId: session.user.id,
                isActivated: true,
            },
            include: {
                client: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        return clientId?.client?.slug
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client actif.")

    }
}

export type getMyClientActive = Prisma.PromiseReturnType<typeof getMyClientActive>;
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
        console.log(user)
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
            include: {
                software: true
            }

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
    const client = await prisma.userClient.findMany({
        where: {
            userId: userId
        },
        include: {
            client: true
        }

    })
    return client
}

export type getMyClient = Prisma.PromiseReturnType<typeof getMyClient>;


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


export const getCountMyRowAwaitingApproval = async (projectSlug: string, userId: string) => {

    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const countSociety = await prisma.project_Approve.count({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                response: 'En attente',
                userId: userId

            }
        })
        const count = countSociety
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des lignes en attente de validation')
    }

}
export const getMyRowAwaitingApproval = async (projectSlug: string, userId: string) => {

    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const rows = await prisma.project_Approve.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                response: 'En attente',
                userId: userId

            }
        })
        return rows
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des lignes en attente de validation')
    }

}




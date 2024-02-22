import { prisma } from "@/lib/prisma";
import { userIsValid, userIsAdminClient } from "./security.query";
import { userIsAdminSystem } from "./security.query";
import { getAuthSession } from "@/lib/auth";
import { Prisma } from '@prisma/client'

export const getClientHome = async (slug: string) => {
    try {
        const clientExist = await getClientBySlug(slug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const clientId = clientExist.siren
        const countUser = await prisma.userClient.count({
            where: {
                clientId
            }
        })

        const countProject = await prisma.project.count({
            where: {
                clientId
            }
        })
        const countContact = await prisma.contact.count({
            where: {
                clientId
            }
        })
        const countUserIsBillable = await prisma.userClient.count({
            where: {
                clientId,
                isBillable: true,
                isBlocked: false
            }
        })
        const countLogger = await prisma.logger.count({
            where: {
                clientId: clientId
            }
        })
        const countSoftware = await prisma.software.count({
            where: {
                clientId: clientId
            }
        })

        const countInvitation = await prisma.invitation.count({
            where: {
                clientId: clientId
            }
        })

        const startDate = new Date(clientExist?.dateStartTrial ? clientExist?.dateStartTrial : new Date())
        const endDate = new Date(clientExist?.dateEndTrial ? clientExist?.dateEndTrial : new Date())
        const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
        const days = diffInMs / (1000 * 60 * 60 * 24);
        const numberDaysBeforeEndTrial = days.toFixed(0)
        return {
            countUser,
            countProject,
            countContact,
            countUserIsBillable,
            countLogger,
            countSoftware,
            countInvitation,
            numberDaysBeforeEndTrial
        }
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre de clients.")

    }
}

export const getClientBySlug = async (clientSlug: string) => {
    try {
        const client = await prisma.client.findUniqueOrThrow({
            where: {
                slug: clientSlug
            }
        })
        return client
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `L'utilisateur essaye d'accéder à un cient qui n'existe pas ${clientSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error("Une erreur est survenue lors de la récupération du client par le slug.")
    }

}



export const getClientBySiren = async (siren: string) => {
    try {
        const client = await prisma.client.findUnique({
            where: {
                siren
            }
        })
        return client
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client.")
    }

}


export const getProjectsClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const projects = await prisma.project.findMany({
            where: {
                clientId: clientId
            }
        })
        return projects
    } catch (err) {
        throw new Error("Une erreur est survenue lors de la récupération des projets du client.")
    }

}


export const getUsersIsBillableDetail = async (siren: string) => {

    try {
        const clientExist = await getClientBySiren(siren)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }

        const userIsAdmin = await userIsAdminClient(siren)
        if (userIsAdmin) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const userIsBillable = await prisma.userClient.findMany({
            where: {
                clientId: siren,
                isBillable: true,
                isBlocked: false
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        id: true
                    }
                }
            }
        })
        return userIsBillable
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs facturables.")

    }


}



export const getClientSirenBySlug = async (slug: string) => {
    try {
        const siren = await prisma.client.findUniqueOrThrow({
            where: {
                slug
            },
            select: {
                siren: true

            }
        })
        return siren.siren
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération du client`)
    }

}

/**
 * This function return the client slug.
 * @returns 
 */

export const getMyClientActive = async () => {
    try {
        const session = await getAuthSession()
        if (!session) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const clientId = await prisma.userClient.findFirst({
            where: {
                userId: session.user.id,
                isActivated: true,
            },
            include: {
                client: true
            }
        })
        return clientId?.client?.slug
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client actif.")

    }
}
export const getSoftwareClientList = async (clientSlug: string) => {
    try {
        const idClient = await getClientBySlug(clientSlug)
        const softwareClient = await prisma.software.findMany({
            where: {
                clientId: idClient.siren
            },
            include: {
                client: {
                    select: {
                        slug: true
                    }
                }
            }
        })
        return softwareClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels du client.")
    }

}

export const getUsersClientList = async (slug: string) => {
    try {
        const client = await getClientBySlug(slug)
        const usersClient = await prisma.userClient.findMany({
            where: {
                clientId: client.siren
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        return usersClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs du client.")
    }
}

export type getUsersClientList = Prisma.PromiseReturnType<typeof getUsersClientList>;

export const getClientsToInvoices = async (dateInvoice: Date) => {
    try {
        const userIsAdmin = await userIsAdminSystem()
        if (!userIsAdmin) {
            throw new Error("Vous n'êtes pas autorisé à effectuer cette action.")
        }
        const clients = await prisma.client.findMany({
            where: {
                isBlocked: false,
                OR: [
                    {
                        dateEndTrial: {
                            lt: dateInvoice
                        }
                    },
                    {
                        invoiceEnd: {
                            lt: dateInvoice
                        }
                    }
                ]
            }
        })
        return clients
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des clients pour la facturation.")
    }

}

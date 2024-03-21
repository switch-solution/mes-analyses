import { prisma } from "@/lib/prisma";
import { userIsValid, userIsAdminClient } from "./security.query";
import { userIsAdminSystem } from "./security.query";
import { Prisma } from '@prisma/client'
import { getMySoftwareActive } from "./user.query";
import { getSoftwareBySlug } from "./software.query";

export const getCountClientProjects = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countProjects = await prisma.project.count({
            where: {
                clientId: clientExist.siren
            }
        })
        return countProjects

    } catch (err) {
        console.error(err)
    }

}

export const getCountBook = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countBooks = await prisma.software_Book.count({
            where: {
                clientId: clientExist.siren
            }
        })
        return countBooks
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des livres.")
    }

}

export const getCountMySoftware = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countSoftwares = await prisma.software.count({
            where: {
                clientId: clientExist.siren
            }
        })
        return countSoftwares
    } catch (err) {
        console.error(err)
    }


}

export const getComponentFilterByUser = async (clientSlug: string) => {
    try {
        const mySoftwareSlug = await getMySoftwareActive()
        if (!mySoftwareSlug) {
            throw new Error("Vous n'avez pas de logiciel par default.")
        }
        const software = await getSoftwareBySlug(mySoftwareSlug)
        const clientExist = await getClientBySlug(clientSlug)
        const countComponents = await prisma.software_Component.count({
            where: {
                softwareLabel: software.label,
                clientId: clientExist.siren
            }
        })
        return countComponents
    } catch (err) {
        console.error(err)

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

export const getEndTrialClient = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)

        const startDate = new Date(clientExist?.dateStartTrial ? clientExist?.dateStartTrial : new Date())
        const endDate = new Date(clientExist?.dateEndTrial ? clientExist?.dateEndTrial : new Date())
        const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
        const days = diffInMs / (1000 * 60 * 60 * 24);
        const numberDaysBeforeEndTrial = days.toFixed(0)
        return numberDaysBeforeEndTrial
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de la date de fin d'essai.")


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

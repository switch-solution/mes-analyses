import { prisma } from "@/lib/prisma";
import { userIsValid, userIsAuthorizeForClient, userIsClientEditor, userIsAdminClient } from "./security.query";
import { getLastPricing } from "./setting.query";
import { userIsAdminSystem } from "./security.query";
export const getCountUsersClient = async (clientId: string) => {
    try {

        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const countUser = await prisma.userClient.count({
            where: {
                clientId: clientId
            }
        })
        return countUser
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre d'utilisateurs du client.")

    }

}

export const getSoftwaresClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        await userIsAuthorizeForClient(clientId)
        await userIsClientEditor(clientId)
        const softwareClient = await prisma.software.findMany({
            where: {
                clientId: clientId
            }
        })
        if (!softwareClient) {
            throw new Error("Aucun logiciel n'a été trouvé pour ce client.")
        }
        return softwareClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels du client.")
    }
}

export const getCountProjectClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const clientExist = await getClientById(clientId)
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        const projetsClient = await prisma.project.count({
            where: {
                clientId: clientId
            }
        })
        return projetsClient
    } catch (err) {
        throw new Error("Une erreur est survenue lors de la récupération du nombre de projets du client.")
    }

}

export const getClientById = async (clientId: string) => {
    try {
        const client = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        return client
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du client.")
    }

}

export const getCountContactClient = async (clientId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        const countContact = await prisma.contact.count({
            where: {
                clientId: clientId
            }
        })
        return countContact
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre de contacts du client.")
    }

}

export const getContactsClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const clientExist = await getClientById(clientId)
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)

        const contacts = await prisma.contact.findMany({
            where: {
                clientId: clientId
            }
        })

        return contacts

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des contacts du client.")
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

export const getCountSoftwareClient = async (clientId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        if (!idClient) {
            throw new Error("Le client n'existe pas.")
        }

        const countSoftware = await prisma.software.count({
            where: {
                clientId: clientId
            }
        })

        return countSoftware
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre de logiciel du client.")
    }

}

export const getNumberDaysBeforeEndTrial = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        if (!userIsAuthorize) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const client = await prisma.client.findUniqueOrThrow({
            where: {
                id: clientId
            }
        })
        if (!client?.dateStartTrial || !client?.dateEndTrial) {
            return 0
        }
        const startDate = new Date(client?.dateStartTrial)
        const endDate = new Date(client?.dateEndTrial)
        const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
        const days = diffInMs / (1000 * 60 * 60 * 24);
        return days.toFixed(0)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre de jours avant la fin de l'essai.")
    }

}

export const getCountInvitation = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        if (!idClient) {
            throw new Error("Le client n'existe pas.")
        }
        const countUser = await prisma.invitation.count({
            where: {
                clientId: clientId
            }
        })
        return countUser

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du nombre d'utilisateurs du client.")

    }


}

export const getUsersIsBillableDetail = async (clientId: string) => {

    try {
        const userId = await userIsValid()
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        if (!userIsAuthorize) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const userIsAdmin = await userIsAdminClient(clientId)
        if (userIsAdmin) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const userIsBillable = await prisma.userClient.findMany({
            where: {
                clientId: clientId,
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


export const getCountUserIsBillable = async (clientId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        if (!userIsAuthorize) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }
        const userIsBillable = await prisma.userClient.count({
            where: {
                clientId: clientId,
                isBillable: true,
                isBlocked: false
            }
        })
        return userIsBillable
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de la facturation future.")
    }

}

export const getFutureBilling = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const userIsAuthorize = await userIsAuthorizeForClient(clientId)
        if (!userIsAuthorize) {
            throw new Error("Vous n'êtes pas autorisé à accéder à ce client.")
        }
        const clientExist = await getClientById(clientId)
        if (!clientExist) {
            throw new Error("Le client n'existe pas.")
        }

        const pricing = await getLastPricing()
        const getUserIsBilling = await getCountUserIsBillable(clientId)
        const bill = pricing * getUserIsBilling
        const futureBilling = bill.toFixed(2)
        return futureBilling
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de la facturation future.")
    }

}
export const getSoftwareClientList = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            },
        })
        if (!idClient) {
            throw new Error("Le client n'existe pas.")
        }
        const softwareClient = await prisma.software.findMany({
            where: {
                clientId: clientId
            },
            select: {
                provider: true,
                name: true,
                id: true,
            }
        })
        return softwareClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels du client.")
    }

}

export const getUsersClientList = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!clientId) {
            throw new Error("Le client id est obligatoire.")
        }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        if (!idClient) {
            throw new Error("Le client n'existe pas.")
        }
        const usersClient = await prisma.userClient.findMany({
            where: {
                clientId: clientId
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

        return usersClient
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des utilisateurs du client.")
    }
}

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

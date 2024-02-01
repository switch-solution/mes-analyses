import { prisma } from "@/lib/prisma";
import { userIsValid, userIsAuthorizeForClient, userIsClientEditor } from "./security.query";
export const getCountUsersClient = async (clientId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        if (!idClient) {
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
        await userIsAuthorizeForClient(clientId)
        await userIsClientEditor(clientId)
        const softwareClient = await prisma.software.findMany({
            where: {
                clientId: clientId
            }
        })
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

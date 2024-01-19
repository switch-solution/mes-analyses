import { prisma } from "@/lib/prisma";

export const getCountUsersClient = async (clientId: string) => {
    try {
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

export const getCountInvitation = async (clientId: string) => {
    try {
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
import { prisma } from "@/lib/prisma"
import { userIsEditor, userIsValid } from "@/src/query/security.query";
import { getMyClient } from "./user.query";

export const getMyEditableSoftware = async () => {
    try {

        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const isEditor = await userIsEditor()
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur d'un client.")
        }
        const clientEditableForUser = await prisma.userClient.findMany({
            where: {
                userId: userId,
                isEditor: true,
                isBillable: true,
                isBlocked: false
            },
            select: {
                clientId: true
            }
        })

        if (!clientEditableForUser) {
            throw new Error("L'utilisateur n'est pas éditeur d'un client.")
        }

        const softwareEditableForUser = await prisma.software.findMany({
            where: {
                clientId: {
                    in: clientEditableForUser.map((client) => client.clientId)
                }
            }

        })

        if (!softwareEditableForUser) {
            throw new Error("L'utilisateur n'est pas éditeur d'un logiciel.")
        }

        return softwareEditableForUser

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors des données de la table Software")
    }




}

export const getMyBookEditable = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const isEditor = await userIsEditor()
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur.")
        }

        const bookEditableForUser = await prisma.software.findMany({
            where: {
                clientId: {
                    in: userClient.map((client) => client.id)
                }
            },
            include: {
                Standard_Book: true,
            },
            orderBy: {
                id: 'asc'
            }
        })

        return bookEditableForUser
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Book")
    }
}

export const countMyBookEditable = async () => {

    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }

        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }

        const isEditor = await userIsEditor()
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur.")
        }

        const clientSoftware = await prisma.software.findMany({
            where: {
                clientId: {
                    in: userClient.map((client) => client.id)
                }
            },
        })

        const countBook = await prisma.standard_Book.count({
            where: {
                softwareId: {
                    in: clientSoftware.map((software) => software.id)
                }
            }
        })

        return countBook

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Book")
    }
}

export const getStandardInput = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }

        const isEditor = await userIsEditor()
        if (!isEditor) {
            throw new Error("L'utilisateur n'est pas éditeur d'un client.")
        }

        const standardInput = await prisma.standard_Input.findMany()

        if (!standardInput) {
            throw new Error("Le fichier seed n'a pas été intégré lancer la commande prisma db seed")
        }
        return standardInput

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Input")
    }

}
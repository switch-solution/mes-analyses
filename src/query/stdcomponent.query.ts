import { prisma } from "@/lib/prisma";
import { userIsAuthorizeForClient, userIsEditor, userIsClientEditor, userIsValid } from "./security.query";
import { getMyClient } from "./user.query";
export const countStdComponent = async () => {
    try {
        const user = await userIsValid()
        if (!user) throw new Error('Vous devez être connecté pour effectuer cette action')
        const isEditor = await userIsEditor()
        if (!isEditor) throw new Error('Vous devez être éditeur pour effectuer cette action')
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const count = await prisma.standard_Composant.count({
            where: {
                clientId: {
                    in: userClient.map((client) => client.id)
                }
            }
        })
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }

}

export const getStdComponent = async () => {
    try {
        const user = await userIsValid()
        if (!user) throw new Error('Vous devez être connecté pour effectuer cette action')
        const isEditor = await userIsEditor()
        if (!isEditor) throw new Error('Vous devez être éditeur pour effectuer cette action')
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const stdComponent = await prisma.standard_Composant.findMany({
            where: {
                clientId: {
                    in: userClient.map((client) => client.id)
                },
            },
            include: {
                software: true,
            },
            orderBy: {
                softwareId: 'asc'
            }
        })
        if (!stdComponent) throw new Error("Le composant n'existe pas.")
        return stdComponent
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }
}

export const getMaxStdComponetWithInput = async (componentId: string) => {
    try {
        const user = await userIsValid()
        if (!user) throw new Error('Vous devez être connecté pour effectuer cette action')
        const isEditor = await userIsEditor()
        if (!isEditor) throw new Error('Vous devez être éditeur pour effectuer cette action')
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const max = await prisma.standard_Composant_Input.aggregate({
            _max: {
                order: true
            }
        })

        return max
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }

}
export const getStdComponentWithInput = async (componentId: string) => {
    try {
        const user = await userIsValid()
        if (!user) throw new Error('Vous devez être connecté pour effectuer cette action')
        const isEditor = await userIsEditor()
        if (!isEditor) throw new Error('Vous devez être éditeur pour effectuer cette action')
        const userClient = await getMyClient()
        if (!userClient) {
            throw new Error("L'utilisateur n'est associé à aucun client.")
        }
        const stdComponent = await prisma.standard_Composant.findFirst({
            where: {
                id: componentId,
                clientId: {
                    in: userClient.map((client) => client.id)
                },
            },
            include: {
                Standard_Composant_Input: {
                    orderBy: {
                        order: 'asc'
                    }
                },
            },

        })
        if (!stdComponent) throw new Error("Le composant n'existe pas.")
        return stdComponent
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }

}

export const getStandardInputById = async (id: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error('Utilisateur non connecté')
        const standardInput = await prisma.standard_Composant_Input.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                Standard_Composant: true
            }
        })
        const userEditor = await userIsClientEditor(standardInput.Standard_Composant.clientId)
        const userIsAuthorize = await userIsAuthorizeForClient(standardInput.Standard_Composant.clientId)
        if (!userIsAuthorize) {
            throw new Error("L'utilisateur n'est pas autorisé sur ce client.")
        }
        return standardInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}
import { prisma } from "@/lib/prisma";
import { userIsEditor, userIsValid } from "./security.query";
import { getMyClient } from "./user.query";

export const getStdComponentWithInput = async (componentId: string) => {
    try {
        const componentExist = await getStandardComponentById(componentId)
        if (!componentExist) throw new Error("Le composant n'existe pas.")
        const componentsWitchInput = await prisma.standard_Composant.findMany({
            where: {
                id: componentId
            },
            include: {
                Standard_Composant_Input: true
            }
        })
        return componentsWitchInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }
}


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
            },
            where: {
                standard_ComposantId: componentId
            }
        })

        return max
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des composants')
    }

}


export const getStandardComponentById = async (id: string) => {

    try {
        const componentExist = await prisma.standard_Composant.findUniqueOrThrow({
            where: {
                id: id
            }
        })
        return componentExist
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}

export const getStandardComponentClient = async (id: string) => {
    try {
        const componentExist = await getStandardComponentById(id)
        if (!componentExist) throw new Error("Le composant n'existe pas.")
        return componentExist.clientId
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }

}


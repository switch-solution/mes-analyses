import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
import { getStandardComponentById } from "./stdcomponent.query";
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

        return standardInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}

export const getIsCode = async (composantId: string) => {
    try {
        const componentExist = await getStandardComponentById(composantId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const isCode = await prisma.standard_Composant_Input.findFirst({
            where: {
                standard_ComposantId: composantId,
                isCode: true
            }
        })
        return isCode
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}
export const getIsLabel = async (composantId: string) => {
    try {
        const componentExist = await getStandardComponentById(composantId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const isLabel = await prisma.standard_Composant_Input.findFirst({
            where: {
                standard_ComposantId: composantId,
                isLabel: true
            }
        })
        return isLabel
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}

export const getIsDescription = async (composantId: string) => {
    try {
        const componentExist = await getStandardComponentById(composantId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const isDescription = await prisma.standard_Composant_Input.findFirst({
            where: {
                standard_ComposantId: composantId,
                isDescription: true
            }
        })
        return isDescription
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }
}


export const getStandardInputByComponentId = async (composantId: string) => {
    try {
        const componentExist = await getStandardComponentById(composantId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const componentInput = await prisma.standard_Composant_Input.findMany({
            where: {
                standard_ComposantId: composantId

            }
        })
        return componentInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des composants standards')
    }

}


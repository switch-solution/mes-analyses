import { prisma } from "@/lib/prisma";
import { getStandardComponentById } from "./software_component.query";
export const getValuesByComponentIdAndVersion = async (componentId: string, version: number) => {
    try {
        const componentExist = await getStandardComponentById(componentId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const values = await prisma.sandboxValues.findMany({
            where: {
                version: version,
                Standard_Composant_Input: {
                    standard_ComposantId: componentId,
                }
            }
        })
        return values
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des valeurs')
    }

}

export const getLastVersionValuesByComponentId = async (componentId: string) => {
    try {
        const componentExist = await getStandardComponentById(componentId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const values = await prisma.sandboxValues.findFirst({
            where: {
                composantId: componentId
            },
            orderBy: {
                version: 'desc'

            }
        })
        return values?.version
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des valeurs')
    }

}

export const getLastOrderInput = async (componentId: string) => {
    try {
        const componentExist = await getStandardComponentById(componentId)
        if (!componentExist) throw new Error('Le composant n\'existe pas')
        const lastOrder = await prisma.sandboxValues.findFirst({
            where: {
                composantId: componentId
            },
            orderBy: {
                version: 'desc'
            }
        })
        return lastOrder?.version
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du dernier ordre')
    }
}
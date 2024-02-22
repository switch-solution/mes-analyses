import { userIsValid } from "./security.query"
import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'

export const getStandardInput = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error('Utilisateur non connecté')
        const standardInput = await prisma.input.findMany()
        return standardInput
    } catch (err) {
        throw new Error('Erreur lors de la récupération des composants standards')
    }
}

export const getStandardInputById = async (id: string) => {
    try {
        const stdInput = await prisma.standard_Component_Input.findUniqueOrThrow({
            where: {
                id
            }

        })
        return stdInput
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération du composant standard')
    }

}

export type getStandardInputById = Prisma.PromiseReturnType<typeof getStandardInputById>;



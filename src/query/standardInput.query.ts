import { userIsValid } from "./security.query"
import { prisma } from "@/lib/prisma"
export const getStandardInput = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error('Utilisateur non connecté')
        const standardInput = await prisma.standard_Input.findMany()
        return standardInput
    } catch (err) {
        throw new Error('Erreur lors de la récupération des composants standards')
    }
}


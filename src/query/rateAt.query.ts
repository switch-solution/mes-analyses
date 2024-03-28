import { prisma } from '@/lib/prisma'

export const getRateAt = async () => {
    try {
        const rateAt = await prisma.rate_At.findMany()
        return rateAt
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des taux d'activité partielle")
    }
}
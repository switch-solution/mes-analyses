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

export const getRateAtById = async (id: string) => {
    try {
        const rateAt = await prisma.rate_At.findUnique({
            where: {
                id: id
            }

        })
        return rateAt
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération du taux d'activité partielle")
    }

}
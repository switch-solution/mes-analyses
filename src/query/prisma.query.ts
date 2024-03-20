import { prisma } from "@/lib/prisma";

export const getPrismaSeed = async () => {
    try {
        const seed = await prisma.prisma_Seed.findMany({
            orderBy: {
                order: 'desc'
            }
        })
        return seed

    } catch (err) {
        console.log(err)
        throw new Error("Impossible de récupérer les migrations")
    }

}

export const getLastSeedOrder = async () => {
    try {
        const seed = await prisma.prisma_Seed.findFirst({
            orderBy: {
                order: 'desc'
            }
        })
        return seed?.order
    } catch (err) {
        console.log(err)
        throw new Error("Impossible de récupérer la dernière migration")
    }

}
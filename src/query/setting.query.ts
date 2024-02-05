import { prisma } from "@/lib/prisma";

export const getLastPricing = async () => {
    try {
        const pricing = await prisma.setting.findFirstOrThrow({
            where: {
                code: 'PRICING',
                dateStart: {
                    lte: new Date()
                },
                dateEnd: {
                    gte: new Date()
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        const pricingNumber: number = isNaN(parseFloat(pricing.value)) ? 0 : parseFloat(pricing.value)

        return pricingNumber
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres de facturation.")
    }
}

export const getPricingAt = async (date: Date) => {
    try {
        const pricing = await prisma.setting.findFirstOrThrow({
            where: {
                code: 'PRICING',
                dateStart: {
                    lte: date
                },
                dateEnd: {
                    gte: date
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        const pricingNumber: number = isNaN(parseFloat(pricing.value)) ? 0 : parseFloat(pricing.value)

        return pricingNumber
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres de facturation.")
    }
}


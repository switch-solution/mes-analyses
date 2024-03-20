import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientBySlug } from "./client.query";
import { getSoftwareBySlug } from "./software.query";

export const getLastPricing = async () => {
    try {
        const pricing = await prisma.setting.findFirstOrThrow({
            where: {
                id: 'PRICING',
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
                id: 'PRICING',
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

export const getGroupbySettingId = async () => {
    try {
        const group = await prisma.setting.groupBy({
            by: ['id'],
            where: {
                system: false,
            },

        })

        return group

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres de facturation.")
    }
}

export type getGroupbySettingId = Prisma.PromiseReturnType<typeof getGroupbySettingId>;

export const getFirstSettingById = async (id: string) => {
    try {
        const setting = await prisma.setting.findFirst({
            where: {
                id: id
            }
        })
        return setting
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres.")
    }

}





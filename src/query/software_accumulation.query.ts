import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getAccumulationForSoftwareActive = async ({
    softwareLabel,
    clientId
}: {
    softwareLabel: string,
    clientId: string
}) => {
    try {

        const accumulation = await prisma.software_Accumulation.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId
            }
        })
        return accumulation
    } catch (err) {
        console.error(err)
    }

}

export const getAccumulationBySlug = async (slug: string) => {
    try {

        const accumulation = await prisma.software_Accumulation.findUnique({
            where: {
                slug: slug
            }
        })
        return accumulation
    } catch (err) {
        console.error(err)
    }

}

export type getAccumulationBySlug = Prisma.PromiseReturnType<typeof getAccumulationBySlug>;


export const getCountAllAccumulation = async () => {
    try {
        const count = await prisma.software_Accumulation.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des accumulations.")

    }

}

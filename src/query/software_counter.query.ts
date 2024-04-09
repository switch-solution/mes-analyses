import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getCounterForMyActiveSoftware = async ({
    clientId,
    softwareLabel
}: {
    clientId: string,
    softwareLabel: string
}) => {
    try {

        const counters = await prisma.software_Counter.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId
            }

        })

        return counters
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des compteurs.")
    }

}

export type getCounterForMyActiveSoftware = Prisma.PromiseReturnType<typeof getCounterForMyActiveSoftware>;

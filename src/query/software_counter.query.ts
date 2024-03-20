import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";

export const getCounterForMyActiveSoftware = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }

        const counters = await prisma.software_Counter.findMany({
            where: {
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }

        })

        return counters
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des compteurs.")
    }

}

export type getCounterForMyActiveSoftware = Prisma.PromiseReturnType<typeof getCounterForMyActiveSoftware>;

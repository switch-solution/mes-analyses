import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";

export const copyCounter = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error("Le logiciel n'existe pas.")
        const countersList = await prisma.counter.findMany()
        const counters = countersList.map((counter) => {
            return {
                ...counter,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId
            }
        })

        await prisma.software_Counter.createMany({
            data: counters
        })

        return
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la copie des compteurs.`)
    }

}
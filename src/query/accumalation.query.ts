import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { syncGenerateSlug } from "../helpers/generateSlug";
export const copyAccumulationToSoftware = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) {
            throw new Error("Le logiciel n'existe pas")
        }
        let count = await getCountAllAccumulations()
        const accumulationsList = await prisma.accumulation.findMany()
        const accumulations = accumulationsList.map((accumulation) => {
            count = count + 1
            return {
                ...accumulation,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId,
                slug: syncGenerateSlug(`Cumul-Paie-${count}-${accumulation.label}`)
            }
        })
        await prisma.software_Accumulation.createMany({
            data: accumulations
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error("Erreur de copie des cumuls de paie")
    }
}

export const getCountAllAccumulations = async () => {
    try {
        const count = await prisma.software_Accumulation.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Erreur de récupération des cumuls de paie")
    }

}

export const getAccumulations = async () => {
    try {
        const accumulations = await prisma.accumulation.findMany({
            orderBy: {
                id: "asc"
            }
        })
        return accumulations
    } catch (err) {
        console.error(err)
        throw new Error("Erreur de récupération des cumuls de paie")
    }

}
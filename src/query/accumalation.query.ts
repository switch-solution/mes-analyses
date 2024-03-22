import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { syncGenerateSlug } from "../helpers/generateSlug";


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
import { prisma } from "@/lib/prisma";
import { getClientActiveAndSoftwareActive } from "./security.query";




export const getStandardProcessusBySlug = async (slug: string) => {
    try {
        const processus = await prisma.processus.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return processus
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération du processus")
    }

}


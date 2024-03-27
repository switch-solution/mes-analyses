import { prisma } from "@/lib/prisma";
import { getClientActiveAndSoftwareActive } from "./security.query";

export const getAllProcessusForMyActiveClientAndSoftwareActive = async () => {
    try {
        const myEnvironnement = await getClientActiveAndSoftwareActive()
        if (!myEnvironnement) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
        const processus = await prisma.processus.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        const clientProcessus = await prisma.client_Processus.findMany({
            where: {
                clientId: myEnvironnement.clientId

            },
            orderBy: {
                id: 'asc'
            }
        })
        const softwareProcessus = await prisma.software_Processus.findMany({
            where: {
                clientId: myEnvironnement.clientId,
                softwareLabel: myEnvironnement.softwareLabel
            },
            orderBy: {
                id: 'asc'
            }
        })
        return [...processus, ...clientProcessus, ...softwareProcessus]
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des processus")

    }


}

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

export const getClientProcessusdBySlug = async (slug: string) => {
    try {
        const processus = await prisma.client_Processus.findUniqueOrThrow({
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

export const getSoftwareProcessusdBySlug = async (slug: string) => {
    try {
        const processus = await prisma.software_Processus.findUniqueOrThrow({
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
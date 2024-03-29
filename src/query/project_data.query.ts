import { prisma } from "@/lib/prisma";

export const getSocietyByProject = async ({
    projectLabel,
    softwareLabel,
    clientId
}:
    {
        projectLabel: string,
        softwareLabel: string,
        clientId: string
    }) => {
    try {
        const society = await prisma.project_Society.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return society
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }
}

export const getRateAtByProject = async ({
    projectLabel,
    softwareLabel,
    clientId
}:
    {
        projectLabel: string,
        softwareLabel: string,
        clientId: string
    }) => {
    try {
        const rateAt = await prisma.project_Rate_AT.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return rateAt
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }

}

export const getEstablishmentByProject = async ({
    projectLabel,
    softwareLabel,
    clientId
}:
    {
        projectLabel: string,
        softwareLabel: string,
        clientId: string
    }) => {
    try {
        const society = await prisma.project_Establishment.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return society
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }


}


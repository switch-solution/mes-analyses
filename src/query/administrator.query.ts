import { prisma } from "@/lib/prisma";

export const getLogs = async () => {
    try {
        const logs = await prisma.logger.findMany({
            orderBy: [
                {
                    createdAt: "desc"
                },
                {
                    level: "asc"
                }
            ]
        })
        return logs
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des alertes.")
    }

}

export const getCountAlertSecurityActive = async () => {
    try {
        const alerts = await prisma.logger.count({
            where: {
                level: "security",
                isArchived: false
            }
        })
        return alerts
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des alertes.")
    }
}

export const getAlertSecurityActive = async () => {
    try {
        const alerts = await prisma.logger.findMany({
            where: {
                level: "security",
                isArchived: false
            }
        })
        return alerts
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des alertes.")
    }
}


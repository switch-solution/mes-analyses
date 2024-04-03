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

export const getDsnDataByProject = async ({
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
        const dsnData = await prisma.project_DSN.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            },
            include: {
                Project_DSN_Data: true
            }
        })
        return dsnData
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }
}

export const getClassificationByProject = async ({
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
        const classification = await prisma.project_Classification.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return classification
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }
}


export const getProgressByProject = async ({
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
        const progress = await prisma.project_Processus_Order.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            },
            include: {
                Project_Processus: true
            }
        })
        return progress
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")

    }
}

export const getOpsByProject = async ({
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
        const ops = await prisma.project_OPS.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return ops
    } catch (err) {
        console.error(err)
        throw new Error("Erreur interne")
    }

}

export const getIdccByProject = async ({
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
        const idcc = await prisma.project_Idcc.findMany({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        return idcc
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


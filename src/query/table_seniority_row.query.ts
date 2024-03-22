import { prisma } from "@/lib/prisma"

export const getTableClientSeniorityRowsByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.client_Table_Seniority.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Client_Table_Seniority_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

export const getTableSoftwareSeniorityRowsByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.software_Table_Seniority.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Software_Table_Seniority_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

export const getTableStandardRowsSeniorityByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.table_Seniority.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Table_Seniority_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

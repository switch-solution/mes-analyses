import { prisma } from "@/lib/prisma"

export const getTableClientRowsByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.client_Table_Age.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Client_Table_Age_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

export const getTableSoftwareRowsByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.software_Table_Age.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Software_Table_Age_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

export const getTableStandardRowsByIdccAndSlug = async (idcc: string, slug: string) => {
    try {
        return await prisma.table_Age.findMany({
            where: {
                idcc,
                slug
            },
            include: {
                Table_Age_Row: true
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

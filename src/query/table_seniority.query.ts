import { prisma } from "@/lib/prisma"

export const getTableSeniorityByLevelAndIdccAndSlug = async (level: 'logiciel' | 'client' | 'standard', idcc: string, slug: string) => {
    try {
        switch (level) {
            case 'client':
                return await prisma.client_Table_Seniority.findFirstOrThrow({
                    where: {
                        idcc,
                        slug
                    }
                })
                break
            case 'logiciel':
                return await prisma.software_Table_Seniority.findFirstOrThrow({
                    where: {
                        idcc,
                        slug
                    }
                })
                break
            case 'standard':
                return await prisma.table_Seniority.findFirstOrThrow({
                    where: {
                        idcc,
                        slug
                    }
                })
                break

        }
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge")
    }

}

export const getClientTableSeniorityByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.client_Table_Seniority.findFirstOrThrow({
            where: {
                idcc,
                slug
            }

        })
        return tableExist
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge client")
    }
}

export const getSoftwareTableSeniorityByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.software_Table_Seniority.findFirstOrThrow({
            where: {
                idcc,
                slug
            }

        })
        return tableExist
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge client")
    }

}

export const getStandardTableSeniorityByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.table_Seniority.findFirstOrThrow({
            where: {
                idcc,
                slug
            }

        })
        return tableExist
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de la table d'âge client")
    }

}
import { prisma } from "@/lib/prisma"

export const getTableAgeByLevelAndIdccAndSlug = async (level: 'logiciel' | 'client' | 'standard', idcc: string, slug: string) => {
    try {
        switch (level) {
            case 'client':
                return await prisma.client_Table_Age.findFirstOrThrow({
                    where: {
                        idcc,
                        slug
                    }
                })
                break
            case 'logiciel':
                return await prisma.software_Table_Age.findFirstOrThrow({
                    where: {
                        idcc,
                        slug
                    }
                })
                break
            case 'standard':
                return await prisma.table_Age.findFirstOrThrow({
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

export const getClientTableAgeByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.client_Table_Age.findFirstOrThrow({
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

export const getSoftwareTableAgeByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.software_Table_Age.findFirstOrThrow({
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

export const getStandardTableAgeByIdcc = async (idcc: string, slug: string) => {
    try {
        const tableExist = await prisma.table_Age.findFirstOrThrow({
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
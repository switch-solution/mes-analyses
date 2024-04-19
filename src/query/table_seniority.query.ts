import { prisma } from "@/lib/prisma"



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
import { prisma } from "@/lib/prisma"



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

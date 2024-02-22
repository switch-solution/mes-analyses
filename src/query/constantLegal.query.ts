import { prisma } from "@/lib/prisma";

export const getConstantLegal = async () => {
    try {
        const constantLegal = await prisma.constant_Legal.findMany({
            orderBy: [
                {
                    id: 'asc'
                },
                {
                    dateStart: 'asc'
                }
            ]
        })



        return constantLegal
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")

    }
}

export const getConstantBySlug = async (slug: string) => {
    try {
        const constant = await prisma.constant_Legal.findFirst({
            where: {
                slug
            }
        })
        return constant
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")
    }

}
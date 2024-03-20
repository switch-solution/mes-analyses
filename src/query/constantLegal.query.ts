import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
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

export type getConstantBySlug = Prisma.PromiseReturnType<typeof getConstantBySlug>;

export const getConstantById = async (id: string) => {
    try {
        const constant = await prisma.constant_Legal.findFirst({
            where: {
                id
            }
        })
        return constant
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")
    }

}


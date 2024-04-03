import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getDsnAbsence = async () => {
    try {
        const dsn = await prisma.dsn_Absence.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des absences.")
    }
}

export type getDsnAbsence = Prisma.PromiseReturnType<typeof getDsnAbsence>;

export const getDsnStructure = async () => {
    try {
        const dsn = await prisma.dsn_Structure.findMany()
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des structures.")
    }
}

export type getDsnStructure = Prisma.PromiseReturnType<typeof getDsnStructure>;

export const getDsnOps = async () => {
    try {
        const ops = await prisma.dsn_OPS.findMany()
        return ops
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des ops.")
    }

}



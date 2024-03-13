import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getInputs = async () => {
    try {
        const inputs = await prisma.input.findMany()
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des inputs")
    }
}
export type getInputs = Prisma.PromiseReturnType<typeof getInputs>;

export const getDsnInputs = async () => {
    try {
        const inputs = await prisma.input.findMany({
            where: {
                isDsn: true,
                isOtherData: false
            }
        })
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des inputs")
    }

}
export type getDsnInputs = Prisma.PromiseReturnType<typeof getDsnInputs>;

export const getOtherInputs = async () => {

    try {
        const inputs = await prisma.input.findMany({
            where: {
                isOtherData: true,
                isDsn: false
            }
        })
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des inputs")
    }
}

export type getOtherInputs = Prisma.PromiseReturnType<typeof getOtherInputs>;


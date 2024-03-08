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

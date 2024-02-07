import { prisma } from "@/lib/prisma";

export const getIdccByCode = async (code: string) => {
    try {
        const idcc = await prisma.idcc.findFirstOrThrow({
            where: {
                code: code
            }
        })
        return idcc
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de l'IDCC")
    }

}

export const getIdcc = async () => {
    try {
        const idcc = await prisma.idcc.findMany()
        return idcc
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de l'IDCC")
    }
}
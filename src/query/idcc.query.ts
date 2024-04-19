import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

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

export type getIdcc = Prisma.PromiseReturnType<typeof getIdcc>;

export const getCountElementByIdcc = async (idcc: string) => {
    try {

    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des éléments")
    }



}

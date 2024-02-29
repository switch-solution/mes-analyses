import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
export const getMyAlert = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const alert = await prisma.alert.findMany({
            where: {
                userId: userId
            }
        })
        return alert
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des alertes.")
    }


}

export const countMyAlert = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const alert = await prisma.alert.count({
            where: {
                userId: userId
            }
        })
        return alert
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des alertes.")
    }


}

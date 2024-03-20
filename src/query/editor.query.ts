import { prisma } from "@/lib/prisma"
import { userIsValid } from "@/src/query/security.query";


export const getMyBookEditable = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const bookEditableForUser = await prisma.userSoftware.findMany({
            where: {
                userId: userId,
                isEditor: true
            },
            include: {
                software: {
                    include: {
                        Software_Book: true
                    }

                }
            }

        })

        return bookEditableForUser
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Book")
    }
}





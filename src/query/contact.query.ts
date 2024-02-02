import { prisma } from "@/lib/prisma";
import { userIsValid, userIsAdminClient } from "@/src/query/security.query";
export const getContactById = async (contactId: string) => {

    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
        const contact = await prisma.contact.findUniqueOrThrow({
            where: {
                id: contactId
            }
        })
        const clientId = contact.clientId
        const userIsAuthorized = await userIsAdminClient(clientId)
        if (!userIsAuthorized) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
        return contact
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération du contact.")
    }

}
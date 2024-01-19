import { prisma } from "@/lib/prisma";

export const userIsAdminClient = async (userId: string, clientId: string) => {

    try {
        if (!userId || !clientId) {
            throw new Error("Le client id et l'utilisateur id sont obligatoires.")
        }
        const idClient = await prisma.client.findUnique({
            where: {
                id: clientId
            }
        })
        if (!idClient) {
            throw new Error("Le client n'existe pas.")
        }
        const isAdmin = await prisma.userClient.findFirst({
            where: {
                userId: userId,
                clientId: clientId,
                isAdministrator: true
            }
        })
        if (!isAdmin) {
            throw new Error("L'utilisateur n'est pas administrateur du client.")
        }
        return true
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors des données de la table UserClient")
    }

}
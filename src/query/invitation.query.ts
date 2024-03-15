import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";

export const getInvitation = async (email: string) => {
    try {
        const invitation = await prisma.invitation.findFirst({
            where: {
                email: email
            }
        })
        return invitation
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'invitation.")
    }

}

export const getInvitationByClientSlug = async (clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        if (!clientExist) {
            throw new Error("Ce client n'existe pas.")
        }
        const invitations = await prisma.invitation.findMany({
            where: {
                clientId: clientExist.siren
            }
        })
        return invitations
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des invitations.")
    }
}
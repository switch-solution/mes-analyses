import { prisma } from "@/lib/prisma";

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
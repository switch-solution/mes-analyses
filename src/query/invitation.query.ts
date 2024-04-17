import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'

export const getInvitation = async (email: string) => {
    try {
        const invitation = await prisma.invitation.findFirst({
            where: {
                email: email,
                isArchived: false
            }
        })
        return invitation
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'invitation.")
    }

}
export type getInvitation = Prisma.PromiseReturnType<typeof getInvitation>;

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

export const copyInvitation = async (invitation: getInvitation, userId: string) => {
    if (!invitation?.email || !invitation.firstname || !invitation.lastname || !invitation.clientId) {
        throw new Error("Cette invitation n'existe pas.")
    }
    try {
        await prisma.userOtherData.upsert({
            where: {
                userId: userId
            },
            update: {
                firstname: invitation.firstname,
                lastname: invitation.lastname,
                isSetup: true,
                isInternal: invitation.isInternal,
                isBlocked: false,
            },
            create: {
                userId: userId,
                firstname: invitation?.firstname,
                lastname: invitation?.lastname,
                isSetup: true,
                isInternal: invitation?.isInternal,
                isBlocked: false,

            }
        })
        if (invitation?.clientId) {
            await prisma.userClient.upsert({
                where: {
                    userId_clientId: {
                        clientId: invitation.clientId,
                        userId: userId
                    }
                },
                update: {
                    userId: userId,
                    clientId: invitation.clientId,
                    isBlocked: false,
                    isBillable: invitation.isBillable,
                    isActivated: true,
                },
                create: {
                    userId: userId,
                    clientId: invitation.clientId,
                    defaultRole: "collaborateur",
                    isBlocked: false,
                    isBillable: invitation.isBillable,
                    isActivated: true,
                }

            })
        }
        if (invitation?.softwareLabel) {
            await prisma.userSoftware.upsert({
                where: {
                    userId_softwareLabel_softwareClientId: {
                        userId: userId,
                        softwareLabel: invitation.softwareLabel,
                        softwareClientId: invitation.clientId

                    }
                },
                update: {
                    userId: userId,
                    softwareLabel: invitation.softwareLabel,
                    softwareClientId: invitation.clientId,
                    isActivated: true,
                },
                create: {
                    userId: userId,
                    softwareLabel: invitation.softwareLabel,
                    softwareClientId: invitation.clientId,
                    isActivated: true,
                }
            })
        }
        if (invitation?.projectLabel) {
            await prisma.userProject.upsert({
                where: {
                    userId_projectClientId_projectLabel_projectSoftwareLabel: {
                        userId: userId,
                        projectLabel: invitation.projectLabel,
                        projectClientId: invitation.clientId,
                        projectSoftwareLabel: invitation.softwareLabel
                    }
                },
                update: {
                    userId: userId,
                    projectLabel: invitation.projectLabel,
                    projectClientId: invitation.clientId,
                    projectSoftwareLabel: invitation.softwareLabel,

                },
                create: {
                    userId: userId,
                    projectLabel: invitation.projectLabel,
                    projectSoftwareLabel: invitation.softwareLabel,
                    projectClientId: invitation.clientId,
                    createdBy: userId,
                }
            })
        }
        await prisma.invitation.update({
            where: {
                email: invitation.email,
                clientId: invitation.clientId
            },
            data: {
                isArchived: true
            }
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie de l'invitation.")
    }

}
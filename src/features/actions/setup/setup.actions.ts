"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SetupProfilSchema, SetupClientSchema, SetupLegalSchema, SetupSoftwareSchema } from "@/src/helpers/definition";
import type { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import z from "zod";
import { getMyClient, getUserById } from "@/src/query/user.query";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getClientBySiren } from "@/src/query/client.query";
import { authentifcationAction, ActionError, action } from "@/lib/safe-actions";
import { copyInvitation, getInvitation } from "@/src/query/invitation.query";
import { userSetup } from "@/src/query/user.query";
export const createSetupLegal = action(SetupLegalSchema, async (values: z.infer<typeof SetupLegalSchema>, userId) => {
    if (!userId) throw new ActionError("Vous devez être connecté pour accéder à cette page.")
    const email = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    if (!email) throw new ActionError("L'utilisateur n'existe pas.")
    console.log(email.email)
    const invitation = await getInvitation(email.email)
    try {
        if (!userId) throw new ActionError("Vous devez être connecté pour accéder à cette page.")
        const { cgv, gdpr } = SetupLegalSchema.parse(values)
        await prisma.userOtherData.upsert({
            where: {
                userId: userId
            },
            update: {
                userId: userId,
                isBlocked: false,
                cgv: cgv,
                gdpr: gdpr
            },
            create: {
                userId: userId,
                isBlocked: false,
                cgv: cgv,
                gdpr: gdpr
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    if (invitation) {
        await copyInvitation(invitation, userId)
        revalidatePath(`/home`)
        redirect(`/home`)
    } else {
        revalidatePath(`/setup/profil/`)
        redirect(`/setup/profil/`)
    }


})
export const createSetupProfil = authentifcationAction(SetupProfilSchema, async (values: z.infer<typeof SetupProfilSchema>, userId) => {
    try {

        const client = await getMyClient()
        if (client?.length !== 0) {
            throw new ActionError("Vous avez déjà une configuration.")
        }
        const { firstname, lastname, civility } = SetupProfilSchema.parse(values)
        await prisma.userOtherData.update({
            where: {
                userId: userId
            },
            data: {
                firstname: firstname,
                lastname: lastname,
                civility: civility,
                isBlocked: false,
                userId: userId,
            }
        })
        const Log: Logger = {
            level: "warning",
            message: `Création de l'utilisateur`,
            scope: "client",
        }
        await createLog(Log)
    } catch (err) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création de la configuration du profil.")
    }

    revalidatePath(`/setup/client/`)
    redirect(`/setup/client/`)

})

export const createSetupSoftware = authentifcationAction(SetupSoftwareSchema, async (values: z.infer<typeof SetupSoftwareSchema>, userId) => {

    const clientId = await prisma.userClient.findFirst({
        where: {
            userId: userId
        },
    })
    if (!clientId) throw new ActionError("Vous n'avez pas de client.")
    const { label } = SetupSoftwareSchema.parse(values)
    const clientSlug = await prisma.client.findUnique({
        where: {
            siren: clientId.clientId
        }
    })
    if (!clientSlug) throw new ActionError("Le client n'existe pas.")
    try {
        const slug = await generateSlug(`${clientSlug.slug}-${label}`)
        const softwareSlugExist = await prisma.software.findFirst({
            where: {
                slug: slug
            }
        })
        if (softwareSlugExist) throw new ActionError("Le logiciel existe déjà.")
        await prisma.software.create({
            data: {
                label,
                createdBy: userId,
                slug,
                updatedAt: new Date(),
                clientId: clientId.clientId,
            }
        })
        await prisma.userSoftware.create({
            data: {
                userId: userId,
                softwareLabel: label,
                isEditor: true,
                createdBy: userId,
                softwareClientId: clientId.clientId,
                isActivated: true,
            }
        })
        const software = await prisma.software.findFirst({
            where: {
                label: label,
                clientId: clientId.clientId
            }
        })
        if (!software) throw new ActionError("Le logiciel n'a pas été créé.")
        //Setup user
        await userSetup(userId)
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug.slug}`)
    redirect(`/client/${clientSlug.slug}`)
})

export const createSetupClient = authentifcationAction(SetupClientSchema, async (values: z.infer<typeof SetupClientSchema>, userId) => {

    const { socialReason, siren } = SetupClientSchema.parse(values)
    const slug = await generateSlug(socialReason)
    const clientSlugExist = await prisma.client.findUnique({
        where: {
            slug: slug
        }

    })
    if (clientSlugExist) {
        const log: Logger = {
            level: "error",
            message: `Le slug ${slug} est déjà utilisé.`,
            scope: "client",
        }
        await createLog(log)
        throw new ActionError("Ce nom de client existe déjà.")
    }
    const sirenExist = await getClientBySiren(siren)
    if (sirenExist) {
        const log: Logger = {
            level: "error",
            message: `Le siren ${siren} est déjà utilisé.`,
            scope: "client",
        }
        await createLog(log)
        throw new ActionError("Ce siren est déjà utilisé.")
    }

    try {
        const currentDate = new Date();
        const add90Days = new Date(currentDate.setDate(currentDate.getDate() + 90))
        if (!sirenExist) {
            await prisma.client.create({
                data: {
                    socialReason: socialReason,
                    siren: siren,
                    slug: slug,
                    createdBy: userId,
                    isBlocked: false,
                    dateStartTrial: new Date(),
                    dateEndTrial: add90Days,
                    UserClient: {
                        create: {
                            userId: userId,
                            isBillable: true,
                            isAdministrator: true,
                            isActivated: true,
                            isBlocked: false,
                            isEditor: true,

                        }
                    }
                }
            })
        }

        const Log: Logger = {
            level: "warning",
            message: `Création de l'utilisateur`,
            scope: "client",
        }
        await createLog(Log)
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/setup/software/`)
    redirect(`/setup/software/`)


})
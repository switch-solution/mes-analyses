"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SetupProfilSchema, SetupClientSchema, SetupLegalSchema, SetupSoftwareSchema } from "@/src/helpers/definition";
import type { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";
import { User } from "@/src/classes/user";
import { authentifcationAction, ActionError, action } from "@/lib/safe-actions";
import { copyInvitation, getInvitation } from "@/src/query/invitation.query";
import { Client } from "@/src/classes/client";
import { Software } from "@/src/classes/software";
export const createSetupLegal = action(SetupLegalSchema, async (values: z.infer<typeof SetupLegalSchema>, userId) => {
    if (!userId) throw new ActionError("Vous devez être connecté pour accéder à cette page.")
    const email = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    if (!email) throw new ActionError("L'utilisateur n'existe pas.")
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
        revalidatePath(`/setup/profile/`)
        redirect(`/setup/profile/`)
    }


})
export const createSetupProfil = authentifcationAction(SetupProfilSchema, async (values: z.infer<typeof SetupProfilSchema>, userId) => {
    try {
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

    const user = new User(userId)
    const { clientId, clientSlug } = await user.getMyClientActive()
    if (!clientId) throw new ActionError("Vous n'avez pas de client.")
    const { label } = SetupSoftwareSchema.parse(values)
    if (!clientSlug) throw new ActionError("Le client n'existe pas.")
    const software = new Software('')
    const softwareExist = await software.softwareLabelExistForThisClient(label, clientId)
    if (softwareExist) throw new ActionError("Le logiciel existe déjà.")
    try {
        const soft = await software.create({
            clientId,
            label,
            userId
        })
        if (!soft) {
            throw new ActionError("Une erreur est survenue lors de la création du logiciel.")
        }
        await prisma.userOtherData.update({
            where: {
                userId: userId
            },
            data: {
                isSetup: false
            }
        })
        await prisma.userOtherData.update({
            where: {
                userId: userId
            },
            data: {
                isSetup: true
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/home`)
    revalidatePath(`/home`)

})

export const createSetupClient = authentifcationAction(SetupClientSchema, async (values: z.infer<typeof SetupClientSchema>, userId) => {

    const { socialReason, siren, defaultRole } = SetupClientSchema.parse(values)
    const client = new Client('')
    const slug = generateSlug(socialReason)
    const clientExist = await client.sirenExist(siren)
    if (clientExist) {
        const log: Logger = {
            level: "error",
            message: `Le siren est déjà utilisé.`,
            scope: "client",
        }
        await createLog(log)
        throw new ActionError("Ce siren existe déjà.")
    }
    const socialaReasonExist = await client.socialReasonExist(socialReason)
    if (socialaReasonExist) {
        throw new ActionError("La raison sociale existe déjà.")
    }
    try {
        await client.create({
            socialReason,
            siren,
            userId,
            defaultRole,
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/setup/software/`)
    redirect(`/setup/software/`)


})
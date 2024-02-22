"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SetupProfilSchema, SetupClientSchema, SetupLegalSchema, SetupSoftwareSchema } from "@/src/helpers/definition";
import type { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import z from "zod";
import { getMyClient } from "@/src/query/user.query";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getClientBySiren } from "@/src/query/client.query";
import { authentifcationAction, ActionError, action } from "@/lib/safe-actions";

export const createSetupLegal = action(SetupLegalSchema, async (values: z.infer<typeof SetupLegalSchema>, userId) => {
    try {
        if (!userId) throw new ActionError("Vous devez être connecté pour accéder à cette page.")
        const { cgv, gdpr } = SetupLegalSchema.parse(values)
        if (cgv === false) throw new ActionError("Vous devez accepter les CGV.")
        if (gdpr === false) throw new ActionError("Vous devez accepter le RGPD.")
        await prisma.userOtherData.create({
            data: {
                userId: userId,
                isBlocked: false,
                cgv: cgv,
                gdpr: gdpr
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création des CGV.")

    }
    revalidatePath(`/setup/profil/`)
    redirect(`/setup/profil/`)

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
        throw new Error("Une erreur est survenue lors de la création de la configuration du profil.")
    }

    const client = await getMyClient()

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

    try {
        const slug = await generateSlug(label)
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
                softwareClientId: clientId.clientId
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de la configuration du logiciel.")
    }
    const clientSlug = await prisma.client.findFirstOrThrow({
        where: {
            siren: clientId.clientId
        }
    })
    revalidatePath(`/client/${clientSlug.slug}`)
    redirect(`/client/${clientSlug.slug}`)
})

export const createSetupClient = authentifcationAction(SetupClientSchema, async (values: z.infer<typeof SetupClientSchema>, userId) => {

    const client = await getMyClient()
    if (client?.length !== 0) {
        throw new Error("Vous avez déjà une configuration.")
    }
    const { socialReason, siren } = SetupClientSchema.parse(values)
    const slug = await generateSlug(socialReason)
    const sirenExist = await getClientBySiren(siren)
    if (sirenExist) throw new ActionError("Ce siren est déjà utilisé.")
    try {
        const currentDate = new Date();

        const add90Days = new Date(currentDate.setDate(currentDate.getDate() + 90))

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
        const Log: Logger = {
            level: "warning",
            message: `Création de l'utilisateur`,
            scope: "client",
        }
        await createLog(Log)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de la configuration du client.")
    }
    revalidatePath(`/setup/software/`)
    redirect(`/setup/software/`)


})
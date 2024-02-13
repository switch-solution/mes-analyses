"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SetupSchema } from "@/src/helpers/definition";
import type { Event } from "@/src/helpers/type";
import { createEvent } from "@/src/query/logger.query";
import z from "zod";
import { userIsValid } from "@/src/query/security.query";
import { getMyClient } from "@/src/query/user.query";
export const createSetup = async (values: z.infer<typeof SetupSchema>) => {
    try {
        const userId = await userIsValid()
        if (!userId) throw new Error("Vous n'êtes pas autorisé à effectuer cette action.")
        const client = await getMyClient()
        if (client?.length !== 0) {
            throw new Error("Vous avez déjà une configuration.")
        }
        const { firstname, lastname, siren, civility, socialReason } = SetupSchema.parse(values)
        await prisma.userOtherData.upsert({
            where: {
                userId: userId
            },
            update: {
                firstname: firstname,
                lastname: lastname,
                civility: civility,
                isBlocked: false,
                userId: userId,
            },
            create: {
                firstname: firstname,
                lastname: lastname,
                civility: civility,
                isBlocked: false,
                userId: userId,
            }
        })
        const clientId = await prisma.client.create({
            data: {
                siren: siren,
                socialReason: socialReason,
                createdBy: userId,
                isBlocked: false,
                dateStartTrial: new Date(),
                dateEndTrial: new Date(new Date().setDate(new Date().getDate() + 90)),
            }

        })
        await prisma.userClient.create({
            data: {
                userId: userId,
                clientId: clientId.id,
                isBillable: true,
                isBlocked: false,
                isAdministrator: true,
                isEditor: true,
                isActivated: true,
            }

        })
        const event: Event = {
            level: "warning",
            message: `Création du client ${clientId.socialReason}`,
            scope: "client",
            clientId: clientId.id,
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de la configuration.")
    }


    revalidatePath("/home/")
    redirect("/home/")

}
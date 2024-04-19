"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { authentifcationAction, ActionError } from "@/lib/safe-actions";
import { EnvironnementUserEditClientSchema, EnvironnementUserEditSoftwareSchema } from "@/src/helpers/definition";
import { Client } from "@/src/classes/client";
import { Software } from "@/src/classes/software";
export const editEnvironnementUserClient = authentifcationAction(EnvironnementUserEditClientSchema, async (values: z.infer<typeof EnvironnementUserEditClientSchema>, userId) => {
    const { clientSlug } = EnvironnementUserEditClientSchema.parse(values);
    const client = new Client(clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        const log: Logger = {
            scope: "user",
            message: `Le client ${clientSlug} n'existe pas.`,
            level: "error",
        }
        await createLog(log);
        throw new ActionError("Ce client n'existe pas.");
    }

    try {

        await prisma.userClient.updateMany({
            where: {
                userId: userId,
            },
            data: {
                isActivated: false
            }
        })
        await prisma.userClient.update({
            where: {
                userId_clientId: {
                    userId: userId,
                    clientId: clientExist.siren
                }

            },
            data: {
                isActivated: true
            }
        })

    } catch (err) {
        console.error(err);
        throw new Error("Une erreur est survenue lors de la modification de l'environnement utilisateur.");
    }

    revalidatePath(`/profile/default`);
    redirect(`/profile/default`);
})


export const editEnvironnementUserSoftware = authentifcationAction(EnvironnementUserEditSoftwareSchema, async (values: z.infer<typeof EnvironnementUserEditSoftwareSchema>, userId) => {
    const { softwareSlug } = EnvironnementUserEditSoftwareSchema.parse(values);
    const software = new Software(softwareSlug);
    const softwareExist = await software.softwareExist();
    if (!softwareExist) {
        const log: Logger = {
            scope: "user",
            message: `Le logiciel ${softwareExist} n'existe pas.`,
            level: "error",
        }
        await createLog(log);
        throw new ActionError("Ce client n'existe pas.");
    }

    try {
        await prisma.userSoftware.updateMany({
            where: {
                userId: userId,
            },
            data: {
                isActivated: false
            }
        })

        await prisma.userSoftware.update({
            where: {
                userId_softwareLabel_softwareClientId: {
                    userId: userId,
                    softwareLabel: softwareExist.label,
                    softwareClientId: softwareExist.clientId
                }

            },
            data: {
                isActivated: true
            }
        })



    } catch (err) {
        console.error(err);
        throw new Error("Une erreur est survenue lors de la modification de l'environnement utilisateur.");
    }

    revalidatePath(`/profile/default`);
    redirect(`/profile/default`);
})
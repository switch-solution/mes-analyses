"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { authentifcationAction, ActionError } from "@/lib/safe-actions";
import { EnvironnementUserEditSchema } from "@/src/helpers/definition";
import { Client } from "@/src/classes/client";
import { Software } from "@/src/classes/software";
export const editEnvironnementUser = authentifcationAction(EnvironnementUserEditSchema, async (values: z.infer<typeof EnvironnementUserEditSchema>, userId) => {
    const { clientSlug, softwareSlug } = EnvironnementUserEditSchema.parse(values);
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
    const software = new Software(softwareSlug);
    const softwareExist = await software.softwareExist();
    if (!softwareExist) {
        const log: Logger = {
            scope: "user",
            message: `Le logiciel ${softwareSlug} n'existe pas.`,
            level: "error",
        }
        await createLog(log);
        throw new ActionError("Ce logiciel n'existe pas.");
    }
    if (clientExist.siren !== softwareExist.clientId) {
        throw new ActionError("Le logiciel n'existe pas sur ce client.");
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
                    softwareClientId: clientExist.siren
                }

            },
            data: {
                isActivated: true
            }
        })
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

    revalidatePath(`/home`);
    redirect(`/home`);
})
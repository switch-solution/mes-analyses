"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { authentifcationAction, ActionError } from "@/lib/safe-actions";
import { EnvironnementUserEditSchema } from "@/src/helpers/definition";
import { getClientBySlug } from "@/src/query/client.query";
import { getSoftwareBySlug } from "@/src/query/software.query";

export const editEnvironnementUser = authentifcationAction(EnvironnementUserEditSchema, async (values: z.infer<typeof EnvironnementUserEditSchema>, userId) => {
    const { clientSlug, softwareSlug } = EnvironnementUserEditSchema.parse(values);
    const clientExist = await getClientBySlug(clientSlug);
    if (!clientExist) {
        const log: Logger = {
            scope: "user",
            message: `Le client ${clientSlug} n'existe pas.`,
            level: "error",
        }
        await createLog(log);
        throw new ActionError("Ce client n'existe pas.");
    }
    const softwareExist = await getSoftwareBySlug(softwareSlug);
    if (!softwareExist) {
        const log: Logger = {
            scope: "user",
            message: `Le logiciel ${softwareSlug} n'existe pas.`,
            level: "error",
        }
        await createLog(log);
        throw new ActionError("Ce logiciel n'existe pas.");
    }
    const SoftwareAndClientIsCompatible = await prisma.client.findFirst({
        where: {
            siren: clientExist.siren,
        },
        include: {
            Software: {
                where: {
                    label: softwareExist.label
                }
            }
        }
    })

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
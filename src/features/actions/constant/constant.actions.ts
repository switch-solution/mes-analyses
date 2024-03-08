"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwareConstantCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import z, { date } from "zod";
import { getClientBySlug } from "@/src/query/client.query";

export const createConstant = authentificationActionUserIsEditorClient(SoftwareConstantCreateSchema, async (values: z.infer<typeof SoftwareConstantCreateSchema>, { clientId, userId }) => {
    const { label, description, level, dateEnd, dateStart, value, idccCode, softwareLabel, clientSlug, id } = SoftwareConstantCreateSchema.parse(values)
    const clientExist = await getClientBySlug(clientSlug)
    if (!clientExist) {

        const log: Logger = {
            level: "error",
            message: `Tentative de création d'une constante pour un client inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce client n'existe pas.")
    }

    try {
        await prisma.constant_Legal.create({
            data: {
                label,
                level,
                dateEnd,
                description,
                dateStart,
                idccCode,
                softwareLabel,
                id: `LOG_${id}`,
                slug: `${softwareLabel}-LOG_${id}`,
                value,
                createdBy: userId,
                clientId
            }
        })
    } catch (err) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'une constante`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Erreur lors de la création de la constante.")
    }


    revalidatePath(`/client/${clientSlug}/editor/constant/`)
    redirect(`/client/${clientSlug}/editor/constant/`)


})
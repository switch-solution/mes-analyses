"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { StandardTaskCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { getSoftwareBySlug } from "@/src/query/software.query";
export const createSoftwareTask = authentificationActionUserIsEditorClient(StandardTaskCreateSchema, async (values: z.infer<typeof StandardTaskCreateSchema>, { clientId, userId }) => {
    const { accept, label, description, multiple, clientSlug, softwareSlug, isObligatory } = StandardTaskCreateSchema.parse(values)
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) {
        throw new ActionError("Ce logiciel n'existe pas.")
    }
    const countParam = await prisma.software_Task.count()
    try {
        await prisma.software_Task.create({
            data: {
                label,
                accept,
                description,
                clientId,
                multiple,
                createdBy: userId,
                isObligatory,
                softwareLabel: softwareExist.label,
                slug: `TACHE_${countParam + 1}_${label}`
            }

        })
    } catch (err) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'un paramètre`,
            scope: "software",
        }
        await createLog(log)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/task/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/task/`)
})

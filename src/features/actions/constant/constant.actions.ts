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
import { getSoftwareConstantBySlug } from "@/src/query/software.query";
export const createConstant = authentificationActionUserIsEditorClient(SoftwareConstantCreateSchema, async (values: z.infer<typeof SoftwareConstantCreateSchema>, { clientId, userId }) => {
    const { label, description, dateStart, value, idccCode, softwareLabel, clientSlug, id } = SoftwareConstantCreateSchema.parse(values)
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
        const slug = await generateSlug(`${clientSlug}-${softwareLabel}-${idccCode}-${id}-${dateStart.toLocaleDateString()}`)

        const constantExist = await getSoftwareConstantBySlug(slug)
        if (constantExist) {
            throw new ActionError("Cette constante existe déjà.")
        }
        await prisma.software_Constant.create({
            data: {
                label,
                description,
                dateStart,
                idccCode,
                softwareLabel,
                id,
                slug,
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
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ClassificationCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getIdccByCode } from "@/src/query/idcc.query";
import { generateSlug } from "@/src/helpers/generateSlug";
export const createClassification = authentificationActionUserIsEditorClient(ClassificationCreateSchema, async (values: z.infer<typeof ClassificationCreateSchema>, { userId, softwareLabel, clientSlug, clientId, softwareSlug }) => {
    const { type, label, id, level, idcc } = await ClassificationCreateSchema.parseAsync(values)
    const idccExist = await getIdccByCode(idcc)
    if (!idccExist) {
        throw new ActionError("L'IDCC n'existe pas.")
    }
    try {
        if (level === "client") {
            const classificationExist = await prisma.client_Classification.findFirst({
                where: {
                    clientId: clientId,
                    idIdcc: idccExist.code,
                    type: type,
                    id: id
                }
            })
            if (classificationExist) {
                throw new ActionError("La classification existe déjà.")
            }
            const count = await prisma.client_Classification.count()
            await prisma.client_Classification.create({
                data: {
                    clientId: clientId,
                    idIdcc: idccExist.code,
                    type: type,
                    label: label,
                    id: id,
                    level: level,
                    createdBy: userId,
                    slug: generateSlug(`Classification-${count + 1}`)
                }
            })
        }
        if (level === "logiciel") {
            const classificationExist = await prisma.software_Classification.findFirst({
                where: {
                    clientId: clientId,
                    idIdcc: idccExist.code,
                    type: type,
                    softwareLabel: softwareLabel,
                    id: id
                }
            })
            if (classificationExist) {
                throw new ActionError("La classification existe déjà.")
            }
            const count = await prisma.software_Classification.count()
            await prisma.software_Classification.create({
                data: {
                    clientId: clientId,
                    softwareLabel: softwareLabel,
                    idIdcc: idccExist.code,
                    type: type,
                    label: label,
                    id: id,
                    level: level,
                    createdBy: userId,
                    slug: generateSlug(`Classification-${count + 1}`)
                }
            })
        }
    } catch (err: unknown) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'une classification`,
            scope: "classification",
        }
        await createLog(log)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/classification/${idcc}`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/classification/${idcc}`)
})
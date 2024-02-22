"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { StandardAttachmentCreateSchema } from "@/src/helpers/definition";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";

import type { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { generateSlug } from "@/src/helpers/generateSlug";
export const createStandardAttachment = authentificationActionUserIsEditorClient(StandardAttachmentCreateSchema, async (values: z.infer<typeof StandardAttachmentCreateSchema>, { userId, clientId }) => {
    const { label, description, isObligatory, softwareLabel, multiple, clientSlug, accept } = StandardAttachmentCreateSchema.parse(values)
    try {
        const slug = await generateSlug(`${clientId}-${softwareLabel}-${label}`)
        const attachment = await prisma.standard_Attachment.create({
            data: {
                label,
                description,
                isObligatory,
                softwareLabel,
                clientId,
                slug,
                multiple,
                accept,
                createdBy: userId
            }
        })
        const log: Logger = {
            scope: 'standardAttachment',
            message: `Création de la PJ ${attachment.slug} pour le logiciel ${softwareLabel}`,
            level: 'info',
            clientId: clientId,
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la création de la pièce jointe")
    }
    revalidatePath(`/client/${clientSlug}/editor/attachment`)
    redirect(`/client/${clientSlug}/editor/attachment`)

})
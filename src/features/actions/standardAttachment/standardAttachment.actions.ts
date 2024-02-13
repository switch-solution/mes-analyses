"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { StandardAttachmentSchema } from "@/src/helpers/definition";
import type { Event } from "@/src/helpers/type";
import { userIsValid, userIsAuthorizeToEditSoftware } from "@/src/query/security.query";
import { getSoftwareById } from "@/src/query/software.query";
import { createEvent } from "@/src/query/logger.query";
export const createStandardAttachment = async (values: z.infer<typeof StandardAttachmentSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { label, description, isObligatory, softwareId } = StandardAttachmentSchema.parse(values)
    try {
        const softwareExist = await getSoftwareById(softwareId)
        if (!softwareExist) throw new Error("Le logiciel n'existe pas.")
        const userIsEditorSoftware = await userIsAuthorizeToEditSoftware(softwareId)
        if (!userIsEditorSoftware) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
        const attachment = await prisma.standard_Attachment.create({
            data: {
                label,
                description,
                isObligatory,
                softwareId,
                createdBy: userId
            }
        })
        const event: Event = {
            scope: 'standardAttachment',
            message: `Création de la PJ ${attachment.id} ${label} pour le logiciel ${softwareExist.name}`,
            level: 'info'
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la création de la pièce jointe")
    }
    revalidatePath('/editor/attachment')
    redirect('/editor/attachment')

}
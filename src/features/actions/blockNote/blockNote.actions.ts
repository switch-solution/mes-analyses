"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { ActionError, authentificationActionUserIsEditorClient } from "@/lib/safe-actions"
import { createBlockNoteSchema } from '@/src/helpers/definition';
import { Logger } from '@/src/helpers/type';
import { createLog } from '@/src/query/logger.query';
import { getStdComponentBySlug } from '@/src/query/software_component.query';
export const createBlockNote = authentificationActionUserIsEditorClient(createBlockNoteSchema, async (data: z.infer<typeof createBlockNoteSchema>, { clientId, userId }) => {
    const { value, clientSlug, componentSlug } = createBlockNoteSchema.parse(data)
    console.log(componentSlug)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) throw new ActionError("Le composant n'existe pas.")
    try {
        await prisma?.software_Component_TextArea.upsert({
            where: {
                componentLabel_softwareLabel_clientId_componentType: {
                    componentLabel: componentExist.label,
                    softwareLabel: componentExist.softwareLabel,
                    clientId,
                    componentType: componentExist.type
                }
            },
            update: {
                value,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                componentType: componentExist.type,
                createdBy: userId,
                clientId,
            },
            create: {
                value,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                componentType: componentExist.type,
                createdBy: userId,
                clientId,
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}/textarea/`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}/textarea/`);
})
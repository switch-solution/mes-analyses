"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { ActionError, authentificationActionUserIsEditorClient } from "@/lib/safe-actions"
import { createBlockNoteSchema } from '@/src/helpers/definition';
import { Logger } from '@/src/helpers/type';
import { createLog } from '@/src/query/logger.query';
export const createBlockNote = authentificationActionUserIsEditorClient(createBlockNoteSchema, async (data: z.infer<typeof createBlockNoteSchema>, { clientId, userId }) => {
    const { value, clientSlug, componentSlug } = createBlockNoteSchema.parse(data)

    try {

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}/textarea/`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}/textarea/`);
})
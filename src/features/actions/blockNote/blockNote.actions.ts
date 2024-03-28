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
    const { blocks, clientSlug } = createBlockNoteSchema.parse(data)
    const blocksJSON = JSON.parse(blocks)
    try {
        await prisma.textArea.upsert({
            where: {
                label: "test"
            },
            update: {
                blockNote: blocksJSON

            },
            create: {
                label: "test",
                blockNote: blocksJSON,
                description: "test"
            }

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    //revalidatePath(`/client/${clientSlug}/editor/textarea/`);
})
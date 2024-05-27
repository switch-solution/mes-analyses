"use server";
import { Form } from '@/src/classes/form';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { BlockEditFormSchema } from '@/src/helpers/definition';
import { Block } from '@/src/classes/block';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";

export const editBlockForm = authentificationActionUserIsEditorClient(BlockEditFormSchema, async (data: z.infer<typeof BlockEditFormSchema>, { userId, softwareLabel, clientId }) => {
    const { blockSlug, softwareSlug, clientSlug, formSlug, pageSlug } = BlockEditFormSchema.parse(data);
    const block = new Block(blockSlug);
    const blockExist = await block.blockExist();
    if (!blockExist) {
        throw new ActionError('Impossible de trouver le block');
    }
    if (formSlug === 'empty') {
        try {
            await block.removeForm({
                clientId,
                softwareLabel,
                userId
            });
        } catch (err) {
            console.error(err)
            throw new ActionError('Impossible de mettre à jour le block');
        }

    } else {
        const form = new Form(formSlug);
        const formExist = await form.formExist();

        try {
            await block.addForm({
                clientId,
                formId: formExist.id,
                formVersion: formExist.version,
                softwareLabel,
                userId
            })
        } catch (err) {
            console.error(err)
            throw new ActionError('Impossible de mettre à jour le block');
        }
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit/`);
})
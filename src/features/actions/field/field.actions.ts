
"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { FieldEditSchema, FieldDeleleteSchema } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { Field } from '@/src/classes/field';
import { Form } from '@/src/classes/form';
export const editField = authentificationActionUserIsEditorClient(FieldEditSchema, async (values: z.infer<typeof FieldEditSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, formSlug, min, max, maxLength, minLength, readonly, required, softwareSlug, label, sourceDsnId, fieldSlug } = FieldEditSchema.parse(values)
    const form = new Form(formSlug)
    const formExist = await form.formExist()
    if (!formExist) {
        throw new ActionError('Le formulaire n\'existe pas')
    }
    const field = new Field(fieldSlug)
    const fieldExist = await field.fieldExist()
    if (!fieldExist) {
        throw new ActionError('Le champ n\'existe pas')
    }
    try {

        await field.editField({
            min,
            max,
            label: label ? label : 'Donner un libellé au bloc',
            maxLength,
            minLength,
            readonly: readonly ? true : false,
            required: required ? true : false,
            formId: formExist.id,
            formVersion: formExist.version,
            dsn: sourceDsnId ? sourceDsnId : null,
            userId
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la modification du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}`);
})

export const deleteField = authentificationActionUserIsEditorClient(FieldDeleleteSchema, async (values: z.infer<typeof FieldDeleleteSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, formSlug, softwareSlug, fieldSlug } = FieldDeleleteSchema.parse(values)
    const form = new Form(formSlug)
    const formExist = await form.formExist()
    if (!formExist) {
        throw new ActionError('Le formulaire n\'existe pas')
    }
    const field = new Field(fieldSlug)
    const fieldExist = await field.fieldExist()
    if (!fieldExist) {
        throw new ActionError('Le champ n\'existe pas')
    }
    try {
        await field.deleteField()
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la suppression du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}`);

})

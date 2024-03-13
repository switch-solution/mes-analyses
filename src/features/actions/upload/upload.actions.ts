"use server";
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ActionError } from '@/lib/safe-actions';
import { authentificationActionUserIsEditorClientFormData } from '@/lib/safe-actions';
import { UploadFileSchema } from '@/src/helpers/definition';
import z from "zod";
import { redirect } from 'next/navigation';
import { getStdComponentBySlug } from '@/src/query/software_component.query';

export const uploadFile = authentificationActionUserIsEditorClientFormData(UploadFileSchema, async (formData: z.infer<typeof UploadFileSchema>, { clientId, userId }) => {
    const { clientSlug, componentSlug, file } = await UploadFileSchema.parseAsync(formData);
    const blob = await put(file.name, file, {
        access: 'public',
    });
    if (!blob) {
        throw new ActionError("Une erreur est survenue lors de l'envoi de l'image.")
    }
    const componentExist = await getStdComponentBySlug(componentSlug)
    const { url, downloadUrl, pathname, contentType, contentDisposition } = blob
    try {
        await prisma.software_Component_Image.create({
            data: {
                url,
                downloadUrl,
                pathname,
                contentType,
                contentDisposition,
                createdBy: userId,
                clientId,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                provider: "VERCEL",
                description: "Image de composant",
                version: 1,
                componentType: componentExist.type,
                device: "desktop",
                slug: componentSlug,
            }
        })
    } catch (err: unknown) {
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}/image`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}/image`)
    return blob;

})
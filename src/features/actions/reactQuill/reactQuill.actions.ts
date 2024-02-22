"use server";
import { prisma } from "@/lib/prisma";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { getStdComponentBySlug } from "@/src/query/stdcomponent.query";
import { CreateTextAreaSchema } from "@/src/helpers/definition";
export const createTextArea = authentificationActionUserIsEditorClient(CreateTextAreaSchema, async (data: z.infer<typeof CreateTextAreaSchema>, { clientId, userId }) => {

    const { componentSlug, value, clientSlug } = CreateTextAreaSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        await prisma.standard_Component_TextArea.create({
            data: {
                value: value,
                createdBy: userId,
                clientId: clientId,
                componentType: componentExist.type,
                softwareLabel: componentExist.softwareLabel,
                version: 1,
                componentLabel: componentExist.label,

            }

        })
        const log: Logger = {
            level: 'info',
            message: `Le texte du composant ${componentSlug} a été créé`,
            scope: "standardComponent",
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new ActionError('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/`);
    redirect(`/client/${clientSlug}/editor/component/`);
})

export const editTextArea = authentificationActionUserIsEditorClient(CreateTextAreaSchema, async (data: z.infer<typeof CreateTextAreaSchema>, { clientId, userId }) => {

    const { componentSlug, value, clientSlug } = CreateTextAreaSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        await prisma.standard_Component_TextArea.update({
            where: {
                componentLabel_softwareLabel_clientId_version_componentType: {
                    clientId: clientId,
                    componentType: componentExist.type,
                    softwareLabel: componentExist.softwareLabel,
                    version: 1,
                    componentLabel: componentExist.label,
                }
            },
            data: {
                value: value,
                updatedAt: new Date(),
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Le texte du composant ${componentSlug} a été édité`,
            scope: "standardComponent",
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new ActionError('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/`);
    redirect(`/client/${clientSlug}/editor/component/`);
})
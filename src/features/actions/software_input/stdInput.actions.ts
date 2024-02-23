"use server";
import { prisma } from "@/lib/prisma";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { getStdComponentBySlug } from "@/src/query/software_component.query";
import { CreateStdInputSchema, DeleteStdInputSchema, EdidStdInputSchema } from "@/src/helpers/definition";
export const createStdInput = authentificationActionUserIsEditorClient(CreateStdInputSchema, async (data: z.infer<typeof CreateStdInputSchema>, { clientId, userId }) => {

    const { componentSlug, type, clientSlug, label } = CreateStdInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        const countInput = await prisma.software_Component_Input.count({
            where: {
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
                componentType: componentExist.type
            }
        })
        const order = countInput + 1
        await prisma.software_Component_Input.create({
            data: {
                type: type,
                createdBy: userId,
                clientId: clientId,
                componentType: componentExist.type,
                softwareLabel: componentExist.softwareLabel,
                componentLabel: componentExist.label,
                label,
                order,
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Ajout du champ ${label} sur le  ${componentSlug}`,
            scope: "standardComponent",
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new ActionError('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}`);
})

export const deleteStdInput = authentificationActionUserIsEditorClient(DeleteStdInputSchema, async (data: z.infer<typeof DeleteStdInputSchema>, { clientId, userId }) => {
    console.log(data)
    const { componentSlug, id, clientSlug } = DeleteStdInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        const stdInput = await prisma.software_Component_Input.findUnique({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }
        })
        if (!stdInput) {
            const log: Logger = {
                level: 'error',
                message: `Echec de suppression du champ ${id} sur le composant ${componentSlug} `,
                scope: "standardComponent",
            }
            await createLog(log)
            throw new ActionError('Le champ n\'existe pas')
        }
        await prisma.software_Component_Input.delete({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Suppression de du champ ${stdInput?.label} sur le composant ${componentSlug} `,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la suppression du champ')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}`);
})


export const editStdInput = authentificationActionUserIsEditorClient(EdidStdInputSchema, async (data: z.infer<typeof EdidStdInputSchema>, { clientId, userId }) => {

    const { componentSlug, clientSlug, id, label, maxLength, minLength, minValue, maxValue, required, readonly, placeholder, defaultValue } = EdidStdInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        const stdInput = await prisma.software_Component_Input.findUnique({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }
        })
        if (!stdInput) {
            const log: Logger = {
                level: 'error',
                message: `Echec de suppression du champ ${id} sur le composant ${componentSlug} `,
                scope: "standardComponent",
            }
            await createLog(log)
            throw new ActionError('Le champ n\'existe pas')
        }
        await prisma.software_Component_Input.update({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            },
            data: {
                createdBy: userId,
                clientId: clientId,
                componentType: componentExist.type,
                softwareLabel: componentExist.softwareLabel,
                componentLabel: componentExist.label,
                label,
                maxLength,
                maxValue,
                minLength,
                minValue,
                placeholder,
                required,
                readonly,
                defaultValue
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Le champ ${label} du composant ${componentSlug} a été édité`,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}`);
})
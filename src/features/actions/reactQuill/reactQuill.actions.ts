"use server";
import { prisma } from "@/lib/prisma";
import { userIsValid } from "@/src/query/security.query";
import { getStandardComponentById } from "@/src/query/stdcomponent.query";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createEvent } from "@/src/query/logger.query";
import type { Event } from "@/src/helpers/type";
import { getTextAreaById } from "@/src/query/standardTextArea";
export const createTextArea = async (componentId: string, value: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const componentExist = await getStandardComponentById(componentId)
        if (!componentExist) {
            throw new Error('Le composant n\'existe pas')
        }
        await prisma.standard_Composant_TextArea.create({
            data: {
                value: value,
                createdBy: userId,
                Standard_Composant: {
                    connect: {
                        id: componentId
                    }
                }
            }

        })
        const event: Event = {
            level: 'info',
            message: `Le texte du composant ${componentId} a été créé`,
            scope: "standardComposant",
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/editor/component/`);
    redirect(`/editor/component/`);
}

export const editTextArea = async (textAreaId: string, value: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const textAreaExist = await getTextAreaById(textAreaId)
        if (!textAreaExist) {
            throw new Error('Le composant n\'existe pas')
        }
        await prisma.standard_Composant_TextArea.update({
            where: {
                id: textAreaId,
            },
            data: {
                value: value,
                updatedAt: new Date(),
            }

        })
        const event: Event = {
            level: 'info',
            message: `Mise à jour du texte ${textAreaExist.id}`,
            scope: "standardComposant",
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/editor/component/`);
    redirect(`/editor/component/`);
}
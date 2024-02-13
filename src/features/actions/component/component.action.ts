"use server";
import { prisma } from '@/lib/prisma';
import * as z from "zod"
import { StandardComposantSchema, StandardComposantInputSchema, EnumTypeComponentSchema } from '@/src/helpers/definition';
import { getMyClient } from '@/src/query/user.query';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userIsEditorClient, userIsValid } from '@/src/query/security.query';
import { getStandardComponentClient } from '@/src/query/stdcomponent.query'
import { createEvent } from '@/src/query/logger.query';
import type { Event } from '@/src/helpers/type';
import { getStandardInputById, getLastOrderInputByComponentId } from "@/src/query/stdComponentInput.query"
export const createStandardInput = async (componentId: string, type: string, values: z.infer<typeof StandardComposantInputSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { label, required, readonly, maxLength, minLength, placeholder, order, minValue, maxValue, isCode, isDescription, isLabel } = StandardComposantInputSchema.parse(values)
    //EnumTypeComponentSchema.parse(type)
    const clientId = await getStandardComponentClient(componentId)
    const userIsEditor = await userIsEditorClient(clientId)
    if (!userIsEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    const getLastOrder = await getLastOrderInputByComponentId(componentId)
    const newOrder = getLastOrder ? getLastOrder + 1 : 1
    try {
        await prisma.standard_Composant_Input.create({
            data: {
                type: type,
                label: label,
                required: required ? required : false,
                readonly: readonly ? readonly : false,
                maxLength: maxLength,
                minLength: minLength,
                maxValue: maxValue,
                minValue: minValue,
                order: newOrder,
                placeholder: placeholder,
                standard_ComposantId: componentId,
                createdBy: userId,
                isCode: isCode,
                isDescription: isDescription,
                isLabel: isLabel
            }
        })
        const event: Event = {
            level: "info",
            message: `Le composant ${componentId} a été créé.`,
            scope: "standardComposantInput",
            clientId: clientId
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du composant.")
    }

    revalidatePath(`/editor/component/${componentId}`);
    redirect(`/editor/component/${componentId}`);

}

export const updateStandardInputOrder = async (id: string, newOrder: number, move: 'up' | 'down') => {
    if (newOrder < 0) throw new Error("L'ordre ne peut pas être inférieur à 0.")
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const stdComponentInput = await getStandardInputById(id)
    if (!stdComponentInput) throw new Error("Le composant n'existe pas.")
    const otherStdComponentImpact = await prisma.standard_Composant_Input.findFirstOrThrow({
        select: {
            id: true,
            order: true
        },
        where: {
            order: newOrder,
            standard_ComposantId: stdComponentInput.Standard_Composant.id
        }
    })

    try {

        //Update current order
        await prisma.standard_Composant_Input.update({
            where: {
                id: id
            },
            data: {
                order: newOrder,
                updatedAt: new Date()

            }
        })

        //Update previous order
        let newOrderPrevisous = newOrder

        otherStdComponentImpact ?
            await prisma.standard_Composant_Input.update({
                where: {
                    id: otherStdComponentImpact?.id
                },
                data: {
                    order: move === "up" ? newOrderPrevisous + 1 : newOrderPrevisous - 1,
                    updatedAt: new Date()

                }
            }) : undefined




    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la mise à jour de l'ordre.")
    }
    revalidatePath('/editor/component');
    redirect(`/editor/component/${stdComponentInput.Standard_Composant.id}`);
}

export const createComponent = async (clientId: string, values: z.infer<typeof StandardComposantSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const userClientsList = await getMyClient()
    if (!userClientsList) throw new Error("L'utilisateur n'a pas de client.")
    const { title, description, status, softwareId, type } = StandardComposantSchema.parse(values)

    if (!userClientsList.find(client => client.id === clientId)) {
        throw new Error("Le client n'existe pas.")
    }

    try {
        const component = await prisma.standard_Composant.create({
            data: {
                title: title,
                description: description,
                clientId: clientId,
                createdBy: userId,
                status: status,
                softwareId: softwareId,
                type: type,

            }
        })
        if (component.type === 'form') {
            await prisma.standard_Composant_Input.createMany({
                data: [
                    {
                        type: 'text',
                        label: 'Code',
                        isCode: true,
                        order: 1,
                        createdBy: userId,
                        required: true,
                        readonly: false,
                        standard_ComposantId: component.id
                    },
                    {
                        type: 'text',
                        label: 'label',
                        isLabel: true,
                        order: 2,
                        createdBy: userId,
                        required: true,
                        readonly: false,
                        standard_ComposantId: component.id
                    },
                    {
                        type: 'text',
                        label: 'description',
                        isDescription: true,
                        order: 3,
                        createdBy: userId,
                        required: true,
                        readonly: false,
                        standard_ComposantId: component.id
                    },
                ]
            })
        }


    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du composant.")
    }

    const component = await prisma.standard_Composant.findFirst({
        where: {
            title: title,
            description: description,
            clientId: clientId,
            createdBy: userId
        }
    })

    if (!component) throw new Error("Le composant n'a pas été trouvé.")

    revalidatePath('/editor/component');
    redirect(`/editor/component/${component.id}/edit`);

}
"use server";
import { prisma } from '@/lib/prisma';
import * as z from "zod"
import { StandardComposantSchema, StandardComposantInputSchema } from '@/src/helpers/definition';
import { getMyClient } from '@/src/query/user.query';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userIsValid } from '@/src/query/security.query';

export const createStandardInput = async (values: z.infer<typeof StandardComposantInputSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const userClientsList = await getMyClient()
    if (!userClientsList) throw new Error("L'utilisateur n'a pas de client.")

    const { type, label, required, readonly, maxLength, minLength, standard_ComposantId } = StandardComposantInputSchema.parse(values)
    try {
        await prisma.standard_Composant_Input.create({
            data: {
                type: type,
                label: label,
                required: required ? required : false,
                readonly: readonly ? readonly : false,
                maxLength: maxLength,
                minLength: minLength,
                standard_ComposantId: standard_ComposantId,
                createdBy: userId
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du composant.")
    }

    revalidatePath('/editor/component');
    redirect(`/editor/component/${standard_ComposantId}`);

}

export const createComponent = async (values: z.infer<typeof StandardComposantSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const userClientsList = await getMyClient()
    if (!userClientsList) throw new Error("L'utilisateur n'a pas de client.")
    const { title, clientId, description, status, softwareId } = StandardComposantSchema.parse(values)

    if (!userClientsList.find(client => client.id === clientId)) {
        throw new Error("Le client n'existe pas.")
    }

    try {
        await prisma.standard_Composant.create({
            data: {
                title: title,
                description: description,
                clientId: clientId,
                createdBy: userId,
                status: status,
                softwareId: softwareId

            }
        })
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
    redirect(`/editor/component/${component.id}`);

}
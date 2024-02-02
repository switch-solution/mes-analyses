"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ContactSchema } from "@/src/helpers/definition";
import { userIsValid, userIsAdminClient } from "@/src/query/security.query";
import z from "zod"
import { getContactById } from "@/src/query/contact.query";

export const createContact = async (values: z.infer<typeof ContactSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { clientId, civility, email, firstname, lastname, phone } = ContactSchema.parse(values)

    const isAdmin = await userIsAdminClient(clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    try {
        await prisma.contact.create({
            data: {
                clientId: clientId,
                civility: civility,
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone ? phone : null,
                createdBy: userId
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du contact.")
    }

    revalidatePath(`/client/${clientId}/contact/`);
    redirect(`/client/${clientId}/contact/`);
}

export const deleteContact = async (contactId: string) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    if (!contactId) throw new Error("Le contact n'existe pas.")
    const contactExist = await getContactById(contactId)
    const clientId = contactExist.clientId
    if (!contactExist) throw new Error("Le contact n'existe pas.")
    try {
        await prisma.contact.delete({
            where: {
                id: contactId
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la suppression du contact.")
    }
    revalidatePath(`/client/${clientId}/contact/`);
    redirect(`/client/${clientId}/contact/`);
}

export const editContact = async (id: string, values: z.infer<typeof ContactSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { clientId, civility, email, firstname, lastname, phone } = ContactSchema.parse(values)

    const isAdmin = await userIsAdminClient(clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    const contact = getContactById(id)

    if (!contact) throw new Error("Ce contact n'existe pas.")
    try {
        await prisma.contact.update({
            where: {
                id: id
            },
            data: {
                clientId,
                civility,
                email,
                firstname,
                lastname,
                phone: phone ? phone : null,
                createdBy: userId,
                updatedAt: new Date()
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la modification du contact.")
    }

    revalidatePath(`/client/${clientId}/contact/`);
    redirect(`/client/${clientId}/contact/`);
}
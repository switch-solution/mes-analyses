"use server";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { userIsAdminClient } from "@/src/query/security.query";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwaresSchema } from "@/src/helpers/definition";
export const deleteSoftware = async (id: string) => {

    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const software = await prisma.software.findUnique({
        where: {
            id: id
        }
    })
    if (!software) throw new Error("Ce logiciel n'existe pas.")

    const isAdmin = await userIsAdminClient(userId, software?.clientId)

    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    await prisma.software.delete({
        where: {
            id: id
        }
    })

    revalidatePath(`/client/${software.clientId}/software/`)

}

export const editSoftware = async (id: string, formdata: FormData) => {

    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { name, provider, clientId } = SoftwaresSchema.parse({
        name: formdata.get('name'),
        provider: formdata.get('provider'),
        clientId: formdata.get('clientId')
    })

    const isAdmin = await userIsAdminClient(userId, clientId)

    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    const software = await prisma.software.findUnique({
        where: {
            id: id
        }
    })

    if (!software) throw new Error("Ce logiciel n'existe pas.")


    await prisma.software.update({
        where: {
            id: id
        },
        data: {
            name,
            provider,
            clientId,
            createdBy: userId,
            updatedAt: new Date()
        }
    })

    revalidatePath(`/client/${clientId}/software/`)
    redirect(`/client/${clientId}/software/`)

}

export const createSoftware = async (formdata: FormData) => {
    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { name, provider, clientId } = SoftwaresSchema.parse({
        name: formdata.get('name'),
        provider: formdata.get('provider'),
        clientId: formdata.get('clientId')
    })

    const isAdmin = await userIsAdminClient(userId, clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    try {
        await prisma.software.create({
            data: {
                name,
                provider,
                clientId,
                createdBy: userId,
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du logiciel.")
    }

    revalidatePath(`/client/${clientId}/software/`)
    redirect(`/client/${clientId}/software/`)
}
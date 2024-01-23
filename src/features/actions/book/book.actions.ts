"use server"

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { userIsEditorClient } from "@/src/query/security.query";
import { BookFormSchema } from "@/src/helpers/definition";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSoftwareClient } from "@/src/query/software.query";
export const createBook = async (formdata: FormData) => {
    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { name, softwareId, status } = BookFormSchema.parse({
        name: formdata.get('name'),
        softwareId: formdata.get('softwareId'),
        status: formdata.get('status')
    })
    const clientId = await getSoftwareClient(softwareId)
    const isEditor = await userIsEditorClient(userId, clientId)

    if (!isEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    try {
        await prisma.standard_Book.create({
            data: {
                name: name,
                softwareId: softwareId,
                status: status,
                createdBy: userId,
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du livre.")
    }

    revalidatePath(`/editor/book/`)
    redirect(`/editor/book/`)



}
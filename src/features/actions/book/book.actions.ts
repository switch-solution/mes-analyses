"use server"

import { prisma } from "@/lib/prisma";
import { userIsEditorClient, userIsValid } from "@/src/query/security.query";
import { BookFormSchema } from "@/src/helpers/definition";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSoftwareClient } from "@/src/query/software.query";
import z from "zod"
export const createBook = async (values: z.infer<typeof BookFormSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { name, softwareId, status, description } = BookFormSchema.parse(values)
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
                description: description
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du livre.")
    }

    revalidatePath(`/editor/book/`)
    redirect(`/editor/book/`)



}
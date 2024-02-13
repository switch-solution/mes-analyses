"use server"

import { prisma } from "@/lib/prisma";
import { userIsAuthorizeToEditSoftware, userIsValid } from "@/src/query/security.query";
import { BookFormSchema } from "@/src/helpers/definition";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Event } from "@/src/helpers/type";
import { createEvent } from "@/src/query/logger.query";
export const createBook = async (values: z.infer<typeof BookFormSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { name, softwareId, status, description } = BookFormSchema.parse(values)
    const isEditor = await userIsAuthorizeToEditSoftware(softwareId)
    if (!isEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    try {
        await prisma.standard_Book.create({
            data: {
                label: name,
                softwareId: softwareId,
                status: status,
                createdBy: userId,
                description: description
            }
        })
        const Event: Event = {
            scope: "book",
            message: `L'utilisateur a créé un livre avec le nom ${name} et le logiciel ${softwareId}`,
            level: "info"
        }
        await createEvent(Event)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du livre.")
    }

    revalidatePath(`/editor/book/`)
    redirect(`/editor/book/`)



}
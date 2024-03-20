"use server"

import { prisma } from "@/lib/prisma";
import { BookFormSchema, BookFormSchemaEdit } from "@/src/helpers/definition";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getSoftwareBookBySlug } from "@/src/query/software_book.query";
import { getCountBook } from "@/src/query/client.query";
import { getSoftwareBySlug } from "@/src/query/software.query";

export const editBook = authentificationActionUserIsEditorClient(BookFormSchemaEdit, async (values: z.infer<typeof BookFormSchemaEdit>, { clientId, userId }) => {

    const { label, description, clientSlug, bookSlug, status } = BookFormSchemaEdit.parse(values)
    try {
        const bookExist = await getSoftwareBookBySlug(bookSlug)
        if (!bookExist) {
            const log: Logger = {
                scope: "book",
                message: `L'utilisateur essaye de modifier un livre qui n'existe pas ${bookSlug}.`,
                level: "info"
            }
            await createLog(log)
            throw new ActionError("Le livre n'existe pas.")

        }
        await prisma.software_Book.update({
            where: {
                slug: bookSlug
            },
            data: {
                label: label,
                description: description,
                clientId: clientId,
                status: status
            }
        })
        const log: Logger = {
            scope: "book",
            message: `L'utilisateur a modifié le livre avec le nom ${label} et le logiciel ${bookExist.softwareLabel}`,
            level: "info"
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la modification du livre.")
    }
    revalidatePath(`/client/${clientSlug}/editor/book/`)
    redirect(`/client/${clientSlug}/editor/book/`)

})

export const createBook = authentificationActionUserIsEditorClient(BookFormSchema, async (values: z.infer<typeof BookFormSchema>, { clientId, userId }) => {


    const { label, description, softwareSlug, clientSlug } = BookFormSchema.parse(values)
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) throw new ActionError("Le logiciel n'existe pas.")
    try {
        const countBook = await getCountBook(clientSlug)
        const slug = await generateSlug(`cahier-${countBook + 1}-${label}`)
        await prisma.software_Book.create({
            data: {
                label: label,
                status: 'actif',
                createdBy: userId,
                description: description,
                clientId: clientId,
                softwareLabel: softwareExist.label,
                slug: slug
            }
        })
        const log: Logger = {
            scope: "book",
            message: `L'utilisateur a créé un livre avec le nom ${label} et le logiciel ${softwareExist.label}`,
            level: "info"
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du livre.")
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/book/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/book/`)



})
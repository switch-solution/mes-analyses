"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ChapterFormSchema } from "@/src/helpers/definition";
import { userIsEditorClient, userIsValid } from "@/src/query/security.query";
import { getBookClient, getBookExist } from "@/src/query/standard_book.query";
import z from "zod"
import { getParent } from "@/src/query/standard_chapter.query";
import { createEvent } from "@/src/query/logger.query";
import type { Event } from "@/src/helpers/type";
import { get } from "http";
export const createChapter = async (bookId: string, values: z.infer<typeof ChapterFormSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { level_1, level_2, level_3, label } = ChapterFormSchema.parse(values)

    const book = await getBookExist(bookId)
    if (!book) throw new Error("Le livre n'existe pas.")

    const clientId = await getBookClient(bookId)
    if (!clientId) throw new Error("Le client n'existe pas.")

    const isEditor = await userIsEditorClient(clientId)

    if (!isEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    try {
        const parentId = await getParent(bookId, level_1, level_2, level_3)
        const chapter = await prisma.standard_Chapter.create({
            data: {
                label,
                bookId,
                level_1,
                level_2,
                level_3,
                parentId: parentId?.id || null,
                createdBy: userId
            }
        })
        const clientId = await getBookClient(bookId)
        const event: Event = {
            level: 'info',
            message: `Création chapitre ${chapter.id} pour le cahier ${bookId}`,
            scope: 'chapter',
            clientId: clientId,
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du chapitre.")
    }
    const chapter = await prisma.standard_Chapter.findFirst({
        where: {
            bookId: bookId,
            level_1: level_1,
            level_2: level_2,
            level_3: level_3
        }
    })
    revalidatePath(`/editor/book/${bookId}/chapter/${chapter?.id}`);
    redirect(`/editor/book/${bookId}/chapter/${chapter?.id}`);

}

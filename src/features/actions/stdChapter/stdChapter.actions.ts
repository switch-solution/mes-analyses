"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ChapterFormCreateSchema } from "@/src/helpers/definition";
import { getStdBookBySlug } from "@/src/query/standard_book.query";
import z from "zod"
import { getParent } from "@/src/query/standard_chapter.query";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { authentificationActionUserIsEditorClient } from "@/lib/safe-actions";
import { generateSlug } from "@/src/helpers/generateSlug"

export const createChapter = authentificationActionUserIsEditorClient(ChapterFormCreateSchema, async (values: z.infer<typeof ChapterFormCreateSchema>, { clientId, userId }) => {


    const { level_1, level_2, level_3, label, bookSlug, clientSlug } = ChapterFormCreateSchema.parse(values)

    const book = await getStdBookBySlug(bookSlug)
    if (!book) throw new Error("Le livre n'existe pas.")



    try {
        const slug = await generateSlug(`${clientId}-${bookSlug}-${level_1}-${level_2}-${level_3}`)
        const parentId = await getParent({
            clientId,
            bookLabel: book.label,
            bookSoftwareLabel: book.softwareLabel,
            level_1,
            level_2,
            level_3

        })
        const chapter = await prisma.standard_Chapter.create({
            data: {
                label,
                bookLabel: book.label,
                clientId,
                bookSoftwareLabel: book.softwareLabel,
                level_1,
                slug,
                level_2,
                level_3,
                parentId: parentId?.id || null,
                createdBy: userId
            }
        })
        const log: Logger = {
            level: 'info',
            message: `Création chapitre ${chapter.id} pour le cahier ${book.label}`,
            scope: 'chapter',
            clientId: clientId,
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du chapitre.")
    }
    const chapter = await prisma.standard_Chapter.findFirst({
        where: {
            label,
            bookLabel: book.label,
            clientId,
            bookSoftwareLabel: book.softwareLabel,
            level_1: level_1,
            level_2: level_2,
            level_3: level_3
        }
    })
    revalidatePath(`/client/${clientSlug}/editor/book/${bookSlug}`);
    redirect(`/client/${clientSlug}/editor/book/${bookSlug}`);

})

"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth';
import { ChapterFormSchema } from "@/src/helpers/definition";
import { userIsEditorClient } from "@/src/query/security.query";
import { getBookClient, getBookExist } from "@/src/query/book.query";
export const createChapter = async (formdata: FormData) => {
    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { level, label, bookId } = ChapterFormSchema.parse({
        bookId: formdata.get('bookId'),
        level: formdata.get('level'),
        label: formdata.get('label')
    })

    const book = await getBookExist(bookId)
    if (!book) throw new Error("Le livre n'existe pas.")

    const clientId = await getBookClient(bookId)
    if (!clientId) throw new Error("Le client n'existe pas.")

    const isEditor = await userIsEditorClient(userId, clientId)

    if (!isEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    try {
        await prisma.chapter.create({
            data: {
                level: level,
                label: label,
                bookId: bookId,
                createdBy: userId
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du chapitre.")
    }

    revalidatePath(`/editor/book/${bookId}`);
    redirect(`/editor/book/${bookId}`);

}
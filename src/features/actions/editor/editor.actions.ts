"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ChapterFormSchema } from "@/src/helpers/definition";
import { userIsEditorClient, userIsValid } from "@/src/query/security.query";
import { getBookClient, getBookExist } from "@/src/query/standard_book.query";
import z from "zod"
export const createChapter = async (values: z.infer<typeof ChapterFormSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { level, label, bookId, rank, underRank, parentId } = ChapterFormSchema.parse(values)

    const book = await getBookExist(bookId)
    if (!book) throw new Error("Le livre n'existe pas.")

    const clientId = await getBookClient(bookId)
    if (!clientId) throw new Error("Le client n'existe pas.")

    const isEditor = await userIsEditorClient(userId, clientId)



    if (!isEditor) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    try {
        await prisma.standard_Chapter.create({
            data: {
                level: parseInt(level),
                rank: parseInt(rank),
                label: label,
                bookId: bookId,
                createdBy: userId,
                underRank: parseInt(underRank),
                parentId: parentId ? parentId : null
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du chapitre.")
    }

    revalidatePath(`/editor/book/${bookId}`);
    redirect(`/editor/book/${bookId}`);

}
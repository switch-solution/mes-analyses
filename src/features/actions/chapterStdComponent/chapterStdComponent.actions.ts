"use server";
import { prisma } from "@/lib/prisma";
import { ChapterStandardComposantSchema } from "@/src/helpers/definition"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { userIsValid } from "@/src/query/security.query";
import z from "zod";

export const createAssociationChapterStandardComposant = async (data: z.infer<typeof ChapterStandardComposantSchema>) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { chapterId, standardComposantId } = ChapterStandardComposantSchema.parse(data)
    try {
        await prisma.chapterStdComposant.create({
            data: {
                chapterId: chapterId,
                standardComposantId: standardComposantId,
                createdBy: userId,

            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de l'association.")
    }

    revalidatePath(`/editor/book/`)
    redirect(`/editor/book/`)

}
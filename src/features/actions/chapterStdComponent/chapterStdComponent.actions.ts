"use server";
import { prisma } from "@/lib/prisma";
import { ChapterStandardComponenttSchema } from "@/src/helpers/definition"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import z from "zod";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { getChapterBySlug } from "@/src/query/software_chapter.query";

export const createAssociationChapterStandardComposant = authentificationActionUserIsEditorClient(ChapterStandardComponenttSchema, async (data: z.infer<typeof ChapterStandardComponenttSchema>, { clientId, userId }) => {
    const { chapterSlug, standardComposantLabel, clientSlug } = ChapterStandardComponenttSchema.parse(data)
    const chapterExist = await getChapterBySlug(chapterSlug)
    if (!chapterExist) throw new ActionError("Le chapitre n'existe pas.")
    const component = await prisma.software_Component.findFirst({
        where: {
            label: standardComposantLabel,
            clientId: clientId,
            softwareLabel: chapterExist.bookSoftwareLabel
        }
    })
    if (!component) throw new ActionError("Le composant n'existe pas.")
    try {
        await prisma.softwareChapterSoftwareComponent.create({
            data: {
                level_1: chapterExist.level_1,
                level_2: chapterExist.level_2,
                level_3: chapterExist.level_3,
                softwareLabel: chapterExist.bookSoftwareLabel,
                componentLabel: standardComposantLabel,
                componentType: component?.type,
                createdBy: userId,
                clientId: clientId,
                bookLabel: chapterExist.bookLabel,
                bookSoftwareLabel: chapterExist.bookSoftwareLabel,

            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création de l'association.")
    }

    revalidatePath(`/client/${clientSlug}/editor/book/${chapterExist.bookLabel}/chapter/${chapterSlug}/associate`)

})
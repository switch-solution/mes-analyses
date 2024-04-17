"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { FeedbackCreateSchema } from "@/src/helpers/definition";
import { authentifcationAction, ActionError } from "@/lib/safe-actions";
import z from "zod";

export const createFeedback = authentifcationAction(FeedbackCreateSchema, async (values: z.infer<typeof FeedbackCreateSchema>, userId) => {
    const { message, level, isBlocked, feature } = await FeedbackCreateSchema.parseAsync(values)
    try {
        await prisma.feedback.create({
            data: {
                message,
                level,
                isBlocked,
                feature,
                createdBy: userId
            }
        })
    } catch (err: unknown) {
        throw new ActionError(err as string)
    }
    revalidatePath(`/feedback/`)
})
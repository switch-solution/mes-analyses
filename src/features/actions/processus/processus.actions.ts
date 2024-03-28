"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProcessusCreateSchema, TableAgeRowCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { generateSlug } from "@/src/helpers/generateSlug";
export const createProcessus = authentificationActionUserIsEditorClient(ProcessusCreateSchema, async (values: z.infer<typeof ProcessusCreateSchema>, { clientId, userId, softwareLabel, softwareSlug, clientSlug }) => {
    const { label, id, level, description, descriptionUrl, formUrl } = ProcessusCreateSchema.parse(values)
    let slug = null



    revalidatePath(``)
    redirect(``)


})

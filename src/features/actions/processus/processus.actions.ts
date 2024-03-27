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
    try {
        switch (level) {
            case "Client":
                const processusExist = await prisma.client_Processus.findFirst({
                    where: {
                        clientId,
                        level,
                        label,
                        formUrl,
                        descriptionUrl,
                        description
                    }
                })
                if (processusExist) {
                    throw new ActionError("Le processus existe déjà")
                }
                let count = await prisma.client_Processus.count()
                slug = generateSlug(`PROCESSUS${count + 1}_${id}`)
                await prisma.client_Processus.create({
                    data: {
                        label,
                        id: `Client_${id}`,
                        formId: "",
                        theme: "En attente",
                        clientId,
                        createdBy: userId,
                        slug,
                        level,
                        formUrl,
                        descriptionUrl,
                        description
                    }
                })
                break
            case "Logiciel":
                const processusSoftwareExist = await prisma.software_Processus.findFirst({
                    where: {
                        clientId,
                        level,
                        label,
                        formUrl,
                        descriptionUrl,
                        description,
                        softwareLabel
                    }
                })
                if (processusSoftwareExist) {
                    throw new ActionError("Le processus existe déjà")
                }
                let countSoftware = await prisma.software_Table_Age.count()
                slug = generateSlug(`TABLE_AGE_${countSoftware + 1}_${id}`)
                await prisma.software_Processus.create({
                    data: {
                        label,
                        id: `Logiciel_${id}`,
                        formId: "",
                        theme: "En attente",
                        formVersion: 1,
                        softwareLabel,
                        clientId,
                        createdBy: userId,
                        slug,
                        descriptionUrl,
                        formUrl
                    }
                })
                break
            default:
                throw new ActionError("Le niveau n'est pas correct")
                break

        }
    } catch (err) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'un paramètre`,
            scope: "software",
        }
        await createLog(log)
        throw new ActionError(err as string)
    }
    if (!slug) {
        throw new ActionError("Erreur lors de la création du paramètre")

    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/processus/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/processus`)


})

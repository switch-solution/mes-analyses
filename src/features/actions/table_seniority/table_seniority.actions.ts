"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { TableSeniorityCreateSchema, TableSeniorityRowCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { getIdccByCode } from "@/src/query/idcc.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { generateSlug } from "@/src/helpers/generateSlug";
export const createTableSeniority = authentificationActionUserIsEditorClient(TableSeniorityCreateSchema, async (values: z.infer<typeof TableSeniorityCreateSchema>, { clientId, userId, softwareLabel, softwareSlug, clientSlug }) => {
    const { label, level, idcc, id } = TableSeniorityCreateSchema.parse(values)
    const idccExist = await getIdccByCode(idcc)
    if (!idccExist) {
        throw new ActionError("IDCC non trouvé")
    }
    let slug = null
    try {
        switch (level) {
            case "client":
                const tableExist = await prisma.client_Table_Seniority.findFirst({
                    where: {
                        idcc,
                        id: `client_${id}`,
                    }
                })
                if (tableExist) {
                    throw new ActionError("La table d'âge existe déjà")
                }
                let count = await prisma.client_Table_Seniority.count()
                slug = generateSlug(`TABLE_ANCIENNETE_${count + 1}_${id}`)
                await prisma.client_Table_Seniority.create({
                    data: {
                        label,
                        id: `client_${id}`,
                        idcc,
                        clientId,
                        createdBy: userId,
                        slug
                    }
                })
                break
            case "logiciel":
                const tableSoftwareExist = await prisma.software_Table_Seniority.findFirst({
                    where: {
                        idcc,
                        id: `logiciel_${id}`,
                    }
                })
                if (tableSoftwareExist) {
                    throw new ActionError("La table d'âge existe déjà")
                }
                let countSoftware = await prisma.software_Table_Seniority.count()
                slug = generateSlug(`TABLE_ANCIENNETE_${countSoftware + 1}_${id}`)
                await prisma.software_Table_Seniority.create({
                    data: {
                        label,
                        id: `logiciel_${id}`,
                        softwareLabel,
                        idcc,
                        clientId,
                        createdBy: userId,
                        slug
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
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/seniority/${idcc}/${level}/${slug}`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/seniority/${idcc}/${level}/${slug}`)


})

export const createTableSeniorityRow = authentificationActionUserIsEditorClient(TableSeniorityRowCreateSchema, async (values: z.infer<typeof TableSeniorityRowCreateSchema>, { clientId, userId, softwareLabel, softwareSlug, clientSlug }) => {

    const { coefficient, indice, qualification, niveau, minMonth, maxMonth, pourcentage, label, idcc, id, level, tableSenioritySlug } = TableSeniorityRowCreateSchema.parse(values)

    const idccExist = await getIdccByCode(idcc)
    if (!idccExist) {
        throw new ActionError("IDCC non trouvé")
    }

    try {
        switch (level) {
            case "client":
                const tableExist = await prisma.client_Table_Seniority.findFirst({
                    where: {
                        idcc,
                        slug: tableSenioritySlug
                    }
                })
                if (!tableExist) {
                    throw new ActionError("La table d'ancienneté n'existe pas")
                }
                let countClient = await prisma.client_Table_Age_Row.count()
                await prisma.client_Table_Seniority_Row.create({
                    data: {
                        label,
                        idcc,
                        minMonth,
                        maxMonth,
                        id,
                        pourcentage,
                        coefficient,
                        qualification,
                        indice,
                        niveau,
                        tableId: tableExist.id,
                        clientId,
                        createdBy: userId,
                        slug: generateSlug(`TABLE_AGE_ROW_${countClient + 1}_${id}`)

                    }
                })
                break
            case "logiciel":
                const tableSoftwareExist = await prisma.software_Table_Seniority.findFirst({
                    where: {
                        idcc,
                        slug: tableSenioritySlug
                    }
                })
                if (!tableSoftwareExist) {
                    throw new ActionError("La table d'ancienneté n'existe pas")
                }
                let countSoftware = await prisma.software_Table_Seniority_Row.count()

                await prisma.software_Table_Seniority_Row.create({
                    data: {
                        minMonth,
                        niveau,
                        id,
                        coefficient,
                        qualification,
                        indice,
                        maxMonth,
                        idcc,
                        softwareLabel,
                        pourcentage,
                        label,
                        tableId: tableSoftwareExist.id,
                        clientId,
                        createdBy: userId,
                        slug: generateSlug(`TABLE_AGE_ROW_${countSoftware + 1}_${id}`)

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
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/seniority/${idcc}/${level}/${tableSenioritySlug}`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/seniority/${idcc}/${level}/${tableSenioritySlug}`)


})


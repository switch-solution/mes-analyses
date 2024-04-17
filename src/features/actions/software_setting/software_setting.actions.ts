"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SettingCreateSchema, SettingEditSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { getSoftwareSettingBySlug } from "@/src/query/software_setting.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { generateSlug } from "@/src/helpers/generateSlug";
export const createSoftwareSetting = authentificationActionUserIsEditorClient(SettingCreateSchema, async (values: z.infer<typeof SettingCreateSchema>, { clientId, userId }) => {
    const { id, value, label, description, clientSlug, softwareSlug } = SettingCreateSchema.parse(values)
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) {
        throw new ActionError("Ce logiciel n'existe pas.")
    }
    const countParam = await prisma.software_Setting.count()
    try {
        await prisma.software_Setting.create({
            data: {
                id,
                label,
                value,
                description,
                clientId,
                createdBy: userId,
                softwareLabel: softwareExist.label,
                slug: generateSlug(`PARAM_${countParam + 1}_${id}_${label}`)
            }

        })
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


    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/setting/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/setting/`)
})

export const editSoftwareSetting = authentificationActionUserIsEditorClient(SettingEditSchema, async (values: z.infer<typeof SettingEditSchema>, { clientId, userId }) => {
    const { id, value, label, description, clientSlug, slug, softwareSlug } = SettingEditSchema.parse(values)
    const settingExist = await getSoftwareSettingBySlug(slug)
    if (!settingExist) {
        throw new ActionError("Ce paramètre n'existe pas.")
    }
    try {
        await prisma.software_Setting.update({
            where: {
                id_label_value_clientId_softwareLabel: {
                    id: settingExist.id,
                    label: settingExist.label,
                    value: settingExist.value,
                    clientId: settingExist.clientId,
                    softwareLabel: settingExist.softwareLabel

                }
            },
            data: {
                label,
                value,
                description,
                clientId,
                createdBy: userId,
            }

        })
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


    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/setting/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/setting/`)
})
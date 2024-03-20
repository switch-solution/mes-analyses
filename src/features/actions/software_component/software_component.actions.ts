"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwareComponentCreateSchema, ConstantEditSchema } from "@/src/helpers/definition";
import z from "zod";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { getCountAllSoftwareComponent } from "@/src/query/software_component.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { syncGenerateSlug } from "@/src/helpers/generateSlug";
export const createSoftwareComponentTable = authentificationActionUserIsEditorClient(SoftwareComponentCreateSchema, async (values: z.infer<typeof SoftwareComponentCreateSchema>, { clientId, userId, softwareLabel }) => {
    const { label, description, softwareSlug, clientSlug, id } = SoftwareComponentCreateSchema.parse(values)
    let count = await getCountAllSoftwareComponent()
    try {
        await prisma.software_Component.create({
            data: {
                label,
                description,
                softwareLabel,
                clientId: clientId,
                version: 1,
                type: "table",
                status: "Actif",
                createdBy: userId,
                id: id,
                slug: syncGenerateSlug(`TABLEA_${count + 1}_${id}`),
                isTable: true
            }
        })

    } catch (err) {
        console.error(err)
        throw new ActionError("Erreur lors de la création de la table.")
    }

    revalidatePath(`/client/${clientId}/software/${softwareSlug}/table/`)
    redirect(`/client/${clientId}/software/${softwareSlug}/table/`)

})

export const createSoftwareComponentForm = authentificationActionUserIsEditorClient(SoftwareComponentCreateSchema, async (values: z.infer<typeof SoftwareComponentCreateSchema>, { clientId, userId, softwareLabel }) => {
    const { label, description, softwareSlug, clientSlug, id } = SoftwareComponentCreateSchema.parse(values)
    let count = await getCountAllSoftwareComponent()
    try {
        await prisma.software_Component.create({
            data: {
                label,
                description,
                softwareLabel,
                clientId: clientId,
                version: 1,
                type: "formulaire",
                status: "Actif",
                createdBy: userId,
                id: id,
                slug: syncGenerateSlug(`FORM_${count + 1}_${id}`),
                isForm: true
            }
        })

    } catch (err) {
        console.error(err)
        throw new ActionError("Erreur lors de la création de la table.")
    }

    revalidatePath(`/client/${clientId}/software/${softwareSlug}/form/`)
    redirect(`/client/${clientId}/software/${softwareSlug}/form/`)

})


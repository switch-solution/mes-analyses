"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwareItemCreateSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { getSoftwareItemsBySlug } from "@/src/query/software_Items.query";
import z from 'zod';
import { generateSlug } from "@/src/helpers/generateSlug";
export const createSoftwareItem = authentificationActionUserIsEditorClient(SoftwareItemCreateSchema, async (values: z.infer<typeof SoftwareItemCreateSchema>, { userId, clientId }) => {
    const { id, label, type, clientSlug, description, version, base, rate, amount, status, softwareLabel, idccCode, employeeContribution, employerContribution, dateStart } = SoftwareItemCreateSchema.parse(values)
    try {
        const slug = await generateSlug(`${clientSlug}-${softwareLabel}-${id}-${dateStart.toLocaleDateString()}`)
        const itemExist = await getSoftwareItemsBySlug(slug)
        if (itemExist) throw new ActionError('Cette rubrique existe déjà')
        await prisma.software_Items.create({
            data: {
                id,
                label,
                type: type ? type : 'Erreur de type',
                description,
                dateStart,
                base: base?.toString() ? base?.toString() : '',
                rate: rate?.toString() ? rate?.toString() : '',
                amount: amount?.toString() ? amount?.toString() : '',
                status: status ? status : 'Erreur de status',
                softwareLabel,
                createdBy: userId,
                idccCode,
                slug,
                clientId,
                employeeContribution,
                employerContribution
            }
        })
        const log: Logger = {
            scope: 'softwareItem',
            message: `Création de la rubrique ${id} ${label} pour le logiciel ${softwareLabel}`,
            level: 'info'
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new ActionError("Erreur lors de la création de l'élément logiciel")
    }

    revalidatePath('/editor/item')
    redirect('/editor/item')

})

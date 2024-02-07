"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SoftwareItemSchema } from "@/src/helpers/definition";
import { userIsValid, userIsAuthorizeToEditSoftware } from "@/src/query/security.query";
import { getSoftwareById, getSoftwareByUserIsEditor } from "@/src/query/software.query";
import { createEvent } from "@/src/query/logger.query";
import type { Event } from "@/src/helpers/type";
import { getIdccByCode } from "@/src/query/idcc.query";
import z from 'zod';
import { getSoftwareItemsBySlug } from "@/src/query/softwareItems.query";
export const createSoftwareItem = async (values: z.infer<typeof SoftwareItemSchema>) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { id, label, type, description, version, base, rate, amount, status, softwareId, idccCode } = SoftwareItemSchema.parse(values)
    try {
        const softwareExist = await getSoftwareById(softwareId)
        if (!softwareExist) throw new Error("Le logiciel n'existe pas.")
        const userIsEditorSoftware = await userIsAuthorizeToEditSoftware(softwareId)
        if (!userIsEditorSoftware) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
        const idccExist = await getIdccByCode(idccCode)
        if (!idccExist) throw new Error("L'IDCC n'existe pas.")
        await prisma.softwareItems.create({
            data: {
                id,
                label,
                type: type ? type : 'Erreur de type',
                description,
                version: 1,
                base: base?.toString() ? base?.toString() : '',
                rate: rate?.toString() ? rate?.toString() : '',
                amount: amount?.toString() ? amount?.toString() : '',
                status: status ? status : 'Erreur de status',
                softwareId,
                createdBy: userId,
                idccCode
            }
        })
        const event: Event = {
            createdBy: userId,
            scope: 'softwareItem',
            message: `Création de la rubrique ${id} ${label} pour le logiciel ${softwareExist.name}`,
            level: 'info'
        }
        await createEvent(event)
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la création de l'élément logiciel")
    }

    revalidatePath('/editor/item')
    redirect('/editor/item')

}

export const editSoftwareItem = async (slug: string, values: z.infer<typeof SoftwareItemSchema>) => {

    const userId = await userIsValid()

    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const { label, type, description, version, base, rate, amount, status, softwareId, idccCode } = SoftwareItemSchema.parse(values)
    const softwareItemExist = await getSoftwareItemsBySlug(slug)
    if (!softwareItemExist) throw new Error("La rubrique n'existe pas.")
    const userIsEditorSoftware = await userIsAuthorizeToEditSoftware(softwareId)
    if (!userIsEditorSoftware) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    const idccExist = await getIdccByCode(idccCode)
    if (!idccExist) throw new Error("L'IDCC n'existe pas.")
    try {
        await prisma.softwareItems.update({
            where: {
                slug: slug
            },
            data: {
                label,
                type,
                description,
                version: softwareItemExist.version + 1,
                base,
                rate,
                amount,
                status,
                idccCode,
                updatedAt: new Date(),
            }
        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la modification de l'élément logiciel")
    }
    revalidatePath('/editor/item')
    redirect('/editor/item')
}
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { AbsenceCreateSchema, AbsenceEditSchema } from "@/src/helpers/definition";
import { syncGenerateSlug } from "@/src/helpers/generateSlug";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { getSoftwareAbsenceBySlug } from "@/src/query/software_absence.query";
export const createSoftwareAbsence = authentificationActionUserIsEditorClient(AbsenceCreateSchema, async (values: z.infer<typeof AbsenceCreateSchema>, { clientId, userId }) => {
    const { dsnCode, id, itemHour, description, isSocialSecurity, itemDay, softwareSlug, counter, label, isPrintable, methodOfCalcul, population, clientSlug } = AbsenceCreateSchema.parse(values);

    const softwareExist = await getSoftwareBySlug(softwareSlug);
    if (!softwareExist) {
        throw new ActionError("Ce logiciel n'existe pas.");
    }

    const absenceExist = await prisma.software_Absence.findFirst({
        where: {
            label: label,
            softwareLabel: softwareExist.label,
            id: id,
            clientId: clientId
        }
    })
    if (absenceExist) {
        throw new ActionError("Cette absence existe déjà.");
    }

    let count = await prisma.software_Absence.count()

    try {
        await prisma.software_Absence.create({
            data: {
                dsnCode,
                clientId,
                itemHour,
                itemDay,
                counter,
                label,
                description,
                isSocialSecurity,
                isPrintable,
                methodOfCalcul,
                id,
                population,
                createdBy: userId,
                softwareLabel: softwareExist.label,
                slug: syncGenerateSlug(`ABS-${count + 1}-${label}`)

            }
        });
        const log: Logger = {
            scope: "software",
            message: `Création de l'absence ${label}.`,
            level: "info"
        };
        await createLog(log);
    }
    catch (err: unknown) {
        console.error(err);
        throw new Error(err as string);
    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/absence/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/absence/`);
})

export const editSoftwareAbsence = authentificationActionUserIsEditorClient(AbsenceEditSchema, async (values: z.infer<typeof AbsenceEditSchema>, { clientId, userId }) => {
    const { dsnCode, itemHour, description, isSocialSecurity, itemDay, softwareSlug, absenceSlug, counter, label, isPrintable, methodOfCalcul, population, clientSlug } = AbsenceEditSchema.parse(values);
    const absenceExist = await getSoftwareAbsenceBySlug(absenceSlug);
    if (!absenceExist) {
        throw new ActionError("Cette absence n'existe pas.");
    }
    const softwareExist = await getSoftwareBySlug(softwareSlug);
    if (!softwareExist) {
        throw new ActionError("Ce logiciel n'existe pas.");
    }
    try {
        await prisma.software_Absence.update({
            where: {
                label_id_clientId_softwareLabel: {
                    label: absenceExist.label,
                    id: absenceExist.id,
                    clientId: clientId,
                    softwareLabel: softwareExist.label

                }
            },
            data: {
                dsnCode,
                itemHour,
                itemDay,
                counter,
                label,
                description,
                isSocialSecurity,
                isPrintable,
                methodOfCalcul,
                population,
            }

        });
        const log: Logger = {
            scope: "software",
            message: `Mise à jour de l'absence ${label}.`,
            level: "info"
        };
        await createLog(log);
    }
    catch (err: unknown) {
        console.error(err);
        throw new Error(err as string);
    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/absence/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/absence/`);
})
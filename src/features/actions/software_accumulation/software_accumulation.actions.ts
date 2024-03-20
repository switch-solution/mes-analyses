"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from "zod"
import { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { AccumulationCreateSchema, AccumulationEditSchema, } from "@/src/helpers/definition";
import { syncGenerateSlug } from "@/src/helpers/generateSlug";
import { getCountAllAccumulation } from "@/src/query/software_accumulation.query";

export const createSoftwareAccumulation = authentificationActionUserIsEditorClient(AccumulationCreateSchema, async (values: z.infer<typeof AccumulationCreateSchema>, { clientId, userId }) => {
    const { clientSlug, softwareSlug, id, label, description } = AccumulationCreateSchema.parse(values);
    const softwareExist = await getSoftwareBySlug(softwareSlug);
    if (!softwareExist) {
        throw new ActionError("Ce logiciel n'existe pas.");
    }
    const accumulationExist = await prisma.software_Accumulation.findFirst({
        where: {
            label: label,
            softwareLabel: softwareExist.label,
            id: id,
            clientId: clientId
        }
    })
    if (accumulationExist) {
        throw new ActionError("Ce cumul de paie existe déjà.");
    }

    let count = await getCountAllAccumulation()

    try {
        await prisma.software_Accumulation.create({
            data: {
                clientId,
                label,
                description,
                id,
                createdBy: userId,
                softwareLabel: softwareExist.label,
                slug: syncGenerateSlug(`Cumul-${count + 1}-${label}`)
            }
        });
        const log: Logger = {
            scope: "software",
            message: `Création de l'accumulation ${label}.`,
            level: "info",

        };
        await createLog(log);

    } catch (err: unknown) {
        console.error(err);
        throw new Error(err as string);
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/accumulation`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/accumulation`);
})


export const editSoftwareAccumulation = authentificationActionUserIsEditorClient(AccumulationEditSchema, async (values: z.infer<typeof AccumulationEditSchema>, { clientId, userId }) => {
    const { clientSlug, softwareSlug, id, label, description, accumulationSlug, isArchived } = AccumulationEditSchema.parse(values);
    const accumulationExist = await prisma.software_Accumulation.findUnique({
        where: {
            slug: accumulationSlug
        }
    })
    if (!accumulationExist) {
        throw new ActionError("Ce cumul de paie n'existe pas.");
    }

    let count = await getCountAllAccumulation()

    try {
        await prisma.software_Accumulation.update({
            where: {
                slug: accumulationSlug
            },
            data: {
                clientId,
                label,
                description,
                id,
                isArchived
            }
        });
        const log: Logger = {
            scope: "software",
            message: `Edition du cumul de paie ${label}.`,
            level: "info"
        };
        await createLog(log);

    } catch (err: unknown) {
        console.error(err);
        throw new Error(err as string);
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/accumulation`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/accumulation`);
})
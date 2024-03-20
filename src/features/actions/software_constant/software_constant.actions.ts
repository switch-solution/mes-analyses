"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ConstantCreateSchema, ConstantEditSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import { getSoftwareConstantBySoftwareLabelAndId } from "@/src/query/software_constant.query";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getClientBySlug } from "@/src/query/client.query";
import { getSoftwareConstantBySlug } from "@/src/query/software_constant.query";
import { getConstantById } from "@/src/query/constantLegal.query";
import { getSoftwareBySlug } from "@/src/query/software.query";
import { countAllSoftwareConstant } from "@/src/query/software_constant.query";
export const createSoftwareConstant = authentificationActionUserIsEditorClient(ConstantCreateSchema, async (values: z.infer<typeof ConstantCreateSchema>, { clientId, userId }) => {
    const { label, description, level, dateStart, value, idccCode, softwareSlug, clientSlug, id } = ConstantCreateSchema.parse(values)
    const clientExist = await getClientBySlug(clientSlug)

    if (!clientExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de création d'une constante pour un client inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce client n'existe pas.")
    }
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de création d'une constante pour un logiciel inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce logiciel n'existe pas.")
    }
    const idExistForThisSoftware = await prisma.software_Constant_Legal.findFirst({
        where: {
            id: `LOG_${id}`,
            softwareLabel: softwareExist.label
        }

    })
    if (idExistForThisSoftware) {
        throw new ActionError("Cette constante existe déjà pour ce logiciel.")
    }
    let count = await countAllSoftwareConstant()
    try {
        await prisma.software_Constant_Legal.create({
            data: {
                label,
                level,
                description,
                dateStart,
                idccCode,
                softwareLabel: softwareExist.label,
                id: `LOG_${id}`,
                slug: `LOGICIEL_${count + 1}_${id}`,
                value,
                createdBy: userId,
                clientId
            }
        })
    } catch (err: unknown) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'une constante`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)


})

export const duplicateConstant = authentificationActionUserIsEditorClient(ConstantCreateSchema, async (values: z.infer<typeof ConstantCreateSchema>, { clientId, userId }) => {
    const { label, level, description, dateStart, value, clientSlug, id, softwareSlug, isDuplicate } = ConstantCreateSchema.parse(values)
    const clientExist = await getClientBySlug(clientSlug)
    if (!clientExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de modification d'une constante pour un client inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce client n'existe pas.")
    }
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de création d'une constante pour un logiciel inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce logiciel n'existe pas.")
    }
    let count = await countAllSoftwareConstant()

    if (isDuplicate === 1) {
        const constantExist = await getConstantById(id)
        if (!constantExist) {
            const log: Logger = {
                level: "error",
                message: `Tentative de duplication d'une constante inexistante`,
                scope: "constant",
                clientId
            }
            await createLog(log)
            throw new ActionError("Cette constante n'existe pas.")
        }
    } else {
        const constantExist = await getSoftwareConstantBySoftwareLabelAndId(softwareExist.label, id)
        if (!constantExist) {
            const log: Logger = {
                level: "error",
                message: `Tentative de duplication d'une constante inexistante`,
                scope: "constant",
                clientId
            }
            await createLog(log)
            throw new ActionError("Cette constante n'existe pas.")
        }
    }
    const constantExistForThisDate = await prisma.software_Constant_Legal.findFirst({
        where: {
            id,
            dateStart,
            softwareLabel: softwareExist.label
        }

    })
    if (constantExistForThisDate) {
        throw new ActionError("Cette constante existe déjà pour cette date.")
    }
    try {
        await prisma.software_Constant_Legal.create({
            data: {
                level,
                label,
                description,
                dateStart,
                value,
                createdBy: userId,
                id,
                softwareLabel: softwareExist.label,
                clientId,
                slug: `LOGICIEL_${count + 1}_${id}`,
                isDuplicate: isDuplicate === 1 ? true : false
            }
        })
        const log: Logger = {
            level: "info",
            message: `Tentative de duplication d'une constante inexistante`,
            scope: "constant",
            clientId
        }
        await createLog(log)
    } catch (err: unknown) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la modification d'une constante`,
            scope: "constant",
            clientId
        }
        await createLog(log)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)
})

export const editSoftwareConstant = authentificationActionUserIsEditorClient(ConstantEditSchema, async (values: z.infer<typeof ConstantEditSchema>, { clientId, userId }) => {
    const { label, description, dateStart, value, clientSlug, softwareSlug, constantSlug } = ConstantEditSchema.parse(values)
    const clientExist = await getClientBySlug(clientSlug)
    if (!clientExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de modification d'une constante pour un client inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce client n'existe pas.")
    }
    const softwareExist = await getSoftwareBySlug(softwareSlug)
    if (!softwareExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de modification d'une constante pour un logiciel inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Ce logiciel n'existe pas.")
    }

    const constantExist = await getSoftwareConstantBySlug(constantSlug)
    if (!constantExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de modification d'une constante inexistante`,
            scope: "constant",
            clientId
        }
        await createLog(log)
        throw new ActionError("Cette constante n'existe pas.")
    }
    try {
        await prisma.software_Constant_Legal.update({
            where: {
                id_level_dateStart_isDuplicate_clientId_softwareLabel: {
                    id: constantExist.id,
                    level: constantExist.level,
                    dateStart: constantExist.dateStart,
                    isDuplicate: constantExist.isDuplicate,
                    clientId,
                    softwareLabel: constantExist.softwareLabel

                }
            },
            data: {
                label,
                description,
                dateStart,
                value,
            }
        })
        const log: Logger = {
            level: "info",
            message: `La constant ${constantExist.id} passe de la valeur ${constantExist.value} à la valeur ${value}`,
            scope: "constant",
            clientId
        }
        await createLog(log)
    } catch (err: unknown) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la modification d'une constante`,
            scope: "constant",
            clientId
        }
        await createLog(log)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/constant/`)
})
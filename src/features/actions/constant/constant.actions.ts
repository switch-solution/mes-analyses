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
import { getIdcc, getIdccByCode } from "@/src/query/idcc.query";
export const createConstant = authentificationActionUserIsEditorClient(ConstantCreateSchema, async (values: z.infer<typeof ConstantCreateSchema>, { clientId, userId, softwareLabel }) => {
    const { label, description, level, dateStart, idcc, value, softwareSlug, clientSlug, id } = ConstantCreateSchema.parse(values)
    const idccExist = await getIdccByCode(idcc)
    if (!idccExist) {
        const log: Logger = {
            level: "error",
            message: `Tentative de création d'une constante pour un IDCC inexistant`,
            scope: "constant",
        }
        await createLog(log)
        throw new ActionError("Cet IDCC n'existe pas.")
    }
    try {
        if (level === "client") {
            const constantExist = await prisma.client_Constant_Legal.findFirst({
                where: {
                    id,
                    dateStart,
                    clientId
                }
            })
            if (constantExist) {
                throw new ActionError("Cette constante existe déjà pour cette date.")
            }
            let count = await prisma.client_Constant_Legal.count()
            await prisma.client_Constant_Legal.create({
                data: {
                    level,
                    label,
                    description,
                    dateStart,
                    value,
                    createdBy: userId,
                    id,
                    clientId,
                    slug: `Constant_${count + 1}_${id}`
                }
            })
        }
        if (level === "logiciel") {
            const constantExist = await prisma.software_Constant_Legal.findFirst({
                where: {
                    id,
                    dateStart,
                    softwareLabel,
                    clientId
                }
            })
            if (constantExist) {
                throw new ActionError("Cette constante existe déjà pour cette date.")
            }
            let count = await prisma.software_Constant_Legal.count()
            await prisma.software_Constant_Legal.create({
                data: {
                    level,
                    label,
                    description,
                    softwareLabel,
                    dateStart,
                    value,
                    createdBy: userId,
                    id,
                    clientId,
                    slug: `Constant_${count + 1}_${id}`
                }
            })
        }
    } catch (err: unknown) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la création d'une constante`,
            scope: "constant",
            clientId
        }
        await createLog(log)
        throw new ActionError(err as string)
    }



    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/constant/${idcc}/`)
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/constant/${idcc}/`)


})

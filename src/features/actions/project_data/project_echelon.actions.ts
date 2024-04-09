"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateClassificationSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getProjectProcessusBySlug } from "@/src/query/project_processus.query";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createEchelon = authentifcationActionUserIsAuthorizeToEditProject(CreateClassificationSchema, async (values: z.infer<typeof CreateClassificationSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, idcc, id, label } = CreateClassificationSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const idccExist = await prisma.project_Idcc.findFirst({
        where: {
            idcc,
            projectLabel,
            softwareLabel,
            clientId
        }
    })
    if (!idccExist) {
        throw new ActionError("La code IDCC n'existe pas")
    }
    const echelonExit = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (echelonExit) {
        throw new ActionError("L'echelon existe déjà")
    }
    try {
        await processus.insert({
            values,
            userId,
            projectLabel,
            softwareLabel,
            clientId
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


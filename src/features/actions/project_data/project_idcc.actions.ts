"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateIdccSchema, IdccEditSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createIdcc = authentifcationActionUserIsAuthorizeToEditProject(CreateIdccSchema, async (values: z.infer<typeof CreateIdccSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, idcc } = CreateIdccSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const idccExist = await processus.valueExist({
        value: idcc,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (!idccExist) {
        throw new ActionError("La code IDDC n'existe pas")
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

export const updateIdcc = authentifcationActionUserIsAuthorizeToEditProject(IdccEditSchema, async (values: z.infer<typeof IdccEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug } = IdccEditSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    try {
        await processus.update({
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

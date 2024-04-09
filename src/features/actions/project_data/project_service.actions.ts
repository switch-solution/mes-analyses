"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateServiceSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createService = authentifcationActionUserIsAuthorizeToEditProject(CreateServiceSchema, async (values: z.infer<typeof CreateServiceSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, id, level, label, description, highterLevel } = CreateServiceSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const serviceExist = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (serviceExist) {
        throw new ActionError("Le service existe déjà")
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


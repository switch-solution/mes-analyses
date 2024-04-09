"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobCreateSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";


export const createJob = authentifcationActionUserIsAuthorizeToEditProject(JobCreateSchema, async (values: z.infer<typeof JobCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, clientSlug, projectSlug, processusSlug } = JobCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const jobExist = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (jobExist) {
        throw new ActionError("Le job existe déjà")
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

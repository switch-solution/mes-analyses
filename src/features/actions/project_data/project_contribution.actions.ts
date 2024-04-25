"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ContributionCreateSchema, ContributionEditSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
export const createContribution = authentifcationActionUserIsAuthorizeToEditProject(ContributionCreateSchema, async (values: z.infer<typeof ContributionCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, clientSlug, projectSlug, processusSlug } = ContributionCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const salaryExist = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (salaryExist) {
        throw new ActionError("La rubrique existe déjà")
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

export const updateContribution = authentifcationActionUserIsAuthorizeToEditProject(ContributionEditSchema, async (values: z.infer<typeof ContributionEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, slug } = ContributionEditSchema.parse(values)
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

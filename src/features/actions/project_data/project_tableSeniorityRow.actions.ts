"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProjectTableSeniorityRowSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
export const createTableSeniorityRow = authentifcationActionUserIsAuthorizeToEditProject(ProjectTableSeniorityRowSchema, async (values: z.infer<typeof ProjectTableSeniorityRowSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, id, maxMonth, minMonth, percentage, processusSlug, projectSlug, tableSenioritySlug } = ProjectTableSeniorityRowSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

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


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/data/table/${tableSenioritySlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/data/table/${tableSenioritySlug}`)
})

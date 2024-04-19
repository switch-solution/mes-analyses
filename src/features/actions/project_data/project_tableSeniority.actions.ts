"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProjectTableCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
export const createTableSeniority = authentifcationActionUserIsAuthorizeToEditProject(ProjectTableCreateSchema, async (values: z.infer<typeof ProjectTableCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, projectSlug, processusSlug } = ProjectTableCreateSchema.parse(values)
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


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})

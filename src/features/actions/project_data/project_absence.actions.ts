"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProjectAbsenceCreateSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";

export const createAbsence = authentifcationActionUserIsAuthorizeToEditProject(ProjectAbsenceCreateSchema, async (values: z.infer<typeof ProjectAbsenceCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, method, id, dsnId, societyId, label, population, isSocialSecurity, description } = ProjectAbsenceCreateSchema.parse(values)

    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const absenceExist = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (absenceExist) {
        throw new ActionError('L\'absence existe déjà')
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


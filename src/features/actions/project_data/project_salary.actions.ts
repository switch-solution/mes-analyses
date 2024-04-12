"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SalaryCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
export const createSalary = authentifcationActionUserIsAuthorizeToEditProject(SalaryCreateSchema, async (values: z.infer<typeof SalaryCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, clientSlug, projectSlug, processusSlug } = SalaryCreateSchema.parse(values)
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

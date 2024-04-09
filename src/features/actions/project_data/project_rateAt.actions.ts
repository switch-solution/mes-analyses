"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RateAtCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { ProcessusFactory } from "@/src/classes/processusFactory";



export const createRateAt = authentifcationActionUserIsAuthorizeToEditProject(RateAtCreateSchema, async (values: z.infer<typeof RateAtCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, id, label, office, order, rate } = RateAtCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const rateAtExist = await await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (rateAtExist) {
        throw new ActionError("Le rate existe déjà")
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


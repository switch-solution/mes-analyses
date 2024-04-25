"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FreeZoneCreateSchema, FreeZoneEditSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";


export const createFreeZone = authentifcationActionUserIsAuthorizeToEditProject(FreeZoneCreateSchema, async (values: z.infer<typeof FreeZoneCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, type, description, clientSlug, projectSlug, processusSlug } = FreeZoneCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const zoneExist = await processus.valueExist({
        value: id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (zoneExist) {
        throw new ActionError(`Le code ${id} existe déjà sur le projet`)
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


export const updateFreeZone = authentifcationActionUserIsAuthorizeToEditProject(FreeZoneEditSchema, async (values: z.infer<typeof FreeZoneEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, type, description, clientSlug, projectSlug, processusSlug, slug } = FreeZoneEditSchema.parse(values)
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
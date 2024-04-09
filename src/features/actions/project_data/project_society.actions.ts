"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyCreateSchema, SocietyEditSchema, SocietyDeleteSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
export const createSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyCreateSchema, async (values: z.infer<typeof SocietyCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { siren, clientSlug, projectSlug, processusSlug } = SocietyCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const societyExist = await processus.valueExist({
        value: siren,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (societyExist) {
        throw new ActionError("Le siren existe déjà")
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

export const deleteSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyDeleteSchema, async (values: z.infer<typeof SocietyDeleteSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { slug, clientSlug, projectSlug, processusSlug } = SocietyDeleteSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    try {
        await processus.delete(slug)
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})

export const updateSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyEditSchema, async (values: z.infer<typeof SocietyEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { siren, clientSlug, projectSlug, processusSlug } = SocietyEditSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const societyExist = await processus.valueExist({
        value: siren,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (!societyExist) {
        throw new ActionError("Le siren existe déjà")
    }
    try {
        await processus.update({
            values,
            userId,
            projectLabel,
            softwareLabel,
            clientId
        })
    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


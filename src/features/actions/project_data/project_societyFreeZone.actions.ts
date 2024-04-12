"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyFreeZoneCreateSchema, BankEditSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";


export const createSocietyFreeZone = authentifcationActionUserIsAuthorizeToEditProject(SocietyFreeZoneCreateSchema, async (values: z.infer<typeof SocietyFreeZoneCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { societyId, zoneId, clientSlug, projectSlug, processusSlug } = SocietyFreeZoneCreateSchema.parse(values)
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

export const updateBank = authentifcationActionUserIsAuthorizeToEditProject(BankEditSchema, async (values: z.infer<typeof BankEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, iban, bic, clientSlug, projectSlug, processusSlug } = BankEditSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const bankExist = await processus.valueExist({
        value: iban,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (!bankExist) {
        throw new ActionError("La banque  n'existe pas")
    }
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
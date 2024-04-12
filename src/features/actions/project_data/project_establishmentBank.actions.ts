"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { EstablishmentBankCreateSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";


export const createEstablishmentBank = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentBankCreateSchema, async (values: z.infer<typeof EstablishmentBankCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { iban, nic, salary, deposit, expsense, contribution, clientSlug, projectSlug, processusSlug } = EstablishmentBankCreateSchema.parse(values)
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

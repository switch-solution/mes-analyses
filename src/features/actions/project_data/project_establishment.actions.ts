"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { EstablishmentCreateSchema, EstablishmentEditSchema } from "@/src/helpers/definition";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";

export const createEstablishement = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentCreateSchema, async (values: z.infer<typeof EstablishmentCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { nic, clientSlug, projectSlug, processusSlug } = EstablishmentCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const establishementExist = await processus.valueExist({
        value: nic,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (establishementExist) {
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



export const updateEstablishement = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentEditSchema, async (values: z.infer<typeof EstablishmentEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { nic, clientSlug, projectSlug, processusSlug } = EstablishmentEditSchema.parse(values)

    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const establishementExist = await processus.valueExist({
        value: nic,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (!establishementExist) {
        throw new ActionError("L'établisement  n'existe pas")
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



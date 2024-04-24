"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreatePaidLeaveSchema, PaidLeaveEditSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createPaidLeave = authentifcationActionUserIsAuthorizeToEditProject(CreatePaidLeaveSchema, async (values: z.infer<typeof CreatePaidLeaveSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, periodEndDate, valuation, valuationLeave, method, roudingMethod, roudingMethodLeave } = CreatePaidLeaveSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })

    const paidLeaveExist = await prisma.project_Paid_Leave.findFirst({
        where: {

            projectLabel,
            softwareLabel,
            clientId
        }

    })
    if (paidLeaveExist) {
        throw new ActionError("La fiche de paie existe déjà")
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

export const updatePaidLeave = authentifcationActionUserIsAuthorizeToEditProject(PaidLeaveEditSchema, async (values: z.infer<typeof PaidLeaveEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, } = PaidLeaveEditSchema.parse(values)

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
    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)

})


"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreatePaidLeaveSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";

export const createPaidLeave = authentifcationActionUserIsAuthorizeToEditProject(CreatePaidLeaveSchema, async (values: z.infer<typeof CreatePaidLeaveSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, periodEndDate, valuation, valuationLeave, method, roudingMethod, roudingMethodLeave } = CreatePaidLeaveSchema.parse(values)

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


    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


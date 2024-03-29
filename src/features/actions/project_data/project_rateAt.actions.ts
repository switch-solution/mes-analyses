"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RateAtCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";


export const createRateAt = authentifcationActionUserIsAuthorizeToEditProject(RateAtCreateSchema, async (values: z.infer<typeof RateAtCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, nic, projectSlug, id, label, office, order, rate } = RateAtCreateSchema.parse(values)
    const rateAtExist = await prisma.project_Rate_AT.findFirst({
        where: {
            office,
            clientId,
            projectLabel,
            softwareLabel,
        }

    })
    if (rateAtExist) {
        throw new ActionError("Le rate existe déjà")
    }
    const establishementExist = await prisma.project_Establishment.findFirst({
        where: {
            clientId: clientId,
            nic: nic,
            projectLabel,
            softwareLabel
        }
    })
    if (!establishementExist) {
        throw new ActionError("L'établissement n'existe pas")
    }

    try {
        const count = await prisma.project_Rate_AT.count()
        await prisma.project_Rate_AT.create({
            data: {
                id,
                office,
                order,
                rate,
                label,
                clientId,
                establishmentNic: nic,
                createdBy: userId,
                projectLabel,
                softwareLabel,
                societyId: establishementExist.societyId,
                slug: generateSlug(`at-${count + 1}`)
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


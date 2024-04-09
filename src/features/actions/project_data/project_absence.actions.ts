"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateProjectAbsenceSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";

export const createPaidLeave = authentifcationActionUserIsAuthorizeToEditProject(CreateProjectAbsenceSchema, async (values: z.infer<typeof CreateProjectAbsenceSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, method, id, dsnId, societyId, label, population, isSocialSecurity, settlement, description } = CreateProjectAbsenceSchema.parse(values)

    const absenceExist = await prisma.project_Absence.findFirst({
        where: {
            projectLabel,
            softwareLabel,
            clientId,
            id
        }

    })
    if (absenceExist) {
        throw new ActionError("L'asbsence existe déjà")
    }
    try {
        const count = await prisma.project_Absence.count()
        await prisma.project_Absence.create({
            data: {
                id,
                label,
                dsnId,
                clientId,
                projectLabel,
                softwareLabel,
                population,
                method: method ? method : "Heures ouvrés",
                description,
                settlement,
                societyId,
                isSocialSecurity,
                createdBy: userId,
                slug: generateSlug(`Absence-${count + 1}`),
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


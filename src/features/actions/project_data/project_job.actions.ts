"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusExist } from "@/src/query/project.query";


export const createJob = authentifcationActionUserIsAuthorizeToEditProject(JobCreateSchema, async (values: z.infer<typeof JobCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, clientSlug, projectSlug, processusSlug } = JobCreateSchema.parse(values)
    const jobExist = await prisma.project_Job.findFirst({
        where: {
            label,
            clientId,
            projectLabel,
            softwareLabel,
        }
    })
    if (jobExist) {
        throw new ActionError("Le job existe déjà")
    }
    try {
        const count = await prisma.project_Job.count()
        await prisma.project_Job.create({
            data: {
                id,
                label,
                clientId,
                createdBy: userId,
                projectLabel,
                softwareLabel,
                slug: generateSlug(`Job-${count + 1}`)
            }

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})

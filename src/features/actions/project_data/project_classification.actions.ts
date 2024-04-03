"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateClassificationSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";

export const createClassification = authentifcationActionUserIsAuthorizeToEditProject(CreateClassificationSchema, async (values: z.infer<typeof CreateClassificationSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, idcc, id, label, type } = CreateClassificationSchema.parse(values)
    const idccExist = await prisma.project_Idcc.findFirst({
        where: {
            idcc,
            projectLabel,
            softwareLabel,
            clientId
        }
    })
    if (!idccExist) {
        throw new ActionError("La code IDCC n'existe pas")
    }
    try {
        const count = await prisma.project_Classification.count()
        await prisma.project_Classification.create({
            data: {
                idcc: idccExist.idcc,
                label,
                clientId,
                id,
                societyId: idccExist.societyId,
                projectLabel,
                softwareLabel,
                type,
                slug: generateSlug(`Classification_${count + 1}`),
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


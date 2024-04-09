"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validProjectProcessusOrder } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusBySlug } from "@/src/query/project_processus.query";
export const validProjectProcessus = authentifcationActionUserIsAuthorizeToEditProject(validProjectProcessusOrder, async (values: z.infer<typeof validProjectProcessusOrder>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, projectSlug, processusSlug } = validProjectProcessusOrder.parse(values)
    const projectProcessusrExist = await getProjectProcessusBySlug(processusSlug)
    if (!projectProcessusrExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    try {
        await prisma.project_Processus.update({
            where: {
                slug: processusSlug
            },
            data: {
                status: 'En attente de validation'
            }
        })
        const finish = await prisma.project_Processus.count({
            where: {

                clientId,
                projectLabel,
                softwareLabel,
                status: 'En attente de validation'
            }
        })
        const total = await prisma.project_Processus.count({
            where: {
                clientId,
                projectLabel,
                softwareLabel,
            }
        })



    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/`)
})
"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { ApproveCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";

export const approveProcessus = authentifcationActionUserIsAuthorizeToEditProject(ApproveCreateSchema, async (values: z.infer<typeof ApproveCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { processusSlug, clientSlug, projectSlug } = ApproveCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    try {
        await processus.approve({
            processusSlug,
            clientSlug,
            projectSlug,
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    console.log('approveProcessus', processus)
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/`)
})
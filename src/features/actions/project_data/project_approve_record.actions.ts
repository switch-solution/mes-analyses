"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { ApproveRecordCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { prisma } from "@/lib/prisma"
export const approveRecord = authentifcationActionUserIsAuthorizeToEditProject(ApproveRecordCreateSchema, async (values: z.infer<typeof ApproveRecordCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { processusSlug, clientSlug, projectSlug, recordSlug, isApproved, isRefused, slug } = ApproveRecordCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    try {
        await prisma.project_Approve.update({
            where: {
                slug
            },
            data: {
                isApproved,
                isRefused
            }
        })
        /** 
        await processus.approveRecord({
            processusSlug,
            clientSlug,
            projectSlug,
            recordSlug,
            isApproved,
            isRefused
        })
        */
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    console.log('approveProcessus', processus)
    revalidatePath(`/client/${clientSlug}/validation`)
    redirect(`/client/${clientSlug}/validation`)
})
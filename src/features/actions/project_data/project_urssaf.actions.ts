"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OpsEditSchema, OpsCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getDsnOpsById } from "@/src/query/dsn.query";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createUrssaf = authentifcationActionUserIsAuthorizeToEditProject(OpsCreateSchema, async (values: z.infer<typeof OpsCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, ops } = OpsCreateSchema.parse(values)
    const urssaf = await getDsnOpsById(ops)
    if (!urssaf) {
        throw new ActionError("L'urssaf n'existe pas")
    }
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const urssafExist = await processus.valueExist({
        value: urssaf.id,
        clientId,
        projectLabel,
        softwareLabel
    })

    if (urssafExist) {
        throw new ActionError("L'urssaf existe déjà")
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

export const updateUrssaf = authentifcationActionUserIsAuthorizeToEditProject(OpsEditSchema, async (values: z.infer<typeof OpsEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, label, country, address1, address2, address3, address4, postalCode, city, slug } = OpsEditSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const urssafExist = await prisma.project_URSSAF.findUnique({
        where: {
            slug
        }
    })
    if (!urssafExist) {
        throw new ActionError("L'urssaf n'existe pas")
    }
    try {
        await processus.update({
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


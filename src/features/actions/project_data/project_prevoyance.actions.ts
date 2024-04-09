"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OpsEditSchema, OpsCreateSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getDsnOpsById } from "@/src/query/dsn.query";
import { ProcessusFactory } from "@/src/classes/processusFactory";

export const createPrevoyance = authentifcationActionUserIsAuthorizeToEditProject(OpsCreateSchema, async (values: z.infer<typeof OpsCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, ops } = OpsCreateSchema.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })
    const prevoyance = await getDsnOpsById(ops)
    if (!prevoyance) {
        throw new ActionError("La caisse n'existe pas")
    }
    const prevoyanceExist = await processus.valueExist({
        value: prevoyance.id,
        clientId,
        projectLabel,
        softwareLabel
    })
    if (prevoyanceExist) {
        throw new ActionError('La caisse existe déjà')
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
    const urssafExist = await prisma.project_URSSAF.findUnique({
        where: {
            slug
        }
    })
    if (!urssafExist) {
        throw new ActionError("L'urssaf n'existe pas")
    }
    try {
        await prisma.project_URSSAF.update({
            where: {
                slug

            },
            data: {
                address1,
                address2,
                address3,
                address4,
                postalCode,
                city,
                label,
                country,
            }
        })
        const countHistory = await prisma.project_URSSAF_Archived.count({
            where: {
                projectLabel,
                softwareLabel,
                clientId
            }
        })
        await prisma.project_URSSAF_Archived.create({
            data: {
                address1: urssafExist.address1,
                address2: urssafExist.address2,
                address3: urssafExist.address3,
                address4: urssafExist.address4,
                postalCode: urssafExist.postalCode,
                id: urssafExist.id,
                source: urssafExist.source,
                status: urssafExist.status,
                city: urssafExist.city,
                label: urssafExist.label,
                country: urssafExist.country,
                createdBy: urssafExist.createdBy,
                projectLabel: urssafExist.projectLabel,
                softwareLabel: urssafExist.softwareLabel,
                clientId: urssafExist.clientId,
                version: countHistory + 1
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


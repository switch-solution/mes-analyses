"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OpsEditSchema, OpsCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getDsnOpsById } from "@/src/query/dsn.query";

export const createAgircArcco = authentifcationActionUserIsAuthorizeToEditProject(OpsCreateSchema, async (values: z.infer<typeof OpsCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, ops } = OpsCreateSchema.parse(values)
    const agircArrco = await getDsnOpsById(ops)
    if (!agircArrco) {
        throw new ActionError("La caisse n'existe pas")
    }
    const agircArrcoExist = await prisma.project_AGIRC_ARRCO.findFirst({
        where: {
            clientId,
            projectLabel,
            softwareLabel,

        }

    })
    if (agircArrcoExist) {
        throw new ActionError('La caisse existe déjà')
    }


    try {
        const count = await prisma.project_AGIRC_ARRCO.count()
        await prisma.project_AGIRC_ARRCO.create({
            data: {
                clientId,
                address1: agircArrco.address1 ? agircArrco.address1 : '',
                id: agircArrco.id,
                postalCode: agircArrco.codeZip ? agircArrco.codeZip : '',
                city: agircArrco.city ? agircArrco.city : '',
                label: agircArrco.label ? agircArrco.label : '',
                country: 'France',
                createdBy: userId,
                projectLabel,
                softwareLabel,
                slug: generateSlug(`AGIRC-ARRCO-${count + 1}`)
            }
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


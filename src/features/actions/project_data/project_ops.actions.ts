"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OpsCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";

export const createOps = authentifcationActionUserIsAuthorizeToEditProject(OpsCreateSchema, async (values: z.infer<typeof OpsCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, nic, projectSlug, label, country, address1, address2, address3, address4, postalCode, city, type } = OpsCreateSchema.parse(values)
    const rateAtExist = await prisma.project_OPS.findFirst({
        where: {
            clientId,
            projectLabel,
            softwareLabel,
            establishmentNic: nic,
            type
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
        const count = await prisma.project_OPS.count()
        await prisma.project_OPS.create({
            data: {
                clientId,
                type,
                address1,
                address2,
                address3,
                address4,
                postalCode,
                city,
                label,
                country,
                establishmentNic: nic,
                createdBy: userId,
                projectLabel,
                softwareLabel,
                societyId: establishementExist.societyId,
                slug: generateSlug(`ops-${count + 1}`)
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


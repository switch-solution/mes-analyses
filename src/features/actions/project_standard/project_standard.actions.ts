"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyCreateStandardSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusExist } from "@/src/query/project.query";

export const createStandardSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyCreateStandardSchema, async (values: z.infer<typeof SocietyCreateStandardSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, siren, address1, nic, socialReason, address2, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyCreateStandardSchema.parse(values)
    const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
    if (!processusExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    try {
        const count = await prisma.project_Society.count()
        await prisma.project_Society.create({
            data: {
                id,
                siren,
                nic,
                address1,
                address2,
                clientId,
                address3,
                socialReason,
                createdBy: userId,
                city,
                address4,
                country,
                postalCode,
                ape,
                projectLabel: projectLabel,
                softwareLabel: softwareLabel,
                slug: generateSlug(`Societe-${count + 1}`)
            }

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création de la société.")
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/${processusExist.formUrl}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/${processusExist.formUrl}`)
})
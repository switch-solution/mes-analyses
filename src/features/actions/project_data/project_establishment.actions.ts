"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyCreateSchema, EstablishmentCreateSchema, SocietyEditSchema, EstablishmentEditSchema, JobCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusExist } from "@/src/query/project.query";

export const createEstablishement = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentCreateSchema, async (values: z.infer<typeof EstablishmentCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, address1, nic, socialReason, address2, societyId, city, legalStatus, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = EstablishmentCreateSchema.parse(values)
    const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
    if (!processusExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    const societyExist = await prisma.project_Establishment.findFirst({
        where: {
            societyId,
            clientId,
            projectLabel,
            softwareLabel,
            nic
        }
    })
    if (societyExist) {
        throw new ActionError("L'établissement existe déjà")
    }
    try {
        const count = await prisma.project_Establishment.count()
        await prisma.project_Establishment.create({
            data: {
                id,
                nic,
                societyId,
                address1,
                address2,
                legalStatus,
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
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})



export const updateEstablishement = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentEditSchema, async (values: z.infer<typeof EstablishmentEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, address1, nic, slug, socialReason, address2, societyId, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = EstablishmentEditSchema.parse(values)
    const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
    if (!processusExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    const establishementExist = await prisma.project_Establishment.findUnique({
        where: {
            slug
        }
    })
    if (!establishementExist) {
        throw new ActionError("L'établissement n'existe pas")
    }
    try {
        await prisma.project_Establishment.update({
            where: {
                slug
            },
            data: {
                id,
                nic,
                societyId,
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
            }

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})



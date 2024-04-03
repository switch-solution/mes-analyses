"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyCreateSchema, SocietyEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusExist } from "@/src/query/project.query";
export const createSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyCreateSchema, async (values: z.infer<typeof SocietyCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, siren, address1, socialReason, address2, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyCreateSchema.parse(values)
    const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
    if (!processusExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    const societyExist = await prisma.project_Society.findFirst({
        where: {
            siren: siren,
            clientId,
            projectLabel,
            softwareLabel,
        }
    })
    if (societyExist) {
        throw new ActionError("Le siren existe déjà")
    }
    try {
        const count = await prisma.project_Society.count()
        await prisma.project_Society.create({
            data: {
                id,
                siren,
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
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})

export const updateSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyEditSchema, async (values: z.infer<typeof SocietyEditSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, siren, address1, socialReason, address2, slug, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyEditSchema.parse(values)
    const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
    if (!processusExist) {
        throw new ActionError("Le processus n'existe pas")
    }
    const societyBySlug = await prisma.project_Society.findUnique({
        where: {
            slug
        }
    })

    if (!societyBySlug) {
        throw new ActionError("La société n'existe pas")
    }
    if (siren !== societyBySlug.siren) {
        const sirenExist = await prisma.project_Society.findFirst({
            where: {
                siren: siren,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (sirenExist) {
            throw new ActionError("Le siren existe déjà")
        }

        const establishment = await prisma.project_Establishment.findFirst({
            where: {
                societyId: societyBySlug.siren,
                clientId,
                projectLabel,
                softwareLabel,
            },
            select: {
                socialReason: true
            }
        })
        if (establishment) {
            throw new ActionError(`La société est liée à un établissement.Supprimer d'abord établissement : ${establishment.socialReason}`)
        }
    }
    try {
        await prisma.project_Society.update({
            where: {
                slug
            },
            data: {
                id,
                siren,
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


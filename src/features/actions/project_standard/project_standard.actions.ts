"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SocietyCreateSchema, EstablishmentCreateSchema, SocietyEditSchema, EstablishmentEditSchema, JobCreateSchema, RateAtCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getProjectProcessusExist } from "@/src/query/project.query";
export const createSociety = authentifcationActionUserIsAuthorizeToEditProject(SocietyCreateSchema, async (values: z.infer<typeof SocietyCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, siren, address1, nic, socialReason, address2, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyCreateSchema.parse(values)
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
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})

export const createRateAt = authentifcationActionUserIsAuthorizeToEditProject(RateAtCreateSchema, async (values: z.infer<typeof RateAtCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, establishementSlug, projectSlug, id, label, office, order, rate } = RateAtCreateSchema.parse(values)
    const rateAtExist = await prisma.project_Rate_AT.findFirst({
        where: {
            office,
            clientId,
            projectLabel,
            softwareLabel,
        }

    })
    if (rateAtExist) {
        throw new ActionError("Le rate existe déjà")
    }
    const establishementExist = await prisma.project_Establishment.findUnique({
        where: {
            slug: establishementSlug
        }

    })
    if (!establishementExist) {
        throw new ActionError("L'établissement n'existe pas")
    }

    try {
        const count = await prisma.project_Rate_AT.count()
        await prisma.project_Rate_AT.create({
            data: {
                id,
                office,
                order,
                rate,
                label,
                clientId,
                establishmentNic: establishementExist.nic,
                createdBy: userId,
                projectLabel,
                softwareLabel,
                societyId: establishementExist.societyId,
                slug: generateSlug(`at-${count + 1}`)
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


export const createJob = authentifcationActionUserIsAuthorizeToEditProject(JobCreateSchema, async (values: z.infer<typeof JobCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, label, clientSlug, projectSlug, processusSlug } = JobCreateSchema.parse(values)
    const jobExist = await prisma.project_Job.findFirst({
        where: {
            label,
            clientId,
            projectLabel,
            softwareLabel,
        }
    })
    if (jobExist) {
        throw new ActionError("Le job existe déjà")
    }
    try {
        const count = await prisma.project_Job.count()
        console.log({
            id,
            label,
            clientId,
            createdBy: userId,
            projectLabel,
            softwareLabel,
            slug: generateSlug(`Job-${count + 1}`)
        })
        await prisma.project_Job.create({
            data: {
                id,
                label,
                clientId,
                createdBy: userId,
                projectLabel,
                softwareLabel,
                slug: generateSlug(`Job-${count + 1}`)
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
    const { id, siren, address1, nic, socialReason, address2, slug, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyEditSchema.parse(values)
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
            }

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})



export const createEstablishement = authentifcationActionUserIsAuthorizeToEditProject(EstablishmentCreateSchema, async (values: z.infer<typeof EstablishmentCreateSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { id, address1, nic, socialReason, address2, societyId, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = EstablishmentCreateSchema.parse(values)
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



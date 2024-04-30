"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Project } from '@/src/classes/project';
import { z } from 'zod';
import { ActionError, authentifcationActionUserIsAuthorizeToProject } from '@/lib/safe-actions'
export type Row = {
    id: string, value: string, label: string, random: string
}

const dsnDataSchema = z.object({
    processusSlug: z.string({ required_error: "Le processus est requis" }),
    clientSlug: z.string({ required_error: "Le client est requis" }),
    projectSlug: z.string({ required_error: "Le projet est requis" }),
    bankList: z.array(z.object({
        contributionFundBIC: z.string(),
        contributionFundIBAN: z.string(),
    })),
    societyList: z.array(z.object({
        siren: z.string({ required_error: "Le siren est requis" }),
        apen: z.string(),
        address1: z.string(),
        zipCode: z.string(),
        city: z.string(),
    })),
    establishmentList: z.array(z.object({
        siren: z.string({ required_error: "Le siren est requis" }),
        nic: z.string(),
        ape: z.string(),
        address1: z.string(),
        postalCode: z.string().optional(),
        city: z.string(),
        legalStatus: z.string().optional(),

    }))

})

export const dsnData = authentifcationActionUserIsAuthorizeToProject(dsnDataSchema, async (values: z.infer<typeof dsnDataSchema>, { userId, projectLabel, clientId, softwareLabel }) => {
    const { clientSlug, projectSlug, societyList, bankList, processusSlug, establishmentList } = dsnDataSchema.parse(values)
    const project = new Project(projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new ActionError("Le projet n'existe pas")
    }
    try {
        const countSociety = await prisma.project_Society.count()
        await prisma.project_Society.createMany({
            data: societyList.map((society) => ({
                clientId: clientId,
                projectLabel,
                softwareLabel,
                siren: society.siren,
                ape: society.apen,
                address1: society.address1,
                postalCode: society.zipCode,
                city: society.city,
                slug: `Society-${countSociety}`
            }))

        })
        const countEstablishment = await prisma.project_Establishment.count()

        await prisma.project_Establishment.createMany({
            data: establishmentList.map((establishment) => ({
                clientId: clientId,
                projectLabel,
                softwareLabel,
                nic: establishment.nic,
                ape: establishment.ape,
                societyId: establishment.siren,
                address1: establishment.address1,
                postalCode: establishment.postalCode ? establishment.postalCode : "",
                city: establishment.city,
                legalStatus: establishment.legalStatus ? establishment.legalStatus : "",
                slug: `Establishment-${countEstablishment}`
            }))
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }


    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)

})



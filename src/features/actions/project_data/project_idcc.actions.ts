"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateIdccSchema } from "@/src/helpers/definition";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";

export const createIdcc = authentifcationActionUserIsAuthorizeToEditProject(CreateIdccSchema, async (values: z.infer<typeof CreateIdccSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, processusSlug, projectSlug, idcc, nic } = CreateIdccSchema.parse(values)
    const idccExist = await prisma.idcc.findFirst({
        where: {
            code: idcc
        }
    })
    if (!idccExist) {
        throw new ActionError("La code IDDC n'existe pas")
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
    const idccEstablishmentExist = await prisma.project_Establishment_Idcc.findFirst({
        where: {
            idcc: idccExist.code,
            establishmentNic: establishementExist.nic,
            projectLabel,
            softwareLabel,
            clientId
        }
    })
    if (idccEstablishmentExist) {
        throw new ActionError("Le code IDCC est déjà associé à cet établissement")
    }
    try {
        const projectIdccExist = await prisma.project_Idcc.findFirst({
            where: {
                idcc: idccExist.code,
                clientId,
                projectLabel,
                softwareLabel
            }
        })
        if (!projectIdccExist) {
            const count = await prisma.project_Idcc.count()
            await prisma.project_Idcc.create({
                data: {
                    idcc: idcc,
                    label: idccExist.label,
                    clientId,
                    projectLabel,
                    societyId: establishementExist.societyId,
                    softwareLabel,
                    slug: generateSlug(`Standard_Idcc_${count + 1}`),
                }
            })
        }

        await prisma.project_Establishment_Idcc.create({
            data: {
                clientId,
                projectLabel,
                softwareLabel,
                idcc: idccExist.code,
                establishmentNic: establishementExist.nic,
                societyId: establishementExist.societyId,
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}`)
})


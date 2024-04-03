"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FinishRowSchema, CreateApprovRowShema } from "@/src/helpers/definition";
import { authentifcationActionUserIValidatorProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { getValidatorProject } from "@/src/query/project.query"
import { generateSlug } from "@/src/helpers/generateSlug";
import { getProjectProcessusBySlug } from "@/src/query/project_processus.query";
export const updateFinishRow = authentifcationActionUserIValidatorProject(FinishRowSchema, async (values: z.infer<typeof FinishRowSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, projectSlug, table, processusSlug, slug, valueId, valueLabel } = FinishRowSchema.parse(values)
    const processusExist = await getProjectProcessusBySlug(processusSlug)
    if (!processusExist) throw new ActionError("Processus introuvable")
    const validadorProject = await getValidatorProject(projectSlug)
    if (validadorProject.length === 0) throw new ActionError("Aucun validateur trouvé")
    let countApprove = await prisma.project_Approve.count()
    const userApproveList = validadorProject.map(validator => {
        return {
            userId: validator.userId,
            rowSlug: slug,
            table,
            softwareLabel,
            clientId,
            projectLabel,
            createdBy: userId,
            processusLabel: processusExist.label,
            slug: generateSlug(`validation-${countApprove + 1}`),
            valueId,
            valueLabel
        }
    })
    try {
        await prisma.project_Approve.createMany({
            data: userApproveList
        })
        switch (table) {
            case "Project_Society":
                await prisma.project_Society.update({
                    where: {
                        slug: slug
                    },
                    data: {
                        status: "En cours de validation"
                    }
                })
                break;
            case "Project_Job":
                await prisma.project_Job.update({
                    where: {
                        slug: slug
                    },
                    data: {
                        status: "En cours de validation"
                    }
                })
                break
            case "Project_Establisment":
                await prisma.project_Establishment.update({
                    where: {
                        slug: slug
                    },
                    data: {
                        status: "En cours de validation"
                    }
                })
                break
            default:
                throw new ActionError("Table inconnue")

        }
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processusSlug}/`)
})

export const updateApprove = authentifcationActionUserIValidatorProject(CreateApprovRowShema, async (values: z.infer<typeof CreateApprovRowShema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, projectSlug, approveSlug, response } = CreateApprovRowShema.parse(values)

    try {
        await prisma.project_Approve.update({
            where: {
                slug: approveSlug
            },
            data: {
                response: response
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/approve/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/approve/`)
})


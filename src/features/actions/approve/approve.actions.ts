"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FinishRowSchema, CreateApprovRowShema } from "@/src/helpers/definition";
import { authentifcationActionUserIValidatorProject, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getProjectProcessusBySlug } from "@/src/query/project_processus.query";
import { Project } from "@/src/classes/project";
export const updateFinishRow = authentifcationActionUserIValidatorProject(FinishRowSchema, async (values: z.infer<typeof FinishRowSchema>, { clientId, userId, softwareLabel, projectLabel }) => {
    const { clientSlug, projectSlug, processusSlug, slug, valueId, valueLabel } = FinishRowSchema.parse(values)
    const project = new Project(projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new ActionError("Projet introuvable")
    }
    const processusExist = await getProjectProcessusBySlug(processusSlug)
    if (!processusExist) throw new ActionError("Processus introuvable")
    const validadorProject = await project.validatorProjet()
    if (validadorProject.length === 0) throw new ActionError("Aucun validateur trouvé")
    let countApprove = await prisma.project_Approve.count()
    const userApproveList = validadorProject.map(validator => {
        return {
            userId: validator.userId,
            rowSlug: slug,
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



"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { FormCreateSchema, } from '@/src/helpers/definition';
import z from 'zod';
import { ActionError, authentifcationActionUserIsAuthorizeToProject } from "@/lib/safe-actions";
import { DynamicPage } from '@/src/classes/dynamicPage';
import { ProjectData } from "@/src/classes/projectData"
import { prisma } from '@/lib/prisma';
import { Project } from '@/src/classes/project';
import { Security } from '@/src/classes/security';
import { Client } from '@/src/classes/client';
import { FormBaseSchema } from '@/src/helpers/definition';
export const createForm = authentifcationActionUserIsAuthorizeToProject(FormCreateSchema, async (values: z.infer<typeof FormCreateSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, pageSlug, projectSlug, formId, projectPageSlug } = FormCreateSchema.parse(values)
    const project = new Project(projectSlug)
    const projectDetail = await project.projectDetails()
    try {
        const datas = new ProjectData({
            slug: projectPageSlug,
            projectLabel: projectDetail.label,
            softwareLabel: projectDetail.softwareLabel,
            clientId: projectDetail.clientId,
        })
        await datas.createForm({
            formId,
            userId,
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création du formulaire')
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);
})

/**
 * Fonction a retravailler pour utiliser nextSafeAction
 * @param values 
 */
export const createPageData = async (values: { [key: string]: string }) => {
    const { clientSlug, projectSlug, formGroup, pageSlug, blockSlug, formId, projectPageSlug } = values

    try {
        const security = new Security()
        const userIsAuthorize = await security.isAuthorizedInThisProject(values.projectSlug)
        if (!userIsAuthorize) {
            throw new ActionError('Vous n\'êtes pas autorisé à effectuer cette action')
        }
        const project = new Project(projectSlug)
        const projectExist = await project.projectDetails()
        if (!projectExist) {
            throw new ActionError('Le projet n\'existe pas')
        }
        const client = new Client(clientSlug)
        const clientExist = await client.clientExist()
        if (!clientExist) {
            throw new ActionError('Le client n\'existe pas')
        }
        const pageData = new ProjectData({
            slug: projectPageSlug,
            projectLabel: projectExist.label,
            softwareLabel: projectExist.softwareLabel,
            clientId: clientExist.siren
        })
        const projectPageExist = await pageData.projectDataExist()
        if (!projectPageExist) {
            throw new ActionError('La page projet n\'existe pas')
        }
        const page = new DynamicPage(pageSlug)

        const formExist = await page.formExist(formId)
        if (!formExist) {
            throw new ActionError('Le formulaire n\'existe pas')
        }

        const fields = await page.formField(values.formId)
        const saveData = fields.map((field) => {
            const version = formExist.Page_Block.find((block) => block.id === field.blockMasterId)
            if (version) {
                return {
                    formId: values.formId,
                    blockId: field.id,
                    version: version.pageVersion,
                    clientId: clientExist.siren,
                    formGoup: values.formGroup,
                    label: field.label,
                    projectPageId: projectPageExist.id,
                    order: field.order,
                    value: values[field.label] ? values[field.label] : ''
                }
            }

        })

        for (const data of saveData) {
            if (data?.blockId) {
                const dataExist = await prisma.project_Block_Value.findFirst({
                    where: {
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        clientId: data.clientId,
                        blockId: data.blockId,
                        pageVersion: data.version,
                        formGroup: data.formGoup,
                        formId: data.formId,
                        projectPageId: data.projectPageId,
                    }
                })
                if (dataExist) {
                    await prisma.project_Block_Value.update({
                        where: {
                            id: dataExist.id,
                            projectPageId: data.projectPageId
                        },
                        data: {
                            value: data.value
                        }
                    })
                } else {
                    await prisma.project_Block_Value.create({
                        data: {
                            value: data.value,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            clientId: data.clientId,
                            blockId: data.blockId,
                            projectPageId: data.projectPageId,
                            pageVersion: data.version,
                            formGroup: data.formGoup,
                            formId: data.formId,
                            label: data.label,
                            order: data.order,
                        }

                    })
                }



            }
        }

    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création des données')

    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);

}


export const deleteForm = authentifcationActionUserIsAuthorizeToProject(FormBaseSchema, async (values: z.infer<typeof FormBaseSchema>, { userId, clientId, softwareLabel, projectLabel }) => {
    const { clientSlug, pageSlug, projectSlug, formGroup, projectPageSlug } = FormBaseSchema.parse(values)
    const page = new ProjectData({
        slug: projectPageSlug,
        projectLabel,
        softwareLabel,
        clientId
    })
    const pageExist = await page.projectDataExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        await page.deleteForm({
            clientId,
            projectLabel,
            softwareLabel,
            formGroup,
            userId
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la suppression du formulaire')
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/page/${projectPageSlug}`);

})


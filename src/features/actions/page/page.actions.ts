"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PageCreateSchema, BlockPageCreateSchema, BlockPageEditSchema, FormBaseSchema, AddDynamicFormFields } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError, authentifcationActionUserIsAuthorizeToProject } from "@/lib/safe-actions";
import { User } from '@/src/classes/user'
import { Project } from '@/src/classes/project';
import { Security } from '@/src/classes/security';
import { DynamicPage } from '@/src/classes/dynamicPage';
import { prisma } from '@/lib/prisma';
import { Client } from '@/src/classes/client';
export const createPage = authentificationActionUserIsEditorClient(PageCreateSchema, async (values: z.infer<typeof PageCreateSchema>, { userId, clientId, softwareLabel }) => {
    const { label, clientSlug, internalId, softwareSlug } = PageCreateSchema.parse(values)
    const user = new User(userId)
    if (!user) {
        throw new ActionError('Vous n\'êtes pas connecté')
    }
    const page = new DynamicPage('')
    const internalIdExist = await page.internalIdExist({ clientId, softwareLabel, internalId })
    if (internalIdExist) {
        throw new ActionError('Un page avec cet identifiant interne existe déjà')
    }
    try {
        await page.create({
            label,
            clientId,
            userId,
            softwareLabel,
            internalId,
            level: 'Software'
        })

    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création de la page')

    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page`);
})

/**
 * Fonction a retravailler pour utiliser nextSafeAction
 * @param values 
 */
export const createPageData = async (values: { [key: string]: string }) => {
    try {
        const security = new Security()
        const userIsAuthorize = await security.isAuthorizedInThisProject(values.projectSlug)
        if (!userIsAuthorize) {
            throw new ActionError('Vous n\'êtes pas autorisé à effectuer cette action')
        }
        const page = new DynamicPage(values.pageSlug)
        const pageExist = await page.pageExist()
        if (!pageExist) {
            throw new ActionError('La page n\'existe pas')
        }
        const formExist = await page.formExist(values.formId)
        if (!formExist?.Page_Block) {
            throw new ActionError('Le formulaire n\'existe pas')
        }
        const client = new Client(values.clientSlug)
        const clientDetail = await client.clientExist()
        if (!clientDetail) {
            throw new ActionError('Le client n\'existe pas')
        }
        const fields = await page.formField(values.formId)
        const saveData = fields.map((field) => {
            const version = formExist.Page_Block.find((block) => block.id === field.blockMasterId)
            if (version) {
                return {
                    formId: values.formId,
                    blockId: field.id,
                    version: version.pageVersion,
                    clientId: clientDetail.siren,
                    formGoup: values.formGroup,
                    label: field.label,
                    order: field.order,
                    value: values[field.label]
                }
            }

        })
        const project = new Project(values.projectSlug)
        const projectDetail = await project.projectDetails()
        for (const data of saveData) {
            if (data?.blockId) {
                const dataExist = await prisma.project_Block_Value.findFirst({
                    where: {
                        projectLabel: projectDetail.label,
                        softwareLabel: projectDetail.softwareLabel,
                        clientId: data.clientId,
                        blockId: data.blockId,
                        blockVersion: data.version,
                        formGroup: data.formGoup,
                        formId: data.formId,
                    }
                })
                if (dataExist) {
                    await prisma.project_Block_Value.update({
                        where: {
                            id: dataExist.id
                        },
                        data: {
                            value: data.value
                        }
                    })
                } else {
                    await prisma.project_Block_Value.create({
                        data: {
                            value: data.value,
                            projectLabel: projectDetail.label,
                            softwareLabel: projectDetail.softwareLabel,
                            clientId: data.clientId,
                            blockId: data.blockId,
                            blockVersion: data.version,
                            formGroup: data.formGoup,
                            formId: data.formId,
                            label: data.label,
                            order: data.order
                        }

                    })
                }



            }


        }


    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création des données')

    }

}

export const createPageBlock = authentificationActionUserIsEditorClient(BlockPageCreateSchema, async (values: z.infer<typeof BlockPageCreateSchema>, { userId, clientId, softwareLabel }) => {
    const { html, clientSlug, pageSlug, blockMasterId } = BlockPageCreateSchema.parse(values)
    const page = new DynamicPage(pageSlug)
    const pageExist = await page.pageExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        await page.createBlock({
            htmlElement: html,
            blockMasterId,
            user: userId,
            pageVersion: pageExist.version
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/page/${pageSlug}/edit`);

    redirect(`/client/${clientSlug}/editor/page/${pageSlug}/edit`);
})

export const editPageBlock = authentificationActionUserIsEditorClient(BlockPageEditSchema, async (values: z.infer<typeof BlockPageEditSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, blockSlug, pageSlug, label, softwareSlug } = BlockPageEditSchema.parse(values)
    const page = new DynamicPage(pageSlug)
    const pageExist = await page.pageExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        const labelExist = await page.formIdLabelIsUnique(label)
        if (labelExist) {
            throw new ActionError('Un block avec ce label existe déjà')
        }

        await page.editBlock(blockSlug, label)
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la modification du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

})



"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Project } from '@/src/classes/project';
import { PageCreateSchema, BlockPageCreateSchema, UserValidationPage, BlockPageEditSchema, PageValidationCreateSchema, PageEditSchema, PageDuplicateSchema } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError, authentifcationActionUserIsAuthorizeToEditProject, authentifcationActionUserIValidatorProject } from "@/lib/safe-actions";
import { User } from '@/src/classes/user'
import { DynamicPage } from '@/src/classes/dynamicPage';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/src/helpers/generateSlug';

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
            level: 'Logiciel'
        })

    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création de la page')

    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page`);
})

export const duplicatePage = authentifcationActionUserIsAuthorizeToEditProject(PageDuplicateSchema, async (values: z.infer<typeof PageDuplicateSchema>, { userId, clientId, softwareLabel, projectLabel }) => {
    const { clientSlug, pageSlug, projectSlug, label } = PageDuplicateSchema.parse(values)
    const page = new DynamicPage(pageSlug)
    const pageExist = await page.pageExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        await page.duplicatePage({
            label,
            projectLabel,
            softwareLabel,
            clientId

        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la duplication de la page')
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/`);
})


export const createPageBlock = authentificationActionUserIsEditorClient(BlockPageCreateSchema, async (values: z.infer<typeof BlockPageCreateSchema>, { userId, clientId, softwareLabel }) => {
    const { html, clientSlug, pageSlug, blockMasterId, softwareSlug } = BlockPageCreateSchema.parse(values)
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

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);
})

export const deletePageBlock = authentificationActionUserIsEditorClient(BlockPageEditSchema, async (values: z.infer<typeof BlockPageEditSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, blockSlug, pageSlug, softwareSlug } = BlockPageEditSchema.parse(values)
    const page = new DynamicPage(pageSlug)
    const pageExist = await page.pageExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        await page.deletePageBlock(blockSlug)
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la suppression du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

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

        await prisma.page_Block.update({
            where: {
                slug: blockSlug

            },
            data: {
                label
            }
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la modification du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

})


export const editPage = authentificationActionUserIsEditorClient(PageEditSchema, async (values: z.infer<typeof PageEditSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, label, status, pageSlug, softwareSlug } = PageEditSchema.parse(values)
    try {
        const page = new DynamicPage(pageSlug)
        const pageExist = await page.pageExist()
        if (!pageExist) {
            throw new ActionError('La page n\'existe pas')
        }
        await prisma.page.update({
            where: {
                slug: pageSlug

            },
            data: {
                label,
                status
            }

        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la modification de la page')
    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/`);
})

export const pageValidation = authentifcationActionUserIValidatorProject(PageValidationCreateSchema, async (values: z.infer<typeof PageValidationCreateSchema>, { userId, clientId, softwareLabel, projectLabel }) => {
    /** 
    const { clientSlug, projectSlug, projectPageSlug } = PageValidationCreateSchema.parse(values)
    try {
        const project = new Project(projectSlug)
        const projectPage = new ProjectData({
            slug: projectPageSlug,
            clientId,
            softwareLabel,
            projectLabel

        })
        const pageDetail = await projectPage.projectDataExist()
        if (!pageDetail) {
            throw new ActionError('La page n\'existe pas')
        }
        const validators = await project.validatorProjet()
        let countPageValidation = await prisma.page_Validation.count()
        await prisma.page_Validation.createMany({
            data: validators.map((validator) => {
                return {
                    projectPageId: pageDetail.id,
                    userId: validator.userId,
                    slug: generateSlug(`validation-${countPageValidation++}`),
                    createdBy: userId
                }
            })

        })
        await prisma.project_Block_Value.updateMany({
            where: {
                projectPageId: pageDetail.id,
                clientId: clientId,
                softwareLabel: softwareLabel,
                projectLabel: projectLabel

            },
            data: {
                readOnly: true
            }
        })
        await prisma.project_Page.update({
            where: {
                slug: projectPageSlug
            },
            data: {
                status: 'Validé'
            }

        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la validation de la page')

    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/`);
    redirect(`/client/${clientSlug}/project/${projectSlug}/`);*/
})

export const validationUserPage = authentifcationActionUserIValidatorProject(UserValidationPage, async (values: z.infer<typeof UserValidationPage>, { userId, clientId, softwareLabel, projectLabel }) => {
    const { clientSlug, validationSlug, response } = UserValidationPage.parse(values)
    try {

        await prisma.page_Validation.update({
            where: {
                slug: validationSlug
            },
            data: {
                response
            }
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la validation de la page')

    }

    revalidatePath(`/client/${clientSlug}/workflow/`);
    redirect(`/client/${clientSlug}/workflow`);
})






"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PageCreateSchema, BlockPageCreateSchema, BlockPageEditSchema, FormBaseSchema, FormCreateSchema, PageDuplicateSchema, BlockEditSchema, BlockOptionCreateSchema } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError, authentifcationActionUserIsAuthorizeToProject, authentifcationActionUserIsAuthorizeToEditProject } from "@/lib/safe-actions";
import { User } from '@/src/classes/user'
import { DynamicPage } from '@/src/classes/dynamicPage';
import { prisma } from '@/lib/prisma';
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

export const editBlock = authentificationActionUserIsEditorClient(BlockEditSchema, async (values: z.infer<typeof BlockEditSchema>, { userId, clientId, softwareLabel }) => {
    const { clientSlug, pageSlug, blockSlug, min, max, maxLength, minLength, readonly, required, softwareSlug, label } = BlockEditSchema.parse(values)
    try {
        const page = new DynamicPage(pageSlug)
        const pageExist = await page.pageExist()
        if (!pageExist) {
            throw new ActionError('La page n\'existe pas')
        }
        const blockExist = await page.blockExist(blockSlug)
        if (!blockExist) {
            throw new ActionError('Le block n\'existe pas')
        }
        await page.editBlock({
            min,
            max,
            label: label ? label : 'Donner un libellé au bloc',
            maxLength,
            minLength,
            readonly: readonly ? true : false,
            required: required ? true : false,
            blockSlug
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la modification du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);
})

export const createBlockOption = authentificationActionUserIsEditorClient(BlockOptionCreateSchema, async (values: z.infer<typeof BlockOptionCreateSchema>, { userId, clientId, softwareLabel }) => {

    const { clientSlug, pageSlug, blockSlug, softwareSlug, label } = BlockOptionCreateSchema.parse(values)
    const page = new DynamicPage(pageSlug)
    const pageExist = await page.pageExist()
    if (!pageExist) {
        throw new ActionError('La page n\'existe pas')
    }
    try {
        await page.createOption(
            blockSlug,
            label

        )
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création du block')
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);

    redirect(`/client/${clientSlug}/editor/${softwareSlug}/page/${pageSlug}/edit`);
})



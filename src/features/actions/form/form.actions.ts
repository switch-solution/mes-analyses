"use server";
import { Security } from '@/src/classes/security';
import { Client } from '@/src/classes/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { FormCreateSchema, FormEditSchema, FieldCreatSchema, ValueInitSchema, ValueDeleteSchema } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { prisma } from '@/lib/prisma';
import { Form } from '@/src/classes/form';
import { Software } from '@/src/classes/software';
import { Project } from '@/src/classes/project';
import { DynamicPage } from '@/src/classes/dynamicPage';
export const createForm = authentificationActionUserIsEditorClient(FormCreateSchema, async (data: z.infer<typeof FormCreateSchema>, { userId, softwareLabel, clientId }) => {
    const { internalId, label, description, clientSlug, softwareSlug, repository } = FormCreateSchema.parse(data);
    try {
        const count = await prisma.form.count()
        const software = new Software(softwareSlug)
        const softwareExist = await software.softwareExist()
        if (!softwareExist) {
            throw new ActionError('Impossible de trouver le logiciel');
        }
        if (repository) {
            const repositoryExist = await software.repositoryExist({
                clientId,
                repositorySlug: repository
            })
            if (repositoryExist) {
                throw new ActionError('Le référentiel existe déjà');
            }
        }


        await prisma.form.create({
            data: {
                internalId,
                label,
                description,
                id: `LOG_FORM_${count + 1}`,
                createdBy: userId,
                version: 1,
                slug: `LOG_FORM_${count + 1}`,
                level: 'Logiciel',
                softwareLabel,
                clientId,
                repository
            }
        })
    } catch (err) {
        throw new ActionError('Impossible de créer le formulaire');
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form`);

})



export const editForm = authentificationActionUserIsEditorClient(FormEditSchema, async (data: z.infer<typeof FormEditSchema>, { userId, softwareLabel, clientId }) => {
    const { label, description, clientSlug, softwareSlug, formSlug, status, repository } = FormEditSchema.parse(data);
    const form = new Form(formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
        throw new ActionError('Impossible de trouver le formulaire');
    }

    try {
        const software = new Software(softwareSlug)
        const softwareExist = await software.softwareExist()
        if (!softwareExist) {
            throw new ActionError('Impossible de trouver le logiciel');
        }
        if (repository) {
            const repositoryExist = await software.repositoryExist({
                clientId,
                repositorySlug: repository
            })
            if (repositoryExist) {
                throw new ActionError('Le référentiel existe déjà');
            }
        }
        await form.editForm({
            label,
            description,
            status,
            repository

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string);
    }

    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form`);

})


export const createField = authentificationActionUserIsEditorClient(FieldCreatSchema, async (data: z.infer<typeof FieldCreatSchema>, { userId, softwareLabel, clientId }) => {
    const { label, type, formSlug, softwareSlug, clientSlug } = FieldCreatSchema.parse(data);
    const form = new Form(formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
        throw new ActionError('Impossible de trouver le formulaire');
    }
    try {
        await form.addField({
            formId: formExist.id,
            formVersion: formExist.version,
            label,
            type,
            userId
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Impossible de créer le champ')
    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/`);

})


export const editValue = async (values: { [key: string]: string }) => {
    const { formSlug, softwareSlug, clientSlug, settingSlug, projectSlug, formGroup } = values;
    if (!projectSlug && !settingSlug) {
        throw new ActionError('Impossible de trouver le projet ou le paramètre');
    }
    const form = new Form(formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
        throw new ActionError('Impossible de trouver le formulaire');
    }
    const client = new Client(clientSlug);
    const clientExist = await client.clientExist();
    if (!clientExist) {
        throw new ActionError('Impossible de trouver le client');
    }
    const security = new Security();
    const user = await security.userIsValid();
    if (!user) {
        throw new ActionError('Impossible de trouver l\'utilisateur');
    }
    if (settingSlug) {
        const userIsEditorClient = await security.isEditorClient(clientExist.siren)
        if (!userIsEditorClient) {
            throw new ActionError('Vous n\'êtes pas autorisé à effectuer cette action')
        }
    }
    if (projectSlug) {
        const project = new Project(projectSlug);
        const projectExist = await project.projectExist();
        if (!projectExist) {
            throw new ActionError('Impossible de trouver le projet');
        }
        const userIsEditorInThisProject = await security.isEditorInThisProject(projectSlug)
        if (!userIsEditorInThisProject) {
            throw new ActionError('Vous n\'êtes pas autorisé à effectuer cette action')
        }
    }
    try {
        await form.editValue({
            formGroup,
            data: values
        })
    } catch (err) {

    }
    if (projectSlug) {

    }
    if (settingSlug) {
        revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
        redirect(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
    }
}

export const deleteValue = authentificationActionUserIsEditorClient(ValueDeleteSchema, async (data: z.infer<typeof ValueDeleteSchema>, { userId, softwareLabel, clientId }) => {
    const { formSlug, softwareSlug, clientSlug, formGroup, settingSlug, mode, projectSlug, pageSlug } = ValueDeleteSchema.parse(data);
    try {
        const form = new Form(formSlug);
        const formExist = await form.formExist();
        if (!formExist) {
            throw new ActionError('Impossible de trouver le formulaire');
        }
        await form.deleteValue(formGroup)
    } catch (err) {
        console.error(err)
        throw new ActionError('Impossible de supprimer la valeur')
    }
    if (mode === 'Editeur' && settingSlug) {
        revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
        redirect(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
    }
    if (mode === 'Project' && projectSlug && pageSlug) {
        revalidatePath(`/client/${clientSlug}/project/${projectSlug}/${pageSlug}/`);
        redirect(`/client/${clientSlug}/project/${projectSlug}/${pageSlug}/`);
    }
})

export const createValueInit = authentificationActionUserIsEditorClient(ValueInitSchema, async (data: z.infer<typeof ValueInitSchema>, { userId, softwareLabel, clientId }) => {
    const { formSlug, softwareSlug, clientSlug, mode, projectSlug, settingSlug, pageSlug, projectPageSlug } = ValueInitSchema.parse(data);
    const form = new Form(formSlug);
    const formExist = await form.formExist();
    if (!formExist) {
        throw new ActionError('Impossible de trouver le formulaire');
    }
    let projectLabel = null;
    if (projectSlug) {
        const project = new Project(projectSlug);
        const projectDetail = await project.projectDetails();
        if (!projectDetail) {
            throw new ActionError('Impossible de trouver le projet');
        }
        projectLabel = projectDetail.label;
    }
    let pageId = null;
    if (pageSlug) {
        const page = new DynamicPage(pageSlug);
        const pageExist = await page.pageExist();
        if (!pageExist) {
            throw new ActionError('Impossible de trouver la page');
        }
        pageId = pageExist.id;
    }


    try {
        await form.initValue({
            clientId,
            projectLabel,
            softwareLabel,
            mode,
            pageId
        })
    } catch (err) {
        throw new ActionError('Impossible de créer la valeur initiale')
    }
    if (mode === 'Editeur' && settingSlug) {
        revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
        redirect(`/client/${clientSlug}/editor/${softwareSlug}/dynamic/${settingSlug}/`);
    }
    if (mode === 'Project' && projectSlug && projectPageSlug) {
        revalidatePath(`/client/${clientSlug}/project/${projectSlug}/${projectPageSlug}/`);
        redirect(`/client/${clientSlug}/project/${projectSlug}/${projectPageSlug}/`);
    }

})


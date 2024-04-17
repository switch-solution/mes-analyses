"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProjectCreateSchema, ProjectUserCreateSchema } from '@/src/helpers/definition';
import z from 'zod';
import { authentificationActionUserIsEditorClient, authentifcationActionUserIsAuthorizeToAdminProject, ActionError } from "@/lib/safe-actions";
import { getSoftwareBySlug } from '@/src/query/software.query';
import { User } from '@/src/classes/user'
import { Project } from '@/src/classes/project';
export const createProjet = authentificationActionUserIsEditorClient(ProjectCreateSchema, async (values: z.infer<typeof ProjectCreateSchema>, { userId, clientId }) => {
    const { label, description, clientSlug, role } = ProjectCreateSchema.parse(values)
    const user = new User(userId)
    if (!user) {
        throw new ActionError('Vous n\'êtes pas connecté')
    }
    const mySoftwareSlug = await user.getMySoftwareActive()
    const software = await getSoftwareBySlug(mySoftwareSlug.softwareSlug)
    const project = new Project('')
    const projectExist = await project.projectLabelExistForThisSoftware({
        projectLabel: label,
        softwareLabel: software.label,
        clientId
    })
    if (projectExist) {
        throw new ActionError('Un projet avec ce nom existe déjà pour ce logiciel')
    }

    try {
        const projectBdd = await project.create({
            label,
            description,
            softwareLabel: software.label,
            clientId,
            userId,
            role
        })
        if (!projectBdd) {
            throw new ActionError('Erreur lors de la création du projet')
        }
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création du projet')

    }

    revalidatePath(`/client/${clientSlug}/project/${project.slug}`);

    redirect(`/client/${clientSlug}/project/${project.slug}`);

})

export const createProjetUser = authentifcationActionUserIsAuthorizeToAdminProject(ProjectUserCreateSchema, async (values: z.infer<typeof ProjectUserCreateSchema>, { userId, projectLabel, softwareLabel }) => {
    const { newUserId, clientSlug, projectSlug, role, isAdministrator, isEditor, isValidator } = ProjectUserCreateSchema.parse(values)
    const project = new Project(projectSlug)
    try {
        await project.addUser({
            userId,
            newUserId,
            role,
            isAdministrator: isAdministrator ? true : false,
            isEditor: isEditor ? true : false,
            isValidator: isValidator ? true : false
        })
    } catch (err) {
        console.error(err)
        throw new ActionError('Erreur lors de la création du projet')
    }
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/user`);

    redirect(`/client/${clientSlug}/project/${projectSlug}/user`);
})

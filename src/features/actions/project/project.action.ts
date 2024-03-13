"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProjectCreateSchema } from '@/src/helpers/definition';
import { generateSlug } from '@/src/helpers/generateSlug';
import z from 'zod';
import { createLog } from '@/src/query/logger.query';
import type { Logger } from '@/src/helpers/type';
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { copyBook, copyTask } from '@/src/query/project.query';
export const createProjet = authentificationActionUserIsEditorClient(ProjectCreateSchema, async (values: z.infer<typeof ProjectCreateSchema>, { userId, clientId }) => {

    const { label, description, softwareLabel, clientSlug, role } = ProjectCreateSchema.parse(values)
    try {
        const countProjects = await prisma.project.count()
        const projectNumber = `00000000000000000000${countProjects ? countProjects + 1 : 1}`
        const projectSlug = `${projectNumber.slice(-10)}`
        const slug = await generateSlug(`${projectSlug}-${label}`)
        const projectIsUnique = await prisma.project.findFirst({
            where: {
                label,
                clientId,
                softwareLabel
            }
        })
        if (projectIsUnique) {
            const log: Logger = {
                level: "error",
                scope: "project",
                message: `Le projet ${slug} existe déjà a été créé`,
                clientId: clientId,
            }
            await createLog(log)
            throw new ActionError("Il existe déjà un projet avec le même libellé sur ce logiciel.")
        } else {
            const project = await prisma.project.create({
                data: {
                    label: label,
                    description: description,
                    softwareLabel: softwareLabel,
                    clientId: clientId,
                    createdBy: userId,
                    status: 'actif',
                    slug: slug,
                    UserProject: {
                        create: {
                            userId: userId,
                            isAdmin: true,
                            isEditor: true,
                            isValidator: true,
                            createdBy: userId,
                            team: 'Editeur',
                            role: role
                        }
                    },
                },
            })
            await copyBook(project.slug)
            await copyTask(project.slug)
            const log: Logger = {
                level: "info",
                scope: "project",
                message: `Le projet ${label} a été créé`,
                clientId: clientId,
                projectLabel: project.label,
                projectSoftwareLabel: project.softwareLabel
            }
            await createLog(log)
        }
    } catch (err: unknown) {
        console.log(err)
        throw new ActionError(err as string)
    }
    const project = await prisma.project.findFirstOrThrow({
        where: {
            label: label,
            softwareLabel: softwareLabel,
            clientId: clientId
        }
    })

    revalidatePath(`/client/${clientSlug}/project/${project.slug}/`);

    redirect(`/client/${clientSlug}/project/${project.slug}/`);

})

"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ImportBookProjectSchema, ValidationBookSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError, authentifcationActionUserIValidatorProject } from "@/lib/safe-actions";
import { getSoftwareBookBySlug } from "@/src/query/software_book.query";
import { generateSlug } from "@/src/helpers/generateSlug";
import { getProjectBookBySlug } from "@/src/query/project_book.query";
export const importBookProject = authentifcationActionUserIsAuthorizeToEditProject(ImportBookProjectSchema, async (values: z.infer<typeof ImportBookProjectSchema>, { clientId, userId, projectLabel, softwareLabel }) => {
    const { label, bookSlug, projectSlug, clientSlug } = ImportBookProjectSchema.parse(values)

    const bookExist = await getSoftwareBookBySlug(bookSlug)
    if (!bookExist) throw new ActionError("Le livre n'existe pas")
    try {
        const slug = await generateSlug(label)
        await prisma.project_Book.create({
            data: {
                label,
                clientId,
                projectLabel,
                createdBy: userId,
                isHold: true,
                description: bookExist.description,
                projectSoftwareLabel: softwareLabel,
                slug

            }
        })
        const log: Logger = {
            level: "info",
            message: `Ajout du livre ${label}`,
            scope: "project",
            clientId,
            projectLabel,
            projectSoftwareLabel: softwareLabel,
        }
        await createLog(log)

    } catch (err) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur de création du livre ${label}`,
            scope: "project",
            clientId,
            projectLabel,
            projectSoftwareLabel: softwareLabel,
        }
        await createLog(log)

    }

    revalidatePath(`/client/${clientSlug}/administrator/software/`)
    redirect(`/client/${clientSlug}/administrator/software/`)

})

export const validationProjectBook = authentifcationActionUserIValidatorProject(ValidationBookSchema, async (values: z.infer<typeof ValidationBookSchema>, { clientId, userId, projectLabel, softwareLabel }) => {

    const { bookSlug, projectSlug, clientSlug, isValid, comment } = ValidationBookSchema.parse(values)
    const bookExist = await getProjectBookBySlug(bookSlug)
    if (!bookExist) throw new ActionError("Le livre n'existe pas")
    try {
        await prisma.project_Book_WorkFlow.upsert({
            where: {
                userId_projectLabel_softwareLabel_clientId_bookLabel: {
                    userId,
                    bookLabel: bookExist.label,
                    projectLabel: projectLabel,
                    clientId,
                    softwareLabel: softwareLabel
                }
            },
            update: {
                isValid,
                comment: comment || ""
            },
            create: {
                userId,
                bookLabel: bookExist.label,
                projectLabel,
                clientId,
                softwareLabel,
                isValid,
                comment: comment || ""
            }
        })
    } catch (err) {
        console.error(err)
        const log: Logger = {
            level: "error",
            message: `Erreur de validation du livre ${bookExist.label}`,
            scope: "project",
            clientId,
            projectLabel,
            projectSoftwareLabel: softwareLabel,
        }
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/workflow/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/workflow/`)

})
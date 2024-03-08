"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ImportBookProjectSchema } from "@/src/helpers/definition";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { getSoftwareBookBySlug } from "@/src/query/software_book.query";
import { getProjectBySlug } from "@/src/query/project.query";
import { generateSlug } from "@/src/helpers/generateSlug";
export const importBookProject = authentifcationActionUserIsAuthorizeToEditProject(ImportBookProjectSchema, async (values: z.infer<typeof ImportBookProjectSchema>, { clientId, userId, projectLabel, softwareLabel }) => {
    const { label, bookSlug, projectSlug, clientSlug } = ImportBookProjectSchema.parse(values)
    const projectExist = await getProjectBySlug(projectSlug)
    if (!projectExist) throw new ActionError("Le projet n'existe pas")
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
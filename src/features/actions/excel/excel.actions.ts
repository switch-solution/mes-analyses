"use server";
import { authentifcationAction, ActionError } from "@/lib/safe-actions";
import z from "zod";
import { ExcelFileSchema } from "@/src/helpers/definition";
import { createExcelFile } from "@/lib/exceljs";
import { ensureDirectoryExistence } from "@/src/helpers/createTmpFile";
import { User } from "@/src/classes/user";
import path from "path";
import { put } from '@vercel/blob';
import fs from 'fs';
export const newExcelFile = authentifcationAction(ExcelFileSchema, async (values: z.infer<typeof ExcelFileSchema>, userId) => {
    const dir = ensureDirectoryExistence();
    const excelFile = await createExcelFile();
    const user = new User(userId);
    let blob
    try {
        const { query } = await ExcelFileSchema.parseAsync(values)
        switch (query) {
            case "projects":
                const projectFileName = "projects.xlsx"
                const projects = await user.getMyProject();
                const projectsList = projects.map(project => {
                    return {
                        label: project.project.label,
                        createdAt: project.project.createdAt,
                        softwareLabel: project.project.softwareLabel,
                        isOpen: project.project.isOpen,
                        isPending: project.project.isPending,
                        isApproved: project.project.isApproved
                    }
                })
                const isOpen = excelFile.addWorksheet('En cours')
                const isFinish = excelFile.addWorksheet('Terminés')
                const isPending = excelFile.addWorksheet('En attente')
                const columns = [
                    { header: 'Libellé', key: 'label' },
                    { header: 'Date de début', key: 'createdAt' },
                    { header: 'Logiciel', key: 'softwareLabel' },
                ]

                isOpen.columns = columns
                isFinish.columns = columns
                isPending.columns = columns

                isOpen.addRows(projectsList.filter(project => project.isOpen === true))
                isFinish.addRows(projectsList.filter(project => project.isApproved === true))
                isPending.addRows(projectsList.filter(project => project.isPending === true))
                const pathProjectsFile = path.join(dir, projectFileName)
                await excelFile.xlsx.writeFile(pathProjectsFile)
                const file = fs.readFileSync(pathProjectsFile)
                blob = await put(projectFileName, file, { access: 'public' });

                break

            default:
                throw new ActionError("Requete invalide")

        }
        return blob.downloadUrl

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

})
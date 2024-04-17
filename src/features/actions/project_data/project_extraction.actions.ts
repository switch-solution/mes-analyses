"use server";

import { ProcessusExtraction } from "@/src/helpers/definition";
import { ensureDirectoryExistence } from "@/src/helpers/createTmpFile";
import { createExcelFile } from "@/lib/exceljs";
import { User } from "@/src/classes/user";
import { authentifcationActionUserIsAuthorizeToEditProject, ActionError } from "@/lib/safe-actions";
import { ProcessusFactory } from "@/src/classes/processusFactory";
import z from "zod";
import path from "path";
import { put } from '@vercel/blob';
import fs from 'fs';
export const extractionProcessus = authentifcationActionUserIsAuthorizeToEditProject(ProcessusExtraction, async (values: z.infer<typeof ProcessusExtraction>, { clientId, userId, softwareLabel, projectLabel }) => {
    const dir = ensureDirectoryExistence();
    const excelFile = await createExcelFile();
    const user = new User(userId);
    let blob

    const { clientSlug, projectSlug, processusSlug } = ProcessusExtraction.parse(values)
    const processus = ProcessusFactory.create({
        processusSlug,
        clientId,
        projectLabel,
        sofwareLabel: softwareLabel
    })


    try {
        const processusExtraction = await processus.extraction()
        if (!processusExtraction) {
            throw new ActionError("Extraction impossible")
        }
        const processusFileName = `${processusSlug}.xlsx`
        const datas = excelFile.addWorksheet('Données')
        const archived = excelFile.addWorksheet('Historique')

        //Gestion des colonnes

        const columns = processusExtraction.inputs.map(input => {
            return ({
                header: input.label,
                key: input.zodLabel
            })

        })

        if (columns.length === 0) {
            throw new ActionError("Aucune donnée à extraire")
        }

        datas.columns = columns
        archived.columns = columns
        //Création des lignes
        datas.addRows(processusExtraction.datas)
        archived.addRows(processusExtraction.archived)

        //Enregistrement du fichier
        const pathProcessFile = path.join(dir, processusFileName)

        await excelFile.xlsx.writeFile(pathProcessFile)



        const file = fs.readFileSync(pathProcessFile)
        blob = await put(processusFileName, file, { access: 'public' });
        return blob.downloadUrl

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }



})

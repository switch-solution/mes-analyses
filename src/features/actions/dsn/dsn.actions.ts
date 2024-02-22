"use server";
import { prisma } from "@/lib/prisma";
import { extractDsn } from "@/lib/dsnParser";
import { put } from '@vercel/blob';
import { del } from '@vercel/blob';
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import https from 'https';
import fs from 'node:fs';
import path from "path";
import { userIsValid } from "@/src/query/security.query";
import { getDsnExist, getDsnClientId } from "@/src/query/dsn.query";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type"
import { getIdccByCode } from "@/src/query/idcc.query";
export async function uploadDsn(projectId: string, formData: FormData) {
    const userId = await userIsValid()
    if (!userId) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
    }

    const dsnFile = formData.get('dsn') as File;

    //Upload file to blob storage
    const blob = await put(dsnFile.name, dsnFile, {
        access: 'public'
    });

    const fodlderTmpExist = fs.existsSync(path.join(process.cwd(), '/tmp'))
    if (!fodlderTmpExist) {
        fs.mkdirSync(path.join(process.cwd(), '/tmp'));
    }
    const file = fs.createWriteStream(path.join(process.cwd(), '/tmp', blob.pathname));

    //Download file from blob storage
    const download = new Promise((resolve, reject) => {
        https.get(blob.downloadUrl, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close();
                console.log('Fichier téléchargé avec succès');
                resolve(undefined);
            });
        }).on('error', function (err) {
            fs.unlink(path.join(process.cwd(), '/tmp', blob.pathname), () => { });
            console.error(err.message);
            reject(err);
        });
    });

    await download;
    const dsn = await extractDsn(path.join(process.cwd(), '/tmp', blob.pathname));
    const dsnExist = await getDsnExist({
        projectId,
        siren: dsn.society.siren,
        nic: dsn.society.nic,
        month: dsn.dsn.month,
        fraction: dsn.statement.fractionDsn
    })
    if (dsnExist) {
        throw new Error('La DSN existe déjà pour ce projet');
    }
    try {
        const dsnId = await prisma.dsn.create({
            data: {
                siren: dsn.society.siren,
                nic: dsn.society.nic,
                version: dsn.dsn.dsnVersion,
                fraction: dsn.statement.fractionDsn,
                month: dsn.dsn.month,
                type: dsn.statement.typeDsn,
                projectId: projectId,
                createdBy: userId,

            }
        })
        for (let establishment of dsn.society.establishments) {
            await prisma.dsn_Establishment.create({
                data: {
                    nic: establishment.nic,
                    apet: establishment.apet,
                    address1: establishment.adress1,
                    address2: establishment?.adress2,
                    address3: establishment?.adress3,
                    city: establishment.city,
                    codeZip: establishment.codeZip,
                    country: establishment.country,
                    createdBy: userId,
                    dsnSiren: dsnId.siren,
                    dsnNic: dsnId.nic,
                    dsnVersion: dsnId.version,
                    dsnFraction: dsnId.fraction,
                    dsnMonth: dsnId.month,
                    dsnProjectId: projectId,
                }
            })
        }
        const setJobs = new Set<string>()
        for (let job of dsn.job) {
            if (!setJobs.has(job)) {
                setJobs.add(job)
                await prisma.dsn_Job.create({
                    data: {
                        label: job,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        dsnProjectId: projectId,
                        createdBy: userId,
                    }
                })
            }
        }
        const setIdcc = new Set<string>()
        for (let idcc of dsn.idcc) {
            if (!setIdcc.has(idcc)) {
                setIdcc.add(idcc)
                const getIdcc = await getIdccByCode(idcc)
                await prisma.dsn_Idcc.create({
                    data: {
                        code: idcc,
                        label: getIdcc.label,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        dsnProjectId: projectId,
                        createdBy: userId,
                    }
                })
            }
        }
        const clientId = await getDsnClientId({
            projectId,
            siren: dsn.society.siren,
            nic: dsn.society.nic,
            month: dsn.dsn.month,
            fraction: dsn.statement.fractionDsn
        })
        const log: Logger = {
            level: 'info',
            message: `La DSN ${dsn.society.siren}-${dsn.society.nic}-${dsn.dsn.month}-${dsn.statement.fractionDsn} a été ajoutée`,
            projectId: projectId,
            clientId: clientId,
            scope: 'dsn',
        }
        await createLog(event);
    } catch (err) {
        console.error(err);
    }

    //delete file from blob storage
    await del(blob.url);

    revalidatePath(`/project/${projectId}/dsn`);
    redirect(`/project/${projectId}/dsn`);
    return blob;
}



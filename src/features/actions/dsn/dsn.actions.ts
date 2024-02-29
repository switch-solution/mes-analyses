"use server";
import { prisma } from "@/lib/prisma";
import { extractDsn } from "@/lib/dsnParser";
import { put } from '@vercel/blob';
import { del } from '@vercel/blob';
import https from 'https';
import fs from 'node:fs';
import path from "path";
import { userIsAuthorizeInThisProject, userIsValid } from "@/src/query/security.query";
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type"
import { getIdccByCode } from "@/src/query/idcc.query";
import { getProjectBySlug } from "@/src/query/project.query";
import { getClientBySiren } from "@/src/query/client.query";
import { importDataDsnInForm } from "@/src/query/dsn.query";
export async function uploadDsn(projectSlug: string, formData: FormData) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")

    const project = await getProjectBySlug(projectSlug)
    if (!project) throw new Error("Le projet n'existe pas")

    const clientSlug = await getClientBySiren(project.clientId)
    if (!clientSlug) throw new Error("Le client n'existe pas")

    const dsnFile = formData.get('DSN') as File;

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

    try {
        const dsnId = await prisma.dsn.upsert({
            where: {
                siren_nic_month_version_fraction: {
                    siren: dsn.society.siren,
                    nic: dsn.society.nic,
                    version: dsn.dsn.dsnVersion,
                    fraction: dsn.statement.fractionDsn,
                    month: dsn.dsn.month
                }
            },
            update: {
                siren: dsn.society.siren,
                nic: dsn.society.nic,
                version: dsn.dsn.dsnVersion,
                fraction: dsn.statement.fractionDsn,
                month: dsn.dsn.month,
                type: dsn.statement.typeDsn,
                projectLabel: project.label,
                clientId: project.clientId,
                createdBy: userIsAuthorized.userId,
                projectSoftwareLabel: project.softwareLabel,
                updatedAt: new Date()
            },
            create: {
                siren: dsn.society.siren,
                nic: dsn.society.nic,
                version: dsn.dsn.dsnVersion,
                fraction: dsn.statement.fractionDsn,
                month: dsn.dsn.month,
                type: dsn.statement.typeDsn,
                projectLabel: project.label,
                clientId: project.clientId,
                createdBy: userIsAuthorized.userId,
                projectSoftwareLabel: project.softwareLabel,

            }
        })
        for (let establishment of dsn.society.establishments) {
            await prisma.dsn_Establishment.upsert({
                where: {
                    nic_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction: {
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        nic: establishment.nic,
                        dsnMonth: dsnId.month,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction
                    }
                },
                update: {
                    nic: establishment.nic,
                    apet: establishment.apet,
                    address1: establishment.adress1,
                    address2: establishment?.adress2,
                    address3: establishment?.adress3,
                    city: establishment.city,
                    codeZip: establishment.codeZip,
                    country: establishment.country,
                    createdBy: userIsAuthorized.userId,
                    dsnSiren: dsnId.siren,
                    dsnNic: dsnId.nic,
                    dsnVersion: dsnId.version,
                    dsnFraction: dsnId.fraction,
                    dsnMonth: dsnId.month,
                    updatedAt: new Date()
                },
                create: {
                    nic: establishment.nic,
                    apet: establishment.apet,
                    address1: establishment.adress1,
                    address2: establishment?.adress2,
                    address3: establishment?.adress3,
                    city: establishment.city,
                    codeZip: establishment.codeZip,
                    country: establishment.country,
                    createdBy: userIsAuthorized.userId,
                    dsnSiren: dsnId.siren,
                    dsnNic: dsnId.nic,
                    dsnVersion: dsnId.version,
                    dsnFraction: dsnId.fraction,
                    dsnMonth: dsnId.month,
                }
            })
        }
        const setJobs = new Set<string>()
        for (let job of dsn.job) {
            if (!setJobs.has(job)) {
                setJobs.add(job)
                await prisma.dsn_Job.upsert({
                    where: {
                        label_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction: {
                            dsnSiren: dsnId.siren,
                            dsnNic: dsnId.nic,
                            label: job,
                            dsnMonth: dsnId.month,
                            dsnVersion: dsnId.version,
                            dsnFraction: dsnId.fraction
                        }
                    },
                    update: {
                        label: job,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        updatedAt: new Date(),
                    },
                    create: {
                        label: job,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        createdBy: userIsAuthorized.userId,
                    }
                })
            }
        }
        const setIdcc = new Set<string>()
        for (let idcc of dsn.idcc) {
            if (!setIdcc.has(idcc)) {
                setIdcc.add(idcc)
                const getIdcc = await getIdccByCode(idcc)
                await prisma.dsn_Idcc.upsert({
                    where: {
                        code_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction: {
                            dsnSiren: dsnId.siren,
                            dsnNic: dsnId.nic,
                            code: idcc,
                            dsnMonth: dsnId.month,
                            dsnVersion: dsnId.version,
                            dsnFraction: dsnId.fraction

                        }
                    },
                    update: {
                        code: idcc,
                        label: getIdcc.label,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        updatedAt: new Date(),
                    },
                    create: {
                        code: idcc,
                        label: getIdcc.label,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        createdBy: userIsAuthorized.userId,
                    }
                })
            }
        }

        await importDataDsnInForm(projectSlug)

        const log: Logger = {
            level: 'info',
            message: `La DSN ${dsn.society.siren}-${dsn.society.nic}-${dsn.dsn.month}-${dsn.statement.fractionDsn} a été ajoutée`,
            scope: 'dsn',
            projectLabel: project.label,
            clientId: project.clientId,
        }
        await createLog(log);
    } catch (err) {
        console.error(err);
    }

    //delete file from blob storage
    await del(blob.url);
    return
}



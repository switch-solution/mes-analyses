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
    //Delete file
    await del(blob.url);

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
                    clientId_siret: {
                        clientId: project.clientId,
                        siret: `${dsn.society.siren}${establishment.nic}`
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
                    siret: `${dsn.society.siren}${establishment.nic}`,
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
                    clientId: project.clientId,
                    dsnVersion: dsnId.version,
                    dsnFraction: dsnId.fraction,
                    dsnMonth: dsnId.month,
                    siret: `${dsn.society.siren}${establishment.nic}`
                }
            })
        }
        for (let mutual of dsn.mutual) {
            await prisma.dsn_Mutual.upsert({
                where: {
                    contractId_clientId_siren: {
                        contractId: mutual.contractId ? mutual.contractId : '',
                        clientId: project.clientId,
                        siren: dsnId.siren
                    }
                },
                update: {
                    contractId: mutual.contractId,
                    organisme: mutual.organisme,
                    delegate: mutual.delegate,
                    covererd: mutual.covererd,
                    techId: mutual.techId,
                    clientId: project.clientId,
                    siren: dsnId.siren,
                },
                create: {
                    contractId: mutual.contractId ? mutual.contractId : '',
                    organisme: mutual.organisme,
                    delegate: mutual.delegate,
                    covererd: mutual.covererd,
                    techId: mutual.techId,
                    clientId: project.clientId,
                    siren: dsnId.siren,

                }
            })

        }

        for (let rateAt of dsn.rateAt) {
            await prisma.dsn_RateAt.upsert({
                where: {
                    code_siret_clientId: {
                        code: rateAt.code,
                        siret: rateAt.siret,
                        clientId: project.clientId
                    }
                },
                update: {
                    code: rateAt.code,
                    rate: rateAt.rate,
                    siret: rateAt.siret,
                    clientId: project.clientId,
                },
                create: {
                    code: rateAt.code,
                    rate: rateAt.rate,
                    siret: rateAt.siret,
                    clientId: project.clientId,
                    createdBy: 'system'
                }

            })
        }
        const setJob = new Set<string>()
        for (let job of dsn.job) {
            if (!setJob.has(job)) {
                setJob.add(job)
                await prisma.dsn_Job.upsert({
                    where: {
                        label_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_clientId: {
                            dsnSiren: dsnId.siren,
                            dsnNic: dsnId.nic,
                            label: job,
                            clientId: project.clientId,
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
                        clientId: project.clientId
                    },
                    create: {
                        label: job,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        clientId: project.clientId,
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
                        code_dsnSiren_dsnNic_dsnMonth_dsnVersion_dsnFraction_clientId: {
                            dsnSiren: dsnId.siren,
                            dsnNic: dsnId.nic,
                            clientId: project.clientId,
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
                        clientId: project.clientId,
                        updatedAt: new Date(),
                    },
                    create: {
                        code: idcc,
                        label: getIdcc.label,
                        dsnSiren: dsnId.siren,
                        dsnNic: dsnId.nic,
                        clientId: project.clientId,
                        dsnVersion: dsnId.version,
                        dsnFraction: dsnId.fraction,
                        dsnMonth: dsnId.month,
                        createdBy: userIsAuthorized.userId,
                    }
                })
            }
        }
        for (let contributionFund of dsn.contributionFund) {
            await prisma.dsn_ContributionFund.upsert({
                where: {
                    code_siret_clientId: {
                        code: contributionFund.codeDsn,
                        siret: contributionFund.siret,
                        clientId: project.clientId
                    }
                },
                update: {
                    code: contributionFund.codeDsn,
                    name: contributionFund.name,
                    siret: contributionFund.siret,
                    address1: contributionFund.adress1,
                    address2: contributionFund?.adress2,
                    address3: contributionFund?.adress3,
                    city: contributionFund.city,
                    codeZip: contributionFund.codeZip,
                    country: 'FR',
                    clientId: project.clientId,
                },
                create: {
                    code: contributionFund.codeDsn,
                    name: contributionFund.name,
                    siret: contributionFund.siret,
                    address1: contributionFund.adress1,
                    address2: contributionFund?.adress2,
                    address3: contributionFund?.adress3,
                    city: contributionFund.city,
                    codeZip: contributionFund.codeZip,
                    country: 'FR',
                    clientId: project.clientId,
                    createdBy: 'system'
                }
            })
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
        //delete file from blob storage
        await del(blob.url);
        return
    } catch (err) {
        const log: Logger = {
            level: 'error',
            message: `Erreur intégration DSN ${dsn.society.siren}-${dsn.society.nic}-${dsn.dsn.month}-${dsn.statement.fractionDsn}`,
            scope: 'dsn',
            projectLabel: project.label,
            clientId: project.clientId,
        }
        await createLog(log);
        console.error(err);
    }


}



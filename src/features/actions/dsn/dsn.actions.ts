"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getClientBySlug } from '@/src/query/client.query';
import { getProjectBySlug } from '@/src/query/project.query';
import { userIsAuthorizeInThisProject } from '@/src/query/security.query'
import { generateSlug } from '@/src/helpers/generateSlug';
import { getRandomFieldDsnByProject, getDsnByProjectAndRandomFilterByType } from '@/src/query/project_dsn.query';
export type Row = {
    id: string, value: string, label: string, random: string
}

export const dsnData = async (projectSlug: string, clientSlug: string, processsusSlug: string, rows: Row[]) => {
    const userIsAuthorize = await userIsAuthorizeInThisProject(projectSlug)
    if (!userIsAuthorize) {
        throw new Error('Vous n\'êtes pas autorisé à effectuer cette action')
    }
    const clientExist = await getClientBySlug(clientSlug)
    const projectExist = await getProjectBySlug(projectSlug)
    const keyListSet = new Set<string>()
    for (const row of rows) {
        let key = row.random
        if (!keyListSet.has(key)) keyListSet.add(key)
    }
    const keys: string[] = []
    keyListSet.forEach((key) => keys.push(key))
    try {
        const keyList = [...keys];
        for (let key of keyList) {
            let rowFilter = rows.filter((row) => row.random === key)
            let date: string | null = null
            let dsnId: string | null = null
            let nic: string | null = null
            let fraction: string | null = null
            let siren: string | null = null
            for (let row of rowFilter) {
                if (row.id === 'S20.G00.05.005') date = row.value
                if (row.id === 'S20.G00.05.004') dsnId = row.value
                if (row.id === 'S21.G00.06.002') nic = row.value
                if (row.id === 'S20.G00.05.003') fraction = row.value
                if (row.id === 'S21.G00.06.001') siren = row.value
                if (date && dsnId && nic && fraction && siren) {
                    const dsnExist = await prisma.project_DSN.findFirst({
                        where: {
                            clientId: clientExist.siren,
                            softwareLabel: projectExist.softwareLabel,
                            projectLabel: projectExist.label,
                            dsnDate: date,
                            dsnSiret: `${siren}${nic}`
                        }
                    })
                    if (!dsnExist) {
                        const rows = rowFilter.map((row) => {
                            return {
                                id: row.id,
                                value: row.value,
                                label: row.label,
                                fraction: fraction ? fraction : '0',
                                siret: `${siren}${nic}`,
                                dsnId: dsnId ? dsnId : '0',

                            }
                        })
                        await prisma.project_DSN.create({
                            data: {
                                projectLabel: projectExist.label,
                                clientId: clientExist.siren,
                                softwareLabel: projectExist.softwareLabel,
                                dsnDate: date,
                                dsnSiret: `${siren}${nic}`,
                                random: key,
                                Project_DSN_Data: {
                                    create: rows
                                }
                            }
                        })
                    }
                    date = null
                    dsnId = null
                    nic = null
                    fraction = null
                    siren = null


                }

            }

        }

        await createSociety({ projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel })
        await createJob({ projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel })
        await createEstablishment({ projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel })
        await createRateAt({ projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel })
    } catch (err: unknown) {
        console.error(err)
        throw new Error('Une erreur est survenue')

    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processsusSlug}`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processsusSlug}`)

}




const createJob = async ({ projectLabel, clientId, softwareLabel }: { projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const randomKey = await getRandomFieldDsnByProject({
            clientId,
            projectLabel,
            softwareLabel
        })
        if (!randomKey) {
            throw new Error('Aucun emploi trouvé')
        }
        for (const key of randomKey) {
            const dsnRow = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: key.random,
                type: 'Job'
            })
            if (!dsnRow) {
                throw new Error('Aucune Dsn trouvé')
            }
            if (dsnRow?.Project_DSN_Data.length === 0) {
                throw new Error('Aucun emploi trouvé')
            }
            let jobLabel = null
            for (const row of dsnRow.Project_DSN_Data) {
                if (row.id === 'S21.G00.40.006') {
                    jobLabel = row.value
                    if (jobLabel) {
                        const count = await prisma.project_Job.count()
                        await prisma.project_Job.upsert({
                            where: {
                                clientId_softwareLabel_projectLabel_label: {
                                    clientId,
                                    softwareLabel,
                                    projectLabel,
                                    label: jobLabel
                                }
                            },
                            update: {},
                            create: {
                                clientId,
                                softwareLabel,
                                projectLabel,
                                label: jobLabel,
                                slug: generateSlug(`emploi-${count + 1}`)
                            }
                        })
                    }

                }
            }
        }
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue')
    }
}

const createRateAt = async ({ projectLabel, clientId, softwareLabel }: { projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const dsnList = await getRandomFieldDsnByProject({
            clientId,
            projectLabel,
            softwareLabel
        })

        for (const dsn of dsnList) {
            const dsnRowRateAt = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: dsn.random,
                type: 'RateAt'
            })
            if (!dsnRowRateAt) {
                throw new Error('Aucune société trouvé')
            }
            const dsnRowEstablishment = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: dsn.random,
                type: 'Establishment'
            })
            if (!dsnRowEstablishment) {
                throw new Error('Aucun établissement trouvé')
            }
            //Test Establishment exist
            let nic = dsnRowEstablishment.Project_DSN_Data.find((row) => row.id === 'S21.G00.11.001')?.value
            const establishmentExist = await prisma.project_Establishment.findFirst({
                where: {
                    clientId,
                    softwareLabel,
                    projectLabel,
                    nic
                }
            })
            if (!establishmentExist) {
                throw new Error('Aucun établissement trouvé dans la base de données')
            }
            let atId = null
            let rateAt = null
            for (const row of dsnRowRateAt.Project_DSN_Data) {
                if (row.id === 'S21.G00.40.040') {
                    atId = row.value
                }
                if (row.id === 'S21.G00.40.043') {
                    rateAt = row.value
                }
                if (atId && rateAt) {
                    const count = await prisma.project_Rate_AT.count()
                    await prisma.project_Rate_AT.upsert({
                        where: {
                            id_clientId_societyId_establishmentNic_softwareLabel_projectLabel: {
                                id: atId,
                                clientId,
                                societyId: establishmentExist.societyId,
                                establishmentNic: establishmentExist.nic,
                                softwareLabel,
                                projectLabel,
                            }
                        },
                        update: {},
                        create: {
                            clientId,
                            softwareLabel,
                            projectLabel,
                            id: atId,
                            rate: rateAt,
                            societyId: establishmentExist.societyId,
                            label: 'En attente',
                            establishmentNic: establishmentExist.nic,
                            slug: generateSlug(`taux-${count + 1}`)
                        }
                    })
                    rateAt = null
                    atId = null
                }
            }



        }

    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la copie des données taux')
    }


}

const createEstablishment = async ({ projectLabel, clientId, softwareLabel }: { projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const dsnList = await getRandomFieldDsnByProject({
            clientId,
            projectLabel,
            softwareLabel
        })

        for (const dsn of dsnList) {
            const dsnRowSociety = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: dsn.random,
                type: 'Society'
            })
            if (!dsnRowSociety) {
                throw new Error('Aucune société trouvé')
            }
            const dsnRowEstablishment = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: dsn.random,
                type: 'Establishment'
            })
            if (!dsnRowEstablishment) {
                throw new Error('Aucun établissement trouvé')
            }
            //Test Society exist
            let siren = dsnRowSociety.Project_DSN_Data.find((row) => row.id === 'S21.G00.06.001')?.value
            const societyExist = await prisma.project_Society.findFirst({
                where: {
                    clientId,
                    softwareLabel,
                    projectLabel,
                    siren
                }
            })
            if (!societyExist) {
                throw new Error('Aucune société trouvé dans la base de données')
            }
            let nic = ''
            let ape = ''
            let address1 = ''
            let address2 = ''
            let address3 = ''
            let postalCode = ''
            let city = ''
            let legalStatus = ''
            for (const row of dsnRowEstablishment.Project_DSN_Data) {
                if (row.id === 'S21.G00.11.001') {
                    nic = row.value
                }
                if (row.id === 'S21.G00.11.002') {
                    ape = row.value
                }
                if (row.id === 'S21.G00.11.003') {
                    address1 = row.value
                }
                if (row.id === 'S21.G00.11.004') {
                    postalCode = row.value
                }
                if (row.id === 'S21.G00.11.005') {
                    city = row.value
                }
                if (row.id === 'S21.G00.11.017') {
                    legalStatus = row.value
                }
                if (nic && siren) {
                    const count = await prisma.project_Establishment.count()
                    await prisma.project_Establishment.upsert({
                        where: {
                            clientId_softwareLabel_societyId_projectLabel_nic: {
                                clientId,
                                softwareLabel,
                                societyId: societyExist.siren,
                                projectLabel,
                                nic
                            }
                        },
                        update: {},
                        create: {
                            clientId,
                            softwareLabel,
                            projectLabel,
                            nic,
                            societyId: societyExist.siren,
                            ape: ape ? ape : '',
                            address1: address1 ? address1 : '',
                            address2,
                            address3,
                            postalCode: postalCode ? postalCode : '',
                            city: city ? city : '',
                            legalStatus: legalStatus ? legalStatus : '',
                            slug: generateSlug(`etablissement-${count + 1}`)
                        }
                    })
                    nic = ''
                }
            }



        }

    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la copie des données établissement')
    }
}


const createSociety = async ({ projectLabel, clientId, softwareLabel }: { projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const dsnList = await getRandomFieldDsnByProject({
            clientId,
            projectLabel,
            softwareLabel
        })
        if (!dsnList) {
            throw new Error('Aucune société trouvé')
        }
        for (const dsn of dsnList) {
            const dsnRowSociety = await getDsnByProjectAndRandomFilterByType({
                clientId,
                projectLabel,
                softwareLabel,
                random: dsn.random,
                type: 'Society'
            }
            )
            if (!dsnRowSociety) {
                throw new Error('Aucune société trouvé')
            }
            if (dsnRowSociety?.Project_DSN_Data.length === 0) {
                throw new Error('Aucune société trouvé')
            }
            let siren = ''
            let ape = ''
            let address1 = ''
            let postalCode = ''
            let city = ''
            for (const row of dsnRowSociety.Project_DSN_Data) {
                if (row.id === 'S21.G00.06.001') {
                    siren = row.value
                }
                if (row.id === 'S21.G00.06.003') {
                    ape = row.value
                }
                if (row.id === 'S21.G00.06.004') {
                    address1 = row.value
                }
                if (row.id === 'S21.G00.06.005') {
                    postalCode = row.value
                }
                if (row.id === 'S21.G00.06.006') {
                    city = row.value
                }
                if (siren && ape && address1 && postalCode && city) {
                    const countSociety = await prisma.project_Society.count()
                    await prisma.project_Society.upsert({
                        where: {
                            clientId_softwareLabel_projectLabel_siren: {
                                clientId,
                                softwareLabel,
                                projectLabel,
                                siren
                            }
                        },
                        update: {},
                        create: {
                            clientId,
                            softwareLabel,
                            projectLabel,
                            siren,
                            ape,
                            address1,
                            postalCode,
                            city,
                            slug: generateSlug(`societe-${countSociety + 1}`)
                        }
                    })
                    siren = ''
                    ape = ''
                    address1 = ''
                    postalCode = ''
                    city = ''
                }//Création de la société

            }//Fin analyse société
        }//Fin analyse DSN



    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la copie des données société')
    }


}
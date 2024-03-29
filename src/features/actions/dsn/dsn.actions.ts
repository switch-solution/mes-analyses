"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getClientBySlug } from '@/src/query/client.query';
import { getProjectBySlug } from '@/src/query/project.query';
import { userIsAuthorizeInThisProject } from '@/src/query/security.query'
import { generateSlug } from '@/src/helpers/generateSlug';
import { getRandomFieldDsnByProjectSlug, getDsnByProjectSlugAndRandomFilterByType } from '@/src/query/project_dsn.query';
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
        await Promise.all([
            createSociety({ projectSlug, projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel }),
            createJob({ projectSlug, projectLabel: projectExist.label, clientId: clientExist.siren, softwareLabel: projectExist.softwareLabel })
        ])
    } catch (err: unknown) {
        console.error(err)
        throw new Error('Une erreur est survenue')

    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/processus/${processsusSlug}/data`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/processus/${processsusSlug}/data`)

}


const createJob = async ({ projectSlug, projectLabel, clientId, softwareLabel }: { projectSlug: string, projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const randomKey = await getRandomFieldDsnByProjectSlug(projectSlug)
        if (!randomKey) {
            throw new Error('Aucun emploi trouvé')
        }
        for (const key of randomKey) {
            const dsnRow = await getDsnByProjectSlugAndRandomFilterByType(projectSlug, key.random, 'Job')
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


const createSociety = async ({ projectSlug, projectLabel, clientId, softwareLabel }: { projectSlug: string, projectLabel: string, clientId: string, softwareLabel: string }) => {
    try {
        const randomKey = await getRandomFieldDsnByProjectSlug(projectSlug)
        if (!randomKey) {
            throw new Error('Aucune société trouvé')
        }
        for (const key of randomKey) {
            const dsnRowSociety = await getDsnByProjectSlugAndRandomFilterByType(projectSlug, key.random, 'Society')
            if (!dsnRowSociety) {
                throw new Error('Aucune société trouvé')
            }
            if (dsnRowSociety?.Project_DSN_Data.length === 0) {
                throw new Error('Aucune société trouvé')
            }
            const dsnRowEstablishment = await getDsnByProjectSlugAndRandomFilterByType(projectSlug, key.random, 'Establishment')
            if (!dsnRowEstablishment) throw new Error('Aucun établissement trouvé')
            if (dsnRowEstablishment?.Project_DSN_Data.length === 0) {
                throw new Error('Aucun établissement trouvé')
            }
            let siren = null
            let nic = null
            let ape = null
            let address1 = null
            let postalCode = null
            let city = null
            for (const row of dsnRowSociety.Project_DSN_Data) {
                if (row.id === 'S21.G00.06.001') {
                    siren = row.value
                }
                if (row.id === 'S21.G00.06.002') {
                    nic = row.value
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
                if (siren && nic && ape && address1 && postalCode && city) {
                    let count = await prisma.project_Society.count()
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
                            nic,
                            ape,
                            address1,
                            postalCode,
                            city,
                            slug: generateSlug(`societe-${count + 1}`)
                        }
                    })
                    let establichmentNic = null
                    let establichmentaddress1 = null
                    let establishmentPostalCode = null
                    let establichmentCity = null
                    let establishmentApe = null
                    for (let rowEstablishment of dsnRowEstablishment.Project_DSN_Data) {

                        if (rowEstablishment.id === 'S21.G00.11.001') establichmentNic = rowEstablishment.value
                        if (rowEstablishment.id === 'S21.G00.11.002') establichmentaddress1 = rowEstablishment.value
                        if (rowEstablishment.id === 'S21.G00.11.003') establishmentPostalCode = rowEstablishment.value
                        if (rowEstablishment.id === 'S21.G00.11.004') establichmentCity = rowEstablishment.value
                        if (rowEstablishment.id === 'S21.G00.11.005') establishmentApe = rowEstablishment.value
                        if (establichmentNic && establichmentaddress1 && establishmentPostalCode && establichmentCity && establishmentApe) {
                            let count = await prisma.project_Establishment.count()
                            await prisma.project_Establishment.upsert({
                                where: {
                                    clientId_softwareLabel_societyId_projectLabel_nic: {
                                        clientId,
                                        softwareLabel,
                                        societyId: siren,
                                        projectLabel,
                                        nic: establichmentNic

                                    }
                                },
                                update: {},
                                create: {
                                    clientId,
                                    softwareLabel,
                                    projectLabel,
                                    societyId: siren,
                                    nic: establichmentNic,
                                    ape: establishmentApe,
                                    address1: establichmentaddress1,
                                    postalCode: establishmentPostalCode,
                                    city: establichmentCity,
                                    slug: generateSlug(`etablissement-${count + 1}`)
                                }
                            })
                        }
                        //Raz
                        nic = null
                        address1 = null
                        postalCode = null
                        city = null
                        ape
                        //Fin analyse établissement
                    }

                }//Création de la société

            }//Fin analyse société
        }//Fin analyse DSN



    } catch (err) {
        console.error(err)
    }


}
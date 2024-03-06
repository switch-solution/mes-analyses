"use server";
import { prisma } from '@/lib/prisma';
import { getGroupByComponentLabelDsnWitchProjectSlug, getInputByProjectSlug } from "@/src/query/project_input.query";
import { getClientBySlug } from '@/src/query/client.query';
import { getProjectBySlug } from '@/src/query/project.query';
import { userIsAuthorizeInThisProject } from '@/src/query/security.query'
import { getCountComponentByComponentSlug } from '@/src/query/project_value.query'
import { de } from '@faker-js/faker';
import { ActionError } from '@/lib/safe-actions';
import { get } from 'http';
type Row = {
    code: string,
    value: string,
    dsnType: string
    componentLabel: string

}
export const dsnData = async (projectSlug: string, clientSlug: string, rows: Row[]) => {
    const userIsAuthorize = await userIsAuthorizeInThisProject(projectSlug)
    if (!userIsAuthorize) throw new Error('Vous n\'êtes pas autorisé à effectuer cette action')
    const componentLabel = await getGroupByComponentLabelDsnWitchProjectSlug(projectSlug)
    const inputs = await getInputByProjectSlug(projectSlug)
    const clientExist = await getClientBySlug(clientSlug)
    const projectExist = await getProjectBySlug(projectSlug)
    const countRecordId = await prisma.project_Value.groupBy({
        by: ['recordId'],
    })
    let countRecord = countRecordId.length
    const countValues = await prisma.project_Value.count()
    let count = countValues
    const getValuesLimit200 = await prisma.project_Value.findMany({
        where: {
            clientId: clientExist.siren,
            projectLabel: projectExist.label,
            projectSoftwareLabel: projectExist.softwareLabel
        },
        take: 200
    })
    for (let component of componentLabel) {
        countRecord += 1
        let dsnRows = rows.filter((row) => row.componentLabel === component.componentLabel)
        for (let row of dsnRows) {
            let input = inputs.find((input) => input.dsnType === row.dsnType)
            if (input) {
                let componentType = component.componentLabel
                count = count + 1
                switch (componentType) {
                    case 'Etablissement':
                        let estabslishmentExist = getValuesLimit200.find((value) => value.textValue === row.value)
                        let recordIdEtablishment = `Formulaire_${component.componentLabel}_groupe_de_valeurs_${countRecord}`
                        if (estabslishmentExist) {
                            recordIdEtablishment = estabslishmentExist.recordId
                        }
                        await upsertValue({
                            recordId: recordIdEtablishment,
                            value: row.value,
                            clientId: clientExist.siren,
                            bookLabel: input.bookLabel,
                            inputLabel: input.label,
                            projectLabel: projectExist.label,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            slug: count.toString(),
                            componentLabel: input.componentLabel,
                            isCode: input.isCode ? true : false,
                            isDescription: input.isDescription ? true : false,
                            isLabel: input.isLabel ? true : false,
                            userId: clientSlug
                        })
                        break
                    case 'Contrat DSN':

                        let contractDsnExist = getValuesLimit200.find((value) => value.textValue === row.value)
                        if (row.code === "S21.G00.15.001") {
                            countRecord = countRecord + 1
                        }
                        let recordIdContractDsn = `Formulaire_${component.componentLabel}_groupe_de_valeurs_${countRecord}`
                        if (contractDsnExist) {
                            recordIdContractDsn = contractDsnExist.recordId
                        }

                        await upsertValue({
                            recordId: recordIdContractDsn,
                            value: row.value,
                            clientId: clientExist.siren,
                            bookLabel: input.bookLabel,
                            inputLabel: input.label,
                            projectLabel: projectExist.label,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            slug: count.toString(),
                            componentLabel: input.componentLabel,
                            isCode: input.isCode ? true : false,
                            isDescription: input.isDescription ? true : false,
                            isLabel: input.isLabel ? true : false,
                            userId: clientSlug
                        })

                        break
                    case 'Taux AT':
                        break
                    case 'Emploi':
                        //On peut avoir X emplois donc on alimente le recordId de +1
                        countRecord += 1
                        let jobExist = getValuesLimit200.find((value) => value.textValue === row.value)
                        let recordIdJob = `Formulaire_${component.componentLabel}_groupe_de_valeurs_${countRecord}`
                        if (jobExist) {
                            recordIdJob = jobExist.recordId
                        }
                        await upsertValue({
                            recordId: recordIdJob,
                            value: row.value,
                            clientId: clientExist.siren,
                            bookLabel: input.bookLabel,
                            inputLabel: input.label,
                            projectLabel: projectExist.label,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            slug: count.toString(),
                            componentLabel: input.componentLabel,
                            isCode: input.isCode ? true : false,
                            isDescription: input.isDescription ? true : false,
                            isLabel: input.isLabel ? true : false,
                            userId: clientSlug
                        })
                        break
                    case 'Convention collective':
                        //On peut avoir X CCN donc on alimente le recordId de +1
                        countRecord += 1
                        let ccnExist = getValuesLimit200.find((value) => value.textValue === row.value)
                        let recordIdCcn = `Formulaire_${component.componentLabel}_groupe_de_valeurs_${countRecord}`
                        if (ccnExist) {
                            recordIdJob = ccnExist.recordId
                        }
                        await upsertValue({
                            recordId: recordIdCcn,
                            value: row.value,
                            clientId: clientExist.siren,
                            bookLabel: input.bookLabel,
                            inputLabel: input.label,
                            projectLabel: projectExist.label,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            slug: count.toString(),
                            componentLabel: input.componentLabel,
                            isCode: input.isCode ? true : false,
                            isDescription: input.isDescription ? true : false,
                            isLabel: input.isLabel ? true : false,
                            userId: clientSlug
                        })
                        break
                    default:
                        throw new ActionError(`Type de composant ${componentType} non reconnu`)
                }

            }


        }

    }
    return

}

const upsertValue = async ({
    recordId,
    value,
    clientId,
    bookLabel,
    inputLabel,
    projectLabel,
    chapterLevel_1,
    chapterLevel_2,
    chapterLevel_3,
    projectSoftwareLabel,
    slug,
    componentLabel,
    isCode,
    isDescription,
    isLabel,
    userId


}: {
    recordId: string,
    value: string,
    clientId: string,
    bookLabel: string,
    inputLabel: string,
    projectLabel: string,
    chapterLevel_1: number,
    chapterLevel_2: number,
    chapterLevel_3: number,
    projectSoftwareLabel: string,
    slug: string,
    componentLabel: string,
    isCode: boolean,
    isDescription: boolean,
    isLabel: boolean,
    userId: string

}) => {
    try {
        await prisma.project_Value.upsert({
            where: {
                clientId_bookLabel_inputLabel_projectLabel_chapterLevel_1_chapterLevel_2_chapterLevel_3_version_projectSoftwareLabel_recordId: {
                    clientId,
                    bookLabel,
                    inputLabel,
                    projectLabel,
                    chapterLevel_1,
                    chapterLevel_2,
                    chapterLevel_3,
                    version: 1,
                    projectSoftwareLabel,
                    recordId
                },
                textValue: value
            },
            update: {},
            create: {
                version: 1,
                slug,
                componentLabel,
                label: inputLabel,
                textValue: value,
                clientId,
                projectLabel,
                projectSoftwareLabel,
                chapterLevel_1,
                chapterLevel_2,
                chapterLevel_3,
                isCode,
                isDescription,
                isLabel,
                recordId,
                createdBy: userId,
                bookLabel,
                inputLabel: inputLabel,
            }

        })
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la création de la valeur')
    }

}
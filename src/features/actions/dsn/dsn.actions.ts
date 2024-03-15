"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getGroupByComponentLabelDsnWitchProjectSlug, getInputByProjectSlug } from "@/src/query/project_input.query";
import { getClientBySlug } from '@/src/query/client.query';
import { getProjectBySlug } from '@/src/query/project.query';
import { userIsAuthorizeInThisProject } from '@/src/query/security.query'
import { getIdccByCode } from '@/src/query/idcc.query';
import { getCountRecordId } from '@/src/query/project_value.query';
import { getInputByDsnItem } from '@/src/query/project_input.query';
export type Row = {
    code: string,
    value: string,
    dsnType: string
    componentLabel: string,
    idRate?: number,
    date: string,
    siret: string

}
type Input = {
    componentLabel: string,
    bookLabel: string,
    label: string,
    chapterLevel_1: number,
    chapterLevel_2: number,
    chapterLevel_3: number,
    otherData: string,
    isCode: boolean,
    isDescription: boolean,
    isLabel: boolean

}
import { getTestValueExist } from '@/src/query/project_value.query';
export const dsnData = async (projectSlug: string, clientSlug: string, rows: Row[]) => {
    const userIsAuthorize = await userIsAuthorizeInThisProject(projectSlug)
    if (!userIsAuthorize) throw new Error('Vous n\'êtes pas autorisé à effectuer cette action')
    const componentLabel = await getGroupByComponentLabelDsnWitchProjectSlug(projectSlug)
    const inputs = await getInputByProjectSlug(projectSlug)
    const clientExist = await getClientBySlug(clientSlug)
    const projectExist = await getProjectBySlug(projectSlug)

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
        const idRateAt = []
        let rateAt = null
        let idRate = null
        let dsnRows = rows.filter((row) => row.componentLabel === component.componentLabel)
        for (let row of dsnRows) {
            let inputParam = inputs.find((input) => input.dsnType === row.dsnType)
            if (inputParam) {
                let input: Input = {
                    componentLabel: component.componentLabel,
                    bookLabel: inputParam.bookLabel,
                    label: inputParam.label,
                    chapterLevel_1: inputParam.chapterLevel_1,
                    chapterLevel_2: inputParam.chapterLevel_2,
                    chapterLevel_3: inputParam.chapterLevel_3,
                    otherData: inputParam.otherData ? inputParam.otherData : '',
                    isCode: inputParam.isCode ? inputParam.isCode : false,
                    isDescription: inputParam.isDescription ? inputParam.isDescription : false,
                    isLabel: inputParam.isLabel ? inputParam.isLabel : false
                }
                let componentType = component.componentLabel
                switch (componentType) {
                    case 'Etablissement':
                        await createEstablishment({ row, componentLabel: component.componentLabel, siren: clientExist.siren, projectLabel: projectExist.label, projectSoftwareLabel: projectExist.softwareLabel, input, userId: userIsAuthorize.userId })
                        break
                    case 'Contrat DSN':
                        await createContractDsn({ row, componentLabel: component.componentLabel, siren: clientExist.siren, projectLabel: projectExist.label, projectSoftwareLabel: projectExist.softwareLabel, input, userId: userIsAuthorize.userId })
                        break
                    case 'Taux AT':
                        //On va recevoir 2 lignes, une ligne avec le taux et une ligne avec le code.
                        //Dans la DSN les structures S21.G00.40.040 et S21.G00.40.043 contiennent respectivement le taux AT et le code AT
                        //Nouveau taux
                        if (row.code === "S21.G00.40.040") {
                            idRateAt.push({
                                code: row.value,
                                id: row.idRate
                            })
                            rateAt = row.idRate // Update the type of idRate to be number | undefined
                        }
                        if (row.code === "S21.G00.40.043") {
                            idRate = idRateAt.find((rate) => rate.id === row.idRate)
                        }
                        if (rateAt && idRate) {

                            await createRateAt({
                                row,
                                componentLabel: component.componentLabel,
                                siren: clientExist.siren,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                input,
                                userId: userIsAuthorize.userId,
                                rateAt: rateAt.toFixed(2),
                                idRateAt: idRate.code
                            })
                        }
                        break
                    case 'Emploi':
                        await createJob({ row, componentLabel: component.componentLabel, siren: clientExist.siren, projectLabel: projectExist.label, projectSoftwareLabel: projectExist.softwareLabel, input, userId: userIsAuthorize.userId })
                        break
                    case 'Convention collective':
                        await createConventionCollective({ row, componentLabel: component.componentLabel, siren: clientExist.siren, projectLabel: projectExist.label, projectSoftwareLabel: projectExist.softwareLabel, input, userId: userIsAuthorize.userId })
                        break
                    default:
                        throw new Error(`Type de composant ${componentType} non reconnu`)
                }

            }
        }

    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/dsn/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/dsn/`)


}

const createContractDsn = async ({ row, componentLabel, siren, projectLabel, projectSoftwareLabel, input, userId }: { row: Row, componentLabel: string, siren: string, projectLabel: string, projectSoftwareLabel: string, input: Input, userId: string }) => {
    const recordId = await getNewrecordId()
    let recordIdContract = await makeRecordIdLabel({ componentLabel, countRecord: recordId })
    let contractExist = await valueExist({
        projectLabel,
        projectSoftwareLabel,
        clientId: siren,
        componentLabel: componentLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        bookLabel: input.bookLabel,
        label: input.label

    })
    if (contractExist && contractExist.textValue === row.value) {
        recordIdContract = contractExist.recordId
    }
    await upsertValue({
        recordId: recordIdContract,
        value: row.value,
        clientId: siren,
        bookLabel: input.bookLabel,
        inputLabel: input.label,
        projectLabel: projectLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: input.componentLabel,
        isCode: input.isCode ? true : false,
        isDescription: input.isDescription ? true : false,
        isLabel: input.isLabel ? true : false,
        userId: userId,
        idDsn: row.code,
        labelDsn: row.dsnType,
        dateDsn: row.date,
        siretDsn: row.siret
    })


}

const getNewrecordId = async () => {
    const countRecordId = await getCountRecordId()
    const countNewRecordId = countRecordId + 1
    return countNewRecordId
}


const valueExist = async ({ projectLabel, projectSoftwareLabel, clientId, componentLabel, chapterLevel_1, chapterLevel_2, chapterLevel_3, bookLabel, label }:
    {
        projectLabel: string,
        projectSoftwareLabel: string,
        clientId: string,
        componentLabel: string,
        chapterLevel_1: number,
        chapterLevel_2: number,
        chapterLevel_3: number,
        bookLabel: string,
        label: string
    }) => {

    try {
        const valueExist = await getTestValueExist({
            projectLabel,
            projectSoftwareLabel,
            clientId,
            componentLabel,
            chapterLevel_1,
            chapterLevel_2,
            chapterLevel_3,
            bookLabel,
            label
        })
        return valueExist
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération de la valeur')
    }
}

const makeRecordIdLabel = async ({ componentLabel, countRecord }: { componentLabel: string, countRecord: number }) => {
    const recordIdLabel = `Formulaire_${componentLabel}_groupe_de_valeurs_${countRecord}`
    return recordIdLabel.replace(/\s/g, '_')
}

const createConventionCollective = async ({ row, componentLabel, siren, projectLabel, projectSoftwareLabel, input, userId }: { row: Row, componentLabel: string, siren: string, projectLabel: string, projectSoftwareLabel: string, input: Input, userId: string }) => {
    //On peut avoir X CCN donc on alimente le recordId de +1
    const recordId = await getNewrecordId()
    let recordIdCcn = await makeRecordIdLabel({ componentLabel, countRecord: recordId })
    let ccnExist = await valueExist({
        projectLabel,
        projectSoftwareLabel,
        clientId: siren,
        componentLabel: componentLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        bookLabel: input.bookLabel,
        label: input.label

    })
    if (ccnExist && ccnExist.textValue === row.value) {
        recordIdCcn = ccnExist.recordId
    }

    await upsertValue({
        recordId: recordIdCcn,
        value: row.value,
        clientId: siren,
        bookLabel: input.bookLabel,
        inputLabel: input.label,
        projectLabel: projectLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: input.componentLabel,
        isCode: input.isCode ? true : false,
        isDescription: input.isDescription ? true : false,
        isLabel: input.isLabel ? true : false,
        userId: userId,
        idDsn: row.code,
        labelDsn: row.dsnType,
        dateDsn: row.date,
        siretDsn: row.siret
    })
    const idcc = await getIdccByCode(row.value)
    const inputIdcc = await prisma.project_Input.findFirst({
        where: {
            otherData: 'Libelle_Convention_Collective',
            projectLabel: projectLabel,
            clientId: siren,
            projectSoftwareLabel: projectSoftwareLabel
        }
    })

    if (idcc && inputIdcc) {
        await upsertValue({
            recordId: recordIdCcn,
            value: idcc.label,
            clientId: siren,
            bookLabel: inputIdcc.bookLabel,
            inputLabel: inputIdcc.label,
            projectLabel,
            chapterLevel_1: inputIdcc.chapterLevel_1,
            chapterLevel_2: inputIdcc.chapterLevel_2,
            chapterLevel_3: inputIdcc.chapterLevel_3,
            projectSoftwareLabel,
            componentLabel: inputIdcc.componentLabel,
            isCode: inputIdcc.isCode ? true : false,
            isDescription: inputIdcc.isDescription ? true : false,
            isLabel: inputIdcc.isLabel ? true : false,
            userId: userId,
            idDsn: row.code,
            labelDsn: row.dsnType,
            dateDsn: row.date,
            siretDsn: row.siret

        })


    }
}

const createRateAt = async ({ row, componentLabel, siren, projectLabel, projectSoftwareLabel, input, userId, idRateAt, rateAt }: { row: Row, componentLabel: string, siren: string, projectLabel: string, projectSoftwareLabel: string, input: Input, userId: string, idRateAt: string, rateAt: string }) => {
    const recordId = await getNewrecordId()
    let recordIdLabel = await makeRecordIdLabel({ componentLabel, countRecord: recordId })
    let rateAtExist = await prisma.project_Value.findFirst({
        where: {
            projectLabel,
            projectSoftwareLabel,
            clientId: siren,
            componentLabel: componentLabel,
            chapterLevel_1: input.chapterLevel_1,
            chapterLevel_2: input.chapterLevel_2,
            chapterLevel_3: input.chapterLevel_3,
            bookLabel: input.bookLabel,
            label: 'Taux AT',
            textValue: rateAt
        }

    })
    let idRateAtExit = await prisma.project_Value.findFirst({
        where: {
            projectLabel,
            projectSoftwareLabel,
            clientId: siren,
            componentLabel: componentLabel,
            chapterLevel_1: input.chapterLevel_1,
            chapterLevel_2: input.chapterLevel_2,
            chapterLevel_3: input.chapterLevel_3,
            bookLabel: input.bookLabel,
            label: 'Code taux AT',
            textValue: idRateAt
        }

    })
    if (rateAtExist && idRateAtExit && rateAtExist.recordId === idRateAtExit.recordId) {
        recordIdLabel = idRateAtExit.recordId
    }
    const inputIdRate = await getInputByDsnItem('DSN_Code_AT', 'S21.G00.40.040')
    const inputRate = await getInputByDsnItem('DSN_Taux_AT', 'S21.G00.40.043')
    if (!inputRate || !inputIdRate) {
        throw new Error('Le taux AT n\'a pas été trouvé')
    }

    //Ajout du code
    await upsertValue({
        recordId: recordIdLabel,
        value: idRateAt,
        clientId: siren,
        bookLabel: inputIdRate.bookLabel,
        inputLabel: inputIdRate.label,
        projectLabel,
        chapterLevel_1: inputIdRate.chapterLevel_1,
        chapterLevel_2: inputIdRate.chapterLevel_2,
        chapterLevel_3: inputIdRate.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: inputIdRate.componentLabel,
        isCode: inputIdRate.isCode ? true : false,
        isDescription: inputIdRate.isDescription ? true : false,
        isLabel: inputIdRate.isLabel ? true : false,
        userId: userId,
        idDsn: inputIdRate.dsnItem ? inputIdRate.dsnItem : '',
        labelDsn: inputIdRate.dsnType ? inputIdRate.dsnType : '',
        dateDsn: row.date,
        siretDsn: row.siret
    })
    //Ajout du taux
    await upsertValue({
        recordId: recordIdLabel,
        value: rateAt,
        clientId: siren,
        bookLabel: inputRate.bookLabel,
        inputLabel: inputRate.label,
        projectLabel,
        chapterLevel_1: inputRate.chapterLevel_1,
        chapterLevel_2: inputRate.chapterLevel_2,
        chapterLevel_3: inputRate.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: inputRate.componentLabel,
        isCode: inputRate.isCode ? true : false,
        isDescription: inputRate.isDescription ? true : false,
        isLabel: inputRate.isLabel ? true : false,
        userId: userId,
        idDsn: inputRate.dsnItem ? inputRate.dsnItem : '',
        labelDsn: inputRate.dsnType ? inputRate.dsnType : '',
        dateDsn: row.date,
        siretDsn: row.siret

    })
}



const createJob = async ({ row, componentLabel, siren, projectLabel, projectSoftwareLabel, input, userId }: { row: Row, componentLabel: string, siren: string, projectLabel: string, projectSoftwareLabel: string, input: Input, userId: string }) => {
    //On peut avoir X emplois donc on alimente le recordId de +1
    const recordId = await getNewrecordId()
    let recordIdLabel = await makeRecordIdLabel({ componentLabel, countRecord: recordId })
    let jobExist = await prisma.project_Value.findFirst({
        where: {
            projectLabel,
            projectSoftwareLabel,
            clientId: siren,
            componentLabel: componentLabel,
            chapterLevel_1: input.chapterLevel_1,
            chapterLevel_2: input.chapterLevel_2,
            chapterLevel_3: input.chapterLevel_3,
            bookLabel: input.bookLabel,
            label: input.label,
            textValue: row.value
        }


    })
    if (jobExist && jobExist.textValue === row.value) {
        recordIdLabel = jobExist.recordId
    }
    //On alimente le code de l'emploi avec son libellé 
    await upsertValue({
        recordId: recordIdLabel,
        value: row.value,
        clientId: siren,
        bookLabel: input.bookLabel,
        inputLabel: input.label,
        projectLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: input.componentLabel,
        isCode: true,
        isDescription: false,
        isLabel: false,
        userId: userId,
        idDsn: row.code,
        labelDsn: row.dsnType,
        dateDsn: row.date,
        siretDsn: row.siret

    })
    //On alimente le libellé de l'emploi avec son code
    await upsertValue({
        recordId: recordIdLabel,
        value: row.value,
        clientId: siren,
        bookLabel: input.bookLabel,
        inputLabel: input.label,
        projectLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: input.componentLabel,
        isCode: input.isCode ? true : false,
        isDescription: input.isDescription ? true : false,
        isLabel: input.isLabel ? true : false,
        userId: userId,
        idDsn: row.code,
        labelDsn: row.dsnType,
        dateDsn: row.date,
        siretDsn: row.siret

    })


}

const createEstablishment = async ({ row, componentLabel, siren, projectLabel, projectSoftwareLabel, input, userId }: { row: Row, componentLabel: string, siren: string, projectLabel: string, projectSoftwareLabel: string, input: Input, userId: string }) => {
    const recordId = await getNewrecordId()
    let recordIdLabel = await makeRecordIdLabel({ componentLabel, countRecord: recordId })
    let estabslishmentExist = await valueExist({
        projectLabel,
        projectSoftwareLabel,
        clientId: siren,
        componentLabel: componentLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        bookLabel: input.bookLabel,
        label: input.label

    })
    if (estabslishmentExist && estabslishmentExist.textValue === row.value) {
        recordIdLabel = estabslishmentExist.recordId
    }
    await upsertValue({
        recordId: recordIdLabel,
        value: row.value,
        clientId: siren,
        bookLabel: input.bookLabel,
        inputLabel: input.label,
        projectLabel,
        chapterLevel_1: input.chapterLevel_1,
        chapterLevel_2: input.chapterLevel_2,
        chapterLevel_3: input.chapterLevel_3,
        projectSoftwareLabel,
        componentLabel: input.componentLabel,
        isCode: input.isCode ? true : false,
        isDescription: input.isDescription ? true : false,
        isLabel: input.isLabel ? true : false,
        userId: userId,
        idDsn: row.code,
        labelDsn: row.dsnType,
        dateDsn: row.date,
        siretDsn: row.siret
    })
}

/**
 * Ajoute la valeur dans la table Project_Value et dans la table DSN_Data
 * @param param0 
 */

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
    componentLabel,
    isCode,
    isDescription,
    isLabel,
    userId,
    idDsn,
    labelDsn,
    dateDsn,
    siretDsn

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
    componentLabel: string,
    isCode: boolean,
    isDescription: boolean,
    isLabel: boolean,
    userId: string,
    idDsn: string,
    labelDsn: string,
    dateDsn: string,
    siretDsn: string

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
                isActivated: true,
                origin: 'Analyse initiale'
            }

        })
        let orderIdDsn = await prisma.project_DSN_Data.count({
            where: {
                projectLabel,
                projectSoftwareLabel,
                clientId,
                date: dateDsn,
                siret: siretDsn,
                id: idDsn,
            }
        })
        let order = orderIdDsn + 1
        await prisma.project_DSN_Data.upsert({
            where: {
                projectLabel_projectSoftwareLabel_clientId_date_order_id_siret: {
                    projectLabel,
                    projectSoftwareLabel,
                    clientId,
                    date: dateDsn,
                    siret: siretDsn,
                    order,
                    id: idDsn
                }
            },
            update: {
                value: value
            },
            create: {
                value: value,
                projectLabel,
                projectSoftwareLabel,
                clientId,
                id: idDsn,
                createdBy: userId,
                label: labelDsn,
                date: dateDsn,
                siret: siretDsn,
                order
            }
        })

    } catch (err) {
        console.error(err)
        throw new Error(`Erreur lors de la création de la valeur ${value} pour le recordId ${recordId} et le label ${inputLabel} dans le projet ${projectLabel} et le client ${clientId} avec la valeur ${value}`)
    }

}
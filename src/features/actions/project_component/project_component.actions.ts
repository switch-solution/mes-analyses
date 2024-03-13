"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { TypeInput } from "@/src/helpers/type";
import { ActionError } from "@/lib/safe-actions";
import { getCountAllValues, getCountRecordId, getRecordIdExist } from "@/src/query/project_value.query";
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { getInputByComponentSlug } from "@/src/query/project_input.query";
import { getClientBySlug } from "@/src/query/client.query";
import { getProjectBookByslug } from "@/src/query/project_Book.query";
import { getProjectBySlug } from "@/src/query/project.query";
import { getCountValueByRecordIdForValidation } from "@/src/query/security.query";
type Value = {
    clientId: string,
    bookLabel: string,
    projectLabel: string
    projectSoftwareLabel: string
    isCode: boolean,
    isDescription: boolean,
    isLabel: boolean,
    version: number,
    numberValue: number,
    textValue: string,
    booleanValue: boolean,
    createdBy: string
    inputLabel: string
    chapterLevel_1: number
    chapterLevel_2: number
    chapterLevel_3: number
    recordId: string
    label: string
    formSource?: string
    inputSource?: string,
    componentLabel: string,
    origin: string,
    isActivated: boolean

}

/**
 * La fonction d'édition va créer une nouvelle version des enregistrements. 
 * @param inputs 
 */

export const editComponentValue = async (inputs: TypeInput[]) => {

    const userIsAuthorize = await userIsAuthorizeInThisProject(inputs[0].projectSlug)
    if (!userIsAuthorize) throw new ActionError("Vous n'êtes pas autorisé à effectuer cette action.")

    const clientSlug = inputs[0].clientSlug
    const projectSlug = inputs[0].projectSlug
    const bookSlug = inputs[0].bookSlug
    const recordId = inputs[0].recordId
    if (!recordId) throw new ActionError("RecordId est obligatoire")
    const clientExist = await getClientBySlug(clientSlug)
    if (!clientExist) throw new ActionError("Ce client n'existe pas")
    const bookExist = await getProjectBookByslug(bookSlug)
    if (!bookExist) throw new ActionError("Ce livre n'existe pas")
    const projectExist = await getProjectBySlug(projectSlug)
    if (!projectExist) throw new ActionError("Ce projet n'existe pas")

    const inputsParam = await getInputByComponentSlug(inputs[0].componentSlug)

    const recordExist = await getRecordIdExist(recordId)
    if (!recordExist) throw new ActionError("Ce record n'existe pas")
    const version = recordExist.version
    const newVersion = version + 1

    const values: Value[] = []
    const countValues = await getCountAllValues()
    const countRecordId = await getCountRecordId()
    let count = countValues

    const recordIdIsValid = await getCountValueByRecordIdForValidation({
        recordId: recordId,
        projectSlug: projectSlug,
        bookSlug: bookSlug,
        clientSlug: clientSlug
    })

    for (let input of inputs) {
        //Archivage de l'ancienne version
        await prisma.project_Value.updateMany({
            where: {
                clientId: recordExist.clientId,
                bookLabel: recordExist.bookLabel,
                inputLabel: input.label,
                projectLabel: recordExist.projectLabel,
                chapterLevel_1: recordExist.chapterLevel_1,
                chapterLevel_2: recordExist.chapterLevel_2,
                chapterLevel_3: recordExist.chapterLevel_3,
                version: recordExist.version,
                projectSoftwareLabel: recordExist.projectSoftwareLabel,
                recordId: recordExist.recordId,
            },
            data: {
                isActivated: false
            }
        })
    }

    inputs.forEach((input) => {
        count += 1
        const inputParam = inputsParam.find(inputPa => inputPa.label === input.label)

        const value: Value = {
            clientId: recordExist?.clientId ? recordExist.clientId : '',
            bookLabel: recordExist?.bookLabel ? recordExist.bookLabel : '',
            projectLabel: recordExist?.projectLabel ? recordExist.projectLabel : '',
            projectSoftwareLabel: recordExist?.projectSoftwareLabel ? recordExist.projectSoftwareLabel : '',
            isCode: inputParam?.isCode ? inputParam.isCode : false,
            isDescription: inputParam?.isDescription ? inputParam.isDescription : false,
            isLabel: inputParam?.isLabel ? inputParam.isLabel : false,
            chapterLevel_1: inputParam?.chapterLevel_1 ? inputParam.chapterLevel_1 : 0,
            chapterLevel_2: inputParam?.chapterLevel_2 ? inputParam.chapterLevel_2 : 0,
            chapterLevel_3: inputParam?.chapterLevel_3 ? inputParam.chapterLevel_3 : 0,
            label: inputParam?.label ? inputParam.label : '',
            version: newVersion,
            numberValue: 0,
            textValue: '',
            booleanValue: false,
            createdBy: userIsAuthorize.userId,
            inputLabel: input.label,
            recordId: recordExist.recordId,
            formSource: input.formSource,
            inputSource: input.inputSource,
            componentLabel: recordExist?.componentLabel ? recordExist.componentLabel : '',
            origin: 'Analyse initiale',
            isActivated: true
        }
        switch (inputParam?.type) {
            case 'number':
                value.version = newVersion
                value.numberValue = parseFloat(input.value)
                break;
            case 'text':
                value.version = newVersion
                value.textValue = input.value
                break;
            case 'switch':
                value.version = newVersion
                value.booleanValue = input.value ? true : false
                break;

        }

        values.push(value)
    })

    await prisma.project_Value.createMany({
        data: values
    })
    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/`)
}


export const createComponentValue = async (inputs: TypeInput[]) => {

    const userIsAuthorize = await userIsAuthorizeInThisProject(inputs[0].projectSlug)
    if (!userIsAuthorize) throw new ActionError("Vous n'êtes pas autorisé à effectuer cette action.")

    const clientSlug = inputs[0].clientSlug
    const projectSlug = inputs[0].projectSlug
    const bookSlug = inputs[0].bookSlug

    const inputsParam = await getInputByComponentSlug(inputs[0].componentSlug)
    const version = await prisma.project_Value.findFirst({
        where: {
            inputLabel: inputs[0].label,
            chapterLevel_1: inputsParam[0].chapterLevel_1,
            chapterLevel_2: inputsParam[0].chapterLevel_2,
            chapterLevel_3: inputsParam[0].chapterLevel_3,
            projectLabel: inputsParam[0].projectLabel,
            bookLabel: inputsParam[0].bookLabel,
            clientId: inputsParam[0].clientId
        },
        select: {
            version: true
        }
    })
    const values: Value[] = []
    const countValues = await getCountAllValues()
    const countRecordId = await getCountRecordId()
    let count = countValues
    let countRecord = countRecordId + 1
    inputs.forEach((input) => {
        const inputParam = inputsParam.find(inputPa => inputPa.label === input.label)
        count += 1
        const value: Value = {
            clientId: inputParam?.clientId ? inputParam.clientId : '',
            bookLabel: inputParam?.bookLabel ? inputParam.bookLabel : '',
            projectLabel: inputParam?.projectLabel ? inputParam.projectLabel : '',
            projectSoftwareLabel: inputParam?.projectSoftwareLabel ? inputParam.projectSoftwareLabel : '',
            isCode: inputParam?.isCode ? inputParam.isCode : false,
            isDescription: inputParam?.isDescription ? inputParam.isDescription : false,
            isLabel: inputParam?.isLabel ? inputParam.isLabel : false,
            chapterLevel_1: inputParam?.chapterLevel_1 ? inputParam.chapterLevel_1 : 0,
            chapterLevel_2: inputParam?.chapterLevel_2 ? inputParam.chapterLevel_2 : 0,
            chapterLevel_3: inputParam?.chapterLevel_3 ? inputParam.chapterLevel_3 : 0,
            label: inputParam?.label ? inputParam.label : '',
            version: 0,
            numberValue: 0,
            textValue: '',
            booleanValue: false,
            createdBy: userIsAuthorize.userId,
            inputLabel: input.label,
            recordId: `Formulaire_${inputParam?.componentLabel.replace(/\s/g, "_")}_groupe_de_valeurs_${countRecord.toString()}`,
            formSource: input.formSource,
            inputSource: input.inputSource,
            componentLabel: inputParam?.componentLabel ? inputParam.componentLabel : '',
            origin: 'Analyse initiale',
            isActivated: true
        }
        switch (inputParam?.type) {
            case 'number':
                value.version = version?.version ? version.version + 1 : 1
                value.numberValue = parseFloat(input.value)
                break;
            case 'text':
                value.version = version?.version ? version.version + 1 : 1
                value.textValue = input.value
                break;
            case 'switch':
                value.version = version?.version ? version.version + 1 : 1
                value.booleanValue = input.value ? true : false
                break;

        }

        values.push(value)
    })

    await prisma.project_Value.createMany({
        data: values
    })

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/book/${bookSlug}/`)

}
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DynamicFormSchema } from "@/src/helpers/definition";
import type { Logger } from "@/src/helpers/type";
import { createLog } from "@/src/query/logger.query";
import { TypeInput } from "@/src/helpers/type";
import { ActionError } from "@/lib/safe-actions";
import crypto from 'crypto'
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
import { getInputByComponentSlug } from "@/src/query/project_input.query";
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
    inputSource?: string

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
    const uuid = crypto.randomUUID()
    inputs.forEach((input) => {
        const inputParam = inputsParam.find(inputPa => inputPa.label === input.label)

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
            recordId: uuid,
            formSource: input.formSource,
            inputSource: input.inputSource
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
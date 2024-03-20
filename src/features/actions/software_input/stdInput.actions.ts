"use server";
import { prisma } from "@/lib/prisma";
import { authentificationActionUserIsEditorClient, ActionError } from "@/lib/safe-actions";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createLog } from "@/src/query/logger.query";
import type { Logger } from "@/src/helpers/type";
import z from "zod";
import { getStdComponentBySlug } from "@/src/query/software_component.query";
import { CreateSoftwareInputSchema, DeleteStdInputSchema, EdidStdInputSchema, DetailSoftwareInputShema, CreateOptionSchema } from "@/src/helpers/definition";
import { getStandardInputById } from "@/src/query/sofwtare_input.query";
export const createSoftwareStdInput = authentificationActionUserIsEditorClient(CreateSoftwareInputSchema, async (data: z.infer<typeof CreateSoftwareInputSchema>, { clientId, userId }) => {

    const { formSlug, type, clientSlug, softwareSlug, label, typeDataImport, typeDataTable } = CreateSoftwareInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(formSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        const inputExist = await prisma.software_Component_Input.findFirst({
            where: {
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
                label: label
            }
        })
        if (inputExist) throw new ActionError('Le champ existe déjà')
        const countInput = await prisma.software_Component_Input.count({
            where: {
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
                componentType: componentExist.type
            }
        })
        const order = countInput + 1
        const input = await prisma.software_Component_Input.create({
            data: {
                type: type,
                createdBy: userId,
                clientId: clientId,
                componentType: componentExist.type,
                softwareLabel: componentExist.softwareLabel,
                componentLabel: componentExist.label,
                isCode: typeDataTable === 'isCode' ? true : false,
                isLabel: typeDataTable === 'isLabel' ? true : false,
                isDescription: typeDataTable === 'isDescription' ? true : false,
                isDsnField: typeDataImport === 'dsn' ? true : false,
                isOtherData: typeDataImport === 'items' || typeDataImport === 'other' ? true : false,
                isDependOtherField: typeDataImport === 'items' || typeDataImport === 'otherField' ? true : false,
                label,
                order,
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Ajout du champ ${label} sur le  ${formSlug}`,
            scope: "standardComponent",
        }
        await createLog(log)
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    const input = await prisma.software_Component_Input.findFirst({
        where: {
            componentLabel: componentExist.label,
            softwareLabel: componentExist.softwareLabel,
            clientId: clientId,
            label: label
        }
    })
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}}/input/${input?.id}/detail`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/input/${input?.id}/detail`);
})

export const createOption = authentificationActionUserIsEditorClient(CreateOptionSchema, async (data: z.infer<typeof CreateOptionSchema>, { clientId, userId }) => {
    const { clientSlug, componentSlug, inputSlug, label, selected } = CreateOptionSchema.parse(data)
    const inputExist = await getStandardInputById(inputSlug)
    if (!inputExist) {
        throw new ActionError('Le champ n\'existe pas')
    }
    try {
        await prisma.software_Component_Select_Option.create({
            data: {
                createdBy: userId,
                clientId: inputExist.clientId,
                inputLabel: inputExist.label,
                softwareLabel: inputExist.softwareLabel,
                componentLabel: inputExist.componentLabel,
                label,
                selected: selected ? true : false
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}/input/${inputSlug}/option`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}/input/${inputSlug}/option`);

})
export const detailStdInput = authentificationActionUserIsEditorClient(DetailSoftwareInputShema, async (data: z.infer<typeof DetailSoftwareInputShema>, { clientId, userId }) => {
    const { clientSlug, formSlug, inputSlug, dsnType, otherData, softwareSlug, placeholder, maxLength, maxValue, minLength, minValue, multiple, fieldSource } = DetailSoftwareInputShema.parse(data)
    const inputExist = await getStandardInputById(inputSlug)
    if (!inputExist) {
        throw new ActionError('Le champ n\'existe pas')
    }
    const componentExist = await getStdComponentBySlug(formSlug)
    if (!componentExist) {
        throw new ActionError('Le composant n\'existe pas')
    }
    try {
        await prisma.software_Component_Input.update({
            where: {
                id: inputExist.id
            },
            data: {
                createdBy: userId,
                clientId,
                dsnType,
                otherData,
                placeholder,
                maxLength,
                maxValue,
                minLength,
                minValue,
                multiple,
                formSource: fieldSource ? (await getStandardInputById(fieldSource)).componentLabel : null,
                inputSource: fieldSource ? (await getStandardInputById(fieldSource)).label : null
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    if (inputExist.type === 'select') {
        revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/input/${inputSlug}/option`);
        redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/input/${inputSlug}/option`);
    }
    revalidatePath(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/`);
    redirect(`/client/${clientSlug}/editor/${softwareSlug}/form/${formSlug}/`);

})




export const deleteStdInput = authentificationActionUserIsEditorClient(DeleteStdInputSchema, async (data: z.infer<typeof DeleteStdInputSchema>, { clientId, userId }) => {
    const { componentSlug, id, clientSlug } = DeleteStdInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new Error('Le composant n\'existe pas')
    }
    try {
        const stdInput = await prisma.software_Component_Input.findUnique({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }
        })
        if (!stdInput) {
            const log: Logger = {
                level: 'error',
                message: `Echec de suppression du champ ${id} sur le composant ${componentSlug} `,
                scope: "standardComponent",
            }
            await createLog(log)
            throw new ActionError('Le champ n\'existe pas')
        }
        await prisma.software_Component_Input.delete({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Suppression de du champ ${stdInput?.label} sur le composant ${componentSlug} `,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la suppression du champ')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}`);
})


export const editStdInput = authentificationActionUserIsEditorClient(EdidStdInputSchema, async (data: z.infer<typeof EdidStdInputSchema>, { clientId, userId }) => {

    const { componentSlug, clientSlug, id, label, maxLength, minLength, isCode, isLabel, isDescription, otherData, dsnType, formSource, inputSource, minValue, maxValue, required, readonly, placeholder, defaultValue } = EdidStdInputSchema.parse(data)
    const componentExist = await getStdComponentBySlug(componentSlug)
    if (!componentExist) {
        throw new ActionError('Le composant n\'existe pas')
    }
    if (otherData && dsnType) {
        throw new ActionError('Vous ne pouvez pas avoir un champ avec un type de champ et un autre type de champ')
    }
    try {
        const stdInput = await prisma.software_Component_Input.findUnique({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            }
        })
        if (!stdInput) {
            const log: Logger = {
                level: 'error',
                message: `Echec de suppression du champ ${id} sur le composant ${componentSlug} `,
                scope: "standardComponent",
            }
            await createLog(log)
            throw new ActionError('Le champ n\'existe pas')
        }
        await prisma.software_Component_Input.update({
            where: {
                id,
                componentLabel: componentExist.label,
                softwareLabel: componentExist.softwareLabel,
                clientId: clientId,
            },
            data: {
                createdBy: userId,
                clientId: clientId,
                isCode,
                isDescription,
                isLabel,
                otherData,
                dsnType,
                formSource,
                inputSource,
                componentType: componentExist.type,
                softwareLabel: componentExist.softwareLabel,
                componentLabel: componentExist.label,
                label,
                maxLength,
                maxValue,
                minLength,
                minValue,
                placeholder,
                required,
                readonly,
                defaultValue
            }

        })
        const log: Logger = {
            level: 'info',
            message: `Le champ ${label} du composant ${componentSlug} a été édité`,
            scope: "standardComponent",
            clientId: clientId
        }
        await createLog(log)
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la création du texte')
    }

    revalidatePath(`/client/${clientSlug}/editor/component/${componentSlug}`);
    redirect(`/client/${clientSlug}/editor/component/${componentSlug}`);
})
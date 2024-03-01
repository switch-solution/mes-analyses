import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
export const copyFormToSoftware = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error("Ce logiciel n'existe pas")

        const forms = await prisma.form.findMany({
            where: {
                status: "actif"
            },
            include: {
                Form_Input: true
            }
        })
        if (!forms) throw new Error("Aucun formulaire n'a été trouvé")

        const formsToCopy = forms.map(form => {

            const slug = `${softwareExist.clientId}-${softwareExist.label}-${form.title}`
            return {
                label: form.title,
                type: form.type,
                description: form.description,
                clientId: softwareExist.clientId,
                softwareLabel: softwareExist.label,
                version: 1,
                isForm: true,
                slug: slug.toLowerCase() // Convertit la chaîne en minuscules
                    .replace(/[àáâãäå]/g, 'a') // Remplace les caractères accentués par leur équivalent sans accent
                    .replace(/[^a-z0-9]+/g, '-') // Remplace tous les caractères non alphanumériques par des tirets
                    .replace(/^-+|-+$/g, ''), // Supprime les tirets en début et en fin de chaîne,
                createdBy: softwareExist.createdBy,
                status: "actif",
            }

        })

        await prisma.software_Component.createMany({
            data: formsToCopy

        })
        const dbStandardsComponent = await prisma.software_Component.findMany({
            where: {
                clientId: softwareExist.clientId,
                softwareLabel: softwareExist.label,
            }
        })
        const inputs: {
            type: string
            label: string,
            maxLength: number | null,
            minLength: number | null,
            minValue: number | null,
            maxValue: number | null,
            placeholder: string | null,
            order: number,
            defaultValue: string | null,
            required: boolean | null,
            readonly: boolean | null,
            multiple: boolean | null,
            inputSource: string | null,
            formTitle: string,
            formType: string,
            dsnType: string | null,
            isCode: boolean | null,
            isLabel: boolean | null,
            isDescription: boolean | null,
            formSource: string | null,
            otherData: string | null,


        }[] = []
        forms.forEach(form => {
            form.Form_Input.forEach(input => {
                inputs.push(input)
            })

        })
        const inputsToCopy = inputs.map(input => {
            const stdComponent = dbStandardsComponent.find(component => component.label === input.formTitle && component.type === input.formType)
            return {
                type: input.type ? input.type : '',
                label: input.label ? input.label : '',
                maxLength: input.maxLength ? input.maxLength : 0,
                minLength: input.minLength ? input.minLength : 0,
                minValue: input.minValue ? input.minValue : 0,
                maxValue: input.maxValue ? input.maxValue : 0,
                isCode: input.isCode ? input.isCode : false,
                otherData: input.otherData ? input.otherData : '',
                isLabel: input.isLabel ? input.isLabel : false,
                isDescription: input.isDescription ? input.isDescription : false,
                placeholder: input.placeholder ? input.placeholder : '',
                order: input.order ? input.order : 0,
                formsSource: input.formSource ? input.formSource : '',
                inputSource: input.inputSource ? input.inputSource : '',
                defaultValue: input.defaultValue ? input.defaultValue : '',
                required: input.required ? input.required : false,
                readonly: input.readonly ? input.readonly : false,
                multiple: input.multiple ? input.multiple : false,
                createdBy: softwareExist.createdBy,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId,
                componentLabel: stdComponent?.label ? stdComponent?.label : '',
                componentType: stdComponent?.type ? stdComponent?.type : '',
                dsnType: input.dsnType ? input.dsnType : '',
            }
        })

        await prisma.software_Component_Input.createMany({
            data: inputsToCopy
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie du formulaire")

    }
}
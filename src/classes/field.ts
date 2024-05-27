import { prisma } from "@/lib/prisma"

export class Field {
    fieldSlug: string;
    constructor(fieldSlug: string) {
        this.fieldSlug = fieldSlug;
    }
    async fieldExist() {
        try {
            const field = await prisma.formField.findUniqueOrThrow({
                where: {
                    slug: this.fieldSlug
                }

            })
            return field
        } catch (err) {
            console.error(err);
            throw new Error('Erreur lors de la verification de l\'existence du champ');
        }
    }

    async deleteField() {
        try {
            await prisma.formField.delete({
                where: {
                    slug: this.fieldSlug
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression du champ')
        }

    }

    async editField({ min, max, label, maxLength, minLength, readonly, required, dsn, formId, formVersion, userId }:
        {
            min: number,
            max: number,
            label: string,
            maxLength: number,
            minLength: number,
            readonly: boolean,
            required: boolean,
            dsn: string | null
            formId: string,
            formVersion: number,
            userId: string
        }
    ) {
        try {
            await prisma.formField.update({
                where: {
                    slug: this.fieldSlug
                },
                data: {
                    min,
                    max,
                    label,
                    maxLength,
                    minLength,
                    readonly,
                    required,
                    sourceDsnId: dsn,
                    formId,
                    formVersion,
                    createdBy: userId
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la modification du champ')
        }

    }
}
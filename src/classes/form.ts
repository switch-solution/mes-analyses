import { prisma } from "@/lib/prisma"
export class Form {
    formSlug: string
    constructor(formSlug: string) {
        this.formSlug = formSlug
    }

    async getInput() {
        try {
            const inputList = await prisma.form.findMany({
                where: {
                    slug: this.formSlug
                },
                include: {
                    Form_Input: {
                        orderBy: {
                            order: 'asc'
                        }
                    }
                }
            })
            const input = inputList.map((form) => {
                return form.Form_Input.map((input) => {
                    return {
                        id: input.id,
                        label: input.label,
                        type: input.type,
                        order: input.order,
                        required: input.required,
                        formSlug: form.slug,
                        slug: input.slug
                    }
                })
            }).flat(1)
            return input
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

}
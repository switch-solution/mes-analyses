import { prisma } from '@/lib/prisma'

export class Block {
    slug: string
    constructor(slug: string) {
        this.slug = slug
    }

    async blockExist() {
        try {
            const block = await prisma.page_Block.findUniqueOrThrow({
                where: {
                    slug: this.slug
                }

            })
            return block
        } catch (err) {
            console.error(err)
            throw new Error('Le block n\'existe pas')
        }
    }

    async removeForm({

        softwareLabel,
        clientId,
        userId
    }: {
        softwareLabel: string,
        clientId: string,
        userId: string
    }) {
        try {
            const block = await this.blockExist()
            await prisma.page_Block_Form.delete({
                where: {
                    pageBlockId: block.id,
                    clientId,
                    softwareLabel
                }
            })

        } catch (err) {
            console.error(err)
            throw new Error('Impossible de créer le formulaire')
        }
    }
    async addForm({
        formId,
        formVersion,
        softwareLabel,
        clientId,
        userId
    }: {
        formId: string,
        formVersion: number,
        softwareLabel: string,
        clientId: string,
        userId: string
    }) {
        try {
            const block = await this.blockExist()
            const blockExist = await prisma.page_Block_Form.findFirst({
                where: {
                    pageBlockId: block.id,
                }
            })
            if (!blockExist) {
                await prisma.page_Block_Form.create({
                    data: {
                        pageBlockId: block.id,
                        formId,
                        formVersion,
                        clientId,
                        softwareLabel,
                        createdBy: userId
                    },

                })
            } else {
                await prisma.page_Block_Form.update({
                    where: {
                        formId_formVersion_pageBlockId: {
                            formId: blockExist.formId,
                            formVersion: blockExist.formVersion,
                            pageBlockId: block.id
                        }
                    },
                    data: {
                        formId,
                        formVersion,
                        clientId,
                        softwareLabel,
                        createdBy: userId
                    }
                })
            }

        } catch (err) {
            console.error(err)
            throw new Error('Impossible de créer le formulaire')
        }
    }
    async getFormSlug() {
        try {
            const form = await prisma.page_Block.findUniqueOrThrow({
                where: {
                    slug: this.slug
                },
                include: {
                    Page_Block_Form: {
                        include: {
                            Form: true
                        }
                    }
                }
            })
            const formSlug = form.Page_Block_Form.at(0)?.Form.slug

            return formSlug
        } catch (err) {
            console.error(err)
            throw new Error('Impossible de récupérer le formulaire')
        }
    }
}
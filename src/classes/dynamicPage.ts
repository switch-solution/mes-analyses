import { prisma } from "@/lib/prisma"
import { generateSlug } from "../helpers/generateSlug"
export class DynamicPage {
    pageSlug: string
    constructor(pageSlug: string) {
        this.pageSlug = pageSlug
    }
    async create({
        label,
        softwareLabel,
        clientId,
        userId,
        internalId,
        level
    }: {
        label: string,
        softwareLabel: string,
        clientId: string,
        userId: string,
        internalId: string
        level: string
    }) {

        try {
            const idExist = await this.internalIdExist({ clientId, softwareLabel, internalId })
            if (idExist) {
                throw new Error('Un page avec cet identifiant interne existe déjà')
            }
            const countPage = await prisma.page.count()
            const version = await prisma.page.count({
                where: {
                    clientId,
                    softwareLabel,
                    label
                },

            })
            const order = await prisma.page.count({
                where: {
                    clientId,
                    softwareLabel
                }
            })
            const pageBdd = await prisma.page.create({
                data: {
                    label,
                    clientId,
                    level,
                    internalId,
                    version: version + 1,
                    order: order + 1,
                    createdBy: userId,
                    softwareLabel,
                    slug: generateSlug(`${label}-${countPage}`)
                }
            })
            if (!pageBdd) {
                throw new Error('Erreur lors de la création de la page')
            }
            return pageBdd
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la création de la page')
        }
    }

    async internalIdExist({ clientId, softwareLabel, internalId }: { clientId: string, softwareLabel: string, internalId: string }) {
        const internalIdExist = await prisma.page.findFirst({
            where: {
                clientId,
                softwareLabel,
                internalId
            }
        })
        if (internalIdExist) {
            return true
        }
        return false

    }

    async pageExist() {
        try {
            const page = await prisma.page.findFirst({
                where: {
                    slug: this.pageSlug
                }
            })

            return page
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche de la page')
        }
    }

    async createBlock({
        htmlElement,
        blockMasterId,
        user,
        pageVersion
    }: {
        htmlElement: string,
        blockMasterId?: string,
        user: string
        pageVersion: number
    },
    ) {
        try {
            const htmlTitle = [
                {
                    html: 'h1',
                    label: 'Titre 1'
                },
                {
                    html: 'h2',
                    label: 'Titre 2'
                },
                {
                    html: 'h3',
                    label: 'Titre 3'
                },
                {
                    html: 'h4',
                    label: 'Titre 4'
                },
                {
                    html: 'h5',
                    label: 'Titre 5'
                },
                {
                    html: 'h6',
                    label: 'Titre 6'
                },
                {
                    html: 'p',
                    label: 'Paragraphe'
                },
                {
                    html: 'ul',
                    label: 'Liste à puce'
                },
                {
                    html: 'form',
                    label: 'Formulaire'
                },
                {
                    html: 'input',
                    label: 'Champ'
                },
                {
                    html: 'select',
                    label: 'Liste déroulante'
                },
                {
                    html: 'switch',
                    label: 'Switch'
                },
                {
                    html: 'li',
                    label: 'Liste à puce'
                },
                {
                    html: 'ol',
                    label: 'Liste numérique'
                }

            ]
            const page = await this.pageExist()
            if (!page) {
                throw new Error('La page n\'existe pas')
            }
            const countBlock = await prisma.page_Block.count()
            const blockOrder = await prisma.page_Block.count({
                where: {
                    pageId: page.id
                }
            })
            const htmlLabel = htmlTitle.find((title) => title.html === htmlElement)
            const block = await prisma.page_Block.create({
                data: {
                    htmlElement,
                    pageVersion,
                    label: 'Saisir votre valeur',
                    createdBy: user,
                    blockMasterId,
                    order: blockOrder + 1,
                    pageId: page.id,
                    type: htmlLabel ? htmlLabel.label : 'Pas de type',
                    slug: generateSlug(`block-${countBlock}`)
                }
            })
            if (!block) {
                throw new Error('Erreur lors de la création du block')
            }
            return block
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la création du block')
        }
    }

    async getblocks() {
        try {
            const blocks = await prisma.page.findMany({
                where: {
                    slug: this.pageSlug
                },
                include: {
                    Page_Block: {
                        orderBy: {
                            order: 'asc'
                        },
                        include: {
                            Project_Block_Value: true
                        }
                    }

                }
            })
            const blocksExist = blocks.map((block) => {
                return block.Page_Block
            }).flat(1)
            return blocksExist
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des blocks')
        }
    }

    async editBlock(blockSlug: string, label: string) {
        try {
            await prisma.page_Block.update({
                where: {
                    slug: blockSlug
                },
                data: {
                    label
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la modification du block')
        }
    }

    async formIdLabelIsUnique(label: string) {
        try {
            const page = await this.pageExist()
            if (!page) {
                throw new Error('La page n\'existe pas')
            }
            const labelExist = await prisma.page_Block.findUnique({
                where: {
                    pageId_pageVersion_label: {
                        label,
                        pageId: page.id,
                        pageVersion: page.version
                    }
                }
            })
            return labelExist
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la vérification de l\'unicité du label')
        }
    }

    async formExist(formId: string) {
        try {

            const form = await prisma.page.findFirst({
                where: {
                    slug: this.pageSlug
                },
                include: {
                    Page_Block: {
                        where: {
                            id: formId
                        }
                    }

                }
            })
            return form
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche du formulaire')
        }
    }

    async formField(formId: string) {
        try {
            const fields = await prisma.page_Block.findMany({
                where: {
                    blockMasterId: formId

                }
            })
            return fields
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des champs du formulaire')
        }

    }

    async datas({
        clientId,
        softwareLabel,
        projectLabel,
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel: string

    }) {
        try {
            const pageDetail = await this.pageExist()
            if (!pageDetail) {
                throw new Error('La page n\'existe pas')
            }
            const forms = await prisma.page_Block.findMany({
                where: {
                    pageId: pageDetail.id,
                    htmlElement: 'form'
                },
                orderBy: {
                    order: 'asc'
                }

            })
            if (!forms) {
                throw new Error('Aucun formulaire trouvé')
            }
            const datas: {
                id: string,
                projectLabel: string,
                softwareLabel: string,
                clientId: string,
                blockId: string,
                formId: string,
                blockVersion: number,
                value: string,
                formGroup: string,
                createdAt: Date,
                updatedAt: Date,
                label: string,
                createdBy: string

            }[] = []
            for (const form of forms) {
                const data = await prisma.project_Block_Value.findMany({
                    where: {
                        clientId,
                        softwareLabel,
                        projectLabel,
                        formId: form.id
                    },


                })
                datas.push(...data)
            }
            const formGroupBy = await this.dataGroupByForm({
                clientId,
                softwareLabel,
                projectLabel
            })
            const formTitle = await prisma.page_Block.findMany({
                select: {
                    id: true,
                    label: true,
                },
                where: {
                    pageId: pageDetail.id,
                    htmlElement: 'form'
                },
                orderBy: {
                    order: 'asc'
                }
            })
            const datasGroupBy = formGroupBy.map((form) => {
                const data = datas.filter((data) => data.formId === form.formId)
                const title = formTitle.find((title) => title.id === form.formId)
                return {
                    formGroup: form.formGroup,
                    formId: form.formId,
                    formTitle: title ? title.label : 'Pas de titre',
                    data
                }
            })
            return datasGroupBy

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des données du formulaire')
        }
    }

    private async dataGroupByForm({
        clientId,
        softwareLabel,
        projectLabel,
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel: string

    }) {
        try {
            const formGroup = await prisma.project_Block_Value.groupBy({
                by: ['formGroup', 'formId'],
                where: {
                    clientId,
                    softwareLabel,
                    projectLabel

                }
            })
            return formGroup


        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des données')
        }
    }
}
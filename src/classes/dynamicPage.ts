import { prisma } from "@/lib/prisma"
import { generateSlug } from "../helpers/generateSlug"
import { generateUUID } from "../helpers/generateUuid"
import { th } from "@faker-js/faker"
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
            let countBlock = await prisma.page_Block.count()
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
                    slug: generateSlug(`${label}-${countPage}`),
                    Page_Block: {
                        create: [
                            {
                                htmlElement: 'h1',
                                label: 'Titre de la page',
                                createdBy: userId,
                                order: 1,
                                level1: true,
                                slug: generateSlug(`form-${countBlock++}`),
                                type: 'Titre 1'
                            },
                            {
                                htmlElement: 'p',
                                label: 'Votre paragphraphe',
                                createdBy: userId,
                                order: 2,
                                level1: true,
                                slug: generateSlug(`form-${countBlock++}`),
                                type: 'Paragraphe'
                            },
                            {
                                htmlElement: 'form',
                                label: 'Titre du formulaire',
                                createdBy: userId,
                                order: 3,
                                level1: true,
                                slug: generateSlug(`form-${countBlock++}`),
                                type: 'form'
                            },


                        ]


                    }
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

    async blockExist(blockSlug: string) {
        try {
            const block = await prisma.page_Block.findFirst({
                where: {
                    slug: blockSlug
                }
            })
            return block
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche du block')
        }
    }

    async deletePageBlock(blockSlug: string) {
        try {
            await prisma.page_Block.delete({
                where: {
                    slug: blockSlug
                }
            })

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression du block')

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
                    label: 'Titre 1',
                    level1: true
                },
                {
                    html: 'h2',
                    label: 'Titre 2',
                    level1: true
                },
                {
                    html: 'h3',
                    label: 'Titre 3',
                    level1: true
                },
                {
                    html: 'h4',
                    label: 'Titre 4',
                    level1: true
                },
                {
                    html: 'h5',
                    label: 'Titre 5',
                    level1: true
                },
                {
                    html: 'h6',
                    label: 'Titre 6',
                    level1: true
                },
                {
                    html: 'p',
                    label: 'Paragraphe',
                    level1: true
                },
                {
                    html: 'ul',
                    label: 'Liste à puce',
                    level1: true
                },
                {
                    html: 'form',
                    label: 'Formulaire',
                    level1: true
                },
                {
                    html: 'input',
                    label: 'Champ',
                    level1: false

                },
                {
                    html: 'select',
                    label: 'Liste déroulante',
                    level1: false
                },
                {
                    html: 'switch',
                    label: 'Switch',
                    level1: true
                },
                {
                    html: 'li',
                    label: 'Liste à puce',
                    level1: false
                },
                {
                    html: 'option',
                    label: 'Valeur de la liste déroulante',
                    level1: false
                },
                {
                    html: 'ol',
                    label: 'Liste numérique',
                    level1: false
                },
                {
                    html: 'img',
                    label: 'Image',
                    level1: true
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
                    label: `Saisir la valeur pour le champ ${countBlock + 1}`,
                    createdBy: user,
                    level1: htmlLabel ? htmlLabel.level1 : false,
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

    async editBlock({
        label,
        blockSlug,
        min,
        max,
        minLength,
        maxLength,
        required,
        readonly,
    }: {
        label: string,
        blockSlug: string,
        min: number,
        max: number,
        minLength: number,
        maxLength: number,
        required: boolean,
        readonly: boolean
    }) {
        try {
            await prisma.page_Block.update({
                where: {
                    slug: blockSlug
                },
                data: {
                    label,
                    min,
                    max,
                    minLength,
                    maxLength,
                    required,
                    readonly
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

    async createForm({
        clientId,
        softwareLabel,
        projectLabel,
        formId,
        userId
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel: string,
        formId: string,
        userId: string

    }) {
        try {
            const form = await this.formExist(formId)
            if (!form) {
                throw new Error('Le formulaire n\'existe pas')
            }
            const fieldsList = await prisma.page_Block.findMany({
                where: {
                    blockMasterId: formId
                }
            })
            if (!fieldsList) {
                throw new Error('Aucun champ trouvé')
            }
            const formGroup = generateUUID()
            const fields = fieldsList.map((field) => {
                return {
                    formId: formId,
                    blockId: field.id,
                    clientId,
                    label: field.label,
                    blockVersion: field.pageVersion,
                    order: field.order,
                    formGroup,
                    projectLabel,
                    softwareLabel,
                    value: '',
                    createdBy: userId
                }
            })
            await prisma.project_Block_Value.createMany({
                data: fields
            })


        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la création du formulaire')
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

    async getOptions() {
        try {
            const page = await this.pageExist()
            if (!page) {
                throw new Error('La page n\'existe pas')
            }
            const options = await prisma.page_Block.findMany({
                select: {
                    blockMasterId: true,
                    label: true,
                    htmlElement: true
                },
                where: {
                    pageId: page.id,
                    htmlElement: 'option',
                    blockMasterId: {
                        not: null
                    }
                }
            })
            return options as {
                label: string,
                htmlElement: string,
                blockMasterId: string
            }[]

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des options')
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

    async duplicatePage({
        projectLabel,
        softwareLabel,
        clientId,
        label
    }: {
        projectLabel: string,
        softwareLabel: string,
        clientId: string,
        label: string
    }) {
        try {
            const pageExist = await this.pageExist()
            if (!pageExist) {
                throw new Error('La page n\'existe pas')
            }

            await prisma.project_Page.create({
                data: {
                    projectLabel,
                    softwareLabel,
                    clientId,
                    label,
                    order: pageExist.order,
                    pageId: pageExist.id,
                    pageVersion: pageExist.version

                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la duplication de la page')
        }
    }

    async deleteForm({
        formGroup,
        clientId,
        softwareLabel,
        projectLabel,
        userId
    }: {
        formGroup: string,
        clientId: string,
        softwareLabel: string,
        projectLabel: string,
        userId: string
    }) {
        try {
            await prisma.project_Block_Value.deleteMany({
                where: {
                    formGroup,
                    clientId,
                    softwareLabel,
                    projectLabel
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression du formulaire')
        }
    }


}
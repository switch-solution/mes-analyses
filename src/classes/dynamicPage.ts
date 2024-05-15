import { prisma } from "@/lib/prisma"
import { generateSlug } from "../helpers/generateSlug"
import { generateUUID } from "../helpers/generateUuid"
import { it } from "node:test"
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
                    html: 'input_text',
                    label: 'Champ texte',
                    typeInput: 'text',
                    level1: false
                },
                {
                    html: 'input_number',
                    label: 'Champ numérique',
                    typeInput: 'number',
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
                    htmlElement: htmlElement.split("_").at(0) as string,
                    pageVersion,
                    label: `Saisir la valeur pour le champ ${countBlock + 1}`,
                    createdBy: user,
                    level1: htmlLabel ? htmlLabel.level1 : false,
                    blockMasterId,
                    order: blockOrder + 1,
                    pageId: page.id,
                    type: htmlLabel ? htmlLabel.label : 'Pas de type',
                    slug: generateSlug(`block-${countBlock}`),
                    typeInput: htmlLabel ? htmlLabel.typeInput : 'text'
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
                    slug: this.pageSlug,
                },
                include: {
                    Page_Block: {
                        orderBy: {
                            order: 'asc'
                        },
                        include: {
                            Project_Block_Value: true
                        }

                    },


                },
                orderBy: {
                    order: 'asc'
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
            const countPage = await prisma.project_Page.count()
            await prisma.project_Page.create({
                data: {
                    projectLabel,
                    softwareLabel,
                    clientId,
                    label,
                    order: pageExist.order,
                    pageId: pageExist.id,
                    pageVersion: pageExist.version,
                    slug: generateSlug(`${label}-${countPage}`),

                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la duplication de la page')
        }
    }

    async createOption(blockSlug: string, label: string) {
        try {
            const block = await this.blockExist(blockSlug)
            if (!block) {
                throw new Error('Le block n\'existe pas')
            }
            const options = block.options
            const mergeOptions = `${options};${label.replace(";", "")}`
            await prisma.page_Block.update({
                where: {
                    slug: blockSlug
                },
                data: {
                    options: mergeOptions
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la création de l\'option')
        }
    }


    async duplicate({
        clientId,
        softwareLabel,
        userId
    }: {
        clientId: string,
        softwareLabel: string,
        userId: string
    }) {
        try {
            const pageExist = await this.pageExist()
            if (!pageExist) {
                throw new Error('La page n\'existe pas')
            }
            const countPage = await prisma.page.count()
            const newPage = await prisma.page.create({
                data: {
                    id: `LOG_PAGE_${countPage}`,
                    level: 'Logiciel',
                    internalId: `LOG_PAGE_${countPage}`,
                    label: pageExist.label,
                    clientId,
                    softwareLabel,
                    version: pageExist.version,
                    order: pageExist.order,
                    createdBy: userId,
                    status: 'En attente',
                    slug: generateSlug(`LOG_PAGE_${countPage}`),
                }
            })
            const blocks = await this.getblocks()
            let countPageBlock = await prisma.page_Block.count()
            const newPageBlockId: {
                standardId: string,
                softwareId: string
            }[] = []
            const newPageFormId: {
                standardId: string,
                softwareId: string
            }[] = []
            const newDatas = []
            for (const block of blocks) {
                countPageBlock++
                newPageBlockId.push({
                    standardId: block.id,
                    softwareId: `LOG_BLOCK_${countPageBlock}`
                })
                if (block.htmlElement === 'select') {
                    newPageFormId.push({
                        standardId: block.id,
                        softwareId: `LOG_BLOCK_${countPageBlock}`
                    })
                }

                newDatas.push(await prisma.page_Block.create({
                    data: {
                        htmlElement: block.htmlElement,
                        pageVersion: newPage.version,
                        label: block.label,
                        createdBy: userId,
                        order: block.order,
                        level1: block.level1,
                        id: `LOG_BLOCK_${countPageBlock}`,
                        sourceDsnId: block.sourceDsnId,
                        options: block.options,
                        optionsBlockId: block.optionsBlockId,
                        optionsFormId: block.optionsFormId,
                        blockMasterId: block.blockMasterId ? newPageBlockId.find((blockId) => blockId.standardId === block.blockMasterId)?.softwareId : null,
                        pageId: newPage.id,
                        type: block.type,
                        slug: generateSlug(`LOG_BLOCK_${countPageBlock}`),
                        typeInput: block.typeInput,
                        blockIdSource: block.id,
                        min: block.min,
                        max: block.max,
                        minLength: block.minLength,
                        maxLength: block.maxLength,
                        readonly: block.readonly,
                        required: block.required
                    }
                }))

            }
            //Update optionsBlockId and optionsFormId
            const selects = newDatas.filter((data) => data.htmlElement === 'select' && data.optionsBlockId !== null)
            const otherPage = await prisma.page.findMany({
                where: {
                    level: 'Logiciel',
                    clientId,
                    softwareLabel,
                    id: {
                        not: newPage.id
                    },

                },
                include: {
                    Page_Block: true
                }
            })
            newDatas.push(...otherPage.map((page) => page.Page_Block).flat(1))
            for (const select of selects) {
                const optionsBlockId = select.optionsBlockId
                const optionsFormId = select.optionsFormId
                const newOptionsBlockId = newDatas.find(data => data.blockIdSource === optionsBlockId)?.id
                const newOptionsFormId = newDatas.find(data => data.blockIdSource === optionsFormId)?.id
                if (newOptionsBlockId && newOptionsFormId) {
                    await prisma.page_Block.update({
                        where: {
                            id: select.id
                        },
                        data: {
                            optionsBlockId: newOptionsBlockId,
                            optionsFormId: newOptionsFormId
                        }
                    })
                }
            }

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la duplication de la page')

        }
    }

}
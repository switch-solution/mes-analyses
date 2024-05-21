import { prisma } from '@/lib/prisma'
import { generateUUID } from '@/src/helpers/generateUuid'

export class ProjectData {
    slug: string
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(props: {
        slug: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string
    }) {
        this.slug = props.slug
        this.projectLabel = props.projectLabel
        this.softwareLabel = props.softwareLabel
        this.clientId = props.clientId
    }

    async projectDataExist() {
        try {
            const datas = await prisma.project_Page.findFirstOrThrow({
                where: {
                    slug: this.slug,
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Page: true
                }
            })
            return datas
        } catch (err) {
            console.error(err)
            throw new Error('Une erreur est survenue lors de la récupération des données du projet')
        }
    }

    async datas() {
        try {
            const projectPage = await this.projectDataExist()
            const forms = await prisma.page_Block.findMany({
                where: {
                    pageId: projectPage.pageId,
                    pageVersion: projectPage.pageVersion,
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
                pageVersion: number,
                value: string,
                formGroup: string,
                createdAt: Date,
                updatedAt: Date,
                label: string,
                createdBy: string,
                readOnly: boolean,

            }[] = []
            for (const form of forms) {
                const data = await prisma.project_Block_Value.findMany({
                    where: {
                        clientId: this.clientId,
                        softwareLabel: this.softwareLabel,
                        projectLabel: this.projectLabel,
                        formId: form.id,
                        projectPageId: projectPage.id
                    },
                })
                datas.push(...data)
            }
            const formGroupBy = await this.dataGroupByForm({
                clientId: this.clientId,
                softwareLabel: this.softwareLabel,
                projectLabel: this.projectLabel,
                projectPageId: projectPage.id
            })
            const formTitle = await prisma.page_Block.findMany({
                select: {
                    id: true,
                    label: true,
                },
                where: {
                    pageId: projectPage.id,
                    pageVersion: projectPage.pageVersion,
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
        projectPageId
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel: string,
        projectPageId: string

    }) {
        try {
            const formGroup = await prisma.project_Block_Value.groupBy({
                by: ['formGroup', 'formId'],
                where: {
                    clientId,
                    softwareLabel,
                    projectLabel,
                    projectPageId

                }
            })
            return formGroup


        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des données')
        }
    }

    async createForm({
        formId,
        userId,
    }: {

        formId: string,
        userId: string,

    }) {
        try {
            const projectPage = await this.projectDataExist()
            if (!projectPage) {
                throw new Error('La page n\'existe pas')
            }
            const status = projectPage.status
            if (status !== 'En cours de rédaction') {
                throw new Error('La page n\'est pas en cours de rédaction')
            }

            const form = await prisma.page_Block.findFirst({
                where: {
                    id: formId
                }
            })
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
                    clientId: this.clientId,
                    label: field.label,
                    pageVersion: field.pageVersion,
                    order: field.order,
                    formGroup,
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    value: '',
                    createdBy: userId,
                    projectPageId: projectPage.id
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
            const page = await this.projectDataExist()
            if (!page) {
                throw new Error('La page n\'existe pas')
            }
            await prisma.project_Block_Value.deleteMany({
                where: {
                    formGroup,
                    clientId,
                    softwareLabel,
                    projectLabel,
                    projectPageId: page.id
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression du formulaire')
        }
    }


    async getOptions() {
        try {
            const page = await this.projectDataExist()
            if (!page) {
                throw new Error('La page n\'existe pas')
            }
            //Get options list
            const optionsList = await prisma.page_Block.findMany({
                select: {
                    label: true,
                    id: true,
                    htmlElement: true,
                    options: true,
                    optionsBlockId: true,
                    optionsFormId: true,
                    blockMasterId: true

                },
                where: {
                    pageId: page.pageId,
                    htmlElement: 'select',

                }
            })
            const optionsObjectList: {
                id: string,
                label: string,
                options: string[],
                blockId: string | null,
                blockMasterId: string

            }[] = []
            for (const options of optionsList) {
                if (options.options) {
                    const optionsSplit = options.options.split(';')
                    if (options.blockMasterId) {
                        optionsObjectList.push({
                            id: options.id,
                            label: options.label,
                            options: optionsSplit,
                            blockId: options.optionsBlockId,
                            blockMasterId: options.blockMasterId
                        })

                    }

                }
                if (options.optionsBlockId && options.optionsFormId && options.blockMasterId) {
                    const valueList = await prisma.project_Block_Value.findMany({
                        where: {
                            blockId: options.optionsBlockId,
                            formId: options.optionsFormId,
                            clientId: this.clientId,
                            projectLabel: this.projectLabel,
                            softwareLabel: this.softwareLabel,
                            value: {
                                not: ''
                            }
                        }
                    })
                    optionsObjectList.push({
                        id: options.id,
                        label: options.label,
                        options: valueList.map((val) => val.value),
                        blockId: options.optionsBlockId,
                        blockMasterId: options.blockMasterId
                    })
                }

            }
            return optionsObjectList

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recherche des options')
        }

    }

    async workflow() {
        try {
            const workflow = await prisma.project_Page.findUniqueOrThrow({
                where: {
                    slug: this.slug,
                },
                include: {
                    Page_Validation: {
                        include: {
                            User: {
                                select: {
                                    UserOtherData: {
                                        select: {
                                            firstname: true,
                                            lastname: true
                                        }
                                    }
                                }
                            }

                        }
                    }

                }
            })
            const workflowList = workflow.Page_Validation.map((w) => {
                return {
                    pageLabel: workflow.label,
                    firstname: w.User.UserOtherData[0].firstname,
                    lastname: w.User.UserOtherData[0].lastname,
                    response: w.response
                }

            })

            return workflowList
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du workflow')
        }

    }




}
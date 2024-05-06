import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/src/helpers/generateSlug'
export class Project {
    projectSlug?: string
    private _slug?: string
    constructor(projectSlug: string) {
        this.projectSlug = projectSlug
    }
    async create({
        label,
        description,
        softwareLabel,
        clientId,
        userId,
        role
    }: {
        label: string,
        description: string,
        softwareLabel: string,
        clientId: string
        userId: string,
        role: string
    }) {
        try {
            const slug = await this.makeSlug()
            const pages = await prisma.page.findMany({
                where: {
                    softwareLabel: softwareLabel,
                    clientId: clientId,
                    status: 'Validé'
                }
            })
            const project = await prisma.project.create({
                data: {
                    label: label,
                    description: description,
                    softwareLabel: softwareLabel,
                    clientId: clientId,
                    createdBy: userId,
                    status: 'Actif',
                    slug,
                    UserProject: {
                        create: {
                            userId: userId,
                            isAdmin: true,
                            isEditor: true,
                            isValidator: true,
                            createdBy: userId,
                            role
                        }
                    },
                    Project_Page: {
                        create: pages.map(page => {
                            return {
                                pageId: page.id,
                                order: page.order,
                                pageVersion: page.version,
                                label: page.label,
                                createdBy: userId
                            }
                        })
                    }
                },
            })

            return project
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }


    }

    async countProjects() {
        return await prisma.project.count()
    }


    async getUsers() {
        try {
            const project = await this.projetDetail()
            const users = await prisma.userProject.findMany({
                where: {
                    projectLabel: project?.label,
                    projectSoftwareLabel: project?.softwareLabel,
                    projectClientId: project?.clientId

                },
                include: {
                    user: {
                        include: {
                            UserOtherData: true

                        }
                    }
                }
            })
            return users
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des utilisateurs du projet')
        }
    }


    async projectLabelExistForThisSoftware({
        projectLabel,
        softwareLabel,
        clientId
    }: {
        projectLabel: string,
        softwareLabel: string,
        clientId: string
    }) {
        const projectLabelExist = await prisma.project.findFirst({
            where: {
                label: projectLabel,
                softwareLabel: softwareLabel,
                clientId: clientId
            }
        })
        return projectLabelExist


    }

    async projectExist() {
        return await prisma.project.findUnique({
            where: {
                slug: this.projectSlug
            },
            select: {
                slug: true
            }
        })
    }

    get slug() {
        if (!this._slug) {
            throw new Error('Slug is not defined')
        }
        return this._slug
    }
    async projetDetail() {
        try {
            return await prisma.project.findUnique({
                where: {
                    slug: this.projectSlug
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des détails du projet')
        }
    }
    private makeSlug = async () => {
        const countProjects = await this.countProjects()
        const str = `Projet-${countProjects ? countProjects + 1 : 1}`

        const slug = generateSlug(str)
        this._slug = slug
        return slug
    }

    async projectDetails() {
        try {
            const project = await prisma.project.findUniqueOrThrow({
                where: {
                    slug: this.projectSlug
                },
            })
            return project
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des détails du projet')
        }

    }

    async getFormDataToObject({
        formId,
        projectLabel,
        softwareLabel,
        clientId,
    }: {
        formId: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string,
    }) {
        try {
            const formValues = await prisma.project_Block_Value.findMany({
                select: {
                    label: true,
                    value: true,
                    formGroup: true
                },
                where: {
                    formId,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            const formTitle = await prisma.page_Block.findFirstOrThrow({
                where: {
                    id: formId

                },
                select: {
                    label: true,
                    pageVersion: true
                }
            })
            const groupByFormId = await prisma.project_Block_Value.groupBy({
                by: ['formGroup'],
                where: {
                    formId,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            const datas: { [key: string]: any }[] = []
            for (const formGroup of groupByFormId) {
                const formData = formValues.filter(formValue => formValue.formGroup === formGroup.formGroup)
                const object: { [key: string]: any } = {} // Explicitly define the type of object
                for (const formValue of formData) {
                    object[formValue.label] = formValue.value;
                }
                datas.push(object)
            }

            return {
                formTitle: formTitle.label,
                version: formTitle.pageVersion,
                datas: datas
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des données du formulaire')
        }
    }


    async projectDatas() {
        try {
            const projectDetail = await this.projectDetails()
            if (!projectDetail) {
                throw new Error('Projet introuvable')
            }
            const pages = await prisma.project.findUniqueOrThrow({
                where: {
                    slug: this.projectSlug
                },
                include: {
                    Project_Page: {
                        include: {
                            Page: {
                                include: {
                                    Page_Block: {
                                        where: {
                                            htmlElement: 'form'
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            })
            const datas: {
                formTitle: string,
                version: number,
                datas:
                {
                    [key: string]: string,
                }[]

            }[] = []
            for (const page of pages.Project_Page) {
                const forms = page.Page.Page_Block
                for (const form of forms) {
                    const formObject = await this.getFormDataToObject({
                        formId: form.id,
                        projectLabel: projectDetail.label,
                        softwareLabel: projectDetail.softwareLabel,
                        clientId: projectDetail.clientId,
                    })
                    datas.push(formObject)

                }


            }
            return datas
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des détails du projet')
        }
    }

    async validatorProjet() {
        try {
            const project = await this.projetDetail()
            const validator = await prisma.userProject.findMany({
                where: {
                    projectLabel: project?.label,
                    isValidator: true
                }
            })
            return validator
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des validateurs du projet')
        }
    }

    async addUser({
        newUserId,
        isAdministrator,
        isEditor,
        isValidator,
        userId,
        role
    }: {
        newUserId: string,
        isAdministrator: boolean,
        isEditor: boolean,
        isValidator: boolean,
        userId: string,
        role: string
    }) {
        try {
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            await prisma.userProject.create({
                data: {
                    userId: newUserId,
                    projectLabel: project?.label,
                    projectSoftwareLabel: project?.softwareLabel,
                    projectClientId: project?.clientId,
                    isAdmin: isAdministrator,
                    isEditor,
                    isValidator,
                    role,
                    createdBy: userId,
                }
            })
            return
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'ajout de l\'utilisateur')
        }
    }

    async update({
        status,
        description,
    }: {
        status: string,
        description: string,
    }) {
        try {
            console.log(this.projectSlug)
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            await prisma.project.update({
                where: {
                    slug: this.projectSlug
                },
                data: {
                    status,
                    description
                }
            })
            return
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la mise à jour du projet')
        }
    }

    async files() {
        try {
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            const files = await prisma.project_Attachment.findMany({
                where: {
                    projectLabel: project?.label,
                    softwareLabel: project?.softwareLabel,
                    clientId: project?.clientId
                }
            })
            return files
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des fichiers du projet')
        }
    }

    async pages() {
        try {
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            const pages = await prisma.project_Page.findMany({
                where: {
                    projectLabel: project.label,
                    softwareLabel: project.softwareLabel,
                    clientId: project.clientId,
                },
                include: {
                    Page: true

                }
            })



            return pages
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des pages du projet')
        }
    }

    async countForms() {
        try {
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            const groupBy = await prisma.project_Block_Value.groupBy({
                by: ['formId'],
                where: {
                    projectLabel: project.label,
                    softwareLabel: project.softwareLabel,
                    clientId: project.clientId
                }
            })

            return groupBy.length
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors du comptage des formulaires')
        }
    }



}
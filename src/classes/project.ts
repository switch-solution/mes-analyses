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
            const usersList = await prisma.userProject.findMany({
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
            const users = usersList.map((user) => {
                return {
                    email: user.user.email,
                    firstName: user.user.UserOtherData.at(0)?.firstname,
                    lastName: user.user.UserOtherData.at(0.)?.lastname,
                    civility: user.user.UserOtherData.at(0)?.civility,
                    role: user.role,
                    isAdmin: user.isAdmin,
                    isEditor: user.isEditor,
                    isValidator: user.isValidator
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


    async validatorProjet() {
        try {
            const project = await this.projetDetail()
            if (!project) {
                throw new Error('Projet introuvable')
            }
            const validator = await prisma.userProject.findMany({
                where: {
                    projectLabel: project.label,
                    projectClientId: project.clientId,
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

    async getDatas() {
        try {
            const projectDetail = await this.projetDetail()
            if (!projectDetail) {
                throw new Error('Projet introuvable')
            }
            const datas = await prisma.project.findUnique({
                where: {
                    slug: this.projectSlug,
                },
                include: {
                    Form_Group: {
                        where: {
                            pageId: {
                                not: null
                            }
                        },
                        include: {
                            Form_Value: {
                                orderBy: {
                                    order: 'asc'
                                }
                            }
                        }
                    }
                }

            })
            if (!datas?.Form_Group) {
                return []
            }
            const groupByForm = await prisma.form_Group.groupBy({
                by: ['formId'],
                where: {
                    clientId: projectDetail?.clientId,
                    projectLabel: projectDetail?.label,
                    softwareLabel: projectDetail?.softwareLabel,
                    mode: 'Project'
                }
            })
            const fields = await prisma.formField.findMany({
                where: {
                    formId: {
                        in: groupByForm.map((form) => form.formId)
                    }

                }
            })
            const forms = await prisma.form.findMany({
                where: {
                    id: {
                        in: groupByForm.map((form) => form.formId)
                    }
                }
            })
            const pages = await prisma.page.findMany({
                where: {
                    softwareLabel: projectDetail.softwareLabel,
                    clientId: projectDetail.clientId
                }
            })
            const datasList: {
                formTitle: string,
                datas: { [key: string]: string }[]

            }[] = []
            for (const form of groupByForm) {
                let formTitle = forms.find((findForm) => findForm.id === form.formId)?.label
                let formDataFilter = datas.Form_Group.filter((data) => data.formId === form.formId)
                let formFieldsFilter = fields.filter((field) => field.formId === form.formId)
                if (formTitle) {
                    let dynamicDataList: { [key: string]: string }[] = []
                    for (const formData of formDataFilter) {
                        let dynamicData: { [key: string]: string } = {};
                        for (const data of formData.Form_Value) {
                            let fieldLabel = formFieldsFilter.find((field) => field.id === data.fieldId)?.label;
                            let value = data.value;
                            if (fieldLabel) {
                                dynamicData[fieldLabel] = value;
                            }
                        }
                        dynamicDataList.push(dynamicData)
                    }
                    datasList.push({
                        formTitle: formTitle,
                        datas: dynamicDataList,
                    });
                }

            }
            return datasList
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des données du projet')
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






}
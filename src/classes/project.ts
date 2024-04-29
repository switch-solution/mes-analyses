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
            await this.initProject({
                clientId: clientId,
                projectLabel: project.label,
                softwareLabel: project.softwareLabel
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
    private async initProject({
        clientId,
        softwareLabel,
        projectLabel
    }: {
        clientId: string,
        softwareLabel: string,
        projectLabel: string
    }) {
        try {

            const softwareProcessus = await prisma.software_Processus.findMany({
                where: {
                    softwareLabel: softwareLabel,
                    clientId: clientId,
                    isArchived: false
                },
                include: {
                    Processus: {
                        include: {
                            Form: {
                                include: {
                                    Form_Input: true
                                }
                            }
                        },
                    }
                },
                orderBy: {
                    order: 'asc'
                }
            })

            let count = await prisma.project_Processus.count()
            await prisma.project_Processus.createMany({
                data: softwareProcessus.map((processus) => {
                    count = count + 1
                    return {
                        id: processus.processusId,
                        label: processus.Processus.label,
                        version: processus.processusVersion,
                        clientId,
                        processusSlug: processus.Processus.slug,
                        order: processus.order,
                        projectLabel,
                        softwareLabel,
                        slug: generateSlug(`processus-${count}`),
                        createdBy: "system"
                    }
                })
            })

            await prisma.project_Processus.update({
                where: {
                    clientId_projectLabel_softwareLabel_id_version: {
                        clientId,
                        projectLabel,
                        softwareLabel,
                        id: softwareProcessus[0].processusId,
                        version: softwareProcessus[0].processusVersion
                    },
                    order: 1

                },
                data: {
                    status: 'Actif',
                    isOpen: true,
                    isPending: false
                }
            })

        } catch (err) {
            console.error(err)
            await prisma.logger.create({
                data: {
                    level: "error",
                    message: `Erreur lors de la création du projet ${projectLabel} ${softwareLabel} ${clientId}`,
                    scope: "project",
                    createdBy: "system"
                }
            })
            throw new Error('Une erreur est survenue lors de l\'initialisation du projet')
        }


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

    async processus() {
        try {
            const projectProcessus = await prisma.project.findUnique({
                where: {
                    slug: this.projectSlug
                },
                include: {
                    Project_Processus: true
                }
            })
            if (!projectProcessus) throw new Error('Projet introuvable')
            return projectProcessus?.Project_Processus
        } catch (err) {
            console.log(err)
            throw new Error('Erreur lors de la récupération des processus du projet')
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
                }
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



}
import { prisma } from '@/lib/prisma'

export class User {
    userId: string
    constructor(userId: string) {
        this.userId = userId
    }

    async getMyClientsAll() {
        try {
            const clientsList = await prisma.userClient.findMany({
                where: {
                    userId: this.userId,
                },
                include: {
                    client: true
                }

            })
            const clients = clientsList.map(user => {
                return {
                    ...user.client
                }
            })
            return clients
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des clients.`)
        }

    }
    async getMySoftwareActive() {
        try {
            const softwareId = await prisma.userSoftware.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    isActivated: true,
                },
                include: {
                    software: {
                        select: {
                            slug: true,
                            label: true
                        }
                    }
                }
            })
            return {
                softwareSlug: softwareId?.software?.slug,
                softwareLabel: softwareId?.software?.label
            }
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
        }

    }

    async getMyProject() {
        try {
            const myProject = await prisma.userProject.findMany({
                where: {
                    userId: this.userId
                },
                include: {
                    project: true
                }
            })
            return myProject
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des projets.`)
        }
    }

    async getMySoftwaresAll() {
        try {
            const softwaresList = await prisma.userSoftware.findMany({
                where: {
                    userId: this.userId,
                },
                include: {
                    software: true
                }
            })
            const softwares = softwaresList.map(user => {
                return {
                    ...user.software
                }
            })
            return softwares
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des logiciels.`)
        }

    }

    async getMyClientActive() {
        try {
            const client = await prisma.userClient.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    isActivated: true,
                },
                include: {
                    client: {
                        select: {
                            siren: true,
                            slug: true
                        }
                    }

                }

            })

            return {
                clientId: client?.client?.siren,
                clientSlug: client?.client?.slug
            }
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des clients.`)
        }

    }


    async userIsSetup() {
        try {
            const isSetup = await prisma.userOtherData.findFirst({
                where: {
                    userId: this.userId
                }
            })
            const setup = isSetup?.isSetup
            if (!setup) {
                return false
            }
            return true
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des clients.`)
        }
    }

    async myProject() {
        try {
            const myActiveClient = await this.getMyClientActive()
            const myActiveSoftware = await this.getMySoftwareActive()
            const projects = await prisma.userProject.findMany({
                where: {
                    userId: this.userId,
                    projectClientId: myActiveClient.clientId,
                    projectSoftwareLabel: myActiveSoftware.softwareLabel,
                },
                include: {
                    project: true
                }
            })
            return projects
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des projets.`)
        }

    }

    async getUserOtherData() {
        try {
            const user = await prisma.userOtherData.findFirstOrThrow({
                where: {
                    userId: this.userId
                }

            })
            return user
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des données de l'utilisateur.`)
        }
    }

    async getMyValidation() {
        try {
            const clientActive = await this.getMyClientActive()
            const softwareActive = await this.getMySoftwareActive()
            const validation = await prisma.project_Approve.findMany({
                where: {
                    userId: this.userId,
                    clientId: clientActive.clientId,
                    softwareLabel: softwareActive.softwareLabel,
                    isApproved: false,
                    isRefused: false
                }
            })
            return validation
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des validations.`)
        }

    }

    async getLogs() {
        try {
            const logsList = await prisma.user.findMany({
                where: {
                    id: this.userId
                },
                include: {
                    Logger: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                },
                take: 100

            })
            const logs = logsList.map(user => {
                return user.Logger.map(log => {
                    return {
                        ...log
                    }
                })

            }).flat(1)
            return logs


        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des logs.`)
        }
    }


}
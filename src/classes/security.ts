import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'
export class Security {
    private _userId: string = ''
    constructor() {
    }

    private async isAuthentificated() {
        const user = await getAuthSession()
        if (!user?.user.id) {
            throw new Error('L\'utilisateur n\'est pas authentifié')
        }
        this.userId = user.user.id;
        return
    }
    get userId() {
        return this._userId
    }
    set userId(userId: string) {
        this._userId = userId
    }


    private async isActive() {
        try {
            await this.isAuthentificated()
            const userId = await prisma.userOtherData.findUniqueOrThrow({
                where: {
                    userId: this.userId,
                    isBlocked: false
                }
            })
            this._userId = userId.userId
            return true
        } catch (err) {
            console.error(err)
            throw new Error('Le compte utilisateur est bloqué')
        }
    }
    async session() {
        try {
            const session = await getAuthSession()
            return session
        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas valide')
        }
    }
    /**
     * Test if the API is valid and return the client slug
     * @param apiKey 
     * @returns 
     */
    async apiIsValid(apiKey: string) {
        try {
            const splitApi = apiKey.split('Bearer ')
            const apiExist = await prisma.client_API.findFirstOrThrow({
                where: {
                    apiKey: splitApi[1]
                },
                include: {
                    client: {
                        select: {
                            slug: true
                        }
                    }
                }
            })
            return apiExist.client.slug
        } catch (err) {
            console.error(err)
            throw new Error('L\'API n\'est pas valide')
        }
    }
    async userIsValid() {
        try {
            await this.isActive()
            return await prisma.user.findUnique({
                where: {
                    id: this.userId
                },
                include: {
                    UserOtherData: true

                }

            })
        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas valide')

        }
    }

    async isValidatorInThisProject(projectSlug: string) {
        try {
            await this.isActive()
            const userIsActive = await this.isActive()
            if (!userIsActive) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const project = await prisma.project.findUnique({
                where: {
                    slug: projectSlug
                }
            })
            if (!project) {
                throw new Error('Le projet n\'existe pas')
            }
            const userProject = await prisma.userProject.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    projectLabel: project.label,
                    projectClientId: project.clientId,
                    projectSoftwareLabel: project.softwareLabel,
                    isValidator: true
                }
            })

            return userProject

        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce projet')
        }

    }
    async isEditorClient(clientId: string) {
        try {
            await this.isActive()
            if (!this.userId) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const userClient = await prisma.userClient.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    isEditor: true,
                    clientId: clientId,
                    isActivated: true
                },
                include: {
                    client: true
                }
            })
            return userClient
        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce client')
        }
    }
    async isAdministratorClient(clientId: string) {
        try {
            await this.isActive()
            if (!this.userId) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const userClient = await prisma.userClient.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    isAdministrator: true,
                    clientId: clientId,
                    isActivated: true
                },
                include: {
                    client: true
                }
            })
            return userClient
        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas administrateur de ce client')
        }
    }

    async isAdministratorInThisProject(projectSlug: string) {
        try {
            await this.isActive()
            if (!this.userId) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const project = await prisma.project.findUnique({
                where: {
                    slug: projectSlug
                }
            })
            if (!project) {
                throw new Error('Le projet n\'existe pas')
            }
            const userProject = await prisma.userProject.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    projectLabel: project.label,
                    projectClientId: project.clientId,
                    projectSoftwareLabel: project.softwareLabel,
                    isEditor: true
                }
            })

            return userProject

        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce projet')
        }

    }

    async isEditorInThisProject(projectSlug: string) {
        try {
            await this.isActive()
            if (!this.userId) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const project = await prisma.project.findUnique({
                where: {
                    slug: projectSlug
                }
            })
            if (!project) {
                throw new Error('Le projet n\'existe pas')
            }
            const userProject = await prisma.userProject.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    projectLabel: project.label,
                    projectClientId: project.clientId,
                    projectSoftwareLabel: project.softwareLabel,
                    isEditor: true
                }
            })

            return userProject

        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce projet')
        }

    }

    async isAuthorizedInThisProject(projectSlug: string) {
        try {
            await this.isActive()
            if (!this.userId) {
                throw new Error('L\'utilisateur n\'est pas activé')
            }
            const project = await prisma.project.findUnique({
                where: {
                    slug: projectSlug
                }
            })
            if (!project) {
                throw new Error('Le projet n\'existe pas')
            }
            const userProject = await prisma.userProject.findFirstOrThrow({
                where: {
                    userId: this.userId,
                    projectLabel: project.label,
                    projectClientId: project.clientId,
                    projectSoftwareLabel: project.softwareLabel
                }
            })

            return userProject

        } catch (err) {
            console.error(err)
            throw new Error('L\'utilisateur n\'est pas autorisé à accéder à ce projet')
        }

    }


}
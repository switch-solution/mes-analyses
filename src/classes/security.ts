import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'
export class Security {
    private _userId: string = ''
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
    async apiIsValid({
        apiKey,
        url,
        country,
        city,
        ip,
        method
    }: {
        apiKey: string,
        url: string,
        country?: string,
        city?: string,
        ip?: string
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'

    }) {
        try {
            const splitApi = apiKey.split('Bearer ')
            if (splitApi.length !== 2) {
                throw new Error('L\'API n\'est pas valide')
            }
            const apiExist = await prisma.client_API.findFirstOrThrow({
                where: {
                    apiKey: splitApi[1],
                    revoked: false
                },
                include: {
                    client: {
                        select: {
                            slug: true
                        }
                    }
                }
            })
            await prisma.client_API_Activity.create({
                data: {
                    url,
                    clientId: apiExist.clientId,
                    uuidApi: apiExist.uuid,
                    country,
                    city,
                    ip,
                    method

                }
            })
            const maxActivity = apiExist.limit
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const countActivity = await prisma.client_API_Activity.count({
                where: {
                    uuidApi: apiExist.uuid,
                    createdAt: {
                        gte: yesterday,
                        lt: now
                    }
                }
            })
            if (countActivity > maxActivity) {
                throw new Error(`L\'API a atteint la limite d\'activité sur les 24 dernières heures soit ${maxActivity} activités`)
            }
            return apiExist.client.slug
        } catch (err) {
            console.error(err)
            throw new Error((err as Error).message)
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
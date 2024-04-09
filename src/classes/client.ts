import { prisma } from '@/lib/prisma'
import { generateSlug } from '../helpers/generateSlug'
export class Client {
    clientSlug?: string
    private _slug?: string
    constructor(clientSlug: string) {
        this.clientSlug = clientSlug
    }

    async create({
        socialReason,
        siren,
        userId,
        defaultRole,

    }: {
        socialReason: string,
        siren: string,
        userId: string,
        defaultRole: string,

    }) {
        try {
            const slug = generateSlug(socialReason)
            const currentDate = new Date();

            const add90Days = new Date(currentDate.setDate(currentDate.getDate() + 90))

            const client = await prisma.client.create({
                data: {
                    socialReason: socialReason,
                    siren: siren,
                    isBlocked: false,
                    slug,
                    createdBy: userId,
                    dateStartTrial: new Date(),
                    dateEndTrial: add90Days,
                    UserClient: {
                        create: {
                            userId: userId,
                            isBillable: true,
                            isAdministrator: true,
                            isActivated: true,
                            isBlocked: false,
                            isEditor: true,
                            defaultRole,

                        }
                    },
                }
            })
            return client
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async sirenExist(siren: string) {
        const clientSlugExist = await prisma.client.findUnique({
            where: {
                siren
            }
        })
        return clientSlugExist

    }

    async softwareClient() {
        try {
            const softwareClient = await prisma.software.findMany({
                where: {
                    slug: this.clientSlug
                }
            })
            return softwareClient
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }


    }

    async socialReasonExist(socialReason: string) {
        const slug = generateSlug(socialReason)
        const clientSlugExist = await prisma.client.findUnique({
            where: {
                slug
            }
        })
        return clientSlugExist
    }

    async clientExist() {
        try {
            const client = await prisma.client.findUniqueOrThrow({
                where: {
                    slug: this.clientSlug
                }
            })
            return client
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }

    }

    async clientDetail() {
        try {
            const client = await prisma.client.findUnique({
                where: {
                    slug: this.clientSlug
                }
            })
            return client
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async userClientBillable() {
        try {
            const userIsBillable = await prisma.client.findMany({
                where: {
                    slug: this.clientSlug
                },
                include: {
                    UserClient: {
                        where: {
                            isBillable: true,
                            isBlocked: false
                        },
                        include: {
                            user: {
                                include: {
                                    UserOtherData: true
                                }
                            }
                        }

                    }
                }
            })

            return userIsBillable
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }


    }

    async endTrial() {
        try {
            const clientExist = await this.clientExist()
            const startDate = new Date(clientExist?.dateStartTrial ? clientExist?.dateStartTrial : new Date())
            const endDate = new Date(clientExist?.dateEndTrial ? clientExist?.dateEndTrial : new Date())
            const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
            const days = diffInMs / (1000 * 60 * 60 * 24);
            const numberDaysBeforeEndTrial = days.toFixed(0)
            return numberDaysBeforeEndTrial
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

}
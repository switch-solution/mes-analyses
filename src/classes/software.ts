import { prisma } from '@/lib/prisma'
import { generateSlug } from '../helpers/generateSlug'
export class Software {
    softwareSlug?: string
    constructor(softwareSlug: string) {
        this.softwareSlug = softwareSlug
    }
    async softwareExist() {
        try {
            const softwareExist = await prisma.software.findUnique({
                where: {
                    slug: this.softwareSlug
                }
            })
            return softwareExist
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération du logiciel.`)

        }
    }
    async create({
        label,
        userId,
        clientId
    }: {
        label: string,
        userId: string,
        clientId: string
    }) {
        const processus = await this.processus()
        const software = await prisma.software.create({
            data: {
                label,
                createdBy: userId,
                slug: generateSlug(label),
                updatedAt: new Date(),
                clientId: clientId,
                UserSoftware: {
                    create: {
                        userId: userId,
                        isEditor: true,
                        createdBy: userId,
                        isActivated: true,
                    }
                },
                Software_Processus: {
                    create: processus.map((processus) => {
                        return {
                            processusId: processus.id,
                            order: processus.order,
                            processusVersion: processus.version,
                            createdBy: userId
                        }
                    })
                },
            }
        })
        return software
    }


    private async processus() {
        try {
            const processus = await prisma.processus.findMany()
            return processus
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des processus.`)
        }


    }

    async softwareLabelExistForThisClient(label: string, clientId: string) {
        const softwareLabelExist = await prisma.software.findFirst({
            where: {
                label: label,
                clientId: clientId
            }
        })
        return softwareLabelExist
    }



}
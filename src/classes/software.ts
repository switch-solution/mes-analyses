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
    async repositoryExist({
        clientId,
        repositorySlug
    }: {
        clientId: string,
        repositorySlug: string
    }) {
        try {
            const softwareExist = await this.softwareExist()
            if (!softwareExist) {
                throw new Error(`Le logiciel n'existe pas.`)
            }
            const repository = await prisma.form.findFirst({
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: clientId,
                    repository: repositorySlug
                }
            })
            return repository


        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération du référentiel.`)
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
        try {
            const defaultSetting = await prisma.default_Setting.findMany({
                include: {
                    Default_Setting_Value: true
                }
            })
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
                }
            })
            let countSetting = await prisma.software_Setting.count()
            let countSettingValue = await prisma.software_Setting_Value.count()
            for (const setting of defaultSetting) {
                countSetting++
                const id = `LOG_${countSetting}`
                await prisma.software_Setting.create({
                    data: {
                        softwareLabel: software.label,
                        id,
                        label: setting.label,
                        createdBy: userId,
                        clientId: clientId,
                        Software_Setting_Value: {
                            create: setting.Default_Setting_Value.map((value) => {
                                countSettingValue++
                                const id = `LOG_${countSettingValue}`
                                return {
                                    id,
                                    label: value.label,
                                    value: value.value,
                                    slug: generateSlug(id),
                                }
                            })
                        }
                    }
                })

            }

            return software
        } catch (err) {
            await prisma.software.delete({
                where: {
                    slug: generateSlug(label)
                }
            })
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la création du logiciel.`)
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

    /**
     * Label is unique for each software
     * @param label 
     * @returns 
     */
    async getSettingByLabel(label: string) {
        try {
            const software = await this.softwareExist()
            if (!software) {
                throw new Error(`Le logiciel n'existe pas.`)
            }
            const setting = await prisma.software_Setting.findFirst({
                where: {
                    label,
                    softwareLabel: software.label,
                    clientId: software.clientId
                },
                include: {
                    Software_Setting_Value: true
                }
            })
            return setting
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des paramètres.`)

        }

    }

    async getSoftwareSettingType() {
        try {
            const softwareExist = await this.softwareExist()
            if (!softwareExist) {
                throw new Error(`Le logiciel n'existe pas.`)
            }
            const groupBySetting = await prisma.software_Setting.groupBy({
                by: ['id'],
                where: {
                    softwareLabel: softwareExist.label
                },
                orderBy: {
                    id: 'asc'
                }
            })
            const settings = await prisma.software_Setting.findMany({
                where: {
                    id: {
                        in: groupBySetting.map((setting) => setting.id)
                    }
                }

            })



            return {
                groupBySetting,
                settings
            }

        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des types de rubriques.`)
        }
    }

    async getCountSoftwareElement() {
        try {
            const softwareExist = await this.softwareExist()
            if (!softwareExist) {
                throw new Error(`Le logiciel n'existe pas.`)
            }
            const countSetting = await prisma.software_Setting.count({
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId
                }
            });
            const countItems = await prisma.software_Items.count({
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId
                }
            })
            const countPage = await prisma.page.count({
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId
                }
            })
            const countForm = await prisma.form.count({
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId
                }
            })
            return {
                countSetting,
                countItems,
                countPage,
                countForm
            }

        } catch (err) {
            console.log(err);
            throw new Error("Impossible de récupèrer les données IDCC");
        }

    }

    async getForms() {
        try {
            const softwareExist = await this.softwareExist()
            if (!softwareExist) {
                throw new Error(`Le logiciel n'existe pas.`)
            }
            const forms = await prisma.form.findMany({
                select: {
                    slug: true,
                    id: true,
                    label: true,
                },
                where: {
                    softwareLabel: softwareExist.label,
                    clientId: softwareExist.clientId
                }
            })
            return forms
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération des formulaires.`)
        }
    }





}
import { prisma } from '@/lib/prisma'
export class Setting {
    settingSlug: string
    constructor(settingSlug: string) {
        this.settingSlug = settingSlug
    }

    async settingExist() {
        try {
            const setting = await prisma.software_Setting.findUniqueOrThrow({
                where: {
                    slug: this.settingSlug
                }
            })
            return setting
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération du paramètre.`)

        }

    }

    async getValue() {
        try {
            const setting = await this.settingExist()
            const value = await prisma.software_Setting_Value.findMany({
                where: {
                    softwareSettingId: setting.id,
                    clientId: setting.clientId,
                    softwareLabel: setting.softwareLabel
                }
            })
            return value
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la récupération du paramètre.`)
        }
    }
}
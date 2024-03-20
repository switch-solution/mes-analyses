import { prisma } from '@/lib/prisma'
import { getMySoftware, getMySoftwareActive } from './user.query'
import { getClientBySlug } from './client.query'
import { Prisma } from '@prisma/client'
import { getSoftwareBySlug } from './software.query'
import { syncGenerateSlug } from '@/src/helpers/generateSlug'

export const copySetting = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)

        const settings = await prisma.setting.findMany({
            where: {
                system: false
            }
        })
        let count = await prisma.software_Setting.count()
        const settingsSoftware = settings.map(setting => {
            count++
            const { system, ...settingWithoutSystem } = setting;
            return {
                ...settingWithoutSystem,
                clientId: softwareExist.clientId,
                softwareLabel: softwareExist.label,
                slug: syncGenerateSlug(`PARAM-${count}-${setting.id}-${setting.label}`)

            }
        })
        await prisma.software_Setting.createMany({
            data: settingsSoftware
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie des paramètres du logiciel.")
    }

}

export const getSoftwareSettingBySlug = async (slug: string) => {
    try {
        const setting = await prisma.software_Setting.findUnique({
            where: {
                slug
            }
        })
        return setting
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres du logiciel.")
    }

}

export type getSoftwareSettingBySlug = Prisma.PromiseReturnType<typeof getSoftwareSettingBySlug>;



export const getSoftwareSettingFilterByUserSoftware = async (clientSlug: string) => {
    try {
        const softwares = await getMySoftware()
        const clientId = await getClientBySlug(clientSlug)
        const softwareSetting = await prisma.software_Setting.findMany({
            where: {
                softwareLabel: {
                    in: softwares.map(software => software.softwareLabel)
                },
                clientId: clientId.siren
            },
            orderBy: [
                {
                    softwareLabel: 'asc'
                },
                {
                    id: 'asc'
                }
            ]
        })
        return softwareSetting
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres du logiciel.")
    }

}

export const getTypeRubrique = async (clientSlug: string) => {
    try {
        const clientId = await getClientBySlug(clientSlug)
        const type = await prisma.software_Setting.findMany({
            where: {
                clientId: clientId.siren,
                id: "RUBRIQUE_TYPE"
            }
        })
        return type
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des types de rubriques.")
    }
}

export type getTypeRubrique = Prisma.PromiseReturnType<typeof getTypeRubrique>;

export const getParamByIdAndSoftwareActive = async (id: string) => {
    try {

        const sofwareActive = await getMySoftwareActive()
        if (!sofwareActive) {
            throw new Error("Vous devez être connecté pour accéder à cette page.")
        }
        const software = await getSoftwareBySlug(sofwareActive)

        const settings = await prisma.software_Setting.findMany({
            where: {
                id: id,
                clientId: software.clientId,
                softwareLabel: software.label
            }
        })
        if (settings.length === 0) {
            throw new Error("Vous devez configurer les paramètres pour accéder à cette page.")
        }
        return settings
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres.")
    }

}

export type getParamByIdAndSoftwareActive = Prisma.PromiseReturnType<typeof getParamByIdAndSoftwareActive>;



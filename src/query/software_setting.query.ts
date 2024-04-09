import { prisma } from '@/lib/prisma'
import { getClientBySlug } from './client.query'
import { Prisma } from '@prisma/client'
import { getSoftwareBySlug } from './software.query'
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



export const getSoftwareSettingFilterByUserSoftware = async ({
    clientId,
    softwareLabel,
}: {
    clientId: string,
    softwareLabel: string
}) => {
    try {
        const softwareSetting = await prisma.software_Setting.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId
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

export const getParamByIdAndSoftwareActive = async ({
    id,
    softwareLabel,
    clientId
}: {
    id: string,
    softwareLabel: string,
    clientId: string

}) => {
    try {


        const settings = await prisma.software_Setting.findMany({
            where: {
                id: id,
                clientId: clientId,
                softwareLabel: softwareLabel
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



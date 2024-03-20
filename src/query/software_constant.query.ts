import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'
import { getSoftwareBySlug } from "./software.query";
import { getMyClientActive, getMySoftwareActive } from "./user.query";
export const getConstantInMyActiveClientAndSoftware = async () => {
    try {
        const clientActive = await getMyClientActive()
        if (!clientActive) throw new Error('Aucun client actif')
        const softwareActive = await getMySoftwareActive()
        if (!softwareActive) throw new Error('Aucun logiciel actif')
        const clientExist = await getClientBySlug(clientActive)
        const software = await getSoftwareBySlug(softwareActive)
        const constants = await prisma.software_Constant_Legal.findMany({
            where: {
                clientId: clientExist.siren,
                softwareLabel: software.label
            },
            orderBy: [
                {
                    softwareLabel: 'asc'
                },
                {
                    id: 'asc'
                },
                {
                    dateStart: 'asc'
                }

            ]
        })
        return constants
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des constantes du logiciel.')
    }

}

export const getSoftwareConstantBySlug = async (slug: string) => {
    try {
        const constant = await prisma.software_Constant_Legal.findFirst({
            where: {
                slug
            }
        })
        return constant
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")
    }

}

export type getSoftwareConstantBySlug = Prisma.PromiseReturnType<typeof getSoftwareConstantBySlug>;

export const getSoftwareConstantBySoftwareLabelAndId = async (softwareLabel: string, id: string) => {
    try {
        const constant = await prisma.software_Constant_Legal.findFirst({
            where: {
                id,
                softwareLabel
            }
        })
        return constant
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")
    }

}

export const countAllSoftwareConstant = async () => {
    try {
        const count = await prisma.software_Constant_Legal.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")
    }

}
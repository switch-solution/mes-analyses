import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'
import { getSoftwareBySlug } from "./software.query";
import { getClientActiveAndSoftwareActive } from "./security.query";

export const getComponnentByClientFilterAndSoftware = async (clientSlug: string, softwareSlug: string) => {
    try {
        const software = await getSoftwareBySlug(softwareSlug)
        const client = await getClientBySlug(clientSlug)
        const component = await prisma.software_Component.findMany({
            where: {
                softwareLabel: software.label,
                clientId: client.siren

            }
        })
        return component
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}

export const getComponentTable = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }
        const tables = await prisma.software_Component.findMany({
            where: {
                isTable: true,
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}


export const getComponentTextareta = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }
        const tables = await prisma.software_Component.findMany({
            where: {
                isTextArea: true,
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}

export const getComponentImage = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }
        const tables = await prisma.software_Component.findMany({
            where: {
                isImage: true,
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}

export const getComponentForm = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }
        const tables = await prisma.software_Component.findMany({
            where: {
                isForm: true,
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId
            }
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}


export const getCountAllSoftwareComponent = async () => {
    try {
        const count = await prisma.software_Component.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}

export const getStdComponentBySlug = async (stdComponentSlug: string) => {
    try {
        const stdComponent = await prisma.software_Component.findUniqueOrThrow({
            where: {
                slug: stdComponentSlug
            }
        })
        return stdComponent
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération du composant")
    }

}

export type getStdComponentBySlug = Prisma.PromiseReturnType<typeof getStdComponentBySlug>;

export const getSoftwareComponentBySoftwareSlug = async (softwareSlug: string) => {

    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error("Le logiciel n'existe pas")
        const components = await prisma.software_Component.findMany({
            where: {
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId,
                isForm: true
            },
            include: {
                Software_Component_Input: true
            }
        })
        return components
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des composants")
    }

}

export type getSoftwareComponentBySoftwareSlug = Prisma.PromiseReturnType<typeof getSoftwareComponentBySoftwareSlug>;


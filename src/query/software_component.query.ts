import { prisma } from "@/lib/prisma";
import { getMySoftware } from "./user.query";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'
import { getSoftwareBySlug } from "./software.query";

export const getComponnentByClientFilterUserSoftware = async (clientSlug: string) => {
    try {
        const softwares = await getMySoftware()
        const client = await getClientBySlug(clientSlug)
        const component = await prisma.software_Component.findMany({
            where: {
                softwareLabel: {
                    in: softwares.map(software => software.softwareLabel)
                },
                clientId: client.siren

            }
        })
        return component
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


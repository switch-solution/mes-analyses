import { prisma } from "@/lib/prisma";
import { getMySoftware } from "./user.query";
import { getClientBySlug } from "./client.query";
import { Prisma } from '@prisma/client'

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

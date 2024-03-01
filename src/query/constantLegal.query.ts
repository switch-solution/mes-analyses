import { prisma } from "@/lib/prisma";
import { getClientBySlug } from "./client.query";
import { getMySoftware } from "./user.query";
export const getConstantLegal = async (clientSlug: string) => {
    try {
        const clientId = await getClientBySlug(clientSlug)
        const mySoftwares = await getMySoftware()
        const constantLegal = await prisma.constant_Legal.findMany({
            where: {
                level: 'Standard',
            },
            orderBy: [
                {
                    id: 'asc'
                },
                {
                    dateStart: 'asc'
                }
            ]
        })

        const constantSoftware = await prisma.constant_Legal.findMany({
            where: {
                level: 'Logiciel',
                softwareLabel: {
                    in: mySoftwares.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            },
            orderBy: [
                {
                    id: 'asc'
                },
                {
                    dateStart: 'asc'
                }
            ]
        })

        return [...constantLegal, ...constantSoftware]
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Constant")

    }
}

export const getConstantBySlug = async (slug: string) => {
    try {
        const constant = await prisma.constant_Legal.findFirst({
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
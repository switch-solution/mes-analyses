import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientBySlug, getMyClientActive } from "./client.query";
import { getMySoftware } from "./user.query";

export const getSoftwareBySlug = async (slug: string) => {
    const software = await prisma.software.findUniqueOrThrow({
        where: {
            slug: slug,
        },
        include: {
            client: true
        }
    })

    return software
}
export type getSoftwareBySlug = Prisma.PromiseReturnType<typeof getSoftwareBySlug>;


export const getSoftwareUsers = async (slug: string) => {
    try {
        const software = await getSoftwareBySlug(slug)
        if (!software) {
            throw new Error(`Le logiciel ${slug} n'existe pas.`)
        }
        const usersSoftware = await prisma.userSoftware.findMany({
            where: {
                softwareLabel: software.label,
                softwareClientId: software.clientId
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        const users = usersSoftware.map((userSoftware) => {
            const firstname = userSoftware.user.UserOtherData.at(0)?.firstname
            const lastname = userSoftware.user.UserOtherData.at(0)?.lastname
            return {
                lastname: lastname ? lastname : 'Non renseigné',
                firstname: firstname ? firstname : 'Non renseigné',
                isEditor: userSoftware.isEditor ? 'Oui' : 'Non'
            }


        })
        return users
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des utilisateurs du logiciels logiciel.`)
    }


}

export type getSoftwareUsers = Prisma.PromiseReturnType<typeof getSoftwareUsers>;

export const getSoftwareByClientSlug = async (clientSlug: string) => {
    try {
        const clientId = await getClientBySlug(clientSlug)
        const softwares = await prisma.software.findMany({
            where: {
                clientId: clientId.siren
            }
        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}

export const getSoftwareConstantFilterByUserSoftware = async () => {
    try {
        const softwares = await getMySoftware()
        const clientId = await getMyClientActive()
        const constats = await prisma.software_Constant.findMany({
            where: {
                softwareLabel: {
                    in: softwares.map((software) => software.softwareLabel)
                },
                clientId: clientId

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
        return constats
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}

export const getSoftwareConstantBySlug = async (slug: string) => {
    try {
        const constant = await prisma.software_Constant.findFirst({
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

export const getSoftwaresItemsFilterByUserSoftware = async () => {
    try {
        const softwares = await getMySoftware()
        const clientId = await getMyClientActive()

        const items = await prisma.software_Items.findMany({
            where: {
                softwareLabel: {
                    in: softwares.map((software) => software.softwareLabel)
                },
                clientId: clientId
            }
        })
        return items
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}





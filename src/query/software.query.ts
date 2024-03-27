import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientBySlug } from "./client.query";
import { getMyClientActive, getMySoftwareActive } from "./user.query";
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

/**
 * This function get the software of the user for my software active
 * @returns 
 */

export const getSoftwareUsers = async () => {
    try {
        const mySoftwareSlug = await getMySoftwareActive()
        const software = await getSoftwareBySlug(mySoftwareSlug)
        if (!software) {
            throw new Error(`Le logiciel ${mySoftwareSlug} n'existe pas.`)
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
                isEditor: userSoftware.isEditor ? 'Oui' : 'Non',
                id: userSoftware.user.id
            }


        })
        return users
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des utilisateurs du logiciels logiciel.`)
    }


}


export const getSoftwareUsersBySoftwareSlug = async (softwareSlug: string) => {
    try {
        const software = await getSoftwareBySlug(softwareSlug)
        if (!software) {
            throw new Error(`Le logiciel ${softwareSlug} n'existe pas.`)
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
                isEditor: userSoftware.isEditor ? 'Oui' : 'Non',
                id: userSoftware.user.id
            }


        })
        return users
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des utilisateurs du logiciels logiciel.`)
    }


}


export const getUserInternalNotInSoftware = async (softwareSlug: string) => {
    try {
        const software = await getSoftwareBySlug(softwareSlug)
        if (!software) {
            throw new Error(`Le logiciel ${softwareSlug} n'existe pas.`)
        }
        const usersSoftwareNotInSoftwareLabel = await prisma.userSoftware.groupBy({
            by: ['userId'],
            where: {
                softwareLabel: {
                    notIn: [software.label]
                },
                softwareClientId: software.clientId
            },


        })

        const usersOtherData = await prisma.userOtherData.findMany({
            where: {
                userId: {
                    in: usersSoftwareNotInSoftwareLabel.map((userSoftware) => userSoftware.userId)
                }
            },
            select: {
                firstname: true,
                lastname: true,
                userId: true
            }

        })

        return usersOtherData

    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des utilisateurs du logiciels logiciel.`)
    }


}
export type getUserInternalNotInSoftware = Prisma.PromiseReturnType<typeof getUserInternalNotInSoftware>;


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

export type getSoftwareByClientSlug = Prisma.PromiseReturnType<typeof getSoftwareByClientSlug>;




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




export const getSoftwareByClientSlugAndSoftwareLabel = async (clientSlug: string, softwareLabel: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        const software = await prisma.software.findUnique({
            where: {
                label_clientId: {
                    clientId: clientExist.siren,
                    label: softwareLabel
                }
            }
        })
        return software
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération du logiciel.`)
    }



}







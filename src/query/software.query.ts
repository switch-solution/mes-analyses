import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientBySlug } from "./client.query";
import { getMyClientActive, getMySoftwareActive } from "./user.query";
import { getMySoftware } from "./user.query";
import { copyFormToSoftware } from "@/src/query/form.query";
import { copyBook } from "@/src/query/book.query";
import { copyTask } from "@/src/query/task.query";
import { copyCounter } from "@/src/query/counter.query";
import { copySetting } from "./software_setting.query";
import type { Logger } from "@/src/helpers/type";
import { createLog } from "./logger.query";
import { copyAbsence } from "./absence.query";
import { copyAccumulationToSoftware } from "./accumalation.query";
import { copyTable } from "./table.query";
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


/**
 * This function get the software slug active of the user
 * @returns 
 */


export const softwareCopyData = async (softwareSlug: string) => {
    try {
        try {
            await copyFormToSoftware(softwareSlug)

        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des formulaires ${softwareSlug}`)
        }
        //Add Settings
        try {
            await copySetting(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des paramètres ${softwareSlug}`)
        }
        //Copy books and chapters
        try {
            await copyBook(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des cahiers ${softwareSlug}`)
        }
        //Copy absence
        try {
            await copyAbsence(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des absences ${softwareSlug}`)
        }
        //Copy Counter
        try {
            await copyCounter(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des compteurs ${softwareSlug}`)
        }
        //Copy Task
        try {
            await copyTask(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des tâches ${softwareSlug}`)
        }
        //Copy Accumulation
        try {
            await copyAccumulationToSoftware(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des cumuls de paie ${softwareSlug}`)
        }
        //Copy Table
        try {
            await copyTable(softwareSlug)
        } catch (err) {
            console.error(err)
            throw new Error(`Une erreur est survenue lors de la copie des tables ${softwareSlug}`)
        }
        return
    } catch (err) {
        const software = await getSoftwareBySlug(softwareSlug)
        await prisma.software.delete({
            where: {
                slug: softwareSlug
            }
        })
        const log: Logger = {
            level: "error",
            message: `Erreur lors de la copie des données du logiciel ${softwareSlug} suppression des données`,
            scope: "software",
            clientId: software.clientId,
        }
        await createLog(log)
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la copie des données du logiciel. Le logiciel a été supprimé`)
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

export const getBookBySoftwareLabelAndClientSlug = async (softwareLabel: string, clientSlug: string) => {
    try {
        const clientExist = await getClientBySlug(clientSlug)
        const books = await prisma.software_Book.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientExist.siren

            }
        })
        return books
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des cahiers du logiciel.`)
    }

}

export type getBookBySoftwareLabelAndClientSlug = Prisma.PromiseReturnType<typeof getBookBySoftwareLabelAndClientSlug>;

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







import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientBySlug, getMyClientActive } from "./client.query";
import { getMySoftware } from "./user.query";
import { copyFormToSoftware } from "@/src/query/form.query";
import { copyBook } from "@/src/query/book.query";
import { copyTask } from "@/src/query/task.query";
import { createTypeRubrique } from "./software_setting.query";
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


export const softwareCopyData = async (softwareSlug: string) => {
    await copyFormToSoftware(softwareSlug)
    //Add Settings
    await createTypeRubrique(softwareSlug)
    //Copy books and chapters
    await copyBook(softwareSlug)
    //Copy tasks
    await copyTask(softwareSlug)

    return
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







import { prisma } from "@/lib/prisma"
import { userIsEditor, userIsValid } from "@/src/query/security.query";
import { getMyClient, getMySoftware } from "./user.query";
import { getSoftwareByClientSlug } from "./software.query";
import { getClientBySlug } from "./client.query";


export const getMyBookEditable = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        if (!userId) {
            throw new Error("L'utilisateur n'est pas connecté.")
        }
        const bookEditableForUser = await prisma.userSoftware.findMany({
            where: {
                userId: userId,
                isEditor: true
            },
            include: {
                software: {
                    include: {
                        Standard_Book: true
                    }

                }
            }

        })

        return bookEditableForUser
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Book")
    }
}



export const getEditorHome = async (clientSlug: string) => {
    try {
        const userSoftware = await getMySoftware()
        const clientId = await getClientBySlug(clientSlug)
        const countAttachment = await prisma.standard_Attachment.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })
        const countItems = await prisma.software_Items.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })

        const countBook = await prisma.standard_Book.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })
        const countStdComponent = await prisma.standard_Component.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })
        const countConstantSoftware = await prisma.software_Constant.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })

        const countSetting = await prisma.software_Setting.count({
            where: {
                softwareLabel: {
                    in: userSoftware.map((software) => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })

        return {
            countAttachment,
            countItems,
            countBook,
            countStdComponent,
            countConstantSoftware,
            countSetting

        }
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Software_Item")
    }

}



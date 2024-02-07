import { prisma } from "@/lib/prisma";
import { userIsAdminClient, userIsValid } from "@/src/query/security.query";
export const getSoftwareByClientId = async (clientId: string) => {
    const userId = await userIsValid()
    if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }

    const clientExist = await prisma.client.findUnique({ where: { id: clientId } })

    if (!clientExist) throw new Error("Le client n'existe pas.")

    const isAdmin = await userIsAdminClient(clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    const softwares = await prisma.software.findMany({
        where: {
            clientId: clientId
        }
    })

    return softwares

}

export const getSoftwareByUserIsEditor = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const softwaresEdit = await prisma.userSoftware.findMany({
            where: {
                userId: userId,
                isEditor: true
            }
        })
        const softwares = await prisma.software.findMany({
            where: {
                id: {
                    in: softwaresEdit.map((software) => software.softwareId)
                }
            }
        })
        return softwares
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des logiciels.")
    }
}

export const getSoftwareClient = async (softwareId: string) => {
    try {
        const userId = await userIsValid()
        if (!userId) { throw new Error("L'utilisateur n'est pas connecté.") }
        const software = await prisma.software.findUnique({
            where: {
                id: softwareId
            }
        })
        if (!software) throw new Error("Le logiciel n'existe pas.")
        return software.clientId
    } catch (err) {
        console.error(err)
        throw new Error("Impossible de récupérer le client du logiciel.")
    }
}

export const getSoftwareById = async (softwareId: string) => {

    const software = await prisma.software.findUniqueOrThrow({
        where: {
            id: softwareId
        }
    })

    return software
}
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { userIsAdminClient } from "@/src/query/security.query";
export const getSoftwareByClientId = async (clientId: string) => {

    const session = await getAuthSession()

    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const userId = session.user.id;

    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const clientExist = await prisma.client.findUnique({ where: { id: clientId } })

    if (!clientExist) throw new Error("Le client n'existe pas.")

    const isAdmin = await userIsAdminClient(userId, clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")
    const softwares = await prisma.software.findMany({
        where: {
            clientId: clientId
        }
    })

    return softwares

}

export const getSoftwareClient = async (softwareId: string) => {
    try {
        const session = await getAuthSession()
        if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.")

        const userId = session.user.id;
        if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

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
    const session = await getAuthSession()
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const software = await prisma.software.findUnique({
        where: {
            id: softwareId
        }
    })

    if (!software) throw new Error("Le logiciel n'existe pas.")


    const clientExist = await prisma.client.findUnique({ where: { id: software.clientId } })

    if (!clientExist) throw new Error("Le client n'existe pas.")

    const isAdmin = await userIsAdminClient(userId, software.clientId)
    if (!isAdmin) throw new Error("Vous n'avez pas les droits pour effectuer cette action.")

    return software
}
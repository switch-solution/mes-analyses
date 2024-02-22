import { prisma } from "@/lib/prisma";
import { getMySoftware } from "./user.query";
import { getClientBySlug } from "./client.query";
import { getSoftwareBySlug } from "./software.query";
export const getStandardAttachment = async (clientSlug: string) => {
    try {
        const mySoftwares = await getMySoftware()
        const clienId = await getClientBySlug(clientSlug)
        if (!clienId) {
            throw new Error("Le client n'existe pas")
        }
        const standardAttachment = await prisma.standard_Attachment.findMany({
            where: {
                softwareLabel: {
                    in: mySoftwares.map((software) => software.softwareLabel)
                },
                clientId: clienId.siren
            }
        })
        return standardAttachment
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Standard_Attachment")
    }

}

export const getStandardAttachmentBySoftwareId = async (softwareSlug: string) => {
    try {

        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) {
            throw new Error("Le logiciel n'existe pas")
        }
        const standardAttachment = await prisma.standard_Attachment.findMany({
            where: {
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId
            }
        })
        return standardAttachment

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Standard_Attachment")
    }

}
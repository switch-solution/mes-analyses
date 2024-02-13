import { prisma } from "@/lib/prisma";
import { getSoftwareById, getSoftwareByUserIsEditor } from "./software.query";
export const getStandardAttachment = async () => {
    try {
        const softwares = await getSoftwareByUserIsEditor()
        const standardAttachment = await prisma.standard_Attachment.findMany({
            where: {
                softwareId: {
                    in: softwares.map((software) => software.id)
                }
            }
        })
        return standardAttachment
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Standard_Attachment")
    }

}

export const getStandardAttachmentBySoftwareId = async (softwareId: string) => {
    try {
        const softwareExist = await getSoftwareById(softwareId)
        if (!softwareExist) {
            throw new Error("Le logiciel n'existe pas")
        }
        const standardAttachment = await prisma.standard_Attachment.findMany({
            where: {
                softwareId: softwareId
            }
        })
        return standardAttachment

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Standard_Attachment")
    }

}
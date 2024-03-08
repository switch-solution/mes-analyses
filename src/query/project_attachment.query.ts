import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "./project.query";
import { Prisma } from '@prisma/client'

export const getProjectAttachment = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error("Le projet n'existe pas")
        }
        const projectAttachment = await prisma.project_Attachment.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId
            }
        })
        return projectAttachment
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Project_Attachment")
    }

}

export const getProjectAttachmentNotDelivered = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error("Le projet n'existe pas")
        }
        const projectAttachment = await prisma.project_Attachment.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                isDelivered: false
            }
        })
        return projectAttachment
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des données de la table Project_Attachment")
    }

}

export type getProjectAttachmentNotDelivered = Prisma.PromiseReturnType<typeof getProjectAttachmentNotDelivered>;

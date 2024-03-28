import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getProjectBySlug } from "./project.query";
import { getProjectProcessusExist } from "./project.query";
export const getFormAndInput = async (projectSlug: string, processusSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet introuvable")
        const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
        if (!processusExist) throw new Error("Processus introuvable")
        const form = await prisma.project_Form.findMany({
            where: {
                clientId: projectExist.clientId,
                softwareLabel: projectExist.softwareLabel,
                processusId: processusExist.id,
                projectLabel: projectExist.label
            },
            include: {
                Project_Form_Input: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        })
        return form
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération du processus")
    }

}

export type getFormAndInput = Prisma.PromiseReturnType<typeof getFormAndInput>;

export const getSelectOptions = async (projectSlug: string, processusSlug: string) => {
    try {
        const processusExist = await getProjectProcessusExist(projectSlug, processusSlug)
        if (!processusExist) throw new Error("Processus introuvable")
        console.log(processusExist)
        const optionsList = {
            sirenList: await prisma.project_Society.findMany({
                where: {
                    projectLabel: processusExist.projectLabel,
                    softwareLabel: processusExist.softwareLabel,
                    clientId: processusExist.clientId,
                },
                select: {
                    siren: true,
                    socialReason: true
                }
            }),
        }

        return optionsList


    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des options")
    }

}

export type getSelectOptions = Prisma.PromiseReturnType<typeof getSelectOptions>;


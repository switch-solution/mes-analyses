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
            establishementList: await prisma.project_Establishment.findMany({
                where: {
                    projectLabel: processusExist.projectLabel,
                    softwareLabel: processusExist.softwareLabel,
                    clientId: processusExist.clientId,
                },
                select: {
                    nic: true,
                    socialReason: true
                }
            }),
            urssafList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "URSSAF",
                }
            }),
            idccList: await prisma.idcc.findMany({
                orderBy: {
                    label: 'asc'
                }
            }),
            projectIdccList: await prisma.project_Idcc.findMany({
                where: {
                    projectLabel: processusExist.projectLabel,
                    softwareLabel: processusExist.softwareLabel,
                    clientId: processusExist.clientId,
                },
            }),
            dsnAbsenceList: await prisma.dsn_Absence.findMany(),
            softwareSetting: await prisma.software_Setting.findMany({
                where: {
                    softwareLabel: processusExist.softwareLabel,
                    clientId: processusExist.clientId,
                }
            })

        }

        return optionsList


    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des options")
    }

}

export type getSelectOptions = Prisma.PromiseReturnType<typeof getSelectOptions>;


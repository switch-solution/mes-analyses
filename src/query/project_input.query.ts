import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "@/src/query/project.query";
import { Prisma } from '@prisma/client'
import { getComponentBySlug } from "./project_component.query";

export const getInputByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error('Projet inexistant')
        const inputs = await prisma.project_Input.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel
            },
            include: {
                Project_Value: true
            }
        })
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export type getInputByProjectSlug = Prisma.PromiseReturnType<typeof getInputByProjectSlug>;

export const getInputDsnByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error('Projet inexistant')
        const inputs = await prisma.project_Input.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                NOT: {
                    dsnItem: ''
                }
            },
            include: {
                Project_Value: true
            }
        })
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export type getInputDsnByProjectSlug = Prisma.PromiseReturnType<typeof getInputDsnByProjectSlug>;


export const getInputByComponentSlug = async (componentSlug: string) => {
    try {
        const component = await getComponentBySlug(componentSlug)
        if (!component) throw new Error('Composant inexistant')
        const inputs = await prisma.project_Input.findMany({
            where: {
                clientId: component.clientId,
                projectLabel: component.projectLabel,
                projectSoftwareLabel: component.projectSoftwareLabel,
                chapterLevel_1: component.chapterLevel_1,
                chapterLevel_2: component.chapterLevel_2,
                chapterLevel_3: component.chapterLevel_3,
            }
        })
        return inputs
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export const getGroupByComponentLabelDsnWitchProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        const groupBy = await prisma.project_Input.groupBy({
            by: ['componentLabel'],
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                NOT: {
                    dsnItem: ''
                }
            },
            orderBy: {
                componentLabel: 'asc'
            }

        })
        return groupBy
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

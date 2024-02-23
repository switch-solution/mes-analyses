import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "@/src/query/project.query";
import { Prisma } from '@prisma/client'

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

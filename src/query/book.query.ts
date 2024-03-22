import { prisma } from '@/lib/prisma'
import { getSoftwareBySlug } from './software.query'
import { getProjectBySlug } from './project.query'


export const getBookByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Ce projet n'existe pas")
        const books = await prisma.project_Book.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
            }
        })
        return books
    } catch (err) {
        console.error(err)
        throw new Error(`Une erreur est survenue lors de la récupération des logiciels du client.`)
    }

}
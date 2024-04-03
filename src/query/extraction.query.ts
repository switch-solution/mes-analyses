import { prisma } from "@/lib/prisma"
import { getProjectBySlug } from "./project.query"

export const dataByTable = async ({ projectSlug, table, slug }: { projectSlug: string, table: string, slug: string }) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        switch (table) {
            case "Project_Society":
                const society = await prisma.project_Society.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return society

                break
            case "Project_Establisment":
                const establishment = await prisma.project_Establishment.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return establishment

                break
            case "Project_Job":
                const job = await prisma.project_Job.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return job

                break
            case "Project_Idcc":
                const idcc = await prisma.project_Idcc.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return idcc

                break
            case "Project_Classification":
                const classification = await prisma.project_Classification.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return classification

                break
            case "Project_OPS":
                const ops = await prisma.project_OPS.findUniqueOrThrow({
                    where: {
                        clientId: projectExist.clientId,
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        slug
                    }
                })
                return ops
                break
            default:
                throw new Error("Table inconnue.")


        }
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données.")
    }

}
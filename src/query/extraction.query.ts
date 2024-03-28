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
            default:
                throw new Error("Table inconnue.")


        }
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des données.")
    }

}
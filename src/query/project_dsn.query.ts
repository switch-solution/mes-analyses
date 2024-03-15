import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "./project.query";

export const getDsnByProjectSlug = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Projet non trouvé")
        const dsn = await prisma.project_DSN_Data.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                projectSoftwareLabel: projectExist.softwareLabel

            },
            orderBy: [
                {
                    date: 'desc'
                },
                {
                    siret: 'asc'
                }
            ]
        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des DSN')
    }

}
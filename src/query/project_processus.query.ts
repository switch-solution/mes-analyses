import { prisma } from "@/lib/prisma";

export const getProjectProcessusBySlug = async (slug: string) => {
    try {
        const processus = await prisma.project_Processus.findUnique({
            where: {
                slug: slug

            }
        })
        return processus
    } catch (err) {
        console.error('Erreur lors de la récupération du processus.')
        return null
    }
}

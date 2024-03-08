import { prisma } from "@/lib/prisma";


export const getSoftwareItemsBySlug = async (slug: string) => {
    try {
        const item = await prisma.software_Items.findUnique({
            where: {
                slug: slug
            }
        })
        return item
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des rubriques logiciels.')
    }


}
import { prisma } from "@/lib/prisma";
import { getSoftwareByUserIsEditor } from "@/src/query/software.query";
export const getSoftwareItems = async () => {
    try {
        const softwares = await getSoftwareByUserIsEditor()
        const softwareItems = await prisma.softwareItems.findMany({
            where: {
                softwareId: {
                    in: softwares.map((software) => software.id)
                }
            }
        })
        return softwareItems
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des rubriques logiciels.')
    }

}

export const getSoftwareItemsBySlug = async (slug: string) => {
    try {
        const item = await prisma.softwareItems.findUnique({
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
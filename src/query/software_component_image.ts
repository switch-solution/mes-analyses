import { prisma } from "@/lib/prisma";
import { getStdComponentBySlug } from "./software_component.query";

export const getImageByComponentSlug = async (componentSlug: string) => {
    try {
        const componentExist = await getStdComponentBySlug(componentSlug)
        if (!componentExist) throw new Error("Le composant n'existe pas")
        const images = await prisma.software_Component_Image.findFirst({
            where: {
                slug: componentSlug
            }
        })
        return images
    } catch (err: unknown) {
        throw new Error(err as string)
    }

}
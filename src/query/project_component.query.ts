import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getComponentBySlug = async (componentSlug: string) => {
    try {
        const component = await prisma.project_Component.findUniqueOrThrow({
            where: {
                slug: componentSlug
            },


        })
        return component
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}

export const getComponentAndInputAndValuesBySlug = async (componentSlug: string) => {
    try {
        const componentExist = await getComponentBySlug(componentSlug)
        if (!componentExist) throw new Error('Composant inexistant')
        const component = await prisma.project_Component.findUnique({
            where: {
                slug: componentSlug
            },
            include: {
                Project_Input: {
                    include: {
                        Project_Value: true
                    }
                }
            }
        })
        return component
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des valeurs')
    }

}
export type getComponentAndInputAndValuesBySlug = Prisma.PromiseReturnType<typeof getComponentAndInputAndValuesBySlug>;

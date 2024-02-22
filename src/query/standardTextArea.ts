import { prisma } from "@/lib/prisma";
import { getStdComponentBySlug } from "@/src/query/stdcomponent.query";
import { Prisma } from '@prisma/client'

export const getTextAreaByComponentSlug = async (componentSlug: string) => {
    try {
        const stdcomponent = await getStdComponentBySlug(componentSlug)
        const textArea = await prisma.standard_Component_TextArea.findFirstOrThrow({
            where: {
                componentType: stdcomponent.type,
                componentLabel: stdcomponent.label,
                softwareLabel: stdcomponent.softwareLabel,
                clientId: stdcomponent.clientId

            }
        })
        return textArea
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération du texte')
    }
}

export type getTextAreaByComponentSlug = Prisma.PromiseReturnType<typeof getTextAreaByComponentSlug>;

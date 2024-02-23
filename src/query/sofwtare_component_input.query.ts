import { prisma } from "@/lib/prisma";
import { getStdComponentBySlug } from "./software_component.query";
import { Prisma } from '@prisma/client'

export const getStdInputsByStdComponentSlug = async (stdComponentSlug: string) => {
    try {
        const stdComponentExist = await getStdComponentBySlug(stdComponentSlug)
        if (!stdComponentExist) throw new Error("Ce composant n'existe pas")
        const stdInputs = await prisma.software_Component_Input.findMany({
            where: {
                componentLabel: stdComponentExist.label,
                softwareLabel: stdComponentExist.softwareLabel,
                clientId: stdComponentExist.clientId,
            },
            orderBy: {
                order: 'asc'
            }

        })

        return stdInputs
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des inputs")
    }

}

export type getStdInputsByStdComponentSlug = Prisma.PromiseReturnType<typeof getStdInputsByStdComponentSlug>;


import { prisma } from "@/lib/prisma";
import { getStandardInputById } from "./sofwtare_input.query";

export const getOptionsByInputSlug = async (inputSlug: string) => {
    try {
        const inputExist = await getStandardInputById(inputSlug)
        if (!inputExist) throw new Error("Le composant n'existe pas")
        const options = await prisma.software_Component_Select_Option.findMany({
            where: {
                inputLabel: inputExist.label,
                componentLabel: inputExist.componentLabel,
                clientId: inputExist.clientId,
                softwareLabel: inputExist.softwareLabel
            }
        })
        return options
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des options")
    }


}
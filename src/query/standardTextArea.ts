import { prisma } from "@/lib/prisma";

export const getTextAreaById = async (id: string) => {
    try {
        const textArea = await prisma.standard_Composant_TextArea.findFirstOrThrow({
            where: {
                id: id

            }
        })
        return textArea
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération du texte')
    }
}
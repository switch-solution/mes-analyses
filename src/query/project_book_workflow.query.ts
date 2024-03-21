import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "./project.query";
export const addValidator = async (projectSlug: string, userId: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error("Le projet n'existe pas.")
        }
        const projectBooks = await prisma.project_Book.findMany({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
            }
        })
        if (!projectBooks) {
            throw new Error("Aucun livre n'est associé à ce projet.")
        }
        const books = projectBooks.map((book) => {
            return {
                bookLabel: book.label,
                clientId: book.clientId,
                projectLabel: book.projectLabel,
                softwareLabel: book.projectSoftwareLabel,
                isValid: false,
                userId

            }
        })
        await prisma?.project_Book_WorkFlow.createMany({
            data: books
        })

    } catch (err) {
        console.error(err)
        throw new Error(err as string)
    }
}
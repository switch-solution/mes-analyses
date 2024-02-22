import { prisma } from "@/lib/prisma";
import { userIsAuthorizeForProject, userIsValid } from "@/src/query/security.query";
import { getSoftwareByUserIsEditor } from "./software.query";
import { getProjectById } from "./project.query";
export const getBookChapter = async ({
    label,
    softwareId,
    projectId
}: {
    label: string,
    softwareId: string,
    projectId: string
}) => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const bookExist = await getBook({
            label,
            softwareId,
            projectId
        })
        if (!bookExist) {
            throw new Error('Le cahier n\'existe pas')
        }
        const chapters = await prisma.project_Chapter.findMany({
            where: {
                bookLabel: label,
                bookSoftwareId: softwareId,
                bookProjectId: projectId
            }
        })
        return chapters
    } catch (err) {
        throw new Error('Une erreur est survenue lors de la récupération des chapitres du cahier')
    }

}

export const getBook = async ({
    label,
    softwareId,
    projectId
}: {
    label: string,
    softwareId: string,
    projectId: string
}) => {
    try {
        const projectExist = await getProjectById(projectId)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const book = await prisma.project_Book.findUniqueOrThrow({
            where: {
                label_softwareId_projectId: {
                    label,
                    softwareId,
                    projectId
                }
            },

        })

        const userIsAuthorize = await userIsAuthorizeForProject(projectId)
        if (!userIsAuthorize) {
            throw new Error('Vous n\'êtes pas autorisé à accéder à ce projet')
        }
        return book
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération du cahier')
    }
}

export const getBookBySoftwareAndProjectAndLabeb = async ({
    projectId,
    softwareId,
    label
}: {
    projectId: string,
    softwareId: string,
    label: string
}) => {

}

export const getBookBySoftwares = async () => {
    try {
        const softwares = await getSoftwareByUserIsEditor()
        const books = await prisma.standard_Book.findMany({
            where: {
                softwareId: {
                    in: softwares.map((software) => software.id)
                }
            }
        })
        return books
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des cahiers')
    }

}


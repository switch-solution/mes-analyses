import { prisma } from "@/lib/prisma";
import { userIsValidatorProject } from "./security.query";
import { getValidatorProject } from "./project.query";
export const getWorkflow = async (bookSlug: string) => {
    try {
        const bookExist = await prisma.project_Book.findUnique({
            where: {
                slug: bookSlug
            }
        })

        if (!bookExist) throw new Error("Ce cahier n'existe pas")
        const projectExist = await prisma.project.findFirst({
            where: {
                label: bookExist.projectLabel,
                softwareLabel: bookExist.projectSoftwareLabel,
                clientId: bookExist.clientId
            }
        })
        if (!projectExist) throw new Error("Le projet n'existe pas")
        const userIsValidator = await userIsValidatorProject(projectExist.slug)
        if (!userIsValidator) throw new Error("Vous n'êtes pas autorisé à accéder à cette page")

        const workflowExist = await prisma.project_Book_WorkFlow.findFirst({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId,
                projectLabel: bookExist.projectLabel,
                softwareLabel: bookExist.projectSoftwareLabel
            }
        })
        if (!workflowExist) {
            //Création du workflow
            await createWorkFlow(bookExist.label, projectExist.slug)
        }
        const workflow = await prisma.project_Book_WorkFlow.findMany({
            where: {
                bookLabel: bookExist.label,
                clientId: bookExist.clientId,
                projectLabel: bookExist.projectLabel,
                softwareLabel: bookExist.projectSoftwareLabel
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        return workflow
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des workflows")
    }

}

const createWorkFlow = async (bookLabel: string, projectSlug: string) => {
    try {
        const userIsValidator = await getValidatorProject(projectSlug)
        await prisma.project_Book_WorkFlow.createMany({
            data: userIsValidator.map(user => {
                return {
                    bookLabel,
                    clientId: user.projectClientId,
                    projectLabel: user.projectLabel,
                    softwareLabel: user.projectSoftwareLabel,
                    userId: user.userId,
                    response: 'En attente',
                    deadline: new Date('01/01/4000'),
                    createdBy: user.userId
                }
            })

        })
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la création du workflow")
    }

}

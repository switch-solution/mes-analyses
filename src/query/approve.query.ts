import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "@/src/query/project.query";
import { userIsValidatorProject } from '@/src/query/security.query';
export const getRowAwaitingApproval = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userIsValidator = await userIsValidatorProject(projectSlug)
        if (!userIsValidator) {
            throw new Error('Vous n\'êtes pas autorisé à accéder à cette page.')
        }
        const myApprovale = await getMyApprovale({
            projectLabel: projectExist.label,
            clientId: projectExist.clientId,
            softwareLabel: projectExist.softwareLabel,
            userId: userIsValidator.userId
        })

        const projectSociety = myApprovale.filter(approvale => approvale.table === 'Project_Society')
        const rows = await prisma.project_Approve.findMany({
            where: {
                projectLabel: projectExist.label,
                clientId: projectExist.clientId,
                softwareLabel: projectExist.softwareLabel,
                response: 'En attente',
            },


        })

        return rows

    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des lignes en attente de validation')
    }

}

const getMyApprovale = async ({ projectLabel, clientId, softwareLabel, userId }: { projectLabel: string, clientId: string, softwareLabel: string, userId: string }) => {
    try {
        const myApprovale = await prisma.project_Approve.findMany({
            where: {
                userId,
                projectLabel,
                clientId,
                softwareLabel
            }
        })
        return myApprovale
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des lignes en attente de validation')
    }
}



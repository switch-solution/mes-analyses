import { prisma } from "@/lib/prisma";
export const getRowAwaitingApproval = async ({
    projectLabel,
    softwareLabel,
    clientId,
    userId
}: {
    projectLabel: string,
    clientId: string,
    softwareLabel: string,
    userId: string
}) => {
    try {

        const myApprovale = await getMyApprovale({
            projectLabel,
            clientId,
            softwareLabel,
            userId
        })

        const rows = await prisma.project_Approve.findMany({
            where: {
                projectLabel: projectLabel,
                clientId: clientId,
                softwareLabel: softwareLabel,
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



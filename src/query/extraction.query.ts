import { prisma } from "@/lib/prisma"
import { User } from "@/src/classes/user";

export const projectProcesExtractionDetail = async (userId: string) => {

    try {
        const user = new User(userId)
        if (!user) {
            throw new Error('L\'utilisateur n\'est pas autorisé dans ce projet')
        }
        const clientId = await user.getMyClientActive()
        const projects = await user.getMyProject()
        const projectsList = await prisma.project.findMany({
            where: {
                clientId: clientId.clientId,
                label: {
                    in: projects.map((project) => project.project.label)
                },
                status: 'Actif'
            },
            include: {
                Project_Processus: true
            }
        })

        const datas = projectsList.map((project) => {
            const projectProcessusPending = project.Project_Processus.filter((process) => process.isPending === true)
            const projectProcessusFinish = project.Project_Processus.filter((process) => process.isFinish === true)
            const projectProcessusIsReopen = project.Project_Processus.filter((process) => process.isReopen === true)
            const projectProcessusIsProgress = project.Project_Processus.filter((process) => process.isProgress === true)
            const projectProcessusIsOpen = project.Project_Processus.filter((process) => process.isOpen === true)

            const countProcessus = project.Project_Processus.length
            return {
                label: project.label,
                "En attente": projectProcessusPending.length / countProcessus * 100,
                "Terminé": projectProcessusFinish.length / countProcessus * 100,
                "Réouvert": projectProcessusIsReopen.length / countProcessus * 100,
                "En cours de validation": projectProcessusIsProgress.length / countProcessus * 100,
                "En cours de traitement": projectProcessusIsOpen.length / countProcessus * 100,

            }
        })

        return datas

    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de l\'extraction des données projet')
    }

}

export const projectProcesExtraction = async (userId: string) => {
    try {
        const user = new User(userId)
        if (!user) {
            throw new Error('L\'utilisateur n\'est pas autorisé dans ce projet')
        }
        const projects = await user.getMyProject()
        const isOpen = projects.filter((project) => project.project.status === 'Actif')
        const isPending = projects.filter((project) => project.project.status === 'En attente')
        const isApproved = projects.filter((project) => project.project.status === 'Archivé')
        const datas = [
            {
                label: 'En cours',
                isOpen: isOpen.length,

            },
            {
                label: 'En attente',
                isPending: isPending.length,
            },
            {
                label: 'Approuvé',
                isApproved: isApproved.length,
            }
        ]
        return datas
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de l\'extraction des données projet')
    }
}
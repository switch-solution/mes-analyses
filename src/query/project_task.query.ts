import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
import { getProjectBySlug } from "./project.query";
import { Prisma } from '@prisma/client'
import { getClientBySiren } from "./client.query";

export const getMyTasks = async () => {
    try {
        const userId = await userIsValid()
        const tasks = await prisma.project_Task.findMany({
            where: {
                owner: userId,
                status: "actif"
            },
            include: {
                Project: {
                    include: {
                        client: true
                    }
                }
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des taches')
    }
}

export const getCountProjectTaskActive = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const tasks = await prisma.project_Task.count({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
                status: "actif"
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }
}


export const getProjectTask = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const tasks = await prisma.project_Task.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }
}

export const updateTaskStatusIsCompleted = async (taskName: string, projectSlug: string) => {
    try {
        const project = await getProjectBySlug(projectSlug)
        await prisma.project_Task.updateMany({
            where: {
                projectLabel: project.label,
                softwareLabel: project.softwareLabel,
                clientId: project.clientId,
                label: taskName
            },
            data: {
                status: "terminé"
            }
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la mise à jour de la tache')
    }

}


export const countMyTaskActive = async () => {
    try {
        const userId = await userIsValid()
        const countTasks = await prisma.project_Task.count({
            where: {
                owner: userId,
                status: "actif"
            }
        })
        return countTasks
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des taches')
    }
}

export const getTaskBySlug = async (taskSlug: string) => {
    try {
        const task = await prisma.project_Task.findFirstOrThrow({
            where: {
                slug: taskSlug
            }
        })
        return task
    } catch (err) {
        console.error(err)
        throw new Error('Erreur lors de la récupération des taches')
    }

}

export type getTaskBySlug = Prisma.PromiseReturnType<typeof getTaskBySlug>;

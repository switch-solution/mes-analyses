import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";


export const copyTask = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error('Le logiciel n\'existe pas')
        const tasks = await prisma.task.findMany()
        const softwareTasks = tasks.map(task => {
            return {
                label: task.label,
                level: task.level,
                description: task.description,
                createdBy: task.createdBy,
                isUpload: task.isUpload,
                accept: task.accept,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId
            }
        })
        await prisma.software_Task.createMany({
            data: softwareTasks
        })
        return
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de recopie des taches')
    }
}




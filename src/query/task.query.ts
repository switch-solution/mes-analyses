import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { syncGenerateSlug } from "../helpers/generateSlug";

export const copyTask = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error('Le logiciel n\'existe pas')
        const tasks = await prisma.task.findMany()
        let count = await countAllTask()
        const softwareTasks = tasks.map(task => {
            count = count + 1
            return {
                label: task.label,
                level: task.level,
                description: task.description,
                createdBy: task.createdBy,
                isUpload: task.isUpload,
                accept: task.accept,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId,
                slug: syncGenerateSlug(`Tache-${count}-${task.label}`)
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

export const countAllTask = async () => {
    try {
        const count = await prisma.software_Task.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des taches')
    }

}




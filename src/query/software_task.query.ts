import { prisma } from "@/lib/prisma";
import { getMySoftwareActive } from "./user.query";
import { getSoftwareBySlug } from "./software.query";

export const getTaskForSoftwareActive = async () => {
    try {
        const softwareSlug = await getMySoftwareActive()
        const software = await getSoftwareBySlug(softwareSlug)
        const tasks = await prisma.software_Task.findMany({
            where: {
                softwareLabel: software.label,
                clientId: software.clientId
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des tâches.")
    }

}
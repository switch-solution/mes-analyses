import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { syncGenerateSlug } from "../helpers/generateSlug";


export const countAllTask = async () => {
    try {
        const count = await prisma.software_Task.count()
        return count
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des taches')
    }

}




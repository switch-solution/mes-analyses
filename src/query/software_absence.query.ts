import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { getClientActiveAndSoftwareActive } from "./security.query";

export const getSofwareAbsenceForMyActiveSoftware = async () => {
    try {
        const validation = await getClientActiveAndSoftwareActive()
        if (!validation) {
            throw new Error("Vous n'avez pas les droits pour accéder à cette page.")
        }
        const softwareAbsence = await prisma.software_Absence.findMany({
            where: {
                softwareLabel: validation.softwareLabel,
                clientId: validation.clientId,
            }
        })
        return softwareAbsence
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des absences.")
    }

}

export const getSoftwareAbsenceBySlug = async (absenceSlug: string) => {
    try {
        const absence = await prisma.software_Absence.findUniqueOrThrow({
            where: {
                slug: absenceSlug
            }
        })
        return absence
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération de l'absence.")
    }

}

export type getSoftwareAbsenceBySlug = Prisma.PromiseReturnType<typeof getSoftwareAbsenceBySlug>;



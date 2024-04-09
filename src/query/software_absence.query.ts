import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
export const getSofwareAbsenceForMyActiveSoftware = async ({
    clientId,
    softwareLabel
}: {
    clientId: string,
    softwareLabel: string
}) => {
    try {

        const softwareAbsence = await prisma.software_Absence.findMany({
            where: {
                softwareLabel: softwareLabel,
                clientId: clientId,
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



import { prisma } from "@/lib/prisma"
export const dsnAbsence = async () => {
    try {
        const absences = await prisma.dsn_Absence.findMany()
        return absences
    } catch (err) {
        console.log(err)
        throw new Error('Impossible de récupérer les codes absences DSN')
    }
}

export const getDsnAbsenceById = async (id: string) => {
    try {
        const absence = await prisma.dsn_Absence.findUnique({
            where: {
                id: id

            }
        })
        return absence
    } catch (err) {
        console.log(err)
        throw new Error('Impossible de récupérer le code absence DSN')
    }

}
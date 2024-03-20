import { prisma } from "@/lib/prisma";
import { getSoftwareBySlug } from "./software.query";
import { getFirstSettingById } from "./setting.query";
import { syncGenerateSlug } from "../helpers/generateSlug";
export const copyAbsence = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        if (!softwareExist) throw new Error("Le logiciel n'existe pas.")
        const absences = await prisma.absence.findMany()
        let countAbsence = await prisma.software_Absence.count()
        const setting = await getFirstSettingById('METHODE_CALCUL_ABSENCE')
        if (!setting) throw new Error("La méthode de calcul des absences n'est pas définie.")
        const absencesSoftware = absences.map(absence => {
            countAbsence++
            return {
                ...absence,
                clientId: softwareExist.clientId,
                softwareLabel: softwareExist.label,
                slug: syncGenerateSlug(`Abs-${countAbsence}-${absence.label}`),
                methodOfCalcul: setting.value,
                id: absence.id,
                isArchived: false
            }
        })
        await prisma.software_Absence.createMany({
            data: absencesSoftware
        })

    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie des absences.")
    }

}
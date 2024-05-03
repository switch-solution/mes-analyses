import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getCountAllTables = async () => {
    try {
        const countUser = await prisma.userOtherData.count()
        const countClient = await prisma.client.count()
        const countProject = await prisma.project.count()
        const countSoftware = await prisma.software.count()
        const countAccumulation = await prisma.accumulation.count()
        const countSoftwareAccumulation = await prisma.software_Accumulation.count()
        const countLoggers = await prisma.logger.count()
        const countDsnOps = await prisma.dsn_OPS.count()
        const countDsnAbsence = await prisma.dsn_Absence.count()
        const countSoftwareAbsence = await prisma.software_Absence.count()
        const datas = [
            {
                label: 'Utilisateurs',
                count: countUser
            },
            {
                label: 'Clients',
                count: countClient
            },
            {
                label: 'Projets',
                count: countProject
            },
            {
                label: 'Logiciels',
                count: countSoftware
            },
            {
                label: 'Cumul de paie',
                count: countAccumulation
            },
            {
                label: 'Cumul de paie par logiciel',
                count: countSoftwareAccumulation
            },
            {
                label: 'Loggers',
                count: countLoggers
            },
            {
                label: 'DSN OPS',
                count: countDsnOps
            },
            {
                label: 'DSN Absences',
                count: countDsnAbsence
            },

        ]
        return datas
    } catch (err) {
        console.error(err)
        throw new Error('Erreur de récupération des tables')
    }


}

export type getCountAllTables = Prisma.PromiseReturnType<typeof getCountAllTables>;

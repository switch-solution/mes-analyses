import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'


export const getSelectOptions = async ({
    projectLabel,
    softwareLabel,
    clientId
}: {
    projectLabel: string,
    softwareLabel: string,
    clientId: string

}) => {
    try {
        const optionsList = {
            sirenList: await prisma.project_Society.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                },
                select: {
                    siren: true,
                    socialReason: true
                }
            }),
            establishementList: await prisma.project_Establishment.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                },
                select: {
                    nic: true,
                    socialReason: true
                }
            }),
            urssafList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "URSSAF",
                }
            }),
            agircArrcoList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "AGIRC-ARRCO",
                },
                orderBy: {
                    label: 'asc'
                }
            }),
            mutualList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "Mutuelle",
                },
                orderBy: {
                    label: 'asc'
                }
            }),
            prevList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "Prévoyance",
                },
                orderBy: {
                    label: 'asc'
                }
            }),
            msaList: await prisma.dsn_OPS.findMany({
                where: {
                    type: "MSA",
                },
                orderBy: {
                    label: 'asc'
                }
            }),
            idccList: await prisma.idcc.findMany({
                orderBy: {
                    label: 'asc'
                }
            }),
            projectIdccList: await prisma.project_Idcc.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                },
            }),
            dsnAbsenceList: await prisma.dsn_Absence.findMany(),
            softwareSetting: await prisma.software_Setting.findMany({
                where: {
                    softwareLabel,
                    clientId
                }
            }),
            serviceList: await prisma.project_Service.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            }),
            bankList: await prisma.project_Bank.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            }),
            freeZone: await prisma.project_Free_Zone.findMany({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })


        }

        return optionsList


    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des options")
    }

}

export type getSelectOptions = Prisma.PromiseReturnType<typeof getSelectOptions>;


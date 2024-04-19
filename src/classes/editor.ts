import { prisma } from '@/lib/prisma';
export class Editor {
    clientActiveLabel: string;
    softwareActiveLabel: string;
    constructor(clientActiveLabel: string, softwareActiveLabel: string) {
        this.clientActiveLabel = clientActiveLabel;
        this.softwareActiveLabel = softwareActiveLabel;
    }

    async getdcc() {
        try {
            const iddc = await prisma.idcc.findMany({
                orderBy: {
                    code: 'asc'

                }
            })
            return iddc;
        } catch (err) {
            console.log(err);
            throw new Error("Impossible de récupèrer les données IDCC");
        }
    }

    async getDsnOps() {

    }

    async getCountStandardElement() {
        try {
            const countOps = await prisma.dsn_OPS.count();
            const countIdcc = await prisma.idcc.count();
            const countDsn = await prisma.dsn_Structure.count();
            const countAbsence = await prisma.dsn_Absence.count();
            const countRateAt = await prisma.rate_At.count();
            return {
                countOps,
                countIdcc,
                countDsn,
                countAbsence,
                countRateAt
            }
        } catch (err) {
            console.log(err);
            throw new Error("Impossible de récupèrer les données IDCC");
        }

    }

    async getCountSoftwareElement() {
        try {
            const countSetting = await prisma.software_Setting.count({
                where: {
                    softwareLabel: this.softwareActiveLabel
                }
            });
            const countProcessus = await prisma.software_Processus.count({
                where: {
                    softwareLabel: this.softwareActiveLabel
                }
            })
            const countAbsence = await prisma.software_Absence.count({
                where: {
                    softwareLabel: this.softwareActiveLabel
                }
            })
            const countAccumulation = await prisma.software_Accumulation.count({
                where: {
                    softwareLabel: this.softwareActiveLabel
                }
            })
            const countItems = await prisma.software_Items.count({
                where: {
                    softwareLabel: this.softwareActiveLabel
                }
            })
            return {
                countSetting,
                countProcessus,
                countAbsence,
                countAccumulation,
                countItems
            }

        } catch (err) {
            console.log(err);
            throw new Error("Impossible de récupèrer les données IDCC");
        }

    }


}
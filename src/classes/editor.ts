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
            return {
                countOps,
                countIdcc,
                countDsn,
                countAbsence
            }
        } catch (err) {
            console.log(err);
            throw new Error("Impossible de récupèrer les données IDCC");
        }

    }


}
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class OpsV00004Seed extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")

                await prisma.dsn_OPS.createMany({
                    data: [
                        { id: "P0002", label: "AGRI PREVOYANCE" },
                        { id: "P0223", label: "CPCEA" },
                        { id: "P0395", label: "MALAKOFF MEDERIC PREVOYANCE (ex CAPREVAL)" },
                        { id: "P0675", label: "IPSEC" },
                        { id: "P0826", label: "KERIALIS (ex-CREPA)" },
                        { id: "P0832", label: "CARCO" },
                        { id: "P0914", label: "BTP PREVOYANCE" },
                        { id: "P0921", label: "CIPREV" },
                        { id: "P0930", label: "APGIS" },
                        { id: "P0942", label: "AG2R PREVOYANCE" },
                        { id: "P0945", label: "ARPEGE PREVOYANCE" },
                        { id: "P0947", label: "UNIPREVOYANCE" },
                        { id: "P0954", label: "IPRIAC" },
                        { id: "P0958", label: "IRP AUTO Prévoyance-Santé" },
                        { id: "P0959", label: "KLESIA PREVOYANCE (ex-IPGM)" },
                        { id: "P0971", label: "CARCEPT PREVOYANCE" },
                        { id: "P0972", label: "INPR" },
                        { id: "P0978", label: "CARPILIG PREVOYANCE" },
                        { id: "P0979", label: "IPECA PREVOYANCE" },
                        { id: "P0983", label: "AUDIENS PREVOYANCE" },
                        { id: "P0990", label: "CRP-BTP" },
                        { id: "P0997", label: "IPBP" },
                        { id: "P1003", label: "IRCEM PREVOYANCE" },
                        { id: "P1016", label: "KLESIA PREVOYANCE (ex-OREPA-Prévoyance)" },
                        { id: "P1020", label: "CAISSE REUNIONNAISE DE PREVOYANCE (CRP)" },
                        { id: "P1022", label: "CAPSSA" },
                        { id: "P1030", label: "HUMANIS PREVOYANCE (fusionnant APRI/IONIS/NOVALIS/TAITBOUT/CAPAVES prévoyance)" },
                        { id: "P1031", label: "APICIL PREVOYANCE" },
                        { id: "P1033", label: "CGPCE" },
                        { id: "P1035", label: "CCPMA PREVOYANCE" },
                        { id: "P1330", label: "A2VIP (ex B2V Prévoyance)" },
                        { id: "P2001", label: "MIEL GROUPE MALAKOFF HUMANIS" },
                        { id: "P2002", label: "SMATIS Mutuelle" },
                        { id: "P2003", label: "MCCI" },
                        { id: "P2005", label: "MUTUELLE BOISSIERE" },
                        { id: "P3001", label: "RSBP" },
                        { id: "P3008", label: "CPCEA RETRAITE SUPPLEMENTAIRE" },
                        { id: "P3009", label: "CCPMA RETRAITE SUPPLEMENTAIRE" },
                        { id: "P3010", label: "PRODIGEO" },
                    ]
                })

                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const opsV00004Seed = new OpsV00004Seed("OPS_V0004", "Ajout des organismes prévoyance", 33, "OPS_V0003")


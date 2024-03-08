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

class OpsV00002Seed extends Seed {
    constructor(
        protected label: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(label, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")

                await prisma.dsn_OPS.createMany({
                    data: [
                        {
                            id: 'DMSA11',
                            label: 'MSA GRAND SUD'
                        },
                        {
                            id: 'DMSA12',
                            label: 'MSA MIDI PYRENEES NORD',
                        },
                        {
                            id: 'DMSA13',
                            label: 'MSA PROVENCE-AZUR',
                        },
                        {
                            id: 'DMSA14',
                            label: 'MSA COTES NORMANDES',
                        },
                        {
                            id: 'DMSA17',
                            label: 'MSA CHARENTES',
                        },
                        {
                            id: 'DMSA20',
                            label: 'MSA DE LA CORSE',
                        },
                        {
                            id: 'DMSA21',
                            label: 'MSA DE BOURGOGNE',
                        },
                        {
                            id: 'DMSA22',
                            label: 'MSA ARMORIQUE',
                        },
                        {
                            id: 'DMSA24',
                            label: 'MSA DORDOGNE-LOT ET GARONNE',
                        },
                        {
                            id: 'DMSA25',
                            label: 'MSA FRANCHE COMTE',
                        },
                        {
                            id: 'DMSA26',
                            label: 'MSA ARDECHE-DROME-LOIRE',
                        },
                        {
                            id: 'DMSA27',
                            label: 'MSA HAUTE NORMANDIE',
                        },
                        {
                            id: 'DMSA28',
                            label: 'MSA BEAUCE-COEUR DE LOIRE',
                        },
                        {
                            id: 'DMSA32',
                            label: 'MSA MIDI PYRENEES SUD',
                        },
                        {
                            id: 'DMSA33',
                            label: 'MSA GIRONDE',
                        },
                        {
                            id: 'DMSA35',
                            label: 'MSA PORTES DE BRETAGNE',
                        },
                        {
                            id: 'DMSA41',
                            label: 'MSA BERRY-TOURAINE',
                        },
                        {
                            id: 'DMSA48',
                            label: 'MSA LANGUEDOC',
                        },
                        {
                            id: 'DMSA49',
                            label: 'MSA MAINE ET LOIRE',
                        },
                        {
                            id: 'DMSA51',
                            label: 'MSA MARNE-ARDENNES-MEUSE',
                        },
                        {
                            id: 'DMSA52',
                            label: 'MSA SUD CHAMPAGNE',
                        },
                        {
                            id: 'DMSA54',
                            label: 'MSA LORRAINE',
                        },
                        {
                            id: 'DMSA59',
                            label: 'MSA NORD-PAS DE CALAIS',
                        },
                        {
                            id: 'DMSA63',
                            label: 'MSA AUVERGNE',
                        },
                        {
                            id: 'DMSA64',
                            label: 'MSA SUD AQUITAINE',
                        },
                        {
                            id: 'DMSA68',
                            label: 'MSA ALSACE',
                        },
                        {
                            id: 'DMSA69',
                            label: 'MSA AIN-RHONE',
                        },
                        {
                            id: 'DMSA72',
                            label: 'MSA MAYENNE-ORNE-SARTHE',
                        },
                        {
                            id: 'DMSA73',
                            label: 'MSA ALPES DU NORD',
                        },
                        {
                            id: 'DMSA75',
                            label: 'MSA ILE DE FRANCE',
                        },
                        {
                            id: 'DMSA77',
                            label: 'MSA SAINT-BARTHELEMY',
                        },
                        {
                            id: 'DMSA80',
                            label: 'MSA PICARDIE',
                        },
                        {
                            id: 'DMSA84',
                            label: 'MSA ALPES-VAUCLUSE',
                        },
                        {
                            id: 'DMSA85',
                            label: 'MSA LOIRE ATLANTIQUE-VENDEE',
                        },
                        {
                            id: 'DMSA86',
                            label: 'DMSA86',
                        },
                        {
                            id: 'DMSA87',
                            label: 'MSA LIMOUSIN',
                        },

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

export const opsV00002Seed = new OpsV00002Seed("OPS_V0002", "Ajout des organismes MSA", 31, "OPS_V0001")


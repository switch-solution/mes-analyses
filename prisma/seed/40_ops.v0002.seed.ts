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
                            id: '41062136100014',
                            type: 'AGIRC-ARRCO',
                            label: 'IRCOM',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '31456056600015',
                            type: 'AGIRC-ARRCO',
                            label: 'CGRR',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '77568291700015',
                            type: 'AGIRC-ARRCO',
                            label: 'Groupe AG2R',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '41759197100011',
                            type: 'AGIRC-ARRCO',
                            label: 'APICIL AGIRA',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '48053538400055',
                            type: 'AGIRC-ARRCO',
                            label: 'B2V GESTION ASSOCIATION',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '33213903900017',
                            type: 'AGIRC-ARRCO',
                            label: 'Groupe IRP AUTO',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '44832375800038',
                            type: 'AGIRC-ARRCO',
                            label: 'AUDIENS',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '30558637200321',
                            type: 'AGIRC-ARRCO',
                            label: 'KLESIA Retraite',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '39911122800017',
                            type: 'AGIRC-ARRCO',
                            label: 'LOURMEL',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '39481650800029',
                            type: 'AGIRC-ARRCO',
                            label: 'Groupe AG2R (REUNICA)',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '77567053200404',
                            type: 'AGIRC-ARRCO',
                            label: 'Groupe PRO BTP',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '50762844400014',
                            type: 'AGIRC-ARRCO',
                            label: 'MALAKOFF MEDERIC Retraite',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '41765671700028',
                            type: 'AGIRC-ARRCO',
                            label: 'Groupe CRC',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '44289241000030',
                            type: 'AGIRC-ARRCO',
                            label: 'BTPR',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '75320126800012',
                            type: 'AGIRC-ARRCO',
                            label: 'HUMANIS Retraite',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '77567521800132',
                            type: 'AGIRC-ARRCO',
                            label: 'HUMANIS CRE IRCAFEX',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '49914777500021',
                            type: 'AGIRC-ARRCO',
                            label: 'CAMIEG',
                            address1: '',
                            codeZip: '',
                            city: ''
                        },
                        {
                            id: '47865038500014',
                            type: 'AGIRC-ARRCO',
                            label: 'CNIEG',
                            address1: '',
                            codeZip: '',
                            city: ''
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
export const opsV00002 = new OpsV00002Seed("OPS_V0002", "Création des organismes de retraite complémentaire", 40, "FormV0020")
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

class LegalV0001Seed extends Seed {
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
                await prisma.constant_Legal.upsert({
                    where: {
                        id: 'STD_0001',
                        label: 'Plafond de la sécurité sociale',
                        description: 'Plafond de la sécurité sociale',
                        idccCode: '9999',
                        dateStart: new Date('2024-01-01').toLocaleDateString(),
                        slug: `STD_PLSS_2024_01_${new Date('2024-01-01').toISOString().split('T')[0].replace(/-/g, '_')}`,

                    },
                    update: {},
                    create: {
                        id: 'STD_0001',
                        label: 'Plafond de la sécurité sociale',
                        description: 'Plafond de la sécurité sociale',
                        idccCode: '9999',
                        value: '3864',
                        createdBy: 'system',
                        dateStart: new Date('2024-01-01').toLocaleDateString(),
                        level: 'Standard',
                        slug: `STD_PLSS_2024_01_${new Date('2024-01-01').toISOString().split('T')[0].replace(/-/g, '_')}`,
                    }

                })
                //Plafond SS 2024
                await prisma.constant_Legal.upsert({
                    where: {
                        id: 'STD_0002',
                        label: 'SMIC horaire brut',
                        description: 'SMIC horaire brut',
                        idccCode: '9999',
                        dateStart: new Date('2024-01-01').toLocaleDateString(),
                        slug: 'SMIC_2024_01'
                    },
                    update: {},
                    create: {
                        id: 'STD_0002',
                        level: 'Standard',
                        label: 'SMIC horaire brut',
                        description: 'SMIC horaire brut',
                        idccCode: '9999',
                        value: '11.65',
                        createdBy: 'system',
                        dateStart: new Date('2024-01-01').toLocaleDateString(),
                        slug: `STD_SMIC_2024_01${new Date('2024-01-01').toISOString().split('T')[0].replace(/-/g, '_')}`,
                    }

                })
                await this.seedUpdateStatus("completed")

            }
        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
            await this.updateError(JSON.stringify(err))
        }
    }
}
export const legalV0001Seed = new LegalV0001Seed("LEGAL_V0001", "SMIC et plafond SS 2024", 19, "FormV0011")
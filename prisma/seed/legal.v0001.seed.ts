
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
export async function legalV0001Seed() {
    try {
        const SEED_NAME = "LEGAL_V0001"
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: SEED_NAME,
                status: "completed"

            }
        })
        if (!seedExist) {
            await prisma.prisma_Seed.upsert({
                where: {
                    name: SEED_NAME
                },
                update: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                },
                create: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                }
            })
            //Plafond SS 2024
            await prisma.constant_Legal.upsert({
                where: {
                    id: 'STD_0001',
                    label: 'Plafond de la sécurité sociale',
                    description: 'Plafond de la sécurité sociale',
                    idccCode: '9999',
                    dateStart: new Date('2024-01-01'),
                    slug: 'PLSS_2024_01'
                },
                update: {
                    id: 'STD_0001',
                    label: 'Plafond de la sécurité sociale',
                    description: 'Plafond de la sécurité sociale',
                    idccCode: '9999',
                    value: '3864',
                    dateStart: new Date('2024-01-01'),
                    slug: 'PLSS_2024_01'

                },
                create: {
                    id: 'STD_0001',
                    label: 'Plafond de la sécurité sociale',
                    description: 'Plafond de la sécurité sociale',
                    idccCode: '9999',
                    value: '3864',
                    createdBy: 'system',
                    dateStart: new Date('2024-01-01'),
                    slug: 'PLSS_2024_01'

                }

            })
            //Plafond SS 2024
            await prisma.constant_Legal.upsert({
                where: {
                    id: 'STD_0002',
                    label: 'SMIC horaire brut',
                    description: 'SMIC horaire brut',
                    idccCode: '9999',
                    dateStart: new Date('2024-01-01'),
                    slug: 'SMIC_2024_01'
                },
                update: {
                    id: 'STD_0002',
                    label: 'SMIC horaire brut',
                    description: 'SMIC horaire brut',
                    idccCode: '9999',
                    value: '11.65',
                    dateStart: new Date('2024-01-01'),
                    slug: 'SMIC_2024_01'

                },
                create: {
                    id: 'STD_0002',
                    label: 'SMIC horaire brut',
                    description: 'SMIC horaire brut',
                    idccCode: '9999',
                    value: '11.65',
                    createdBy: 'system',
                    dateStart: new Date('2024-01-01'),
                    slug: 'SMIC_2024_01'
                }

            })
        }
    } catch (err) {
        const SEED_NAME = "LEGAL_V0001"

        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "error"
            }
        })
        console.error(err)
        console.error(err)
    }


}  
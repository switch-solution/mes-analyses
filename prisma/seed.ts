import { PrismaClient } from '@prisma/client'
import { idccV0001Seed } from './seed/2_idcc.v0001.seed'
import { settingV0001 } from './seed/1_setting.v0001.seed'
import { processusV0001 } from './seed/3_processus.v0001.seed'
import { formV0001 } from './seed/4_form.v0001.seed'
import { dsnV0001 } from './seed/5_dsn.v0001.seed'
import { rateAt0001 } from './seed/6_rateAt.v0001.seed'
import { formV0002 } from './seed/7_form.v0002.seed'
import { opsV00001Seed } from './seed/8_ops.v0001.seed'
import { formV0003 } from './seed/9_form.v0003.seed'
import { formV0004 } from './seed/10_form.v0004.seed'
import { formV0005 } from './seed/11_form.v0005.seed'
import { formV0006 } from './seed/12_form.v0006.seed'
import { dsnAbsenceV0001 } from './seed/13_dsnAbsence.v0001.seed'
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

const main = async () => {
    await settingV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await idccV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await processusV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })

    await dsnV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await rateAt0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0003.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0004.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0005.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0006.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await dsnAbsenceV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })


}

main()
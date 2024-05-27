import { PrismaClient } from '@prisma/client'
import { idccV0001Seed } from './seed/2_idcc.v0001.seed'
import { settingV0001 } from './seed/1_setting.v0001.seed'
import { dsnV0001 } from './seed/3_dsn.v0001.seed'
import { rateAt0001 } from './seed/4_rateAt.v0001.seed'
import { opsV00001Seed } from './seed/5_ops.v0001.seed'
import { dsnAbsenceV0001 } from './seed/6_dsnAbsence.v0001.seed'
import { legalV0001Seed } from './seed/7_legal.v0001.seed'
import { legalV0002Seed } from './seed/8_legal.v0002.seed'
import { legalV0003Seed } from './seed/9_legal.v0003.seed'
import { legalV0004Seed } from './seed/10_legal.v0004.seed'
import { legalV0005Seed } from './seed/11_legal.v0005.seed'
import { opsV00002Seed } from './seed/12_ops.v0002.seed'
import { pageV0001Seed } from './seed/13_page.v0001.seed'
import { pageV0002Seed } from './seed/14_page.v0002.seed'
import { pageV0003Seed } from './seed/15_page.v0003.seed'
import { settingV0002 } from './seed/16_setting.v0002.seed'
import { formV0001Seed } from './seed/17_form.v0001.seed'
import { settingV0003 } from './seed/18_setting.v0003.seed'
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

    await opsV00001Seed.run()
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

    await legalV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await legalV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await legalV0003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await legalV0004Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await legalV0005Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await opsV00002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await pageV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await pageV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await pageV0003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await settingV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await settingV0003.run()
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